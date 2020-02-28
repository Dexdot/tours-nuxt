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
  setCityOnly({ commit }, city) {
    commit("setCity", city);
  },
  setCity({ commit }, { city, i18n }) {
    if (city === "spb" && i18n) {
      i18n.setLocale("ru");
    }

    commit("setCity", city);
  }
};
