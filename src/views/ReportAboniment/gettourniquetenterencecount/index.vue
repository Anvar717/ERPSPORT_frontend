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
          <b-col md="8"><h4 class="text-center">{{ $t("GetTourniquetEnterenceCount") }}</h4></b-col>
          <b-col md="2">
            <CButton @click="Print" class="float-right" color="primary" size="sm">
              <b-icon icon="printer" v-if="!PrintLoading"> </b-icon>
                      <b-spinner v-if="PrintLoading" small></b-spinner>
              {{ $t("Print") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col md="2" sm="12" class="achievement-input">
                <div class="">
                  <label for>{{ $t("startDate") }}</label>
                  <custom-date-picker
                    v-model="filter.startDate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    :disabled-date="DisabledDateForStartdate"
                  ></custom-date-picker>
                </div>
              </b-col>
              <b-col md="2" sm="12" class="achievement-input">
                <div class="">
                  <label for>{{ $t("endDate") }}</label>
                  <custom-date-picker
                    v-model="filter.endDate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('enddate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    :disabled-date="DisabledDateForEnddate"
                  ></custom-date-picker>
                </div>
              </b-col>
            <b-col sm="12" md="3" class="achievement-input">
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
            <b-col sm="12" md="3" class="achievement-input">
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
                class="mr-2"
                style="width: 100%"
              ></v-select>
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
          </b-row>
        </CCardHeader>
        <div class="table-container" style="padding: 5px">
          <div class="mobileStyle">
            <table class="table table-bordered table-striped" >
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
                    v-if="filter.oblastid === 0 || filter.oblastid === null || filter.oblastid === 999"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Oblast") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null || filter.regionid === 999) &&
                      !filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null || filter.regionid === 999) &&
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
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("TotalEntered") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Employee") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("StudentReports") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Aboniments") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Guests") }}
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
                    v-if="filter.oblastid === 0 || filter.oblastid === null || filter.oblastid === 999"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a href="javascript:void(0)" @click="oblastchange(item, i)">{{
                      item.oblastname
                    }}</a>
                  </td>
                  <td
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null ) || filter.regionid === 999
                    "
                    style="text-align: left; vertical-align: middle"
                  >
                    <a href="javascript:void(0)" @click="regionchange(item, i)">{{
                      item.regionname
                    }}</a>
                  </td>
                  <td
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: left; vertical-align: middle"
                  >
                   {{ item.organizationname }}
                  </td>
                   
                  <td>
                    {{ item.ineventcount | currency }}
                  </td>
                  <!-- <a href="javascript:void(0)" @click="ineventcount()">
                    {{ item.ineventcount | currency }} </a> -->
                  <td @click="employeeineventcount(item)" style="color:blue; cursor: pointer;">
                    {{
                      $options.filters.currency(item.employeeineventcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td @click="sportsmanineventcount(item)" style="color:blue;cursor: pointer;">
                    {{
                      $options.filters.currency(item.sportsmanineventcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td @click="membershipineventcount(item)" style="color:blue;cursor: pointer;">
                    {{
                      $options.filters.currency(item.membershipineventcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td @click="guestineventcount(item)" style="color:blue;cursor: pointer;">
                    {{
                      $options.filters.currency(item.guestineventcount, {
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
                  ">
                  <td :colspan="(filter.oblastid === 999 || filter.regionid === 999)?3:2">{{ $t("Total") }}</td>
                  <td v-if="activeTab==1"></td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.ineventcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.ineventcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.employeeineventcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.employeeineventcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sportsmanineventcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.sportsmanineventcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.membershipineventcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.membershipineventcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.guestineventcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.guestineventcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
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
import SportCircleReportService from "@/services/SportCircleReport.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    CustomDatePicker
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
        ineventcount: 0,
        employeeineventcount: 0,
        sportsmencountbygroup: 0,
        sportsmanineventcount: 0,
        membershipineventcount: 0,
        guestineventcount: 0,
        thirdgroup: 0,
        fourthgroup: 0,
        fifthgroup: 0,
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
          key: "ineventcount",
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
          key: "sportsmanineventcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Murabbiy"),
        },
        {
          key: "membershipineventcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("membershipineventcount"),
        },
        {
          key: "guestineventcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("guestineventcount"),
        },
        {
          key: "viewsportsmen",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Student"),
        },
      ],
      activeTab:0,
      filter: {
        oblastid: 0,
        regionid: 0,
        startDate: "",
        startdate: "",
        endDate: "",
        enddate:"",
        OblastName: "",
        RegionName: "",
        showAllRegion: false,
        showAllOrganization: false,
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    Object.keys(this.filter).forEach(key => {
      if (key && this.$route.query[key]) {
        this.filter[key] = isNaN(this.$route.query[key]) ? this.$route.query[key] : parseInt(this.$route.query[key])
      }
    })
    if (this.$route.query.oblastid) {
      this.filter.oblastid=parseInt(this.$route.query.oblastid)
      if (this.filter.oblastid ==999) {
        this.filter.showAllRegion = true;          
      }
    }
    if (this.$route.query.regionid) {
      this.filter.regionid=parseInt(this.$route.query.regionid)
      if (this.filter.regionid ==999) {
        this.filter.showAllOrganization = true;          
      }
    }
    if (this.$route.query.activeTab) {
      this.activeTab = parseInt(this.$route.query.activeTab)
      this.filter.isBySportTypeClassifier = this.activeTab?true:false;
    }
    if (
      !!this.$route.query.startdate ||
      !!this.$route.query.enddate
    ) {
      this.filter.startDate = this.$route.query.startdate;
      this.filter.endDate = this.$route.query.enddate;
    } else {
      this.createDate()
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
    this.Refresh(); 
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
    oblastchange(item, i) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid
      }
      this.Refresh();
    },
    regionchange(item, i) {
      if (this.filter.showAllRegion) {
       this.changeQuery("regionid", item.regionid);
       this.filter.oblastid = item.oblastid;
       this.ChangeOblast()
     }
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid
      }
      this.Refresh();
    },
    organizationChange(item) {
      this.$router.push({name:'SportStudentManageList', query:{...this.filter, organizationid: item.organizationid, SportTypeClassifierId:item.sporttypeclassifierid}})
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
        },
      });
    },
      Print() {
        (this.PrintLoading = true),
        SportCircleReportService.PrintTourniquetEnterenceCount(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.startDate,
          this.filter.endDate,
          this.filter.showAllRegion,
          this.filter.showAllOrganization,
        )
          .then((res) => {
            (this.PrintLoading = false),
              this.forceFileDownload(res, "PrintTourniquetEnterenceCount");
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
            this.PrintLoading = false;
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
      this.filter.regionid = 0;
      this.filter.RegionName = "";
       let newValue = this.filter.oblastid
      if (newValue) {
        if (newValue == 999) {
          this.filter.showAllRegion = true;          
        } else {
          this.filter.showAllRegion = false;          
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
            if (res.data && res.data.length) {
                this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
            }
          });
        }
      }
    },
    changeSportClassifier(id) {
      this.changeQuery('sportTypeClassifierId', id)
      this.Refresh()
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportCircleReportService.GetTourniquetEnterenceCount(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.startDate,
          this.filter.endDate,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit,
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
      SportCircleReportService.GetTourniquetEnterenceCount({...this.filter, lang: this.lang}).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.ChangeOblast();
          this.filter.OblastName = " / " + res.data.oblastname;
        }
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0) {
          this.filter.RegionName = " / " + res.data.regionname;
        }
        this.totalRows = res.data.total;
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var ineventcount = 0;
      var employeeineventcount = 0;
      var sportsmencountbygroup = 0;
      var sportsmanineventcount = 0;
      var membershipineventcount = 0;
      var guestineventcount = 0;
      var thirdgroup = 0;
      var fourthgroup = 0;
      var fifthgroup = 0;
      item.forEach(function (item) {
        ineventcount = ineventcount + item.ineventcount;
        employeeineventcount = employeeineventcount + item.employeeineventcount;
        sportsmencountbygroup = sportsmencountbygroup + item.sportsmencountbygroup;
        sportsmanineventcount = sportsmanineventcount + item.sportsmanineventcount;
        membershipineventcount = membershipineventcount + item.membershipineventcount;
        guestineventcount = guestineventcount + item.guestineventcount;
        thirdgroup = thirdgroup + item.thirdgroup;
        fourthgroup = fourthgroup + item.fourthgroup;
        fifthgroup = fifthgroup + item.fifthgroup;
      });
      this.bottomrow = {
        ineventcount: ineventcount,
        employeeineventcount: employeeineventcount,
        sportsmencountbygroup: sportsmencountbygroup,
        sportsmanineventcount: sportsmanineventcount,
        membershipineventcount: membershipineventcount,
        guestineventcount: guestineventcount,
        thirdgroup: thirdgroup,
        fourthgroup: fourthgroup,
        fifthgroup: fifthgroup,
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
    employeeineventcount(item) {
        this.$router.push({
          name: "personsportcirclereport",
          query: {
            oblastid: item.oblastid || this.filter.oblastid,
            regionid: item.regionid || this.filter.regionid,
            organizationid: item.organizationid || this.filter.organizationid,
            startdate: this.filter.startDate,
            enddate: this.filter.endDate,
            OblastName: this.filter.OblastName,
            RegionName: this.filter.RegionName,
            PageNumber: this.filter.PageNumber,
            PageLimit: this.filter.PageLimit,
          },
        });
      },
      sportsmanineventcount(item) {
        this.$router.push({
          name: "studentsportcirclereport",
          query: {
            oblastid: item.oblastid || this.filter.oblastid,
            regionid: item.regionid || this.filter.regionid,
            organizationid: item.organizationid || this.filter.organizationid,
            startdate: this.filter.startDate,
            enddate: this.filter.endDate,
            OblastName: this.filter.OblastName,
            RegionName: this.filter.RegionName,
            PageNumber: this.filter.PageNumber,
            PageLimit: this.filter.PageLimit,
          },
        });
      },
      membershipineventcount(item) {
        this.$router.push({
          name: "sportcirclereport",
          query: {
            oblastid: item.oblastid || this.filter.oblastid,
            regionid: item.regionid || this.filter.regionid,
            organizationid: item.organizationid || this.filter.organizationid,
            startdate: this.filter.startDate,
            enddate: this.filter.endDate,
            OblastName: this.filter.OblastName,
            RegionName: this.filter.RegionName,
            PageNumber: this.filter.PageNumber,
            PageLimit: this.filter.PageLimit,
          },
        });
      },
      guestineventcount(item) {
        this.$router.push({
          name: "GetTourniquetDevicelogByGuest",
          query: {
            oblastid: item.oblastid || this.filter.oblastid,
            regionid: item.regionid || this.filter.regionid,
            organizationid: item.organizationid || this.filter.organizationid,
            startdate: this.filter.startDate,
            enddate: this.filter.endDate,
            OblastName: this.filter.OblastName,
            RegionName: this.filter.RegionName,
            PageNumber: this.filter.PageNumber,
            PageLimit: this.filter.PageLimit,
          },
        });
      },
    getOblastOfRegion(id) {
      let obj = null
      if (this.RegionList.length) {
        obj = this.RegionList.find(el=>el.id == id)
      }
      return obj
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
              this.filter.regionid=this.$route.query.regionid
            }
          } else {
            this.filter.regionid = 0;
            this.changeQuery('regionid', null)
            this.filter.showAllRegion = false
            this.RegionList = []
          }
        }
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
          }
          if (newValue == 999) {
            this.filter.showAllOrganization = true;  
          }else{
            this.filter.showAllOrganization = false;  
          }
        }else{
          this.filter.showAllOrganization = false;  
        }
        this.changeQuery('regionid', newValue)
        this.Refresh();
      },
    },
    "filter.startDate": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.changeQuery('startDate', newValue)
        this.Refresh();
      },
    },
    "filter.endDate": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.changeQuery('endDate', newValue)
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
