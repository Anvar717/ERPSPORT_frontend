<template>
  <b-container fluid>
    <b-overlay :show="show" rounded="sm">
      <b-card>
        <template #header>
          <b-row>
            <b-col>
              <h3 class="text-center mb-0">{{ $t("PayrollSheet") }}</h3>
            </b-col>
          </b-row>
        </template>
        <b-row>
          <b-col>
            <label for="docnumber"> {{ $t("docnumber") }} </label>
            <b-form-input
              id="docnumber"
              type="text"
              v-model="PayrollSheet.docnumber"
            ></b-form-input>
          </b-col>
          <b-col>
            <label>{{ $t("docdate") }}</label>
            <date-picker
              v-model="PayrollSheet.docdate"
              size="sm"
              lang="ru"
              :placeholder="$t('date')"
              value-type="format"
              format="DD.MM.YYYY"
              style="width: 100%"
              :disabled="DisabledItem()"
            ></date-picker>
          </b-col>
          <b-col>
            <label for="#"> {{ $t("Month") }} </label>
            <v-select
              :options="MonthsList"
              v-model="PayrollSheet.Month"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="label"
              @input="FillDetailInfo"
              :disabled="DisabledItem()"
            ></v-select>
          </b-col>
          <b-col>
            <label for="#"> {{ $t("Year") }} </label>
            <v-select
              :options="YearsList"
              v-model="PayrollSheet.Year"
              :reduce="(item) => item.name"
              :placeholder="$t('ChooseBelow')"
              label="name"
              @input="FillDetailInfo"
              :disabled="DisabledItem()"
            ></v-select>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col md="3" sm="12">
            <label for="#"> {{ $t("OrganizationAccount") }} </label>
            <v-select
              :options="OrganizationAccountList"
              v-model="PayrollSheet.organizationaccountid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="code"
              :disabled="DisabledItem()"
            ></v-select>
          </b-col>
          <b-col md="3" sm="12">
            <CInput
              :label="$t('percentage')"
              :disabled="DisabledItem()"
              v-model="PayrollSheet.percentage"
            ></CInput>
          </b-col>
          <!-- <b-col md="6" sm="12">
                    <label for="#"> {{ $t('Department') }} </label>
                    <v-select
                        :options="DepartmentList"
                        v-model="PayrollSheet.departmentid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        :disabled="DisabledItem()"
                    ></v-select>
                </b-col> -->
        </b-row>
        <b-row class="mt-n2">
          <b-col md="3" sm="12" class="d-flex align-items-center">
            <b-form-checkbox
              switch
              v-model="PayrollSheet.isadvance"
              :disabled="DisabledItem()"
            >
              {{ $t("isadvance") }}
            </b-form-checkbox>
          </b-col>
          <b-col md="3" sm="12" class="d-flex align-items-center">
            <b-form-checkbox
              switch
              v-model="PayrollSheet.isplastic"
              :disabled="DisabledItem()"
            >
              {{ $t("isplastic") }}
            </b-form-checkbox>
          </b-col>
          <b-col md="6" sm="12">
            <CInput
              :label="$t('detailinfo')"
              v-model="PayrollSheet.detailinfo"
            ></CInput>
          </b-col>
        </b-row>
        <b-row v-if="PayrollSheet.CanSave">
          <b-col class="text-center">
            <CButton
              class="sm-1 mr-2"
              size="sm"
              color="info"
              @click="FillTable"
            >
              <b-icon icon="list-ul" v-if="!FillLoading"></b-icon>
              <b-spinner small v-if="FillLoading"></b-spinner>
              {{ $t("Fill") }}
            </CButton>
            <CButton
              class="xl-1 mr-2"
              size="sm"
              color="danger"
              @click="$bvModal.show('clearModal')"
            >
              <b-icon icon="exclamation-octagon"></b-icon>
              {{ $t("Clear") }}
            </CButton>
          </b-col>
        </b-row>

        <b-modal :id="'clearModal'" hide-footer>
          <template v-slot:modal-title>{{ $t("WantClear") }}</template>
          <div class="d-block text-right">
            <CButton
              @click="$bvModal.hide('clearModal')"
              color="danger"
              class="mr-2"
            >
              <b-icon icon="x"></b-icon>
              {{ $t("NotAccept") }}
            </CButton>
            <CButton @click="ClearTable" color="success">
              <b-icon icon="check2"></b-icon>
              {{ $t("Approve") }}
            </CButton>
          </div>
        </b-modal>
        <b-row class="ml-1">
          <b-col>
            <b-input-group class="mt-2" size="sm">
              <b-input
                :placeholder="$t('person')"
                v-model="filter.Search"
              ></b-input>
              <b-input-group-append>
                <b-button variant="info" @click="onFilter">
                  <b-icon icon="search" v-if="!filterLoading"></b-icon>
                  <b-spinner small v-if="filterLoading"></b-spinner>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-table
              :fields="PayrollSheetTableFields"
              :items="PayrollSheetTableItems"
              small
             
              bordered
              :busy="isBusy"
              class="text-center"
              show-empty
            >
              <template v-slot:cell(personname)="{ item }">
                <p>{{ item.personname }}</p>
              </template>
              <template v-slot:cell(payrollsum)="{ item }">
                <p>
                  {{
                    $options.filters.currency(item.payrollsum, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template v-slot:cell(docsum)="{ item }">
                <p>
                  {{
                    $options.filters.currency(item.docsum, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(actions)="{ item }">
                <div class="text-center" v-if="PayrollSheet.CanSave">
                  <b-link
                    @click="EditItem(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="$bvModal.show('deleteModal' + item.id)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                  <b-modal :id="'deleteModal' + item.id" hide-footer>
                    <template v-slot:modal-title>{{
                      $t("WantDelete")
                    }}</template>
                    <div class="d-block text-right">
                      <CButton
                        @click="$bvModal.hide('deleteModal' + item.id)"
                        color="danger"
                        class="mr-2"
                      >
                        <b-icon icon="x"></b-icon>
                        {{ $t("NotAccept") }}
                      </CButton>
                      <CButton @click="DeleteTableItem(item)" color="success">
                        <b-icon v-if="!DeleteLoading" icon="check2"></b-icon>
                        <b-spinner small v-if="DeleteLoading"></b-spinner>
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
                  style="vertical-align: middle"
                >
                  <b-spinner class="align-middle mr-2"></b-spinner>
                  <strong>{{ $t("Loading") }}</strong>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-modal
          id="AddModal"
          size="xl"
          :title="$t('PayrollSheetTables')"
          no-close-on-backdrop
          hide-footer
          modal-class="custom-size-modal"
        >
          <b-overlay :show="show1">
            <b-row>
              <b-col>
                <div
                  class="form-group form-row mb-0"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("Person") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <a
                      style="color: blue; font-size: 16px"
                      class="h-100 d-flex align-items-center"
                      >{{ tabrow.personname }}</a
                    >
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  class="form-group form-row mb-0"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("payrollsum") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color: blue; font-size: 16px"
                      class="h-100 d-flex align-items-center"
                      >{{
                        $options.filters.currency(tabrow.payrollsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}</a
                    >
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  class="form-group form-row mb-0"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("docsum") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color: blue; font-size: 16px"
                      class="h-100 d-flex align-items-center"
                    >
                      {{
                        $options.filters.currency(tabrow.docsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}
                    </a>
                  </div>
                </div>
              </b-col>
            </b-row>
            <!-- <b-row>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor :'#fff' }">
                               
                            </div>
                            </b-col>
                        </b-row> -->
            <b-row class="mt-3">
              <b-col>
                <b-table
                  :fields="SalaryDocTableFields"
                  :items="tabrow.SalaryDocTable"
                  small
                  bordered
                  striped
                 
                  class="text-center"
                >
                  <template #cell(docsum)="{ item }">
                    <p class="m-0 p-0" v-if="item.Status == 0">
                      {{
                        $options.filters.currency(item.docsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}
                    </p>
                    <custom-number-input
                      @input="CalcTable"
                      v-if="item.Status == 1 || item.Status == 2"
                      size="sm"
                      v-model="item.docsum"
                    ></custom-number-input>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-center">
                <b-button class="mr-2" @click="CloseAddModal" variant="danger">
                  <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                </b-button>
                <b-button variant="success" @click="SaveTable">
                  <b-spinner small v-if="SaveTableLoading"></b-spinner>
                  <b-icon v-if="!SaveTableLoading" icon="check2"></b-icon>
                  {{ $t("Save") }}
                </b-button>
              </b-col>
            </b-row>
          </b-overlay>
        </b-modal>
        <b-row class="mx-1 mb-3">
          <b-col>
            <div>
              <div style="float: left; font-size: 12px">
                {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
                {{ lastNumber }} {{ $t("of") }}
                {{ totalRows }}
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
                  v-model="filter.PageNumber"
                  :total-rows="totalRows"
                  :per-page="filter.PageLimit"
                  align="right"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="d-flex justify-content-between">
            <b-button
              variant="danger"
              @click="$router.push({ name: 'PayrollSheet' })"
            >
              <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
            </b-button>
            <b-button
              v-if="PayrollSheet.CanSave"
              variant="success"
              @click="SaveData"
            >
              <b-icon icon="check2"> </b-icon> {{ $t("Save") }}
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-overlay>
  </b-container>
</template>

<script>
import PayrollSheetService from "@/services/PayrollSheet.service";
import OrganizationService from "@/services/organization.service";
import DepartmentService from "@/services/Department.service";
export default {
  data() {
    return {
      show: false,
      PayrollSheet: {},
      MonthsList: [
        { id: 1, label: this.$t("January") },
        { id: 2, label: this.$t("February") },
        { id: 3, label: this.$t("March") },
        { id: 4, label: this.$t("April") },
        { id: 5, label: this.$t("May") },
        { id: 6, label: this.$t("June") },
        { id: 7, label: this.$t("July") },
        { id: 8, label: this.$t("August") },
        { id: 9, label: this.$t("September") },
        { id: 10, label: this.$t("October") },
        { id: 11, label: this.$t("November") },
        { id: 12, label: this.$t("December") },
      ],
      YearsList: [],
      OrganizationAccountList: [],
      DepartmentList: [],
      PayrollSheetTableFields: [
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
        },
        {
          key: "payrollsum",
          label: this.$t("payrollsum"),
          thClass: "text-center",
        },
        { key: "docsum", label: this.$t("docsum"), thClass: "text-center" },
        { key: "actions", label: this.$t("actions"), thClass: "text-center" },
      ],
      SalaryDocTableFields: [
        {
          key: "salarycalcname",
          label: this.$t("salarycalcname"),
          thClass: "text-center",
        },
        { key: "docsum", label: this.$t("docsum"), thClass: "text-center" },
      ],
      FillLoading: false,
      PayrollSheetTableItems: [],
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
      },
      totalRows: 0,
      isBusy: false,
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        payrollsum: 0,
        docsum: 0,
        status: 0,
        tableID: 0,
        salaryDocTable: [],
      },
      show1: false,
      SaveTableLoading: false,
      DeleteLoading: false,
      filterLoading: false,
    };
  },
  created() {
    this.loaddata(this.$route.params.id);
    OrganizationService.GetOrganizationAccountList().then((res) => {
      this.OrganizationAccountList = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      this.DepartmentList = res.data;
    });
    var d = new Date();
    this.YearsList = [
      { id: 1, name: d.getFullYear() - 1 },
      { id: 2, name: d.getFullYear() },
      { id: 3, name: d.getFullYear() + 1 },
    ];
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
    DeleteTableItem(item) {
      this.DeleteLoading = true;
      var id = this.$route.params.id;
      PayrollSheetService.DeletePayrollSheetTable(id, item.id)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteSuccess"),
            this.$t("message"),
            "success"
          );
          this.GetHRTimeSheetTables(id);
          this.DeleteLoading = false;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
          this.DeleteLoading = false;
        });
    },
    CalcTable() {
      var self = this;
      let sum = 0;
      self.tabrow.SalaryDocTable.forEach(function (item) {
        if (item.Status != 3) {
          sum += item.docsum;
        }
      });
      self.tabrow.docsum = sum;
    },
    SaveTable() {
      var self = this;
      if (self.tabrow.docsum <= 0) {
        self.makeToast(
          self.$t("ihincomesumNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.tabrow.docsum > self.tabrow.payrollsum) {
        self.makeToast(self.$t("DocSumGreater"), self.$t("Error"), "danger");
        return false;
      }
      self.SaveTableLoading = true;
      PayrollSheetService.UpdatePayrollSheetTable(self.tabrow)
        .then((res) => {
          self.SaveTableLoading = false;
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$bvModal.hide("AddModal");
          self.GetHRTimeSheetTables(self.$route.params.id);
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error || error,
            self.$t("error"),
            "danger"
          );
        });
    },
    CloseAddModal() {
      this.$bvModal.hide("AddModal");
    },
    loaddata(id) {
      var self = this;
      PayrollSheetService.Get(id).then((res) => {
        self.PayrollSheet = res.data;
        this.GetHRTimeSheetTables(id);
      });
    },
    GetHRTimeSheetTables(ownerid) {
      const { Search, SortColumn, OrderType, PageNumber, PageLimit } =
        this.filter;
      this.isBusy = true;
      PayrollSheetService.GetPayrollSheetTables(
        ownerid,
        Search,
        SortColumn,
        OrderType,
        PageNumber,
        PageLimit
      )
        .then((res) => {
          this.PayrollSheetTableItems = res.data.rows;
          this.isBusy = false;
          this.totalRows = res.data.total;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("message"),
            "danger"
          );
        });
    },
    onFilter() {
      this.filterLoading = true;
      setTimeout(() => {
        this.loaddata(this.PayrollSheet.id);
        this.filterLoading = false;
      }, 1000);
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    DisabledItem() {
      if (this.totalRows) {
        return true;
      } else {
        return false;
      }
    },
    FillDetailInfo() {
      if (this.PayrollSheet.Year === null) return (this.PayrollSheet.Year = "");
      if (this.PayrollSheet.Month === null)
        return (this.PayrollSheet.Month = "");
      var monthname = this.MonthsList.filter(
        (item) => item.id === this.PayrollSheet.Month
      )[0].label;
      this.PayrollSheet.detailinfo = `Ведомость за ${monthname} месяц ${this.PayrollSheet.Year} года`;
    },
    ClearTable() {
      this.$bvModal.hide("clearModal");
    },
    FillTable() {
      var self = this;
      if (self.PayrollSheetTableItems.length != 0) {
        self.makeToast(self.$t("ClearTable"), self.$t("Error"), "danger");
        return false;
      }
      if (!this.check()) {
        return false;
      }
      PayrollSheetService.FillPayrollSheet(self.PayrollSheet)
        .then((res) => {
          this.loaddata(res.data.id);
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    },

    ClearTable() {
      var self = this;
      PayrollSheetService.ClearPayrollSheetTable(self.PayrollSheet)
        .then((res) => {
          self.loaddata(self.PayrollSheet.id);
        })
        .catch((error) => {
          this.FillLoading = false;
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
        });
      this.$bvModal.hide("clearModal");
    },
    EditItem(item) {
      var self = this;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        payrollsum: 0,
        docsum: 0,
        status: 0,
        tableID: 0,
        salaryDocTable: [],
      };
      this.show1 = true;
      PayrollSheetService.GetPayrollSheetTable(item.id)
        .then((res) => {
          self.tabrow = res.data;
          this.show1 = false;
          self.tabrow.SalaryDocTable.forEach(function (item) {
            item.Status = 2;
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
        });

      this.$bvModal.show("AddModal");
    },
    check() {
      var self = this;
      if (
        self.PayrollSheet.docnumber === null ||
        self.PayrollSheet.docnumber === undefined ||
        self.PayrollSheet.docnumber === 0 ||
        self.PayrollSheet.docnumber === ""
      ) {
        self.makeToast(
          self.$t("docnumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PayrollSheet.docdate === null ||
        self.PayrollSheet.docdate === undefined ||
        self.PayrollSheet.docdate === 0 ||
        self.PayrollSheet.docdate === ""
      ) {
        self.makeToast(self.$t("DateNotCorrect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.PayrollSheet.Month === null ||
        self.PayrollSheet.Month === undefined ||
        self.PayrollSheet.Month === 0 ||
        self.PayrollSheet.Month === ""
      ) {
        self.makeToast(self.$t("onmonthNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.PayrollSheet.Year === null ||
        self.PayrollSheet.Year === undefined ||
        self.PayrollSheet.Year === 0 ||
        self.PayrollSheet.Year === ""
      ) {
        self.makeToast(self.$t("YearNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      // if (
      //     self.PayrollSheet.departmentid === null ||
      //     self.PayrollSheet.departmentid === undefined ||
      //     self.PayrollSheet.departmentid === 0 ||
      //     self.PayrollSheet.departmentid === ""
      // ) {
      //     self.makeToast(
      //     self.$t("departmentNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //     );
      //     return false;
      // }
      if (
        self.PayrollSheet.organizationaccountid === null ||
        self.PayrollSheet.organizationaccountid === undefined ||
        self.PayrollSheet.organizationaccountid === 0 ||
        self.PayrollSheet.organizationaccountid === ""
      ) {
        self.makeToast(
          self.$t("organizationaccountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PayrollSheet.detailinfo === null ||
        self.PayrollSheet.detailinfo === undefined ||
        self.PayrollSheet.detailinfo === 0 ||
        self.PayrollSheet.detailinfo === ""
      ) {
        self.makeToast(
          self.$t("detailinfoNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      PayrollSheetService.Update(self.PayrollSheet)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          setTimeout(() => {
            self.$router.push({ name: "PayrollSheet" });
          }, 400);
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error || error,
            self.$t("error"),
            "danger"
          );
        });
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.GetHRTimeSheetTables(this.PayrollSheet.id);
        }
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.GetHRTimeSheetTables(this.PayrollSheet.id);
        }
      },
    },
  },
};
</script>

<style>
</style>