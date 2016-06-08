<template>
  <img :src="value">
</template>

<script>
  let inputTemplate = `
    <p>You gimme input. You gimme input nao!</p>
  `
  export default {
    data () {
      return {
        value: '',
        inputTemplate
      }
    }
  }
</script>
