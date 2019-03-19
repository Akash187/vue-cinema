<template>
  <div id="app">
    <navbar/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';

  export default {
    name: 'app',
    components: {
      Navbar
    },
    created(){
      this.$store.dispatch('fetchTrendingMovies');
      this.$store.dispatch('fetchTopRatedMovies');
      this.$store.dispatch('fetchNowPlayingMovies');
      this.$store.dispatch('fetchUpcomingMovies');
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
