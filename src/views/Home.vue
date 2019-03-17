<template>
  <div class="home">
    <h1>Trending Movies</h1>
    <div class="carousel">
      <carousel :perPageCustom="[[1180, 6], [1060, 5],[820, 4], [650, 3], [420,2], [320,1]]" :paginationEnabled="false" :navigation-enabled="true">
        <slide v-for="movie in trendingMovies" :key="movie.id">
          <img :src="movie.poster"/>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
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
  .carousel{
     margin: $m-size $xl-size;
   }
  .VueCarousel-slide {
    display: flex;
    justify-content: center;
  }
</style>
