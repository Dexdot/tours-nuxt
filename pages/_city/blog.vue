<template>
  <div>
    <h1 style="padding: 200px 40px;">Это бложик</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import page from '~/mixins/page'

export default {
  mixins: [page],
  head() {
    return {
      title: 'Блог'
    }
  }
}
</script>


<style lang="sass" scoped>
</style>
