/* global expect, beforeEach, chai */

import Vue from 'vue'
Vue.use(require('vue-resource'))
Vue.config.debug = true
import SmartTable from 'src/components/SmartTable'
// var $ = require('jquery')
chai.use(require('chai-dom'))
let testBody = [{_id: 1, name: 'Gennaro', age: 34}, {_id: 3, name: 'Marco', age: 22}]

describe('Asyncronous resource loading when auto-load is set to true', () => {
  it('should load data automatically on startup', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift({
      request (request) {
        request.client = (request) => {
          var response = {request}
          response.data = {}
          response.data.body = testBody
          response.status = 200
          return response
        }
        return request
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" @successful-request="test"></smart-table></div>',
      components: {'smart-table': SmartTable},
      methods: {
        test (event) {
          vm.$nextTick(() => {
            expect(vm.$el.querySelector('#value-3-name')).to.contain.text('Marco')
            done()
          })
        }
      }
    }).$mount()
  })
  it('should query the specified endpoint', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift({
      request (request) {
        request.client = (request) => {
          var response = {request}
          response.data = {}
          response.data.body = testBody
          response.status = 200
          expect(request.url).to.eql('https://randomuser.me/api/')
          done()
          return response
        }
        return request
      }
    })
    new Vue({
      template: '<div><smart-table :auto-load="true" endpoint="https://randomuser.me/api/"></smart-table></div>',
      components: {'smart-table': SmartTable}
    }).$mount()
  })
  it('should set the _id to newId column', (done) => {
    Vue.http.interceptors.shift()
    Vue.http.interceptors.unshift({
      request (request) {
        request.client = (request) => {
          var response = {request}
          response.data = {
            'body': [
              {
                _id: 'no no',
                gender: 'male',
                name: 'john',
                newId: '476'
              }
            ],
            'info': {
              'results': 1,
              'page': 1
            }
          }
          response.status = 200
          return response
        }
        return request
      }
    })
    const vm = new Vue({
      template: '<div><smart-table :auto-load="true" id-col="newId" @successful-request="test"></smart-table></div>',
      components: {'smart-table': SmartTable},
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
})
