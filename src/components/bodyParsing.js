/**
 * Created by gurghet on 29/06/16.
 */

function getDataFromDotNotation (d, row) {
  return d.split('.').reduce((o, i) => { if (o === undefined) { return undefined } else { return o[i] } }, row)
}

function derivedBody (body, cols) {
  return body.map(row => {
    let newRow = {}
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
      newRow[col] = realColValue
    })
    return newRow
  })
}

/**
 * rawBody is an array in the form
 * [ { 'col 1': 'value 1', 'col 2': 'value 2', ... [_id: 'some id'] },
 *   { 'col 1': 'value 3', 'col 2': 'value 4', ... [_id: 'some other id'] },
 *   ... ]
 * Columns can be omitted and _ids can be omitted too.
 */
function bodyWithIds (body, idColKey) {
  let counter = 0
  let usedIds = []
  body.forEach(row => {
    let idValue = getDataFromDotNotation(idColKey, row)
    if ((idValue === undefined || idValue === null) && (row[idColKey] === undefined)) {
      idValue = '_smart_' + counter++
    }
    if (usedIds.indexOf(idValue) !== -1) {
      idValue = String(idValue) + '-' + counter++
    }
    row[idColKey] = idValue
    usedIds.push(idValue)
    Object.keys(row).forEach(p => {
      if (p.indexOf(' ') !== -1) {
        let dashedp = p.replace(/ /g, '-')
        let v = row[p]
        delete row[p]
        row[dashedp] = v
      }
    })
  })
  return body
}

function filteredBody (body, filter, colKey) {
  if (typeof filter === 'function') {
    if (colKey === undefined) {
      throw new Error('[Smart Table Internal Error] Must scope filter with custom functions')
    }
    return body.map(row => {
      let val = getDataFromDotNotation(colKey, row)
      if (filter(val)) {
        return Object.assign(row, { _show: row._show !== false && true })
      } else {
        return Object.assign(row, { _show: false })
      }
    })
  } else if (typeof filter === 'string') {
    return body.map(row => {
      function someColumnContainsFilter () {
        return Object.keys(row).some(col => {
          return typeof row[col] === 'string' && row[col].indexOf(filter) !== -1 ||
            typeof row[col] === 'number' && String(row[col]).indexOf(filter) !== -1
        })
      }
      function columnContainsFilter () {
        let val = getDataFromDotNotation(colKey, row)
        return val !== undefined && val.indexOf(filter) !== -1
      }
      if (
        colKey === undefined && someColumnContainsFilter() || // global search
        colKey !== undefined && columnContainsFilter()
      ) {
        return Object.assign(row, { _show: row._show !== false && true })
      } else {
        return Object.assign(row, { _show: false })
      }
    })
  }
}

function sortedBody (body, colKey, desc, compareFunction) {
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

export default { derivedBody, bodyWithIds, filteredBody, sortedBody }
