<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">{{ $t("Мактаблар жойлашуви") }}</h4>
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
              <label for=""> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="filter.organizationtypeid"
              ></v-select>
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
                      (filter.regionid === 0 || filter.regionid === null)
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("regionname") }}
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
                  colspan="4"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Included") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("oblastschools") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("regionschools") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("villageschools") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("distantschools") }}
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
                      (filter.regionid === 0 || filter.regionid === null)
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
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td>{{ item.organizationcount }}</td>
                <td>{{ item.iscity }}</td>
                <td>{{ item.iscenterregion }}</td>
                <td>{{ item.iscentervillage }}</td>
                <td>{{ item.isfarmfy }}</td>
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
                    bottomrow.iscity == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.iscity, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.iscenterregion == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.iscenterregion, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.iscentervillage == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.iscentervillage, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.isfarmfy == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.isfarmfy, {
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
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      schoollegalformlist: [],
      organizationtypelist: [],
      OblastList: [],
      RegionList: [],
      PrintLoading: false,
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        organizationcount: 0,
        iscity: 0,
        iscenterregion: 0,
        iscentervillage: 0,
        isfarmfy: 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid: 1,
        oblastid: 0,
        regionid: 0,
        schoolsubjectid: 0,
        schoolgradegroupid: 0,
        organizationtypeid: 4,
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });

    this.createDate();
    this.Refresh();
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
        this.filter.schoollegalformid = 0;
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
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
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
      this.filter.schoollegalformid = 0;
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
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      // this.filter.schoollegalformid = item.schoollegalformid;
      this.filter.RegionName = " / " + item.regionname;
      this.ChangeOblast();
    },
    Print() {
      ReportLearningProcessService.PrintLocationOfSchools(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoollegalformid,
        this.filter.organizationtypeid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "LocationOfSchools.xlsx");
          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetLocationOfSchools(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoollegalformid,
        this.filter.organizationtypeid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;

        this.bottomrow = {
          organizationcount: 0,
          iscity: 0,
          iscenterregion: 0,
          iscentervillage: 0,
          isfarmfy: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var organizationcount = 0;
      var iscity = 0;
      var iscenterregion = 0;
      var iscentervillage = 0;
      var isfarmfy = 0;
      item.forEach(function(item) {
        organizationcount = organizationcount + item.organizationcount;
        iscity = iscity + item.iscity;
        iscenterregion = iscenterregion + item.iscenterregion;
        iscentervillage = iscentervillage + item.iscentervillage;
        isfarmfy = isfarmfy + item.isfarmfy;
      });
      this.bottomrow = {
        organizationcount: organizationcount,
        iscity: iscity,
        iscenterregion: iscenterregion,
        iscentervillage: iscentervillage,
        isfarmfy: isfarmfy,
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
            iscity: 0,
            iscenterregion: 0,
            iscentervillage: 0,
            isfarmfy: 0,
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
            iscity: 0,
            iscenterregion: 0,
            iscentervillage: 0,
            isfarmfy: 0,
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
            iscity: 0,
            iscenterregion: 0,
            iscentervillage: 0,
            isfarmfy: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
