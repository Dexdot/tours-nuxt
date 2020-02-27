import { fetchTours } from "~/api/tours";

export const state = () => ({
  tours: []
});

export const getters = {
  allTours({ tours }) {
    return tours;
  },
  toursInSpb({ tours }) {
    return tours.filter(({ fields }) => fields.city === "spb");
  },
  toursInTallin({ tours }) {
    return tours.filter(({ fields }) => fields.city === "tallin");
  }
};

export const mutations = {
  setTours(state, tours) {
    state.tours = [...tours];
  }
};

export const actions = {
  async loadAllTours({ commit, rootGetters }) {
    const tours = await fetchTours({ locale: rootGetters["lang/localeCode"] });
    commit("setTours", tours);
    return tours;
  }
};
