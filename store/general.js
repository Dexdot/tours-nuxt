import { copyObject } from "~/assets/scripts/helpers";
import { fetchGeneral } from "~/api/other";

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
    },
    belgrade: {
      ru: null,
      en: null
    }
  }
});

export const getters = {
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
  async load({ commit, getters, rootGetters }, city) {
    const currentLocale = rootGetters["lang/locale"];
    const locale = rootGetters["lang/localeCode"];

    // Get data from cache or API
    const data =
      getters.cached[city][currentLocale] ||
      (await fetchGeneral({
        locale,
        city
      }));

    // Save data in cache
    const cached = copyObject(getters.cached);
    cached[city][currentLocale] = data;
    commit("setCached", cached);

    commit("setData", data);
    return data;
  }
};
