<template>
  <div class="carousel">
    <carousel :perPageCustom="[[1240, 6], [1060, 5],[880, 4], [680, 3], [480,2], [320,1]]" :paginationEnabled="false" :navigation-enabled="true">
      <slide v-for="movie in movies" :key="movie.id">
        <router-link :to="`/movie/${movie.id}`">
          <img :src="movie.poster"/>
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>
  export default {
    name: "MoviesCarousel",
    props: {
      movies: {
        type: Array,
        required: true
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
  .VueCarousel-slide img{
    transition: 0.2s ease-in-out;
  }
  .VueCarousel-slide img:hover{
    transform: scale(0.9, 0.9);
  }
</style>