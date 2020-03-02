<template>
  <div>
    <section class="catalog-section">
      <div class="container">
        <div class="catalog-head">
          <div class="catalog-head__title">
            <h1 class="t-h3 catalog-title">{{ $t('tours.title') }}</h1>
            <ul class="catalog-tabs">
              <li v-for="key in Object.keys($t('tourTypes'))" :key="key">
                <button
                  :class="[
                    'catalog-tab t-ttu',
                    { active: key === typeOfTours }
                  ]"
                  type="button"
                  @click="typeOfTours = key"
                >
                  {{ $t('tourTypes')[key] }}
                </button>
              </li>
            </ul>
          </div>

          <div class="catalog-head__chipbox-list">
            <Chipbox
              :active="key === city"
              v-for="key in Object.keys($t('cities'))"
              :key="key"
              @click="onChipboxClick(key)"
              >{{ $t('cities')[key] }}</Chipbox
            >
          </div>
        </div>

        <div class="catalog-selects">
          <div class="select-text">
            <svg-icon name="chevron" />

            <select v-model="typeOfTours">
              <option
                v-for="key in Object.keys($t('tourTypes'))"
                :key="key"
                :value="key"
                >{{ $t('tourTypes')[key] }}</option
              >
            </select>
          </div>

          <div class="select-text">
            <svg-icon name="chevron" />

            <select v-model="city">
              <option
                v-for="key in Object.keys($t('cities'))"
                :key="key"
                :value="key"
                >{{ $t('cities')[key] }}</option
              >
            </select>
          </div>
        </div>

        <div class="catalog-list-container">
          <ul class="catalog-list">
            <li v-for="tour in filteredTours" :key="tour.sys.id">
              <TourCard :tour="tour" />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <ReviewsSlider v-if="reviews && reviews.length > 0" :reviews="reviews" />
    <Instagram :data="instagramData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ReviewsSlider from '~/components/ReviewsSlider'
import TourCard from '~/components/TourCard'
import Instagram from '~/components/Instagram'
import Chipbox from '~/ui/Chipbox'

import render from '~/mixins/render'
import page from '~/mixins/page'
import city from '~/mixins/city'

export default {
  mixins: [page, render, city],
  components: {
    ReviewsSlider,
    TourCard,
    Instagram,
    Chipbox
  },
  head() {
    const title = 'Каталог'

    return {
      title,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: title
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: '/favicon/projectName.png'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/favicon/projectName.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: title
        }
      ]
    }
  },
  data: () => ({
    typeOfTours: 'all'
  }),
  async asyncData({ store }) {
    if (store.getters['tours/allTours'].length <= 1)
      await store.dispatch('tours/loadAllTours')
  },
  computed: {
    ...mapGetters({
      allTours: 'tours/allTours',
      general: 'general/data',
      locale: 'lang/locale'
    }),
    reviews() {
      const reviews = this.filteredTours.reduce((reviews, tour) => {
        return [...reviews, ...tour.fields.reviews]
      }, [])

      const ids = reviews.map(r => r.sys.id)
      return reviews.filter(({ sys }, i) => ids.indexOf(sys.id) === i)
    },
    filteredTours() {
      return this.cityLocaleTours.filter(({ fields }) => {
        switch (this.typeOfTours) {
          case 'all':
            return true
            break
          case 'group':
            return !fields.makeIndividual
            break
          case 'individual':
            return fields.makeIndividual
            break
          default:
            break
        }
      })
    },
    cityLocaleTours() {
      const { locale, $route } = this

      const filteredTours = this.allTours.filter(tour => {
        const localeTour = tour[locale]
        if (!localeTour) {
          return false
        }

        return !!localeTour
          ? localeTour.fields.city === $route.params.city
          : false
      })

      return filteredTours.map(tour => tour[locale])
    },
    instagramData() {
      const { general } = this

      // const {instagramImages} = general
      const instagramImages = [...general.instagramImages].reverse()
      const images = []

      images.push(instagramImages[0])
      images.push({ sys: { id: new Date().getTime() } })

      instagramImages.slice(1).forEach(img => {
        images.push(img)
      })

      const data = {
        images,
        title: general.instagramTitle,
        text: general.instagramText,
        buttonUrl: general.instagramButtonUrl,
        buttonText: general.instagramButtonText
      }

      return data
    }
  },
  methods: {
    onChipboxClick(city) {
      this.$router.push({ params: { city } })
    }
  }
}
</script>

<style lang="sass" scoped>
.catalog-section
  overflow: hidden
  padding-top: calc(var(--header-h) + 80px)
  padding-bottom: 18.5vh

  @media (max-width: $tab)
    padding-top: calc(var(--header-h) + 48px)
    padding-bottom: 120px

.catalog-list
  display: flex
  align-items: flex-start
  flex-wrap: wrap

  margin-left: minus(gutters(1))
  margin-top: minus(gutters(2))

  @media (max-width: 1240px)
    margin-top: -48px

  @media (max-width: $mob)
    margin-left: -12px

.catalog-list > li
  margin-left: gutters(1)
  margin-top: gutters(2)

  @media (min-width: 1241px + 1)
    min-width: calc(16.6666% - #{gutters(1)})
    width: calc(16.6666% - #{gutters(1)})  

  @media (max-width: 1240px)
    margin-top: 48px

    min-width: calc(33.3333% - #{gutters(1)})
    width: calc(33.3333% - #{gutters(1)})

  @media (max-width: $tab)
    min-width: calc(50% - #{gutters(1)})
    width: calc(50% - #{gutters(1)})

  @media (max-width: $mob)
    min-width: calc(50% - 12px)
    width: calc(50% - 12px)

    margin-left: 12px

.catalog-head
  display: flex
  align-items: flex-start
  margin-bottom: 64px

  @media (min-width: $tab + 1)
    justify-content: space-between

  @media (max-width: $tab)
    margin-bottom: 24px

.catalog-head__title

.catalog-title
  display: block
  @media (min-width: $tab + 1)
    margin-bottom: 24px

.catalog-tabs
  display: flex
  align-items: center
  margin-left: -16px

  @media (max-width: $tab)
    display: none

.catalog-tabs > li
  margin-left: 16px

.catalog-tab
  position: relative
  &::before
    content: ''
    position: absolute
    bottom: -4px
    left: 0

    width: 100%
    height: 1px
    background: $black
    transition: $trs
    transform-origin: 0% 50%
    transform: scaleX(0)
  
  &:hover,
  &.active
    &::before
      transform: scaleX(1)

.catalog-tab.active
  +mont(b)

.catalog-tabs:hover .catalog-tab.active::before
  transform: scaleX(0)

.catalog-head__chipbox-list
  display: flex
  align-items: center

  @media (max-width: $tab)
    display: none

  .chipbox
    margin-left: 4px

.catalog-selects
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 32px

  @media (min-width: $tab + 1)
    display: none

.catalog-selects .select-text select
  @media (max-width: $mob)
    font-size: 10px

.catalog-selects .select-text:last-child select
  text-align: right
  text-align-last: right
</style>
