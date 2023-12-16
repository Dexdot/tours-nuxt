import { copyObject } from "~/assets/scripts/helpers";
import { fetchReviews } from "~/api/reviews";

export const state = () => ({
  data: {},
  cached: {
    spb: {
      ru: null,
      en: null
    },
    invinoveritas: {
      ru: null,
      en: null
    }
  }
});

export const getters = {
  allReviews({ data }) {
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
  async loadReviews({ commit, getters, rootGetters }, paramCity) {
    const currentLocale = rootGetters["lang/locale"];
    const locale = rootGetters["lang/localeCode"];
    const city = paramCity || rootGetters["lang/city"];

    const cached = copyObject(getters.cached);

    let reviews;
    if (cached[city][currentLocale]) {
      reviews = Object.values(cached[city][currentLocale]);
    } else {
      reviews = await fetchReviews({
        "fields.city": city,
        "fields.locale": currentLocale
      });
    }

    const reviewsMap = {};
    reviews.forEach(review => {
      reviewsMap[review.sys.id] = review;
    });

    // Set & save data in cache
    cached[city][currentLocale] = reviewsMap;
    commit("setCached", cached);

    // Set data
    commit("setData", reviewsMap);
    return reviewsMap;
  }
};
