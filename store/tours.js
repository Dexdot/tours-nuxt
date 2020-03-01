import { fetchTours, fetchTour } from "~/api/tours";

export const state = () => ({
  tours: {}
});

export const getters = {
  tours({ tours }) {
    return tours;
  },
  allTours({ tours }) {
    return Object.values(tours);
  }
};

export const mutations = {
  setTours(state, tours) {
    state.tours = { ...tours };
  },
  setTour({ tours }, { tour, locale }) {
    const tourInStore = tours[tour.fields.slug];

    if (tourInStore) {
      tours[tour.fields.slug][locale] = tour;
    } else {
      tours[tour.fields.slug] = {};
      tours[tour.fields.slug][locale] = tour;
    }
  }
};

export const actions = {
  async loadAllTours({ commit, rootGetters }) {
    const tours = await fetchTours({ locale: rootGetters["lang/localeCode"] });

    const toursMap = {};
    tours.forEach(tour => {
      const locale = rootGetters["lang/locale"];
      toursMap[tour.fields.slug] = {};
      toursMap[tour.fields.slug][locale] = tour;
    });

    commit("setTours", toursMap);
    return toursMap;
  },
  async loadTour({ commit, rootGetters }, slug) {
    const tour = await fetchTour({
      slug,
      locale: rootGetters["lang/localeCode"]
    });

    commit("setTour", { tour, locale: rootGetters["lang/locale"] });
    return tour;
  }
};
