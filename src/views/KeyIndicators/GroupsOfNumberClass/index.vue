<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">Синф тўлдирилиши</h4>
            <!-- {{ $t("studentcapacity") }} -->
          </b-col>
          <b-col class="text-right">
            <CButton @click="Print" class="mr-2" color="primary" size="sm">
              <b-icon icon="printer"></b-icon>
              {{ $t("Print") }}
            </CButton>
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col md="3">
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
                  Ҳудуд номи
                  <!-- {{ $t("oblastname") }} -->
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
                  Жами синфлар сони
                  <!-- {{ $t("totalschools") }} -->
                </th>
                <th
                  colspan="5"
                  style="text-align: center; vertical-align: middle"
                >
                  Шундан қуввати (ўқ.ўрни) бўйича мактаблар сони
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  Мактаблар сони
                  <!-- {{ $t("Included") }} -->
                </th>
              </tr>
              <!-- <tr>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("oblastschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("regionschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("villageschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("distantschools") }}
                </th>
              </tr> -->
              <tr>
                <th style="text-align: center; vertical-align: middle">
                  19 нафар ва ундан кам ўқувчилар мавжуд синфлар
                </th>
                <th style="text-align: center; vertical-align: middle">
                  20 дан 25 нафаргача ўқувчилар мавжуд синфлар
                </th>
                <th style="text-align: center; vertical-align: middle">
                  26 дан 30 нафаргача ўқувчилар мавжуд синфлар
                </th>
                <th style="text-align: center; vertical-align: middle">
                  31 дан 35 нафаргача ўқувчилар мавжуд синфлар
                </th>
                <th style="text-align: center; vertical-align: middle">
                  36 нафар ва ундан ортиқ ўқувчилар мавжуд синфлар
                </th>
                <th style="text-align: center; vertical-align: middle">
                  Синфда 19 нафар ва ундан кам ўқувчилар мавжуд мактаблар сони
                </th>
                <th style="text-align: center; vertical-align: middle">
                  Синфда 36 нафар ва ундан ортиқ ўқувчилар мавжуд мактаблар сони
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
                <td>{{ item.orgschoolgradecount }}</td>
                <td>{{ item.orgschoolgradecount19 }}</td>
                <td>{{ item.orgschoolgradecount2025 }}</td>
                <td>{{ item.orgschoolgradecount2630 }}</td>
                <td>{{ item.orgschoolgradecount3135 }}</td>
                <td>{{ item.orgschoolgradecount36 }}</td>
                <td>{{ item.organizationcount19 }}</td>
                <td>{{ item.organizationcount36 }}</td>
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
                    bottomrow.orgschoolgradecount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.orgschoolgradecount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.orgschoolgradecount19 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.orgschoolgradecount19,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.orgschoolgradecount2025 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.orgschoolgradecount2025,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.orgschoolgradecount2630 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.orgschoolgradecount2630,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.orgschoolgradecount3135 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.orgschoolgradecount3135,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.orgschoolgradecount36 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.orgschoolgradecount36,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organizationcount19 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.organizationcount19,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organizationcount36 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.organizationcount36,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <!-- <td>
                  {{
                    bottomrow.organization3_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organization3_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td> -->
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
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      schoollegalformlist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        orgschoolgradecount: 0,
        orgschoolgradecount19: 0,
        orgschoolgradecount2025: 0,
        orgschoolgradecount2630: 0,
        orgschoolgradecount3135: 0,
        orgschoolgradecount36: 0,
        organizationcount19: 0,
        organizationcount36: 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid: 1,
        oblastid: 0,
        regionid: 0,
        schoolsubjectid: 0,
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
        this.filter.schoolyearid = 0;
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
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.schoolyearid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      // this.filter.schoolyearid = item.schoolyearid;
      //this.filter.schoollegalformid = item.schoollegalformid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      // this.filter.schoolyearid = item.schoolyearid;
      // this.filter.schoollegalformid = item.schoollegalformid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportLearningProcessService.PrintGroupsOfNumberClass(
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
          fileLink.setAttribute("download", "GroupsOfNumberClass.xlsx");
          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetGroupsOfNumberClass(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.bottomrow = {
          orgschoolgradecount: 0,
          orgschoolgradecount19: 0,
          orgschoolgradecount2025: 0,
          orgschoolgradecount2630: 0,
          orgschoolgradecount3135: 0,
          orgschoolgradecount36: 0,
          organizationcount19: 0,
          organizationcount36: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var orgschoolgradecount = 0;
      var orgschoolgradecount19 = 0;
      var orgschoolgradecount2025 = 0;
      var orgschoolgradecount2630 = 0;
      var orgschoolgradecount3135 = 0;
      var orgschoolgradecount36 = 0;
      var organizationcount19 = 0;
      var organizationcount36 = 0;
      item.forEach(function(item) {
        orgschoolgradecount = orgschoolgradecount + item.orgschoolgradecount;
        orgschoolgradecount19 =
          orgschoolgradecount19 + item.orgschoolgradecount19;
        orgschoolgradecount2025 =
          orgschoolgradecount2025 + item.orgschoolgradecount2025;
        orgschoolgradecount2630 =
          orgschoolgradecount2630 + item.orgschoolgradecount2630;
        orgschoolgradecount3135 =
          orgschoolgradecount3135 + item.orgschoolgradecount3135;
        orgschoolgradecount36 =
          orgschoolgradecount36 + item.orgschoolgradecount36;
        organizationcount19 = organizationcount19 + item.organizationcount19;
        organizationcount36 = organizationcount36 + item.organizationcount36;
      });
      this.bottomrow = {
        orgschoolgradecount: orgschoolgradecount,
        orgschoolgradecount19: orgschoolgradecount19,
        orgschoolgradecount2025: orgschoolgradecount2025,
        orgschoolgradecount2630: orgschoolgradecount2630,
        orgschoolgradecount3135: orgschoolgradecount3135,
        orgschoolgradecount36: orgschoolgradecount36,
        organizationcount19: organizationcount19,
        organizationcount36: organizationcount36,
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
            orgschoolgradecount: 0,
            orgschoolgradecount19: 0,
            orgschoolgradecount2025: 0,
            orgschoolgradecount2630: 0,
            orgschoolgradecount3135: 0,
            orgschoolgradecount36: 0,
            organizationcount19: 0,
            organizationcount36: 0,
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
            orgschoolgradecount: 0,
            orgschoolgradecount19: 0,
            orgschoolgradecount2025: 0,
            orgschoolgradecount2630: 0,
            orgschoolgradecount3135: 0,
            orgschoolgradecount36: 0,
            organizationcount19: 0,
            organizationcount36: 0,
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
            orgschoolgradecount: 0,
            orgschoolgradecount19: 0,
            orgschoolgradecount2025: 0,
            orgschoolgradecount2630: 0,
            orgschoolgradecount3135: 0,
            orgschoolgradecount36: 0,
            organizationcount19: 0,
            organizationcount36: 0,
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
            orgschoolgradecount: 0,
            orgschoolgradecount19: 0,
            orgschoolgradecount2025: 0,
            orgschoolgradecount2630: 0,
            orgschoolgradecount3135: 0,
            orgschoolgradecount36: 0,
            organizationcount19: 0,
            organizationcount36: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
