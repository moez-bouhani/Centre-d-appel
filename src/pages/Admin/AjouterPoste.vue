<template>
  <div class="container">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <!-- Start Card nom et prénom user -->
      <div class="card" style="border-radius: 15px;height:45px !important">
        <div class="card-body" style="padding: 0.9em">
          <p class="card-text">
            <i class="fas fa-user"></i>&nbsp;{{ listesUsers[0].nom }} {{ listesUsers[0].prenom }}
          </p>
        </div>
      </div>
      <!-- End Card nom et prénom user -->
      <!-- Start Card numéro poste -->
      <div class="card" style="border-radius: 15px;height:45px !important">
        <div class="card-body" style="padding: 0.9em">
          <p class="card-text">
            <i class="fas fa-desktop"></i><span> Poste N° {{
          num
          }}</span>
          </p>

       
        </div>
      
      </div>

    </div>
  

    <div>
      <b-card>
        <div>
          <CInput
                    required
                    placeholder="Entrer le nuemro de poste"
                    v-model="num"
                  >
                    
                  </CInput>
                  <button
          style="background: #232830;
    color: #fff;
    border-radius: 12px;
    padding: 10px;"
          type="sumit"
          color="primary"
          class="btn btn-link "
          @click="AjouterPoste"
        >
          Ajouter poste
        </button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { apiDomain } from "../../config";
import * as XLSX from "xlsx";
import csvParse from "csv-parse";
export default {
  data() {
    return {
      listesUsers: [],
      saveData: [],
      isLoading: false,
      isLoadingCopie: false,
      num:'',
    };
  },
  created() {
    this.fetchListesUsersById(this.$route.params.id);
  },
  methods: {
    AjouterPoste() {
      this.isLoading = true;
   
   
        let formData = new FormData();
        formData.append("num", this.num);
       
        formData.append("user_id", this.$route.params.id);
        axios
          .post(
            `${apiDomain}/api/add/poste/${this.$route.params.id}`,

            formData,
            {
              body: JSON.stringify(this.numero),
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )

          .then((res) => {
            this.isLoading = false;
     
            this.$noty.success("Numéro de Poste a été ajoutée avec Succès ! ");
           this.$router.push("/listes-emps");
          })

          .catch((error) => {
            this.isLoading = false;
          });

    },

  

    fetchListesUsersById(id) {
      axios
        .get(`${apiDomain}/api/showEmpById/${this.$route.params.id}`)
        .then((response) => (this.listesUsers = response.data.succes))
        .catch((error) => {});
    },
  },
};
</script>
