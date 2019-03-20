<template>
  <div id="movies">
    <div v-for="movie in movies" :key="movie.id">
      <router-link :to="`/movie/${movie.id}`">
        <img :src="movie.poster"/>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "movies",
    props: {
      movies: {
        type: Array,
        required: true
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

  #movies img{
    transition: 0.2s ease-in-out;
  }
  #movies img:hover{
    transform: scale(0.9, 0.9);
  }
</style>