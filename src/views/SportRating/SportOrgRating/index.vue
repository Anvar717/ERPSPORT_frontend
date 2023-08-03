<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("SportOrgRating") }}</h3>
        <CCardHeader>
          <CRow class="form-group justify-content-between">
            <CCol lg="3" md="3" sm="11" class="text-left">
              <v-select
                :options="OrganizationTypeList"
                v-model="filter.organizationTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('OrganizationType')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="5" md="5" sm="12" class="text-lg-right mt-2" style="margin-right: -7px">
              <CButton
                v-if="$can('SportOrgRatingEdit', 'permissions')"
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="plus"></b-icon>
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
          <b-row>
            <b-col>
              <b-button-group @click="Refresh" size="sm">
                <b-button
                  @click="filter.statusid = 0"
                  :variant="
                    filter.statusid == 0 ? 'primary' : 'outline-primary'
                  "
                >{{ $t("All") }}</b-button>
                <b-button
                  @click="filter.statusid = 1"
                  :variant="
                    filter.statusid == 1 ? 'primary' : 'outline-primary'
                  "
                >{{ $t("AllNew") }}</b-button>
                <b-button
                  @click="filter.statusid = 4"
                  :variant="
                    filter.statusid == 4 ? 'primary' : 'outline-primary'
                  "
                >{{ $t("edited") }}</b-button>
                <b-button
                  @click="filter.statusid = 2"
                  :variant="
                    filter.statusid == 2 ? 'primary' : 'outline-primary'
                  "
                >{{ $t("accepted") }}</b-button>
                <b-button
                  @click="filter.statusid = 3"
                  :variant="
                    filter.statusid == 3 ? 'primary' : 'outline-primary'
                  "
                >{{ $t("canceled") }}</b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="height: 450px; white-space: nowrap"
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
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor: pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon v-if="filter.SortColumn === 'docnumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor: pointer" @click="ChangeSort('docdate')">
                {{ $t("ihincomedate") }}
                <b-icon v-if="filter.SortColumn === 'docdate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(organizationtype)>
              <div style="cursor: pointer" @click="ChangeSort('organizationtype')">
                {{ $t("organizationtype") }}
                <b-icon v-if="filter.SortColumn === 'organizationtype'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schooltype)>
              <div style="cursor: pointer" @click="ChangeSort('schooltype')">
                {{ $t("schooltype") }}
                <b-icon v-if="filter.SortColumn === 'schooltype'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>

            <template v-slot:head(detailinfo)>
              <div style="cursor: pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon v-if="filter.SortColumn === 'detailinfo'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor: pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(status)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">
                {{
                item.statusname
                }}
              </CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link @click="View(item)" class="mr-2" v-c-tooltip="{ content: $t('View') }">
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="
                    $can('SportOrgRatingEdit', 'permissions') &&
                    item.statusid != 2 &&
                    item.statusid != 8 &&
                    item.statusid != 9
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="
                        $can('SportOrgRatingSend', 'permissions') &&
                        item.statusid == 2
                      "
                     @click="$bvModal.show('SendModal' + item.id)"
                      v-c-tooltip="{ content: $t('Send') }"
                >
                  <b-icon icon="cursor" class="mr-2"></b-icon>
                </b-link>
                <b-link
                  v-if="
                        $can('SportOrgRatingDelete', 'permissions') &&
                        item.statusid != 2 &&
                        item.statusid != 9 &&
                        item.statusid != 8
                      "
                  @click="$bvModal.show('DeleteModal' + item.id)"
                      v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" class="mr-2"></b-icon>
                </b-link>
                <!-- <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="
                        $can('SportOrgRatingApprove', 'permissions') &&
                        item.statusid != 2 &&
                        item.statusid != 8 &&
                        item.statusid != 9
                      "
                      @click="$bvModal.show('ApproveModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can('SportOrgRatingCancelApproval', 'permissions') &&
                        item.statusid == 2
                      "
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can('SportOrgRatingDelete', 'permissions') &&
                        item.statusid != 2 &&
                        item.statusid != 9 &&
                        item.statusid != 8
                      "
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>

                    <b-dropdown-item
                      v-if="
                        $can('SportOrgRatingSend', 'permissions') &&
                        item.statusid == 2
                      "
                      @click="$bvModal.show('SendModal' + item.id)"
                    >
                      <b-icon icon="cursor" class="mr-2"></b-icon>
                      {{ $t("Send") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="$can('SportOrgRatingAccept', 'permissions')"
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon icon="check2" class="mr-2"></b-icon>
                      {{ $t("Received") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="$can('SportOrgRatingReject', 'permissions')"
                      @click="$bvModal.show('RejectModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("Reject") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>-->

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

                <b-modal :id="'AcceptModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('AcceptModal' + item.id)"
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

                <b-modal :id="'RejectModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantReject") }}</template>
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
                <b-modal :id="'ApproveModal' + item.id" hide-footer>
                  <template v-slot:modal-title>
                    {{
                    $t("WantApprove")
                    }}
                  </template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('ApproveModal' + item.id)"
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
              <div class="text-center text-primary my-2 mt-5" style="vertical-align: middle">
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
              <div class="per-page" style="float: left; font-size: 12px">{{ $t("RecordsPerPage") }}</div>
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
import SportOrgRatingService from "@/services/SportOrgRating.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-left"
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "docdate",
          label: this.$t("ihincomedate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyear"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "ratingperiodname",
          label: this.$t("ratingperiod"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "totalscore",
          label: this.$t("ratingtotalscore"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "oblastname",
          label: this.$t("oblast"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
        {
          key: "regionname",
          label: this.$t("region"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        }
      ],
      items: [],
      OrganizationTypeList: [],
      totalRows: "",
      isBusy: true,
      lang: localStorage.getItem("locale") || "ru",
      filter: {
        Search: "",
        organizationtypeid: 0,
        statusid: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up"
      }
    };
  },
  created() {
    this.Refresh();
    OrganizationTypeService.GetAll(this.lang).then(res => {
      this.OrganizationTypeList = res.data;
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
    }
  },
  methods: {
    getItemColor(id) {
      return id === 1
        ? "primary"
        : id === 9
        ? "success"
        : id === 10
        ? "danger"
        : id === 3
        ? "danger"
        : id === 8
        ? "warning"
        : id === 4
        ? "primary"
        : id === 2 
        ? "success"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditSportOrgRating",
        params: {
          id: 0
        }
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditSportOrgRating",
        params: {
          id: item.id
        }
      });
    },
    Delete(item) {
      SportOrgRatingService.Delete(item.id)
        .then(res => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    View(item) {
      this.$router.push({
        name: "ViewSportOrgRating",
        params: {
          id: item.id
        }
      });
    },
    Send(item) {
      SportOrgRatingService.Send(item.id)
        .then(res => {
          this.makeToast(this.$t("SendMessage"), this.$t("message"), "success");
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },

    Accept(item) {
      SportOrgRatingService.Accept(item.id)
        .then(res => {
          this.makeToast(
            this.$t("AcceptMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },

    Reject(item) {
      SportOrgRatingService.Reject(item.id)
        .then(res => {
          this.makeToast(
            this.$t("RejectMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },

    Approve(item) {
      var self = this;
      SportOrgRatingService.Approve(item.id)
        .then(res => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    CancelApproval(item) {
      var self = this;
      SportOrgRatingService.CancelApproval(item.id)
        .then(res => {
          self.makeToast(
            self.$t("CancelMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch(error => {
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
      SportOrgRatingService.GetList(
        this.filter.Search,
        this.filter.organizationtypeid,
        this.filter.statusid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then(res => {
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
        solid: true
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
    }
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    }
  }
};
</script>
  
  <style></style>
  