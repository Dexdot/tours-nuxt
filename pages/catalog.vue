<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import page from '~/mixins/page'

export default {
  mixins: [page],
  head() {
    return {
      title: 'Каталог'
    }
  },
  async asyncData({ store }) {
    // if (!store.getters['main/isLoaded']) await store.dispatch('main/load')
  },
  computed: {
    ...mapGetters({
      // content: 'main/content'
    })
  }
}
</script>


<style lang="sass" scoped>
</style>
