<template>
  <div class="modal-edit">
    <modal-core :show.sync="show" :on-close="close">
      <div id="value-{{id}}-{{col}}-edit" class="modal-body">
        <input v-if="type !== 'textarea'" type="{{type}}" v-model="value" />
        <textarea v-else v-model="value"></textarea>
      </div>
      <div class="modal-footer text-right">
        <button class="modal-cancel-button" @click="close">Cancel</button>
        <button class="modal-default-button modal-ok-button action-label"
                @click="confirm"
        >Save</button>
      </div>
    </modal-core>
  </div>
</template>

<script>
  import ModalCore from './ModalCore'
  export default {
    components: { ModalCore },
    data () {
      return {
        value: undefined,
        type: undefined,
        id: undefined,
        col: undefined,
        prev: undefined
      }
    },
    props: ['show'],
    events: {
      'modalEdit' (modalEdit) {
        this.show = true
        this.value = modalEdit.currentValue
        this.type = modalEdit.type
        this.id = modalEdit.id
        this.col = modalEdit.col
        this.prev = modalEdit.previousValue
      }
    },
    methods: {
      close () {
        this.show = false
        this.$dispatch('close')
      },
      confirm () {
        this.$dispatch('confirm', {
          id: this.id,
          col: this.col,
          currentValue: this.value,
          previousValue: this.prev
        })
        this.close()
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #a9b9ee;
  }

  .modal-body {
    margin: 20px 0;
  }

  .text-right {
    text-align: right;
  }

  .form-label {
    display: block;
    margin-bottom: 1em;
  }

  .form-label > .form-control {
    margin-top: 0.5em;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #aabcfe;
  }

  .action-label {
    text-transform: capitalize;
  }
</style>
