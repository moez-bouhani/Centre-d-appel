

<template>
  <div>
    <br /><br /><br /><br /><br />

    <!-- <div  v-for="annonce in number" :key="annonce.id">
{{annonce.annonce.titre}}
</div> -->
    <div class="row" v-if="number.length == 0">
      <div class="col-sm-6 col-lg-6 offset-2">
        <CRow>
          <CCol sm="12">
            <!-- md="4" -->
            <CCard accent-color="warning">
              <CCardBody>
                Cette annonces maintenant ne contient pas contact !
                <img
                  src="https://img.icons8.com/officel/16/000000/do-not-disturb.png"
                />
                <br />
                <router-link to="/">
                  <img
                    src="https://img.icons8.com/officel/16/000000/return.png"
                    width="25px"
                  />
                </router-link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
      <!-- end col-md-6 -->

      <div class="col-md-3"></div>
      <div class="col-md-2"></div>
    </div>

    <div v-if="number.length != 0" class="row">
      <div class="col-sm-6 col-lg-6 offset-1">
        <CRow>
          <CCol sm="12">
            <!-- md="4" -->
            <CCard accent-color="warning">
              <CCardHeader>
                <p>
                  <center>
                    <img
                      src="https://img.icons8.com/bubbles/50/000000/1-circle.png"
                      width="5%"
                    />
                    code de client: {{ number[0].user_client.code }} -
                    <img
                      src="https://img.icons8.com/cute-clipart/64/000000/age.png"
                      width="4%"
                    />
                    Publier :{{ number[0].annonce.human_created_at }}
                  </center>
                </p>
              </CCardHeader>
              <CCardBody>
                <div class="row">
                  <div class="col-md-2">
                    <img
                      :src="`${apiDomain}/uploads/allAnnonces/${number[0].annonce.titre}`"
                      class="img"
                      width="150%"
                    />
                  </div>
                  <div class="col md-11">
                    <center>
                      <p class="list-group-item list-group-item-dangerr">
                        <img
                          src="https://img.icons8.com/clouds/100/000000/edit.png"
                          width="8%"
                        />
                        Description:{{ number[0].annonce.description }}
                      </p>
                    </center>
                    <br />
                    <center>
                      <p class="list-group-item list-group-item-dangerr">
                        <img
                          src="https://img.icons8.com/bubbles/50/000000/worldwide-location.png"
                          width="40"
                        />
                        Lieux:{{ number[0].annonce.lieux }}
                      </p>
                    </center>
                    <hr />
                    <router-link to="/">
                      <img
                        src="https://img.icons8.com/officel/16/000000/return.png"
                        width="25px"
                      />
                    </router-link>
                    <!--  <center>
    <p ><img src="https://img.icons8.com/bubbles/50/000000/speech-bubble-with-dots.png" width="7%"/>  {{nbrContactAnnonce}} contacts  - <img  src="https://img.icons8.com/cute-clipart/64/000000/reply-arrow.png " width="5%"/>  {{nbReponse}} Réponces </p>
 </center>  -->
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
      <!-- end col-md-6 -->

      <div class="col-md-4">
        <div>
          <CCard accent-color="info">
            <div class="row">
              <div class="feed" ref="feed">
                <br />
                <ol class="list-group">
                  <li
                    class="list-group-item"
                    v-for="annonce in number"
                    :key="annonce.id"
                  >
                    <img
                      src="https://img.icons8.com/bubbles/50/4a90e2/user.png"
                    />

                    <span class="text15">
                      {{
                        annonce.user_depanneur.nom.charAt(0).toUpperCase() +
                        annonce.user_depanneur.nom.charAt(1) +
                        annonce.user_depanneur.nom.charAt(2)
                      }}*********
                      <br />
                      {{ annonce.message }}
                    </span>

                    <br />
                    <B style="color: white"> ..........</B>
                    <img
                      src="https://img.icons8.com/color/48/000000/time.png"
                      width="5%"
                    />
                    {{ annonce.created_at }} -
                    <img
                      src="https://img.icons8.com/color/48/000000/price-tag-pound.png"
                      width="20px"
                    />
                    Prix:{{ annonce.prix_propose_par_depanneur }}DT
                  </li>
                </ol>
              </div>
            </div>
          </CCard>
        </div>

        <br />
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
</template>

<script>
import TimeAgo from "vue2-timeago";
import axios from "axios";
import { apiDomain } from "../config";

export default {
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    TimeAgo,
  },
  data() {
    return {
      number: {},
      apiDomain: "http://localhost:8000",
      isCreating: false,
      errors: [],
    };
  },

  computed: {
    /*   singlepost(){
                return this.$store.getters.singlepost
            } */
  },
  mounted() {},
  created() {
    this.fetchNumberOf(this.$route.params.id);
  },
  methods: {
    fetchNumberOf(id) {
      fetch(`${apiDomain}/api/number/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.number = res;
        })
        .catch((err) => console.log(err));
    },

    /*  singlePost(){
                this.$store.dispatch('getPostById',this.$route.params.id);
            }, */
    //modale contacter client
    modalActionContact() {
      if (this.modalContacterClient == false) {
        this.modalContacterClient = true;
      } else {
        this.modalContacterClient = false;
      }
    },

    /*     fetchContactAndRepley(id) {
        
    axios.get(`${apiDomain}/api/getContactWithReply/${id}`) 
       .then((response) => {
              this.contactWithreplay = response.contact;
              
                     
                });
       
    }, */
  },
  /*  mounted(){
            this.singlePost();
        },
        watch:{
            $route(to,from){
                this.singlePost();
            }
        } */
};
</script>

<style lang="scss" scoped>
.text15 {
  max-width: 800px;
  border-radius: 24px;
  padding: 12px;
  display: inline-block;
  background: #e0e3e7;
  // color: honeydew;
}

.v-time-ago__text {
  background: none !important;
}
/* .feed .text[data-v-0b42c620] {
    max-width: 800px;
    border-radius: 24px;
    padding: 12px;
    background: #e0e3e7;
    text-align: left;
    margin-left: -34px;
} */
.feed {
  background: white;
  height: 100%;
  max-height: 370px;
  overflow: scroll;
  width: 100%;

  ul {
    list-style-type: none;
    padding: 5px;

    li {
      margin: 30px 0;
      width: 100%;

      .text {
        max-width: 800px;
        border-radius: 24px;
        padding: 12px;
        display: inline-block;
        background: #e0e3e7;
        // color: honeydew;
      }
    }
  }
  /* .text {
                    max-width: 800px;
                    border-radius: 24px;
                    padding: 12px;
                   
                  background: #e0e3e7;
                  text-align: left;
                } */
}
</style>

