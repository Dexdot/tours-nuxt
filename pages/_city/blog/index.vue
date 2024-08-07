<template>
  <div>
    <section class="blog-section">
      <div class="container">
        <div class="blog-container">
          <div class="blog-head t-tac">
            <h1 class="blog-title">{{ $t("blog.title") }}</h1>
            <ul class="blog-categories u-fxw u-center">
              <li
                v-if="$route.params.filter && $route.params.filter.length > 0"
              >
                <nuxt-link class="btn-outline" :to="$cityLocalePath('/blog')">{{
                  $t("blog.categoryAll")
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
            <li v-for="article in pagenArticles" :key="article.fields.slug">
              <ArticleCard :article="article"></ArticleCard>
            </li>
          </ul>

          <div class="blog-pagen u-center" v-show="pagenList.length > 1">
            <Pagen
              :list="pagenList"
              :index="pagen.index"
              @click="onPagenClick"
              outlined
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleCard from "~/components/ArticleCard";

import page from "~/mixins/page";
import pagen from "~/mixins/pagen";

export default {
  mixins: [page, pagen],
  head() {
    const { seo, contactsImage } = this.general;
    const { title, description } = seo.blog;

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
  components: {
    ArticleCard
  },
  async fetch({ store }) {
    await store.dispatch("blog/loadArticles");
  },
  computed: {
    ...mapGetters({
      allArticles: "blog/allArticles",
      general: "general/data",
      locale: "lang/locale"
    }),
    categories() {
      const filter = this.$route.params.filter || "";

      return this.allArticles.reduce((currentTags, { fields }) => {
        const currentSlugs = currentTags.map(({ fields }) => fields.slug);
        const articleCategories = fields.categories || [];

        return [
          ...currentTags,
          ...articleCategories.filter(
            ({ fields }) => !currentSlugs.includes(fields.slug)
          )
        ];
      }, []);
    },
    sortedArticles() {
      const articles = [...this.allArticles];

      // Sort
      articles.sort((a, b) => {
        const aTime = new Date(a.fields.date).getTime();
        const bTime = new Date(b.fields.date).getTime();
        return bTime - aTime;
      });

      // Filter
      const { filter } = this.$route.params;

      return articles.filter(article => {
        const articleCategories = article.fields.categories.map(
          ({ fields }) => fields.slug
        );

        return filter ? articleCategories.includes(filter) : true;
      });
    },
    pagenArticles() {
      return this.sortedArticles.slice(
        this.pagenSkip,
        this.pagenSkip + this.pagen.limit
      );
    },
    pagenList() {
      let pagenLen = this.sortedArticles.length / Math.floor(this.pagen.limit);

      if (!Number.isInteger(pagenLen)) {
        pagenLen = Math.floor(pagenLen) + 1;
      }

      const arr = [];
      for (let i = 0; i < pagenLen; i++) {
        arr.push({ text: i + 1 });
      }

      return arr;
    }
  }
};
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
  background: var(--sec-c)


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
