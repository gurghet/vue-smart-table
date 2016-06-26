# chai-dom

[![Build Status](https://secure.travis-ci.org/nathanboktae/chai-dom.png)](http://travis-ci.org/nathanboktae/chai-dom)

chai-dom is an extension to the [chai](http://chaijs.com/) assertion library that
provides a set of assertions when working with the DOM (specifically [HTMLElement][] and [NodeList][])

Forked from [chai-jquery](https://github.com/chaijs/chai-jquery) to use for those of us freed of jQuery's baggage.

## Assertions

### `attr(name[, value])`
### `attribute(name[, value])`

Assert that the [HTMLElement][] has the given attribute, using [`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute).
Optionally, assert a particular value as well. The return value is available for chaining.

```js
document.getElementById('header').should.have.attr('foo')
expect(document.querySelector('main article')).to.have.attribute('foo', 'bar')
expect(document.querySelector('main article')).to.have.attr('foo').match(/bar/)
```

### `class(className)`
Assert that the [HTMLElement][] has the given class, using [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).

```js
document.getElementsByName('bar').should.have.class('foo')
expect(document.querySelector('main article')).to.have.class('foo')
```

### `id(id)`
Assert that the [HTMLElement][] has the given id.

```js
document.querySelector('section').should.have.id('#main')
expect(document.querySelector('section')).to.have.id('foo')
```

### `html(html)`
Assert that the html of the [HTMLElement][] is equal to or contains the given html.

```js
document.querySelector('.name').should.have.html('<em>John Doe</em>')
expect(document.querySelector('#title')).to.have.html('Chai Tea')
```
```js
document.querySelector('.name').should.contain.html('<span>Doe</span>')
expect(document.querySelector('#title')).to.contain.html('<em>Tea</em>')
```

### `text(text)`
Assert that the text of the [HTMLElement][] or combined text of the [NodeList][] is equal to or contains the given text, using [`textContent`][].

```js
document.querySelector('.name').should.have.text('John Doe')
expect(document.querySelector('#title')).to.have.text('Chai Tea')
document.querySelectorAll('ul li').should.have.text('JohnJaneJessie')
```

```js
document.querySelector('.name').should.contain.text('John')
expect(document.querySelector('#title')).to.contain.text('Chai')
document.querySelectorAll('ul li').should.contain.text('Jane')
```

### `text(text[])`
Assert that the [`textContent`][] of the [NodeList][] children deep equal those text, or when using the contains flag, all the text items are somewhere in the [NodeList][].

```js
document.querySelectorAll('.name').should.have.text(['John Doe', 'Jane'])
expect(document.querySelectorAll('ul li')).to.have.text(['John', 'Jane', 'Jessie'])
```

```js
document.querySelectorAll('.name').should.contain.text(['John Doe'])
expect(document.querySelectorAll('ul li')).to.contain.text(['John', 'Jessie'])
```

### `value(value)`
Assert that the [HTMLElement][] has the given value

```js
document.querySelector('.name').should.have.value('John Doe')
expect(document.querySelector('input.year')).to.have.value('2012')
```

### `empty`
Assert that at the [HTMLElement][] or [NodeList][] has no child nodes. If the object asserted against is niether of those, the original implementation will be called.

```js
document.querySelector('.empty').should.be.empty
expect(document.querySelector('section')).not.to.be.empty
```

### `length(n)`
Assert that at the [HTMLElement][] or [NodeList][] has exactly `n` child nodes. If the object asserted against is niether of those, the original implementation will be called.

```js
document.querySelector('ul').should.have.length(2)
document.querySelector('li').should.have.length(2)
expect(document.querySelector('ul')).not.to.have.length(3)
```

### `exist`
Assert that the [NodeList][] is not empty. If the object asserted
against is not a [NodeList][], the original implementation will be called.

```js
document.querySelectorAll('dl dd').should.exist
expect(document.querySelectorAll('.nonexistent')).not.to.exist
```

### `match(selector)`
Assert that the selection matches an [HTMLElement][] or all elements in a [NodeList][], using [`matches`](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches). If the object asserted against is neither of those, the original implementation will be called.

Note `matches` is DOM Level 4, so you may [need a polyfill](https://github.com/WebReflection/dom4) for it.

```js
document.querySelectorAll('input').should.match('[name="bar"]')
expect(document.getElementById('empty')).to.match('.disabled')
```

### `contain(selector or element)`
Assert that the [HTMLElement][] contains the given element, using [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll) for selector strings or using [`contains`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains) for elements. If the object asserted against is not an [HTMLElement][], or if `contain` is not called as a function, the original
implementation will be called.

```js
document.querySelector('section').should.contain('ul.items')
document.querySelector('section').should.contain(document.querySelector('section div'))
expect(document.querySelector('#content')).to.contain('p')
```

## Installation

### npm

```
npm install chai-dom
```

### bower

```
bower install chai-dom
```

## Usage

### CommonJS

```javascript
var chai = require('chai')
chai.use(require('chai-com'))
```

### AMD

```javascript
require(['chai', 'chai-dom'], function(chai, chaiDom) {
  chai.use(chaiDom)
})
```

### Global

```html
<script src="chai.js"></script>
<script src="chai-dom.js"></script>
```

Use the assertions with chai's `expect` or `should` assertions.

## Contributing

To run the test suite, run `npm install` (requires
[Node.js](http://nodejs.org/) to be installed on your system), and run `npm test` or open
`test/index.html` in your web browser.

## License

MIT License (see the LICENSE file)

[HTMLElement]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[NodeList]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[textContent]: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent