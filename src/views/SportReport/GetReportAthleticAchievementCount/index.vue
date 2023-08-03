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
            ><h4 class="text-center">
              {{ $t("GetReportAthleticAchievementCount") }}
            </h4></b-col
          >
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
        <b-tabs
          class="mt-1"
          variant="tabs"
          v-model="activeTab"
          @input="onTabChange"
        >
          <b-tab :title="$t('byRegion')" />
          <b-tab :title="$t('bySportTypes')" />
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
                    {{ $t("oblast") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="(filter.oblastid && !filter.regionid && !filter.byschool) || filter.regionid === 999"
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
                    v-if="filter.isBySportTypeClassifier"
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sporttypeclassifiername") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sportsmancount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("achievementsportsmencount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("achievementsportsmenpercent") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("achievementcount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("persportsmenachievementcount") }}
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
                    v-if="filter.oblastid && !filter.regionid || filter.regionid === 999"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="regionchange(item, i)"
                      >{{ item.regionname }}</a
                    >
                  </td>
                  <td
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="organizationChange(item, i)"
                      >{{ item.organizationname }}</a
                    >
                  </td>
                  <td
                    v-if="filter.isBySportTypeClassifier"
                    style="text-align: left"
                  >
                    {{ item.sporttypeclassifiername }}
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
                      $options.filters.currency(
                        item.achievementsportsmencount,
                        {
                          symbol: "",
                          fractionCount: 0,
                        }
                      )
                    }}
                  </td>

                  <td>
                    {{
                      item.achievementsportsmenpercent == !0
                        ? ""
                        : item.achievementsportsmenpercent
                    }}
                    {{ "%" }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.achievementcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{ item.persportsmenachievementcount }}
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
                  <td
                    v-if="filter.isBySportTypeClassifier"
                    style="text-align: left"
                  >
                    <span></span>
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts('sportsmencount')|currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts('achievementsportsmencount')|currency }}
                  </td>

                  <td style="white-space: nowrap">
                    {{ (calculateAllCounts('achievementsportsmencount')*100/calculateAllCounts('sportsmencount')).toFixed(1) }}%
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts('achievementcount')|currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ (calculateAllCounts('achievementcount')/calculateAllCounts('achievementsportsmencount')).toFixed(1) }}%
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
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: {
    CustomReportFilter
  },
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
      sportTypeClassifierlist: [],
      OblastList: [],
      RegionList: [],
      SportTypeTables: [],
      items: [],
      Loading: false,
      isShow: false,
      PrintLoading: false,
      totalRows: "",
      tablename: "",
      index: null,
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
          key: "achievementsportsmencount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("achievementsportsmencount"),
        },

        {
          key: "achievementsportsmenpercent",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("achievementsportsmenpercent"),
        },
        {
          key: "achievementcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("achievementcount"),
        },
        {
          key: "persportsmenachievementcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("persportsmenachievementcount"),
        },
        {
          key: "sportsmencountbygroup1",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sportsmencountbygroup"),
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
        showAllRegion: false,
        showAllOrganization: false,
        regionid: 0,
        genderid: 0,
        OblastName: "",
        RegionName: "",
        date: "",
        sporteventtypeid: 0
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
      this.OblastList.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
      this.Refresh();
    });
    if (this.filter.oblastid) {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
        if (res.data && res.data.length ) {
          this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
        }
      });
    }
    // this.createDate();
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
    changeSportClassifier(id) {
      this.changeQuery("sporttypeclassifierid", id);
      this.Refresh();
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
      this.filter.OblastName = " / " + item.oblastname;
      if (item.sporttypeclassifierid) {
        this.filter.sporttypeclassifierid = item.sporttypeclassifierid;
      }
      this.Refresh();
    },

    regionchange(item, i) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      if (item.sporttypeclassifierid) {
        this.filter.sporttypeclassifierid = item.sporttypeclassifierid;
      }
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
        this.ChangeOblast()
      } else {
        this.Refresh();
      }
    },
    organizationChange(item) {
      this.$router.push({
        name: "GetReportAthleticAchievementList",
        query: {
          ...this.filter,
          organizationid: item.organizationid,
          sportid: item.sporttypeclassifierid,
        },
      });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    getPersportsmenachievementcount(item) {
      this.$router.push({
        name: "GetReportAthleticAchievementList",
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
      this.PrintLoading = true
      SportReportService.PrintReportAthleticAchievementCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.isBySportTypeClassifier,
        this.filter.sporttypeclassifierid,
        this.filter.showAllRegion,
        this.filter.showAllOrganization,
        this.filter.genderid,
        this.filter.date,
      )
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
              "Число спортсменов с введенными достигнутыми результатами.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              " Erishgan natijalari kiritilgan sportchilar soni.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Эришган натижалари киритилган спортчилар сони.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportReportService.GetReportAthleticAchievementCount(
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
    calculateAllCounts(key) {
      let total = 0
      this.items.forEach(el => {
        total = total + el[key]
      })
      return total
    },
    ChangeOblast() {
      if (this.filter.oblastid) {
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
      }
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
      this.changeQuery("oblastid", this.filter.oblastid);
      this.Refresh();
    },
    Search() {
      this.Refresh();

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
    Refresh() {
      this.Loading = true;
      SportReportService.GetReportAthleticAchievementCount({...this.filter, lang: this.lang}).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
         if (res.data.oblastid || res.data.oblastId) {
            this.filter.oblastid = res.data.oblastid || res.data.oblastId;
            RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
              this.RegionList = res.data;
              if (res.data && res.data.length ) {
                this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
              }
            });
          }
          if (res.data.regionid || res.data.regionId) {
            this.filter.regionid = res.data.regionid || res.data.regionId;
          }
        this.totalRows = res.data.total;
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var sportsmencount = 0;
      var achievementsportsmencount = 0;
      var achievementsportsmenpercent = 0;
      var achievementcount = 0;
      var persportsmenachievementcount = 0;
      var sportsmencountbygroup = 0;
      item.forEach(function (item) {
        sportsmencount = sportsmencount + item.sportsmencount;
        achievementsportsmencount =
          achievementsportsmencount + item.achievementsportsmencount;
        achievementsportsmenpercent =
          achievementsportsmenpercent + item.achievementsportsmenpercent;
        achievementcount = achievementcount + item.achievementcount;
        persportsmenachievementcount =
          persportsmenachievementcount + item.persportsmenachievementcount;
        sportsmencountbygroup =
          sportsmencountbygroup + item.sportsmencountbygroup;
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
  },

  watch: {
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
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
  