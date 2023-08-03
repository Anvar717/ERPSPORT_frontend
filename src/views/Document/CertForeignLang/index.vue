<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("CertForeignLang") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
               <v-select
                v-model="filter.oblastid"
                :reduce="item => item.id"
                label="name"
                @input="changeOblast(filter.oblastid)"
                :options="OblastList"
                :placeholder="$t('oblast')"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
               <v-select
                v-model="filter.regionid"
                :options="RegionList"
                :reduce="item => item.id"
                label="name"
                :placeholder="$t('region')"
                @input="changeRegion(filter.oblastid, filter.regionid)"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
             <v-select
                v-model="filter.organizationid"
                :reduce="item => item.id"
                label="name"
                :options="OrganizationList"
                :placeholder="$t('organization')"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-lg-right mt-2">
              <CButton
                @click="Print"
                color="primary"
                class="mr-2"
                size="sm"
              >
                <b-icon v-if="!PrintLoading" icon="printer"> </b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                &nbsp; {{ $t("Print") }}
              </CButton>
              <CButton
                v-if="$can('CertForeignLangEdit', 'permissions')"
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
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </CCol>
          </CRow>
          <CRow class="form-group">
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.certForeignLangTypeId"
                :reduce="item => item.id"
                label="shortname"
                :options="CertForeignLangTypeList"
                :placeholder="$t('CertForeignLangType')"
              >
              </v-select>
            </CCol>
            
            <CCol lg="2" md="2" sm="11" class="text-left mt-2">
              <!-- <CInput
                :placeholder="$t('documentseries')"
                autocomplete="text"
                v-model="filter.documentseries"
              >
              </CInput> -->
              <b-input
              :placeholder="$t('documentseries')"
                autocomplete="text"
                v-model="filter.documentseries">

              </b-input>
            </CCol>
            <CCol lg="2" md="2" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('documentnumber')"
                autocomplete="text"
                v-model="filter.documentnumber"
              >
              </CInput>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('personname')"
                autocomplete="text"
                v-model="filter.personname"
                v-on:keyup.enter="Search"
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
            <CCol lg="1" md="1" sm="1" class="text-left mt-2 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height:35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol>
          </CRow>
          <b-row>
            <b-col>
              <b-button-group @click="Refresh" size="sm">
                <b-button @click="filter.statusId = 0" :variant="filter.statusId == 0 ? 'primary' : 'outline-primary'"> {{ $t('All') }} </b-button>
                <b-button @click="filter.statusId = 1" :variant="filter.statusId == 1 ? 'primary' : 'outline-primary'"> {{ $t('AllNew') }} </b-button>
                <b-button @click="filter.statusId = 4" :variant="filter.statusId == 4 ? 'primary' : 'outline-primary'"> {{ $t('edited') }} </b-button>
                <b-button @click="filter.statusId = 8" :variant="filter.statusId == 8 ? 'primary' : 'outline-primary'"> {{ $t('SendAll') }} </b-button>
                <b-button @click="filter.statusId = 2" :variant="filter.statusId == 2 ? 'primary' : 'outline-primary'"> {{ $t('accepted') }} </b-button>
                <b-button @click="filter.statusId = 3" :variant="filter.statusId == 3 ? 'primary' : 'outline-primary'"> {{ $t('canceled') }} </b-button>
              </b-button-group>
            </b-col>
          </b-row>
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
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor : pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon v-if="filter.SortColumn === 'docnumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor : pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon v-if="filter.SortColumn === 'docdate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor : pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon v-if="filter.SortColumn === 'detailinfo'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(givenorganization)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('givenorganization')"
              >
                {{ $t("givenorganization") }}
                <b-icon v-if="filter.SortColumn === 'givenorganization'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(statusname)>
              <div style="cursor : pointer" @click="ChangeSort('statusname')">
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'statusname'" :icon="filter.SortIcon"></b-icon>
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
                <span style="color: blue; cursor: pointer"> {{ item.personname }} </span>
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
                  v-if="$can('CertForeignLangEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil" ></b-icon>
                </b-link>
                <b-link
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('CertForeignLangDelete', 'permissions')"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" ></b-icon>
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
            <div style="float:left;font-size:12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float:left;font-size:12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float:right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import CertForeignLangService from "@/services/CertForeignLang.service";
import OblastService from "@/services/Oblast.service"
import RegionService from "@/services/Region.service"
import OrganizationService from "@/services/organization.service"
import CertForeignLangTypeService from "@/services/CertForeignLangType.service"
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
          tdClass : 'text-left'
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
          label: '',
          sortable: false,
          tdClass : 'text-center'
        },
        {
          key: "certforeignlangtypename",
          label: this.$t("CertForeignLangType"),
          sortable: false,
          tdClass : 'text-center'
        },
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubjectname"),
          sortable: false,
          tdClass : 'text-left'
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
          tdClass : 'text-left'
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
        ID : '',
        inn : '',
        pinfl : '',
        identitydocumentid : '',
        documentseries : "",
        documentnumber : "",
        persontypeid : 1,
        isallperson : false,
        organizationid : 0,
        statusId : 0,
        certForeignLangTypeId : 0,
        oblastid : 0,
        regionid : 0,
        personname : ""
      },
      OblastList : [],
      RegionList : [],
      CertForeignLangTypeList : [],
      OrganizationList : [],
      lang : localStorage.getItem('locale') || 'ru',
      PrintLoading : false
    };
  },
  created() {
    this.lang = localStorage.getItem('locale') || 'ru'
    this.Refresh();
    OblastService.GetAll(this.lang, 0, false).then(res => {
      this.OblastList = res.data
    })
    CertForeignLangTypeService.GetAll().then(res => {
      this.CertForeignLangTypeList = res.data
    })
    
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
    changeOblast(){
      RegionService.GetAll(this.lang, this.filter.oblastid).then(res => {
        this.RegionList = res.data
      })
    },
    View(item){
      this.$router.push({
        name: "ViewCertForeignLang",
        params: {
          id: item.id,
        },
      });
    },
    GoEmployeeCard(item){
      this.$router.push({
        name: "EmployeeCard",
        query: {
          PersonId: item.personid
        },
      });
    },
    changeRegion(){
      OrganizationService.GetAll(this.filter.oblastid, this.filter.regionid, false).then(res => {
        this.OrganizationList = res.data
      })
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditCertForeignLang",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditCertForeignLang",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      CertForeignLangService.Delete(item.id)
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
    Print(){
      this.PrintLoading = true
      CertForeignLangService.CertForeignLangPrint(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then(res => {
        this.PrintLoading = false
        this.forceFileDownload(res, 'CertForeignLangPrint');
      })
      .catch((error) => {
        this.PrintLoading = false
        this.makeToast(
          error.response.data.error,
          this.$t("message"),
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
      CertForeignLangService.GetList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.certForeignLangTypeId,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.statusId,
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

<style></style>
