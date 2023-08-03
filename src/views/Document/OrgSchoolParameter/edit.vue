<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("OrgSchoolParameter") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'OrgSchoolParameter' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docnumber" rules="required">
                  <label>{{ $t("docnumber") }}</label>
                  <CInput
                    autocomplete="text"
                    
                    v-model="OrgSchoolParameter.docnumber"
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
              <CCol sm="2">
                <label>{{ $t("docdate") }}</label>
                <date-picker
                  v-model="OrgSchoolParameter.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                  disabled
                ></date-picker>
              </CCol>
              <CCol sm="2">
                <label>{{ $t("schoolyear") }}</label>
                <v-select
                  :options="schoolyearlist"
                  v-model="OrgSchoolParameter.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="schoolyearchange"
                  disabled
                ></v-select>
              </CCol>
              <CCol sm="6">
                <label>{{ $t("DetailInfo") }}</label>
                <CInput autocomplete="text" v-model="OrgSchoolParameter.detailinfo"></CInput>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow v-if="OrgSchoolParameter.CanSave">
          <CCol class="text-right">
            <CButton class="mr-3 mb-2" size="sm" color="primary" @click="OpenAddModal">
              <b-icon icon="plus"> </b-icon>
              {{$t('Add')}}
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <b-table
              :fields="OrgSchoolParameterTables"
              :items="OrgSchoolParameter.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(orgschoolgradename)="{ item }">
                <p>{{ item.orgschoolgradename }}</p>
              </template>
              <template v-slot:cell(roomname)="{ item }">
                <p>{{ item.roomname }}</p>
              </template>
              <template v-slot:cell(schoolingshiftname)="{ item }">
                <p>{{ item.schoolingshiftname }}</p>
              </template>
              <template v-slot:cell(curriculumtypename)="{ item }">
                <p>{{ item.curriculumtypename }}</p>
              </template>
              <!-- <template v-slot:cell(schoolsubjectname)="{ item }">
                <p>{{ item.schoolsubjectname }}</p>
              </template> -->
              <template v-slot:cell(educationlanguagename)="{ item }">
                <p>{{ item.educationlanguagename }}</p>
              </template>
              <template v-slot:cell(isspecialized)="{item}">
                <p>{{item.isspecialized ? $t('yes') : $t('no')}}</p>
              </template>
              <template #cell(isinbranch)="{item}">
                <p>{{item.isinbranch ? $t('yes') : $t('no')}}</p>
              </template>
              <template v-slot:cell(schoolsubjectname)="{item}">
                <p>{{item.isspecialized ? schoolsubject(item) : '-'}}</p>
              </template>
              <template v-if="OrgSchoolParameter.CanSave" v-slot:cell(actions)="{ item }">
                <CButtonGroup class="mx-auto d-block text-center" size="sm">
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
        <b-modal size="lg" id="AddModal">
          <template v-slot:modal-title>{{$t('OrgSchoolParameter')}}</template>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('orgschoolgrade')}}</label>
                <p v-if="tabrow.Status === 2" style="color:blue">{{ tabrow.orgschoolgradename }}</p>
                <v-select
                  v-if="tabrow.Status === 1"
                  :options="orgschoolgradelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.orgschoolgradeid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('Room')}}</label>
                <p v-if="tabrow.Status === 2" style="color:blue">{{ tabrow.roomname }}</p>
                <v-select
                  v-if="tabrow.Status === 1"
                  :options="roomlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.roomid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('schoolingshiftname')}}</label>
                <p v-if="tabrow.Status === 2" style="color:blue;">{{ tabrow.schoolingshiftname }}</p>
                <v-select
                  v-if="tabrow.Status === 1"
                  :options="schoolingshiftlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.schoolingshiftid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('educationlanguage')}}</label>
                <v-select
                  :options="educationlanguagelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.educationlanguageid"
                  class="col-sm-9"
                  @input="changeforcurriculumtype"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('schoolyear')}}</label>
                <v-select
                  :options="schoolyearlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.schoolyearid"
                  disabled
                  class="col-sm-9"
                  @input="changeforcurriculumtype"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{$t('isspecialized')}}</label>
                <b-form-checkbox class="mb-0 ml-2" size="lg" @input="changeforcurriculumtype" v-model="tabrow.isspecialized"></b-form-checkbox>
              </div>
            </CCol>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('isvariable')}}</label>
                <b-form-checkbox class="mb-0 ml-2" size="lg" @input="changeforcurriculumtype" v-model="tabrow.isvariable"></b-form-checkbox>
              </div>
            </CCol>
          </CRow>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('isinbranch')}}</label>
                <div class="col-sm-9">
                  <b-form-checkbox class="mb-0 ml-2" size="lg"  v-model="tabrow.isinbranch"></b-form-checkbox>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="tabrow.isinbranch">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('OrganizationBranch')}}</label>
                <div class="col-sm-9">
                  <v-select
                    :options="OrganizationBranchList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="changeorganizationbranch"
                    v-model="tabrow.organizationbranchid"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('curriculumtypename')}}</label>
                <v-select
                  :options="curriculumtypelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.curriculumtypeid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow v-if="tabrow.isspecialized">
            <CCol>
              <b-table
                :fields="SubjectTables"
                :items="tabrow.SubjectTables"
                class="bg-color-table text-center tdpadding mx-3"
                style="vertical-align:middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass1"
              >
                <template v-slot:thead-top>
                  <b-tr>
                    <b-th style="width:70%">
                      <v-select
                        :options="schoolsubjectlist"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="subjectrow.schoolsubjectid"
                      ></v-select>
                    </b-th>
                    <b-th style="width:30%">
                      <CButton size="sm" color="primary" @click="AddSubject">
                        <b-icon icon="plus"> </b-icon>
                        {{$t('Add')}}
                      </CButton>
                    </b-th>
                  </b-tr>
                </template>
                <template v-slot:cell(actions)="{ item }">
                  <CButton class="mb-2 mt-n1" size="sm" color="danger" @click="DeleteSubject(item)">
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </template>
              </b-table>
            </CCol>
          </CRow>
          <template v-slot:modal-footer>
            <div class="d-block text-right">
              <CButton @click="CloseWindow" color="danger" class="mr-2">
                <b-icon icon="x"></b-icon>
                {{$t('NotAccept')}}
              </CButton>
              <CButton @click="AddRow" color="success">
                <b-icon icon="check2"></b-icon>
                {{$t('Accept')}}
              </CButton>
            </div>
          </template>
        </b-modal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'OrgSchoolParameter' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="OrgSchoolParameter.CanSave"
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
    </CCol>
  </CRow>
</template>

<script>
import EducationLanguageService from "@/services/EducationLanguage.service";
import CurriculumTypeService from "@/services/CurriculumType.service";
import RoomService from "@/services/Room.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolParameterService from "@/services/OrgSchoolParameter.service";
import SchoolingShiftService from "@/services/SchoolingShift.service";
import OrganizationBranchService from '@/services/organizationbranch.service'
export default {
  data() {
    return {
      SaveLoading: false,
      OrgSchoolParameter: {},
      selectedrowid: 0,

      schoolyearlist: [],
      schoolsubjectlist: [],
      orgschoolgradelist: [],
      // schoolsubject : '',
      roomlist: [],
      schoolingshiftlist: [],
      curriculumtypelist: [],
      educationlanguagelist: [],

      OrgSchoolParameterTables: [
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgrade")
        },
        {
          key: "roomname",
          label: this.$t("Room")
        },
        {
          key: "schoolingshiftname",
          label: this.$t("SchoolingShift")
        },
        {
          key: "curriculumtypename",
          label: this.$t("curriculumtypename")
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguage")
        },
        {
          key : 'isinbranch',
          label : this.$t('isinbranch')
        },
        {
          key : 'organizationbranchname',
          label : this.$t('OrganizationBranch')
        },
        { key: "isspecialized", label: this.$t("isspecialized") },
        {
          key: "schoolsubjectname",
          label: this.$t("SchoolSubjectName")
        },

        {
          key: "actions",
          label: this.$t("actions")
        }
      ],
      SubjectTables: [
        {
          key: "schoolsubjectname",
          label: this.$t("SchoolSubjectName")
        },
        {
          key: "actions",
          label: this.$t("actions")
        }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        roomid: 0,
        roomname: "",
        schoolingshiftid: 0,
        schoolingshiftname: "",
        curriculumtypeid: 0,
        curriculumtypename: "",
        SubjectTables: [],
        educationlanguageid: 0,
        educationlanguagename: "",
        isspecialized: false,
        isspecializedname: "",
        isinbranch : false,
        organizationbranchid : 0,
        schoolyearid : 0,
        Status: 1
      },
      toastCount: 0,
      allSignupErrors: {},
      subjectrow: {
        schoolsubjectid: 0,
        schoolsubjectname: "",
        Status: 0
      },
      OrganizationBranchList : []
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    OrgSchoolGradeService.GetAll().then(res => {
      self.orgschoolgradelist = res.data;
    });
    RoomService.GetAll().then(res => {
      self.roomlist = res.data;
    });
    SchoolingShiftService.GetAll().then(res => {
      self.schoolingshiftlist = res.data;
    });
   
    SchoolSubjectService.GetAll().then(res => {
      self.schoolsubjectlist = res.data;
    });
    EducationLanguageService.GetAll().then(res => {
      self.educationlanguagelist = res.data;
    });
    SchoolYearService.GetAll().then(res => {
      self.schoolyearlist = res.data;
    });
    OrgSchoolParameterService.Get(self.selectedrowid).then(res => {
      self.OrgSchoolParameter = res.data;
      (res.data);
    });
    OrganizationBranchService.GetAll().then(res => {
      self.OrganizationBranchList = res.data
    })
  },
  methods: {
    OpenAddModal() {
      var self = this;
      self.tabrow = {
        id: 0,
        ownerid: 0,
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        roomid: 0,
        roomname: "",
        schoolingshiftid: 0,
        schoolingshiftname: "",
        curriculumtypeid: 0,
        curriculumtypename: "",
        SubjectTables: [],
        schoolsubjectname: "",
        educationlanguageid: 0,
        educationlanguagename: "",
        isvariable: false,
        isspecialized: false,
        isinbranch : false,
        organizationbranchid : 0,
        isspecializedname: "",
        schoolyearid : this.OrgSchoolParameter.schoolyearid,
        schoolyearname : this.OrgSchoolParameter.schoolyearname,
        Status: 1
        
      };
      console.log(self.tabrow.schoolyearid)
      this.$bvModal.show("AddModal");
    },
    CloseWindow() {
      this.$bvModal.hide("AddModal");
    },
    check() {
      var self = this;
      if (
        self.OrgSchoolParameter.docnumber === null ||
        self.OrgSchoolParameter.docnumber === undefined ||
        self.OrgSchoolParameter.docnumber === 0 ||
        self.OrgSchoolParameter.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolParameter.docdate === null ||
        self.OrgSchoolParameter.docdate === undefined ||
        self.OrgSchoolParameter.docdate === 0
      ) {
        self.makeToast(
          self.$t("docdateNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.OrgSchoolParameter.schoolyearid === null ||
        self.OrgSchoolParameter.schoolyearid === undefined ||
        self.OrgSchoolParameter.schoolyearid === 0
      ) {
        self.makeToast(
          self.$t("SchoolYearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.OrgSchoolParameter.detailinfo === null ||
      //   self.OrgSchoolParameter.detailinfo === undefined ||
      //   self.OrgSchoolParameter.detailinfo === 0
      // ) {
      //   self.makeToast(
      //     self.$t("detailinfoNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      var tableitemscount = 0;
      tableitemscount = self.OrgSchoolParameter.Tables.filter(
        item => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    AddSubject() {
      if (
        this.tabrow.SubjectTables.filter(
          item => item.schoolsubjectid == this.subjectrow.schoolsubjectid
        ).length > 0
      ) {
        this.makeToast(this.$t("duplicate"), this.$t("message"), "danger");
      } else {
        this.tabrow.SubjectTables.push({
          schoolsubjectid: this.subjectrow.schoolsubjectid,
          schoolsubjectname: this.schoolsubjectlist.filter(
            item => item.id === this.subjectrow.schoolsubjectid
          )[0].name,
          Status: 1
        });
      }

      this.subjectrow = {};
    },
    DeleteSubject(item) {
      item.Status = 3;
    },
    changeforcurriculumtype() {
      var self = this;
       CurriculumTypeService.GetAllWithParams(self.tabrow.educationlanguageid,self.tabrow.isspecialized,self.tabrow.isvariable,self.tabrow.schoolyearid).then(res => {
          self.curriculumtypelist = res.data;
        });
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      OrgSchoolParameterService.Update(self.OrgSchoolParameter)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "OrgSchoolParameter"
          });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },

    AddRow(data) {
      var self = this;
      self.$bvModal.show("AddModal");
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
        self.tabrow.roomid === "" ||
        self.tabrow.roomid === undefined ||
        self.tabrow.roomid === null ||
        self.tabrow.roomid === 0
      ) {
        self.makeToast(self.$t("roomNotCorrect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow.schoolingshiftid === "" ||
        self.tabrow.schoolingshiftid === undefined ||
        self.tabrow.schoolingshiftid === null ||
        self.tabrow.schoolingshiftid === 0
      ) {
        self.makeToast(
          self.$t("schoolingshiftNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.curriculumtypeid === "" ||
        self.tabrow.curriculumtypeid === undefined ||
        self.tabrow.curriculumtypeid === null ||
        self.tabrow.curriculumtypeid === 0
      ) {
        self.makeToast(
          self.$t("curriculumtypeNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.educationlanguageid === "" ||
        self.tabrow.educationlanguageid === undefined ||
        self.tabrow.educationlanguageid === null ||
        self.tabrow.educationlanguageid === 0
      ) {
        self.makeToast(
          self.$t("educationlanguageNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if(this.tabrow.isinbranch){
        if (
          self.tabrow.organizationbranchid === "" ||
          self.tabrow.organizationbranchid === undefined ||
          self.tabrow.organizationbranchid === null ||
          self.tabrow.organizationbranchid === 0
        ) {
          self.makeToast(
            self.$t("organizationbranchNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      self.tabrow.orgschoolgradename = self.orgschoolgradelist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.orgschoolgradeid) return item;
      })[0].name;
      self.tabrow.roomname = self.roomlist.filter(function(item) {
        if (item.id === self.tabrow.roomid) return item;
      })[0].name;
      self.tabrow.schoolingshiftname = self.schoolingshiftlist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.schoolingshiftid) return item;
      })[0].name;
      self.tabrow.curriculumtypename = self.curriculumtypelist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.curriculumtypeid) return item;
      })[0].name;
      self.tabrow.educationlanguagename = self.educationlanguagelist.filter(
        function(item) {
          if (item.id === self.tabrow.educationlanguageid) return item;
        }
      )[0].name;
       var duplicateschoolgrade =  self.OrgSchoolParameter.Tables.map(item => item.orgschoolgradeid)
        if(duplicateschoolgrade.includes(self.tabrow.orgschoolgradeid)){
          self.makeToast(self.$t('dublicateschoolgrade'),self.$t('error'),'danger')
          return false
        }
      if (self.tabrow.isspecialized) {
        var hascount = false;
        self.tabrow.SubjectTables.forEach(function(item) {
          if (item.Status !== 3) {
            hascount = true;
          }
        });
        if (!hascount) {
          self.makeToast(
            self.$t("SubjectTablesNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      } else {
        self.tabrow.SubjectTables = [];
      }

      if (self.tabrow.id === 0) {
        var addnewrow = true;
        self.OrgSchoolParameter.Tables.forEach(function(item) {
          if (
            item.orgschoolgradeid === self.tabrow.orgschoolgradeid &&
            item.roomid === self.tabrow.roomid &&
            item.id === 0
          ) {
            item.id = self.tabrow.id;
            item.ownerid = self.tabrow.ownerid;
            item.orgschoolgradeid = self.tabrow.orgschoolgradeid;
            item.orgschoolgradename = self.tabrow.orgschoolgradename;
            item.roomid = self.tabrow.roomid;
            item.roomname = self.tabrow.roomname;
            item.schoolingshiftid = self.tabrow.schoolingshiftid;
            item.schoolingshiftname = self.tabrow.schoolingshiftname;
            item.curriculumtypeid = self.tabrow.curriculumtypeid;
            item.curriculumtypename = self.tabrow.curriculumtypename;
            item.SubjectTables = self.tabrow.SubjectTables;
            item.schoolsubjectname = self.tabrow.schoolsubjectname;
            item.educationlanguageid = self.tabrow.educationlanguageid;
            item.educationlanguagename = self.tabrow.educationlanguagename;
            item.isvariable = self.tabrow.isvariable;
            item.isspecialized = self.tabrow.isspecialized;
            item.isspecializedname = self.tabrow.isspecializednames;
            item.isinbranch = self.tabrow.isinbranch
            item.organizationbranchid = self.tabrow.organizationbranchid
            item.Status = 1;

            addnewrow = false;
          }
        });
        if (addnewrow) {
          var dublicate = false;
          self.OrgSchoolParameter.Tables.forEach(function(item) {
            if (
              item.Status !== 3 &&
              item.orgschoolgradeid === self.tabrow.orgschoolgradeid
            ) {
              dublicate = true;
            }
          });
          if (dublicate) {
            self.makeToast(
              self.$t("Dublicate") + ": " + self.tabrow.orgschoolgradename,
              self.$t("Error"),
              "danger"
            );
            dublicate = false;
            return false;
          }
          self.OrgSchoolParameter.Tables.forEach(function(item) {
            if (
              item.Status !== 3 &&
              item.roomid === self.tabrow.roomid &&
              item.schoolingshiftid === self.tabrow.schoolingshiftid
            ) {
              dublicate = true;
            }
          });
          if (dublicate) {
            self.makeToast(
              self.$t("Dublicate") +
                ": " +
                self.tabrow.roomname +
                "-" +
                self.tabrow.schoolingshiftname,
              self.$t("Error"),
              "danger"
            );
            dublicate = false;
            return false;
          }
          self.OrgSchoolParameter.Tables.push(self.tabrow);
          self.tabrow = {
            id: 0,
            ownerid: 0,
            orgschoolgradeid: 0,
            orgschoolgradename: "",
            roomid: 0,
            roomname: "",
            schoolingshiftid: 0,
            schoolingshiftname: "",
            curriculumtypeid: 0,
            curriculumtypename: "",
            SubjectTables: [],
            schoolsubjectname: "",
            educationlanguageid: 0,
            educationlanguagename: "",
            isvariable: false,
            isspecialized: false,
            isspecializedname: "",
            isinbranch : false,
            organizationbranchid : 0,
            schoolyearid : 0,
            Status: 1
          };
        }
      } else {
        self.OrgSchoolParameter.Tables.forEach(function(item) {
          if (item.id === self.tabrow.id) {
            item.id = self.tabrow.id;
            item.ownerid = self.tabrow.ownerid;
            item.orgschoolgradeid = self.tabrow.orgschoolgradeid;
            item.orgschoolgradename = self.tabrow.orgschoolgradename;
            item.roomid = self.tabrow.roomid;
            item.roomname = self.tabrow.roomname;
            item.schoolingshiftid = self.tabrow.schoolingshiftid;
            item.schoolingshiftname = self.tabrow.schoolingshiftname;
            item.curriculumtypeid = self.tabrow.curriculumtypeid;
            item.curriculumtypename = self.tabrow.curriculumtypename;
            item.SubjectTables = self.tabrow.SubjectTables;
            item.schoolsubjectname = self.tabrow.schoolsubjectname;
            item.educationlanguageid = self.tabrow.educationlanguageid;
            item.educationlanguagename = self.tabrow.educationlanguagename;
            item.isvariable = self.tabrow.isvariable;
            item.isspecialized = self.tabrow.isspecialized;
            item.isspecializedname = self.tabrow.isspecializednames;
            item.isinbranch = self.tabrow.isinbranch
            item.organizationbranchid = self.tabrow.organizationbranchid,
            item.schoolyearid = self.tabrow.schoolyearid,
            item.Status = 2;
          }
        });
        self.tabrow = {
          id: 0,
          ownerid: 0,
          orgschoolgradeid: 0,
          orgschoolgradename: "",
          roomid: 0,
          roomname: "",
          schoolingshiftid: 0,
          schoolingshiftname: "",
          curriculumtypeid: 0,
          curriculumtypename: "",
          SubjectTables: [],
          schoolsubjectname: "",
          educationlanguageid: 0,
          educationlanguagename: "",
          isinbranch : false,
          organizationbranchid : 0,
          isvariable: false,
          isspecialized: false,
          isspecializedname: "",
          schoolyearid : 0,
          Status: 1
        };
      }
      self.$bvModal.hide("AddModal");
    },
    EditRow(item) {
      this.$bvModal.show("AddModal");
      this.tabrow = {
        id: item.id,
        ownerid: item.ownerid,
        orgschoolgradeid: item.orgschoolgradeid,
        orgschoolgradename: item.orgschoolgradename,
        roomid: item.roomid,
        roomname: item.roomname,
        schoolingshiftid: item.schoolingshiftid,
        schoolingshiftname: item.schoolingshiftname,
        curriculumtypeid: item.curriculumtypeid,
        curriculumtypename: item.curriculumtypename,
        SubjectTables: item.SubjectTables,
        educationlanguageid: item.educationlanguageid,
        educationlanguagename: item.educationlanguagename,
        isvariable: item.isvariable,
        isspecialized: item.isspecialized,
        isspecializedname: item.isspecializedname,
        isinbranch : item.isinbranch,
        organizationbranchid : item.organizationbranchid,
        schoolyearid : item.schoolyearid,
        Status: 2
      };
      this.changeforcurriculumtype();
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    rowClass1(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    schoolyearchange() {
      var self = this;
      self.OrgSchoolParameter.schoolyearname = self.schoolyearlist.filter(
        function(item) {
          if (item.id === self.OrgSchoolParameter.schoolyearid) return item;
        }
      )[0].name;
      (self.OrgSchoolParameter.schoolyearname);
    },
    changeorganizationbranch(){
      var self = this;
      self.tabrow.organizationbranchname = self.OrganizationBranchList.filter(
        function(item) {
          if (item.id === self.tabrow.organizationbranchid) return item;
        }
      )[0].name;
      (self.tabrow.organizationbranchname);
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
    },
    schoolsubject(item) {
      var vm = this;
      let k = [];
      item.SubjectTables.forEach(function(item) {
        if (item.Status != 3) {
          k.push(item.schoolsubjectname);
        }
      });
      return k.join(",");
    }
  },
  watch: {}
};
</script>

<style></style>