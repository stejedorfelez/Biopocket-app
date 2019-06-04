<template>
  <div class="card" @click="navigateTo(route)">
    <div class="grid-content news">
      <h2>
        <span>{{ title }}</span>
        <i :class="icon"></i>
      </h2>
      <!--<p>{{ description }}</p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCard",
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      msg: "News Page"
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-content {
  background-color: #fff;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
  /*height: 150px;*/
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

h2 {
  /*color:rgb(44, 44, 44);*/
  color: #347ABF;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  font-size: 18px;
}
p {
  color: rgba(0, 0, 0, 0.7);
  font-family: "Roboto", "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
  font-size: 18px;
  font-weight: 400;
}
</style>
