<template>
  <div class="main search-favourite-page">
    <div class="title">Search Result</div>
    <div>
      <Movies :movies="this.$store.state.searchedMovies"/>
    </div>
    <div v-show="showError">
      <h1 style="color: red">No movie Found</h1>
    </div>
  </div>
</template>

<script>
  import Movies from './../components/Movies';

  export default {
    name: "search",
    components: {
      Movies
    },
    data(){
      return{
        searchedMovies: [],
        showError: false
      }
    },
    beforeCreate(){
      if(this.$store.getters.searchTerm === ''){
        this.$router.push('/');
      }
    },
    created(){
      let ref = this;
      if(this.$store.getters.currentPage === 0){
        ref.$store.dispatch('fetchSearchedMovies');
      }
    },
    mounted(){
      this.searchedMovies = this.$store.getters.searchedMovies;
      let ref = this;
      window.onscroll = () => {
        let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;
        if (bottomOfWindow && ref.$store.getters.currentPage + 1 <= ref.$store.getters.totalPage && ref.$route.params.query === ref.$store.getters.searchTerm) {
          console.log("Hello");
          ref.$store.dispatch('fetchSearchedMovies', 'loadMoreMovies');
        }
      };
    }
  }
</script>

<style lang="scss" scoped>
</style>