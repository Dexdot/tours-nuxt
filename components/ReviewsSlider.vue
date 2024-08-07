<template>
  <section class="reviews-slider-section">
    <div class="container">
      <ul class="reviews-slider" ref="slider">
        <li
          :class="['reviews-slide', { active: i === index }]"
          v-for="(review, i) in reviews"
          :key="review.sys.id"
          ref="slides"
        >
          <div
            v-if="review.fields.aggregatorIcon"
            class="reviews-slide__icon u-center"
          >
            <img
              :src="review.fields.aggregatorIcon.fields.file.url"
              :alt="review.fields.aggregatorIcon.fields.title"
            />
          </div>

          <div v-else class="reviews-slide__icon u-center">
            <img
              :src="
                require(`~/assets/img${
                  city === 'belgrade' ? '/belgrade' : ''
                }/umbrella-stroke.svg`)
              "
              alt="Umbrella"
            />
          </div>

          <ul class="reviews-slide__stars u-center">
            <li
              class="reviews-slide__star"
              v-for="i in review.fields.numberOfStars"
              :key="i"
            >
              <svg-icon name="star"></svg-icon>
            </li>
          </ul>

          <div class="reviews-slide__text">
            <div
              v-for="(item, i) in review.fields.reviewText.content"
              :key="i + item.nodeType"
            >
              <p v-if="isText(item)" v-html="render(item)"></p>
            </div>
          </div>

          <b class="reviews-slide__name" v-if="review.fields.clientName">
            {{ review.fields.clientName }}
          </b>
        </li>
      </ul>

      <div class="reviews-slider__bottom">
        <BaseButton isLink :to="$cityLocalePath('/reviews')">{{
          $t("reviews.sectionButton")
        }}</BaseButton>

        <div class="reviews-slider__btns" v-if="reviews.length > 1">
          <ButtonArrow
            @click="prev"
            class="reviews-slider__btn reviews-slider__btn--prev"
          />
          <ButtonArrow
            @click="next"
            class="reviews-slider__btn reviews-slider__btn--next"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from "~/ui/BaseButton";
import ButtonArrow from "~/ui/ButtonArrow";
import render from "~/mixins/render";
import city from "~/mixins/city";

export default {
  mixins: [render, city],
  components: {
    BaseButton,
    ButtonArrow
  },
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    index: 0
  }),
  mounted() {
    this.setHeight();
    ["resize", "load"].forEach(ev => {
      window.addEventListener(ev, this.setHeight.bind(this));
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setHeight);
  },
  methods: {
    setHeight() {
      const { slides, slider } = this.$refs;
      if (!slides || !slider) return false;

      let height = 0;

      slides.forEach(slide => {
        const slideHeight = slide.scrollHeight;

        if (slideHeight > height) {
          height = slideHeight;
        }
      });

      slider.style.height = `${height}px`;
    },
    prev() {
      this.index = this.index <= 0 ? this.reviews.length - 1 : this.index - 1;
    },
    next() {
      this.index = this.index === this.reviews.length - 1 ? 0 : this.index + 1;
    }
  }
};
</script>

<style lang="sass" scoped>
.reviews-slider-section
  position: relative
  background: var(--sec-c)
  padding: 144px 0 112px

  @media (max-width: $tab)
    padding: 80px 0 96px

.reviews-slider
  position: relative

  width: 100%
  margin: 0 auto 48px

  @media (min-width: $tab + 1)
    max-width: column-spans(6)

  @media (max-width: $tab)
    max-width: 90%
    margin: 0 auto 72px

.reviews-slide
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  width: 100%

  display: flex
  flex-direction: column
  align-items: center

  transition: 0.3s ease 0.2s

.reviews-slide:not(.active)
  opacity: 0
  pointer-events: none
  transform: translate(calc(-50% - 24px), -50%)
  transition: 0.3s ease

.reviews-slide__icon
  margin-bottom: 24px

  @media (max-width: $tab)
    margin-bottom: 16px

.reviews-slide__icon img
  width: 40px
  height: 40px
  @media (max-width: $tab)
    width: 32px
    height: 32px

.reviews-slide__stars
  margin-bottom: 24px
  margin-left: -4px
  @media (max-width: $tab)
    margin-bottom: 40px

.reviews-slide__star
  margin-left: 4px

.reviews-slide__star,
.reviews-slide__star .i-star
  min-width: 20px
  width: 20px
  height: 20px
  @media (max-width: $tab)
    min-width: 16px
    width: 16px
    height: 16px

.reviews-slide__text
  +mont(r)
  +yo('font-size', (375px: 18px, 1920px: 24px, 2550px: 26px))
  line-height: 1.4

.reviews-slide__text /deep/
  p
    margin-bottom: 24px
    display: -webkit-box
    -webkit-line-clamp: 8
    overflow: hidden
    -webkit-box-orient: vertical

  a
    +link(var(--acc-c))

.reviews-slide__name
  +mont(sb)
  font-size: 16px
  @media (min-width: $tab + 1)
    text-align: center

  @media (max-width: $tab)
    align-self: flex-start

  @media (min-width: 1940px)
    font-size: 18px

.reviews-slider__bottom
  display: flex
  align-items: center
  justify-content: center
  @media (max-width: $tab)
    max-width: 90%
    margin: 0 auto

  @media (max-width: $mob)
    justify-content: flex-start

.reviews-slider__bottom .btn
  @media (max-width: $tab)
    margin-right: 8px

.reviews-slider__btns
  @media (max-width: $tab)
    display: flex
    margin-left: -4px

.reviews-slider__btn
  @media (min-width: $tab + 1)
    position: absolute
    top: 50%
    transform: translateY(-50%)

    border: 0
  @media (max-width: $tab)
    margin-left: 4px

.reviews-slider__btn--prev /deep/ svg
  transform: scale(-1, 1)

.reviews-slider__btn--prev
  @media (min-width: $tab + 1)
    left: $unit

.reviews-slider__btn--next
  @media (min-width: $tab + 1)
    right: $unit
</style>
