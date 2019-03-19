<template>
  <div class="main">
    <div id="loader" v-if="!this.$store.state.dataLoaded && !this.$store.state.error" class="loader">
      <img alt="Loader" src="../assets/loader.gif">
    </div>
    <div v-else>
      <div v-if="this.$store.state.error" class="error">
        <h1>Sorry, No Data available for this movie!</h1>
      </div>
    </div>
    <div v-show="this.$store.state.dataLoaded">
      <Detail/>
      <Cast/>
      <SimilarMovies/>
    </div>
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
      SimilarMovies,
    },
    created(){
      window.scrollTo(0,0);
      this.$store.dispatch('updateDataLoaded', false);
      this.$store.dispatch('updateError', false);
    }
  }
</script>

<style lang="scss" scoped>
  #loader{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    height: 100vh;
  }
</style>