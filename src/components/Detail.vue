<template>
  <div v-bind:style="{ 'background-image': 'url(' + backdrop + ')', 'background-size': 'cover' }">
    <div class="movie">
      <div id="movieDetail">
        <img :src="poster"/>
        <div class="detail">
          <div class="title-container">
            <div class="title">
              {{title}}
            </div>
            <div class="fav-icon">
              <i v-if="favourite" @click="deleteFavourite" class="fas fa-trash" style="color: red"></i>
              <i v-else @click="addToFavourites" class="fab fa-gratipay"></i>
            </div>
          </div>
          <div class="extraDetail">
            <div class="releaseDate">
              <div class="detail-header">Release Date</div>
              <div class="detail-content">{{ release_date | formatDate }}</div>
            </div>
            <div class="duration">
              <div class="detail-header">Duration</div>
              <div class="detail-content">{{ runtime | formatRuntime }}</div>
            </div>
            <div class="genre">
              <div class="detail-header">Genre</div>
              <div class="detail-content">
                <span v-for="genre in genres">{{genre}}</span>
              </div>
            </div>
            <div class="trailer">
              <div v-if="trailerId" @click="show" class="detail-content"><i class="fas fa-play"></i> Play Trailer</div>
            </div>
          </div>
          <div class="overview">
            <div>Overview</div>
            <p>{{overview}}</p>
          </div>
        </div>
      </div>
    </div>
    <modal name="trailer" :adaptive="true" height="auto" width="640px">
      <div style="display: flex">
          <youtube :video-id="trailerId" :player-vars="playerVars" ref="youtube" @playing="playing"/>
      </div>
    </modal>
  </div>
</template>

<script>

  export default {
    name: "detail",
    data(){
      return{
        id: '',
        title: '',
        genres: [],
        release_date: '',
        runtime: '',
        overview: '',
        poster: '',
        backdrop: '',
        trailerId: '',
        playerVars: {
          autoplay: 1
        },
        favourite: false
      }
    },
    created(){
      let ref = this;
      let movieId = this.$route.params.id;
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_API_KEY}&append_to_response=videos`)
        .then((resp) => resp.json())
        .then(function(data) {
          ref.id = data.id;
          ref.title = data.original_title;
          ref.genres = data.genres.map((genre) => genre.name);
          ref.runtime = data.runtime;
          ref.release_date = data.release_date;
          ref.overview = data.overview;
          ref.poster = `http://image.tmdb.org/t/p/w342/${data.poster_path}`;
          ref.backdrop = `http://image.tmdb.org/t/p/w780/${data.backdrop_path}`;
          for(let video of data.videos.results){
            if(video.type === 'Trailer'){
              ref.trailerId = video.key;
            }
          }
          ref.$store.dispatch('updateDataLoaded', true);
        })
        .catch((err) => {
          ref.$store.dispatch('updateError', true);
          console.log(`Error Fetching Movie`);
        });

      for(let favourite of this.$store.getters.favouriteMovies){
        if(favourite.id === parseInt(movieId)){
          this.favourite = true;
          break;
        }
      }
    },
    methods: {
      show () {
        this.$modal.show('trailer');
      },
      hide () {
        this.$modal.hide('trailer');
      },
      addToFavourites(){
        this.$store.dispatch('addToFavourites', {id: this.id, title: this.title, poster: this.poster})
          .then(() => {
          this.favourite = true;
        }).catch(err => console.log(err));
      },
      deleteFavourite(){
        this.$store.dispatch('deleteFavourite', this.id).then(() => {
          this.favourite = false;
        }).catch(err => console.log(err));
      }
    }
  }
</script>

<style lang="scss" scoped>

  .movie{
    height: calc(100vh - 64px);
    width: 100%;
    display: flex;
    align-items: center;
  }

  #movieDetail{
    padding: $l-size $m-height;
    height: 450px;
    max-width: 95%;
    display: flex;
  }

  #movieDetail img{
    height: 450px;
  }

  .detail{
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.6);
    padding: $vs-size $xl-size;
    color: #ffcb6b;
  }

  .detail .title-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .detail .title-container .fav-icon{
    font-size: $xl-size;
    color: lawngreen;
    cursor: pointer;
  }

  .detail .title{
    font-size: $vl-size;
  }

  .detail .extraDetail{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .detail .extraDetail div{
    padding-right: $l-size;
    padding-top: $vs-size;
  }

  .detail .extraDetail div .detail-header{
    opacity: 0.7;
    font-size: $m-size;
  }

  .detail .extraDetail .genre div:last-child{
    display: flex;
    flex-wrap: wrap;
  }

  .detail .extraDetail .genre span{
    padding-right: $s-size;
  }

  .trailer{
    cursor: pointer;
  }

  .detail .overview{
    padding: $vl-size 0;
  }

  .detail .overview div{
    opacity: 0.7;
    font-size: $l-size;
  }

  .detail .overview p::-webkit-scrollbar {
    width: 2px;
  }

  .detail .overview p::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  .detail .overview p::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .detail .overview p{
    overflow-y: auto;
    max-height: $l-height;
    font-weight: 200;
    font-size: $m-size;
    padding: $vs-size 0;
  }

  @media only screen and (max-width: 1120px){
    #movieDetail{
      padding: $s-size $xl-size;
    }
    .detail .overview{
      padding: $s-size 0;
    }
  }

  @media only screen and (max-width: 900px){

    #movieDetail{
      height: 450px;
    }

    #movieDetail img {
      display: none;
    }

  }

  @media only screen and (max-width: 680px) {
    .detail{
      padding: $vs-size $s-size;
    }

    .detail .title{
      font-size: $l-size;
    }

    #movieDetail{
      height: 500px;
    }

    .detail .title-container .fav-icon{
      font-size: $l-size;
    }
  }

  @media only screen and (max-width: 480px) {

    #movieDetail{
      height: 400px;
    }

    #movieDetail{
      padding: $l-size $vs-size;
    }

    .detail .extraDetail div .detail-header{
      font-size: $s-size;
    }

    .detail .extraDetail div .detail-header{
      font-size: $vs-size;
    }

    .detail .extraDetail div .detail-content{
      font-size: $s-size;
    }

    .detail .overview p{
      overflow-y: auto;
      max-height: $m-height;
      font-size: $s-size;
    }
  }

  @media screen and (max-device-height: 480px) and (orientation : landscape){

    .detail{
      padding: $vs-size $s-size;
    }

    #movieDetail{
      height: 300px;
    }

    .detail .title{
      font-size: $m-size;
    }

    .detail .overview div{
      font-size: $m-size;
    }

    .detail .overview p{
      overflow-y: auto;
      max-height: $s-height;
      font-size: $s-size;
    }
  }

  @media screen and (max-device-height: 380px) and (orientation : landscape){
    #movieDetail{
      height: 250px;
    }

    .detail .extraDetail div .detail-header{
      font-size: $vs-size;
    }

    .detail .extraDetail div .detail-content{
      font-size: $s-size;
    }

    .detail .title{
      font-size: $m-size;
    }
  }
</style>