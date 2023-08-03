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
          <b-col md="8"><h4 class="text-center">{{ $t("GetReportSportCoachCertificateCount") }}</h4></b-col>
          <b-col md="2">
            <CButton @click="Print" class="float-right" color="primary" size="sm">
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
        <CCardBody>
          <b-tabs variant="tabs" v-model="activeTab" @input="onTabChange">
            <b-tab :title="$t('byRegion')" />
            <b-tab :title="$t('bySportTypes')" />
          </b-tabs>
          <div class="table-container" style="padding: 5px">
            <div class="mobileStyle">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("OrderNumber") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      v-if="!filter.oblastid || filter.oblastid === 999"
                      rowspan="2"
                    >
                      {{ $t("sportPlaceName") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      v-if="filter.oblastid && !filter.regionid &&!filter.byschool || filter.regionid === 999"
                      rowspan="2"
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
                      v-if="filter.isBySportTypeClassifier"
                      rowspan="2"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("sporttypeclassifiername") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("TotalNumberTrainersAvailable") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("TotalNumberCertifiedTrainers") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("NumberofexpiredCertificates") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("Numberofcertificatesexpiringinthecurrentyear") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("Numberofcertificatesexpiringnextyear") }}
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
                        @click="oblastchange(item)"
                        >{{ item.oblastname }}</a
                      >
                    </td>
                    <td
                      v-if="(filter.oblastid&& !filter.regionid) || filter.regionid === 999"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a
                        href="javascript:void(0)"
                        @click="regionchange(item)"
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
                    <td v-if="activeTab == 1" style="text-align: left">
                      {{ item.sporttypeclassifiername }}
                    </td>
                    <td>
                      {{ item.totalcoachcount | currency }}
                    </td>
                    <td>
                      {{ item.coachcertcount | currency }}
                    </td>
                    <td>{{ item.coachcertexpirecount | currency }}</td>
                    <td>{{ item.coachcertexpire1count | currency }}</td>
                    <td>{{ item.coachcertexpire2count | currency }}</td>
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
                      {{ calculateAllCounts('totalcoachcount')|currency }}
                    </td>
                    <td style="white-space: nowrap">
                      {{ calculateAllCounts('coachcertcount')|currency }}
                    </td>
                    <td style="white-space: nowrap">
                      {{ calculateAllCounts('coachcertexpirecount')|currency }}
                    </td>
                    <td style="white-space: nowrap">
                      {{ calculateAllCounts('coachcertexpire1count')|currency }}
                    </td>
                    <td style="white-space: nowrap">
                      {{ calculateAllCounts('coachcertexpire2count')|currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div v-if="isShow" class="table-container" style="padding: 5px">
            <div class="mobileStyle">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("OrderNumber") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Sport turi") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Trenerlar soni") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Toifali trenerlar soni") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      colspan="3"
                    >
                      {{ $t("Jumladan") }}
                    </th>
                  </tr>
                  <tr>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("SecondCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("FirstCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("Oliy toifa") }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="!Loading">
                  <tr
                    v-for="(item, i) in SportTypeTables"
                    style="text-align: center; vertical-align: middle"
                    :key="i"
                  >
                    <td>
                      {{ i + 1 }}
                    </td>

                    <td>
                      {{ item.sporttypeclassifiername }}
                    </td>
                    <td>
                      {{ item.totalcoachcount }}
                    </td>
                    <td>
                      {{ item.coachcountcategory }}
                    </td>
                    <td>{{ item.coachcountcategory3 }}</td>
                    <td>{{ item.coachcountcategory2 }}</td>
                    <td>{{ item.coachcountcategory1 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CCardBody>
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
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: {CustomReportFilter},
  data() {
    return {
      schoolyearlist: [],
      OblastList: [],
      RegionList: [],
      SportTypeTables: [],
      organizationtypelist: [],
      schooltypelist:[],
      items: [],
      sportTypeClassifierlist: [],
      Loading: false,
      totalRows: "",
      isBusy: false,
      PrintLoading:false,
      isShow: false,
      index: null,
      filter: {
        isBySportTypeClassifier: false,
        sporttypeclassifierid: null,
        oblastid: 0,
        regionid: 0,
        organizationtypeid: 0,
        schooltypeid:0,
        organizationid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        schoolyearid: 0,
        genderid: 0,
        date: "",
        OblastName: "",
        RegionName: "",
      },
      activeTab: 0,
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    (this.filter.oblastid = parseInt(this.$route.query.oblastid) || this.filter.oblastid),
    (this.filter.schoolyearid = parseInt(this.$route.query.schoolyearid) || this.filter.schoolyearid),
      (this.filter.sporttypeclassifierid = parseInt(this.$route.query.sporttypeclassifierid) || this.filter.sporttypeclassifierid)

    if (this.$route.query.activeTab) {
      this.activeTab = parseInt(this.$route.query.activeTab)
      this.filter.isBySportTypeClassifier = this.activeTab?true:false;
    }
    if (this.filter.regionid ==999) {
      this.filter.showAllOrganization = true;          
    }
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
    });
    if (this.filter.oblastid) {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
        if (res.data && res.data.length ) {
          this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
        }
      });
    }
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
     SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    this.filter.regionid = parseInt(this.$route.query.regionid);
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
    });
    this.createDate();
  },
  computed: {},
  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.changeQuery('oblastid', null)
        this.ChangeOblast()
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.regionChange()
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
    ChangeOblast() {
      if (this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
          if (res.data && res.data.length ) {
            this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
          }
        });
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
      }
      if (this.filter.oblastid == 999) {
        this.filter.showAllRegion = true;          
      } else {
        this.filter.showAllRegion = false; 
      }
      this.changeQuery('oblastid', this.filter.oblastid)
      this.Refresh();
    },
    regionChange() {
      this.changeQuery("regionid",  this.filter.regionid);
      if (this.filter.regionid == 999) {
        this.filter.showAllOrganization = true;  
      }else{
        this.filter.showAllOrganization = false;  
      }
      this.Refresh();
    },
    changeSportClassifier(id) {
      this.changeQuery("sporttypeclassifierid", id);
      this.Refresh();
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportReportService.GetReportSportCoachCertificateCount(
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
      SportReportService.GetReportSportCoachCertificateCount(this.filter).then(
        (res) => {
          this.Loading = false;
          this.items = res.data.data;
          this.totalRows = res.data.total;
        }
      );
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
      this.Refresh();
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
        this.ChangeOblast()
      } else {
        this.Refresh();
      }
    },
    organizationChange(item) {
      this.$router.push({name:'GetReportSportCoachCertificateList', query:{...this.filter, organizationid: item.organizationid}})
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
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Search() {
      this.Refresh();

    },
    getGroupCount(item) {
      this.$router.push({
        name: "GetReportAppointQualCategoryCoachList",
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
      SportReportService.PrintReportSportCoachCertificateCount(
        this.filter
        // this.filter.oblastid,
        // this.filter.regionid,
        // this.filter.organizationtypeid,
        // this.filter.schooltypeid,
        // this.filter.schoolyearid,
        // this.filter.isBySportTypeClassifier,
        // this.filter.sporttypeclassifierid,
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
              "Число тренеров с квалификационной категорией.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Malaka toifasi berilgan trenerlar soni.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Малака тоифаси берилган тренерлар сони.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
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
        }
        this.changeQuery("schoolyearid", newValue);
        this.Refresh();
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

.success {
  background-color: rgb(200, 238, 247);
}
</style>
