<template>
  <div id="navbar">
    <div class="navbar-child">
      <div class="hero-logo">
        <div v-if="this.$route.name !== 'home'" @click="goBack" id="backBtn">
          <i class="fas fa-arrow-left"></i>
        </div>
      <router-link to="/">
          <img id="project-logo" alt="Project logo" src="../assets/logo.png">
      </router-link>
      </div>
      <span id="project-title">Vue Movies</span>
    </div>
    <div class="navbar-child">
      <input type="text" v-model="searchTerm" placeholder="Search.." name="search">
      <button id="submitBtn" @click="search"><i class="fas fa-search"></i></button>
      <router-link to="/favourites">
        <div id="favouritesBtn" @click="search"><i class="fas fa-heart"></i></div>
      </router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: "navbar",
    data(){
      return{
        searchTerm: ''
      }
    },
    methods: {
      search: function () {
        if(this.searchTerm.length > 0){
          if(this.$store.getters.searchTerm === this.searchTerm){
            this.$router.push(`/search/${this.searchTerm}`)
          }else {
            this.$store.dispatch('updateSearchTerm', this.searchTerm);
            this.$router.push(`/search/${this.searchTerm}`)
          }
        }
      },
      goBack: function () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #navbar{
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 2;
    background: $dark-blue;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: $vs-size $m-size;
    box-shadow: 2px 2px 2px $light-blue;
  }

  .navbar-child{
    display: flex;
    align-items: center;
    padding: $es-size;
  }

  .hero-logo{
    display: flex;
    align-items: center;
  }

  #backBtn{
    padding-right: $s-size;
    color: white;
    font-size: 28px;
  }

  #project-title{
    color: $white;
    font-size: $vl-size;
    margin-left: $vs-size;
  }

  #project-logo{
    height: $xl-size;
  }

  input[type=text] {
    padding: 6px;
    font-size: $m-size;
    border: none;
  }

  #submitBtn{
    background: #ddd;
    padding: 6px;
    font-size: $m-size;
    border: none;
    margin-right: $s-size;
  }

  #favouritesBtn{
    font-size: 28px;
    padding-right: $xl-size;
    color: red;
  }
</style>