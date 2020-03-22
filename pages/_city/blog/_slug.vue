<template>
  <div>
    <article class="article-page">
      <div class="article-head">
        <h1 class="article-title" v-if="articleData.title">
          {{ articleData.title }}
        </h1>
        <ul class="article-categories">
          <template
            v-if="articleData.categories && articleData.categories.length > 0"
          >
            <li>
              <nuxt-link class="btn-outline" :to="$cityLocalePath('/blog')">{{
                $t('blog.categoryAll')
              }}</nuxt-link>
            </li>

            <li
              v-for="category in articleData.categories"
              :key="category.fields.slug"
            >
              <nuxt-link
                class="btn-outline"
                :to="$cityLocalePath(`/blog/filter/${category.fields.slug}`)"
                >{{ category.fields.text }}</nuxt-link
              >
            </li>
          </template>
        </ul>
      </div>

      <div class="article-hero" v-if="articleData.cover">
        <BaseImage
          :img="articleData.cover"
          :alt="articleData.cover.fields.title"
        />
        <small class="article-img-author">{{
          articleData.cover.fields.description
        }}</small>
      </div>

      <div class="article-container">
        <aside class="article-aside">
          <div class="article-author">
            <b v-if="articleData.author">{{ articleData.author }}</b>
            <p v-if="articleData.authorSubtitle">
              {{ articleData.authorSubtitle }}
            </p>
          </div>
          <p class="article-date t-ttu" v-if="articleData.dateText">
            {{ articleData.dateText }}
          </p>

          <div class="article-social">
            <SocialList :socialLinks="socialLinks">
              <li class="social-li--mail">
                <a
                  class="u-center"
                  target="_blank"
                  :href="`mailto:${general.email}`"
                >
                  <svg-icon name="envelope" />
                </a>
              </li>
            </SocialList>
          </div>
        </aside>

        <section class="article-content">
          <div
            v-for="(item, i) in articleData.content.content"
            :key="i + item.nodeType"
          >
            <h5 v-if="isH2(item)" v-html="render(item)"></h5>

            <p
              :class="{ 'article-cap': i === 0 }"
              v-if="isText(item)"
              v-html="render(item)"
            ></p>

            <ol v-if="isOL(item)" v-html="render(item)"></ol>
            <ul v-if="isUL(item)" v-html="render(item)"></ul>

            <div class="article-img" v-if="isImage(item) || isVideo(item)">
              <BaseImage
                v-if="isImage(item)"
                :img="item.data.target"
                :alt="item.data.target.fields.title"
              />

              <video
                v-if="isVideo(item)"
                :src="item.data.target.fields.file.url"
                autoplay
                playsinline
                loop
                muted
              />

              <small class="article-img-author">
                {{ item.data.target.fields.description }}
              </small>
            </div>
          </div>

          <div class="article-recap" v-if="articleData.caption">
            <p>{{ articleData.caption }}</p>
            <svg-icon name="umbrella"></svg-icon>
          </div>
        </section>
      </div>
    </article>

    <section
      class="article-more"
      v-if="otherArticles && otherArticles.length > 0"
    >
      <div class="container">
        <h2 class="article-more__title t-h3">{{ $t('blog.otherTitle') }}</h2>
        <div class="article-more__container">
          <ul class="blog-list">
            <li v-for="article in otherArticles" :key="article.sys.id">
              <ArticleCard disableParallax :article="article" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ArticleCard from '~/components/ArticleCard'
import SocialList from '~/components/SocialList'
import render from '~/mixins/render'
import page from '~/mixins/page'
import { getRandomEntries } from '~/assets/scripts/helpers'

export default {
  components: {
    ArticleCard,
    SocialList
  },
  mixins: [page, render],
  head() {
    const { seoTitle, seoDescription, previewImage } = this.articleData
    const title = seoTitle || this.articleData.title
    const description = seoDescription || ''

    return {
      title,
      titleTemplate: null,
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
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: previewImage.fields.file.url
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    }
  },
  async asyncData({ store, params, error }) {
    // Current city
    const { city } = params

    // Article ID
    const { slug } = params

    const articlesMap = await store.dispatch('blog/loadArticles')
    const article = articlesMap[slug]

    // 404
    if (!article || (article && article.fields.city !== city)) {
      error({ statusCode: 404 })
    }

    return { article }
  },
  data: () => ({
    socialLinks: []
  }),
  computed: {
    ...mapGetters({
      allArticles: 'blog/allArticles',
      general: 'general/data',
      locale: 'lang/locale'
    }),
    articleData() {
      return this.article.fields
    },
    otherArticles() {
      const filtered = this.allArticles.filter(
        ({ fields }) => fields.slug !== this.articleData.slug
      )

      return filtered.length > 0 ? getRandomEntries(filtered, 8) : []
    }
  },
  mounted() {
    this.socialLinks = [
      `https://vk.com/share.php?url=${encodeURIComponent(
        window.location.href
      )}&title=${encodeURIComponent(document.title)}`,
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`
    ]
  }
}
</script>

<style lang="sass" scoped>
.article-page
  padding-top: calc(var(--header-h) + 13.3vh)
  padding-bottom: 14.8vh

  margin: 0 auto
  display: block

  @media (min-width: $tab + 1)
    max-width: column-spans(10)

  @media (max-width: 1440px)
    padding-top: calc(var(--header-h) + 144px)
    padding-bottom: 160px

  @media (max-width: $tab)
    padding-top: calc(var(--header-h) + 48px)
    padding: calc(var(--header-h) + 48px) $unit 80px

.article-head
  display: flex
  margin-bottom: 120px

  @media (min-width: $tab + 1)
    align-items: flex-end
    justify-content: space-between

  @media (max-width: $tab)
    flex-direction: column
    align-items: flex-start
    margin-bottom: 24px

.article-categories
  display: flex
  align-items: center
  flex-wrap: wrap

  margin-top: -8px
  margin-left: -8px

  @media (min-width: $tab + 1)
    justify-content: flex-end
    flex: 1
    width: 24em

.article-categories > li
  margin-top: 8px
  margin-left: 8px

.article-title
  +mont(b)
  line-height: 1.1
  letter-spacing: -0.04em
  +yo('font-size', (375px: 30px, 1920px: 40px, 2550px: 56px))

  @media (min-width: $tab + 1)
    max-width: mix(7)

  @media (max-width: $tab)
    margin-bottom: 24px

.article-hero,
.article-img
  img
    display: block
    width: 100%
    height: auto
    margin-bottom: 8px
  
.article-img
  margin-top: 40px
  margin-bottom: 16px

.article-hero
  margin-bottom: 48px

  @media (max-width: $tab)
    margin-bottom: 40px

.article-hero img
  @media (max-width: $tab)
    height: 59vh
    object-fit: cover

.article-img-author
  font-size: 12px
  letter-spacing: -0.02em
  opacity: 0.3

.article-aside
  @media (max-width: $tab)
    display: flex
    align-items: flex-start
    flex-wrap: wrap
    margin-bottom: 48px

  @media (min-width: $tab + 1)
    max-width: mix(2)
    float: left

.article-author
  line-height: 1
  letter-spacing: -0.02em

  @media (max-width: $tab)
    max-width: 50%

.article-author b
  display: block
  margin-bottom: 4px

.article-date
  +mont(b)
  opacity: 0.3

  @media (max-width: $tab)
    margin-left: auto

  @media (min-width: $tab + 1)
    display: block
    margin: 40px 0

.article-social /deep/
  max-width: 100%
  @media (max-width: $tab)
    width: 100%
    margin-top: 24px

  .social
    @media (min-width: $tab + 1)
      flex-direction: column
      align-items: flex-start

  .social-li--tripadvisor,
  .social-li--telegram,
  .social-li--inst
    display: none
  
  .social a
    width: 40px
    height: 40px

.article-content
  margin: 0 auto
  display: block

  @media (min-width: $tab + 1)
    max-width: column-spans(5)

.article-content
  +mont(m)
  font-size: 16px
  line-height: 1.6
  letter-spacing: -0.02em

.article-cap
  margin-bottom: 64px

.article-cap::first-letter
  font-size: 88px
  line-height: 0.7
  letter-spacing: -0.04em
  text-transform: uppercase

  float: left
  padding-top: 0.1em
  padding-right: 0.16em

.article-content /deep/
  a
    +link($acc)

  p
    margin-bottom: 24px

  h1, h2, h3, h4, h5, h6
    margin-top: 48px
    margin-bottom: 16px

    +mont(b)
    line-height: 1.1
    letter-spacing: -0.04em

  ol, ul
    margin-bottom: 24px

  ol
    counter-reset: counter
    margin-bottom: 24px
    padding-left: 40px

  ol li
    position: relative

    &:not(:last-child)
      margin-bottom: 16px

  ol li::before
    content: counter(counter)'.'
    counter-increment: counter
    display: inline-block

    position: absolute
    top: 0
    left: -40px

    +mont(b)
    font-size: 16px
    letter-spacing: -0.02em

  ol p
    display: inline

  ul li
    position: relative
    padding-left: 30px
    &:not(:last-child)
      margin-bottom: 16px

  ul li::before
    content: ''
    position: absolute
    top: 0.5em
    left: 0

    width: 6px
    height: 6px
    background: $black
    border-radius: 50%

.article-recap
  margin-top: 40px
  padding-top: 32px
  border-top: 1px solid #C4C4C4

  .i-umbrella
    display: block
    width: 32px
    height: 32px


.article-more
  background: $beige-d
  padding-top: 120px
  padding-bottom: 160px

  @media (max-width: $tab)
    padding-top: 64px
    padding-bottom: 80px

.article-more__title
  text-align: center
  margin-bottom: 80px

  @media (max-width: $tab)
    margin-bottom: 40px

.article-more__container
  display: block
  margin: 0 auto
  width: column-spans(8)

  @media (max-width: 1400px)
    width: column-spans(10)

  @media (max-width: $tab)
    width: 100%

.article-more__container .blog-list
  margin-bottom: 0
</style>


