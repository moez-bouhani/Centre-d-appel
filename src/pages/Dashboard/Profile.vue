<template>
  <div>
    <b-modal title="Modification photo profil" id="modal-edit-image">
      <form class="mb-3">
        <div class="row" style="padding: 10px">
          <div>
            <center>
              <img
                class="rounded-circle"
                v-bind:src="imagePreview"
                v-show="showPreview"
                style="width: 40%"
              />
              <img
                v-if="!showPreview"
                class="rounded-circle"
                src="../../assets/img/center/call-centre-customer.png"
                width="40%"
              />
            </center>
            <br />

            <input
              type="file"
              ref="photo"
              v-on:change="onChangeFileUpload()"
              id="photo"
              class="upload-button"
            />
          </div>
        </div>
        <div>
          <div class="text-center">
            <base-button
              type="submit"
              style="margin-top: 20px"
              class="btn btn-info"
              v-on:click="submitForm()"
            >
              {{ isCreating ? "En cours attendez ..." : "Modifier " }}
            </base-button>
          </div>
        </div>
      </form>
    </b-modal>

    <div class="row">
      <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
        <div class="card card-profile shadow">
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
              <div class="card-">
                <center>
                  <img
                    class="img-responsive rounded-circle"
                    v-b-modal.modal-edit-image
                    src="../../assets/img/center/call-centre-customer.png"
                    style="width: 200%; margin-left: -23px"
                  />
                </center>
                <br /><br />
              </div>
            </div>
          </div>

          <!--  <center>  <h3>   {{

                        userSingll.nom.charAt(0).toUpperCase() + userSingll.nom.slice(1)
                     
                        }} </h3> 
                         <p  v-b-modal.modal-edit-image  class="btn btn-sm btn-primary">
                                         Modifier mon photo de profile</p>
                     </center> -->
          <center>
            <input class="text-center" name="nom" v-model="userSingll.nom" />

            <p class="text-red" v-if="errors.nom">{{ errors.nom[0] }} (*)</p>
            <p v-b-modal.modal-edit-image class="btn btn-sm btn-primary">
              Modifier mon photo de profile
            </p>
          </center>
        </div>
        <center>
          <p
            v-if="!modalContacterClient"
            @click="modalActionContact()"
            class="mb-6 card card-body bg-info btn btn-sm btn-info"
            style="color: balck"
          >
            Changer mot de passe
          </p>
        </center>

        <div
          v-if="modalContacterClient"
          class="
            bg-smoke
            absoluten
            pin-t pin-l
            h-screen
            w-full
            flex
            items-center
            justify-center
          "
        >
          <center>
            <p
              class="mb-6 card card-body bg-info btn btn-sm btn-info"
              style="color: balck"
            >
              Changer mot de passe
            </p>
          </center>
          <div class="bg-white p-4 rounded w-1/3" style="color: black">
            <CRow>
              <form v-on:submit.prevent="changePassword">
                <CCol sm="12" v-if="isCorrect == false">
                  <!-- <p>Tapez votre mot de passe ancien</p>
                 <testPassword
                name="passwordAncien"
                 type="text"
                id="passwordAncien" 
                  label="Tapez votre mot de passe ancien"
                  placeholder="*******"
                v-model="passwordAncien"
                
                /> -->
                  <div>
                    <input
                      class="form-control"
                      placeholder="mot de passe ancien"
                      :type="show === true ? 'text' : 'password'"
                      id="passwordAncien"
                      v-model="passwordAncien"
                    />
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

                  <span
                    class="list-group-item list-group-item-danger"
                    v-if="errors.passwordAncien"
                    >{{ errors.passwordAncien[0] }} (*)</span
                  >
                </CCol>

                <div v-if="isCorrect == false" class="text-center">
                  <base-button
                    type="submit"
                    style="margin-top: 20px"
                    class="btn btn-info"
                    v-on:click="changePassword()"
                  >
                    {{
                      isCreatingPassword ? "En cours attendez ..." : "Verifier "
                    }}
                  </base-button>
                </div>
              </form>

              <form v-on:submit.prevent="IschangePassword">
                <div v-if="isCorrect == true">
                  <div>
                    <CCol sm="12">
                      <p>Tapez votre neveau mot de passe</p>

                      <b-tooltip target="tooltip-target-1" triggers="hover">
                        <ul
                          style="list-style: none"
                          class="form-text text-muted"
                        >
                          <li :class="has_minimum_lenth ? 'has_required' : ''">
                            <span v-show="has_minimum_lenth">
                              <img
                                class="img-responsive rounded-circle"
                                src="c.png"
                                width="18px"
                              />
                            </span>

                            <span v-show="!has_minimum_lenth">
                              <img
                                class="img-responsive rounded-circle"
                                src="nc.png"
                                width="18px"
                              />
                            </span>

                            8 caractères
                          </li>
                          <!--  <li :class="has_lowercase ? 'has_required' : ''">une lettre minuscule</li> -->
                          <li :class="has_uppercase ? 'has_required' : ''">
                            <span v-show="has_uppercase">
                              <img
                                class="img-responsive rounded-circle"
                                src="c.png"
                                width="18px"
                              />
                            </span>

                            <span v-show="!has_uppercase">
                              <img
                                class="img-responsive rounded-circle"
                                src="nc.png"
                                width="18px"
                              />
                            </span>
                            1 lettre majuscule
                          </li>
                          <li :class="has_number ? 'has_required' : ''">
                            <span v-show="has_number">
                              <img
                                class="img-responsive rounded-circle"
                                src="c.png"
                                width="18px"
                              />
                            </span>

                            <span v-show="!has_number">
                              <img
                                class="img-responsive rounded-circle"
                                src="nc.png"
                                width="18px"
                              />
                            </span>
                            1 chiffre
                          </li>
                          <li :class="has_special ? 'has_required' : ''">
                            <span v-show="has_special">
                              <img
                                class="img-responsive rounded-circle"
                                src="c.png"
                                width="18px"
                              />
                            </span>

                            <span v-show="!has_special">
                              <img
                                class="img-responsive rounded-circle"
                                src="nc.png"
                                width="18px"
                              />
                            </span>
                            1 caractère spécial
                          </li>

                          <li :class="has_lowercase ? 'has_required' : ''">
                            <span v-show="has_lowercase">
                              <img
                                class="img-responsive rounded-circle"
                                src="c.png"
                                width="18px"
                              />
                            </span>

                            <span v-show="!has_lowercase">
                              <img
                                class="img-responsive rounded-circle"
                                src="nc.png"
                                width="18px"
                              />
                            </span>
                            1 lettre muniscule
                          </li>
                        </ul>
                      </b-tooltip>

                      <testPassword
                        id="tooltip-target-1"
                        name="password"
                        label="Tapez votre neveau mot de passe"
                        v-model="new_password"
                        type="text"
                        placeholder="*******"
                      />

                      <span
                        class="list-group-item list-group-item-danger"
                        v-if="errors.password"
                        >{{ errors.password[0] }} (*)</span
                      >
                    </CCol>
                  </div>
                  <div>
                    <CCol sm="12">
                      <p>Confirmation mot de passe</p>
                      <testPassword
                        id="tooltip-target-1"
                        name="password_confirmation"
                        label="Confirmation"
                        v-model="password_confirmation"
                        type="text"
                        placeholder="*******"
                      />

                      <div
                        v-if="isPasswordMatching == false"
                        class="alert alert-success"
                        role="alert"
                      >
                        Mot de passe confirmé
                      </div>
                      <div
                        v-if="isPasswordMatching == true"
                        class="alert alert-danger"
                        role="alert"
                      >
                        Pas encore confirmé
                      </div>
                    </CCol>
                  </div>

                  <div class="text-center">
                    <base-button
                      type="submit"
                      style="margin-top: 20px"
                      class="btn btn-info"
                      v-show="!isPasswordMatching"
                      v-on:click="IschangePassword()"
                    >
                      {{
                        isCreatingPasswordVerif
                          ? "En cours attendez ..."
                          : "Modifier "
                      }}
                    </base-button>
                  </div>
                </div>
              </form>
            </CRow>
          </div>
        </div>
      </div>

      <div class="col-xl-8 order-xl-1">
        <card shadow type="secondary">
          <div slot="header" class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-4">
                <h3 class="mb-0"></h3>
              </div>

              <div class="col-4"></div>
            </div>
          </div>

          <template>
            <form class="mb-3">
              <CRow>
                <CCol sm="12">
                  <CCard>
                    <CCardHeader>
                      <strong>Mon Compte </strong>
                      <div class="card-header-actions">
                        <a
                          href="https://coreui.io/vue/docs/components/form-components"
                          class="card-header-action"
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                        </a>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <br />
                      <CRow>
                        <CCol sm="4">
                          <CInput
                            label="Nom"
                            name="nom"
                            type="text"
                            v-model="userSingll.nom"
                          />
                          <span class="text-red" v-if="errors.nom"
                            >{{ errors.nom[0] }} (*)</span
                          >
                        </CCol>

                        <CCol sm="4">
                          <CInput
                            label="Prénom"
                            name="prenom"
                            type="text"
                            v-model="userSingll.prenom"
                          />
                          <span class="text-red" v-if="errors.prenom"
                            >{{ errors.prenom[0] }} (*)</span
                          >
                        </CCol>

                        <CCol sm="4">
                          <CInput
                            label="Date de naissance"
                            name="datenais"
                            type="date"
                            v-model="userSingll.datenais"
                          />
                          <span class="text-red" v-if="errors.datenais"
                            >{{ errors.datenais[0] }} (*)</span
                          >
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol sm="6">
                          <CInput
                            label="Téléphone"
                            name="telephone"
                            type="text"
                            v-model="userSingll.telephone"
                          />
                          <span class="text-red" v-if="errors.telephone"
                            >{{ errors.telephone[0] }} (*)</span
                          >
                        </CCol>

                        <CCol sm="6">
                          <CInput
                            label="Email"
                            type="email"
                            v-model="userSingll.email"
                          />
                          <span class="text-red" v-if="errors.email"
                            >{{ errors.email[0] }} (*)</span
                          >
                        </CCol>
                      </CRow>
                    </CCardBody>
                    <CCardFooter>
                      <!-- <CButton  size="sm" color="primary"  @click.prevent="updateUser"><CIcon name="cil-check-circle"/>
              {{updateIn ? 'En cours attendez ...' : 'Modifier '}}
            
             </CButton> -->

                      <CButton
                        color="primary"
                        class="px-4"
                        @click.prevent="updateUser"
                        ><CIcon name="cil-check-circle" />
                        {{ updateIn ? "En cours attendez ..." : "Modifier " }}
                      </CButton>

                      <!-- v-on:submit.prevent="updateUser"
            <CButton color="primary" class="px-4"  @click.prevent="performLogin">
                           {{isLoading ? 'En cours attendez ...' : 'LOG IN '}}
                      </CButton> -->
                    </CCardFooter>
                  </CCard>
                </CCol>
              </CRow>
            </form>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import testPassword from "./../Home/testPassword";

import VuePassword from "vue-password";
import { apiDomain } from "../../config";
import { mapGetters } from "vuex";

import axios from "axios";

export default {
  components: {
    testPassword,
    VuePassword,
  },
  data() {
    return {
      apiDomain: "https://apil.cpn--phone.com",
      /* modification */
      tokenVerifEmail: "",
      isLoadingVerifEmail: false,
      errorTokenVerifEmail: null,
      infoVerifEmail: null,

      /* mod */
      genre: "",
      errors: [],
      passwordAncien: "",
      new_password: "",
      password_confirmation: "",
      isCreatingPassword: false,
      isCreatingPasswordVerif: false,
      isCreating: false,

      isCorrect: false,
      has_minimum_lenth: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      show: false,

      markersh: [],
      userSingll: [],
      entrepriseUSer: [],
      //cat and sub cats
      categorie_id: null,
      Cats: [],

      Sous_categorie_id: null,
      sCats: [],

      mesContactAnnonces: {},
      NbMESContactAnnonce: "",
      mesAnnonce: {
        id: "",
        title: "",
      },
      annonce: {
        id: "",
        title: "",
      },

      modalEntreprise: false,
      modalContacterClient: false,

      nom: "",
      prenom: "",

      email: "",
      age: "",

      telephone: "",
      adresse: "",
      login: "",
      photo: "",

      service_entreprise: "",
      descri_ser_entreprise: "",
      nom_entreprise: "",
      local_entreprise: "",
      photo_entreprise: "",

      nb_annee_exp_entreprise: "",
      patente_entreprise: "",
      desponobilite_entreprise: "",

      showPreview: false,
      imagePreview: "",
      validationErrors: "",
      photo: "",
      file2: null,
      file: null,

      status_msg: "",
      status: "",

      horizontal: { label: "col-6", input: "col-9" },
      options: ["Homme", "Femme"],
      selectOptions: [
        "Option 1",
        "Option 2",
        "Option 3",
        {
          value: ["Homme", "Femme"],
          label: "Selected option",
        },
      ],

      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      address: "",

      login: "",

      updateIn: false,

      //telephone: "",
      //adresse: "",
      //login: "",

      //isLoading: false

      active: this.$store.state.user.active,
    };
  },
  name: "profileuser",
  mounted() {
    this.geolocate();
  },
  computed: {
    scorePassword() {
      let score = 0;
      if (this.passwordAncien === "") return score;
      let letters = {};
      for (let i = 0; i < this.passwordAncien.length; i++) {
        letters[this.passwordAncien[i]] =
          (letters[this.passwordAncien[i]] || 0) + 1;
        score += 5.0 / letters[this.passwordAncien[i]];
      }
      let variations = {
        digits: /\d/.test(this.passwordAncien),
        lower: /[a-z]/.test(this.passwordAncien),
        upper: /[A-Z]/.test(this.passwordAncien),
        special: /\W/.test(this.passwordAncien),
      };
      let variationsCount = 0;
      for (let check in variations) {
        variationsCount += variations[check] === true ? 1 : 0;
      }
      score += (variationsCount - 1) * 10;
      return parseInt(score);
    },
    strengthLevel() {
      let pass = this.scorePassword;
      if (pass === 0) return 0;
      if (pass < 25) return 1;
      if (pass < 50) return 2;
      if (pass < 75) return 3;
      if (pass >= 75) return 4;
    },

    isPasswordMatching() {
      if (
        this.new_password == "" ||
        this.password_confirmation == "" ||
        this.new_password != this.password_confirmation
      )
        return true;
      return false;
    },

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
  watch: {
    new_password() {
      this.has_minimum_lenth = this.new_password.length >= 8;
      this.has_number = /\d/.test(this.new_password);
      this.has_lowercase = /[a-z]/.test(this.new_password);
      this.has_uppercase = /[A-Z]/.test(this.new_password);
      this.has_special = /[!@#\$%\^\&*\)\(+=._-]/.test(this.new_password);
    },
  },

  methods: {
    
   

    updateUser(e) {
      this.updateIn = true;
      let formData = new FormData();
      /* this.errors=[]; */

      formData.append("datenais", this.userSingll.datenais);

      formData.append("email", this.userSingll.email);
      formData.append("nom", this.userSingll.nom);

      formData.append("telephone", this.userSingll.telephone);
      formData.append("cin", this.userSingll.cin);
      formData.append("prenom", this.userSingll.prenom);
      formData.append("grade", this.userSingll.grade);

      //  axios.post(`${apiDomain}/api/editInfoProfile/${this.userSingll.id}`, formData)
      axios
        .post(
          `${apiDomain}/api/editInfoProfile/${this.$store.state.user.id}` +
            "?token=" +
            this.$store.state.token,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.updateIn = false;
          /*  if (res.status == 200) {
            if (confirm("profil modifiée avec succés")) {
              window.location.reload();
            }
          } */
          this.fetchuserSingl(this.$store.state.user.id);
        })
        .catch((error) => {
          this.updateIn = false;
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },


  
    profilePhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.user.photo = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    IschangePassword() {
      var formData = new FormData();
      this.isCreatingPasswordVerif = true;
      if (
        this.has_minimum_lenth == true &&
        this.has_number == true &&
        this.has_lowercase == true &&
        this.has_uppercase == true &&
        this.has_special == true
      ) {
        formData.append("password", this.new_password);
      }

      if (this.has_minimum_lenth == false) {
        this.$noty.error(
          " OPS ! Le mot de passe doit contenir ou moins  8 caractéres !"
        );
      }

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

      //  axios.post(`${apiDomain}/api/editInfoProfile/${this.userSingll.id}`, formData)
      axios
        .post(
          `${apiDomain}/api/editPassword` + "?token=" + this.$store.state.token,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.isCreatingPasswordVerif = false;
            if (res.status == 200) {
            if (confirm("Mot de passe modifiée avec succés")) {
              window.location.reload();
            }
          } 
         
        })
        .catch((error) => {
          this.isCreatingPasswordVerif = false;
          console.log(error);

          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          /* if (error.response.status == 500) {
            this.$noty.error(" OPS ! mot de passe ancien est incoorect !");
          } */
        });
    },

    changePassword() {
      this.isCreatingPassword = true;
      this.isCorrect = false;

      let formData = new FormData();
      formData.append("passwordAncien", this.passwordAncien);

      /* axios.post(`${apiDomain}/api/userphoto/${this.$store.state.user.id}`,formData, */
      axios
        .post(
          `${apiDomain}/api/getPassword` + "?token=" + this.$store.state.token,

          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.isCreatingPassword = false;

          // this.passwordAncien = '';
          if (res.status == 200) {
            this.isCorrect = true;
          }

        
        })
        .catch((error) => {
          this.isCreatingPassword = false;
          console.log(error);

          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          if (error.response.status == 500) {
            this.$noty.error(" OPS ! mot de passe ancien est incoorect !");
          }
        });
    },

    submitForm() {
      this.isCreating = true;
      let formData = new FormData();
      formData.append("photo", this.photo);

      /* axios.post(`${apiDomain}/api/userphoto/${this.$store.state.user.id}`,formData, */
      axios
        .post(
          `${apiDomain}/api/userphoto/${this.$store.state.user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.isCreating = false;
          this.photo = "";
          this.fetchuserSingl(this.$store.state.user.id);
          /* if (res.status == 200) {
            if (confirm("photo modifiée avec succés")) {
              window.location.reload();
            }
          } */
        })
        .catch((err) => {
          this.isCreating = false;
          console.log(err);
        });
    },

    onChangeFileUpload() {
      this.photo = this.$refs.photo.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.photo) {
        if (/\.(jpe?g|png|gif)$/i.test(this.photo.name)) {
          reader.readAsDataURL(this.photo);
        }
      }
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

<style lang="scss" scoped >
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
  left: 173px !important;
  top: 12px;
  z-index: 11;
  cursor: pointer;
  color: #555;
}

.show-icon {
  position: absolute;
  left: 173px !important;
  top: 12px;
  z-index: 11;
  cursor: pointer;
}

.profile {
  min-height: 100%;
  width: 100%;
  position: relative;
  display: inline-block;
}

#sidebar {
  width: 20%;
  top: 0px;
  left: 0px;
  bottom: 0px;
  height: 100vh;
  position: absolute;
  background-color: rgb(39, 41, 41);
}
#content {
  min-height: 500px;
  width: 80%;
  position: relative;
  float: right;
}

@media (min-width: 1200px) {
  #modal-edit-image {
    max-width: 310px;
    margin: 1.75rem auto;
  }
}

.has_required {
  text-decoration: line-through;
  color: #f0f0f0;
  // background-color: rgb(102, 202, 55);
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 2rem;
  margin-bottom: 8px;
  color: #ebedef !important;
  position: relative;
}

/* img {
  border-radius: 50%;
} */

.show-iconn {
  position: absolute;
  left: 311px !important;
  top: 171px;
  /*   z-index: 11; */
  cursor: pointer;
}

.hide-iconn {
  position: absolute;
  left: 363px !important;
  top: 171px;
  /* z-index: 11; */
  cursor: pointer;
}

.btn-warning {
  color: #fff;
  margin-top: 0px;
  background-color: #f54d23;
  border-color: #f54d23;
}
.btn-success {
  color: #fff;
  margin-top: 0px;
  background-color: #3cf523;
  border-color: #3cf523;
}
</style>