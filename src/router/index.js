import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Index_2 from '../views/Index_2.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      index: 1,
      keepAlive: true
    }
  },
  {
    path: '/index_2',
    name: 'index_2',
    component: Index_2
  },
  {
    path: '/daily_page/:id',
    name: 'daily_page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/DailyPage.vue'),
    meta: {
      index: 2,
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router