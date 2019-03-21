<template>
  <div class="main search-favourite-page">
    <div class="title">Search Result</div>
    <div>
      <Movies :movies="searchedMovies"/>
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
        ref.$store.dispatch('fetchSearchedMovies').then((movies) => {
          ref.searchedMovies = movies;
          if(movies.length === 0){
            ref.showError = true;
          }
        }).catch((error) => {
          console.log(error);
        });
      }else{
        this.searchedMovies = this.$store.getters.searchedMovies;
      }
    },
    mounted(){
      this.searchedMovies = this.$store.getters.searchedMovies;
      let ref = this;
      window.onscroll = () => {
        let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;
        if (bottomOfWindow && ref.$store.getters.currentPage + 1 <= ref.$store.getters.totalPage && ref.$route.params.query === ref.$store.getters.searchTerm) {
          console.log("Hello");
          ref.$store.dispatch('fetchSearchedMovies', 'loadMoreMovies').then((movies) => {
            ref.searchedMovies = movies;
          }).catch((error) => {
            console.log(error);
          });
        }
      };
    }
  }
</script>

<style lang="scss" scoped>
</style>