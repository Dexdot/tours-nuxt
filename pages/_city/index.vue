<template>
  <div>
    <section style="height: 50vh">
      <h1>Main</h1>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import page from '~/mixins/page'

export default {
  mixins: [page],
  head() {
    return {
      title: 'Главная'
    }
  },
  computed: {
    ...mapGetters({})
  }
}
</script>


<style lang="sass" scoped>
</style>
