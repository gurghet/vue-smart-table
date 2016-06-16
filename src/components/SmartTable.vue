<template>
  <div class="smart-table table-responsive">
    <modal @confirm="doCommand"></modal>
    <modal-edit @confirm="doEdit" @close="closedModalEdit"></modal-edit>
    <table :class="tableClassesProcessed">
      <thead>
      <tr>
        <th v-if="actionsArePresent">
          <input class="toggle-all" type="checkbox" @click="toggleAllRows"/>
        </th>
        <th v-for="(column, label) in tableHeader" class="col-{{column}} col-cell {{canOrderBy(column) ? 'ord' : ''}} {{orderClass(column)}}" @click="doOrderBy(column)">
          {{label}}
          <div v-if="filters[column]" class="{{column}}-filter-cue click-cue fa fa-filter" @click="openFilter(column)"></div>
          <div v-if="filters[column] && filters[column].open" class="{{column}}-filter-input">
            <input type="text" v-model="filters[column].model"/>
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
      <tr v-for="entry in processedSmartBody" class="row-{{entry._id}}" track-by="_id">
        <td v-if="actionsArePresent">
          <input id="toggle-{{entry._id}}" value="{{entry._id}}" type="checkbox" v-model="selection"/>
        </td>
        <td
          v-for="(col, value) in entry"
          v-if="col !== '_id'"
          id="cell-{{entry._id}}-{{col}}"
          :class="tdClasses(col, entry._id) + 'cell-' + col"
          @click="valueClick(entry._id, col)"
        >
          <div id="value-{{entry._id}}-{{col}}">
            <slot :name="col">
              {{value}}
            </slot>
          </div>
        </td>
        <th
          v-for="(col, value) in entry"
          id="cell-{{entry._id}}-{{col}}"
          class="cell-{{col}}"
          scope="row"
          v-if="col === '_id' && shouldShowId"
        >
          <div id="value-{{entry._id}}-_id">
            <slot name="_id">
              {{value}}
            </slot>
          </div>
        </th>
        <td v-if="delete">
          <button id="delete-{{entry._id}}" @click="remove(entry._id)">Delete</button>
        </td>
      </tr>
      <tr v-if="addRow" class="row-new">
        <td v-if="actionsArePresent"><!-- to match the toggle checkboxes --></td>
        <td
          v-for="(col, label) in tableHeader"
          id="edit-new-{{col}}"
        >
          <div :class="'ui input' + (isMandatoryField(col) ? ' required field' : '')">
            <input v-if="isEditable(col)" type="text" v-model="newRowInput[col]" placeholder="{{tableHeader[col]}}"/>
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

<script type="module">
  import Modal from './Modal'
  import ModalEdit from './ModalEdit'
  export default {
    components: { Modal, ModalEdit },
    data () {
      return {
        toggleAll: false,
        action: undefined,
        selection: [],
        error: false,
        modalEdit: undefined,
        backMatrix: {},
        newRowInput: {},
        scrolledPast: false,
        filters: {},
        orderKey: undefined,
        reverseOrder: false,
        additionalTdClasses: [], // [col][id][class1, class2...]
        mandatory: [] // [col]true|false
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
      header: [Object, Array],
      orderBy: [Array, Object],
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
      bodyField: {
        type: String,
        default: "body"
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
        return Object.keys(this.tableHeader).filter(col => this.isMandatoryField(col))
      },
      canSaveNewRow () {
        // console.log('mandatory fields are: ' + JSON.stringify(this.mandatoryFields) + '\n' +
        // 'their values are: ' + JSON.stringify(this.mandatoryFields.map(c => this.newRowInput[c])))
        return this.mandatoryFields.every(col => this.validate(col, this.newRowInput[col])) && this.addRow
      },
      editableFields () {
        return Object.keys(this.tableHeader).filter(col => this.isEditable(col))
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

        if (this.body === undefined) {
          this.body = []
        }
        // if object return object
        if (this.header !== undefined && !Array.isArray(this.header)) {
          return this.header
        }
        // the header is either an array or undefined
        var bodyKeys = Object.keys(this.body)
        if (bodyKeys.length < 1) {
          return {}
        }
        var header = {}
        let columns = [...new Set([].concat.apply([], this.body.map(row => Object.keys(row))))]
        // filter hidden columns (columns that start with underscore)
        columns = columns.filter(col => !/^_/.test(col))
        // build the tableHeader object
        columns.forEach((colKey, i) => {
          if (this.header === undefined) {
            header[colKey] = colKey
          } else {
            header[colKey] = this.header[i]
          }
        })

        return header
      },
      mainCol () {
        // choose an appropriate default label column
        if (Object.keys(this.tableHeader).indexOf(this.labelCol) === -1) {
          return Object.keys(this.tableHeader)[0]
        } else {
          return this.labelCol
        }
      },
      processedSmartBody () {
        if (this.body === undefined) {
          this.body = []
        }

        // at least 1 row has id undefined, add them where it's not present
        let counter = 0
        this.body.forEach(row => {
          let idValue = this.idCol.split('.').reduce((o,i)=>o[i], row)
          if ((idValue === undefined || idValue === null) && (row[this.idCol] === undefined || row[this.idCol] === null)) {
            row[this.idCol] = "smart_" + counter++
          }
        })

        // filter body using gui filters
        let smartBody = []

        // filter unwanted rows
        this.body.forEach(row => {
          if (Object.keys(row).every(col =>
            Object.keys(this.filters).every(filter =>
              (filter !== col) ||
              (JSON.stringify(row[col]).toLowerCase().indexOf(this.filters[filter].model.toLowerCase()) !== -1)
            )
          )) {
            // filter unwanted columns
            let finalRow = {}
            Object.keys(this.tableHeader).forEach(col => {
              let realColValue = {}
              if (/\+/.test(col)) {
                // it's a composite column will return an object
                col.split('+').forEach(d=>{
                  realColValue[d] = d.split('.').reduce((o,i)=>o[i], row)
                })
              } else {
                realColValue = col.split('.').reduce((o,i)=>o[i], row)
              }
              finalRow[col] = realColValue
            })
            let idValue = this.idCol.split('.').reduce((o,i)=>o[i], row)
            let altIdValue = row[this.idCol]
            finalRow._id = String(idValue || altIdValue)
            smartBody.push(finalRow)
          }
        })

        if (this.orderKey !== undefined &&
          Object.keys(this.tableHeader).indexOf(this.orderKey) !== -1 &&
        Object.keys(this.orderBy).indexOf(this.orderKey) !== -1) {
          let _this = this
          function numericCompare(row1, row2) {
            let valA = row1[_this.orderKey]
            var valB = row2[_this.orderKey]
            if (valA === undefined || valB === undefined) {
              return 0
            }
            return (valA - valB) * (_this.reverseOrder ? -1 : 1)
          }
          function lexicographicCompare(row1, row2) {
            let valA = row1[_this.orderKey]
            var valB = row2[_this.orderKey]
            if (valA === undefined || valB === undefined) {
              return 0
            }
            var r = (valA > valB) ? 1 : -1
            return r * (_this.reverseOrder ? -1 : 1)
          }

          var lexicographical = this.orderBy[this.orderKey].lexicographical;
          function isNumeric (n) {
            return !isNaN(parseFloat(n)) && isFinite(n)
          }
          let everyRowIsNonNumeric = smartBody.every(r => !isNumeric(r[this.orderKey]))
          if (lexicographical === true || everyRowIsNonNumeric) {
            smartBody.sort(lexicographicCompare)
          } else {
            smartBody.sort(numericCompare)
          }
        }


        return smartBody
      },
      shouldShowId () {
        return Object.keys(this.tableHeader).indexOf('_id') !== -1
      },
      span () {
        return Object.keys(this.tableHeader).length + 1 + (this.delete ? 1 : 0)
      }
    },
    beforeCompile () {
      if ((this.body === undefined || this.body.lenght < 1) && this.autoLoad === false) {
        console.warn("Body passed is empty, if you want to load data set auto-load to true")
      }

      // if orderBy is not an object turn it into one
      if (Array.isArray(this.orderBy)) {
        var orderByObj = {}
        this.orderBy.forEach((el) => orderByObj[el] = {})
        this.orderBy = orderByObj
      }
      if (this.orderBy === undefined) {
        this.orderBy = {}
      }

      // if actions is not an object, it doesn't have labels
      if (Array.isArray(this.actions)) {
        var actionsObj = {}
        this.actions.forEach((el) => actionsObj[el] = el)
        this.actions = actionsObj
      }
      if (this.actions === undefined) {
        this.actions = {}
      }

      // initialize filters
      if (Array.isArray(this.canFilterBy)) {
        let acc = {}
        this.canFilterBy.forEach(col => acc[col] = {open: false, model: ''} )
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
      tdClasses(col, id) {
        let acc = ''
        let isEditableCol = Object.keys(this.editableFields).indexOf(col) !== 1;
        if (isEditableCol) {
          acc += ' selectable'
        }
        if (this.additionalTdClasses[col] === undefined) {
          this.additionalTdClasses[col] = []
        }
        if (this.additionalTdClasses[col][id] === undefined) {
          this.additionalTdClasses[col][id] = []
        }
        this.additionalTdClasses[col][id].forEach(additionalTdClass => acc += ' ' + additionalTdClass)
        return acc
      },
      refresh () {
        this.$http.get(this.endpoint).then((response) => {
          let body = ''
          if (this.bodyField.length === 0) {
            body = response.data
          } else {
            body = response.data[this.bodyField]
          }
          this.$set('body', body)
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
      updateInjectedValues () {
        let children = this.$children
        let columns = Object.keys(this.tableHeader)
        children.forEach(child => {
          let col = (typeof child.$el.getAttribute === 'function') ? child.$el.getAttribute('slot') : null
          if (col !== null && columns.indexOf(col) !== -1) {
            let rowId = child.$el.parentElement.id.match(/^value-([a-zA-Z0-9 ._-]+)-/)[1]
            function findById(row) {
              return row._id === rowId
            }
            let row = this.processedSmartBody.filter(findById)[0]
            child.value = row[col]
            if (this.additionalTdClasses[col] === undefined) {
              this.additionalTdClasses[col] = []
            }
            this.additionalTdClasses[col][rowId] = child.tdClasses || []
            if (child.edit === undefined) {
              child.edit = {}
            }
            this.mandatory[col] = (child.edit.mandatory === true)
            if (this.addRow && child.edit.template !== undefined) {
              let addRowId = '#edit-new-' + col
              let template = child.edit.template
              let EditComponent = Vue.extend({
                template
              })
              let editComponent = new EditComponent({
                data: {

                }
              })
              editComponent.$mount(addRowId)
              // 1. mount the input sub-component
              // 2. add watcher for known value inside sub-component
              // 3. link said value to newRow[col]
            }
          }
        });
      },
      toggleAllRows () {
        if (this.toggleAll === false) {
          this.toggleAll = true
          this.selection = Object.keys(this.processedSmartBody)
        } else {
          this.toggleAll = false
          this.selection = []
        }
      },
      next () {
        var actionKey = this.action
        var actionLabel = this.actions[this.action]
        var selectionKeyLabel = this.selection.map(rowId => {
          let selectedRow = this.processedSmartBody.filter((row => row._id === rowId))[0]
          if (selectedRow !== undefined) {
            let rowLabel = selectedRow[this.mainCol];
              return {key: rowId, label: rowLabel}
          } else {
            return null
          }
        }).filter(a => a !== null)
        var commandToBeConfirmed = { action: { key: actionKey, label: actionLabel}, selection: selectionKeyLabel }
        this.$broadcast('command', commandToBeConfirmed)
      },
      doCommand (command) {
        this.$dispatch('before-request')

        // special case
        if (/^(_remove|_delete)$/i.test(command.action)) {
          this.$http.delete(this.endpoint, command).then(onSuccess, onFailure)
        } else {
          this.$http.get(this.endpoint, command).then(onSuccess, onFailure)
        }

        function onSuccess(response) {
          let body = ''
          if (this.bodyField.length === 0) {
            body = response.data
          } else {
            body = response.data[this.bodyField]
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

        function onFailure(response) {
          this.$set('error', { status: response.status, data: response.data.error })
          this.$dispatch('failed-request')
          this.$dispatch('after-request')
        }
      },
      remove (id) {
        this.$dispatch('before-request')

        this.$http.delete(this.endpoint + '/' + id).then(onSuccess, onFailure)

        function onSuccess(response) {
          let body = ''
          if (this.bodyField.length === 0) {
            body = response.data
          } else {
            body = response.data[this.bodyField]
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

        function onFailure(response) {
          this.$set('error', { status: response.status, data: response.data.error })
          this.$dispatch('failed-request')
          this.$dispatch('after-request')
        }
      },
      isEditable (col) {
        // console.log(JSON.stringify(col), 'is', this.editable.indexOf(col) !== -1, 'editable, (editables are', JSON.stringify(this.editable), ')')
        return this.editable.indexOf(col) !== -1;
      },
      valueClick (id, col) {
        if (!this.isEditable(col)) {
          return
        }
        if (this.modalEdit === undefined) {
          const rowObj = this.processedSmartBody.filter(row => row._id === id)[0];
          if (rowObj === undefined) {
            let possibleId = rowObj._id
            let maybeBit = possibleId ? '\nMaybe you meant '+JSON.stringify(possibleId) : ''
            // console.error('Cannot find row with id '+JSON.stringify(id)+maybeBit)
            return
          }
          this.modalEdit = {
            id: id,
            col: col,
            currentValue: rowObj[col],
            previousValue: rowObj[col]
          }
          this.$broadcast('modalEdit', this.modalEdit)
        }
      },
      doEdit (modalEdit) {
        this.$dispatch('before-request')
        this.$http.put(this.endpoint + '/' + modalEdit.id + '/' + modalEdit.col, {
          action: 'edit',
          value: modalEdit.currentValue
        }).then((response) => {
          this.$dispatch('successful-request')
          this.$dispatch('after-request')
          this.$set('error', false)
          this.maybeRefresh()
        }, (response) => {
          this.$set('error', { status: response.status, data: response.data.error})
          this.$dispatch('failed-request')
          this.$dispatch('after-request')
        })
      },
      isPlainObject ( obj ) {
        return obj !== null && typeof obj === 'object'
      },
      isMandatoryField (col) {
        if (this.mandatory[col] === false) {
          // console.log(col + 'is explicitly non mandatory')
          return false;
        }
        return this.mandatory[col] || this.isEditable(col)
        // todo: subject to change
      },
      doOrderBy (col) {
        if (this.canOrderBy(col)) {
          return;
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
        return Object.keys(this.orderBy).indexOf(col) === -1
      },
      closedModalEdit () {
        this.modalEdit = undefined
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
