<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            :src="`${apiDomain}/uploads/files_user/${userSingll.photo}`"
            class="c-avatar-img"
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Compte</strong>
    </CDropdownHeader>

    <CDropdownItem v-if="loggedIn && this.$store.state.user.role == 1">
      <CIcon name="cil-user" />
      <CHeaderNavLink style="color: #605f6b" to="/profile/client">
        Profile
      </CHeaderNavLink>
    </CDropdownItem>

    <CDropdownItem v-if="loggedIn && this.$store.state.user.role == 2">
      <CIcon name="cil-user" />
      <CHeaderNavLink style="color: #605f6b" to="/profile/secretaire">
        Profile
      </CHeaderNavLink>
    </CDropdownItem>

    <CDropdownItem v-if="loggedIn && this.$store.state.user.role == 3">
      <CIcon name="cil-user" />
      <CHeaderNavLink style="color: #605f6b" to="/profil/medecin">
        Profile
      </CHeaderNavLink>
    </CDropdownItem>

    <!-- <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem> -->

    <CDropdownDivider />

    <CDropdownItem>
      <CIcon name="cil-lock-locked" />
      <router-link to="/" style="color: #496664">
        <!--  <CIcon name="cil-settings" />  -->
        <span @click.prevent="performLogout">Se déconnecter</span>
      </router-link>
      <!-- 
   <CIcon name="cil-lock-locked"/> 
       <CHeaderNavLink  @click.prevent="performLogout" style="color:#605f6b;">
          logout
        </CHeaderNavLink>
 -->
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { apiDomain } from "../config";
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      apiDomain: "http://localhost:8000",
      token: null,
      itemsCount: 42,
      userSingll: {},
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
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
          this.$router.push("/");
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

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>