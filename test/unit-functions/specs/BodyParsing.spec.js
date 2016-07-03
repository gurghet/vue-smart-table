/**
 * Created by gurghet on 30/06/16.
 */
/* global describe, it, xit */

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

  it('should add missing ids', () => {
    let swissCheese = [
      {name: 'camamber', id: '38'},
      {colour: 'spotted'},
      {name: 'brie', nationality: 'from Brie', id: '389'}
    ]
    let result = bodyParsing.bodyWithIds(swissCheese, 'id')
    result.should.eql([
      {name: 'camamber', id: '38'},
      {colour: 'spotted', id: '_smart_0'},
      {name: 'brie', nationality: 'from Brie', id: '389'}
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
      {id: '38'},
      {id: '38-0'},
      {id: '39'}
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
      {id: '38'},
      {id: '38-0'},
      {id: '38-0-0'}
    ])
  })

  it('should turn spaces in columns into dashes', () => {
    let foo = [
      {_id: 0, 'foo bar': 'excelsior'},
      {_id: '0', 'bar baz': 'robustus'}
    ]
    let result = bodyParsing.bodyWithIds(foo, '_id')
    result.should.eql([
      {_id: 0, 'foo-bar': 'excelsior'},
      {_id: '0', 'bar-baz': 'robustus'}
    ])
  })
})

describe('filteredBody', () => {
  it('should perform a global filtering', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa'},
      {_id: 1, name: 'bbb', surname: 'bbb'},
      {_id: 2, name: 'aba', surname: 'ccc'},
      {_id: 3, name: 'cab', surname: 'bac'}
    ]
    let result = bodyParsing.filteredBody(tooMany, 'c')
    result.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true},
      {_id: 3, name: 'cab', surname: 'bac', _show: true}
    ])
  })

  it('should perform a global filtering with numbers, converting the into text', () => {
    let numbers = [
      {_id: 0, name: 'aaa', age: 34},
      {_id: 1, name: 'bbb', age: 3}
    ]
    let result = bodyParsing.filteredBody(numbers, '3')
    result.should.eql([
      {_id: 0, name: 'aaa', age: 34, _show: true},
      {_id: 1, name: 'bbb', age: 3, _show: true}
    ])
  })

  xit('should detect when the scoped column is only numbers', () => {
    let numbers = [
      {_id: 0, name: 'aaa', age: 34},
      {_id: 1, name: 'bbb', age: 3}
    ]
    let result = bodyParsing.filteredBody(numbers, '3')
    result.should.eql([
      {_id: 0, name: 'aaa', age: 34, _show: false},
      {_id: 1, name: 'bbb', age: 3, _show: true}
    ])
  })

  xit('should detect when the scoped column is only numbers even is some are strings', () => {
    let numbers = [
      {_id: 0, name: 'aaa', age: 34},
      {_id: 1, name: 'bbb', age: '3'}
    ]
    let result = bodyParsing.filteredBody(numbers, '3')
    result.should.eql([
      {_id: 0, name: 'aaa', age: 34, _show: false},
      {_id: 1, name: 'bbb', age: '3', _show: true}
    ])
  })

  xit('should detect when the scoped column is not only numbers', () => {
    let numbers = [
      {_id: 0, name: 'aaa', age: 34},
      {_id: 1, name: 'bbb', age: 'a3'}
    ]
    let result = bodyParsing.filteredBody(numbers, '3')
    result.should.eql([
      {_id: 0, name: 'aaa', age: 34, _show: true},
      {_id: 1, name: 'bbb', age: 'a3', _show: true}
    ])
  })

  it('should perform scoped filtering', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa'},
      {_id: 1, name: 'bbb', surname: 'bbb'},
      {_id: 2, name: 'aba', surname: 'ccc'},
      {_id: 3, name: 'cab', surname: 'bac'}
    ]
    let result = bodyParsing.filteredBody(tooMany, 'c', 'name')
    result.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false},
      {_id: 2, name: 'aba', surname: 'ccc', _show: false},
      {_id: 3, name: 'cab', surname: 'bac', _show: true}
    ])
  })

  it('should perform a second pass of filtering', () => {
    let tooMany = [
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false},
      {_id: 2, name: 'aba', surname: 'ccc', _show: false},
      {_id: 3, name: 'cab', surname: 'bac', _show: true}
    ]
    let result = bodyParsing.filteredBody(tooMany, 'c', 'surname')
    result.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false},
      {_id: 1, name: 'bbb', surname: 'bbb', _show: false},
      {_id: 2, name: 'aba', surname: 'ccc', _show: false},
      {_id: 3, name: 'cab', surname: 'bac', _show: true}
    ])
  })

  it('should perform filtering even with undefined columns', () => {
    let missing = [
      {_id: 0, name: 'aaa', surname: 'aaa'},
      {_id: 1, surname: 'bbb'},
      {_id: 2, name: 'aba', surname: 'ccc'},
      {_id: 3, name: 'cab'}
    ]
    let result = bodyParsing.filteredBody(missing, 'c')
    result.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false},
      {_id: 1, surname: 'bbb', _show: false},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true},
      {_id: 3, name: 'cab', _show: true}
    ])
  })

  it('should perform filtering even with undefined columns are filtered specifically', () => {
    let missing = [
      {_id: 0, name: 'aaa', surname: 'aaa'},
      {_id: 1, surname: 'bbb'},
      {_id: 2, name: 'aba', surname: 'ccc'},
      {_id: 3, name: 'cab'}
    ]
    let result = bodyParsing.filteredBody(missing, 'c', 'surname')
    result.should.eql([
      {_id: 0, name: 'aaa', surname: 'aaa', _show: false},
      {_id: 1, surname: 'bbb', _show: false},
      {_id: 2, name: 'aba', surname: 'ccc', _show: true},
      {_id: 3, name: 'cab', _show: false}
    ])
  })

  it('should accept dot notation for the scoped column', () => {
    let intricate = [
      {_id: 0, name: { first: 'bob', last: 'marley' }},
      {_id: 1, name: { first: 'bib', last: 'mirley' }}
    ]
    let result = bodyParsing.filteredBody(intricate, 'i', 'name.first')
    result.should.eql([
      {_id: 0, name: { first: 'bob', last: 'marley' }, _show: false},
      {_id: 1, name: { first: 'bib', last: 'mirley' }, _show: true}
    ])
  })

  it('should accept dot notation for the scoped column (missing col case)', () => {
    let intricateMissing = [
      {_id: 0, name: { last: 'marley' }},
      {_id: 1, name: { first: 'bib', last: 'mirley' }}
    ]
    let result = bodyParsing.filteredBody(intricateMissing, 'i', 'name.first')
    result.should.eql([
      {_id: 0, name: { last: 'marley' }, _show: false},
      {_id: 1, name: { first: 'bib', last: 'mirley' }, _show: true}
    ])
  })

  it('should accept custom filter functions', () => {
    function filter (val) {
      return val > 2 && val < 4
    }
    let excel = [
      {_id: 0, number: 1},
      {_id: 1, number: 2},
      {_id: 2, number: 3},
      {_id: 3, number: 4}
    ]
    let result = bodyParsing.filteredBody(excel, filter, 'number')
    result.should.eql([
      {_id: 0, number: 1, _show: false},
      {_id: 1, number: 2, _show: false},
      {_id: 2, number: 3, _show: true},
      {_id: 3, number: 4, _show: false}
    ])
  })

  it('should accept custom filter functions in a second pass', () => {
    function filter (val) {
      return val > 2 && val < 4
    }
    let excel = [
      {_id: 0, number: 1, _show: true},
      {_id: 1, number: 2, _show: true},
      {_id: 2, number: 3, _show: false},
      {_id: 3, number: 4, _show: true}
    ]
    let result = bodyParsing.filteredBody(excel, filter, 'number')
    result.should.eql([
      {_id: 0, number: 1, _show: false},
      {_id: 1, number: 2, _show: false},
      {_id: 2, number: 3, _show: false},
      {_id: 3, number: 4, _show: false}
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
    let result = () => bodyParsing.filteredBody(excel, filter)
    result.should.throw(Error)
  })
})

describe('sortedBody', () => {
  it('should sort lexicographically', () => {
    let names = [
      {_id: 0, _show: true, name: 'Andy'},
      {_id: 1, _show: true, name: 'Dooty'},
      {_id: 2, _show: true, name: 'Sooty'},
      {_id: 3, _show: true, name: 'Cooty'}
    ]
    let result = bodyParsing.sortedBody(names, 'name', false)
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
    let result = bodyParsing.sortedBody(names, 'name', true)
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
    let result = bodyParsing.sortedBody(names, 'age', false)
    result.should.eql([
      {_id: 2, _show: true, name: 'Sooty', age: 1},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 0, _show: true, name: 'Andy', age: 3},
      {_id: 1, _show: true, name: 'Dooty', age: 7}
    ])
  })

  it('should sort numerically in a stable manner', () => {
    let names = [
      {_id: 1, _show: true, name: 'Dooty', age: 7},
      {_id: 3, _show: true, name: 'Cooty', age: 3},
      {_id: 2, _show: true, name: 'Sooty', age: 1},
      {_id: 0, _show: true, name: 'Andy', age: 3}
    ]
    let result = bodyParsing.sortedBody(bodyParsing.sortedBody(names, 'name', false), 'age', false)
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
    let result = bodyParsing.sortedBody(names, 'age', false, 'lexicographic')
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
    let result = bodyParsing.sortedBody(names, 'person.age', false)
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
    let result = bodyParsing.sortedBody(sharpies, 'sharpie', false, sharpieCompare)
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
    let result = bodyParsing.sortedBody(sharpies, 'sharpie', true, sharpieCompare)
    result.should.eql([
      {_id: 1, _show: true, sharpie: { color: 'blue' }},
      {_id: 2, _show: true, sharpie: { color: 'green' }},
      {_id: 0, _show: true, sharpie: { color: 'red' }}
    ])
  })
})
