export const actions = {
  async nuxtServerInit({ dispatch }, { route, redirect }) {
    // RU
    if (route.fullPath.startsWith("/ru"))
      return redirect(route.fullPath.replace("/ru", ""));

    const { city } = route.params;

    // CITYSWITCH
    const cities = ["spb", "invinoveritas", "belgrade"];
    const validCity = city && cities.includes(city) ? city : "spb";

    await Promise.all([
      dispatch("general/load", validCity),
      dispatch("tours/loadTours", validCity),
      dispatch("reviews/loadReviews", validCity)
    ]);
  }
};
