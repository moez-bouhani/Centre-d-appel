<template>
  <CChartBar
    :datasets="computedDatasets"
    :options="computedOptions"
    :labels="labels"
  />
</template>

<script>
import { CChartBar } from "@coreui/vue-chartjs";
import { getColor, deepObjectsMerge } from "@coreui/utils/src";

export default {
  name: "CChartBarSimple",
  components: { CChartBar },
  props: {
    ...CChartBar.props,
    backgroundColor: {
      type: String,
      default: "rgba(0,0,0,.2)",
    },
    pointHoverBackgroundColor: String,
    dataPoints: {
      type: Array,
      default: () => [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
    },
    dataPoints2: [],
    label: {
      type: String,
      default: "Sales",
    },
    pointed: Boolean,
  },
  computed: {
    defaultDatasets() {
      return [
        {
          data: this.dataPoints,
          backgroundColor: getColor(this.backgroundColor),
          pointHoverBackgroundColor: getColor(this.pointHoverBackgroundColor),
          label: this.label,
          barPercentage: 0.5,
          categoryPercentage: 1,
        },
      ];
    },
    defaultOptions() {
      return {
        moez: [],
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      };
    },
    computedDatasets() {
      return deepObjectsMerge(this.defaultDatasets, this.datasets || {});
    },
    computedOptions() {
      return deepObjectsMerge(this.defaultOptions, this.options || {});
    },
  },

  created() {
    //chaque moins
    this.fetchUsersChaqueMois();
  },

  methods: {
    /* user sur chaque mois */

    fetchUsersChaqueMois() {
      axios
        .get(`${apiDomain}/api/usersChaqueMois`)
        .then((response) => {
          this.moez = [
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
  },
};
</script>
