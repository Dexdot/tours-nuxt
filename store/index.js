export const actions = {
  nuxtServerInit({ dispatch }, { route, redirect, error }) {
    if (route.fullPath.startsWith("/ru"))
      return redirect(route.fullPath.replace("/ru", ""));

    const { city: routeCity } = route.params;
    const isValidRouteCity = routeCity && ["spb", "tallin"].includes(routeCity);

    return Promise.resolve(
      dispatch("general/load", isValidRouteCity ? routeCity : "spb")
    );
  }
};
