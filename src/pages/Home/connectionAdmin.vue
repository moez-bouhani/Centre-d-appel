<template>
  <div>
    <br /><br /><br />

    <div class="row loginClient">
      <div class="col-md-3"></div>

      <div class="col-md-4"></div>

      <div class="col-md-4">
        <CCard class="p-4" style="border-radius: 20px;">
          <CCardBody>
            <CForm @submit.prevent="performLogin">
              <center>
                <h1 style="color: #c90f2b">Login Admin</h1>
               <!--  <p class="text-muted">Session patient</p> -->
              </center>
              <div class="row">
                <div class="col-md-12">
                  <CInput
                    required
                    placeholder="Entrer votre telephone ..."
                    v-model="telephone"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <!-- <span class="text-red" v-if="errors.login">{{
                    errors.login[0]
                  }}</span> -->
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <CInput
                    required
                    placeholder="Entrer votre mot de passe ..."
                    :type="show === true ? 'text' : 'password'"
                    v-model="password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>

                  <div>
                    <!--  <input
                      class="form-control"
                      placeholder="votre mot de passe ..."
                      :type="show === true ? 'text' : 'password'"
                      id="passwordAncien"
                      v-model="password"
                    /> -->
                    <div
                      class="strength"
                      :class="'level_' + strengthLevel"
                    ></div>

                    <i
                      class="fas fa-eye show-icon"
                      v-if="show"
                      @click="show = !show"
                    ></i>
                    <i
                      class="fas fa-eye-slash hide-icon"
                      v-else
                      @click="show = !show"
                    ></i>

                    <!--     <i class="fas fa-frown level-icon" v-if="strengthLevel === 1"></i>
    <i class="fas fa-meh level-icon" v-if="strengthLevel === 2"></i>
    <i class="fas fa-smile level-icon" v-if="strengthLevel === 3"></i>
    <i class="fas fa-grin-stars level-icon" v-if="strengthLevel === 4"></i> -->
                  </div>
                  <!-- <span class="text-red" v-if="errors.password">{{
                    errors.password[0]
                  }}</span> -->
                </div>
              </div>
              <!--   <i
                class="fa fa-eye show-icon"
                v-if="show"
                @click="show = !show"
                aria-hidden="true"
              ></i>
              <i
                class="fa fa-eye-slash hide-icon"
                v-else
                @click="show = !show"
                aria-hidden="true"
              ></i> -->

              <B>
                <span class="oublierrr"
                  ><router-link to="/motPasseOublier" style="color: #496664">
                    mot de passe oublié ?
                  </router-link>
                </span>
              </B>

              <CRow>
                <CCol col="6" class="text-left">
                  <CButton type="submit" style="background-color: #c90f2b;
    border-radius: 15px;" color="primary" class="px-4">
                    {{ isLoading ? "En cours attendez ..." : "Se connecter" }}
                  </CButton>
                </CCol>

              
              </CRow>
              <span class="inscriii"
                ><router-link to="/inscription" style="color: #496664">
                  Vous n'avez pas encore un compte?<B> S'inscrire.</B>
                </router-link></span
              >
            </CForm>
          </CCardBody>
        </CCard>
      </div>

      <div class="col-md-1"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { apiDomain } from "../../config";
export default {
  components: {},
  name: "login",
  data() {
    return {
      tokenVerifEmail: "",
      isLoadingVerifEmail: false,
      errorTokenVerifEmail: null,
      infoVerifEmail: null,
      showLogin: false,

      telephone: "",
      password: "",
      email: "",
      infoModal: false,
      loggedIn: false,
      //error: "",
      isCreating: false,
      show: false,
      formstate: {},
      validationErrors: "",
      //modifier password
      password: "",
      password_confirmation: "",

      erreurEmail: null,
      token: "",
      errorToken: null,
      newPassword: "",
      errornewPaswword: null,
      passwordAgain: "",
      errorpasswordAgain: null,
      tokenValid: false,
      EmailValid: false,
      infoEmail: null,
      infoToken: null,

      user: null,
      infoToken1: "Verifier avec Succès",

      status_msg: "",
      status: "",
      //error: "",
      errors: [],
      isLoading: false,
    };
  },

  computed: {
    isPasswordMatching() {
      if (
        this.password == "" ||
        this.password_confirmation == "" ||
        this.password != this.password_confirmation
      )
        return true;
      return false;
    },
  },

  mounted() {},

  methods: {
    showNotification(message) {
      this.status_msg = message;
      setTimeout(() => {
        this.status_msg = "";
      }, 120000);
    },

    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginAction", {
          telephone: this.telephone,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          this.$noty.success("Connexion réussie.");
          this.$router.push("/listes-emps");
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.isLoading = false;
            this.errors = error.response.data.errors;
          }
          if (error.response.status == 401) {
            this.isLoading = false;
            //this.validationErrors = error.response.data;
            this.$noty.error("OPS ! Login ou password invalid");
            //    this.validationErrors = "Email or password invalid";
          }
          if (error.response.status == 403) {
            this.isLoading = false;
            //this.validationErrors = error.response.data;
            this.$noty.error("OPS ! Votre Compte n'est pas activer");
            //    this.validationErrors = "Email or password invalid";
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
/* .loginClient {
    overflow: hidden;
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(9, 12, 15, 0.438)), to(rgba(7, 7, 7, 0.219))), url(/img/1.32bef30b.jpg) fixed center center;
    background: linear-gradient(rgba(9, 12, 15, 0.438), rgba(7, 7, 7, 0.219)), url(/img/1.32bef30b.jpg) fixed center center;
    background-size: cover;
    padding: 120px 30px;
} */

@import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");
.container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 500px;
}
.in {
  position: relative;
  color: #333;
  width: calc(100% - 140px);
  font-size: 1rem;
  padding: 6px 70px 4px;
  border: none;
  border-radius: 40px;
}
.strength {
  position: absolute;
  bottom: -13px;
  left: -26px;
  right: 0;
  display: block;
  width: 23%;
  /* height: 100%; */
  background-color: #a5df41;
  border-radius: 40px;
  overflow: hidden;
  z-index: 9;
  transition: all 0.5s linear;
}
@mixin level($position, $width, $color) {
  bottom: $position;
  width: $width;
  background-color: $color;
}
.level_0 {
  @include level(0, 25%, #bb4440);
}
.level_1 {
  @include level(-10px, 25%, #bb4440);
}
.level_2 {
  @include level(-10px, 50%, #e17d30);
}
.level_3 {
  @include level(-10px, 75%, #f0b03f);
}
.level_4 {
  @include level(-10px, 100%, #a5df41);
}
.level-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 11;
}
@mixin showpass($property) {
  position: absolute;
  left: $property;
  top: 12px;
  z-index: 11;
  cursor: pointer;
}
.show-icon {
  @include showpass(20px);
}
.hide-icon {
  @include showpass(18px);
  color: #555;
}

.hide-icon {
  position: absolute;
  left: 334px !important;
  top: 12px;
  /* z-index: 11; */
  cursor: pointer;
}

.show-icon {
  position: absolute;
  left: 334px !important;
  top: 12px;
  /* z-index: 11; */
  cursor: pointer;
}


</style>
