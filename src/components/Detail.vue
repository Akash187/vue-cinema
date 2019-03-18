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
              <div class="detail-content">25 Apr 2018</div>
            </div>
            <div class="duration">
              <div class="detail-header">Duration</div>
              <div class="detail-content">2hr 29m</div>
            </div>
            <div class="genre">
              <div class="detail-header">Genre</div>
              <div class="detail-content">
                <span v-for="genre in genres">{{genre}}</span>
              </div>
            </div>
            <div class="trailer">
              <div class="detail-content"><i class="fas fa-play"></i> Play Trailer</div>
            </div>
          </div>
          <div class="overview">
            <div>Overview</div>
            <p>{{overview}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "movie",
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
        trailer: ''
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
            ref.trailer = data.videos.results[0].id;
          }
        })
        .catch((err) => {
          console.log(`Error Fetching Movie`);
        })
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
    height: 400px;
    max-width: 95%;
    display: flex;
  }

  #movieDetail img{
    height: 400px;
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

  .detail .overview p{
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

  @media only screen and (max-width: 840px){

    #movieDetail img {
      display: none;
    }
  }

  @media only screen and (max-width: 580px) {
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
      font-size: 14px;
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
  }

  @media screen and (max-device-height: 380px) and (orientation : landscape){
    #movieDetail{
      height: 250px;
    }

    .detail .overview p{
      overflow-y: hidden;
      max-height: 36px;
      font-size: $s-size;
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