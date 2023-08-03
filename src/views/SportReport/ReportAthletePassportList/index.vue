<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8">
            <h4 class="text-center">{{ $t("ReportAthletePassportList") }}</h4>
          </b-col>
          <b-col md="2" class="text-right">
            <CButton @click="Print" color="primary" size="sm">
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-card class="mb-n2">
            <custom-report-filter ref="getRegionList" :filter="filter" @search="Search" v-model="filter"
              @clear="clearFilter" isCollapse></custom-report-filter>
          </b-card>
        </CCardHeader>
        <CCardBody>
          <div class="table-container" style="padding: 5px">
            <div class="mobileStyle">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("OrderNumber") }}
                      <!-- {{ $t("totalschools") }} -->
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("sportPlaceName") }}
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("regionname") }}
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("organizationname") }}
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("personname1") }}
                      <!-- {{ $t("Included") }} -->
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("gender") }}
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("Pinfl") }}
                      <!-- {{ $t("Included") }} -->
                    </th>
                    <th colspan="4" style="text-align: center; vertical-align: middle">
                      {{ $t("passportinfo1") }}
                      <!-- {{ $t("Included") }} -->
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("Sport turi") }}
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("sporttitleName") }}
                    </th>
                    <!-- <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sporttype") }}
                    
                  </th> -->
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("dateofaccepted") }}
                    </th>
                    <th rowspan="2" style="text-align: center; vertical-align: middle">
                      {{ $t("username") }}
                    </th>
                  </tr>
                  <tr>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("documentseries") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("diplomanumber") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("dateofissue") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("enddate1") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in items" style="text-align: center; vertical-align: middle" :key="i"
                    v-show="items.length > 0 && !Loading">
                    <td>
                      {{ i + 1 }}
                    </td>
                    <td style="text-align: left; vertical-align: middle">
                      <span>{{ item.oblastname }}</span>
                    </td>
                    <td style="text-align: left; vertical-align: middle">
                      <span>{{ item.regionname }}</span>
                    </td>
                    <td style="text-align: left; vertical-align: middle">
                      <span>{{
                        item.organizationname
                      }}</span>
                    </td>
                    <!-- <a
                     style="text-align: left; vertical-align: middle"
                      @click="GotoEmployeeCard(item)"
                    >{{ item.personname }}</a> -->
                    <td style="text-align: left; vertical-align: middle">
                      <a @click="GotoStudentCard(item)"
                        style="color: blue; cursor: pointer; text-decoration: underline">{{ item.personname }}</a>
                    </td>
                    <td style="text-align: left; vertical-align: middle">
                      {{ item.gendername }}</td>
                    <td style="vertical-align: middle">
                      {{ item.pinfl }}
                    </td>
                    <td style="vertical-align: middle">
                      {{ item.documentseries }}
                    </td>

                    <td style="vertical-align: middle">{{ item.docnumber }}</td>
                    <td style="vertical-align: middle">{{ item.givendate }}</td>
                    <td style="vertical-align: middle">{{ item.expiredate }}</td>
                    <td style="text-align: left; vertical-align: middle">{{ item.sporttypeclassifiername }}</td>
                    <td style="text-align: left; vertical-align: middle">{{ item.sporttilename }}</td>
                    <td style="vertical-align: middle">{{ item.dateofcreated }}</td>
                    <td style="text-align: left; vertical-align: middle">{{ item.username }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="pb-4">
            <div class="pagination-number" style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                <b-form-select v-model="filter.PageLimit" id="PageLimitSelect" size="sm"
                  :options="filter.pageOptions"></b-form-select>
              </div>
              <div class="per-page" style="float: left; font-size: 12px">
                {{ $t("RecordsPageLimit") }}
              </div>
            </div>
            <div style="float: right">
              <b-pagination v-model="filter.PageNumber" :total-rows="totalRows" :per-page="filter.PageLimit" align="right"
                size="sm" class="my-0 mobile-pagination"></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
  
<script>
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SportStudentManageService from "@/services/SportStudentManage.service";
import SportGroupService from "@/services/SportGroup.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportReportService from "@/services/SportReport.service";

import customDatePicker from '../../../components/customDatePicker.vue';
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: {
    customDatePicker,
    CustomReportFilter
  },
  data() {
    return {
      schoolyearlist: [],
      organizationlist: [],
      oblastlist: [],
      SportTypeClassifierList: [],
      SportTitleList: [],
      sportlevelList: [],
      genderlist: [],
      sportgrouplist: [],
      organizationtypelist: [],
      schooltypelist: [],
      regionlist: [],
      orgschoolgradelist: [],
      items: [],
      totalRows: "",
      isBusy: false,
      Loading: false,
      PrintLoading: false,
      ApprovedUserList: [],
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierId: 0,
        StartDate: "",
        EndDate: "",
        date: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        schoolyearid: 0,
        approvedUserId: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        fakeSearch: "",
        SortIcon: "arrow-up",
        searchtype: 2,
        isfarmfy: false,
        approvedUserId: '',
        approvedDateTo: '',
        approvedDateFrom: ''
      },
    };
  },
  created() {
    (this.filter.oblastid =
      parseInt(this.$route.query.oblastid) || this.filter.oblastid),
      (this.filter.regionid =
        parseInt(this.$route.query.regionid) || this.filter.regionid),
      (this.filter.organizationid =
        parseInt(this.$route.query.organizationid) ||
        this.filter.organizationid),
      (this.filter.schoolyearid =
        parseInt(this.$route.query.schoolyearid) || this.filter.schoolyearid),
      (this.filter.sporttypeclassifierId =
        parseInt(this.$route.query.sportid) ||
        this.filter.sporttypeclassifierId),
        (this.filter.date = (this.$route.query.date) || this.filter.date),
      OblastService.GetAll("", 211, "").then((res) => {
        this.oblastlist = res.data;
      });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SportTypeClassifierList = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    // if (!!this.$route.query.orgid) {
    //   this.filter.oblastid = this.$route.query.oblastid;
    if (!!this.filter.oblastid) {
      RegionService.GetAll("", this.filter.oblastid).then((res) => {
        this.regionlist = res.data;
      });
    }
    //   this.filter.regionid = this.$route.query.regionid;
    if (!!this.filter.regionid) {
      OrganizationService.GetAll(
        this.filter.oblastid,
        this.filter.regionid,
        false
      ).then((res) => {
        this.organizationlist = res.data;
      });
    }
    //   this.filter.organizationid = this.$route.query.orgid;
    //   this.filter.SchoolYearID = this.$route.query.schoolyearid;
    //   this.Refresh()
    // }

    this.Refresh();
    this.createDate();
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
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
    clearFilter() {

    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      // this.filter.OrgSchoolGradeID = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = 0;
      // this.filter.OrgSchoolGradeID = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    GotoStudentCard(item) {
      this.$router.push(`/StudentCard1/id=${item.personid}`);
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
    },

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    ChangeSearchType() {
      this.filter.personName = "";
      this.filter.coachPersonName = "";
      this.filter.fakeSearch = "";
    },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetReportAthletePassportList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierId,
        // this.filter.personName,
        // this.filter.userName,
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.schoolyearid,
        this.filter.approvedUserId,
        this.filter.approvedDateFrom,
        this.filter.approvedDateTo,
        this.filter.date,
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.regionlist = res.data;
          });
        }
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          OrganizationService.GetAll(
            this.filter.oblastid,
            this.filter.regionid,
            false
          ).then((res) => {
            this.organizationlist = res.data;
          });
        }
        this.totalRows = res.data.data.total;
      });
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportAthletePassportList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierId,
        this.filter.personName,
        this.filter.userName,
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.SortColumn,
        this.filter.Search,
        this.filter.OrderType,
        this.filter.schoolyearid,
        this.filter.date,
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res, "PrintReportAthletePassportList");
        })
        .catch((error) => {
          this.PrintLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
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
    makeToast(message, title, type) {
      this.toastCount++;
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
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue) {

        this.filter.PageNumber = newValue;
        this.Refresh();
      },
    },
  },
};
</script>
  