<template>
  <div class="main">
    <Detail/>
    <Cast/>
    <SimilarMovies/>
  </div>
</template>

<script>
  import Detail from './../components/Detail';
  import Cast from './../components/Cast';
  import SimilarMovies from './../components/SimilarMovies';

  export default {
    name: "movie",
    components: {
      Detail,
      Cast,
      SimilarMovies
    },
    created(){
      window.scrollTo(0,0);
    }
  }
</script>

<style lang="scss" scoped>

</style>