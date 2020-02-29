export default ({ app, route }, inject) => {
  inject("cityLocalePath", path => {
    const localePath = app.localePath(path);
    const localeRouteName = app.i18n.locale === "ru" ? "" : app.i18n.locale;
    const noLocalePath = localePath.replace(`/${localeRouteName}`, "");

    const citySeparator = noLocalePath.startsWith("/") ? "" : "/";
    const firstSeparator = localeRouteName.length <= 0 ? "" : "/";

    return `${firstSeparator}${localeRouteName}/${route.params.city}${citySeparator}${noLocalePath}`;
  });
};
