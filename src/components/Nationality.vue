<template>
  <p>{{value}}</p>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    },
    watch: {
      'value' (val) {
        this.$http.get('https://restcountries.eu/rest/v1/alpha/' + val)
          .then(res => this.$set('value', res.data.name))
      }
    }
  }
</script>
