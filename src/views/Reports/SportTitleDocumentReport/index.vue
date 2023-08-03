<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">
              {{ $t("SportTitleDocumentReport") }}
            </h4>
            <!-- {{ $t("studentcapacity") }} -->
          </b-col>
          <b-col class="text-right">
            <!-- <CButton @click="Print" class="mr-2" color="primary" size="sm">
              <b-icon icon="printer"></b-icon>
              {{ $t("Print") }}
            </CButton> -->
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col sm="12" md="3">
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
            <b-col sm="12" md="3">
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
                @input="ChangeRegion"
                class="mr-2"
                style="width: 100%"
              ></v-select>
            </b-col>
            <b-col>
                 <label> {{ $t("organization") }} </label>
                <v-select
                :options="OrganizationList"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                :placeholder="$t('organization')"
                label="name"
                style="width: 100%"
                class="mr-2"
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
          </b-row>
          <!-- <CRow class="form-group">
            <CCol lg="4" md="6" sm="6" class="text-left mt-2 pl-0"> </CCol>
          </CRow> -->
          <!-- <CRow class="form-group">
            <CCol>
              <h4>
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
        </CCardHeader>
        <div class="table-container" style="padding: 5px">
          <table class="table table-bordered">
            <thead>
              <tr>
                <!-- <th
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
                </th> -->
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("docnumber") }}
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("docdate") }}
                  <!-- {{ $t("totalschools") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("fio") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("ordernumber1") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("orderdate1") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Sport turi") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sporttitle") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sportorganization") }}
                  <!-- {{ $t("Included") }} -->
                </th>
                <!-- <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sportgrouptitle") }}
                 
                 </th>  -->
              </tr>
              <!-- <tr>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("O'-III-R") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("O'-II-R") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("O'-I-R") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("I-SP") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("II-SP") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("III-SP") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Sun") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Su") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("XTSU") }}
                </th>
              </tr> -->
            </thead>
            <tbody v-if="!Loading">
              <tr
                v-for="(item, i) in items"
                style="text-align: center; vertical-align: middle"
                :key="i"
              >
                <!-- <td
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
                  <a
                    href="javascript:void(0)"
                    @click="organizationchange(item)"
                    >{{ item.organizationname }}</a
                  >
                </td> -->
                <td  style="text-align: center; vertical-align: middle">
                  {{ item.docnumber }}
                </td>
                <td  style="text-align: center; vertical-align: middle">
                  {{ item.docdate }}
                </td>
                <td style="text-align: left; vertical-align: middle">
                  {{ item.personname }}
                </td>
                <td  style="text-align: center; vertical-align: middle">
                  {{ item.ordernumber }}
                </td>
                <td  style="text-align: center; vertical-align: middle">
                  {{ item.orderdate }}
                </td>
                <td style="text-align: left; vertical-align: middle">
                  {{ item.sporttypeclassifiername }}
                </td>
                <td style="text-align: left; vertical-align: middle">
                  {{ item.sporttitlename }}
                </td>
                <td  style="text-align: left; vertical-align: middle">
                  {{ item.organizationname }}
                </td>
                <!-- <td>
                  {{
                    item.sporttypeclassifiername
                  }}
                </td> -->
              </tr>
            </tbody>
            <tbody v-if="Loading">
              <tr>
                <td class="text-center" colspan="9">
                  <b-spinner></b-spinner>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pb-4">
              <div style="float: left; font-size: 12px">
                {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
                {{ this.lastNumber }} {{ $t("of") }}
                {{ this.totalRows }}
              </div>
              <div style="float: left" class="ml-2 mr-2 mt-n1">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="PageLimitSelect"
                  size="sm"
                  :options="filter.pageOptions"
                ></b-form-select>
              </div>
              <div style="float: left; font-size: 12px">
                {{ $t("RecordsPerPage") }}
              </div>
              <div style="float: right">
                <b-pagination
                  v-model="filter.PageNumber"
                  :total-rows="totalRows"
                  :per-page="filter.PageLimit"
                  align="right"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </div>
            </div>
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SportReportService from "@/services/SportReport.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      OrganizationList:[],
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
        coachattachedpersoncount: 0,
        severalchildrenpersoncount: 0,
        privilegereasonpersoncount1: 0,
        privilegereasonpersoncount2: 0,
        privilegereasonpersoncount3: 0,
      },
      filter: {
        ondate: "",
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        statusid: 0,
        personName: "",
        certificatenumber: "",
        sporttitleid: 0,
        sporttypeclassifierid: 0,
        Search: "",
          SortColumn: "",
          OrderType: "asc",
          PageNumber: 1,
          PageLimit: 20,
          pageOptions: [5, 10, 15, 20, 25, 50, 100, 500, 1000],
          SortIcon: "arrow-up",
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
    this.filter.OblastName = this.$route.query.OblastName || "";
    this.filter.RegionName = this.$route.query.RegionName || "";
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
    if (!this.$route.query.ondate) {
      this.createDate();
    }
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
    ChangeRegion() {
      this.filter.organizationid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid
        ).then((res) => {
          this.OrganizationList = res.data;
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
      SportReportService.GetSportTitleDocumentReport(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.statusid,
        this.filter.personName,
        this.filter.certificatenumber,
        this.filter.sporttitleid,
        this.filter.sporttypeclassifierid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
      });
    },
    organizationchange(item) {
      this.$router.push({
        name: "sportcirclereport",
        query: {
          OnDate: this.filter.ondate,
          OblastID: item.oblastid,
          RegionID: item.regionid,
          OrganizationID: item.organizationid,
          OblastName: this.filter.OblastName,
          RegionName: this.filter.RegionName,
        },
      });
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
