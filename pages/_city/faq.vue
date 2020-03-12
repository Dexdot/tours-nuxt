<template>
  <main>
    <section class="faq-page">
      <div class="container">
        <h2 class="t-h3 faq-page__title">{{ $t('faq.title') }}</h2>
        <div class="faq-page__content">
          <FaqList v-if="general.faq" :content="general.faq.content" />

          <p class="faq-page__text">
            <b>{{ $t('faq.subtitle') }}</b>
            {{ $t('faq.call') }}
            <a :href="general.phoneNumber">{{ general.phoneText }}</a>
            {{ $t('faq.text') }}
            <a :href="`mailto:${general.email}`">{{ general.email }}</a>
          </p>
        </div>
      </div>
    </section>

    <ReviewsSlider v-if="hasReviews" :reviews="filteredReviews" />

    <ToursSlider
      :title="$t('reviews.otherToursTitle')"
      v-if="otherTours.length > 0"
      :tours="otherTours"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import FaqList from '~/components/FaqList'
import ReviewsSlider from '~/components/ReviewsSlider'
import ToursSlider from '~/components/ToursSlider'
import page from '~/mixins/page'

export default {
  mixins: [page],
  components: {
    FaqList,
    ReviewsSlider,
    ToursSlider
  },
  head() {
    const title = 'FAQ'

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
  async fetch({ store }) {
    await store.dispatch('tours/loadTours')

    // Reviews
    const reviewsInStore = store.getters['reviews/reviews']
    if (reviewsInStore.length <= 0)
      await store.dispatch('reviews/loadAllReviews')
  },
  computed: {
    ...mapGetters({
      allTours: 'tours/allTours',
      reviews: 'reviews/reviews',
      general: 'general/data',
      locale: 'lang/locale'
    }),
    hasReviews() {
      return this.filteredReviews && this.filteredReviews.length > 0
    },
    filteredReviews() {
      return this.reviews.filter(({ fields }) => {
        // City
        const sameCity = fields.city === this.$route.params.city

        // Locale
        const sameLocale = fields.locale === this.locale

        return sameCity && sameLocale
      })
    },
    otherTours() {
      return this.allTours.slice(0, 8)
    }
  }
}
</script>

<style lang="sass" scoped>
.faq-page
  padding-top: calc(var(--header-h) + 13vh)
  padding-bottom: 14.8vh
  @media (max-width: $tab)
    padding-top: calc(var(--header-h) + 48px)
    padding-bottom: 80px

.faq-page__title
  @media (min-width: $tab + 1)
    max-width: 5em
    padding-top: 0.4em

    z-index: 2
    position: sticky
    top: calc(var(--header-h) + 16px)
    float: left

  @media (max-width: $tab)
    margin-bottom: 40px

.faq-page__content
  margin: 0 auto
  @media (min-width: $tab + 1)
    max-width: column-spans(6)

.faq-page__content /deep/ .accordion-container
  @media (min-width: $tab + 1)
    margin-bottom: 40px

.faq-page__content /deep/ .accordion::before
  @media (min-width: $tab + 1)
    left: minus(unit-plus(mix(3)))

  @media (max-width: $tab)
    left: minus($unit)

.faq-page__text
  @media (max-width: $tab)
    display: none

.faq-page__text b,
.faq-page__text a
  +mont(sb)
  letter-spacing: -0.02em

.faq-page__text b
  display: block
  font-size: 18px
  @media (max-width: $tab)
    font-size: 14px

.faq-page__text a
  white-space: nowrap
  +link($acc)
</style>
