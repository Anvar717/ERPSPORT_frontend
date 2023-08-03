<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard class="cardView">
        <h3 v-if="!isComponent" class="text-left ml-4 mt-3">
          {{ $t("PermanentAssetReport") }}
        </h3>
        <CCardHeader v-if="!isComponent">
          <CRow class="form-group">
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol
              lg="7"
              md="6"
              sm="12"
              class="text-lg-right mt-2"
              v-if="!isComponent"
            >
              <!-- <CButton
                @click="Create"
                color="info"
                variant="outline"
                class="mr-2"
                size="sm"
                v-if="$can('PermanentAssetEdit', 'permissions')"
              >
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton> -->
              <!-- <CCol lg="1" md="1" sm="12" class="text-right mt-2"> -->
              <CButton
                @click="TermoPrint"
                color="primary"
                class="mr-2"
                size="sm"
              >
                <b-icon v-if="!TermoPrint" icon="printer"></b-icon>
                <b-spinner v-if="TermoPrintLoading" small></b-spinner>
                &nbsp; {{ $t("Export") }} (Termoprinter)
              </CButton>
              <CButton @click="Print" color="primary" class="mr-2" size="sm">
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                &nbsp; {{ $t("Export") }}
              </CButton>
              <!-- </CCol> -->
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
        </CCardHeader>
        <b-row v-if="isComponent" class="mx-2 mt-3 mb-n3">
          <b-col sm="12" md="6" lg="4">
            <CInput
              :placeholder="$t('search')"
              autocomplete="text"
              v-model="filter.Search"
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
          </b-col>
        </b-row>
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
           
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <!-- @row-dblclicked="Edit" -->
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
            <template v-slot:cell(inventorynumber)="{ item }">
              <div @click="GoReport(item)" style="color:blue;cursor:pointer">
                {{ item.inventorynumber }}
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
              {{
                $options.filters.currency(item.amount, {
                  symbol: "",
                  fractionCount: 2,
                })
              }}
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                  v-if="$can('PermanentAssetEdit', 'permissions')"
                >
                  <b-icon variant="info" icon="pencil"></b-icon>
                </b-link>
                <b-link
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                  v-if="$can('PermanentAssetDelete', 'permissions')"
                >
                  <b-icon variant="danger" icon="trash"></b-icon>
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
                class="my-0 mobile-pagination"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol style="display : none">
      <div id="test">
        <div v-for="(item, index) in items" :key="index">
          <div style="height: 109px;"></div>
          <div
            style="width:320px; height: 154px;text-align:left; font-weight: bold; font-family: Arial, Helvetica, sans-serif; border: 1px solid black; font-size: 11px;"
          >
            <div style="margin-top: 5px;text-align:center;">
              <img height="80" :id="'barcode' + item.inventorynumber" alt="" />
            </div>
            <div
              style="margin-left: 10px; margin-top: 10px; line-height: 14px;"
            >
              <span> Nomi : {{ item.permanentassetname }} </span><br />
              <span> Javobgar shaxs : {{ item.responsiblepersonname }} </span
              ><br />
              <span> Bo'lim : {{ item.departmentname }} </span> <br />
              <span> Xona : {{ item.roomname }} </span>
            </div>
          </div>
          <div style="height: 109px;"></div>
        </div>
      </div>
    </CCol>
  </CRow>
</template>

<script>
import PermanentAssetReportService from "@/services/PermanentAssetReport.service";
import JSBarcode from "jsbarcode";
export default {
  props: {
    isComponent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fields: [
        // {
        //   key: this.isComponent ? null : "actions",
        //   label: this.$t("actions"),
        //   style: "width:10%",
        // },
        // {
        //   key: "id",
        //   label: this.$t("id"),
        //   sortable: false,
        // },

        // {
        //   key: "code",
        //   label: this.$t("code"),
        //   sortable: false,
        // },
        {
          key: "departmentname",
          label: this.$t("departmentname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "roomname",
          label: this.$t("room"),
          sortable: false,
          class: "text-left",
        },

        {
          key: "responsiblepersonname",
          label: this.$t("responsibleperson"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "inventorynumber",
          label: this.$t("inventorynumber"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "permanentassetname",
          label: this.$t("permanentasset"),
          sortable: false,
          class: "text-left",
        },

        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasure"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "quantity",
          label: this.$t("quantity"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "amount",
          label: this.$t("amount"),
          sortable: false,
          class: "text-right",
        },

        // {
        //   key: "statename",
        //   label: this.$t("statusname"),
        //   sortable: false,
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
        pageOptions: [1, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      PrintLoading: false,
      TermoPrintLoading: false,
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
    GoReport(item) {
      this.$router.push({
        name: "GetPermanentAssetCard",
        query: {
          inventorynumber: item.inventorynumber,
        },
      });
    },
    Print() {
      this.PrintLoading = true;
      PermanentAssetReportService.PrintPermanentAssetReport(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "PermanentAssetReport.xlsx");

          fileLink.click();
          this.PrintLoading = false;
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
          this.PrintLoading = false;
        });
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
    Edit(item) {
      if (!this.isComponent) {
        this.$router.push({
          name: "EditPermanentAsset",
          params: {
            id: item.id,
          },
        });
      } else {
        this.$emit("select", item);
      }
    },
    Delete(item) {
      PermanentAssetService.Delete(item.id)
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
      PermanentAssetReportService.GetList(
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
    TermoPrint() {
      for (let i = 0; i < this.items.length; i++) {
        // JSBarcode(`#barcode${this.items[i].inventorynumber}`, this.items[i].inventorynumber)
        JsBarcode(`#barcode${this.items[i].inventorynumber}`)
          .CODE128(this.items[i].inventorynumber, {
            fontSize: 18,
            textMargin: 0,
          })
          .blank(20) // Create space between the barcodes
          .render();
      }
      var divContents = document.getElementById("test").innerHTML;
      var a = window.open("", "", "width=320");
      a.document.write(
        "<html><style> @media print { @page { size: landscape } } </style>"
      );
      a.document.write("<body>");
      a.document.write(divContents);
      a.document.write("</body></html>");
      a.document.close();
      a.print();
      a.close();
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
@media print {
  @page {
    size: landscape;
  }
}
</style>
