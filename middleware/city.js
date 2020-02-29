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

    const isRU = app.i18n.locale === "ru";
    console.log("isRU", isRU);

    const localeRouteName = isRU ? "" : app.i18n.locale;
    console.log("localeRouteName", localeRouteName);

    const cleanPath = route.fullPath.replace(`/${localeRouteName}`, "");
    console.log("cleanPath", cleanPath);

    const separator = cleanPath.startsWith("/") ? "" : "/";

    const newPath = `/spb${separator}${cleanPath}`;
    console.log("newPath", newPath);

    return redirect(newPath);
  }
}
