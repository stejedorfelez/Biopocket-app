<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script scoped>
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
* {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
