<template>
  <article class="clustal-omega">
    <section class="title-container">Clustal Omega</section>

    <section class="filters-container">
      <div class="filters">
        <!-- Left column: sequence -->
        <div class="filter">
          <div class="filter-label">Sequence</div>
          <div class="filter-textarea">
            <el-input
              v-loading="loading"
              type="textarea"
              :rows="30"
              placeholder="Paste your sequence..."
              v-model="sequence"
            ></el-input>
          </div>
        </div>

        <!-- Center column: button -->
        <div class="button-container">
          <el-button @click="getSequence()" :disabled="loading" icon="el-icon-right" type="primary"></el-button>
        </div>

        <!-- Right column: no results -->
        <div
          v-if="!result || result.length === 0"
          class="results-container no-results"
        >No results found</div>
        <!-- Right column: results -->
        <div v-if="result && result.length > 0" class="results-container results">
          <div class="result-card">
            <h2>Out</h2>
            <span v-html="this.result[0]"></span>
          </div>
          <div class="result-card">
            <h2>Pim</h2>
            <span v-html="this.result[1]"></span>
          </div>
          <div class="result-card">
            <h2>Phylotree</h2>
            <span v-html="this.result[2]"></span>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.ebi.ac.uk/Tools/services/rest/clustalo/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export default {
  name: "Uniprot",
  components: {},
  data: () => {
    return {
      sequence: "",
      result: [],
      limit: 10,
      loading: false
    };
  },
  methods: {
    async getSequence() {
      try {
        this.loading = true;
        this.result = [];

        const resultType = ["out", "pim", "phylotree"];
        const params = new URLSearchParams();
        params.append("email", "stejedorfelez@gmail.com");
        params.append("sequence", this.sequence);

        const jobId = await api.post(`run`, params);

        let status = await this.returnStatus(jobId);

        while (status.data === "RUNNING") {
          status = await this.returnStatus(jobId);
        }

        const resultTypePromise = resultType.map(type => api.get(`result/${jobId.data}/${type}`));
        const results = await Promise.all(resultTypePromise);

        this.result = results.map(result => {
          let newString = "";
          result.data.split("\n").forEach(wordGroup => {
            newString += `<br> ${wordGroup}`;
          });

          return newString;
        });
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    async returnStatus(jobId) {
      return api.get(`status/${jobId.data}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clustal-omega {
  padding: 20px;
}

.title-container {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
}

.filters-container .filters {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}

.filters-container .filters .filter {
  flex: 1 1 0;
}

.filters-container .filters .filter-label {
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  align-items: flex-start;
  padding: 0 20px;
  margin-top: 28px;
}

.results-container {
  margin-top: 28px;
  flex: 1 1 0;
}

.results-container.no-results {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 20px;
}

.results-container.results .result-card {
  background-color: #fff;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
  min-height: 100px;
  padding: 20px;
  border-radius: 5px;
}

.results-container.results .result-card:not(:last-child) {
  margin-bottom: 10px;
}

.results-container.results .result-card h2 {
  margin: 0 0 10px 0;
}

@media (max-width: 768px) {
  .filters-container .filters {
    flex-direction: column;
  }
  .button-container {
    justify-content: center;
  }
}
</style>