<template>
  <div class="smart-table table-responsive">
    <modal @confirm="doCommand"></modal>
    <table :class="tableClassesProcessed">
      <thead>
      <tr>
        <th v-if="actionsArePresent">
          <input class="toggle-all" type="checkbox" @click="toggleAllRows"/>
        </th>
        <th v-for="column in tableHeader" class="col-{{column.key}} col-cell {{canOrderBy(column.key) ? 'ord' : ''}} {{orderClass(column.key)}}" @click="doOrderBy(column.key)">
          {{column.label || column.key}}
          <div v-if="filters[column.key]" class="{{column.key}}-filter-cue click-cue fa fa-filter" @click="openFilter(column.key)"></div>
          <div v-if="filters[column.key] && filters[column.key].open" class="{{column.key}}-filter-input">
            <input type="text" v-model="filters[column.key].model"/>
          </div>
        </th>
        <th v-if="delete">
        </th>
      </tr>
      </thead>
      <tfoot>
      <tr v-for="footerRow in processedFooter" class="footer-row">
        <td v-if="actionsArePresent"><!-- to match the toggle checkboxes --></td>
        <td v-for="footerCell in footerRow" track-by="$index">
          {{footerCell}}
        </td>
        <td v-if="delete"></td>
      </tr>
      <tr v-if="actionsArePresent" class="action-row">
        <td class="smart-control-bar" colspan="{{span}}">
          <span class="bottom-right-corner">&#8990;</span>
          <select class="actions" v-model="action">
            <option v-for="(key, label) in actions" value="{{key}}" class="action-label">{{label}}</option>
          </select>
          <button class="action-button" @click="next">Next...</button>
        </td>
      </tr>
      </tfoot>
      <tbody>
      <tr v-for="row in smartBody" class="row-{{row._id}}" track-by="_id">
        <td v-if="actionsArePresent">
          <input id="toggle-{{row._id}}" value="{{row._id}}" type="checkbox" v-model="selection"/>
        </td>
        <td
          v-for="col in row.cols"
          id="cell-{{row._id}}-{{col}}"
          :class="tdClasses(col, row._id) + ' cell-' + col"
        >
          <div id="value-{{row._id}}-{{col}}">
            <slot :name="col">
              {{placeholder}}
            </slot>
          </div>
        </td><!-- todo: when upgrading to 2.x.x put a th here for the mainCol -->
        <td v-if="delete">
          <button id="delete-{{row._id}}" @click="remove(row._id)">Delete</button>
        </td>
      </tr>
      <tr v-if="addRow" class="row-new">
        <td v-if="actionsArePresent"><!-- to match the toggle checkboxes --></td>
        <td
          v-for="col in tableHeader"
          id="edit-cell-{{col.key}}"
          :class="tdClasses(col.key, '__edit') + ' edit-cell'"
        >
          <div
            id="edit-new-{{col.key}}"
            class="add-row"
            >
            <slot :name="col.key">
            </slot>
          </div>
        </td>
        <td v-if="delete"></td>
      </tr>
      </tbody>
    </table>
    <div class="add-row-button" v-show="canSaveNewRow"><button class="ui button" @click="saveNewRow">Add Row</button></div>
    <div class="error-panel" v-show="error">{{error | json}}</div>
  </div>
</template>

<script lang="babel">
  import Modal from './Modal'
  import cssesc from 'css.escape'
  import PlainText from './PlainText'
  import Vue from 'vue'
  Vue.component('plain-text', PlainText)
  export default {
    components: { Modal },
    data () {
      return {
        toggleAll: false,
        action: undefined,
        selection: [],
        error: false,
        backMatrix: {},
        newRowInput: {},
        scrolledPast: false,
        filters: {},
        orderKey: undefined,
        reverseOrder: false,
        additionalTdClasses: [], // [col][id][class1, class2...]
        mandatory: [], // [col]true|false
        customEditChildrenByCol: {},
        addRowCompiled: {}
        // totals: undefined // footer line with totals
      }
    },
    props: {
      tableClasses: {
        type: String,
        default: 'ui celled table'
      },
      autoLoad: Boolean,
      autoRefresh: Boolean,
      canFilterBy: Array,
      header: {
        type: Array,
        default () {
          return []
        }
      },
      orderBy: Array,
      idCol: {
        type: String,
        required: false,
        default: '_id'
      },
      'delete': {
        type: Boolean,
        default: false
      },
      footer: {
        required: false
      },
      bodyPath: {
        type: String,
        default: 'body'
      },
      body: {
        type: Array,
        required: false,
        default: undefined
      },
      actions: [Object, Array],
      endpoint: {
        type: String,
        default: 'http://localhost:8080'
      },
      labelCol: {
        type: String,
        default: 'name'
      },
      editable: {
        type: Array,
        default () {
          return []
        }
      },
      addRow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      placeholder () {
        if (this.autoLoad) {
          return '...'
        } else {
          return '&#9888'
        }
      },
      tableClassesProcessed () {
        if (this.orderBy !== {}) {
          return 'sortable ' + this.tableClasses
        } else {
          return this.tableClasses
        }
      },
      processedFooter () {
        if (this.footer === undefined) {
          return []
        }
        if (this.footer.constructor === Array) {
          if (this.footer.length > 0 &&
            this.footer[0].constructor === Array) { // this is a matrix
            return this.footer
          } else { // this is an array
            return [this.footer] // now it is also a matrix
          }
        }
        if (typeof this.footer === 'object') {
          return this.footer
        }
      },
      mandatoryFields () {
        // console.log('tableHeader(of which mandatory fields are always a subset) is: ' + JSON.stringify(Object.keys(this.tableHeader)) + '\n' +
        // 'their mandatoriness is ' + JSON.stringify(Object.keys(this.tableHeader).map(h => this.isMandatoryField(h))))
        return this.tableHeader.filter(col => this.isMandatoryField(col.key))
      },
      canSaveNewRow () {
        // console.log('mandatory fields are: ' + JSON.stringify(this.mandatoryFields) + '\n' +
        // 'their values are: ' + JSON.stringify(this.mandatoryFields.map(c => this.newRowInput[c])))
        return this.mandatoryFields.every(col => this.validate(col, this.newRowInput[col])) && this.addRow
      },
      // fields that right now are visible and editable and should present themselves in the new row if present
      editableFields () {
        return this.tableHeader.filter(col => this.isEditable(col.key))
      },
      actionsArePresent () {
        if (Array.isArray(this.actions) && this.actions.length > 0) {
          return true
        }
        if (this.actions instanceof Object && Object.keys(this.actions).length > 0) {
          return true
        }
        return false
      },
      tableHeader () {
        // WARNING: must not (and cannot) depend on processedSmartBody!

        // if not every column is a string return as is
        if (!this.header.every(col => typeof col === 'string' || col instanceof String)) {
          if (this.header.some(col => typeof col === 'string' || col instanceof String)) {
            console.error('[Smart Table Error] Some elements of the header are strings while other are not, cannot have a mixed header')
            return
          }
          return this.header
        }
        // else, the header is an array of strings, build one
        // 1. check that the header has the same number of columns as the body
        let body = this.body
        if (this.body === undefined) {
          body = []
        }
        // columns is the set of all the columns in the body
        let columns = [...new Set([].concat.apply([], body.map(row => Object.keys(row))))]
        // filter hidden columns (columns with keys that start with underscore)
        columns = columns.filter(col => !/^_/.test(col))
        let header = []
        if (this.header.length < 1) {
          header = columns
        } else {
          header = this.header
        }
        if (header.length !== columns.length) {
          console.error('[Smart Table Error] The number of columns specified ' +
          header.length +
          ' does not match the number of columns in the body ' + columns.length)
        }
        // build the tableHeader object
        let finalHeader = []
        header.forEach((colLabel, i) => {
          finalHeader[i] = {key: columns[i], label: header[i]}
        })

        return finalHeader
      },
      mainCol () {
        // choose an appropriate default label column
        if (this.tableHeader.find(col => col.key === this.labelCol) === undefined) {
          return this.tableHeader[0].key
        } else {
          return this.labelCol
        }
      },
      smartBody () {
        return this.processedSmartBody.map(row => {
          let cols = this.tableHeader.map(col => col.key)
          // todo: _id should be already filtered if the table header is only strings
          /* cols = cols
            .filter(col => col !== '_id' || this.shouldShowId)*/
          return {_id: row._id, cols}
        })
      },
      processedSmartBody () {
        function getDataFromDotNotation (d, row) {
          return d.split('.').reduce((o, i) => o[i], row)
        }

        if (this.body === undefined) {
          this.body = []
        }

        // at least 1 row has id undefined, add them where it's not present
        let counter = 0
        this.body.forEach(row => {
          let idValue = getDataFromDotNotation(this.idCol, row)
          if ((idValue === undefined || idValue === null) && (row[this.idCol] === undefined || row[this.idCol] === null)) {
            row[this.idCol] = 'smart_' + counter++
          }
        })

        let smartBody = []

        this.body.forEach(row => {
          // filter unwanted columns
          let finalRow = {}
          this.tableHeader.forEach(col => {
            let realColValue = {}
            if (/\+/.test(col.key)) {
              // it's a composite column will return an object
              col.key.split('+').forEach(d => {
                realColValue[d] = getDataFromDotNotation(d, row)
              })
            } else {
              realColValue = getDataFromDotNotation(col.key, row)
            }
            finalRow[col.key] = realColValue
          })
          let idValue = getDataFromDotNotation(this.idCol, row)
          let altIdValue = row[this.idCol]
          finalRow._id = String(idValue || altIdValue)
          smartBody.push(finalRow)
        })
        // filter body using gui filters
        // todo: if filterable bla bla smartBody = filterRows(smartBody)
        if (this.orderKey !== undefined) {
        // this.tableHeader.find(col => col.key === this.sortKey) &&
        // Object.keys(this.orderBy).indexOf(this.sortKey) !== -1) {
          smartBody = this.sortRows(smartBody, this.orderKey, this.reverseOrder)
        }

        return smartBody
      },
      shouldShowId () {
        return this.tableHeader.find(col => col.key === '_id') !== undefined
      },
      span () {
        return this.tableHeader.length + 1 + (this.delete ? 1 : 0)
      }
    },
    beforeCompile () {
      if ((this.body === undefined || this.body.length < 1) && this.autoLoad === false) {
        console.warn('Body passed is empty, if you want to load data set auto-load to true')
      }

      // if orderBy is not an object turn it into one
      if (Array.isArray(this.orderBy)) {
        var orderByObj = {}
        this.orderBy.forEach(el => { orderByObj[el] = {} })
        this.orderBy = orderByObj
      }
      if (this.orderBy === undefined) {
        this.orderBy = {}
      }

      // if actions is not an object, it doesn't have labels
      if (Array.isArray(this.actions)) {
        var actionsObj = {}
        this.actions.forEach(el => (actionsObj[el] = el))
        this.actions = actionsObj
      }
      if (this.actions === undefined) {
        this.actions = {}
      }

      // initialize filters
      if (Array.isArray(this.canFilterBy)) {
        let acc = {}
        this.canFilterBy.forEach(col => (acc[col] = {open: false, model: ''}))
        this.filters = acc
      }
    },
    compiled () {
      // load data if auto-load set to true
      if (this.autoLoad === true) {
        this.refresh()
      } else {
        this.updateInjectedValues()
      }
    },
    watch: {
      'body' () {
        this.updateInjectedValues()
      }
    },
    methods: {
      filterRows (smartBody, filterText, filterCol) {
        return smartBody.filter(row => true)
      },
      sortRows (smartBody, sortKey, reverse) {
        function numericCompare (row1, row2) {
          let valA = row1[sortKey]
          var valB = row2[sortKey]
          if (valA === undefined || valB === undefined) {
            return 0
          }
          return (valA - valB) * (reverse ? -1 : 1)
        }
        function lexicographicCompare (row1, row2) {
          let valA = row1[sortKey]
          var valB = row2[sortKey]
          if (valA === undefined || valB === undefined) {
            return 0
          }
          var r = (valA > valB) ? 1 : -1
          return r * (reverse ? -1 : 1)
        }
        let child = this.$children.find(c => c.col === sortKey)
        if (child.sortFunction !== undefined && typeof child.sortFunction === 'function') {
          smartBody.sort(child.sortFunction)
          return smartBody
        }
        let forceLexicographic = false
        if (child.sortFunction !== undefined && typeof child.sortFunction === 'string') {
          if (child.sortFunction === 'lexicographic') {
            forceLexicographic = true
          }
        }

        let everyRowIsNonNumeric = smartBody.every(r => !this.isNumeric(r[sortKey]))
        if (everyRowIsNonNumeric | forceLexicographic) {
          smartBody.sort(lexicographicCompare)
        } else {
          smartBody.sort(numericCompare)
        }
        return smartBody
      },
      tdClasses (col, id) {
        let acc = ''
        if (this.isEditable(col)) {
          acc += 'selectable '
        }
        if (this.additionalTdClasses[col] === undefined) {
          this.additionalTdClasses[col] = []
        }
        if (this.additionalTdClasses[col][id] === undefined) {
          this.additionalTdClasses[col][id] = []
        }
        this.additionalTdClasses[col][id].forEach(additionalTdClass => (acc += ' ' + additionalTdClass))
        return acc
      },
      refresh () {
        this.$dispatch('before-request')
        this.$http.get(this.endpoint).then((response) => {
          let retBody = []
          if (this.bodyPath.length === 0) {
            retBody = response.data
          } else {
            retBody = response.data[this.bodyPath]
          }
          Vue.set(this, 'body', retBody)
          this.$set('footer', response.data.footer)
          this.$dispatch('successful-request')
          this.$dispatch('after-request')
          this.$set('error', false)
          this.updateInjectedValues()
        }, (response) => {
          this.$set('error', { status: response.status, data: response.data.error })
          this.$dispatch('failed-request')
          this.$dispatch('after-request')
        })
      },
      maybeRefresh () {
        if (this.autoRefresh) {
          this.refresh()
        }
      },
      openFilter (column) {
        this.filters[column].open = true
      },
      saveNewRow () {
        if (this.canSaveNewRow) {
          this.$dispatch('before-request')
          this.$http.post(this.endpoint, {action: 'addRow', resource: this.newRowInput}).then((response) => {
            this.$set('error', false)
            this.$set('body', response.data.body)
            this.$dispatch('successful-request')
            this.$dispatch('after-request')
            this.maybeRefresh()
          }, (response) => {
            this.$set('error', {status: response.status, data: response.data})
            this.$dispatch('failed-request')
            this.$dispatch('after-request')
          })
        }
      },
      validate (col, value) {
        return (value !== undefined && value !== '')
        // todo: more complex validation
      },
      injectEditComponentForCol (col) {
        let father = this
        let child
        let escapedEditCol = cssesc('edit-new-' + col)
        if (father.customEditChildrenByCol[col] === undefined) {
          if (!father.isMandatoryField(col) && !father.isEditable(col)) {
            this.addRowCompiled[col] = true
            return
          }
          // no component for column, default on built-in PlainText
          Object.keys(PlainText.props).forEach(p => (PlainText.props[p].coerce = undefined))
          let PlainTextConstructor = Vue.extend(PlainText)
          child = new PlainTextConstructor({
            el: father.$el.querySelector('#' + escapedEditCol),
            parent: father
          })
        } else {
          child = father.customEditChildrenByCol[col]
          if (!father.isMandatoryField(col) && !father.isEditable(col)) {
            if (child !== undefined) {
              child.$destroy(true)
              father.customEditChildrenByCol[col] = undefined
              this.addRowCompiled[col] = true
              return
            }
          }
          let initialProps = child.$options.props
          if (child._props !== undefined) {
            let propKeys = Object.keys(child._props)
            let propValues = {}
            propKeys.forEach(k => (propValues[k] = child[k]))
            let additionalFunctions = propKeys.map(k => function coerce () { return child[k] })
            Object.keys(initialProps).forEach((p, i) => (initialProps[p].coerce = additionalFunctions[i]))
          }
          let mix = {
            methods: {
              enterEditMode () {
                this.$dispatch('enterEditMode', {id: this.id, col: this.col})
              },
              saveNewValue () {
                this.$dispatch('saveNewValue', {id: this.id, col: this.col})
              },
              cancel () {
                this.$dispatch('cancel', {id: this.id, col: this.col})
              }
            }
          }
          let options = Object.assign({}, child.$options, {
            mixins: [mix],
            el () {
              return father.$el.querySelector('#' + escapedEditCol)
            },
            props: initialProps
          })
          let Constru = Vue.extend(options)
          child.$destroy()
          child = new Constru({
            parent: father
          })
        }
        Vue.set(child, 'id', '____add-row')
        Vue.set(child, 'col', col)
        Vue.set(child, 'mode', 'edit')
        Vue.set(child, 'mandatory', this.isMandatoryField(col))
        this.addRowCompiled[col] = true
      },
      updateInjectedValues () {
        let father = this
        let customChildrenByCol = {}
        father.$children.forEach(c => {
          if (/^edit/.test(c.$el.parentElement.id)) {
            let col = c.$el.parentElement.id.match(/^edit-(?:new|cell)-([a-zA-Z0-9.+]+)/)[1]
            if (this.customEditChildrenByCol[col] === undefined) {
              this.customEditChildrenByCol[col] = c
            }
          }
          if (/^value/.test(c.$el.parentElement.id)) {
            let id = c.$el.parentElement.id.match(/^value-([a-zA-Z0-9 ._-]+)-/)[1]
            let col = c.$el.parentElement.id.match(/^value-[a-zA-Z0-9 ._-]+-([a-zA-Z0-9.+]+)$/)[1]
            if (customChildrenByCol[col] === undefined) {
              customChildrenByCol[col] = {}
            }
            customChildrenByCol[col][id] = c
          }
        })
        let elsByColId = {}
        function byId (id) {
          return function (row) {
            return row._id === id
          }
        }
        father.tableHeader.map(c => c.key)
          .forEach(col => {
            let escapedCol = cssesc(col)
            if (father.addRow === true && (father.addRowCompiled[col] === false || father.addRowCompiled[col] === undefined)) {
              father.injectEditComponentForCol(col)
            }
            if (elsByColId[col] === undefined) {
              elsByColId[col] = {}
              Array.from(father.$el.querySelectorAll('.cell-' + escapedCol)).forEach(cell => {
                let id = cell.id.match(/^cell-([a-zA-Z0-9 ._-]+)-/)[1]
                elsByColId[col][id] = cell
              })
            }
            Object.keys(elsByColId[col]).forEach(id => {
              let child
              let row = father.processedSmartBody.find(byId(id))
              let escapedId = '#' + cssesc('value-' + id + '-' + col)
              if (customChildrenByCol[col] !== undefined && customChildrenByCol[col][id] !== undefined) {
                child = customChildrenByCol[col][id]
                let initialProps = child.$options.props
                if (child._props !== undefined) {
                  let propKeys = Object.keys(child._props)
                  let propValues = {}
                  propKeys.forEach(k => (propValues[k] = child[k]))
                  let additionalFunctions = propKeys.map(k => function coerce () { return child[k] })
                  Object.keys(initialProps).forEach((p, i) => (initialProps[p].coerce = additionalFunctions[i]))
                }
                let mix = {
                  methods: {
                    enterEditMode () {
                      this.$dispatch('enterEditMode', {id: this.id, col: this.col})
                    },
                    saveNewValue () {
                      this.$dispatch('saveNewValue', {id: this.id, col: this.col})
                    },
                    cancel () {
                      this.$dispatch('cancel', {id: this.id, col: this.col})
                    }
                  }
                }
                let options = Object.assign({}, child.$options, {
                  mixins: [mix],
                  el () {
                    return father.$el.querySelector(escapedId)
                  },
                  props: initialProps
                })
                let Constru = Vue.extend(options)
                child.$destroy()
                child = new Constru({
                  parent: father
                })
              } else {
                // no custom component default on built-in PlainText
                Object.keys(PlainText.props).forEach(p => (PlainText.props[p].coerce = undefined))
                let PlainTextConstructor = Vue.extend(PlainText)
                child = new PlainTextConstructor({
                  el: father.$el.querySelector(escapedId),
                  // having father in the argument ensures that this works even if smart table is not mounted in the DOM
                  parent: father
                })
                if (father.$el.querySelector(escapedId) === undefined) {
                  console.error('could not find element "' + escapedId + '"')
                  return
                }
              }
              if (child === undefined) {
                console.error('no child component found for id ' + id.match(/^cell-([a-zA-Z0-9 ._-]+)-/)[1])
                return
              }
              Vue.set(child, 'id', id)
              Vue.set(child, 'col', col)
              Vue.set(child, 'mode', 'readOnly')
              Vue.set(child, 'value', row[col])
              // Vue.set(child, 'newValue', row[col])
              Vue.set(child, 'editable', father.isEditable(col))
              if (father.additionalTdClasses[col] === undefined) {
                father.additionalTdClasses[col] = []
              }
              father.additionalTdClasses[col][id] = child.tdClasses || []
            })
          })
      },
      toggleAllRows () {
        if (this.toggleAll === false) {
          this.toggleAll = true
          this.selection = this.processedSmartBody.map(r => r._id)
        } else {
          this.toggleAll = false
          this.selection = []
        }
      },
      next () {
        var actionKey = this.action
        var actionLabel = this.actions[this.action]
        var selectionKeyLabel = this.selection.map(rowId => {
          let selectedRow = this.processedSmartBody.filter(row => row._id === rowId)[0]
          if (selectedRow !== undefined) {
            let rowLabel = selectedRow[this.mainCol]
            return {key: rowId, label: rowLabel}
          } else {
            return null
          }
        }).filter(a => a !== null)
        var commandToBeConfirmed = { action: { key: actionKey, label: actionLabel }, selection: selectionKeyLabel }
        this.$broadcast('command', commandToBeConfirmed)
      },
      doCommand (command) {
        this.$dispatch('before-request')

        // special case
        if (/^(_remove|_delete)$/i.test(command.action)) {
          this.$http.delete(this.endpoint, command).then(this.onSuccess, this.onFailure)
        } else {
          this.$http.get(this.endpoint, command).then(this.onSuccess, this.onFailure)
        }
      },
      remove (id) {
        this.$dispatch('before-request')

        this.$http.delete(this.endpoint + '/' + id).then(this.onSuccess, this.onFailure)
      },
      // this field, if visible, should be editable and present in the new row
      isEditable (col) {
        return this.editable.indexOf(col) !== -1
      },
      /**
       *
       * @param resource {value, id, col}
       * @param httpRESTreq if false will not propagate PUT request
         */
      put (resource, httpRESTreq = true) {
        this.$dispatch('before-request')
        let child = this.$children.find(c => c.id === resource.id && c.col === resource.col)
        if (child === undefined) {
          console.error('Children with id ' + resource.id + ' was not found')
          return
        }
        Vue.set(child, 'mode', 'saving')
        if (httpRESTreq) {
          this.$http.put(this.endpoint + '/' + resource.id + '/' + resource.col, {
            action: 'edit',
            value: resource.value
          }).then((response) => {
            Vue.set(child, 'mode', 'readOnly')
            Vue.set(child, 'value', resource.value)
            this.$dispatch('successful-request')
            this.$dispatch('after-request')
            this.$set('error', false)
            this.maybeRefresh()
          }, (response) => {
            Vue.set(child, 'mode', 'readOnly')
            this.$set('error', {status: response.status, data: response.data.error})
            this.$dispatch('failed-request')
            this.$dispatch('after-request')
          })
        }
      },
      post (resource, httpRESTreq = true) {
        setTimeout(() => {
          // 1) sends request
          // 2) receive reply
          // 3) if ok add row to body and reset new row
        }, 1000)
      },
      isPlainObject (obj) {
        return obj !== null && typeof obj === 'object'
      },
      isMandatoryField (col) {
        if (this.mandatory[col] === false) {
          // console.log(col + 'is explicitly non mandatory')
          return false
        }
        return this.mandatory[col] || this.isEditable(col)
        // todo: subject to change
      },
      doOrderBy (col) {
        if (!this.canOrderBy(col)) {
          return
        }
        if (this.orderKey === col) {
          this.reverseOrder = !this.reverseOrder
        } else {
          this.reverseOrder = false
        }
        this.orderKey = col
      },
      orderClass (col) {
        if (this.orderKey === col && this.reverseOrder === false) {
          return 'sorted ascending'
        }
        if (this.orderKey === col && this.reverseOrder === true) {
          return 'sorted descending'
        }
        return ''
      },
      canOrderBy (col) {
        return Object.keys(this.orderBy).indexOf(col) !== -1
      },
      isNumeric (n) {
        return !!(+('1' + n) || +(n + '1')) && !Array.isArray(n) && isFinite(n) && (n !== '')
      },
      onFailure (response) {
        this.$set('error', {status: response.status, data: response.data.error})
        this.$dispatch('failed-request')
        this.$dispatch('after-request')
      },
      onSuccess (response) {
        let body = ''
        if (this.bodyPath.length === 0) {
          body = response.data
        } else {
          body = response.data[this.bodyPath]
        }
        if (body !== undefined || body === {}) {
          this.$set('body', body)
          this.$set('footer', response.data.footer)
        }
        this.$dispatch('successful-request')
        this.$dispatch('after-request')
        this.$set('error', false)
        this.maybeRefresh()
      }
    },
    events: {
      'saveNewValue' ({id, col}) {
        let child = this.$children.find(c => c.id === id && c.col === col)
        if (id === '____add-row') {
          this.newRowInput[col] = child.newValue
        } else {
          if (child.mode === 'edit') {
            this.put({value: child.newValue, id, col})
          }
        }
      },
      'enterEditMode' ({id, col}) {
        let child = this.$children.find(c => c.id === id && c.col === col)
        if (child.mode === 'readOnly') {
          if (!child.editable) {
            console.log('Clicked non-editable field ' + col + '-' + id + '. Ignoring.')
            return
          }
          child.mode = 'edit'
          child.newValue = child.value
        }
      },
      'cancel' ({id, col}) {
        if (id === '____add-row') {
          return
        }
        let child = this.$children.find(c => c.id === id && c.col === col)
        if (child.mode === 'edit') {
          setTimeout(() => {
            if (child.mode === 'edit') {
              child.mode = 'readOnly'
              child.newValue = undefined
            }
          }, 120)
        }
      }
    }
  }
</script>

<style>

  .bottom-right-corner {
    font-size: 42px;
    float: left;
    height: 1px;
    top: -25px;
    position: relative;
    width: 32px;
    left: 5px;
    pointer-events: none;
    cursor: default;
  }

  .action-label {
    text-transform: capitalize;
  }

  table input[type="checkbox"] {
    transform: scale(1.4);
    margin: 0;
  }

  .error-panel {
    width: 100%;
    height: 50px;
    background-color: #260707;
    color: #c8999e;
  }

  .click-cue {
    width: 1em;
    height: 1em;
  }
</style>
