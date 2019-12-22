import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'myOrder',
      component: () => import(/* webpackChunkName: "myOrder" */ './module/myOrder.vue')
    },
    {
      path: '/download',
      name: 'download',
      component: () => import(/* webpackChunkName: "download" */ './module/download.vue')
    },
    {
      path: '/person',
      name: 'person',
      component: () => import(/* webpackChunkName: "person" */ './module/person.vue')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import(/* webpackChunkName: "withdraw" */ './module/withdraw.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(route => {
  
})

export default router
