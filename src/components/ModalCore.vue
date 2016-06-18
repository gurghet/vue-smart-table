<template>
  <div class="modal-core" @click="close" v-show="show" transition="modal">
    <div class="modal-container" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    props: ['show', 'onClose'],
    methods: {
      close () {
        this.onClose()
      }
    },
    ready () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.onClose()
        }
      })
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .modal-core {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }

  .modal-container {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-enter,
  .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
