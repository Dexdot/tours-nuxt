export const state = () => ({
  cities: ["spb", "tallin"],
  city: "spb"
});

export const getters = {
  city({ city }) {
    return city;
  }
};

export const mutations = {
  setCity(state, city) {
    if (state.cities.includes(city)) {
      state.city = city;
    }
  }
};

export const actions = {
  setCity({ commit }, city) {
    commit("setCity", city);
  }
};
