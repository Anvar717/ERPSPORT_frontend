<template>
    <CRow>
      <CCol sm="12" md="12">
        <CCard accent-color="primary">
          <h3 class="text-center mt-3">{{ $t("AppealResponse") }}</h3>
          <CCardHeader>
            <CRow>
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
          </CRow>
          </CCardHeader>
          <CCardBody>
            <b-table
              :fields="fields"
              :items="items"
              style="min-height: 500px"
              small="small"
              responsive="sm"
              class="generalTableClass"
              show-empty
              :busy="isBusy"
              :current-page="filter.PageNumber"
              @row-clicked="rowclicked"
              striped
              sticky-header="60vh"
              no-border-collapse
              bordered
              
              hover
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
                  {{ $t("appealdocnumber1") }}
                  <b-icon
                    v-if="filter.SortColumn === 'docnumber'"
                    :icon="filter.SortIcon"
                  ></b-icon>
                </div>
              </template>
              <template v-slot:head(docdate)>
                <div style="cursor: pointer" @click="ChangeSort('docdate')">
                  {{ $t("appealdate1") }}
                  <b-icon
                    v-if="filter.SortColumn === 'docdate'"
                    :icon="filter.SortIcon"
                  ></b-icon>
                </div>
              </template>
              <template v-slot:head(fromschoolyear)>
                <div
                  style="cursor: pointer"
                  @click="ChangeSort('fromschoolyear')"
                >
                  {{ $t("fromschoolyear") }}
                  <b-icon
                    v-if="filter.SortColumn === 'fromschoolyear'"
                    :icon="filter.SortIcon"
                  ></b-icon>
                </div>
              </template>
              <template v-slot:head(toschoolyear)>
                <div style="cursor: pointer" @click="ChangeSort('toschoolyear')">
                  {{ $t("toschoolyear") }}
                  <b-icon
                    v-if="filter.SortColumn === 'toschoolyear'"
                    :icon="filter.SortIcon"
                  ></b-icon>
                </div>
              </template>
              <template v-slot:head(fromorgschoolgrade)>
                <div
                  style="cursor: pointer"
                  @click="ChangeSort('fromorgschoolgrade')"
                >
                  {{ $t("fromorgschoolgrade") }}
                  <b-icon
                    v-if="filter.SortColumn === 'fromorgschoolgrade'"
                    :icon="filter.SortIcon"
                  ></b-icon>
                </div>
              </template>
              <template v-slot:head(toorgschoolgrade)>
                <div
                  style="cursor: pointer"
                  @click="ChangeSort('toorgschoolgrade')"
                >
                  {{ $t("toorgschoolgrade") }}
                  <b-icon
                    v-if="filter.SortColumn === 'toorgschoolgrade'"
                    :icon="filter.SortIcon"
                  ></b-icon>
                </div>
              </template>
              <template v-slot:head(detailinfo)>
                <div style="cursor: pointer" @click="ChangeSort('detailinfo')">
                  {{ $t("detailinfo") }}
                  <b-icon
                    v-if="filter.SortColumn === 'detailinfo'"
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
                <CBadge :color="getItemColor(item.statusname)">
                  <div>{{item.statusname}}</div>
                </CBadge>
              </template>
              <template v-slot:cell(sportsmennames)="{ item }">
                <span>{{ item.sportsmennames }}</span>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <div class="text-center">
                    <div>
                      <b-link
                       @click="$bvModal.show('SendModal' + item.id)"
                      >
                        <b-icon icon="cursor" class="mr-2"></b-icon>
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
                      <CButton
                        v-if="$can('AppealDelete', 'permissions')"
                        @click="Delete(item)"
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
                        color="success"
                      >
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
                      <CButton
                        @click="Send(item)"
                        color="success"
                      >
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
                      <CButton
                        @click="Approve(item)"
                        color="success"
                      >
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
  import AppealResponseService from "@/services/AppealResponse.service";
  import SchoolYearService from "@/services/SchoolYear.service";
  import SportGroupService from "@/services/SportGroup.service";
  export default {
    data() {
      return {
        fields: [
          {   
            key: "actions",
            label: this.$t("actions"),
            thStyle: { width: "5%" },
            thClass: "text-center",
            tdClass: "text-center",
          },
          {
            key: "id",
            label: this.$t("id"),
            thStyle: { width: "5%" },
            thClass: "text-center",
            tdClass: "text-center",
          },
          {
            key: "docnumber",
            label: this.$t("appealdocnumber1"),
            thStyle: { width: "5%" },
            sortable: false,
            thClass: "text-center",
            tdClass: "text-center",
          },
          {
            key: "docdate",
            label: this.$t("appealdate1"),
            thStyle: { width: "5%" },
            sortable: false,
            thClass: "text-center",
            tdClass: "text-center",
          },
          {
            key: "fromorganizationname",
            label: this.$t("fromorganizationname"),
            thStyle: { width: "10%" },
            sortable: false,
            thClass: "text-center",
            tdClass: "text-left",
          },
           {
            key: "toorganizationname",
            label: this.$t("ToOrganization"),
            thStyle: { width: "10%" },
            sortable: false,
            thClass: "text-center",
            tdClass: "text-left",
          },
          {
            key: "appealpurposename",
            label: this.$t("appealpurpose"),
            thStyle: { width: "10%" },
            sortable: false,
            thClass: "text-center",
            tdClass: "text-left",
          },
          {
            key: "details",
            label: this.$t("details"),
            thStyle: { width: "15%" },
            sortable: false,
            thClass: "text-center",
            tdClass: "text-left",
          },
          {
            key: "statusname",
            label: this.$t("status"),
            thStyle: { width: "5%" },
            sortable: false,
            thClass: "text-center",
            tdClass: "text-center",
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
          statusid: 0,
          PageLimit: 20,
          pageOptions: [5, 10, 15, 20, 25, 50, 100],
          SortIcon: "arrow-up",
        },
        schoolyearlist: [],
        SearchTypeList: [
          { id: 1, name: this.$t("FIO Sportchi") },
          { id: 2, name: this.$t("FIO Trener") },
          // { id : 4,name : this.$t('inn') }
        ],
        sportgrouplist: [],
      };
    },
    created() {
      this.Search();
      SchoolYearService.GetAll().then((res) => {
        this.schoolyearlist = res.data;
      });
      SportGroupService.GetAll().then((res) => {
        this.sportgrouplist = res.data;
      });
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
      Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
      ChangeSearchType() {
        this.filter.sportsmename = "";
        this.filter.coachname = "";
      },
       Approve(item) {
        var self = this;
        AppealResponseService.Approve(item.id)
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
       Send(item) {
        var self = this;
        AppealResponseService.Send(item.id)
          .then((res) => {
            self.makeToast(
              self.$t("SendMessage"),
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
        AppealResponseService.CancelApproval(item.id)
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
      getItemColor(text) {
        return text === "Актив"
          ? "success"
          : text === "Пассив"
          ? "danger"
          : text === "Создан"
          ? "primary"
          : text === "Yaratilgan"
          ? "primary"
          : text === "Утвержден"
          ? "success"
          : text === "Tasdiqlangan"
          ? "success"
          : text === "Тасдиқланган"
          ? "success"
           : text ===  "Bekor qilingan"
          ? "danger"
          : text ===  "Бекор қилинган"
          ? "danger"
          : text === "Отменено"
          ? "danger"
          : "primary";
      },
      rowclicked() {},
      Delete(item) {
        AppealResponseService.Delete(item.id)
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
      Refresh() {
        this.isBusy = true;
        AppealResponseService.GetList(
          this.filter.Search,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit,
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
  