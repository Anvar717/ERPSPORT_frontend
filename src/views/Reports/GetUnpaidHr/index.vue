<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("UnpaidHR") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="2" md="3" sm="5" class="text-left mt-2">
                <label  for>{{
                  $t("StartDate")
                }}</label>
                  <date-picker
                    v-model="filter.StartDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('StartDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker>
            </CCol>
            <CCol lg="2" md="5" sm="11" class="text-left mt-2">
                  <label for>{{
                    $t("EndDate")
                  }}</label>
                    <date-picker
                      v-model="filter.EndDate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('EndDate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    >
                    </date-picker>
            </CCol>
            <CCol lg="3" md="5" sm="11" class="text-left mt-2">
              <CInput
                style="margin-top:28px"
                :placeholder="$t('EmployeeFullName')"
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
          </CRow>
          <b-row>
            <b-col>
              <b-button-group size="sm">
                <b-button @click="First" :variant="activeButton == 1 ? 'primary' : 'outline-primary'">{{ $t('UnpaidHREmpleaveOrder') }}</b-button>
                <b-button @click="Two" :variant="activeButton == 2 ? 'primary' : 'outline-primary'"> {{ $t('UnpaidHREmpSickLeave') }} </b-button>
                <b-button @click="Third" :variant="activeButton == 3 ? 'primary' : 'outline-primary'"> {{ $t('UnpaidHrAcceptanceWork') }} </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <unpaid-hr-empleave-order ref="UnpaidHrEmpleaveOrder" v-if="activeButton == 1" :startdate="filter.StartDate" :enddate="filter.EndDate" :search="filter.Search"></unpaid-hr-empleave-order>
          <unpaid-hr-emp-sick-leave ref="UnpaidHREmpSickLeave" v-if="activeButton == 2" :startdate="filter.StartDate" :enddate="filter.EndDate" :search="filter.Search"></unpaid-hr-emp-sick-leave>
          <unpaid-hr-acceptance-work ref="UnpaidHRAcceptanceWork" v-if="activeButton == 3" :startdate="filter.StartDate" :enddate="filter.EndDate" :search="filter.Search"></unpaid-hr-acceptance-work>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import UnpaidHrEmpleaveOrder from "../UnpaidHREmpleaveOrder"
import UnpaidHrEmpSickLeave from "../UnpaidHREmpSickLeave"
import UnpaidHrAcceptanceWork from "../UnpaidHRAcceptanceWork"
export default {
  components:{UnpaidHrEmpleaveOrder,UnpaidHrEmpSickLeave,UnpaidHrAcceptanceWork},
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          
        },
        {
          key: "hrempleaveorderid",
          label: this.$t("hrempleaveorderid"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "hrempleaveorderdate",
          label: this.$t("hrempleaveorderdate"),
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
      activeButton : 1
    };
  },
  created() {
    this.createDate();
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
    First(){
      this.activeButton = 1
    },
    Two(){
      this.activeButton = 2
    },
    Third(){
      this.activeButton = 3
    },
    Create(item) {
      this.$router.push({
        name: "EditCalcLeavePay",
        params: {
          id: 0,
          hrempleaveorderid: item.hrempleaveorderid,
          hrempleaveordertableid: item.hrempleaveordertableid,
          personid: item.personid,
          personname: item.personname,
          employeeenrolmentid: item.employeeenrolmentid,
          calculationkindid: 25,
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
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh(){
      if(this.activeButton == 1){
        this.$refs.UnpaidHrEmpleaveOrder.Refresh()
      }
      if(this.activeButton == 2){
        this.$refs.UnpaidHREmpSickLeave.Refresh()
      }
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
