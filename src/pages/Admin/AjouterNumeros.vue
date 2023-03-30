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
            listesUsers[0].numero_post[0].num
          }}</span>
          </p>
        </div>
      </div>

    </div>
    <div class="d-flex justify-content-between">
      <div>
        <input type="file" ref="fileInput" @change="handleFileUpload" />
      </div>
      <div>
        <button
          style="background: #232830;
    color: #fff;
    border-radius: 12px;
    padding: 10px;"
          type="sumit"
          color="primary"
          class="btn btn-link mt-3"
          @click="AjouterNumeros"
        >
          Ajouter le fichier Excel
        </button>
      </div>
    </div>

    <div>
      <b-card>
        <div>
          Nom: {{ listesUsers[0].nom }} | Prénom: {{ listesUsers[0].prenom }} |
          Téléphone: {{ listesUsers[0].telephone }} | Poste N°:{{
            listesUsers[0].numero_post[0].num
          }}
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
      numero:[],
      listesUsers: [],
      saveData: [],
      isLoading: false,
      isLoadingCopie: false,
    };
  },
  created() {
    this.fetchListesUsersById(this.$route.params.id);
  },
  methods: {
    AjouterNumeros() {
      this.isLoading = true;
      this.numero=this.saveData[0];
      var n = this.numero;
      // for (var i = 0; i < n.length; i++) {
      let formData = new FormData();
      for (var i = 0; i < this.numero.length; i++) {
        formData.append("numero[" + i + "][nom]",this.numero[i][0]);
        formData.append("numero[" + i + "][prenom]",this.numero[i][1]);
        formData.append("numero[" + i + "][adresse]",this.numero[i][2]);
        formData.append("numero[" + i + "][code_postale]",this.numero[i][3]);
        formData.append("numero[" + i + "][date_nais]",this.numero[i][4]);
        formData.append("numero[" + i + "][telephone]",this.numero[i][5]);
        formData.append("numero[" + i + "][user_id]",this.$route.params.id);
      };
              axios
          .post(
            `${apiDomain}/api/numero`,

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

            // this.fetchsearch();
          })

          .catch((error) => {
            this.isLoading = false;

            console.log(error.response.data);
          });
      this.$noty.success("Tous les numéros ont été ajoutée avec Succès ! ");
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        console.log(rows);
        // Call a method to save data to the database

        this.saveData.push(rows);
        this.numero=this.saveData[0];
        /*  this.AjouterNumeros(); */
      };

      reader.readAsArrayBuffer(file);
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
