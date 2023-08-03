<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HRTempCalcKind')}}</h4>
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
                    v-model="HRTempCalcKind.docnumber"
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
                        v-model="HRTempCalcKind.docdate"
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
                    <label class="col-form-label col-sm-3" for>{{$t('CalculationKind')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="calculationkindlist"
                      v-model="HRTempCalcKind.calculationkindid"
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
                      v-model="HRTempCalcKind.organizationaccountid"
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
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="HRTempCalcKind.detailinfo"
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
        <c-row class="mb-2 mr-1">
          <c-col class="text-right">
            <b-button size="sm" @click="$bvModal.show('AddModal')" variant="primary"> <b-icon icon="plus"></b-icon> {{ $t('Add') }} </b-button>
          </c-col>
        </c-row>
        <b-modal id="AddModal" size="lg" :title="$t('HRTempCalcKind')" no-close-on-backdrop hide-footer >
          <b-row>
            <b-col>
              
              <div class="form-group form-row mb-0">
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
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                  {{
                  $t("Person")
                  }}
                  </label>
                  <div class="col-sm-8 d-flex">
                  <c-input style="width:100%" size="sm" disabled v-model="tabrow.personname" >
                      <template #append>
                      <CButton @click="$bvModal.show('PersonModal')" size="sm" type="button" color="primary">
                          <b-icon icon="three-dots"></b-icon>
                      </CButton>
                      </template>
                  </c-input>
                  </div>
              </div>
              
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                  {{
                  $t("employeeenrolment")
                  }}
                  </label>
                  <div class="col-sm-8">
                    {{tabrow.employeeenrolmentid}}
                  </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                  {{
                  $t("calcpercentage")
                  }}
                  </label>
                  <div class="col-sm-8">
                    <custom-number-input class="mb-0" size="lg" v-model="tabrow.calcpercentage"></custom-number-input>
                  </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                  {{
                  $t("calcsum")
                  }}
                  </label>
                  <div class="col-sm-8">
                    <custom-number-input class="mb-0" size="lg" v-model="tabrow.calcsum"></custom-number-input>
                  </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                  {{
                  $t("detailinfo")
                  }}
                  </label>
                  <div class="col-sm-8">
                    <CInput class="mb-0" v-model="tabrow.detailinfo"></CInput>
                  </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3"> 
            <b-col class="text-center"> 
              <b-button variant="danger" @click="Close" class="mr-2" size="sm"> <b-icon icon="arrow-left"></b-icon> {{ $t('back') }} </b-button>
              <b-button variant="success" @click="Add" size="sm"> <b-icon icon="check"></b-icon> {{ $t('save') }} </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
            <employee-list-component :ondate="HRTempCalcKind.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
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
            <b-table
              :fields="HRTempCalcKindTables1"
              :items="HRTempCalcKind.Tables1"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
              small
            >
              <template #cell(actions)="{item}">
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
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'HRTempCalcKind'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HRTempCalcKind.CanSave"
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
import HRTempCalcKindService from "@/services/HRTempCalcKind.service";
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
      HRTempCalcKind: {},
      selectedrowid: 0,

      employeelist: [],
      departmentlist: [],
      organizationaccountlist: [],
      calculationkindlist: [],
      HRTempCalcKindtypelist: [],
      lang: "",
      HRTempCalcKindTables1: [
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
    HRTempCalcKindService.Get(self.$route.params.id).then(res => {
      self.HRTempCalcKind = res.data;
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
        self.HRTempCalcKind.docdate,
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
      // if (
      //   self.tabrow.calcpercentage === "" ||
      //   self.tabrow.calcpercentage === undefined ||
      //   self.tabrow.calcpercentage === null ||
      //   self.tabrow.calcpercentage === 0
      // ) {
      //   this.makeToast(
      //     this.$t("calcpercentageNotSelect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      if (
        self.tabrow.calcpercentage != 0 && self.tabrow.calcsum != 0
      ) {
        this.makeToast(
          this.$t("SelectcalcpercentageOrcalcsum"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      // if (
      //   self.tabrow.calcsum === "" ||
      //   self.tabrow.calcsum === undefined ||
      //   self.tabrow.calcsum === null ||
      //   self.tabrow.calcsum === 0
      // ) {
      //   this.makeToast(
      //     this.$t("calcsumNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

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

      // self.tabrow.departmentname = self.departmentlist.filter(function(item) {
      //   if (item.id === self.tabrow.departmentid) return item;
      // })[0].name;
        self.tabrow.departmentname = self.departmentlist.filter(item => item.id === self.tabrow.departmentid)[0].name
        self.tabrow.personname = self.employeelist.filter(item => item.id === self.tabrow.personid)[0].name
      // self.tabrow.personname = self.employeelist.filter(function(item) {
      //   if (item.id === self.tabrow.personid) return item;
      // })[0].name;

      // self.HRTempCalcKind.Tables1.push(self.tabrow);
      if (self.editedIndex > -1) {
          Object.assign(
          self.HRTempCalcKind.Tables1[self.editedIndex],
          self.tabrow
          );
      } else {
          self.HRTempCalcKind.Tables1.push(self.tabrow);
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
      this.editedIndex = this.HRTempCalcKind.Tables1.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.HRTempCalcKind.docnumber === 0 ||
        self.HRTempCalcKind.docnumber === null ||
        self.HRTempCalcKind.docnumber === undefined ||
        self.HRTempCalcKind.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HRTempCalcKind.docdate === 0 ||
        self.HRTempCalcKind.docdate === null ||
        self.HRTempCalcKind.docdate === undefined ||
        self.HRTempCalcKind.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HRTempCalcKind.calculationkindid === 0 ||
        self.HRTempCalcKind.calculationkindid === null ||
        self.HRTempCalcKind.calculationkindid === undefined ||
        self.HRTempCalcKind.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HRTempCalcKind.organizationaccountid === 0 ||
        self.HRTempCalcKind.organizationaccountid === null ||
        self.HRTempCalcKind.organizationaccountid === undefined ||
        self.HRTempCalcKind.organizationaccountid === ""
      ) {
        this.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HRTempCalcKind.detailinfo === 0 ||
        self.HRTempCalcKind.detailinfo === null ||
        self.HRTempCalcKind.detailinfo === undefined ||
        self.HRTempCalcKind.detailinfo === ""
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
      if (!this.check()) {
        return false;
      }
      HRTempCalcKindService.Update(this.HRTempCalcKind)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "HRTempCalcKind" });
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