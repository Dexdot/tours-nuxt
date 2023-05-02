<template>
  <main class="container">
    <div class="policy">
      <aside class="policy__aside">
        <nav>
          <ul>
            <li v-for="page in slugs" :key="page.slug">
              <nuxt-link
                class="t-ttu"
                :to="$cityLocalePath(`/info/${page.slug}`)"
              >
                <template v-if="page.slug === $route.params.id">
                  <b>{{ page.name }}</b>
                </template>
                <template v-else>
                  {{ page.name }}
                </template>
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </aside>

      <section class="policy__content">
        <div v-for="(item, i) in content" :key="i + item.nodeType">
          <h5 v-if="isH2(item)" v-html="render(item)"></h5>
          <p v-if="isText(item)" v-html="render(item)"></p>
          <ol v-if="isOL(item)" v-html="render(item)"></ol>
          <ul v-if="isUL(item)" v-html="render(item)"></ul>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import render from "~/mixins/render";
import page from "~/mixins/page";

export default {
  mixins: [page, render],
  head() {
    const { contactsImage } = this.general;
    const { seoTitle, seoDescription } = this.pageData;
    const title = seoTitle || this.pageData.name;
    const description = seoDescription || this.pageData.name;

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
  async asyncData({ app, store, params, error }) {
    // Current city
    const { city } = params;

    // Page ID
    const slug = params.id;

    const pagesMap = await store.dispatch("info/loadPages");
    const page = pagesMap[slug];

    // 404
    if (!page || (page && page.fields.city !== city)) {
      error({ statusCode: 404 });
    }

    return { page };
  },
  computed: {
    ...mapGetters({
      general: "general/data",
      allPages: "info/allPages"
    }),
    pageData() {
      return this.page.fields;
    },
    hasContent() {
      return this.content && this.content.length > 0;
    },
    content() {
      return this.pageData.content.content;
    },
    slugs() {
      return this.allPages.map(page => ({
        name: page.fields.name,
        slug: page.fields.slug
      }));
    }
  }
};
</script>

<style lang="sass" scoped>
.policy
  padding: calc(var(--header-h) + 80px) 0 80px

.policy__aside
  line-height: 1

  @media (min-width: $tab + 1)
    z-index: 2
    position: sticky
    top: calc(var(--header-h) + 16px)
    float: left
    max-width: mix(2)

  @media (max-width: $tab)
    margin-bottom: 64px

.policy__aside li:not(:last-child)
  margin-bottom: 8px

.policy__content
  margin: 0 auto

  @media (min-width: $tab + 1)
    max-width: column-spans(6)

.policy__content /deep/
  p
    margin-bottom: 16px

  ol, ul
    margin-bottom: 16px

  ol
    counter-reset: counter
    margin-bottom: 16px
    padding-left: 32px

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
    left: -32px

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
</style>
