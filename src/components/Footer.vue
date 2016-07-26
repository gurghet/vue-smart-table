<template>
  <footer>
    <div :class="wrapperClasses">
      <a class="icon item" @click="pag('prev')">
        <i class="left chevron icon"></i>
      </a>
      <a v-for="n in 5" 
        :class="n+offset === currentPage ? (pageButtonClasses + ' disabled') : pageButtonClasses" 
        @click="pag(n+offset)"
      >
        {{n+offset}}</a>
      <a class="icon item" @click="pag('next')">
        <i class="right chevron icon"></i>
      </a>
    </div>
  </footer>
</template>

<script lang="babel">
  export default {
    props: {
      numPages: Number,
      currentPage: Number,
      wrapperClasses: {
        type: String,
        default: 'ui right floated pagination menu'
      },
      pageButtonClasses: {
        type: String,
        default: 'item'
      }
    },
    computed: {
      offset () {
        return Math.max(1, Math.min(this.numPages - 4, this.currentPage - 2))
      }
    },
    methods: {
      pag (n) {
        this.$dispatch('pagination', {goto: n})
      }
    }
  }
</script>