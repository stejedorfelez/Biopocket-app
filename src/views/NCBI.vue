<template>
  <article class="databases">
    <!-- Page title -->
    <section class="title-container">NCBI</section>

    <!-- Search filters -->
    <section class="filters-container">
      <div class="filters">
        <!-- Search by -->
        <div class="search-by">
          <el-input
            placeholder="Example: 7173,22018,54314,403521,525013"
            prefix-icon="el-icon-search"
            v-model="searchInput"
          ></el-input>
        </div>

        <!-- Search button -->
        <div class="search-button">
          <el-button @click="getNcbi()" type="primary">Search</el-button>
        </div>
      </div>
    </section>

    <section class="filter">
      <div>
        <NCBICard
          v-for="sequence of result"
          :key="sequence.ID"
          class="filterContent"
          :sequence="sequence"
        />
      </div>
    </section>

    <!-- Bottom section: no results -->
    <div v-if="!result || result.length === 0" class="results-container no-results">No results found</div>
  </article>
</template>

<script>
import axios from "axios";
import { xmlParse } from "../mixins/parseXML.js";

import NCBICard from "@/components/NCBICard";

export const api = axios.create({
  baseURL: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
  params: {
    api_key: "b9738c5edcf44869023450448e7494065807"
  }
});

export default {
  name: "NCBI",
  mixins: [xmlParse],
  components: {
    NCBICard
  },
  data: () => {
    return {
      searchInput: "",
      result: []
    };
  },
  methods: {
    async getNcbi() {
      try {
        const response = await api.get("epost.fcgi", {
          params: {
            db: "gene",
            id: this.searchInput
          }
        });

        const xmlParsed = this.parseXml(response.data);
        const xmlJson = this.toJson(xmlParsed).replace("undefined", "");
        const { QueryKey, WebEnv } = JSON.parse(xmlJson).ePostResult;

        const result = await api.get("efetch.fcgi", {
          params: {
            db: "gene",
            query_key: QueryKey,
            WebEnv: WebEnv,
            rettype: "fasta",
            retmode: "text"
          }
        });

        const newArray = [];

        this.searchInput.split(",").forEach((element, index) => {
          const i = result.data.indexOf(`${index + 1}. `);
          const genString = result.data.slice(
            i,
            result.data.indexOf(`${index + 2}. `)
          );

          const gene = {};

          genString.split("\n").forEach((linea, index) => {
            if (index > 0 && linea.length > 0) {
              const lineaArray = linea.split(":");
              const key = lineaArray[0];
              const value = lineaArray
                .filter((sentence, index) => index > 0)
                .join(":")
                .trim();

              Object.assign(gene, { [key]: value });
            }
          });

          newArray.push(gene);
        });

        this.result = newArray;
      } catch (err) {
        this.result = [];
        console.error(err);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.databases {
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

  .search-by {
    margin-right: 0px;
    margin-bottom: 15px;
  }
}
</style>
