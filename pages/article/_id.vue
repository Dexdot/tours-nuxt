<template>
  <div>
    <main class="article-wrapper">
      <article class="article">
        <div class="article__caption">
          <ul class="article__tags">
            <li v-for="tag in project.categories" :key="tag.fields.text">
              {{ tag.fields.text }}
            </li>
          </ul>

          <h1 class="article__title t-h4">{{ project.title }}</h1>
          <p class="article__subtitle">{{ project.subtitle }}</p>
        </div>

        <div
          class="article__cover"
          v-if="project.cover && project.cover.fields"
        >
          <BaseImage
            class="article__img"
            :img="project.cover"
            :alt="project.cover.fields.title"
          />
        </div>

        <p class="article__date">{{ project.formattedDate }}</p>
        <ul class="article__content">
          <li
            v-for="(item, i) in content"
            :key="i + item.nodeType"
            :class="{
              article__img: isImage(item),
              article__text: isText(item),
              article__ol: isOL(item),
              article__ul: isUL(item),
              article__quote: isQuote(item)
            }"
          >
            <h2 class="t-h5" v-if="isH2(item)" v-html="render(item)"></h2>
            <h3 class="t-h6" v-if="isH3(item)" v-html="render(item)"></h3>
            <p v-if="isText(item)" v-html="render(item)"></p>
            <ol v-if="isOL(item)" v-html="render(item)"></ol>
            <ul v-if="isUL(item)" v-html="render(item)"></ul>
            <blockquote v-if="isQuote(item)" v-html="render(item)"></blockquote>

            <BaseImage
              v-if="isImage(item)"
              class="article__img"
              :img="item.data.target"
              :alt="item.data.target.fields.title"
            />

            <video
              class="article__img"
              v-if="isVideo(item)"
              :src="item.data.target.fields.file.url"
              autoplay
              playsinline
              loop
              muted
            />
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchArticle } from '~/api/blog'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import render from '~/mixins/render'
import page from '~/mixins/page'

export default {
  mixins: [page, render],
  head() {
    const { project } = this

    return {
      title: project.title,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: project.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: project.subtitle
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: project.preview.fields.file.url
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: project.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: project.subtitle
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: project.preview.fields.file.url
        },
        {
          hid: 'description',
          name: 'description',
          content: project.subtitle
        }
      ]
    }
  },
  async asyncData({ store, params, error }) {
    // Articles
    const slug = params.id
    let project = store.getters['blog/articles'].find(v => v.slug === slug)

    if (!project) {
      try {
        project = await fetchArticle(slug)
      } catch (e) {
        error({ statusCode: 404 })
      }
    }

    const articlesInStore = store.getters['blog/articles']
    if (articlesInStore.length <= 0) await store.dispatch('blog/loadArticles')

    return { project }
  },
  computed: {
    ...mapGetters({
      articles: ['blog/articles']
    }),
    content() {
      return this.project ? this.project.content.content : {}
    }
  }
}
</script>

<style lang="sass" scoped>
.article-wrapper
  min-height: 100vh

.article
  position: relative

  font-size: 18px
  line-height: 1.8

  margin-left: auto
  margin-right: auto
  width: column-spans(12)

  @media (max-width: 1440px)
    font-size: 16px

  @media (max-width: 900px)
    font-size: 18px

    width: 100%
    padding-left: var(--unit)
    padding-right: var(--unit)


// Title
.article__title
  +norms(r)
  line-height: 1.06
  margin-bottom: 0.65em

  @media (max-width: 900px)
    line-height: 1.2

  /deep/ b
    display: block
    +norms(b)


// Tags
.article__tags
  margin-bottom: 16px
  display: flex
  li:not(:first-child)
    margin-left: 8px
    padding-left: 8px
    position: relative
    &::before
      content: ''
      position: absolute
      top: 50%
      left: 0
      transform: translate(-50%, -50%)

      width: 2px
      height: 2px

      border-radius: 50%
      background: $black


// Date
.article__date
  +norms(m)
  font-size: 16px

  padding-top: 18px
  float: left
  position: relative

  @media (max-width: 900px)
    float: unset

// Content
.article__caption
  padding-top: 32vh
  max-width: column-spans(8)
  margin-bottom: 7.2%

  @media (max-width: 1200px)
    max-width: unset

  @media (max-width: 700px)
    padding-top: 8vh


.article__subtitle:not(.article__subtitle--mob)
  @media (max-width: 900px)
    display: none

.article__subtitle--mob
  +norms(m)
  line-height: 1.6

  display: none
  @media (max-width: 900px)
    display: block


.article__content > li >
  h2
    line-height: 1.06
    margin-top: 32px
    margin-bottom: 40px

    @media (max-width: 500px)
      margin-top: 64px
      margin-bottom: 40px

  h3
    line-height: 1.06
    margin-top: 32px
    margin-bottom: 24px

    @media (max-width: 500px)
      margin-top: 64px
      margin-bottom: 24px

  h2, h3,
  ul, ol,
  a, p,
  blockquote
    width: column-spans(6)
    margin-left: column-spans(6)

    @media (max-width: 900px)
      margin-left: 0
      width: 100%


.article__content /deep/ a,
.article__content /deep/ b
  +norms(b)

// Links hover
.article__content /deep/ a
  border-bottom: 1px solid rgba(#000, 0.1)


// Paragraph
.article p
  margin-bottom: 24px


// Images
.article__img
  display: block
  max-width: column-spans(10)
  width: auto
  height: auto

  margin-left: auto
  margin-top: 64px
  margin-bottom: 80px

  @media (max-width: 900px)
    max-width: 100%
    margin-top: 40px
    margin-bottom: 48px

  @media (max-width: 500px)
    margin-bottom: 40px

.article__cover .article__img
  max-width: unset
  width: 100%
  margin-left: 0

  @media (max-width: 900px)
    margin-left: calc(-1 * var(--unit))
    width: calc(100% + (var(--unit) * 2))



// OL
.article__ol > ol
  counter-reset: counter
  margin-bottom: 24px
  padding-left: 40px

.article__ol > ol /deep/ li
  position: relative
  margin-bottom: 8px

.article__ol > ol /deep/ li::before
  display: inline-block
  counter-increment: counter
  content: counter(counter)'.'

  position: absolute
  top: 0
  left: -40px

.article__ol > ol /deep/ p
  display: inline

// UL
.article__ul > ul /deep/ p,
.article__ol > ol /deep/ p
  line-height: 1.6

.article__ul > ul
  list-style: disc
  margin: 40px 0
  padding-left: 40px

.article__ul > ul /deep/ li
  padding-left: 18px
  margin-bottom: 16px


// Quote
.article__quote /deep/ p:not(:last-child)
  margin-bottom: 24px

.article__quote blockquote
  margin: 40px 0
  padding: 16px 0 16px 34px

  +norms(b)
  line-height: 1.4

  position: relative
  &::before
    content: ''
    position: absolute
    top: 0
    bottom: 0
    left: 0

    width: 2px
    height: 100%

    background: $black
</style>
