<template>
  <div v-if="error" class="error"><h1>Sorry, No Data available for this movie!</h1></div>
  <div v-else v-bind:style="{ 'background-image': 'url(' + backdrop + ')', 'background-size': 'cover' }">
    <div class="movie">
      <div id="movieDetail">
        <img :src="poster"/>
        <div class="detail">
          <div class="title">
            {{title}}
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
              <div v-if="trailerSite === 'YouTube'" @click="show" class="detail-content"><i class="fas fa-play"></i> Play Trailer</div>
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
          <youtube :video-id="trailerId" ref="youtube" @playing="playing"/>
      </div>
    </modal>
  </div>
</template>

<script>

  export default {
    name: "detail",
    data(){
      return{
        error: false,
        title: '',
        genres: [],
        release_date: '',
        runtime: '',
        overview: '',
        poster: '',
        backdrop: '',
        trailerId: '',
        trailerSite: ''
      }
    },
    created(){
      let ref = this;
      let movieId = this.$route.params.id;
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_API_KEY}&append_to_response=videos,images`)
        .then((resp) => resp.json())
        .then(function(data) {
          if(!data.title){
            ref.error = true;
          }else{
            ref.title = data.original_title;
            ref.genres = data.genres.map((genre) => genre.name);
            ref.runtime = data.runtime;
            ref.release_date = data.release_date;
            ref.overview = data.overview;
            ref.poster = `http://image.tmdb.org/t/p/w342/${data.poster_path}`;
            ref.backdrop = `http://image.tmdb.org/t/p/w780/${data.backdrop_path}`;
            ref.trailerId = data.videos.results[0].key;
            ref.trailerSite = data.videos.results[0].site;
          }
        })
        .catch((err) => {
          console.log(`Error Fetching Movie`);
        })
    },
    methods: {
      show () {
        this.$modal.show('trailer');
      },
      hide () {
        this.$modal.hide('trailer');
      }
    }
  }
</script>

<style lang="scss" scoped>

  .error{
    text-align: center;
    margin-top: $s-size;
    color: red;
  }

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
    overflow-y: scroll;
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
      overflow-y: scroll;
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
      overflow-y: scroll;
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