<template>
  <div id="app">
    <navbar/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';

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

  .main{
    padding-top: 64px;
  }

  .title{
    padding-top: $s-size;
    font-size: $vl-size;
  }

  @media only screen and (max-width: 468px){
    .main{
      padding-top: 102px;
    }
  }

</style>
