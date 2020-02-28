const onChange = ({ app, route }, newLocale) => {
  const locale = newLocale || app.i18n.locale;

  app.store.commit("lang/setLocale", locale);
  app.store.dispatch("general/load", route.params.city);
};

export default ({ app, route }) => {
  onChange({ app, route });

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    onChange({ app, route }, newLocale);
  };
};
