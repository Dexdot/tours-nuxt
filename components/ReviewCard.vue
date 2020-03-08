<template>
  <div class="review-li">
    <div class="review-li__head">
      <div
        class="review-li__avatar u-center img"
        v-if="review.fields.clientPhoto"
      >
        <BaseImage
          class="img__i"
          :img="review.fields.clientPhoto"
          :alt="review.fields.clientPhoto.fields.title"
        />
      </div>

      <div class="review-li__avatar review-li__avatar--icon u-center" v-else>
        <img
          :src="review.fields.aggregatorIcon.fields.file.url"
          :alt="review.fields.aggregatorIcon.fields.title"
        />
      </div>

      <div class="review-li__user">
        <b class="review-li__name" v-if="review.fields.clientName">{{
          review.fields.clientName
        }}</b>
        <div class="review-li__user-row">
          <ul class="review-li__stars">
            <li
              class="review-li__star"
              v-for="i in review.fields.numberOfStars"
              :key="i"
            >
              <svg-icon name="star"></svg-icon>
            </li>
          </ul>
          <p class="review-li__date">{{ review.fields.date }}</p>
        </div>
      </div>
    </div>

    <div class="review-li__body">
      <div
        class="review-li__text"
        v-for="(item, i) in review.fields.reviewText.content"
        :key="i + item.nodeType"
      >
        <p v-if="isText(item)" v-html="render(item)"></p>
      </div>

      <a
        class="review-li__link"
        target="_blank"
        v-if="review.fields.aggregatorLink"
        :href="review.fields.aggregatorLink"
        >{{ $t('reviews.goTo') }}</a
      >
    </div>
  </div>
</template>

<script>
import render from '~/mixins/render'

export default {
  mixins: [render],
  props: {
    review: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.review-li
  display: block

.review-li__head
  display: flex
  align-items: center
  margin-bottom: 16px

.review-li__body
  +mont(r)
  font-size: 16px
  letter-spacing: -0.02em

  p
    margin-bottom: 8px
    @media (max-width: $tab)
      margin-bottom: 16px

.review-li__avatar
  margin-right: 16px
  min-width: 64px
  width: 64px
  height: 64px

  border-radius: 50%
  background: $beige-d

  &:not(.review-li__avatar--icon) img
    border-radius: 50%
  
.review-li__avatar--icon img
  width: 26px
  height: 26px
  object-fit: contain

.review-li__name
  font-size: 18px
  +mont(sb)

  display: block
  margin-bottom: 4px

.review-li__user-row
  display: flex
  align-items: center

.review-li__stars
  display: flex
  align-items: center

.review-li__star
  min-width: 18px
  width: 18px
  height: 18px

  .i-star
    color: $acc
    width: 18px
    height: 18px

.review-li__date
  +mont(r)
  font-size: 14px
  letter-spacing: -0.02em

  &::before
    content: ''

    width: 3px
    height: 3px
    margin: 0 8px

    display: inline-block
    vertical-align: middle

    border-radius: 50%
    background: $black
  
.review-li__link
  +mont(sb)
  font-size: 16px
  letter-spacing: -0.02em
  +link($acc)

  transition: opacity $trs
  &:hover
    opacity: 0.4
</style>