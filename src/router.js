import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "news" */ './views/News.vue')
    },
    {
      path: '/citations',
      name: 'citations',
      component: () => import(/* webpackChunkName: "citations" */ './views/Citations.vue')
    },
    {
      path: '/NCBI',
      name: 'NCBI',
      component: () => import(/* webpackChunkName: "NCBI" */ './views/NCBI.vue')
    },
    {
      path: '/uniprot',
      name: 'Uniprot',
      component: () => import(/* webpackChunkName: "uniprot" */ './views/Uniprot.vue')
    },
    {
      path: '/clustal-omega',
      name: 'ClustalOmega',
      component: () => import(/* webpackChunkName: "clustal-omega" */ './views/ClustalOmega.vue')
    },
    {
      path: '/NCBI-blast',
      name: 'NCBIBlast',
      component: () => import(/* webpackChunkName: "NCBI-Blast" */ './views/NCBIBlast.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
