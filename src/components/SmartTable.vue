<template>
  <div class="smart-table">
    <modal @confirm="doCommand"></modal>
    <modal-edit @confirm="doEdit" @close="closedModalEdit"></modal-edit>
    <table class="persist-area">
      <thead v-show="scrolledPast" class="floating-header">
      <th v-if="actionsArePresent">
        <input class="toggle-all" type="checkbox" @click="toggleAllRows"/>
      </th>
      <th v-for="(column, label) in tableHeader" class="col-{{column}} col-cell">
        {{label}}
        <div v-if="filters[column]" class="{{column}}-filter-cue click-cue fa fa-filter" @click="openFilter(column)"></div>
        <div v-if="filters[column] && filters[column].open" class="{{column}}-filter-input">
          <input type="text" v-model="filters[column].model"/>
        </div>
      </th>
      </thead>
      <thead class="regular-header" :class="{ transparent: scrolledPast }">
      <tr>
        <th v-if="actionsArePresent">
          <input class="toggle-all" type="checkbox" @click="toggleAllRows"/>
        </th>
        <th v-for="(column, label) in tableHeader" class="col-{{column}}">
          {{label}}
          <div v-if="filters[column]" class="{{column}}-filter-cue click-cue fa fa-filter" @click="openFilter(column)"></div>
          <div v-if="filters[column] && filters[column].open" class="{{column}}-filter-input">
            <input type="text" v-model="filters[column].model"/>
          </div>
        </th>
      </tr>
      </thead>
      <tfoot>
      <tr v-if="totals" class="totals-row">
        <td v-if="actionsArePresent"><!-- to match the toggle checkboxes --></td>
        <td v-for="(col, totalCell) in totals" id="value-total-{{col}}" track-by="$index">
          {{totalCell}}
        </td>
      </tr>
      <tr v-for="footerRow in processedFooter" class="footer-row">
        <td v-if="actionsArePresent"><!-- to match the toggle checkboxes --></td>
        <td v-for="footerCell in footerRow" track-by="$index">
          {{footerCell}}
        </td>
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
      <tr v-for="(id, entry) in processedSmartBody
        | orderBy orderKey -1" class="row-{{id}}">
        <td v-if="actionsArePresent">
          <input id="toggle-{{id}}" value="{{id}}" type="checkbox" v-model="selection"/>
        </td>
        <td
          v-for="(col, value) in entry"
          id="cell-{{id}}-{{col}}"
          class="cell-{{col}}"
          @dblclick="valueClick(id, col)"
        >
          <div id="value-{{id}}-{{col}}">
            <slot :name="col">
              {{value}}
            </slot>
          </div>
        </td>
      </tr>
      <tr v-if="addRow" class="row-new">
        <td v-if="actionsArePresent"><!-- to match the toggle checkboxes --></td>
        <td
          v-for="(col, value) in tableHeader"
          id="edit-new-{{col}}"
        >
          <input v-if="isEditable(col) && editType(col) !== 'select'" :type="editType(col)" v-model="newRow[col]"/>
          <select v-if="isEditable(col) && editType(col) === 'select'" v-model="newRow[col]">
            <option v-for="(value, label) in inputList[col]" value="{{value}}" class="input-label">{{label}}</option>
          </select>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="add-row-button" v-show="canSaveNewRow"><button @click="saveNewRow">Add Row</button></div>
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
        newRow: {},
        canSaveNewRow: false,
        scrolledPast: false,
        filters: {},
        totals: undefined // footer line with totals
      }
    },
    props: {
      canFilterBy: Array,
      orderKey: String,
      useTextAreaFor: Array,
      header: [Object, Array],
      footer: {
        required: false
      },
      inputList: {
        type: Object,
        required: false,
        default: undefined
      },
      body: {
        type: Object,
        required: true,
        validator (body) {
          if (body === null || body === undefined) {
            console.log('Passed null as body! If you are loading data, pass an empty object')
            return false
          }
          const bodyKeys = Object.keys(body)
          if (bodyKeys.length < 1) {
            console.log('Warning: body has no rows')
            return true
          }
          const firstEntry = body[bodyKeys[0]]
          const firstEntryCol = Object.keys(firstEntry)
          const span = firstEntryCol.length
          for (var id in body) {
            if (body.hasOwnProperty(id)) {
              var entrySpan = Object.keys(body[id]).length
              if (span !== entrySpan) {
                console.log('entry ' + JSON.stringify(body[id]) + ' has not length ' + span)
                return false
              }
            }
          }
          return true
        }
      },
      actions: [Object, Array],
      endpoint: {
        type: String,
        default: 'http://jsonplaceholder.typicode.com/photos'
      },
      labelCol: {
        type: String,
        default: 'name'
      },
      editable: {
        default: true
      },
      addRow: {
        type: Boolean,
        default: false
      },
      sum: {
        type: Array,
        default: () => []
      }
    },
    computed: {
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
      canSaveNewRow () {
        if (Object.keys(this.newRow).length === 0) {
          return false
        }
        var retVal = true
        this.editableFields.forEach((col) => {
          if (!this.newRow.hasOwnProperty(col)) {
            retVal = false
          } else {
            if (this.newRow[col] === undefined || this.doesNotPassValidation(col, this.newRow[col])) {
              retVal = false
            }
          }
        })
        return retVal
      },
      editableFields () {
        const tableCols = Object.keys(this.tableHeader)
        if (this.editable === true) {
          return tableCols
        }
        if (this.editable === false) {
          return []
        }
        if ($.isArray(this.editable) && this.editable.length > 0) {
          return this.editable.filter((el) => tableCols.indexOf(el) !== -1)
        }
        if ($.isPlainObject(this.editable) && Object.keys(this.editable) > 0) {
          return Object.keys(this.editable).filter((el) => tableCols.indexOf(el) !== -1)
        }
        return []
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
        // if object return object
        if (this.header !== undefined && !Array.isArray(this.header)) {
          return this.header
        }
        var bodyKeys = Object.keys(this.body)
        if (bodyKeys.length < 1) {
          return {}
        }
        var header = {}
        const firstEntry = this.body[bodyKeys[0]]
        const firstEntryKeys = Object.keys(firstEntry)
        firstEntryKeys.forEach((colKey, i) => {
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
        var bodyKeys = Object.keys(this.body)
        const firstEntry = this.body[bodyKeys[0]]
        const firstEntryKeys = Object.keys(firstEntry)
        if (firstEntryKeys.indexOf(this.labelCol) === -1) {
          return firstEntryKeys[0]
        } else {
          return this.labelCol
        }
      },
      processedSmartBody () {
        const bodyKeys = Object.keys(this.body)
        var retVal = {}
        bodyKeys.forEach((rowID) => {
          retVal[rowID] = {}
          const colIDs = Object.keys(this.tableHeader)
          colIDs.forEach((id) => {
            retVal[rowID][id] = this.body[rowID][id]
          })
        })

        // filter body using gui filters
        retVal = R.filter(
          row => R.all(
            col => R.all(
              filter => (filter !== col) ||
              (JSON.stringify(row[col]).toLowerCase().indexOf(this.filters[filter].model.toLowerCase()) !== -1),
              R.keys(this.filters)), // todo: for now JSON stringify, in the future let's use
            R.keys(row)),            // todo: a flatten object function and then some textContent inside components
          retVal)

        // compute the requested totals
        if (this.sum.length > 0) {
          var addAsNumbers = (a, b) => Number(a) + Number(b) // otherwise they might be interpreted as strings
          this.totals = R.mapObjIndexed((v, k) => {
            if (R.contains(k, this.sum)) {
              return R.reduce(addAsNumbers, 0, R.values(R.map(r => r[k], retVal))).toFixed(2)
            } else {
              return ''
            }
          }, R.values(retVal)[0])
        }

        return retVal
      },
      span () {
        return Object.keys(this.tableHeader).length + 1
      }
    },
    beforeCompile () {
      // if actions is not an object, it doesn't have labels
      if (Array.isArray(this.actions)) {
        var actionsObj = {}
        this.actions.forEach((el) => actionsObj[el] = el)
        this.actions = actionsObj
      }
      // initialize filters
      if (Array.isArray(this.canFilterBy)) {
        this.filters =
          R.zipObj(this.canFilterBy, R.map(x => {return {open: false, model: ''}}, this.canFilterBy))
      }
    },
    compiled () {
      this.updateInjectedValues()
    },
    ready () {
      $(window).scroll(this.refreshTableHeader)
    },
    watch: {
      'processedSmartBody' () {
        this.updateInjectedValues()
      }
    },
    methods: {
      openFilter (column) {
        this.filters[column].open = true
        this.$nextTick(() => {
          console.log('.' + column + '-filter-input > input')
          $('.' + column + '-filter-input > input')[1].focus()
        })
      },
      saveNewRow () {
        if (this.canSaveNewRow) {
          this.$dispatch('before-request')
          this.$http.get(this.endpoint, {action: 'addRow', resource: this.newRow}).then((response) => {
            this.$set('error', false)
            this.$set('body', response.data.body)
            this.$dispatch('successful-request')
            this.$dispatch('after-request')
          }, (response) => {
            this.$set('error', {status: response.status, data: response.data})
            this.$dispatch('failed-request')
            this.$dispatch('after-request')
          })
        }
      },
      doesNotPassValidation (col, value) {
        return !this.passesValidation(col, value)
      },
      passesValidation (col, value) {
        if (value) {
          return true
        } else {
          return false
        }
      },
      refreshTableHeader () {
        const persistArea = $('.persist-area', this.$el)
        const offset = persistArea.offset()
        const scrollTop = $(window).scrollTop()
        const scrollLeft = $(window).scrollLeft()
        const scrolledDown = (scrollTop > offset.top)
        const notScrolledAway = (scrollTop < offset.top + persistArea.height())
        this.scrolledPast = scrolledDown && notScrolledAway
        // init
        $('.floating-header').css({
          'left': offset.left - scrollLeft,
          'z-index': 3
        })
        $('.floating-header th').each(function (i) {
          $(this).width($('.regular-header th').eq(i).width())
        })
      },
      updateInjectedValues () {
        let children = this.$children
        let columns = Object.keys(this.tableHeader)
        children.forEach( (child) => {
          let col = (typeof child.$el.getAttribute === 'function') ? child.$el.getAttribute('slot') : null
          if (col !== null && columns.indexOf(col) !== -1) {
            let rowId = child.$el.parentElement.id.match(/^value-([0-9]+)-/)[1]
            child.value = this.processedSmartBody[rowId][col]
          }
        });
      },
      toggleAllRows () {
        if (this.toggleAll === false) {
          this.toggleAll = true
          this.selection = Object.keys(this.body)
        } else {
          this.toggleAll = false
          this.selection = []
        }
      },
      next () {
        var actionKey = this.action
        var actionLabel = this.actions[this.action]
        var selectionKeyLabel = this.selection.map((k) => {
          if (this.body[k] !== undefined) {
            return {key: k, label: this.body[k][this.mainCol]}
          } else {
            return null
          }
        }, this).filter((a) => {return a !== null})
        var commandToBeConfirmed = { action: { key: actionKey, label: actionLabel}, selection: selectionKeyLabel }
        this.$broadcast('command', commandToBeConfirmed)
      },
      doCommand (command) {
        this.$dispatch('before-request')
        this.$http.get(this.endpoint, command).then((response) => {
          if (response.data.body !== undefined || response.data.body === {}) {
            this.$set('body', response.data.body)
            this.$set('footer', response.data.footer)
          }
          this.$dispatch('successful-request')
          this.$dispatch('after-request')
          this.$set('error', false)
        }, (response) => {
          this.$set('error', { status: response.status, data: response.data.error })
          this.$dispatch('failed-request')
          this.$dispatch('after-request')
        })
      },
      isEditable (col) {
        if (this.editable === false) {
          return false
        }
        if (Array.isArray(this.editable)) {
          if (this.editable.indexOf(col) === -1) {
            return false
          }
        }
        return true
      },
      isNotEditable (col) {
        return !this.isEditable(col)
      },
      valueClick (id, col) {
        if (this.isNotEditable(col)) {
          return
        }
        if (this.modalEdit === undefined) {
          this.modalEdit = {
            id: id,
            col: col,
            currentValue: this.body[id][col],
            previousValue: this.body[id][col],
            type: this.editType(col)
          }
          this.$broadcast('modalEdit', this.modalEdit)
        }
      },
      editType (col) {
        if (this.inputList !== undefined &&
          this.inputList[col] !== undefined) {
          return 'select'
        }
        if (this.useTextAreaFor !== undefined &&
          this.useTextAreaFor.indexOf(col) !== undefined) {
          return 'textarea'
        }
        return 'text'
      },
      doEdit (modalEdit) {
        this.$dispatch('before-request')
        this.$http.put(this.endpoint + '/' + modalEdit.id + '/' + modalEdit.col, {
          action: 'edit',
          value: modalEdit.currentValue
        }).then((response) => {
          // this.setUndo(modalEdit.id, modalEdit.col, modalEdit.previousValue)
          this.$dispatch('successful-request')
          this.$dispatch('after-request')
          this.$set('error', false)
        }, (response) => {
          this.$set('error', { status: response.status, data: response.data.error})
          this.$dispatch('failed-request')
          this.$dispatch('after-request')
        })
      },
      // setUndo (id, col, value) {
      // this.backMatrix[id][col] = value
      // },
      closedModalEdit () {
        this.modalEdit = undefined
      }
      // undo (id, col) {
      // this.doEdit({id: id, col: col, currentValue: this.backMatrix[id][col], previousValue: null})
      // },
      // hasUndo (id, col) {
      // return this.backMatrix[id] !== undefined && this.backMatrix[id][col] !== undefined
      // }
      // undo button to add later
      // <span
      //      id="back-{{id}}-{{col}}"
      //    class="undo-button"
      //  @click="undo(id, col)"
      //  v-show="hasUndo(id,col)"
      //    >
      //    &#223;</span>
    }
  }
</script>

<style>
  .floating-header {
    position: fixed;
    top: 0;
  }

  .transparent {
    opacity: 0;
  }

  .smart-table table {
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    font-size: 12px;
    text-align: left;
    border-collapse: collapse;
  }

  .smart-table th {
    height: 51px;
    font-size: 13px;
    font-weight: normal;
    background: #2C3E50;
    border-top: 4px solid #34495E;
    border-bottom: 1px solid #fff;
    color: #798795;
    padding: 8px;
    text-transform: capitalize;
  }

  .smart-table td {
    background: hsla(210,19%,96%,1);
    border-bottom: 1px solid #fff;
    color: hsla(196,8%,31%,1);
    border-top: 1px solid transparent;
    padding: 8px;
  }

  .smart-table td.smart-control-bar {
    background: hsl(210, 30%, 92%);
  }

  .smart-table tr:hover td {
    background: hsla(210,29%,91%,1);
    color: hsla(196,8%,31%,1);
  }

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
    transform: scale(1.6);
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
