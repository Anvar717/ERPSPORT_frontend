<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("User") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="5" md="5" sm="11" class="text-left">
              <custom-search
                v-model="filter.Search"
                @search="Refresh"
              ></custom-search>
            </CCol>
            <CCol lg="7" md="7" sm="12" class="text-lg-right mt-2">
              <CButton
                v-if="$can('UserEdit', 'permissions')"
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
            <template v-slot:cell(statename)="{ item }">
              <CBadge :color="getItemColor(item.statename)">{{
                item.statename
              }}</CBadge>
            </template>
            <template v-slot:head(id)>
              <div style="cursor: pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(username)>
              <div style="cursor: pointer" @click="ChangeSort('username')">
                {{ $t("username") }}
                <b-icon
                  v-if="filter.SortColumn === 'username'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(displayname)>
              <div style="cursor: pointer" @click="ChangeSort('displayname')">
                {{ $t("userdisplayname") }}
                <b-icon
                  v-if="filter.SortColumn === 'displayname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(roles)>
              <div style="cursor: pointer" @click="ChangeSort('roles')">
                {{ $t("roles") }}
                <b-icon
                  v-if="filter.SortColumn === 'roles'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(orgname)>
              <div style="cursor: pointer" @click="ChangeSort('orgname')">
                {{ $t("orgname") }}
                <b-icon
                  v-if="filter.SortColumn === 'orgname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(inn)>
              <div style="cursor: pointer" @click="ChangeSort('inn')">
                {{ $t("inn") }}
                <b-icon
                  v-if="filter.SortColumn === 'inn'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(email)>
              <div style="cursor: pointer" @click="ChangeSort('email')">
                {{ $t("email") }}
                <b-icon
                  v-if="filter.SortColumn === 'email'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(lastaccesstime)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('lastaccesstime')"
              >
                {{ $t("lastaccesstime") }}
                <b-icon
                  v-if="filter.SortColumn === 'lastaccesstime'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>

            <!-- <template v-slot:cell(roles)="{item}">
              <div style="width:10px">
                {{item.roles}}
              </div>
            </template> -->
            <template v-slot:cell(status)="{ item }">
              <CBadge :color="getItemColor(item.status)">{{
                item.status
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="$can('UserEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <!-- <b-link
                  v-if="$can('UserDelete', 'permissions')"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" ></b-icon>
                </b-link> -->
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
                @change="ChangePage"
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
import AccountService from "@/services/account.service";
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
          key: "username",
          label: this.$t("username"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "displayname",
          label: this.$t("displayname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "roles",
          label: this.$t("roles"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "orgname",
          label: this.$t("orgname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "inn",
          label: this.$t("inn"),
          sortable: false,
        },
        {
          key: "email",
          label: this.$t("email"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "lastaccesstime",
          label: this.$t("lastaccesstime"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "statename",
          label: this.$t("status"),
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
  async created() {
    (this.filter.Search = this.$route.query.Search || this.filter.Search),
      (this.filter.SortColumn =
        this.$route.query.SortColumn || this.filter.SortColumn),
      (this.filter.OrderType =
        this.$route.query.OrderType || this.filter.OrderType),
      (this.filter.PageNumber =
        parseInt(this.$route.query.PageNumber) || this.filter.PageNumber),
      (this.filter.PageLimit =
        parseInt(this.$route.query.PageLimit) || this.filter.PageLimit),
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
    ChangePage(page) {
      // this.filter.PageNumber = page
      this.Refresh();
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditUser",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditUser",
        params: {
          id: item.id,
        },
        query: {
          Search: this.filter.Search,
          SortColumn: this.filter.SortColumn,
          OrderType: this.filter.OrderType,
          PageNumber: this.filter.PageNumber,
          PageLimit: this.filter.PageLimit,
        },
      });
    },
    Delete(item) {
      AccountService.Delete(item.id)
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
      // if (this.filter.PageNumber !== 1) {
      //   this.filter.PageNumber = 1;
      // } else {
      //   this.Refresh();
      // }
    },
    Refresh() {
      this.isBusy = true;
      AccountService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
        // if(!!this.$route.query.PageNumber){
        //   this.$router.replace({'query': null});
        // }
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
