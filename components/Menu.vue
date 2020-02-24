<template>
  <transition name="menu">
    <section class="menu" v-show="active">
      <div class="menu__container container">
        <nav class="menu__nav">
          <ul>
            <li class="menu__li" v-for="link in $t('navLinks')" :key="link.to">
              <nuxt-link class="t-h2" :to="localePath(link.to)">{{
                link.text
              }}</nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="menu__social">
          <SocialList :socialLinks="general.socialLinks" />
        </div>

        <div class="menu__info">
          <div class="menu__contact">
            <a :href="`tel:${general.phoneNumber}`">
              {{ general.phoneText }}
            </a>
            <button>
              {{ $t('orderCall') }}
            </button>
          </div>

          <BaseButton>{{ $t('chooseTour') }}</BaseButton>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import SocialList from '~/components/SocialList'

export default {
  components: {
    SocialList
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      general: 'general/data'
    })
  }
}
</script>

<style lang="sass" scoped>
/* ENTER */
.menu-enter,
.menu-leave-to
  pointer-events: none
  transform: translateX(100%)

.menu-enter-to,
.menu-leave
  pointer-events: auto
  transform: translateX(0%)

.menu-enter-active,
.menu-leave-active
  transition: $trs


.menu
  z-index: 4
  position: fixed
  top: 0
  left: 0

  width: 100vw
  +vh

  @media (min-width: $tab + 1)
    display: none

.menu__container
  position: absolute
  top: 0
  left: 0

  padding-top: 30vh
  width: 100vw
  height: 100%
  +scrollbar

  display: flex
  flex-direction: column
  align-items: flex-start

  background: #D8D1C6

.menu__nav .t-h2
  line-height: 1
  letter-spacing: -0.02em

.menu__nav li:not(:last-child)
  margin-bottom: 8px

.menu__social
  margin-top: auto
  margin-bottom: 24px

.menu__info
  border-top: 1px solid rgba($black, 0.1)

  padding: 16px 0 24px
  width: 100%
  display: flex
  align-items: center
  justify-content: space-between

.menu__contact
  a
    +mont(sb)
    font-size: 16px
    letter-spacing: 0.04em
    line-height: 1

    display: block

  button
    font-size: 12px
    opacity: 0.6
    transition: $trs
    &:hover
      opacity: 1
</style>
