<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('PlannedCalculation')}}</h4>
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
                    v-model="PlannedCalculation.docnumber"
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
                        v-model="PlannedCalculation.docdate"
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
                      v-model="PlannedCalculation.calculationkindid"
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
                      v-model="PlannedCalculation.organizationaccountid"
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
                      v-model="PlannedCalculation.departmentid"
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
                    v-model="PlannedCalculation.detailinfo"
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
                  <CCol sm="1">
                    <label for>{{$t('iscancelation')}}</label>
                    <b-form-checkbox
                      @change="clearTable"
                      v-model="PlannedCalculation.iscancelation"
                      name="check-button"
                      switch
                    ></b-form-checkbox>
                  </CCol>
            </CRow>
            <CRow v-if="PlannedCalculation.CanSave">
              <CCol>
                <div class="text-right">
                  <CButton class="sm-1" size="sm" color="info" @click="fillTable">
                    <b-icon icon="list-ul"></b-icon>
                    {{ $t("Fill") }}
                  </CButton>
                </div>
              </CCol>
              <CCol>
                <div class="text-left">
                  <CButton class="xl-1" size="sm" color="danger" @click="clearTable">
                    <b-icon icon="exclamation-octagon"></b-icon>
                    {{ $t("Clear") }}
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <c-row class="mb-2 mr-1">
          <c-col class="text-right">
            <b-button size="sm" @click="$bvModal.show('AddModal')" variant="primary"> <b-icon icon="plus"></b-icon> {{ $t('Add') }} </b-button>
          </c-col>
        </c-row>
        <b-modal id="AddModal" size="lg" :title="$t('PlannedCalculation')" no-close-on-backdrop hide-footer >
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
                  $t("percentage")
                  }}
                  </label>
                  <div class="col-sm-8">
                    <custom-number-input class="mb-0" size="lg" v-model="tabrow.percentage"></custom-number-input>
                  </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                  {{
                  $t("amount")
                  }}
                  </label>
                  <div class="col-sm-8">
                    <custom-number-input class="mb-0" size="lg" v-model="tabrow.amount"></custom-number-input>
                  </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">{{$t('startdate')}}</label>
                <date-picker
                    v-model="tabrow.startdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    class="col-sm-8"
                  ></date-picker>
              </div>
            </b-col>
          </b-row>
                    <b-row >
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">{{$t('enddate')}}</label>
                <date-picker
                    v-model="tabrow.enddate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('enddate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    class="col-sm-8"
                  ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
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
            <employee-list-component :ondate="PlannedCalculation.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
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
              :fields="PlannedCalculationTables"
              :items="PlannedCalculation.Tables"
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
                @click="$router.push({name : 'PlannedCalculation'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="PlannedCalculation.CanSave"
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
import PlannedCalculationService from "@/services/PlannedCalculation.service";
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
      PlannedCalculation: {},
      selectedrowid: 0,

      employeelist: [],
      departmentlist: [],
      organizationaccountlist: [],
      calculationkindlist: [],
      PlannedCalculationtypelist: [],
      lang: "",
      PlannedCalculationTables: [
        { key: "personname", label: this.$t("Employee") },
        { key: "employeeenrolmentid", label: this.$t("employeeenrolmentid") },
        { key: "percentage", label: this.$t("percentage") },
        { key: "amount", label: this.$t("amount") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        positionid: 0,
        percentage: "",
        amount: "",
        startdate: "",
        enddate: "",
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
    PlannedCalculationService.Get(self.$route.params.id).then(res => {
      self.PlannedCalculation = res.data;
    });

    OrganizationService.GetOrganizationAccountList(self.lang).then(res => {
      self.organizationaccountlist = res.data;
    });
    CalculationKindService.GetAll().then(res => {
      self.calculationkindlist = res.data;
    });
  },
  methods: {
    fillTable() {
      var self = this;
      self.PlannedCalculation.Tables.forEach(function (item) {
        item.Status = 3;
      });
      PlannedCalculationService.PlannedCalculationFill(
        self.PlannedCalculation.docdate,
        self.PlannedCalculation.calculationkindid,
        self.PlannedCalculation.departmentid,
        self.PlannedCalculation.organizationaccountid
      ).then((res) => {
        res.data.forEach(function (item) {
          self.tabrow = {
            id: 0,
            ownerid: 0,
            personid: item.personid,
            personname: item.personname,
            positionid: item.positionid,
            employeeenrolmentid: item.employeeenrolmentid,
            percentage: item.percentage,
            amount: item.amount,
            startdate: item.startdate,
            enddate: item.enddate,
            detailinfo: item.detailinfo,
            Status: 1,
          };
          self.PlannedCalculation.Tables.push(self.tabrow);
          self.tabrow = {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            positionid: 0,
            employeeenrolmentid: 0,
            percentage: 0,
            amount: 0,
            startdate: "",
            enddate: "",
            detailinfo: "",
            Status: 1,
          };
        });
      });
    },
    clearTable() {
      var self = this;
      self.PlannedCalculation.Tables.forEach(function (item) {
        item.Status = 3;
      });
    },
    AddPerson(data){
        this.tabrow.personid = data.personid
        this.tabrow.personname = data.personname
        this.tabrow.employeeenrolmentid = data.employeeenrolmentid
        this.tabrow.positionid = data.positionid
        this.tabrow.positionname = data.positionname
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
              personid: 0,
              personname: "",
              employeeenrolmentid: 0,
              positionid: 0,
              percentage: "",
              amount: "",
              startdate: "",
              enddate: "",
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
        self.PlannedCalculation.docdate,
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
        self.tabrow.personid === "" ||
        self.tabrow.personid === undefined ||
        self.tabrow.personid === null ||
        self.tabrow.personid === 0
      ) {
        this.makeToast(this.$t("personNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
/*       if (
        self.tabrow.percentage === "" ||
        self.tabrow.percentage === undefined ||
        self.tabrow.percentage === null ||
        self.tabrow.percentage === 0
      ) {
        this.makeToast(
          this.$t("percentageNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

/*       if (
        self.tabrow.amount === "" ||
        self.tabrow.amount === undefined ||
        self.tabrow.amount === null ||
        self.tabrow.amount === 0
      ) {
        this.makeToast(
          this.$t("amountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

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
        self.tabrow.percentage > 0 && self.tabrow.amount > 0
      ) {
        this.makeToast(
          this.$t("AmountOrPercentage"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      // self.tabrow.departmentname = self.departmentlist.filter(function(item) {
      //   if (item.id === self.tabrow.departmentid) return item;
      // })[0].name;

      // self.tabrow.personname = self.employeelist.filter(function(item) {
      //   if (item.id === self.tabrow.personid) return item;
      // })[0].name;

      // self.PlannedCalculation.Tables1.push(self.tabrow);
      if (self.editedIndex > -1) {
          Object.assign(
          self.PlannedCalculation.Tables[self.editedIndex],
          self.tabrow
          );
      } else {
          self.PlannedCalculation.Tables.push(self.tabrow);
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        percentage: 0,
        sum: 0,
        detailinfo: "",
        Status: 1
      };
      self.$bvModal.hide('AddModal')
    },
    EditItem(item) {
      if(item.Status === 0){
          item.Status = 2
      }
      this.editedIndex = this.PlannedCalculation.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.PlannedCalculation.docnumber === 0 ||
        self.PlannedCalculation.docnumber === null ||
        self.PlannedCalculation.docnumber === undefined ||
        self.PlannedCalculation.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PlannedCalculation.docdate === 0 ||
        self.PlannedCalculation.docdate === null ||
        self.PlannedCalculation.docdate === undefined ||
        self.PlannedCalculation.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PlannedCalculation.calculationkindid === 0 ||
        self.PlannedCalculation.calculationkindid === null ||
        self.PlannedCalculation.calculationkindid === undefined ||
        self.PlannedCalculation.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PlannedCalculation.organizationaccountid === 0 ||
        self.PlannedCalculation.organizationaccountid === null ||
        self.PlannedCalculation.organizationaccountid === undefined ||
        self.PlannedCalculation.organizationaccountid === ""
      ) {
        this.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PlannedCalculation.detailinfo === 0 ||
        self.PlannedCalculation.detailinfo === null ||
        self.PlannedCalculation.detailinfo === undefined ||
        self.PlannedCalculation.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.PlannedCalculation.Tables.length === 0) {
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
      PlannedCalculationService.Update(this.PlannedCalculation)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "PlannedCalculation" });
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