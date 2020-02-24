<template>
  <div></div>
</template>

<script>
import page from '~/mixins/page'

export default {
  mixins: [page],
  head() {
    return {
      title: 'Блог'
    }
  },
  mounted() {
    window.$app = this
  }
}
</script>


<style lang="sass" scoped>
</style>
