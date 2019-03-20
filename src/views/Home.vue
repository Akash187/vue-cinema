<template>
  <div class="main" id="home">
    <div class="title">Trending Movies</div>
    <MoviesCarousel :movies="trendingMovies"/>
    <div class="title">Top Rated Movies</div>
    <MoviesCarousel :movies="topRatedMovies"/>
    <div class="title">Latest Movies</div>
    <MoviesCarousel :movies="nowPlayingMovies"/>
    <div class="title">Upcoming Movies</div>
    <MoviesCarousel :movies="upcomingMovies"/>
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
  created(){
    window.scrollTo(0,0);
  },
  data(){
    return{
    }
  },
  computed: {
    trendingMovies(){
      return this.$store.getters.trendingMovies;
    },
    topRatedMovies(){
      return this.$store.getters.topRatedMovies;
    },
    nowPlayingMovies(){
      return this.$store.getters.nowPlayingMovies;
    },
    upcomingMovies(){
      return this.$store.getters.upcomingMovies;
    }
  }
}
</script>

<style lang="scss" scoped>
  #home{
    padding-left: $m-size;
    padding-right: $m-size;
    padding-bottom: $xl-size;
  }

  @media only screen and (max-width: 680px) {
    #home{
      padding-left: $vs-size;
      padding-right: $vs-size;
      padding-bottom: $xl-size;
    }
  }
</style>
