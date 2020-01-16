import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'editeInfo',
      component: () => import(/* webpackChunkName: "editeInfo" */ './module/editeInfo.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import(/* webpackChunkName: "payment" */ './module/payment.vue')
    },
    {
      path: '/succeed',
      name: 'succeed',
      component: () => import(/* webpackChunkName: "succeed" */ './module/succeed.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import(/* webpackChunkName: "checkout" */ './module/checkout.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(route => {
  
})

export default router
