<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col sm="12" md="12">
            <h4 class="text-left">{{ $t("MovedSchoolCount") }}</h4>
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
            <b-col sm="12">
              <div class="d-flex">
                <div class="mr-2" style="width: 60%">
                  <label>{{ $t("SchoolYear") }}</label>
                  <v-select
                    :options="schoolyearlist"
                    v-model="filter.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                  >
                  </v-select>
                </div>
                <div class="mr-2" style="width: 130%">
                  <label>{{ $t("oblast") }}</label>
                  <v-select
                    :options="OblastList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    :disabled="
                      (!$can('AdminView', 'permissions') &&
                        !$can('MinSportView', 'permissions') &&
                        $can('OblastSport', 'permissions')) ||
                      $can('RegionXTB', 'permissions')
                    "
                    v-model="filter.oblastid"
                    @input="ChangeOblast"
                  ></v-select>
                </div>
                <div class="mr-2" style="width: 130%">
                  <label>{{ $t("region") }}</label>
                  <v-select
                    :options="RegionList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    :disabled="
                      !$can('AdminView', 'permissions') &&
                      !$can('MinSportView', 'permissions') &&
                      !$can('OblastSport', 'permissions') &&
                      $can('RegionXTB', 'permissions')
                    "
                    v-model="filter.regionid"
                  ></v-select>
                </div>
                <div class="mr-2" style="width: 130%">
                  <label>{{ $t("OrganizationType") }}</label>
                  <v-select
                    :options="organizationtypelist"
                    v-model="filter.organizationtypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('OrganizationType')"
                    label="name"
                  >
                  </v-select>
                </div>
                <div class="mr-2" style="width: 40%">
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
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col sm="8">
              <div class="d-flex">
                <div class="mr-2" style="width: 100%">
                  <label for=""> {{ $t("schoollegalform") }} </label>
                  <v-select
                    :options="schoollegalformlist"
                    v-model="filter.schoollegalformid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('schoollegalform')"
                    label="name"
                  >
                  </v-select>
                </div>
                <div class="mr-2" style="width: 160%">
                  <label for=""> {{ $t("schooltype") }} </label>
                  <v-select
                    :options="schooltypelist"
                    v-model="filter.schooltypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('schooltype')"
                    label="name"
                  >
                  </v-select>
                </div>
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
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("OrderNumber") }}
                </th>
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
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("schoolcount") }}
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
                  {{ $t("countchoolgrad") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("TakenSchoolAction") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("NotTakenSchoolAction") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("TakenSchoolGradeAction") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("NotTakenSchoolGradeAction") }}
                </th>
              </tr>
            </thead>

            <tbody v-if="!Loading">
              <tr
                v-for="(item, i) in items"
                style="text-align: center; vertical-align: middle"
                :key="i"
              >
                <td style="text-align: center; vertical-align: middle">
                  {{ i + 1 }}
                </td>
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
                  {{ item.movedorganizationcount }}
                </td>
                <td>
                  {{ item.notmovedorganizationcount }}
                </td>
                <td>
                  {{ item.orgschoolgradecount }}
                </td>
                <td>
                  {{ item.movedorgschoolgradecount }}
                </td>
                <td>
                  {{ item.notmovedorgschoolgradecount }}
                </td>
              </tr>
              <tr
                style="
                  text-align: center;
                  vertical-align: middle;
                  font-weight: bold;
                "
              >
                <td colspan="2">{{ $t("Total") }}</td>
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
                    bottomrow.movedorganizationcount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.movedorganizationcount,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.notmovedorganizationcount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.notmovedorganizationcount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.orgschoolgradecount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.orgschoolgradecount,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.movedorgschoolgradecount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.movedorgschoolgradecount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.notmovedorgschoolgradecount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.notmovedorgschoolgradecount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
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
import SchoolTypeService from "@/services/SchoolType.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      qualificationcategorylist: [],
      organiztiontypelist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      OblastList: [],
      RegionList: [],
      organizationtypelist: [],
      schoolgradegrouplist: [],
      schooltypelist: [],
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
        orgschoolgradecount: 0,
        movedorganizationcount: 0,
        movedorgschoolgradecount: 0,
        notmovedorganizationcount: 0,
        notmovedorgschoolgradecount: 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid: 1,
        organizationtypeid: 4,
        schoolTypeId: 0,
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
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
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
    ChangeOblast() {
      this.filter.regionid = "";
      this.filter.organizationid = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    // ChangeRegion() {
    //   this.filter.organizationid = "";
    //   if (!!this.filter.regionid) {
    //     OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
    //       this.OrganizationList = res.data;
    //     });
    //   }
    // },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.regionid = 0;
      this.filter.schoolyearid = 4;
      this.filter.schoollegalformid = 1;
      this.filter.organizationtypeid = 4;
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
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      //   ReportLearningProcessService.PrintSequenceOfEducation(
      //     this.filter.oblastid,
      //     this.filter.regionid,
      //     this.filter.schoolyearid,
      //     this.filter.schoollegalformid
      //   )
      //     .then((response) => {
      //       var fileURL = window.URL.createObjectURL(
      //         new Blob([response.data], response.headers)
      //       );
      //       var fileLink = document.createElement("a");
      //       fileLink.href = fileURL;
      //       fileLink.setAttribute("download", "SequenceOfEducation.xlsx");
      //       fileLink.click();
      //     })
      //     .catch((e) => {
      //       let response = JSON.parse(e.request.response);
      //       self.makeToast(response.error, self.$t("actions.error"), "danger");
      //     });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetMovedSchoolCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.schoollegalformid,
        this.filter.schoolyearid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;

        this.bottomrow = {
          organizationcount: 0,
          orgschoolgradecount: 0,
          movedorganizationcount: 0,
          movedorgschoolgradecount: 0,
          notmovedorganizationcount: 0,
          notmovedorgschoolgradecount: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var organizationcount = 0;
      var orgschoolgradecount = 0;
      var movedorganizationcount = 0;
      var movedorgschoolgradecount = 0;
      var notmovedorganizationcount = 0;
      var notmovedorgschoolgradecount = 0;
      item.forEach(function (item) {
        organizationcount = organizationcount + item.organizationcount;
        orgschoolgradecount = orgschoolgradecount + item.orgschoolgradecount;
        movedorganizationcount =
          movedorganizationcount + item.movedorganizationcount;
        movedorgschoolgradecount =
          movedorgschoolgradecount + item.movedorgschoolgradecount;
        notmovedorganizationcount =
          notmovedorganizationcount + item.notmovedorganizationcount;
        notmovedorgschoolgradecount =
          notmovedorgschoolgradecount + item.notmovedorgschoolgradecount;
      });
      this.bottomrow = {
        organizationcount: organizationcount,
        orgschoolgradecount: orgschoolgradecount,
        movedorganizationcount: movedorganizationcount,
        movedorgschoolgradecount: movedorgschoolgradecount,
        notmovedorganizationcount: notmovedorganizationcount,
        notmovedorgschoolgradecount: notmovedorgschoolgradecount,
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
            orgschoolgradecount: 0,
            movedorganizationcount: 0,
            movedorgschoolgradecount: 0,
            notmovedorganizationcount: 0,
            notmovedorgschoolgradecount: 0,
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
            orgschoolgradecount: 0,
            movedorganizationcount: 0,
            movedorgschoolgradecount: 0,
            notmovedorganizationcount: 0,
            notmovedorgschoolgradecount: 0,
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
            orgschoolgradecount: 0,
            movedorganizationcount: 0,
            movedorgschoolgradecount: 0,
            notmovedorganizationcount: 0,
            notmovedorgschoolgradecount: 0,
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
            orgschoolgradecount: 0,
            movedorganizationcount: 0,
            movedorgschoolgradecount: 0,
            notmovedorganizationcount: 0,
            notmovedorgschoolgradecount: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.schooltypeid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            orgschoolgradecount: 0,
            movedorganizationcount: 0,
            movedorgschoolgradecount: 0,
            notmovedorganizationcount: 0,
            notmovedorgschoolgradecount: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.organizationtypeid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            orgschoolgradecount: 0,
            movedorganizationcount: 0,
            movedorgschoolgradecount: 0,
            notmovedorganizationcount: 0,
            notmovedorgschoolgradecount: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
