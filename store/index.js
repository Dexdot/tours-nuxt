export const actions = {
  nuxtServerInit({ dispatch }, { route }) {
    const city = route.params.city || "spb";
    return Promise.resolve(dispatch("general/load", city));
  }
};
