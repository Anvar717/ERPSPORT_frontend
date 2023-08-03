<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"
            ><h4 class="text-center">{{ $t("FormingGroupDate") }}</h4></b-col
          >
          <b-col md="2" class="text-right d-flex justify-content-end">
            <div class="mr-2">
              <CButton
                @click="Print"
                class="float-right"
                color="primary"
                size="sm"
              >
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                <!-- {{ $t("Print") }} -->
              </CButton>
            </div>
          </b-col>
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
          <!-- <b-row>
            <b-col sm="12" md="2" class="achievement-input">
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
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("Oblast") }} </label>
              <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                :disabled="(!$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  $can('OblastSport', 'permissions')) ||
                $can('RegionXTB', 'permissions')"
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast"
              ></v-select>
            </b-col>
            <b-col v-if="filter.oblastid" sm="12" md="2" class="achievement-input">
              <label> {{ $t("Region") }} </label>
              <v-select
                :options="RegionList"
                v-model="filter.regionid"
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                :disabled="
                !$can('AdminView', 'permissions') &&
                !$can('MinSportView', 'permissions') &&
                !$can('OblastSport', 'permissions') &&
                $can('RegionXTB', 'permissions')
                "
                @input="changeRegion"
                class="mr-2"
                style="width: 100%"
              ></v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("SportTypeClassifier") }} </label>
              <v-select
                :options="sportTypeClassifierlist"
                v-model="filter.sportTypeClassifierId"
                :reduce="(item) => item.id"
                @input="changeSportClassifier(filter.sportTypeClassifierId)"
                :placeholder="$t('SportTypeClassifier')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="filter.organizationTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('organizationtype')"
                label="name"
                style="width: 100%"
                class="mr-2"
                @input="Refresh"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="filter.schoolTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('schooltype')"
                @input="Refresh"
                 style="width: 100%"
                class="mr-2"
                label="name"
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
          </b-row> -->
        </CCardHeader>
        <b-tabs
          variant="tabs"
          v-model="activeTab"
          @input="onTabChange"
        >
          <b-tab :title="$t('byRegion')" key="0" />
          <b-tab :title="$t('bySportTypes')" key="1" />
        </b-tabs>
        <div class="table-container" style="padding: 5px">
          <div class="mobileStyle">
            <table class="table table-bordered table-striped">
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
                    v-if="!filter.oblastid || filter.oblastid === 999"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Oblast") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      (filter.oblastid > 0 &&
                        !filter.regionid &&
                        !filter.byschool) ||
                      filter.regionid === 999
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastid > 0 && !filter.regionid && filter.byschool
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
                    v-if="activeTab == 1"
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sporttypeclassifiername") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sportGroup") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Sportsmencount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Trener") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="!Loading">
                <tr
                  v-for="(item, i) in items"
                  :class="i == index ? 'success' : ''"
                  style="text-align: center; vertical-align: middle"
                  :key="i"
                >
                  <td>
                    {{ i + 1 }}
                  </td>
                  <td
                    v-if="!filter.oblastid || filter.oblastid === 999"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="oblastchange(item, i)"
                      >{{ item.oblastname }}</a
                    >
                  </td>
                  <td
                    v-if="
                      (filter.oblastid > 0 && !filter.regionid) ||
                      filter.regionid === 999
                    "
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="regionchange(item, i)"
                      >{{ item.regionname }}</a
                    >
                  </td>
                  <td
                    v-if="filter.oblastid && filter.regionid"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="organizationChange(item, i)"
                      >{{ item.organizationname }}</a
                    >
                  </td>
                  <td style="text-align: left" v-if="activeTab == 1">
                    {{ item.sporttypeclassifiername }}
                  </td>
                  <td>
                    {{ item.groupcount | currency }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sportsmencount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.coachcount, {
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
              <tfoot>
                <tr
                  style="
                    text-align: center;
                    vertical-align: middle;
                    font-weight: bold;
                  "
                >
                  <td
                    :colspan="
                      filter.oblastid === 999 || filter.regionid === 999 ? 3 : 2
                    "
                  >
                    {{ $t("Total") }}
                  </td>
                  <td v-if="activeTab == 1"></td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("groupcount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("sportsmencount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("coachcount") | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
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
import OrganizationTypeService from "@/services/OrganizationType.service";
import SportReportService from "@/services/SportReport.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: { CustomReportFilter },
  data() {
    return {
      schoolyearlist: [],
      PrintLoading: false,
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      schoollegalformlist: [],
      organizationtypelist: [],
      schooltypelist: [],
      SchoolManagementFormList: [],
      OblastList: [],
      RegionList: [],
      SportTypeTables: [],
      items: [],
      Loading: false,
      isShow: false,
      totalRows: "",
      tablename: "",
      index: null,
      sportTypeClassifierlist: [],
      isBusy: false,
      Fields: [
        {
          key: "index",
          tdClass: "text-cebter",
          thClass: "text-center",
          label: this.$t("OrderNumber"),
        },
        {
          key: "sportname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("sporttype"),
        },
        {
          key: "groupcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sportgroup"),
        },
        {
          key: "sportsmencountbygroup1",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sportsmencountbygroup"),
        },
        {
          key: "coachcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Murabbiy"),
        },
        {
          key: "viewsportsmen",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Student"),
        },
      ],
      activeTab: 0,
      filter: {
        isBySportTypeClassifier: false,
        sporttypeclassifierid: null,
        schoolyearid: 0,
        oblastid: 0,
        regionid: 0,
        organizationtypeid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        schooltypeid: 0,
        genderid: 0,
        OblastName: "",
        RegionName: "",
        sportlevelid: 0,
        date: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    Object.keys(this.filter).forEach((key) => {
      if (key && this.$route.query[key]) {
        this.filter[key] = isNaN(this.$route.query[key])
          ? this.$route.query[key]
          : parseInt(this.$route.query[key]);
      }
    });
    if (this.filter.regionid == 999) {
      this.filter.showAllOrganization = true;
    }
    if (this.filter.oblastid == 999) {
      this.filter.showAllRegion = true;
    }
    if (this.$route.query.activeTab) {
      this.activeTab = parseInt(this.$route.query.activeTab);
      this.filter.isBySportTypeClassifier = this.activeTab ? true : false;
    }
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      if (this.$can("AdminView", "permissions")) {
        this.OblastList.unshift({
          id: 999,
          countryid: 999,
          name: this.$t("seeAllDistricts"),
        });
      }
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    if (this.filter.oblastid) {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
        if (
          res.data &&
          res.data.length &&
          this.$can("AdminView", "permissions")
        ) {
          this.RegionList.unshift({
            id: 999,
            oblastid: this.filter.oblastid,
            name: this.$t("seeAllOblastOrganizations"),
          });
        }
      });
    }
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
      this.Refresh();
    });
    this.createDate();
  },

  methods: {
    clearFilter() {
      this.filter = {
        isBySportTypeClassifier: false,
        sporttypeclassifierid: null,
        schoolyearid: 0,
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        schooltypeid: 0,
        OblastName: "",
        RegionName: "",
        sportlevelid: 0,
        date: "",
      };
      this.Refresh();
    },
    Search() {
      var self = this.filter;
      if (
        // self.schoolyearid === 0 &&
        self.sporttypeclassifierid === null &&
        self.organizationtypeid === 0 &&
        self.schooltypeid === 0
      ) {
        this.Refresh();
        return;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      }
      this.Refresh();
    },
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.changeQuery("oblastid", null);
        this.ChangeOblast();
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.changeRegion();
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
    oblastchange(item, i) {
      this.filter.oblastid = item.oblastid;
      this.$refs.getRegionList.getregionlist()
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid;
      }
      this.ChangeOblast();
    },
    regionchange(item, i) {
      this.filter.regionid = item.regionid;
      this.$refs.getRegionList.getorganizationlist()
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid;
      }
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
        this.ChangeOblast();
      } else {
        this.changeRegion();
      }
    },
    changeRegion() {
      this.changeQuery("regionid", this.filter.regionid);
      if (this.filter.regionid == 999) {
        this.filter.showAllOrganization = true;
      } else {
        this.filter.showAllOrganization = false;
      }
      this.Refresh();
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
          if (
            res.data &&
            res.data.length &&
            this.$can("AdminView", "permissions")
          ) {
            this.RegionList.unshift({
              id: 999,
              oblastid: this.filter.oblastid,
              name: this.$t("seeAllOblastOrganizations"),
            });
          }
        });
        if (this.filter.oblastid == 999) {
          this.filter.showAllRegion = true;
        } else {
          this.filter.showAllRegion = false;
        }
      }
      if (this.$route.query && this.$route.query.regionid) {
        if (this.RegionList.length) {
          let item = this.getOblastOfRegion(this.$route.query.regionid);
          this.filter.regionid = 0;
          this.changeQuery("regionid", null);
        } else {
          this.filter.regionid = this.$route.query.regionid;
        }
      } else {
        this.filter.regionid = 0;
        this.changeQuery("regionid", null);
      }
      this.changeQuery("oblastid", this.filter.oblastid);
      this.Refresh();
    },
    organizationChange(item) {
      this.$router.push({
        name: "SportStudentManageList",
        query: {
          ...this.filter,
          organizationid: item.organizationid,
          SportTypeClassifierId: item.sporttypeclassifierid,
          date: this.filter.date,
        },
      });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    getGroupCount(item) {
      this.$router.push({
        name: "SportStudentManageList",
        query: {
          oblastid: item.oblastid,
          regionid: item.regionid,
          organizationid: item.organizationid,
          schoolyearid: this.filter.schoolyearid,
          sportid: item.sporttypeclassifierid,
          date: this.filter.date,
        },
      });
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportFormingGroupCount(this.filter)
        .then((response) => {
          this.PrintLoading = false;
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Спортсмены и тренеры, прикрепленные к группе.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Guruhga biriktirilgan sportchi va murabbiylar.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Гуруҳга бириктирилган спортчи ва мураббийлар.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    changeSportClassifier(id) {
      this.changeQuery("sportTypeClassifierId", id);
      this.Refresh();
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportReportService.GetReportFormingGroupCount(
        item.oblastid,
        item.regionid,
        item.organizationid,
        this.filter.schoolyearid,
        this.lang
      ).then((res) => {
        this.isBusy = false;
        if (item.oblastid > 0 && item.regionid > 0 && item.organizationid > 0) {
          this.tablename = item.organizationname;
        } else if (item.oblastid > 0 && item.regionid > 0) {
          this.tablename = item.regionname;
        } else if (item.oblastid > 0) {
          this.tablename = item.oblastname;
        }
        this.SportTypeTables = res.data.data;
      });
    },
    Refresh() {
      this.Loading = true;
      SportReportService.GetReportFormingGroupCount({
        ...this.filter,
        lang: this.lang,
      }).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
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
        if (res.data.regionid || res.data.regionId) {
          this.filter.regionid = res.data.regionid || res.data.regionId;
        }
        this.totalRows = res.data.total;
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
    getOblastOfRegion(id) {
      let obj = null;
      if (this.RegionList.length) {
        obj = this.RegionList.find((el) => el.id == id);
      }
      return obj;
    },
    onTabChange(val) {
      if (val == 1) {
        this.filter.isBySportTypeClassifier = true;
      } else {
        this.filter.isBySportTypeClassifier = false;
      }
      this.changeQuery("activeTab", val);

      this.Refresh();
    },
    calculateAllCounts(key) {
      let total = 0;
      this.items.forEach((el) => {
        total = total + el[key];
      });
      return total;
    },
  },
  watch: {
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
        }
        this.changeQuery("schoolyearid", newValue);
        this.Refresh();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.success {
  background-color: rgb(200, 238, 247);
}
</style>
