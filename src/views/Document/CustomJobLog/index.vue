<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("CustomJobLog") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="7" md="6" sm="12" class="text-lg-right mt-2">
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
            style="height:500px"
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
            <template v-slot:head(oblastname)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('oblastname')">
                {{ $t("oblastname") }}
                <b-icon v-if="filter.SortColumn === 'oblastname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(regionname)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('regionname')">
                {{ $t("regionname") }}
               <b-icon v-if="filter.SortColumn === 'regionname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(jobtypename)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('jobtypename')">
                {{ $t("jobtypename") }}
                <b-icon v-if="filter.SortColumn === 'jobtypename'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            
            <template v-slot:head(detailinfo)>
              <div class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('detailinfo')"
              >
                {{ $t("detailinfo") }}
                <b-icon v-if="filter.SortColumn === 'detailinfo'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>

            <template v-slot:head(statusname)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('statusname')">
                {{ $t("statusname") }}
                <b-icon v-if="filter.SortColumn === 'statusname'" :icon="filter.SortIcon"></b-icon>
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
                  <b-icon icon="pencil" ></b-icon>
                </b-link>
                <b-link
                  @click="GetError(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('GetError') }"
                >
                  <b-icon icon="bug" ></b-icon>
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
                      v-if="$can('HeadroomDelete', 'permissions')"
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2" ></b-icon>
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
                <b-modal :id="'ErrorModal' + item.id" hide-footer size="xl" :title="$t('error')">
                  <b-row>
                    <b-col>
                      <CInput
                          :placeholder="$t('search')"
                          autocomplete="text"
                          v-model="ErrorFilter.Search"
                          v-on:keyup.enter="c"
                        >
                          <template #append>
                            <CButton
                              @click="ErrorRefresh"
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
                    </b-col>
                    <b-col>

                    </b-col>
                  </b-row>
                  <b-table
                    :fields="ErrorFields"
                    bordered
                   
                    small
                    :items="ErrorItems"
                    striped
                    show-empty
                    :busy="ErrorLoading"
                    sticky-header="60vh"
                    no-border-collapse
                  >
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
                      {{ $t("RecordsFrom") }} {{ ErrorfirstNumber }} {{ $t("by") }}
                      {{ ErrorlastNumber }} {{ $t("of") }}
                      {{ ErrortotalRows }}
                    </div>
                    <div style="float:left" class="ml-2 mr-2 mt-n1">
                      <b-form-select
                        v-model="ErrorFilter.PageLimit"
                        id="PageLimitSelect"
                        size="sm"
                        :options="ErrorFilter.pageOptions"
                        @input="ErrorRefresh(item)"
                      ></b-form-select>
                    </div>
                    <div style="float:left;font-size:12px">
                      {{ $t("RecordsPerPage") }}
                    </div>
                    <div style="float:right">
                      <b-pagination
                        v-model="ErrorFilter.PageNumber"
                        :total-rows="ErrortotalRows"
                        :per-page="ErrorFilter.PageLimit"
                        align="right"
                        size="sm"
                        class="my-0"
                        @input="ErrorRefresh(item)"
                      ></b-pagination>
                    </div>
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
                style="vertical-align:middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div style="float:left;font-size:12px">
              {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
              {{ lastNumber }} {{ $t("of") }}
              {{ totalRows }}
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
import CustomJobLogService from '@/services/CustomJobLog.service'
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thClass : 'text-center'
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
          key: "jobtypename",
          label: this.$t("jobtypename"),
          sortable: false,
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          thClass : 'text-center'
        },
        {
          key: "donecount",
          label: this.$t("donecount"),
          sortable: false,
          thClass : 'text-center'
        },
        {
          key: "errorcount",
          label: this.$t("errorcount"),
          sortable: false,
          thClass : 'text-center'
        },
        {
          key: "totalcount",
          label: this.$t("totalcount"),
          sortable: false,
          thClass : 'text-center'
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          thClass : 'text-center'
        },
      ],
      ErrorFields : [
        {
          key: "paramsinfo",
          label: this.$t("paramsinfo"),
          sortable: false,
          thClass : 'text-center'
        },
        {
          key: "resultinfo",
          label: this.$t("resultinfo"),
          sortable: false,
          thClass : 'text-center'
        },
      ],
      items: [],
      ErrorItems : [],
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
      },
      ErrorFilter : {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100]
      },
      ErrorLoading : false,
      ErrortotalRows : 0
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
    ErrorfirstNumber() {
      return this.ErrortotalRows > 0
        ? (this.ErrorFilter.PageNumber - 1) * this.ErrorFilter.PageLimit + 1
        : 0;
    },
    ErrorlastNumber() {
      if (this.ErrortotalRows < this.ErrorFilter.PageLimit) {
        return this.ErrortotalRows;
      } else {
        if (this.ErrorFilter.PageNumber * this.ErrorFilter.PageLimit > this.ErrortotalRows) {
          return this.ErrortotalRows;
        } else {
          return this.ErrorFilter.PageNumber * this.ErrorFilter.PageLimit;
        }
      }
    }
  },
  methods: {
    ErrorRefresh(item){
      this.ErrorLoading = true
      CustomJobLogService.GetErrorLogList(
        item.id,
        this.ErrorFilter.Search,
        this.ErrorFilter.SortColumn,
        this.ErrorFilter.OrderType,
        this.ErrorFilter.PageNumber,
        this.ErrorFilter.PageLimit
      ).then(res => {
        this.ErrorItems = res.data.rows
        this.ErrorLoading = false
        this.ErrortotalRows = res.data.total
      }).catch(error => {
        this.makeToast(error.response.data.error,this.$t('error'),'danger')
        this.ErrorLoading = false
      })
    },
    GetError(item){
      this.$bvModal.show('ErrorModal' + item.id)
      this.ErrorRefresh(item)
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
        name: "EditCustomJobLog",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditCustomJobLog",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      CustomJobLogService.Delete(item.id)
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
      CustomJobLogService.Approve(item.id)
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
      CustomJobLogService.CancelApproval(item.id)
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
      CustomJobLogService.GetList(
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
    }
  },
};
</script>

<style></style>
