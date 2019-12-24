import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'detail',
      component: () => import(/* webpackChunkName: "detail" */ './module/detail.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ './module/cart.vue')
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import(/* webpackChunkName: "pay" */ './module/pay.vue'),
      props: true
    },
    {
      path: '/success',
      name: 'success',
      component: () => import(/* webpackChunkName: "success" */ './module/success.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(route => {
  
})

export default router
