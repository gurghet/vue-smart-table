describe('DOM assertions', function() {
  var inspect,
      tempEl = document.createElement('div'),
      parse = function(str) {
        tempEl.innerHTML = str
        return tempEl.children[0]
      }

  chai.use(function(chai, utils) {
    inspect = utils.objDisplay

    chai.Assertion.addMethod('fail', function(message) {
      var obj = utils.flag(this, 'object')

      new chai.Assertion(obj).is.a('function')

      try {
        obj()
      } catch (err) {
        this.assert(
          err instanceof chai.AssertionError
          , 'expected #{this} to fail, but it threw ' + inspect(err))
        this.assert(
          err.message === message
          , 'expected #{this} to fail with ' + inspect(message) + ', but got ' + inspect(err.message))
        return
      }

      this.assert(false, 'expected #{this} to fail')
    })
  })

  describe('attr', function() {
    var subject = parse('<div name="foo"></div>')

    describe('when only attribute name is provided', function() {
      it('passes when the element has the attribute', function() {
        subject.should.have.attr('name')
      })

      it('passes negated when the element does not have the attribute', function() {
        subject.should.not.have.attribute('bar')
      })

      it('fails when the element does not have the attribute', function() {
        (function() {
          subject.should.have.attr('bar')
        }).should.fail('expected div[name="foo"] to have an attribute \'bar\'')
      })

      it('fails negated when the element has the attribute', function() {
        (function() {
          subject.should.not.have.attribute('name')
        }).should.fail('expected div[name="foo"] not to have an attribute \'name\'')
      })
    })

    describe('when only attribute name is provided', function() {
      var attrWithNoValue = parse('<div disabled></div>')
      it('passes when the element has the attribute', function() {
        attrWithNoValue.should.have.attr('disabled')
      })

      it('passes negated when the element does not have the attribute', function() {
        attrWithNoValue.should.not.have.attribute('bar')
      })

      it('fails when the element does not have the attribute', function() {
        (function() {
          attrWithNoValue.should.have.attr('bar')
        }).should.fail('expected div[disabled] to have an attribute \'bar\'')
      })

      it('fails negated when the element has the attribute', function() {
        (function() {
          attrWithNoValue.should.not.have.attribute('disabled')
        }).should.fail('expected div[disabled] not to have an attribute \'disabled\'')
      })
    })

    describe('when attribute name and value are provided', function() {
      it('passes when the element has the attribute with the given value', function() {
        subject.should.have.attribute('name', 'foo')
      })

      it('passes negated when the element does not have the attribute', function() {
        subject.should.not.have.attr('bar', 'foo')
      })

      it('passes negated when the element has the attribute with a different value', function() {
        subject.should.not.have.attr('name', 'bar')
      })

      it('fails when the element does not have the attribute', function() {
        (function() {
          subject.should.have.attr('bar', 'foo')
        }).should.fail('expected div[name="foo"] to have an attribute \'bar\'')
      })

      it('fails when the element has the attribute with a different value', function() {
        (function() {
          subject.should.have.attribute('name', 'bar')
        }).should.fail('expected div[name="foo"] to have an attribute \'name\' with the value \'bar\', but the value was \'foo\'')
      })

      it('fails negated when the element has the attribute with the given value', function() {
        (function() {
          subject.should.not.have.attr('name', 'foo')
        }).should.fail('expected div[name="foo"] not to have an attribute \'name\' with the value \'foo\'')
      })
    })

    it('chains', function() {
      subject.should.have.attr('name').equal('foo')
    })
  })

  describe('class', function() {
    var subject = parse('<div class="foo shazam"></div>')

    it('passes when the element has the class', function() {
      subject.should.have.class('foo')
    })

    it('passes negated when the element does not have the class', function() {
      subject.should.not.have.class('bar')
    })

    it('fails when the element does not have the class', function() {
      (function() {
        subject.should.have.class('bar')
      }).should.fail('expected div.foo.shazam to have class \'bar\'')
    })

    it('fails negated when the element has the class', function() {
      (function() {
        subject.should.not.have.class('foo')
      }).should.fail('expected div.foo.shazam not to have class \'foo\'')
    })
  })

  describe('id', function() {
    var subject = parse('<div id="foo" class="yum" required disabled="disabled"></div>')

    it('passes when the element has the id', function() {
      subject.should.have.id('foo')
    })

    it('passes negated when the element does not have the id', function() {
      subject.should.not.have.id('bar')
    })

    it('passes negated when the element does not have an id', function() {
      document.createElement('div').should.not.have.id('bar')
    })

    it('fails when the element does not have the id', function() {
      (function() {
        subject.should.have.id('bar')
      }).should.fail('expected div#foo.yum[required][disabled="disabled"] to have id \'bar\'')
    })

    it('fails negated when the element has the id', function() {
      (function() {
        subject.should.not.have.id('foo')
      }).should.fail('expected div#foo.yum[required][disabled="disabled"] not to have id \'foo\'')
    })

    it('fails when the element does not have an id', function() {
      var subject = parse('<div></div>');
      (function() {
        subject.should.have.id('foo')
      }).should.fail('expected div to have id \'foo\'')
    })
  })

  describe('html', function() {
    var subject = parse('<section>A <span>span</span></section>')

    it('passes when the HTML matches', function() {
      subject.should.have.html('A <span>span</span>')
    })

    it('passes negated when the HTML doesn\'t match', function() {
      subject.should.not.have.html('<span>div</span>')
    })

    it('fails when the HTML doesn\'t match', function() {
      (function() {
        subject.should.have.html('<span>div</span>')
      }).should.fail('expected section to have HTML \'<span>div</span>\', but the HTML was \'A <span>span</span>\'')
    })

    it('fails negated when the HTML matches', function() {
      (function() {
        subject.should.not.have.html('A <span>span</span>')
      }).should.fail('expected section not to have HTML \'A <span>span</span>\'')
    })

    it('passes when the HTML contains', function() {
      subject.should.contain.html('<span>span</span>')
    })

    it('passes negated when the HTML doesn\'t contain', function() {
      subject.should.not.contain.html('<span>div</span>')
    })

    it('fails when the HTML doesn\'t contain', function() {
      (function() {
        subject.should.contain.html('<span>div</span>')
      }).should.fail('expected \'A <span>span</span>\' to contain HTML \'<span>div</span>\'')
    })

    it('fails negated when the HTML contains', function() {
      (function() {
        subject.should.not.contain.html('<span>span</span>')
      }).should.fail('expected \'A <span>span</span>\' not to contain HTML \'<span>span</span>\'')
    })
  })

  describe('text', function() {
    describe('against HTMLElement', function() {
      var subject = parse('<div>foo</div>')

      it('passes when the text matches', function() {
        subject.should.have.text('foo')
      })

      it('passes negated when the text doesn\'t match', function() {
        subject.should.not.have.text('bar')
      })

      it('fails when the text doesn\'t match', function() {
        (function() {
          subject.should.have.text('bar')
        }).should.fail('expected div to have text \'bar\', but the text was \'foo\'')
      })

      it('fails negated when the text matches', function() {
        (function() {
          subject.should.not.have.text('foo')
        }).should.fail('expected div not to have text \'foo\'')
      })

      it('passes when the text contains', function() {
        subject.should.contains.text('fo')
      })

      it('passes negated when the text doesn\'t contain', function() {
        subject.should.not.contain.text('bar')
      })

      it('fails when the text doesn\'t contain', function() {
        (function() {
          subject.should.contain.text('bar')
        }).should.fail('expected div to contain \'bar\', but the text was \'foo\'')
      })

      it('fails negated when the text contains', function() {
        (function() {
          subject.should.not.contain.text('fo')
        }).should.fail('expected div not to contain \'fo\', but the text was \'foo\'')
      })
    })

    describe('against NodeList', function() {
      var subject = parse('<div><span> cherry </span><div>banana</div><span> <p>strawberry</p></span> \n<span> &gt; watermelon</span>pineapple</div>').querySelectorAll('div,span,p'),
          textNodes = Array.prototype.map.call(subject, function(el) { return el.textContent })

      describe('given a string', function() {
        var fullText = textNodes.join('')
        it('passes when the combined text of all child nodes match', function() {
          subject.should.have.text(fullText)
        })

        it('passes negated when the combined text of all child nodes does not match', function() {
          subject.should.not.have.text('cherry banana strawberry watermelon pineapple')
        })

        it('fails when the text doesn\'t match', function() {
          (function() {
            subject.should.have.text('watermelon')
          }).should.fail("expected span, div, span, p, span to have text 'watermelon', but the text was '" + fullText + "'")
        })

        it('fails negated when the text matches', function() {
          (function() {
            subject.should.not.have.text(fullText)
          }).should.fail("expected span, div, span, p, span not to have text '" + fullText + "'")
        })

        it('passes when the text contains', function() {
          subject.should.contain.text('strawberry')
        })

        it('passes negated when the text doesn\'t contain', function() {
          subject.should.not.contain.text('raspberry')
        })

        it('fails when the text doesn\'t contain', function() {
          (function() {
            subject.should.contain.text('raspberry')
          }).should.fail("expected span, div, span, p, span to contain 'raspberry', but the text was '" + fullText + "'")
        })

        it('fails negated when the text contains', function() {
          (function() {
            subject.should.not.contain.text('strawberry')
          }).should.fail("expected span, div, span, p, span not to contain 'strawberry', but the text was '" + fullText + "'")
        })
      })

      describe('given an array', function() {
        var joinedText = textNodes.join()
        it('passes when the text deeply equals of all child text nodes', function() {
          subject.should.have.text(textNodes)
        })

        it('passes negated when the text does not deeply equal the child text nodes', function() {
          subject.should.not.have.text(['strawberry', 'cherry', 'banana', 'watermelon'])
        })

        it('fails when the text does not deeply equal the child text nodes', function() {
          (function() {
            subject.should.have.text(['strawberry', 'cherry', 'banana', 'watermelon'])
          }).should.fail("expected span, div, span, p, span to have text 'strawberry,cherry,banana,watermelon', but the text was '" + joinedText + "'")
        })

        it('fails negated when the text deeply equals of all child text nodes', function() {
          (function() {
            subject.should.not.have.text(textNodes)
          }).should.fail("expected span, div, span, p, span not to have text '" + joinedText + "'")
        })

        it('passes when the NodeList contains children with exact texts of all entries', function() {
          subject.should.contain.text(['strawberry', ' cherry '])
        })

        it('passes negated when the NodeList does not contain any child with the exact text node', function() {
          subject.should.not.contain.text(['raspberry', 'cherry', 'watermelon'])
        })

        it('fails when the text does not contain any element', function() {
          (function() {
            subject.should.contain.text(['raspberry'])
          }).should.fail("expected span, div, span, p, span to contain 'raspberry', but the text was '" + joinedText + "'")
        })

        it('fails when the text does not contain all elements', function() {
          (function() {
            subject.should.contain.text(['raspberry', 'strawberry'])
          }).should.fail("expected span, div, span, p, span to contain 'raspberry,strawberry', but the text was '" + joinedText + "'")
        })

        it('fails negated when the text contains some elements', function() {
          (function() {
            subject.should.not.contain.text(['strawberry', 'honeydew'])
          }).should.fail("expected span, div, span, p, span not to contain 'strawberry,honeydew', but the text was '" + joinedText + "'")
        })
      })
    })
  })

  describe('value', function() {
    var subject = parse('<input value="foo">')

    it('passes when the value matches', function() {
      subject.should.have.value('foo')
    })

    it('passes negated when the value doesn\'t match', function() {
      subject.should.not.have.value('bar')
    })

    it('fails when the value doesn\'t match', function() {
      (function() {
        subject.should.have.value('bar')
      }).should.fail('expected input[value="foo"] to have value \'bar\', but the value was \'foo\'')
    })

    it('fails negated when the value matches', function() {
      (function() {
        subject.should.not.have.value('foo')
      }).should.fail('expected input[value="foo"] not to have value \'foo\'')
    })
  })

  describe('exist', function() {
    it('preserves existing behavior on non-NodeList objects', function() {
      ({}).should.exist
      true.should.exist
    })

    var existent, nonexistent

    beforeEach(function() {
      existent = document.querySelectorAll('#mocha')
      nonexistent = document.querySelectorAll('.nonexistent')
    })

    it('passes when the selection isn\'t empty', function() {
      existent.should.exist
    })

    it('passes negated when the selection is empty', function() {
      nonexistent.should.not.exist
    })

    it('fails when the selection is empty', function() {
      (function() {
        nonexistent.should.exist
      }).should.fail('expected an empty NodeList to have nodes')
    })

    it('fails negated when the selection isn\'t empty', function() {
      (function() {
        existent.should.not.exist
      }).should.fail('expected div#mocha to not exist')
    })
  })

  describe('empty', function() {
    it('preserves existing behavior on non-NodeList objects', function() {
      ({}).should.be.empty
    })

    var empty = document.createElement('div')
    var nonempty = parse('<div class="non empty"><span></span></div>')

    it('passes when the elment has no children', function() {
      empty.should.be.empty
    })

    it('passes negated when the elment has children', function() {
      nonempty.should.not.be.empty
    })

    it('fails when the elment has children', function() {
      (function() {
        nonempty.should.be.empty
      }).should.fail('expected div.non.empty to be empty')
    })

    it('fails negated when the elment has no children', function() {
      (function() {
        empty.should.not.be.empty
      }).should.fail('expected div to not be empty')
    })
  })

  describe('length', function() {
    it('preserves existing behavior on arrays', function() {
      [].should.have.length(0);

      (function() {
        [].should.have.length(1)
      }).should.fail('expected [] to have a length of 1 but got 0');
    });

    it('supports an HTMLElement', function() {
      var subject = parse('<ul><li>1</li><li>2</li></ul>');
      subject.should.have.length(2);
      subject.should.not.have.length(3);

      (function() {
        subject.should.not.have.length(2);
      }).should.fail('expected ul to not have 2 children');

      (function() {
        subject.should.have.length(3);
      }).should.fail('expected ul to have 3 children but it had 2 children');
    });

    it('supports a NodeList', function() {
      var subject = parse('<ul><li>1</li><li>2</li></ul>').querySelectorAll('li');
      subject.should.have.length(2);
      subject.should.not.have.length(3);

      (function() {
        subject.should.not.have.length(2);
      }).should.fail('expected li, li to not have 2 children');

      (function() {
        subject.should.have.length(3);
      }).should.fail('expected li, li to have 3 children but it had 2 children')
    })
  })

  describe('match', function() {
    it('preserves existing behavior on strings', function() {
      ('hello').should.match(/ello/)
    })

    var subject = parse('<div id="foo"></div>'), subjectList
    before(function() {
      subjectList = document.querySelectorAll('body')
    })

    it('passes when the selection matches the given selector', function() {
      subject.should.match('#foo')
      subjectList.should.match('body')
    })

    it('passes negated when the selection does not match the given selector', function() {
      subject.should.not.match('#bar')
      subjectList.should.not.match('#bar')
    })

    it('passes negated when the NodeList is empty', function() {
      document.querySelectorAll('.nonexistent').should.not.match('.foo')
    })

    it('fails when the selection does not match the given selector', function() {
      (function() {
        subject.should.match('#bar')
      }).should.fail('expected div#foo to match \'#bar\'')
      ;(function() {
        subjectList.should.match('#bar')
      }).should.fail('expected body to match \'#bar\'')
    })

    it('fails negated when the selection matches the given selector', function() {
      (function() {
        subject.should.not.match('#foo')
      }).should.fail('expected div#foo to not match \'#foo\'')
      ;(function() {
        subjectList.should.not.match('body')
      }).should.fail('expected body to not match \'body\'')
    })
  })

  describe('contain', function() {
    it('preserves existing behavior on arrays and strings', function() {
      'example text'.should.contain('example')
      'foo'.should.not.contain('bar');
      ({
        foo: 1,
        bar: 2
      }).should.contain.keys('foo');

      (function() {
        'foo'.should.contain('bar')
      }).should.fail('expected \'foo\' to include \'bar\'');

      (function() {
        'foo'.should.not.contain('bar').and.not.contain('foo')
      }).should.fail('expected \'foo\' to not include \'foo\'')
    })

    describe('text', function() {
      var subject = parse('<div><span class="blurb">example text</span></div>')

      it('passes when the selection contains the given text', function() {
        subject.should.contain('span.blurb')
      })

      it('passes negated when the selection does not contain the given text', function() {
        subject.should.not.contain('example')
      })

      it('fails when the selection does not contain the given text', function() {
        (function() {
          subject.should.contain('aside')
        }).should.fail('expected div to contain \'aside\'')
      })

      it('fails negated when the selection contains the given text', function() {
        (function() {
          subject.should.not.contain('.blurb')
        }).should.fail('expected div to not contain \'.blurb\'')
      })
    })

    describe('element', function() {
      var
        subject = parse('<div><span class="blurb">example text</span><p>lorem ipsum</p></div>'),
        child = subject.children[0],
        nonchild = document.createElement('dd')

      it('passes when the selection contains the given element', function() {
        subject.should.contain(child)
      })

      it('passes negated when the selection does not contain the given element', function() {
        subject.should.not.contain(nonchild)
      })

      it('fails when the selection does not contain the given element', function() {
        (function() {
          subject.should.contain(nonchild)
        }).should.fail('expected div to contain dd')
      })

      it('fails negated when the selection contains the given element', function() {
        (function() {
          subject.should.not.contain(child)
        }).should.fail('expected div to not contain span.blurb')
      })
    })
  })

  describe('util.elToString', function() {
    it('should give a friendly name for a HTMLElement', function() {
      chai.util.elToString(parse('<span class="foo" bar="baz"></span>')).should.equl
    })

    it('should give a friendly name for a NodeList', function() {
      var div = document.createElement('div')
      div.innerHTML = '<span class="nodelist-test" aria-labelledby="name"></span><custom class="nodelist-test cool"></custom>'
      chai.util.elToString(div.querySelectorAll('.nodelist-test'))
        .should.equal('span.nodelist-test[aria-labelledby="name"], custom.nodelist-test.cool')
    })

    it('should truncate long NodeLists', function() {
      var div = document.createElement('div')
      div.innerHTML = [1,2,3,4,5,6,7,8].map(function(n) { return '<p id="nlt' + n + '"></p>' }).join('')
      chai.util.elToString(div.querySelectorAll('p'))
        .should.equal('p#nlt1, p#nlt2, p#nlt3, p#nlt4, p#nlt5... (+3 more)')
    })
  })
})
