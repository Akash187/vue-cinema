<template>
  <div id="similarMovies">
    <div class="title">Similar Movies</div>
    <MoviesCarousel :movies="similarMovies"/>
  </div>
</template>

<script>
  import MoviesCarousel from './MoviesCarousel';

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
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.VUE_APP_API_KEY}`)
        .then((resp) => resp.json())
        .then(function(data) {
          ref.similarMovies = data.results.filter((movie) => {
            return movie.poster_path
          }).map((movie) => ({
            id: movie.id,
            poster: `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
          }));
        })
        .catch((err) => {
          console.log(`Error Fetching Movie`);
        })
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