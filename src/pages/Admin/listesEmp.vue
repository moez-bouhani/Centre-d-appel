<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Prenom</th>
          <th scope="col">téléphone</th>
          <th scope="col"> N° Poste</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in listesUsers" :key="user">
          <th scope="row">{{ user.nom }}</th>
          <td>{{ user.prenom }}</td>
          <td>
            {{ user.telephone }}
          </td>
          <td v-show="user.numero_post.length!=0" 
           v-for="nu in user.numero_post" :key="nu"> 
            {{ nu.num }}
          </td>

          <td v-show="user.numero_post.length==0" >
          -
          </td>
          <td> 
        <div v-show="user.numero_post.length!=0">
          <router-link :to="{ name: 'ajouter-numero', params: { id: user.id } }"
              >
           
              <img   title="Ajouter Numero de poste" src="/add_poste.png" alt="add" /> 
              </router-link>
        </div>


        <div v-show="user.numero_post.length==0">
          <router-link :to="{ name: 'ajouter-poste', params: { id: user.id } }"
              >
           
              <img   title="Ajouter Numero de poste" src="/add_poste.png" alt="add" /> 
              </router-link>
        </div>
           

          <!--     <i
                class="fa fa-trash text-danger"
                title="Delete user"
                @click="deleteUsers(user.id)"
              ></i> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { apiDomain } from "../../config";
export default {
  data() {
    return {
      listesUsers: [],
      isLoading: false,
    };
  },
  created(){
this.fetchListesUsers();
  },
  methods: {
    fetchListesUsers() {
      axios
        .get(
          `${apiDomain}/api/showAllEmp`
        )
        .then((response) => (this.listesUsers = response.data.succes))
        .catch((error) => {});
    },
  },
};
</script>
