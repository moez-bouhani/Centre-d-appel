<template>
  <navbar
    class="mmm"
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link style="color: #fff" v-popover:popover1 to="/">
        Center d'appel Achref
      </router-link>
    </template>
    <template slot="navbar-menu">
      

      <li class="nav-item" v-if="!loggedIn">
        <router-link class="nav-link btn btn-info marg" to="/inscription">
          <p>S'inscrire</p>
        </router-link>
      </li>

      <li class="nav-item" v-if="!loggedIn">
        <router-link class="nav-link btn btn-depanneur" to="/connection">
          <p>Connection</p>
        </router-link>
      </li>
      <!--   style="margin-left: 90px; margin-top: -4px" -->
      <li class="photo" v-if="loggedIn && this.$store.state.user.role == 3">
        <TheHeaderDropdownAccnt />
      </li>
      <li class="photo" v-if="loggedIn && this.$store.state.user.role == 2">
        <TheHeaderDropdownAccnt />
      </li>
      <li class="photo" v-if="loggedIn && this.$store.state.user.role == 1">
        <TheHeaderDropdownAccnt />
      </li>
    </template>
  </navbar>
</template>

<script>
import TheHeaderDropdownAccnt from "./../containers/TheHeaderDropdownAccnt";

import { DropDown, NavbarToggleButton, Navbar, NavLink } from "@/components";
/* import { Popover } from "element-ui"; */
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    TheHeaderDropdownAccnt,
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
 /*    [Popover.name]: Popover, */
  },
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
};
</script>

<style lang="scss" scoped>
.rrr {
  color: rgba(24, 31, 41, 0.92);
}

@-webkit-keyframes clignote {
  0% {
    box-shadow: 0px 0px 10px #1bb930;
  }
  50% {
    box-shadow: 0px 0px 0px #1bb930;
  }
  100% {
    box-shadow: 0px 0px 10px #1bb930;
  }
}

.bc {
  font-weight: bold;
  text-shadow: 0 1px 0 white;
  border-radius: 3px;
  margin-top: 9px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 10px #1bb930;
  -webkit-animation-name: clignote; //on affecte l'animation clignote à notre bouton
  -webkit-animation-duration: 1s; //on définit la durée de l'animation à 1s
  -webkit-animation-iteration-count: infinite; //on dit que l'animation se répétera à l'infini.
}
.photo {
  position: absolute;
  top: 15px;
  left: 1234px;
}
.navbar a:not(.btn):not(.dropdown-item) {
  color: #322e2e;
}

.btn-success:hover,
.btn-success:focus,
.btn-success:not(:disabled):not(.disabled):active,
.btn-success:not(:disabled):not(.disabled).active,
.btn-success:not(:disabled):not(.disabled):active:focus,
.btn-success:not(:disabled):not(.disabled).active:focus,
.btn-success:active:hover,
.btn-success.active:hover,
.show > .btn-success.dropdown-toggle,
.show > .btn-success.dropdown-toggle:focus,
.show > .btn-success.dropdown-toggle:hover {
  background-color: #ebedef;
  color: #2d343a;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.btn-info:hover,
.btn-info:focus,
.btn-info:not(:disabled):not(.disabled):active,
.btn-info:not(:disabled):not(.disabled).active,
.btn-info:not(:disabled):not(.disabled):active:focus,
.btn-info:not(:disabled):not(.disabled).active:focus,
.btn-info:active:hover,
.btn-info.active:hover,
.show > .btn-info.dropdown-toggle,
.show > .btn-info.dropdown-toggle:focus,
.show > .btn-info.dropdown-toggle:hover {
  background-color: #e2ecf3;
  color: #2d343a;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.btn-danger:hover,
.btn-danger:focus,
.btn-danger:not(:disabled):not(.disabled):active,
.btn-danger:not(:disabled):not(.disabled).active,
.btn-danger:not(:disabled):not(.disabled):active:focus,
.btn-danger:not(:disabled):not(.disabled).active:focus,
.btn-danger:active:hover,
.btn-danger.active:hover,
.show > .btn-danger.dropdown-toggle,
.show > .btn-danger.dropdown-toggle:focus,
.show > .btn-danger.dropdown-toggle:hover {
  background-color: #e2ecf3;
  color: #2d343a;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.btn:hover,
.btn:focus,
.btn:not(:disabled):not(.disabled):active,
.btn:not(:disabled):not(.disabled).active,
.btn:not(:disabled):not(.disabled):active:focus,
.btn:not(:disabled):not(.disabled).active:focus,
.btn:active:hover,
.btn.active:hover,
.show > .btn.dropdown-toggle,
.show > .btn.dropdown-toggle:focus,
.show > .btn.dropdown-toggle:hover,
.navbar .navbar-nav > a.btn:hover,
.navbar .navbar-nav > a.btn:focus,
.navbar .navbar-nav > a.btn:not(:disabled):not(.disabled):active,
.navbar .navbar-nav > a.btn:not(:disabled):not(.disabled).active,
.navbar .navbar-nav > a.btn:not(:disabled):not(.disabled):active:focus,
.navbar .navbar-nav > a.btn:not(:disabled):not(.disabled).active:focus,
.navbar .navbar-nav > a.btn:active:hover,
.navbar .navbar-nav > a.btn.active:hover,
.show > .navbar .navbar-nav > a.btn.dropdown-toggle,
.show > .navbar .navbar-nav > a.btn.dropdown-toggle:focus,
.show > .navbar .navbar-nav > a.btn.dropdown-toggle:hover {
  background-color: #e2ecf3;
  color: #2d343a;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>