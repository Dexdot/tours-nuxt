import { copyObject } from "~/assets/scripts/helpers";
import { fetchCertificates } from "~/api/certificate";

export const state = () => ({
  data: {},
  cached: {
    spb: {
      ru: null,
      en: null
    },
    invinoveritas: {
      ru: null,
      en: null
    }
  }
});

export const getters = {
  allPages({ data }) {
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
  async loadPages({ commit, getters, rootGetters }, paramCity) {
    const currentLocale = rootGetters["lang/locale"];
    const locale = rootGetters["lang/localeCode"];
    const city = paramCity || rootGetters["lang/city"];

    const cached = copyObject(getters.cached);

    let pages;
    if (cached[city][currentLocale]) {
      pages = Object.values(cached[city][currentLocale]);
    } else {
      pages = await fetchCertificates({
        "fields.city": city,
        locale
      });
    }

    const pagesMap = {};
    pages.forEach(page => {
      pagesMap[page.fields.slug] = page;
    });

    // Set & save data in cache
    cached[city][currentLocale] = pagesMap;
    commit("setCached", cached);

    // Set data
    commit("setData", pagesMap);

    return pagesMap;
  }
};
