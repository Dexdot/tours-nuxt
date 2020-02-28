export const actions = {
  nuxtServerInit({ dispatch }, { route }) {
    return Promise.resolve(dispatch("general/load", route.params.city));
  }
};
