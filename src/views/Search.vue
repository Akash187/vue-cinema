<template>
  <div class="main" id="searchPage">
    <div class="title">Search Result</div>
    <Movies :movies="searchedMovies"/>
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
        searchedMovies: []
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
  #searchPage{
    padding-left: $m-size;
    padding-right: $m-size;
    padding-bottom: $xl-size;
  }

  @media only screen and (max-width: 680px) {
    #searchPage{
      padding-left: $vs-size;
      padding-right: $vs-size;
      padding-bottom: $xl-size;
    }
  }
</style>