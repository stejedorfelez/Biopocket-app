<template>
  <div class="card" @click="navigateTo(link)">
    <div class="grid-content news">
      <h2>{{ title }} - {{ year }} ({{ type }})</h2>
      <h3 class="authors">{{ author }}</h3>

      <p>{{ abstract }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogCard",
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    authors: {
      type: Array,
      required: true
    },
    abstract: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    link: {
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
        window.open(route, '_blank');
    }
  },
  computed: {
      author: function() {
        let authors = 'Authors: ';
        this.authors.forEach((author, index) => {
            if (index > 0) {
                authors += ` | ${author.first_name} ${author.last_name}`;
            } else {
                authors += `${author.first_name} ${author.last_name}`;
            }
        });
        return authors;
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

.authors {
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
}

h2 {
  color:rgb(44, 44, 44);
}
</style>
