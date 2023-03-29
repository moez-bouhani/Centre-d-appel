
<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" text="Users">
        <template>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <center>
                <h5 class="text-center">{{ usersAll.length }}</h5>
              </center>
            </template>
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mx-3"
            style="height: 70px"
            background-color="#4e5259"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" text="Packs">
        <template>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <center>
                <h5 class="text-center">{{ packsAll.length }}</h5>
              </center>
            </template>
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mx-3"
            style="height: 70px"
            background-color="#2386CC"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetDropdown color="warning" text="Déclrations">
        <template>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <center>
                <h5 class="text-center">{{ annoncesAll.length }}</h5>
              </center>
            </template>
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mx-3"
            style="height: 70px"
            background-color="#CC8E2B"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetDropdown color="danger" text="Catégories">
        <template>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <center>
                <h5 class="text-center">{{ categoriesAll.length }}</h5>
              </center>
            </template>
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mx-3"
            style="height: 70px"
            background-color="rgb(250, 152, 152)"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>
<script>
import { CChartLineSimple, CChartBarSimple } from "../charts/index.js";
import axios from "axios";
import { apiDomain } from "../../config";

export default {
  components: {
    CChartLineSimple,
    CChartBarSimple,
  },
  /*  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
  }, */
  props: ["user"],
  data() {
    return {
      usersAll: {},
      packsAll: {},
      annoncesAll: {},
      categoriesAll: {},
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchUsers();
    this.fetchPacks();
    this.fetchAnnonces();
    this.fetchGategories();
  },
  methods: {
    //fetch notificatiuons all contacts
    fetchUsers() {
      fetch(`${apiDomain}/api/getallUerSt`)
        .then((res) => res.json())
        .then((res) => {
          this.usersAll = res.users;
        })
        .catch((err) => console.log(err));
    },

    fetchPacks() {
      fetch(`${apiDomain}/api/getallpackSt`)
        .then((res) => res.json())
        .then((res) => {
          this.packsAll = res.packs;
        })
        .catch((err) => console.log(err));
    },

    fetchAnnonces() {
      fetch(`${apiDomain}/api/getallannonceSt`)
        .then((res) => res.json())
        .then((res) => {
          this.annoncesAll = res.annonces;
        })
        .catch((err) => console.log(err));
    },

    fetchGategories() {
      fetch(`${apiDomain}/api/getallcategorieSt`)
        .then((res) => res.json())
        .then((res) => {
          this.categoriesAll = res.categories;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>
