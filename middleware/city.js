export default function({ app, isHMR, store, params, error, route, redirect }) {
  if (isHMR) {
    return;
  }

  const defaultCity = "spb";
  const city = params.city || defaultCity;

  if (city === "spb" && app.i18n.locale !== "ru") {
    app.i18n.setLocale("ru");
  }

  if (!params.city) {
    const path = `/${defaultCity}${app.localePath(route.fullPath)}`;
    return redirect(path);
  }
}
