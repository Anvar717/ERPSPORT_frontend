<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="$router.go(-1)" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col lg="8" md="8" sm="12">
            <h4 class="text-center">{{ $t("GetTrenerReestr") }}</h4>
          </b-col>
          <b-col md="2" sm="12" lg="2">
            <CButton
              @click="Print"
              class="float-right"
              color="primary"
              size="sm"
            >
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              {{ $t("Print") }}
            </CButton>
          </b-col>
          <!-- <b-col class="text-lg-right mt-3">
            <CButton color="danger" @click="$router.push('/')" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col> -->
        </b-row>
        <CCardHeader>
          <b-card class="mb-n2">
              <custom-report-filter
              ref="getRegionList"
                :filter="filter"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-report-filter>
            </b-card>
        </CCardHeader>
        <CCardHeader>
          <div class="table-container">
            <table
              class="table table-bordered table-responsive"
              style="height: 800px; overflow: scroll"
            >
              <thead>
                <tr>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">№</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("Territory") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("District") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("NameInstitution") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("fio") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("Pinfl") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("sporttype") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    colspan="3"
                    class="text-center"
                  >
                    <p class="text1">
                      {{ $t("PermanentAssetIntakeMetrologicalTables") }}
                    </p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("GroupNumber") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    colspan="11"
                    class="text-center"
                  >
                    <p class="text1">{{ $t("TheNumberStages") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("NumberofStudentAthletes") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    colspan="11"
                    class="text-center"
                  >
                    <p class="text1">
                      {{ $t("TheNumberofStudentAthletesBylevels") }}
                    </p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("AcademicHours") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("EmploymentRate") }}</p>
                  </th>
                </tr>
                <tr>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="text1">{{ $t("SeriesAndNumber") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="text1">{{ $t("sporttype") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="text1">{{ $t("Term") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SSG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG+3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG+2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("OSMG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SSG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG+3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG+2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("OSMG") }}</p>
                  </th>
                </tr>
              </thead>
              <b-tbody v-if="Loading">
                <b-tr>
                  <b-th class="text-center" style="height: 600px" colspan="36">
                    <b-spinner></b-spinner>
                  </b-th>
                </b-tr>
              </b-tbody>
              <tbody v-if="!Loading">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.oblastname }}</td>
                  <td>{{ item.regionname }}</td>
                  <td>{{ item.organizationname }}</td>
                  <td>
                     <a
                      @click="GotoEmployeeCard(item)"
                      style="color: blue; cursor: pointer; text-decoration: underline"
                    >{{ item.coachpersonname }}</a>
                  </td>
                  <td>{{ item.coachpersonpinfl }}</td>
                  <td>{{ item.sporttypeclassifiername }}</td>
                  <td>{{ item.sportcoachcertseries }} {{ item.sportcoachcertnumber }}</td>
                  <td>{{ item.certsporttypeclassifiername }}</td>
                  <td>{{ item.sportcoachcertenddate }}</td>
                  <td>{{ item.groupcount }}</td>
                  <td>{{ item.groupcount_level001 }}</td>
                  <td>{{ item.groupcount_level002 }}</td>
                  <td>{{ item.groupcount_level003 }}</td>
                  <td>{{ item.groupcount_level004 }}</td>
                  <td>{{ item.groupcount_level005 }}</td>
                  <td>{{ item.groupcount_level006 }}</td>
                  <td>{{ item.groupcount_level007 }}</td>
                  <td>{{ item.groupcount_level008 }}</td>
                  <td>{{ item.groupcount_level009 }}</td>
                  <td>{{ item.groupcount_level010 }}</td>
                  <td>{{ item.groupcount_level011 }}</td>
                  <td>{{ item.sportsmencount }}</td>
                  <td>{{ item.sportsmencount_level001 }}</td>
                  <td>{{ item.sportsmencount_level002 }}</td>
                  <td>{{ item.sportsmencount_level003 }}</td>
                  <td>{{ item.sportsmencount_level004 }}</td>
                  <td>{{ item.sportsmencount_level005 }}</td>
                  <td>{{ item.sportsmencount_level006 }}</td>
                  <td>{{ item.sportsmencount_level007 }}</td>
                  <td>{{ item.sportsmencount_level008 }}</td>
                  <td>{{ item.sportsmencount_level009 }}</td>
                  <td>{{ item.sportsmencount_level010 }}</td>
                  <td>{{ item.sportsmencount_level011 }}</td>
                  <td>{{ item.academichours }}</td>
                  <td>{{ item.staff }}</td>
                </tr>
              </tbody>
              <!-- <tbody v-if="Loading"></tbody> -->
            </table>
          </div>
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
                  id="PageLimitSelect"
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
        </CCardHeader>
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import SportReportService from "../../../services/SportReport.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: { CustomReportFilter },
  data() {
    return {
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      SportTypeClassifierList: [],
      items: [],
      cache_filters: false,
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: true,
      filter: {
        // schoolyearid: 0,
        isBySportTypeClassifier: false,
        oblastid: 0,
        regionid: 0,
        organizationid : 0,
        sportTypeClassifierId: 0,
        sporttypeclassifierid: null,
        sporttitleid: 0,
        schoolYearId: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        organizationTypeId: 0,
        schoolTypeId:0,
        genderId : 0,
        showAllRegion: false,
        showAllOrganization: false,
        OblastName: "",
        RegionName: "",
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    this.filter.oblastid = this.$route.query.oblastid || this.filter.oblastid
    this.filter.regionid = this.$route.query.regionid || this.filter.regionid
    this.filter.organizationid = this.$route.query.organizationid || this.filter.organizationid
    this.Refresh();
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
      this.filter = {
         // schoolyearid: 0,
        isBySportTypeClassifier: false,
        oblastid: 0,
        organizationTypeId: 0,
        organizationid : 0,
        schoolTypeId:0,
        sporttypeclassifierid: null,
        regionid: 0,
        // sporttitleid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        genderId : 0,
        OblastName: "",
        RegionName: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        sportTypeClassifierId: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
      };
      this.cache_filters = false;
      this.Refresh();
    },
    Search() {
      var self = this.filter;
      if (self.oblastid == 0 && self.sporttypeclassifierid == null) {
        this.cache_filters = false;
        this.Refresh();
        return;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      }
      this.cache_filters = true;
      this.Refresh();
    },
    Refresh() {
      this.Loading = true;
      SportReportService.GetReportCoachSportLevelList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.sporttitleid,
        this.filter.schoolyearid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.genderId,
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data.rows;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
        }
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.regionid = res.data.regionid;
        }
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.organizationid > 0) {
          this.filter.organizationid = res.data.organizationid;
        }
        if (!!this.filter.regionid) {
          OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
            this.OrganizationList = res.data;
          });
        }
        this.totalRows = res.data.data.total;
      });
      SportTypeClassifierService.GetAll().then((res) => {
        this.SportTypeClassifierList = res.data;
      });
    },
     GotoEmployeeCard(item) {
      this.$router.push({
        name: "EmployeeCard",
        query: {
          docseries: "",
          docnumber: "",
          pinfl: item.coachpersonpinfl,
        },
      });
    },
    Print() {
      this.PrintLoading = true;
     SportReportService.PrintReportCoachSportLevelList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.sportTitleId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.genderId,
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res);
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
    ChangeOblast() {
      this.filter.regionid = null;
      this.filter.organizationid = null;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = null;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
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
<style lang="scss" scoped>
p.test2 {
  //   writing-mode: sideways-lr;
  transform: rotate(180deg);
  writing-mode: vertical-lr;
  text-align: start;
  font-size: 13px;
}
p.text1 {
  // text-align: start;
  font-size: 13px;
}
</style>
  