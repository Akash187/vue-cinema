<template>
  <div v-if="similarMovies.length > 0" id="similarMovies">
    <div class="title">Similar Movies</div>
    <MoviesCarousel :movies="similarMovies"/>
  </div>
</template>

<script>
  import MoviesCarousel from './MoviesCarousel';
  import filterMovies from './../mixins/filterMovies';

  export default {
    name: "similar-movies",
    components: {
      MoviesCarousel
    },
    data(){
      return{
        similarMovies: []
      }
    },
    created(){
      let ref = this;
      let movieId = this.$route.params.id;
      filterMovies(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.VUE_APP_API_KEY}`).then(({movies}) => {
        ref.similarMovies = movies;
      }).catch((error) => {
        console.log(error);
      });
    }
  }
</script>

<style lang="scss" scoped>

  #similarMovies{
    padding: 0 $s-size $s-size $s-size;
  }

  .title{
    padding-top: 0;
    color: $off-white;
  }
</style>