# Jasmine jQuery Matchers [![Version](https://img.shields.io/npm/v/jasmine-jquery-matchers.svg)](https://www.npmjs.com/package/jasmine-jquery-matchers) [![Build Status](https://img.shields.io/travis/unindented/jasmine-jquery-matchers.svg)](http://travis-ci.org/unindented/jasmine-jquery-matchers) [![Dependency Status](https://img.shields.io/gemnasium/unindented/jasmine-jquery-matchers.svg)](https://gemnasium.com/unindented/jasmine-jquery-matchers) [![Coverage Status](https://img.shields.io/coveralls/unindented/jasmine-jquery-matchers.svg)](https://coveralls.io/r/unindented/jasmine-jquery-matchers)

Adds a set of custom matchers for HTML and CSS related checks, using jQuery.

The matchers provide custom error messages that try to be as helpful as possible, so that when things fail you can quickly pinpoint the problem.


## Installation

If you are using `npm` to manage your dependencies:

```sh
$ npm install --save-dev jasmine-jquery-matchers
```

If you are using `bower`:

```sh
$ bower install --save-dev jasmine-jquery-matchers
```


## Usage

Load these matchers in a `beforeEach` block, and then use them like any other matcher:

```js
expect(this.$el).toHaveText('Hello world!');
```


### AMD/CommonJS

If you are using AMD or CommonJS, `require` normally:

```js
var matchers = require('jasmine-jquery-matchers');

describe('My suite', function () {
  beforeEach(function () {
    jasmine.addMatchers(matchers);
  });

  it('passes if the element has the specified class', function () {
    expect($('<div class="some-class"></div>')).toHaveClass('some-class');
  });
});
```

### Global

Otherwise, use `window['jasmine-jquery-matchers']`:

```js
var matchers = window['jasmine-jquery-matchers'];

describe('My suite', function () {
  beforeEach(function () {
    jasmine.addMatchers(matchers);
  });

  it('passes if the element has the specified class', function () {
    expect($('<div class="some-class"></div>')).toHaveClass('some-class');
  });
});
```

### List of matchers

* toExist
* toHaveLength
* toHaveId
* toHaveClass
* toHaveTag
* toHaveAttr
* toHaveProp
* toHaveText
* toHaveData
* toHaveValue
* toHaveCss
* toBeChecked
* toBeDisabled
* toBeEmpty
* toBeHidden
* toBeSelected
* toBeVisible
* toBeFocused
* toBeInDom
* toBeMatchedBy
* toHaveDescendant
* toHaveDescendantWithText

If you want to see usage examples, look at [test/specs/matchers.js](https://raw.githubusercontent.com/unindented/jasmine-jquery-matchers/master/test/specs/matchers.js)


## Meta

* Code: `git clone git://github.com/unindented/jasmine-jquery-matchers.git`
* Home: <https://github.com/unindented/jasmine-jquery-matchers/>


## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2015 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
