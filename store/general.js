import { fetchGeneral } from "~/api/other";

const copyObject = obj => JSON.parse(JSON.stringify(obj));

export const state = () => ({
  data: {},
  cached: {
    spb: null,
    tallin: {
      ru: null,
      fi: null
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
  async load({ commit, getters, rootState }) {
    const currentLocale = rootState.lang.locale;

    const locale = `${currentLocale}-${currentLocale.toUpperCase()}`;
    const { city } = rootState.lang;

    let data;

    // SPB
    if (city === "spb") {
      // Get data from cache or API
      data = getters.cached.spb || (await fetchGeneral({ locale, city }));

      // Save data in cache
      const cached = copyObject(getters.cached);
      cached.spb = data;
      commit("setCached", cached);
    }

    // TALLIN
    if (city === "tallin") {
      // Get data from cache or API
      data =
        getters.cached.tallin[currentLocale] ||
        (await fetchGeneral({ locale, city }));

      // Save data in cache
      const cached = copyObject(getters.cached);
      cached.tallin[currentLocale] = data;
      commit("setCached", cached);
    }

    commit("setData", data);
    return data;
  }
};
