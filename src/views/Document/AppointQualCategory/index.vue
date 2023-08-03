<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head pl-4 pr-3 pt-3">
          <div class="w-100 text-center">
            <h3 class="text-center achievement-input">{{ $t("AppointQualCategory") }}</h3>
          </div>
          <div class="btn_list w-100 text-lg-right mt-3">
            <CButton @click="Print" color="primary" class="mr-2" size="sm">
              <b-icon icon="printer"> </b-icon>
              &nbsp; {{ $t("Print") }}
            </CButton>
            <CButton
              v-if="$can('AppointQualCategoryEdit', 'permissions')"
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
              color="danger"
              class="float-sm-right mr-2"
              @click="$router.push('/')"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </div>
        </div>
        <CCardHeader>
          <CRow>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.oblastid"
                :reduce="(item) => item.id"
                label="name"
                @input="changeOblast(filter.oblastid)"
                :options="OblastList"
                :placeholder="$t('oblast')"
                class="fname-select"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.regionid"
                :options="RegionList"
                :reduce="(item) => item.id"
                label="name"
                :placeholder="$t('region')"
                @input="changeRegion(filter.oblastid, filter.regionid)"
                class="fname-select"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                label="name"
                :options="OrganizationList"
                :placeholder="$t('organization')"
                class="fname-select"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
              <v-select
                :options="qualificationcategorylist"
                v-model="filter.qualificationcategoryid"
                :reduce="(item) => item.id"
                :placeholder="$t('qualificationcategory')"
                label="name"
                class="fname-select"
              >
              </v-select>
            </CCol>
          </CRow>
          <CRow class="form-group">
            <CCol lg="4" md="3" sm="12" class="text-left mt-2"> 
              <v-select
                :options="schoolsubjectlist"
                v-model="filter.schoolsubjectid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolsubject')"
                label="name"
                class="fname-select"
              >
              </v-select>
            </CCol>
            <CCol lg="4" md="3" sm="12" class="text-left mt-2">
              <!-- <CInput
              size="sm"
                :placeholder="$t('documentseries')"
                autocomplete="text"
                v-model="filter.documentseries"
              >
              </CInput> -->
              <b-input-group>
                <b-input
                  style="width:35%"
                  v-model="filter.documentseries"
                  :placeholder="$t('documentseries')"
                ></b-input>
                <b-input
                  style="width:65%"
                  v-model="filter.documentnumber"
                  :placeholder="$t('documentnumber')"
                ></b-input>
                <!-- <b-input-group-append> -->

                <!-- </b-input-group-append> -->
              </b-input-group>
            </CCol>
            <!-- <CCol lg="2" md="2" sm="12" class="text-left mt-2">
              <CInput
              size="sm"
                :placeholder="$t('documentnumber')"
                autocomplete="text"
                v-model="filter.documentnumber"
              >
              </CInput>
            </CCol> -->
            <CCol lg="4" md="3" sm="12" class="text-left mt-2">
              <CInput
                size="sm"
                :placeholder="$t('personname')"
                autocomplete="text"
                v-model="filter.personname"
                v-on:keyup.enter="Search"
                class="personname-input"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <!-- <CCol lg="1" md="1" sm="1" class="text-left mt-2 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol> -->
          </CRow>
          <b-row>
            <b-col>
              <b-button-group @click="Refresh" size="sm" class="sportTitle-btn-group">
                <b-button
                  @click="filter.statusid = 0"
                  :variant="
                    filter.statusid == 0 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("All") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 1"
                  :variant="
                    filter.statusid == 1 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("AllNew") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 4"
                  :variant="
                    filter.statusid == 4 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("edited") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 8"
                  :variant="
                    filter.statusid == 8 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("SendAll") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 2"
                  :variant="
                    filter.statusid == 2 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("accepted") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 3"
                  :variant="
                    filter.statusid == 3 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("canceled") }}
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <!-- style="white-space: nowrap" -->
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
              <div style="cursor : pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor : pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon
                  v-if="filter.SortColumn === 'docnumber'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor : pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon
                  v-if="filter.SortColumn === 'docdate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor : pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'detailinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(givenorganization)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('givenorganization')"
              >
                {{ $t("givenorganization") }}
                <b-icon
                  v-if="filter.SortColumn === 'givenorganization'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template #cell(isverified)="{item}">
              <b-icon
                scale="1.5"
                :icon="
                  item.isverified ? 'check-circle-fill' : 'info-circle-fill'
                "
                :variant="item.isverified ? 'success' : 'warning'"
              ></b-icon>
            </template>
            <template #cell(personname)="{item}">
              <div @click="GoEmployeeCard(item)">
                <span style="color: blue; cursor: pointer">
                  {{ item.personname }}
                </span>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="$can('AppointQualCategoryEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('AppointQualCategoryDelete', 'permissions')"
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
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="Delete(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
              <b-modal :id="'AcceptModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('AcceptModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="Approve(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
              <b-modal :id="'NotAcceptModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{
                  $t("WantNotAccept")
                }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('NotAcceptModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="CancelApproval(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2 mt-5"
                style="vertical-align:middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div class="pagination-number" style="float:left;font-size:12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float:left" class="per-page ml-2 mr-2 mt-n1">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="PageLimitSelect"
                  size="sm"
                  :options="filter.pageOptions"
                ></b-form-select>
              </div>
              <div class="per-page" style="float:left;font-size:12px">
                {{ $t("RecordsPerPage") }}
              </div>
            </div>
            <div style="float:right">
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
import AppointQualCategoryService from "@/services/AppointQualCategory.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false,
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
        },

        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          sortable: false,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          sortable: false,
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          sortable: false,
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          sortable: false,
        },
        {
          key: "isverified",
          label: "",
          sortable: false,
          tdClass: "text-center",
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("qualificationcategoryname"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "externalschoolsubjectid",
          label: this.$t("externalschoolsubject"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "externalschoolsubjectname",
          label: this.$t("externalschoolsubjectname"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubjectname"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "givenorganization",
          label: this.$t("givenorganization"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "returnreason",
          label: this.$t("returnreason"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      qualificationcategorylist: [],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        ID: "",
        inn: "",
        pinfl: "",
        identitydocumentid: "",
        documentseries: "",
        documentnumber: "",
        persontypeid: 1,
        isallperson: false,
        organizationid: 0,
        oblastid: 0,
        regionid: 0,
        personname: "",
        statusid: 0,
      },
      OblastList: [],
      RegionList: [],
      schoolsubjectlist: [],
      OrganizationList: [],
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    this.filter.statusid = this.$route.query.statusid || 0;
    this.filter.oblastid = this.$route.query.oblastid || 0;
    this.filter.regionid = this.$route.query.regionid || 0;
    this.filter.organizationid = this.$route.query.organizationid || 0;
    this.filter.documentseries = this.$route.query.documentseries || "";
    this.filter.documentnumber = this.$route.query.documentnumber || "";
    this.filter.personname = this.$route.query.personname || "";
    this.lang = localStorage.getItem("locale") || "ru";
    if (!!this.filter.oblastid) {
      this.changeOblast(this.filter.oblastid);
    }
    if (!!this.filter.regionid) {
      this.changeRegion(this.filter.oblastid, this.filter.regionid);
    }
    this.Refresh();
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.OblastList = res.data;
    });
    QualificationCategoryService.GetAll().then((res) => {
      this.qualificationcategorylist = res.data;
    });
    SchoolSubjectService.GetAll().then((res) => {
      this.schoolsubjectlist = res.data;
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
    getItemColor(id) {
      return id === 1
        ? "primary"
        : id === 2
        ? "success"
        : id === 3
        ? "danger"
        : id === 4
        ? "primary"
        : "primary";
    },
    changeOblast(item) {
      RegionService.GetAll(this.lang, item).then((res) => {
        this.RegionList = res.data;
      });
    },
    GoEmployeeCard(item) {
      this.$router.push({
        name: "EmployeeCard",
        query: {
          PersonId: item.personid,
        },
      });
    },
    changeRegion(oblast, region) {
      OrganizationService.GetAll(oblast, region, false).then((res) => {
        this.OrganizationList = res.data;
      });
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditAppointQualCategory",
        params: {
          id: 0,
        },
      });
    },
    View(item) {
      this.$router.push({
        name: "ViewAppointQualCategory",
        params: {
          id: item.id,
        },
        query: {
          oblastid: this.filter.oblastid,
          regionid: this.filter.regionid,
          organizationid: this.filter.organizationid,
          documentseries: this.filter.documentseries,
          documentnumber: this.filter.documentnumber,
          personname: this.filter.personname,
          statusid: this.filter.statusid,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditAppointQualCategory",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      AppointQualCategoryService.Delete(item.id)
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
      AppointQualCategoryService.AppointQualCategoryPrint(
        1,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.schoolsubjectid,
        this.filter.qualificationcategoryid,
        this.filter.statusid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((res) => {
          this.forceFileDownload(res, "AppointQualCategoryPrint");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    Approve(item) {
      var self = this;
      AppointQualCategoryService.Approve(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    CancelApproval(item) {
      var self = this;
      AppointQualCategoryService.CancelApproval(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
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
      AppointQualCategoryService.GetList(
        1,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.schoolsubjectid,
        this.filter.qualificationcategoryid,
        this.filter.statusid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
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

<style>
.table thead th {
  vertical-align: top;
}
</style>
