<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-center">{{ $t("ReportHigherEduDiplom") }}</h4>
          </b-col>
        </b-row>
        <b-col class="text-right">
            <CButton color="danger" @click="$router.push('/')" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        <b-tabs class="mt-2">
          <b-tab active :title="$t('GetTotalByUniversity')">
            <CCardHeader>
              <b-row>
                <b-col>
                  <div class="d-flex">
                    <CButton
                      @click="RefreshUniversity"
                      size="sm"
                      color="primary"
                      class="mr-2"
                      style="margin-top:27px"
                    >
                      <b-icon icon="arrow-repeat"> </b-icon>
                      {{ $t("Refresh") }}
                    </CButton>
                    <!-- <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton> -->
                  </div>
                </b-col>
                <b-col> </b-col>
              </b-row>
            </CCardHeader>
            <div class="table-container" style="padding:5px">
              <table class="table table-bordered ">
                <thead>
                  <tr>
                    <th style="text-align: center;vertical-align: middle">
                      {{ $t("universityname") }}
                    </th>
                    <th style="text-align: center;vertical-align: middle">
                      {{ $t("diplomcount") }}
                    </th>
                  </tr>
                </thead>

                <tbody v-if="!Loading">
                  <tr
                    v-for="(item, i) in items"
                    style="text-align: center;vertical-align: middle"
                    :key="i"
                  >
                    <td style="text-align: left;vertical-align: middle">
                      {{ item.universityname }}
                    </td>
                    <td style="text-align: right;vertical-align: middle">
                      {{
                        item.diplomcount == 0
                          ? "-"
                          : $options.filters.currency(item.diplomcount, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{{ $t("Total") }}</b>
                    </td>

                    <td style="text-align: right;vertical-align: middle">
                      <b>
                        {{
                          bottomrow.diplomcount == 0
                            ? "-"
                            : $options.filters.currency(bottomrow.diplomcount, {
                                symbol: "",
                                fractionCount: 0,
                              })
                        }}</b
                      >
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="Loading">
                  <tr>
                    <td class="text-center" colspan="19">
                      <b-spinner></b-spinner>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-tab>
          <b-tab :title="$t('GetTotalByUniversityFaculty')">
            <CCardHeader>
              <b-row>
                <b-col>
                  <div class="d-flex">
                    <CButton
                      @click="RefreshFaculty"
                      size="sm"
                      color="primary"
                      class="mr-2"
                      style="margin-top:27px"
                    >
                      <b-icon icon="arrow-repeat"> </b-icon>
                      {{ $t("Refresh") }}
                    </CButton>
                    <!-- <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton> -->
                  </div>
                </b-col>
                <b-col> </b-col>
              </b-row>
            </CCardHeader>
            <div class="table-container" style="padding:5px">
              <table class="table table-bordered ">
                <thead>
                  <tr>
                    <th style="text-align: center;vertical-align: middle">
                      {{ $t("facultyname") }}
                    </th>
                    <th style="text-align: center;vertical-align: middle">
                      {{ $t("universityname") }}
                    </th>
                    <th style="text-align: center;vertical-align: middle">
                      {{ $t("diplomcount") }}
                    </th>
                  </tr>
                </thead>

                <tbody v-if="!Loading">
                  <tr
                    v-for="(item, i) in items2"
                    style="text-align: center;vertical-align: middle"
                    :key="i"
                  >
                    <td style="text-align: left;vertical-align: middle">
                      <b v-if="item.facultyname == null">
                        {{ item.universityname }}</b
                      >
                      <span v-else-if="item.facultyname">{{
                        item.universityname
                      }}</span>
                    </td>
                    <td style="text-align: left;vertical-align: middle">
                      {{ item.facultyname }}
                    </td>
                    <td style="text-align: right;vertical-align: middle">
                      <b v-if="item.facultyname == null">
                        {{
                          item.diplomcount == 0
                            ? "-"
                            : $options.filters.currency(item.diplomcount, {
                                symbol: "",
                                fractionCount: 0,
                              })
                        }}</b
                      >
                      <span v-else-if="item.facultyname">{{
                        item.diplomcount == 0
                          ? "-"
                          : $options.filters.currency(item.diplomcount, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>{{ $t("Total") }}</b>
                    </td>
                    <td></td>
                    <td style="text-align: right;vertical-align: middle">
                      <b>
                        {{
                          bottomrow2.diplomcount == 0
                            ? "-"
                            : $options.filters.currency(
                                bottomrow2.diplomcount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}</b
                      >
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="Loading">
                  <tr>
                    <td class="text-center" colspan="19">
                      <b-spinner></b-spinner>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-tab>
        </b-tabs>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HigherEduDiplomService from "@/services/higheredudiplom.service";
export default {
  data() {
    return {
      items: [],
      items2: [],
      Loading: false,
      totalRows: "",
      bottomrow: {
        diplomcount: 0,
      },
      bottomrow2: {
        diplomcount: 0,
      },
      isBusy: true,
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    this.RefreshUniversity();
    this.RefreshFaculty();
  },

  methods: {
    Print() {
      /* ReportLearningProcessService.Print(
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid)
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "ReportTarifficationData.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        }); */
    },
    calculateTotal(item) {
      var diplomcount = 0;
      item.forEach(function(item) {
        diplomcount = diplomcount + item.diplomcount;
      });
      this.bottomrow = {
        diplomcount: diplomcount,
      };
    },
    calculateTotal2(item) {
      var diplomcount = 0;
      item.forEach(function(item) {
        diplomcount = diplomcount + item.diplomcount;
      });
      this.bottomrow2 = {
        diplomcount: diplomcount,
      };
    },
    RefreshUniversity() {
      this.Loading = true;
      HigherEduDiplomService.GetTotalByUniversity().then((res) => {
        this.Loading = false;
        this.items = res.data;

        this.bottomrow = {
          diplomcount: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    RefreshFaculty() {
      this.Loading = true;
      HigherEduDiplomService.GetTotalByUniversityFaculty().then((res) => {
        this.Loading = false;
        this.items2 = res.data;
        this.bottomrow2 = {
          diplomcount: 0,
        };
        this.calculateTotal2(this.items2);
      });
    },

    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    roundToTwo(value, decimals) {
      value;
      decimals;

      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    },
  },
  watch: {
    // "filter.oblastid": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //        this.items = [];
    //        this.bottomrow= {
    //         doctabcount: 0,
    //         doctabsum: 0
    //       }
    //       this.filter.regionid = 0;
    //     }
    //     this.Refresh();
    //   },
    // },
    // "filter.regionid": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //        this.items = [];
    //       this.bottomrow= {
    //          doctabcount: 0,
    //         doctabsum: 0
    //       }
    //     }
    //         this.Refresh();
    //   }
    // },
  },
};
</script>
