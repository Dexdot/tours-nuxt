import { fetchArticles } from '~/api/blog';

export const state = () => ({
  articles: [],
  skip: 0,
  limit: 12
});

export const getters = {
  articles({ articles }) {
    return articles;
  }
};

export const mutations = {
  addArticles(state, payload) {
    state.articles = [...payload];
  },
  incrementSkip(state) {
    state.skip += state.limit;
  }
};

export const actions = {
  async loadArticles({ commit, getters }) {
    const { limit, skip } = getters;
    const articles = await fetchArticles({ limit, skip });
    commit('addArticles', articles);
    commit('incrementSkip');
    return articles;
  },
  addArticles({ commit }, articles) {
    commit('addArticles', articles);
  }
};
