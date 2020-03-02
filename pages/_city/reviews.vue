<template>
  <main>
    <section class="reviews-section">
      <div class="container">
        <div class="reviews-container">
          <div class="reviews-left">
            <h1 class="reviews-title">{{ $t('reviews.title') }}</h1>

            <div class="reviews-controls reviews-controls--desktop">
              <div class="reviews-control">
                <p class="t-ttu">{{ $t('tourTypesTypeTitle') }}</p>
                <div class="select-text">
                  <select v-model="typeOfTours">
                    <option
                      v-for="key in Object.keys($t('tourTypes'))"
                      :key="key"
                      :value="key"
                      >{{ $t('tourTypes')[key] }}</option
                    >
                  </select>
                </div>
              </div>

              <div class="reviews-control" v-if="filteredTours.length > 0">
                <p class="t-ttu">
                  {{ $t('tourTypesTourNotChosenTitle') }}
                </p>
                <div class="select-text">
                  <select v-model="selectedTour">
                    <option value="">{{ $t('tourTypesTourNotChosen') }}</option>
                    <option
                      v-for="tour in filteredTours"
                      :key="tour.sys.id"
                      :value="tour.fields.slug"
                      >{{ tour.fields.title }}</option
                    >
                  </select>
                </div>
              </div>
            </div>

            <div class="reviews-controls reviews-controls--mob">
              <div class="reviews-control">
                <div class="select-text">
                  <select v-model="typeOfTours">
                    <option
                      v-for="key in Object.keys($t('tourTypes'))"
                      :key="key"
                      :value="key"
                      >{{ $t('tourTypes')[key] }}</option
                    >
                  </select>
                </div>
              </div>

              <button
                class="reviews-link t-ttu"
                type="button"
                @click="showReviewRatesModal"
              >
                {{ $t('reviews.watchReviews') }}
                <svg-icon name="chevron" />
              </button>
            </div>
          </div>

          <div class="reviews-content">
            <ul class="reviews-list">
              <li v-for="review in filteredReviews" :key="review.sys.id">
                <ReviewCard :review="review" />
              </li>
            </ul>

            <!-- <div class="reviews-pagen">
              <Pagen :list="[]" />
            </div> -->
          </div>

          <div v-if="hasAggregators" class="reviews-right">
            <ReviewRates :aggregators="aggregators" />
          </div>
        </div>
      </div>
    </section>

    <ToursSlider
      :title="$t('reviews.otherToursTitle')"
      v-if="otherTours.length > 0"
      :tours="otherTours"
    />

    <no-ssr>
      <ReviewRatesModal
        v-if="hasAggregators"
        :active="isReviewRatesModalVisible"
        @close-click="hideReviewRatesModal"
      >
        <ReviewRates :aggregators="aggregators" />
      </ReviewRatesModal>
    </no-ssr>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchReviews } from '~/api/reviews'

import ToursSlider from '~/components/ToursSlider'
import ReviewCard from '~/components/ReviewCard'
import ReviewRates from '~/components/ReviewRates'
import ReviewRatesModal from '~/components/ReviewRatesModal'
import Pagen from '~/ui/Pagen'

import render from '~/mixins/render'
import page from '~/mixins/page'

export default {
  mixins: [page, render],
  components: {
    ToursSlider,
    ReviewCard,
    ReviewRates,
    ReviewRatesModal,
    Pagen
  },
  head() {
    const title = 'Отзывы'

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
  async asyncData({ store }) {
    // Tours
    if (store.getters['tours/allTours'].length <= 1)
      await store.dispatch('tours/loadAllTours')

    // Reviews
    const reviewsInStore = store.getters['reviews/reviews']
    if (reviewsInStore.length <= 0)
      await store.dispatch('reviews/loadAllReviews')

    return {}
  },
  data: () => ({
    isReviewRatesModalVisible: false,
    typeOfTours: 'all',
    selectedTour: ''
  }),
  computed: {
    ...mapGetters({
      allTours: 'tours/allTours',
      reviews: 'reviews/reviews',
      generalData: 'general/data',
      locale: 'lang/locale'
    }),
    filteredReviews() {
      if (this.selectedTour) {
        const tour = this.filteredTours.find(
          tour => tour.fields.slug === this.selectedTour
        )

        return tour.fields.reviews
      } else {
        return this.reviews.filter(({ fields }) => {
          // City
          const sameCity = fields.city === this.$route.params.city

          // Locale
          const sameLocale = fields.locale === this.locale

          // Type
          let sameType
          switch (this.typeOfTours) {
            case 'all':
              sameType = true
              break
            case 'group':
              sameType = !fields.makeIndividual
              break
            case 'individual':
              sameType = fields.makeIndividual
              break
            default:
              break
          }

          return sameCity && sameLocale && sameType
        })
      }
    },
    localeTours() {
      const { locale, $route } = this
      const { city, id } = $route.params

      return this.allTours
        .filter(tour => {
          const localeTour = tour[locale]
          if (!localeTour) {
            return false
          }

          return !!localeTour ? localeTour.fields.city === city : false
        })
        .map(tour => tour[locale])
    },
    filteredTours() {
      return this.localeTours.filter(({ fields }) => {
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
    otherTours() {
      return this.localeTours.slice(0, 8)
    },
    aggregators() {
      return this.generalData.aggregators.map(img => {
        const copy = { ...img }
        const [rate, ratesLength] = copy.fields.description.split('|')

        copy.fields.rate = rate.trim()
        copy.fields.ratesLength = ratesLength.trim()

        return copy
      })
    },
    hasAggregators() {
      return this.aggregators && this.aggregators.length > 0
    }
  },
  watch: {
    selectedTour(selectedTour) {
      if (selectedTour) {
        const tour = this.filteredTours.find(
          tour => tour.fields.slug === selectedTour
        )
        this.typeOfTours = tour.fields.makeIndividual ? 'individual' : 'group'
      }
    }
  },
  methods: {
    showReviewRatesModal() {
      this.isReviewRatesModalVisible = true
    },
    hideReviewRatesModal() {
      this.isReviewRatesModalVisible = false
    }
  }
}
</script>

<style lang="sass" scoped>
$reviews-pt: calc(var(--header-h) + 13vh)
  
.reviews-section
  padding-top: $reviews-pt
  padding-bottom: 80px

  @media (max-width: $tab)
    padding-top: calc(var(--header-h) + 48px)
    padding-bottom: 24px

.reviews-container
  display: flex
  align-items: flex-start

  @media (max-width: $tab)
    flex-direction: column

.reviews-content
  @media (min-width: $tab + 1)
    min-width: column-spans(5)
    width: column-spans(5)

.reviews-left
  @media (min-width: $tab + 1)
    min-width: mix(3)
    width: mix(3)
    top: calc(var(--header-h) + 16px)

  @media (max-width: $tab)
    width: 100%
    margin-bottom: 48px

.reviews-right
  background: $beige-d
  transform: translate($unit, minus($reviews-pt))
  top: $reviews-pt

  padding: $reviews-pt $unit 0 unit-plus(8px)
  margin-left: auto
  min-width: unit-plus(column-spans(3))
  width: unit-plus(column-spans(3))
  height: 100vh

  @media (max-width: $tab)
    display: none
  
.reviews-left,
.reviews-right
  @media (min-width: $tab + 1)
    position: sticky

.reviews-title
  +mont(b)
  line-height: 1.2
  +yo('font-size', (375px: 30px, 1920px: 40px, 2550px: 56px))

  margin-bottom: 1em
  @media (max-width: $tab)
    margin-bottom: 24px

.reviews-control p
  margin-bottom: 4px

.reviews-control .select-text select
  +mont(b)
  max-width: 208px
  text-overflow: ellipsis
  overflow: hidden
  white-space: normal

.reviews-control:not(:first-child)
  margin-top: 32px

.reviews-controls
  max-width: 100%
  display: inline-block

  @media (max-width: $tab)
    display: flex
    align-items: center
    justify-content: space-between

.reviews-controls--desktop
  @media (max-width: $tab)
    display: none

.reviews-controls--mob
  @media (min-width: $tab + 1)
    display: none

.reviews-link
  font-size: 12px
  +mont(sb)
  +link($acc)

  display: flex
  align-items: center

  @media (min-width: $tab + 1)
    display: none

  .i-chevron
    margin-left: 4px
    width: 8px
    height: 8px
    color: $acc

.reviews-list
  width: 100%
  margin-bottom: 64px

  @media (max-width: $tab)
    margin-bottom: 40px

.reviews-list > li:not(:last-child)
  padding-bottom: 40px
  margin-bottom: 32px
  border-bottom: 1px solid rgba($black, 0.1)
  @media (max-width: $tab)
    padding-bottom: 32px
    margin-bottom: 24px
</style>