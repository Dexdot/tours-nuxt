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
      <SightsModal
        v-if="tourData.gallery"
        :active="isSightsModalVisible"
        :img="tourData.routeGallery[sightsIndex]"
        :counter="sightsIndex + 1"
        @prev-click="sightsPrev"
        @next-click="sightsNext"
        @close-click="hideSightsModal"
        ref="sightsModal"
      />
    </no-ssr>

    <main class="tour-page">
      <GallerySection
        v-if="tourData.gallery"
        :images="tourData.gallery"
        @cell-click="onCellClick"
      />

      <div class="container">
        <div class="tour-page__container">
          <div class="tour-page__left">
            <h1 class="tour-page__title t-h3">{{ tourData.title }}</h1>

            <ul class="tour-page__info-list">
              <li>
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

              <li>
                <svg-icon class="tour-page__info-icon" name="clock"></svg-icon>
                <p>{{ tourData.duration }}</p>
              </li>

              <li>
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

            <template v-if="tourData.routeGallery">
              <h2 class="t-h5">{{ $t('tour.routeTitle') }}</h2>

              <div class="tour-page__roadmap">
                <div class="roadmap">
                  <div class="roadmap__title roadmap__title--desktop">
                    <TipButton />
                    <b>
                      {{ $t('tour.roadmapTip') }}
                    </b>
                  </div>

                  <div class="roadmap__title roadmap__title--mob">
                    <TipButton />
                    <b>
                      {{ $t('tour.roadmapTip') }}
                    </b>
                  </div>

                  <ul class="roadmap__list">
                    <li
                      v-for="(img, i) in tourData.routeGallery"
                      :key="img.sys.id"
                    >
                      <button
                        class="roadmap__btn"
                        type="button"
                        @click="onRouteButtonClick(i)"
                      >
                        {{ img.fields.description }}
                        <span class="roadmap__btn-icon"></span>
                        <BaseImage
                          :img="img"
                          :alt="img.fields.title"
                          class="roadmap__img"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <template v-if="tourData.venue">
              <h2 class="t-h5">{{ $t('tour.venueTitle') }}</h2>
              <ul class="tour-page__info-list">
                <li>
                  <svg-icon class="tour-page__info-icon" name="pin"></svg-icon>
                  <p>{{ tourData.venue }}</p>
                </li>
              </ul>
            </template>
          </div>

          <div class="tour-page__right">
            <FormOrder
              :price="tourData.price"
              :priceChild="tourData.priceChild"
              :offerTitle="tourData.offerTitle"
              :offerText="tourData.offerText"
            />
          </div>
        </div>

        <no-ssr>
          <div class="tour-page__map img" v-if="tourData.location">
            <yandex-map :coords="coords" :zoom="16">
              <ymap-marker
                :marker-id="tourData.slug"
                :coords="coords"
                :hint-content="`${$t('tour.venueTitle')}: ${tourData.venue}`"
              />
            </yandex-map>
          </div>
        </no-ssr>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchTour } from '~/api/tours'

import GallerySection from '~/components/GallerySection'
import GalleryModal from '~/components/GalleryModal'
import SightsModal from '~/components/SightsModal'
import Tip from '~/components/Tip'
import TipButton from '~/components/TipButton'
import FormOrder from '~/components/FormOrder'

import render from '~/mixins/render'
import page from '~/mixins/page'

export default {
  mixins: [page, render],
  components: {
    GallerySection,
    GalleryModal,
    SightsModal,
    Tip,
    TipButton,
    FormOrder
  },
  head() {
    const { title, previewImage } = this.tour.fields

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
          content: previewImage.fields.file.url
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
          content: previewImage.fields.file.url
        },
        {
          hid: 'description',
          name: 'description',
          content: title
        }
      ]
    }
  },
  mounted() {
    console.log('TOUR: ', this)
  },
  data: () => ({
    isGalleryModalVisible: false,
    isSightsModalVisible: false,
    sightsIndex: 0
  }),
  async asyncData({ store, params, error }) {
    // Tours
    const allToursInStore = store.getters['tours/allTours']

    // Find tour in store
    const slug = params.id
    let tour = allToursInStore.find(({ fields }) => fields.slug === slug)

    // Load tour from API
    if (!tour) {
      try {
        tour = await fetchTour({
          slug,
          locale: store.getters['lang/localeCode']
        })
      } catch (e) {
        error({ statusCode: 404 })
      }
    }

    // Load all tours if its empty
    if (allToursInStore.length <= 0) await store.dispatch('tours/loadAllTours')

    return { tour }
  },
  computed: {
    coords() {
      return [this.tourData.location.lat, this.tourData.location.lon]
    },
    tourData() {
      return this.tour.fields
    }
  },
  methods: {
    sightsPrev() {
      this.setSightsIndex(
        this.sightsIndex <= 0
          ? this.tourData.routeGallery.length - 1
          : this.sightsIndex - 1
      )
    },
    sightsNext() {
      this.setSightsIndex(
        this.sightsIndex === this.tourData.routeGallery.length - 1
          ? 0
          : this.sightsIndex + 1
      )
    },
    setSightsIndex(i) {
      if (Number.isInteger(i)) {
        this.sightsIndex = i
      }
    },
    onCellClick(i) {
      this.$refs.galleryModal.setIndex(i)
      this.showGalleryModal()
    },
    showGalleryModal() {
      this.isGalleryModalVisible = true
    },
    hideGalleryModal() {
      this.isGalleryModalVisible = false
    },
    onRouteButtonClick(i) {
      if (window.innerWidth > 1040) return false

      this.setSightsIndex(i)
      this.showSightsModal()
    },
    showSightsModal() {
      this.isSightsModalVisible = true
    },
    hideSightsModal() {
      this.isSightsModalVisible = false
    }
  }
}
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


// Right
.tour-page__right
  background: $beige-d

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

// Map
.tour-page__map
  margin-left: auto
  margin-right: auto

  @media (min-width: $tab + 1)
    margin-top: 40px
    width: column-spans(6)

  &::before
    content: ''
    display: block
    width: 100%
    padding-bottom: 56.25%

    @media (max-width: $tab)
      padding-bottom: 72vh

  .ymap-container
    position: absolute
    top: 0
    left: 0

    width: 100%
    height: 100%
</style>