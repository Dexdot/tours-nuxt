const defaultCity = "spb";

export default ({ app, isHMR, store, params, error, route, redirect }) => {
  // HMR
  if (isHMR) {
    return;
  }

  // RU
  if (route.fullPath.startsWith("/ru"))
    return redirect(route.fullPath.replace("/ru", ""));

  const city = params.city || defaultCity;
  app.store.dispatch("lang/setCity", city);

  // Set locale "ru" if city "spb"
  if (city === "spb" && app.i18n.locale !== "ru") {
    app.i18n.setLocale("ru");
  }

  if (!params.city && route.matched.length > 0) {
    app.store.dispatch("i18n/setRouteParams", {
      ru: { city },
      en: { city }
    });

    const isRU = app.i18n.locale === "ru";
    const cleanPath = route.fullPath.replace(`/${app.i18n.locale}`, "");
    const separator = cleanPath.startsWith("/") ? "" : "/";
    const newPath = `/spb${separator}${cleanPath}`;

    return redirect(newPath);
  }
};
