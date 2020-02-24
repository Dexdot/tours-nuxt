export const state = () => ({
  locale: "ru"
});

export const mutations = {
  setLocale: (state, locale) => (state.locale = locale)
};

export const getters = {
  locale({ locale }) {
    return locale;
  }
};
