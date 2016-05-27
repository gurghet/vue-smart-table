import Vue from 'vue'
import VueResource from 'vue-resource'
import SmartTable from './components/SmartTable'

Vue.use(VueResource)
Vue.component('smart-table', SmartTable)

window.SmartTable = SmartTable
