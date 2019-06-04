<template>
    <div>
      <div class="grid-content">
        <h3 v-if="sequence['ID']">ID: {{ sequence["ID"] }}</h3>
        <p v-if="sequence['Official Symbol']"><strong>Official Symbol:</strong> {{ sequence["Official Symbol"] }}</p>
        <p v-if="sequence['Other Aliases']"><strong>Other Aliases: </strong>{{ sequence["Other Aliases"] }}</p>
        <p v-if="sequence['Other Designations']"><strong>Other Designations: </strong>{{ sequence["Other Designations"] }}</p>
        <p v-if="sequence['Chromosome']"><strong>Chromosome: </strong>{{ sequence["Chromosome"] }}</p>
        <p v-if="sequence['Annotation']"><strong>Annotation: </strong>{{ sequence["Annotation"] }}</p>
        <p v-if="sequence['MIM']"><strong>MIM: </strong>{{ sequence["MIM"] }}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: "NCBICard",
  props: {
    sequence: {
      type: Object,
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
.card {
  margin: 0 auto;
}
.grid-content {
  background-color: #fff;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
}

h2 {
  color: rgb(44, 44, 44);
}
</style>
