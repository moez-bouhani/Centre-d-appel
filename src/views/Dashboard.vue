<template>
  <div>
    <div class="row" v-if="user.active == 0">
      <div class="col-md-10 offset-1">
        <b-card
          style="border-color: #f5a623; background: #f5e7cd; color: #ee6739"
          tag="article"
          class="mb-2"
        >
          <b-card-text>
            <form>
              <div class="row">
                <div class="col-md-12">
                  Bonsoir , {{ user.nom }} Vérifiez votre e-mail pour activer
                  votre compte sur votre espace profile .
                </div>
              </div>
            </form>
          </b-card-text>
        </b-card>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 col-lg-9">
        <CRow>
          <CCol col="12">
            <CCard>
              <CRow>
                <CCol
                  sm="6"
                  md="6"
                  v-for="annonce in annonces.data"
                  :key="annonce.id"
                >
                  <CCard accent-color="info">
                    <CCardHeader
                      ><B
                        >Code Client :{{ annonce.user.code }} - Publier:
                        {{ annonce.human_created_at }}
                      </B></CCardHeader
                    >
                    <CCardBody>
                      <CRow>
                        <CCol sm="6" md="3">
                          <img
                            :src="`uploads/allAnnonces/${annonce.titre}`"
                            class="img"
                            width="120%"
                          />
                        </CCol>
                        <CCol sm="6" md="9">
                          <center>
                            <div
                              class="list-group-item list-group-item-warningg"
                              style="color: #MesContactsmes"
                            >
                              <B>Description: {{ annonce.description }}</B>
                            </div>
                          </center>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCard>
          </CCol>
          <pagination
            :limit="4"
            :data="annonces"
            @pagination-change-page="getResults"
            class="mt-5"
          ></pagination>
        </CRow>
      </div>
      <div class="col-sm-6 col-lg-3">
        <div class="card">
          <div class="card-body">
            <div class="form-check" v-for="(category, index) in loadCategorie">
              <!--  <input class="form-check-input" type="checkbox" :value="category.id" :id="'category'+index" v-model="selected.categories"> -->
              <label class="form-check-label" :for="'category' + index">
                {{ category.titreCategorie }} ({{ category.annonce_count }})
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logout from "./../components/logout";
import { formatRelative } from "date-fns";
import { fr } from "date-fns/esm/locale";
import { apiDomain } from "../config";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    logout,
  },
  name: "home",

  data() {
    return {
      loadCategorie: [],
      q: "",
      // nbDepSurChaqueCat: this.cats.reduce((n, class1)),
      cats: {},
      userSingll: {
        StatuPack1: "",
        role: "",
      },
      pagination: {},
      nombreAnnonce: "",
      nombreContact: "",
      list: {},

      /*  user_id:'', */
      profileForm: new Form(
        {
          nom: "",
          prenom: "",

          email: "",
          age: "",

          StatuPack1: "",
        },
        false
      ),
      // PackAcheter: this.$store.state.user.StatuPack1,
      //annonces: [],

      //annonces :{ },
      annonces: [],
      anns: {},
    };
  },
  mounted() {
    this.loadCategories();
    this.checkUserStatus();
    console.log("component mounted.");
  },
  watch: {
    selected: {
      handler: function () {
        this.loadCategories();
      },
      deep: true,
    },
  },
  created() {
    //this.fetchCtegorie();
    this.fetchuserSingl(this.$store.state.user.id);
    this.fetchuserentreprise(this.$store.state.user.id);

    axios
      .get(`${apiDomain}/api/annoncesAll`)
      .then((response) => (this.annonces = response.data))
      .catch((error) => console.log(error));
    //get all categorie + nb depannneur
    axios
      .get(`${apiDomain}/api/cats`)
      .then((response) => (this.cats = response.data))

      .catch((error) => console.log(error));
  },
  methods: {
    loadCategories() {
      axios
        .get("http://localhost:8000/api/loadCategorie", {
          params: _.omit(this.selected, "loadCategorie"),
        })
        .then((response) => {
          this.loadCategorie = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    format(date) {
      return formatRelative(subDays(new Date(), 3), new Date(), { locale: fr });
    },
    //get pagination listes categories
    getResultsCategories(page = 1) {
      axios.get(`${apiDomain}api/cats?page=` + page).then((response) => {
        this.cats = response.data;
        //	this.nbDepSurChaqueCat = response.data;
      });
    },

    getResults(page = 1) {
      axios
        .get(`${apiDomain}/api/annoncesAll?page=` + page)
        .then((response) => {
          this.annonces = response.data;
        });
    },

    checkUserStatus() {
      if (localStorage.getItem("token") != null) {
        this.token = localStorage.getItem("token");
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
    fetchuserentreprise() {
      fetch(`${apiDomain}/api/anns/${this.$store.state.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.anns = res.ann;
        })
        .catch((err) => console.log(err));
    },
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
<style>
.home {
  background-color: #172b4d;
}

.ca {
  margin: 20px 5px 0px 20px;
}
.col-4 {
  margin: -20px 0px 0px 0px;
}

.cc {
  margin: -20px 0px 0px 0px;
}
.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  /* padding: 1.25rem; */
  padding: 0.4rem !important;
}
</style>