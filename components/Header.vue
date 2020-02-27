<template>
  <header
    :class="[
      'header',
      {
        'header--menu-active': isMenuActive,
        'header--uphidden': isUphidden,
        'header--transparent': isTrasparent,
        'header--fixed': isFixed
      }
    ]"
  >
    <div class="container">
      <div class="header__inner">
        <div class="header__logo-wrap">
          <nuxt-link class="header__logo u-center" :to="localePath('index')">
            <svg-icon name="logo" />
          </nuxt-link>

          <div class="select-text">
            <svg-icon name="chevron" />

            <select v-model="city">
              <option value="spb">Санкт-Петербург</option>
              <option value="tallin">Таллин</option>
            </select>
          </div>
        </div>

        <nav class="header__nav">
          <ul>
            <li v-for="link in $t('navLinks')" :key="link.to">
              <nuxt-link class="t-ttu" :to="localePath(link.to)">{{
                link.text
              }}</nuxt-link>
            </li>

            <li>
              <nuxt-link
                v-if="$i18n.locale === 'ru'"
                :to="switchLocalePath('en')"
                class="t-ttu"
              >
                EN
              </nuxt-link>

              <nuxt-link
                v-if="$i18n.locale === 'en'"
                :to="switchLocalePath('ru')"
                class="t-ttu"
              >
                RU
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="header__contact">
          <a :href="`tel:${general.phoneNumber}`">
            {{ general.phoneText }}
          </a>
          <button>
            {{ $t('orderCall') }}
          </button>
        </div>

        <div class="header__social">
          <SocialList :socialLinks="general.socialLinks" />
        </div>

        <BaseButton classPulse>{{ $t('orderTicket') }}</BaseButton>

        <ButtonBurger
          :active="isMenuActive"
          @click="$store.dispatch('dom/toggleMenu')"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

import ButtonBurger from '~/ui/ButtonBurger'
import SocialList from '~/components/SocialList'

import city from '~/mixins/city'

export default {
  mixins: [city],
  components: {
    ButtonBurger,
    SocialList
  },
  props: {
    isMenuActive: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false }
  },
  data: () => ({
    scrollY: 0,
    dir: 'down',
    isMob: false
  }),
  computed: {
    ...mapGetters({
      general: 'general/data'
    }),
    onTop() {
      return this.scrollY <= 1
    },
    isUphidden() {
      if (this.onTop) {
        return false
      } else {
        return this.dir === 'down'
      }
    },
    isTrasparent() {
      return this.transparent && this.onTop
    },
    isFixed() {
      return !this.onTop
    }
  },
  mounted() {
    this.handleScroll()
    this.handleResize()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    handleScroll() {
      this.onScroll()
      window.addEventListener('scroll', this.onScroll.bind(this))
    },
    handleResize() {
      this.onResize()
      window.addEventListener('resize', this.onResize.bind(this))
    },
    onScroll() {
      let y = window.pageYOffset
      this.dir = y > this.scrollY ? 'down' : 'up'
      this.scrollY = y
    },
    onResize() {
      this.isMob = window.innerWidth <= 1040
    }
  }
}
</script>

<style lang="sass">
\:root
  --header-h: 126px
  @media (max-width: $tab)
    --header-h: 104px
</style>

<style lang="sass" scoped>  
.header
  z-index: 5
  position: fixed
  top: 0
  left: 0
  width: 100%

  transition: $trs
  background: $beige-l

  @media (min-width: $tab + 1)
    background: $beige-l

.header--fixed:not(.header--transparent):not(.header--menu-active)
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16)

.header--menu-active
  box-shadow: unset
  background: 0

.header--uphidden
  @media (max-width: $tab)
    transform: translateY(-101%)

.header--transparent
  background: 0
  color: #fff
  
  a, svg
    +link(#fff)

  .social a::before
    border-color: #fff

  .burger-icon-top,
  .burger-icon-bottom,
  .burger-icon-last
    &::before, &::after
      background: #fff
  
.header__inner
  display: flex
  align-items: center
  padding-top: 24px
  padding-bottom: 16px
  @media (max-width: $tab)
    padding-top: 16px
    align-items: flex-start


// Logo
.header__logo-wrap
  margin-right: 80px
  @media (max-width: 1540px)
    margin-right: 40px
    
  @media (max-width: 1110px)
    margin-right: 16px

.header__logo
  height: 72px

.header:not(.header--fixed)
  .header__logo-wrap .select-text
    opacity: 0
    pointer-events: none

.header__logo-wrap .select-text
  line-height: 1
  transition: $trs

  select
    font-size: 10px
    padding-right: 10px

  .i-chevron
    width: 8px
    height: 8px


// Hide on tab/mob
.header__logo-wrap .select-text,
.header__contact,
.header .btn,
.header__nav
  @media (max-width: $tab)
    display: none


// Nav
.header__nav ul
  display: flex
  align-items: center
  margin-left: -32px
  @media (max-width: 1540px)
    margin-left: -16px

.header__nav li
  margin-left: 32px
  @media (max-width: 1540px)
    margin-left: 16px

  transition: opacity $trs
  &:hover
    opacity: 0.4


// Phone
.header__contact
  margin-left: auto
  margin-right: 24px

  @media (max-width: 1540px)
    margin-right: 16px

  a
    +mont(sb)
    font-size: 16px
    letter-spacing: 0.04em
    line-height: 1
    display: block
    @media (max-width: 1540px)
      font-size: 14px

  button
    font-size: 12px
    opacity: 0.6
    transition: $trs
    &:hover
      opacity: 1


// Social
.header__social
  margin-right: 64px

  @media (max-width: 1540px)
    margin-right: 32px

  @media (max-width: 1340px)
    display: none


// Burger
.header .burger
  margin-top: 1px
  margin-left: auto

  @media (min-width: $tab + 1)
    display: none
</style>
