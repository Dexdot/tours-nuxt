<template>
  <div>
    <section class="catalog-section">
      <div class="container">
        <div class="catalog-head">
          <h1 class="t-h3 catalog-title">{{ $t("tours.title") }}</h1>
          <div class="catalog-selects">
            <div
              :class="[
                'select-text-multiple',
                { 'select-text-multiple-open': isFiltersOpen }
              ]"
            >
              <button type="button" @click="toggleFiltersOpen">
                {{
                  selectedFilters.length
                    ? selectedFilters
                        .map(key => $t("tourTypes")[key])
                        .join(", ")
                    : $t("reviews.selectTypeTitle")
                }}
                <svg-icon name="chevron" />
              </button>
              <ul>
                <li
                  v-for="key in Object.keys($t('tourTypes'))"
                  :key="key"
                  :value="key"
                >
                  <button
                    :class="{ active: selectedFilters.includes(key) }"
                    type="button"
                    @click="onSelectValueClick(key)"
                  >
                    {{ $t("tourTypes")[key] }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <ul class="catalog-tabs">
            <li>
              <button
                :class="[
                  'catalog-tab t-ttu',
                  {
                    active: isAllSelected
                  }
                ]"
                type="button"
                @click="onSelectAllClick"
              >
                {{ $t("blog.categoryAll") }}
              </button>
            </li>
            <li v-for="key in Object.keys($t('tourTypes'))" :key="key">
              <button
                :class="[
                  'catalog-tab t-ttu',
                  {
                    active: selectedFilters.includes(key) && !isAllSelected
                  }
                ]"
                type="button"
                @click="onSelectValueClick(key)"
              >
                {{ $t("tourTypes")[key] }}
              </button>
            </li>
          </ul>
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
import { mapGetters } from "vuex";

import ReviewsSlider from "~/components/ReviewsSlider";
import TourCard from "~/components/TourCard";
import Instagram from "~/components/Instagram";

import render from "~/mixins/render";
import page from "~/mixins/page";
import city from "~/mixins/city";

export default {
  mixins: [page, render, city],
  components: {
    ReviewsSlider,
    TourCard,
    Instagram
  },
  head() {
    const { seo, contactsImage } = this.general;
    const { title, description } = seo.tours;

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
  async asyncData({ store, query }) {
    await store.dispatch("tours/loadTours");

    let selectedFilters = [];
    if (
      "filters" in query &&
      query.filters &&
      typeof query.filters === "string"
    ) {
      selectedFilters = query.filters.split(",");
    }

    return {
      selectedFilters,
      isFiltersOpen: false
    };
  },
  mounted() {
    document.addEventListener("click", this.onDocumentClick.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onDocumentClick);
  },
  computed: {
    ...mapGetters({
      allTours: "tours/allTours",
      general: "general/data",
      locale: "lang/locale"
    }),
    reviews() {
      const toursWithReviews = this.filteredTours.filter(
        tour => "reviews" in tour.fields
      );

      const reviews = toursWithReviews.reduce((reviews, tour) => {
        return [...reviews, ...tour.fields.reviews];
      }, []);

      const ids = reviews.map(r => r.sys.id);
      return reviews.filter(({ sys }, i) => ids.indexOf(sys.id) === i);
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
    isAllSelected() {
      return (
        this.selectedFilters.length <= 0 ||
        Object.keys(this.$t("tourTypes")).every(key =>
          this.selectedFilters.includes(key)
        )
      );
    },
    instagramData() {
      const { general } = this;

      const instagramImages = [...general.instagramImages].reverse();
      const images = [];

      images.push(instagramImages[0]);
      images.push({ sys: { id: new Date().getTime() } });

      instagramImages.slice(1).forEach(img => {
        images.push(img);
      });

      const data = {
        images: images.slice(0, 7),
        title: general.instagramTitle,
        text: general.instagramText,
        buttonUrl: general.instagramButtonUrl,
        buttonText: general.instagramButtonText
      };

      return data;
    }
  },
  methods: {
    onDocumentClick(e) {
      const tabsParent = e.target.closest(".catalog-selects");
      if (!tabsParent) {
        this.isFiltersOpen = false;
      }
    },
    onSelectAllClick() {
      this.selectedFilters = [];
      this.$router.replace(this.$cityLocalePath(`/tours`));
    },
    onSelectValueClick(v) {
      const result = this.selectedFilters.includes(v)
        ? this.selectedFilters.filter(f => f !== v)
        : [...this.selectedFilters, v];
      this.selectedFilters = result;

      if (result.length > 0) {
        this.$router.replace(
          this.$cityLocalePath(
            `/tours?${new URLSearchParams({ filters: result }).toString()}`
          )
        );
      } else {
        this.$router.replace(this.$cityLocalePath(`/tours`));
      }
    },
    toggleFiltersOpen() {
      this.isFiltersOpen = !this.isFiltersOpen;
    }
  }
};
</script>

<style lang="sass" scoped>
.catalog-section
  overflow: hidden
  padding-top: calc(var(--header-h) + 80px)
  padding-bottom: 18.5vh
  min-height: 540px

  @media (max-width: $tab)
    padding-top: calc(var(--header-h) + 48px)
    padding-bottom: 120px
    min-height: 420px

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
  margin-bottom: 64px

  @media (max-width: $tab)
    margin-bottom: 24px

.catalog-title
  display: block
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


.catalog-selects
  display: flex
  align-items: center
  justify-content: space-between

  @media (min-width: $tab + 1)
    display: none
</style>
