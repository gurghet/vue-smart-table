import Vue from 'vue'
import SmartTable from './vue-smart-table.js'
import ExampleComponent from './components/ExampleComponent'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { SmartTable, ExampleComponent }
})

Vue.http.options.xhr = {withCredentials: false}
