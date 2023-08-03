<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head mt-3 mx-1 p-3">
          <div class="w-100 text-center">
            <h4 class="text-center">
              {{ $t("PersonTourniquetDevicelogByTerritory") }}
            </h4>
            <!-- {{ $t("studentcapacity") }} -->
          </div>
        </div>
        <CCardHeader>
          <b-row>
            <b-col md="3" class="achievement-input">
              <div>
                <label> {{ $t("Ondate") }} </label>
                <date-picker
                  v-model="filter.ondate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('Ondate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </div>
            </b-col>
            <b-col sm="12" md="3" class="achievement-input">
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
            </b-col>
            <b-col sm="12" md="3" class="achievement-input">
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
            <b-col class="text-right mt-4">
            <CButton color="danger" @click="backbyregion" size="sm">
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
          <table class="table table-bordered">
            <thead>
              <tr>
                <th
                  rowspan="2"
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: center; vertical-align: middle"
                >
                 
                  {{ $t("sportPlaceName") }}
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
                  {{ $t("EmployeesCount1") }}
                  <!-- {{ $t("totalschools") }} -->
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
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="organizationchange(item)">{{ item.organizationname }}</a>
                </td>
                <td>
                  {{
                    $options.filters.currency(item.personcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="Loading">
              <tr>
                <td class="text-center" colspan="2">
                  <b-spinner></b-spinner>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr
                style="
                  text-align: center;
                  vertical-align: middle;
                  font-weight: bold;
                "
              >
                <td colspan="1">{{ $t("Total") }}</td>

                <td style="white-space: nowrap">
                  {{
                    bottomrow.personcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.personcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SportCircleReportService from "@/services/SportCircleReport.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
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
      SchoolManagementFormList: [],
      OblastList: [],
      RegionList: [],
      SportTypeTables: [],
      items: [],
      Loading: false,
      isShow: false,
      totalRows: "",
      index: 0,
      isBusy: false,
      bottomrow: {
        personcount: 0,
      },
      filter: {
        ondate: "",
        oblastid: 0,
        regionid: 0,
        organizationid:0,
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    this.filter.oblastid = this.$route.query.oblastid || 0;
    this.filter.regionid = this.$route.query.regionid || 0;
    this.filter.organizationid = this.$route.query.organizationid || 0;
    this.filter.OblastName = this.$route.query.OblastName || '';
    this.filter.RegionName = this.$route.query.RegionName || '';
    this.filter.ondate = this.$route.query.ondate || "23.11.2022";
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
     if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    this.Refresh();
    if(!this.$route.query.ondate){
      this.createDate();
    }
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
        this.filter.qualificationcategoryid = 0;
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
      this.filter.regionid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
      this.isShow = false;
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
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Print() {
      ReportLearningProcessService.PrintStudentCapacity(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoollegalformid,
        this.filter.schoolmanagementformid,
        this.filter.organizationtypeid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "StudentCapacity.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    Refresh() {
      this.Loading = true;
      SportCircleReportService.GetPersonTourniquetDevicelogByTerritory(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.ondate
      ).then((res) => {
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.ChangeOblast();
          this.filter.OblastName = " / " + res.data.oblastname;
        }
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0) {
          // this.changeRegion()
          this.filter.RegionName = " / " + res.data.regionname;
        }
        this.Loading = false;
        this.totalRows = res.data.total;
        this.calculateTotal(this.items);
        this.Loading = false;
      });
    },
    organizationchange(item){
      this.$router.push({
        name: "gettourniquetenteranceListbyemployee",
        query: {
          OnDate : this.filter.ondate,
          OblastID: item.oblastid,
          RegionID: item.regionid,
          OrganizationID: item.organizationid,
          OblastName : this.filter.OblastName,
          RegionName : this.filter.RegionName
        },
      });
    },
    calculateTotal(item) {
      var personcount = 0;
      item.forEach(function (item) {
        personcount = personcount + item.personcount;
      });
      this.bottomrow = {
        personcount: personcount,
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
            personcount: 0,
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
            personcount: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.ondate": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            personcount: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
