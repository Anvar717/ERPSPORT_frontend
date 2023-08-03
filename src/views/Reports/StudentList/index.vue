<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-center">{{ $t("NumberOfSportTypeStudents") }}</h3>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-card class="mb-n2">
            <custom-report-filter
              ref="getRegionList"
              :filter="filter"
              @search="Search"
              v-model="filter"
              @clear="clearFilter"
              isCollapse
            ></custom-report-filter>
          </b-card>
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
            :current-page="filter.currentPage"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template #cell(personname)="{ item }">
              <a
                @click="GotoStudentCard(item)"
                style="color: blue; cursor: pointer; text-decoration: underline"
              >
                {{ item.personname }}</a
              >
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
          <div class="pb-4">
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.perPage"
                id="perPageSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.currentPage"
                :total-rows="totalRows"
                :per-page="filter.perPage"
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
import StudentManageService from "@/services/StudentManage.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: {
    CustomReportFilter,
  },
  data() {
    return {
      schoolyearlist: [],
      organizationlist: [],
      oblastlist: [],
      regionlist: [],
      orgschoolgradelist: [],
      fields: [
        {
          key: "sporttypeclassifiername",
          label: this.$t("SportTypeClassifier"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportorganization",
          label: this.$t("sportorganization"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "groupsheetcount",
          label: this.$t("groupsheetcount"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "Student",
          label: this.$t("Student"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      items: [],
      totalRows: "",
      isBusy: false,
      PrintLoading: false,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        Sort: "",
        order: "asc",
        PageNumber: 1,
        perPage: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
    };
  },
  created() {
    this.Search();
  },
  computed: {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.totalRows < this.filter.perPage) {
        return this.totalRows;
      } else {
        if (this.filter.currentPage * this.filter.perPage > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.currentPage * this.filter.perPage;
        }
      }
    },
  },
  methods: {
    clearFilter() {
      this.filter = {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        Search: "",
        Sort: "",
        order: "asc",
        PageNumber: 1,
        perPage: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
      this.Refresh();
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.OnDate = dd + "." + mm + "." + yyyy;
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
      StudentManageService.GetList(
        this.filter.FullName,
        this.filter.DateOfBirth,
        this.filter.organizationid,
        this.filter.OnDate,
        this.filter.SchoolYearID,
        this.filter.OrgSchoolGradeID,
        this.filter.Sort,
        this.filter.order,
        this.filter.PageNumber,
        this.filter.perPage
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
      });
    },
    Print() {
      this.PrintLoading = true;
      StudentManageService.PrintStudentList(
        this.filter.FullName,
        this.filter.DateOfBirth,
        this.filter.organizationid,
        this.filter.OnDate,
        this.filter.SchoolYearID,
        this.filter.OrgSchoolGradeID,
        this.filter.Sort,
        this.filter.order,
        this.filter.PageNumber,
        this.filter.perPage
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res, "StudentList");
        })
        .catch((error) => {
          this.PrintLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
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
    "filter.currentPage": {
      handler(newValue) {
        this.filter.PageNumber = newValue;
        this.Refresh();
      },
    },
  },
};
</script>
