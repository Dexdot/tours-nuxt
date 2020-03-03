<template>
  <div id="app">
    <Menu :active="isMenuActive" />
    <Header :isMenuActive="isMenuActive" />

    <div class="page-container">
      <nuxt ref="page" />
    </div>

    <Footer />

    <no-ssr>
      <BukzaModal :active="isBukzaActive" />
    </no-ssr>

    <Cover />
    <Intro @complete="introCompleted = true" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Menu from '~/components/Menu'
import Cover from '~/components/Cover'
import Intro from '~/components/Intro'
import BukzaModal from '~/components/BukzaModal'

import initCSSProps from '~/assets/scripts/css-props'
import { detectDevices } from '~/assets/scripts/detect'

export default {
  components: {
    Header,
    Footer,
    Menu,
    Intro,
    Cover,
    BukzaModal
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
      isMenuActive: 'dom/isMenuActive',
      isBukzaActive: 'dom/isBukzaActive'
    }),
    page() {
      return this.$refs.page && this.$refs.page.$children[0]
    }
  },
  mounted() {
    window.$app = this

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

      if (this.isMenuActive) this.$store.dispatch('dom/toggleMenu')
    }
  }
}
</script>
