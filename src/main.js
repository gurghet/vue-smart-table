import Vue from 'vue'
import './vue-smart-table.js'
let SmartTable = window.SmartTable
import ExampleComponent from './components/ExampleComponent'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.component('smart-table', SmartTable)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { SmartTable, ExampleComponent }
})

Vue.http.options.xhr = {withCredentials: false}
