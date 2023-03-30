<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <!-- logo and name -->

     <h4>NFON</h4> 

      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <!-- <SidebarNavItem :classes="item.class">
      <SidebarNavLink
        :name="item.name"
        :url="item.url"
        :icon="item.icon"
        :badge="item.badge"
        :variant="item.variant"
      />
    </SidebarNavItem> --><!--  -->

    <!--  <CRenderFunction
      flat
      :content-to-render="$options.nav"
      v-if="user.role == 1"
    /> -->

    <CRenderFunction flat :content-to-render="$options.nav" />

    <!-- <div v-if="user.role == 1  && sidebarLink.meta === 'forClient'"  v-for="(sidebarLink, index) in sidebarLinks" >
            <vs-sidebar-item :icon="sidebarLink.icon" :to="sidebarLink.url" :key="`sidebarLink-${index}`" :index="index">
              <span class="hide-in-minisidebar">{{ sidebarLink.name }}</span>
            </vs-sidebar-item>
        </div>  -->

    <!-- <template v-else>
              <template v-if="item.meta === 'forAuth' && $auth.isContactPerson() === true">
                <SidebarNavItem :classes="item.class">
                  <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
                </SidebarNavItem>
              </template>
              <template v-if="$auth.isAdmin() === true">
                <SidebarNavItem :classes="item.class">
                  <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
                </SidebarNavItem>
              </template>
            </template> -->

    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

import { apiDomain } from "../config";
export default {
  name: "TheSidebar",
  nav,

  props: {
    contentToRender: "test",

    _children: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      apiDomain: "http://localhost:8000",
      token: null,
      itemsCount: 42,
      userSingll: {},
    };
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },

    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },

    /*  */

    navItems() {
      return [
        {
          _name: "CSidebarNav",
          _children: this.sidebarNavChildren,
        },
      ];
    },
    sidebarNavChildren() {
      return menuItems.map((menuItem) => {
        return {
          _name: "CSidebarNavItem",
          name: menuItem.name,
          to: menuItem.to,
          icon: menuItem.icon || "cil-spreadsheet",
        };
      });
    },
    /*  */
  },

  created() {
    this.fetchuserSingl(this.$store.state.user.id);
  },
  methods: {
    performLogout() {
      this.$store
        .dispatch("performLogoutAction")
        .then((res) => {
          this.$noty.success("Déconnexion réussie.");
          this.$router.push("/loginClient");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //show user by id
    fetchuserSingl(id) {
      fetch(`${apiDomain}/api/user/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.userSingll = res.user;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
