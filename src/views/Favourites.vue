<template>
  <div class="main search-favourite-page">
    <div class="title">Favourites Movies</div>
    <div v-show="favouriteMovies.length === 0">No Favourite Movies so far.</div>
    <div id="movies">
      <div v-for="movie in favouriteMovies" :key="movie.id">
        <div class="delete-icon"><i @click="deleteFavourite(movie.id)" class="fas fa-trash"></i></div>
        <router-link :to="`/movie/${movie.id}`">
          <img :src="movie.poster"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "favourites",
    computed: {
      favouriteMovies(){
        console.log("fghgjghjh");
        return this.$store.getters.favouriteMovies;
      }
    },
    methods: {
      deleteFavourite(id){
        this.$store.dispatch('deleteFavourite', id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #movies{
    width: 100%;
    display: grid;
    grid-gap: $l-size;
    grid-template-columns: repeat(auto-fill, 185px);
    margin-top: $s-size;
    justify-content: center;
  }

  #movies img{
    width: 185px;
    height: 278px;
  }

  .delete-icon{
    position: relative;
    left: 162px;
    top: 32px;
    width: 16px;
  }

  .fa-trash{
    font-size: $l-size;
    color: red;
  }
</style>
