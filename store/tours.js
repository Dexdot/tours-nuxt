import { copyObject } from "~/assets/scripts/helpers";
import { fetchTours, fetchTour } from "~/api/tours";

export const state = () => ({
  data: {},
  cached: {
    spb: {
      ru: null,
      en: null
    },
    tallin: {
      ru: null,
      en: null
    }
  }
});

export const getters = {
  popularTours({ data }, { allTours }) {
    return allTours.filter(tour => tour.fields.showInPopularSection);
  },
  allTours({ data }) {
    return Object.values(data);
  },
  data({ data }) {
    return data;
  },
  cached({ cached }) {
    return cached;
  }
};

export const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setCached(state, cached) {
    state.cached = cached;
  },
  setTour(state, { tour, city, locale }) {
    const data = copyObject(state.data);
    const cached = copyObject(state.cached);

    data[tour.fields.slug] = tour;
    state.data = { ...data };

    if (!cached[city][locale]) cached[city][locale] = {};

    cached[city][locale][tour.fields.slug] = tour;
    state.cached = { ...cached };
  }
};

export const actions = {
  async loadTours({ commit, getters, rootGetters }, paramCity) {
    const currentLocale = rootGetters["lang/locale"];
    const locale = rootGetters["lang/localeCode"];
    const city = paramCity || rootGetters["lang/city"];

    const cached = copyObject(getters.cached);

    let tours;
    if (cached[city][currentLocale]) {
      tours = Object.values(cached[city][currentLocale]);
    } else {
      tours = await fetchTours({
        "fields.city": city,
        locale
      });
    }

    const toursMap = {};
    tours.forEach(tour => {
      toursMap[tour.fields.slug] = tour;
    });

    // Set & save data in cache
    cached[city][currentLocale] = toursMap;
    commit("setCached", cached);

    // Set data
    commit("setData", toursMap);
    return toursMap;
  },
  async loadTour({ commit, rootGetters }, slug) {
    const locale = rootGetters["lang/locale"];
    const localeCode = rootGetters["lang/localeCode"];
    const city = rootGetters["lang/city"];

    const tour = await fetchTour({
      "fields.slug": slug,
      "fields.city": city,
      locale: localeCode
    });

    commit("setTour", { tour, city, locale });
    return tour;
  }
};
