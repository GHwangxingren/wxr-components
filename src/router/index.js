import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/title"
  },
  {
    path: "/title",
    name: "title",
    component: () => import("@/pages/title/title")
  },
  {
    path: "/form",
    name: "form",
    component: () => import("@/pages/form/form")
  },
  {
    path: "/element",
    name: "element",
    component: () => import("@/pages/element/element")
  },
  {
    path: "/checkBox",
    name: "checkBox",
    component: () => import("@/pages/checkBox/index")
  }
];
const router = new Router({
  mode: "history",
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
