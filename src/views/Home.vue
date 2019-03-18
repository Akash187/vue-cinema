<template>
  <div class="main" id="home">
    <div class="title">Trending Movies</div>
    <MoviesCarousel :movies="trendingMovies"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesCarousel from './../components/MoviesCarousel';

export default {
  name: 'home',
  components: {
    MoviesCarousel
  },
  data(){
    return{
    }
  },
  created(){
    this.$store.dispatch('fetchTrendingMovies');
  },
  computed: {
    trendingMovies(){
      return this.$store.state.trendingMovies;
    }
  }
}
</script>

<style lang="scss" scoped>
  #home{
    padding-left: $vs-size;
    padding-right: $vs-size;
    padding-bottom: $xl-size;
  }
</style>
