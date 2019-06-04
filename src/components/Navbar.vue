<template>
  <div class="navbar">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#347ABF"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="/">Biopocket</el-menu-item>
      <el-menu-item index="/news">News</el-menu-item>
      <el-submenu index="/databases">
        <template slot="title">Databases</template>
        <el-menu-item index="/NCBI">NCBI</el-menu-item>
        <el-menu-item index="/uniprot">UniProt</el-menu-item>
      </el-submenu>
      <el-submenu index="/">
        <template slot="title">Analytics</template>
        <el-menu-item index="/clustal-omega">Clustal Omega</el-menu-item>
        <el-menu-item index="/NCBI-blast">NCBI Blast</el-menu-item>
      </el-submenu>
      <el-menu-item index="/citations">Citations</el-menu-item>
      <el-menu-item index="/about">About Us</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  background-color: #1abc9c;
  border-color: #16a085;
  font-size: 18px !important;
}
.navbar .el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
