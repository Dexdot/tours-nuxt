const onChange = (app, locale) => {
  app.store.dispatch("lang/setLocale", locale);
};

export default ({ app, route }) => {
  app.store.commit("lang/setLocale", app.i18n.locale);

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    onChange(app, newLocale);
  };
};
