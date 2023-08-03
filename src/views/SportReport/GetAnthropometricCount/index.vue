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
            ><h4 class="text-center">{{ $t("GetAnthropometricCount") }}</h4></b-col>
          <b-col md="2">
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
                    v-if="(filter.oblastid && !filter.regionid && !filter.byschool ) || filter.regionid === 999"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="filter.oblastid > 0 && (filter.regionid === 0 || filter.regionid === null) && filter.byschool"
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
                    {{ $t("sportsmencount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("indicatorsenteredcount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("anthropometricpercent") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("refreshedanthropometriccount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("refreshedanthropometricpercent") }}
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
                      >{{ item.oblastname }}</a>
                  </td>
                  <td
                    v-if="(filter.oblastid && !filter.regionid) || filter.regionid === 999"
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
                    <a href="javascript:void(0)"  @click="organizationChange(item, i)">{{ item.organizationname }}</a>
                  </td>

                  <td>
                    {{ item.sportsmencount | currency }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.anthropometriccount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{item.anthropometricpercent}} %
                  </td>
                  <td>
                    {{
                      $options.filters.currency(
                        item.refreshedanthropometriccount,
                        {
                          symbol: "",
                          fractionCount: 0,
                        }
                      )
                    }}
                  </td>
                  <td>
                    {{item.refreshedanthropometricpercent}} %
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
                  <td :colspan="(filter.oblastid === 999 || filter.regionid === 999)?3:2">{{ $t("Total") }}</td>
                  <td v-if="activeTab == 1"></td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts('sportsmencount')|currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts('anthropometriccount')|currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ (calculateAllCounts('anthropometriccount')/calculateAllCounts('sportsmencount')*100)|currency }}%
                  </td>
                  <td>
                    {{ calculateAllCounts('refreshedanthropometriccount')|currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ (calculateAllCounts('refreshedanthropometriccount')/calculateAllCounts('sportsmencount')*100)|currency }}%
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
import SportReportService from "@/services/SportReport.service";
// import SportCircleReportService from "@/services/SportCircleReport.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: {
    CustomDatePicker,
    CustomReportFilter
  },
  data() {
    return {
      organizationlist: [],
      organizationtypelist: [],
      schoolyearlist: [],
      SchoolManagementFormList: [],
      OblastList: [],
      RegionList: [],
      SportTypeTables: [],
      items: [],
      Loading: false,
      PrintLoading: false,
      isShow: false,
      totalRows: "",
      tablename: "",
      index: null,
      sportTypeClassifierlist: [],
      isBusy: false,
      bottomrow: {
        sportsmencount: 0,
        anthropometriccount: 0,
        sportsmencountbygroup: 0,
        anthropometricpercent: 0,
        refreshedanthropometriccount: 0,
        refreshedanthropometricpercent: 0,
      },
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
          key: "sportsmencount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sportsmencount"),
        },
        {
          key: "sportsmencountbygroup1",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sportsmencountbygroup"),
        },
        {
          key: "anthropometricpercent",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("anthropometricpercent"),
        },
        {
          key: "refreshedanthropometriccount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("refreshedanthropometriccount"),
        },
        {
          key: "refreshedanthropometricpercent",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("refreshedanthropometricpercent"),
        },
        {
          key: "viewsportsmen",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Student"),
        },
      ],
      activeTab: 0,
      schooltypelist:[],
      filter: {
        isBySportTypeClassifier: false,
        sportTypeClassifierId: null,
        schoolyearid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        oblastid: 0,
        regionid: 0,
        organizationTypeId: 0,
        schoolTypeId:0,
        genderid:0,
        date: "",
        OblastName: "",
        RegionName: "",
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
    if (this.filter.regionid ==999) {
      this.filter.showAllOrganization = true;          
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
      // if (this.$can('AdminView', 'permissions')) {
        this.OblastList.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
      // }
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    if (this.filter.oblastid) {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
        if (res.data && res.data.length ) {
            this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
        }
      });
    }
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
      this.Refresh();
    });
    this.createDate();
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
      this.Refresh()
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
      this.filter.endDate = dd + "." + mm + "." + yyyy;
      this.filter.enddate = dd + "." + mm + "." + yyyy;
      this.filter.startDate = dd + "." + mm + "." + yyyy;
      this.filter.startdate = dd + "." + mm + "." + yyyy;
    },
    DisabledDateForStartdate(date) {
      if (!!this.filter.startdate) {
        var arr = this.filter.startdate.split(".");
        return date > new Date(arr[2], arr[1] - 1, arr[0]);
      }
    },
    DisabledDateForEnddate(date) {
      if (!!this.filter.enddate) {
        var arr = this.filter.enddate.split(".");
        return date > new Date(arr[2], arr[1] - 1, arr[0]);
      }
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
    regionchange(item, i) {
      this.filter.regionid = item.regionid;
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid;
      }
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
        this.ChangeOblast()
      } else {
        this.changeRegion();
      }
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.cache_filters = true;
      this.Refresh();
      }
    },
    changeRegion() {
      this.changeQuery("regionid", this.filter.regionid);
      if (this.filter.regionid == 999) {
        this.filter.showAllOrganization = true;  
      }else{
        this.filter.showAllOrganization = false;  
      }
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
          // hasAnthropometricData : item.hasAnthropometricDatas
        },
      });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    getineventcount(item) {
      this.$router.push({
        name: "SportStudentManageList",
        query: {
          oblastid: item.oblastid,
          regionid: item.regionid,
          startdate: item.startDate,
          enddate: this.filter.endDate,
          date: this.filter.date,
        },
      });
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
        },
      });
    },
    Print() {
       this.PrintLoading = true
      SportReportService.PrintAnthropometricCount(this.filter)
        .then((response) => {
          this.PrintLoading = false
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Число спортсменов с введенными данными антропометрических показателей.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Antropometrik ko‘rsatkichlari kiritilgan sportchilar soni.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Антропометрик кўрсаткичлари киритилган спортчилар сони.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    oblastchange(item, i) {
      this.filter.oblastid = item.oblastid;
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid;
      }
      this.ChangeOblast();
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
          if (res.data && res.data.length ) {
            this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
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
    changeSportClassifier(id) {
      this.changeQuery("sportTypeClassifierId", id);
      this.Refresh();
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportCircleReport.GetAnthropometricCount(
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
    async Refresh() {
      this.Loading = true;
      await  SportReportService.GetAnthropometricCount({
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
                this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
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
        let total = 0
        this.items.forEach(el => {
          total = total + el[key]
        })
        return total
      },
  },
  watch: {
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.changeQuery('schoolyearid', newValue)
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
