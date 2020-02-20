<template>
  <div id="app">
    <Menu :active="isMenuActive" />
    <Header :light="isLight" :isMenuActive="isMenuActive" />

    <div class="scroll-container">
      <nuxt ref="page" />
    </div>

    <Cover />
    <Intro @complete="introCompleted = true" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from '~/components/Header'
import Menu from '~/components/Menu'
import Cover from '~/components/Cover'
import Intro from '~/components/Intro'

import initCSSProps from '~/assets/scripts/css-props'
import { detectDevices } from '~/assets/scripts/detect'

export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Intro,
    Cover
  },
  data: () => ({
    detect: {},
    introCompleted: false,
    visited: false,
    prevScroll: 0,
    dir: {}
  }),
  computed: {
    ...mapGetters({
      isLight: 'dom/isLight',
      isMenuActive: 'dom/isMenuActive'
    }),
    page() {
      return this.$refs.page && this.$refs.page.$children[0]
    }
  },
  mounted() {
    initCSSProps()
    this.detect = detectDevices()

    this.visited = JSON.parse(localStorage.visited || false)

    if (!localStorage.visited) {
      localStorage.visited = JSON.stringify(true)
    }
  },
  watch: {
    $route(to, from) {
      this.dir = { to, from }
    }
  }
}
</script>

<style lang="sass">
body
  color: #000
  background: #fff

  /deep/ a
    &,
    &:visited,
    &:active,
    &:focus
      color: #000
</style>

<style lang="sass" scoped>
.scroll-container
  overflow: hidden
</style>
