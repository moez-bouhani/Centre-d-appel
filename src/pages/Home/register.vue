<template>
  <div>
    <br /><br /><br />

    <div class="row loginClient">
      <div class="col-md-3"></div>

      <div class="col-md-4"></div>

      <div class="col-md-4" style="margin-top: -50px;">
        <CCard class="p-4" style="border-radius: 20px;">
          <CCardBody>
            <CForm @submit.prevent="performRegister">
              <center>
                <h1 style="color: #c90f2b">Inscription</h1>
               <!--  <p class="text-muted">Session patient</p> -->
              </center>

              <div class="row">
                <div class="col-md-12">
                  <CInput
                    required
                    placeholder="Nom"
                    v-model="nom"
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
                    placeholder="Prenom"
                    v-model="prenom"
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
                    placeholder="Email"
                    v-model="email"
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

          

              <CRow>
                <CCol col="6" class="text-left">
                  <CButton type="submit" style="background-color: #c90f2b;
    border-radius: 15px;" color="primary" class="px-4">
                    {{ isCreating ? "En cours attendez ..." : "S'inscrire" }}
                  </CButton>
                </CCol>

             
              </CRow>
              <span class="inscriii"
                ><router-link to="/connection" style="color: #496664">
                  Déja un membre? <B> Se connecter.</B>
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
import testPassword from "./testPassword";

import VuePassword from "vue-password";

import { apiDomain } from "../../config";
import axios from "axios";
export default {
  components: {
    testPassword,
    VuePassword,
  },
  name: "register",
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",

      telephone: "",
      password: "",

     
      has_minimum_lenth: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,

      isCreating: false,
      isLoading: false,
      error: "",
      errors: [],

      //map
      markers: [],
      places: [],
      currentPlace: null,
      center: { lat: 45.508, lng: -73.587 },
    };
  },
  mounted() {
    this.geolocate();
  },
  watch: {
    password() {
      this.has_minimum_lenth = this.password.length >= 8;
      this.has_number = /\d/.test(this.password);
      this.has_lowercase = /[a-z]/.test(this.password);
      this.has_uppercase = /[A-Z]/.test(this.password);
      this.has_special = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
    },
  },
  methods: {
  

    performRegister() {
      this.isCreating = true;
      this.errors = [];
      this.pass = null;
      if (
        this.has_minimum_lenth == true &&
        this.has_number == true &&
        this.has_lowercase == true &&
        this.has_uppercase == true &&
        this.has_special == true
      ) {
        this.pass = this.password;
      }
      this.$store
        .dispatch("performRegisterAction", {
          email: this.email,

          telephone: this.telephone,

          prenom: this.prenom,

          nom: this.nom,

          password: this.pass,
        })
        .then((res) => {
          this.isCreating = false;
          this.$noty.success("Connexion réussie.");
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.isCreating = false;
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          if (error.response.status == 400) {
            //this.validationErrors = error.response.data;
            this.$noty.error(" Login ou password invalid");
            //    this.validationErrors = "Email or password invalid";
          }
          /* message de verification */

          if (this.has_number == false) {
            this.$noty.error(
              " OPS ! Le mot de passe doit contenir ou moins  1 chifre  !"
            );
          }

          if (this.has_lowercase == false) {
            this.$noty.error(
              " OPS ! Le mot de passe doit contenir ou moins  1 lettre muniscule  !"
            );
          }

          if (this.has_uppercase == false) {
            this.$noty.error(
              " OPS ! Le mot de passe doit contenir ou moins  1 lettre majuscule  !"
            );
          }

          if (this.has_special == false) {
            this.$noty.error(
              " OPS ! Le mot de passe doit contenir ou moins  1 caractére spécial  !"
            );
          }

        
        });
    },

    handleInput(adresse) {
      this.user.adresse = adresse;
    },

    setPlace(place) {
      this.adresse = place;
      if (this.adresse) {
        const marker = {
          lat: this.adresse.geometry.location.lat(),
          lng: this.adresse.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.adresse);
        this.center = marker;
        // lat and lng, In front-end javascript does not support file management due to security concerns.
        console.log(marker.lat);
        console.log(marker.lng);

        // this.user.adresse = null;
        this.adresse = place;
      }
      //   this.user.adresse = place;
    },

    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
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
