export const actions = {
  nuxtServerInit({ dispatch }) {
    return Promise.resolve(dispatch("general/load"));
  }
};
