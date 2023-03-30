<template>
  <div class="container">

    <!-- Start Div flex Card nom et prénom user, Card num poste, Card numéro copie, Bouton copier -->
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <!-- Start Card nom et prénom user -->
      <div class="card" style="border-radius: 15px;height:45px !important">
        <div class="card-body" style="padding: 0.9em">
          <p class="card-text">
            <i class="fas fa-user"></i>&nbsp;{{ user.nom }} {{ user.prenom }}
          </p>
        </div>
      </div>
      <!-- End Card nom et prénom user -->
      <!-- Start Card numéro poste -->
<div class="card" style="border-radius: 15px;height:45px !important">
        <div class="card-body" style="padding: 0.9em">
          <p class="card-text">
            <i class="fas fa-desktop"></i><span> Poste N° 1123</span>
          </p>
        </div>
      </div>
      <!-- End Card numéro poste -->

      <!-- Start Card numéro copié -->
      <div v-if="copiedNumber" class="card" style="border-radius: 15px;height:45px !important;float:right">
        <div class="card-body" style="padding: 0.9em">
          <p class="card-text">
            <i class="fas fa-phone"></i> &nbsp;Copie courante:
            {{ copiedNumber }}
          </p>
        </div>
      </div>
      <!-- End Card numéro copié -->
      <!-- Start Bouton copir numéro suivant -->
      <CButton
        type="submit"
        style="
          background-color: #f1991b;
          float: right;
          border-radius: 15px;
          margin-top: 0 !important;
          margin-right:0 !important;
          margin-left:0 !important;
          margin-bottom:1.5em !important;height:45px !important
        "
        color="primary"
        class="px-4"
        @click="
          copyNumbers();
          copy()
        "
      >
        <p class="card-text">
          <i class="fas fa-copy"></i> {{ isLoading ? "En cours attendez ..." : "Copier le numéro suivant" }}
        </p>
      </CButton>
      <!-- End Bouton copir numéro suivant -->
    </div>
    <div class="form-group">
            <input
              v-model="search"
              class="form-control"
              aria-label="label"
              type="text"
              placeholder="Chercher ... "
            />
          </div>
    <!-- End Div flex Card nom et prénom user, Card num poste, Card numéro copie, Bouton copier -->
    <!-- Start table de la liste des numéros-->
    <table class="table table-hover table-light" style="border-radius: 10px">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Téléphone</th>
          <th scope="col">Adresse</th>
          <th scope="col">Date de naissance</th>
          <th scope="col">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(numero, index) in filtered" :key="index">
          <td>{{ numero.nom }}</td>
          <td>{{ numero.prenom }}</td>
          <td>
            <span
              style="padding: 9px; border-radius: 10px"
              :class="{
                'background-red':
                  numero.statut == 1 && index != currentIndex - 1,
                'background-blue': numero.statut == 0,
                'backgound-green':
                  numero.statut == 1 && index == currentIndex - 1,
              }"
              >{{ numero.telephone }}</span
            >
          </td>
          <td>{{ numero.adresse }}</td>
          <td>{{ numero.date_nais }}</td>

          <td>
            <span
              v-if="numero.statut == 1 && index != currentIndex - 1"
              class="badge badge-secondary"
              style="padding: 10px; color: #dd1624"
              >Copié</span
            >
            <span
              v-if="numero.statut == 0"
              class="badge badge-secondary"
              style="padding: 10px; color: #333"
              >Pas copié</span
            >
            <span
              v-if="numero.statut == 1 && index == currentIndex - 1"
              class="badge badge-secondary"
              style="padding: 10px; color: green"
              >En cours</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End table de la liste des numéros-->
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import csvParse from "csv-parse";
import { apiDomain } from "../../config";
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      numeros: [],
      currentIndex: localStorage.getItem("myIndex")!=null ? localStorage.getItem("myIndex") :0,
      lastIndex: 0,
      copiedNumber: null,
      search: "",
    };
  },
  computed: {
    filtered: function () {
      if (Array.isArray(this.numeros)) {
        return this.numeros.filter((numero) => {
          return (
            numero.nom.toLowerCase().match(this.search.toLowerCase()) ||
            numero.prenom.toLowerCase().match(this.search.toLowerCase())||
            numero.telephone.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
     let myIndex = this.currentIndex;
    // Save myVariable to local storage
    // this.lastIndex = lastIndex ? parseInt(lastIndex) : 0
      localStorage.setItem("myIndex", myIndex);
  },
  created() {
    this.fetchNumeros(this.$store.state.user.id);
  },
  methods: {
    updateLastIndex(index) {
      this.lastIndex = index;
      localStorage.setItem("myIndex", index);
    },

    copy() {
      let copiedNumbers = this.copiedNumber; // Séparer les numéros par ligne
      navigator.clipboard.writeText(copiedNumbers); // Copier les numéros dans le presse-papier
    },

    copyNumbers() {
      if (this.currentIndex < this.numeros.length) {
        // this.numberStatus = this.numeros[this.currentIndex].statut;
        this.copiedNumber = this.numeros[this.currentIndex].telephone;

        var formData = new FormData();
        axios.post(
          `${apiDomain}/api/update/statut/${
            this.numeros[this.currentIndex].id
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.fetchNumeros();
        this.currentIndex++;
        this.updateLastIndex(this.currentIndex);
        this.fetchNumeros();
      } else {
        this.copiedNumber = null;
      }
    },
    fetchNumeros(id) {
      fetch(`${apiDomain}/api/show/numerosByUserid/${this.$store.state.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.numeros = res.numerosUser[0].numero_list;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
@import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");
.background-blue {
  color: #333;
  background-color: #d7d7d7;
}

.background-red {
  color: #fff;
  background-color: #ee614d;
}

.backgound-green {
  color: #fff;
  background-color: #00b700;
}
.statut {
  padding: 9px;
  border-radius: 10px;
  background-color: #c6c6c6;
}
</style>