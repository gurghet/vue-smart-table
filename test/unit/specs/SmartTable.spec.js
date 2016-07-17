/**
 * Created by gurghet on 21.05.16.
 */
/* global describe, it, expect, beforeEach, chai */

import Vue from 'vue'
Vue.use(require('vue-resource'))
Vue.config.debug = true
import SmartTable from 'src/components/SmartTable'
chai.use(require('chai-dom'))
let testBody = [{_id: 0, name: 'Gennaro', age: 34}, {_id: 1, name: 'Marco', age: 22}]
let testBody2 = [{_id: 1, name: 'Gennaro', age: 34}, {_id: 3, name: 'Marco', age: 22}]
let testBody3 = [{_id: 1, bau: 'Gennaro', pau: 34}, {_id: 55, bau: 'Marco', pau: 22}]
let testBodyNoId = [{name: 'Gennaro', age: 34}, {name: 'Marco', age: 22}]

describe('SmartTable.vue', () => {
  it('should display 6 td cells when given a 3x2 body', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="testColumns"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 7, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        testColumns: ['C1', 'C2', 'C3']
      }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('td').length).to.eql(6)
      done()
    })
  })
  it('should behave well when _id not present', () => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBodyNoId" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBodyNoId }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('td').length).to.eql(4)
      expect(vm.$el.querySelector('#cell-_smart_0-name')).to.contain.text('Gennaro')
      expect(vm.$el.querySelector('#cell-_smart_1-name')).to.contain.text('Marco')
    })
  })
  it('should display 6 td cells when given a 3x2 body and 9 td cells when one row is added', (done) => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody" :header="testColumns"></smart-table></div>',
      components: {SmartTable},
      data: {
        testBody: [{_id: 0, c1: 'c11', c2: 'c21', c3: 'c31'}, {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'}],
        testColumns: ['C1', 'C2', 'C3']
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('td').length).to.eql(6)
    expect(vm.$el.querySelector('#cell-0-c1').textContent).to.contain('c11')
    vm.testBody = [
      {_id: 0, c1: 'toredo', c2: 'c21', c3: 'c31'},
      {_id: 1, c1: 'c12', c2: 'c22', c3: 'c32'},
      {_id: 2, c1: 'c13', c2: 'c23', c3: 'c33'}
    ]
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('td').length).to.eql(9)
      expect(vm.$el.querySelector('#cell-0-c1').textContent).to.contain('toredo')
      done()
    })
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
  it('should show a subset of columns in the header if the header is an object with 2 cols and there are 3', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="subset"></smart-table></div>',
      components: {SmartTable},
      data: {
        subset: [{key: 'name', label: 'Nome'}, {key: 'age', label: 'Età'}],
        testBody: [{_id: 1, name: 'Gennaro', age: 34, hidden: 'pupu'}, {_id: 55, name: 'Marco', age: 22, hidden: 'caca'}]
      }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('th').length).to.eql(2)
      expect(vm.$el.querySelectorAll('.col-hidden').length).to.eql(0)
      expect(vm.$el.querySelector('.col-age').textContent).to.contain('Età')
      done()
    })
  })
  it('should show a subset of columns in the body if the header is an object with 2 cols and there are 3', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="subset"></smart-table></div>',
      components: {SmartTable},
      data: {
        subset: [{key: 'name', label: 'Nome'}, {key: 'age', label: 'Età'}],
        testBody: [{_id: 1, name: 'Gennaro', age: 34, hidden: 'pupu'}, {_id: 55, name: 'Marco', age: 22, hidden: 'caca'}]
      }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('td').length).to.eql(4)
      expect(vm.$el.querySelector('#cell-1-age').textContent).to.contain('34')
      done()
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
  it('should be able to form derived columns', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :header="subset"></smart-table></div>',
      components: {SmartTable},
      data: {
        subset: [{key: 'name+age', label: 'Nome+'}],
        testBody: [{_id: 1, name: 'Gennaro', age: 34, hidden: 'pupu'}, {_id: 55, name: 'Marco', age: 22, hidden: 'caca'}]
      }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('td').length).to.eql(2)
      expect(vm.$el.querySelector('#cell-1-name\\+age')).to.exist
      done()
    })
  })
  it('main col should set age as main col when age is set and present in first row', () => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" label-col="age"></smart-table></div>',
      components: {SmartTable},
      data: { testBody2 }
    }).$mount()
    expect(vm.$children[0].mainCol).to.eql('age')
  })
  it('should plug in doge component in the first column', (done) => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody2"><doge col="name"></doge></smart-table></div>',
      components: {'smart-table': SmartTable, 'doge': {template: '<div class="doge">wow!</div>'}},
      data: { testBody2 }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.doge').length).to.eql(2)
      expect(vm.$el.querySelectorAll('.doge')[0].textContent).to.contain('wow!')
      done()
    })
  })
  it('should plug in 7 5 4 in the first column', (done) => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody"><count col="name"></count></smart-table></div>',
      components: {'smart-table': SmartTable, 'count': {template: '<p class="count">{{value.length}}</p>', data () { return { value: '' } }}},
      data: {
        testBody: [
          {_id: 1, name: '1234567', age: 34},
          {_id: 3, name: 'Marco', age: 22},
          {_id: 6, name: 'Nico', age: 99}
        ]
      }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.count').length).to.eql(3)
      vm.$nextTick(() => {
        expect(vm.$el.querySelectorAll('.count')[0]).to.contain.text('7')
        expect(vm.$el.querySelectorAll('.count')[1]).to.contain.text('5')
        expect(vm.$el.querySelectorAll('.count')[2]).to.contain.text('4')
        debugger
        done()
      })
    })
  })
  it('should show an ordered set of columns in the body if the header is an object with 2 swapped columns', () => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody2" :header="swapped"></smart-table></div>',
      components: {SmartTable},
      data: {
        swapped: [{key: 'age', label: 'Età'}, {key: 'name', label: 'Nome'}],
        testBody2
      }
    }).$mount('body')
    debugger
    const headerCells = vm.$el.querySelectorAll('th')
    expect(headerCells.length).to.eql(2)
    expect(headerCells[0].textContent).to.contain('Età')
    expect(headerCells[1].textContent).to.contain('Nome')
    const firstRowCells = vm.$el.querySelectorAll('#row-1 td')
    expect(firstRowCells.length).to.eql(2)
    expect(firstRowCells[0].textContent).to.contain('34')
    expect(firstRowCells[1].textContent).to.contain('Gennaro')
  })
  xit('should detect if the footer is an array and it should display 3 columns specified', () => {
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
  xit('should detect if the footer is a matrix and it should display as many rows as there are rows', () => {
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
  it('should filter by age', (done) => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody2" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    // check that there is only one row visible and that it contains the Marco row
    vm.$broadcast('filter', {filter: '22', col: 'age'})
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#row-1')).to.exist
      expect(vm.$el.querySelector('#row-3')).to.exist
      expect(vm.$el.querySelector('#row-1')).to.have.class('smart-filter')
      expect(vm.$el.querySelector('#row-1')).to.have.class('custom-filter')
      expect(vm.$el.querySelector('#row-3')).not.to.have.class('smart-filter')
      done()
    })
  })
  it('should filter by age and then by name, then again by age', (done) => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody2" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    vm.$broadcast('filter', {filter: '22', col: 'age'})
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#row-1')).to.have.class('smart-filter')
      expect(vm.$el.querySelector('#row-1')).to.have.class('custom-filter')
      expect(vm.$el.querySelector('#row-3')).not.to.have.class('smart-filter')
      vm.$broadcast('filter', {filter: 'genna', col: 'name'})
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('#row-1')).to.have.class('smart-filter')
        expect(vm.$el.querySelector('#row-3')).to.have.class('smart-filter')
        vm.$broadcast('filter', {filter: '', col: 'age'})
        vm.$nextTick(() => {
          expect(vm.$el.querySelector('#row-1')).not.to.have.class('smart-filter')
          expect(vm.$el.querySelector('#row-3')).to.have.class('smart-filter')
          done()
        })
      })
    })
  })
  it('should filter by a custom function', (done) => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody2"  v-ref:ut><invert col="age"></invert></smart-table></div>',
      components: {'smart-table': SmartTable, 'invert': { template: '<p></p>', methods: {filterFunction (filter) {
        return function (val) {
          return String(filter) !== String(val)
        }
      }}}},
      data: { testBody2 }
    }).$mount()
    // check that there is only one row visible and that it contains the Marco row
    vm.$broadcast('filter', {filter: '22', col: 'age'})
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('#row-1')).to.exist
      expect(vm.$el.querySelector('#row-3')).to.exist
      expect(vm.$el.querySelector('#row-3')).to.have.class('smart-filter')
      expect(vm.$el.querySelector('#row-3')).to.have.class('custom-filter')
      expect(vm.$el.querySelector('#row-1')).not.to.have.class('smart-filter')
      done()
    })
  })
  it('should order the table numerically by age', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody2" :order-by="[\'age\']" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$refs.ut.pBody[0].age).to.equal(34)
      vm.$refs.ut.doOrderBy('age')
      vm.$nextTick(() => {
        expect(vm.$refs.ut.pBody[0].age).to.equal(22)
        done()
      })
    })
  })
  it('should order the table numerically by age in reverse when same function called twice', (done) => {
    const vm = new Vue({
      replace: false,
      template: '<div><smart-table :body="testBody2" :order-by="[\'age\']" v-ref:ut></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody2 }
    }).$mount()
    // check that there is not a filter gui
    vm.$nextTick(() => {
      expect(vm.$refs.ut.pBody[0].age).to.equal(34)
      vm.$refs.ut.doOrderBy('age')
      vm.$nextTick(() => {
        expect(vm.$refs.ut.pBody[0].age).to.equal(22)
        vm.$refs.ut.doOrderBy('age')
        vm.$nextTick(() => {
          expect(vm.$refs.ut.pBody[0].age).to.equal(34)
          vm.$refs.ut.doOrderBy('age')
          vm.$nextTick(() => {
            expect(vm.$refs.ut.pBody[0].age).to.equal(22)
            done()
          })
        })
      })
    })
  })
  it('should order the table lexicographically by age', (done) => {
    const vm = new Vue({
      template: '<div><smart-table :body="testBody" :order-by="[\'age\']" v-ref:ut><plain-text :lexicographical-ordering="true" col="age"></plain-text></smart-table></div>',
      components: {'smart-table': SmartTable},
      data: { testBody: [{_id: 0, name: 'Gennaro', age: '34'}, {_id: 1, name: 'Marco', age: '220'}] }
    }).$mount()
    vm.$nextTick(() => {
      expect(vm.$refs.ut.pBody[0].age).to.equal('34')
      vm.$nextTick(() => {
        vm.$refs.ut.doOrderBy('age')
        vm.$nextTick(() => {
          expect(vm.$refs.ut.pBody[0].age).to.equal('220')
          done()
        })
      })
    })
  })
})
