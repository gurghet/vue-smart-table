/**
 * Created by gurghet on 30/06/16.
 */
/* global describe, it, expect */

import bodyParsing from 'src/components/bodyParsing'

describe('bodyWithIds', () => {
  it('should add ids in the simplest case', () => {
    let result = bodyParsing.bodyWithIds([{lol: 'wow'}], '_id')
    result.should.eql([{_id: '_smart_0', lol: 'wow'}])
  })

  it('should do nothing in the simplest case', () => {
    let result = bodyParsing.bodyWithIds([{lol: 'wow', _id: 'my id'}], '_id')
    result.should.eql([{_id: 'my id', lol: 'wow'}])
  })

  it('should overwrite _id if is already defined and is not the id column', () => {
    let result = bodyParsing.bodyWithIds([{_id: 'false id', realId: 1}], 'realId')
    result.should.eql([{_id: 1, realId: 1}])
  })

  it('should add missing ids', () => {
    let swissCheese = [
      {name: 'camamber', id: '38'},
      {colour: 'spotted'},
      {name: 'brie', nationality: 'from Brie', id: '389'}
    ]
    let result = bodyParsing.bodyWithIds(swissCheese, 'id')
    result.should.eql([
      {name: 'camamber', id: '38', _id: '38'},
      {colour: 'spotted', _id: '_smart_0'},
      {name: 'brie', nationality: 'from Brie', id: '389', _id: '389'}
    ])
  })

  it('should patch duplicate ids', () => {
    let doubler = [
      {id: '38'},
      {id: '38'},
      {id: '39'}
    ]
    let result = bodyParsing.bodyWithIds(doubler, 'id')
    result.should.eql([
      {id: '38', _id: '38'},
      {id: '38', _id: '38-0'},
      {id: '39', _id: '39'}
    ])
  })

  it('should patch duplicate ids even if they resemble duplicates', () => {
    let doubler = [
      {id: '38'},
      {id: '38-0'},
      {id: '38-0'}
    ]
    let result = bodyParsing.bodyWithIds(doubler, 'id')
    result.should.eql([
      {id: '38', _id: '38'},
      {id: '38-0', _id: '38-0'},
      {id: '38-0', _id: '38-0-0'}
    ])
  })

  it('should camelize spaces and dashes', () => {
    let foo = [
      {_id: 0, 'foo bar': 'excelsior'},
      {_id: '0', 'bar-baz': 'robustus'},
      {_id: '1', 'petrus_augustus': 'robustus'}
    ]
    let result = bodyParsing.bodyWithIds(foo, '_id')
    result.should.eql([
      {_id: 0, 'fooBar': 'excelsior'},
      {_id: '0', 'barBaz': 'robustus'},
      {_id: '1', 'petrus_augustus': 'robustus'}
    ])
  })

  it('should set id with dot notation when the id is always not null', () => {
    let foo = [
      { id: { value: 1 } }
    ]
    let result = bodyParsing.bodyWithIds(foo, 'id.value')
    result.should.eql([
      { id: { value: 1 }, _id: 1 }
    ])
  })

  it('should set the id with dot notation when the id is null', () => {
    let foo = [
      { id: { value: null } }
    ]
    let result = bodyParsing.bodyWithIds(foo, 'id.value')
    result.should.eql([
      { id: { value: null }, _id: '_smart_0' }
    ])
  })
})

describe('filterBody', () => {
  it('should apply the same filtering function to more columns', () => {
    // ____mut suppresses errors
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(tooMany, 'c', ['name', 'surname'])
    tooMany.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ])
  })

  it('should filter numbers', () => {
    // ____mut suppresses errors
    let ages = [
      {_id: 0, age: 3, surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, age: 44, surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, age: 70, surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, age: 12, surname: 'bac', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(ages, '4', 'age')
    ages.should.eql([
      {_id: 0, age: 3, surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, age: 44, surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, age: 70, surname: 'ccc', _show: false, ____mut: ''},
      {_id: 3, age: 12, surname: 'bac', _show: false, ____mut: ''}
    ])
  })

  it('should perform a global filtering case insensitive', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(tooMany, 'C', ['name', 'surname'])
    tooMany.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ])
  })

  it('should perform a global filtering with numbers, converting the into text', () => {
    let numbers = [
      {_id: 0, name: 'aaa', age: 34, _show: true, ____mut: ''},
      {_id: 1, name: 'bbb', age: 3, _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(numbers, '3', ['name', 'age'])
    numbers.should.eql([
      {_id: 0, name: 'aaa', age: 34, _show: true, ____mut: ''},
      {_id: 1, name: 'bbb', age: 3, _show: true, ____mut: ''}
    ])
  })

  it('should perform scoped filtering', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(tooMany, 'c', 'name')
    tooMany.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: false, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ])
  })

  it('should not be cumulative by default', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: false, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(tooMany, 'c', 'surname')
    tooMany.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ])
  })

  it('should be cumulative if asked kindly', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: false, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(tooMany, 'c', 'surname', true)
    tooMany.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: false, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ])
  })

  it('should perform filtering even with more than one column', () => {
    let missing = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(missing, 'c', ['name', 'surname'])
    missing.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', _show: true, ____mut: ''}
    ])
  })

  it('should perform filtering even with undefined columns are filter specifically', () => {
    let missing = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(missing, 'c', 'surname')
    missing.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false, ____mut: ''},
      {_id: 1, surname: 'bbb', _show: false, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', _show: false, ____mut: ''}
    ])
  })

  it('should accept dot notation for the scoped column', () => {
    let intricate = [
      {_id: 0, name: { first: 'bob', last: 'marley' }, _show: true, ____mut: ''},
      {_id: 1, name: { first: 'bib', last: 'mirley' }, _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(intricate, 'i', 'name.first')
    intricate.should.eql([
      {_id: 0, name: { first: 'bob', last: 'marley' }, _show: false, ____mut: ''},
      {_id: 1, name: { first: 'bib', last: 'mirley' }, _show: true, ____mut: ''}
    ])
  })

  it('should accept dot notation for the scoped column (missing col case)', () => {
    let intricateMissing = [
      {_id: 0, name: { last: 'marley' }, _show: true, ____mut: ''},
      {_id: 1, name: { first: 'bib', last: 'mirley' }, _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(intricateMissing, 'i', 'name.first')
    intricateMissing.should.eql([
      {_id: 0, name: { last: 'marley' }, _show: false, ____mut: ''},
      {_id: 1, name: { first: 'bib', last: 'mirley' }, _show: true, ____mut: ''}
    ])
  })

  it('should accept custom filter functions', () => {
    function filter (val) {
      return val > 2 && val < 4
    }
    let excel = [
      {_id: 0, number: 1, _show: true, ____mut: ''},
      {_id: 1, number: 2, _show: true, ____mut: ''},
      {_id: 2, number: 3, _show: true, ____mut: ''},
      {_id: 3, number: 4, _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(excel, filter, 'number')
    excel.should.eql([
      {_id: 0, number: 1, _show: false, ____mut: ''},
      {_id: 1, number: 2, _show: false, ____mut: ''},
      {_id: 2, number: 3, _show: true, ____mut: ''},
      {_id: 3, number: 4, _show: false, ____mut: ''}
    ])
  })

  it('should not be cuulative with custom filter', () => {
    function filter (val) {
      return val > 2 && val < 4
    }
    let excel = [
      {_id: 0, number: 1, _show: true, ____mut: ''},
      {_id: 1, number: 2, _show: true, ____mut: ''},
      {_id: 2, number: 3, _show: false, ____mut: ''},
      {_id: 3, number: 4, _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(excel, filter, 'number')
    excel.should.eql([
      {_id: 0, number: 1, _show: false, ____mut: ''},
      {_id: 1, number: 2, _show: false, ____mut: ''},
      {_id: 2, number: 3, _show: true, ____mut: ''},
      {_id: 3, number: 4, _show: false, ____mut: ''}
    ])
  })

  it('should not accept custom filter functions if they are not scoped', () => {
    function filter (val) {
      return val > 2 && val < 4
    }
    let excel = [
      {_id: 0, number: 1},
      {_id: 1, number: 2},
      {_id: 2, number: 3},
      {_id: 3, number: 4}
    ]
    let result = () => bodyParsing.filterBody(excel, filter)
    result.should.throw(Error)
  })

  it('should leave body unchanged if scope is an empty array', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ]
    bodyParsing.filterBody(tooMany, 'c', [])
    tooMany.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: true, ____mut: ''},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: true, ____mut: ''},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true, ____mut: ''},
      {_id: 3, name: 'cab', surname: 'bac', _show: true, ____mut: ''}
    ])
  })
})

describe('sortBody', () => {
  it('should sort lexicographically', () => {
    let names = [
      {_id: 0, _show: true, name: 'Andy'},
      {_id: 1, _show: true, name: 'Dooty'},
      {_id: 2, _show: true, name: 'Sooty'},
      {_id: 3, _show: true, name: 'Cooty'}
    ]
    let result = bodyParsing.sortBody(names, 'name', false)
    result.should.eql([
      {_id: 0, _show: true, name: 'Andy'},
      {_id: 3, _show: true, name: 'Cooty'},
      {_id: 1, _show: true, name: 'Dooty'},
      {_id: 2, _show: true, name: 'Sooty'}
    ])
  })

  it('should sort lexicographically in reverse', () => {
    let names = [
      {_id: 0, _show: true, name: 'Andy'},
      {_id: 1, _show: true, name: 'Dooty'},
      {_id: 2, _show: true, name: 'Sooty'},
      {_id: 3, _show: true, name: 'Cooty'}
    ]
    let result = bodyParsing.sortBody(names, 'name', true)
    result.should.eql([
      {_id: 2, _show: true, name: 'Sooty'},
      {_id: 1, _show: true, name: 'Dooty'},
      {_id: 3, _show: true, name: 'Cooty'},
      {_id: 0, _show: true, name: 'Andy'}
    ])
  })

  it('should sort numerically', () => {
    let names = [
      {_id: 1, _show: true, name: 'Dooty', age: 7},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 2, _show: true, name: 'Sooty', age: 1},
      {_id: 0, _show: true, name: 'Andy', age: 3}
    ]
    let result = bodyParsing.sortBody(names, 'age', false)
    result.should.eql([
      {_id: 2, _show: true, name: 'Sooty', age: 1},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 0, _show: true, name: 'Andy', age: 3},
      {_id: 1, _show: true, name: 'Dooty', age: 7}
    ])
  })

  it('should sort numerically in descending order', () => {
    let names = [
      {_id: 1, _show: true, name: 'Dooty', age: 7},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 2, _show: true, name: 'Sooty', age: 1},
      {_id: 0, _show: true, name: 'Andy', age: 3}
    ]
    let result = bodyParsing.sortBody(names, 'age', true)
    result.should.eql([
      {_id: 1, _show: true, name: 'Dooty', age: 7},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 0, _show: true, name: 'Andy', age: 3},
      {_id: 2, _show: true, name: 'Sooty', age: 1}
    ])
  })

  it('should sort numerically in a stable manner', () => {
    let names = [
      {_id: 1, _show: true, name: 'Dooty', age: 7},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 2, _show: true, name: 'Sooty', age: 1},
      {_id: 0, _show: true, name: 'Andy', age: 3}
    ]
    let result = bodyParsing.sortBody(bodyParsing.sortBody(names, 'name', false), 'age', false)
    result.should.eql([
      {_id: 2, _show: true, name: 'Sooty', age: 1},
      {_id: 0, _show: true, name: 'Andy', age: 3},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 1, _show: true, name: 'Dooty', age: 7}
    ])
  })

  it('should sort lexicographically numbers if asked to do so', () => {
    let names = [
      {_id: 1, _show: true, name: 'Dooty', age: 7},
      {_id: 3, _show: true, name: 'Cooty', age: 31},
      {_id: 2, _show: true, name: 'Sooty', age: 10},
      {_id: 0, _show: true, name: 'Andy', age: 30}
    ]
    let result = bodyParsing.sortBody(names, 'age', false, 'lexicographic')
    result.should.eql([
      {_id: 2, _show: true, name: 'Sooty', age: 10},
      {_id: 0, _show: true, name: 'Andy', age: 30},
      {_id: 3, _show: true, name: 'Cooty', age: 31},
      {_id: 1, _show: true, name: 'Dooty', age: 7}
    ])
  })

  it('shold order inside objects', () => {
    let names = [
      {_id: 1, _show: true, person: {name: 'Dooty', age: 7}},
      {_id: 3, _show: true, person: {name: 'Cooty', age: 3}},
      {_id: 2, _show: true, person: {name: 'Sooty', age: 1}},
      {_id: 0, _show: true, person: {name: 'Andy', age: 3}}
    ]
    let result = bodyParsing.sortBody(names, 'person.age', false)
    result.should.eql([
      {_id: 2, _show: true, person: {name: 'Sooty', age: 1}},
      {_id: 3, _show: true, person: {name: 'Cooty', age: 3}},
      {_id: 0, _show: true, person: {name: 'Andy', age: 3}},
      {_id: 1, _show: true, person: {name: 'Dooty', age: 7}}
    ])
  })

  it('shold order with custom functions', () => {
    function sharpieCompare (sharp1, sharp2) {
      let color1 = sharp1.color
      let color2 = sharp2.color
      function col2num (c) {
        switch (c) {
          case 'red':
            return 1
          case 'green':
            return 2
          case 'blue':
            return 3
          default:
            return 0
        }
      }
      return col2num(color1) - col2num(color2)
    }
    let sharpies = [
      {_id: 0, _show: true, sharpie: { color: 'red' }},
      {_id: 1, _show: true, sharpie: { color: 'blue' }},
      {_id: 2, _show: true, sharpie: { color: 'green' }}
    ]
    let result = bodyParsing.sortBody(sharpies, 'sharpie', false, sharpieCompare)
    result.should.eql([
      {_id: 0, _show: true, sharpie: { color: 'red' }},
      {_id: 2, _show: true, sharpie: { color: 'green' }},
      {_id: 1, _show: true, sharpie: { color: 'blue' }}
    ])
  })

  it('shold order with custom functions in reverse', () => {
    function sharpieCompare (sharp1, sharp2) {
      let color1 = sharp1.color
      let color2 = sharp2.color
      function col2num (c) {
        switch (c) {
          case 'red':
            return 1
          case 'green':
            return 2
          case 'blue':
            return 3
          default:
            return 0
        }
      }
      return col2num(color1) - col2num(color2)
    }
    let sharpies = [
      {_id: 0, _show: true, sharpie: { color: 'red' }},
      {_id: 1, _show: true, sharpie: { color: 'blue' }},
      {_id: 2, _show: true, sharpie: { color: 'green' }}
    ]
    let result = bodyParsing.sortBody(sharpies, 'sharpie', true, sharpieCompare)
    result.should.eql([
      {_id: 1, _show: true, sharpie: { color: 'blue' }},
      {_id: 2, _show: true, sharpie: { color: 'green' }},
      {_id: 0, _show: true, sharpie: { color: 'red' }}
    ])
  })
})

describe('deriveBody', () => {
  it('should parse dot notation', () => {
    let raw = [
      { salutations: { hello: 'hi', 'to the': 'world' } },
      { erbs: 'rosmarine' },
      { erbs: { 'light hearted': 'lavander', hard: 'basil' } }
    ]
    let result = bodyParsing.deriveBody(raw, ['salutations.hello'])
    result.should.eql([
      { salutations: { hello: 'hi', 'to the': 'world' }, 'salutations.hello': 'hi' },
      { erbs: 'rosmarine', 'salutations.hello': undefined },
      { erbs: { 'light hearted': 'lavander', hard: 'basil' }, 'salutations.hello': undefined }
    ])
  })

  it('should add derive columns', () => {
    let raw = [
      { salutations: { hello: 'hi', to: 'world' } },
      { erbs: 'rosmarine' },
      { erbs: { 'light hearted': 'lavander', hard: 'basil' } }
    ]
    let result = bodyParsing.deriveBody(raw, ['salutations.hello+salutations.to'])
    result[0]['salutations.hello+salutations.to'].should.eql({ 'salutations.hello': 'hi', 'salutations.to': 'world' })
  })

  it('should add derive columns 2', () => {
    let raw = [
      { salutations: { hello: 'hi', to: 'world' } },
      { erbs: 'rosmarine' },
      { erbs: { 'light hearted': 'lavander', hard: 'basil' } }
    ]
    let result = bodyParsing.deriveBody(raw, ['erbs', 'erbs.light hearted'])
    expect(result[0]['erbs.light hearted']).to.be.undefined
    result[1].erbs.should.equal('rosmarine')
    expect(result[1]['erbs.light hearted']).to.be.undefined
    result[2].erbs.should.eql({ 'light hearted': 'lavander', hard: 'basil' })
    result[2]['erbs.light hearted'].should.equal('lavander')
  })

  it('should add derive columns 3', () => {
    let raw = [
      { salutations: { hello: 'hi', to: 'world' } },
      { erbs: 'rosmarine' },
      { erbs: { 'light hearted': 'lavander', hard: 'basil' } }
    ]
    let result = bodyParsing.deriveBody(raw, ['salutations.hello+'])
    result[0]['salutations.hello+']['salutations.hello'].should.equal('hi')
  })
})

/* describe('projectedBody', () => {
  it('should project the body ignoring columns that start with underscore', () => {
    let finalBody = [
      { final: 'this is final', _id: 'final id', '_final field': 'final hidden field', finallyVisible: 'hello' }
    ]
    let result = bodyParsing.projectedBody(finalBody, ['finallyVisible'])
    result.should.eql([
      { _id: 'final id', '_final field': 'final hidden field', finallyVisible: 'hello' }
    ])
  })
})*/
