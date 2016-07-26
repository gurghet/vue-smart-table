/**
 * Created by gurghet on 29/06/16.
 */

function getDataFromDotNotation (d, row) {
  return d.split('.').reduce((o, i) => { if (o === undefined) { return undefined } else { return o[i] } }, row)
}

function deriveBody (body, cols) {
  return body.map(row => {
    cols.forEach(col => {
      let realColValue = {}
      if (/\+/.test(col)) {
        // it's a composite column will return an object
        col.split('+').forEach(d => {
          realColValue[d] = getDataFromDotNotation(d, row)
        })
      } else {
        realColValue = getDataFromDotNotation(col, row)
      }
      row[col] = realColValue
    })
    return row
  })
}

var camelCase = require('camel-case')
function undashCamelize (columnKey) {
  return camelCase(columnKey.replace(/\-/, ' '))
}

/**
 * rawBody is an array in the form
 * [ { 'col 1': 'value 1', 'col 2': 'value 2', ... [_id: 'some id'] },
 *   { 'col 1': 'value 3', 'col 2': 'value 4', ... [_id: 'some other id'] },
 *   ... ]
 * Columns can be omitted and _ids can be omitted too.
 */
function bodyWithIds (body, idColKey) {
  if (body.length === 0) {
    return
  }
  let counter = 0
  let usedIds = []
  body.forEach(row => {
    let idValue = getDataFromDotNotation(idColKey, row)
    if ((idValue === undefined || idValue === null) && (row[idColKey] === undefined || row[idColKey] === null)) {
      idValue = '_smart_' + counter++
    }
    if (usedIds.indexOf(idValue) !== -1) {
      idValue = String(idValue) + '-' + counter++
    }
    row._id = idValue
    usedIds.push(idValue)
    Object.keys(row).forEach(p => {
      if (p.indexOf(' ') !== -1 || p.indexOf('-') !== -1) {
        let camelized = undashCamelize(p)
        let v = row[p]
        delete row[p]
        row[camelized] = v
      }
    })
  })
  return body
}

function assertShowReactive (row) {
  if (row._show === undefined || ((Object.getOwnPropertyDescriptor(row, '_show').get === undefined) && row.____mut !== '')) {
    console.error('[Smart Table Internal Error] Missing or non-reactive _show property, set the _show property before calling filteredBody and it has to be reactive')
  }
}

function filterBody (body, filter, colKeys, cumulative = false) {
  if (colKeys === undefined) {
    throw new Error('[Smart Table Internal Error] Filtering scope not defined')
  }
  if (colKeys.length === 0) {
    // no scoping => no filtering
    // this is to treat the most common case
    // in which no filterable columns are
    // defined, it also incidentally
    // catches the case in which the scope is
    // a malformed empty column
    return
  }
  if (typeof filter === 'function') {
    if (Array.isArray(colKeys) && colKeys.length !== 1) {
      throw new Error('[Smart Table Internal Error] When using custom function the filtering scope must be on exatcly one column (namely the column of component that provides the function)')
    }
    let colKey = colKeys
    return body.forEach(row => {
      assertShowReactive(row)
      let val = getDataFromDotNotation(colKey, row)
      if (filter(val)) {
        row._show = !cumulative || row._show
      } else {
        row._show = false
      }
    })
  } else if (typeof filter === 'string') {
    return body.forEach(row => {
      assertShowReactive(row)
      function someColumnContainsFilter () {
        return colKeys.some(col => {
          let val = getDataFromDotNotation(col, row)
          let lowerCaseFilter = filter.toLowerCase()
          let columnIsStringAndContainsFilter = typeof val === 'string' && val.toLowerCase().indexOf(lowerCaseFilter) !== -1
          let columnIsNumberAndContainsFilterAsAString = typeof val === 'number' && String(val).indexOf(filter) !== -1
          return columnIsStringAndContainsFilter || columnIsNumberAndContainsFilterAsAString
        })
      }
      function columnContainsFilter () {
        let colKey = colKeys
        let val = getDataFromDotNotation(colKey, row)
        // todo: remove this code duplication eventually
        let lowerCaseFilter = String(filter).toLowerCase()
        return val !== undefined && String(val).toLowerCase().indexOf(lowerCaseFilter) !== -1
      }
      if (
        Array.isArray(colKeys) && someColumnContainsFilter() || // global search
        typeof colKeys === 'string' && columnContainsFilter()
      ) {
        row._show = !cumulative || row._show
      } else {
        row._show = false
      }
    })
  }
}

function sortBody (body, colKey, desc, compareFunction) {
  function numericCompare (row1, row2) {
    let valA = getDataFromDotNotation(colKey, row1)
    var valB = getDataFromDotNotation(colKey, row2)
    if (valA === undefined || valB === undefined) {
      return 0
    }
    return (valA - valB) * (desc ? -1 : 1)
  }
  function lexicographicCompare (row1, row2) {
    let valA = String(getDataFromDotNotation(colKey, row1))
    var valB = String(getDataFromDotNotation(colKey, row2))
    if (valA === undefined || valB === undefined) {
      return 0
    }
    var r = (valA > valB) ? 1 : -1
    return r * (desc ? -1 : 1)
  }
  function isNumeric (obj) {
    return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0
  }
  function scopedCompareFunction (row1, row2) {
    let valA = getDataFromDotNotation(colKey, row1)
    let valB = getDataFromDotNotation(colKey, row2)
    return compareFunction(valA, valB)
  }
  if (compareFunction !== undefined && typeof compareFunction === 'string') {
    if (compareFunction === 'lexicographic') {
      body.sort(lexicographicCompare)
    }
  } else if (compareFunction !== undefined && typeof compareFunction === 'function') {
    body.sort(scopedCompareFunction)
    if (desc) {
      body.reverse()
    }
  } else {
    let everyRowIsNonNumeric = body.every(r => !isNumeric(getDataFromDotNotation(colKey, r)))
    if (everyRowIsNonNumeric) {
      body.sort(lexicographicCompare)
    } else {
      body.sort(numericCompare)
    }
  }
  return body
}

function camelizeHeader (header) {
  header.forEach(p => {
    if (p.key.indexOf(' ') !== -1 || p.key.indexOf('-') !== -1) {
      p.key = camelCase(p.key.replace(/\-/, ' ').replace(/\./, '※')).replace(/※/, '.')
    }
  })
}

function returnPage (body, {itemsPerPage, currentPage} = {itemsPerPage: 20, currentPage: 1}) {
  const zeroIndexedCurrentPage = currentPage - 1
  return body.slice(zeroIndexedCurrentPage * itemsPerPage, (zeroIndexedCurrentPage + 1) * itemsPerPage)
}

export default { deriveBody, bodyWithIds, filterBody,
                 sortBody, camelizeHeader, returnPage }
