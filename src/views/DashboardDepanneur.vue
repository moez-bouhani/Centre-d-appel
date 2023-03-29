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
        <div class="col-row">
          <!-- <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="Rechrecher par ville , titre , description , code , date(par exmple:2020-12-18)..."
          /> -->

          <input
            type="text"
            class="form-control"
            @keyup="fetchsearch"
            v-model="q"
            placeholder="Rechrecher par ville , titre , description , code , date(par exmple:2020-12-18)..."
          />
        </div>
        <br />
        <CRow>
          <CCol col="12">
            <CCard>
              <CRow>
                <CCol
                  sm="6"
                  md="6"
                  v-for="(annonce, index) in annoncesWithSearch.data"
                  :key="annonce.id"
                >
                  <CCard accent-color="warning">
                    <CCardHeader>
                      <B>
                        Code Client :{{ annonce.user.code }} - Publier:
                        {{ annonce.human_created_at }}
                      </B>
                    </CCardHeader>
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
                            <br />
                            <!-- <B class="badge badge-info">  je cherche un {{annonce.categorie}}  </B>
 -->
                            <B style="color: #2eb85c">
                              je cherche un {{ annonce.categorie }}</B
                            >
                            <br />

                            <img
                              src="https://img.icons8.com/cotton/64/000000/message-preview.png"
                              width="30px"
                            />
                            <span class="badge badge-info">
                              {{
                                annonce.resrvation_pa_ann_clients.length
                              }}</span
                            >
                          </center>
                        </CCol>
                      </CRow>
                      <!-- 11 -->
                    </CCardBody>
                    <!--     2 -->
                  </CCard>

                  <center>
                    <!--  <img src="blue.png"/> -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="32"
                      height="32"
                      viewBox="0 0 172 172"
                      style="fill: #000000"
                    >
                      <g
                        fill="none"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style="mix-blend-mode: normal"
                      >
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#3498db">
                          <path
                            d="M80.625,16.125c-26.64404,0 -48.375,21.73096 -48.375,48.375c0,7.55859 3.00244,16.14599 7.18067,25.61523c4.15722,9.46924 9.61621,19.61035 15.0542,28.97461c10.85498,18.74951 21.70996,34.45459 21.70996,34.45459l4.43018,6.42481l4.43018,-6.42481c0,0 10.85498,-15.70508 21.70996,-34.45459c5.43799,-9.36426 10.89697,-19.50537 15.0752,-28.97461c4.15722,-9.46924 7.15967,-18.05664 7.15967,-25.61523c0,-26.64404 -21.73096,-48.375 -48.375,-48.375zM80.625,26.875c20.84912,0 37.625,16.77588 37.625,37.625c0,4.3042 -2.37256,12.40869 -6.27783,21.29004c-3.88428,8.88134 -9.17529,18.74951 -14.4873,27.9248c-8.41943,14.5083 -13.71045,22.0669 -16.85986,26.70703c-3.14941,-4.64014 -8.44043,-12.19873 -16.85986,-26.70703c-5.31201,-9.17529 -10.60303,-19.04346 -14.5083,-27.9248c-3.88428,-8.88135 -6.25684,-16.98584 -6.25684,-21.29004c0,-20.84912 16.77588,-37.625 37.625,-37.625zM80.625,37.625l-21.5,16.125v26.875h16.125v-16.125h10.75v16.125h16.125v-26.875z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    {{ annonce.lieux }} ({{
                      getDistanceFromLatLonInKm[index].toFixed(1)
                    }}Km)
                  </center>
                  <center>
                    <div v-if="userSingll.StatuPack1 == 0">
                      <router-link to="/Pack/Neveau_pack">
                        <CButton color="warning" class="mr-1">
                          Veuillez s'abonner pour plus de détails
                        </CButton>
                      </router-link>
                    </div>

                    <div v-else>
                      <router-link
                        :to="{
                          name: 'Annonce/show_annonce',
                          params: { id: annonce.id },
                        }"
                      >
                        <CButton color="warning" class="mr-1">
                          Plus de détails >>
                        </CButton>
                      </router-link>
                    </div>
                  </center>
                </CCol>
              </CRow>
            </CCard>
          </CCol>

          <pagination
            :limit="4"
            :data="annoncesWithSearch"
            @pagination-change-page="getResults"
            class="mt-5"
          ></pagination>

          <!--  <div class="flex justify-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li
                  v-bind:class="[{ disabled: !pagination.prev_page_url }]"
                  class="page-item"
                >
                  <button
                    class="page-link text-dark"
                    v-on:click="loadAnnoncess(pagination.prev_page_url)"
                  >
                    &laquo;
                  </button>
                </li>
                <li class="page-item disabled" style="color: #2eb85c">
                  <a class="page-link text-dark" href="#"
                    >Page {{ pagination.current_page }} de
                    {{ pagination.last_page }}</a
                  >
                </li>
                <li
                  class="page-item"
                  v-bind:class="[{ disabled: !pagination.next_page_url }]"
                >
                  <button
                    class="page-link text-dark"
                    @click="loadAnnoncess(pagination.next_page_url)"
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div> -->
        </CRow>
      </div>

      <div class="col-sm-6 col-lg-3">
        <!--      <div class="container">
         <div class="col-row">
         <input type="text" class="form-control" @keyup="searchCategorie" v-model="q"
         placeholder="Rechrecher une categorie...">
         </div>
   
    <ul   v-for="categorie in cats.data" v-bind:key="categorie.id">

   <div class="card card-body border-info my-4">
  
  <div >
  <center><p><b>{{categorie.titreCategorie}}   </b></p></center> 
    

  </div>
   </div>
    </ul>
     <pagination :data="cats" @pagination-change-page="getResultsCategories" class="mt-5"></pagination> 
  </div> -->

        <div class="card">
          <div class="card-body">
            <B>
              Spécialité de
              <span style="color: #2eb85c"> {{ user.nom }}</span></B
            >
            <hr />

            <div v-if="singlEntreprise[0].Plombier == 1">
              <img src="ver2.png" width="10%" /> Plombier
            </div>

            <div v-if="singlEntreprise[0].Serrurier == 1">
              <img src="ver2.png" width="10%" /> Serrurier
            </div>

            <div v-if="singlEntreprise[0].Electricien == 1">
              <img src="ver2.png" width="10%" /> Electricien
            </div>

            <div v-if="singlEntreprise[0].Vitrier == 1">
              <img src="ver2.png" width="10%" /> Vitrier
            </div>
          </div>
        </div>
        <p class="mt-2">
          <B>
            <span style="color: #2eb85c"> {{ user.nom }}</span></B
          >
          Vous pouvez filtrer par vos spécialités
        </p>
        <div class="form-check" v-for="(category, index) in loadCategorie">
          <label class="form-check-label" :for="'category' + index">
            {{ category.titreCategorie }} ({{ category.annonce_count }})
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatRelative } from "date-fns";
import { fr } from "date-fns/esm/locale";
import { apiDomain } from "../config";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {},
  name: "home",

  data() {
    return {
      distance: [],
      annsDis: [],
      annoncesWithSearch: [],
      testLat: 35.67,
      testLng: 10.1,
      /* new  */
      loadCategorie: [],
      Annoonnccee: [],
      loading: true,
      selected: {
        // prices: [],
        categories: [],
        // annonces: [],
        // manufacturers: []
      },
      /* end new */

      searchKey: "",
      currentPage: 0,
      itemsPerPage: 1,
      resultCount: 0,

      search: "",

      singlEntreprise: [],
      q: "",
      A: "",
      annoncess: "",
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

      annonces: [],
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

      anns: {},
    };
  },

  mounted() {
    /* new */
    this.loadCategories();

    this.loadAnnonces();
    this.loadAnnoncess();

    /* end new */
    axios
      .get(
        `${apiDomain}/api/showEntreprise` + "?token=" + this.$store.state.token
      )
      .then((response) => {
        this.singlEntreprise = response.data;
      });
  },

  limit: {
    type: Number,
    default: 2,
  },
  watch: {
    selected: {
      handler: function () {
        this.loadCategories();

        this.loadAnnonces();
      },
      deep: true,
    },
  },
  created() {
    this.loadAnnoncess();
    this.fetchsearch();
    //this.fetchCtegorie();
    this.fetchuserSingl(this.$store.state.user.id);
    this.fetchuserentreprise(this.$store.state.user.id);
    this.fetchEnt(this.$store.state.user.id);

    //get all categorie + nb depannneur
    axios
      .get(`${apiDomain}/api/cats`)
      .then((response) => (this.cats = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    /* new */
    fetchsearch() {
      if (this.q.length > 1) {
        axios
          .get(`${apiDomain}/api/annoncesWithSearch/` + this.q)
          .then((response) => (this.annoncesWithSearch = response.data))
          .catch((error) => console.log(error));
      } else {
        axios
          .get(`${apiDomain}/api/annoncesWithSearch`)
          .then((response) => (this.annoncesWithSearch = response.data))
          .catch((error) => console.log(error));
      }
    },
    getResults(page = 1) {
      axios
        .get(`${apiDomain}/api/annoncesWithSearch?page=` + page)
        .then((response) => {
          this.annoncesWithSearch = response.data;
        });
    },
    /* new search */
    loadAnnoncess(page_url) {
      let vm = this;
      page_url = page_url || `${apiDomain}/api/annoncesAlll`;
      fetch(page_url)
        .then((res) => res.json())
        .then((res) => {
          this.annsDis = res.anns.data;
          this.loading = false;
          vm.makePagination(res);
        })
        .catch((err) => console.log(err));
    },

    makePagination(res) {
      let pagination = {
        current_page: res.anns.current_page,
        last_page: res.anns.last_page,
        next_page_url: res.anns.next_page_url,
        prev_page_url: res.anns.prev_page_url,
        from_page: res.anns.from,
        to_page: res.anns.to,
      };
      this.pagination = pagination;
    },

    /* new */

    loadCategories() {
      axios
        .get(`${apiDomain}/api/loadCategorie`, {
          params: _.omit(this.selected, "loadCategorie"),
        })
        .then((response) => {
          this.loadCategorie = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadAnnonces() {
      axios
        .get(`${apiDomain}/api/annoncesAll`, {
          params: this.selected,
        })
        .then((response) => {
          this.annonces = response.data;
          this.loading = false;
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
      axios.get(`${apiDomain}/api/cats?page=` + page).then((response) => {
        this.cats = response.data;
        //	this.nbDepSurChaqueCat = response.data;
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

    //pagination avec filtrer de recherche
    /* loadAnnoncess(page_url) {
      let vm = this;
      page_url = page_url || `${apiDomain}/api/annoncesAlll`;
      fetch(page_url)
        .then(res => res.json())
        .then(res => {
          this.annsDis = res.data;
          vm.makePagination(res);
        })
        .catch(err => console.log(err));
    },

    makePagination(res) {
      let pagination = {
        current_page: res.annsDis.current_page,
        last_page: res.annsDis.last_page,
        next_page_url: res.annsDis.next_page_url,
        prev_page_url: res.annsDis.prev_page_url,
        from_page: res.annsDis.from,
        to_page: res.annsDis.to
      };
      this.pagination = pagination;
    }, */

    setPage: function (pageNumber) {
      this.currentPage = pageNumber;
    },
  },

  computed: {
    filteredAnnonces: function () {
      return this.annsDis.filter((annonce) => {
        return (
          annonce.description.match(this.search) ||
          annonce.categorie.match(this.search) ||
          annonce.lieux.match(this.search) ||
          annonce.user.code.match(this.search) ||
          annonce.human_created_at.match(this.search) ||
          annonce.created_at.match(this.search) ||
          annonce.date_intervention.match(this.search) ||
          annonce.titre.match(this.search)
        );
      });
    },

    getDistanceFromLatLonInKm() {
      var R = 6371; // Radius of the earth in km
      var dist = [];
      var i;
      var d = "";
      for (i = 0; i < this.annsDis.length; i++) {
        var dLat =
          (this.$store.state.user.latitude - this.annsDis[i].latitude) *
          (Math.PI / 180); // deg2rad below
        var dLon =
          (this.$store.state.user.longitude - this.annsDis[i].longitude) *
          (Math.PI / 180); // deg2rad below
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.annsDis[i].latitude * (Math.PI / 180)) *
            Math.cos(this.$store.state.user.latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        dist[i] = R * c;
        dist.push(dist[i]);
      }

      return dist;
    },

    /* deg2rad(deg) {
  return deg * (Math.PI/180)
}, */

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
  min-height: 1px;
  padding: 0.25rem;
}
@media (min-width: 1200px) {
  #modal-edit-image {
    max-width: 310px;
    margin: 1.75rem auto;
  }
}
.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;

  padding: 1.25rem !important;
}
</style>