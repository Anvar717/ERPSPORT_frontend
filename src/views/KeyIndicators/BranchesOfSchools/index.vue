<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">{{ $t("BranchesOfSchools") }}</h4>
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
                <th
                  rowspan="2"
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &
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
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ HeadYear - 1 }} йил 15 сентябрь ҳолатига жами филиаллар
                  сони
                  <!-- {{ $t("totalschools") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ HeadYear }} йилда 15 сентябрь ҳолатига жами филиалар сони
                  <!-- {{ $t("totalschools") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  Фарқ(+/-)
                  <!-- {{ $t("totalschools") }} -->
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Шундан") }}
                </th>
                <th
                  colspan="4"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ HeadYear }} {{ $t("йилда филиаллар") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Мактабга айлантирилган филиаллар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Фаолияти тугатилган филиаллар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Янги ташкил этилган филиаллар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Қуввати (ўқувчи ўрни)") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Синфлар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Ўртача коэффисент") }}
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
                <td>{{ item.branchcount1 }}</td>
                <td>{{ item.branchcount2 }}</td>
                <td>{{ item.branchcount2_1 }}</td>
                <td>{{ item.convertedtoschoolcount }}</td>
                <td>{{ item.closedbranchecount }}</td>
                <td>{{ item.newbranchcount }}</td>
                <td>{{ item.studentcapacity }}</td>
                <td>{{ item.orgschoolgradecount }}</td>
                <td>{{ item.sudentscount }}</td>
                <td>{{ item.percent }}</td>
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
                    bottomrow.branchcount1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.branchcount1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.bbranchcount2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.bbranchcount2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.branchcount2_1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.branchcount2_1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.convertedtoschoolcount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.convertedtoschoolcount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.closedbranchecount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.closedbranchecount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.newbranchcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.newbranchcount, {
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
                    bottomrow.sudentscount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.sudentscount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.percent == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.percent, {
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
        branchcount1: 0,
        branchcount2: 0,
        branchcount2_1: 0,
        convertedtoschoolcount: 0,
        closedbranchecount: 0,
        newbranchcount: 0,
        studentcapacity: 0,
        orgschoolgradecount: 0,
        sudentscount: 0,
        percent: 0,
      },
      HeadYear: 0,
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
      // this.filter.schoolyearid = item.schoolyearid;
      // this.filter.schoollegalformid = item.schoollegalformid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      //this.filter.schoolyearid = item.schoolyearid;
      //this.filter.schoollegalformid = item.schoollegalformid;
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
          fileLink.setAttribute("download", "BranchesOfSchools.xlsx");
          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetBranchesOfSchools(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      ).then((res) => {
        this.Loading = false;
        this.HeadYear = res.data.Year;
        this.items = res.data.reportDocInfo.data;
        this.bottomrow = {
          branchcount1: 0,
          branchcount2: 0,
          branchcount2_1: 0,
          convertedtoschoolcount: 0,
          closedbranchecount: 0,
          newbranchcount: 0,
          studentcapacity: 0,
          orgschoolgradecount: 0,
          sudentscount: 0,
          percent: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var branchcount1 = 0;
      var branchcount2 = 0;
      var branchcount2_1 = 0;
      var convertedtoschoolcount = 0;
      var closedbranchecount = 0;
      var newbranchcount = 0;
      var studentcapacity = 0;
      var orgschoolgradecount = 0;
      var sudentscount = 0;
      var percent = 0;
      item.forEach(function(item) {
        branchcount1 = branchcount1 + item.branchcount1;
        branchcount2 = branchcount2 + item.branchcount2;
        branchcount2_1 = branchcount2_1 + item.branchcount2_1;
        convertedtoschoolcount =
          convertedtoschoolcount + item.convertedtoschoolcount;
        closedbranchecount = closedbranchecount + item.closedbranchecount;
        newbranchcount = newbranchcount + item.newbranchcount;
        studentcapacity = studentcapacity + item.studentcapacity;
        orgschoolgradecount = orgschoolgradecount + item.orgschoolgradecount;
        sudentscount = sudentscount + item.sudentscount;
        percent = percent + item.percent;
      });
      this.bottomrow = {
        branchcount1: branchcount1,
        branchcount2: branchcount2,
        branchcount2_1: branchcount2_1,
        convertedtoschoolcount: convertedtoschoolcount,
        closedbranchecount: closedbranchecount,
        newbranchcount: newbranchcount,
        studentcapacity: studentcapacity,
        orgschoolgradecount: orgschoolgradecount,
        sudentscount: sudentscount,
        percent: percent,
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
            branchcount1: 0,
            branchcount2: 0,
            branchcount2_1: 0,
            convertedtoschoolcount: 0,
            closedbranchecount: 0,
            newbranchcount: 0,
            studentcapacity: 0,
            orgschoolgradecount: 0,
            sudentscount: 0,
            percent: 0,
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
            branchcount1: 0,
            branchcount2: 0,
            branchcount2_1: 0,
            convertedtoschoolcount: 0,
            closedbranchecount: 0,
            newbranchcount: 0,
            studentcapacity: 0,
            orgschoolgradecount: 0,
            sudentscount: 0,
            percent: 0,
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
            branchcount1: 0,
            branchcount2: 0,
            branchcount2_1: 0,
            convertedtoschoolcount: 0,
            closedbranchecount: 0,
            newbranchcount: 0,
            studentcapacity: 0,
            orgschoolgradecount: 0,
            sudentscount: 0,
            percent: 0,
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
            branchcount1: 0,
            branchcount2: 0,
            branchcount2_1: 0,
            convertedtoschoolcount: 0,
            closedbranchecount: 0,
            newbranchcount: 0,
            studentcapacity: 0,
            orgschoolgradecount: 0,
            sudentscount: 0,
            percent: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
