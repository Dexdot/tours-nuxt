export const state = () => ({
  locales: ["ru", "en"],
  locale: "ru"
});

export const getters = {
  locale({ locale }) {
    return locale;
  },
  localeCode({ locale }) {
    const upperLocale = locale === "en" ? "US" : locale.toUpperCase();

    return `${locale}-${upperLocale}`;
  }
};

export const mutations = {
  setLocale: (state, locale) => (state.locale = locale)
};
