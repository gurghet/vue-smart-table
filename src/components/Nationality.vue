<template>
  <p>{{fullnat}}</p>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        fullnat: '..'
      }
    },
    ready () {
      this.$http.get('http://restcountries.eu/rest/v1/alpha/' + this.value)
        .then(res => this.$set('fullnat', res.data.name))
    }
  }
</script>
