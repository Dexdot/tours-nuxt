<template>
  <div>
    <section class="hero">
      <div
        :class="[
          'hero__bg img',
          {
            'js-parallax-scale': main.heroImages && main.heroImages.length <= 2
          }
        ]"
      >
        <template v-if="main.heroImages">
          <BaseImage
            :class="['img__i', { 'hero__bg-anim': main.heroImages.length > 2 }]"
            v-for="(img, i) in main.heroImages"
            :key="img.sys.id"
            :img="img"
            :alt="img.fields.title"
            :style="{
              'animation-name': `kenburns-${i + 1}`,
              'z-index': main.heroImages.length - (i + 1)
            }"
          />
        </template>
      </div>

      <div class="hero__text">
        <div class="container">
          <div class="hero__chipbox-list" data-animate="fade">
            <Chipbox
              white
              :active="key === city"
              v-for="key in Object.keys($t('cities'))"
              :key="key"
              @click="onChipboxClick(key)"
              >{{ $t("cities")[key] }}
            </Chipbox>
          </div>
          <h1 v-if="main.heroTitle" class="t-h1" data-animate="fadeup">
            {{ main.heroTitle }}
          </h1>
          <p v-if="main.heroText" data-animate="fadeup">{{ main.heroText }}</p>
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
            <div class="feature-img js-parallax" v-if="main.featuresCover">
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
                <div class="feature__icon u-center" data-animate="scalein">
                  <img :src="img.fields.file.url" :alt="img.fields.title" />
                </div>
                <div class="feature__info">
                  <h3 class="t-h5 feature__title" data-animate="fade">
                    {{ img.fields.title }}
                  </h3>
                  <p data-animate="fade">{{ img.fields.description }}</p>
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
        <div class="about-section__first-img js-parallax">
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
                <p
                  v-if="isText(item)"
                  v-html="render(item)"
                  data-animate="fade"
                ></p>
              </div>
            </template>

            <BaseButton
              v-if="city === 'invinoveritas'"
              @click="$store.dispatch('dom/showBukza')"
              >{{ $t("choose") }}</BaseButton
            >
            <BaseButton v-else isLink :to="$cityLocalePath('/tours')">{{
              $t("chooseTour")
            }}</BaseButton>
          </div>

          <div
            class="about-section__text-img"
            v-if="main.aboutImages.length >= 3"
          >
            <div class="js-parallax">
              <BaseImage
                :img="main.aboutImages[1]"
                :alt="main.aboutImages[1].fields.title"
              />
            </div>
            <div>
              <BaseImage
                :img="main.aboutImages[2]"
                :alt="main.aboutImages[2].fields.title"
              />
            </div>
          </div>
        </div>

        <div
          class="about-section__last-img"
          v-if="main.aboutImages.length >= 5"
        >
          <div class="about-section__last-inner">
            <div class="js-parallax">
              <BaseImage
                :img="main.aboutImages[3]"
                :alt="main.aboutImages[3].fields.title"
              />
            </div>
            <div>
              <BaseImage
                :img="main.aboutImages[4]"
                :alt="main.aboutImages[4].fields.title"
              />
            </div>
          </div>

          <div class="js-parallax">
            <BaseImage
              v-if="main.aboutImages[5]"
              :img="main.aboutImages[5]"
              :alt="main.aboutImages[5].fields.title"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section" v-if="general.faq">
      <div class="container">
        <h2 class="t-h3 faq-section__title" data-animate="fade">
          {{ $t("main.faqTitle") }}
        </h2>
        <div class="faq-section__content">
          <FaqList :content="general.faq.content" />
        </div>
      </div>
    </section>

    <Instagram v-if="instagramData" :data="instagramData" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ToursPopular from "~/components/ToursPopular";
import HowSection from "~/components/HowSection";
import ReviewsSlider from "~/components/ReviewsSlider";
import FaqList from "~/components/FaqList";
import Instagram from "~/components/Instagram";
import Chipbox from "~/ui/Chipbox";

import page from "~/mixins/page";
import render from "~/mixins/render";
import city from "~/mixins/city";
import animate from "~/mixins/animate";
import parallax from "~/mixins/parallax";

export default {
  mixins: [page, render, city, animate, parallax],
  components: {
    ToursPopular,
    HowSection,
    ReviewsSlider,
    FaqList,
    Instagram,
    Chipbox
  },
  head() {
    const { seo, contactsImage } = this.general;
    const { title, description } = seo.index;

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
  async fetch({ store, route }) {
    const mainPromise = store.dispatch("main/load", route.params.city);
    const toursPromise = store.dispatch("tours/loadTours");
    const reviewsPromise = store.dispatch("reviews/loadReviews");
    await Promise.all([mainPromise, toursPromise, reviewsPromise]);
  },
  computed: {
    ...mapGetters({
      tours: "tours/popularTours",
      allReviews: "reviews/allReviews",
      main: "main/data",
      general: "general/data",
      locale: "lang/locale"
    }),
    reviews() {
      const toursIds = this.tours.map(tour => tour.sys.id);

      const result = this.allReviews.filter(({ fields }) => {
        const reviewTours = fields.tours;
        if (!reviewTours || reviewTours.length <= 0) return false;
        const reviewToursIds = reviewTours.map(tour => tour.sys.id);
        return reviewToursIds.some(tourId => toursIds.includes(tourId));
      });

      const ids = result.map(r => r.sys.id);
      return result.filter(({ sys }, i) => ids.indexOf(sys.id) === i);
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
    onChipboxClick(city) {
      this.city = city;
    }
  }
};
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
