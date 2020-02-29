export const actions = {
  nuxtServerInit({ dispatch }, { route, redirect }) {
    if (route.fullPath.startsWith("/ru"))
      return redirect(route.fullPath.replace("/ru", ""));

    const city = route.params.city || "spb";
    return Promise.resolve(dispatch("general/load", city));
  }
};
