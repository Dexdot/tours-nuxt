export const actions = {
  nuxtServerInit({ dispatch }, { route, redirect, error }) {
    // RU
    if (route.fullPath.startsWith("/ru"))
      return redirect(route.fullPath.replace("/ru", ""));

    const { city } = route.params;

    // CITYSWITCH
    const cities = ["spb", "invinoveritas", "belgrade"];
    const isValidCity = city && cities.includes(city);

    return Promise.resolve(
      dispatch("general/load", isValidCity ? city : "spb")
    );
  }
};
