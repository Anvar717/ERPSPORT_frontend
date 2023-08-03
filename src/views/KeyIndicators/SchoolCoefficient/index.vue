<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mx-1">
          <b-col>
            <h3 class="mt-3">{{ $t("Мактаблар коэффициенти") }}</h3>
          </b-col>
          <b-col class="text-right">
            <CButton
              color="danger"
              class="float-right"
              style="margin-top:28px"
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
            <b-col sm="12" md="2">
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
            <b-col sm="12" md="3">
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
            <b-col sm="12" md="2">
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="margin-top:28px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t("Refresh") }}
                </CButton>
                <CButton
                  @click="Print"
                  color="primary"
                  class="ml-2"
                  style="margin-top:28px"
                  size="sm"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
              </div>
            </b-col>
          </b-row>
          <CRow class="form-group mt-3">
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
            <CCol> </CCol>
          </CRow>
        </CCardHeader>
        <div class="table-container" style="padding:5px">
          <table class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  rowspan="2"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("oblastname") }}
                </th>
                <th
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool
                  "
                  rowspan="2"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("regionname") }}
                </th>
                <th
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                  "
                  rowspan="2"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  rowspan="2"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("Жами мактаб сони ") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t('2 ва ундан юқори "тўқ қизил"') }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t('1,5 дан 1,9 гача "қизил"') }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t('1,1- дан 1,4 гача "сариқ"') }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t('0 дан 1 гача "яшил"') }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{
                    $t(
                      "шундан, 0,7 коэф. ва ундан паст қамровли мактаблар сони"
                    )
                  }}
                </th>
              </tr>
              <tr>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("сони") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("фоиз") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("сони") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("фоиз") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("сони") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("фоиз") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("сони") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("фоиз") }}
                </th>
              </tr>
            </thead>

            <tbody>
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
                  <a href="javascript:void(0)" @click="GotoStudentList(item)">{{
                    item.organizationname
                  }}</a>
                </td>
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.totalorgcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.crimsoncount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    parseFloat(
                      ((item.crimsoncount / item.totalorgcount) * 100).toFixed(
                        2
                      )
                    )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.redcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    parseFloat(
                      ((item.redcount / item.totalorgcount) * 100).toFixed(2)
                    )
                  }}
                  <!-- {{
                    $options.filters.currency(item.redcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }} -->
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.yellowcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    parseFloat(
                      ((item.yellowcount / item.totalorgcount) * 100).toFixed(2)
                    )
                  }}
                  <!-- {{
                    $options.filters.currency(item.yellowcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }} -->
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.greencount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    parseFloat(
                      ((item.greencount / item.totalorgcount) * 100).toFixed(2)
                    )
                  }}
                  <!-- {{
                    $options.filters.currency((item.greencount/item.totalorgcount)*100, {
                      symbol: "",
                      fractionCount: 5,
                    })
                  }} -->
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.lowincomeschoolcount, {
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
            <tfoot>
              <tr
                style="text-align: center;vertical-align: middle;font-weight: bold"
              >
                <td colspan="1">{{ $t("Total") }}</td>

                <td style="white-space: nowrap">
                  {{
                    bottomrow.totaltotalorgcount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totaltotalorgcount1 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount1,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  <!-- {{
                    bottomrow.totaltotalorgcount2 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount2,
                          { symbol: "", fractionCount: 0 }
                        )
                  }} -->
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totaltotalorgcount3 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount3,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  <!-- {{
                    bottomrow.totaltotalorgcount4 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount4,
                          { symbol: "", fractionCount: 0 }
                        )
                  }} -->
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totaltotalorgcount5 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount5,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  <!-- {{
                    bottomrow.totaltotalorgcount6 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount6,
                          { symbol: "", fractionCount: 0 }
                        )
                  }} -->
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totaltotalorgcount7 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount7,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  <!-- {{
                    bottomrow.totaltotalorgcount8 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount8,
                          { symbol: "", fractionCount: 0 }
                        )
                  }} -->
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totaltotalorgcount9 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totaltotalorgcount9,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
              </tr>
            </tfoot>
          </table>

          <br />
        </div>
        <b-row>
          <b-col class="text-right mr-3 mb-2">
            <span> {{ $t("lasttime", { lasttime: lasttime }) }} </span>
          </b-col>
        </b-row>
        <!-- <b-row v-if="$can('MinSportView','permissions')">
          <b-col class="text-right mr-3 mb-2">
            <CButton
                  @click="RefreshStatistics"
                  size="sm"
                  color="primary"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('RefreshStatistics') }}
                </CButton>
          </b-col>
        </b-row> -->
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import ReportStudentsCountService from "@/services/ReportStudentsCount.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
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
        totaltotalorgcount: 0,
        totaltotalorgcount1: 0,
        totaltotalorgcount2: 0,
        totaltotalorgcount3: 0,
        totaltotalorgcount4: 0,
        totaltotalorgcount5: 0,
        totaltotalorgcount6: 0,
        totaltotalorgcount7: 0,
        totaltotalorgcount8: 0,
        totaltotalorgcount9: 0,
      },
      filter: {
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        OblastName: "",
        RegionName: "",
        organizationtypeid: 4,
        schooltypeid: 0,
        schoollegalformid: 1,
      },
      lasttimereshreshloading: false,
      lasttime: "-",
      lang: localStorage.getItem("locale") || "ru",
      organizationtypelist: [],
      schooltypelist: [],
      schoollegalformlist: [],
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    // OblastService.GetAll().then(res => {
    //   this.oblastlist = res.data;
    // });
    // OrganizationTypeService.GetAll().then(res => {
    //   this.organizationtypelist = res.data
    // })
    // SchoolTypeService.GetAll().then(res => {
    //   this.schooltypelist = res.data
    // })
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
    //this.LastTimeRefresh()
    // this.createDate();
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
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.filter.RegionName = "";
      }
    },
    LastTimeRefresh() {
      this.lasttimereshreshloading = true;
      ReportStudentsCountService.GetStudentsCountLastRefreshTime()
        .then((res) => {
          this.lasttime = res.data;
          this.lasttimereshreshloading = false;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.lasttimereshreshloading = false;
        });
    },
    GotoStudentList(item) {
      // console.log(item)
      this.$router.push({
        name: "StudentList",
        query: {
          oblastid: this.filter.oblastid,
          regionid: this.filter.regionid,
          orgid: item.organizationid,
          schoolyearid: this.filter.schoolyearid,
        },
      });
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
      this.filter.educationlanguageid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      //  this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      // this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportLearningProcessService.PrintSchoolsColorByCoefficient(
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
          fileLink.setAttribute("download", "SchoolsColorByCoefficient.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    RefreshStatistics() {
      this.Loading = true;
      ReportStudentsCountService.RefreshStudentsCount()
        .then((response) => {
          this.lasttime = response.data;
          this.Refresh();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          this.Loading = false;
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetSchoolsColorByCoefficient(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0)
          this.filter.OblastName = " / " + res.data.oblastname;
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0)
          this.filter.RegionName = " / " + res.data.regionname;
        if (this.filter.bycolor == true) {
          this.items.sort(function(a, b) {
            return a.fillcoef - b.fillcoef;
          });
        }
        this.bottomrow = {
          totaltotalorgcount: 0,
          totaltotalorgcount1: 0,
          totaltotalorgcount2: 0,
          totaltotalorgcount3: 0,
          totaltotalorgcount4: 0,
          totaltotalorgcount5: 0,
          totaltotalorgcount6: 0,
          totaltotalorgcount7: 0,
          totaltotalorgcount8: 0,
          totaltotalorgcount9: 0,
        };
        this.calculateTotal(this.items);
      });
    },

    calculateTotal(item) {
      var totaltotalorgcount = 0;
      var totaltotalorgcount1 = 0;
      var totaltotalorgcount2 = 0;
      var totaltotalorgcount3 = 0;
      var totaltotalorgcount4 = 0;
      var totaltotalorgcount5 = 0;
      var totaltotalorgcount6 = 0;
      var totaltotalorgcount7 = 0;
      var totaltotalorgcount8 = 0;
      var totaltotalorgcount9 = 0;

      item.forEach(function(item) {
        totaltotalorgcount = totaltotalorgcount + item.totalorgcount;
        totaltotalorgcount1 = totaltotalorgcount1 + item.crimsoncount;
        totaltotalorgcount2 = totaltotalorgcount2 + item.sudentscount2;
        totaltotalorgcount3 = totaltotalorgcount3 + item.redcount;
        totaltotalorgcount4 = totaltotalorgcount4 + item.sudentscount4;
        totaltotalorgcount5 = totaltotalorgcount5 + item.yellowcount;
        totaltotalorgcount6 = totaltotalorgcount6 + item.sudentscount6;
        totaltotalorgcount7 = totaltotalorgcount7 + item.greencount;
        totaltotalorgcount8 = totaltotalorgcount8 + item.sudentscount8;
        totaltotalorgcount9 = totaltotalorgcount9 + item.lowincomeschoolcount;
      });
      this.bottomrow = {
        totaltotalorgcount: totaltotalorgcount,
        totaltotalorgcount1: totaltotalorgcount1,
        totaltotalorgcount2: totaltotalorgcount2,
        totaltotalorgcount3: totaltotalorgcount3,
        totaltotalorgcount4: totaltotalorgcount4,
        totaltotalorgcount5: totaltotalorgcount5,
        totaltotalorgcount6: totaltotalorgcount6,
        totaltotalorgcount7: totaltotalorgcount7,
        totaltotalorgcount8: totaltotalorgcount8,
        totaltotalorgcount9: totaltotalorgcount9,
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
            totaltotalorgcount: 0,
            totaltotalorgcount1: 0,
            totaltotalorgcount2: 0,
            totaltotalorgcount3: 0,
            totaltotalorgcount4: 0,
            totaltotalorgcount5: 0,
            totaltotalorgcount6: 0,
            totaltotalorgcount7: 0,
            totaltotalorgcount8: 0,
            totaltotalorgcount9: 0,
          };
          this.filter.regionid = 0;

          var self = this;
          this.getregionlist(newValue, function(data) {
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
            totaltotalorgcount: 0,
            totaltotalorgcount1: 0,
            totaltotalorgcount2: 0,
            totaltotalorgcount3: 0,
            totaltotalorgcount4: 0,
            totaltotalorgcount5: 0,
            totaltotalorgcount6: 0,
            totaltotalorgcount7: 0,
            totaltotalorgcount8: 0,
            totaltotalorgcount9: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>