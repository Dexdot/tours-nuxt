export default ({ store, app, route }, inject) => {
  inject("cityLocalePath", to => {
    return `/${store.getters["city/city"]}${app.localePath(to)}`;
  });
};
