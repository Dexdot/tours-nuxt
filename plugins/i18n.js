const onChange = ({ app, route }, newLocale) => {
  const locale = newLocale || app.i18n.locale;

  // if (locale === "en") app.store.dispatch("city/setCityOnly", "tallin");
  if (locale === "en") app.router.push({ params: { city: "tallin" } });

  app.store.commit("lang/setLocale", locale);
  app.store.dispatch("general/load", route.params.city);
};

export default ({ app, route }) => {
  onChange({ app, route });

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    onChange({ app, route }, newLocale);
  };
};
