<template>
  <p>{{fullnat}}</p>
</template>

<script lang="babel">
  export default {
    data () {
      return {
        value: '',
        fullnat: '..'
      }
    },
    watch: {
      'value' (val) {
        this.$http.get('https://restcountries.eu/rest/v1/alpha/' + val)
          .then(res => this.$set('fullnat', res.data.name))
      }
    }
  }
</script>
