import $ from 'jquery';

const slice = Array.prototype.slice;

const partial = function (func) {
  const boundArgs = slice.call(arguments, 1);

  return function () {
    const args = boundArgs.concat(slice.call(arguments));
    return func.apply(this, args);
  };
};

const hasProperty = function (actual, expected) {
  return (expected === undefined ? actual !== undefined : actual === expected);
};

const hasCss = function (el, css) {
  let prop;
  let value;
  const $el = $(el);

  for (prop in css) {
    if (css.hasOwnProperty(prop)) {
      value = css[prop];
      if (value === 'auto' && $el.get(0).style[prop] === 'auto') {
        continue;
      }
      if ($el.css(prop) !== value) {
        return false;
      }
    }
  }
  return true;
};

const passes = function (a, b) {
  return (!a ^ !b);
};

const compares = function (func) {
  return {
    compare: partial(func, false),
    negativeCompare: partial(func, true)
  };
};

module.exports = {
  toExist: function () {
    return compares(function (not, el) {
      const actual = $(el).length;
      return {
        pass: passes(actual > 0, not),
        message: `Expected element${not ? ' not' : ''} to exist`
      };
    });
  },

  toHaveLength: function () {
    return compares(function (not, el, expected) {
      const actual = $(el).length;
      return {
        pass: passes(actual === expected, not),
        message: `Expected element${not ? ' not' : ''} to have length ${expected}, but had ${actual}`
      };
    });
  },

  toHaveId: function () {
    return compares(function (not, el, expected) {
      const actual = $(el).attr('id');
      return {
        pass: passes(actual === expected, not),
        message: `Expected element${not ? ' not' : ''} to have ID '${expected}', but had '${actual}'`
      };
    });
  },

  toHaveClass: function () {
    return compares(function (not, el, expected) {
      const actual = $(el).attr('class');
      return {
        pass: passes($(el).hasClass(expected), not),
        message: `Expected element${not ? ' not' : ''} to have class '${expected}', but had '${actual}'`
      };
    });
  },

  toHaveTag: function () {
    return compares(function (not, el, expected) {
      const actual = $(el).prop('tagName').toLowerCase();
      expected = expected.toLowerCase();
      return {
        pass: passes(actual === expected, not),
        message: `Expected element${not ? ' not' : ''} to have tag '${expected}', but had '${actual}'`
      };
    });
  },

  toHaveAttr: function () {
    return compares(function (not, el, attr, expected) {
      const actual = $(el).attr(attr);
      const addendum = (expected !== undefined ? (` with value '${expected}'`) : '');
      return {
        pass: passes(hasProperty(actual, expected), not),
        message: `Expected element${not ? ' not' : ''} to have attribute '${attr}'${addendum}, but had '${actual}'`
      };
    });
  },

  toHaveProp: function () {
    return compares(function (not, el, prop, expected) {
      const actual = $(el).prop(prop);
      const addendum = (expected !== undefined ? (` with value '${expected}'`) : '');
      return {
        pass: passes(hasProperty(actual, expected), not),
        message: `Expected element${not ? ' not' : ''} to have property '${prop}'${addendum}, but had '${actual}'`
      };
    });
  },

  toHaveText: function () {
    return compares(function (not, el, expected) {
      const actual = $.trim($(el).text());
      if (expected && $.isFunction(expected.test)) {
        return {
          pass: passes(expected.test(actual), not),
          message: `Expected element${not ? ' not' : ''} to have text matching '${expected}', but had '${actual}'`
        };
      }
      else {
        return {
          pass: passes(actual.indexOf(expected) !== -1, not),
          message: `Expected element${not ? ' not' : ''} to have text '${expected}', but had '${actual}'`
        };
      }
    });
  },

  toHaveData: function () {
    return compares(function (not, el, data, expected) {
      const actual = $(el).data(data);
      const addendum = (expected !== undefined ? (` with value '${expected}'`) : '');
      return {
        pass: passes(hasProperty(actual, expected), not),
        message: `Expected element${not ? ' not' : ''} to have data '${data}'${addendum}, but had '${actual}'`
      };
    });
  },

  toHaveValue: function () {
    return compares(function (not, el, expected) {
      const actual = $(el).val();
      return {
        pass: passes(actual === expected, not),
        message: `Expected element${not ? ' not' : ''} to have value '${expected}', but had '${actual}'`
      };
    });
  },

  toHaveCss: function () {
    return compares(function (not, el, expected) {
      return {
        pass: passes(hasCss(el, expected), not),
        message: `Expected element${not ? ' not' : ''} to have CSS ${jasmine.pp(expected)}`
      };
    });
  },

  toBeChecked: function () {
    return compares(function (not, el) {
      return {
        pass: passes($(el).is(':checked'), not),
        message: `Expected element${not ? ' not' : ''} to be checked`
      };
    });
  },

  toBeDisabled: function () {
    return compares(function (not, el) {
      return {
        pass: passes($(el).is(':disabled'), not),
        message: `Expected element${not ? ' not' : ''} to be disabled`
      };
    });
  },

  toBeEmpty: function () {
    return compares(function (not, el) {
      return {
        pass: passes($(el).is(':empty'), not),
        message: `Expected element${not ? ' not' : ''} to be empty`
      };
    });
  },

  toBeHidden: function () {
    return compares(function (not, el) {
      return {
        pass: passes($(el).is(':hidden'), not),
        message: `Expected element${not ? ' not' : ''} to be hidden`
      };
    });
  },

  toBeSelected: function () {
    return compares(function (not, el) {
      return {
        pass: passes($(el).is(':selected'), not),
        message: `Expected element${not ? ' not' : ''} to be selected`
      };
    });
  },

  toBeVisible: function () {
    return compares(function (not, el) {
      return {
        pass: passes($(el).is(':visible'), not),
        message: `Expected element${not ? ' not' : ''} to be visible`
      };
    });
  },

  toBeFocused: function () {
    return compares(function (not, el) {
      el = $(el).get(0);
      return {
        pass: passes(el === el.ownerDocument.activeElement, not),
        message: `Expected element${not ? ' not' : ''} to be focused`
      };
    });
  },

  toBeInDom: function () {
    return compares(function (not, el) {
      el = $(el).get(0);
      return {
        pass: passes($.contains(document.documentElement, el), not),
        message: `Expected element${not ? ' not' : ''} to be attached to the DOM`
      };
    });
  },

  toBeMatchedBy: function () {
    return compares(function (not, el, expected) {
      const actual = $(el).filter(expected).length;
      return {
        pass: passes(actual > 0, not),
        message: `Expected element${not ? ' not' : ''} to be matched by '${expected}'`
      };
    });
  },

  toHaveDescendant: function () {
    return compares(function (not, el, selector) {
      const actual = $(el).find(selector).length;
      return {
        pass: passes(actual > 0, not),
        message: `Expected element${not ? ' not' : ''} to contain child '${selector}'`
      };
    });
  },

  toHaveDescendantWithText: function () {
    return compares(function (not, el, selector, expected) {
      const actual = $.trim($(el).find(selector).text());
      if (expected && $.isFunction(expected.test)) {
        return {
          pass: passes(expected.test(actual), not),
          message: `Expected element${not ? ' not' : ''} to have descendant '${selector}' with text matching '${expected}', but had '${actual}'`
        };
      }
      else {
        return {
          pass: passes(actual.indexOf(expected) !== -1, not),
          message: `Expected element${not ? ' not' : ''} to have descendant '${selector}' with text '${expected}', but had '${actual}'`
        };
      }
    });
  }
};
