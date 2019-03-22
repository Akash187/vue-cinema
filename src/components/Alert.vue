<template>
  <div>
    <div :class="{ showAlert: this.$store.getters.showAlert }" class="alert">
      {{this.$store.getters.alertMsg}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert"
  }
</script>

<style lang="scss" scoped>
  .alert{
    position: fixed;
    z-index: 9999;
    bottom: -$s-height;
    right: $l-size;
    padding: $m-size $vl-size;
    border-radius: $vs-size;
    background: $purple;
    color: white;
    font-size: $l-size;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    transition: 0.2s ease-in-out;
  }

  .showAlert{
    bottom: $l-size;
    right: $l-size;
    transition: 0.2s ease-in-out;
  }
</style>