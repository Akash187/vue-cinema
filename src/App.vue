<template>
  <div id="app">
    <navbar/>
    <Alert/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';
  import Alert from '@/components/Alert.vue';

  export default {
    name: 'app',
    components: {
      Navbar,
      Alert
    },
    created(){
      this.$store.dispatch('initFavourites');
      this.$store.dispatch('fetchMovies',{url: this.$store.state.trendingMoviesUrl, mutation: 'fetchTrendingMovies'});
      this.$store.dispatch('fetchMovies',{url: this.$store.state.topRatedMoviesUrl, mutation:'fetchTopRatedMovies'});
      this.$store.dispatch('fetchMovies',{url: this.$store.state.nowPlayingMoviesUrl, mutation:'fetchNowPlayingMovies'});
      this.$store.dispatch('fetchMovies',{url: this.$store.state.upcomingMoviesUrl, mutation:'fetchUpcomingMovies'});
    }
  }
</script>

<style lang="scss">
  *{
   padding: 0;
    margin: 0;
  }

  body{
    background-color: $off-black;
    color: $off-white;
  }

  .main{
    padding-top: 64px;
  }

  .title{
    padding-top: $s-size;
    font-size: $vl-size;
  }

  .error{
    text-align: center;
    margin-top: $s-size;
    color: red;
  }

  .search-favourite-page{
    padding-left: $m-size;
    padding-right: $m-size;
    padding-bottom: $xl-size;
  }

  @media only screen and (max-width: 680px) {
    .search-favourite-page{
      padding-left: $vs-size;
      padding-right: $vs-size;
      padding-bottom: $xl-size;
    }
  }

  .VueCarousel-navigation-button{
    padding: 4px 6px !important;
    background-color: white !important;
    border-radius: 50%;
  }

  .VueCarousel-navigation-button:focus { outline: 0 !important;}

  @media only screen and (max-width: 468px){
    .main{
      padding-top: 102px;
    }
  }

</style>
