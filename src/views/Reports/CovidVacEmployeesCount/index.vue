<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("CovidVacEmployeesCount") }}</h3>
        <CCardHeader>
          <b-row>
            <!-- <b-col>
              <div>
                <label> {{ $t('SchoolYear') }} </label>
                <v-select
                    :options="schoolyearlist"
                    v-model="filter.schoolyearid"
                    :reduce="item => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col> -->
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="margin-top: 28px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t("Refresh") }}
                </CButton>
                <!-- <CButton
                  @click="Print"
                  color="primary"
                  class="ml-2"
                  style="margin-top: 28px"
                  size="sm"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton> -->
              </div>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right"
                style="margin-top: 28px"
                @click="backbyregion"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </b-col>
          </b-row>
          <CRow class="form-group mt-3">
            <CCol>
              <h4>
                <a href="javascript:void(0)" @click="topcountrychange">{{
                  $t("O`zbekiston")
                }}</a>
                <a href="javascript:void(0)" @click="topoblastchange">{{
                  filter.oblastname
                }}</a>
                <a href="javascript:void(0)">{{ filter.regionname }}</a>
              </h4>
            </CCol>
            <CCol> </CCol>
          </CRow>
        </CCardHeader>
        <div class="table-container" style="padding: 5px">
          <table class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  rowspan="2"
                  width="15%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("oblastname") }}
                </th>
                <th
                  v-if="
                    filter.oblastid > 0 &&
                    (filter.regionid === 0 || filter.regionid === null) &&
                    !filter.organizationid
                  "
                  rowspan="2"
                  width="15%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("regionname") }}
                </th>
                <th
                  v-if="filter.oblastid>0 && filter.regionid>0"
                  rowspan="2"
                  width="15%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("EmployeesCount1") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("Included") }}
                </th>
              </tr>
              <tr>
                <th
                  width="20%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("fullvaccount") }}
                </th>
                <th
                  width="20%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("progresvaccount") }}
                </th>
                <th
                  width="20%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("novaccount") }}
                </th>
              </tr>
            </thead>

            <tbody v-if="!Loading">
              <tr
                v-for="(item, i) in items"
                style="text-align: center; vertical-align: middle"
                :key="i"
              >
                <td
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="oblastchange(item)">{{
                    item.oblastname
                  }}</a>
                </td>
                <td
                  v-if="
                    filter.oblastid > 0 &&
                    (filter.regionid === 0 || filter.regionid === null) &&
                    !filter.organizationid
                  "
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="regionchange(item)">{{
                    item.regionname
                  }}</a>
                </td>
                <td
                   v-if="filter.oblastid>0 && filter.regionid>0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{
                    item.organizationname
                  }}</a>
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.employeescount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.fullvaccount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.progresvaccount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.novaccount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
              </tr>
              <tr
                style="
                  text-align: center;
                  vertical-align: middle;
                  font-weight: bold;
                "
              >
                <td>{{ $t("Total") }}</td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalemployeescount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalemployeescount,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalfullvaccount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalfullvaccount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalprogresvaccount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalprogresvaccount,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalnovaccount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalnovaccount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
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

          <br />
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      educationlanguagelist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        totalemployeescount: 0,
        totalfullvaccount: 0,
        totalprogresvaccount: 0,
        totalnovaccount: 0,
      },
      filter: {
        schoolyearid: 1,
        oblastid: 0,
        regionid: 0,
        oblastname: "",
        regionname: "",
      },
      lasttimereshreshloading: false,
      lasttime: "-",
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.oblastlist = res.data;
    });
    this.createDate();
    this.Refresh();
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.oblastname = "";
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.filter.regionname = "";
      }
    },
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.filter.oblastid).then((res) => {
        setregionlist(res.data);
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.regionid = 0;
      this.filter.educationlanguageid = 0;
      this.filter.oblastname = "";
      this.filter.regionname = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.regionname = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.oblastname = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.regionname = " / " + item.regionname;
    },
    // Print() {
    //   ReportStudentsCountService.PrintStudentsCount(
    //     this.filter.schoolyearid,
    //     this.filter.oblastid,
    //     this.filter.regionid
    //   )
    //     .then((response) => {
    //       var fileURL = window.URL.createObjectURL(
    //         new Blob([response.data], response.headers)
    //       );
    //       var fileLink = document.createElement("a");

    //       fileLink.href = fileURL;
    //       fileLink.setAttribute("download", "ReportStudentsCountList.xlsx");

    //       fileLink.click();
    //     })
    //     .catch((e) => {
    //       let response = JSON.parse(e.request.response);

    //       self.makeToast(response.error, self.$t("actions.error"), "danger");
    //     });
    // },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetCovidVacEmployeesCount(
        this.filter.oblastid,
        this.filter.regionid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0)
          this.filter.oblastname = " / " + res.data.oblastname;
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0)
          this.filter.regionname = " / " + res.data.regionname;
        if (this.filter.bycolor == true) {
          this.items.sort(function (a, b) {
            return a.fillcoef - b.fillcoef;
          });
        }
        this.bottomrow = {
          totalemployeescount: 0,
          totalfullvaccount: 0,
          totalprogresvaccount: 0,
          totalnovaccount: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var totalemployeescount = 0;
      var totalfullvaccount = 0;
      var totalprogresvaccount = 0;
      var totalnovaccount = 0;

      item.forEach(function (item) {
        totalemployeescount = totalemployeescount + item.employeescount;
        totalfullvaccount = totalfullvaccount + item.fullvaccount;
        totalprogresvaccount = totalprogresvaccount + item.progresvaccount;
        totalnovaccount = totalnovaccount + item.novaccount;
      });
      this.bottomrow = {
        totalemployeescount: totalemployeescount,
        totalfullvaccount: totalfullvaccount,
        totalprogresvaccount: totalprogresvaccount,
        totalnovaccount: totalnovaccount,
      };
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
  },
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            totalfullvaccount: 0,
            totalnovaccount: 0,
            totalprogresvaccount: 0,
            totalemployeescount: 0,
          };
          this.filter.regionid = 0;

          var self = this;
          this.getregionlist(newValue, function (data) {
            self.regionlist = data;
          });
        }
        this.Refresh();
      },
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            totalemployeescount: 0,
            totalfullvaccount: 0,
            totalprogresvaccount: 0,
            totalnovaccount: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
