export default function({ app, isHMR, store, params, error, route, redirect }) {
  const defaultCity = store.getters["city/city"];
  const { defaultLocale } = app.i18n;

  if (isHMR) {
    return;
  }

  const city = params.city || defaultCity;

  if (
    !store.state.city.cities.includes(city) &&
    !store.state.lang.locales.includes(params.city)
  ) {
    return error({ message: "This page could not be found.", statusCode: 404 });
  }

  // Set city
  store.dispatch("city/setCity", { city, i18n: app.i18n });

  const path =
    params.city === defaultLocale
      ? route.fullPath.replace(`/${defaultLocale}`, "")
      : route.fullPath;

  if (!path.includes(city)) {
    return redirect(app.$cityLocalePath(path));
  }
}
