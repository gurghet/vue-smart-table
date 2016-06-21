/**
 * Created by gurghet on 21.05.16.
 */

/* global describe, it, expect, beforeEach, chai */

import Vue from 'vue'
Vue.use(require('vue-resource'))
Vue.config.debug = true
import SmartTable from 'src/components/SmartTable'
var $ = require('jquery')
chai.use(require('chai-dom'))
let testBody = [{_id: 0, name: 'Gennaro', age: 34}, {_id: 1, name: 'Marco', age: 22}]
let testBody2 = [{_id: 1, name: 'Gennaro', age: 34}, {_id: 3, name: 'Marco', age: 22}]
let testBody3 = [{_id: 1, bau: 'Gennaro', pau: 34}, {_id: 55, bau: 'Marco', pau: 22}]
let testBodyId = [{id: 1, name: 'Gennaro', age: 34}, {id: 3, name: 'Marco', age: 22}]
let testBodyNoId = [{name: 'Gennaro', age: 34}, {name: 'Marco', age: 22}]

describe('SmartTable.vue', () => {
  it('should display 6 td cells when given a 3x2 body', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="testColumns"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 7, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        testColumns: ['C1', 'C2', 'C3']
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('td').length).to.eql(6)
  })
  it('should behave well when _id not present', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBodyNoId" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBodyNoId }
    }).$mount()
    expect(vm.$el.querySelectorAll('td').length).to.eql(4)
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#value-smart_0-name')).to.contain.text('Gennaro')
      expect(vm.$el.querySelector('#value-smart_1-name')).to.contain.text('Marco')
      done()
    })
  })
  it('should display 6 td cells when given a 3x2 body and 9 td cells when one row is added', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="testColumns"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        testColumns: ['C1', 'C2', 'C3']
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('td').length).to.eql(6)
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#value-0-c1').textContent).to.contain('c11')
      Vue.set(vm, 'testBody', [
        {_id: 0, c1: 'toredo', c2: 'c21', c3: 'c31'},
        {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'},
        {_id: 2, c1: 'c13', c2: 'c23', c3: 'c33'}
      ])
      vm.$nextTick(() => {
        expect(vm.$el.querySelectorAll('td').length).to.eql(9)
        expect(vm.$el.querySelector('#value-0-c1').textContent).to.contain('toredo')
        done()
      })
    })
  })
  it('should select all the rows when selectAll turns on and no rows were selected', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody"></smart-table></div>',
      components: {SmartTable},
      data: { testBody }
    }).$mount()
    vm.$children[0].toggleAllRows()
    expect(vm.$children[0].selection).to.eql(['0', '1'])
  })
  it('should select all the rows when selectAll turns on and 1 row was selected', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody"></smart-table></div>',
      components: {SmartTable},
      data: { testBody }
    }).$mount()
    vm.$children[0].selection = ['1']
    vm.$children[0].toggleAllRows()
    expect(vm.$children[0].selection).to.eql(['0', '1'])
  })
  it('should turn on and off selectAll when selectAllRows is called', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody"></smart-table></div>',
      components: {SmartTable},
      data: { testBody }
    }).$mount()
    vm.$children[0].toggleAllRows()
    expect(vm.$children[0].toggleAll).to.eql(true)
    vm.$children[0].toggleAllRows()
    expect(vm.$children[0].toggleAll).to.eql(false)
  })
  it('should deselect all the rows when selectAll turns off, toggleAll is true and all the rows were selected', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody"></smart-table></div>',
      components: {SmartTable},
      data: { testBody }
    }).$mount()
    vm.$children[0].toggleAll = true
    vm.$children[0].selection = ['1', '2']
    vm.$children[0].toggleAllRows()
    expect(vm.$children[0].selection).to.eql([])
  })
  it('should broadcast \'command\' with an action when command called', () => {
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        data () {
          this.$parent.$refs['son'] = this
          return {received: false}
        },
        events: {
          'command' () {
            this.received = true
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :actions="[\'act1\']"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBody }
    }).$mount()
    vm.$children[0].next()
    expect(vm.$children[0].$refs.son.received).to.eql(true)
  })
  it('should broadcast \'command\' with an action when command called and id-col is set', () => {
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        data () {
          this.$parent.$refs['son'] = this
          return {received: false}
        },
        events: {
          'command' () {
            this.received = true
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBodyId" :actions="[\'act1\']" id-col="id"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBodyId }
    }).$mount()
    vm.$children[0].next()
    expect(vm.$children[0].$refs.son.received).to.eql(true)
  })
  it('should broadcast \'command\' with an action key and label when command called (simple array case)', (done) => {
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        events: {
          'command' (command) {
            expect(command.action).to.eql({key: 'act1', label: 'act1'})
            done()
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :actions="[\'act1\']"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBody2 }
    }).$mount()
    vm.$children[0].action = 'act1'
    vm.$children[0].selection = [1, 3]
    vm.$children[0].next()
  })
  it('should broadcast \'command\' with an action key and label when command called (object case)', (done) => {
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        events: {
          'command' (command) {
            expect(command.action).to.eql({key: 'action1', label: 'Save'})
            done()
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :actions="testActions"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: {
        testActions: {action1: 'Save', action2: 'Thisi is just a label'},
        testBody2
      }
    }).$mount()
    vm.$children[0].action = 'action1'
    vm.$children[0].selection = ['1', '3']
    vm.$children[0].next()
  })
  it('should broadcast \'command\' with an array of id and labels when command called ', (done) => {
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        events: {
          'command' (command) {
            expect(command.selection).to.eql([{key: '1', label: 'Gennaro'}, {key: '3', label: 'Marco'}])
            done()
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :actions="[\'act1\']"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBody2 }
    }).$mount()
    vm.$children[0].action = 'act1'
    vm.$children[0].selection = ['1', '3']
    vm.$children[0].next()
  })
  it('should broadcast \'command\' with an array of id and labels when command called with id-col changed', (done) => {
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        events: {
          'command' (command) {
            expect(command.selection).to.eql([{key: '1', label: 'Gennaro'}, {key: '3', label: 'Marco'}])
            done()
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBodyId" :actions="[\'act1\']" id-col="id" label-col="name"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBodyId }
    }).$mount()
    vm.$children[0].action = 'act1'
    vm.$children[0].selection = ['1', '3']
    vm.$children[0].next()
  })
  it('should extend an array of action names as an object', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :actions="[\'doge\',\'such test\']"></smart-table></div>',
      components: {SmartTable},
      data: { testBody }
    }).$mount()
    expect(vm.$children[0].actions).to.eql({doge: 'doge', 'such test': 'such test'})
  })
  it('should broadcast the event \'command\' with correct parameters when action button is clicked', () => {
    var a
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        events: {
          'command' (command) { a = command }
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :actions="[\'doge\']"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBody }
    }).$mount()
    vm.$children[0].selection = ['1']
    vm.$children[0].action = 'doge'
    const button = vm.$el.querySelector('.action-button')
    button.click()
    expect(a.action.key).to.eql('doge')
    expect(a.selection).to.eql([{key: '1', label: 'Marco'}])
  })
  it('should perform an http request with action and selection (and update the body) when confirm is received', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      expect(req.params.action).to.eql('foo')
      expect(req.params.selection).to.eql([1, 3])
      next({
        data: {body: [{_id: 1, name: 'maciccio', age: 88}]},
        status: 200,
        statusText: 'Ok'
      })
    })
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        created () {
          this.$dispatch('confirm', {action: 'foo', selection: [1, 3]})
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBody2 }
    }).$mount()
    vm.$watch('$children[0].body', () => {
      expect(vm.$children[0].body).to.eql([{_id: 1, name: 'maciccio', age: 88}])
      done()
    })
  })
  it('should set an error after requesting an action that returns 500', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      next({
        data: {error: 'error data'},
        status: 500,
        statusText: 'Nope'
      })
    })
    const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
    const SmartTableWithMock = inject({
      './Modal': {
        created () {
          this.$dispatch('confirm', {action: 'foo', selection: [1, 3]})
        }
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2"></smart-table></div>',
      components: {'smart-table': SmartTableWithMock},
      data: { testBody2 }
    }).$mount()
    vm.$watch('$children[0].error', () => {
      expect(vm.$children[0].error).to.eql({status: 500, data: 'error data'})
      done()
    })
  })
  it('it should display a combobox with 1 action in the footer', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="[{_id: 4, t:3}]" :actions="testActions"></smart-table></div>',
      components: {SmartTable},
      data: {
        testActions: {wow: 'Doge'}
      }
    }).$mount()
    expect(vm.$el.querySelector('.smart-control-bar select.actions').options.length).to.eql(1)
    expect(vm.$el.querySelector('.smart-control-bar select.actions').options[0].value).to.eql('wow')
    expect(vm.$el.querySelector('.smart-control-bar select.actions').options[0].text).to.eql('Doge')
  })
  it('should create a header with the keys as column if header not provided', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2"></smart-table></div>',
      components: {SmartTable},
      data: { testBody2 }
    }).$mount()
    expect(vm.$el.querySelectorAll('th').length).to.eql(2)
    expect(vm.$el.querySelectorAll('.col-name').length).to.eql(1)
    expect(vm.$el.querySelector('.col-name').textContent).to.contain('name')
  })
  it('should put the labels if the header is an array and matches the number of columns', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="[\'Nome\',\'Anni\']"></smart-table></div>',
      components: {SmartTable},
      data: { testBody }
    }).$mount()
    expect(vm.$el.querySelectorAll('th').length).to.eql(2)
    expect(vm.$el.querySelectorAll('.col-age').length).to.eql(1)
    expect(vm.$el.querySelector('.col-age').textContent).to.contain('Anni')
  })
  it('should show a subset of columns in the header if the header is an object with 2 cols and there are 3', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="subset"></smart-table></div>',
      components: {SmartTable},
      data: {
        subset: [{key: 'name', label: 'Nome'}, {key: 'age', label: 'Età'}],
        testBody: [{_id: 1, name: 'Gennaro', age: 34, hidden: 'pupu'}, {_id: 55, name: 'Marco', age: 22, hidden: 'caca'}]
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('th').length).to.eql(2)
    expect(vm.$el.querySelectorAll('.col-hidden').length).to.eql(0)
    expect(vm.$el.querySelector('.col-age').textContent).to.contain('Età')
  })
  it('should show a subset of columns in the body if the header is an object with 2 cols and there are 3', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="subset"></smart-table></div>',
      components: {SmartTable},
      data: {
        subset: [{key: 'name', label: 'Nome'}, {key: 'age', label: 'Età'}],
        testBody: [{_id: 1, name: 'Gennaro', age: 34, hidden: 'pupu'}, {_id: 55, name: 'Marco', age: 22, hidden: 'caca'}]
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('td').length).to.eql(4)
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#value-1-age').textContent).to.contain('34')
    })
  })
  it('should choose an appropriate label in case _id is not in the header', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody3" :header="[\'sau\', \'mau\']"></smart-table></div>',
      components: {SmartTable},
      data: { testBody3 }
    }).$mount()
    expect(vm.$children[0].mainCol).to.eql('bau')
  })
  it('should show a delete button if delete is set to true', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :delete="true"></smart-table></div>',
      components: {SmartTable},
      data: {testBody2}
    }).$mount()
    expect(vm.$el.querySelectorAll('button#delete-3').length).to.eql(1)
  })
  it('should be able to form derived columns', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="subset"></smart-table></div>',
      components: {SmartTable},
      data: {
        subset: [{key: 'name+age', label: 'Nome+'}],
        testBody: [{_id: 1, name: 'Gennaro', age: 34, hidden: 'pupu'}, {_id: 55, name: 'Marco', age: 22, hidden: 'caca'}]
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('td').length).to.eql(2)
    expect(vm.$el.querySelector('#value-1-name\\+age')).to.exist
  })
  // todo: bring this to e2e
  /* it('double clicking a field should put it in edit mode', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :actions="[\'mela\']"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: {1: {name: 'Gennaro', age: 34}, 3: {name: 'Marco', age: 22}}
      }
    }).$mount()
    var field = vm.$el.querySelector('#value-1-name')
    expect(vm.$el.querySelectorAll('#value-1-name-edit input').length).to.eql(0)
    vm.$nextTick(() => {
      vm.$nextTick(() => {
        expect(vm.$el.querySelectorAll('#value-1-name-edit input').length).to.eql(1)
        done()
      })
    })
    var event = new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    })
    field.dispatchEvent(event)
  })
  it('double clicking a second time should put it in edit mode', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :actions="[\'mela\']"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: {1: {name: 'Gennaro', age: 34}, 3: {name: 'Marco', age: 22}}
      }
    }).$mount()
    var field1 = $(vm.$el).find('#cell-1-name')
    field1.dblclick(() => {
      vm.$nextTick(() => {
        $(vm.$el).find('.modal-edit button.modal-cancel-button').click(() => {
          vm.$nextTick(() => {
            var field2 = $(vm.$el).find('#cell-3-name')
            field2.dblclick(() => {
              vm.$nextTick(() => {
                expect(vm.$el.querySelectorAll('#value-3-name-edit input').length).to.eql(1)
                done()
              })
            })
            field2.get(0).dispatchEvent(event)
          })
        })
        $(vm.$el).find('.modal-edit button.modal-cancel-button').get(0).click()
      })
    })
    var event = new MouseEvent('dblclick', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    })
    field1.get(0).dispatchEvent(event)
  })*/
  /* xit('should show the undo button when modifying field successfully', (done) => {
   Vue.http.interceptors.unshift({
   request (request) {
   request.client = (request) => {
   var response = {request: request}
   response.status = 200
   response.data.body = {1: {name: 'Gennaro', age: 99}, 55: {name: 'Marco', age: 22}}
   Vue.http.interceptors.shift()
   return response
   }
   return request
   }
   })
   const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
   const SmartTableWithMock = inject({
   './ModalEdit': {
   events: {
   'modalEdit' (modalEdit) {
   this.$dispatch('confirm', {
   id: modalEdit.id,
   col: modalEdit.col,
   currentValue: modalEdit.currentValue,
   previousValue: modalEdit.previousValue
   })
   this.$dispatch('close')
   }
   }
   }
   })
   const vm = new Vue({
   template: '<div><smart-table :body="testBody"></smart-table></div>',
   components: {'smart-table': SmartTableWithMock},
   data: {
   testBody: {1: {name: 'Gennaro', age: 34}, 55: {name: 'Marco', age: 22}}
   }
   }).$mount()
   vm.$children[0].valueClick(1, 'age')
   vm.$watch('$children[0].backMatrix', () => {
   expect(vm.$el.querySelectorAll('#undo-1-age').length).to.eql(1)
   done()
   }, {deep: true})
   }) */
  // todo: move tests in PlainText component
  xit('should not go in edit mode if the field is not editable', (/* done */) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :actions="[\'mela\']" :editable="[\'name\']" v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: { testBody }
    }).$mount()
    vm.$children[0].valueClick('1', 'age')
    expect(vm.$refs.ut.modalEdit).to.equal(undefined)
    vm.$children[0].valueClick('1', 'name')
    expect(vm.$refs.ut.modalEdit).to.not.equal(undefined)
  })
  xit('should not go in edit mode if the entire table is not editable', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :actions="[\'mela\']" v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: { testBody2 }
    }).$mount()
    vm.$children[0].valueClick('1', 'name')
    expect(vm.$refs.ut.modalEdit).to.eql(undefined)
  })
  it('main col should set age as main col when age is set and present in first row', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" label-col="age"></smart-table></div>',
      components: {SmartTable},
      data: { testBody2 }
    }).$mount()
    expect(vm.$children[0].mainCol).to.eql('age')
  })
  it('should plug in doge component in the first column', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2"><doge slot="name"></doge></smart-table></div>',
      components: {'smart-table': SmartTable, 'doge': {template: '<p class="doge">wow!</p>'}},
      data: { testBody2 }
    }).$mount()
    expect(vm.$el.querySelectorAll('.doge').length).to.eql(2)
    expect(vm.$el.querySelectorAll('.doge')[0].textContent).to.contain('wow!')
  })
  it('should plug in 7 5 4 in the first column', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody"><count slot="name"></count></smart-table></div>',
      components: {'smart-table': SmartTable,
        'count': {template: '<p class="count">{{value.length}}</p>', data () { return { value: 'default' } }}},
      data: {
        testBody: [{_id: 1, name: 'Gennaro', age: 34}, {_id: 3, name: 'Marco', age: 22}, {_id: 6, name: 'Nico', age: 99}]
      }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.count').length).to.eql(3)
      expect(vm.$el.querySelectorAll('.count')[0].textContent).to.contain('7')
      expect(vm.$el.querySelectorAll('.count')[1].textContent).to.contain('5')
      expect(vm.$el.querySelectorAll('.count')[2].textContent).to.contain('4')
    })
  })
  /* it('should not attempt to update the body if http response body is empty', (done) => {
   Vue.http.interceptors.unshift({
   request (request) {
   request.client = (request) => {
   var response = {request: request}
   response.status = 200
   response.data.body = {}
   response.data.success = 'generic success message'
   Vue.http.interceptors.shift()
   return response
   }
   return request
   }
   })
   const inject = require('!!vue?inject!../../../src/components/SmartTable.vue')
   const SmartTableWithMock = inject({
   './Modal': {
   created () {
   this.$dispatch('confirm')
   }
   }
   })
   const vm = new Vue({
   template: '<div><smart-table :body="testBody" @after-request="finish"></smart-table></div>',
   components: {'smart-table': SmartTableWithMock},
   data: {
   testBody: {1: {name: 'Gennaro', age: 34}, 55: {name: 'Marco', age: 22}}
   },
   methods: {
   finish () {
   expect(this.$children[0].body[55].name).to.eql('Marco')
   done()
   }
   }
   }).$mount()
   vm.$watch('$children[0].body', () => {
   expect(Object.keys(vm.$children[0].body).length).to.eql(2)
   done()
   })
   }) */
  it('should hide the smart actions if no actions are defined', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2"></smart-table></div>',
      components: {SmartTable},
      data: { testBody2 }
    }).$mount()
    expect(vm.$el.querySelectorAll('.smart-control-bar').length).to.eql(0)
    expect(vm.$el.querySelectorAll('input[type="checkbox="]').length).to.eql(0)
  })
  // todo: move into PlainTextComponent
  xit('should put into edit mode even if cell is empty', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :editable="[\'name\']" v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: { testBody: [{_id: 0, name: 'Gennaro', age: 34}, {_id: 1, name: '', age: 22}] }
    }).$mount()
    vm.$children[0].valueClick('1', 'name')
    expect(vm.$refs.ut.modalEdit).to.not.equal(undefined)
  })
  it('should show an ordered set of columns in the body if the header is an object with 2 swapped columns', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :header="swapped"></smart-table></div>',
      components: {SmartTable},
      data: {
        swapped: [{key: 'age', label: 'Età'}, {key: 'name', label: 'Nome'}],
        testBody2
      }
    }).$mount()
    vm.$nextTick(() => {
      const headerCells = vm.$el.querySelectorAll('th')
      expect(headerCells.length).to.eql(2)
      expect(headerCells[0].textContent).to.contain('Età')
      expect(headerCells[1].textContent).to.contain('Nome')
      const firstRowCells = vm.$el.querySelectorAll('.row-1 td')
      expect(firstRowCells.length).to.eql(2)
      expect(firstRowCells[0].textContent).to.contain('34')
      expect(firstRowCells[1].textContent).to.contain('Gennaro')
    })
  })
  it('should detect if the footer is an array and it should display 3 columns specified', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :footer="testFooter"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        testFooter: ['hello', 'C2', 'C3']
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('.footer-row td').length).to.eql(3)
    expect(vm.$el.querySelectorAll('.footer-row td')[0].textContent).to.contain('hello')
  })
  it('should detect if the footer is a matrix and it should display as many rows as there are rows', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :footer="testFooter"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        testFooter: [['C1', 'C2', 'C3'],
          ['foot', 'er', 'oien']]
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('.footer-row td').length).to.eql(6)
    expect(vm.$el.querySelectorAll('.footer-row td')[3].textContent).to.contain('foot')
  })
  xit('should filter by age', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :can-filter-by="[\'age\']"  v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    // check that there is a filter gui
    expect(vm.$el.querySelectorAll('.age-filter-cue').length).to.eql(1)
    // simulate click and write '22' to its model
    vm.$refs.ut.filters = {age: {open: true, model: '22'}}
    // check that there is only one row visible and that it contains the Marco row
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.row-1')).to.be.null
      expect(vm.$el.querySelector('.row-3')).not.to.null
      expect(vm.$el.querySelector('#value-3-name')).not.to.null
      done()
    })
  })
  it('should not show filter cue on age', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2"  v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    // check that there is not a filter gui
    expect(vm.$el.querySelectorAll('.age-filter-cue').length).to.eql(0)
  })
  it('should order the table numerically by age', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :order-by="[\'age\']" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    expect(vm.$refs.ut.processedSmartBody[0].age).to.equal(34)
    vm.$refs.ut.doOrderBy('age')
    vm.$nextTick(() => {
      expect(vm.$refs.ut.processedSmartBody[0].age).to.equal(22)
      done()
    })
  })
  it('should order the table numerically by age in reverse when same function called twice', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :order-by="[\'age\']" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    // check that there is not a filter gui
    expect(vm.$refs.ut.processedSmartBody[0].age).to.equal(34)
    vm.$refs['ut'].doOrderBy('age')
    vm.$nextTick(() => {
      expect(vm.$refs.ut.processedSmartBody[0].age).to.equal(22)
      vm.$refs['ut'].doOrderBy('age')
      vm.$nextTick(() => {
        expect(vm.$refs.ut.processedSmartBody[0].age).to.equal(34)
        vm.$refs['ut'].doOrderBy('age')
        vm.$nextTick(() => {
          expect(vm.$refs.ut.processedSmartBody[0].age).to.equal(22)
          done()
        })
      })
    })
  })
  it('should order the table lexicographically by age', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :order-by="[\'age\']" v-ref:ut><plain-text :lexicographical-ordering="true" slot="age"></plain-text></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody: [{_id: 0, name: 'Gennaro', age: '34'}, {_id: 1, name: 'Marco', age: '220'}] }
    }).$mount()
    // check that there is not a filter gui
    expect(vm.$refs.ut.processedSmartBody[0].age).to.equal('34')
    vm.$nextTick(() => {
      vm.$refs.ut.doOrderBy('age')
      vm.$nextTick(() => {
        expect(vm.$refs.ut.processedSmartBody[0].age).to.equal('220')
        done()
      })
    })
  })
  xit('should report the total', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :sum="[\'age\']"  v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()

    const ageTotal = $('#value-total-age', vm.$el)
    // const nameTotal = $('#value-total-name', vm.$el)
    expect(ageTotal).to.exist
    console.info(ageTotal.innerHTML)
    expect(ageTotal).to.have.html('56')
    // expect(nameTotal).to.contain.text('')
  })
})
