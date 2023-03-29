import Vue from "vue";
import Router from "vue-router";
import store from "./store";

const TheContainerAccueil = () => import("@/containers/TheContainerAccueil");

const TheContainer = () => import("@/containers/TheContainer");
const TheContainerAdmin = () => import("@/containersAdmin/TheContainer");

Vue.use(Router);

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: "/home",
      redirect: "/home/dashboard",
      name: "Home",
      component: TheContainer,
      beforeEnter: (to, from, next) => {
        if (store.state.loggedIn == true) {
          if (store.state.user.role == 1) next();
          else {
            next("/");
          }
        } else {
          next("/");
        }
      },

      children: [
     

        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/pages/Dashboard/listesNumeros.vue"),
        },
      ],
    },

    //admin
{
  path: "/home",
  redirect: "/home/dashboard",
  name: "Home",
  component: TheContainerAdmin,
  beforeEnter: (to, from, next) => {
    if (store.state.loggedIn == true) {
      if (store.state.user.role == 2) next();
      else {
        next("/");
      }
    } else {
      next("/");
    }
  },

  children: [
 

    {
      path: "/ajouter-numero/:id",
      name: "ajouter-numero",
      component: () => import("@/pages/Admin/AjouterNumeros.vue"),
    },

    {
      path: "/listes-emps",
      name: "listes-emps",
      component: () => import("@/pages/Admin/listesEmp.vue"),
    },

    
  ],
},
    {
      path: "/",
      redirect: "/accueil",
      name: "controle",
      component: TheContainerAccueil,
      children: [
        {
          path: "/",
          name: "inscription",
          component: () => import("@/pages/Home/connection.vue"),
        },
        {
          path: "/inscription",
          name: "inscription",
          component: () => import("@/pages/Home/register.vue"),
        },

        {
          path: "/connection",
          name: "connection",
          component: () => import("@/pages/Home/connection.vue"),
        },
        {
          path: "/admin",
          name: "connection-admin",
          component: () => import("@/pages/Home/connectionAdmin.vue"),
        },

         {
          path: "/test2",
          name: "test2",
          component: () => import("@/pages/Home/test2.vue"),
        },

        
        
      ],
    },
  ];
}
