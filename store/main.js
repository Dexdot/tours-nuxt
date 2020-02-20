// import { fetchMainContent } from '~/api/content';;

export const state = () => ({
  content: []
});

export const getters = {
  isLoaded({ content }) {
    return [content].every(({ length }) => length > 0);
  },
  content({ content }) {
    return content;
  }
};

export const mutations = {
  addContent(state, payload) {
    state.content = [...payload];
  }
};

export const actions = {
  async load({ dispatch }) {
    await dispatch('loadContent');
    await dispatch('loadArticles');
    await dispatch('loadSlider');
  },
  // async loadContent({ commit }) {
  // const content = await fetchMainContent();
  loadContent({ commit }) {
    const content = [];
    commit('addCases', content);
    return content;
  },
  addContent({ commit }, content) {
    commit('addContent', content);
  }
};
