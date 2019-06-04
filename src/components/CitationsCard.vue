<template>
  <div class="card">
    <div class="grid-content news">
      <h2>{{ title }} - {{ year }} ({{ type }})</h2>
      <p>{{ citationFormated }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CitationCard",
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
      required: true
    },
    source: {
      type: String,
      required: true
    },
    pages: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    doi: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      msg: "News Page"
    };
  },
  computed: {
      citationFormated: function() {
        let authors = '';
        if (this.authors) {
            this.authors.forEach((author, index) => {
                if (index > 0) {
                    authors += `, ${author.last_name} ${author.first_name}`;
                } else {
                    authors += `${author.last_name} ${author.first_name}`;
                }
            });
        }

        return `${authors} ${this.title}, ${this.source}, ${this.pages}, ${this.year}, ${this.doi}`;
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
