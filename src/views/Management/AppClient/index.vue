<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-left">{{ $t("AppClient") }}</h3>
          </b-col>
          <b-col class="text-right">
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
          </b-col>
        </b-row>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="4" md="4" sm="12" class="text-lg-right mt-2"> </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            style="height:500px"
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
            <template v-slot:head(appname)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('appname')"
              >
                {{ $t("appname") }}
                <b-icon
                  v-if="filter.SortColumn === 'appname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(id)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('id')"
              >
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(allowedip)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('allowedip')"
              >
                {{ $t("allowedip") }}
                <b-icon
                  v-if="filter.SortColumn === 'allowedip'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(tokenlifetime)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('tokenlifetime')"
              >
                {{ $t("tokenlifetime") }}
                <b-icon
                  v-if="filter.SortColumn === 'tokenlifetime'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(redirecturi)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('redirecturi')"
              >
                {{ $t("redirecturi") }}
                <b-icon
                  v-if="filter.SortColumn === 'redirecturi'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(postlogoutredirecturi)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('postlogoutredirecturi')"
              >
                {{ $t("postlogoutredirecturi") }}
                <b-icon
                  v-if="filter.SortColumn === 'postlogoutredirecturi'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(authusertypename)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('authusertypename')"
              >
                {{ $t("authusertype") }}
                <b-icon
                  v-if="filter.SortColumn === 'authusertypename'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>

            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusname)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
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
              </div>
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
                id="perPageSelect"
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
import AppClientService from "@/services/AppClient.service";
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
          tdClass: "text-right",
        },
        {
          key: "appname",
          label: this.$t("appname"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "allowedip",
          label: this.$t("allowedip"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "tokenlifetime",
          label: this.$t("tokenlifetime"),
          sortable: false,
          tdClass: "text-right",
        },
        {
          key: "redirecturi",
          label: this.$t("redirecturi"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "postlogoutredirecturi",
          label: this.$t("postlogoutredirecturi"),
          sortable: false,
          tdClass: "text-left",
        },
        {
          key: "authusertypename",
          label: this.$t("authusertype"),
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
      lang: localStorage.getItem("locale") || "ru",
      PrintLoading: false,
    };
  },
  created() {
    this.Refresh();
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
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Создан"
        ? "success"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditAppClient",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditAppClient",
        params: {
          id: item.id,
        },
      });
    },
    Approve(item) {
      var self = this;
      AppClientService.Approve(item.id)
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
      AppClientService.CancelApproval(item.id)
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
    Delete(item) {
      AppClientService.Delete(item.id)
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
      AppClientService.GetList(
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
