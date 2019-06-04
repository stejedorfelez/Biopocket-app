<template>
  <article class="clustal-omega">
    <section class="title-container">NCBI Blast</section>

    <section class="filters-container">
      <div class="filters">
        <!-- Left column: sequence -->
        <div class="filter">
          <div class="top-filters">
            <!-- Program -->
            <div class="left-filter">
              <div class="filter-label" for="program">Program</div>
              <el-select v-model="program" placeholder="Select filter">
                <el-option
                  v-for="item in programOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>

            <!-- Stype -->
            <div class="right-filter">
              <div class="filter-label" for="stype">Stype</div>
              <el-select v-model="stype" placeholder="Select filter">
                <el-option
                  v-for="item in stypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- Sequence -->
          <div class="bottom-filters">
            <div class="filter-label" for="sequence">Sequence</div>
            <div class="filter-textarea">
              <el-input
                v-loading="loading"
                type="textarea"
                placeholder="Paste your sequence..."
                :rows="30"
                v-model="sequence"
              ></el-input>
            </div>
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
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/",
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
      loading: false,
      program: "blastp",
      programOptions: [
        { value: "blastp", label: "blastp" },
        { value: "blastn", label: "blastn" },
        { value: "tblastx", label: "tblastx" },
        { value: "blastx", label: "blastx" },
        { value: "tblastn", label: "tblastn" }
      ],
      stype: "protein",
      stypeOptions: [
        { value: "protein", label: "protein" },
        { value: "dna", label: "dna" }
      ]
    };
  },
  methods: {
    async getSequence() {
      try {
        this.loading = true;
        this.result = [];

        const params = new URLSearchParams();
        params.append("email", "stejedorfelez@gmail.com");
        params.append("sequence", this.sequence);
        params.append("program", this.program);
        params.append("stype", this.stype);

        if (this.program === "blastn") {
          params.append("database", "em_rel");
        } else if (this.program === "tblast" || this.program === "tblastn") {
            params.append("database", "pdbna");
        } else {
          params.append("database", "uniprotkb");
        }

        const jobId = await api.post(`run`, params);

        let status = await api.get(`status/${jobId.data}`);
        const interval = window.setInterval(async () => {
          if (status.data === "RUNNING") {
            status = await api.get(`status/${jobId.data}`);
          } else {
            clearInterval(interval);
            this.getResults(jobId);
          }
        }, 15000);
      } catch (err) {
        this.loading = false;
      }
    },
    async getResults(jobId) {
      try {
        const resultType = ["out"];
        const resultTypePromise = resultType.map(type =>
          api.get(`result/${jobId.data}/${type}`)
        );
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-select {
  width: 100%;
}

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

.filters-container .filters .top-filters {
  display: flex;
  margin-bottom: 10px;
}

.filters-container .filters .top-filters .left-filter {
  flex: 1 1 0;
  margin-right: 15px;
}

.filters-container .filters .top-filters .right-filter {
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
