<template>
  <div>
    <section class="hero">
      <div class="hero__bg img">
        <template v-if="main.heroImages">
          <BaseImage
            class="img__i"
            :img="main.heroImages[0]"
            :alt="main.heroImages[0].fields.title"
          />
          <!-- <BaseImage
            class="img__i"
            v-for="(img, i) in main.heroImages"
            :key="img.sys.id"
            :img="img"
            :alt="img.fields.title"
            :style="{
              animation: `kenburns ${main.heroImages.length *
                6}s ease-in-out infinite`,
              'animation-delay': `${i * 6}s`
            }"
          /> -->
        </template>
      </div>

      <div class="hero__text">
        <div class="container">
          <div class="hero__chipbox-list">
            <Chipbox
              white
              :active="key === city"
              v-for="key in Object.keys($t('cities'))"
              :key="key"
              @click="onChipboxClick(key)"
              >{{ $t('cities')[key] }}
            </Chipbox>
          </div>
          <h1 v-if="main.heroTitle" class="t-h1">{{ main.heroTitle }}</h1>
          <p v-if="main.heroText">{{ main.heroText }}</p>
        </div>
      </div>
    </section>

    <ToursPopular
      v-if="tours.length > 0"
      :tours="tours"
      :title="main.popularTitle"
      :text="main.popularText"
    />

    <HowSection v-if="main.runningTitle" :text="main.runningTitle" />

    <section class="features-section">
      <div class="container">
        <div class="features-section__inner">
          <div class="feature-section__img">
            <div class="feature-section__cover"></div>
            <div class="feature-img" v-if="main.featuresCover">
              <BaseImage
                :img="main.featuresCover"
                :alt="main.featuresCover.fields.title"
              />
            </div>
          </div>

          <ul
            class="features-list"
            v-if="main.featuresIcons && main.featuresIcons.length > 0"
          >
            <li v-for="img in main.featuresIcons" :key="img.sys.id">
              <div class="feature">
                <div class="feature__icon u-center">
                  <img :src="img.fields.file.url" :alt="img.fields.title" />
                </div>
                <div class="feature__info">
                  <h3 class="t-h5 feature__title">{{ img.fields.title }}</h3>
                  <p>{{ img.fields.description }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <ReviewsSlider v-if="reviews && reviews.length > 0" :reviews="reviews" />

    <section class="about-section">
      <div class="container">
        <div class="about-section__first-img">
          <BaseImage
            v-if="main.aboutImages[0]"
            :img="main.aboutImages[0]"
            :alt="main.aboutImages[0].fields.title"
          />
        </div>

        <div class="about-section__info">
          <div class="about-section__text">
            <template v-if="main.aboutText.content">
              <div
                v-for="(item, i) in main.aboutText.content"
                :key="i + item.nodeType"
              >
                <p v-if="isText(item)" v-html="render(item)"></p>
              </div>
            </template>
            <BaseButton isLink :to="$cityLocalePath('/tours')">{{
              $t('chooseTour')
            }}</BaseButton>
          </div>

          <div
            class="about-section__text-img"
            v-if="main.aboutImages.length >= 3"
          >
            <BaseImage
              :img="main.aboutImages[1]"
              :alt="main.aboutImages[1].fields.title"
            />
            <BaseImage
              :img="main.aboutImages[2]"
              :alt="main.aboutImages[2].fields.title"
            />
          </div>
        </div>

        <div
          class="about-section__last-img"
          v-if="main.aboutImages.length >= 5"
        >
          <div>
            <BaseImage
              :img="main.aboutImages[3]"
              :alt="main.aboutImages[3].fields.title"
            />
            <BaseImage
              :img="main.aboutImages[4]"
              :alt="main.aboutImages[4].fields.title"
            />
          </div>
          <BaseImage
            v-if="main.aboutImages[5]"
            :img="main.aboutImages[5]"
            :alt="main.aboutImages[5].fields.title"
          />
        </div>
      </div>
    </section>

    <section class="faq-section" v-if="general.faq">
      <div class="container">
        <h2 class="t-h3 faq-section__title">{{ $t('main.faqTitle') }}</h2>
        <div class="faq-section__content">
          <FaqList :content="general.faq.content" />
        </div>
      </div>
    </section>

    <Instagram v-if="instagramData" :data="instagramData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ToursPopular from '~/components/ToursPopular'
import HowSection from '~/components/HowSection'
import ReviewsSlider from '~/components/ReviewsSlider'
import FaqList from '~/components/FaqList'
import Instagram from '~/components/Instagram'
import Chipbox from '~/ui/Chipbox'

import page from '~/mixins/page'
import render from '~/mixins/render'
import city from '~/mixins/city'

export default {
  mixins: [page, render, city],
  components: {
    ToursPopular,
    HowSection,
    ReviewsSlider,
    FaqList,
    Instagram,
    Chipbox
  },
  head() {
    const { title, description } = this.general.seo.index

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
          content: description
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
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/favicon/projectName.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    }
  },
  async fetch({ store, route }) {
    await store.dispatch('main/load', route.params.city)
    await store.dispatch('tours/loadTours')
  },
  computed: {
    ...mapGetters({
      tours: 'tours/popularTours',
      main: 'main/data',
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
