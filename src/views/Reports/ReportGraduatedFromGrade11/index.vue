<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("ReportGraduatedFromGrade11") }}</h3>
        <CCardHeader>
          <b-row>
            <b-col sm="12" lg="2">
              <div>
                <label> {{ $t('SchoolYear') }} </label>
                 <v-select
                    :options="schoolyearlist"
                    v-model="filter.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col>
             <b-col sm="12" lg="2">
              <div>
                <label> {{ $t('personname') }} </label>
                 <CInput
                :placeholder="$t('personname')"
                autocomplete="text"
                size="sm"
                v-model="filter.personname"
                v-on:keyup.enter="personname"
              >
              </CInput>
              </div>
            </b-col>
             <b-col sm="12" lg="2">
              <div>
                <label> {{ $t('pinfl') }} </label>
                 <CInput
                :placeholder="$t('pinfl')"
                autocomplete="text"
                size="sm"
                v-model="filter.pinfl"
                v-on:keyup.enter="pinfl"
              >
                <template #append>
                  <CButton
                    @click="Refresh"
                    size="sm"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{$t('search')}}
                  </CButton>
                </template>
              </CInput>
              </div>
            </b-col>
             <b-col sm="12" lg="1">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                style="margin-top:28px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
                {{ $t('Refresh') }}
              </CButton>
            </b-col>
            <b-col sm="12" md="2" lg="3">
              <CButton
                @click="CheckDataForMinVuz"
                size="sm"
                color="primary"
                class="float-left"
                style="margin-top:28px"
              >
               
                {{ $t('CheckDataForMinVuz') }}
              </CButton>
              <CButton
                @click="CheckDataForDtm"
                size="sm"
                color="primary"
                class="float-left ml-2"
                style="margin-top:28px"
              >
                
                {{ $t('CheckDataForDtm') }}
              </CButton>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right"
                style="margin-top:28px"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            style="min-height: 500px"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
          <template v-slot:cell(universityadmissionstatus)="{ item }">
              <CBadge :color="getItemColor(item.universityadmissionstatus)">{{
                item.universityadmissionstatus
              }}</CBadge>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2"
                style="vertical-align:middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
           <div class="pb-4">
            <div style="float:left;font-size:12px">
              {{$t('RecordsFrom')}} {{firstNumber}} {{$t('by')}} {{lastNumber}} {{$t('of')}}
              {{totalRows}}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float:left;font-size:12px">{{$t('RecordsPerPage')}}</div>
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
import SchoolYearService from "@/services/SchoolYear.service";

import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
export default {
  data() {
    return {
      schoolyearlist: [],
     
      fields: [
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgradename"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          sortable: false,
          class: "text-left",
        },{
          key: "universityadmissionstatus",
          label: this.$t("universityadmissionstatus"),
          sortable: false,
         
        },{
          key: "minvuzstudentInfo.university_name",
          label: this.$t("university_name"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "minvuzstudentInfo.speciality_code",
          label: this.$t("speciality_code"),
          sortable: false,
          class: "text-left",
        },{
          key: "minvuzstudentInfo.speciality_name",
          label: this.$t("speciality_name"),
          sortable: false,
          class: "text-left",
        },{
          key: "minvuzstudentInfo.education_type_name",
          label: this.$t("education_type_name"),
          sortable: false,
          class: "text-left",
        },{
          key: "minvuzstudentInfo.payment_type_name",
          label: this.$t("payment_type_name"),
          sortable: false,
          class: "text-left",
        },
       
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        schoolyearid: 3,
        isminvuz: false,
        isdtm: false,
        organizationid:0,
        personname:"",
        pinfl:"",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [ 10, 20, 25, 50, 100],
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
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    
    this.createDate();
    if(!!this.$route.query.organization){
      this.filter.organizationid = this.$route.query.organization
      this.Refresh();
    }
    else{
      this.Refresh();
    }
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
   getItemColor(text) {
      return text === "Да"
        ? "success"
        
        : "danger"
       ;
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },

    Refresh() {
      this.isBusy = true;
      this.filter.isminvuz = false;
      this.filter.isdtm = false;
      ReportLearningProcessService.GetGraduatedFromGrade11(
        this.filter.schoolyearid,
        this.filter.isminvuz,
        this.filter.isdtm,
        this.filter.personname,
        this.filter.pinfl,
        this.filter.Search,
        this.filter.organizationid,
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
    CheckDataForMinVuz() {
      this.isBusy = true;
      this.filter.isminvuz = true;
      this.filter.isdtm = false;
      ReportLearningProcessService.GetGraduatedFromGrade11(
       this.filter.schoolyearid,
        this.filter.isminvuz,
        this.filter.isdtm,
        this.filter.personname,
        this.filter.pinfl,
        this.filter.Search,
        this.filter.organizationid,
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
    CheckDataForDtm() {
      this.isBusy = true;
      this.filter.isminvuz = true;
      this.filter.isdtm = true;
      ReportLearningProcessService.GetGraduatedFromGrade11(
        this.filter.schoolyearid,
        this.filter.isminvuz,
        this.filter.isdtm,
        this.filter.personname,
        this.filter.pinfl,
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
  },
  watch:{
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    },
  }
  
};

</script>
