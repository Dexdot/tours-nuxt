<template>
  <transition name="menu">
    <section class="menu" v-show="active">
      <div class="menu__container container">
        <nav class="menu__nav">
          <ul>
            <li class="menu__li" v-for="link in $t('navLinks')" :key="link.to">
              <nuxt-link class="t-h2" :to="$cityLocalePath(link.to)">{{
                link.text
              }}</nuxt-link>
            </li>

            <li class="menu__li">
              <nuxt-link
                class="menu__lang t-ttu"
                v-if="$i18n.locale === 'ru' && city !== 'spb'"
                :to="switchLocalePath('en')"
              >
                EN
              </nuxt-link>

              <nuxt-link
                class="menu__lang t-ttu"
                v-if="$i18n.locale === 'en'"
                :to="switchLocalePath('ru')"
              >
                RU
              </nuxt-link>
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
            <button @click="$store.dispatch('dom/toggleCallback')">
              {{ $t('orderCall') }}
            </button>
          </div>

          <BaseButton @click="$store.dispatch('dom/showBukza')">{{
            $t('chooseTour')
          }}</BaseButton>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SocialList from '~/components/SocialList'
import city from '~/mixins/city'

export default {
  mixins: [city],
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
  },
  methods: {
    ...mapActions({
      disableScroll: 'dom/disableScroll',
      enableScroll: 'dom/enableScroll'
    })
  },
  watch: {
    active(isActive) {
      if (isActive) {
        this.disableScroll()
      } else {
        this.enableScroll()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
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

.menu__li:not(:last-child)
  margin-bottom: 8px

.menu__lang
  display: inline-flex
  align-items: center
  justify-content: center
  
  padding: 0 12px
  height: 32px

  border-radius: 32px
  border: 1px solid $black

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
