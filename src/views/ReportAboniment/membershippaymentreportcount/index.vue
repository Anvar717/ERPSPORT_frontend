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
              {{ $t("MemberShipPaymentReportCount") }}
            </h4></b-col
          >
          <b-col md="2">
            <CButton
              @click="Print"
              class="float-right"
              color="primary"
              size="sm"
            >
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
                  @input="changeDate('startDate')"
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
                  @input="changeDate('endDate')"
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
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                  $can('RegionXTB', 'permissions')
                "
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast"
              ></v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
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
                    v-if="
                      filter.oblastid === 0 ||
                      filter.oblastid === null ||
                      filter.oblastid === 999
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Oblast") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 ||
                        filter.regionid === null ||
                        filter.regionid === 999) &&
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
                      (filter.regionid === 0 ||
                        filter.regionid === null ||
                        filter.regionid === 999) &&
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
                    {{ $t("AbonimentCount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("visitcount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("paymentamount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("culatedamount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("isthoseexemptfrompayment") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("isseveralchildren") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("restamount") }}
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
                    v-if="
                      filter.oblastid === 0 ||
                      filter.oblastid === null ||
                      filter.oblastid === 999
                    "
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
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null)
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
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="organizationChange(item, i)"
                      >{{ item.organizationname }}</a
                    >
                  </td>
                  <td>
                    {{ item.membercount | currency }}
                  </td>
                  <td>
                    {{ item.ineventcount | currency }}
                  </td>
                  <td>
                    {{ item.payedamount | currency }}
                  </td>
                  <td>
                    {{ item.calculatedamount | currency }}
                  </td>
                  <td>
                    {{ item.freemembercount | currency }}
                  </td>
                  <td>
                    {{ item.sevchildmembercount | currency }}
                  </td>
                  <td>
                    {{ item.restamount | currency }}
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
                <tr class="text-center font-weight-bold">
                  <td
                    :colspan="
                      filter.oblastid === 999 || filter.regionid === 999 ? 3 : 2
                    "
                  >
                    {{ $t("Total") }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("membercount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("ineventcount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("payedamount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("calculatedamount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("freemembercount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("sevchildmembercount") | currency }}
                  </td>
                  <td style="white-space: nowrap">
                    {{ calculateAllCounts("restamount") | currency }}
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
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportReportService from "@/services/SportReport.service";
import SportCircleReportService from "@/services/SportCircleReport.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    CustomDatePicker,
  },
  data() {
    return {
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
      isBusy: false,
      todayDate: null,
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
      filter: {
        oblastid: 0,
        regionid: 0,
        startDate: null,
        endDate: null,
        OblastName: "",
        RegionName: "",
        showAllRegion: false,
        showAllOrganization: false,
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
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
    Object.keys(this.filter).forEach((key) => {
      if (key && this.$route.query[key]) {
        this.filter[key] = isNaN(this.$route.query[key])
          ? this.$route.query[key]
          : parseInt(this.$route.query[key]);
      }
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({
        id: 999,
        countryid: 999,
        name: this.$t("seeAllDistricts"),
      });
    });
    if (!this.$route.query.startDate) {
      this.createDate();
    }
    this.Refresh();
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
      this.todayDate = dd + "." + mm + "." + yyyy;
      this.filter.startDate = "01" + "." + "01" + "." + "2023";
      this.filter.endDate = dd + "." + mm + "." + yyyy;
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
      }
      this.Refresh();
    },
    regionchange(item, i) {
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
        this.ChangeOblast();
      }
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      if (item.sporttypeclassifierid) {
      }
      this.Refresh();
    },
    organizationChange(item) {
      this.$router.push({
        name: "membershippaymentreportlist",
        query: { ...this.filter, organizationId: item.organizationid },
      });
    },
    DisabledDateForStartdate(date) {
      if (!!this.filter.startDate) {
        if (!!this.filter.endDate) {
          var arr = this.filter.endDate.split(".");
          return date > new Date(arr[2], arr[1] - 1, arr[0]);
        }
        return date > new Date();
      }
    },
    DisabledDateForEnddate(date) {
      if (!!this.filter.endDate) {
        var arr = this.filter.startDate.split(".");
        return date > new Date();
      }
    },
    changeDate(key) {
      if (!!this.filter.endDate && !!this.filter.endDate) {
        var earr = this.filter.endDate.split(".");
        var sarr = this.filter.startDate.split(".");
        var eDate = new Date(earr[2], earr[1] - 1, earr[0]);
        var sDate = new Date(sarr[2], sarr[1] - 1, sarr[0]);
        if (eDate < sDate) {
          this.filter.startDate = this.filter.endDate;
        }
      }
      this.changeQuery(key, this.filter[key]);
      this.Refresh();
    },
    Print() {
      (this.PrintLoading = true),
        SportCircleReportService.PrintMemberShipPaymentCount(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.startDate,
          this.filter.endDate,
          this.filter.showAllRegion,
          this.filter.showAllOrganization
        )
          .then((res) => {
            (this.PrintLoading = false),
              this.forceFileDownload(res, "PrintMemberShipPaymentCount");
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
      let newValue = this.filter.oblastid;
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
    },
    changeSportClassifier(id) {
      this.Refresh();
    },
    Refresh() {
      this.Loading = true;
      SportCircleReportService.GetMemberShipPaymentCount(this.filter).then(
        (res) => {
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
        }
      );
    },
    calculateAllCounts(key) {
      let total = 0;
      this.items.forEach((el) => {
        total = total + el[key];
      });
      return total;
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
  },
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
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
            this.filter.showAllRegion = false;
            this.RegionList = [];
          }
        }
        this.changeQuery("oblastid", newValue);
        this.Refresh();
      },
    },
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
  },
};
</script>

<style lang="scss" scoped>
.success {
  background-color: rgb(200, 238, 247);
}
</style>
