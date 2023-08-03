<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col lg="3" class="mb-c-2">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col lg="6">
            <h3 class="text-center">
              {{ $t("GetReportAppointQualCategoryJuryCount") }}
            </h3>
          </b-col>
          <b-col lg="3">
            <div class="w-100 float-right text-right">
              <CButton @click="Print" class="mr-2" color="primary" size="sm">
                  <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
                {{ $t("Print") }}
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
              <b-table-simple bordered responsive striped no-border-collapse>
                <b-thead>
                  <b-tr>
                    <b-th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("OrderNumber") }}
                    </b-th>
                    <b-th
                      style="text-align: center; vertical-align: middle"
                      v-if="!filter.oblastid || filter.oblastid === 999"
                      rowspan="2"
                    >
                      {{ $t("Oblast") }}
                    </b-th>
                    <b-th
                      style="text-align: center; vertical-align: middle"
                      v-if="(filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null) &&
                        !filter.byschool) || filter.regionid === 999"
                      rowspan="2"
                    >
                      {{ $t("regionname") }}
                    </b-th>
                    <b-th
                      rowspan="2"
                      v-if="
                        filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null) &&
                        filter.byschool"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("organizationname") }}
                    </b-th>
                    <b-th
                      rowspan="2"
                      v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("organizationname") }}
                    </b-th>
                    <b-th
                      v-if="filter.isBySportTypeClassifier"
                      rowspan="2"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("sporttypeclassifiername") }}
                    </b-th>
                    <b-th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Xakamlar soni") }}
                    </b-th>
                    <b-th
                      style="text-align: center; vertical-align: middle"
                      colspan="6"
                    >
                      {{ $t("Jumladan") }}
                    </b-th>
                  </b-tr>
                  <b-tr>
                    <b-th style="text-align: center; vertical-align: middle">
                      {{ $t("SportCoach") }}
                    </b-th>
                    <b-th style="text-align: center; vertical-align: middle">
                      {{ $t("thirdCategory") }}
                    </b-th>
                    <b-th style="text-align: center; vertical-align: middle">
                      {{ $t("SecondCategory") }}
                    </b-th>
                    <b-th style="text-align: center; vertical-align: middle">
                      {{ $t("FirstCategory") }}
                    </b-th>
                    <b-th style="text-align: center; vertical-align: middle">
                      {{ $t("NationalCategory") }}
                    </b-th>
                    <b-th style="text-align: center; vertical-align: middle">
                      {{ $t("InterationalCategory") }}
                    </b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-if="!Loading">
                  <b-tr
                    v-for="(item, i) in items"
                    :class="i == index ? 'success' : ''"
                    style="text-align: center; vertical-align: middle"
                    :key="i"
                  >
                    <b-td>
                      {{ i + 1 }}
                    </b-td>
                    <b-td
                      v-if="!filter.oblastid || filter.oblastid === 999"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a
                        href="javascript:void(0)"
                        @click="oblastchange(item)"
                        >{{ item.oblastname }}</a
                      >
                    </b-td>
                    <b-td
                      v-if="(filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null)) || filter.regionid === 999"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a
                        href="javascript:void(0)"
                        @click="regionchange(item)"
                        >{{ item.regionname }}</a
                      >
                    </b-td>
                    <b-td
                      v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a
                        href="javascript:void(0)"
                        @click="organizationChange(item, i)"
                        >{{ item.organizationname }}</a
                      >
                    </b-td>
                    <b-td v-if="activeTab == 1" style="text-align: left">
                      {{ item.sporttypeclassifiername }}
                    </b-td>
                    <b-td>
                      {{ item.totalcount | currency }}
                    </b-td>
                    <b-td>{{ item.countcategory7 | currency }}</b-td>
                    <b-td>{{ item.countcategory6 | currency }}</b-td>
                    <b-td>{{ item.countcategory3 | currency }}</b-td>
                    <b-td>{{ item.countcategory2 | currency }}</b-td>
                    <b-td>{{ item.countcategory8 | currency }}</b-td>
                    <b-td>{{ item.countcategory9 | currency }}</b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="Loading">
                  <b-tr>
                    <b-td class="text-center" colspan="19">
                      <b-spinner></b-spinner>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tfoot>
                  <b-tr
                    style="
                      text-align: center;
                      vertical-align: middle;
                      font-weight: bold;
                    "
                  >   
                    <b-td :colspan="(filter.oblastid === 999 || filter.regionid === 999)?3:2">{{ $t("Total") }}</b-td>
                    <b-td v-if="activeTab == 1"></b-td>
                    <b-td style="white-space: nowrap">
                      {{calculateAllCounts('totalcount')|currency}}
                    </b-td>
                    <b-td style="white-space: nowrap">
                      {{calculateAllCounts('countcategory7')|currency}}
                    </b-td>
                    <b-td style="white-space: nowrap">
                      {{calculateAllCounts('countcategory6')|currency}}
                    </b-td>
                    <b-td style="white-space: nowrap">
                      {{calculateAllCounts('countcategory3')|currency}}
                    </b-td>
                    <b-td style="white-space: nowrap">
                      {{calculateAllCounts('countcategory2')|currency}}
                    </b-td>
                    <b-td style="white-space: nowrap">
                      {{calculateAllCounts('countcategory8')|currency}}
                    </b-td>
                    <b-td style="white-space: nowrap">
                      {{calculateAllCounts('countcategory9')|currency}}
                    </b-td>
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
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
                    <!-- <th
                        style="text-align: center; vertical-align: middle"
                        rowspan="2"
                      >
                        {{ $t("Toifali trenerlar soni") }}
                      </th> -->
                    <th
                      style="text-align: center; vertical-align: middle"
                      colspan="6"
                    >
                      {{ $t("Jumladan") }}
                    </th>
                  </tr>
                  <tr>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("SportCoach") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("thirdCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("SecondCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("FirstCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("NationalCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("InterationalCategory") }}
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
                      {{ item.totalcount }}
                    </td>
                    <!-- <td>
                        {{ item.countcategory }}
                      </td> -->
                    <td>{{ item.countcategory7 }}</td>
                    <td>{{ item.countcategory6 }}</td>
                    <td>{{ item.countcategory3 }}</td>
                    <td>{{ item.countcategory2 }}</td>
                    <td>{{ item.countcategory8 }}</td>
                    <td>{{ item.countcategory9 }}</td>
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
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
import { BTableSimple, BThead, BTbody, BTfoot, BTr, BTh, BTd } from 'bootstrap-vue'
export default {
  components: {CustomReportFilter, BTableSimple, BThead, BTbody, BTfoot, BTr, BTh, BTd},
  data() {
    return {
      schoolyearlist: [],
      OblastList: [],
      RegionList: [],
      SportTypeTables: [],
      qualificationcategorylist: [],
      items: [],
      sportTypeClassifierlist: [],
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: false,
      isShow: false,
      index: null,
      filter: {
        isBySportTypeClassifier: false,
        sporttypeclassifierid: null,
        sporttypeclassifierid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationTypeId: 0,
        schooltypeid: 0,
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
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
    });
    RegionService.GetAll(this.lang).then((res) => {
      this.RegionList = res.data;
      if (res.data && res.data.length ) {
        this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
      }
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    QualificationCategoryService.GetAll(this.lang, false, 1).then((res) => {
      this.qualificationcategorylist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
      this.Refresh();
    });
  },
  computed: {},
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
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
          if (res.data && res.data.length ) {
            this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
          }
        });
      }
       if (this.filter.oblastid == 999) {
        this.filter.showAllRegion = true;          
      } else {
        this.filter.showAllRegion = false; 
      }
    },
    changeSportClassifier(id) {
      this.changeQuery("sporttypeclassifierid", id);
      this.Refresh();
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportReportService.GetReportAppointQualCategoryJuryCount(
        item.oblastid,
        item.regionid,
        item.organizationid,
        this.filter.schoolyearid,
        this.filter.qualificationcategoryid,
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
      SportReportService.GetReportAppointQualCategoryJuryCount(
        this.filter
      ).then((res) => {
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
      });
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
     Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportAppointQualCategoryJuryCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.organizationTypeId,
        this.filter.schooltypeid,
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
              "Число судей с квалификационной категорией.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Malaka toifasi berilgan hakamlar soni.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Малака тоифаси берилган ҳакамлар сони.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
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
      if (item.sporttypeclassifierid) {
        this.filter.sporttypeclassifierid = item.sporttypeclassifierid;
      }
      this.Refresh();
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      if (item.sporttypeclassifierid) {
        this.filter.sporttypeclassifierid = item.sporttypeclassifierid;
      }
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
      } else {
        this.Refresh();
      }
    },
    organizationChange(item) {
      this.$router.push({
        name: "GetReportAppointQualCategoryJuryList",
        query: { ...this.filter, organizationid: item.organizationid },
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
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    getGroupCount(item) {
      console.log(item);
      this.$router.push({
        name: "GetReportAppointQualCategoryJuryList",
        query: {
          oblastid: item.oblastid,
          regionid: item.regionid,
          organizationid: item.organizationid,
          schoolyearid: item.schoolyearid || this.filter.schoolyearid,
          sporttypeclassifierid: item.sporttypeclassifierid || this.sporttypeclassifierid,
          qualificationcategoryid: this.filter.qualificationcategoryid,
          date: item.date || this.filter.date,
        },
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
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
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
        // this.changeQuery('oblastid', newValue)
        this.Refresh();
      },
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        this.changeQuery("regionid", newValue);
        if (this.filter.regionid == 999) {
          this.filter.showAllOrganization = true;  
        }else{
          this.filter.showAllOrganization = false;  
        }
        this.Refresh();
      },
    },
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
  