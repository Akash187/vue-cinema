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
    errorMsg: '',
    alertMsg: '',
    showAlert: false,
    trendingMoviesUrl: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.VUE_APP_API_KEY}`,
    topRatedMoviesUrl: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}`,
    nowPlayingMoviesUrl: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.VUE_APP_API_KEY}`,
    upcomingMoviesUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}`,
    favouriteMovies: [],
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
    errorMsg(state){
      return state.errorMsg;
    },
    alertMsg(state){
      return state.alertMsg;
    },
    showAlert(state){
      return state.showAlert;
    },
    favouriteMovies(state){
      return state.favouriteMovies;
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
    updateErrorMsg: (state, data) => {
      state.errorMsg = data;
    },
    updateAlertMsg: (state, data) => {
      state.alertMsg = data;
      state.showAlert = true;
      setTimeout(() => {
        state.showAlert = false;
      },2000);
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
    initFavourites: (state, data) => {
      state.favouriteMovies = data;
    },
    updateFavourites: (state, data) => {
      state.favouriteMovies = data;
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
        context.commit('updateErrorMsg', 'Problem Fetching Movies');
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
          context.commit('updateErrorMsg', 'Problem Fetching Movies');
          reject('Problem Fetching Movies');
        });
      })
    },
    initFavourites: (context) => {
      let favourites = JSON.parse(localStorage.getItem('favourites'));
      let updatedFavourites = [];
      if (favourites) {
        updatedFavourites = favourites;
      }
      context.commit('initFavourites', updatedFavourites);
    },
    addToFavourites: (context, data) => {
      return new Promise((resolve, reject) => {
        try {
          let favourites = JSON.parse(localStorage.getItem('favourites'));
          let updatedFavourites = [];
          if (favourites) {
            favourites.push(data);
            updatedFavourites = favourites;
          }else{
            updatedFavourites.push(data);
          }
          localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
          context.commit('updateFavourites', updatedFavourites);
          context.commit('updateAlertMsg', "Added to Favourites");
          resolve(context.getters.favouriteMovies);
        }catch (err){
          reject(err);
        }
      })
    },
    deleteFavourite: (context, id) => {
      return new Promise((resolve, reject) => {
        try {
          let favourites = JSON.parse(localStorage.getItem('favourites'));
          let updatedFavourites = favourites.filter(favourite => favourite.id !== id);
          localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
          context.commit('updateFavourites', updatedFavourites);
          context.commit('updateAlertMsg', "Removed from Favourites");
          resolve(context.getters.favouriteMovies);
        }catch (err){
          reject(err);
        }
      })
    }
  }

});