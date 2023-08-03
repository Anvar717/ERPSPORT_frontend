<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("AdmQuotaAndEstatement") }}</h3>
        <CCardHeader>
          <b-row>
            <b-col>
              <div>
                <label>{{ $t("ondate") }}</label>
                <date-picker
                  v-model="filter.ondate"
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
            <b-col>
              <div>
                <label> {{ $t("educationlanguage") }} </label>
                <v-select
                  :options="educationlanguagelist"
                  v-model="filter.educationlanguageid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('educationlanguage')"
                  label="name"
                  @input="ChangeEducationLangugae"
                >
                </v-select>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="margin-top:28px"
                  class="mr-2"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t("Refresh") }}
                </CButton>
                <CButton
                  @click="Print"
                  color="primary"
                  style="margin-top:28px"
                  size="sm"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
              </div>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right"
                @click="backbyregion"
                style="margin-top:28px"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </b-col>
          </b-row>
          <CRow class="form-group">
            <CCol sm="12" md="6"  class="d-flex mt-2">
                <v-select
                    :options="OblastList"
                    v-model="filter.oblastid"
                    :disabled="!$can('AdminView', 'permissions') && !$can('MinSportView', 'permissions') && $can('OblastSport', 'permissions') || $can('RegionXTB', 'permissions')"
                    :reduce="item => item.id"
                    :placeholder="$t('oblast')"
                    label="name"
                    class="mr-2"
                    style="width:100%"
                    @input="changeOblast()"
                ></v-select>
                <v-select
                    :options="RegionList"
                    v-model="filter.regionid"
                    :disabled="!$can('AdminView', 'permissions') && !$can('MinSportView', 'permissions') && !$can('OblastSport', 'permissions') && $can('RegionXTB', 'permissions')"
                    :reduce="item => item.id"
                    :placeholder="$t('region')"
                    label="name"
                    class="mr-2"
                    style="width:100%"
                    @input="changeRegion()"
                  ></v-select>
                  <!-- <v-select
                    :options="OrganizationList"
                    v-model="filter.organizationid"
                    :reduce="item => item.id"
                    :placeholder="$t('organization')"
                    label="name"
                    style="width:100%"
                    class="mr-2"
                  ></v-select> -->
                  <!-- <v-select
                  :options="SchoolTypeList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('schooltype')"
                  label="name"
                  style="width : 100%"
                  class="mr-2"
                  v-model="filter.schooltypeid"
                ></v-select> -->
                  <!-- <div>
                      <b-button variant="primary" size="sm" @click="Refresh" style="white-space:nowrap"> <b-icon icon="search"></b-icon> {{ $t('search') }} </b-button>
                  </div> -->
            </CCol>
          </CRow>
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
            <CCol class="text-right">
              <label for="#" class="mr-4">{{ $t("byColor") }}</label>
              <div class="form-group form-row text-right" style="float:right">
                <b-form-checkbox
                  v-model="filter.bycolor"
                  name="check-button"
                  switch
                ></b-form-checkbox>
              </div>
            </CCol>
          </CRow>
          <CRow class="form-group">
            <CCol class="text-right">
              <div style="display:inline-block" class="mr-3">
                <label for="#" class="mr-4">{{ $t("byschool") }}</label>
                <div class="form-group form-row text-right" style="float:right">
                  <b-form-checkbox
                    v-model="filter.byschool"
                    name="check-button"
                    switch
                  ></b-form-checkbox>
                </div>
              </div>
              <div style="display:inline-block">
                <label for="#" class="mr-4">{{
                  $t("onlyreconstructed")
                }}</label>
                <div class="form-group form-row text-right" style="float:right">
                  <b-form-checkbox
                    v-model="filter.onlyreconstructed"
                    name="check-button"
                    switch
                  ></b-form-checkbox>
                </div>
              </div>
            </CCol>
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
                <!-- <th rowspan="2" width="15%" style="text-align: center;vertical-align: middle">{{$t('educationlanguagename')}}</th> -->
                <th colspan="3" style="text-align: center">
                  {{ $t("admquota") }}
                </th>
                <th colspan="6" style="text-align: center">
                  {{ $t("AdoptedChildren") }}
                </th>
                <th
                  rowspan="2"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("coefficient") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("BalanceQuota") }}
                </th>
                <th colspan="4" style="text-align: center">
                  {{ $t("Estatment") }}
                </th>
              </tr>
              <tr>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("totalquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("mainquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("additionalquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("acceptedestatementtotalquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  %
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("acceptedestatementmainquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  %
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("acceptedestatementadditionalquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  %
                </th>

                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("balanceestatementtotalquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("balanceestatementmainquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("balanceestatementadditionalquota") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("totalestatement") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("createdestatement") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("senttedestatement1") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("canceledestatement") }}
                </th>
              </tr>
            </thead>

            <tbody v-if="!Loading">
              <tr
                v-for="(item, i) in items"
                style="text-align: center;vertical-align: middle"
                :key="i"
                :class="
                  filter.bycolor && item.fillcoef < 0.35
                    ? 'isreconstructed-danger'
                    : filter.bycolor &&
                      item.fillcoef >= 0.35 &&
                      item.fillcoef < 0.7
                    ? 'isreconstructed-warning'
                    : filter.bycolor && item.fillcoef > 0.7
                    ? 'isreconstructed-success'
                    : ''
                "
              >
                <td
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: left;vertical-align: middle"
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
                  style="text-align: left;vertical-align: middle"
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
                  style="text-align: left;vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td
                  v-if="filter.oblastid != 0 && filter.regionid != 0"
                  style="text-align: left;vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <!-- <td style="text-align: left;vertical-align: middle">{{item.educationlanguagename}}</td> -->
                <td>
                  {{
                    item.totalquota == 0
                      ? "-"
                      : $options.filters.currency(item.totalquota, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    item.mainquota == 0
                      ? "-"
                      : $options.filters.currency(item.mainquota, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    item.additionalquota == 0
                      ? "-"
                      : $options.filters.currency(item.additionalquota, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    item.acceptedestatementtotalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          item.acceptedestatementtotalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.totalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          (item.acceptedestatementtotalquota * 100) /
                            item.totalquota,
                          { symbol: "", fractionCount: 2 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.acceptedestatementmainquota == 0
                      ? "-"
                      : $options.filters.currency(
                          item.acceptedestatementmainquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.mainquota == 0
                      ? "-"
                      : $options.filters.currency(
                          (item.acceptedestatementmainquota * 100) /
                            item.mainquota,
                          { symbol: "", fractionCount: 2 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.acceptedestatementadditionalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          item.acceptedestatementadditionalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.additionalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          (item.acceptedestatementadditionalquota * 100) /
                            item.additionalquota,
                          { symbol: "", fractionCount: 2 }
                        )
                  }}
                </td>
                <td>{{ item.fillcoef == 0 ? "-" : item.fillcoef }}</td>
                <td>
                  {{
                    item.balanceestatementtotalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          item.balanceestatementtotalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.balanceestatementmainquota == 0
                      ? "-"
                      : $options.filters.currency(
                          item.balanceestatementmainquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.balanceestatementadditionalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          item.balanceestatementadditionalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    item.totalestatement == 0
                      ? "-"
                      : $options.filters.currency(item.totalestatement, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    item.createdestatement == 0
                      ? "-"
                      : $options.filters.currency(item.createdestatement, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    item.acceptedestatement == 0
                      ? "-"
                      : $options.filters.currency(item.acceptedestatement, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    item.canceledestatement == 0
                      ? "-"
                      : $options.filters.currency(item.canceledestatement, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
              </tr>
              <tr
                style="text-align: center;vertical-align: middle;font-weight: bold"
              >
                <td>{{ $t("Total") }}</td>
                <td>
                  {{
                    bottomrow.totalquota == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalquota, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.mainquota == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.mainquota, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.additionalquota == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.additionalquota, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.acceptedestatementtotalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.acceptedestatementtotalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.totalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          (bottomrow.acceptedestatementtotalquota * 100) /
                            bottomrow.totalquota,
                          { symbol: "", fractionCount: 2 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.acceptedestatementmainquota == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.acceptedestatementmainquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.mainquota == 0
                      ? "-"
                      : $options.filters.currency(
                          (bottomrow.acceptedestatementmainquota * 100) /
                            bottomrow.mainquota,
                          { symbol: "", fractionCount: 2 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.acceptedestatementadditionalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.acceptedestatementadditionalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.additionalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          (bottomrow.acceptedestatementadditionalquota * 100) /
                            bottomrow.additionalquota,
                          { symbol: "", fractionCount: 2 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.fillcoef == 0
                      ? "-"
                      : bottomrow.fillcoef.toFixed(2)
                  }}
                </td>
                <td style="white-space:nowrap">
                  {{
                    bottomrow.balanceestatementtotalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.balanceestatementtotalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.balanceestatementmainquota == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.balanceestatementmainquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.balanceestatementadditionalquota == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.balanceestatementadditionalquota,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space:nowrap">
                  {{
                    bottomrow.totalestatement == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalestatement, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.createdestatement == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.createdestatement, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.acceptedestatement == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.acceptedestatement,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.canceledestatement == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.canceledestatement,
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
import EducationLanguageService from "@/services/EducationLanguage.service";
import AdmQuotaAndEstatementService from "@/services/AdmQuotaAndEstatement.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      educationlanguagelist: [],
      OblastList: [],
      RegionList: [],
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        mainquota: 0,
        additionalquota: 0,
        totalquota: 0,
        acceptedestatementmainquota: 0,
        acceptedestatementadditionalquota: 0,
        acceptedestatementtotalquota: 0,
        balanceestatementmainquota: 0,
        balanceestatementadditionalquota: 0,
        balanceestatementtotalquota: 0,
        totalestatement: 0,
        createdestatement: 0,
        canceledestatement: 0,
        acceptedestatement: 0,
        fillcoef: 0,
      },
      filter: {
        schoolyearid: 3,
        ondate: "",
        educationlanguageid: 0,
        oblastid: 0,
        regionid: 0,
        OblastName: "",
        RegionName: "",
        onlyreconstructed: false,
        byschool: false,
        bycolor: false,
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    EducationLanguageService.GetAll().then((res) => {
      this.educationlanguagelist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    this.createDate();
    this.Refresh();
  },

  methods: {
    backbyregion(){
      if(!!this.filter.oblastid && !this.filter.regionid){
        this.filter.oblastid = 0
        this.filter.OblastName = ""
      }
      if(!!this.filter.oblastid && !!this.filter.regionid){
        this.filter.regionid = 0
        this.filter.RegionName = ""
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
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      AdmQuotaAndEstatementService.Print(
        this.filter.schoolyearid,
        this.filter.ondate,
        this.filter.educationlanguageid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.byschool,
        this.filter.onlyreconstructed
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SchoolAdmissionQuotaList.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      AdmQuotaAndEstatementService.GetSchoolAdmQuotaAndEstatement(
        this.filter.schoolyearid,
        this.filter.ondate,
        this.filter.educationlanguageid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.byschool,
        this.filter.onlyreconstructed
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0){
        this.changeOblast()
          this.filter.OblastName = " / " + res.data.oblastname;
        this.filter.regionid = res.data.regionid;
        }
        if (res.data.regionid > 0){
        this.changeRegion()
        this.filter.regionid = res.data.regionid;
          this.filter.RegionName = " / " + res.data.regionname;
      }
        if (this.filter.bycolor == true) {
          this.items.sort(function(a, b) {
            return a.fillcoef - b.fillcoef;
          });
        }
        this.bottomrow = {
          mainquota: 0,
          additionalquota: 0,
          totalquota: 0,
          acceptedestatementmainquota: 0,
          acceptedestatementadditionalquota: 0,
          acceptedestatementtotalquota: 0,
          balanceestatementmainquota: 0,
          balanceestatementadditionalquota: 0,
          balanceestatementtotalquota: 0,
          totalestatement: 0,
          createdestatement: 0,
          canceledestatement: 0,
          acceptedestatement: 0,
          fillcoef: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    changeOblast(){
      RegionService.GetAll(this.lang,this.filter.oblastid).then(res => {
        this.RegionList = res.data
      })
    },
    calculateTotal(item) {
      var mainquota = 0;
      var additionalquota = 0;
      var totalquota = 0;
      var acceptedestatementmainquota = 0;
      var acceptedestatementadditionalquota = 0;
      var acceptedestatementtotalquota = 0;
      var balanceestatementmainquota = 0;
      var balanceestatementadditionalquota = 0;
      var balanceestatementtotalquota = 0;
      var totalestatement = 0;
      var createdestatement = 0;
      var canceledestatement = 0;
      var acceptedestatement = 0;
      var fillcoef = 0;
      item.forEach(function(item) {
        mainquota = mainquota + item.mainquota;
        additionalquota = additionalquota + item.additionalquota;
        totalquota = totalquota + item.totalquota;
        acceptedestatementmainquota =
          acceptedestatementmainquota + item.acceptedestatementmainquota;
        acceptedestatementadditionalquota =
          acceptedestatementadditionalquota +
          item.acceptedestatementadditionalquota;
        acceptedestatementtotalquota =
          acceptedestatementtotalquota + item.acceptedestatementtotalquota;
        balanceestatementmainquota =
          balanceestatementmainquota + item.balanceestatementmainquota;
        balanceestatementadditionalquota =
          balanceestatementadditionalquota +
          item.balanceestatementadditionalquota;
        balanceestatementtotalquota =
          balanceestatementtotalquota + item.balanceestatementtotalquota;
        totalestatement = totalestatement + item.totalestatement;
        createdestatement = createdestatement + item.createdestatement;
        canceledestatement = canceledestatement + item.canceledestatement;
        acceptedestatement = acceptedestatement + item.acceptedestatement;
        fillcoef = fillcoef + item.fillcoef;
      });
      this.bottomrow = {
        fillcoef: fillcoef,
        mainquota: mainquota,
        additionalquota: additionalquota,
        totalquota: totalquota,
        acceptedestatementmainquota: acceptedestatementmainquota,
        acceptedestatementadditionalquota: acceptedestatementadditionalquota,
        acceptedestatementtotalquota: acceptedestatementtotalquota,
        balanceestatementmainquota: balanceestatementmainquota,
        balanceestatementadditionalquota: balanceestatementadditionalquota,
        balanceestatementtotalquota: balanceestatementtotalquota,
        totalestatement: totalestatement,
        createdestatement: createdestatement,
        canceledestatement: canceledestatement,
        acceptedestatement: acceptedestatement,
        fillcoef: fillcoef,
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
    ChangeEducationLangugae(){
      // if (newValue) {
          this.items = [];
          this.bottomrow = {
            mainquota: 0,
            isreconstructed: false,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,
            fillcoef: 0,
          };
        // }
        this.Refresh();
        this.bottomrow.isreconstructed;
    }
  },
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            mainquota: 0,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,
            fillcoef: 0,
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
            mainquota: 0,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,
            fillcoef: 0,
          };
        }
        this.Refresh();
      },
    },
    // "filter.educationlanguageid": {
    //   handler(newValue, oldValue) {
        
    //   },
    // },
    "filter.onlyreconstructed": {
      handler(newValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            mainquota: 0,
            isreconstructed: false,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,
            fillcoef: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.byschool": {
      handler(newValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            mainquota: 0,
            isreconstructed: false,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,
            fillcoef: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.bycolor": {
      handler(newValue) {
        if (newValue) {
          if (newValue == true) {
            this.items.sort(function(a, b) {
              return a.fillcoef - b.fillcoef;
            });
          }
          // this.items = [];
          this.bottomrow = {
            mainquota: 0,
            isreconstructed: false,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,
            fillcoef: 0,
          };
        }
        this.calculateTotal(this.items);
        // this.Refresh()
      },
    },
  },
};
</script>
