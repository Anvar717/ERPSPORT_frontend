<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="Back()" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col class="text-center">
            <h3>{{ $t("StudentSportCircleReport") }}</h3>
          </b-col>
          <b-col md="2">
            <CButton
              @click="Print"
              class="float-right"
              color="primary"
              size="sm"
            >
               <b-icon icon="printer" v-if="!PrintLoading"> </b-icon>
                      <b-spinner v-if="PrintLoading" small></b-spinner>
              {{ $t("Print") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <!-- <CRow class="form-group">
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
          </CRow> -->
          <b-row>
            <b-col md="2" sm="12" class="achievement-input">
              <div class="">
                <label for>{{ $t("startdate") }}</label>
                <custom-date-picker
                  v-model="filter.onDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  :disabled-date="DisabledDateForOnDate"
                ></custom-date-picker>
              </div>
            </b-col>
            <b-col md="2" sm="12" class="achievement-input">
              <div class="">
                <label for>{{ $t("endDate") }}</label>
                <custom-date-picker
                  v-model="filter.endDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('enddate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  :disabled-date="DisabledDateForEnddate"
                ></custom-date-picker>
              </div>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("Oblast") }} </label>
              <v-select
                :options="OblastList"
                v-model="filter.oblastId"
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
                @input="ChangeOblast(filter.oblastId)"
              ></v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("Region") }} </label>
              <v-select
                :options="RegionList"
                v-model="filter.regionId"
                :disabled="
                  !$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  !$can('OblastSport', 'permissions') &&
                  $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                @input="ChangeRegion(filter.oblastId, filter.regionId)"
                label="name"
                class="mr-2"
                style="width: 100%"
              ></v-select>
            </b-col>
            <b-col
              sm="12"
              md="2"
              class="achievement-input"
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions')
              "
            >
              <label> {{ $t("Organization") }} </label>
              <v-select
                v-model="filter.organizationId"
                :reduce="(item) => item.id"
                label="name"
                :options="OrganizationList"
                :placeholder="$t('organization')"
              >
              </v-select>
            </b-col>
            <b-col md="1">
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class="mr-2"
                  style="margin-top: 27px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                </CButton>
              </div>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <b-table-simple
            class="table table-bordered"
            sticky-header="60vh"
            no-border-collapse
          >
            <b-thead>
              <b-tr>
                <b-th
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("OrderNumber") }}
                </b-th>
                <b-th
                  rowspan="3"
                  v-if="filter.oblastId === 0 || filter.oblastId === null"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sportPlaceName") }}
                </b-th>
                <b-th
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("regionname") }}
                </b-th>
                <b-th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </b-th>
              </b-tr>
              <b-tr>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("fio") }}
                </b-th>

                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("circlesporttypename") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("ondate") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("intime") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("outtime") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("spenttime") }}
                </b-th>
              </b-tr>
            </b-thead>

            <b-tbody v-if="!Loading">
              <b-tr
                v-for="(item, i) in items"
                style="text-align: center; vertical-align: middle"
                :key="i"
              >
                <b-td class="text-left">{{ i + 1 }}</b-td>
                <!-- <b-td
                  v-if="filter.oblastId === 0 || filter.oblastId === null"
                  style="text-align: center; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="oblastchange(item)">{{
                    item.oblastname
                  }}</a>
                </b-td>
                <b-td
                  v-if="
                    filter.oblastId > 0 &&
                    (filter.regionId === 0 || filter.regionId === null)
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="regionchange(item)">{{
                    item.regionname
                  }}</a>
                </b-td>
                <b-td
                  v-if="filter.oblastId > 0 && filter.regionId > 0"
                  style="text-align: center; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </b-td> -->
                <b-td
                  v-if="filter.oblastId === 0 || filter.oblastId === null"
                  class="text-left"
                  >{{ item.oblastname }}</b-td
                >
                <b-td class="text-left">{{ item.regionname }}</b-td>
                <b-td class="text-left">{{ item.organizationname }}</b-td>
                <b-td class="text-left">{{ item.personname }}</b-td>
                <b-td class="text-left">{{
                  item.sporttypeclassifiername
                }}</b-td>
                <b-td class="text-center"
                  >{{ item.eventdate }}
                  <span v-if="item.weekdays == 'Mon'">{{ $t("Mon") }}</span>
                  <span v-if="item.weekdays == 'Tue'">{{ $t("Tue") }}</span>
                  <span v-if="item.weekdays == 'Wed'">{{ $t("Wed") }}</span>
                  <span v-if="item.weekdays == 'Thu'">{{ $t("Thu") }}</span>
                  <span v-if="item.weekdays == 'Fri'">{{ $t("Fri") }}</span>
                  <span v-if="item.weekdays == 'Sat'">{{ $t("Sat") }}</span>
                  <span v-if="item.weekdays == 'Sun'">{{ $t("Sun") }}</span>
                </b-td>
                <b-td class="text-center">{{ item.entertime }}</b-td>
                <b-td class="text-center">{{ item.exittime }}</b-td>
                <b-td class="text-center">{{ item.duration }}</b-td>
              </b-tr>
            </b-tbody>
            <tbody v-if="Loading">
              <tr>
                <td colspan="15">
                  <div
                    class="text-center text-primary my-2"
                    style="vertical-align: middle"
                  >
                    <b-spinner class="align-middle mr-2"></b-spinner>
                    <strong>{{ $t("Loading") }}</strong>
                  </div>
                </td>
              </tr>
            </tbody>
          </b-table-simple>
          <div class="pb-4">
            <div class="pagination-number" style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="perPageSelect"
                  size="sm"
                  :options="filter.pageOptions"
                ></b-form-select>
              </div>
              <div class="per-page" style="float: left; font-size: 12px">
                {{ $t("RecordsPerPage") }}
              </div>
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0 mobile-pagination"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SportCircleReportService from "@/services/SportCircleReport.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import {
  BRow,
  BCol,
  BCard,
  BButton,
  BSpinner,
  BTabs,
  BTab,
  BCardText,
  BModal,
  BListGroup,
  BListGroupItem,
  BTable,
  BSidebar,
  BOverlay,
  BBadge,
  BFormInput,
} from "bootstrap-vue";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BSpinner,
    BTabs,
    BTab,
    BListGroup,
    BListGroupItem,
    BCardText,
    BTable,
    BSidebar,
    BModal,
    BBadge,
    BOverlay,
    BFormInput,
    CustomDatePicker,
  },
  data() {
    return {
      items: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      totalRows: "",
      isBusy: true,
      Loading: false,
      PrintLoading: false,
      filter: {
        onDate: "19.11.2022",
        ondate: "",
        endDate: "",
        enddate: "",
        oblastId: 0,
        regionId: 0,
        organizationId: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    this.filter.oblastId = this.$route.query.oblastid || 0;
    this.filter.regionId = this.$route.query.regionid || 0;
    this.filter.organizationId = this.$route.query.organizationid || 0;
    this.filter.OblastName = this.$route.query.OblastName || "";
    this.filter.RegionName = this.$route.query.RegionName || "";
    this.filter.onDate = this.$route.query.startdate || "19.11.2022";
    this.filter.endDate = this.$route.query.enddate || "19.11.2022";
    (this.filter.PageNumber =
      this.$route.query.PageNumber || this.filter.PageNumber),
      (this.filter.PageLimit =
        this.$route.query.PageLimit || this.filter.PageLimit),
      OblastService.GetAll().then((res) => {
        this.OblastList = res.data;
      });
    if (!!this.filter.oblastId) {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
      });
    }
    if (!!this.filter.oblastId && !!this.filter.regionId) {
      OrganizationService.GetAll(
        this.filter.oblastId,
        this.filter.regionId,
        "",
        "",
        ""
      ).then((res) => {
        this.OrganizationList = res.data;
      });
    }
    if (
      this.$route.query.startdate == "" ||
      this.$route.query.startdate == null ||
      this.$route.query.startdate == undefined
    );
    if (
      this.$route.query.enddate == "" ||
      this.$route.query.enddate == null ||
      this.$route.query.enddate == undefined
    ) {
      this.createDate();
    }
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  methods: {
    Refresh() {
      this.Loading = true;
      this.isBusy = true;
      SportCircleReportService.GetTourniquetEnteranceListByStudent(
        this.filter.onDate,
        this.filter.endDate,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.organizationId,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
      });
    },
    Print() {
      (this.PrintLoading = true),
        SportCircleReportService.PrintTourniquetEnteranceListByStudent(
          this.filter.oblastId,
          this.filter.regionId,
          this.filter.onDate,
          this.filter.endDate,
          this.filter.organizationId,
          this.filter.SortColumn,
          this.filter.OrderType,
        )
          .then((res) => {
            (this.PrintLoading = false),
              this.forceFileDownload(res, "PrintTourniquetEnteranceListByStudent");
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
            this.PrintLoading = false;
          });
    },
       forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.endDate = dd + "." + mm + "." + yyyy;
      this.filter.enddate = dd + "." + mm + "." + yyyy;
      this.filter.ondate = dd + "." + mm + "." + yyyy;
      this.filter.onDate = dd + "." + mm + "." + yyyy;
    },
    DisabledDateForOnDate(date) {
      if (!!this.filter.ondate) {
        var arr = this.filter.ondate.split(".");
        return date > new Date(arr[2], arr[1] - 1, arr[0]);
      }
    },
    DisabledDateForEnddate(date) {
      if (!!this.filter.enddate) {
        var arr = this.filter.enddate.split(".");
        return date > new Date(arr[2], arr[1] - 1, arr[0]);
      }
    },
    ChangeOblast(oblastId) {
      RegionService.GetAll(this.lang, oblastId).then((res) => {
        this.RegionList = res.data;
      });
    },
    ChangeRegion(oblastId, regionId) {
      OrganizationService.GetAll(oblastId, regionId, "", "", "").then((res) => {
        this.OrganizationList = res.data;
      });
    },
    Back() {
      this.$router.push({
        name: "gettourniquetenterencecount",
        query: {
          startdate: this.filter.onDate,
          enddate: this.filter.endDate,
          oblastid: this.filter.oblastId,
          regionid: this.filter.regionId,
          organizationid: this.filter.organizationId,
          OblastName: this.$route.query.OblastName,
          RegionName: this.$route.query.RegionName,
          PageNumber: this.filter.PageNumber,
          PageLimit: this.filter.PageLimit,
        },
      });
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
      }
      this.Refresh();
    },
    topcountrychange() {
      this.filter.oblastId = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionId = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastId = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
    },
    regionchange(item) {
      this.filter.regionId = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
  },
};
</script>

<style></style>
