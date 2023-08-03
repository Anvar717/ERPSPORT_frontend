<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("GuestRegistration") }}</h3>
        <CCardHeader>
          <CRow class="form-group justify-content-between">
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>
            <CCol
              lg="7"
              md="6"
              sm="12"
              class="text-lg-right mt-2"
              style="margin-right: -7px"
            >
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
            <template v-slot:head(statusname)>
              <div style="cursor: pointer" @click="ChangeSort('statusname')">
                {{ $t("statusname") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:head(name)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('name')"
              >
                {{ $t("name") }}
                <b-icon
                  v-if="filter.SortColumn === 'name'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>

            <template v-slot:cell(statename)="{ item }">
              <CBadge :color="getItemColor(item.statename)">{{
                item.statename
              }}</CBadge>
            </template>
            <template v-slot:cell(isheader)="{ item }">
              <div class="text-center">
                <CBadge :color="item.isheader == true ? 'success' : 'danger'">{{
                  item.isheader ? $t("yes") : $t("no")
                }}</CBadge>
              </div>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="Edit(item)"
                  v-if="
                    $can('GuestRegistrationEdit', 'permissions') &&
                    item.statusid != 2
                  "
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon scale="1.2" icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="item.statusid != 2"
                  @click="$bvModal.show('AcceptModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Acceptt') }"
                >
                  <b-icon scale="1.2" class="mr-2" icon="check2"></b-icon>
                </b-link>
                <b-link
                  v-if="item.statusid != 4 && item.statusid != 1 && item.statusid != 3"
                  @click="$bvModal.show('CancelModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('NotAccept') }"
                >
                  <b-icon scale="1.2" icon="x" class="mr-2"></b-icon>
                </b-link>
                <b-link
                  v-if="item.statusid != 2"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon scale="1.2" icon="trash"></b-icon>
                </b-link>
              </div>
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
                  <CButton
                    @click="Approve(item)"
                    v-if="$can('GuestRegistrationApprove', 'permissions')"
                    color="success"
                  >
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
                  <CButton
                    @click="CancelApproval(item)"
                    v-if="
                      $can('GuestRegistrationCancelApproval', 'permissions')
                    "
                    color="success"
                  >
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
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
                  <CButton
                    @click="Delete(item)"
                    v-if="$can('GuestRegistrationDelete', 'permissions')"
                    color="success"
                  >
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
                class="text-center text-primary my-2 mt-5"
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
                  id="PageLimitSelect"
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
import GuestRegistrationService from "@/services/GuestRegistration.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          style: "width:10%",
          thClass: "text-center",
          tdClass: "text-center",
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
          label: this.$t("ihincomedate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "fullname",
          label: this.$t("Guest"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "receiverpersonname",
          label: this.$t("receiverperson"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "starttime",
          label: this.$t("Starttime"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "endtime",
          label: this.$t("Endtime"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "statusname",
          thClass: "text-center",
          tdClass: "text-center",
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
        SortIcon: "arrow-up",
      },
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
    };
  },
  created() {
    this.Refresh();
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
        name: "EditGuestRegistration",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditGuestRegistration",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      GuestRegistrationService.Delete(item.id)
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

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      GuestRegistrationService.GetList(
        this.filter.Search,
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
    Approve(item) {
      var self = this;
      GuestRegistrationService.Approve(item.id)
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
      GuestRegistrationService.CancelApproval(item.id)
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
  