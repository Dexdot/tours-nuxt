export default function({ app, isHMR, store, params, error, route, redirect }) {
  if (isHMR) {
    return;
  }

  const defaultCity = "spb";
  const city = params.city || defaultCity;
  app.store.dispatch("lang/setCity", city);

  if (city === "spb" && app.i18n.locale !== "ru") {
    app.i18n.setLocale("ru");
  }

  if (!params.city) {
    app.store.dispatch("i18n/setRouteParams", {
      ru: { city },
      en: { city }
    });

    const path = `/${defaultCity}${app.localePath(route.fullPath)}`;
    return redirect(path);
  }
}
