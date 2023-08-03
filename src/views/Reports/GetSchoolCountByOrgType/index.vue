<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col class="text-center" lg="12">
            <h4>{{ $t("GetSchoolCountByOrgType") }}</h4>
          </b-col>
          <!-- <b-col class="text-lg-right" lg="12">
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
          </b-col> -->
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
              </div>
            </b-col>
            <b-col class="text-right">
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
                    style="text-align: center; vertical-align: middle"
                  >
                    <span v-if="filter.oblastid == 0 && filter.regionid == 0">
                      {{ $t("sportPlaceName") }}
                    </span>
                    <span v-if="filter.oblastid != 0 && filter.regionid == 0">
                      {{ $t("regionname") }}
                    </span>
                    <span v-if="filter.oblastid != 0 && filter.regionid != 0">
                      {{ $t("organizationname") }}
                    </span>
                  </th>
                  <th
                    colspan="10"
                    style="text-align: center; vertical-align: middle"
                  >
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
                    colspan="9"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Шулардан") }}
                  </th>
                </tr>
                <tr>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype1") }}
                  </th>
  
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype2") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype3") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype4") }}
                  </th>
  
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype6") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype16") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype18") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype19") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("orgtype21") }}
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
                    v-if="filter.oblastid == 0 && filter.regionid == 0"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a href="javascript:void(0)" @click="ChangeOblast(item)">{{
                      item.oblastname
                    }}</a>
                  </td>
                  <td
                    v-if="filter.oblastid != 0 && filter.regionid == 0"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a href="javascript:void(0)" @click="ChangeRegion(item)">{{
                      item.regionname
                    }}</a>
                  </td>
                  <td
                    v-if="filter.oblastid != 0 && filter.regionid != 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    <a href="javascript:void(0)">{{ item.organizationname }}</a>
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.totalorgcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype1, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
  
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype2, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype3, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype4, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
  
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype6, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype16, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype18, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype19, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.orgtype21, {
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
                  <td class="text-right">
                    {{
                      bottomrow.totalorgcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.totalorgcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype1 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype1, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype2 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype2, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype3 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype3, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype4 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype4, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype6 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype6, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype16 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype16, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype18 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype18, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype19 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype19, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      bottomrow.orgtype21 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.orgtype21, {
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
          </div>

          <br />
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
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
      totalRows: "",
      PrintLoading: false,
      isBusy: true,
      bottomrow: {
        totalorgcount: 0,
        orgtype1: 0,
        orgtype2: 0,
        orgtype3: 0,
        orgtype4: 0,
        orgtype6: 0,
        orgtype16: 0,
        orgtype18: 0,
        orgtype19: 0,
        orgtyp21:0,
      },
      filter: {
        schoolyearid: 2,
        oblastid: 0,
        regionid: 0,
        organizationTypeId: 0,
        schoolTypeId: 0,
        schoolLegalFormId: 0,
        OblastName: "",
        RegionName: "",
        organizationTypeName: "",
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
      this.Refresh();
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
      this.filter.OblastName = "";
      this.filter.RegionName = "";
      this.Refresh();
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
      this.Refresh();
    },
    ChangeOblast(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = item.oblastname;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
    },
    ChangeRegion(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = item.regionname;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetSchoolCountByOrgType(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.schoolLegalFormId
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var totalorgcount = 0;
      var orgtype1 = 0;
      var orgtype2 = 0;
      var orgtype3 = 0;
      var orgtype4 = 0;
      var orgtype6 = 0;
      var orgtype16 = 0;
      var orgtype18 = 0;
      var orgtype19 = 0;
      var orgtyp21 = 0;
      item.forEach(function (item) {
        totalorgcount = totalorgcount + item.totalorgcount;
        orgtype1 = orgtype1 + item.orgtype1;
        orgtype2 = orgtype2 + item.orgtype2;
        orgtype3 = orgtype3 + item.orgtype3;
        orgtype4 = orgtype4 + item.orgtype4;
        orgtype6 = orgtype6 + item.orgtype6;
        orgtype16 = orgtype16 + item.orgtype16;
        orgtype18 = orgtype18 + item.orgtype18;
        orgtype19 = orgtype19 + item.orgtype19;
        orgtyp21 = orgtyp21 + item.orgtyp21;
      });
      this.bottomrow = {
        totalorgcount : totalorgcount,
        orgtype1 :orgtype1,
        orgtype2 :orgtype2,
        orgtype3 :orgtype3,
        orgtype4 :orgtype4,
        orgtype6 :orgtype6,
        orgtype16 :orgtype16,
        orgtype18 :orgtype18,
        orgtype19:orgtype19,
        orgtyp21 :orgtyp21,
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
};
</script>
