<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('MassPlannedCalculation')}}</h4>
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
                    :label="$t('docnumber')"
                    v-model="MassPlannedCalculation.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="MassPlannedCalculation.docdate"
                        style="width:100%"
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
                    <label class="col-form-label col-sm-3" for>{{$t('calculationkindall')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="calculationkindlist"
                      v-model="MassPlannedCalculation.calculationkindid"
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
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('Organizationaccount')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationaccountlist"
                      v-model="MassPlannedCalculation.organizationaccountid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="code"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
               <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('Department')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="departmentlist"
                      v-model="MassPlannedCalculation.departmentid"
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
                    v-model="MassPlannedCalculation.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow v-if="!MassPlannedCalculation.iscancelation">
            <CCol>
                <ValidationProvider v-slot="v" name="percentage" rules="required|max:9">
                  <CInput
                    :placeholder="$t('percentage')"
                    autocomplete="percentage"
                    horizontal
                    :label="$t('percentage')"
                    v-model="MassPlannedCalculation.percentage"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            <CCol>
                <ValidationProvider v-slot="v" name="amount" rules="required|max:9">
                  <CInput
                    :placeholder="$t('amount')"
                    autocomplete="amount"
                    horizontal
                    :label="$t('amount')"
                    v-model="MassPlannedCalculation.amount"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
                <CCol>
                <ValidationProvider v-slot="v" name="startdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('startdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="MassPlannedCalculation.startdate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('startdate')"
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
             <CCol>
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('enddate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="MassPlannedCalculation.enddate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('enddate')"
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
                  <CCol sm="1">
                    <label for>{{$t('iscancelation')}}</label>
                    <b-form-checkbox
                      
                      v-model="MassPlannedCalculation.iscancelation"
                      name="check-button"
                      switch
                    ></b-form-checkbox>
                  </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'MassPlannedCalculation'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="MassPlannedCalculation.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import MassPlannedCalculationService from "@/services/MassPlannedCalculation.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import DepartmentService from "@/services/Department.service";
import OrganizationService from "@/services/organization.service";
import CalculationKindService from "@/services/CalculationKind.service";
import HelperService from "@/services/helper.service";
import EmployeeListComponent from '@/components/EmployeeList'
export default {
  components : {EmployeeListComponent},
  data() {
    return {
      SaveLoading: false,
      MassPlannedCalculation: {},
      selectedrowid: 0,

      employeelist: [],
      departmentlist: [],
      organizationaccountlist: [],
      calculationkindlist: [],
      MassPlannedCalculationtypelist: [],
      lang: "",
      MassPlannedCalculationTables1: [
        { key: "departmentname", label: this.$t("departmentname") },
        { key: "personname", label: this.$t("Employee") },
        { key: "employeeenrolmentid", label: this.$t("employeeenrolmentid") },
        { key: "calcpercentage", label: this.$t("calcpercentage") },
        { key: "calcsum", label: this.$t("calcsum") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        calcpercentage: "",
        calcsum: "",
        detailinfo: "",
        Status: 1
      },
      editedIndex : -1,
      personvalue : {}
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    DepartmentService.GetAll().then(res => {
      self.departmentlist = res.data;
    });
    MassPlannedCalculationService.Get(self.$route.params.id).then(res => {
      self.MassPlannedCalculation = res.data;
    });

    OrganizationService.GetOrganizationAccountList(self.lang).then(res => {
      self.organizationaccountlist = res.data;
    });
    CalculationKindService.GetAll().then(res => {
      self.calculationkindlist = res.data;
    });
  },
  methods: {
    AddPerson(data){
        this.tabrow.personid = data.personid
        this.tabrow.personname = data.personname
        this.tabrow.employeeenrolmentid = data.employeeenrolmentid
        this.CloseEmployeeModal()
    },
    SelectedItem(data){
      this.personvalue = data
    },
    CloseEmployeeModal(){
      this.$bvModal.hide('PersonModal')
    },
    Close(){
        this.$bvModal.hide("AddModal");
        this.$nextTick(() => {
            this.tabrow = {
              id: 0,
              ownerid: 0,
              departmentid: 0,
              departmentname: "",
              personid: 0,
              personname: "",
              employeeenrolmentid: 0,
              calcpercentage: "",
              calcsum: "",
              detailinfo: "",
              Status: 1
            }
            this.editedIndex = -1;
        });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    departmentchange() {
      var self = this;
      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.MassPlannedCalculation.docdate,
        self.tabrow.departmentid
      ).then(res => {
        self.employeelist = res.data;
      });
    },
    employeechange() {
      var self = this;
      if (self.tabrow.employeeenrolmentid > 0) {
        self.tabrow.employeeenrolmentid = "";
      }
      self.tabrow.personname = self.employeelist.filter(function(item) {
        if (item.id === self.tabrow.personid) return item;
      })[0].name;
      self.tabrow.employeeenrolmentid = self.employeelist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.personid) return item;
      })[0].employeeenrolmentid;
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
    Add() {
      var self = this;
      if (
        self.tabrow.departmentid === "" ||
        self.tabrow.departmentid === undefined ||
        self.tabrow.departmentid === null ||
        self.tabrow.departmentid === 0
      ) {
        this.makeToast(
          this.$t("departmentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.personid === "" ||
        self.tabrow.personid === undefined ||
        self.tabrow.personid === null ||
        self.tabrow.personid === 0
      ) {
        this.makeToast(this.$t("personNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow.calcpercentage === "" ||
        self.tabrow.calcpercentage === undefined ||
        self.tabrow.calcpercentage === null ||
        self.tabrow.calcpercentage === 0
      ) {
        this.makeToast(
          this.$t("calcpercentageNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.calcsum === "" ||
        self.tabrow.calcsum === undefined ||
        self.tabrow.calcsum === null ||
        self.tabrow.calcsum === 0
      ) {
        this.makeToast(
          this.$t("calcsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.detailinfo === "" ||
        self.tabrow.detailinfo === undefined ||
        self.tabrow.detailinfo === null ||
        self.tabrow.detailinfo === 0
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;

      self.tabrow.personname = self.employeelist.filter(function(item) {
        if (item.id === self.tabrow.personid) return item;
      })[0].name;

      // self.MassPlannedCalculation.Tables1.push(self.tabrow);
      if (self.editedIndex > -1) {
          Object.assign(
          self.MassPlannedCalculation.Tables1[self.editedIndex],
          self.tabrow
          );
      } else {
          self.MassPlannedCalculation.Tables1.push(self.tabrow);
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        calcpercentage: 0,
        calcsum: 0,
        detailinfo: "",
        Status: 1
      };
      self.$bvModal.hide('AddModal')
    },
    EditItem(item) {
      if(item.Status === 0){
          item.Status = 2
      }
      this.editedIndex = this.MassPlannedCalculation.Tables1.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.MassPlannedCalculation.docnumber === 0 ||
        self.MassPlannedCalculation.docnumber === null ||
        self.MassPlannedCalculation.docnumber === undefined ||
        self.MassPlannedCalculation.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MassPlannedCalculation.docdate === 0 ||
        self.MassPlannedCalculation.docdate === null ||
        self.MassPlannedCalculation.docdate === undefined ||
        self.MassPlannedCalculation.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MassPlannedCalculation.calculationkindid === 0 ||
        self.MassPlannedCalculation.calculationkindid === null ||
        self.MassPlannedCalculation.calculationkindid === undefined ||
        self.MassPlannedCalculation.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MassPlannedCalculation.organizationaccountid === 0 ||
        self.MassPlannedCalculation.organizationaccountid === null ||
        self.MassPlannedCalculation.organizationaccountid === undefined ||
        self.MassPlannedCalculation.organizationaccountid === ""
      ) {
        this.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MassPlannedCalculation.startdate === 0 ||
        self.MassPlannedCalculation.startdate === null ||
        self.MassPlannedCalculation.startdate === undefined ||
        self.MassPlannedCalculation.startdate === ""
      ) {
        this.makeToast(
          this.$t("startdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MassPlannedCalculation.detailinfo === 0 ||
        self.MassPlannedCalculation.detailinfo === null ||
        self.MassPlannedCalculation.detailinfo === undefined ||
        self.MassPlannedCalculation.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MassPlannedCalculation.percentage > 0 && self.MassPlannedCalculation.amount > 0
      ) {
        this.makeToast(
          this.$t("AmountOrPercentage"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      MassPlannedCalculationService.Update(this.MassPlannedCalculation)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "MassPlannedCalculation" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    }
  }
};
</script>