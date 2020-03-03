<template>
  <div>
    <ToursSlider
      :title="$t('main.toursTitle')"
      v-if="tours.length > 0"
      :tours="tours"
    />
    <ReviewsSlider v-if="reviews && reviews.length > 0" :reviews="reviews" />

    <section class="faq-section">
      <div class="container">
        <h2 class="t-h3 faq-section__title">{{ $t('main.faqTitle') }}</h2>
        <div class="faq-section__content">
          <FaqList v-if="general.faq" :content="general.faq.content" />
        </div>
      </div>
    </section>

    <Instagram :data="instagramData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ToursSlider from '~/components/ToursSlider'
import ReviewsSlider from '~/components/ReviewsSlider'
import FaqList from '~/components/FaqList'
import Instagram from '~/components/Instagram'
import Chipbox from '~/ui/Chipbox'

import page from '~/mixins/page'
import city from '~/mixins/city'

export default {
  mixins: [page, city],
  components: {
    ToursSlider,
    ReviewsSlider,
    FaqList,
    Instagram,
    Chipbox
  },
  head() {
    const title = 'Главная'

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
      const reviews = this.tours.reduce((reviews, tour) => {
        return [...reviews, ...tour.fields.reviews]
      }, [])

      const ids = reviews.map(r => r.sys.id)
      return reviews.filter(({ sys }, i) => ids.indexOf(sys.id) === i)
    },
    tours() {
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

      return filteredTours
        .map(tour => tour[locale])
        .filter(tour => tour.fields.showInPopularSection)
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
.faq-section
  overflow: hidden
  padding-top: 24px
  padding-bottom: 120px

  @media (max-width: $tab)
    padding-top: 48px
    padding-bottom: 56px
    

.faq-section__title
  text-align: center
  margin-bottom: 80px

  @media (max-width: $tab)
    margin-bottom: 40px

.faq-section__content
  margin: 0 auto
  
  @media (min-width: $tab + 1)
    max-width: column-spans(8)

.faq-section__content /deep/ .accordion::before
  @media (min-width: $tab + 1)
    left: minus(unit-plus(mix(2)))

  @media (max-width: $tab)
    left: minus($unit)
</style>
