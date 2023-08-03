<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard class="cardView">
        <h3 class="text-center mb-3 mt-3">
          {{ $t("UzasboPermanentAsset") }}
        </h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol sm="3" class="text-left">
              <CInput
                :placeholder="$t('searchAsboId')"
                autocomplete="text"
                v-model="filter.asboId"
                v-on:keyup.enter="Search"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="info"
                  >
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol>
              <CButton
                @click="ImportRef"
                color="info"
                variant="outline"
                class=""
                size="sm"
                style="height: 35px"
              >
                <b-spinner
                  small
                  v-if="importLoading"
                  variant="info"
                ></b-spinner>
                {{ $t("ImportRefAsbo") }}
              </CButton>
            </CCol>
            <CCol sm="2" class="text-lg-right mt-2">
              <!-- <CButton
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
                v-if="$can('PermanentAssetEdit', 'permissions')"
              >
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton> -->

              <CButton
                variant="outline"
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
          <!-- <CRow class="form-group">
            <CCol lg="4" md="6" sm="12" class="text-left mt-2">
              
            </CCol>
          </CRow> -->
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
           
            @row-clicked="rowclicked"
            sticky-header="60vh"
            no-border-collapse
            bordered
            :tbody-tr-class="rowClass"
          >
            <!-- striped -->
            <!-- 
              @row-dblclicked="Edit"
              style="white-space: nowrap" 
              -->
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

            <template v-slot:cell(amount)="{ item }">
              <div style="white-space:nowrap">
                {{
                  $options.filters.currency(item.amount, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}
              </div>
              <!-- <CBadge :color="getItemColor(item.amount)">{{
                item.statename
              }}</CBadge> -->
            </template>
            <template v-slot:cell(quantity)="{ item }">
              <div style="white-space:nowrap">
                {{
                  $options.filters.currency(item.quantity, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}
              </div>
              <!-- <CBadge :color="getItemColor(item.amount)">{{
                item.statename
              }}</CBadge> -->
            </template>

            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="ToForm(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('toform') }"
                  v-if="item.canimport"
                >
                  <b-icon variant="info" icon="file-earmark-diff"></b-icon>
                </b-link>
                <p class="h4 mb-0" v-if="!item.canimport">
                  <b-icon
                    icon="check"
                    variant="light"
                    class="rounded-circle bg-success"
                  ></b-icon>
                </p>
                <!-- <b-link
                  @click="ToForm(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('toform') }"
                  v-if="item.canimport"
                >
                  <b-icon variant="info" icon="x-lg"></b-icon>
                </b-link> -->
                <!-- <b-link
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                  v-if="$can('PermanentAssetDelete', 'permissions')"
                >
                  <b-icon icon="trash"></b-icon>
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
                pills
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
import UzasboPermanentAssetService from "@/services/UzasboPermanentAsset.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          style: "width:10%",
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        },
        {
          key: "asboid",
          label: this.$t("asboid"),
          sortable: false,
          class: "text-right",
        },
        {
          key: "inventorynumber",
          label: this.$t("inventorynumber"),
          sortable: false,
          class: "text-right",
        },
        {
          key: "permanentassetname",
          label: this.$t("permanentasset"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasurename"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "quantity",
          label: this.$t("Count1"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "amount",
          label: this.$t("amount"),
          sortable: false,
          class: "text-right CWidthAmount",
        },
        {
          key: "pagroupname",
          label: this.$t("pagroup"),
          sortable: false,
        },
        {
          key: "pasubrroupname",
          label: this.$t("pasubrroup"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "ageingrate",
          label: this.$t("ageingrate"),
          sortable: false,
          class: "text-left",
        },

        {
          key: "departmentname",
          label: this.$t("departmentname"),
          sortable: false,
          class: "text-left",
        },

        {
          key: "responsiblepersonname",
          label: this.$t("responsiblepersonname"),
          sortable: false,
          class: "text-left",
        },

        // {
        //   key: "createduserid",
        //   label: this.$t("createduserid"),
        //   sortable: false,
        //   class: "text-left",
        // },
        {
          key: "supplier",
          label: this.$t("supplier"),
          sortable: false,
        },

        {
          key: "deliverydate",
          label: this.$t("deliverydate"),
          sortable: false,
          class: "text-center",
        },
        // {
        //   key: "departmentid",
        //   label: this.$t("departmentid"),
        //   sortable: false,
        //   class: "text-left",
        // },

        {
          key: "implementationdate",
          label: this.$t("implementationdate"),
          sortable: false,
        },
        // {
        //   key: "lastrepairsum",
        //   label: this.$t("lastrepairsum"),
        //   sortable: false,
        // },

        {
          key: "retirementdate",
          label: this.$t("retirementdate"),
          sortable: false,
        },
        {
          key: "intakequantity",
          label: this.$t("intakequantity"),
          sortable: false,
        },
        // {
        //   key: "dateofcreated",
        //   label: this.$t("dateofcreated"),
        //   sortable: false,
        //   class: "text-left",
        // },
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
        asboId: "",
      },
      importLoading: false,
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
    rowClass(item, type) {
      console.log(item)
      if (item && !item.canimport) return "table-success";
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
        name: "EditPermanentAsset",
        params: {
          id: 0,
        },
      });
    },
    ToForm(item) {
      this.$router.push({
        name: "EditUzasboPermanentAsset",
        query: {
          asboid: item.asboid,
          pagroupid: item.pagroupid,
          pasubrroupid: item.pasubrroupid,
          retirementdate: item.retirementdate,
          deliverydate: item.deliverydate,
          implementationdate: item.implementationdate,
          unitofmeasureid: item.unitofmeasureid,
          amount: item.amount,
          inventorynumber: item.inventorynumber,
          permanentassetname: item.permanentassetname,
        },
        params: {
          id: 0,
        },
      });
    },
    Delete(item) {
      UzasboPermanentAssetService.Delete(item.id)
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
    ImportRef() {
      this.importLoading = true;
      UzasboPermanentAssetService.Import()
        .then((res) => {
          // console.log("AAAAA", res);

          this.Refresh();
          this.importLoading = false;
        })
        .catch((err) => {
          console.log("error", err);
          this.importLoading = false;
        });
    },
    Refresh() {
      this.isBusy = true;
      UzasboPermanentAssetService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.asboId
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

<style>
.table thead th {
  vertical-align: top;
  text-align: center !important;
}
.CWidthAmount {
  width: 300px;
}
.CWidthpasubrroup {
  width: 300px;
}
.table-striped tbody tr.table-success:nth-of-type(odd) {
  background-color: #c4ebd1;
}
</style>
