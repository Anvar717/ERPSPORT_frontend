<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1 ">
          <b-col lg="3" class="mb-c-2">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col lg="6">
            <h3 class="text-center">
              {{ $t("GetReportAppointQualCategoryInstructorCount") }}
            </h3>
          </b-col>
          <b-col lg="3">
            <div class="w-100 float-right text-right ">
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
                @clear="clearFilter"
                isCollapse
              ></custom-report-filter>
            </b-card>
        </CCardHeader>
        <CCardBody>
          <b-tabs variant="tabs" v-model="activeTab" @input="onTabChange">
            <!-- <b-tab :title="$t('byRegion')" /> -->
            <!-- <b-tab :title="$t('bySportTypes')" /> -->
          </b-tabs>
          <div class="table-container" style="padding: 5px">
            <div class="mobileStyle">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th style="text-align: center; vertical-align: middle" rowspan="2">
                      {{ $t("OrderNumber") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle"
                      v-if="(filter.oblastid === 0 || filter.oblastid === null) || filter.oblastid === 999" rowspan="2">
                      {{ $t("sportPlaceName") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" v-if="(filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool) || filter.regionid === 999" rowspan="2">
                      {{ $t("regionname") }}
                    </th>
                    <th rowspan="2" v-if="filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool" style="text-align: center; vertical-align: middle">
                      {{ $t("organizationname") }}
                    </th>
                    <th rowspan="2" v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: center; vertical-align: middle">
                      {{ $t("organizationname") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" rowspan="2">
                      {{ $t("InstrcutorCount") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" rowspan="2">
                      {{ $t("InstrcutorList") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" colspan="3">
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
                  <tr v-for="(item, i) in items" :class="i == index ? 'success' : ''"
                    style="text-align: center; vertical-align: middle" :key="i">
                    <td>
                      {{ i + 1 }}
                    </td>
                    <td v-if="!filter.oblastid || filter.oblastid === 999"
                      style="text-align: left; vertical-align: middle">
                      <a href="javascript:void(0)" @click="oblastchange(item)">{{
                        item.oblastname
                      }}</a>
                    </td>
                    <td v-if="(filter.oblastid > 0 && !filter.regionid) || filter.regionid === 999"
                      style="text-align: left; vertical-align: middle">
                      <a href="javascript:void(0)" @click="regionchange(item)">{{
                        item.regionname
                      }}</a>
                    </td>
                    <td v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: left; vertical-align: middle">
                      <a href="javascript:void(0)" @click="organizationChange(item, i)">{{ item.organizationname }}</a>
                    </td>
                    <td>
                      {{ item.totalcount | currency }}
                    </td>
                    <td>
                      {{ item.countcategory | currency }}
                    </td>
                    <td>{{ item.countcategory3 | currency }}</td>
                    <td>{{ item.countcategory2 | currency }}</td>
                    <td>{{ item.countcategory1 | currency }}</td>
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
                  <tr style="
                      text-align: center;
                      vertical-align: middle;
                      font-weight: bold;
                    ">
                    <td colspan="2">{{ $t("Total") }}</td>
                    <td v-if="activeTab == 1"></td>
                    <td style="white-space: nowrap">
                      {{
                        bottomrow.totalcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.totalcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td style="white-space: nowrap">
                      {{
                        bottomrow.countcategory == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.countcategory, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td style="white-space: nowrap">
                      {{
                        bottomrow.countcategory3 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.countcategory3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td style="white-space: nowrap">
                      {{
                        bottomrow.countcategory2 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.countcategory2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td style="white-space: nowrap">
                      {{
                        bottomrow.countcategory1 == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.countcategory1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
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
                    <th style="text-align: center; vertical-align: middle" rowspan="2">
                      {{ $t("OrderNumber") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" rowspan="2">
                      {{ $t("Sport turi") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" rowspan="2">
                      {{ $t("Trenerlar soni") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" rowspan="2">
                      {{ $t("Toifali trenerlar soni") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle" colspan="3">
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
                  <tr v-for="(item, i) in SportTypeTables" style="text-align: center; vertical-align: middle" :key="i">
                    <td>
                      {{ i + 1 }}
                    </td>

                    <!-- <td>
                      {{ item.sporttypeclassifiername }}
                    </td> -->
                    <td>
                      {{ item.totalcount }}
                    </td>
                    <td>
                      {{ item.countcategory }}
                    </td>
                    <td>{{ item.countcategory3 }}</td>
                    <td>{{ item.countcategory2 }}</td>
                    <td>{{ item.countcategory1 }}</td>
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
      items: [],
      sportTypeClassifierlist: [],
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: false,
      isShow: false,
      index: null,
      organizationtypelist: [],
      schooltypelist: [],
      filter: {
        isBySportTypeClassifier: false,
        sporttypeclassifierid: null,
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        schoolyearid: 0,
        OblastName: "",
        organizationtypeid: 0,
        schoolTypeId: 0,
        genderid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        date: "",
        RegionName: "",
      },
      bottomrow: {
        totalcount: 0,
        countcategory: 0,
        countcategory2: 0,
        countcategory1: 0,
        countcategory3: 0,
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
    if (this.filter.regionid == 999) {
      this.filter.showAllOrganization = true;
    }
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({ id: 999, countryid: 999, name: this.$t("seeAllDistricts") })
    });
    if (this.$route.query.oblastid) {
      RegionService.GetAll(this.lang, this.$route.query.oblastid).then((res) => {
        this.RegionList = res.data;
        if (res.data && res.data.length) {
          this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid, name: this.$t("seeAllOblastOrganizations") })
        }
      });
    }
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
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
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
          if (res.data && res.data.length) {
            this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid, name: this.$t("seeAllOblastOrganizations") })
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
      this.changeQuery('sporttypeclassifierid', id)
      this.Refresh()
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportReportService.GetReportAppointQualCategoryInstructorCount(
        item.oblastid,
        item.regionid,
        item.organizationid,
        this.filter.schoolyearid,
        this.lang
      ).then((res) => {
        this.isBusy = false;
        if (item.oblastid > 0 && item.regionid > 0 && item.organizationid > 0) {
          this.tablename = item.organizationname;
        } else if (
          item.oblastid > 0 &&
          item.regionid > 0
        ) {
          this.tablename = item.regionname;
        } else if (item.oblastid > 0) {
          this.tablename = item.oblastname;
        }
        this.SportTypeTables = res.data.data;
      });
    },
    Refresh() {
      this.Loading = true;
      SportReportService.GetReportAppointQualCategoryInstructorCount(this.filter).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        if (res.data.oblastid || res.data.oblastId) {
          this.filter.oblastid = res.data.oblastid || res.data.oblastId;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
            if (res.data && res.data.length) {
              this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid, name: this.$t("seeAllOblastOrganizations") })
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
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportAppointQualCategoryInstructorCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationtypeid,
        this.filter.schoolTypeId,
        this.filter.schoolyearid,
        this.filter.showAllRegion,
        this.filter.showAllOrganization,
        this.filter.genderid,
        this.filter.date,
      )
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
              "Число инструкторов-методистов с квалификационной категорией.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              " Malaka toifasi berilgan instruktor - metodistlar soni.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              " Малака тоифаси берилган инструктор - методистлар сони.xlsx"
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
      this.Refresh()
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
      } else {
        this.Refresh();
      }
    },
    organizationChange(item) {
      this.$router.push({ name: 'GetReportAppointQualCategoryInstrcutorList', query: { ...this.filter, organizationid: item.organizationid } })
    },
    calculateTotal(item) {
      var totalcount = 0;
      var countcategory = 0;
      var countcategory3 = 0;
      var countcategory2 = 0;
      var countcategory1 = 0;
      item.forEach(function (item) {
        totalcount = totalcount + item.totalcount;
        countcategory = countcategory + item.countcategory;
        countcategory3 = countcategory3 + item.countcategory3;
        countcategory2 = countcategory2 + item.countcategory2;
        countcategory1 = countcategory1 + item.countcategory1;
      });
      this.bottomrow = {
        totalcount: totalcount,
        countcategory: countcategory,
        countcategory3: countcategory3,
        countcategory2: countcategory2,
        countcategory1: countcategory1,
      };
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
      let obj = null
      if (this.RegionList.length) {
        obj = this.RegionList.find(el => el.id == id)
      }
      return obj
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    getGroupCount(item) {
      console.log(item);
      this.$router.push({
        name: "GetReportAppointQualCategoryInstrcutorList",
        query: {
          oblastid: item.oblastid || this.filter.oblastid,
          regionid: item.regionid || this.filter.regionid,
          organizationid: item.organizationid || this.filter.organizationid,
          schoolyearid: this.filter.schoolyearid,
          sporttypeclassifierid: item.sporttypeclassifierid,
          date: this.filter.date,
        },
      });
    },
    onTabChange(val) {
      if (val == 1) {
        this.filter.isBySportTypeClassifier = true;
      } else {
        this.filter.isBySportTypeClassifier = false;
      }
      this.changeQuery('activeTab', val)

      this.Refresh()
    }
  },
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
          if (this.$route.query && this.$route.query.regionid) {
            if (this.RegionList.length) {
              this.filter.regionid = 0;
              this.changeQuery('regionid', null)
            } else {
              this.filter.regionid = this.$route.query.regionid
            }
          } else {
            this.filter.regionid = 0;
            this.changeQuery('regionid', null)
          }
        } else {
          this.filter.regionid = 0;
          this.changeQuery('regionid', null)
        }
        this.changeQuery('oblastid', newValue)
        this.Refresh();
      },
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.changeQuery('regionid', newValue)
        if (this.filter.regionid == 999) {
          this.filter.showAllOrganization = true;
        } else {
          this.filter.showAllOrganization = false;
        }
        this.Refresh();
      },
    },
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
