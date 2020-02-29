export const state = () => ({
  locales: ["ru", "en"],
  locale: "ru",
  city: "spb"
});

export const getters = {
  city({ city }) {
    return city;
  },
  locale({ locale }) {
    return locale;
  },
  localeCode({ locale }) {
    const upperLocale = locale === "en" ? "US" : locale.toUpperCase();
    return `${locale}-${upperLocale}`;
  }
};

export const mutations = {
  setCity: (state, city) => (state.city = city),
  setLocale: (state, locale) => (state.locale = locale)
};

export const actions = {
  setCity({ commit, dispatch }, city) {
    dispatch(
      "i18n/setRouteParams",
      {
        ru: { city },
        en: { city }
      },
      { root: true }
    );
    commit("setCity", city);
  },
  setLocale({ commit, dispatch, getters }, locale) {
    commit("setLocale", locale);
    dispatch("general/load", getters.city, { root: true });
  }
};
