<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("AdmissionPrivilege") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>
            <CCol lg="8" md="6" sm="12" class="text-lg-right mt-2">
              <CButton
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
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="11" md="11" sm="11">
              <div class="d-flex">
                <div class="mr-4" style="width: 100%">
                  <label>{{ $t("SchoolYear") }}</label>
                  <v-select
                    :options="SchoolYearList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.schoolyearid"
                    @input="Refresh"
                  ></v-select>
                </div>
                <div class="mr-4" style="width: 100%">
                  <label>{{ $t("organizationtype") }}</label>
                  <v-select
                    :options="organizationtypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.organizationtypeid"
                    @input="Refresh"
                  ></v-select>
                </div>
                <div class="mr-4" style="width: 100%">
                  <label>{{ $t("schooltype") }}</label>
                  <v-select
                    :options="schooltypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.schooltypeid"
                    @input="Refresh"
                  ></v-select>
                </div>
                <!-- <div class="mr-4" style="width: 100%">
                  <label>{{ $t("organization") }}</label>
                  <v-select
                    :options="OrganizationList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.organizationid"
                    @input="Refresh"
                  ></v-select>
                </div> -->
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="height: 500px"
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
              <div style="cursor: pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor: pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon
                  v-if="filter.SortColumn === 'docnumber'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor: pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon
                  v-if="filter.SortColumn === 'docdate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(studentcount)>
              <div style="cursor: pointer" @click="ChangeSort('studentcount')">
                {{ $t("studentcount") }}
                <b-icon
                  v-if="filter.SortColumn === 'studentcount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(employeecount)>
              <div style="cursor: pointer" @click="ChangeSort('employeecount')">
                {{ $t("employeecount") }}
                <b-icon
                  v-if="filter.SortColumn === 'employeecount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(groupcount)>
              <div style="cursor: pointer" @click="ChangeSort('groupcount')">
                {{ $t("groupcount") }}
                <b-icon
                  v-if="filter.SortColumn === 'groupcount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(trenercount)>
              <div style="cursor: pointer" @click="ChangeSort('trenercount')">
                {{ $t("trenercount") }}
                <b-icon
                  v-if="filter.SortColumn === 'trenercount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor: pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">
                {{ item.statusname }}
              </CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                 v-if="$can('AdmissionPrivilegeEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>

                    <b-dropdown-item
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
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
                    <CButton  v-if="$can('AdmissionPrivilegeDelete', 'permissions')" @click="Delete(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'CancelModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantCancel") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('CancelModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton v-if="$can('AdmissionPrivilegeCancelApproval', 'permissions')" @click="CancelApproval(item)" color="success">
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
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton v-if="$can('AdmissionPrivilegeApprove', 'permissions')" @click="Approve(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
              </div>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2 mt-5"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
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
import AdmissionPrivilegeService from "@/services/AdmissionPrivilege.service";
import OrganizationService from "@/services/organization.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
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
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyear"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "organizationtypename",
          label: this.$t("organizationtype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        // {
        //   key: "organizationname",
        //   label: this.$t("organization"),
        //   sortable: false,
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        {
          key: "schooltypename",
          label: this.$t("SchoolType"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      items: [],
      OrganizationList: [],
      OblastList: [],
      SchoolYearList: [],
      organizationtypelist: [],
      schooltypelist: [],
      RegionList: [],
      totalRows: "",
      isBusy: true,
      filter: {
        schoolyearid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        organizationid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
    };
  },
  created() {
    this.Refresh();
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
        this.SchoolYearList = res.data;
      });
      OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
      SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationService.GetAll().then((res) => {
      this.OrganizationList = res.data;
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
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditAdmissionPrivilege",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditAdmissionPrivilege",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      AdmissionPrivilegeService.Delete(item.id)
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
    Approve(item) {
      var self = this;
      AdmissionPrivilegeService.Approve(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          self.makeToast(error.response.data, self.$t("message"), "danger");
        });
    },
    CancelApproval(item) {
      var self = this;
      AdmissionPrivilegeService.CancelApproval(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("CancelMessage"),
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
      AdmissionPrivilegeService.GetList(
        this.filter.schoolyearid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.organizationid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
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
