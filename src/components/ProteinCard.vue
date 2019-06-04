<template>
  <div class="card" @click="navigateTo(protein.proteinUrl)">
    <div class="grid-content news">
      <h2 v-if=" protein.name">{{ protein.name }}</h2>
      <p v-if="protein.proteinExistence">
          <strong>Protein Existence:</strong> {{ protein.proteinExistence }}
      </p>
      <div v-if="protein.proteinFeatures.length > 0">
          <div v-for="(feature, index) of protein.proteinFeatures" :key="index">
            <span v-if="index < 5"><strong>Feature:</strong> {{ feature.feature }}</span>
          </div>
      </div>
      <p v-if="protein._sequence">
          <span class="sequence"><strong>Squence: </strong> {{ protein._sequence.sequence }}</span>
          <strong>Length: </strong> {{ protein._sequence["length"] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProteinCard",
  props: {
    protein: {
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
        window.open(route, '_blank');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-content {
  background-color: #fff;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
  min-height: 150px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.sequence {
    display: block;
    word-wrap: break-word
}

h2 {
  color:rgb(44, 44, 44);
}
</style>
