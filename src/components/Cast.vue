<template>
  <div v-if="casts.length > 0" id="cast">
    <div class="casts-title">Casts</div>
    <div class="casts">
      <div class="cast-info" v-for="cast in maxCasts" :key="cast.id">
        <img class="cast-img" :src="cast.profile_url"/>
        <div class="cast-name">{{cast.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cast",
    created(){
      let ref = this;
      let movieId = this.$route.params.id;
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/casts?api_key=${process.env.VUE_APP_API_KEY}`)
        .then((resp) => resp.json())
        .then(function(data) {
          ref.casts = data.cast.filter((cast) => {
            return cast.profile_path
          }).map((cast) => {
            return {
              id: cast.id,
              name : cast.name,
              profile_url : `http://image.tmdb.org/t/p/w154/${cast.profile_path}`
            }
          });
        })
        .catch((err) => {
          console.log(`Error Fetching Movie`);
        })
    },
    data(){
      return{
        casts: []
      }
    },
    computed : {
      maxCasts : function () {
        if(this.casts.length < 15){
          return this.casts;
        }else{
          return this.casts.slice(0,15);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #cast{
    padding: $s-height 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #cast .casts-title{
    font-size: $vl-size;
    font-weight: 500;
  }

  #cast .casts{
    width: 100%;
    display: grid;
    grid-gap: $s-size;
    grid-template-columns: repeat(auto-fill, 154px);
    margin-top: $s-size;
    justify-content: center;
  }

  .cast-info{
    display: flex;
    flex-direction: column;
  }

  .cast-info img{
    height: 231px;
  }

  .cast-info .cast-name{
    margin-top: $vs-size;
    font-size: $s-size;
  }

  @media only screen and (max-width: 540px){
    #cast{
      padding: $vl-size 0;
    }

    #cast .casts-title{
      font-size: $l-size;
    }
  }
</style>