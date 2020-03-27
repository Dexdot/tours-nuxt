<template>
  <nuxt-link
    class="blog-li"
    :to="$cityLocalePath(`/blog/${article.fields.slug}`)"
  >
    <div class="blog-li__img img">
      <BaseImage
        class="img__i"
        v-if="article.fields.previewImage"
        :img="article.fields.previewImage"
        :alt="article.fields.previewImage.fields.title"
      ></BaseImage>
    </div>

    <div class="blog-li__content">
      <p class="blog-li__date t-ttu">{{ article.fields.dateText }}</p>
      <h3 class="blog-li__title t-h5">{{ article.fields.title }}</h3>
      <p class="blog-li__read">{{ $t('blog.readArticle') }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.blog-li
  width: 100%
  display: block

  position: relative
  +link(#fff)

.blog-li__img
  overflow: hidden
  padding-bottom: 140%

  &::before
    content: ''
    z-index: 1
    position: absolute
    top: 0
    left: 0

    width: 100%
    height: 100%

    background: $black
    opacity: 0.4
    transition: $trs

.blog-li__content
  z-index: 1
  position: absolute
  top: 0
  left: 0

  display: flex
  flex-direction: column
  align-items: flex-start

  width: 100%
  height: 100%

  padding: 4.16vw 4.16vw 5.41vw

  @media (max-width: $tab)
    padding: 48px 40px 64px

.blog-li__date
  &,
  &.t-ttu
    +mont(b)

.blog-li__title
  margin-top: auto
  margin-bottom: 24px

  &,
  &.t-h5
    @media (max-width: $tab)
      font-size: 18px

.blog-li__read
  +mont(sb)
  font-size: 14px
  line-height: 1

  padding-bottom: 4px

  position: relative

  &::before,
  &::after
    content: ''
    position: absolute
    bottom: 0

    width: 100%
    height: 2px

    background: $acc

  &::before
    left: 0
    transform-origin: 0% 50%
    transition: $trs 0.25s

  &::after
    right: 0
    transform-origin: 100% 50%
    transform: scaleX(0)
    transition: $trs
  
.blog-li:hover
  .blog-li__img::before
    opacity: 0.6

  .blog-li__read::before
    transform: scaleX(0)
    transition: $trs

  .blog-li__read::after
    transform: scaleX(1)
    transition: $trs 0.25s
</style>
