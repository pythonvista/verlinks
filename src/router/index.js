import Vue from "vue";

import VueRouter from "vue-router";

import HomeView from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresGuest: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let User = JSON.parse(localStorage.getItem("activeUser"));
  // console.log(this.$store.activeUser)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (User) {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!User) {
      next();
    } else {
      next({ path: "/dashboard", query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
