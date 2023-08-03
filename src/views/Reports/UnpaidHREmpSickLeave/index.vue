<template>
  <CRow>
    <CCol sm="12" md="12">
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            responsive="sm"
            style="min-height: 200px"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
           <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="Create(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Calculate') }"
                >
                  <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Calculate") }}
                </b-link>
               
                
              </div>
              
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
    </CCol>
  </CRow>
</template>

<script>
import HREmpSickLeaveService from "@/services/HREmpSickLeave.service";
export default {
  props : {
    startdate : {
      type : String,
      default : ''
    },
    enddate : {
      type : String,
      default : ''
    },
    search : {
      type : String,
      default : ''
    }
  },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          
        },
        {
          key: "documentid",
          label: this.$t("hrempsickleaveid"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "hrempsickleavedate",
          label: this.$t("hrempsickleavedate"),
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
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
        },
        {
          key: "startdate",
          label: this.$t("leavestartdate"),
          sortable: false,
        },
        {
          key: "enddate",
          label: this.$t("leaveenddate"),
          sortable: false,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
        },
        
        /* {
          key: "citizenship",
          label: this.$t("citizenship"),
          sortable: false
        }, */
        
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        FullName: "",
        DateOfBirth: "",
        StartDate: "",
        EndDate: "",
        DepartmentID: 0,
        HREmpAppointOrderTypeID: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
      },
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
    };
  },
  created() {
    this.createDate();
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
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
    Create(item) {
      this.$router.push({
        name: "EditCalcLeavePay",
        params: {
          id: 0,
          documentid: item.documentid,
          documenttableid: item.documenttableid,
          documentinfo: item.documentinfo,
          tableid: item.tableid,
          personid: item.personid,
          personname: item.personname,
          employeeenrolmentid: item.employeeenrolmentid,
          calculationkindid: item.calculationkindid,
        },
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      var startyyyy = todaydate.getFullYear()-1;
      this.filter.StartDate = dd + "." + mm + "." + startyyyy;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    Refresh() {
      this.isBusy = true;
      HREmpSickLeaveService.GetUnpaidHREmpSickLeaveList(
        this.search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.startdate,
        this.enddate,
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
    persontypeid: {
      handler(newValue, oldValue) {
        this.Refresh();
      },
    },
  },
};
</script>
