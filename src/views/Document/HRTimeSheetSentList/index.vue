<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("HRTimeSheetSentList") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="7" md="7" sm="12" class="text-left mt-0">
              <CRow class="d-flex">
                <CCol lg="3" sm="12" class="">
                  <label for>{{ $t("StartDate") }}</label>
                  <date-picker
                    v-model="filter.StartDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('StartDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    class="achievement-input"
                  >
                  </date-picker>
                </CCol>
                <CCol lg="3" sm="12" class="">
                  <label for>{{ $t("EndDate") }}</label>
                  <date-picker
                    v-model="filter.EndDate"
                    style="width:100%;"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('EndDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker>
                </CCol>
                <CCol lg="5" sm="12">
                  <CInput
                    :placeholder="$t('search')"
                    autocomplete="text"
                    v-model="filter.Search"
                    v-on:keyup.enter="Search"
                    style="margin-top:28px;"
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
              </CRow>
            </CCol>
            <CCol
              lg="5"
              md="5"
              sm="12"
              class="text-lg-right "
              style="margin-top:28px"
            >
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
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="height:450px; white-space: nowrap"
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
            <template v-slot:head(formonth)>
              <div style="cursor : pointer" @click="ChangeSort('formonth')">
                {{ $t("formonth") }}
                <b-icon v-if="filter.SortColumn === 'formonth'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(departmentname)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('departmentname')"
              >
                {{ $t("departmentname") }}
                <b-icon v-if="filter.SortColumn === 'departmentname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(organizationaccount)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('organizationaccount')"
              >
                {{ $t("organizationaccount") }}
                <b-icon v-if="filter.SortColumn === 'organizationaccount'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor : pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon v-if="filter.SortColumn === 'detailinfo'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(status)="{ item }">
              <CBadge :color="getItemColor(item.status)">{{
                item.status
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil" ></b-icon>
                </b-link>
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      @click="$bvModal.show('AcceptModal2' + item.id)"
                      v-if="$can('HRTimeSheetAccept','permissions')"
                    >
                      <b-icon icon="check2-all" class="mr-2"></b-icon>
                      {{ $t("Accept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('RejectModal' + item.id)"
                    >
                      <b-icon icon="exclamation-triangle" class="mr-2"></b-icon>
                      {{ $t("Reject") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
                <b-modal :id="'RejectModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantReject") }}</template>
                  <label for=""> {{ $t('Reason') }} </label>
                  <b-form-textarea
                    id="textarea"
                    v-model="reason"
                    :placeholder="$t('entersomething')"
                    rows="3"
                    max-rows="6"
                    class="mb-3"
                  ></b-form-textarea>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('RejectModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Reject(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'AcceptModal2' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('AcceptModal2' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Accept(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'SendModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantSend") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('SendModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Send(item)" color="success">
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
                    <CButton @click="Delete(item)" color="success">
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
                    <CButton @click="CancelApproval(item)" color="success">
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
                    <CButton @click="Approve(item)" color="success">
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
                  id="PageNumberSelect"
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
                :per-page="filter.PageNumber"
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
import HRTimeSheetService from "@/services/HRTimeSheet.service";
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
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
        },
        {
          key: "formonth",
          label: this.$t("formonth"),
          sortable: false,
        },
        {
          key: "departmentname",
          label: this.$t("departmentname"),
          sortable: false,
        },
        {
          key: "organizationaccount",
          label: this.$t("organizationaccount"),
          sortable: false,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        StartDate: "",
        EndDate: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
      },
      reason : ''
    };
  },
  created() {
    this.createDate();
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
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var mm1 = String(todaydate.getMonth() + 2).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = "01.01." + yyyy;
      this.filter.EndDate = dd + "." + mm1 + "." + yyyy;
    },
    getItemColor(text) {
      return text === "Актив" || text === 'Принято'
        ? "success"
        : text === "Пассив" || text === 'Не принято'
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : text === 'Отправлен'
        ? 'info'
        :"primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditHRTimeSheet",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditHRTimeSheet",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      HRTimeSheetService.Delete(item.id)
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
    Send(item) {
      var self = this;
      HRTimeSheetService.Send(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("SendMessage"),
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
    Reject(item) {
      var self = this;
      HRTimeSheetService.Reject(item.id,this.reason)
        .then((res) => {
          self.makeToast(
            self.$t("RejectMessage"),
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
    Accept(item) {
      var self = this;
      HRTimeSheetService.Accept(item.id)
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
    Cancel(item) {
      var self = this;
      HRTimeSheetService.Cancel(item.id)
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
    Approve(item) {
      var self = this;
      HRTimeSheetService.Approve(item.id)
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
      HRTimeSheetService.CancelApproval(item.id)
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
      HRTimeSheetService.GetSentList(
        this.filter.StartDate,
        this.filter.EndDate,
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
