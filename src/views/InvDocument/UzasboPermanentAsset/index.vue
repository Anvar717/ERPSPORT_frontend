<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard class="cardView">
        <h3 class="text-left ml-4 mt-3">
          {{ $t("UzasboPermanentAsset") }} 
        </h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol sm="3" class="text-left mt-2">
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
            <CCol sm="3" class="text-left mt-2">
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
                    color="info"
                  >
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol sm="4" class="text-left mt-2 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="info"
                variant="outline"
                style="height: 35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>

              <CButton
                @click="ImportRef"
                color="info"
                variant="outline"
                class="ml-2"
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

          <CRow class="form-group justify-content-start" >
            <CCol sm="3" class="mt-2">
              <div class="mt-3">
                <b-button-group @click="Refresh" size="sm">
                  <b-button
                    @click="filter.imported = null"
                    :variant="filter.imported == null ? 'info' : 'outline-info'"
                  >
                    {{ $t("All") }}
                  </b-button>
                  <b-button
                    @click="filter.imported = true"
                    :variant="filter.imported ? 'info' : 'outline-info'"
                  >
                    {{ $t("UzAsboImported") }}
                  </b-button>
                  <b-button
                    @click="filter.imported = false"
                    :variant="
                      filter.imported == false ? 'info' : 'outline-info'
                    "
                  >
                    {{ $t("UzAsboNotImported") }}
                  </b-button>
                </b-button-group>
              </div>
            </CCol>
            <CCol sm="2" class="mt-2">
              <div class="mt-3">
                <b-button-group @click="Refresh" size="sm">
                  <b-button
                    @click="filter.pasubrroupid = 0"
                    :variant="filter.pasubrroupid == 0 ? 'info' : 'outline-info'"
                  >
                    {{ $t("All") }}
                  </b-button>
                  <b-button
                    @click="filter.pasubrroupid = 10"
                    :variant="filter.pasubrroupid ? 'info' : 'outline-info'"
                  >
                    {{ $t("pasubrroupid10") }}
                  </b-button>
                </b-button-group>
              </div>
            </CCol>
            <CCol sm="2" class="mt-2">
              <div class="mt-3">
                <b-form-checkbox size="lg" @input="Refresh" v-model="filter.isduplicate">{{$t("isdublicate")}}</b-form-checkbox>
              </div>
            </CCol>
             <CCol sm="2" class="mt-2" >
              <div class="mt-3">
                <b-form-checkbox size="lg" @input="Refresh" v-model="filter.ispassive">{{$t("ispassive")}}</b-form-checkbox>
              </div>
            </CCol>

          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table-simple sticky-header="60vh" small responsive bordered style="min-height:50vh">
            <b-thead
              head-variant="info"
              style="background-color: rgb(198, 226, 255); color: rgb(79, 93, 115);position: sticky; top: 0px;"
            >
              <b-tr>
                <b-td
                  v-for="(item, idx) in fields"
                  :key="idx + 'aaa'"
                  class="styleTable"
                  style="border-color: #95caff;"
                >
                  <div
                    style="cursor: pointer"
                    @click="ChangeSort(item.key)"
                    v-if="item.sortable"
                  >
                    {{ item.label }}
                    <b-icon
                      v-if="filter.SortColumn == item.key"
                      :icon="filter.SortIcon"
                      variant="dark"
                    ></b-icon>
                  </div>

                  <div v-if="!item.sortable">
                    {{ item.label }}
                  </div>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td style="vertical-align:middle; border-color: #95caff;">
                </b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;">
                </b-td>

                <b-td style="vertical-align:middle; border-color: #95caff;">
                  <b-input
                    v-model="filter.asboId"
                    :placeholder="$t('asboId')"
                    @keyup.enter="Refresh"
                  ></b-input
                ></b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;">
                  <b-input
                    v-model="filter.inventorynumber"
                    :placeholder="$t('inventorynumber')"
                    @change="Refresh"
                    @keyup.enter="Refresh"
                  ></b-input>
                </b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;">
                  <b-input
                    v-model="filter.permanentassetname"
                    :placeholder="$t('permanentasset')"
                    @change="Refresh"
                    @keyup.enter="Refresh"
                  ></b-input>
                </b-td>
                <b-td
                  style="vertical-align:middle; border-color: #95caff; min-width:150px"
                >
                  <v-select
                    :options="unitofmeasurelist"
                    v-model="filter.unitofmeasureid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('unitofmeasure')"
                    label="name"
                    @input="Refresh"
                    @keyup.enter="Refresh"
                  ></v-select
                ></b-td>
                <b-td
                  style="vertical-align:middle; border-color: #95caff; min-width:150px"
                >
                  <b-input
                    v-model="filter.quantity"
                    :placeholder="$t('quantity')"
                    @keyup.enter="Refresh"
                  ></b-input>
                </b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;min-width:150px">
                </b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;min-width:150px">
                  <v-select
                    :options="pagrouplist"
                    v-model="filter.pagroupid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('pagroup')"
                    label="name"
                    @input="Refresh"
                    @keyup.enter="Refresh"
                  ></v-select
                ></b-td>
                <b-td
                  style="vertical-align:middle; border-color: #95caff; min-width:150px"
                >
                  <v-select
                    :options="pasubgrouplist"
                    v-model="filter.pasubrroupid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('pasubrroup')"
                    label="name"
                    @input="Refresh"
                    @keyup.enter="Refresh"
                  ></v-select
                ></b-td>
                <b-td
                  style="vertical-align:middle; border-color: #95caff; min-width:150px"
                >
                  <v-select
                    :options="DepartmentList"
                    v-model="filter.departmentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('department')"
                    label="name"
                    @input="Refresh"
                    @keyup.enter="Refresh"
                  ></v-select
                ></b-td>
                <b-td
                  style="vertical-align:middle; border-color: #95caff; min-width:150px"
                >
                  <v-select
                    :options="ResponsiblePersonList"
                    v-model="filter.responsiblepersonid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('responsibleperson')"
                    label="fullname"
                    @input="Refresh"
                    @keyup.enter="Refresh"
                  ></v-select>
                </b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;">
                </b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;">
                </b-td>
                <b-td style="vertical-align:middle; border-color: #95caff;">
                </b-td>
              </b-tr>

              <!-- <date-picker
                    v-model="filter.docdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('docdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup.enter="Refresh"
                  ></date-picker
                >  -->
            </b-thead>
            <b-tbody>
              <b-tr v-for="(row, rowIdx) in items" :key="rowIdx + 'aaa1'">
                <b-td
                  v-for="(field, fieldIdx) in fields"
                  :key="rowIdx + fieldIdx + 'aaa2'"
                  :class="field.class"
                >
                  <div v-if="field.key == 'amount'" >
                    {{
                      $options.filters.currency( row[field.key] , {
                        symbol: "",
                        thousandsSeparator: " ",
                        fractionCount: 2,
                      })
                    }}
                  </div>
                  <div v-if="field.key == 'actions'">
                    <div class="text-center">
                      <b-link
                        @click="ToForm(row)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('toform') }"
                        v-if="row.canimport"
                      >
                        <b-icon
                          variant="info"
                          icon="file-earmark-diff"
                        ></b-icon>
                      </b-link>
                       <b-link
                        @click="ImportByUzasboId(row)"
                        class="mr-2"
                        style="font-size:22px"
                        v-c-tooltip="{ content: $t('ImportByUzasboId') }"
                      >
                        <b-icon
                          variant="primary"
                          icon="arrow-repeat"
                        ></b-icon>
                      </b-link>
                      <b-link
                      v-if="$can('UzasboPermanentAssetPassiveView', 'permissions')"
                        @click="Passived(row)"
                        class="mr-2"
                        style="font-size:22px"
                        v-c-tooltip="{ content: $t('Passived') }"
                      >
                        <b-icon
                          variant="primary"
                          icon="arrow-down-square-fill"
                        ></b-icon>
                      </b-link>
                      <p class="h4 mb-0" v-if="filter.imported == false">
                        <b-icon
                          icon="check"
                          variant="light"
                          class="rounded-circle bg-success"
                        ></b-icon>
                        <!-- <b-icon icon="x-circle"></b-icon> -->
                      </p>
                      <p class="h4 mb-0" v-if="filter.imported">
                        <b-icon
                          icon="exclamation-circle"
                          variant="light"
                          class="rounded-circle bg-danger"
                        ></b-icon>
                        <!-- <b-icon icon="x-circle"></b-icon> -->
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="field.key != 'statusname' && field.key != 'actions' && field.key != 'amount'"
                    :class="
                      field.key == 'docdate' ? 'text-center' : 'text-left'
                    "
                  >
                    {{ row[field.key] }}
                  </div>
                  <div v-if="field.key == 'statusname'">
                    <CBadge :color="getItemColor(row.statusname)">{{
                      row.statusname
                    }}</CBadge>
                  </div>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <!-- <b-table
            :fields="fields"
            :items="items"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            head-row-variant="info"
            @row-clicked="rowclicked"
            sticky-header="60vh"
            no-border-collapse
            bordered
            :tbody-tr-class="rowClass"
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
           -->

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
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import PaGroupService from "@/services/PaGroup.service";
import PaSubGroupService from "@/services/PaSubGroup.service";
import DepartmentService from "@/services/Department.service";
import ResponsiblePersonService from "@/services/ResponsiblePerson.service";

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
          class: "text-right",
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
        // {
        //   key: "supplier",
        //   label: this.$t("supplier"),
        //   sortable: false,
        // },

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

        // {
        //   key: "retirementdate",
        //   label: this.$t("retirementdate"),
        //   sortable: false,
        // },
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
      unitofmeasurelist: [],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        isduplicate:false,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        asboId: "",
        id: 0,
        permanentassetname: "",
        unitofmeasureid: 0,
        quantity: null,
        pagroupid: 0,
        pasubrroupid: 0,
        departmentid: 0,
        responsiblepersonid: 0,
        inventorynumber: "",
        imported: null,
        ispassive:false,
      },
      importLoading: false,
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
      pagrouplist: [],
      pasubgrouplist: [],
      DepartmentList: [],
      ResponsiblePersonList: [],
    };
  },
  created() {
    this.Refresh();
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    PaGroupService.GetAll().then((res) => {
      this.pagrouplist = res.data;
    });
    PaSubGroupService.GetAll().then((res) => {
      this.pasubgrouplist = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      this.DepartmentList = res.data;
    });
    ResponsiblePersonService.GetAll().then((res) => {
      this.ResponsiblePersonList = res.data;
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
    rowClass(item, type) {
      if (!item.canimport) return "table-success";
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
          quantity: item.quantity,
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
    ImportByUzasboId(item) {
      this.isBusy = true;
      UzasboPermanentAssetService.ImportByUzasboId(item.asboid)
        .then((res) => {
          this.makeToast(
            this.$t("ImportByUzasboMessage"),
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
    Passived(item) {
      this.isBusy = true;
      UzasboPermanentAssetService.Passived(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("PassivedMessage"),
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
        this.filter.asboId,
        this.filter.imported,
        this.filter.id,
        this.filter.permanentassetname,
        this.filter.unitofmeasureid,
        this.filter.quantity,
        this.filter.pagroupid,
        this.filter.pasubrroupid,
        this.filter.departmentid,
        this.filter.responsiblepersonid,
        this.filter.inventorynumber,
        this.filter.isduplicate,
        this.filter.ispassive
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
  white-space: nowrap;
}
.CWidthpasubrroup {
  width: 300px;
}
.table-striped tbody tr.table-success:nth-of-type(odd) {
  background-color: #c4ebd1;
}
</style>
