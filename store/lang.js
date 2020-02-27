export const state = () => ({
  locale: "ru"
});

export const mutations = {
  setLocale: (state, locale) => (state.locale = locale)
};

export const getters = {
  locale({ locale }) {
    return locale;
  },
  localeCode({ locale }) {
    const upperLocale = locale === "en" ? "US" : locale.toUpperCase();

    return `${locale}-${upperLocale}`;
  }
};
