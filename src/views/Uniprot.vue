<template>
  <article class="news">
    <!-- Page title -->
    <section class="title-container">Uniprot</section>

    <!-- Search filters -->
    <section class="filters-container">
      <div class="filters">
        <!-- Search by -->
        <div class="search-by">
          <el-input placeholder="Protein name" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
        </div>

        <!-- Search button -->
        <div class="search-button">
          <el-button @click="getProteines()" type="primary">Search</el-button>
        </div>
      </div>
    </section>

    <div class="filter" v-if="result || result.length > 0">
      <ProteinCard v-for="(protein, index) in result" :key="index" :protein="protein"/>

      <el-button
        v-if="result && result.length > 0"
        @click="getProteines(10)"
        type="primary"
      >Load More Results</el-button>
    </div>

    <!-- Bottom section: no results -->
    <div v-if="!result || result.length === 0" class="results-container no-results">No results found</div>
  </article>
</template>

<script>
import axios from "axios";
import ProteinCard from "@/components/ProteinCard";

export const api = axios.create({
  baseURL: "https://www.ebi.ac.uk/proteins/api"
});

export default {
  name: "Uniprot",
  components: {
    ProteinCard
  },
  data: () => {
    return {
      searchInput: "",
      result: [],
      limit: 10
    };
  },
  methods: {
    async getProteines(newLimit) {
      if (newLimit) {
        this.limit += newLimit;
      } else {
        this.limit = 10;
      }

      const protein = await api.get("proteins", {
        params: {
          offset: "0",
          size: this.limit,
          protein: this.searchInput
        }
      });

      const result = protein.data.map(
        ({ proteinExistence, protein, features, sequence }) => {
          const { name, proteinUrl } = this.getProteinData(protein);
          const proteinFeatures = this.getProteinFeatures(features);
          const _sequence = this.getSequence(sequence);

          return {
            proteinExistence,
            name,
            proteinUrl,
            proteinFeatures,
            _sequence
          };
        }
      );

      this.result = result;
    },
    getProteinData(protein) {
      const { submittedName, alterativeName, recommendedName } = protein;

      let name = "";
      let proteinUrl = "";
      if (submittedName) {
        name = submittedName[0].fullName.value;
        if (
          submittedName[0].fullName.evidences &&
          submittedName[0].fullName.evidences[0].source &&
          submittedName[0].fullName.evidences[0].source.url
        ) {
          proteinUrl = submittedName[0].fullName.evidences[0].source.url;
        }
      } else if (recommendedName) {
        name = recommendedName.fullName.value;
        if (
          recommendedName.fullName.evidences &&
          recommendedName.fullName.evidences[0].source &&
          recommendedName.fullName.evidences[0].source.url
        ) {
          proteinUrl = recommendedName.fullName.evidences[0].source.url;
        }
      } else if (alterativeName) {
        name = alterativeName[0].fullName.value;
        if (
          alterativeName[0].fullName.evidences &&
          alterativeName[0].fullName.evidences[0].source &&
          alterativeName[0].fullName.evidences[0].source.url
        ) {
          proteinUrl = alterativeName[0].fullName.evidences[0].source.url;
        }
      }

      return { name, proteinUrl };
    },
    getProteinFeatures(features) {
      if (features) {
        return features.map(feature => {
          const { type, category, description } = feature;

          return {
            feature: `Type: ${type || " - "}, Category: ${category ||
              " - "}, Description: ${description || " - "}`
          };
        });
      } else {
        return "";
      }
    },
    getSequence(_sequence) {
      const { length, sequence } = _sequence;
      return {
        length,
        sequence
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news {
  padding: 20px;
}

.title-container {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
}

.filters-container .filters {
  display: flex;
  justify-content: flex-start;
  /* Si quieres centrarlo horizontalmente */
  /* justify-content: center; */
  align-items: center;
}

.search-by {
  margin-right: 15px;
  flex: 0.5 1 0;
}

.search-value {
  flex: 0.5 1 0;
  margin-right: 15px;
}

.results-container {
  margin-top: 30px;
}

.results-container.no-results {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 20px;
}

@media (max-width: 768px) {
  .filters-container .filters {
    display: block;
    text-align: center;
  }

  .el-select {
    width: 100%;
  }

  .search-by {
    margin-right: 0px;
    margin-bottom: 15px;
  }
  .search-value {
    margin-right: 0px;
    margin-bottom: 15px;
  }
}
</style>
