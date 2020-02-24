const onChange = (app, newLocale) => {
  const locale = newLocale || app.i18n.locale;

  if (locale === "fi") app.store.dispatch("city/setCity", "tallin");
  app.store.commit("lang/setLocale", locale);
  app.store.dispatch("general/load");
};

export default function({ app }) {
  onChange(app);

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    onChange(app, newLocale);
  };
}
