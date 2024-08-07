<template>
  <main>
    <section class="reviews-section">
      <div class="container">
        <div class="reviews-container">
          <div class="reviews-left">
            <h1 class="reviews-title">{{ $t("reviews.title") }}</h1>

            <div class="reviews-controls reviews-controls--desktop">
              <div class="reviews-control">
                <MultipleSelect
                  :list="selectList"
                  :selected="selectedFilters"
                  :className="'reviews-selects'"
                  :placeholder="$t('reviews.selectTypeTitle')"
                  @change="onSelectValueClick"
                />
              </div>

              <div class="reviews-control" v-if="filteredTours.length > 0">
                <MultipleSelect
                  :list="selectToursList"
                  :selected="selectedTours"
                  :className="'reviews-selects-tours'"
                  :placeholder="$t('reviews.selectTourNotChosenTitle')"
                  @change="onTourSelectValueClick"
                />
              </div>
            </div>

            <div class="reviews-controls reviews-controls--mob">
              <div class="reviews-control">
                <MultipleSelect
                  :list="selectList"
                  :selected="selectedFilters"
                  :className="'reviews-selects'"
                  :placeholder="$t('reviews.selectTypeTitle')"
                  @change="onSelectValueClick"
                />
              </div>

              <button
                class="reviews-link t-ttu"
                type="button"
                @click="showReviewRatesModal"
              >
                {{ $t("reviews.watchReviews") }}
                <svg-icon name="chevron" />
              </button>
            </div>

            <div class="reviews-add">
              <BaseButton
                classPulse
                @click="$store.dispatch('dom/toggleAddReview')"
                >{{ $t("reviews.add") }}</BaseButton
              >
            </div>
          </div>

          <div class="reviews-content">
            <ul class="reviews-list">
              <li v-for="review in pagenReviews" :key="review.sys.id">
                <ReviewCard :review="review" />
              </li>
            </ul>

            <div class="reviews-pagen" v-show="filteredReviews.length > 6">
              <PagenSmart
                :list="filteredReviews"
                :currentPage="pagenPage"
                @change="onPagenChange"
              />
            </div>
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
import { mapGetters } from "vuex";

import ToursSlider from "~/components/ToursSlider";
import ReviewCard from "~/components/ReviewCard";
import ReviewRates from "~/components/ReviewRates";
import ReviewRatesModal from "~/components/ReviewRatesModal";
import MultipleSelect from "~/ui/MultipleSelect";
import PagenSmart from "~/ui/PagenSmart";

import page from "~/mixins/page";
import render from "~/mixins/render";

import { getRandomEntries, convertToDate } from "~/assets/scripts/helpers";

export default {
  mixins: [page, render],
  components: {
    ToursSlider,
    ReviewCard,
    ReviewRates,
    ReviewRatesModal,
    MultipleSelect,
    PagenSmart
  },
  head() {
    const { seo, contactsImage } = this.general;
    const { title, description } = seo.reviews;

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
  data: () => ({
    isReviewRatesModalVisible: false,
    selectedFilters: [],
    selectedTours: [],
    pagenPage: 1
  }),
  computed: {
    ...mapGetters({
      allTours: "tours/allTours",
      reviews: "reviews/allReviews",
      general: "general/data",
      locale: "lang/locale"
    }),
    selectList() {
      const list = Object.keys(this.$t("tourTypes"))
        .filter(key => {
          return this.allTours.some(tour => {
            const filters = tour.fields.filters || [];
            return filters.includes(key);
          });
        })
        .map(k => ({
          label: this.$t("tourTypes")[k],
          value: k
        }));

      return [
        { label: this.$t("reviewsTourTypes.all"), value: "all" },
        ...list
      ];
    },
    selectToursList() {
      const list = this.filteredTours.map(tour => ({
        label: tour.fields.title,
        value: tour.sys.id
      }));

      return [
        { label: this.$t("reviewsTourTypes.all"), value: "all" },
        ...list
      ];
    },
    filteredReviews() {
      if (this.selectedTours && this.selectedTours.length > 0) {
        return this.reviews.filter(({ fields }) => {
          const reviewTours = fields.tours;
          if (!reviewTours || reviewTours.length <= 0) return false;
          const reviewToursIds = reviewTours.map(tour => tour.sys.id);
          return reviewToursIds.some(tourId =>
            this.selectedTours.includes(tourId)
          );
        });
      }

      if (this.selectedFilters.length > 0 && this.filteredTours.length > 0) {
        const filteredToursIds = this.filteredTours.map(tour => tour.sys.id);

        return this.reviews.filter(({ fields }) => {
          const reviewTours = fields.tours;
          if (!reviewTours || reviewTours.length <= 0) return false;
          const reviewToursIds = reviewTours.map(tour => tour.sys.id);
          return reviewToursIds.some(tourId =>
            filteredToursIds.includes(tourId)
          );
        });
      }

      return this.reviews;
    },
    pagenReviews() {
      const index = this.pagenPage - 1;
      const skip = index * 6;
      return this.sortedReviews.slice(skip, skip + 6);
    },
    sortedReviews() {
      const defaultDate = convertToDate("01.01.2017");
      return [...this.filteredReviews].sort((a, b) => {
        const dateA = a.fields.sortDate
          ? convertToDate(a.fields.sortDate)
          : defaultDate;

        const dateB = b.fields.sortDate
          ? convertToDate(b.fields.sortDate)
          : defaultDate;

        const timeA = dateA.getTime();
        const timeB = dateB.getTime();
        return timeB - timeA;
      });
    },
    filteredTours() {
      if (!this.selectedFilters || this.selectedFilters.length <= 0)
        return this.allTours;

      return this.allTours.filter(({ fields }) => {
        if (fields.filters && fields.filters.length > 0) {
          return fields.filters.some(f => this.selectedFilters.includes(f));
        }

        return false;
      });
    },
    otherTours() {
      return this.allTours.length > 0 ? getRandomEntries(this.allTours, 8) : [];
    },
    aggregators() {
      return this.general.aggregators.map(img => {
        const copy = { ...img };
        const [rate, ratesLength] = copy.fields.description.split("|");

        copy.fields.rate = rate.trim();
        copy.fields.ratesLength = ratesLength.trim();

        return copy;
      });
    },
    hasAggregators() {
      return this.aggregators && this.aggregators.length > 0;
    }
  },
  watch: {
    selectedTours() {
      this.pagenPage = 1;
    }
  },
  methods: {
    onPagenChange(i) {
      this.pagenPage = i;
      window.scrollTo(0, 0);
    },
    showReviewRatesModal() {
      this.isReviewRatesModalVisible = true;
    },
    hideReviewRatesModal() {
      this.isReviewRatesModalVisible = false;
    },
    onSelectValueClick(v) {
      if (v === "all") {
        this.selectedFilters = [];
        return;
      }

      const result = this.selectedFilters.includes(v)
        ? this.selectedFilters.filter(f => f !== v)
        : [...this.selectedFilters, v];

      this.selectedFilters = result;
    },
    onTourSelectValueClick(v) {
      if (v === "all") {
        this.selectedTours = [];
        return;
      }

      const result = this.selectedTours.includes(v)
        ? this.selectedTours.filter(f => f !== v)
        : [...this.selectedTours, v];

      this.selectedTours = result;
    }
  }
};
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
    position: relative
    width: 100%
    margin-bottom: 48px

.reviews-right
  background: var(--sec-c)
  transform: translate($unit, minus($reviews-pt))
  top: $reviews-pt

  padding: $reviews-pt $unit 0 unit-plus(8px)
  margin-left: auto
  min-width: unit-plus(column-spans(3))
  width: unit-plus(column-spans(3))
  height: 100vh
  min-height: 670px

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
    min-height: 56px

.reviews-add
  display: block

  @media (min-width: $tab + 1)
    margin-top: 32px

  @media (max-width: $tab)
    position: absolute
    top: 0
    right: 0

.reviews-control .t-ttu
  +mont(m)

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
  padding-right: 24px
  @media (max-width: $tab)
    display: none

.reviews-controls--mob
  @media (min-width: $tab + 1)
    display: none

.reviews-link
  font-size: 12px
  +mont(sb)
  +link(var(--acc-c))
  text-align: right

  display: flex
  align-items: center

  @media (min-width: $tab + 1)
    display: none

  .i-chevron
    margin-left: 4px
    width: 8px
    height: 8px
    color: var(--acc-c)

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
