import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL
});
router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(route => {});

export default router;
