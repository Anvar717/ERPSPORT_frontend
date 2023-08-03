  <!-- <template>
    <CRow>
      <CCol sm="12" md="12">
        <CCard accent-color="primary">
          <b-row class="mt-3 mx-1">
            <b-col>
              <h3>{{ $t("TreasBankDocument") }}</h3>
            </b-col>
            <b-col class="text-right">
              <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>

                {{ $t("back") }}
              </CButton>
              <CButton
                color="primary"
                class="float-sm-right mr-2"
                @click="Print"
                size="sm"
              >
                <b-spinner v-if="PrintLoading" small></b-spinner>
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                {{ $t("Print") }}
              </CButton>
            </b-col>
          </b-row>
          <CCardHeader>
            <CRow class="form-group">
              <CCol lg="2" md="2" class="text-left mt-2">
                <label class="col-form-label"> {{ $t("oblast") }} </label>
                <v-select
                  :options="OblastList"
                  v-model="filter.oblastid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  @input="ChangeOblast"
                  label="name"
                ></v-select>
              </CCol>
              <CCol lg="2" md="2" class="text-left mt-2">
                <label class="col-form-label"> {{ $t("region") }} </label>
                <v-select
                  :options="RegionList"
                  v-model="filter.regionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  @input="ChangeRegion"
                  label="name"
                ></v-select>
              </CCol>
              <CCol lg="3" md="2" sm="11" class="text-left mt-3">
                <label for="#">{{ $t("Search") }}</label>
                <CInput
                  :placeholder="$t('search')"
                  autocomplete="text"
                  v-model="filter.Search"
                  v-on:keyup.enter="Search"
                >
                  <template #append>
                    <CButton
                      @click="Refresh"
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
              <CCol lg="2" md="2" sm="11" style="margin-top: 44px" class="pl-0">
                <CButton
                  @click="SyncModal = true"
                  color="primary"
                  variant="primary"
                >
                <b-icon icon="arrow-repeat"> </b-icon> {{ $t("Refresh") }}
                </CButton>
                <b-modal
                  v-model="SyncModal"
                  hide-footer
                  no-close-on-backdrop
                  modal-class="custom-size-modal"
                  size="sm"
                >
                  <label class="col-form-label" for>{{ $t("Date") }}</label>
                  <custom-date-picker
                    v-model="filter.OnDate"
                    @keyup="BindValue"
                    format="DD.MM.YYYY"
                    type="date"
                    style="width:100%"
                    :clearable="false"
                    :placeholder="$t('OnDate')"
                  >
                  </custom-date-picker>
                  <div class="text-right">
                    <CButton
                      size="sm"
                      color="primary"
                      variant="primary"
                      @click="Sync"
                      class="mt-2"
                      >{{ $t("Refresh") }}</CButton
                    >
                  </div>
                </b-modal>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="2" md="2" class="text-left mt-2">
                <label class="col-form-label"> {{ $t("organization") }} </label>
                <v-select
                  :options="organizationlist"
                  v-model="filter.organizationId"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol lg="2" md="2" class="text-left mt-2">
                <label class="col-form-label">
                  {{ $t("OrganizationAccount") }}
                </label>
                <v-select
                  :options="OrganizationAccountList"
                  v-model="filter.orgSettlementId"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="code"
                ></v-select>
              </CCol>
              <CCol lg="2" md="2" class="text-left mt-2">
                <label class="col-form-label" for>{{ $t("StartDate") }}</label>

                <date-picker
                  v-model="filter.StartDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('StartDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </CCol>
              <CCol lg="2" md="2" class="text-left mt-2">
                <label class="col-form-label" for>{{ $t("EndDate") }}</label>

                <date-picker
                  v-model="filter.EndDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </CCol>
            </CRow>
          </CCardHeader>
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
            
              striped
              sticky-header="60vh"
              no-border-collapse
              bordered
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
            <div class="pb-2">
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
  import CustomDatePicker from "@/components/customDatePicker.vue";
  import OrganizationService from "@/services/organization.service";
  import TreasBankDocumentService from "@/services/TreasBankDocument.service";
  import OblastService from "@/services/Oblast.service";
  import RegionService from "@/services/Region.service";
  export default {
    components: { CustomDatePicker },
    data() {
      return {
        fields: [
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
            key: "financeyear",
            label: this.$t("financeyear"),
            sortable: false,
          },
          {
            key: "bankdate",
            label: this.$t("bankdate"),
            sortable: false,
          },
          {
            key: "number",
            label: this.$t("number"),
            sortable: false,
          },
          {
            key: "documenttype",
            label: this.$t("documenttype"),
            sortable: false,
          },
          {
            key: "docsum",
            label: this.$t("docsum"),
            sortable: false,
          },
          // {
          //   key: "operdate",
          //   label: this.$t("operdate"),
          //   sortable: false,
          // },
          {
            key: "payername",
            label: this.$t("payername"),
            sortable: false,
          },
          {
            key: "itemofexpense",
            label: this.$t("itemofexpense"),
            sortable: false,
          },
          {
            key: "paymentdetails",
            label: this.$t("paymentdetails"),
            sortable: false,
          },
          {
            key: "dateofupdate",
            label: this.$t("dateofupdate"),
            sortable: false,
          },
        ],
        items: [],

        totalRows: "",
        isBusy: true,
        filter: {
          SortColumn: "",
          OrderType: "asc",
          PageNumber: 1,
          PageLimit: 20,
          pageOptions: [5, 10, 15, 20, 25, 50, 100],
          SortIcon: "arrow-up",
          StartDate: "",
          EndDate: "",
          Search: "",
          OnDate: "",
          organizationId: 0,
          oblastid: 0,
          regionid: 0,
        },
        OrganizationAccountList: [],
        organizationlist: [],
        OblastList: [],
        RegionList: [],
        tabindex: 0,
        PrintLoading: false,
        lang: localStorage.getItem("locale") || "ru",
        SyncModal: false,
      };
    },
    created() {
      OrganizationService.GetOrganizationAccountList().then((res) => {
        this.OrganizationAccountList = res.data;
      });
      OrganizationService.GetAll().then((res) => {
        this.organizationlist = res.data;
      });
      OblastService.GetAll().then((res) => {
        this.OblastList = res.data;
      });
      // RegionService.GetAll().then((res) => {
      //   this.RegionList = res.data;
      // });
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
      Print() {
        this.PrintLoading = true;
        TreasBankDocumentService.ReportTreasBankDocument(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationId,
          this.filter.orgSettlementId,
          this.filter.StartDate,
          this.filter.EndDate,
          this.filter.Search,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit
        )
          .then((res) => {
            this.PrintLoading = false;
            this.forceFileDownload(res, "TeachersCountInSchool");
          })
          .catch((err) => {
            this.PrintLoading = false;
            this.makeToast(err.response.data.error, this.$t("error"), "danger");
          });
      },
      BindValue(value) {
        this.filter.OnDate = value;
      },
      createDate() {
        var todaydate = new Date();
        var dd = String(todaydate.getDate()).padStart(2, "0");
        var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
        var yyyy = todaydate.getFullYear();
        this.filter.StartDate = "01.01." + yyyy;
        this.filter.EndDate = dd + "." + mm + "." + yyyy;
        this.filter.OnDate = dd + "." + mm + "." + yyyy;
      },
      forceFileDownload(response, name) {
        var blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name + ".xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      },
      ChangeOblast() {
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
      },
      ChangeRegion() {
        if (!!this.filter.regionid) {
          OrganizationService.GetAll(
            this.filter.oblastid,
            this.filter.regionid,
            false,
            0,
            null
          ).then((res) => {
            this.organizationlist = res.data;
          });
        }
      },
      Refresh() {
        this.isBusy = true;
        TreasBankDocumentService.ReportTreasBankDocument(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationId,
          this.filter.orgSettlementId,
          this.filter.StartDate,
          this.filter.EndDate,
          this.filter.Search,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit
        ).then((res) => {
          this.isBusy = false;
          this.items = res.data.data.rows;
          this.totalRows = res.data.data.total;
        });
      },
      Sync() {
        var self = this;
        if (!this.filter.OnDate) {
          self.makeToast(
            self.$t("dateNotSelected"),
            self.$t("message"),
            "danger"
          );
          return false;
        }
        TreasBankDocumentService.SynchTreasBankDocument(this.filter.OnDate)
          .then((res) => {
            self.makeToast(self.$t("SyncMessage"), self.$t("message"), "success");
            this.Refresh();
            this.SyncModal = false;
          })
          .catch((error) => {
            self.makeToast(
              error.response.data.error,
              self.$t("message"),
              "danger"
            );
            this.SyncModal = false;
          });
      },
      makeToast(message, title, type) {
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
      
      <style></style>
       -->