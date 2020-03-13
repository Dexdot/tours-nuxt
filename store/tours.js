import { copyObject } from "~/assets/scripts/helpers";
import { fetchTours } from "~/api/tours";

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
  }
};
