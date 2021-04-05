import Vue from 'vue'
import VueRouter from 'vue-router'
import waitingRoom from '../views/waitingRoom.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'waitingRoom',
    component: waitingRoom
  },
  {
    path: '/accueil',
    name: 'accueil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/accueil.vue')
  },
  {
    path: '/add',
    name: 'add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/addCarte.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/search.vue')
  },
  {
    path: '/each/:id(\\d+)',
    name: 'each',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/carteEach.vue')
  },
  {
    path: '/eachswap/:id(\\d+)',
    name: 'eachswap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/carteEachBis.vue')
  },
  {
    path: '/modification/:id(\\d+)',
    name: 'modification',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/modifyCarte.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
