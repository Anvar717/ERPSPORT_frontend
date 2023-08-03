<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard class="cardView">
        <h3 class="text-center">{{ $t("PermanentAssetIntake") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="7" md="8" sm="12" class="text-left mt-2 d-flex">
              <custom-date-picker
                v-model="filter.startDate"
                size="sm"
                lang="ru"
                :placeholder="$t('startDate')"
                value-type="format"
                format="DD.MM.YYYY"
                style="width:20%"
                class="mr-2"
              ></custom-date-picker>
              <custom-date-picker
                v-model="filter.endDate"
                size="sm"
                lang="ru"
                :placeholder="$t('endDate')"
                value-type="format"
                format="DD.MM.YYYY"
                style="width:20%"
                class="mr-2"
              ></custom-date-picker>
              <!-- <CInput
                :placeholder="$t('search')"
                autocomplete="text"
                v-model="filter.Search"
                v-on:keyup.enter="Search"
                style="width:50%"
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
              </CInput> -->
              <CButton
                @click="Refresh"
                size="sm"
                color="info"
                variant="outline"
                style="height: 35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol>

            <CCol lg="5" md="4" sm="12" class="text-lg-right mt-2">
              <CButton
                @click="Create"
                color="info"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <!-- v-if="$can('PermanentAssetIntakeEdit', 'permissions')" -->
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton>
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
          <b-row>
            <b-col>
              <v-select
                :options="SourceOffinanceList"
                v-model="filter.sourceoffinanceid"
                :reduce="(item) => item.id"
                :placeholder="$t('sourceoffinance')"
                label="name"
                @input="Refresh"
              ></v-select>
            </b-col>
            <b-col>
              <v-select
                :options="DepartmentList"
                v-model="filter.departmentid"
                :reduce="(item) => item.id"
                :placeholder="$t('department')"
                label="name"
                @input="Refresh"
              ></v-select>
            </b-col>
            <b-col>
              <v-select
                :options="ResponsiblePersonList"
                v-model="filter.responsiblepersonid"
                :reduce="(item) => item.id"
                :placeholder="$t('responsibleperson')"
                label="fullname"
                @input="Refresh"
              ></v-select>
            </b-col>
            <b-col>
              <v-select
                :options="RoomList"
                v-model="filter.roomid"
                :reduce="(item) => item.id"
                :placeholder="$t('room')"
                label="name"
                @input="Refresh"
              ></v-select>
            </b-col>
          </b-row>
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
            head-row-variant="secondary"
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
            <template v-slot:head(code)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('code')"
              >
                {{ $t("code") }}
                <b-icon
                  v-if="filter.SortColumn === 'code'"
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

            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">{{
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
                  <b-icon variant="info" icon="pencil"></b-icon>
                </b-link>
                <b-link
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon variant="danger" icon="trash"></b-icon>
                </b-link>
                <b-link
                  @click="$bvModal.show('AcceptModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Approve') }"
                >
                  <b-icon icon="check2"></b-icon>&nbsp;
                </b-link>
                <!-- v-if="$can('CurriculumOrgschGradeAccept', 'permissions')" -->
                <b-link
                  @click="$bvModal.show('NotAcceptModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('CancelApproval') }"
                >
                  <b-icon icon="x"></b-icon>
                </b-link>
                <!-- v-if="$can('CurriculumOrgschGradeCancel', 'permissions')" -->
              </div>
              <b-modal :id="'DeleteModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                <div class="d-block text-right">
                  <CButton
                    variant="outline"
                    @click="$bvModal.hide('DeleteModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("NotAccept") }}
                  </CButton>
                  <CButton
                    variant="outline"
                    @click="Delete(item)"
                    color="success"
                  >
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Accept") }}
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
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="Approve(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
              <b-modal :id="'NotAcceptModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{
                  $t("WantNotAccept")
                }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('NotAcceptModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="CancelApproval(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2 mt-2"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
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
              >
              </b-form-select>
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
import PermanentAssetIntakeService from "@/services/PermanentAssetIntake.service";
import ResponsiblePersonService from "@/services/ResponsiblePerson.service";
import RoomService from "@/services/Room.service";
import SourceOffinanceService from "@/services/SourceOfFinance.service";
import DepartmentService from "@/services/Department.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components:{
     CustomDatePicker
  },
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
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
        },
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
          key: "suppliername",
          label: this.$t("supplier"),
          sortable: false,
        },
        {
          key: "sourceoffinancename",
          label: this.$t("sourceoffinance"),
          sortable: false,
        },
        {
          key: "suppliername",
          label: this.$t("supplier"),
          sortable: false,
        },

        {
          key: "responsiblepersonname",
          label: this.$t("responsibleperson"),
          sortable: false,
        },
        {
          key: "permanentassetname",
          label: this.$t("permanentasset"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "statusname",
          label: this.$t("statusname"),
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
        startDate: "",
        endDate: "",
        departmentid: 0,
        roomid: 0,
        responsiblepersonid: 0,
        sourceoffinanceid: 0,
        supplierid: 0,
        organizationId: 0,
        Lang: "",
        IsStartPageFromZero: false,
        Offset: 0,
      },
      DepartmentList: [],
      SourceOffinanceList: [],
      RoomList: [],
      ResponsiblePersonList: [],
    };
  },
  created() {
    this.createDate();
    ResponsiblePersonService.GetAll().then((res) => {
      this.ResponsiblePersonList = res.data;
    });
    RoomService.GetAll().then((res) => {
      this.RoomList = res.data;
    });
    SourceOffinanceService.GetAll().then((res) => {
      this.SourceOffinanceList = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      this.DepartmentList = res.data;
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
    Approve(item) {
      var self = this;
      PermanentAssetIntakeService.Approve(item.id)
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
      PermanentAssetIntakeService.CancelApproval(item.id)
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
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var mm1 = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.startDate = "01.01." + yyyy;
      this.filter.endDate = dd + "." + mm1 + "." + yyyy;
    },
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
      this.$router.push({
        name: "EditPermanentAssetIntake",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditPermanentAssetIntake",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      PermanentAssetIntakeService.Delete(item.id)
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
      PermanentAssetIntakeService.GetList(
        this.filter
        // this.filter.Search,
        // this.filter.SortColumn,
        // this.filter.OrderType,
        // this.filter.PageNumber,
        // this.filter.PageLimit
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
<style></style>
