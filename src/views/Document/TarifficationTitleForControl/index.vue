<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">
          {{ $t("TarifficationTitleForControl") }}
        </h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="3" md="3" sm="12" class="text-left mt-1">
              <label class="col-form-label" for>{{ $t("SchoolYear") }}</label>

              <v-select
                :options="SchoolYearList"
                v-model="filter.schoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('SchoolYear')"
                label="name"
              >
              </v-select>
            </CCol>
            <CCol lg="4" md="5" sm="11" class="text-left mt-1">
              <label class="col-form-label" for>{{ $t("search") }}</label>

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
            </CCol>

            <CCol lg="5" md="5" sm="12" class="text-lg-right mt-4">
              <CButton
                v-if="$can('TarifficationTitleEdit', 'permissions')"
                @click="Create"
                color="primary"
                variant="outline"
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
          <CRow>
            <CCol>
              <b-row>
                <b-col class="mt-1">
                  <b-button-group @click="Refresh" size="sm">
                    <b-button
                      @click="filter.statusid = 0"
                      :variant="
                        filter.statusid == 0 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("All") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        )
                      "
                      @click="filter.statusid = 8"
                      :variant="
                        filter.statusid == 8 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("SendAll") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        ) ||
                          $can(
                            'TarifficationTitleXTBEconomistView',
                            'permissions'
                          )
                      "
                      @click="filter.statusid = 9"
                      :variant="
                        filter.statusid == 9 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("Received") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        ) ||
                          $can(
                            'TarifficationTitleXTBEconomistView',
                            'permissions'
                          ) ||
                          $can(
                            'TarifficationTitleXTBDirectorView',
                            'permissions'
                          )
                      "
                      @click="filter.statusid = 10"
                      :variant="
                        filter.statusid == 10 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("NotReceived") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        ) ||
                          $can(
                            'TarifficationTitleXTBEconomistView',
                            'permissions'
                          ) ||
                          $can(
                            'TarifficationTitleXTBDirectorView',
                            'permissions'
                          )
                      "
                      @click="filter.statusid = 15"
                      :variant="
                        filter.statusid == 15 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("Reseived") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        ) ||
                          $can(
                            'TarifficationTitleXTBEconomistView',
                            'permissions'
                          ) ||
                          $can(
                            'TarifficationTitleXTBDirectorView',
                            'permissions'
                          )
                      "
                      @click="filter.statusid = 2"
                      :variant="
                        filter.statusid == 2 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("accepted") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        ) ||
                          $can(
                            'TarifficationTitleXTBEconomistView',
                            'permissions'
                          ) ||
                          $can(
                            'TarifficationTitleXTBDirectorView',
                            'permissions'
                          )
                      "
                      @click="filter.statusid = 16"
                      :variant="
                        filter.statusid == 16 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("Delivered") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        ) ||
                          $can(
                            'TarifficationTitleXTBEconomistView',
                            'permissions'
                          ) ||
                          $can(
                            'TarifficationTitleXTBDirectorView',
                            'permissions'
                          )
                      "
                      @click="filter.statusid = 17"
                      :variant="
                        filter.statusid == 17 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("ReportAccepted") }}
                    </b-button>
                    <b-button
                      v-if="
                        $can(
                          'TarifficationTitleXTBSpecialistView',
                          'permissions'
                        ) ||
                          $can(
                            'TarifficationTitleXTBEconomistView',
                            'permissions'
                          ) ||
                          $can(
                            'TarifficationTitleXTBDirectorView',
                            'permissions'
                          )
                      "
                      @click="filter.statusid = 3"
                      :variant="
                        filter.statusid == 3 ? 'primary' : 'outline-primary'
                      "
                    >
                      {{ $t("canceled") }}
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>
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
            <template v-slot:head(id)>
              <div style="cursor : pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor : pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon
                  v-if="filter.SortColumn === 'docnumber'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor : pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon
                  v-if="filter.SortColumn === 'docdate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolyearname)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('schoolyearname')"
              >
                {{ $t("schoolyear") }}
                <b-icon
                  v-if="filter.SortColumn === 'schoolyearname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolsubject)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('schoolsubject')"
              >
                {{ $t("schoolsubject") }}
                <b-icon
                  v-if="filter.SortColumn === 'schoolsubject'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(schooltypename)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('schooltypename')"
              >
                {{ $t("schooltype") }}
                <b-icon
                  v-if="filter.SortColumn === 'schooltypename'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor : pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'detailinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(status)="{ item }">
              <CBadge style="color:white" :color="getItemColor(item.statusid)">{{
                item.status
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="row">
              <div class="text-center">
                <b-link
                  @click="View(row.item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-modal :id="'DeleteModal' + row.item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('DeleteModal' + row.item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Delete(row.item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'CancelModal' + row.item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantCancel") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('CancelModal' + row.item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="CancelApproval(row.item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'AcceptModal' + row.item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('AcceptModal' + row.item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Approve(row.item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
              </div>
            </template>
            <template #cell(totalaccrualsum)="{item}">
              <p class="m-0 p-0">
                {{
                  $options.filters.currency(item.totalaccrualsum, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}
              </p>
            </template>
            <template v-slot:row-details="row">
              <b-row>
                <b-col>
                  <b-table-simple
                    :busy="isBusy1"
                    small
                    responsive
                    hover
                    :bordered="false"
                  >
                    <b-thead>
                      <b-tr style="background-color:#eee;">
                        <b-th
                          v-for="(item, i) in fields1"
                          :key="i"
                          class="text-center"
                        >
                          {{ item.label }}
                        </b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody v-if="items1[row.item.id].length != 0">
                      <b-tr
                        v-for="(el, index) in items1[row.item.id]"
                        :key="index"
                      >
                        <b-td>{{ el.orgschoolgradename }}</b-td>
                        <b-td>{{ el.studentcount }}</b-td>
                        <b-td>{{ el.femalestudentcount }}</b-td>
                        <b-td>{{ el.homeschoolingstudentcount }}</b-td>
                        <b-td>{{ el.schoolingshiftname }}</b-td>
                        <b-td>{{ el.educationlanguagename }}</b-td>
                        <b-td
                          ><p v-if="el.isspecialized">{{ $t("Yes") }}</p>
                          <p v-if="el.isspecialized == false">
                            {{ $t("No") }}
                          </p></b-td
                        >
                      </b-tr>
                    </b-tbody>
                    <b-tbody v-if="items1[row.item.id].length == 0">
                      <b-tr>
                        <b-td colspan="4">{{ $t("NoItems") }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
              </b-row>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2 mt-5"
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
import TarifficationTitleService from "@/services/TarifficationTitle.service";
import SchoolYearService from "@/services/SchoolYear.service";
export default {
  data() {
    return {
      fields1: [
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgradename"),
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
        },
        {
          key: "femalestudentcount",
          label: this.$t("femalestudentcount"),
        },
        {
          key: "homeschoolingstudentcount",
          label: this.$t("homeschoolingstudentcount"),
        },
        {
          key: "schoolingshiftname",
          label: this.$t("schoolingshiftname"),
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
        },
        {
          key: "isspecialized",
          label: this.$t("isspecialized"),
        },
      ],
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyear"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
        // {
        //   key: "schoolsubject",
        //   label: this.$t("schoolsubject"),
        //   sortable: false,
        // },
        {
          key: "schooltypename",
          label: this.$t("schooltype"),
          thClass: "text-center",
          tdClass: "text-left",
          sortable: false,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          thClass: "text-center",
          tdClass: "text-left",
          sortable: false,
        },
        {
          key: "status",
          label: this.$t("status"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
      ],
      items: [],
      SchoolYearList: [],
      totalRows: "",
      isBusy: true,
      filter: {
        StartDate: "",
        statusid: 0,
        EndDate: "",
        schoolyearid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      isBusy1: false,
      items1: [],
    };
  },
  created() {
    this.createDate();
    SchoolYearService.GetAll(this.lang).then((res) => {
      this.SchoolYearList = res.data;
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
    toggleDetail(row) {
      row.toggleDetails();
      if (!row.detailsShowing) {
        this.isBusy1 = true;
        TarifficationTitleService.Get(row.item.id).then((res) => {
          this.items1[row.item.id] = res.data.Tables;
          this.isBusy1 = false;
        });
      }
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var mm1 = String(todaydate.getMonth() + 2).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      var yyyy1 = todaydate.getFullYear() - 1;
      this.filter.StartDate = "01.01." + yyyy1;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    // getItemColor(text) {
    //   return text === "Актив" ||
    //     text === "Принято" ||
    //     text === "Одобрен" ||
    //     text === "Утвержден"
    //     ? "success"
    //     : text === "Пассив" || text === "Не принято"
    //     ? "danger"
    //     : text === "Отправлен" || text === "Доставлен"
    //     ? "warning"
    //     : text === "Отменено"
    //     ? "danger"
    //     : "primary";
    // },
    getItemColor(id) {
      return id === 1
        ? "primary"
        : id === 2
        ? "success"
        : id === 3
        ? "danger"
        : id === 4
        ? "primary"
        : "primary";
    },
    rowclicked() {},
    Create() {
      if ($can("TarifficationTitleEdit", "permissions")) {
        this.$router.push({
          name: "EditTarifficationTitle",
          params: {
            id: 0,
          },
        });
      }
    },
    Edit(item) {
      if ($can("TarifficationTitleEdit", "permissions")) {
        this.$router.push({
          name: "EditTarifficationTitle",
          params: {
            id: item.id,
          },
        });
      }
    },
    View(item) {
      this.$router.push({
        name: "ViewTarifficationTitleForControl",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      TarifficationTitleService.Delete(item.id)
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
      TarifficationTitleService.Approve(item.id)
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
      TarifficationTitleService.Reject(item.id)
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
      TarifficationTitleService.GetTarifficationTitleForControlList(
        this.filter.schoolyearid,
        this.filter.statusid,
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
