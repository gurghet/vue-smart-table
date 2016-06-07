import Vue from 'vue'
import './vue-smart-table.js'
let SmartTable = window.SmartTable
import Src2img from './components/Src2img'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.component('smart-table', SmartTable)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { SmartTable, Src2img }
})

Vue.http.options.xhr = {withCredentials: false}
