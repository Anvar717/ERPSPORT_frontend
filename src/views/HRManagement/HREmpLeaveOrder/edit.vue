<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HREmpLeaveOrder')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docnumber" rules="required">
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="HREmpLeaveOrder.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <!-- <CCol class="sm-0"></CCol> -->
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <label>{{$t('docdate')}}</label>

                  <custom-date-picker
                    v-model="HREmpLeaveOrder.docdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('docdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    class="personList-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </custom-date-picker>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="HREmpLeaveOrder.detailinfo"
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
        <b-row class="mr-1">
          <b-col class="text-right mb-3">
            <b-button variant="primary" size="sm" v-if="HREmpLeaveOrder.CanSave" @click="OpenModal" > <b-icon icon="plus" ></b-icon> {{ $t('Add') }} </b-button>
          </b-col>
        </b-row>
        <b-modal id="AddModal" size="lg" :title="$t('HREmpLeaveOrder')" hide-footer no-close-on-backdrop>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('department')}}</label>
                <v-select
                  class="col-sm-9"
                  :options="departmentlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.departmentid"
                  @input="departmentchange"
                ></v-select>
              </div>
            </b-col>
          </b-row>
           <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('Employee')}}</label>
                <div class="d-flex col-sm-9">
                  <CInput  class="mb-0 mr-2" style="width:100%" disabled v-model="tabrow.personname"></CInput>
                  <b-button size="sm" variant="primary" @click="$bvModal.show('EmployeeModal')">
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('employeeenrolment')}}</label>
                <div class="col-sm-9">
                  {{tabrow.employeeenrolmentid}}
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('iswithoutpay')}}</label>
                <div class="col-sm-9">
                  <b-form-checkbox class="mb-0" size="lg" @input="iswithoutpayChange" v-model="tabrow.iswithoutpay"></b-form-checkbox>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('startdate')}}</label>
                <div class="col-sm-9">
                  <date-picker
                      v-model="tabrow.startdate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('startdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                       @input="datechange"
                    ></date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('enddate')}}</label>
                <div class="col-sm-9">
                  <date-picker
                      v-model="tabrow.enddate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('enddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                       @input="datechange"
                    ></date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
       <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('days')}}</label>
                <div class="col-sm-9">
                  <custom-number-input class="mb-0" disabled size="lg" v-model="tabrow.days"></custom-number-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('addpaydays')}}</label>
                <div class="col-sm-9">
                  <c-input class="mb-0 CurrenyInput"  :disabled="tabrow.iswithoutpay"  @keyup="ClickAddPay" v-model="tabrow.addpaydays"></c-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('forperiodstart')}}</label>
                <div class="col-sm-9">
                  <date-picker
                      v-model="tabrow.forperiodstart"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('forperiodstart')"
                      :disabled="tabrow.iswithoutpay"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('forperiodend')}}</label>
                <div class="col-sm-9">
                  <date-picker
                      v-model="tabrow.forperiodend"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('forperiodend')"
                      :disabled="tabrow.iswithoutpay"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('detailinfo')}}</label>
                <div class="col-sm-9">
                  <CInput class="mb-0" v-model="tabrow.detailinfo"></CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <c-row class="mt-2">
            <c-col class="text-center">
                <b-button class="mr-2" variant="danger" @click="CloseAddModal">
                    {{$t('back')}}
                </b-button>
                <b-button variant="primary"  @click="Add">
                    {{$t('Add')}}
                </b-button>
            </c-col>
        </c-row>
        </b-modal>
        <b-modal id="EmployeeModal" size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal">
          <employee-list-component :ondate="HREmpLeaveOrder.docdate" @SelectedItem="SelectedItem" @DblClick="Enterdata">
            </employee-list-component>
            <c-row class="mt-2">
                <c-col class="text-center">
                    <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                        {{$t('back')}}
                    </b-button>
                    <b-button variant="primary" @click="Enterdata(personvalue)">
                        {{$t('Add')}}
                    </b-button>
                </c-col>
            </c-row>
        </b-modal>
        <CRow>
          <CCol>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="HREmpLeaveOrderTables"
                :items="HREmpLeaveOrder.Tables"
                class="bg-color-table text-center"
                style="vertical-align:middle"
                bordered
                :tbody-tr-class="rowClass"
              >
                <template #cell(actions)="{item}">
                  <div class="text-center" v-if="HREmpLeaveOrder.CanSave">
                    <b-link @click="EditItem(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                      <b-icon icon="pencil" ></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{content: $t('Delete') }"
                      @click="DeleteItem(item)"
                    >
                      <b-icon icon="trash" ></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </div>
          </CCol>
        </CRow>
        <CRow class="mt-3">
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-3"
                size="sm"
                color="danger"
                @click="$router.push({name : 'HREmpLeaveOrder'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HREmpLeaveOrder.CanSave"
                size="sm"
                color="success"
                class="mr-3"
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
import HREmpLeaveOrderService from "@/services/HREmpLeaveOrder.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import DepartmentService from "@/services/Department.service";
import EmployeeListComponent from '@/components/EmployeeList'
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components : {EmployeeListComponent, CustomDatePicker},
  data() {
    return {
      SaveLoading: false,
      HREmpLeaveOrder: {},
      selectedrowid: 0,

      employeelist: [],
      departmentlist: [],
      employeeenrolmentlist: [],

      lang: "",
      HREmpLeaveOrderTables: [
        { key: "departmentname", label: this.$t("departmentname") },
        { key: "personname", label: this.$t("Employee") },
        { key: "employeeenrolmentid", label: this.$t("employeeenrolmentid") },
        { key: "iswithoutpay", label: this.$t("iswithoutpay") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "days", label: this.$t("days") },
        { key: "addpaydays", label: this.$t("addpaydays") },
        { key: "forperiodstart", label: this.$t("forperiodstart") },
        { key: "forperiodend", label: this.$t("forperiodend") },
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
        iswithoutpay: false,
        startdate: '',
        enddate: '',
        days: 0,
        addpaydays: 0,
        forperiodstart: '',
        forperiodend: '',
        dayoffdate: 0,
        detailinfo: "",
        workscheduleid:0,
        Status: 1
      },
      personvalue : {},
      editedIndex : -1
    };
  },
  created() {
    var self = this;
    
    self.selectedrowid = self.$route.params.id;
    HREmpLeaveOrderService.Get(self.selectedrowid).then(res => {
      self.HREmpLeaveOrder = res.data;
    });
    DepartmentService.GetAll().then(res => {
      self.departmentlist = res.data;
    });
  },
  computed: {},
  methods: {
    OpenModal(){
      this.$bvModal.show('AddModal')
      this.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        iswithoutpay: false,
        startdate: '',
        enddate: '',
        days: 0,
        addpaydays: 0,
        forperiodstart: '',
        forperiodend: '',
        dayoffdate: 0,
        detailinfo: "",
        workscheduleid:0,
        Status: 1
      }
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mn = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.tabrow.startdate = dd + "." + mn + "." + yyyy
      this.tabrow.enddate = dd + "." + mn + "." + yyyy
      this.tabrow.forperiodstart = dd + "." + mn + "." + yyyy
      this.tabrow.forperiodend = dd + "." + mn + "." + yyyy
    },
    ClickAddPay(){
      if(this.tabrow.addpaydays == 1 || this.tabrow.addpaydays == 2|| this.tabrow.addpaydays == 3 ){
        this.tabrow.addpaydays = this.tabrow.addpaydays 
      }
      else{
        this.tabrow.addpaydays  = ''
      }
    },
    iswithoutpayChange(){
      if(this.tabrow.iswithoutpay){
        this.tabrow.addpaydays = 0
        this.tabrow.forperiodstart =  ''
        this.tabrow.forperiodend =  ''
      }
    },
    CloseAddModal(){
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
          iswithoutpay: false,
          startdate: '',
          enddate: '',
          days: 0,
          addpaydays: 0,
          forperiodstart: '',
          forperiodend: '',
          dayoffdate: 0,
          detailinfo: "",
          workscheduleid:0,
          Status: 1
        };
        this.editedIndex = -1;
      });
    },
    Enterdata(data){
      this.tabrow.personid = data.personid
      this.tabrow.personname = data.personname
      this.tabrow.workscheduleid = data.workscheduleid
      this.tabrow.employeeenrolmentid = data.employeeenrolmentid
      this.CloseEmployeeModal()
    },
    CloseEmployeeModal(){
      this.$bvModal.hide("EmployeeModal")
    },
    SelectedItem(data){
      this.personvalue = data
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    datechange() {
       var self = this;
      if (self.tabrow.startdate !== null && self.tabrow.startdate !== '' && self.tabrow.startdate !== undefined 
      && self.tabrow.enddate !== null && self.tabrow.enddate !== '' && self.tabrow.enddate !== undefined ) {
      
      HREmpLeaveOrderService.GetCountWorkDays(
        self.tabrow.startdate,
        self.tabrow.enddate,
      ).then(res => {
        self.tabrow.days = res.data;
      });
      }
      else{
         self.tabrow.days = 0;
      }
    },
    departmentchange() {
      var self = this;
      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.HREmpLeaveOrder.docdate,
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
        self.tabrow.enddate === "" ||
        self.tabrow.enddate === undefined ||
        self.tabrow.enddate === null ||
        self.tabrow.enddate === 0
      ) {
        this.makeToast(
          this.$t("enddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.startdate === "" ||
        self.tabrow.startdate === undefined ||
        self.tabrow.startdate === null ||
        self.tabrow.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.days === "" ||
        self.tabrow.days === undefined ||
        self.tabrow.days === null ||
        self.tabrow.days === 0
      ) {
        this.makeToast(this.$t("daysNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
/*       if (
        self.tabrow.addpaydays === "" ||
        self.tabrow.addpaydays === undefined ||
        self.tabrow.addpaydays === null ||
        self.tabrow.addpaydays === 0
      ) {
        this.makeToast(
          this.$t("addpaydaysNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /* if (
        self.tabrow.forperiodstart === "" ||
        self.tabrow.forperiodstart === undefined ||
        self.tabrow.forperiodstart === null ||
        self.tabrow.forperiodstart === 0
      ) {
        this.makeToast(
          this.$t("forperiodstartNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
/*       if (
        self.tabrow.forperiodend === "" ||
        self.tabrow.forperiodend === undefined ||
        self.tabrow.forperiodend === null ||
        self.tabrow.forperiodend === 0
      ) {
        this.makeToast(
          this.$t("forperiodendNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
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
      if(!self.tabrow.iswithoutpay){
        if(!self.tabrow.forperiodstart){
          self.makeToast(self.$t('forperiodstartNotCorrect'),self.$t('error'),'danger')
          return false
        }
        if(!self.tabrow.forperiodend){
          self.makeToast(self.$t('forperiodendNotCorrect'),self.$t('error'),'danger')
          return false
        }
      }
     
      if(self.editedIndex == -1){
         var duplicateperson =  self.HREmpLeaveOrder.Tables.map(item => item.personid)
        if(duplicateperson.includes(self.tabrow.personid)){
          self.makeToast(self.$t('dublicateperson'),self.$t('error'),'danger')
          return false
        }
      }
      if(self.editedIndex > -1){
        var duplicateperson =  self.HREmpLeaveOrder.Tables.filter(l => l.Status != 3).map(item => item.personid).filter(el => el != self.HREmpLeaveOrder.Tables[self.editedIndex].personid)
          if(duplicateperson.includes(self.tabrow.personid)){
            self.makeToast(self.$t('dublicateperson'),self.$t('error'),'danger')
            return false
          }
      }
      
      self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;

      if (self.editedIndex > -1) {
        Object.assign(self.HREmpLeaveOrder.Tables[self.editedIndex], self.tabrow);
      } else {
        self.HREmpLeaveOrder.Tables.push(self.tabrow);
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        iswithoutpay: false,
        startdate: '',
        enddate: '',
        days: 0,
        addpaydays: 0,
        forperiodstart: '',
        forperiodend: '',
        dayoffdate: 0,
        detailinfo: "",
        workscheduleid:0,
        Status: 1
      };
      self.$bvModal.hide("AddModal")
    },

     EditItem(item) {
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.HREmpLeaveOrder.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.HREmpLeaveOrder.docnumber === 0 ||
        self.HREmpLeaveOrder.docnumber === null ||
        self.HREmpLeaveOrder.docnumber === undefined ||
        self.HREmpLeaveOrder.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HREmpLeaveOrder.docdate === 0 ||
        self.HREmpLeaveOrder.docdate === null ||
        self.HREmpLeaveOrder.docdate === undefined ||
        self.HREmpLeaveOrder.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.HREmpLeaveOrder.detailinfo === null ||
        self.HREmpLeaveOrder.detailinfo === undefined ||
        self.HREmpLeaveOrder.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HREmpLeaveOrder.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }

      HREmpLeaveOrderService.Update(self.HREmpLeaveOrder)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HREmpLeaveOrder" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    }
  }
};
</script>

<style>

</style>





