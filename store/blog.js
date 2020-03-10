import { fetchArticles, fetchArticle } from "~/api/blog";

export const state = () => ({
  articles: {}
});

export const getters = {
  articles({ articles }) {
    return articles;
  },
  allArticles({ articles }) {
    return Object.values(articles);
  }
};

export const mutations = {
  setArticles(state, articles) {
    state.articles = { ...articles };
  },
  setArticle({ articles }, { article, locale }) {
    const articleInStore = articles[article.fields.slug];

    if (articleInStore) {
      articles[article.fields.slug][locale] = article;
    } else {
      articles[article.fields.slug] = {};
      articles[article.fields.slug][locale] = article;
    }
  }
};

export const actions = {
  async loadAllArticles({ commit, rootGetters }) {
    const articles = await fetchArticles({
      locale: rootGetters["lang/localeCode"]
    });

    const articlesMap = {};

    articles.forEach(article => {
      const locale = rootGetters["lang/locale"];
      articlesMap[article.fields.slug] = {};
      articlesMap[article.fields.slug][locale] = article;
    });

    commit("setArticles", articlesMap);
    return articlesMap;
  },
  async loadArticle({ commit, rootGetters }, slug) {
    const article = await fetchArticle({
      slug,
      locale: rootGetters["lang/localeCode"]
    });

    commit("setArticle", { article, locale: rootGetters["lang/locale"] });
    return article;
  }
};
