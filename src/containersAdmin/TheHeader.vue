<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/">
          <div class="icons8-accueil"></div>
        </CHeaderNavLink>
      </CHeaderNavItem>

      <!--  <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/home"> Dashboard </CHeaderNavLink>
      </CHeaderNavItem> -->

      <CHeaderNavItem class="px-3 iii">
        <CHeaderNavLink to="/listes-emps">
          Listes Téléopérateurs
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <div>
          <!--  <img
         :src="`${apiDomain}/espace-client-white.gif`"
          class="img"
          width="100%"
        /> -->
        </div>
      </CHeaderNavItem>
    </CHeaderNav>

    <CHeaderNav class="mr-4">
      <div></div>

      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
  </CHeader>
</template>


<script>

import axios from "axios";
import { apiDomain } from "../config";
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
export default {
  components: {
    TheHeaderDropdownAccnt
  },
  /*  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
  }, */
  props: {
    user: {
      type: Object,
      required: true,
    },
    contacts: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      apiDomain: "http://localhost:8000",
      modalContacterClient: false,

      selectedContact: null,
      messages: [],
      contacts: [],

      /*  */
      LastMsg: [],
      locale: "fr",

      AllNotificationMsg: [],
      AllNotificationMsgg: [],
      /* new notif messg */
      NotificationContacts: {},
      NotificationMessages: [],

      unreadNoification: [],
      unreadNotMes: [],
      unreadMSG: [],
      getNotification: [],
      gg: [],
      unreadMSGG: 2,
      unreadNotMessage: [],
      allNotif: {},
      infoModal: false,
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },

    /*   singlepost(){
                return this.$store.getters.singlepost
            } */
  },

  mounted() {},
  created() {
    /* 
    console.log('user' ,window.user); */

    //this.allNotif= window.user.notifications ;

    console.log("user", window.user);
  },

  methods: {
    getName() {
      var i;
      for (i = 0; i < getNotification.length; i++) {
        for (h = 0; h < getNotification[0].M.length; h++) {}
      }
    },

    //afficher mes reponse  de mon contact
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.my-class /deep/ .dropdown-menu {
  max-height: 500px;
  min-width: 250px;
  overflow-y: auto;
}

.dropdown-menu {
  position: absolute;
  top: 97%;
  left: -188px;
  margin-left: 20px;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 25rem;
  padding: 0.5rem 0;
  margin: 0.15rem 0 0;
  font-size: 0.875rem;
  text-align: left;
  list-style: none;
  background-clip: padding-box;
  border: 1px solid;
  border-radius: 0.25rem;
  color: #4f5d73;
  background-color: #fff;
  border-color: #d8dbe0;
}

/* .aa1{
  margin-top: 20px;
}

.aa4{
  margin-top: 20px;
} */

.a {
  text-decoration: none;
  background-color: transparent;
  color: #181a1b;
  display: block;
}

.v-time-ago__texttt {
  // font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 10px;
  cursor: pointer;

  //  color:   #fff !important;
  margin-left: -85px;
  text-decoration: none;
  line-height: 20px;
  background: #08ff48;
}
.footer {
  text-align: center;
}
.dropdown-header {
  display: block;
  padding: 0.2rem;
  margin: 5px;
  left: -188px;
  /* margin-bottom: 0; */
  /* font-size: 0.76563rem; */
  /* white-space: nowrap; */
  /* color: #8a93a2; */
}
html:not([dir="rtl"]) .dropdown-menu {
  left: -188px;
}
.contacts-list {
  flex: 5;
  max-height: 100%;
  height: 200px;
  overflow: scroll;
  /* border-left: 1px solid #a6a6a6; */

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      display: flex;
      padding: 2px;
      // border-bottom: 1px solid #aaaaaa;
      height: 65px;
      /*   border-bottom: 1px solid #aaaaaa;
            height: 56px; */
      position: relative;
      cursor: pointer;

      &.selected {
        background: #be1b1b;
      }

      span.unread {
        background: #f80404;

        color: #fff;
        position: absolute;

        right: 0px;
        margin-top: -34px;
        border-radius: 24px !important;
        font-weight: 700;

        justify-content: center;
        align-items: center;

        font-size: 10px;
        padding: 0 4px;
        border-radius: 3px;
      }
      .lastMsg {
        font-size: 15px;
        margin-top: -13px;
        left: -13px;
      }

      .avatar {
        flex: 1;
        display: flex;
        align-items: center;
        margin-top: -46px;

        img {
          // width: 40px;
          border-radius: 50%;
          // margin: 0 auto;
          margin-top: 40px;
        }
      }

      .contact {
        flex: 3;
        font-size: 12px;

        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .date {
          font-weight: bold;
          margin-top: 30px;
          right: -40px;
        }

        p {
          /*  margin: 10px ; */

          &.name {
            font-weight: bold;
            margin-top: 12px;
            font-size: 15px;
          }
        }
      }
    }
  }
}

.avtarr {
  display: inline-block;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  vertical-align: middle;
  overflow: hidden;
}
.sc-chat-window[data-v-08d4c038] {
  width: 371px;
  height: calc(100% - 210px);
  max-height: 590px;
  position: fixed;
  right: 129px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-animation: fadeIn-data-v-08d4c038;
  animation: fadeIn-data-v-08d4c038;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}
/* vue chat */
.sc-header {
  top: 10px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  box-sizing: border-box;
  display: flex;
}

.icons8-accueil {
  display: inline-block;
  width: 36px;
  height: 51px;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48Zz48cGF0aCBkPSJNMi42NTM5MSw4NmMwLC00Ni4wMjM0NCAzNy4zMjI2NiwtODMuMzQ2MDkgODMuMzQ2MDksLTgzLjM0NjA5YzQ2LjAyMzQ0LDAgODMuMzQ2MDksMzcuMzIyNjYgODMuMzQ2MDksODMuMzQ2MDljMCw0Ni4wMjM0NCAtMzcuMzIyNjYsODMuMzQ2MDkgLTgzLjM0NjA5LDgzLjM0NjA5Yy00Ni4wMjM0NCwwIC04My4zNDYwOSwtMzcuMzIyNjYgLTgzLjM0NjA5LC04My4zNDYwOXoiIGZpbGw9IiMzNDk4ZGIiPjwvcGF0aD48cGF0aCBkPSJNMTM3LjA5NjA5LDY5LjQ3MTg4bC01MC40MjQyMiwtMjUuMTYxNzJjLTAuNDM2NzIsLTAuMjAxNTYgLTAuOTA3MDMsLTAuMjAxNTYgLTEuMzQzNzUsMGwtNTAuNDU3ODEsMjUuMTYxNzJjLTAuNTcxMDksMC4yNjg3NSAtMC45MDcwMywwLjgwNjI1IC0wLjkwNzAzLDEuNDQ0NTN2OS45NDM3NWMwLDAuNTM3NSAwLjI2ODc1LDEuMDQxNDEgMC43MzkwNiwxLjM0Mzc1YzAuNDcwMzEsMC4zMDIzNCAxLjA0MTQxLDAuMzM1OTQgMS41MTE3MiwwLjEwMDc4bDQ5Ljc4NTk0LC0yNC44NTkzOGw0OS43NTIzNCwyNC44NTkzOGMwLjIwMTU2LDAuMTAwNzggMC40MzY3MiwwLjE2Nzk3IDAuNjcxODgsMC4xNjc5N2MwLjMwMjM0LDAgMC42MDQ2OSwtMC4wNjcxOSAwLjgzOTg0LC0wLjIzNTE2YzAuNDcwMzEsLTAuMzAyMzQgMC43MzkwNiwtMC44MDYyNSAwLjczOTA2LC0xLjM0Mzc1di0xMC4wMTA5NGMwLC0wLjYwNDY5IC0wLjMzNTk0LC0xLjE3NTc4IC0wLjkwNzAzLC0xLjQxMDk0eiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjcuODI0MjIsODIuNTczNDRsLTQxLjgyNDIyLC0yMC44MjgxMmwtNDEuODI0MjIsMjAuODI4MTJ2MzguNjMyODFoMjMuMTc5Njl2LTI5LjYyOTY5aDE1Ljk1NzAzdjI5LjYyOTY5aDQ0LjUxMTcyeiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik04OC41ODY3Miw5MS41NzY1NmgxMC43NXYxMC43NWgtMTAuNzV6IiBmaWxsPSIjZWE0OTQ5Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=")
    50% 50% no-repeat;
  background-size: 100%;
}
/* .sc-chat-window {
    width: 370px;
    height: calc(75% - 120px);
    max-height: 590px;
    top: 79px;
    position: fixed;
    right: 95px;
    bottom: 100px;
    box-sizing: border-box;
    box-shadow: 0 7px 40px 2px rgba(148,149,150,.1);
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    -webkit-animation: fadeIn-data-v-08d4c038;
    animation: fadeIn-data-v-08d4c038;
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
} */

.contacts-list2 {
  flex: 5;
  max-height: 100%;
  height: 350px;
  overflow: scroll;
  /* border-left: 1px solid #a6a6a6; */

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      display: flex;
      padding: 2px;
      // border-bottom: 1px solid #aaaaaa;
      height: 65px;
      /*   border-bottom: 1px solid #aaaaaa;
            height: 56px; */
      position: relative;
      cursor: pointer;

      &.selected {
        background: #be1b1b;
      }

      .lastMsg {
        font-size: 15px;
        margin-top: -13px;
        left: -13px;
      }

      .avatar {
        flex: 1;
        display: flex;
        align-items: center;
        margin-top: -46px;

        img {
          // width: 40px;
          border-radius: 50%;
          // margin: 0 auto;
          margin-top: 40px;
        }
      }

      .contact {
        flex: 3;
        font-size: 12px;

        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .date {
          font-weight: bold;
          margin-top: 30px;
          right: -40px;
        }

        p {
          /*  margin: 10px ; */

          &.name {
            font-weight: bold;
            margin-top: 12px;
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>



