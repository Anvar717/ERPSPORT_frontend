<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("HREmpSickLeave") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3">
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput type="number" :placeholder="$t('docnumber')" autocomplete="docnumber" :label="$t('docnumber')"
                    v-model="HREmpSickLeave.docnumber" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <!-- <CCol class="sm-0"></CCol> -->
              <CCol sm="3">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <label>{{ $t("docdate") }}</label>
                  <div>
                    <!-- <custom-date-input />  -->
                    <custom-date-picker v-model="HREmpSickLeave.docdate" style="width: 100%" size="sm" lang="ru"
                      :placeholder="$t('docdate')" value-type="format" format="DD.MM.YYYY">
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </custom-date-picker>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput :placeholder="$t('detailinfo')" autocomplete="detailinfo" :label="$t('detailinfo')"
                    v-model="HREmpSickLeave.detailinfo" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <c-row class="mr-1 mb-2">
          <c-col class="text-right">
            <b-button variant="primary" v-if="HREmpSickLeave.CanSave" @click="$bvModal.show('AddModal')" size="sm">
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
        <b-modal id="AddModal" size="xl" :title="$t('HREmpSickLeave')" no-close-on-backdrop hide-footer>
          <b-row>
            <b-col>
              <label> {{ $t("department") }} </label>
              <v-select :options="departmentlist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                label="name" v-model="tabrow.departmentid" @input="departmentchange"></v-select>
            </b-col>
            <b-col>
              <label> {{ $t("Employee") }} </label>
              <c-input style="width: 100%" disabled v-model="tabrow.personname">
                <template #append>
                  <CButton :disabled="!tabrow.departmentid" @click="$bvModal.show('PersonModal')" size="sm" type="button"
                    color="primary">
                    <b-icon icon="three-dots"></b-icon>
                  </CButton>
                </template>
              </c-input>
            </b-col>
          </b-row>
          <b-row class="mt-n1">
            <b-col>
              <CInput :label="$t('employeeenrolment')" disabled class="mb-0" v-model="tabrow.employeeenrolmentid">
              </CInput>
            </b-col>
            <b-col>
              <label> {{ $t("givendate") }} </label>
              <custom-date-picker v-model="tabrow.givendate" style="width: 100%" size="sm" lang="ru"
                :placeholder="$t('givendate')" value-type="format" format="DD.MM.YYYY"></custom-date-picker>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label> {{ $t("documentseries") }} </label>
              <CInput class="mb-0" v-model="tabrow.documentseries"></CInput>
            </b-col>
            <b-col>
              <label> {{ $t("documentnumber") }} </label>
              <CInput class="mb-0" v-model="tabrow.documentnumber"></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label> {{ $t("diagnosis") }} </label>
              <CInput class="mb-0" v-model="tabrow.diagnosis"></CInput>
            </b-col>
            <b-col>
              <label> {{ $t("givenorganization") }} </label>
              <CInput class="mb-0" v-model="tabrow.givenorganization"></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label> {{ $t("startdate") }} </label>
              <custom-date-picker v-model="tabrow.startdate" style="width: 100%" size="sm" lang="ru"
                :placeholder="$t('startdate')" value-type="format" format="DD.MM.YYYY"
                :disabled-date="DisabledDateForStartdate"></custom-date-picker>
            </b-col>
            <b-col>
              <label> {{ $t("enddate") }} </label>
              <custom-date-picker v-model="tabrow.enddate" style="width: 100%" size="sm" lang="ru"
                :placeholder="$t('enddate')" :disabled-date="DisabledDateForEnddate" value-type="format"
                format="DD.MM.YYYY"></custom-date-picker>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col class="text-center">
              <div class="divider">{{ $t("yearworkexp") }}</div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label> {{ $t("workexpyear") }} </label>
              <CInput class="mb-0" v-model="tabrow.workexpyear"></CInput>
            </b-col>
            <b-col>
              <label> {{ $t("workexpmonth") }} </label>
              <CInput class="mb-0" v-model="tabrow.workexpmonth"></CInput>
            </b-col>
            <b-col>
              <label> {{ $t("workexpday") }} </label>
              <CInput class="mb-0" v-model="tabrow.workexpday"></CInput>
            </b-col>
            <b-col>
              <label> {{ $t("calcperc") }} </label>
              <!-- <custom-number-input class="mb-0" size="lg" v-model="tabrow.calcperc"></custom-number-input> -->
              <v-select :options="PercentList" :reduce="(item) => item.name" :placeholder="$t('ChooseBelow')" label="name"
                v-model="tabrow.calcperc"></v-select>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col md="3" sm="12" class="d-flex align-items-center" v-if="gender == 'Женский'">
              <b-form-checkbox switch v-model="tabrow.ismaternityleave" @input="ChangeCheckbox">
                {{ $t("ismaternityleave") }}
              </b-form-checkbox>
            </b-col>
            <b-col>
              <label> {{ $t("detailinfo") }} </label>
              <CInput class="mb-0" v-model="tabrow.detailinfo"></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col class="text-center">
              <b-button variant="danger" @click="Close" size="sm" class="mr-2">
                <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
              </b-button>
              <b-button variant="success" @click="Add" size="sm">
                <b-icon icon="check"></b-icon> {{ $t("save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer
          modal-class="custom-size-modal">
          <employee-list-component :deparment="tabrow.departmentid" :ondate="HREmpSickLeave.docdate" :isteacher="false"
            @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPerson(personvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <div class="table-container">
          <div class="mobileStyle mx-3">
            <table class="table table-bordered" :fields="HREmpSickLeaveTables" :items="HREmpSickLeave.Tables"
              style="vertical-align: middle" bordered :tbody-tr-class="rowClass" small>
              <thead>
                <tr>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("departmentname") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("personname") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("employeeenrolmentid") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("givendate") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("documentseries") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("documentnumber") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("diagnosis") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("givenorganization") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("startdate") }}
                  </th>
                  <th colspan="3" style="text-align: center; vertical-align: middle">
                    {{ $t("yearworkexp") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("enddate") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("calcperc") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("ismaternityleave") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("detailinfo") }}
                  </th>
                  <th rowspan="2" style="text-align: center; vertical-align: middle">
                    {{ $t("actions") }}
                  </th>
                </tr>
                <tr>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("workexpyear") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("workexpmonth") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("workexpday") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in HREmpSickLeave.Tables" style="text-align: center; vertical-align: middle" :key="i">
                  <td class="text-left">{{ item.departmentname }}</td>
                  <td class="text-left">{{ item.personname }}</td>
                  <td class="text-center">{{ item.employeeenrolmentid }}</td>
                  <td class="text-center">{{ item.givendate }}</td>
                  <td class="text-right">{{ item.documentseries }}</td>
                  <td class="text-right">{{ item.documentnumber }}</td>
                  <td class="text-right">{{ item.diagnosis }}</td>
                  <td class="text-right">{{ item.givenorganization }}</td>
                  <td class="text-right">{{ item.startdate }}</td>
                  <td class="text-right">{{ item.workexpyear }}</td>
                  <td class="text-right">{{ item.workexpmonth }}</td>
                  <td class="text-right">{{ item.workexpday }}</td>
                  <td class="text-right">{{ item.enddate }}</td>
                  <td class="text-right">{{ item.calcperc }}</td>
                  <td class="text-right">{{ item.ismaternityleave }}</td>
                  <td class="text-right">{{ item.detailinfo }}</td>
                  <td class="text-right">
                    <div class="text-center">
                      <b-link @click="EditItem(item)" class="mr-2" v-c-tooltip="{ content: $t('Edit') }">
                        <b-icon icon="pencil"></b-icon>
                      </b-link>
                      <b-link class="mr-2" v-c-tooltip="{ content: $t('Delete') }" @click="DeleteItem(item)">
                        <b-icon icon="trash"></b-icon>
                      </b-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton class="ml-3" size="sm" color="danger" @click="$router.push({ name: 'HREmpSickLeave' })">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton v-if="HREmpSickLeave.CanSave" size="sm" color="success" class="mr-3" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HREmpSickLeaveService from "@/services/HREmpSickLeave.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import DepartmentService from "@/services/Department.service";
import EmployeeListComponent from "@/components/EmployeeList";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: { EmployeeListComponent, CustomDatePicker },
  data() {
    return {
      SaveLoading: false,
      HREmpSickLeave: {},
      selectedrowid: 0,
      employeelist: [],
      departmentlist: [],
      employeeenrolmentlist: [],

      lang: "",
      HREmpSickLeaveTables: [
        { key: "departmentname", label: this.$t("departmentname") },
        { key: "personname", label: this.$t("Employee") },
        { key: "employeeenrolmentid", label: this.$t("employeeenrolmentid") },
        { key: "givendate", label: this.$t("givendate") },
        { key: "documentseries", label: this.$t("documentseries") },
        { key: "documentnumber", label: this.$t("documentnumber") },
        { key: "diagnosis", label: this.$t("diagnosis") },
        { key: "givenorganization", label: this.$t("givenorganization") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        // { key: "yearworkexp", label: this.$t("yearworkexp") },
        { key: "calcperc", label: this.$t("calcperc") },
        { key: "ismaternityleave", label: this.$t("ismaternityleave") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "workexpyear", label: this.$t("workexpyear") },
        { key: "workexpmonth", label: this.$t("workexpmonth") },
        { key: "workexpday", label: this.$t("workexpday") },
        { key: "actions", label: this.$t("actions") },
      ],
      personvalue: {},
      tabrow: {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        givendate: "",
        documentseries: "",
        documentnumber: "",
        diagnosis: "",
        givenorganization: "",
        startdate: 0,
        enddate: 0,
        calcperc: 0,
        detailinfo: "",
        ismaternityleave: false,
        workexpyear: 0,
        workexpmonth: 0,
        workexpday: 0,
        Status: 1,
      },
      gender: "",
      editedIndex: -1,
      PercentList: [
        { id: 1, name: 60 },
        { id: 2, name: 80 },
        { id: 3, name: 100 },
      ],
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    HREmpSickLeaveService.Get(self.selectedrowid).then((res) => {
      self.HREmpSickLeave = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      self.departmentlist = res.data;
    });
  },

  methods: {
    ChangeCheckbox() {
      if (this.tabrow.ismaternityleave) {
        this.tabrow.calcperc = this.PercentList[2].name;
      } else if (this.tabrow.ismaternityleave == false) {
        this.tabrow.calcperc = "";
      }
    },
    Close() {
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
          givendate: "",
          documentseries: "",
          documentnumber: "",
          diagnosis: "",
          givenorganization: "",
          startdate: 0,
          enddate: 0,
          calcperc: 0,
          detailinfo: "",
          ismaternityleave: false,
          workexpyear: 0,
          workexpmonth: 0,
          workexpday: 0,
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    CloseEmployeeModal() {
      this.$bvModal.hide("PersonModal");
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    AddPerson(data) {
      this.CloseEmployeeModal();
      this.tabrow.personid = data.personid;
      this.tabrow.personname = data.personname;
      this.tabrow.employeeenrolmentid = data.employeeenrolmentid;
      this.gender = data.gender;
    },
    departmentchange() {
      var self = this;
      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.HREmpSickLeave.docdate,
        self.tabrow.departmentid
      ).then((res) => {
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
        solid: true,
      });
    },
    Add() {
      var self = this;
      if (
        (self.tabrow.workexpyear === "" ||
          self.tabrow.workexpyear === undefined ||
          self.tabrow.workexpyear === null ||
          self.tabrow.workexpyear === 0) &&
        (self.tabrow.workexpmonth === "" ||
          self.tabrow.workexpmonth === undefined ||
          self.tabrow.workexpmonth === null ||
          self.tabrow.workexpmonth === 0) &&
        (self.tabrow.workexpday === "" ||
          self.tabrow.workexpday === undefined ||
          self.tabrow.workexpday === null ||
          self.tabrow.workexpday === 0)
      ) {
        this.makeToast(
          this.$t("Ish staji ko'rsatilmagan"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow.workexpmonth > 12) {
        this.makeToast(
          this.$t("workexpmonthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow.workexpday > 31) {
        this.makeToast(
          this.$t("workexpdayNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // var arrs = self.tabrow.startdate.split(".");
      // var arre = self.tabrow.enddate.split(".");
      // var startdate = new Date(arrs[2], arrs[1] - 1, arrs[0]);
      // var enddate = new Date(arre[2], arre[1] - 1, arre[0]);
      // if (
      //   self.tabrow.startdate === "" ||
      //   self.tabrow.startdate === undefined ||
      //   self.tabrow.startdate === null ||
      //   self.tabrow.startdate === 0
      // ) {
      //   this.makeToast(
      //     this.$t("startdateNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.departmentid === "" ||
      //   self.tabrow.departmentid === undefined ||
      //   self.tabrow.departmentid === null ||
      //   self.tabrow.departmentid === 0
      // ) {
      //   this.makeToast(
      //     this.$t("departmentNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.personid === "" ||
      //   self.tabrow.personid === undefined ||
      //   self.tabrow.personid === null ||
      //   self.tabrow.personid === 0
      // ) {
      //   this.makeToast(this.$t("personNotCorrect"), this.$t("Error"), "danger");
      //   return false;
      // }
      // if (
      //   self.tabrow.enddate === "" ||
      //   self.tabrow.enddate === undefined ||
      //   self.tabrow.enddate === null ||
      //   self.tabrow.enddate === 0
      // ) {
      //   this.makeToast(
      //     this.$t("enddateNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.givendate === "" ||
      //   self.tabrow.givendate === undefined ||
      //   self.tabrow.givendate === null ||
      //   self.tabrow.givendate === 0
      // ) {
      //   this.makeToast(
      //     this.$t("givendateNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (enddate.getTime() < startdate.getTime()) {
      //   this.makeToast(
      //     this.$t("NeedHighfromEnddate"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.documentseries === "" ||
      //   self.tabrow.documentseries === undefined ||
      //   self.tabrow.documentseries === null ||
      //   self.tabrow.documentseries === 0
      // ) {
      //   this.makeToast(
      //     this.$t("documentseriesNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.documentnumber === "" ||
      //   self.tabrow.documentnumber === undefined ||
      //   self.tabrow.documentnumber === null ||
      //   self.tabrow.documentnumber === 0
      // ) {
      //   this.makeToast(
      //     this.$t("documentnumberNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.diagnosis === "" ||
      //   self.tabrow.diagnosis === undefined ||
      //   self.tabrow.diagnosis === null ||
      //   self.tabrow.diagnosis === 0
      // ) {
      //   this.makeToast(
      //     this.$t("diagnosisNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      // if (
      //   self.tabrow.givenorganization === "" ||
      //   self.tabrow.givenorganization === undefined ||
      //   self.tabrow.givenorganization === null ||
      //   self.tabrow.givenorganization === 0
      // ) {
      //   this.makeToast(
      //     this.$t("givenorganizationNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.calcperc === "" ||
      //   self.tabrow.calcperc === undefined ||
      //   self.tabrow.calcperc === null ||
      //   self.tabrow.calcperc === 0
      // ) {
      //   this.makeToast(
      //     this.$t("calcpercNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.tabrow.detailinfo === "" ||
      //   self.tabrow.detailinfo === undefined ||
      //   self.tabrow.detailinfo === null ||
      //   self.tabrow.detailinfo === 0
      // ) {
      //   this.makeToast(
      //     this.$t("detailinfoNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      self.tabrow.departmentname = self.departmentlist.filter(function (item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;
      if (self.editedIndex > -1) {
        Object.assign(
          self.HREmpSickLeave.Tables[self.editedIndex],
          self.tabrow
        );
      } else {
        self.HREmpSickLeave.Tables.push(self.tabrow);
      }
      // self.HREmpSickLeave.Tables.push(self.tabrow);

      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        givendate: "",
        documentseries: "",
        documentnumber: "",
        diagnosis: "",
        givenorganization: "",
        startdate: 0,
        enddate: 0,
        calcperc: 0,
        detailinfo: "",
        ismaternityleave: false,
        workexpyear: 0,
        workexpmonth: 0,
        workexpday: 0,
        Status: 1,
      };
      self.$bvModal.hide("AddModal");
    },
    // CheckWork() {
    //   alert("1")
    //   var self = this;
    //   if (self.tabrow.workexpmonth > 13) {
    //     this.makeToast(
    //       this.$t("Ish staji noto'g'ri kiritilgan"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   return true;
    // },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.HREmpSickLeave.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    DisabledDateForEnddate(date) {
      if (!!this.tabrow.startdate) {
        var arr = this.tabrow.startdate.split(".");
        return date < new Date(arr[2], arr[1] - 1, arr[0]);
      }
    },
    DisabledDateForStartdate(date) {
      if (!!this.tabrow.enddate) {
        var arr = this.tabrow.enddate.split(".");
        return date > new Date(arr[2], arr[1] - 1, arr[0]);
      }
    },
    check() {
      var self = this;
      if (
        self.HREmpSickLeave.docnumber === 0 ||
        self.HREmpSickLeave.docnumber === null ||
        self.HREmpSickLeave.docnumber === undefined ||
        self.HREmpSickLeave.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HREmpSickLeave.docdate === 0 ||
        self.HREmpSickLeave.docdate === null ||
        self.HREmpSickLeave.docdate === undefined ||
        self.HREmpSickLeave.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.HREmpSickLeave.detailinfo === null ||
        self.HREmpSickLeave.detailinfo === undefined ||
        self.HREmpSickLeave.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HREmpSickLeave.Tables.length === 0) {
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
      HREmpSickLeaveService.Update(self.HREmpSickLeave)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HREmpSickLeave" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style lang="scss">
.divider {
  display: flex;
  align-items: center;
  text-align: center;
}

.divider::after,
.divider::before {
  content: "";
  border: 1px solid #838996;
  flex: 1;
}

.divider:not(:empty)::before {
  margin-right: 0.25em;
}

.divider:not(:empty)::after {
  margin-left: 0.25em;
}
</style>





