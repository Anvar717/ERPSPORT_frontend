<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">
              {{ $t("Мактаб қуввати (ўқувчи сони, коеффициенти)") }}
            </h4>
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
            <b-col sm="12" lg="3">
              <div>
                <label> {{ $t("SchoolLegalForm") }} </label>
                <v-select
                  :options="schoollegalformlist"
                  v-model="filter.schoolLegalFormId"
                  :reduce="(item) => item.id"
                  :placeholder="$t('SchoolLegalForm')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col>
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
            <b-col>
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
              <h4>
                <a href="javascript:void(0)" @click="topcountrychange">{{
                  $t("O`zbekiston")
                }}</a>
                <a href="javascript:void(0)" @click="topoblastchange">{{
                  filter.oblastname
                }}</a>
                <a href="javascript:void(0)">{{ filter.regionname }}</a>
              </h4>
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
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("schools") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Қуввати(ўқувчи ўрни)") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("students") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Коеффисенти") }}
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
                <!-- <td
                  v-if="
                    filter.oblastid > 0 &&
                    (filter.regionid === 0 || filter.regionid === null) &&
                    filter.byschool
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.schooltype }}</a>
                </td> -->
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
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
                    $options.filters.currency(item.studentcapacity, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td>
                  {{
                    $options.filters.currency(item.studentcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td>
                  {{ item.coefficient }}
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
                    bottomrow.studentcapacity == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.studentcapacity, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.studentcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.studentcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{ bottomrow.coefficient == 0 ? "-" : bottomrow.coefficient }}
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
      PrintLoading: false,
      OblastList: [],
      RegionList: [],
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        doctabcount: 0,
        doctabsum: 0,
      },
      filter: {
        schoolyearid: 3,
        qualificationcategoryid: 0,
        oblastid: 0,
        regionid: 0,
        schoolsubjectid: 0,
        schoolLegalFormId: 1,
        schoolgradegroupid: 0,
        oblastname: "",
        regionname: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
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
      });
  },

  methods: {
    Print() {
      ReportLearningProcessService.PrintSchoolCapacity(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolLegalFormId
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SchoolCapacity.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.oblastname = "";
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.filter.regionname = "";
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
      this.filter.regionid = 0;
      this.filter.oblastname = "";
      this.filter.regionname = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.regionname = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.oblastname = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.regionname = " / " + item.regionname;
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetSchoolCapacity(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolLegalFormId
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.filter.oblastname = " / " + res.data.oblastname;
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          this.filter.regionname = " / " + res.data.regionname;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (this.filter.bycolor == true) {
          this.items.sort(function(a, b) {
            return a.fillcoef - b.fillcoef;
          });
        }
        this.bottomrow = {
          totalorgcount: 0,
          studentcapacity: 0,
          coefficient: 0,
          studentcount: 0,
        };
        this.calculateTotal(this.items);
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
      var totalorgcount = 0;
      var studentcapacity = 0;
      var coefficient = 0;
      var studentcount = 0;
      item.forEach(function(item) {
        totalorgcount = totalorgcount + item.totalorgcount;
        studentcapacity = studentcapacity + item.studentcapacity;
        coefficient = coefficient + item.coefficient;
        studentcount = studentcount + item.studentcount;
      });
      this.bottomrow = {
        totalorgcount: totalorgcount,
        studentcapacity: studentcapacity,
        coefficient: coefficient,
        studentcount: studentcount,
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
            studentcapacity: 0,
            coefficient: 0,
            studentcount: 0,
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
            studentcapacity: 0,
            coefficient: 0,
            studentcount: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.qualificationcategoryid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            totalorgcount: 0,
            studentcapacity: 0,
            coefficient: 0,
            studentcount: 0,
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
            totalorgcount: 0,
            studentcapacity: 0,
            coefficient: 0,
            studentcount: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.schoolLegalFormId": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            totalorgcount: 0,
            studentcapacity: 0,
            coefficient: 0,
            studentcount: 0,
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
            studentcapacity: 0,
            coefficient: 0,
            studentcount: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
