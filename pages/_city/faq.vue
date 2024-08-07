<template>
  <main>
    <section class="faq-page">
      <div class="container">
        <h2 class="t-h3 faq-page__title">{{ $t("faq.title") }}</h2>
        <div class="faq-page__content">
          <FaqList v-if="general.faq" :content="general.faq.content" />

          <p class="faq-page__text">
            <b>{{ $t("faq.subtitle") }}</b>
            {{ $t("faq.call") }}
            <a :href="general.phoneNumber">{{ general.phoneText }}</a>
            {{ $t("faq.text") }}
            <a :href="`mailto:${general.email}`">{{ general.email }}</a>
          </p>
        </div>
      </div>
    </section>

    <ReviewsSlider v-if="hasReviews" :reviews="reviews" />

    <ToursSlider
      :title="$t('reviews.otherToursTitle')"
      v-if="otherTours.length > 0"
      :tours="otherTours"
    />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import FaqList from "~/components/FaqList";
import ReviewsSlider from "~/components/ReviewsSlider";
import ToursSlider from "~/components/ToursSlider";
import page from "~/mixins/page";
import { getRandomEntries } from "~/assets/scripts/helpers";

export default {
  mixins: [page],
  components: {
    FaqList,
    ReviewsSlider,
    ToursSlider
  },
  head() {
    const { seo, contactsImage } = this.general;
    const { title, description } = seo.faq;

    return {
      title,
      titleTemplate: null,
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: contactsImage.fields.file.url || ""
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description
        },
        {
          hid: "og:image",
          property: "og:image",
          content: contactsImage.fields.file.url || ""
        },
        {
          hid: "description",
          name: "description",
          content: description
        }
      ]
    };
  },
  async fetch({ store }) {
    const toursPromise = store.dispatch("tours/loadTours");
    const reviewsPromise = store.dispatch("reviews/loadReviews");
    await Promise.all([toursPromise, reviewsPromise]);
  },
  computed: {
    ...mapGetters({
      allTours: "tours/allTours",
      reviews: "reviews/allReviews",
      general: "general/data",
      locale: "lang/locale"
    }),
    hasReviews() {
      return this.reviews && this.reviews.length > 0;
    },
    otherTours() {
      return this.allTours.length > 0 ? getRandomEntries(this.allTours, 8) : [];
    }
  }
};
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
  +link(var(--acc-c))
</style>
