s<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("SchoolAdmission") }}</h3>
        <CCardHeader>
          <b-row class="d-flex justify-content-between">
            <b-col sm="9">
              <div class="d-flex">
                <div class="mr-2" style="width : 15%">
                  <label for>{{ $t("StartDate") }}</label>
                  <date-picker v-model="filter.StartDate" style="width:100%" size="sm" lang="ru"
                    :placeholder="$t('StartDate')" value-type="format" format="DD.MM.YYYY">
                  </date-picker>
                </div>
                <div class="mr-2" style="width : 15%">
                  <label for>{{ $t("EndDate") }}</label>
                  <date-picker v-model="filter.EndDate" style="width:100%;" size="sm" lang="ru"
                    :placeholder="$t('EndDate')" value-type="format" format="DD.MM.YYYY">
                  </date-picker>
                </div>
                <div class="mr-2" style="width : 20%">
                  <label for=""> {{ $t("SchoolYear") }} </label>
                  <v-select :options="SchoolYearList" :reduce="(item) => item.id" label="name" @input="orgSchoolGetAll"
                    v-model="filter.SchoolYearID" :placeholder="$t('ChooseBelow')">
                  </v-select>
                </div>
                <div class="mr-2" style="width : 20%">
                  <label for=""> {{ $t("OrgSchoolGrade") }} </label>
                  <v-select :options="OrgSchoolGradeList" :reduce="(item) => item.id" label="name"
                    v-model="filter.OrgSchoolGradeID" :placeholder="$t('ChooseBelow')">
                  </v-select>
                </div>
                <CInput :placeholder="$t('Student')" autocomplete="text" style="margin-top:28px;width: 30%"
                  v-model="filter.PersonName" v-on:keyup.enter="Search">
                  <template #append>
                    <CButton @click="Search" size="sm" variant="outline" type="button" color="primary">
                      <b-icon icon="search"></b-icon>
                      {{ $t("search") }}
                    </CButton>
                  </template>
                </CInput>
              </div>
            </b-col>
            <b-col sm="3" class="mt-3 text-right float-right ">
              <div class="d-flex float-right  mt-2">
                <CButton @click="Create" color="primary" variant="outline" class="mr-2" size="sm">
                  <b-icon icon="plus"> </b-icon>
                  &nbsp; {{ $t("Create") }}
                </CButton>
                <!-- <CButton 
                v-if="$can('RoleView', 'permissions')"
                color="info"
                class="mr-2"
                size="sm"
                variant="outline"
                @click="ImportModal = true"
              >
                <b-icon icon="cloud-upload">  </b-icon>
                {{ $t("Impotr") }}
              </CButton>  -->
                <CButton color="danger" class="float-sm-right mr-2" @click="$router.push('/')" size="sm">
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
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
                  @click="filter.statusid = 1"
                  :variant="
                    filter.statusid == 1 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("AllNew") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 4"
                  :variant="
                    filter.statusid == 4 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("edited") }}
                </b-button>
                <!-- <b-button @click="filter.statusid = 8" :variant="filter.statusid == 8 ? 'primary' : 'outline-primary'"> {{ $t('SendAll') }} </b-button> -->
                <b-button
                  @click="filter.statusid = 2"
                  :variant="
                    filter.statusid == 2 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("accepted") }}
                </b-button>
                <b-button
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
          <CModal :title="$t('Import')" :show.sync="ImportModal">
            <b-form-file type="file" id="file" accept=".xls, .xlsx" ref="file" v-on:change="handleFileUpload()"
              v-model="file" :browse-text="$t('DoImport')" :placeholder="$t('DoImport')"
              drop-placeholder="Импортироват:"></b-form-file>
            <template #footer>
              <CButton @click="ImportFromExcel" color="primary">
                <b-spinner small v-if="ImportLoading"></b-spinner>
                <b-icon v-if="!ImportLoading" icon="cloud-arrow-up"></b-icon>
                {{ $t("DoImport") }}
              </CButton>
            </template>
          </CModal>
        </CCardHeader>
        <CCardBody>
          <b-table :fields="fields" :items="items" style="min-height : 200px" small="small" responsive="sm"
            class="generalTableClass" show-empty :busy="isBusy" :current-page="filter.PageNumber"
             @row-dblclicked="Edit" @row-clicked="rowclicked" striped sticky-header="60vh"
            no-border-collapse bordered>
            <template v-slot:head(id)>
              <div style="cursor : pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor : pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon v-if="filter.SortColumn === 'docnumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor : pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon v-if="filter.SortColumn === 'docdate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolyearname)>
              <div style="cursor : pointer" @click="ChangeSort('schoolyearname')">
                {{ $t("schoolyearname") }}
                <b-icon v-if="filter.SortColumn === 'schoolyearname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(orgschoolgradename)>
              <div style="cursor : pointer" @click="ChangeSort('orgschoolgradename')">
                {{ $t("orgschoolgrade") }}
                <b-icon v-if="filter.SortColumn === 'orgschoolgradename'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(studentcount)>
              <div style="cursor : pointer" @click="ChangeSort('studentcount')">
                {{ $t("studentcount") }}
                <b-icon v-if="filter.SortColumn === 'studentcount'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('statusid')">
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'statusid'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(status)="{ item }">
              <CBadge :color="getItemColor(item.statusname)">{{
                  item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="item.admissionappid == null"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link @click="View(item)" class="mr-2" v-c-tooltip="{ content: $t('View') }">
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-dropdown
                  v-if="item.admissionappid == null"
                  variant="link"
                  no-caret
                  class="ml-n2 px-0"
                >
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="item.admissionappid == null"
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Approve") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="item.admissionappid == null"
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("CancelApproval") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="item.admissionappid == null"
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
                <b-modal :id="'DeleteModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                  <div class="d-block text-right">
                    <CButton @click="$bvModal.hide('DeleteModal' + item.id)" color="danger" class="mr-2">
                      <b-icon icon="x"></b-icon>
                      {{ $t("CancelApproval") }}
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
                    <CButton @click="$bvModal.hide('CancelModal' + item.id)" color="danger" class="mr-2">
                      <b-icon icon="x"></b-icon>
                      {{ $t("CancelApproval") }}
                    </CButton>
                    <CButton @click="Cancel(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'AcceptModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CButton @click="$bvModal.hide('AcceptModal' + item.id)" color="danger" class="mr-2">
                      <b-icon icon="x"></b-icon>
                      {{ $t("CancelApproval") }}
                    </CButton>
                    <CButton @click="Approve(item)" color="success">
                      <b-icon icon="check2"></b-icon>
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
              <div class="text-center text-primary my-2" style="vertical-align:middle">
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
              <b-form-select v-model="filter.PageLimit" id="PageLimitSelect" size="sm" :options="filter.pageOptions">
              </b-form-select>
            </div>
            <div style="float:left;font-size:12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float:right">
              <b-pagination v-model="filter.PageNumber" :total-rows="totalRows" :per-page="filter.PageLimit"
                align="right" size="sm" class="my-0"></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolAdmissionService from "@/services/SchoolAdmission.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
export default {
  data() {
    return {
      ImportModal: false,
      ImportLoading: false,
      DownloadLoading: false,
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
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false,
        },
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgrade"),
          sortable: false,
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
          sortable: false,
        },
        {
          key: "studentnames",
          label: this.$t("Student"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        StartDate: "",
        EndDate: "",
        PersonName: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        OrgSchoolGradeID: 0,
        SchoolYestatarID: 0,
        statusid: 0,
        SchoolYearID: 0,
      },
      file: [],
      OrgSchoolGradeList: [],
      SchoolYearList: [],
    };
  },
  created() {
    if (
      !!this.$route.query.startdate ||
      !!this.$route.query.enddate ||
      !!this.$route.query.search ||
      !!this.$route.query.schoolyear ||
      !!this.$route.query.orgschoolgrade ||
      !!this.$route.query.pagelimit
    ) {
      this.filter.StartDate = this.$route.query.startdat;
      this.filter.EndDate = this.$route.query.enddate;
      this.filter.PersonName = this.$route.query.search;
      this.filter.SchoolYearID = this.$route.query.schoolyear;
      this.filter.PageLimit = this.$route.query.pagelimit;
      this.filter.OrgSchoolGradeID = this.$route.query.orgschoolgrade;
    }
    SchoolYearService.GetAll().then((res) => {
      this.SchoolYearList = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.SchoolYearID = res.data.id;
    });

    this.filter.SchoolYearID = parseInt(
      localStorage.getItem("default_school_year")
    );
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
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = "01.01.2020";
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },

    orgSchoolGetAll() {
      // alert('test')
      OrgSchoolGradeService.GetAll('', this.filter.SchoolYearID).then((res) => {
        this.OrgSchoolGradeList = res.data;
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
    rowclicked() { },
    Create() {
      this.$router.push({
        name: "EditSchoolAdmission",
        params: {
          id: 0,
        },
      });
    },
    View(item) {
      this.$router.push({
        name: "ViewSchoolAdmission",
        params: {
          id: item.id,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditSchoolAdmission",
        params: {
          id: item.id,
        },
        query: {
          startdate: this.filter.StartDate,
          enddate: this.filter.EndDate,
          search: this.filter.PersonName,
          schoolyear: this.filter.SchoolYearID,
          orgschoolgrade: this.filter.OrgSchoolGradeID,
          pagelimit: this.filter.PageLimit,
        },
      });
    },
    Delete(item) {
      SchoolAdmissionService.Delete(item.id)
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
      SchoolAdmissionService.Approve(item.id)
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
    Cancel(item) {
      var self = this;
      SchoolAdmissionService.CancelApproval(item.id)
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

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      SchoolAdmissionService.GetList(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.SchoolYearID,
        this.filter.OrgSchoolGradeID,
        this.filter.PersonName,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.statusid
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
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file;
    },
    ImportFromExcel() {
      this.ImportLoading = true;
      let formData = new FormData();

      var selectfiles = this.file;
      formData.append("excelfile", selectfiles);
      /* formData.append("budget", this.Budget); */
      SchoolAdmissionService.ImportFromExcel(formData)
        .then((res) => {
          /* this.Budget = res.data
                this.items1 = res.data.Tables1
                this.items2 = res.data.Tables2 */
          this.ImportLoading = false;
          this.ImportModal = false;

          alert(this.$t("ImportOnQueue"));
          this.Refresh();
          window.location.assign("/StudentManagement/ImportDocument");
          this.file = null;
        })
        .catch((error) => {
          alert(error.response.data.error);
          this.ImportLoading = false;
        });
    },
    DownloadTemplate(type) {
      this.DownloadLoading = true;
      SchoolAdmissionService.PrintSchoolAdmissionTemplate(type)
        .then((res) => {
          this.forceFileDownload(res, "template");
          this.DownloadLoading = false;
          this.makeToast(
            this.$t("SuccessPrint"),
            this.$t("message"),
            "success"
          );
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.DownloadLoading = false;
        });
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
