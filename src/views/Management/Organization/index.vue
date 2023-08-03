<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col lg="12">
            <h3 class="text-center">{{ $t("Organization") }}</h3>
          </b-col>
      
        </b-row>
        <CCardHeader>         
          <b-row >
            <CCol lg="4" md="4" sm="11" class="text-left achievement-input">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
          <b-col class="text-lg-right mt-3">
            <!-- <div class="mr-2"> -->
              <b-button
                :variant="cache_filters === false ? 'primary' : 'danger'"
                size="sm"
                class="mr-2"
                v-b-toggle.collapse-1
                ><b-icon icon="funnel-fill"></b-icon>
              </b-button>
            <!-- </div> -->
            <CButton
              v-if="$can('OrganizationEdit', 'permissions')"
              @click="Create"
              color="primary"
              variant="outline"
              class="mr-2"
              size="sm"
            >
              <b-icon icon="plus"> </b-icon>
              &nbsp; {{ $t("Create") }}
            </CButton>
            <CButton
              @click="Print"
              color="primary"
              variant="outline"
              class="mr-2"
              size="sm"
            >
              <b-icon v-if="!PrintLoading" icon="printer"> </b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Print") }}
            </CButton>
            <CButton
              color="danger"
              class="float-sm-right mr-2"
              @click="$router.push('/')"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>

          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <custom-filter-collapse
                :filter="filter"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-filter-collapse>
            </b-card>
          </b-collapse>
          <!-- <CRow class="form-group">
            <CCol lg="12" md="12" sm="12" class="text-left mt-2">
              <CRow class="">
                <CCol lg="4" sm="12" class="achievement-input">
                  <div class="mr-2" style="width: 100%">
                    <v-select
                      :options="OblastList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('oblast')"
                      label="name"
                      v-model="filter.oblastid"
                      @input="ChangeOblast"
                    ></v-select>
                  </div>
                </CCol>
                <CCol lg="4" sm="12" class="achievement-input">
                  <div class="mr-2" style="width: 100%">
                    <v-select
                      :options="RegionList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('region')"
                      label="name"
                      v-model="filter.regionid"
                    ></v-select>
                  </div>
                </CCol>
                <CCol lg="4" sm="12" class="">
                  <div class="mr-2" style="width: 100%">
                    <v-select
                      :options="organizationtypelist"
                      v-model="filter.organizationtypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('organizationtype')"
                      label="name"
                    >
                    </v-select>
                  </div>
                </CCol> -->
                <!-- <div class="mr-2" style="width: 140%">
                  <v-select
                    style="width: 100%"
                    class="mr-2"
                    :options="SchoolManagementFormList"
                    v-model="filter.schoolmanagementformid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolManagementForm')"
                    label="name"
                  >
                  </v-select>
                </div> -->
                
              <!-- </CRow>
            </CCol> -->
            <!-- <CCol lg="4" md="4" sm="12" class="text-lg-right mt-2">
              
            </CCol> -->
          <!-- </CRow>
          <CRow>
            <CCol lg="4" md="4" sm="12" class="achievement-input">
              <div style="width: 100%">
                <v-select
                  :options="schooltypelist"
                  v-model="filter.schooltypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('schooltype')"
                  label="name"
                >
                </v-select>
              </div>
            </CCol>
            <CCol lg="4" md="4" sm="12" class="achievement-input">
              <div class="mr-2" style="width: 100%">
                <v-select
                  :options="schoollegalformlist"
                  v-model="filter.schoollegalformid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('schoollegalform')"
                  label="name"
                >
                </v-select>
              </div>
            </CCol>
            <CCol lg="4" md="4" sm="11" class="text-left achievement-input">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
          </CRow> -->
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            @row-dblclicked="Edit"
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(id)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('id')"
              >
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(code)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('code')"
              >
                {{ $t("code") }}
                <b-icon
                  v-if="filter.SortColumn === 'code'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(shortname)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('shortname')"
              >
                {{ $t("shortname") }}
                <b-icon
                  v-if="filter.SortColumn === 'shortname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(fullname)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('fullname')"
              >
                {{ $t("fullname") }}
                <b-icon
                  v-if="filter.SortColumn === 'fullname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(oblast)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('oblast')"
              >
                {{ $t("oblast") }}
                <b-icon
                  v-if="filter.SortColumn === 'oblast'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(region)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('region')"
              >
                {{ $t("region") }}
                <b-icon
                  v-if="filter.SortColumn === 'region'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(parentname)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('parentname')"
              >
                {{ $t("parentname") }}
                <b-icon
                  v-if="filter.SortColumn === 'parentname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(inn)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('inn')"
              >
                {{ $t("inn") }}
                <b-icon
                  v-if="filter.SortColumn === 'inn'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(zipcode)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('zipcode')"
              >
                {{ $t("zipcode") }}
                <b-icon
                  v-if="filter.SortColumn === 'zipcode'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(adress)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('adress')"
              >
                {{ $t("adress") }}
                <b-icon
                  v-if="filter.SortColumn === 'adress'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(contactinfo)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('contactinfo')"
              >
                {{ $t("contactinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'contactinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(director)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('director')"
              >
                {{ $t("director") }}
                <b-icon
                  v-if="filter.SortColumn === 'director'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(accounter)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('accounter')"
              >
                {{ $t("accounter") }}
                <b-icon
                  v-if="filter.SortColumn === 'accounter'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(cashier)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('cashier')"
              >
                {{ $t("cashier") }}
                <b-icon
                  v-if="filter.SortColumn === 'cashier'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>

            <template v-slot:cell(statename)="{ item }">
              <CBadge :color="getItemColor(item.stateid)">{{
                item.statename
              }}</CBadge>
            </template>
            <template v-slot:cell(haspaidservice)="{ item }">
                  <CBadge :color="item.haspaidservice == true ? 'success' : 'danger'">{{
                  item.haspaidservice ? $t("yes") : $t("no")
                }}</CBadge>
              </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="$can('OrganizationEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('OrganizationDelete', 'permissions')"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link>
              </div>
              <b-modal :id="'DeleteModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('DeleteModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("NotAccept") }}
                  </CButton>
                  <CButton @click="Delete(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Accept") }}
                  </CButton>
                </div>
              </b-modal>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
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
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SchoolManagementFormService from "@/services/SchoolManagementForm.service";
import CustomFilterCollapse from "../../../components/customFilterCollapse.vue";
export default {
  components: { CustomFilterCollapse },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thClass : "text-center",
          tdClass : "text-center",
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-center",
        },
        {
          key: "inn",
          label: this.$t("inn"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-center",
        },
        {
          key: "shortname",
          label: this.$t("shortname"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "fullname",
          label: this.$t("fullname"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "oblast",
          label: this.$t("oblast"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "region",
          label: this.$t("region"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "parentname",
          label: this.$t("parentname"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "zipcode",
          label: this.$t("zipcode"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-center",
        },
        {
          key: "adress",
          label: this.$t("adress"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "contactinfo",
          label: this.$t("contactinfo"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-center",
        },
        {
          key: "director",
          label: this.$t("director"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "accounter",
          label: this.$t("accounter"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-left",
        },
        {
          key: "cashier",
          label: this.$t("cashier"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-center",
        },
        {
          key: "haspaidservice",
          label: this.$t("haspaidservice"),
          sortable: false,
           thClass : "text-center",
          tdClass : "text-center",
        },
        {
          key: "statename",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      cache_filters: false,
      filter: {
        Search: "",
        regionid: 0,
        schoolmanagementformid: 0,
        organizationtypeid:0,
        schoollegalformid: 0,
        oblastid: 0,
        schooltypeid: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      OblastList: [],
      RegionList: [],
      organizationtypelist: [],
      SchoolManagementFormList: [],
      schooltypelist: [],
      schoollegalformlist: [],
      lang: localStorage.getItem("locale") || "ru",
      PrintLoading: false,
    };
  },
  created() {
    if (this.$store.state.OrganizationFilter.Search != undefined) {
      this.filter = this.$store.state.OrganizationFilter;
    }
      this.Refresh();
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolManagementFormService.GetAll().then((res) => {
      this.SchoolManagementFormList = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
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
    clearFilter() {
      this.filter = {
        Search: "",
        regionid: 0,
        schoolmanagementformid: 0,
        organizationtypeid:0,
        schoollegalformid: 0,
        oblastid: 0,
        schooltypeid: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
      this.cache_filters = false;
      this.Refresh();
    },
    Search() {
      var self = this.filter;
      if (
        self.oblastid == 0 &&
        self.schooltypeid == 0 &&
        self.organizationtypeid == 0 &&
        self.schoollegalformid == 0
      ) {
        this.cache_filters = false;
        this.Refresh();
        return;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } 
        this.cache_filters = true;
        this.Refresh();
      
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.RegionList = [];
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    Print() {
      this.PrintLoading = true;
      OrganizationService.OrganizationListPrint(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.oblastid,
        this.filter.regionid,
        this.lang,
        0,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.schoollegalformid,
        this.filter.schoolmanagementformid
      )
        .then((res) => {
          this.makeToast(
            this.$t("SuccessPrint"),
            this.$t("message"),
            "success"
          );
          this.PrintLoading = false;
          this.forceFileDownload(res, "OrganizationList");
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.PrintLoading = false;
        });
    },
    forceFileDownload(response, name) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    getItemColor(id) {
      return id === 1
        ? "success"
        : id === 2
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditOrganization",
        params: {
          id: 0,
        },
      });
      this.$store.state.OrganizationFilter = this.filter;
    },
    Edit(item) {
      this.$router.push({
        name: "EditOrganization",
        params: {
          id: item.id,
        },
      });
      this.$store.state.OrganizationFilter = this.filter;
    },
    Delete(item) {
      OrganizationService.Delete(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },    
    Refresh() {
      this.isBusy = true;
      OrganizationService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.oblastid,
        this.filter.regionid,
        0,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.schoollegalformid,
        this.filter.schoolmanagementformid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
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
    ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
      }
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
