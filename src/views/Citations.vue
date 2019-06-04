<template>
  <article class="clustal-omega">
    <section class="title-container">Citations</section>

    <!-- Search filters -->
    <section class="filters-container">
      <div class="filters">
        <!-- Search by -->
        <div class="search-by">
          <el-select clearable v-model="selectValue" placeholder="Select filter">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <!-- Search value -->
        <div class="search-value">
          <el-input placeholder="Type something" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
        </div>

        <!-- Search button -->
        <div class="search-button">
          <el-button @click="getCatalog()" type="primary">Search</el-button>
        </div>
      </div>
    </section>

    <div class="filter" v-if="catalogs || catalogs.length > 0">
      <div v-for="(catalog, index) in catalogs" :key="index">
        <CitationsCard
          v-if="catalog"
          :title="catalog.title || ''"
          :type="catalog.type || ''"
          :year="catalog.year || ''"
          :authors="catalog.authors || ''"
          :source="catalog.srouce || ''"
          :pages="catalog.pages || ''"
          :doi="catalog && catalog.identifiers && catalog.identifiers.doi ? catalog.identifiers.doi : ''"
        />
      </div>

      <el-button
        v-if="catalogs && catalogs.length > 0"
        @click="getCatalog(10)"
        type="primary"
      >Load More Results</el-button>
    </div>

    <!-- Right column: no results -->
    <div
      v-if="!catalogs || catalogs.length === 0"
      class="results-container no-results"
    >No catalogs found</div>
  </article>
</template>

<script>
import axios from "axios";
import CitationsCard from "@/components/CitationsCard";

export const mendeleyAPI = function(token) {
  if (token) {
    return axios.create({
      baseURL: "https://api.mendeley.com/search/",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    new Error("No token provided");
  }
};

export default {
  name: "Citations",
  components: {
    CitationsCard
  },
  data: () => {
    return {
      options: [
        {
          value: "author",
          label: "Author"
        },
        {
          value: "title",
          label: "Title"
        },
        {
          value: "source",
          label: "Source"
        }
      ],
      selectValue: "",
      searchInput: "",
      catalogs: [],
      limit: 10,
      token:
        "MSwxNTU4MjgwODEzODM0LDU0NzEyMDAzMSwxMDI4LGFsbCwsLGI5MTVkZWU3MWI2MzE5NDYxNzM4YmRiMTU2NTY0ODNhNjI4MGd4cnFiLDhkOThmN2M5LTdmNjktM2U5ZC05MjhhLTJkMGM4YzU1N2E5ZSxqNGRwcU4xdVhad2poSG8zV3M1aFZBa0YxNUk"
    };
  },
  created: function() {
    const token = this.$cookie.get("accessToken");
    if (!token) {
      this.$router.push("/");
    }
  },
  methods: {
    getCatalog(newLimit) {
      if (newLimit) {
        this.limit += newLimit;
      } else {
        this.limit = 10;
      }

      const token = this.$cookie.get("accessToken");

      if (token) {
        const api = mendeleyAPI(token);

        if (!this.selectValue) {
          api
            .get(`catalog`, {
              params: {
                query: this.searchInput,
                view: "bib"
              }
            })
            .then(response => {
              console.log(response);
              this.catalogs = response.data;
            })
            .catch(e => {
              if (e.response) {
                if (e.response.status === 401) {
                  this.$cookie.delete("accessToken");
                  this.$router.push("/");
                }
              }
              this.catalogs = [];
            });
        } else {
          api
            .get(`catalog`, {
              params: {
                [this.selectValue]: this.searchInput,
                limit: this.limit,
                view: "bib"
              }
            })
            .then(response => (this.catalogs = response.data))
            .catch(e => {
              if (e.response) {
                if (e.response.status === 401) {
                  this.$cookie.delete("accessToken");
                  this.$router.push("/");
                }
              }
              this.catalogs = [];
            });
        }
      } else {
        this.$router.push("/");
      }
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
  justify-content: flex-start;
  /* Si quieres centrarlo horizontalmente */
  /* justify-content: center; */
  align-items: center;
}

.search-by {
  margin-right: 15px;
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
    flex-direction: column;
    justify-content: center;
  }

  .search-by {
    margin-bottom: 15px;
  }
  .search-value {
    margin-bottom: 15px;
  }
}
</style>
