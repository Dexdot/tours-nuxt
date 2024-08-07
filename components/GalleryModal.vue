<template>
  <Modal
    name="gallery-modal"
    :active="active"
    @close-click="$emit('close-click')"
  >
    <div class="gallery-modal u-center">
      <nuxt-link
        class="gallery-modal__logo u-center"
        :to="$cityLocalePath('index')"
      >
        <img
          :src="
            require(`~/assets/img${
              city === 'belgrade' ? '/belgrade' : ''
            }/logo.svg`)
          "
          alt="Logo"
        />
      </nuxt-link>

      <div class="gallery-modal__container">
        <div class="gallery-modal__hero">
          <ul class="gallery-modal__hero-list">
            <li
              :class="{ active: index === i }"
              v-for="(img, i) in images"
              :key="img.sys.id + i"
            >
              <div class="gallery-modal__hero-img img">
                <BaseImage :img="img" :alt="img.fields.title" class="img__i" />
              </div>
            </li>
          </ul>

          <button
            class="gallery-modal__arrow-btn gallery-modal__arrow-btn--prev u-center"
            @click="prev"
          >
            <svg-icon name="chevron"></svg-icon>
          </button>

          <button
            class="gallery-modal__arrow-btn gallery-modal__arrow-btn--next u-center"
            @click="next"
          >
            <svg-icon name="chevron"></svg-icon>
          </button>
        </div>

        <ul class="gallery-modal__thumbs">
          <li
            :class="{ active: index === i }"
            v-for="(img, i) in images"
            :key="img.sys.id + i"
          >
            <button class="gallery-modal__thumb u-center" @click="setIndex(i)">
              <BaseImage :img="img" :alt="img.fields.title" />
            </button>
          </li>
        </ul>
      </div>

      <div class="gallery-modal__slider-nav">
        <SliderNav @prev-click="prev" @next-click="next" />
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "~/ui/Modal";
import SliderNav from "~/ui/SliderNav";
import city from "~/mixins/city";

export default {
  mixins: [city],
  components: {
    Modal,
    SliderNav
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    index: 0
  }),
  computed: {
    activeImg() {
      return this.images[this.index];
    }
  },
  mounted() {
    window.addEventListener("keyup", this.onKeyup.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.onKeyup);
  },
  methods: {
    onKeyup({ keyCode }) {
      if (!this.active) return false;

      if ([37, 38].includes(keyCode)) this.prev();
      if ([39, 40].includes(keyCode)) this.next();
    },
    prev() {
      this.setIndex(this.index <= 0 ? this.images.length - 1 : this.index - 1);
    },
    next() {
      this.setIndex(this.index === this.images.length - 1 ? 0 : this.index + 1);
    },
    setIndex(i) {
      if (Number.isInteger(i)) {
        this.index = i;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
// Modal
.modal--gallery-modal /deep/
  .modal__content .modal__close
    display: none

  .modal__close
    z-index: 1
    position: absolute
    top: 24px

    border: 0
    margin: 0

    @media (min-width: $tab-sm + 1)
      right: 120px

    @media (min-width: $tab + 1)
      right: calc(#{unit-plus(columns(1))} + 40px)

    @media (max-width: $tab-sm)
      top: 16px
      right: $unit

    &,
    & .i-close
      width: 24px
      height: 24px

  .modal__container
    position: relative

    width: 100%
    height: 100%

    background: #fff
    transition: $trs-4
    opacity: 0

.modal--active /deep/ .modal__container
  opacity: 1


// Gallery
.gallery-modal
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  width: 100%
  height: 100%

.gallery-modal__logo
  position: absolute
  left: $unit
  top: 24px

  @media (max-width: $tab-sm)
    top: 16px

  img
    display: block
    width: 123px
    height: auto


.gallery-modal__container
  @media (min-width: $tab-sm + 1)
    width: column-spans(12)

  @media (max-width: $tab-sm)
    display: block
    width: 100%

.gallery-modal__hero
  position: relative

  @media (min-width: $tab-sm + 1)
    width: column-spans(8)
    margin-left: mix(1)

  @media (max-width: $tab-sm)
    width: 100%

.gallery-modal__hero-img
  width: 100%
  padding-bottom: 56.25%

  @media (max-width: $tab-sm) and (min-height: 710px)
    padding-bottom: 100%

  @media (max-width: $tab-sm) and (max-height: 709px)
    padding-bottom: 66%

.gallery-modal__hero-list > li:not(.active)
  display: none

.gallery-modal__arrow-btn
  position: absolute
  top: 50%
  transform: translateY(-50%)

  width: 40px
  height: 40px

  @media (max-width: $tab-sm)
    display: none

.gallery-modal__arrow-btn .i-chevron
  width: 20px
  height: 20px

.gallery-modal__arrow-btn--prev .i-chevron
  transform: scale(-1, 1)

.gallery-modal__arrow-btn--prev
  right: calc(100% + 48px)
  @media (max-width: $tab)
    right: calc(100% + 24px)

.gallery-modal__arrow-btn--next
  left: calc(100% + 48px)

  @media (max-width: $tab)
    left: calc(100% + 24px)

.gallery-modal__thumbs
  will-change: transform
  display: flex

  @media (min-width: $tab-sm + 1)
    transform: translate(0) !important
    position: absolute
    top: 0
    right: 0

    flex-direction: column
    height: 100vh
    +scrollbar
    width: 104px
    padding: 16px

    background: var(--sec-c)

  @media (min-width: $tab + 1)
    width: unit-plus(columns(1))
    padding: 24px

  @media (max-width: $tab)
    max-width: 100%
    overflow-x: auto

.gallery-modal__thumbs > li
  transition: $trs

.gallery-modal__thumbs > li:not(.active)
  opacity: 0.6

.gallery-modal__thumbs > li:not(:last-child)
  @media (min-width: $tab-sm + 1)
    margin-bottom: 16px

.gallery-modal__thumb
  img
    object-fit: cover

  &,
  & img
    @media (min-width: $tab-sm + 1)
      width: 72px
      height: 72px

    @media (min-width: $tab + 1)
      width: calc(#{unit-plus(columns(1))} - 48px)
      height: calc(#{unit-plus(columns(1))} - 48px)

    @media (max-width: $tab-sm)
      width: 80px
      height: 80px

    @media (max-width: $tab-sm) and (max-height: 700px)
      width: 64px
      height: 64px

.gallery-modal__slider-nav
  position: absolute
  bottom: 0
  left: 0
  width: 100%

  @media (min-width: $tab-sm + 1)
    display: none
</style>
