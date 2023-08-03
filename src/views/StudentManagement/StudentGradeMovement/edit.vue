<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $route.query.isLeaveForSecondYear ? $t("LeavingStudentReStudyClass") : $t("StudentGradeMovement") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: $route.query.isLeaveForSecondYear ? 'LeavingStudentReStudyClass' : 'StudentGradeMovement',query : { Search : $route.query.Search } })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3">
                <ValidationProvider v-slot="v" name="docnumber" rules="required">
                  <label class="col-form-label">{{ $t("docnumber") }}</label>
                  <CInput
                    autocomplete="text"
                    v-model="StudentGradeMovement.docnumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3">
                <label class="col-form-label">{{ $t("docdate") }}</label>
                <date-picker
                  v-model="StudentGradeMovement.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                ></date-picker>
              </CCol>
              <CCol sm="6">
                <label class="col-form-label">{{ $t("DetailInfo") }}</label>
                <CInput autocomplete="text" v-model="StudentGradeMovement.detailinfo"></CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                <label class="col-form-label">{{ $t("fromschoolyear") }}</label>
                <v-select
                  :options="fromschoolyearlist"
                  v-model="StudentGradeMovement.fromschoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="loadstudentlist"
                ></v-select>
              </CCol>
              <CCol sm="3">
                <label class="col-form-label">{{ $t("fromorgschoolgrade") }}</label>
                <v-select
                  :options="fromorgschoolgradelist"
                  v-model="StudentGradeMovement.fromorgschoolgradeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="loadstudentlist"
                ></v-select>
              </CCol>

              <CCol sm="3">
                <label class="col-form-label">{{ $t("toschoolyear") }}</label>
                <v-select
                  :options="toschoolyearlist"
                  v-model="StudentGradeMovement.toschoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol sm="3">
                <label class="col-form-label">{{ $t("toorgschoolgrade") }}</label>
                <v-select
                  :options="toorgschoolgradelist"
                  v-model="StudentGradeMovement.toorgschoolgradeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow class="mb-3" v-if="false">
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
        <CRow>
          <CCol>
            <b-table
              :fields="StudentGradeMovementTables"
              :items="StudentGradeMovement.Tables"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-if="StudentGradeMovement.CanSave" v-slot:thead-top>
                <b-tr>
                  <b-th style="width : 30%">
                      <CInput  class="mb-0 mr-2" style="width:100%" disabled v-model="tabrow.personname">
                        <template #append>
                            <b-button size="sm" variant="primary" @click="OpenStudentModal" :disabled="!StudentGradeMovement.fromorgschoolgradeid || !StudentGradeMovement.fromschoolyearid">
                              <b-icon icon="three-dots"></b-icon>
                            </b-button>
                        </template>
                      </CInput>
                  </b-th>
                  <b-th style="width:15%">
                    <p>{{ tabrow.fromstudentadmissionid }}</p>
                  </b-th>
                  <b-th style="width:15%">
                    <p>{{ tabrow.tostudentadmissionid }}</p>
                  </b-th>
                  <b-th style="width:15%">
                    <CInput class="mb-0" autocomplete="text" v-model="tabrow.estatementnumber"></CInput>
                  </b-th>
                  <b-th style="width:12%">
                    <date-picker
                      v-model="tabrow.estatementdate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('estatementdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </b-th>

                  <b-th style="width:20%">
                    <CButton size="sm" color="primary" variant="outline" @click="AddRow">
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(personname)="{ item }">
                <p class="m-0 p-0">{{ item.personname }}</p>
              </template>
              <template v-slot:cell(fromstudentadmissionid)="{item}">
                <p class="m-0 p-0">{{item.fromstudentadmissionid}}</p>
              </template>
              <template v-slot:cell(tostudentadmissionid)="{item}">
                <p class="m-0 p-0">{{item.tostudentadmissionid}}</p>
              </template>
              <template v-slot:cell(estatementnumber)="{item}">
                <p class="m-0 p-0" v-if="item.Status == 0">{{item.estatementnumber}}</p>
                <CInput
                  v-if="item.Status == 1 || item.Status == 2"
                  autocomplete="text"
                  class="mb-0"
                  v-model="item.estatementnumber"
                ></CInput>
              </template>
              <template v-slot:cell(estatementdate)="{item}">
                <p class="m-0 p-0" v-if="item.Status == 0">{{item.estatementdate}}</p>
                <date-picker
                  v-model="item.estatementdate"
                  v-if="item.Status == 1 || item.Status == 2"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('estatementdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </template>

              <template v-slot:cell(actions)="{ item }">
                <CButtonGroup
                  v-if="StudentGradeMovement.statusid!==2"
                  class="mx-auto d-block text-center"
                  size="sm"
                >
                  <CButton variant="outline" color="primary" @click="EditRow(item)">
                    <b-icon icon="pencil"></b-icon>
                  </CButton>
                  <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </CButtonGroup>
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
                @click="$router.push({ name: $route.query.isLeaveForSecondYear ? 'LeavingStudentReStudyClass' : 'StudentGradeMovement',query : { Search : $route.query.Search } })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="StudentGradeMovement.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal id="StudentModal" no-close-on-backdrop size="xl" :title="$t('Student')" hide-footer modal-class="custom-size-modal">
         
          <student-report-list :orgschoolgrade="StudentGradeMovement.fromorgschoolgradeid" :schoolyear="StudentGradeMovement.fromschoolyearid" :ondate="StudentGradeMovement.docdate" @SelectedItem="SelectedItem(studentvalue)" @DblClick="AddStudentData"></student-report-list>
          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseStudentModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddStudentData(studentvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import StudentGradeMovementService from "@/services/StudentGradeMovement.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import StudentManageService from "@/services/StudentManage.service";
import StudentReportList from '@/components/StudentReportList'
export default {
  components : {StudentReportList},
  data() {
    return {
      SaveLoading: false,
      StudentGradeMovement: {},
      fromschoolyearlist: [],
      toschoolyearlist: [],
      fromorgschoolgradelist: [],
      toorgschoolgradelist: [],
      personlist: [],

      StudentGradeMovementTables: [
        { key: "personname", label: this.$t("Student") },
        {
          key: "fromstudentadmissionid",
          label: this.$t("fromstudentadmissionid")
        },
        { key: "tostudentadmissionid", label: this.$t("tostudentadmissionid") },
        { key: "estatementnumber", label: this.$t("estatementnumber") },
        { key: "estatementdate", label: this.$t("estatementdate") },
        { key: "actions", label: this.$t("actions") }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        fromstudentadmissionid: 0,
        tostudentadmissionid: 0,
        personid: 0,
        personname: '',
        estatementnumber: '',
        estatementdate: '',
        Status: 1
      },
      toastCount: 0,
      allSignupErrors: {},
      studentvalue : {}
    };
  },
  created() {
    this.loadhelpers();
    this.loaddata();
  },
  methods: {
    OpenStudentModal(){
      this.$bvModal.show('StudentModal')
    },
    CloseStudentModal(){
      this.$bvModal.hide('StudentModal')
    },
    SelectedItem(data){
      this.studentvalue = data
    },
    AddStudentData(data){
      this.tabrow.personid = data.personid
      this.tabrow.personname = data.personname
      this.tabrow.fromstudentadmissionid = data.studentadmissionid
      this.CloseStudentModal()
      console.log(data)
    },
    loadhelpers() {
      var self = this;
      OrgSchoolGradeService.GetAll().then(res => {
        self.fromorgschoolgradelist = res.data;
      });
      OrgSchoolGradeService.GetAll().then(res => {
        self.toorgschoolgradelist = res.data;
      });
      SchoolYearService.GetAll().then(res => {
        self.fromschoolyearlist = res.data;
      });
      SchoolYearService.GetAll().then(res => {
        self.toschoolyearlist = res.data;
      });
    },
    loaddata() {
      var self = this;
      StudentGradeMovementService.Get(self.$route.params.id, self.$route.query.isLeaveForSecondYear).then(res => {
        self.StudentGradeMovement = res.data;
        self.loadstudentlist();
      });
    },
    check() {
      var self = this;
      if (
        self.StudentGradeMovement.docnumber === null ||
        self.StudentGradeMovement.docnumber === undefined ||
        self.StudentGradeMovement.docnumber === 0 ||
        self.StudentGradeMovement.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.docdate === null ||
        self.StudentGradeMovement.docdate === undefined ||
        self.StudentGradeMovement.docdate === 0 ||
        self.StudentGradeMovement.docdate === ""
      ) {
        self.makeToast(
          self.$t("docdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.fromschoolyearid === null ||
        self.StudentGradeMovement.fromschoolyearid === undefined ||
        self.StudentGradeMovement.fromschoolyearid === 0 ||
        self.StudentGradeMovement.fromschoolyearid === ""
      ) {
        self.makeToast(
          self.$t("fromschoolyearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.toschoolyearid === null ||
        self.StudentGradeMovement.toschoolyearid === undefined ||
        self.StudentGradeMovement.toschoolyearid === 0 ||
        self.StudentGradeMovement.toschoolyearid === ""
      ) {
        self.makeToast(
          self.$t("toschoolyearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.fromorgschoolgradeid === null ||
        self.StudentGradeMovement.fromorgschoolgradeid === undefined ||
        self.StudentGradeMovement.fromorgschoolgradeid === 0 ||
        self.StudentGradeMovement.fromorgschoolgradeid === ""
      ) {
        self.makeToast(
          self.$t("fromorgschoolgradeNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.toorgschoolgradeid === null ||
        self.StudentGradeMovement.toorgschoolgradeid === undefined ||
        self.StudentGradeMovement.toorgschoolgradeid === 0 ||
        self.StudentGradeMovement.toorgschoolgradeid === ""
      ) {
        self.makeToast(
          self.$t("toorgschoolgradeNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var tableitemscount = 0;
      tableitemscount = self.StudentGradeMovement.Tables.filter(
        item => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      self.StudentGradeMovement.isleaveforsecondyear = self.$route.query.isLeaveForSecondYear
      StudentGradeMovementService.Update(self.StudentGradeMovement)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: self.$route.query.isLeaveForSecondYear ? "LeavingStudentReStudyClass" : "StudentGradeMovement",query : { Search : this.$route.query.Search }  });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    fillTable() {
      var self = this;
       self.StudentGradeMovement.Tables.forEach(function(item) {        
        item.Status = 3;
      });     
      self.personlist.forEach(function(item) {        
        self.tabrow = {
          id: 0,
          ownerid: 0,
          fromstudentadmissionid: item.studentadmissionid,
          tostudentadmissionid: 0,
          personid: item.personid,
          personname: item.name,
          estatementnumber:'',
          estatementdate: '',
          Status: 1
        }; 
        self.StudentGradeMovement.Tables.push(self.tabrow);
        self.tabrow = {
          id: 0,
          ownerid: 0,
          fromstudentadmissionid: 0,
          tostudentadmissionid: 0,
          personid: 0,
          personname: '',
          estatementnumber: '',
          estatementdate: '',
          Status: 1
        };
      });     
    },  
    clearTable() {
      var self = this;  
      self.StudentGradeMovement.Tables.forEach(function(item) {
        item.Status = 3;
      });     
    },  
    AddRow() {
      var self = this;
      if (
        self.tabrow.personid === null ||
        self.tabrow.personid === undefined ||
        self.tabrow.personid === 0
      ) {
        self.makeToast(self.$t("StudentNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow.estatementnumber === null ||
        self.tabrow.estatementnumber === undefined ||
        self.tabrow.estatementnumber === 0 ||
        self.tabrow.estatementnumber === ""
      ) {
        self.makeToast(
          self.$t("estatementnumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.estatementdate === null ||
        self.tabrow.estatementdate === undefined ||
        self.tabrow.estatementdate === 0 ||
        self.tabrow.estatementdate === ""
      ) {
        self.makeToast(
          self.$t("estatementdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      self.StudentGradeMovement.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        fromstudentadmissionid: 0,
        tostudentadmissionid: 0,
        personid: 0,
        personname: '',
        estatementnumber: '',
        estatementdate: '',
        Status: 1
      };
    },
    EditRow(item) {
      item.Status = 2;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    loadstudentlist() {
      var self = this;
      if (self.statusid === 2) {
        return;
      }
      if (
        self.StudentGradeMovement.fromschoolyearid > 0 &&
        self.StudentGradeMovement.fromorgschoolgradeid > 0
      )
        StudentManageService.GetAllInOrgSchoolGrade(
          "",
          "",
          self.StudentGradeMovement.docdate,
          self.StudentGradeMovement.fromschoolyearid,
          self.StudentGradeMovement.fromorgschoolgradeid
        ).then(res => {
          self.personlist = res.data;
        });
    },
    rowpersonchange(row) {
      var self = this;

      row.personname = self.personlist.filter(function(item) {
        if (item.personid === row.personid) return item;
      })[0].name;
      // row.fromstudentadmissionid = self.personlist.filter(function(item) {
      //   if (item.personid === row.personid) return item;
      // })[0].studentadmissionid;
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    }
  }
};
</script>

<style></style>
