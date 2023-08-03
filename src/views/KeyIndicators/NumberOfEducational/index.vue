<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col lg="12">
            <h4 class="text-center">{{ $t("Таълим муассасалари сони") }}</h4>
          </b-col>
         
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col md="3" class="achievement-input">
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
            <!-- <b-col>
              <div>
                <label> {{ $t('qualificationcategory') }} </label>
                <v-select
                    :options="qualificationcategorylist"
                    v-model="filter.qualificationcategoryid"
                    :reduce="item => item.id"
                    :placeholder="$t('qualificationcategory')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col> -->
            <!-- <b-col>
              <div>
                <label> {{ $t('schoolsubject') }} </label>
                <v-select
                    :options="schoolsubjectlist"
                    v-model="filter.schoolsubjectid"
                    :reduce="item => item.id"
                    :placeholder="$t('schoolsubject')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col> -->
            <!-- <b-col>
              <div>
                <label> {{ $t('schoolgradegroup') }} </label>
                <v-select
                    :options="schoolgradegrouplist"
                    v-model="filter.schoolgradegroupid"
                    :reduce="item => item.id"
                    :placeholder="$t('schoolgradegroup')"
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
            
            <b-col class="text-lg-right" >
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
              class=""
              style="margin-top: 28px"
              @click="backbyregion"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
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
          <div class="mobileStyle">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th
                    rowspan="3"
                    v-if="filter.oblastid === 0 || filter.oblastid === null"
                    style="text-align: center; vertical-align: middle"
                  >
                    <!-- Ҳудуд спорт таълим муассасалари -->
                    {{ $t("sportPlaceName") }}
                  </th>
                  <th
                    rowspan="3"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <!-- <th
                    rowspan="2"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th> -->
                  <!-- <th
                    rowspan="3"
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th> -->
                  <th
                    colspan="8"
                    style="text-align: center; vertical-align: middle"
                  >
                    <!-- Спорт таълим муассасалари -->
                    {{ $t("totalsSportEducation") }}
                  </th>
                </tr>
                <tr>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("allSportEdu") }}
                  </th>
                  <th
                    colspan="7"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Шулардан") }}
                  </th>
                </tr>
                <tr>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("primaryschoolcount") }}
                  </th>
  
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("specializedschoolcount") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("sportschoolcount") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("specsportschoolcount") }}
                  </th>
  
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("olympschoolcount") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("republicanschoolcount") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("footballschoolcount") }}
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
                    <!-- <a href="javascript:void(0)" @click="regionchange(item)">{{
                      item.regionname
                    }}</a> -->
                    {{
                      item.regionname
                    }}
                  </td>
                  <!-- <td
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    <a href="javascript:void(0)">{{ item.schooltype }}</a>
                  </td>
                  <td
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    <a href="javascript:void(0)">{{ item.schooltype }}</a>
                  </td> -->
                  <td>
                    {{
                      $options.filters.currency(item.totalorgcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.primaryschoolcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
  
                  <td>
                    {{
                      $options.filters.currency(item.specializedschoolcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sportschoolcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.specsportschoolcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
  
                  <td>
                    {{
                      $options.filters.currency(item.olympschoolcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.republicanschoolcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.footballschoolcount, {
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
                  <td >{{ $t("Total") }}</td>
                  <td>
                    {{
                      bottomrow.totalorgcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.totalorgcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td>
                    {{
                      bottomrow.primaryschoolcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.primaryschoolcount,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td>
                    {{
                      bottomrow.specializedschoolcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.specializedschoolcount,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td>
                    {{
                      bottomrow.sportschoolcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.sportschoolcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td>
                    {{
                      bottomrow.specsportschoolcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.specsportschoolcount,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td>
                    {{
                      bottomrow.olympschoolcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.olympschoolcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td>
                    {{
                      bottomrow.republicanschoolcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.republicanschoolcount,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <td>
                    {{
                      bottomrow.footballschoolcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.footballschoolcount,
                            { symbol: "", fractionCount: 0 }
                          )
                    }}
                  </td>
                  <!-- <td>{{bottomrow.otherschoolcount== 0?'-': $options.filters.currency(bottomrow.otherschoolcount, {symbol: '', fractionCount: 0})}}</td> -->
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import ReportTarifficationDataService from "@/services/ReportTarifficationData.service";
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
      totalRows: "",
      PrintLoading:false,
      isBusy: true,
      bottomrow: {
        doctabcount: 0,
        doctabsum: 0,
      },
      filter: {
        schoolyearid: 2,
        oblastid: 0,
        regionid: 0,
        // schoolsubjectid: 0,
        // schoolgradegroupid: 0,
        organizationTypeId: 0,
        schoolTypeId: 0,
        schoolLegalFormId: 0,
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
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });

    this.createDate();
    SchoolYearService.GetDefault().then((res) => {
        this.filter.schoolyearid = res.data.id;
        this.Refresh();
      });;
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
        this.filter.schoolsubjectid = 0;
        this.filter.schoolgradegroupid = 0;
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
      this.filter.OblastName = " / " + item.oblastname;
      console.log(this.filter.oblastid)
      this.Refresh();
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.schoolsubjectid = item.schoolsubjectid;
      this.filter.schoolgradegroupid = item.schoolgradegroupid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
    },
    Print() {
      ReportTarifficationDataService.Print(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolsubjectid,
        this.filter.schoolgradegroupid
      )
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
        });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetSchoolCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.schoolLegalFormId
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
          totalorgcount: 0,
          primaryschoolcount: 0,
          specializedschoolcount: 0,
          sportschoolcount: 0,
          specsportschoolcount: 0,
          olympschoolcount: 0,
          republicanschoolcount: 0,
          footballschoolcount: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var totalorgcount = 0;
      var primaryschoolcount = 0;
      var specializedschoolcount = 0;
      var sportschoolcount = 0;
      var specsportschoolcount = 0;
      var olympschoolcount = 0;
      var republicanschoolcount = 0;
      var footballschoolcount = 0;
      item.forEach(function (item) {
        totalorgcount = totalorgcount + item.totalorgcount;
        primaryschoolcount = primaryschoolcount + item.primaryschoolcount;
        specializedschoolcount =
          specializedschoolcount + item.specializedschoolcount;

        sportschoolcount = sportschoolcount + item.sportschoolcount;
        specsportschoolcount = specsportschoolcount + item.specsportschoolcount;
        olympschoolcount = olympschoolcount + item.olympschoolcount;
        republicanschoolcount =
          republicanschoolcount + item.republicanschoolcount;
        footballschoolcount = footballschoolcount + item.footballschoolcount;
      });
      this.bottomrow = {
        totalorgcount: totalorgcount,
        primaryschoolcount: primaryschoolcount,
        specializedschoolcount: specializedschoolcount,
        sportschoolcount: sportschoolcount,
        specsportschoolcount: specsportschoolcount,
        olympschoolcount: olympschoolcount,
        republicanschoolcount: republicanschoolcount,
        footballschoolcount: footballschoolcount,
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
            totalorgcount: 0,
            primaryschoolcount: 0,
            specializedschoolcount: 0,
            sportschoolcount: 0,
            specsportschoolcount: 0,
            olympschoolcount: 0,
            republicanschoolcount: 0,
            footballschoolcount: 0,
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
            totalorgcount: 0,
            primaryschoolcount: 0,
            specializedschoolcount: 0,
            sportschoolcount: 0,
            specsportschoolcount: 0,
            olympschoolcount: 0,
            republicanschoolcount: 0,
            footballschoolcount: 0,
          };
        }
        this.Refresh();
      },
    },
    // "filter.qualificationcategoryid": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //       this.items = [];
    //       this.bottomrow = {
    //         totalorgcount: 0,
    //         primaryschoolcount: 0,
    //         specializedschoolcount: 0,
    //         sportschoolcount: 0,
    //         specsportschoolcount: 0,
    //         olympschoolcount: 0,
    //         republicanschoolcount: 0,
    //         footballschoolcount: 0,
    //       };
    //     }
    //     this.Refresh();
    //   },
    // },
    "filter.schoolsubjectid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            totalorgcount: 0,
            primaryschoolcount: 0,
            specializedschoolcount: 0,
            sportschoolcount: 0,
            specsportschoolcount: 0,
            olympschoolcount: 0,
            republicanschoolcount: 0,
            footballschoolcount: 0,
          };
        }
        this.Refresh();
      },
    },

    "filter.schoolgradegroupid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
             totalorgcount: 0,
            primaryschoolcount: 0,
            specializedschoolcount: 0,
            sportschoolcount: 0,
            specsportschoolcount: 0,
            olympschoolcount: 0,
            republicanschoolcount: 0,
            footballschoolcount: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
