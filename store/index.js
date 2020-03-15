export const actions = {
  nuxtServerInit({ dispatch }, { route, redirect, error }) {
    // RU
    if (route.fullPath.startsWith("/ru"))
      return redirect(route.fullPath.replace("/ru", ""));

    const { city } = route.params;
    const isValidCity = city && ["spb", "tallinn"].includes(city);

    return Promise.resolve(
      dispatch("general/load", isValidCity ? city : "spb")
    );
  }
};
