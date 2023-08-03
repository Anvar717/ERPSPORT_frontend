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
            <h4 class="text-center">{{ $t("GetTrenerReport") }}</h4>
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
              ></custom-report-filter>
            </b-card>
        </CCardHeader>
        <CCardHeader>
          <el-tabs
            v-model="tab_name"
            type="border-card"
            @tab-click="tabChanged"
          >
            <el-tab-pane name="by_region" label="Hudud bo'yicha">
              <div class="table-container">
                <el-table
                  border
                  :data="items"
                  v-loading="Loading"
                  @cell-click="goToRow"
                >
                  <el-table-column
                    :prop="'ordernumber'"
                    :label="$t('OrderNumber')"
                  >
                    <template slot-scope="{ $index }">
                      <span>{{ $index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class-name="text-primary"
                    v-if="
                      !this.$route.query.oblastid ||
                      this.$route.query.oblastid == 999
                    "
                    :min-width="220"
                    :prop="'oblastname'"
                    label="Hudud"
                  ></el-table-column>
                  <el-table-column
                    class-name="text-primary"
                    v-if="
                      (this.$route.query.regionid == 999 ||
                        !this.$route.query.regionid) &&
                      this.$route.query.oblastid
                    "
                    :min-width="220"
                    :prop="'regionname'"
                    :label="$t('regionname')"
                  ></el-table-column>
                  <el-table-column
                    class-name="text-primary"
                    :min-width="220"
                    v-if="this.$route.query.regionid"
                    prop="organizationname"
                    :label="$t('orgname')"
                  ></el-table-column>
                  <el-table-column
                    prop="coachcount"
                    :label="$t('teachercount')"
                  ></el-table-column>
                  <el-table-column
                    prop="groupcount"
                    :label="$t('sportgroup')"
                  ></el-table-column>
                  <el-table-column :label="$t('TheNumberStages')">
                    <el-table-column
                      v-for="(item, index) in GroupLevelList"
                      :key="index"
                      :prop="
                        'groupcount_level' + String(index + 1).padStart(3, 0)
                      "
                      :label="item.name"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    :min-width="150"
                    prop="sportsmencount"
                    :label="$t('NumberofStudentAthletes')"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('TheNumberofStudentAthletesBylevels')"
                  >
                    <el-table-column
                      v-for="(item, index) in GroupLevelList"
                      :key="index"
                      :prop="
                        'groupcount_level' + String(index + 1).padStart(3, 0)
                      "
                      :label="item.name"
                    ></el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="academichours"
                    :label="$t('AcademicHours')"
                  ></el-table-column>
                  <el-table-column
                    prop="staff"
                    :label="$t('Staff')"
                  ></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane name="by_sport" label="Sport turi bo'yicha">
              <div class="table-container">
                <el-table
                  border
                  :data="items"
                  v-loading="Loading"
                  @cell-click="goToRow"
                >
                  <el-table-column
                    :prop="'ordernumber'"
                    :label="$t('OrderNumber')"
                  >
                    <template slot-scope="{ $index }">
                      <span>{{ $index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    class-name="text-primary"
                    v-if="
                      !this.$route.query.oblastid ||
                      this.$route.query.oblastid == 999
                    "
                    :min-width="220"
                    :prop="'oblastname'"
                    label="Hudud"
                  ></el-table-column>
                  <el-table-column
                    class-name="text-primary"
                    v-if="
                      (this.$route.query.regionid == 999 ||
                        !this.$route.query.regionid) &&
                      this.$route.query.oblastid
                    "
                    :min-width="220"
                    :prop="'regionname'"
                    :label="$t('regionname')"
                  ></el-table-column>
                  <el-table-column
                    class-name="text-primary"
                    :min-width="220"
                    v-if="this.$route.query.regionid"
                    prop="organizationname"
                    :label="$t('orgname')"
                  ></el-table-column>
                  <el-table-column
                    prop="sporttypeclassifiername"
                    :label="$t('sporttype')"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="coachcount"
                    :label="$t('teachercount')"
                  ></el-table-column>
                  <el-table-column
                    :min-width="100"
                    prop="groupcount"
                    :label="$t('sportgroup')"
                  ></el-table-column>
                  <el-table-column :label="$t('TheNumberStages')">
                    <el-table-column
                      v-for="(item, index) in GroupLevelList"
                      :key="index"
                      :prop="
                        'groupcount_level' + String(index + 1).padStart(3, 0)
                      "
                      :label="item.name"
                    ></el-table-column>
                  </el-table-column>

                  <el-table-column
                    :min-width="150"
                    prop="sportsmencount"
                    :label="$t('NumberofStudentAthletes')"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('TheNumberofStudentAthletesBylevels')"
                  >
                    <el-table-column
                      v-for="(item, index) in GroupLevelList"
                      :key="index"
                      :prop="
                        'sportsmencount_level' +
                        String(index + 1).padStart(3, 0)
                      "
                      :label="item.name"
                    ></el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="academichours"
                    :label="$t('AcademicHours')"
                  ></el-table-column>
                  <el-table-column
                    prop="staff"
                    :label="$t('Staff')"
                  ></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="py-4">
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
import SportReportService from "@/services/SportReport.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import GetReportCoachSportLevelCount from "@/services/GetReportCoachSportLevelCount.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: { CustomReportFilter },
  data() {
    return {
      tab_name: "by_region",
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      SportTypeClassifierList: [],
      items: [],
      Loading: false,
      PrintLoading: false,
      cache_filters: false,
      totalRows: "",
      isBusy: true,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierid: 0,
        isBySportTypeClassifier: false, // true, false, null
        organizationtypeid: 0,
        schooltypeid: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        showAllRegion: false,
        showAllOrganization: false,
      },
      lang: localStorage.getItem("locale") || "ru",
      GroupLevelList: [
        { id: 1, name: this.$t("SSG") },
        { id: 2, name: this.$t("BTG1") },
        { id: 3, name: this.$t("BTG") },
        { id: 4, name: this.$t("O'MG1") },
        { id: 5, name: this.$t("O'MG2") },
        { id: 6, name: this.$t("O'MG3") },
        { id: 7, name: this.$t("O'MG+3") },
        { id: 8, name: this.$t("SKEG1") },
        { id: 9, name: this.$t("SKEG2") },
        { id: 10, name: this.$t("SKEG+2") },
        { id: 11, name: this.$t("OSMG") },
      ],
    };
  },

  async created() {
    // console.log("created")
    if (this.$route.query.oblastid) {
      this.filter.oblastid = parseInt(this.$route.query.oblastid);
      if (this.filter.oblastid == 999) {
        this.filter.showAllRegion = true;
      }
    }
    if (this.$route.query.regionid) {
      this.filter.regionid = parseInt(this.$route.query.regionid);
      if (this.filter.regionid == 999) {
        this.filter.showAllOrganization = true;
      }
    }
    try {
      Object.keys(this.filter).forEach((key) => {
        if (key && this.$route.query[key]) {
          this.filter[key] = isNaN(this.$route.query[key])
            ? this.$route.query[key]
            : parseInt(this.$route.query[key]);
        }
      });
    } catch (error) {
      this.Loading = false;
      console.error(error);
    }
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({
        id: 999,
        countryid: 999,
        name: this.$t("seeAllDistricts"),
      });
    });
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
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierid: 0,
        isBySportTypeClassifier: false, // true, false, null
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        showAllRegion: false,
        showAllOrganization: false,
      };
      this.cache_filters = false;
      this.Refresh();
    },
    Search() {
      var self = this.filter;
      if (self.oblastid == 0 && self.sporttypeclassifierid == 0) {
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
    tabChanged() {
      (this.filter = {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierid: 0,
        isBySportTypeClassifier: false, // true, false, null
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        showAllRegion: false,
        showAllOrganization: false,
      }),
        console.log(this.tab_name);
      this.items = [];
      this.$router.replace({
        path: "/SportReport/GetReportCoachSportLevelCount",
      });
      if (this.tab_name === "by_sport")
        this.filter.isBySportTypeClassifier = true;
      else this.filter.isBySportTypeClassifier = false;
      this.Refresh();
    },
    goToRow(row) {
      if (row.oblastid && row.regionid && row.organizationid) {
        this.$router.push({
          name: "GetReportCoachSportLevelList",
          query: {
            oblastid: row.oblastid,
            regionid: row.regionid,
            organizationid: row.organizationid,
          },
        });
      }

      if (row.oblastid) {
        this.changeQuery("oblastid", row.oblastid);
        this.filter.oblastid = row.oblastid;
      }
      if (row.regionid) {
        this.changeQuery("regionid", row.regionid);
        this.filter.regionid = row.regionid;
      }
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", row.regionid);
        this.filter.oblastid = row.oblastid;
        this.ChangeOblast();
      }
      if (row.organizationid) {
        this.changeQuery("organizationid", row.organizationid);
        this.filter.organizationid = row.organizationid;
      }
      if (row.sporttypeclassifierid && this.filter.isBySportTypeClassifier) {
        this.changeQuery("sporttypeclassifierid", row.sporttypeclassifierid);
        this.filter.sporttypeclassifierid = row.sporttypeclassifierid;
      }
      this.Refresh();
    },
    Refresh() {
      this.Loading = true;
      GetReportCoachSportLevelCount.GetCountList({
        oblastid: this.filter.oblastid,
        regionid: this.filter.regionid,
        schoolyearid: this.filter.schoolyearid,
        organizationtypeid: this.filter.organizationtypeid,
        schooltypeid: this.filter.schooltypeid,
        isBySportTypeClassifier: this.filter.isBySportTypeClassifier,
        sportTypeClassifierId: this.filter.sporttypeclassifierid,
        Search: this.filter.Search,
        SortColumn: this.filter.SortColumn,
        OrderType: this.filter.OrderType,
        PageNumber: this.filter.PageNumber,
        PageLimit: this.filter.PageLimit,
        showAllRegion: this.filter.showAllRegion,
        showAllOrganization: this.filter.showAllOrganization,
      }).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
        }
        if (res.data.oblastid || res.data.oblastId) {
          this.filter.oblastid = res.data.oblastid || res.data.oblastId;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
            if (res.data && res.data.length) {
              this.RegionList.unshift({
                id: 999,
                oblastid: this.filter.oblastid,
                name: this.$t("seeAllOblastOrganizations"),
              });
            }
          });
        }
        if (res.data.regionid > 0) {
          this.filter.regionid = res.data.regionid;
        }
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
            if (res.data && res.data.length) {
              this.RegionList.unshift({
                id: 999,
                oblastid: this.filter.oblastid,
                name: this.$t("seeAllOblastOrganizations"),
              });
            }
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
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportCoachSportLevelCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolYearId,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.isBySportTypeClassifier,
        this.filter.sporttypeclassifierid,
        this.filter.showAllRegion,
        this.filter.showAllOrganization,
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
      let newValue = this.filter.oblastid;
      this.filter.regionid = null;
      this.filter.organizationid = null;
      if (newValue) {
        if (newValue == 999) {
          this.filter.showAllRegion = true;
        } else {
          this.filter.showAllRegion = false;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
            if (res.data && res.data.length) {
              this.RegionList.unshift({
                id: 999,
                oblastid: this.filter.oblastid,
                name: this.$t("seeAllOblastOrganizations"),
              });
            }
          });
        }
      }
      this.changeQuery("oblastid", newValue);
      if (newValue) {
        this.items = [];
        if (this.$route.query && this.$route.query.regionid) {
          if (this.RegionList.length) {
            this.filter.regionid = 0;
            this.changeQuery("regionid", null);
          } else {
            this.filter.regionid = this.$route.query.regionid;
          }
        } else {
          this.filter.regionid = 0;
          this.changeQuery("regionid", null);
        }
      } else {
        this.filter.regionid = 0;
        this.changeQuery("regionid", null);
        this.filter.showAllRegion = false;
        this.RegionList = [];
      }
      this.Refresh();
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
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          if (newValue == 999) {
            this.filter.showAllOrganization = true;
          } else {
            this.filter.showAllOrganization = false;
          }
        } else {
          this.filter.showAllOrganization = false;
        }
        this.changeQuery("regionid", newValue);
        this.Refresh();
      },
    },
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
