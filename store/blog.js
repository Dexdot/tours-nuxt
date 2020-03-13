import { copyObject } from "~/assets/scripts/helpers";
import { fetchArticles } from "~/api/blog";

export const state = () => ({
  data: {},
  cached: {
    spb: {
      ru: null,
      en: null
    },
    tallin: {
      ru: null,
      en: null
    }
  }
});

export const getters = {
  allArticles({ data }) {
    return Object.values(data);
  },
  data({ data }) {
    return data;
  },
  cached({ cached }) {
    return cached;
  }
};

export const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setCached(state, cached) {
    state.cached = cached;
  }
};

export const actions = {
  async loadArticles({ commit, getters, rootGetters }, paramCity) {
    const currentLocale = rootGetters["lang/locale"];
    const locale = rootGetters["lang/localeCode"];
    const city = paramCity || rootGetters["lang/city"];

    const cached = copyObject(getters.cached);

    let articles;
    if (cached[city][currentLocale]) {
      articles = Object.values(cached[city][currentLocale]);
    } else {
      articles = await fetchArticles({
        "fields.city": city,
        locale
      });
    }

    const articlesMap = {};
    articles.forEach(article => {
      articlesMap[article.fields.slug] = article;
    });

    // Set & save data in cache
    cached[city][currentLocale] = articlesMap;
    commit("setCached", cached);

    // Set data
    commit("setData", articlesMap);

    return articlesMap;
  }
};
