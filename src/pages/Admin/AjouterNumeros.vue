<template>
  <div class="container">
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
      var n = this.saveData[0];
      n.forEach((i) => {
        let formData = new FormData();
        formData.append("nom", i[0]);
        formData.append("prenom", i[1]);

        formData.append("adresse", i[2]);
        formData.append("code_postale", i[3]);

        formData.append("date_nais", i[4]);
        formData.append("telephone", i[5]);
        formData.append("user_id", this.$route.params.id);
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
      });
      this.$noty.success("Tous les numéros à été ajoutée avec Succès ! ");
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
