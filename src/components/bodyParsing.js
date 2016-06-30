/**
 * Created by gurghet on 29/06/16.
 */

function getDataFromDotNotation (d, row) {
  return d.split('.').reduce((o, i) => o[i], row)
}

/**
 * rawBody is an array in the form
 * [ { 'col 1': 'value 1', 'col 2': 'value 2', ... [_id: 'some id'] },
 *   { 'col 1': 'value 3', 'col 2': 'value 4', ... [_id: 'some other id'] },
 *   ... ]
 * Columns can be omitted and _ids can be omitted too.
 */
export function bodyWithIds (rawBody, idColKey) {
  let counter = 0
  rawBody.forEach(row => {
    let idValue = getDataFromDotNotation(idColKey, row)
    if ((idValue === undefined || idValue === null) && (row[idColKey] === undefined || row[idColKey] === null)) {
      row[idColKey] = '_smart_' + counter++
    }
  })
}
