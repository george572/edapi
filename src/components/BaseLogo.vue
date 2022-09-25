<template>
    <div>
      <h1 v-if="size === 'small'" class="small-logo">E&D</h1>
      <h1 v-else>Elle & Dee's</h1>
    </div>
</template>

<script>
export default {
  name:"BaseLogo",
  props : {
    size : {
      type : String,
      default : "normal"
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/variables.scss";
  h1 {
    color:#7041EE;
    font-size: 34px;
    font-family: $font;
    font-weight: 700;
    padding:15px 0;
  }
  .small-logo {
    text-align: left;
    // padding-left: 30px;
  }
</style>