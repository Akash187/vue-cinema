import Vue from 'vue';
import Vuex from 'vuex';
import filterMovies from './mixins/filterMovies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchTerm: '',
    currentPage: 0,
    totalPage: 0,
    dataLoaded: false,
    error: false,
    alertMsg: '',
    trendingMoviesUrl: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.VUE_APP_API_KEY}`,
    topRatedMoviesUrl: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}`,
    nowPlayingMoviesUrl: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.VUE_APP_API_KEY}`,
    upcomingMoviesUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}`,
    searchedMovies: [],
    trendingMovies: [],
    topRatedMovies: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
  },
  getters: {
    searchTerm(state){
      return state.searchTerm;
    },
    currentPage(state){
      return state.currentPage;
    },
    totalPage(state){
      return state.totalPage;
    },
    searchedMovies(state){
      return state.searchedMovies;
    },
    dataLoaded(state){
      return state.dataLoaded;
    },
    error(state) {
      return state.error;
    },
    alertMsg(state){
      return state.alertMsg;
    },
    trendingMovies(state){
      return state.trendingMovies;
    },
    topRatedMovies(state){
      return state.topRatedMovies;
    },
    nowPlayingMovies(state){
      return state.nowPlayingMovies;
    },
    upcomingMovies(state){
      return state.upcomingMovies;
    }
  },
  mutations: {
    updateDataLoaded: (state, data) => {
      state.dataLoaded = data;
    },
    updateError: (state, data) => {
      state.error = data;
    },
    updateAlertMsg: (state, data) => {
      state.alertMsg = data;
    },
    updateSearchTerm: (state, term) => {
      state.searchTerm = term;
      state.currentPage = 0;
      state.totalPage = 0;
      state.searchedMovies = [];
    },
    fetchTrendingMovies: (state, data) => {
      state.trendingMovies = data;
    },
    fetchTopRatedMovies: (state, data) => {
      state.topRatedMovies = data;
    },
    fetchNowPlayingMovies: (state, data) => {
      state.nowPlayingMovies = data;
    },
    fetchUpcomingMovies: (state, data) => {
      state.upcomingMovies = data;
    },
    fetchSearchedMovies: (state, {current_page, total_pages, movies}) => {
      state.searchedMovies = state.searchedMovies.concat(movies);
      state.currentPage = current_page;
      state.totalPage = total_pages;
    },
  },
  actions: {
    updateDataLoaded: (context, data) => {
      context.commit('updateDataLoaded', data);
    },
    updateError: (context, data) => {
      context.commit('updateError', data);
    },
    updateSearchTerm: (context, term) => {
      context.commit('updateSearchTerm', term);
    },
    fetchMovies: (context, {url, mutation}) => {
      filterMovies(url).then(({movies}) => {
        context.commit(mutation, movies);
      }).catch(() => {
        context.commit('updateAlertMsg', 'Problem Fetching Movies');
      });
    },
    fetchSearchedMovies : (context, payload) => {
      return new Promise((resolve, reject) => {
        let url = '';
        if(!payload){
          url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${context.state.searchTerm}`;
        }else{
          url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${context.state.searchTerm}&page=${context.state.currentPage + 1}`;
        }
        filterMovies(url).then((result) => {
          context.commit('fetchSearchedMovies', result);
          resolve(context.getters.searchedMovies);
        }).catch(() => {
          context.commit('updateAlertMsg', 'Problem Fetching Movies');
          reject('Problem Fetching Movies');
        });
      })
    }
  }
});