<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HeadOrgSchoolGrade')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    disabled
                    :label="$t('docnumber')"
                    v-model="HeadOrgSchoolGrade.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="startdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="HeadOrgSchoolGrade.docdate"
                        style="width:100%"
                      disabled
                        size="sm"
                        lang="ru"
                        :placeholder="$t('docdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('schoolyear')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="SchoolYear"
                      v-model="HeadOrgSchoolGrade.schoolyearid"
                     disabled
                      @input="ChangeSchoolYear"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                  disabled
                    v-model="HeadOrgSchoolGrade.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="HeadOrgSchoolGradeTables"
              :items="HeadTables"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              
              <template v-slot:cell(isappointment)="{item}">
                <p class="m-0">{{item.isappointmentid === 1 ? "Тайинлов/Назначение" : "Озод этиш/Отстранение"}}</p>
              </template>
              
              <!-- <template #cell(personname)="{item}">
                {{employeelist.filter(i => i.id === item.personid)[0].name }}
              </template> -->
              <template v-slot:cell(istemporarily)="{item}">
                <p class="m-0">{{item.istemporarily === true ? $t('yes') : $t('no')}}</p>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'HeadOrgSchoolGrade'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import HeadOrgSchoolGradeService from "@/services/HeadOrgSchoolGrade.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import EmployeeListComponent from '@/components/EmployeeList'
export default {
  components : {EmployeeListComponent},
  data() {
    return {
      SaveLoading: false,
      HeadOrgSchoolGrade: {},
      selectedrowid: 0,
      SchoolYear: [],
      orgschoolgradelist: [],
      employeelist: [],
      lang: "",
      HeadOrgSchoolGradeTables: [
        { key: "isappointment", label: this.$t("IsAppointment") },
        { key: "orgschoolgrade", label: this.$t("OrgSchoolGrade") },
        { key: "personname", label: this.$t("PersonName") },
        { key: "istemporarily", label: this.$t("IsTemporarily") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "detailinfo", label: this.$t("detailinfo") },
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: true,
        orgschoolgradeid: 0,
        orgschoolgrade: "",
        personid: 0,
        personname: "",
        istemporarily: false,
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      },
      isappointmentlist: [
        { id: 1, name: "Тайинлов/Назначение" },
        { id: 2, name: "Озод этиш/Отстранение" }
      ],
      toastCount: 0,
      allSignupErrors: {},
      HeadTables:[],
      editedIndex: -1,
      isDisabled: false,
      personvalue : {}
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    SchoolYearService.GetAll().then(res => {
      self.SchoolYear = res.data;
    });
    HeadOrgSchoolGradeService.Get(self.selectedrowid).then(res => {
      self.HeadOrgSchoolGrade = res.data;
      self.HeadTables = res.data.Tables
      self.ChangeSchoolYear()
     
      isappointmentlist: [
        { id: 1, name: "Тайинлов/Назначение" },
        { id: 2, name: "Озод этиш/Отстранение" }
      ];
    });
  },
  methods: {
   
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
     docdatechange() {
      var self = this;
      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.HeadOrgSchoolGrade.docdate,
        0
      ).then(res => {
        self.employeelist = res.data;
      });
    },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    ChangeSchoolYear(){
      this.HeadOrgSchoolGrade.Tables = []
      if(!!this.HeadOrgSchoolGrade.schoolyearid){
        OrgSchoolGradeService.GetAll(0, 0, 0, this.HeadOrgSchoolGrade.schoolyearid).then(res => {
      this.orgschoolgradelist = res.data;
    });
      }
    },
   
  },
  watch: {
    "HeadOrgSchoolGrade.docdate": {
      handler(newValue, oldValue) {
          this.docdatechange();
      }
    },
    
    /* "TeacherHour.personid": {
      handler(newValue, oldValue) {
          this.employeechange();
      }
    }, */
  },
};
</script>

<style>
</style>





