<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mx-1">
          <b-col lg="12">
            <h3 class="text-center mt-3">{{ $t("StudentsCount") }}</h3>
          </b-col>
          <!-- <b-col class="text-lg-right mb-3">
            <CButton
              color="danger"
              class=""
              style="margin-top: 28px"
              @click="backbyregion"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col> -->
        </b-row>
        <CCardHeader>
          <b-row>
          <b-col sm="12" md="2" lg="2" class="achievement-input">
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
          <b-col class="text-lg-right mt-3">
            <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                class="mr-2"
                variant="outline"   
                ><b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            <!-- <div class="mr-2"> -->
              <b-button
                :variant="cache_filters === false ? 'primary' : 'danger'"
                size="sm"
                class="mr-2"
                v-b-toggle.collapse-1
                ><b-icon icon="funnel-fill"></b-icon>
              </b-button>
            <!-- </div> -->
           
            <CButton
              @click="Print"
              color="primary"
              variant="outline"
              class="mr-2"
              size="sm"
            >
              <b-icon v-if="!PrintLoading" icon="printer"> </b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Print") }}
            </CButton>
            <CButton
              color="danger"
              class="float-sm-right mr-2"
              @click="backbyregion"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <custom-filter-collapse
                :filter="filter"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-filter-collapse>
            </b-card>
          </b-collapse>
       <!--    <b-row>
            <b-col sm="12" md="2" lg="2" class="achievement-input">
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
            <b-col sm="12" md="2" lg="4" class="achievement-input">
              <label for=""> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="filter.organizationtypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('organizationtype')"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="3" lg="3" class="achievement-input">
              <label for=""> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="filter.schooltypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('schooltype')"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="3" lg="3" class="achievement-input">
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
          </b-row> -->
          <!-- <b-row>    
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("educationlanguage") }} </label>
              <v-select
                :options="educationlanguagelist"
                v-model="filter.educationlanguageid"
                :reduce="(item) => item.id"
                :placeholder="$t('educationlanguage')"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="3" class="achievement-input">
              <label for=""> {{ $t("gender") }} </label>
              <v-select
                :options="genderlist"
                v-model="filter.genderid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              ></v-select>
            </b-col>
            <b-col sm="12" md="2">
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
                <CButton
                  @click="Print"
                  color="primary"
                  class="ml-2"
                  style="margin-top: 28px"
                  size="sm"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
              </div>
            </b-col>
          </b-row> -->
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
        <div class="table-container" style="padding: 5px">
          <div class="mobileStyle">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th
                    v-if="filter.oblastid === 0 || filter.oblastid === null"
                    width="15%"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("oblastname") }}
                  </th>
                  <th
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool
                    "
                    width="15%"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                    "
                    width="15%"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    width="15%"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th style="text-align: center">{{ $t("TotalSudentsount") }}</th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount1") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount2") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount3") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount4") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount5") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount6") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount7") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount8") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount9") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount10") }}
                  </th>
                  <th style="text-align: center">
                    {{ $t("TotalSudentsount11") }}
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
                    <a href="javascript:void(0)" @click="GotoStudentList(item)">{{
                      item.organizationname
                    }}</a>
                  </td>
                  <td
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a href="javascript:void(0)" @click="GotoStudentList(item)">{{
                      item.organizationname
                    }}</a>
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount1, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount2, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount3, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount4, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount5, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount6, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount7, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount8, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount9, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount10, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      $options.filters.currency(item.sudentscount11, {
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
                      bottomrow.totalsudentscount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.totalsudentscount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount1 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount1,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount2 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount2,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount3 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount3,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount4 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount4,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount5 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount5,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount6 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount6,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount7 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount7,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount8 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount8,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount9 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount9,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount10 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount10,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.totalsudentscount11 == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.totalsudentscount11,
                            { symbol: "", fractionCount: 0 }
                          )
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
          </div>
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
import HelperService from "@/services/helper.service";
import ReportStudentsCountService from "@/services/ReportStudentsCount.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import CustomFilterCollapse from "../../../components/customFilterCollapse.vue";
export default {
  components: { CustomFilterCollapse },
  data() {
    return {
      schoolyearlist: [],
      educationlanguagelist: [],
      oblastlist: [],
      genderlist: [],
      regionlist: [],
      items: [],
      Loading: false,
      cache_filters: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        totalsudentscount: 0,
        totalsudentscount1: 0,
        totalsudentscount2: 0,
        totalsudentscount3: 0,
        totalsudentscount4: 0,
        totalsudentscount5: 0,
        totalsudentscount6: 0,
        totalsudentscount7: 0,
        totalsudentscount8: 0,
        totalsudentscount9: 0,
        totalsudentscount10: 0,
        totalsudentscount11: 0,
      },
      filter: {
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        OblastName: "",
        RegionName: "",
        organizationtypeid: 0,
        educationlanguageid : 0,
        schooltypeid: 0,
        schoollegalformid: 0,
        schoolmanagementformid: 0,
        genderid: 0
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
    OblastService.GetAll().then((res) => {
      this.oblastlist = res.data;
    });
    EducationLanguageService.GetAll().then((res) => {
      this.educationlanguagelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    this.LastTimeRefresh();
    this.createDate();
     SchoolYearService.GetDefault().then((res) => {
        this.filter.schoolyearid = res.data.id;
        this.Refresh();
      });
  },

  methods: {
    Search() {
      if (  
        this.filter.organizationtypeid == 0 &&
        this.filter.educationlanguageid == 0 &&
        this.filter.schooltypeid == 0 &&
        this.filter.schoollegalformid == 0 &&
        this.filter.schoolmanagementformid == 0 &&
        this.filter.genderid == 0

      ) {
      this.cache_filters = false,
          this.Refresh();
      return
      }

      this.cache_filters = true,
      this.Refresh();
    },
    clearFilter() {
      this.filter = {
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        OblastName: "",
        RegionName: "",
        organizationtypeid: 0,
        educationlanguageid : 0,
        schooltypeid: 0,
        schoollegalformid: 0,
        schoolmanagementformid: 0,
        genderid: 0
      }
      this.cache_filters = false,
      this.Refresh();
    },
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
      ReportStudentsCountService.PrintStudentsCount(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.schoollegalformid,
        this.filter.educationlanguageid,
        this.filter.genderid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "ReportStudentsCountList.xlsx");

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
      ReportStudentsCountService.GetStudentsCount(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.schoollegalformid,
        this.filter.educationlanguageid,
        this.filter.genderid,
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
          this.items.sort(function (a, b) {
            return a.fillcoef - b.fillcoef;
          });
        }
        this.bottomrow = {
          totalsudentscount: 0,
          totalsudentscount1: 0,
          totalsudentscount2: 0,
          totalsudentscount3: 0,
          totalsudentscount4: 0,
          totalsudentscount5: 0,
          totalsudentscount6: 0,
          totalsudentscount7: 0,
          totalsudentscount8: 0,
          totalsudentscount9: 0,
          totalsudentscount10: 0,
          totalsudentscount11: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var totalsudentscount = 0;
      var totalsudentscount1 = 0;
      var totalsudentscount2 = 0;
      var totalsudentscount3 = 0;
      var totalsudentscount4 = 0;
      var totalsudentscount5 = 0;
      var totalsudentscount6 = 0;
      var totalsudentscount7 = 0;
      var totalsudentscount8 = 0;
      var totalsudentscount9 = 0;
      var totalsudentscount10 = 0;
      var totalsudentscount11 = 0;

      item.forEach(function (item) {
        totalsudentscount = totalsudentscount + item.sudentscount;
        totalsudentscount1 = totalsudentscount1 + item.sudentscount1;
        totalsudentscount2 = totalsudentscount2 + item.sudentscount2;
        totalsudentscount3 = totalsudentscount3 + item.sudentscount3;
        totalsudentscount4 = totalsudentscount4 + item.sudentscount4;
        totalsudentscount5 = totalsudentscount5 + item.sudentscount5;
        totalsudentscount6 = totalsudentscount6 + item.sudentscount6;
        totalsudentscount7 = totalsudentscount7 + item.sudentscount7;
        totalsudentscount8 = totalsudentscount8 + item.sudentscount8;
        totalsudentscount9 = totalsudentscount9 + item.sudentscount9;
        totalsudentscount10 = totalsudentscount10 + item.sudentscount10;
        totalsudentscount11 = totalsudentscount11 + item.sudentscount11;
      });
      this.bottomrow = {
        totalsudentscount: totalsudentscount,
        totalsudentscount1: totalsudentscount1,
        totalsudentscount2: totalsudentscount2,
        totalsudentscount3: totalsudentscount3,
        totalsudentscount4: totalsudentscount4,
        totalsudentscount5: totalsudentscount5,
        totalsudentscount6: totalsudentscount6,
        totalsudentscount7: totalsudentscount7,
        totalsudentscount8: totalsudentscount8,
        totalsudentscount9: totalsudentscount9,
        totalsudentscount10: totalsudentscount10,
        totalsudentscount11: totalsudentscount11,
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
            totalsudentscount: 0,
            totalsudentscount1: 0,
            totalsudentscount2: 0,
            totalsudentscount3: 0,
            totalsudentscount4: 0,
            totalsudentscount5: 0,
            totalsudentscount6: 0,
            totalsudentscount7: 0,
            totalsudentscount8: 0,
            totalsudentscount9: 0,
            totalsudentscount10: 0,
            totalsudentscount11: 0,
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
            totalsudentscount: 0,
            totalsudentscount1: 0,
            totalsudentscount2: 0,
            totalsudentscount3: 0,
            totalsudentscount4: 0,
            totalsudentscount5: 0,
            totalsudentscount6: 0,
            totalsudentscount7: 0,
            totalsudentscount8: 0,
            totalsudentscount9: 0,
            totalsudentscount10: 0,
            totalsudentscount11: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
