<template>
  <main class="container">
    <div class="policy">
      <div v-for="(item, i) in content" :key="i + item.nodeType">
        <p v-if="isText(item)" v-html="render(item)"></p>
        <ol v-if="isOL(item)" v-html="render(item)"></ol>
        <ul v-if="isUL(item)" v-html="render(item)"></ul>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import render from '~/mixins/render'

export default {
  mixins: [render],
  computed: {
    ...mapGetters({
      general: 'general/data'
    }),
    content() {
      return this.general.policyContent.content
    }
  }
}
</script>

<style lang="sass" scoped>
.policy
  display: block
  margin: 0 auto
  max-width: 640px

  padding: calc(var(--header-h) + 80px) 0 80px
  
  /deep/
    p
      margin-bottom: 16px
</style>

