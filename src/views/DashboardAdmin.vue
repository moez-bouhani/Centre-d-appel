<template>
  <div>
    <WidgetsDropdown />
    <CCard>
      <!--   <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">Traffic</h4>
            <div class="small text-muted">November 2017</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="primary" class="float-right">
              <CIcon name="cil-cloud-download"/>
            </CButton>
            <CButtonGroup class="float-right mr-3">
              <CButton
                color="outline-secondary"
                v-for="(value, key) in ['Day', 'Month', 'Year']"
                :key="key"
                class="mx-0"
                :pressed="value === selected ? true : false"
                @click="selected = value"
              >
                {{value}}
              </CButton>
            </CButtonGroup>
          </CCol>
        </CRow>
        <MainChartExample style="height:300px;margin-top:40px;"/>
      </CCardBody> -->

      <!-- statistique chaque annonce par categorie -->
      <CCardHeader> Annonces par Catégories </CCardHeader>
      <CCardFooter>
        <CRow class="text-center">
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">serrurier ({{ PserrieirAll }}%)</div>
            <strong>{{ serrieirAll.length }}</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="2"
              color="success"
              :value="PserrieirAll"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0 d-md-down-none">
            <div class="text-muted">Plambier ({{ PplombierAll }}%)</div>
            <strong>{{ plombierAll.length }}</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="info"
              :value="PplombierAll"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">Eléctricien ({{ PelectricienAll }}%)</div>
            <strong>{{ electricienAll.length }}</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="warning"
              :value="PelectricienAll"
            />
          </CCol>
          <CCol md sm="12" class="mb-sm-2 mb-0">
            <div class="text-muted">Vitrier ({{ PvitriersAll }}%)</div>
            <strong>{{ vitriersAll.length }}</strong>
            <CProgress
              class="progress-xs mt-2"
              :precision="1"
              color="danger"
              :value="PvitriersAll"
            />
          </CCol>
        </CRow>
      </CCardFooter>

      <card type="chart" cardCol>
        <template slot="header">
          <h5 class="card-category">
            Nombre des annonces pour chaque catégories
          </h5>
          <h3 class="card-title">
            <i class="tim-icons icon-bell-55 text-primary"></i>
          </h3>
        </template>
        <apexchart
          type="line"
          height="250"
          width="950"
          :options="chartOptions4"
          :series="AnnonceParCat"
        ></apexchart>
      </card>
    </CCard>
    <WidgetsBrand />

    <!-- annonces par annee et mois -->

    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <b class="resFilAnonce">
              <center>
                <img src="AnnoncesMois.png" width="7%" /> Déclarations par mois
                | Année {{ selectedAnnonce.year }}:
                {{ totalAnnoncesAnnee }} Annonces
              </center>
            </b>
          </CCardHeader>
          <CCardHeader>
            <div
              class="form-check form-check-inline"
              v-for="(annUsers, index) in anneeUsers"
              :key="'i' + index"
            >
              <div v-if="annUsers <= yearSystem">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  :value="annUsers"
                  :id="'annUsers' + index"
                  v-model="selectedAnnonce.year"
                  @change="loadAnnoncesMois(selectedAnnonce.year)"
                />

                <label class="form-check-label" :for="'annUsers' + index">
                  {{ annUsers }}
                </label>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <card type="chart" cardCol>
              <template slot="header">
                <h3 class="card-title">
                  <!-- <i class="tim-icons icon-delivery-fast text-info"></i> -->
                  <i class="tim-icons icon-bell-55 text-primary"></i>
                </h3>
              </template>
              <apexchart
                type="bar"
                height="250"
                width="950"
                :options="chartOptionsChaqueMoisAnnonce"
                :series="AnnoncesMois"
              ></apexchart>
            </card>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- pack par mois et annee -->

    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <b class="resFilPack">
              <center>
                <img src="PackMois.png" width="7%" /> Abonnements par mois |
                Année {{ selectedPack.year }}: {{ totalPacksAnnee }} Abonnés
              </center>
            </b>
          </CCardHeader>
          <CCardHeader>
            <div
              class="form-check form-check-inline"
              v-for="(annUsers, index) in anneeUsers"
              :key="'i' + index"
            >
              <div v-if="annUsers <= yearSystem">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  :value="annUsers"
                  :id="'annUsers' + index"
                  v-model="selectedPack.year"
                  @change="loadPackesMois(selectedPack.year)"
                />

                <label class="form-check-label" :for="'annUsers' + index">
                  {{ annUsers }}
                </label>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <card type="chart" cardCol>
              <template slot="header">
                <h3 class="card-title">
                  <!-- <i class="tim-icons icon-delivery-fast text-info"></i> -->
                  <i class="tim-icons icon-bell-55 text-primary"></i>
                </h3>
              </template>
              <apexchart
                type="bar"
                height="250"
                width="950"
                :options="chartOptionsChaqueMoisPack"
                :series="PacksMois"
              ></apexchart>
            </card>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader> Dépanneurs par Catégories </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12" lg="6">
                <CRow>
                  <CCol sm="6">
                    <CCallout color="info">
                      <small class="text-muted"
                        >Serrierie {{ PuserserrieirAll }}%</small
                      ><br />
                      <strong class="h4">{{ userserrieirAll.length }}</strong>
                    </CCallout>
                  </CCol>
                  <CCol sm="6">
                    <CCallout color="danger">
                      <small class="text-muted"
                        >Plambier {{ PuserplombierAll }}%</small
                      ><br />
                      <strong class="h4">{{ userplombierAll.length }}</strong>
                    </CCallout>
                  </CCol>
                </CRow>
                <hr class="mt-0" />
              </CCol>
              <CCol sm="12" lg="6">
                <CRow>
                  <CCol sm="6">
                    <CCallout color="warning">
                      <small class="text-muted"
                        >Eléctricien {{ PuserelectricienAll }}%</small
                      ><br />
                      <strong class="h4">{{
                        userelectricienAll.length
                      }}</strong>
                    </CCallout>
                  </CCol>
                  <CCol sm="6">
                    <CCallout color="success">
                      <small class="text-muted"
                        >Vitrier {{ PuservitriersAll }}%</small
                      ><br />
                      <strong class="h4">{{ uservitriersAll.length }}</strong>
                    </CCallout>
                  </CCol>
                </CRow>
                <hr class="mt-0" />
              </CCol>

              <card type="chart" cardCol>
                <template slot="header">
                  <h5 style="color: black" class="card-category">
                    Nombre des dépanneurs pour chaque catégories
                  </h5>
                  <h3 class="card-title">
                    <i class="tim-icons icon-bell-55 text-primary"></i>
                  </h3>
                </template>
                <apexchart
                  type="line"
                  height="250"
                  width="950"
                  :options="chartOptionsDepParCat"
                  :series="DepParCat"
                ></apexchart>
              </card>
            </CRow>

            <!-- <card type="chart">
          <template slot="header">
            <h5 class="card-category">Répartition des zones touristiques selon chaque ville</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> 315 Zones Touristiques
            </h3>
          </template>
          <apexchart type="pie" width="380" :options="chartOptions1" :series="series1"></apexchart>
        </card> -->

            <!--             <CDataTable
              class="mb-0 table-outline"
              hover
              :items="tableItems"
              :fields="tableFields"
              head-color="light"
              no-sorting
            >
              <td slot="avatar" class="text-center" slot-scope="{item}">
                <div class="c-avatar">
                  <img :src="item.avatar.url" class="c-avatar-img" alt="">
                  <span
                    class="c-avatar-status"
                    :class="`bg-${item.avatar.status || 'secondary'}`"
                  ></span>
                </div>
              </td>
              <td slot="user" slot-scope="{item}">
                <div>{{item.user.name}}</div>
                <div class="small text-muted">
                  <span>
                    <template v-if="item.user.new">New</template>
                    <template v-else>Recurring</template>
                  </span> | Registered: {{item.user.registered}}
                </div>
              </td>
              <td
                slot="country"
                slot-scope="{item}"
                class="text-center"
              >
                <CIcon
                  :name="item.country.flag"
                  height="25"
                />
              </td>
              <td slot="usage" slot-scope="{item}">
                <div class="clearfix">
                  <div class="float-left">
                    <strong>{{item.usage.value}}%</strong>
                  </div>
                  <div class="float-right">
                    <small class="text-muted">{{item.usage.period}}</small>
                  </div>
                </div>
                <CProgress
                  class="progress-xs"
                  v-model="item.usage.value"
                  :color="color(item.usage.value)"
                />
              </td>
              <td1111111111111111111
                slot="payment"
                slot-scope="{item}"
                class="text-center"
              >
                <CIcon
                  :name="item.payment.icon"
                  height="25"
                />
              </td>
              <td slot="activity" slot-scope="{item}">
                <div class="small text-muted">Last login</div>
                <strong>{{item.activity}}</strong>
              </td>
            </CDataTable> -->
          </CCardBody>
        </CCard>

        <!-- sur chaque moins -->

        <CRow>
          <CCol md="12">
            <CCard>
              <CCardHeader>
                <b class="resFil">
                  <center>
                    <img src="usersMois.png" width="7%" /> Utilisateurs par mois
                    | Année {{ selected.year }}:
                    {{ totalUsersAnnee }} Inscriptions
                  </center>
                </b>
              </CCardHeader>
              <CCardHeader>
                <div
                  class="form-check form-check-inline"
                  v-for="(annUsers, index) in anneeUsers"
                  :key="'i' + index"
                >
                  <div v-if="annUsers <= yearSystem">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      :value="annUsers"
                      :id="'annUsers' + index"
                      v-model="selected.year"
                      @change="loadUsersMois(selected.year)"
                    />

                    <label class="form-check-label" :for="'annUsers' + index">
                      {{ annUsers }}
                    </label>
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <card type="chart" cardCol>
                  <template slot="header">
                    <h5 class="card-category">Users par mois</h5>
                    <h3 class="card-title">
                      <!-- <i class="tim-icons icon-delivery-fast text-info"></i> -->
                      <i class="tim-icons icon-bell-55 text-primary"></i>
                    </h3>
                  </template>
                  <apexchart
                    type="bar"
                    height="250"
                    width="950"
                    :options="chartOptionsChaqueMois"
                    :series="UMois"
                  ></apexchart>
                </card>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <!-- clients par mois et anneé -->

        <CRow>
          <CCol md="12">
            <CCard>
              <CCardHeader>
                <b class="resFilClient">
                  <center>
                    <img src="ClientsMois.png" width="7%" /> Clients par mois |
                    Année {{ selectedClient.year }}:
                    {{ totalClientsAnnee }} Inscriptions
                  </center>
                </b>
              </CCardHeader>
              <CCardHeader>
                <div
                  class="form-check form-check-inline"
                  v-for="(annUsers, index) in anneeUsers"
                  :key="'i' + index"
                >
                  <div v-if="annUsers <= yearSystem">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      :value="annUsers"
                      :id="'annUsers' + index"
                      v-model="selectedClient.year"
                      @change="loadClientsMois(selectedClient.year)"
                    />

                    <label class="form-check-label" :for="'annUsers' + index">
                      {{ annUsers }}
                    </label>
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <card type="chart" cardCol>
                  <template slot="header">
                    <!--  <h5 class="card-category">Users par mois</h5> -->
                    <h3 class="card-title">
                      <!-- <i class="tim-icons icon-delivery-fast text-info"></i> -->
                      <i class="tim-icons icon-bell-55 text-primary"></i>
                    </h3>
                  </template>
                  <apexchart
                    type="bar"
                    height="250"
                    width="950"
                    :options="chartOptionsChaqueMoisClient"
                    :series="ClientsMois"
                  ></apexchart>
                </card>
              </CCardBody>
            </CCard>
          </CCol> </CRow
        ><!-- fin client par mois et annee -->

        <!-- Deps par mois et anneé -->

        <CRow>
          <CCol md="12">
            <CCard>
              <CCardHeader>
                <div class="row">
                  <div class="col-md-12">
                    <b class="resFilDep">
                      <center>
                        <img src="DepsMois.png" width="7%" /> Dépanneurs par
                        mois | Année {{ selectedDep.year }}:
                        {{ totalDepsAnnee }} Inscriptions
                      </center>
                    </b>
                  </div>
                </div>
              </CCardHeader>
              <CCardHeader>
                <div
                  class="form-check form-check-inline"
                  v-for="(annUsers, index) in anneeUsers"
                  :key="'i' + index"
                >
                  <div v-if="annUsers <= yearSystem">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      :value="annUsers"
                      :id="'annUsers' + index"
                      v-model="selectedDep.year"
                      @change="loadDepsMois(selectedDep.year)"
                    />

                    <label class="form-check-label" :for="'annUsers' + index">
                      {{ annUsers }}
                    </label>
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <card type="chart" cardCol>
                  <template slot="header">
                    <!--  <h5 class="card-category">Users par mois</h5> -->
                    <h3 class="card-title">
                      <!-- <i class="tim-icons icon-delivery-fast text-info"></i> -->
                      <i class="tim-icons icon-bell-55 text-primary"></i>
                    </h3>
                  </template>
                  <apexchart
                    type="bar"
                    height="250"
                    width="950"
                    :options="chartOptionsChaqueMoisDep"
                    :series="DepsMois"
                  ></apexchart>
                </card>
              </CCardBody>
            </CCard>
          </CCol> </CRow
        ><!-- fin Deps par mois et annee -->
        <CCard>
          <CCardHeader> Genre </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-md-6">
                <div class="progress-group-header">
                  <CIcon name="cil-user" class="progress-group-icon" />
                  <span class="title">Homme</span>
                  <span class="ml-auto font-weight-bold">{{
                    HommeAll.length
                  }}</span>
                </div>
                <div class="progress-group-bars">
                  <CProgress
                    class="progress-xs"
                    :value="PHommeAll"
                    color="warning"
                  />
                </div>

                <div class="progress-group-header">
                  <CIcon name="cil-user-female" class="progress-group-icon" />
                  <span class="title">Femme</span>
                  <span class="ml-auto font-weight-bold">{{
                    FemmeAll.length
                  }}</span>
                </div>
                <div class="progress-group-bars">
                  <CProgress
                    class="progress-xs"
                    :value="PFemmeAll"
                    color="success"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <card type="chart" cardCol>
                  <template slot="header">
                    <h5 class="card-category">Genre</h5>
                    <h3 class="card-title">
                      <!-- <i class="tim-icons icon-delivery-fast text-info"></i> -->
                      <i class="tim-icons icon-bell-55 text-primary"></i>
                    </h3>
                  </template>
                  <apexchart
                    type="bar"
                    height="250"
                    width="420"
                    :options="chartOptions2"
                    :series="HommeFemme"
                  ></apexchart>
                </card>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import MainChartExample from "./charts/MainChartExample";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
//import WidgetsBrand from './widgets/WidgetsBrand'

import axios from "axios";
import { apiDomain } from "../config";
export default {
  name: "Dashboard",
  components: {
    MainChartExample,
    WidgetsDropdown,
    // WidgetsBrand,
  },
  data() {
    return {
      anneeUsers: [
        "2020",
        "2021",
        "2022",
        "2024",
        "2025",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
      ],
      totalUsersAnnee: "",
      totalAnnoncesAnnee: "",
      totalPacksAnnee: "",

      PacksMois: "",
      totalDepsAnnee: "",

      yearAllUsers: [],
      UMois: {},
      ClientsMois: {},
      ClientsMois: {},

      DepsMois: {},
      AnnoncesMois: {},
      yearSystem: new Date().getFullYear(),

      selected: {
        year: new Date().getFullYear(),
      },

      selectedClient: {
        year: new Date().getFullYear(),
      },

      selectedPack: {
        year: new Date().getFullYear(),
      },

      selectedAnnonce: {
        year: new Date().getFullYear(),
      },
      selectedDep: {
        year: new Date().getFullYear(),
      },
      UsersChaqueMois: [
        {
          name: "Mois",
        },
      ],
      annee: "",
      UsersChaqueMoisnajeh: [],
      //statistique par annonce selon categorie
      serrieirAll: {},
      plombierAll: {},
      electricienAll: {},
      vitriersAll: {},

      userserrieirAll: {},
      userplombierAll: {},
      userelectricienAll: {},
      uservitriersAll: {},

      HommeAll: {},
      FemmeAll: {},
      //pourecntage
      PserrieirAll: {},
      PplombierAll: {},
      PelectricienAll: {},
      PvitriersAll: {},

      PuserserrieirAll: {},
      PuserplombierAll: {},
      PuserelectricienAll: {},
      PuservitriersAll: {},

      PHommeAll: {},
      PFemmeAll: {},

      AnnonceParCat: [
        {
          name: "catégorie",
        },
      ],

      /* series4: [
        
      ], */
      chartOptions4: {
        chart: {
          height: 250,
          type: "line",
        },
        stroke: {
          width: 4,
          curve: "smooth",
        },
        xaxis: {
          categories: ["Serrurier", "Plombier", "Electricien", "Vitrier"],
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: 2,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 4,
          },
        },
        yaxis: {
          minCat: 0,
          maxCat: 0,
          title: {
            text: "Annonces",
          },
        },
      },

      DepParCat: [
        {
          name: "catégorie",
        },
      ],

      chartOptionsDepParCat: {
        chart: {
          height: 250,
          type: "line",
        },
        stroke: {
          width: 4,
          curve: "smooth",
        },
        xaxis: {
          categories: ["Serrurier", "Plombier", "Electricien", "Vitrier"],
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: 2,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 4,
          },
        },
        yaxis: {
          minC: 0,
          maxC: 0,
          title: {
            text: "Dépanneurs",
          },
        },
      },
      chartOptionsChaqueMoisPack: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["Janvier"],
            ["Février"],
            ["Mars"],
            ["Avril"],
            ["Mai"],
            ["Juin"],
            ["Juiller"],
            ["Aout"],
            ["Sebtembre"],
            ["Octobre"],
            ["Novembre"],
            ["Décembre"],
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minU: 0,
          maxU: 0,
        },
      },
      chartOptionsChaqueMoisAnnonce: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["Janvier"],
            ["Février"],
            ["Mars"],
            ["Avril"],
            ["Mai"],
            ["Juin"],
            ["Juiller"],
            ["Aout"],
            ["Sebtembre"],
            ["Octobre"],
            ["Novembre"],
            ["Décembre"],
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minU: 0,
          maxU: 0,
        },
      },
      chartOptionsChaqueMoisDep: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["Janvier"],
            ["Février"],
            ["Mars"],
            ["Avril"],
            ["Mai"],
            ["Juin"],
            ["Juiller"],
            ["Aout"],
            ["Sebtembre"],
            ["Octobre"],
            ["Novembre"],
            ["Décembre"],
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minU: 0,
          maxU: 0,
        },
      },
      chartOptionsChaqueMoisClient: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["Janvier"],
            ["Février"],
            ["Mars"],
            ["Avril"],
            ["Mai"],
            ["Juin"],
            ["Juiller"],
            ["Aout"],
            ["Sebtembre"],
            ["Octobre"],
            ["Novembre"],
            ["Décembre"],
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minU: 0,
          maxU: 0,
        },
      },

      chartOptionsChaqueMois: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["Janvier"],
            ["Février"],
            ["Mars"],
            ["Avril"],
            ["Mai"],
            ["Juin"],
            ["Juiller"],
            ["Aout"],
            ["Sebtembre"],
            ["Octobre"],
            ["Novembre"],
            ["Décembre"],
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minU: 0,
          maxU: 0,
        },
      },

      chartOptions2: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [["Homme"], ["Femme"]],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minHF: 0,
          maxHF: 0,
          /*  title: {
            text: "G"
          } */
        },
      },
      //femme + homme
      HommeFemme: [
        {
          name: "Genre",
        },
      ],
      chartOptions1: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Homme", "Femme"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      chartOptions: {
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      selectedd: "Month",
      tableItems: [
        {
          avatar: { url: "img/avatars/1.jpg", status: "success" },
          user: {
            name: "Yiorgos Avraamu",
            new: true,
            registered: "Jan 1, 2015",
          },
          country: { name: "USA", flag: "cif-us" },
          usage: { value: 50, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Mastercard", icon: "cib-cc-mastercard" },
          activity: "10 sec ago",
        },
        {
          avatar: { url: "img/avatars/2.jpg", status: "danger" },
          user: {
            name: "Avram Tarasios",
            new: false,
            registered: "Jan 1, 2015",
          },
          country: { name: "Brazil", flag: "cif-br" },
          usage: { value: 22, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Visa", icon: "cib-cc-visa" },
          activity: "5 minutes ago",
        },
        {
          avatar: { url: "img/avatars/3.jpg", status: "warning" },
          user: { name: "Quintin Ed", new: true, registered: "Jan 1, 2015" },
          country: { name: "India", flag: "cif-in" },
          usage: { value: 74, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Stripe", icon: "cib-stripe" },
          activity: "1 hour ago",
        },
        {
          avatar: { url: "img/avatars/4.jpg", status: "" },
          user: { name: "Enéas Kwadwo", new: true, registered: "Jan 1, 2015" },
          country: { name: "France", flag: "cif-fr" },
          usage: { value: 98, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "PayPal", icon: "cib-paypal" },
          activity: "Last month",
        },
        {
          avatar: { url: "img/avatars/5.jpg", status: "success" },
          user: {
            name: "Agapetus Tadeáš",
            new: true,
            registered: "Jan 1, 2015",
          },
          country: { name: "Spain", flag: "cif-es" },
          usage: { value: 22, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Google Wallet", icon: "cib-google-pay" },
          activity: "Last week",
        },
        {
          avatar: { url: "img/avatars/6.jpg", status: "danger" },
          user: {
            name: "Friderik Dávid",
            new: true,
            registered: "Jan 1, 2015",
          },
          country: { name: "Poland", flag: "cif-pl" },
          usage: { value: 43, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Amex", icon: "cib-cc-amex" },
          activity: "Last week",
        },
      ],
      tableFields: [
        { key: "avatar", label: "", _classes: "text-center" },
        { key: "user" },
        { key: "country", _classes: "text-center" },
        { key: "usage" },
        { key: "payment", label: "Payment method", _classes: "text-center" },
        { key: "activity" },
      ],
    };
  },

  computed: {
    filteredData() {
      // params: this.selected
      var vm = this;

      const UsersChaqueMois = this.UsersChaqueMois;

      return _.filter(vm.UsersChaqueMois, function (data) {
        // }
        /* fin esle filter prix */
        var annee = vm.created_at ? data.created_at == vm.created_at : true;
        return annee;
      });
    },
    valuesUSersParMois() {
      //var  UsersChaqueMois = this.UsersChaqueMois;

      var maxMin = this.UsersChaqueMois,
        min = _.minBy(maxMin),
        max = _.maxBy(maxMin);

      /* this.chartOptionsChaqueMois.yaxis.minU = min;
      this.chartOptionsChaqueMois.yaxis.maxU = max; */

      return [min, max];
      // return [min.prix_fix * nbA + result, max.prix_fix * nbA];
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchSerrierie();
    this.fetchPlombier();
    this.fetchElectricien();
    this.fetchVitrier();

    this.fetchUserSerrierie();
    this.fetchUserPlombier();
    this.fetchUserElectricien();
    this.fetchUserVitrier();

    this.fetchHomme();
    this.fetchFemme();
    //percentage
    this.fetchPSerrierie();
    this.fetchPPlombier();
    this.fetchPElectricien();
    this.fetchPVitrier();

    this.fetchPUserSerrierie();
    this.fetchPUserPlombier();
    this.fetchPUserElectricien();
    this.fetchPUserVitrier();

    this.fetchPHomme();
    this.fetchPFemme();

    //chart
    this.fetchChartHommeFemme();
    this.fetchstatChartAnnonceParCat();
    this.fetchstatChartDepParCat();
    //chaque moins
    this.fetchUsersChaqueMois();
    this.fetchUsersChaqueMoisnajeh();
    this.loadUsersMois();
    this.loadClientsMois();
    this.loadDepsMois();
    this.loadAnnoncesMois();
    this.loadPackesMois();
    this.fetchyearAllUsers();
  },
  mounted() {},
  methods: {
    fetchyearAllUsers() {
      axios
        .get(`${apiDomain}/api/getYearUSer`)
        .then((response) => {
          this.yearAllUsers = response.data.data;
        })
        .catch((err) => console.log(err));
    },

    loadPackesMois: function () {
      axios

        .get(`${apiDomain}/api/getallpacksParAnnee/${this.selectedPack.year}`)
        /*  axios.get('/api/products', {
                        params: this.selected
                    }) */
        .then((response) => {
          this.totalPacksAnnee = response.data.total;
          this.PacksMois = [
            {
              // name: "GENRE",

              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadUsersMois: function () {
      axios

        .get(`${apiDomain}/api/getallUsersParAnnee/${this.selected.year}`)

        /*  axios.get('/api/products', {
                        params: this.selected
                    }) */
        .then((response) => {
          this.totalUsersAnnee = response.data.total;
          this.UMois = [
            {
              // name: "GENRE",

              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadAnnoncesMois: function () {
      axios

        .get(
          `${apiDomain}/api/getallAnnoncesParAnnee/${this.selectedAnnonce.year}`
        )

        /*  axios.get('/api/products', {
                        params: this.selected
                    }) */
        .then((response) => {
          this.totalAnnoncesAnnee = response.data.total;
          this.AnnoncesMois = [
            {
              // name: "GENRE",

              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /* client par mois et annee */

    loadClientsMois: function () {
      axios

        .get(
          `${apiDomain}/api/getallClientParAnnee/${this.selectedClient.year}`
        )

        /*  axios.get('/api/products', {
                        params: this.selected
                    }) */
        .then((response) => {
          this.totalClientsAnnee = response.data.total;
          this.ClientsMois = [
            {
              // name: "GENRE",

              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /* client par mois et annee */

    loadDepsMois: function () {
      axios

        .get(
          `${apiDomain}/api/getallDepanneurParAnnee/${this.selectedDep.year}`
        )

        /*  axios.get('/api/products', {
                        params: this.selected
                    }) */
        .then((response) => {
          this.totalDepsAnnee = response.data.total;
          this.DepsMois = [
            {
              // name: "GENRE",

              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    fetchUsersChaqueMoisnajeh() {
      axios
        .get(`${apiDomain}/api/usersChaqueMois`)
        .then((response) => {
          this.UsersChaqueMoisnajeh = response.data;
        })
        .catch((err) => console.log(err));
    },
    /* user sur chaque mois */

    fetchUsersChaqueMois() {
      axios
        .get(`${apiDomain}/api/usersChaqueMoin2`)
        .then((response) => {
          this.UsersChaqueMois = [
            {
              // name: "GENRE",

              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch((err) => console.log(err));
    },

    //chart femme et homme
    fetchChartHommeFemme() {
      axios
        .get(`${apiDomain}/api/statChartFemmeHomme`)
        .then((response) => {
          this.HommeFemme = [
            {
              // name: "GENRE",
              data: [response.data.femme, response.data.homme],
            },
          ];
        })
        .catch((err) => console.log(err));
    },

    //chart annonces par cat
    fetchstatChartAnnonceParCat() {
      axios
        .get(`${apiDomain}/api/statChartAnnonceParCat`)
        .then((response) => {
          this.AnnonceParCat = [
            {
              // name: "GENRE",
              data: [
                response.data.serrierie,
                response.data.Plombier,
                response.data.Electricien,
                response.data.Vitrier,
              ],
            },
          ];
        })
        .catch((err) => console.log(err));
    },
    fetchstatChartDepParCat() {
      axios
        .get(`${apiDomain}/api/statChartDepParCat`)
        .then((response) => {
          this.DepParCat = [
            {
              // name: "GENRE",
              data: [
                response.data.serrierie,
                response.data.Plombier,
                response.data.Electricien,
                response.data.Vitrier,
              ],
            },
          ];
        })
        .catch((err) => console.log(err));
    },

    color(value) {
      let $color;
      if (value <= 25) {
        $color = "info";
      } else if (value > 25 && value <= 50) {
        $color = "success";
      } else if (value > 50 && value <= 75) {
        $color = "warning";
      } else if (value > 75 && value <= 100) {
        $color = "danger";
      }
      return $color;
    },

    //sattistique annonce par categorie
    fetchSerrierie() {
      fetch(`${apiDomain}/api/statistiqueserririeAnnonceParCat`)
        .then((res) => res.json())
        .then((res) => {
          this.serrieirAll = res.serririe;
        })
        .catch((err) => console.log(err));
    },

    fetchPlombier() {
      fetch(`${apiDomain}/api/statistiquePlombierAnnonceParCat`)
        .then((res) => res.json())
        .then((res) => {
          this.plombierAll = res.Plombier;
        })
        .catch((err) => console.log(err));
    },

    fetchElectricien() {
      fetch(`${apiDomain}/api/statistiqueElectricienAnnonceParCat`)
        .then((res) => res.json())
        .then((res) => {
          this.electricienAll = res.Electricien;
        })
        .catch((err) => console.log(err));
    },

    fetchVitrier() {
      fetch(`${apiDomain}/api/statistiqueVitrierAnnonceParCat`)
        .then((res) => res.json())
        .then((res) => {
          this.vitriersAll = res.Vitrier;
        })
        .catch((err) => console.log(err));
    },

    //sattistique users par categorie
    fetchUserVitrier() {
      fetch(`${apiDomain}/api/statistiqueUserVitrier`)
        .then((res) => res.json())
        .then((res) => {
          this.uservitriersAll = res.UserVitrier;
        })
        .catch((err) => console.log(err));
    },

    fetchUserElectricien() {
      fetch(`${apiDomain}/api/statistiqueUserElectricien`)
        .then((res) => res.json())
        .then((res) => {
          this.userelectricienAll = res.UserElectricien;
        })
        .catch((err) => console.log(err));
    },

    fetchUserPlombier() {
      fetch(`${apiDomain}/api/statistiqueUserPlombier`)
        .then((res) => res.json())
        .then((res) => {
          this.userplombierAll = res.UserPlombier;
        })
        .catch((err) => console.log(err));
    },

    fetchUserSerrierie() {
      fetch(`${apiDomain}/api/statistiqueUserSerrierie`)
        .then((res) => res.json())
        .then((res) => {
          this.userserrieirAll = res.UserSerrurier;
        })
        .catch((err) => console.log(err));
    },

    //statistique homme et femme
    //sattistique annonce par categorie
    fetchHomme() {
      fetch(`${apiDomain}/api/statistiqueHomme`)
        .then((res) => res.json())
        .then((res) => {
          this.HommeAll = res.Homme;
        })
        .catch((err) => console.log(err));
    },

    fetchFemme() {
      fetch(`${apiDomain}/api/statistiqueFemme`)
        .then((res) => res.json())
        .then((res) => {
          this.FemmeAll = res.Femme;
        })
        .catch((err) => console.log(err));
    },
    //percentage
    fetchPSerrierie() {
      fetch(`${apiDomain}/api/percentageAnnonceSerrierie`)
        .then((res) => res.json())
        .then((res) => {
          this.PserrieirAll = res.PourcentageAnnonceSerrierie;
        })
        .catch((err) => console.log(err));
    },

    fetchPPlombier() {
      fetch(`${apiDomain}/api/percentageAnnoncePlombier`)
        .then((res) => res.json())
        .then((res) => {
          this.PplombierAll = res.PourcentageAnnoncePlombier;
        })
        .catch((err) => console.log(err));
    },

    fetchPElectricien() {
      fetch(`${apiDomain}/api/percentageAnnonceElectricien`)
        .then((res) => res.json())
        .then((res) => {
          this.PelectricienAll = res.PourcentageAnnonceElectricien;
        })
        .catch((err) => console.log(err));
    },

    fetchPVitrier() {
      fetch(`${apiDomain}/api/percentageAnnonceVitrier`)
        .then((res) => res.json())
        .then((res) => {
          this.PvitriersAll = res.PourcentageAnnonceVitrier;
        })
        .catch((err) => console.log(err));
    },

    //sattistique users par categorie
    fetchPUserVitrier() {
      fetch(`${apiDomain}/api/percentageUserVitrier`)
        .then((res) => res.json())
        .then((res) => {
          this.PuservitriersAll = res.PourcentageUserVitrier;
        })
        .catch((err) => console.log(err));
    },

    fetchPUserElectricien() {
      fetch(`${apiDomain}/api/percentageUserElectricien`)
        .then((res) => res.json())
        .then((res) => {
          this.PuserelectricienAll = res.PourcentageUserElectricien;
        })
        .catch((err) => console.log(err));
    },

    fetchPUserPlombier() {
      fetch(`${apiDomain}/api/percentageUserPlombier`)
        .then((res) => res.json())
        .then((res) => {
          this.PuserplombierAll = res.PourcentageUserPlombier;
        })
        .catch((err) => console.log(err));
    },

    fetchPUserSerrierie() {
      fetch(`${apiDomain}/api/percentageUserSerrurier`)
        .then((res) => res.json())
        .then((res) => {
          this.PuserserrieirAll = res.PourcentageUserSerrurier;
        })
        .catch((err) => console.log(err));
    },

    //statistique homme et femme
    //sattistique annonce par categorie
    fetchPHomme() {
      fetch(`${apiDomain}/api/percentageUserHomme`)
        .then((res) => res.json())
        .then((res) => {
          this.PHommeAll = res.PourcentageUserHomme;
        })
        .catch((err) => console.log(err));
    },

    fetchPFemme() {
      fetch(`${apiDomain}/api/percentageUserFemme`)
        .then((res) => res.json())
        .then((res) => {
          this.PFemmeAll = res.PourcentageUserFemme;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.resFil {
  border-radius: 24px;
  padding: 12px;
  max-width: 800px;
  display: inline-block;
  background-color: #e4e08c;
}
.resFilClient {
  border-radius: 24px;
  padding: 12px;
  max-width: 800px;
  display: inline-block;
  background-color: #81c4f9;
}

.resFilDep {
  border-radius: 24px;
  padding: 12px;
  width: 397px;
  display: inline-block;
  background-color: rgb(255, 183, 68);
}
.resFilAnonce {
  border-radius: 24px;
  padding: 12px;
  width: 397px;
  display: inline-block;
  background-color: rgb(47, 221, 105);
}

.resFilPack {
  border-radius: 24px;
  padding: 12px;
  width: 397px;
  color: white;
  display: inline-block;
  background-color: #4a0f0f;
}
</style>
