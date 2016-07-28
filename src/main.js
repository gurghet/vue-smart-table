import Vue from 'vue'
import VueResource from 'vue-resource'
import './vue-smart-table.js'
let SmartTable = window.SmartTable
import Src2img from './components/Src2img'
import Contacts from './components/Contacts'
import Nationality from './components/Nationality'
import Fontawesome from './components/Fontawesome'
import ExampleComponent from './components/ExampleComponent'
import BuiltInFooter from './components/Footer'
import Pokepic from './components/Pokepic'

Vue.use(VueResource)
Vue.component('smart-table', SmartTable)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data: {
    search: '',
    mine: []
  },
  watch: {
    'search' (val) {
      this.$broadcast('filter', {filter: val, col: 'hello'})
    }
  },
  components: { SmartTable, Src2img, Contacts, Nationality, Fontawesome, ExampleComponent, BuiltInFooter, Pokepic },
  methods: {
    add () {
      let m = {hello: Math.random(), world: 'chtulu'}
      this.mine.push(m)
      this.$refs.ut.body.push(m)
    },
    remove () {
      this.$refs.ut.body.$remove(this.mine[this.mine.length - 1])
      this.mine.splice(this.mine.length - 1, 1)
    }
  }
})

let counter = 0
Vue.http.interceptors.unshift((request, next) => {
  if (request.method === 'PUT') {
    if (counter === 3) {
      console.error('Simulating 500 - Server Error response for the following request', request)
      setTimeout(() => {
        next(request.respondWith({data: '{"status": "error", "message": "generic error message"}'}, {
          status: 500,
          statusText: 'Server Error'
        }))
      }, 500)
      counter = 0
    } else {
      console.info('Simulating 200 - Ok response for the following request', request)
      setTimeout(() => {
        next(request.respondWith({data: '{"status": "success", "data": "no data"}'}, {
          status: 200,
          statusText: 'Ok'
        }))
      }, 500)
      counter++
    }
  } else {
    next()
  }
})

Vue.http.options.xhr = {withCredentials: false}
