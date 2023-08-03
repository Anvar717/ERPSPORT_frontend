<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col class="mt-2" md="2" lg="2">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"><h4 class="text-center">{{ $t("ReportCoachPortfolioCount") }}</h4></b-col>
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
        <b-tabs class="mt-1" variant="tabs" v-model="activeTab" @input="onTabChange">
          <b-tab :title="$t('byRegion')"  key="0"/>
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
                    {{ $t("sportPlaceName") }}
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
                    v-if="filter.oblastid && filter.regionid && filter.organizationId"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Coach") }}
                  </th>
                  <th
                    rowspan="2"
                    v-else-if="filter.oblastid && filter.regionid"
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
                    v-if="!filter.organizationId"
                  >
                    {{ $t("Murabbiy") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Sportchi") }}
                  </th>
                  <!--  -->
                  <th
                    colspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("inNationalTeam") }}
                  </th>
                  <th
                    colspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("nationalChampions") }}
                  </th>
                  <th
                    colspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("asianChampions") }}
                  </th>
                  <th
                    colspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("olympicChampions") }}
                  </th>
                </tr>

                <tr>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("mainquota") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("Zaxira") }}
                  </th>

                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("1stPlace") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("2stPlace") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("3stPlace") }}
                  </th>

                   <th style="text-align: center; vertical-align: middle">
                    {{ $t("1stPlace") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("2stPlace") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("3stPlace") }}
                  </th>

                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("1stPlace") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("2stPlace") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("3stPlace") }}
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
                    v-if="(filter.oblastid > 0 && !filter.regionid) || filter.regionid === 999"
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
                    <span v-if="filter.organizationId">{{ item.coachpersonname }}</span>
                    <a href="javascript:void(0)" v-else  @click="organizationChange(item, i)">{{ item.organizationname }}</a>
                  </td>

                  <td style="text-align: left;" v-if="filter.isBySportTypeClassifier">
                    {{ item.sporttypeclassifiername }}
                  </td>

                  <td  v-if="!filter.organizationId">
                    <span >{{ item.coachcount|currency }}</span>
                  </td>
                  <td>
                    <a v-if="filter.organizationId" href="javascript:void(0)"  @click="coachChange(item, i)">{{ item.sportsmencount|currency }}</a>
                    <span v-else>
                      {{ item.sportsmencount|currency }}
                    </span>
                  </td>

                  <td>
                    {{item.teamsquadmaincount|currency}}
                  </td>
                  <td>
                    {{item.teamsquadreservecount|currency}}
                  </td>

                  <td>
                    {{item.uzbrank001|currency}}
                  </td>
                  <td>
                    {{item.uzbrank002|currency}}
                  </td>
                  <td>
                    {{item.uzbrank003|currency}}
                  </td>

                  <td>
                    {{item.asiarank001|currency}}
                  </td>
                  <td>
                    {{item.asiarank002|currency}}
                  </td>
                  <td>
                    {{item.asiarank003|currency}}
                  </td>

                  <td>
                    {{item.worldrank001|currency}}
                  </td>
                  <td>
                    {{item.worldrank002|currency}}
                  </td>
                  <td>
                    {{item.worldrank003|currency}}
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
                <tr style="text-align: center; vertical-align: middle; font-weight: bold;">
                  <td :colspan="(filter.oblastid === 999 || filter.regionid === 999)?3:2">{{ $t("Total") }}</td>
                  <td v-if="filter.isBySportTypeClassifier"></td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('coachcount')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('sportsmencount')|currency }}</td>

                  <td style="white-space: nowrap">{{ calculateAllCounts('teamsquadmaincount')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('teamsquadreservecount')|currency }}</td>

                  <td style="white-space: nowrap">{{ calculateAllCounts('uzbrank001')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('uzbrank002')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('uzbrank003')|currency }}</td>

                  <td style="white-space: nowrap">{{ calculateAllCounts('asiarank001')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('asiarank002')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('asiarank003')|currency }}</td>

                  <td style="white-space: nowrap">{{ calculateAllCounts('worldrank001')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('worldrank002')|currency }}</td>
                  <td style="white-space: nowrap">{{ calculateAllCounts('worldrank003')|currency }}</td>
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
import SportTitleService from "@/services/SportTitle.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import OrganizationService from "@/services/organization.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
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
      schooltypelist:[],
      OblastList: [],
      sporttitlelist: [],
      RegionList: [],
      SportTypeTables: [],
      items: [],
      tablename: "",
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      index: null,
      // isBusy: false,
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
          key: "sporttitle1count1",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sporttitle1count"),
        },
        {
          key: "sporttitle2count",
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
      sportTypeClassifierlist: [],
      organizationlist: [],
      filter: {
        schoolyearid: 0,
        isBySportTypeClassifier: false,
        oblastid: 0,
        sporttypeclassifierid: null,
        regionid: 0,
        organizationId: 0,
        organizationtypeid: 0,
        schoolTypeId:0,
        showAllRegion: false,
        showAllOrganization: false,
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    if (this.$route.query.oblastid) {
      this.filter.oblastid=parseInt(this.$route.query.oblastid)
    }
    if (this.$route.query.schoolyearid) {
      this.filter.schoolyearid=parseInt(this.$route.query.schoolyearid)
    }
    if (this.$route.query.sportTypeClassifierId) {
      this.filter.sporttypeclassifierid=parseInt(this.$route.query.sportTypeClassifierId)
    }

    if (this.$route.query.activeTab) {
      this.activeTab = parseInt(this.$route.query.activeTab)
      this.filter.isBySportTypeClassifier = this.activeTab?true:false;
    }
    if (this.$route.query.regionid) {
      this.filter.regionid=parseInt(this.$route.query.regionid)
    }
    if (this.$route.query.organizationId) {
      this.filter.organizationId=parseInt(this.$route.query.organizationId)
    }
    // 
    
    if (this.filter.regionid ==999) {
      this.filter.showAllOrganization = true;          
    }
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
    });
    SportTitleService.GetAll(true).then((res) => {
      this.sporttitlelist = res.data;
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
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
    oblastchange(item, i) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      if (item.sporttypeclassifierid) {
        this.filter.sporttypeclassifierid = item.sporttypeclassifierid
        this.changeQuery('sporttypeclassifierid', item.sporttypeclassifierid)
      }
      this.ChangeOblast()
    },
    regionchange(item, i) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      if (item.sporttypeclassifierid) {
        this.filter.sporttypeclassifierid = item.sporttypeclassifierid
        this.changeQuery('sporttypeclassifierid', item.sporttypeclassifierid)
      }
       if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
        this.ChangeOblast();
      } else {
        this.changeRegionid()
      }
    },
    changeRegionid() {
        this.changeQuery('regionid',  this.filter.regionid)
        this.Refresh();
    },
    organizationChange(item) {
      this.filter.organizationId = item.organizationid;
      this.changeQuery('organizationId', item.organizationid)
      this.Refresh()
    },
    changeOrgSelect() {
      this.changeQuery('organizationId', this.filter.organizationId)
      this.Refresh()
    },
    coachChange(item) {
      if (item) {
        this.$router.push({name:'GetReportAthleticAchievementList', query:{...this.filter, organizationid: item.organizationid, sporttypeclassifierid:item.sporttypeclassifierid}})
      } else {
        this.$router.push({name:'GetReportAthleticAchievementList', query:{...this.filter, organizationid: 0, sporttypeclassifierid:0}})
      }
    },
    Print() {
      this.PrintLoading = true
      SportReportService.PrintCoachPortfolioCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationId,
        this.filter.schoolyearid,
        this.filter.organizationtypeid,
        this.filter.schoolTypeId,
        this.filter.isBySportTypeClassifier,
        this.filter.sporttypeclassifierid,
        this.filter.showAllRegion,
        this.filter.showAllOrganization,
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
              "ЧОтчет по показателям тренера.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Trener ko‘rsatkichlari hisoboti.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Тренер кўрсаткичлари ҳисоботи.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    calculateAllCounts(key) {
      let total = 0
      this.items.forEach(el => {
        total = total + el[key]
      })
      return total
    },
    OrganizationPrint() {
      SportReportService.GetReportSportTitleDocumentByOrganizationPrintList(
        this.filter.schoolyearid,
        this.filter.sporttitleid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Отчет по выдаче спортивных разрядов и титулов.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Tashkilot bo'yicha razryad va unvonlar xisoboti.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Ташкилот бўйича разраяд ва унвонлар хисоботи.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    changeSportClassifier(id) {
      this.changeQuery('sporttypeclassifierid', id)
      this.Refresh()
    },
    onTabChange(val) {
      if (val == 1) {
        this.filter.isBySportTypeClassifier = true;
      } else {
        this.filter.isBySportTypeClassifier = false;
      }
      this.changeQuery('activeTab', val)

      this.Refresh()
    },
    ChangeOblast() {
      let newValue = this.filter.oblastid
      if (newValue) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
          if (res.data && res.data.length ) {
            this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
          }
        });
      }
      this.changeQuery('oblastid', newValue)
      if (newValue) {
        this.items = [];
        if (this.$route.query && this.$route.query.regionid) {
          if (this.RegionList.length) {
            this.filter.regionid = 0;
            this.changeQuery('regionid', null)
          } else {
            this.filter.regionid=this.$route.query.regionid
          }
        } else {
          this.filter.regionid = 0;
          this.changeQuery('regionid', null)
        }
      } else {
        this.filter.regionid = 0;
        this.changeQuery('regionid', null)
      }
       if (this.filter.oblastid == 999) {
        this.filter.showAllRegion = true;          
      } else {
        this.filter.showAllRegion = false; 
      }
      this.Refresh();
    },
    Refresh() {
      this.Loading = true;
      SportReportService.GetCoachPortfolioCount(this.filter)
        .then((res) => {
          this.Loading = false;
          this.items = res.data.data;
          this.totalRows = res.data.total;
        })
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
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
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
