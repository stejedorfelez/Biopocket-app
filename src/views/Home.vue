<template>
  <div class="home">
    <!-- Home title -->
    <HelloWorld msg="Biopocket" description="This WebApp aims to help the researchers in their daily work, merging all the most important bioinformatic softwares in one, making everything easier."/>

    <!-- Home cards list -->
    <div class="cards-list">
      <div v-for="(menuOption, index) in menu" :key="index" class="card">
        <MenuCard
          :title="menuOption.title"
          :description="menuOption.description"
          :route="menuOption.route"
          :icon="menuOption.icon"
        />
      </div>
    </div>

    <!-- Home two lists-->
    <div class="two-col-list">
      <!-- Left column -->
      <div class="col-right">
        <div class="list-title">
          <span class="glyphicon glyphicon-info-sign"></span> How Biopocket works
        </div>
        <ul class="interesting-links">
          <li>This app was builded with javascript and deployed to Netlify using a Git Repository to keep the code.</li>
          <li>The app has four principal features to offer the researcher.</li>
          <ul>
            <li
              type="circle"
            >News: In this section the app gets connected with the Mendeley server and provides access to the most important reviews and articles linked to the full information in Mendeley.</li>
            <li
              type="circle"
            >Databases: Allows the user to make different connections with databases to search genes and proteins of interest.</li>
            <li
              type="circle"
            >Analytics: The app stablishes a connection with the NCBI Blast server and the Clustal Omega server to perform different analysis.</li>
            <li
              type="circle"
            >Citations: This section is based in a Mendeley connection to save references or share articles.</li>
          </ul>
          <li>You can learn more things related with this app in the About Us section.</li>
        </ul>
      </div>
      <!-- Right column -->
      <div class="col-left">
        <div class="list-title">
          <span class="glyphicon glyphicon-link"></span> Helpful Links
        </div>
        <ul class="interesting-links">
          <li v-for="link of interestingLinks" :key="link.value">
            <a :href="link.value">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <el-alert
        class="info"
        center
        title="If you use this service in your work, please, cite us as Development of an application as a diary useful tool for bioinformatics: Biopocket"
        type="info"
        show-icon
      ></el-alert>
    </footer>
  </div>
</template>

<script>
const sdk = require("@mendeley/api");

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MenuCard from "@/components/MenuCard.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    MenuCard
  },
  data: () => {
    return {
      interestingLinks: [
        { value: "https://www.ncbi.nlm.nih.gov/", label: "NCBI" },
        { value: "https://www.scopus.com", label: "Scopus" },
        { value: "https://usegalaxy.org/", label: "Galaxy" },
        { value: "https://www.expasy.org", label: "Expasy" },
        { value: "https://genome.ucsc.edu", label: "UCSC Genome Browser" },
        { value: "https://www.ensembl.org", label: "Ensembl" },
        { value: "https://www.geneontology.org", label: "Gene Ontology" },
        { value: "https://www.rcsb.org", label: "PDB" },
        { value: "https://www.uniprot.org", label: "UniProt" },
        { value: "https://www.cathdb.info", label: "CATH" },
        { value: "https://www.drugbank.ca", label: "Drugbank" },
        { value: "https://www.omim.org", label: "OMIM" },
        { value: "https://www.nature.com", label: "Nature" },
        { value: "https://www.science.com", label: "Science" }
      ],
      menu: [
        {
          title: "News",
          description: "Find Mendeley articles",
          icon: "el-icon-document-copy",
          route: "news"
        },
        {
          title: "Databases",
          description: "In Develpoment",
          icon: "el-icon-coin",
          route: "/NCBI"
        },
        {
          title: "Analytics",
          description: "In Develpoment",
          icon: "el-icon-s-data",
          route: "/clustal-omega"
        },
        {
          title: "Citations",
          description: "Find Mendeley citations",
          icon: "el-icon-chat-dot-square",
          route: "citations"
        }
      ]
    };
  },
  created: function() {
    const token = this.$cookie.get('accessToken');
    if (!token) {
      this.authentication();
    }
  },
  methods: {
    authentication() {
      sdk({
        authFlow: sdk.Auth.implicitGrantFlow({
          clientId: 6962,
          redirectUrl: "https://biopocket-app.netlify.com/"
        })
      });
    }
  }
};
</script>

<style scoped>
.home .cards-list {
  margin-top: -50px;
  padding: 0 20px;
  display: flex;
}

.home .cards-list .card {
  flex: 1 1 0;
}

.home .cards-list .card:not(:last-child) {
  margin-right: 15px;
}

.two-col-list {
  padding: 0 20px;
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.two-col-list .col-left {
  flex: 0.5 1 0;
}

.two-col-list .col-right {
  flex: 1 1 0;
}

.two-col-list .list-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #347ABF;
}

.two-col-list .interesting-links {
  color: rgba(0, 0, 0, 0.7);
  font-family: "Roboto", "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
  font-size: 18px;
  font-weight: 400;
  padding-left: 20px;
}
.col-right {
  margin-left: 15%;
}

.col-left {
  margin-left: 10px;
  margin-right: 15%;
}

a {
  color: #2196F3;
  text-decoration: none;
  text-transform: uppercase;
}

.footer {
  position: static;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

@media (max-width: 768px) {
  .home .cards-list {
    display: block;
  }
  .home .cards-list .card {
    margin-bottom: 15px;
  }
  .home .cards-list .card:not(:last-child) {
    margin-right: 0px;
  }
  .two-col-list {
    display: block;
  }
  .col-right {
    margin-left: 0;
  }
  .col-left {
    margin-left: 0px;
    margin-right: 0;
  }
  .footer {
    position: static;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
