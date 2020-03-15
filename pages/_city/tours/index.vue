<template>
  <div>
    <section class="catalog-section">
      <div class="container">
        <div class="catalog-head">
          <div class="catalog-head__title">
            <h1 class="t-h3 catalog-title">{{ $t('tours.title') }}</h1>
            <ul class="catalog-tabs">
              <li v-for="key in Object.keys($t('tourTypes'))" :key="key">
                <nuxt-link
                  :class="[
                    'catalog-tab t-ttu',
                    {
                      active:
                        key === 'all'
                          ? !$route.params.filter || $route.params.filter === ''
                          : key === $route.params.filter
                    }
                  ]"
                  :to="$cityLocalePath(`/tours/${key === 'all' ? '' : key}`)"
                >
                  {{ $t('tourTypes')[key] }}
                </nuxt-link>
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

            <select
              v-model="selectedFilter"
              @change="onSelectChange($event.target.value)"
            >
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
    <Instagram v-if="instagramData" :data="instagramData" />
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
    const { seo, contactsImage } = this.general
    const { title, description } = seo.tours

    return {
      title,
      titleTemplate: null,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: contactsImage.fields.file.url || ''
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: contactsImage.fields.file.url || ''
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    }
  },
  async asyncData({ store, route, error }) {
    const { filter } = route.params
    if (filter && !['group', 'individual'].includes(filter)) {
      error({ statusCode: 404 })
    }

    await store.dispatch('tours/loadTours')

    return {
      selectedFilter: filter || 'all'
    }
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
      return this.allTours.filter(({ fields }) => {
        const { filter } = this.$route.params
        if (!filter) return true

        switch (filter) {
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
    instagramData() {
      const { general } = this

      const instagramImages = [...general.instagramImages].reverse()
      const images = []

      images.push(instagramImages[0])
      images.push({ sys: { id: new Date().getTime() } })

      instagramImages.slice(1).forEach(img => {
        images.push(img)
      })

      const data = {
        images: images.slice(0, 7),
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
      this.city = city
    },
    onSelectChange(v) {
      const filter = v === 'all' ? '' : v
      this.$router.push(this.$cityLocalePath(`/tours/${filter}`))
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
