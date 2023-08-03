<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("HigherEduDiplom") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.oblastId"
                :reduce="item => item.id"
                label="name"
                @input="changeOblast(filter.oblastId)"
                :options="OblastList"
                :placeholder="$t('oblast')"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.regionId"
                :options="RegionList"
                :reduce="item => item.id"
                label="name"
                :placeholder="$t('region')"
                @input="changeRegion(filter.oblastId, filter.regionId)"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.organizationId"
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
                <b-spinner v-if="PrintLoading" small></b-spinner>
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                &nbsp; {{ $t("Print") }}
              </CButton>
              <CButton
                v-if="$can('HigherEduDiplomEdit', 'permissions')"
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
            <CCol lg="2" md="2" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('pinfl')"
                autocomplete="text"
                v-model="filter.personPinfl"
              >
              </CInput>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('personname')"
                autocomplete="text"
                v-model="filter.personName"
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
              <div style="cursor : pointer" @click="ChangeSort('diplomaserial')">
                {{ $t("diplomaserial") }}
                <b-icon v-if="filter.SortColumn === 'diplomaserial'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(diplomanumber)>
              <div style="cursor : pointer" @click="ChangeSort('diplomanumber')">
                {{ $t("diplomanumber") }}
                <b-icon v-if="filter.SortColumn === 'diplomanumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(educationstarteddate)>
              <div style="cursor : pointer" @click="ChangeSort('educationstarteddate')">
                {{ $t("educationstarteddate") }}
                <b-icon v-if="filter.SortColumn === 'educationstarteddate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(facultyname)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('facultyname')"
              >
                {{ $t("facultyname") }}
                <b-icon v-if="filter.SortColumn === 'facultyname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
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
            <template #cell(isverifiedbymoderator)="{item}">
              <b-icon
                scale="1.5"
                :icon="
                  item.isverifiedbymoderator ? 'check-circle-fill' : 'info-circle-fill'
                "
                :variant="item.isverifiedbymoderator ? 'success' : 'warning'"
              ></b-icon>
            </template>
            <template #cell(privilegeddiploma)="{item}">
                <b-icon
                scale="1.5"
                :icon="
                  item.privilegeddiploma ? 'check-circle-fill' : 'x-circle-fill'
                "
                :variant="item.privilegeddiploma ? 'success' : 'danger'"
              ></b-icon>
            </template>
            <template #cell(personname)="{item}">
              <div >
                <span @click="GoEmployeeCard(item)" style="color: blue; cursor: pointer"> {{ item.personname }} </span>
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
                  v-if="$can('HigherEduDiplomEdit', 'permissions') && (item.statusname != 'Утвержден' && item.statusname != 'Отправлен')"
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
                  v-if="$can('HigherEduDiplomDelete', 'permissions') ||  item.statusname == 'Создан' || item.statusname == 'Изменен' || item.statusname == 'Отменено'"
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
import HigherEduDiplomService from "@/services/higheredudiplom.service";
import OblastService from "@/services/Oblast.service"
import RegionService from "@/services/Region.service"
import OrganizationService from "@/services/organization.service"
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          sortable: false,
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
          key: "otmcurrentname",
          label: this.$t("otmcurrentname"),
          sortable: false,
        },
        {
          key: "facultyname",
          label: this.$t("facultyname"),
          sortable: false,
          tdClass : 'text-left'
        },
        {
          key: "diplomaserial",
          label: this.$t("diplomaserial"),
          sortable: false,
        },
        {
          key: "diplomanumber",
          label: this.$t("diplomanumber"),
          sortable: false,
        },
        {
          key: "educationstarteddate",
          label: this.$t("educationstarteddate"),
          sortable: false,
        },
        {
          key: "diplomagivendate",
          label: this.$t("diplomagivendate"),
          sortable: false,
        },
        {
          key: "privilegeddiploma",
          label: this.$t("privilegeddiploma"),
          sortable: false,
        },
        {
          key: "isverified",
          label: '',
          sortable: false,
          tdClass : 'text-center'
        },
        {
          key: "isverifiedbymoderator",
          label: this.$t("isverifiedbymoderator"),
          sortable: false,
          tdClass : 'text-center'
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      PrintLoading: false,
      isBusy: true,
      filter: {
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
        oblastId : 0,
         regionId : 0,
          organizationId: 0,
           personName: "",
            personPinfl: "",
             statusId : 0,
      },
      OblastList : [],
      RegionList : [],
      OrganizationList : [],
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    this.filter.statusid = this.$route.query.statusid || 0
    this.filter.oblastid = this.$route.query.oblastid || 0
    this.filter.regionid = this.$route.query.regionid || 0
    this.filter.organizationid = this.$route.query.organizationid || 0
    this.filter.documentseries = this.$route.query.documentseries || ""
    this.filter.documentnumber = this.$route.query.documentnumber || ""
    this.filter.personname = this.$route.query.personname || ""
    this.lang = localStorage.getItem('locale') || 'ru'
    if(!!this.filter.oblastId){
      this.changeOblast(this.filter.oblastId)
    }
    if(!!this.filter.regionId){
      this.changeRegion(this.filter.oblastId,this.filter.regionId)
    }
    this.Refresh();
    OblastService.GetAll(this.lang, 0, false).then(res => {
      this.OblastList = res.data
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
    changeOblast(item){
      RegionService.GetAll(this.lang,item ).then(res => {
        this.RegionList = res.data
      })
    },
    changeRegion(oblast,region){
      OrganizationService.GetAll(oblast,region, false).then(res => {
        this.OrganizationList = res.data
      })
    },
    GoEmployeeCard(item){
      this.$router.push({
        name: "EmployeeCard",
        query: {
          PersonId: item.personid
        },
      });
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditHigherEduDiplom",
        params: {
          id: 0,
        },
      });
    },
    View(item){
      this.$router.push({
        name: "ViewHigherEduDiplom",
        params: {
          id: item.id,
        },
        query:{
          oblastId : this.filter.oblastId,
          regionId : this.filter.regionId,
          organizationId : this.filter.organizationId,
          documentseries : this.filter.documentseries,
          documentnumber : this.filter.documentnumber,
          personname : this.filter.personname,
          statusId : this.filter.statusId

        }
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditHigherEduDiplom",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      HigherEduDiplomService.Delete(item.id)
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
      this.PrintLoading = true,
      HigherEduDiplomService.PrintList(
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.organizationId,
        this.filter.personName,
        this.filter.personPinfl,
        this.filter.statusId,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then(res => {
        this.PrintLoading = false,
        this.forceFileDownload(res, 'HigherEduDiplom');
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
      HigherEduDiplomService.Approve(item.id)
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
      HigherEduDiplomService.CancelApproval(item.id)
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
      HigherEduDiplomService.GetList(
         this.filter.oblastId,
        this.filter.regionId,
        this.filter.organizationId,
        this.filter.personName,
        this.filter.personPinfl,
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
