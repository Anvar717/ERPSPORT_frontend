<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HrRecallLeave')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput
                  type="number"
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="HrRecallLeave.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <label>{{$t('docdate')}}</label>

                  <date-picker
                    v-model="HrRecallLeave.docdate"
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
                </ValidationProvider>
              </CCol>

              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="HrRecallLeave.detailinfo"
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
          <b-row>
            <b-col class="text-right">
              <b-button @click="OpenModal" v-if="HrRecallLeave.CanSave" variant="primary"> <b-icon icon="plus"></b-icon> {{ $t('Add') }}</b-button>
            </b-col>
          </b-row>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="HrRecallLeaveTables"
                :items="HrRecallLeave.Tables"
                class="bg-color-table text-center tableResponsive"
                style="vertical-align:middle"
                bordered
                :tbody-tr-class="rowClass"
                small
              >
                <template #cell(actions)="{item}">
                    <div class="text-center" v-if="HrRecallLeave.CanSave">
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
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'HrRecallLeave'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HrRecallLeave.CanSave"
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
        <b-modal id="AddModal" no-close-on-backdrop size="lg" :title="$t('Employee')" hide-footer>
          <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{
                  $t("department")
                }}
              </label>
              <div class="col-sm-8">
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
          <div class="form-group form-row ">
              <label class="col-form-label col-sm-4">
                {{
                  $t("Employee")
                }}
              </label>
              <div class="col-sm-8">
                 <b-input-group >
                    <b-form-input disabled v-model="tabrow.personname"></b-form-input>
                    <b-input-group-append>
                      <b-button @click="OpenEmployeeModal" variant="primary"> <b-icon icon="three-dots"></b-icon> </b-button>
                    </b-input-group-append>
                  </b-input-group>
              </div>
          </div>
          <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{
                  $t("hrempleaveorder")
                }}
              </label>
              <div class="col-sm-8">
                <v-select
                  :options="hrempleaveorderlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.hrempleaveorderid"
                ></v-select>
              </div>
          </div>
          <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{
                  $t("startdate")
                }}
              </label>
              <div class="col-sm-8">
                <date-picker
                  v-model="tabrow.startdate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </div>
          </div>
          <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{
                  $t("detailinfo")
                }}
              </label>
              <div class="col-sm-8">
                <CInput class="mb-0" v-model="tabrow.detailinfo"></CInput>
              </div>
          </div>
          <b-row>
            <b-col class="text-center">
              <b-button variant="danger" @click="Close" class="mr-2"> {{ $t('back') }} </b-button>
              <b-button variant="success" @click="Add"> {{ $t('Save') }} </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal id="EmployeeModal" no-close-on-backdrop size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal">
          <!-- <get-employee-list-component :isAllEmployee="false" @SelectedItem="SelectedItem" @DblClick="AddEmployeeData"></get-employee-list-component> -->
          <employee-list
          :isteacher="false"
          @SelectedItem="SelectedItem"
          @DblClick="AddEmployeeData"
        ></employee-list>
          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddEmployeeData(personvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HrRecallLeaveService from "@/services/HrRecallLeave.service";
import EmployeeList from "@/components/EmployeeList";
import EmployeeManageService from "@/services/EmployeeManage.service";
import HREmpLeaveOrderService from '@/services/HREmpLeaveOrder.service'
import GetEmployeeListComponent from '@/components/GetEmployeeListComponent'
import DepartmentService from "@/services/Department.service";
export default {
  components : {GetEmployeeListComponent, EmployeeList},
  data() {
    return {
      SaveLoading: false,
      HrRecallLeave: {},
      selectedrowid: 0,
      lang: "",
      HrRecallLeaveTables: [
        { key: "departmentname", label: this.$t("departmentname"),thClass : 'text-center' },
        { key: "personname", label: this.$t("Employee") ,thClass : 'text-center' },
        { key: "hrempleaveorder", label: this.$t("hrempleaveorder"),thClass : 'text-center'  },
        { key: "startdate", label: this.$t("startdate"),thClass : 'text-center'  },
        { key: "detailinfo", label: this.$t("detailinfo"),thClass : 'text-center'  },
        { key: "actions", label: this.$t("actions") ,thClass : 'text-center' }
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        hrempleaveorderid: 0,
        hrempleaveorder: "",
        hrempleaveordertableid: 0,
        hrempleaveordertable: 0,
        startdate: 0,
        detailinfo: "",
        Status: 1
      },
      personvalue : {},
      employeelist: [],
      departmentlist: [],
      hrempleaveorderlist: [],
      editedIndex : -1
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    HrRecallLeaveService.Get(self.selectedrowid).then(res => {
      self.HrRecallLeave = res.data;
    });
    DepartmentService.GetAll().then(res => {
      self.departmentlist = res.data;
    });
  },

  methods: {
    SelectedItem(data){
      this.personvalue = data
    },
    AddEmployeeData(data){
      this.tabrow.personid = data.personid
      this.tabrow.personname = data.personname
      this.CloseEmployeeModal()
      this.employeechange()
    },
    CloseEmployeeModal(){
      this.$bvModal.hide('EmployeeModal')
    },
    OpenModal(){
      this.$bvModal.show('AddModal')
      this.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        hrempleaveorderid: 0,
        hrempleaveorder: "",
        hrempleaveordertableid: 0,
        hrempleaveordertable: 0,
        startdate: 0,
        detailinfo: "",
        Status: 1
      }
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
              hrempleaveorderid: 0,
              hrempleaveorder: "",
              hrempleaveordertableid: 0,
              hrempleaveordertable: 0,
              startdate: 0,
              detailinfo: "",
              Status: 1
            },
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
        self.HrRecallLeave.docdate,
        self.tabrow.departmentid
      ).then(res => {
        self.employeelist = res.data;
      });
    },
    OpenEmployeeModal(){
      this.$bvModal.show('EmployeeModal')
    },
    employeechange() {
      var self = this;
      /* if (self.tabrow.employeeenrolmentid > 0) {
        self.tabrow.employeeenrolmentid = "";
      } */
      // self.tabrow.personname = self.employeelist.filter(function(item) {
      //   if (item.id === self.tabrow.personid) return item;
      // })[0].name;
      HREmpLeaveOrderService.GetAll(self.tabrow.personid).then(res => {
        self.hrempleaveorderlist = res.data
      })


      /*  self.tabrow.employeeenrolmentid = self.employeelist.filter(function(item) {
          if (item.personid === self.tabrow.personid) return item;
      })[0].employeeenrolmentid; */
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
        self.tabrow.personid === "" ||
        self.tabrow.personid === undefined ||
        self.tabrow.personid === null ||
        self.tabrow.personid === 0
      ) {
        this.makeToast(
          this.$t("employeeNotCorrect"),
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
      if (
        self.tabrow.departmentid === null ||
        self.tabrow.departmentid === undefined ||
        self.tabrow.departmentid === 0
      ) {
        this.makeToast(
          this.$t("DepartmentNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      // self.tabrow.personname = self.employeelist.filter(function(item) {
      //   if (item.id === self.tabrow.personid) return item;
      // })[0].name;

      self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;

      self.tabrow.hrempleaveordertableid = self.hrempleaveorderlist.filter(
        function(item) {
          (item);
          if (item.id === self.tabrow.hrempleaveorderid) return item;
        }
      )[0].tableid;
      self.tabrow.hrempleaveorder = self.hrempleaveorderlist.filter(
        function(item) {
          (item);
          if (item.id === self.tabrow.hrempleaveorderid) return item;
        }
      )[0].name;

      if (self.editedIndex > -1) {
          Object.assign(
          self.HrRecallLeave.Tables[self.editedIndex],
          self.tabrow
          );
      } else {
        self.HrRecallLeave.Tables.push(self.tabrow);
      }
      
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        hrempleaveorderid: 0,
        hrempleaveorder: "",
        hrempleaveordertableid: 0,
        hrempleaveordertable: 0,
        startdate: 0,
        detailinfo: "",
        Status: 1
      };
      this.$bvModal.hide("AddModal");
    },

    EditItem(item) {
      if(item.Status === 0){
          item.Status = 2
      }
      this.editedIndex = this.HrRecallLeave.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.employeechange()
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.HrRecallLeave.docnumber === 0 ||
        self.HrRecallLeave.docnumber === null ||
        self.HrRecallLeave.docnumber === undefined ||
        self.HrRecallLeave.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrRecallLeave.docdate === 0 ||
        self.HrRecallLeave.docdate === null ||
        self.HrRecallLeave.docdate === undefined ||
        self.HrRecallLeave.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.HrRecallLeave.detailinfo === null ||
        self.HrRecallLeave.detailinfo === undefined ||
        self.HrRecallLeave.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HrRecallLeave.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }

      HrRecallLeaveService.Update(self.HrRecallLeave)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HrRecallLeave" });
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





