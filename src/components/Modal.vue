<template>
  <div class="modal">
    <modal-core :show.sync="show" :on-close="close">
      <div class="modal-header">
        <h3 v-show="problem">{{problem.short}}</h3>
        <h3 v-else>Are you sure?</h3>
      </div>

      <div class="modal-body no-action" v-show="problem">
        <p>{{{problem.long}}}</p>
      </div>
      <div class="modal-body" v-else>
        <p>You will <span class="action-label">{{actionLabel}}</span> the following</p>
        <ul>
          <li v-for="item in command.selection">{{item.label}}</li>
        </ul>
      </div>

      <div class="modal-footer text-right" v-show="problem">
        <button class="modal-cancel-button" @click="close">Ok</button>
      </div>
      <div class="modal-footer text-right" v-else>
        <button class="modal-cancel-button" @click="close">Cancel</button>
        <button class="modal-default-button action-label" @click="confirm(command)">
          {{actionLabel}}
        </button>
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
        problem: {},
        actionLabel: 'undefined',
        command: {
          action: undefined,
          selection: []
        }
      }
    },
    props: ['show'],
    events: {
      'command' (command) {
        this.show = true
        this.command.action = command.action.key
        this.actionLabel = command.action.label
        this.command.selection = command.selection
        this.problem = false
        if (this.command.action === undefined) {
          this.problem = {
            short: 'No action to perform!',
            long: 'Please select an action from the dropdown menu.'
          }
        } else if (this.command.selection.length === 0) {
          this.problem = {
            short: 'Selection empty!',
            long: 'There is no selection to ' + this.actionLabel + '.'
          }
        }
      }
    },
    methods: {
      close () {
        this.show = false
      },
      confirm () {
        this.$dispatch('confirm', this.command)
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
