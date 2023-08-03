<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HrWorkDayOff')}}</h4>
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
                    v-model="HrWorkDayOff.docnumber"
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
                        v-model="HrWorkDayOff.docdate"
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

              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="HrWorkDayOff.detailinfo"
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
            <b-button variant="primary" @click="OpenAddModal"> <b-icon icon="plus"></b-icon> {{ $t('Add') }} </b-button>
          </b-col>
        </b-row>
        <b-modal id="AddModal" size="lg" :title="$t('HrWorkDayOff')" no-close-on-backdrop hide-footer >
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
              <!-- <custom-date-input />  -->
              <b-input-group>
                <b-form-input disabled v-model="tabrow.personname"></b-form-input>
                <b-input-group-append>
                  <b-button variant="primary" @click="$bvModal.show('PersonModal')"> <b-icon icon="three-dots"></b-icon> </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <div class="form-group form-row">
            <label
              for="datepicker-dateformat2"
              class="col-form-label col-sm-4"
            >{{$t('employeeenrolmentid')}}</label>
            <div class="col-sm-8 d-flex align-items-center">
              <p class="m-0 p-0"><b> {{tabrow.employeeenrolmentid}} </b></p>
            </div>
          </div>
          <div class="form-group form-row">
            <label
              for="datepicker-dateformat2"
              class="col-form-label col-sm-4"
            >{{$t('dayoffdate')}}</label>
            <div class="col-sm-8 d-flex align-items-center">
              <date-picker
                v-model="tabrow.dayoffdate"
                style="width:100%"
                size="sm"
                lang="ru"
                :placeholder="$t('dayoffdate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </div>
          </div>
          <div class="form-group form-row">
            <label
              class="col-form-label col-sm-4"
            >{{$t('detailinfo')}}</label>
            <div class="col-sm-8 d-flex align-items-center">
              <CInput class="mb-0" style="width:100%" v-model="tabrow.detailinfo"></CInput>
            </div>
          </div>
          <b-row>
            <b-col class="text-center">
              <b-button variant="danger" @click="CloseAddModal" class="mr-2"> <b-icon icon="arrow-left-short"></b-icon> {{ $t('back') }} </b-button>
              <b-button variant="success" @click="Add"> <b-icon icon="check2"></b-icon> {{ $t('Save') }} </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <CRow>
          <CCol>
            <b-table
              :fields="HrWorkDayOffTables"
              :items="HrWorkDayOff.Tables"
              class="bg-color-table text-center  mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
              small
            >
              
              <template v-slot:cell(actions)="{item}">
                <div class="text-center" v-if="HrWorkDayOff.CanSave">
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
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'HrWorkDayOff'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HrWorkDayOff.CanSave"
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
        <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
            <employee-list-component :deparment="tabrow.departmentid" :ondate="HrWorkDayOff.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HrWorkDayOffService from "@/services/HrWorkDayOff.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import DepartmentService from "@/services/Department.service";
import EmployeeListComponent from '@/components/EmployeeList'
export default {
  components : {EmployeeListComponent},
  data() {
    return {
      SaveLoading: false,
      HrWorkDayOff: {},
      selectedrowid: 0,

      lang: "",
      HrWorkDayOffTables: [
        { key: "departmentname", label: this.$t("departmentname") },
        { key: "personname", label: this.$t("Employee") },
        { key: "employeeenrolmentid", label: this.$t("employeeenrolmentid") },
        { key: "dayoffdate", label: this.$t("dayoffdate") },
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
        dayoffdate: 0,
        detailinfo: "",
        Status: 1
      },

      employeelist: [],
      departmentlist: [],
      employeeenrolmentlist: [],
      personvalue : {},
      editedIndex : -1
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HrWorkDayOffService.Get(self.selectedrowid).then(res => {
      self.HrWorkDayOff = res.data;
    });
    DepartmentService.GetAll().then(res => {
      self.departmentlist = res.data;
    });
  },

  methods: {
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
            dayoffdate: 0,
            detailinfo: "",
            Status: 1
          }
          this.editedIndex = -1;
      });
    },
    SelectedItem(data){
      this.personvalue = data
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
    OpenAddModal(){
      this.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        dayoffdate: 0,
        detailinfo: "",
        Status: 1
      }
      this.editedIndex = -1
      this.$bvModal.show('AddModal')
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
        self.HrWorkDayOff.docdate,
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
      if (
        self.tabrow.dayoffdate === "" ||
        self.tabrow.dayoffdate === undefined ||
        self.tabrow.dayoffdate === null ||
        self.tabrow.dayoffdate === 0
      ) {
        this.makeToast(
          this.$t("dayoffdateNotCorrect"),
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
        this.makeToast(this.$t("personNotSelect"), this.$t("Error"), "danger");
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

      self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;
      if (self.editedIndex > -1) {
          Object.assign(
          self.HrWorkDayOff.Tables[self.editedIndex],
          self.tabrow
          );
      } else {
          self.HrWorkDayOff.Tables.push(self.tabrow);
      }
      
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        dayoffdate: 0,
        detailinfo: "",
        Status: 1
      };
      this.$bvModal.hide("AddModal");
    },

    EditItem(item) {
      if(item.Status === 0){
          item.Status = 2
      }
      this.editedIndex = this.HrWorkDayOff.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.HrWorkDayOff.docnumber === 0 ||
        self.HrWorkDayOff.docnumber === null ||
        self.HrWorkDayOff.docnumber === undefined ||
        self.HrWorkDayOff.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrWorkDayOff.docdate === 0 ||
        self.HrWorkDayOff.docdate === null ||
        self.HrWorkDayOff.docdate === undefined ||
        self.HrWorkDayOff.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.HrWorkDayOff.detailinfo === null ||
        self.HrWorkDayOff.detailinfo === undefined ||
        self.HrWorkDayOff.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HrWorkDayOff.Tables.length === 0) {
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

      HrWorkDayOffService.Update(self.HrWorkDayOff)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HrWorkDayOff" });
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





