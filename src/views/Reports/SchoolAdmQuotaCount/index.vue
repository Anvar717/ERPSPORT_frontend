<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3>{{ $t("SchoolAdmQuotaCount") }}</h3>
          </b-col>
          <b-col class="text-right">
            <CButton
              color="danger"
              class="float-right"
              @click="backbyregion"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>

        <CCardHeader>
          <CRow class="form-group">
            <CCol class="d-flex mt-2">
                <v-select
                  :options="schoolyearlist"
                  v-model="filter.schoolyearid"
                  :reduce="(item) => item.id"
                  class="mr-2"
                style="width: 100%"
                  :placeholder="$t('SchoolYear')"
                  label="name"
                >
                </v-select>
                <v-select
                  :options="educationlanguagelist"
                  v-model="filter.educationlanguageid"
                  :reduce="(item) => item.id"
                  class="mr-2"
                style="width: 100%"
                  :placeholder="$t('educationlanguage')"
                  label="name"
                >
                </v-select>
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
                @input="changeOblast()"
              ></v-select>
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
              <div>
                <b-button
                  variant="primary"
                  size="sm"
                  @click="Refresh"
                  style="white-space: nowrap"
                >
                  <b-icon icon="search"></b-icon> {{ $t("search") }}
                </b-button>
              </div>
            </CCol>
          </CRow>
          <!-- <b-row>
            <b-col>
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
            </b-col>
            <b-col>
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
            </b-col>
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  class="mr-2"
                  color="primary"
                  style="margin-top:28px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }}
                </CButton>
                <CButton
                  @click="Print"
                  color="primary"
                  class="float-right"
                  size="sm"
                  style="margin-top:28px"
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
                @click="$router.push('/')"
                size="sm"
                style="margin-top:28px"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </b-col>
          </b-row> -->
          <CRow class="form-group mt-3">
            <CCol sm="12" md="9">
              <h4 class="m-0 p-0 region-text">
                <a href="javascript:void(0)" @click="topcountrychange">{{
                  $t("O`zbekiston")
                }}</a>
                <a href="javascript:void(0)" @click="topoblastchange">{{
                  filter.OblastName
                }}</a>
                <a href="javascript:void(0)">{{ filter.RegionName }}</a>
              </h4>
            </CCol>
            <CCol sm="12" md="3" class="d-flex">
              <!-- <v-select
                  :options="SchoolTypeList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('schooltype')"
                  label="name"
                  style="width : 100%"
                  class="mr-2"
                  v-model="filter.schooltypeid"
                ></v-select> -->
              <!-- <v-select
                :options="SchoolLegalFormList"
                :reduce="(item) => item.id"
                :placeholder="$t('schoollegalform')"
                label="name"
                style="width: 100%"
                class="mr-2"
                v-model="filter.schoollegalformid"
              ></v-select> -->
              <!-- <b-button variant="primary" @click="Refresh" style="white-space:nowrap"> <b-icon icon="search"></b-icon> {{ $t('search') }} </b-button> -->
            </CCol>
          </CRow>
        </CCardHeader>
        <div class="table-container" style="padding: 5px">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
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
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <!-- <th style="text-align: center"> {{ $t('schooltypename') }} </th> -->
                <th style="text-align: center">{{ $t("educationlanguage") }}</th>
                <th style="text-align: center">
                  {{ $t("mainquota") }}
                </th>

                <th style="text-align: center">
                  {{ $t("additionalquota") }}
                </th>
                <th style="text-align: center">
                  {{ $t("totalquota") }}
                </th>
                <th style="text-align: center">
                  {{ $t("schoolgradecount") }}
                </th>
                <th style="text-align: center">
                  {{ $t("averagegrade") }}
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
                <!-- <td style="text-align: left;vertical-align: middle">{{item.schooltypename}}</td> -->
                <td style="text-align: right; vertical-align: middle">
                  {{ item.educationlanguagename }}
                </td>
                <td style="text-align: right; vertical-align: middle">
                  {{ item.mainquota }}
                </td>

                <td style="text-align: right; vertical-align: middle">
                  {{ item.additionalquota }}
                </td>
                <td style="text-align: right; vertical-align: middle">
                  {{ item.totalquota }}
                </td>
                 <td style="text-align: right; vertical-align: middle">
                  {{ item.schoolgradecount }}
                </td>
                 <td style="text-align: right; vertical-align: middle">
                  {{ item.averagegrade }}
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
import SchoolSubjectService from "@/services/SchoolSubject.service";
import ReportVacancyService from "@/services/ReportVacancy.service";
import AdmQuotaAndEstatementService from "@/services/AdmQuotaAndEstatement.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      schoolsubjectlist: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      educationlanguagelist:[],
      schoolyearlist:[],
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        transitionschoolyearcount: 0,
        schoolcount: 0,
        orgschoolparametercount: 0,
      },
      filter: {
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        schoolsubjectid: 0,
        OblastName: "",
        RegionName: "",
        schooltypeid: 0,
        schoollegalformid: 0,
      },
      lang: localStorage.getItem("locale") || "ru",
      SchoolTypeList: [],
      SchoolLegalFormList: [],
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.OblastList = res.data;
    });
     EducationLanguageService.GetAll().then((res) => {
      this.educationlanguagelist = res.data;
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
      this.filter.schoolsubjectid = item.schoolsubjectid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.schoolsubjectid = item.schoolsubjectid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportVacancyService.Print(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolsubjectid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "ReportVacancy.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      AdmQuotaAndEstatementService.GetSchoolAdmQuotaCount(
       this.filter.schoolyearid,
        this.filter.educationlanguageid,
        this.filter.ondate,
        this.filter.oblastid,
        this.filter.regionid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.changeOblast();
          this.filter.OblastName = " / " + res.data.oblastname;
        }
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0) {
          this.changeRegion();
          this.filter.RegionName = " / " + res.data.regionname;
        }
        this.bottomrow = {
          totalhours: 0,
          totalsalary: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    changeOblast() {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
      });
    },
    changeRegion(oblast, region) {
      OrganizationService.GetAll(
        this.filter.oblastid,
        this.filter.regionid,
        false
      ).then((res) => {
        this.OrganizationList = res.data;
      });
    },
    calculateTotal(item) {
      var orgschoolparametercount = 0;
      var schoolcount = 0;
      var transitionschoolyearcount = 0;
      item.forEach(function (item) {
        orgschoolparametercount =
          orgschoolparametercount + item.orgschoolparametercount;
        schoolcount = schoolcount + item.schoolcount;
        transitionschoolyearcount =
          transitionschoolyearcount + item.transitionschoolyearcount;
      });
      this.bottomrow = {
        orgschoolparametercount: orgschoolparametercount,
        schoolcount: schoolcount,
        transitionschoolyearcount: transitionschoolyearcount,
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
            totalhours: 0,
            totalsalary: 0,
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
            totalhours: 0,
            totalsalary: 0,
          };
        }
        this.Refresh();
      },
    },

    "filter.schoolsubjectid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            totalhours: 0,
            totalsalary: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
