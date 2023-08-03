<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head mt-3 mx-1">
          <div class="w-100 text-center">
            <h3>{{ $t("AnthropomentricReportBySportsmen") }}</h3>
          </div>
          <!-- <div class="btn_list w-100 text-lg-right mt-3 mr-3">
            <CButton color="danger" @click="$router.go(-1)" size="sm"></CButton>
            </div> -->
          <!-- <div class="text-right">
            <CButton color="danger" @click="Back()" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </div> -->
        </div>
        <CCardHeader>
          <CRow class="form-group">
           <CCol lg="4" md="4" sm="12" class="text-left">
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>
            <CCol lg="4" md="4" sm="12"></CCol>
            <CCol>
              <div class="d-flex justify-content-end">
                <div class="mr-2">
                 <b-button variant="primary" size="sm" @click="OpenFiltModal"
                    ><b-icon icon="funnel-fill"></b-icon>
                  </b-button>
                </div>
                <div class="mr-2">
                <CButton @click="Print" color="primary"  size="sm">
                  <b-icon icon="printer" v-if="!PrintLoading"></b-icon>
                  <b-spinner v-if="PrintLoading" small></b-spinner>
                  &nbsp; {{ $t("Print") }}
                </CButton>
              </div>
                <div class="mr-2">
                  <CButton
                    color="danger"
                    class="float-sm-right"
                    @click="$router.push('/')"
                    size="sm"
                  >
                    <b-icon icon="arrow-right"></b-icon>
                    {{ $t("back") }}
                  </CButton>
                </div>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <b-button-group @click="Refresh" size="sm" class="sportTitle-btn-group">
                <b-button
                  @click="filter.existsanthropometric = null"
                  :variant="
                    filter.existsanthropometric == null ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("All") }}
                </b-button>
                <b-button
                  @click="filter.existsanthropometric = false"
                  :variant="
                    filter.existsanthropometric == false ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("notexistsanthropometric") }}
                </b-button>
                <b-button
                  @click="filter.existsanthropometric =  true"
                  :variant="
                    filter.existsanthropometric == true ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("isexistsanthropometric") }}
                </b-button>
              </b-button-group>
            </CCol>
          </CRow>
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
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template #cell(personname)="{ item }">
              <a
                @click="GotoStudentCard(item)"
                style="color: blue; cursor: pointer; text-decoration: underline"
              >
                {{ item.personname }}</a
              >
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center" v-if="item.anthropometricid != null">
                <b-button
                  size="sm"
                  variant="primary"
                  @click="View(item)"
                  class="mr-2"
                >
                  {{ $t("View") }}
                </b-button>
              </div>
            </template>
            <template #cell(existsanthropometric)="{ item }">
              <div v-if="lang == 'ru'">
                <b-badge :variant="getItemColor(item.existsanthropometric)">{{
                  item.existsanthropometric ? "Да" : "Нет"
                }}</b-badge>
              </div>
              <div v-if="lang == 'uz_latn'">
                <b-badge :variant="getItemColor(item.existsanthropometric)">{{
                  item.existsanthropometric ? "Ha" : "Yoq"
                }}</b-badge>
              </div>
              <div v-if="lang == 'uz_cyrl'">
                <b-badge :variant="getItemColor(item.existsanthropometric)">{{
                  item.existsanthropometric ? "Ҳа" : "Йўқ"
                }}</b-badge>
              </div>
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
                  v-model="filter.perPage"
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
                :per-page="filter.perPage"
                align="right"
                size="sm"
                class="my-0 mobile-pagination"
              ></b-pagination>
            </div>
          </div>
          <b-modal
            v-model="FilterModal"
            hide-footer
            size="lg"
            no-close-on-backdrop
            :title="$t('Filters')"
          >
            <custom-filter
              :filter="filter"
              @search="Search"
              v-model="filter"
              @clear="clearFilter"
              @close="FilterModal = false"
            ></custom-filter>
          </b-modal>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import AnthropometricService from "@/services/Anthropometric.service";
import CustomFilter from "../../../components/CustomFilter.vue";

export default {
  components: { CustomFilter },
  data() {
    return {
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      fields: [
        // {
        //   key: "actions",
        //   label: this.$t("actions"),
        //   sortable: false,
        //   thClass: "text-center",
        //   tdClass: "text-center",
        // },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifiername"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportgroupname",
          label: this.$t("sportgroup"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "existsanthropometric",
          label: this.$t("existsanthropometric"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      items: [],
      totalRows: "",
      lang: "ru",
      isBusy: false,
      PrintLoading: false,
       FilterModal: false,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierid: 0,
        sportgroupid: 0,
        existsanthropometric: null,
        Search: "",
        Sort: "",
        order: "asc",
        PageNumber: 1,
        perPage: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    (this.filter.oblastid =
      parseInt(this.$route.query.oblastid) || this.filter.oblastid),
      (this.filter.regionid =
        parseInt(this.$route.query.regionid) || this.filter.regionid),
      (this.filter.organizationid =
        parseInt(this.$route.query.orgid) || this.filter.organizationid),
      OblastService.GetAll("", 211, "").then((res) => {
        this.oblastlist = res.data;
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
      return (this.filter.PageNumber - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.totalRows < this.filter.perPage) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.perPage > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.perPage;
        }
      }
    },
  },
  methods: {
    ChangeRegion() {
      this.filter.organizationid = 0;
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
    clearFilter(){
    this.filter = {
      oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierid: 0,
        sportgroupid: 0,
        existsanthropometric: null,
        Search: "",
        Sort: "",
        order: "asc",
        PageNumber: 1,
        perPage: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
    };
    this.Refresh()
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    OpenFiltModal() {
      this.FilterModal = true;
    },
    Search() {
       this.FilterModal = false;
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Aktiv"
        ? "success"
        : text === "Passiv"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : text === true
        ? "success"
        : text === false
        ? "danger"
        : "primary";
    },
    View(item) {
      this.$router.push({
        name: "ViewAnthropometric",
        params: {
          id: item.anthropometricid,
        },
        query: {
          isremain: false,
          type: 2,
        },
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
    Print() {
      this.PrintLoading = true,
      AnthropometricService.PrintAnthropomentricReportBySportsmen(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.sportgroupid,
        this.filter.existsanthropometric,
        // this.filter.Search,
        // this.filter.Sort,
        // this.filter.order,
        // this.filter.PageNumber,
        // this.filter.perPage
      )
        .then((res) => {
          this.PrintLoading = false,
          this.forceFileDownload(res, "PrintAnthropomentricReportBySportsmen");
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
    Refresh() {
      this.isBusy = true;
      AnthropometricService.GetAnthropomentricReportBySportsmen(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.sportgroupid,
        this.filter.existsanthropometric,
        this.filter.Search,
        this.filter.Sort,
        this.filter.order,
        this.filter.PageNumber,
        this.filter.perPage
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.regionlist = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.regionlist = res.data;
          });
          if (!!this.filter.regionid) {
            OrganizationService.GetAll(
              this.filter.oblastid,
              this.filter.regionid
            ).then((res) => {
              this.organizationlist = res.data;
            });
          }
        }
      });
    },
    GotoStudentCard(item) {
      this.$router.push(`/StudentCard1/id=${item.personid}`);
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
    Back() {
      this.$router.push({
        name: "GetAnthropometricCount",
        query: {
          oblastid: this.filter.oblastid,
          regionid: this.filter.regionid,
          orgid: this.filter.organizationid,
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
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue) {
         
        this.filter.PageNumber = newValue;
        this.Refresh();
      },
    },
    "filter.perPage": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
  },
};
</script>
  