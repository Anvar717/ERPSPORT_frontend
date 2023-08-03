<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col class="mt-2" md="2" lg="2">
            <CButton color="danger" @click="$router.go(-1)" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"><h4 class="text-center">{{ $t("MemberShipPaymentReportList") }}</h4></b-col>
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
            <b-col sm="2" md="2" lg="2">
              <label>{{ $t("OnDate") }}</label>
              <date-picker
                v-model="filter.onDate"
                style="width: 100%"
                size="sm"
                lang="ru"
                @input="changeDate('onDate')"
                :disabled-date="DisabledDateForStartdate"
                :placeholder="$t('OnDate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </b-col>
            <b-col sm="2" md="2" lg="2">
              <label>{{ $t("enddate") }}</label>
              <date-picker
                v-model="filter.endDate"
                style="width: 100%"
                size="sm"
                @input="changeDate('endDate')"
                :disabled-date="DisabledDateForEnddate"
                lang="ru"
                :placeholder="$t('enddate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </b-col>
            <b-col lg="2" md="2" sm="11" class="text-left">
              <label>{{ $t("oblast") }}</label>
              <v-select
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                  $can('RegionXTB', 'permissions')
                "
                v-model="filter.oblastId"
                :reduce="(item) => item.id"
                label="name"
                @input="changeOblast()"
                :options="OblastList"
                :placeholder="$t('ChooseBelow')"
              >
              </v-select>
            </b-col>
            <b-col lg="2" md="2" sm="11" class="text-left">
              <label>{{ $t("region") }}</label>
              <v-select
                :disabled="
                  !$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  !$can('OblastSport', 'permissions') &&
                  $can('RegionXTB', 'permissions')
                "
                v-model="filter.regionId"
                :options="RegionList"
                :reduce="(item) => item.id"
                label="name"
                :placeholder="$t('ChooseBelow')"
                @input="changeRegion()"
              >
              </v-select>
            </b-col>
            <b-col lg="3" md="3" sm="11" class="text-left">
              <label>{{ $t("organization") }}</label>
              <v-select
                v-model="filter.organizationId"
                :reduce="(item) => item.id"
                label="name"
                @input="changeOrganization()"
                :options="OrganizationList"
                :placeholder="$t('ChooseBelow')"
              >
              </v-select>
            </b-col>
            <b-col lg="1" md="1">
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
        <CCardBody>
          <b-table-simple
            class="table table-bordered"
            responsive="sm"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <b-thead>
              <b-tr>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("actions") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("OrderNumber") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("Oblast") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("Region") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("organization") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("personmembername") }}
                </b-th>
               
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("membershiptypename") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("isthoseexemptfrompayment") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("isseveralchildren") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("membershipamount") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("paymentamount") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("calculatamount") }}
                </b-th>
                <b-th style="text-align: center; vertical-align: middle">
                  {{ $t("restamount") }}
                </b-th>
              </b-tr>
            </b-thead>

            <b-tbody v-if="!Loading">
              <b-tr
                v-for="(item, i) in items"
                style="text-align: center; vertical-align: middle"
                :key="i"
              >
              <b-td class="text-center"><b-link
                  @click="Printer(item)"
                  class="mr-2"
                >
                <p class="h4 mb-2"><b-icon  icon="printer"></b-icon></p>
                </b-link></b-td>
                <b-td class="text-left">{{ indexMethod(i) }}</b-td>
                <b-td class="text-left">{{ item.oblastname }}</b-td>
                <b-td class="text-left">{{ item.regionname }}</b-td>
                <b-td class="text-left">{{ item.organizationname }}</b-td>

                <b-td class="text-left">
                  <span
                  >
                    {{ item.personname }}</span
                  >
                </b-td>
                <b-td class="text-left">{{ item.membershiptypename }}</b-td>
                <b-td
                  class="text-right"
                  :class="item.isfreepayment == 'false'?'text-danger':'text-success'"
                >
                  {{ item.isfreepayment == "false" ? "Нет" : "Да" }}
                </b-td>
                <b-td
                  class="text-right"
                  :class="item.isseveralchildren == true?'text-success':'text-danger'"
                >
                  {{ item.isseveralchildren == true ? "Да" : "Нет" }}
                </b-td>
                <b-td class="text-right">
                  {{ item.membershipamount|currency }}
                </b-td>
                <b-td class="text-right">
                  {{ item.paymentamount|currency }}
                </b-td>
                <b-td class="text-right">
                  {{item.calculatedamount|currency}}
                </b-td>
                <b-td class="text-right">
                  {{item.restamount|currency}}
                </b-td>
              </b-tr>
            </b-tbody>
            <b-tbody v-else>
              <b-tr>
                <b-td colspan="11" class="text-center">
                  <b-spinner label="Spinning"></b-spinner>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <div class="pb-4">
            <div class="pagination-number" style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="perPageSelect"
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import MemberShipService from "@/services/MemberShip.service";
import SportCircleReportService from "@/services/SportCircleReport.service";
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
export default {
  data() {
    return {
      items: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      totalRows: "",
      isBusy: true,
      Loading: false,
      PrintLoading: false,
      filter: {
        onDate: null,
        endDate: null,
        oblastId: 0,
        regionId: 0,
        organizationId: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        Search: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    Object.keys(this.filter).forEach(key => {
      if (key && this.$route.query) {
        if (key == 'onDate') {
          this.filter['onDate'] = isNaN(this.$route.query['startDate']) ? this.$route.query['startDate'] : parseInt(this.$route.query['startDate'])
        } else if (key=='oblastId') {
          this.filter['oblastId'] = isNaN(this.$route.query['oblastid']) ? this.$route.query['oblastid'] : parseInt(this.$route.query['oblastid'])
          RegionService.GetAll(this.lang, this.filter.oblastId).then((res) => {
            this.RegionList = res.data;
          });
        } else if (key=='regionId') {
          this.filter['regionId'] = isNaN(this.$route.query['regionid']) ? this.$route.query['regionid'] : parseInt(this.$route.query['regionid'])
          OrganizationService.GetAll(this.filter.oblastId, this.filter.regionId, false).then((res) => {
            this.OrganizationList = res.data;
          });
        }  else if (this.$route.query[key]) {
          this.filter[key] = isNaN(this.$route.query[key]) ? this.$route.query[key] : parseInt(this.$route.query[key])
        }
      }
    })
    if (!this.$route.query.startDate) {
      this.createDate()
    }
    this.Refresh();
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.OblastList = res.data;
    });
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
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
    Refresh() {
      this.Loading = true;
      SportCircleReportService.GetMembershipPaymentList(this.filter).then((res) => {
        if (res.data && res.data.data) {
          this.items = res.data.data.rows;
          this.totalRows = res.data.data.total;
        }
        this.Loading = false;
      });
    },
    Printer(item) {
      MemberShipService.PrintMemberShipPdf('pdf', item.personid, 'uz_latn').then(res => {
        this.forceFileDownload(res, "Абонимент");
      })
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    forceFileDownloadPrint(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
      Print() {
      this.PrintLoading = true;
        SportCircleReportService.PrintMembershipPaymentList(
          this.filter.onDate,
          this.filter.endDate,
          this.filter.oblastId,
          this.filter.regionId,
          this.filter.organizationId,
          this.filter.SortColumn,
          this.filter.OrderType,
        )
          .then((res) => {
            this.PrintLoading = false
            this.forceFileDownloadPrint(res, "PrintMembershipPaymentList");
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
            this.PrintLoading = false;
          });
          // var fileURL = window.URL.createObjectURL(
          //   new Blob([response.data], response.headers)
          // );
          // var fileLink = document.createElement("a");

          // fileLink.href = fileURL;
          // if (this.lang == "ru") {
          //   fileLink.setAttribute(
          //     "download",
          //     "Платная услуга (в разрезе абонентов).xlsx"
          //   );
          // } else if (this.lang == "uz_latn") {
          //   fileLink.setAttribute(
          //     "download",
          //     "Pullik xizmat ko‘rsatish (abonementlar kesimida).xlsx"
          //   );
          // } else {
          //   fileLink.setAttribute(
          //     "download",
          //     "Пуллик хизмат кўрсатиш (абонементлар кесимида).xlsx"
          //   );
          // }

          // fileLink.click();
        // })
        // .catch((e) => {
        //   let response = JSON.parse(e.request.response);

        //   self.makeToast(response.error, self.$t("actions.error"), "danger");
        // });
    },
    DisabledDateForStartdate(date) {
      if (!!this.filter.onDate) {
        if (!!this.filter.endDate) {
          var arr = this.filter.endDate.split(".");
          return date > new Date(arr[2], arr[1] - 1, arr[0]);
        }
        return date > new Date();
      }
    },
    DisabledDateForEnddate(date) {
      if (!!this.filter.endDate) {
        var arr = this.filter.onDate.split(".");
        return date > new Date();
      }
    },
    indexMethod(index) {
      return ((this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1)
    },
    GotoStudentCard(item) {
      this.$router.push(`/StudentCard1/id=${item.personid}`);
    },
    changeRegion() {
      this.filter.organizationId = 0;
      this.OrganizationList = [];
      OrganizationService.GetAll(
        this.filter.oblastId,
        this.filter.regionId,
        false
      ).then((res) => {
        this.OrganizationList = res.data;
      });
      this.changeQuery('regionId', this.filter.regionId)
      this.Refresh()
    },
    changeOblast() {
      this.filter.regionId = 0;
      this.changeQuery('regionId', null)
      this.changeQuery('organizationId', null)
      this.filter.organizationId = 0;
      this.OrganizationList = [];
      this.filter.RegionList = [];
      RegionService.GetAll(this.lang, this.filter.oblastId).then((res) => {
        this.RegionList = res.data;
      });
      this.changeQuery('oblastId', this.filter.oblastId)
      this.Refresh()
    },
    changeOrganization(){
      this.changeQuery('organizationId', this.filter.organizationId)
      this.Refresh()
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var mm1 = String(todaydate.getMonth() - 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.onDate = '01' + "." + '01' + "." + yyyy;
      this.filter.endDate = dd + "." + mm + "." + yyyy;
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    changeDate(key) {
      if (!!this.filter.endDate && !!this.filter.endDate) {
        var earr = this.filter.endDate.split(".");
        var sarr = this.filter.onDate.split(".");
        var eDate = new Date(earr[2], earr[1] - 1, earr[0])
        var sDate = new Date(sarr[2], sarr[1] - 1, sarr[0])
        if (eDate< sDate) {
          this.filter.onDate = this.filter.endDate
        }
      }
      this.changeQuery(key, this.filter[key])
      this.Refresh();
    },
    topcountrychange() {
      this.filter.oblastId = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionId = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastId = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
    },
    regionchange(item) {
      this.filter.regionId = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
    },
  },
  watch: {
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

<style></style>
