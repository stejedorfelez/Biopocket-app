<template>
<div>
  <div class="main-title">
    <h1>{{ msg }}</h1>
    <img class="biopocket-logo" src="@/assets/image/title-logo.png" alt="biopocket-logo">
    <h3>{{ description }}</h3>
  </div>
</div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    description: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-title {
  background-color: #34495e;
  text-align: center;
  padding: 30px 20px 80px 20px;
  font-size: 26px;
  line-height: 40px;
  font-weight: 350;
  color: #FFFFFF;
  text-shadow: none;
}

.main-title .biopocket-logo {
  width: 100px;
  height: 100px;
}

.main-title h3 {
  font-size: 18px;
}
</style>
