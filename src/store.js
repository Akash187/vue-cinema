import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchTerm: 'Hello'
  },
  mutations: {
    updateSearchTerm: (state, term) => {
      state.searchTerm = term;
    }
  },
  actions: {
    updateSearchTerm: (context, term) => {
      context.commit('updateSearchTerm', term);
    }
  }
})