import Vue from "vue";
import Router from "vue-router";
import Accueil from "./views/Accueil.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "accueil",
      component: Accueil
    },
    {
      path: "/controle",
      name: "controle",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Controle.vue")
    },
    {
      path: "/importation",
      name: "importation",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Importation.vue")
    }
  ]
});
