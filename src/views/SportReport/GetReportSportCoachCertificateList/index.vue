<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="Back" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"><h4 class="text-center">{{ $t("GetReportSportCoachCertificateList") }}</h4></b-col>
          <b-col md="2" class="text-right">
            <CButton @click="Print" color="primary" size="sm">
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
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
          <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template #cell(personname)="{ item }">
              <a
                @click="GotoEmployeeCard(item)"
                style="color: blue; cursor: pointer; text-decoration: underline"
              >
                {{ item.personname }}</a
              >
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:cell(index)="{ index }">
              <p class="m-0">
                {{ indexMethod(index) }}
              </p>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
            <template v-slot:cell(oblastname)="{ item }">
              <a>{{
                item.oblastname
              }}</a>
            </template>
            <template v-slot:cell(regionname)="{ item }">
              <a>{{
                item.regionname
              }}</a>
            </template>
            <template v-slot:foot(regionname)>
              {{ $t("Total") }}
            </template>
            <template v-slot:foot(index)>
              <span></span>
            </template>
            <template v-slot:foot(oblastname)>
              {{ $t("Total") }}
            </template>
            <template v-slot:foot(organizationname)>
              {{ $t("Total") }}
            </template>
          </b-table>
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
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportReportService from "@/services/SportReport.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SpCard from "@/components/Sport/SportCard.vue";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: {
    SpCard,
    CustomReportFilter
  },
  data() {
    return {
      sporttypeclassifierlist: [],
      schoolYearlist: [],
      organizationlist: [],
      oblastlist: [],
      regionlist: [],
      total: {},
      items: [],
      fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("region"),
          sortable: false,
          thClass: "text-left",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          sortable: false,
          thClass: "text-left",
          tdClass: "text-left",
        },
        {
          key: "personname",
          label: this.$t("personname2"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifiername"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "givenorganizationname",
          label: this.$t("GivenOrganization"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      totalRows: "",
      lang: "ru",
      isBusy: false,
      PrintLoading: false,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierid: 0,
        personName: "",
        date: "",
        Search: "",
        Sort: "",
        order: "asc",
        PageNumber: 1,
        PageLimit: 20,
        schoolyearid: 0,
        orgschoolgradeid: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        OblastName: "",
        RegionName: "",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    Object.keys(this.filter).forEach(key => {
      if (key && this.$route.query[key]) {
        this.filter[key] = isNaN(this.$route.query[key]) ? this.$route.query[key] : parseInt(this.$route.query[key])
      }
    })
    (this.filter.date = (this.$route.query.date) || this.filter.date),
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sporttypeclassifierlist = res.data;
    });
    SchoolYearService.GetAll(this.lang).then((res) => {
      this.schoolYearlist = res.data;
    });
    OblastService.GetAll("", 211, "").then((res) => {
      this.oblastlist = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
    });
    if (!!this.filter.oblastid) {
      RegionService.GetAll("", this.filter.oblastid).then((res) => {
        this.regionlist = res.data;
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
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
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
    ChangeRegion() {
      this.filter.organizationid = 0;
      this.filter.orgschoolgradeid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
      this.changeQuery('regionid', this.filter.regionid)
      this.Refresh();
    },
    Back() {
      this.$router.push({
        name: "GetReportSportCoachCertificateCount",
        query: { ...this.$route.query },
      });
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      this.filter.orgschoolgradeid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
      this.changeQuery('oblastid', this.filter.oblastid)
      this.Refresh();
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetReportSportCoachCertificateList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.personName,
        this.filter.Search,
        this.filter.Sort,
        this.filter.order,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.schoolyearid,
        this.filter.date
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.OblastName = "/" + res.data.oblastname;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.regionlist = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.OblastName = "/" + res.data.oblastname;
          this.filter.regionid = res.data.regionid;
          this.filter.RegionName = "/" + res.data.regionname;
          OrganizationService.GetAll(
            this.filter.oblastid,
            this.filter.regionid,
            false
          ).then((res) => {
            this.organizationlist = res.data;
          });
        }
      });
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportSportCoachCertificateList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.schoolyearid,
        this.filter.date,
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
              "7.1. Реестр сертифицированных тренеров.xlsx"
            );
          } else if (this.lang == "uz_cyrl") {
            fileLink.setAttribute(
              "download",
              "Малака сертификати берилган тренерлар реестри.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              " Malaka toifasi berilgan trenerlar reyestri.xlsx"
            );
          }

          fileLink.click();
          this.PrintLoading = false;
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          this.PrintLoading = false;

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.regionid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
      this.Refresh();
      this.isShow = false;
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
      this.Refresh();
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
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
      GotoEmployeeCard(item) {
      this.$router.push({
        name: "EmployeeCard",
        query: {
          docseries: "",
          docnumber: "",
          pinfl: item.pinfl,
        },
      });
    },
    ChangeSort(columnName) {
      this.filter.Sort = columnName;
      if (this.filter.order == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.order = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.order = "asc";
      }
      this.Refresh();
    },
    indexMethod(index) {
      return ((this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1)
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue) {
        this.filter.PageNumber = newValue;
        this.Refresh();
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
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
  