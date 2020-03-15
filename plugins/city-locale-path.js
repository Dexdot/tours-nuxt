export default ({ app }, inject) => {
  inject("cityLocalePath", (path, city) => {
    const cities = ["tallin", "spb"];
    const route = app.router.currentRoute;

    // City
    let routeCity = route.params.city;

    if (!routeCity || !cities.includes(routeCity)) {
      routeCity = cities.find(city => route.fullPath.split("/").includes(city));
    }

    if (!routeCity) {
      routeCity = "spb";
    }

    // Path
    const localePath = app.localePath(path);
    const localeRouteName = app.i18n.locale === "ru" ? "" : app.i18n.locale;
    const noLocalePath = localePath.replace(`/${localeRouteName}`, "");

    const citySeparator = noLocalePath.startsWith("/") ? "" : "/";
    const firstSeparator = localeRouteName.length <= 0 ? "" : "/";

    return `${firstSeparator}${localeRouteName}/${city ||
      routeCity}${citySeparator}${noLocalePath}`;
  });
};
