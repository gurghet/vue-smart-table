<template>
  <a v-show="value !== ''" href="https://en.wikipedia.org/wiki/{{value}}#History" title="Go to the wikipedia page of {{value}} history">{{value}}</a>
</template>

<script>
  export default {
    data () {
      return {
        // the object passed to the column always
        // gets wired to value
        value: ''
      }
    }
  }
</script>