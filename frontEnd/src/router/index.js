import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '../views/Index.vue'
import Article from '../views/article.vue'
import About from '../views/about.vue'

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/article/:id',
      name: 'Article',
      component:Article
    },
    {
      path: '/about',
      name: 'About',
      component:About
    }
  ]
})

export default router
