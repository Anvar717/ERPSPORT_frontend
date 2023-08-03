<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">{{ $t("OrgSchoolGradeCountByLanguage") }}</h4>
          </b-col>
          <b-col class="text-right">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <!-- <b-col>
              <div>
                <label>{{$t('StartDate')}}</label>
                <date-picker
                    v-model="filter.StartDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
              </div>
            </b-col>
            <b-col>
              <div>
                <label>{{$t('EndDate')}}</label>
                <date-picker
                    v-model="filter.EndDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
              </div>
            </b-col> -->
            <b-col sm="12" md="3">
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
            <b-col sm="12" md="3">
              <div>
                <label> {{ $t("Oblast") }} </label>
                <v-select
                  :options="OblastList"
                  v-model="filter.oblastid"
                  :disabled="
                    (!$can('AdminView', 'permissions') &&
                      !$can('MinSportView', 'permissions') &&
                      $can('OblastSport', 'permissions')) ||
                    $can('RegionXTB', 'permissions')
                  "
                  :reduce="(item) => item.id"
                  :placeholder="$t('oblast')"
                  label="name"
                  class="mr-2"
                  style="width: 100%"
                  @input="ChangeOblast"
                ></v-select>
              </div>
            </b-col>
            <b-col sm="12" md="3">
              <div>
                <label> {{ $t("Region") }} </label>
                <v-select
                  :options="RegionList"
                  v-model="filter.regionid"
                  :disabled="
                    !$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    !$can('OblastSport', 'permissions') &&
                    $can('RegionXTB', 'permissions')
                  "
                  :reduce="(item) => item.id"
                  :placeholder="$t('region')"
                  label="name"
                  class="mr-2"
                  style="width: 100%"
                ></v-select>
              </div>
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
        <div class="table-responsive" style="padding: 5px">
          <table class="table table-striped table-bordered">
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
                  rowspan="3"
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th  rowspan="3" style="text-align: center; vertical-align: middle">
                  {{ $t("schoollegalform") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("UzbLanguage") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("RusLanguage") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("TjkLanguage") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("QzLanguage") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("KrzLanguage") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("TrkLanguage") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("QrkLanguage") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("EngLanguage") }}
                </th>
              </tr>
              <tr>
                <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
                 <th rowspan="2" style="text-align: center">
                  {{ $t("totalschools") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Included") }}
                </th>
              </tr>
               <tr>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("schoolsthatlanguage") }}
                </th>
                 <th style="text-align: center;vertical-align: middle">
                  {{ $t("mixedschools") }}
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
                <!-- <td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)" @click="organizationchange(item)">{{item.organizationname}}</a>
                </td> -->
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a
                    href="javascript:void(0)"
                    @click="organizationchange(item)"
                    >{{ item.organizationname }}</a
                  >
                </td>
                <td>{{ item.schoollegalformname }}</td>
                <td>{{ item.organization1_1 }}</td>
                <td>{{ item.organization1_2 }}</td>
                <td>{{ item.organization1_3 }}</td>
                <td>{{ item.organization2_1 }}</td>
                <td>{{ item.organization2_2 }}</td>
                <td>{{ item.organization2_3 }}</td>
                <td>{{ item.organization3_1 }}</td>
                <td>{{ item.organization3_2 }}</td>
                <td>{{ item.organization3_3 }}</td>
                <td>{{ item.organization4_1 }}</td>
                <td>{{ item.organization4_2 }}</td>
                <td>{{ item.organization4_3 }}</td>
                <td>{{ item.organization5_1 }}</td>
                <td>{{ item.organization5_2 }}</td>
                <td>{{ item.organization5_3 }}</td>
                <td>{{ item.organization6_1 }}</td>
                <td>{{ item.organization6_2 }}</td>
                <td>{{ item.organization6_3 }}</td>
                <td>{{ item.organization7_1 }}</td>
                <td>{{ item.organization7_2 }}</td>
                <td>{{ item.organization7_3 }}</td>
                <td>{{ item.organization8_1 }}</td>
                <td>{{ item.organization8_2 }}</td>
                <td>{{ item.organization8_3 }}</td>
              </tr>
              <tr
                style="
                  text-align: center;
                  vertical-align: middle;
                  font-weight: bold;
                "
              >
                <td>{{ $t("Total") }}</td>
                <td></td>
                <td>
                  {{
                    bottomrow.organization1_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization1_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization1_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization1_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization1_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization1_3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization2_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization2_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization2_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization2_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization2_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization2_3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization3_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization3_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization3_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization3_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization3_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization3_3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization4_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization4_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization4_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization4_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization4_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization4_3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization5_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization5_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization5_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization5_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization5_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization5_3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization6_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization6_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization6_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization6_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization6_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization6_3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization7_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization7_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization7_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization7_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization7_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization7_3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization8_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization8_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization8_2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization8_2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization8_3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization8_3, {
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
      schoollegalformlist: [],
      OblastList: [],
      RegionList: [],
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        organization1_1: 0,
        organization1_2: 0,
        organization1_3: 0,
        organization2_1: 0,
        organization2_2: 0,
        organization2_3: 0,
        organization3_1: 0,
        organization3_2: 0,
        organization3_3: 0,
        organization4_1: 0,
        organization4_2: 0,
        organization4_3: 0,
        organization5_1: 0,
        organization5_2: 0,
        organization5_3: 0,
        organization6_1: 0,
        organization6_2: 0,
        organization6_3: 0,
        organization7_1: 0,
        organization7_2: 0,
        organization7_3: 0,
        organization8_1: 0,
        organization8_2: 0,
        organization8_3: 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid: 1,
        oblastid: 0,
        regionid: 0,
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
    this.Refresh();
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
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        setregionlist(res.data);
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = "01.01." + yyyy;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.OblastName = "";
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
    },
    //  Print() {
    //     ReportLearningProcessService.GetGraduatedFromGrade11Count(
    //       this.filter.StartDate,
    //       this.filter.EndDate,
    //       this.filter.schoolyearid,
    //       this.filter.oblastid,
    //       this.filter.regionid
    //     )
    //       .then((response) => {
    //         var fileURL = window.URL.createObjectURL(
    //           new Blob([response.data], response.headers)
    //         );
    //         var fileLink = document.createElement("a");

    //         fileLink.href = fileURL;
    //         fileLink.setAttribute("download", "ReportTarifficationData.xlsx");

    //         fileLink.click();
    //       })
    //       .catch((e) => {
    //         let response = JSON.parse(e.request.response);

    //         self.makeToast(response.error, self.$t("actions.error"), "danger");
    //       });

    //   },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetOrgSchoolGradeCountByLanguage(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      ).then((res) => {
        this.Loading = false;
        if (res.data.oblastid != 0) {
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid != 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          // this.filter.regionname = res.data.regionname;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        this.items = res.data.data;

        this.bottomrow = {
          doctabcount: 0,
          doctabsum: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    organizationchange(item) {
      this.$router.push({
        name: "ReportGraduatedFromGrade11",
        query: {
          organization: item.organizationid,
        },
      });
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    calculateTotal(item) {
      var organization1_1 = 0;
      var organization1_2 = 0;
      var organization1_3 = 0;
      var organization2_1 = 0;
      var organization2_2 = 0;
      var organization2_3 = 0;
      var organization3_1 = 0;
      var organization3_2 = 0;
      var organization3_3 = 0;
      var organization4_1 = 0;
      var organization4_2 = 0;
      var organization4_3 = 0;
      var organization5_1 = 0;
      var organization5_2 = 0;
      var organization5_3 = 0;
      var organization6_1 = 0;
      var organization6_2 = 0;
      var organization6_3 = 0;
      var organization7_1 = 0;
      var organization7_2 = 0;
      var organization7_3 = 0;
      var organization8_1 = 0;
      var organization8_2 = 0;
      var organization8_3 = 0;
      item.forEach(function (item) {
        organization1_1 = organization1_1 + item.organization1_1;
        organization1_2 = organization1_2 + item.organization1_2;
        organization1_3 = organization1_3 + item.organization1_3;
        organization2_1 = organization2_1 + item.organization2_1;
        organization2_2 = organization2_2 + item.organization2_2;
        organization2_3 = organization2_3 + item.organization2_3;
        organization3_1 = organization3_1 + item.organization3_1;
        organization3_2 = organization3_2 + item.organization3_2;
        organization3_3 = organization3_3 + item.organization3_3;
        organization4_1 = organization4_1 + item.organization4_1;
        organization4_2 = organization4_2 + item.organization4_2;
        organization4_3 = organization4_3 + item.organization4_3;
        organization5_1 = organization5_1 + item.organization5_1;
        organization5_2 = organization5_2 + item.organization5_2;
        organization5_3 = organization5_3 + item.organization5_3;
        organization6_1 = organization6_1 + item.organization6_1;
        organization6_2 = organization6_2 + item.organization6_2;
        organization6_3 = organization6_3 + item.organization6_3;
        organization7_1 = organization7_1 + item.organization7_1;
        organization7_2 = organization7_2 + item.organization7_2;
        organization7_3 = organization7_3 + item.organization7_3;
        organization8_1 = organization8_1 + item.organization8_1;
        organization8_2 = organization8_2 + item.organization8_2;
        organization8_3 = organization8_3 + item.organization8_3;
      });
      this.bottomrow = {
        organization1_1: organization1_1,
        organization1_2: organization1_2,
        organization1_3: organization1_3,
        organization2_1: organization2_1,
        organization2_2: organization2_2,
        organization2_3: organization2_3,
        organization3_1: organization3_1,
        organization3_2: organization3_2,
        organization3_3: organization3_3,
        organization4_1: organization4_1,
        organization4_2: organization4_2,
        organization4_3: organization4_3,
        organization5_1: organization5_1,
        organization5_2: organization5_2,
        organization5_3: organization5_3,
        organization6_1: organization6_1,
        organization6_2: organization6_2,
        organization6_3: organization6_3,
        organization7_1: organization7_1,
        organization7_2: organization7_2,
        organization7_3: organization7_3,
        organization8_1: organization8_1,
        organization8_2: organization8_2,
        organization8_3: organization8_3,
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
    roundToTwo(value, decimals) {
      value;
      decimals;

      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    },
  },
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organization1_1: 0,
            organization1_2: 0,
            organization1_3: 0,
            organization2_1: 0,
            organization2_2: 0,
            organization2_3: 0,
            organization3_1: 0,
            organization3_2: 0,
            organization3_3: 0,
            organization4_1: 0,
            organization4_2: 0,
            organization4_3: 0,
            organization5_1: 0,
            organization5_2: 0,
            organization5_3: 0,
            organization6_1: 0,
            organization6_2: 0,
            organization6_3: 0,
            organization7_1: 0,
            organization7_2: 0,
            organization7_3: 0,
            organization8_1: 0,
            organization8_2: 0,
            organization8_3: 0,
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
            organization1_1: 0,
            organization1_2: 0,
            organization1_3: 0,
            organization2_1: 0,
            organization2_2: 0,
            organization2_3: 0,
            organization3_1: 0,
            organization3_2: 0,
            organization3_3: 0,
            organization4_1: 0,
            organization4_2: 0,
            organization4_3: 0,
            organization5_1: 0,
            organization5_2: 0,
            organization5_3: 0,
            organization6_1: 0,
            organization6_2: 0,
            organization6_3: 0,
            organization7_1: 0,
            organization7_2: 0,
            organization7_3: 0,
            organization8_1: 0,
            organization8_2: 0,
            organization8_3: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
