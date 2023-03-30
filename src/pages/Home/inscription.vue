<template>
  <div>
 <br><br>
 <div id="depcontact" class="row">
      <div class="col-lg-1 col-md-2"></div>
      <div class="col-lg-10 form">
        <div class="section-header">

          <span class="section-divider"></span>
        </div>

        <form 
          method="post"
          role="form"
          class="contactForm"
          action="/p/"
          enctype="multipart/form-data"
          novalidate="novalidate"
        >
          <div v-show="!livePaper">
          
<div class="row">
<div class="col-md-4">
<h5 class="pform">Votre Nom1  (*)</h5>
            <br />
            <input
              type="text"
              name="nom"
              value
              size="40"
              class="form-control"
              aria-required="true"
              aria-invalid="false"
              placeholder="Nom*"
                v-model="nom" required="required" 
            />
              <span class="text-red"  v-if="errors.nom">{{errors.nom[0]}} (*)</span> 
</div>

<div class="col-md-4">
    <h5 class="pform">Votre Prénom (*)</h5>
            <br />
            <input
              type="text"
              name="prenom"
              value
              size="40"
              class="form-control"
              aria-required="true"
              aria-invalid="false"
              placeholder="Prenom*"
                v-model="prenom" required="required" 
            />
              <span class="text-red"  v-if="errors.prenom">{{errors.prenom[0]}} (*)</span> 
</div>



</div>

         
            <div class="row">
              <div class="col-md-4" style="padding-bottom:20px;">
                <h5 class="pform">Votre Email (*)</h5>
                <br />

                <input id="tooltip-target-2" 
                  class="form-control"
                  type="email"
                  name="your-email"
                  value
                  size="40"
                  aria-required="true"
                  aria-invalid="false"
                  placeholder="Email*"
                   v-model="email"
                />
                 <span class="text-red"  v-if="errors.email">{{errors.email[0]}} (*)</span> 
              </div>
 <div class="col-md-4">
                <h5 class="pform">Téléphone (*)</h5>
                <br />
                <input
                  type="tel"
                  name="your-phone"
                  value
                  size="40"
                  class="form-control"
                  aria-required="true"
                  aria-invalid="false"
                  placeholder="Téléphone*"
                   v-model="telephone"
                />
                 <span class="text-red"  v-if="errors.telephone">{{errors.telephone[0]}} (*)</span> 
              </div>


              
              <div class="col-md-4">
                <h5 class="pform">Votre Mot de passe (*)</h5>
                <br />
               <!--  <input
                  type="password"
                  name="your-phone"
                  value
                  size="40"
                  class="form-control"
                  aria-required="true"
                  aria-invalid="false"
                  placeholder="Mot de passe*"
                   v-model="password"
                /> -->
                 <testPassword id="tooltip-target-1" 
   
              name="password"
               label="Tapez votre neveau mot de passe"
                v-model="password"
               type="text"
                  placeholder="*******"
                      />
<b-tooltip target="tooltip-target-1"   triggers="hover">
   <ul style="list-style: none;"  class="form-text text-muted">
            <li  :class="has_minimum_lenth ? 'has_required' : ''"><span v-show="has_minimum_lenth"> <img class="img-responsive rounded-circle"   src="c.png" width="18px" /> </span>

                                                                  <span v-show="!has_minimum_lenth"> <img class="img-responsive rounded-circle"  src="nc.png" width="18px" />  </span>
            
            
                 8 caractères </li>
           <!--  <li :class="has_lowercase ? 'has_required' : ''">une lettre minuscule</li> -->
            <li :class="has_uppercase ? 'has_required' : ''"><span v-show="has_uppercase"> <img class="img-responsive rounded-circle"   src="c.png" width="18px" /> </span>

                                                                  <span v-show="!has_uppercase"> <img class="img-responsive rounded-circle"  src="nc.png" width="18px" />  </span>
              1 lettre majuscule </li>
            <li :class="has_number ? 'has_required' : ''"><span v-show="has_number"> <img class="img-responsive rounded-circle"   src="c.png" width="18px" /> </span>

                                                                  <span v-show="!has_number"> <img class="img-responsive rounded-circle"  src="nc.png" width="18px" />  </span>
              1 chiffre</li>
            <li :class="has_special ? 'has_required' : ''"><span v-show="has_special"> <img class="img-responsive rounded-circle"   src="c.png" width="18px" /> </span>

                                                                  <span v-show="!has_special"> <img class="img-responsive rounded-circle"  src="nc.png" width="18px" />  </span>
              1 caractère spécial</li>

 <li :class="has_lowercase ? 'has_required' : ''"><span v-show="has_lowercase"> <img class="img-responsive rounded-circle"   src="c.png" width="18px" /> </span>

                                                                  <span v-show="!has_lowercase"> <img class="img-responsive rounded-circle"  src="nc.png" width="18px" />  </span>
              1 lettre muniscule</li>

  </ul>

           </b-tooltip>


                 <span class="text-red"  v-if="errors.password">{{errors.password[0]}} (*)</span> 
              </div>
            </div>
   

          <CCol col="6" class="text-left">
                    <CButton color="primary" class="px-4"  @click.prevent="submit" >
                           {{isCreating ? "En cours attendez ..." : "S'inscrire"  }}
                      </CButton>

                       <CButton color="info" class="px-4">
                         <router-link to=/connection style="color:white">
                             Déja un membre
                            </router-link>
                      </CButton>
            </CCol>



            

          

          </div>


          
        </form>
      </div>
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
  

    submit() {
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

<style scoped>
.has_required {
  text-decoration: line-through;
  color: #f0f0f0;
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
  color: #fff !important;
  position: relative;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  padding: 1.25rem !important;
}


</style>