/* global expect, beforeEach, chai */

import Vue from 'vue'
Vue.use(require('vue-resource'))
Vue.config.debug = true
import SmartTable from 'src/components/SmartTable'
  // var $ = require('jquery')
chai.use(require('chai-dom'))
let testBody = [{
  _id: 1,
  name: 'Gennaro',
  age: 34
}, {
  _id: 3,
  name: 'Marco',
  age: 22
}]

describe('Asyncronous resource loading when "auto-load" is set to true', () => {
  it('should load data automatically on startup', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      next({
        data: {body: testBody},
        status: 200,
        statusText: 'Ok'
      })
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" @successful-request="test"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      },
      methods: {
        test () {
          vm.$nextTick(() => {
            expect(vm.$el.querySelector('#value-3-name')).to.exist
            expect(vm.$el.querySelector('#value-3-name')).to.contain.text('Marco')
            done()
          })
        }
      }
    }).$mount()
  })
  it('should load data automatically on refresh', (done) => {
    let counter = 0
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      counter++
      next({
        data: {body: testBody},
        status: 200,
        statusText: 'Ok'
      })
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" @successful-request="test" :auto-refresh="true"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      },
      methods: {
        test () {
          if (counter === 1) {
            vm.$nextTick(() => {
              expect(vm.$el.querySelector('#value-3-name')).to.contain.text('Marco')
              vm.$children[0].doCommand({action: 'foo', selection: [1, 2]})
            })
          } else if (counter === 3) {
            done()
          }
        }
      }
    }).$mount()
  })
  it('should query the specified endpoint', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      expect(req.url).to.eql('http://api.randomuser.me/')
      done()
      next({
        data: {body: testBody},
        status: 200,
        statusText: 'Ok'
      })
    })
    new Vue({
      template: '<div><smart-table :auto-load="true" endpoint="http://api.randomuser.me/"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      }
    }).$mount()
  })
  it('should set the _id to newId column', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      next({
        data: {
          'body': [{
            _id: 'no no',
            gender: 'male',
            name: 'john',
            newId: '476'
          }],
          'info': {
            'results': 1,
            'page': 1
          }
        },
        status: 200,
        statusText: 'Ok'
      })
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" id-col="newId" @successful-request="test"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      },
      methods: {
        test (event) {
          vm.$nextTick(() => {
            expect(vm.$el.querySelector('#value-476-name')).to.contain.text('john')
            done()
          })
        }
      }
    }).$mount()
  })
  it('should set the body to the field passed in body-path', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      next({
        data: {
          'results': [{
            _id: '98',
            gender: 'male',
            name: 'john'
          }],
          'info': {
            'results': 1,
            'page': 1
          }
        },
        status: 200,
        statusText: 'Ok'
      })
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" body-path="results" @successful-request="test"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      },
      methods: {
        test (event) {
          vm.$nextTick(() => {
            expect(vm.$el.querySelector('#value-98-name')).to.contain.text('john')
            done()
          })
        }
      }
    }).$mount()
  })
  it('should set the body to the field passed in body-path if empty string', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      next({
        data: [{
          _id: '98',
          gender: 'male',
          name: 'john'
        }],
        status: 200,
        statusText: 'Ok'
      })
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" body-path="" @successful-request="test"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      },
      methods: {
        test (event) {
          vm.$nextTick(() => {
            expect(vm.$el.querySelector('#value-98-name')).to.contain.text('john')
            done()
          })
        }
      }
    }).$mount()
  })
  it('should set the id to the dot notation \'id.SSN\' passed parameter', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      next({
        data: {
          'body': [{
            id: {
              name: 'SSN',
              value: '476B'
            },
            gender: 'male',
            name: 'john'
          }],
          info: {
            results: 1,
            page: 1
          }
        },
        status: 200,
        statusText: 'Ok'
      })
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" id-col="id.value" @successful-request="test"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      },
      methods: {
        test (event) {
          vm.$nextTick(() => {
            expect(vm.$el.querySelector('#value-476B-name')).to.contain.text('john')
            done()
          })
        }
      }
    }).$mount()
  })
  it('should set the id to the dot notation \'id.value\' even when id is null', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift((req, next) => {
      next({
        data: {
          'body': [{
            id: {
              name: '',
              value: null
            },
            gender: 'male',
            name: 'john'
          }],
          info: {
            results: 1,
            page: 1
          }
        },
        status: 200,
        statusText: 'Ok'
      })
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" id-col="id.value" @successful-request="test"></smart-table></div>',
      components: {
        'smart-table': SmartTable
      },
      methods: {
        test (event) {
          vm.$nextTick(() => {
            expect(vm.$el.querySelector('#value-_smart_0-name')).to.contain.text('john')
            done()
          })
        }
      }
    }).$mount()
  })
})
