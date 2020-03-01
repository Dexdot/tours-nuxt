import { fetchReviews } from "~/api/reviews";

export const state = () => ({
  reviews: []
});

export const getters = {
  reviews({ reviews }) {
    return reviews;
  }
};

export const mutations = {
  setReviews(state, reviews) {
    state.reviews = [...reviews];
  }
};

export const actions = {
  async loadAllReviews({ commit, rootGetters }) {
    const reviews = await fetchReviews();
    commit("setReviews", reviews);
    return reviews;
  }
};
