export const state = () => ({
  locales: ["ru", "fi"],
  locale: "ru",
  cities: ["spb", "tallin"],
  city: "spb"
});

export const getters = {
  locale({ locale }) {
    return locale;
  },
  city({ city }) {
    return city;
  }
};

export const mutations = {
  setLang(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  },
  setCity(state, city) {
    if (state.cities.includes(city)) {
      state.city = city;
    }
  }
};

export const actions = {
  setLang({ commit }, locale) {
    commit("setLang", locale);
    this.app.i18n.locale = locale;
  },
  setCity({ commit }, city) {
    commit("setCity", city);
  }
};
