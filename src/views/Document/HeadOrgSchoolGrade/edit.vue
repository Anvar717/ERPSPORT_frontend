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
                    :disabled="isDisabled == true"
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
                        :disabled="isDisabled == true"
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
                      :disabled="isDisabled == true"
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
                    :disabled="isDisabled == true"
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
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('HeadOrgSchoolGrade')}}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('IsAppointment')}}</label>
                 <v-select
                      :options="isappointmentlist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      class="col-sm-9"
                      label="name"
                      v-model="tabrow.isappointmentid"
                      @change="IsAppoinmentCheckTables"
                  ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('SchoolGrade')}}</label>
                 <v-select
                      :options="orgschoolgradelist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      class="col-sm-9"
                      @input="changeorgschoolgrade"
                      v-model="tabrow.orgschoolgradeid"
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
                  <b-button size="sm" variant="primary" @click="OpenEmployeeModal">
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('PersonName')}}</label>
                <div class="col-sm-9 d-flex">
                    <v-select
                      :options="employeelist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      
                      style="display:inline;width:100%"
                      v-model="tabrow.personid"
                    ></v-select>
                </div>
              </div>
            </b-col>
          </b-row> -->
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('IsTemporarily')}}</label>
                 <b-form-checkbox class="mb-0 ml-2" size="lg" v-model="tabrow.istemporarily"></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <b-row >
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('startdate')}}</label>
                 <date-picker
                      v-model="tabrow.startdate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      class="col-sm-9"
                      :placeholder="$t('startdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row >
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('enddate')}}</label>
                 <date-picker
                      v-model="tabrow.enddate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      class="col-sm-9"
                      :placeholder="$t('enddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <CInput horizontal class="mb-0" :label="$t('detailinfo')" v-model="tabrow.detailinfo"></CInput>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
              <CButton size="sm" color="primary" @click="AddItem">
                <b-icon icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </template>
        </b-modal>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
              <c-button size="sm" color="primary" @click="OpenModal">
                <b-icon icon="plus"></b-icon> {{$t('Add')}}
              </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="HeadOrgSchoolGradeTables"
              :items="HeadOrgSchoolGrade.Tables"
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
             
              
              <template #cell(actions)="{item}">
                <div class="text-center">
                  <b-link
                    @click="EditItem(item)"
                    class="mr-2"
                    v-c-tooltip="{content: $t('Edit') }"
                  >
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
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HeadOrgSchoolGrade.CanSave"
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
          <b-modal id="modalXl" size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal">
            <employee-list-component :ondate="HeadOrgSchoolGrade.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson">

              </employee-list-component>
              <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
              <!-- <edit-person-component></edit-person-component> -->

              <c-row class="mt-2">
                  <c-col class="text-center">
                      <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                          {{$t('back')}}
                      </b-button>
                      <b-button variant="primary" @click="AddPerson(personvalue)">
                          {{$t('Add')}}
                      </b-button>
                  </c-col>
              </c-row>
          </b-modal>
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
        { key: "actions", label: this.$t("actions") }
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
      if(!!self.HeadOrgSchoolGrade.schoolyearid){
        OrgSchoolGradeService.GetAll(0, 0, 0, self.HeadOrgSchoolGrade.schoolyearid).then(res => {
      self.orgschoolgradelist = res.data;
    });
      }
      isappointmentlist: [
        { id: 1, name: "Тайинлов/Назначение" },
        { id: 2, name: "Озод этиш/Отстранение" }
      ];
    });
  },
  methods: {
    SelectedItem(value){
      this.personvalue = value
    },
    OpenEmployeeModal(){
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl")
    },
    CloseEmployeeModal(){
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl")
    },
    AddPerson(data){
      this.CloseEmployeeModal()
      this.tabrow.personid = data.personid
      this.tabrow.personname = data.personname
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    changeorgschoolgrade(){
      this.tabrow.orgschoolgrade = this.orgschoolgradelist.filter(
        (item) => this.tabrow.orgschoolgradeid === item.id
      )[0].name;
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
    Add() {
      var self = this;
      (self.tabrow);
      if (
        self.tabrow.startdate === "" ||
        self.tabrow.startdate === undefined ||
        self.tabrow.startdate === null ||
        self.tabrow.startdate === 0
      ) {
        self.makeToast(
          self.$t("startdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.enddate === "" ||
        self.tabrow.enddate === undefined ||
        self.tabrow.enddate === null ||
        self.tabrow.enddate === 0
      ) {
        self.makeToast(
          self.$t("endtimeNotCorrect"),
          self.$t("Error"),
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
        self.makeToast(self.$t("personNotSelect"), self.$t("Error"), "danger");
        return false;
      }

      if (
        self.tabrow.orgschoolgradeid === "" ||
        self.tabrow.orgschoolgradeid === undefined ||
        self.tabrow.orgschoolgradeid === null ||
        self.tabrow.orgschoolgradeid === 0
      ) {
        self.makeToast(
          self.$t("orgschoolgradeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.isappointmentid === "" ||
        self.tabrow.isappointmentid === undefined ||
        self.tabrow.isappointmentid === null ||
        self.tabrow.isappointmentid === 0
      ) {
        self.makeToast(
          self.$t("isappointmentNotCorrect"),
          self.$t("Error"),
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
        self.makeToast(
          self.$t("detailinfoNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      self.tabrow.personname = self.employeelist.filter(function(item) {
        if (item.id === self.tabrow.personid) return item;
      })[0].name;

      self.tabrow.orgschoolgrade = self.orgschoolgradelist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.orgschoolgradeid) return item;
      })[0].name;

      self.HeadOrgSchoolGrade.Tables.push(self.tabrow);
      self.tabrow = {
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
      };
      self.isDisabled = true;
      self.$bvModal.hide('AddModal')
    },
    OpenModal(){
       var self = this;
      if (!self.checkData()) {
        return false;
      }
     self.$bvModal.show('AddModal')
    },
    IsAppoinmentCheckTables() {
      var self = this;
      if (self.tabrow.isappointmentid == 1) {
        self.tabrow.isappointment = true;
      } else {
        self.tabrow.isappointment = false;
      }
    },
    IsAppoinmentCheckCell(item) {
      if (item.isappointmentid == 1) {
        item.isappointment = true;
      } else {
        item.isappointment = false;
      }
    },

    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.HeadOrgSchoolGrade.Tables.indexOf(item)
      this.tabrow = Object.assign({}, item)
      this.$bvModal.show('AddModal')
    },
    DeleteItem(item) {
      (item);
      item.Status = 3;
    },
    AddItem(){
      if (this.editedIndex > -1) {
          Object.assign(this.HeadOrgSchoolGrade.Tables[this.editedIndex], this.tabrow)
          this.Close()
        } else {
          this.Add();
        }
    },
    Close(){
      this.$bvModal.hide('AddModal')
      this.$nextTick(() => {
        this.tabrow = {
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
        };
        this.editedIndex = -1
      })
    },
    check() {
      var self = this;
      if (
        self.HeadOrgSchoolGrade.docnumber === 0 ||
        self.HeadOrgSchoolGrade.docnumber === null ||
        self.HeadOrgSchoolGrade.docnumber === undefined ||
        self.HeadOrgSchoolGrade.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolGrade.docdate === 0 ||
        self.HeadOrgSchoolGrade.docdate === null ||
        self.HeadOrgSchoolGrade.docdate === undefined ||
        self.HeadOrgSchoolGrade.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolGrade.schoolyearid === 0 ||
        self.HeadOrgSchoolGrade.schoolyearid === null ||
        self.HeadOrgSchoolGrade.schoolyearid === undefined ||
        self.HeadOrgSchoolGrade.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolGrade.detailinfo === null ||
        self.HeadOrgSchoolGrade.detailinfo === undefined ||
        self.HeadOrgSchoolGrade.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HeadOrgSchoolGrade.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    checkData(){
     var self = this;
      if (
        self.HeadOrgSchoolGrade.docnumber === 0 ||
        self.HeadOrgSchoolGrade.docnumber === null ||
        self.HeadOrgSchoolGrade.docnumber === undefined ||
        self.HeadOrgSchoolGrade.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolGrade.docdate === 0 ||
        self.HeadOrgSchoolGrade.docdate === null ||
        self.HeadOrgSchoolGrade.docdate === undefined ||
        self.HeadOrgSchoolGrade.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolGrade.schoolyearid === 0 ||
        self.HeadOrgSchoolGrade.schoolyearid === null ||
        self.HeadOrgSchoolGrade.schoolyearid === undefined ||
        self.HeadOrgSchoolGrade.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolGrade.detailinfo === null ||
        self.HeadOrgSchoolGrade.detailinfo === undefined ||
        self.HeadOrgSchoolGrade.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      HeadOrgSchoolGradeService.Update(self.HeadOrgSchoolGrade)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HeadOrgSchoolGrade" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    }
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





