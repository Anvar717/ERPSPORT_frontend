<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">{{ $t("Ўқитиш навбатлилиги") }}</h4>
          </b-col>
          <b-col class="text-right">
            <CButton
              @click="Print"
              color="primary"
              class="mr-2"
              style="margin-top: 28px"
              size="sm"
            >
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
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
        <CCardHeader>
          <b-row>
            <b-col md="3">
              <div>
                <label> {{ $t("SchoolYear") }} </label>
                <v-select
                  :options="schoolyearlist"
                  v-model="filter.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('SchoolYear')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col sm="12" md="5">
              <label for=""> {{ $t("schoollegalform") }} </label>
              <v-select
                :options="schoollegalformlist"
                v-model="filter.schoollegalformid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoollegalform')"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class="mr-2"
                  style="margin-top: 27px"
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
          </b-row>
          <CRow class="form-group">
            <CCol lg="4" md="6" sm="6" class="text-left mt-2 pl-0"> </CCol>
          </CRow>
          <CRow class="form-group">
            <CCol>
              <h4 class="region-text">
                <a href="javascript:void(0)" @click="topcountrychange">{{
                  $t("O`zbekiston")
                }}</a>
                <a href="javascript:void(0)" @click="topoblastchange">{{
                  filter.OblastName
                }}</a>
                <a href="javascript:void(0)">{{ filter.RegionName }}</a>
              </h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <div class="table-container" style="padding: 5px">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th
                  rowspan="2"
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("oblastname") }}
                </th>
                <th
                  rowspan="2"
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("regionname") }}
                </th>
                <th
                  rowspan="2"
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  rowspan="2"
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("totalschools") }}
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("schools") }}
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("totalschoolgrades") }}
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("schoolgradecount") }}
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("totalstudents") }}
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("students") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("firstturn") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("secondturn") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("firstturn") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("secondturn") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("firstturn") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("secondturn") }}
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
                      !filter.byschool
                  "
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="regionchange(item)">{{
                    item.regionname
                  }}</a>
                </td>
                <td
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                  "
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>

                <td>
                  {{ item.organizationcount }}
                </td>
                <td>
                  {{ item.organizationcount1 }}
                </td>
                <td>
                  {{ item.organizationcount2 }}
                </td>
                <td>
                  {{ item.schoolgradecount }}
                </td>
                <td>
                  {{ item.schoolgrade1 }}
                </td>
                <td>
                  {{ item.schoolgrade2 }}
                </td>
                <td>
                  {{ item.sudentscount }}
                </td>
                <td>
                  {{ item.sudentscount1 }}
                </td>
                <td>
                  {{ item.sudentscount2 }}
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
                <td>
                  {{
                    bottomrow.organizationcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organizationcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organizationcount1 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.organizationcount1,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organizationcount2 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.organizationcount2,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.schoolgradecount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.schoolgradecount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.schoolgrade1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.schoolgrade1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.schoolgrade2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.schoolgrade2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.sudentscount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.sudentscount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.sudentscount1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.sudentscount1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.sudentscount2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.sudentscount2, {
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
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      schoollegalformlist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        organizationcount: 0,
        organizationcount1: 0,
        organizationcount2: 0,
        sudentscount: 0,
        sudentscount1: 0,
        sudentscount2: 0,
        schoolgradecount: 0,
        schoolgrade1: 0,
        schoolgrade2: 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid: 1,
        oblastid: 0,
        regionid: 0,
        schoolgradegroupid: 0,
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });

    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });

    this.createDate();
     SchoolYearService.GetDefault().then((res) => {
        this.filter.schoolyearid = res.data.id;
        this.Refresh();
      });
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
        this.filter.schoollegalformid = 0;
        this.filter.schoolyearid = 0;
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.filter.RegionName = "";
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
      this.filter.schoolyearid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      // this.filter.schoollegalformid = item.schoollegalformid;
      // this.filter.schoolyearid = item.schoolyearid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      //  this.filter.schoollegalformid = item.schoollegalformid;
      //  this.filter.schoolyearid = item.schoolyearid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportLearningProcessService.PrintSequenceOfEducation(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SequenceOfEducation.xlsx");
          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetSequenceOfEducation(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;

        this.bottomrow = {
          organizationcount: 0,
          organizationcount1: 0,
          organizationcount2: 0,
          sudentscount: 0,
          sudentscount1: 0,
          sudentscount2: 0,
          schoolgradecount: 0,
          schoolgrade1: 0,
          schoolgrade2: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var organizationcount = 0;
      var organizationcount1 = 0;
      var organizationcount2 = 0;
      var sudentscount = 0;
      var sudentscount1 = 0;
      var sudentscount2 = 0;
      var schoolgradecount = 0;
      var schoolgrade1 = 0;
      var schoolgrade2 = 0;
      item.forEach(function(item) {
        organizationcount = organizationcount + item.organizationcount;
        organizationcount1 = organizationcount1 + item.organizationcount1;
        organizationcount2 = organizationcount2 + item.organizationcount2;
        sudentscount = sudentscount + item.sudentscount;
        sudentscount1 = sudentscount1 + item.sudentscount1;
        sudentscount2 = sudentscount2 + item.sudentscount2;
        schoolgradecount = schoolgradecount + item.schoolgradecount;
        schoolgrade1 = schoolgrade1 + item.schoolgrade1;
        schoolgrade2 = schoolgrade2 + item.schoolgrade2;
      });
      this.bottomrow = {
        organizationcount: organizationcount,
        organizationcount1: organizationcount1,
        organizationcount2: organizationcount2,
        sudentscount: sudentscount,
        sudentscount1: sudentscount1,
        sudentscount2: sudentscount2,
        schoolgradecount: schoolgradecount,
        schoolgrade1: schoolgrade1,
        schoolgrade2: schoolgrade2,
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
            organizationcount: 0,
            organizationcount1: 0,
            organizationcount2: 0,
            sudentscount: 0,
            sudentscount1: 0,
            sudentscount2: 0,
            schoolgradecount: 0,
            schoolgrade1: 0,
            schoolgrade2: 0,
          };
          this.filter.regionid = 0;
        }
        this.Refresh();
      },
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            organizationcount1: 0,
            organizationcount2: 0,
            sudentscount: 0,
            sudentscount1: 0,
            sudentscount2: 0,
            schoolgradecount: 0,
            schoolgrade1: 0,
            schoolgrade2: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.schoollegalformid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            organizationcount1: 0,
            organizationcount2: 0,
            sudentscount: 0,
            sudentscount1: 0,
            sudentscount2: 0,
            schoolgradecount: 0,
            schoolgrade1: 0,
            schoolgrade2: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            organizationcount1: 0,
            organizationcount2: 0,
            sudentscount: 0,
            sudentscount1: 0,
            sudentscount2: 0,
            schoolgradecount: 0,
            schoolgrade1: 0,
            schoolgrade2: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
