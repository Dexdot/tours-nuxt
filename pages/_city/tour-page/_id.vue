<template>
  <div>
    <no-ssr>
      <GalleryModal
        v-if="tourData.gallery"
        :active="isGalleryModalVisible"
        :images="tourData.gallery"
        @close-click="hideGalleryModal"
        ref="galleryModal"
      />
    </no-ssr>

    <main class="tour-page">
      <GallerySection
        v-if="tourData.gallery"
        :images="tourData.gallery.slice(0, 4)"
        @cell-click="onCellClick"
        tourLanding
      />

      <div class="container">
        <div class="tour-page__container">
          <div class="tour-page__left">
            <h1 class="tour-page__title t-h3">{{ tourData.title }}</h1>

            <ul class="tour-page__info-list">
              <li v-if="tourData.numberOfPeople">
                <svg-icon class="tour-page__info-icon" name="people"></svg-icon>
                <p>{{ tourData.numberOfPeople }}</p>

                <Tip v-if="tourData.popupContent">
                  <div
                    v-for="(item, i) in tourData.popupContent.content"
                    :key="i + item.nodeType"
                  >
                    <p v-if="isText(item)" v-html="render(item)"></p>
                  </div>
                </Tip>
              </li>

              <li v-if="tourData.duration">
                <svg-icon class="tour-page__info-icon" name="clock"></svg-icon>
                <p>{{ tourData.duration }}</p>
              </li>

              <li v-if="tourData.venue">
                <svg-icon class="tour-page__info-icon" name="pin"></svg-icon>
                <p>{{ tourData.venue }}</p>
              </li>
            </ul>
          </div>

          <div class="tour-page__content">
            <div class="tour-page__content-inner" v-if="tourData.description">
              <div
                v-for="(item, i) in tourData.description.content"
                :key="i + item.nodeType"
              >
                <p v-if="isText(item)" v-html="render(item)"></p>
                <ol v-if="isOL(item)" v-html="render(item)"></ol>
                <ul v-if="isUL(item)" v-html="render(item)"></ul>
              </div>
            </div>
            <div class="download-btn-wrap" v-if="tourData.presentation">
              <a
                class="download-btn"
                :href="tourData.presentation.fields.file.url"
                target="_blank"
                download
              >
                {{ $t("tourLanding.downloadPresentation") }}
              </a>
            </div>
          </div>

          <div class="tour-page__right">
            <CorpContactForm
              :email="tourData.email"
              :phone="tourData.phone"
              :label="tourData.contactLabel"
            />
          </div>
        </div>
      </div>
    </main>

    <LogosSlider
      :title="tourData.logosTitle"
      v-if="logos && logos.length > 0"
      :logos="logos"
      :noPaddingBottom="commonTours.length > 0"
    />

    <ToursSlider
      :title="tourData.toursTitle"
      v-if="commonTours.length > 0"
      :tours="commonTours"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import GallerySection from "~/components/GallerySection";
import GalleryModal from "~/components/GalleryModal";
import ToursSlider from "~/components/ToursSlider";
import LogosSlider from "~/components/LogosSlider";

import Tip from "~/ui/Tip";
import TipButton from "~/ui/TipButton";
import CorpContactForm from "~/components/CorpContactForm";

import render from "~/mixins/render";
import page from "~/mixins/page";
import city from "~/mixins/city";
import { getRandomEntries } from "~/assets/scripts/helpers";

export default {
  mixins: [page, city, render],
  components: {
    GallerySection,
    GalleryModal,
    ToursSlider,
    Tip,
    TipButton,
    CorpContactForm,
    LogosSlider
  },
  head() {
    const { seoTitle, seoDescription, previewImage } = this.tourData;
    const title = seoTitle || this.tourData.title;
    const description = seoDescription || "";

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
          content: previewImage.fields.file.url
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
          content: previewImage.fields.file.url
        },
        {
          hid: "description",
          name: "description",
          content: description
        }
      ]
    };
  },
  data: () => ({
    isGalleryModalVisible: false
  }),
  middleware({ app, params, redirect }) {
    if (!params.id) return redirect(app.$cityLocalePath("/tours"));
  },
  async asyncData({ store, params, error }) {
    // Current city
    const { city } = params;

    // Tour ID
    const slug = params.id;

    const landingsPromise = store.dispatch("tour-landings/loadLandings");
    const commonToursPromise = store.dispatch("tours/loadTours");
    const [landingsMap] = await Promise.all([
      landingsPromise,
      commonToursPromise
    ]);
    const tour = landingsMap[slug];

    // 404
    if (!tour || (tour && tour.fields.city !== city)) {
      error({ statusCode: 404 });
    }

    return { tour };
  },
  computed: {
    ...mapGetters({
      allTours: "tours/allTours",
      locale: "lang/locale",
      general: "general/data"
    }),
    tourData() {
      return this.tour.fields;
    },
    commonTours() {
      const filtered = this.allTours.filter(
        ({ fields }) => fields.slug !== this.tourData.slug
      );

      return filtered.length > 0 ? getRandomEntries(filtered, 8) : [];
    },
    logos() {
      return this.tourData.logos && this.tourData.logos.length > 0
        ? this.tourData.logos.map(c => c.fields.file.url)
        : [];
    }
  },
  methods: {
    onCellClick(i) {
      this.$refs.galleryModal.setIndex(i);
      this.showGalleryModal();
    },
    showGalleryModal() {
      this.isGalleryModalVisible = true;
    },
    hideGalleryModal() {
      this.isGalleryModalVisible = false;
    }
  }
};
</script>

<style lang="sass" scoped>
.tour-page
  padding-top: var(--header-h)
  padding-bottom: 120px
  @media (max-width: $tab)
    padding-bottom: 80px

// Container
.tour-page__container
  display: flex
  align-items: flex-start
  padding-top: 64px

  @media (min-width: $tab + 1)
    padding-bottom: 40px

  @media (max-width: $tab)
    flex-direction: column
    padding-top: 40px


// Left
.tour-page__left,
.tour-page__right
  @media (min-width: $tab + 1)
    position: sticky

  @media (max-width: $tab)
    order: -1

.tour-page__left,
.tour-page__content
  @media (max-width: $tab)
    width: 100%

.tour-page__left
  z-index: 2

  @media (min-width: $tab + 1)
    top: calc(8px + var(--header-h))
    min-width: mix(4)
    width: mix(4)
    padding-right: gutter-spans(2)

  @media (max-width: $tab)
    margin-bottom: 48px


.tour-page__content-inner /deep/ a
  +link(var(--acc-c))


// Title
.tour-page__title
  margin-bottom: 32px
  @media (max-width: $tab)
    margin-bottom: 24px


// Info list
.tour-page__info-list
  line-height: 1.2

  li
    display: flex
    align-items: flex-start

  li:not(:last-child)
    margin-bottom: 8px

.tour-page__info-icon
  margin-right: 12px
  min-width: 16px
  width: 16px
  height: 16px

.tour-page__info-list .tip
  margin-left: 0.3em


// Content
.tour-page__content
  font-size: 16px

  @media (min-width: $tab + 1)
    min-width: column-spans(4)
    width: column-spans(4)

  @media (max-width: $tab)
    padding-top: 64px

.tour-page__content h2
  margin-bottom: 32px
  @media (max-width: $tab)
    margin-bottom: 40px

  + .tour-page__info-list
    @media (max-width: $tab)
      display: none

.tour-page__content-inner
  margin-bottom: 48px
  letter-spacing: -0.02em

  @media (max-width: $tab)
    margin-bottom: 64px

  b
    +mont(sb)

  > div:not(:last-child) p
    margin-bottom: 24px

.download-btn-wrap
  margin-top: -24px

.download-btn
  display: inline-block
  padding: 12px

  border: 1px solid $black
  border-radius: 26px


// Right
.tour-page__right
  background: var(--sec-c)

  @media (min-width: $tab + 1)
    min-width: mix(3)
    width: mix(3)
    margin-left: auto

    top: calc(64px + var(--header-h))
    transform: translateY(-64px)

  @media (max-width: $tab)
    width: 100vw
    margin-left: minus($unit)


// Dates
.tour-page__roadmap,
.tour-page__dates-list
  margin-bottom: 64px

.tour-page__dates-list
  display: flex

  margin-left: -8px
  margin-top: -8px

  @media (max-width: 1540px)
    flex-wrap: wrap

.tour-page__dates-list > li
  margin-left: 8px
  margin-top: 8px
  width: calc(25% - 8px)

  @media (min-width: $tab + 1) and (max-width: 1540px)
    width: calc(33.3333% - 8px)

  @media (max-width: $tab)
    width: calc(50% - 8px)
</style>
