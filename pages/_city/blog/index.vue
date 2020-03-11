<template>
  <div>
    <section class="blog-section">
      <div class="container">
        <div class="blog-container">
          <div class="blog-head t-tac">
            <h1 class="blog-title">{{ $t('blog.title') }}</h1>
            <ul class="blog-categories u-fxw u-center">
              <li
                v-if="$route.params.filter && $route.params.filter.length > 0"
              >
                <nuxt-link class="btn-outline" :to="$cityLocalePath('/blog')">{{
                  $t('blog.categoryAll')
                }}</nuxt-link>
              </li>

              <li
                :class="{
                  active: $route.params.filter
                    ? $route.params.filter === category.fields.slug
                    : true
                }"
                v-for="category in categories"
                :key="category.fields.slug"
              >
                <nuxt-link
                  class="btn-outline"
                  :to="$cityLocalePath(`/blog/filter/${category.fields.slug}`)"
                  >{{ category.fields.text }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <ul class="blog-list">
            <li v-for="article in sortedArticles" :key="article.fields.slug">
              <ArticleCard :article="article"></ArticleCard>
            </li>
          </ul>

          <div class="blog-pagen u-center">
            <Pagen :list="[]"></Pagen>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import page from '~/mixins/page'
import Pagen from '~/ui/Pagen'
import ArticleCard from '~/components/ArticleCard'

export default {
  mixins: [page],
  head() {
    const title = 'Блог'

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
          content: title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/favicon/projectName.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: title
        }
      ]
    }
  },
  components: {
    ArticleCard,
    Pagen
  },
  async asyncData({ store }) {
    if (store.getters['blog/allArticles'].length <= 1)
      await store.dispatch('blog/loadAllArticles')
  },
  computed: {
    ...mapGetters({
      allArticles: 'blog/allArticles',
      general: 'general/data',
      locale: 'lang/locale'
    }),
    categories() {
      const filter = this.$route.params.filter || ''

      return this.cityLocaleArticles.reduce((currentTags, { fields }) => {
        const currentSlugs = currentTags.map(({ fields }) => fields.slug)
        const articleCategories = fields.categories || []

        return [
          ...currentTags,
          ...articleCategories.filter(
            ({ fields }) => !currentSlugs.includes(fields.slug)
          )
        ]
      }, [])
    },
    sortedArticles() {
      const articles = [...this.cityLocaleArticles]

      // Sort
      articles.sort((a, b) => {
        const aTime = new Date(a.fields.date).getTime()
        const bTime = new Date(b.fields.date).getTime()
        return bTime - aTime
      })

      // Filter
      const { filter } = this.$route.params

      return articles.filter(article => {
        const articleCategories = article.fields.categories.map(
          ({ fields }) => fields.slug
        )

        return filter ? articleCategories.includes(filter) : true
      })
    },
    cityLocaleArticles() {
      const { locale, $route } = this

      const filteredArticles = this.allArticles.filter(article => {
        const localeArticle = article[locale]
        if (!localeArticle) {
          return false
        }

        return !!localeArticle
          ? localeArticle.fields.city === $route.params.city
          : false
      })

      return filteredArticles.map(article => article[locale])
    }
  }
}
</script>


<style lang="sass" scoped>
.blog-section
  position: relative

  overflow: hidden
  padding-top: calc(var(--header-h) + 14vh)
  padding-bottom: 18.5vh

  @media (max-width: $tab)
    padding-top: calc(var(--header-h) + 48px)
    padding-bottom: 96px

.blog-section::before
  content: ''
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background: $beige-d


.blog-container
  position: relative
  z-index: 1
  
  margin: 0 auto
  width: column-spans(8)

  @media (max-width: 1400px)
    width: column-spans(10)

  @media (max-width: $tab)
    width: 100%

.blog-head
  margin-bottom: 112px
  @media (max-width: $tab-sm)
    margin-bottom: 64px

.blog-title
  +mont(b)
  line-height: 1.2
  +yo('font-size', (375px: 30px, 1920px: 40px, 2550px: 56px))
  margin-bottom: 1em
  @media (max-width: $tab)
    margin-bottom: 24px

.blog-categories
  margin-top: -8px
  margin-left: -8px

.blog-categories > li
  margin-top: 8px
  margin-left: 8px

  opacity: 0.2
  transition: $trs

  &:hover,
  &.active
    opacity: 1
</style>
