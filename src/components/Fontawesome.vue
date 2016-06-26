<template>
  <i class="fa fa-{{value}}" aria-hidden="true"></i>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    },
    created () {
      // avoid duplicates
      for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href === href) {
          return
        }
      }
      let head = document.getElementsByTagName('head')[0]
      let link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      let href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
      link.href = href
      head.appendChild(link)
    }
  }
</script>

<style scoped>
  i {
    font-size: 1.2em;
  }
</style>