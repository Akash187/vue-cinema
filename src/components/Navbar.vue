<template>
  <div id="navbar">
    <div class="navbar-child">
      <router-link to="/">
        <img id="project-logo" alt="Project logo" src="../assets/logo.png">
      </router-link>
      <span id="project-title">Vue Movies</span>
    </div>
    <div class="navbar-child">
      <input type="text" v-model="searchTerm" placeholder="Search.." name="search">
      <button id="submitBtn" @click="search"><i class="fas fa-search"></i></button>
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
        this.$store.dispatch('updateSearchTerm', this.searchTerm);
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
    margin-right: $l-size;
  }
</style>