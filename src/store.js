import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchTerm: 'Hello',
    trendingMovies: [],
    topRatedMovies: [],
    genres: [],
    dataLoaded: false,
    error: false
  },
  mutations: {
    updateDataLoaded: (state, data) => {
      state.dataLoaded = data;
    },
    updateError: (state, data) => {
      state.error = data;
    },
    updateSearchTerm: (state, term) => {
      state.searchTerm = term;
    },
    fetchGenres : (state, data)=> {
      state.genres = data.genres.map((genre) => {
        return genre.name;
      });
    },
    fetchTrendingMovies: (state, data) => {
      state.trendingMovies = data.results.map((movie) =>
        ({
          id: movie.id,
          poster: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
        })
      );
    },
    fetchTopRatedMovies: (state, data) => {
      state.trendingMovies = data.results.map((movie) =>
        ({
          id: movie.id,
          poster: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
        })
      );
    }
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
    fetchData: (context, {url, mutation}) => {
      fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
          context.commit(mutation, data);
        })
        .catch((err) => {
          console.log(`Error Fetching ${mutation} ${err}`);
        })
    },
    fetchGenres : (context) => {
      context.dispatch('fetchData', {url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}`, mutation: 'fetchGenres'});
    },
    fetchTrendingMovies : (context) => {
      context.dispatch('fetchData', {url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.VUE_APP_API_KEY}`, mutation: 'fetchTrendingMovies'});
    },
    fetchTopRatedMovies : (context) => {
      context.dispatch('fetchData', {url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}`, mutation: 'fetchTopRatedMovies'});
    },
  }
})