<template>
  <section class="gallery-section">
    <div class="container">
      <div class="gallery-section__inner">
        <!-- :class="['accordion', { active }]" -->
        <button
          class="img gallery-section__cell gallery-section__cell--hero"
          @click="$emit('cell-click', 0)"
          v-if="!tourLanding"
        >
          <BaseImage
            class="img__i"
            :img="images[0]"
            :alt="images[0].fields.title"
          />
          <svg-icon name="arrow"></svg-icon>
        </button>

        <div class="gallery-section__list">
          <button
            :class="[
              'img',
              'gallery-section__cell',
              { 'gallery-section__cell--tour-landing': tourLanding }
            ]"
            v-for="(img, i) in imagesList.slice(0, 6)"
            @click="$emit('cell-click', i + 1)"
            :key="img.sys.id + i"
          >
            <BaseImage class="img__i" :img="img" :alt="img.fields.title" />
            <svg-icon name="arrow"></svg-icon>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    tourLanding: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    imagesList() {
      return this.tourLanding
        ? this.images
        : this.images.filter((img, i) => i !== 0);
    }
  }
};
</script>

<style lang="sass" scoped>
.gallery-section .container
  @media (max-width: $tab)
    padding: 0

.gallery-section__inner
  display: flex
  flex-wrap: wrap

.gallery-section__list
  display: flex

  @media (min-width: $tab + 1)
    flex: 1
    flex-wrap: wrap

  @media (max-width: $tab)
    width: 100%

.gallery-section__cell:not(.gallery-section__cell--hero):not(.gallery-section__cell--tour-landing)
  padding-bottom: 50%
  width: 50%

  @media (max-width: $tab)
    width: 25%
    padding-bottom: 25%

  &:nth-child(n+5)
    @media (max-width: $tab)
      display: none

.gallery-section__cell--tour-landing
  padding-bottom: 25%
  width: 25%

.gallery-section__cell--hero
  @media (min-width: $tab + 1)
    min-width: column-spans(9)
    width: column-spans(9)

  @media (max-width: $tab)
    width: 100%
    padding-bottom: 64%

.gallery-section__cell::before
  content: ''
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%

  background: rgba($black, 0.6)

.gallery-section__cell .i-arrow
  position: absolute
  top: 50%
  left: 50%
  transform: translate(calc(-50% - 16px), -50%)
  color: #fff

  @media (max-width: $tab)
    width: 24px
    height: 8px


.gallery-section__cell::before,
.gallery-section__cell .i-arrow
  z-index: 1
  opacity: 0
  transition: $trs

.gallery-section__cell:hover
  &::before,
  .i-arrow
    opacity: 1

  .i-arrow
    transform: translate(-50%, -50%)
</style>
