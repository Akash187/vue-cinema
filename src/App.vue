<template>
  <div id="app">
    <navbar/>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
  *{
   padding: 0;
    margin: 0;
  }

  .vs__selected-options{
    color: white;
  }
</style>
