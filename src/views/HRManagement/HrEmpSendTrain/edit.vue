<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HrEmpSendTrain')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="HrEmpSendTrain.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="HrEmpSendTrain.docdate"
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
              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="HrEmpSendTrain.detailinfo"
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
        <b-row class="mr-1 mb-3">
          <b-col class="text-right">
            <b-button variant="primary" v-if="HrEmpSendTrain.CanSave" @click="OpenAddModal"> <b-icon icon="plus"></b-icon> {{ $t('Add') }} </b-button>
          </b-col>
        </b-row>
        <b-modal id="AddModal" size="lg" :title="$t('HrEmpSendTrain')" no-close-on-backdrop hide-footer >
          <div class="form-group form-row">
              <label
                for="datepicker-dateformat2"
                class="col-form-label col-sm-4"
              >{{$t('department')}}</label>
              <div class="col-sm-8">
                <!-- <custom-date-input />  -->
               <v-select
                  :options="departmentlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.departmentid"
                  @input="departmentchange"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label
                for="datepicker-dateformat2"
                class="col-form-label col-sm-4"
              >{{$t('Employee')}}</label>
              <div class="col-sm-8">
                <b-input-group>
                  <b-form-input disabled v-model="tabrow.personname"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" @click="OpenPersonModal"> <b-icon icon="three-dots"></b-icon> </b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
            <div class="form-group form-row">
              <label
                for="datepicker-dateformat2"
                class="col-form-label col-sm-4"
              >{{$t('startdate')}}</label>
              <div class="col-sm-8">
                <!-- <custom-date-input />  -->
               <date-picker
                  v-model="tabrow.startdate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  :disabled-date="DisabledDateForStartdate"
                ></date-picker>
              </div>
            </div>
            <div class="form-group form-row">
              <label
                for="datepicker-dateformat2"
                class="col-form-label col-sm-4"
              >{{$t('enddate')}}</label>
              <div class="col-sm-8">
                <!-- <custom-date-input />  -->
               <date-picker
                  v-model="tabrow.enddate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('enddate')"
                  value-type="format"
                  :disabled-date="DisabledDateForEnddate"
                  format="DD.MM.YYYY"
                ></date-picker>
              </div>
            </div>
            <div class="form-group form-row">
              <label
                for="datepicker-dateformat2"
                class="col-form-label col-sm-4"
              >{{$t('detailinfo')}}</label>
              <div class="col-sm-8">
                <!-- <custom-date-input />  -->
               <CInput class="mb-0" v-model="tabrow.detailinfo"></CInput>
              </div>
            </div>
            <b-row>
              <b-col class="text-center">
                <b-button variant="danger" @click="CloseAddModal" class="mr-2"> <b-icon icon="arrow-left-short"></b-icon> {{ $t('back') }} </b-button>
                <b-button variant="success" @click="Add"> <b-icon icon="check2"></b-icon> {{ $t('Save') }} </b-button>
              </b-col>
            </b-row>
        </b-modal>
        <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
            <employee-list-component :deparment="tabrow.departmentid" :ondate="HrEmpSendTrain.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
            <!-- <get-employee-list-component @SelectedItem="SelectedItem" :isAllEmployee="false" @DblClick="AddPerson"></get-employee-list-component> -->
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
        <CRow>
          <CCol>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="HrEmpSendTrainTables1"
                :items="HrEmpSendTrain.Tables1"
                class="bg-color-table text-center"
                style="vertical-align:middle"
                bordered
                small
                :tbody-tr-class="rowClass"
              >
                <template v-slot:cell(actions)="{item}">
                  <div class="text-center">
                      <b-link
                        @click="EditItem(item)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Edit') }"
                      >
                        <b-icon icon="pencil" ></b-icon>
                      </b-link>
                      <b-link
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Delete') }"
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
                @click="$router.push({name : 'HrEmpSendTrain'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HrEmpSendTrain.CanSave"
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
import HrEmpSendTrainService from "@/services/HrEmpSendTrain.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import DepartmentService from "@/services/Department.service";
import EmployeeListComponent from '@/components/EmployeeList'
export default {
  components : {EmployeeListComponent},
  data() {
    return {
      SaveLoading: false,
      HrEmpSendTrain: {},
      selectedrowid: 0,
      employeelist: [],
      departmentlist: [],
      HrEmpSendTraintypelist: [],
      lang: "",
      HrEmpSendTrainTables1: [
        { key: "departmentname", label: this.$t("departmentname") },
        { key: "personname", label: this.$t("Employee") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
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
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      },
      personvalue : {},
      editedIndex : -1
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    DepartmentService.GetAll().then(res => {
      self.departmentlist = res.data;
    });
    HrEmpSendTrainService.Get(self.$route.params.id).then(res => {
      self.HrEmpSendTrain = res.data;
    });
  },

  methods: {
    DisabledDateForEnddate(date){
      if(!!this.tabrow.startdate){
        var arr = this.tabrow.startdate.split('.')
        return date < new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    DisabledDateForStartdate(date){
      if(!!this.tabrow.enddate){
        var arr = this.tabrow.enddate.split('.')
        return date > new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    CloseEmployeeModal(){
      this.$bvModal.hide('PersonModal')
    },
    AddPerson(data){
        this.CloseEmployeeModal()
        this.tabrow.personid = data.personid
        this.tabrow.personname = data.personname
        this.tabrow.employeeenrolmentid = data.employeeenrolmentid
    },
    SelectedItem(data){
      this.personvalue = data
    },
    OpenPersonModal(){
      this.$bvModal.show('PersonModal')
    },
    OpenAddModal(){
      this.$bvModal.show('AddModal')
       this.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      };
    },
    CloseAddModal(){
       this.$bvModal.hide('AddModal')
       this.$nextTick(() => {
           this.tabrow = {
              id: 0,
              ownerid: 0,
              departmentid: 0,
              departmentname: "",
              personid: 0,
              personname: "",
              startdate: 0,
              enddate: 0,
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
        self.HrEmpSendTrain.docdate,
        self.tabrow.departmentid
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
    Add() {
      var self = this;
      var arrs = self.tabrow.startdate.split('.')
      var arre = self.tabrow.enddate.split('.')
      var startdate =  new Date(arrs[2],arrs[1] - 1,arrs[0])
      var enddate = new Date(arre[2],arre[1] - 1,arre[0])
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
        this.makeToast(this.$t("personCorrect"), this.$t("Error"), "danger");
        return false;
      }

      if (
        self.tabrow.startdate === "" ||
        self.tabrow.startdate === undefined ||
        self.tabrow.startdate === null ||
        self.tabrow.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotSelect"),
          this.$t("Error"),
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
        this.makeToast(
          this.$t("enddateNotCorrect"),
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
      if(enddate.getTime() < startdate.getTime()){
        this.makeToast(
          this.$t("NeedHighfromEnddate"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;
      
      if (self.editedIndex > -1) {
          Object.assign(
          self.HrEmpSendTrain.Tables1[self.editedIndex],
          self.tabrow
          );
      } else {
          self.HrEmpSendTrain.Tables1.push(self.tabrow);
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      };
      self.CloseAddModal()
    },
    EditItem(item) {
      if(item.Status === 0){
          item.Status = 2
      }
      this.editedIndex = this.HrEmpSendTrain.Tables1.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.HrEmpSendTrain.docnumber === 0 ||
        self.HrEmpSendTrain.docnumber === null ||
        self.HrEmpSendTrain.docnumber === undefined ||
        self.HrEmpSendTrain.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrEmpSendTrain.docdate === 0 ||
        self.HrEmpSendTrain.docdate === null ||
        self.HrEmpSendTrain.docdate === undefined ||
        self.HrEmpSendTrain.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrEmpSendTrain.detailinfo === 0 ||
        self.HrEmpSendTrain.detailinfo === null ||
        self.HrEmpSendTrain.detailinfo === undefined ||
        self.HrEmpSendTrain.detailinfo === ""
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
      HrEmpSendTrainService.Update(self.HrEmpSendTrain)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HrEmpSendTrain" });
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





