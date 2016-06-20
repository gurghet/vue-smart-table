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
/* let testBody = [{_id: 0, name: 'Gennaro', age: 34}, {_id: 1, name: 'Marco', age: 22}]
let testBody2 = [{_id: 1, name: 'Gennaro', age: 34}, {_id: 3, name: 'Marco', age: 22}]
let testBody3 = [{_id: 1, bau: 'Gennaro', pau: 34}, {_id: 55, bau: 'Marco', pau: 22}]
let testBodyId = [{id: 1, name: 'Gennaro', age: 34}, {id: 3, name: 'Marco', age: 22}]
let testBodyNoId = [{name: 'Gennaro', age: 34}, {name: 'Marco', age: 22}]*/

describe('Add row feature', () => {
  it('should show an editable row if add-row is set to true', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :add-row="true"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}]
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('tr.row-new').length).to.eql(1)
  })
  xit('should display 9 td cells when given a 3x2 body and can add a row and 12 td cells when add-row is set to true', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :add-row="true"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}]
      }
    }).$mount()
    expect(vm.$el.querySelector('#value-0-c1').textContent).to.contain('c11')
    expect(vm.$el.querySelectorAll('td').length).to.eql(9)
    vm.testBody = [
      {_id: 0, c1: 'toredo', c2: 'c21', c3: 'c31'},
      {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'},
      {_id: 2, c1: 'c13', c2: 'c23', c3: 'c33'}
    ]
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#value-0-c1').textContent).to.contain('toredo')
      expect(vm.$el.querySelectorAll('td').length).to.eql(12)
      done()
    })
  })
  xit('should be able to save new row when all of the input fields are full', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :add-row="true" :editable="editable" v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        editable: ['c1', 'c2', 'c3']
      }
    }).$mount()
    expect(vm.$refs.ut.canSaveNewRow).to.eql(false)
    vm.$refs.ut.newRowInput = {c1: 'c11', c2: 'c21', c3: 'c31'}
    expect(vm.$refs.ut.canSaveNewRow).to.eql(true)
  })
  xit('should not be able to save new row when some mandatory input fields are empty', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :add-row="true" :editable="editable" v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        editable: ['c1', 'c2', 'c3']
      }
    }).$mount()
    vm.$refs.ut.newRowInput = {c1: 'c11', c3: 'c31'}
    expect(vm.$refs.ut.canSaveNewRow).to.eql(false, 'Undefined field')
    vm.$refs.ut.newRowInput = {c1: 'c11', c3: 'c31', c2: ''}
    expect(vm.$refs.ut.canSaveNewRow).to.eql(false, 'Empty field')
    vm.$refs.ut.newRowInput = {c1: 'c11', c3: 'c31', c2: 'oien'}
    expect(vm.$refs.ut.canSaveNewRow).to.eql(true, 'Ok field')
  })
  xit('should be able to save new row when some input fields are empty but not editable', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :add-row="true" :editable="[\'c1\',\'c3\']" v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}]
      }
    }).$mount()
    vm.$refs.ut.newRowInput = {c1: 'c11', c3: 'c31'}
    expect(vm.$refs.ut.canSaveNewRow).to.eql(true)
    vm.$refs.ut.newRowInput = {c1: 'c11', c3: 'c31', c2: ''}
    expect(vm.$refs.ut.canSaveNewRow).to.eql(true)
  })
  xit('it will call saveNewRow action when button is pressed', (done) => {
    Vue.http.interceptors.unshift({
      request (request) {
        request.client = (request) => {
          var response = {request: request}
          Vue.http.interceptors.shift()
          done()
          return response
        }
        return request
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :add-row="true" v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}]
      }
    }).$mount()
    vm.$refs.ut.newRowInput = {c1: 'c11', c2: 'c21', c3: 'c31'}
    $('.add-row-button button', vm.$refs.ut.$el).click()
  })
  xit('editableFields should always be a subset of the table header', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :editable="[\'c1\',\'c3\']" :header="{c1: \'b\', c2: \'r\'}"  v-ref:ut></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}]
      }
    }).$mount()
    expect(vm.$refs.ut.editableFields).to.eql(['c1'])
  })
  xit('should show the input template instead of a text input when specified', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :add-row="true"><doge slot="pic"></doge></smart-table></div>',
      components: {SmartTable, doge: {template: '<p class="myclass">doge</p>', data () { return {inputTemplate: '<p class="myinput">dog</p>'} }}},
      data: {
        testBody: [{_id: 0, name: 'Marco', pic: 'http://pic.com/1.png'}]
      }
    }).$mount()
    expect(vm.$el.querySelector('#value-0-name').textContent).to.contain('Marco')
    expect(vm.$el.querySelectorAll('td').length).to.eql(4)
    expect(vm.$el.querySelectorAll('.myclass').length).to.eql(1)
    expect(vm.$el.querySelectorAll('.myinput').length).to.eql(1)
  })
})
