<template>
  <header
    :class="[
      'header',
      {
        'header--light': light
      }
    ]"
  >
    <div class="container u-flex u-ais">
      <nuxt-link class="header__logo" to="/">
        <img src="~assets/svg/logo.svg" alt="" />
      </nuxt-link>

      <ButtonBurger :light="light" />
    </div>
  </header>
</template>

<script>
import ButtonBurger from '~/components/ButtonBurger'

export default {
  name: 'Header',
  components: {
    ButtonBurger
  },
  props: {
    light: { type: Boolean, default: false },
    isMenuActive: { type: Boolean, default: false }
  }
}
</script>

<style lang="sass" scoped>
.header
  width: 100%

  z-index: 2
  position: fixed
  top: 40px
  left: 0

.header--light
  color: #fff
  &,
  a
    color: #fff
</style>
