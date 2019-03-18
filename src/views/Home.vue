<template>
  <div class="main" id="home">
    <h1>Trending Movies</h1>
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

  #home h1{
    margin-top: $s-size;
  }
</style>
