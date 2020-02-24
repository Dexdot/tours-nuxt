export default function({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale;

  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }

  // Get locale from params
  const locale = params.lang || defaultLocale;
  if (!store.state.lang.locales.includes(locale)) {
    return error({ message: "This page could not be found.", statusCode: 404 });
  }

  // Set locale
  store.dispatch("lang/setLang", locale);

  // If route is /<defaultLocale>/... -> redirect to /...
  if (
    locale === defaultLocale &&
    route.fullPath.indexOf("/" + defaultLocale) === 0
  ) {
    const toReplace =
      "^/" +
      defaultLocale +
      (route.fullPath.indexOf("/" + defaultLocale + "/") === 0 ? "/" : "");

    const re = new RegExp(toReplace);
    const res = route.fullPath.replace(re, "/");

    return redirect(res);
  }
}
