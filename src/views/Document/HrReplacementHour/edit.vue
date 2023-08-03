<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HrReplacementHour')}}</h4>
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
                    v-model="HrReplacementHour.docnumber"
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
                        v-model="HrReplacementHour.docdate"
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
                <ValidationProvider v-slot="item" name="organizationaccountid" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="#"
                      class="col-form-label col-sm-3"
                    >{{$t('OrganizationAccount')}}</label>
                    <div class="col-sm-9">
                      <v-select
                        :options="OrganizationAccountList"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="code"
                        v-model="HrReplacementHour.organizationaccountid"
                        class="mb-2 w-100"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ item.errors[0] }}</div>
                      </template>
                    </v-select>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="item" name="schoolyear" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="#"
                      class="col-form-label col-sm-3"
                    >{{$t('schoolyear')}}</label>
                    <div class="col-sm-9">
                      <v-select
                        :options="SchoolYearList"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="HrReplacementHour.schoolyearid"
                        class="mb-2 w-100"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ item.errors[0] }}</div>
                      </template>
                    </v-select>
                    </div>
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
                    v-model="HrReplacementHour.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow class="mb-3">
          <CCol>
            <b-modal id="AddModal" size="lg" no-close-on-backdrop>
              <template v-slot:modal-title>{{$t('PersonTable')}}</template>
              <b-row>
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{$t('inpersonname')}}</label>
                    <div class="d-flex col-sm-9">
                      <CInput  class="mb-0 mr-2" style="width:100%" disabled v-model="Tables.inpersonname"></CInput>
                      <b-button size="sm" variant="primary" @click="OpenEmployeeModal2">
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{$t('qualificationcategory')}}</label>
                    <!-- <v-select
                      :options="qualificationcategorylist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.qualificationcategoryid"
                      class="col-sm-9"
                      disabled
                    ></v-select> -->
                    <div class="col-sm-9 d-flex align-items-center">
                      <a style="color:blue" > {{ Tables.qualificationcategoryname || "-" }} </a>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{$t('outpersonname')}}</label>
                    <div class="d-flex col-sm-9">
                      <CInput  class="mb-0 mr-2" style="width:100%" disabled v-model="Tables.outpersonname"></CInput>
                      <b-button size="sm" variant="primary" @click="OpenEmployeeModal1">
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </div>
                  </div>
                </b-col>
              </b-row>
              
              
              
              <b-row> 
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-6">{{$t('schoolsubject')}}</label>
                    <!-- <v-select
                      :options="SchoolSubjectList"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.schoolsubjectid"
                      @input="GetQualification"
                      class="col-sm-9"
                    ></v-select> -->
                    <div class="col-sm-6 d-flex align-items-center">
                      <a style="color:blue" class="ml-1"> {{ Tables.schoolsubjectname || '-'}} </a>
                    </div>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">{{$t('orgschoolgrade')}}</label>
                    <!-- <v-select
                      :options="OrgSchoolGradeList"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.orgschoolgradeid"
                      class="col-sm-9"
                    ></v-select> -->
                    <div class="col-sm-8 d-flex align-items-center">
                      <a style="color:blue"> {{ Tables.orgschoolgradename || "-" }} </a>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-6">{{$t('hours')}}</label>
                    <!-- <v-select
                      :options="OrgSchoolGradeList"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.orgschoolgradeid"
                      class="col-sm-9"
                    ></v-select> -->
                    <div class="col-sm-6 d-flex align-items-center">
                      <custom-number-input
                        v-model="Tables.hours"
                        class="mb-3 ml-1"
                      ></custom-number-input>
                    </div>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">{{$t('studentcount')}}</label>
                    <!-- <v-select
                      :options="OrgSchoolGradeList"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.orgschoolgradeid"
                      class="col-sm-9"
                    ></v-select> -->
                    <div class="col-sm-8 d-flex align-items-center">
                      <a style="color:blue"> {{ Tables.studentcount || 0}} </a>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                
              </b-row>
              <b-row>
                <b-col>
                  
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-6">{{$t('homeschoolinghour')}}</label>
                    <!-- <v-select
                      :options="OrgSchoolGradeList"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.orgschoolgradeid"
                      class="col-sm-9"
                    ></v-select> -->
                    <div class="col-sm-6 d-flex align-items-center">
                      <custom-number-input
                        v-model="Tables.homeschoolinghour"
                        class="mb-3 ml-1"
                      ></custom-number-input>
                    </div>
                  </div>
                </b-col>
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">{{$t('homeschstdudentcount')}}</label>
                    <!-- <v-select
                      :options="OrgSchoolGradeList"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.orgschoolgradeid"
                      class="col-sm-9"
                    ></v-select> -->
                    <div class="col-sm-8 d-flex align-items-center">
                      <a style="color:blue"> {{ Tables.homeschstdudentcount }} </a>
                    </div>
                  </div>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <CInput horizontal :label="$t('detailinfo')"  v-model="Tables.detailinfo"></CInput>
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
            <c-button class="ml-n5 mr-3 float-right" v-if="HrReplacementHour.CanSave"  size="sm" color="primary" @click="$bvModal.show('AddModal')">
              <b-icon icon="plus"></b-icon> {{$t('Add')}}
            </c-button>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <b-table
              :fields="fieldsMainTable"
              :items="itemsMainTable"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(qualificationcategory)="{item}">
                <p v-if="item.Status == 0">{{item.qualificationcategory}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="qualificationcategorylist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.qualificationcategoryid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(actions)="{item}">
                <div class="text-center" v-if="HrReplacementHour.CanSave">
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
                @click="$router.push({name : 'HrReplacementHour'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData" v-if="HrReplacementHour.CanSave">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal id="modalXl1" size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal">
            <!-- <employee-list-component :ondate="HrReplacementHour.docdate" @SelectedItem="SelectedItem1"  @DblClick="Enterdata1">

              </employee-list-component> -->
                <person-list-for-teacher-hour 
                  @SelectedItem="SelectedItem1"  
                  @DblClick="Enterdata1"
                  :schoolyear="HrReplacementHour.schoolyearid"
                >
                </person-list-for-teacher-hour>
              <c-row class="mt-2">
                  <c-col class="text-center">
                      <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal1">
                          {{$t('back')}}
                      </b-button>
                      <b-button variant="primary" @click="Enterdata1(personvalue1)">
                          {{$t('Add')}}
                      </b-button>
                  </c-col>
              </c-row>
          </b-modal>
          <b-modal id="modalXl2" size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal">
              <person-list-for-teacher-hour 
                  @SelectedItem="SelectedItem2"  
                  @DblClick="Enterdata2"
                  :schoolyear="HrReplacementHour.schoolyearid"
                >
                </person-list-for-teacher-hour>
              <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
              <!-- <edit-person-component></edit-person-component> -->

              <c-row class="mt-2">
                  <c-col class="text-center">
                      <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal2">
                          {{$t('back')}}
                      </b-button>
                      <b-button variant="primary" @click="AddPerson2(personvalue2)">
                          {{$t('Add')}}
                      </b-button>
                  </c-col>
              </c-row>
          </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import HrReplacementHourService from "@/services/HrReplacementHour.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import EmployeeListComponent from '@/components/EmployeeList'
import OrganizationService from '@/services/organization.service'
import TeacherHourService from '@/services/TeacherHour.service'
import PersonListForTeacherHour from '@/components/PersonListForTeacherHour'
export default {
  components : {EmployeeListComponent,PersonListForTeacherHour},
  data() {
    return {
      SaveLoading: false,
      HrReplacementHour: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables: []
      },
      organizationtypelist: [],
      qualificationcategorylist: [],
      OrganizationAccountList : [],
      lang: "",
      fieldsMainTable: [
        {
          key: "outpersonname",
          label: this.$t("outpersonname")
        },
        {
          key: "inpersonname",
          label: this.$t("inpersonname")
        },
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgradename")
        },
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubjectname")
        },
        
        {
          key: "studentcount",
          label: this.$t("studentcount")
        },
        {
          key: "hours",
          label: this.$t("hours")
        },
        {
          key: "homeschoolinghour",
          label: this.$t("homeschoolinghour")
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("QualificationCategory")
        },
        {
          key: "actions",
          label: this.$t("actions")
        }
      ],
      itemsMainTable: [],
      SchoolYearList : [],
      SchoolSubjectList : [],
      personvalue1 : {},
      personvalue2 : {},
      Tables: {
        id: 0,
        ownerid: 0,
        outpersonid : 0,
        outpersonname : "",
        orgschoolgradeid: 0,
        orgschoolgradename:"", 
        schoolsubjectid:0, 
        schoolsubjectname:"", 
        hours:"", 
        studentcount:"", 
        homeschoolinghour:"", 
        inpersonid:0, 
        inpersonname:"", 
        qualificationcategoryid:"",  
        qualificationcategoryname:"",  
        homeschstdudentcount : 0,
        detailinfo: "",
        Status : 1,
        indocumentid: 0,
        indocumentinfo: "",
        intableid : 0,
        outdocumentid: 0,
        outdocumentinfo: "",
        outtableid : 0
      },
      OrgSchoolGradeList : []
    };
  },
  created() {
    QualificationCategoryService.GetAll().then(res => {
      this.qualificationcategorylist = res.data;
    });
    OrganizationTypeService.GetAll().then(res => {
      this.organizationtypelist = res.data;
    });
    HrReplacementHourService.Get(this.$route.params.id).then(res => {
      this.HrReplacementHour = res.data;
      this.itemsMainTable = res.data.Tables;
    });
    SchoolYearService.GetAll().then((res) => {
      this.SchoolYearList = res.data;
    });
    SchoolSubjectService.GetAll().then(res => {
      this.SchoolSubjectList = res.data;
    });
    OrgSchoolGradeService.GetAll().then(res =>{
      this.OrgSchoolGradeList = res.data
    })
    OrganizationService.GetOrganizationAccountList().then(res => {
      this.OrganizationAccountList = res.data
    })
  },
  computed: {},
  methods: {
    SelectedItem1(value){
      this.personvalue1 = value
    },
    SelectedItem2(value){
      this.personvalue2 = value
    },
    AddItem(){
      if(!this.Tables.qualificationcategoryid){
        this.makeToast(this.$t('qualificationcategoryNotCorrect'),this.$t('error'),'danger')
        return false
      }
      if (this.editedIndex > -1) {
          Object.assign(this.itemsMainTable[this.editedIndex], this.Tables)
          this.Close()
        } else {
          this.AddRepHourTables();
        }
    },
    Close(){
      this.$bvModal.hide('AddModal')
      this.$nextTick(() => {
        this.Tables = {
          id: 0,
          ownerid: 0,
          outpersonid : 0,
          outpersonname : "",
          orgschoolgradeid: 0,
          orgschoolgradename:"", 
          schoolsubjectid:0, 
          schoolsubjectname:"", 
          hours:"", 
          studentcount:"", 
          homeschoolinghour:"", 
          inpersonid:0, 
          inpersonname:"", 
          qualificationcategoryid:"",  
          qualificationcategoryname:"",  
          detailinfo: "",
          homeschstdudentcount : 0,
          Status : 1,
          indocumentid: 0,
          indocumentinfo: "",
          intableid : 0,
          outdocumentid: 0,
          outdocumentinfo: "",
          outtableid : 0
          };
          this.editedIndex = -1
      })
    },
    Enterdata1(data){
      this.Tables.outpersonid = data.personid;
      this.Tables.outpersonname = data.personname;
      this.Tables.schoolsubjectid = data.schoolsubjectid
      this.Tables.schoolsubjectname = data.schoolsubject
      this.Tables.orgschoolgradename = data.orgschoolgrade
      this.Tables.orgschoolgradeid = data.orgschoolgradeid
      this.Tables.studentcount = data.studentcount
      this.Tables.homeschstdudentcount = data.homeschstdudentcount
      this.Tables.outdocumentid = data.documentid
      this.Tables.outdocumentinfo = data.documentinfo
      this.Tables.outtableid = data.tableid
      this.CloseEmployeeModal1()
    },
    Enterdata2(data){
      this.Tables.inpersonid = data.personid;
      this.Tables.inpersonname = data.personname;
      this.Tables.indocumentid = data.documentid
      this.Tables.indocumentinfo = data.documentinfo
      this.Tables.intableid = data.tableid
      this.GetQualification()
      this.CloseEmployeeModal2()
    },
    getSubject(){
      var self = this
      if(!!self.Tables.outpersonid){
        TeacherHourService.GetPersonSchoolSubject(self.Tables.outpersonid,self.HrReplacementHour.schoolyearid).then(res => {
          self.Tables.schoolsubjectid = res.data.SchoolSubjectId
          self.Tables.schoolsubjectname = res.data.SchoolSubjectName
          self.getOrgSchoolGrade()
        }).catch(error => {
          self.makeToast(error.response.data.error,self.$t('error'),'danger')
        })
      }
    },
    getOrgSchoolGrade(){
      if(!!this.Tables.outpersonid){
        TeacherHourService.GetPersonSchoolSubjectGrade(this.Tables.outpersonid,this.HrReplacementHour.schoolyearid,this.Tables.schoolsubjectid).then(res => {
          this.Tables.orgschoolgradeid = res.data.SchoolGradeId
          this.Tables.orgschoolgradename = res.data.SchoolGradeName
        }).catch(error => {
          this.makeToast(error.response.data.error,this.$t('error'),'danger')
        })
      }
    },
    OpenEmployeeModal1(){
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl1")
    },
    OpenEmployeeModal2(){
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl2")
    },
    CloseEmployeeModal1(){
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl1")
    },
    CloseEmployeeModal2(){
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl2")
    },
    GetQualification(){
      this.Tables.qualificationcategoryid = 0
      this.Tables.qualificationcategoryname = ''
      QualificationCategoryService.GetPersonQualificationCategory(this.Tables.inpersonid,this.Tables.schoolsubjectid,'').then(res => {
        this.Tables.qualificationcategoryid = res.data.QualificationCategoryID
        this.Tables.qualificationcategoryname = res.data.QualificationCategoryName
      }).catch(error => {
        this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
      })
    },
    AddPerson2(data){
      this.CloseEmployeeModal2()
      this.Tables.inpersonid = data.personid
      this.Tables.inpersonname = data.personname
      this.GetQualification()
    },
    AddRepHourTables() {
      var self = this;

      // if (
      //   self.allwnctabrow.personid === "" ||
      //   self.allwnctabrow.personid === undefined ||
      //   self.allwnctabrow.personid === null ||
      //   self.allwnctabrow.personid === 0
      // ) {
      //   self.makeToast(
      //     self.$t("employeeNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (self.allwnctabrow.isteacher && (
      //   self.allwnctabrow.schoolsubjectid === "" ||
      //   self.allwnctabrow.schoolsubjectid === undefined ||
      //   self.allwnctabrow.schoolsubjectid === null ||
      //   self.allwnctabrow.schoolsubjectid === 0)
      // ) {
      //   self.makeToast(
      //     self.$t("schoolsubjectNotSelect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.allwnctabrow.allowancerate === "" ||
      //   self.allwnctabrow.allowancerate === undefined ||
      //   self.allwnctabrow.allowancerate === null ||
      //   self.allwnctabrow.allowancerate === 0
      // ) {
      //   self.makeToast(
      //     self.$t("allowancerateNotSelect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.allwnctabrow.startdate === "" ||
      //   self.allwnctabrow.startdate === undefined ||
      //   self.allwnctabrow.startdate === null ||
      //   self.allwnctabrow.startdate === 0
      // ) {
      //   self.makeToast(
      //     self.$t("startdateNotSelect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.allwnctabrow.enddate === "" ||
      //   self.allwnctabrow.enddate === undefined ||
      //   self.allwnctabrow.enddate === null ||
      //   self.allwnctabrow.enddate === 0
      // ) {
      //   self.makeToast(self.$t("enddateNotSelect"), self.$t("Error"), "danger");
      //   return false;
      // }
      // if (
      //   self.allwnctabrow.detailinfo === "" ||
      //   self.allwnctabrow.detailinfo === undefined ||
      //   self.allwnctabrow.detailinfo === null ||
      //   self.allwnctabrow.detailinfo === 0
      // ) {
      //   self.makeToast(
      //     self.$t("detailinfoNotSelect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // self.Tables.orgschoolgradename = self.OrgSchoolGradeList.filter(function(item) {
      //   if (item.id === self.Tables.orgschoolgradeid) return item;
      // })[0].name;
      // self.Tables.schoolsubjectname = self.Tables.schoolsubjectid ? self.SchoolSubjectList.filter(
      //   function(item) {
      //     if (item.id === self.Tables.schoolsubjectid) return item;
      //   }
      // )[0].name : '';
      self.itemsMainTable.push(self.Tables);

      self.Tables = {
        id: 0,
        ownerid: 0,
        outpersonid : 0,
        outpersonname : "",
        orgschoolgradeid: 0,
        orgschoolgradename:"", 
        schoolsubjectid:0, 
        schoolsubjectname:"", 
        hours:"", 
        studentcount:"", 
        homeschoolinghour:"", 
        inpersonid:0, 
        inpersonname:"", 
        qualificationcategoryid:"",  
        qualificationcategoryname:"",  
        homeschstdudentcount : 0,
        detailinfo: "",
        Status : 1,
        indocumentid: 0,
        indocumentinfo: "",
        intableid : 0,
        outdocumentid: 0,
        outdocumentinfo: "",
        outtableid : 0
      };
      this.$bvModal.hide('AddModal')
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    EditItem(item){
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.itemsMainTable.indexOf(item);
      this.Tables = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    Add() {
      // if (
      //   this.Tables.organizationtypeid === null ||
      //   this.Tables.organizationtypeid === undefined ||
      //   this.Tables.organizationtypeid === 0 ||
      //   this.Tables.organizationtypeid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("OrganizationTypeNotSelect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   this.Tables.qualificationcategoryid === null ||
      //   this.Tables.qualificationcategoryid === undefined ||
      //   this.Tables.qualificationcategoryid === 0 ||
      //   this.Tables.qualificationcategoryid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("QualificationCategoryNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   this.Tables.coef === null ||
      //   this.Tables.coef === undefined ||
      //   this.Tables.coef === 0 ||
      //   this.Tables.coef === ""
      // ) {
      //   this.makeToast(this.$t("percentNotSelect"), this.$t("Error"), "danger");
      //   return false;
      // }

      this.itemsMainTable.push({
        id: this.Tables.id,
        ownerid: this.Tables.ownerid,
        qualificationcategoryid: this.Tables.qualificationcategoryid,
        qualificationcategoryname : this.Tables.qualificationcategoryid ?  this.qualificationcategorylist.filter(item => item.id === this.Tables.qualificationcategoryid)[0].name : '',
        outpersonid :  this.Tables.outpersonid,
        outpersonname : this.Tables.outpersonname,
        orgschoolgradeid: this.Tables.orgschoolgradeid,
        orgschoolgradename:  this.Tables.orgschoolgradeid ?  this.OrgSchoolGradeList.filter(item => item.id === this.Tables.orgschoolgradeid)[0].name : '', 
        schoolsubjectid:  this.Tables.schoolsubjectid, 
        schoolsubjectname:  this.Tables.schoolsubjectid ?  this.SchoolSubjectList.filter(item => item.id === this.Tables.schoolsubjectid)[0].name : '', 
        hours: this.Tables.hours, 
        studentcount: this.Tables.studentcount, 
        homeschoolinghour: this.Tables.homeschoolinghour, 
        inpersonid: this.Tables.inpersonid, 
        inpersonname : this.Tables.inpersonname,
        detailinfo: this.Tables.detailinfo,
        homeschstdudentcount : this.Tables.homeschstdudentcount,
        indocumentid: this.Tables.indocumentid,
        indocumentinfo: this.Tables.indocumentinfo,
        intableid : this.Tables.intableid,
        outdocumentid: this.Tables.outdocumentid,
        outdocumentinfo: this.Tables.outdocumentinfo,
        outtableid : this.Tables.outtableid,
        Status : 1
      });
      this.Tables = {

      };
    },
    // EditItem(item) {
    //   item.Status = 2;
    // },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (self.HrReplacementHour.Tables.length == 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.HrReplacementHour.docnumber === null ||
        self.HrReplacementHour.docnumber === undefined ||
        self.HrReplacementHour.docnumber === 0
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrReplacementHour.docdate === null ||
        self.HrReplacementHour.docdate === undefined ||
        self.HrReplacementHour.docdate === 0
      ) {
        this.makeToast(
          this.$t("schoolyearNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
            if (
        self.HrReplacementHour.organizationaccountid === null ||
        self.HrReplacementHour.organizationaccountid === undefined ||
        self.HrReplacementHour.organizationaccountid === 0
      ) {
        this.makeToast(
          this.$t("organizationaccountNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrReplacementHour.schoolyearid === null ||
        self.HrReplacementHour.schoolyearid === undefined ||
        self.HrReplacementHour.schoolyearid === 0
      ) {
        this.makeToast(
          this.$t("schoolyearNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrReplacementHour.detailinfo === null ||
        self.HrReplacementHour.detailinfo === undefined ||
        self.HrReplacementHour.detailinfo === 0
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
      if (!this.check()) {
        return false;
      }
      this.CheckItemDelete();
      this.HrReplacementHour.Tables = this.itemsMainTable;
      HrReplacementHourService.Update(this.HrReplacementHour)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "HrReplacementHour"
          });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          this.itemsMainTable[i].Status == 3 &&
          this.itemsMainTable[i].organizationtypeid == ""
        ) {
          this.itemsMainTable.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style>
</style>


