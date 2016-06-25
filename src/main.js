import Vue from 'vue'
import './vue-smart-table.js'
let SmartTable = window.SmartTable
import Src2img from './components/Src2img'
import VueResource from 'vue-resource'
import Contacts from './components/Contacts'
import Nationality from './components/Nationality'
import Fontawesome from './components/Fontawesome'
import ExampleComponent from './components/ExampleComponent'

Vue.use(VueResource)
Vue.component('smart-table', SmartTable)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { SmartTable, Src2img, Contacts, Nationality, Fontawesome, ExampleComponent }
})

Vue.http.interceptors.unshift((request, next) => {
  if (request.method === 'PUT') {
    setTimeout(() => {
      next({
        data: '{"status": "Ok", "message": "no message"}',
        status: 200
      }) }, 500)
  } else {
    next()
  }
})

Vue.http.options.xhr = {withCredentials: false}
