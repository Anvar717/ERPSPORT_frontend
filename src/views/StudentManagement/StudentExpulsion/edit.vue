<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("StudentExpulsion") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="StudentExpulsion.docnumber"
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
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <label>{{ $t("docdate") }}</label>

                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="StudentExpulsion.docdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('docdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @change="orgschoolgradechange"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>
              <CCol sm="2" v-if="isGraduation == false">
                <!-- :disabled="studentexpulsiondisabled" -->
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <label for>{{ $t("schoolyear") }}</label>
                  <v-select
                    :options="schoolyearlist"
                    v-model="StudentExpulsion.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="schoolyearchange"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol sm="2" v-if="isGraduation == true">
                <!-- :disabled="studentexpulsiondisabled" -->
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <label for>{{ $t("schoolyear") }}</label>
                  <v-select
                    :options="schoolyearlist"
                    v-model="StudentExpulsion.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    disabled
                    label="name"
                    @input="schoolyearchange"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol sm="4" v-if="isGraduation == true">
                <ValidationProvider name="code" rules="required">
                  <label for>{{ $t("studentexpulsiontype") }}</label>
                  <div>
                    <label for
                      ><b>{{
                        StudentExpulsion.studentexpulsiontypename
                      }}</b></label
                    >
                  </div>
                  <!-- <v-select
                    disabled
                    :options="studentexpulsiontypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="StudentExpulsion.studentexpulsiontypeid"
                    @input="studentexpulsiontypechange"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select> -->
                </ValidationProvider>
              </CCol>

              <CCol sm="4" v-if="isGraduation == false">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <label for>{{ $t("studentexpulsiontype") }}</label>
                  <v-select
                    :options="studentexpulsiontypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="StudentExpulsion.studentexpulsiontypeid"
                    @input="studentexpulsiontypechange"
                    :disabled="studentexpulsiondisabled"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>

              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="StudentExpulsion.detailinfo"
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
            </CRow>
            <CRow>
              <CCol></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <b-row class="mx-1 mt-n3 mb-2">
          <b-col class="text-right">
            <b-button
              v-if="isGraduation == false"
              variant="primary"
              @click="OpenModal"
              :disabled="!StudentExpulsion.studentexpulsiontypeid"
            >
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </b-button>
          </b-col>
        </b-row>
        <CRow>
          <CCol>
            <b-table
              :fields="StudentExpulsionTables1"
              :items="StudentExpulsion.Tables"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template #cell(actions)="{item}">
                <div class="text-center">
                  <b-link
                    @click="EditRow(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteRow(item)"
                  >
                    <b-icon icon="trash"></b-icon>
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
                @click="
                  $router.push({
                    name: 'StudentExpulsion',
                    query: {
                      StartDate: $route.query.StartDate,
                      EndDate: $route.query.EndDate,
                      Search: $route.query.Search,
                    },
                  })
                "
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="StudentExpulsion.CanSave"
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
        <b-modal
          id="StudentExpulsion"
          no-close-on-backdrop
          size="lg"
          :title="$t('StudentExpulsion')"
          hide-footer
        >
          <b-row v-if="tabrow.istoschool">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("StudentSchoolMovement")
                }}</label>
                <div class="col-sm-8 d-flex align-items-center">
                  <v-select
                    style="width : 100%"
                    :options="studentschoolmovementlist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.studentschoolmovementid"
                    @input="studentschoolmovementchange"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="tabrow.istoschool">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("tooblast") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="OblastList"
                    v-model="tabrow.tooblastid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeOblast"
                    v-if="!tabrow.istoschool"
                  >
                  </v-select>
                  <p
                    class="m-0 p-0 d-flex align-items-center text-primary"
                    v-if="tabrow.istoschool"
                  >
                    {{ tabrow.tooblastname }}
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="tabrow.istoschool">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("toregion") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="RegionList"
                    v-model="tabrow.toregionid"
                    @input="ChangeRegion"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-if="!tabrow.istoschool"
                  >
                  </v-select>
                  <p
                    class="m-0 p-0 d-flex align-items-center text-primary"
                    v-if="tabrow.istoschool"
                  >
                    {{ tabrow.toregionname }}
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="tabrow.istoschool">
            <b-col>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("toorganization") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="OrganizationList"
                    v-model="tabrow.toorganizationid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeOrganization"
                    v-if="!tabrow.istoschool"
                  >
                  </v-select>
                  <p
                    class="m-0 p-0 d-flex align-items-center text-primary"
                    v-if="tabrow.istoschool"
                  >
                    {{ tabrow.toorganizationname }}
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("orgschoolgrade")
                }}</label>
                <div class="col-sm-8 d-flex align-items-center">
                  <v-select
                    style="width : 100%"
                    :options="orgschoolgradelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.orgschoolgradeid"
                    v-if="!tabrow.istoschool"
                    @input="orgschoolgradechange"
                  ></v-select>
                  <p v-if="tabrow.istoschool">
                    {{ tabrow.orgschoolgradename }}
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label
                  class="col-form-label col-sm-4 d-flex align-items-center"
                  for
                  >{{ $t("Student") }}</label
                >
                <div class="col-sm-8 d-flex align-items-center">
                  <b-input-group v-if="!tabrow.istoschool" class="mt-3">
                    <b-form-input
                      disabled
                      v-model="tabrow.personname"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button @click="OpenEmployeeModal" variant="primary">
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                  <p class="text-primary" v-if="tabrow.istoschool">
                    <b> {{ tabrow.personname }} </b>
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("studentadmission")
                }}</label>
                <div class="col-sm-8 d-flex align-items-center">
                  <p>{{ tabrow.studentadmissionid }}</p>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-n2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("estatementnumber")
                }}</label>
                <div class="col-sm-8 d-flex align-items-center">
                  <CInput
                    style="width : 100%"
                    class="mb-0"
                    size="sm"
                    v-model="tabrow.estatementnumber"
                  ></CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="m">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("estatementdate")
                }}</label>
                <div class="col-sm-8 d-flex align-items-center">
                  <date-picker
                    v-model="tabrow.estatementdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('estatementdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center">
              <b-button variant="danger" class="mr-2" @click="Close">
                {{ $t("back") }}
              </b-button>
              <b-button variant="success" @click="Add">
                {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal
          id="StudentModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Student')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <student-report-list
            :orgschoolgrade="tabrow.orgschoolgradeid"
            :schoolyear="StudentExpulsion.schoolyearid"
            :ondate="StudentExpulsion.docdate"
            @SelectedItem="SelectedItem"
            @DblClick="AddStudentData"
          ></student-report-list>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseStudentModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddStudentData(studentvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import StudentSchoolMovementService from "@/services/StudentSchoolMovement.service";
import StudentManageService from "@/services/StudentManage.service";
import SchoolYearService from "@/services/SchoolYear.service";
import StudentReportList from "@/components/StudentReportList";
import StudentExpulsionService from "@/services/StudentExpulsion.service";
import StudentExpulsionTypeService from "@/services/StudentExpulsionType.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  components: { StudentReportList },
  data() {
    return {
      SaveLoading: false,
      StudentExpulsion: {},
      selectedrowid: 0,

      schoolyearlist: [],
      orgschoolgradelist: [],

      studentexpulsiontypelist: [],
      studentschoolmovementlist: [],
      personlist: [],
      lang: "",
      StudentExpulsionTables1: [
        // { key: "studentexpulsiontype", label: this.$t("StudentExpulsionType") },

        {
          key: "studentschoolmovementname",
          label: this.$t("StudentSchoolMovement"),
        },

        { key: "orgschoolgradename", label: this.$t("orgschoolgrade") },
        { key: "personname", label: this.$t("Student") },
        { key: "studentadmissionid", label: this.$t("StudentAdmission") },
        { key: "estatementnumber", label: this.$t("EstatementNumber") },
        { key: "estatementdate", label: this.$t("EstatementDate") },
        { key: "actions", label: this.$t("actions") },
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        studentexpulsiontypeid: 0,
        studentexpulsiontype: "",
        istoschool: false,
        studentadmissionid: 0,
        personid: 0,
        personname: "",
        estatementnumber: 0,
        estatementdate: 0,
        studentschoolmovementid: 0,
        tooblastid: 0,
        tooblastname: "",
        toregionid: 0,
        toregionname: "",
        toorganizationname: "",
        toorganizationid: 0,
        Status: 1,
      },
      studentschoolmovementdata: {
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        personid: 0,
        personname: "",
        studentadmissionid: 0,
      },
      studentvalue: {},
      editedIndex: -1,
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      lang: "",
      isGraduation: false,
    };
  },
  created() {
    var self = this;
    self.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    if (typeof self.$route.query.isGraduation == "boolean") {
      self.isGraduation = self.$route.query.isGraduation;
    } else {
      if (self.$route.query.isGraduation === "false") {
        self.isGraduation = false;
      } else {
        self.isGraduation = true;
      }
    }
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    OrgSchoolGradeService.GetAll().then((res) => {
      self.orgschoolgradelist = res.data;
    });

    SchoolYearService.GetAll().then((res) => {
      self.schoolyearlist = res.data;
    });

    StudentExpulsionTypeService.GetAll().then((res) => {
      self.studentexpulsiontypelist = res.data;
    });

    StudentExpulsionService.Get(self.selectedrowid, self.isGraduation).then(
      (res) => {
        self.StudentExpulsion = res.data;
        //this.StudentExpulsion.docdate = "15.06.2021";
        self.schoolyearchange();
      }
    );
  },
  computed: {
    studentexpulsiondisabled() {
      if (this.StudentExpulsion.Tables.length > 0) {
        if (
          this.StudentExpulsion.Tables.filter((item) => item.Status != 3)
            .length > 0
        ) {
          return true;
        }
      }
    },
  },
  methods: {
    ChangeOblast() {
      this.tabrow.toregionid = 0;
      this.tabrow.toorganizationid = 0;
      this.getRegionList();
    },
    getRegionList() {
      if (!!this.tabrow.tooblastid) {
        this.tabrow.tooblastname = this.OblastList.filter(
          (item) => item.id === this.tabrow.tooblastid
        )[0].name;
        RegionService.GetAll(this.lang, this.tabrow.tooblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    getOrgList() {
      if (!!this.tabrow.toregionid) {
        OrganizationService.GetAll(
          this.tabrow.tooblastid,
          this.tabrow.toregionid,
          false
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    ChangeOrganization() {
      if (!!this.tabrow.toorganizationid) {
        this.tabrow.toorganizationname = this.OrganizationList.filter(
          (item) => item.id === this.tabrow.toorganizationid
        )[0].name;
      }
    },

    ChangeRegion() {
      this.tabrow.toorganizationid = 0;
      this.getOrgList();
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    AddStudentData(data) {
      this.tabrow.personname = data.personname;
      this.tabrow.personid = data.personid;
      this.tabrow.studentadmissionid = data.studentadmissionid;
      this.CloseStudentModal();
    },
    Close() {
      this.$bvModal.hide("StudentExpulsion");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          orgschoolgradeid: 0,
          orgschoolgradename: "",
          studentexpulsiontypeid: 0,
          studentexpulsiontype: "",
          istoschool: false,
          studentadmissionid: 0,
          personid: 0,
          personname: "",
          estatementnumber: 0,
          estatementdate: 0,
          studentschoolmovementid: 0,
          tooblastid: 0,
          tooblastname: "",
          toregionid: 0,
          toregionname: "",
          toorganizationname: "",
          toorganizationid: 0,
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    OpenEmployeeModal() {
      this.$bvModal.show("StudentModal");
    },
    CloseStudentModal() {
      this.$bvModal.hide("StudentModal");
    },
    OpenModal() {
      this.$bvModal.show("StudentExpulsion");
      this.tabrow = {
        id: 0,
        ownerid: 0,
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        studentexpulsiontypeid: 0,
        studentexpulsiontype: "",
        istoschool: this.studentexpulsiontypelist.filter(
          (item) => item.id == this.StudentExpulsion.studentexpulsiontypeid
        )[0].istoschool,
        studentadmissionid: 0,
        personid: 0,
        personname: "",
        estatementnumber: 0,
        estatementdate: 0,
        studentschoolmovementid: 0,
        tooblastid: 0,
        tooblastname: "",
        toregionid: 0,
        toregionname: "",
        toorganizationname: "",
        toorganizationid: 0,
        Status: 1,
      };
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
      // console.log(self.tabrow.studentexpulsiontypeid);
      // if (
      //   self.tabrow.studentexpulsiontypeid === null ||
      //   self.tabrow.studentexpulsiontypeid === undefined ||
      //   self.tabrow.studentexpulsiontypeid === 0
      // ) {
      //   this.makeToast(
      //     this.$t("studentexpulsiontypeNotSelect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (self.tabrow.istoschool) {
        if (
          self.tabrow.studentschoolmovementid === null ||
          self.tabrow.studentschoolmovementid === undefined ||
          self.tabrow.studentschoolmovementid === 0
        ) {
          this.makeToast(
            this.$t("studentschoolmovementNotSelect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (
        self.tabrow.orgschoolgradeid === null ||
        self.tabrow.orgschoolgradeid === undefined ||
        self.tabrow.orgschoolgradeid === 0
      ) {
        this.makeToast(
          this.$t("orgschoolgradeidNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.personid === null ||
        self.tabrow.personid === undefined ||
        self.tabrow.personid === 0
      ) {
        this.makeToast(this.$t("StudentNotSelect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow.estatementnumber === null ||
        self.tabrow.estatementnumber === undefined ||
        self.tabrow.estatementnumber === 0 ||
        self.tabrow.estatementnumber === ""
      ) {
        this.makeToast(
          this.$t("estatementnumberNotCorrect"),
          this.$t("Error"),
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
        this.makeToast(
          this.$t("estatementdateNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.StudentExpulsion.schoolyearid != 4) {
        // self.tabrow.studentexpulsiontype = self.studentexpulsiontypelist.filter(
        //   function(item) {
        //     if (item.id === self.tabrow.studentexpulsiontypeid) return item;
        //   }
        // )[0].name;
        self.tabrow.orgschoolgradename = self.orgschoolgradelist.filter(
          (item) => item.id === self.tabrow.orgschoolgradeid
        )[0].name;
      }
      if (self.tabrow.studentschoolmovementid > 0) {
        /*  if(self.studentschoolmovementdata.orgschoolgradeid !== self.tabrow.orgschoolgradeid || self.studentschoolmovementdata.personid !== self.tabrow.personid || self.studentschoolmovementdata.studentadmissionid !== self.tabrow.studentadmissionid)
        {
                this.makeToast(this.$t("Ўқувчи маълумотлари талонга тўғри келмади!"), this.$t("Error"), "danger");
                return false;
        } */
        self.tabrow.studentschoolmovementname = self.studentschoolmovementlist.filter(
          (item) => item.id === self.tabrow.studentschoolmovementid
        )[0].name;
        //   function(item) {
        //     if (item.id === self.tabrow.studentschoolmovementid) return item;
        //   }
        // )[0].name;
      }
      //   function(
      //   item
      // ) {
      //   if (item.id === self.tabrow.orgschoolgradeid) return item;
      // })[0].name;
      if (self.editedIndex > -1) {
        Object.assign(
          self.StudentExpulsion.Tables[self.editedIndex],
          self.tabrow
        );
      } else {
        self.StudentExpulsion.Tables.push(self.tabrow);
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        studentexpulsiontypeid: 0,
        studentexpulsiontype: "",
        istoschool: false,
        studentadmissionid: 0,
        personid: 0,
        personname: "",
        estatementnumber: 0,
        estatementdate: "",
        studentschoolmovementid: 0,
        studentschoolmovementname: "",
        tooblastid: 0,
        tooblastname: "",
        toregionid: 0,
        toregionname: "",
        toorganizationname: "",
        toorganizationid: 0,
        Status: 1,
      };
      this.$bvModal.hide("StudentExpulsion");
      console.log(this.StudentExpulsion.Tables);
    },

    EditRow(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.StudentExpulsion.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      if (!this.tabrow.istoschool) {
        this.getRegionList();
        this.getOrgList();
        this.ChangeOrganization();
      }
      this.$bvModal.show("StudentExpulsion");
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    schoolyearchange() {
      var self = this;
      if (self.StudentExpulsion.schoolyearid > 0)
        StudentSchoolMovementService.GetAll(
          self.StudentExpulsion.schoolyearid
        ).then((res) => {
          self.studentschoolmovementlist = res.data;
        });
      self.orgschoolgradechange();
    },
    orgschoolgradechange() {
      var self = this;
      self.tabrow.personid = 0;
      self.tabrow.personname = "";
      if (self.StudentExpulsion.schoolyearid > 0)
        StudentManageService.GetAllInOrgSchoolGrade(
          "",
          "",
          self.StudentExpulsion.docdate,
          self.StudentExpulsion.schoolyearid,
          self.tabrow.orgschoolgradeid
        ).then((res) => {
          self.personlist = res.data;
        });
    },
    getSchoolMovementData() {
      var self = this;
      self.tabrow.orgschoolgradeid = self.studentschoolmovementlist.filter(
        (item) => item.id === self.tabrow.studentschoolmovementid
      )[0].fromorgschoolgradeid;
      self.tabrow.orgschoolgradename = self.studentschoolmovementlist.filter(
        (item) => item.id === self.tabrow.studentschoolmovementid
      )[0].orgschoolgradename;
      self.tabrow.personid = self.studentschoolmovementlist.filter(
        (item) => item.id === self.tabrow.studentschoolmovementid
      )[0].frompersonid;
      self.tabrow.personname = self.studentschoolmovementlist.filter(
        (item) => item.id === self.tabrow.studentschoolmovementid
      )[0].frompersonname;
      self.tabrow.studentadmissionid = self.studentschoolmovementlist.filter(
        (item) => item.id === self.tabrow.studentschoolmovementid
      )[0].fromstudentadmissionid;
      self.tabrow.toregionid = self.studentschoolmovementlist.filter(
        (item) => item.id == self.tabrow.studentschoolmovementid
      )[0].toregionid;
      self.tabrow.toregionname = self.studentschoolmovementlist.filter(
        (item) => item.id == self.tabrow.studentschoolmovementid
      )[0].toregionname;
      self.tabrow.tooblastid = self.studentschoolmovementlist.filter(
        (item) => item.id == self.tabrow.studentschoolmovementid
      )[0].tooblastid;
      self.tabrow.tooblastname = self.studentschoolmovementlist.filter(
        (item) => item.id == self.tabrow.studentschoolmovementid
      )[0].tooblastname;
      self.tabrow.toorganizationid = self.studentschoolmovementlist.filter(
        (item) => item.id == self.tabrow.studentschoolmovementid
      )[0].toorganizationid;
      self.tabrow.toorganizationname = self.studentschoolmovementlist.filter(
        (item) => item.id == self.tabrow.studentschoolmovementid
      )[0].toorganizationname;
    },
    studentschoolmovementchange() {
      var self = this;
      self.tabrow.orgschoolgradeid = 0;
      self.tabrow.orgschoolgradename = "";
      self.tabrow.personid = 0;
      self.tabrow.personname = "";
      self.tabrow.studentadmissionid = 0;
      self.tabrow.toregionid = 0;
      self.tabrow.toregionname = "";
      self.tabrow.tooblastid = 0;
      self.tabrow.tooblastname = "";
      self.tabrow.toorganizationid = 0;
      self.tabrow.toorganizationname = "";
      this.getSchoolMovementData();
    },
    studentexpulsiontypechange() {
      var self = this;

      self.tabrow.orgschoolgradeid = 0;
      self.tabrow.orgschoolgradename = "";

      self.tabrow.studentadmissionid = 0;
      self.tabrow.personid = 0;
      self.tabrow.personname = "";
      self.tabrow.estatementnumber = 0;
      self.tabrow.estatementdate = "";
      self.tabrow.studentschoolmovementid = 0;
      self.tabrow.studentschoolmovementname = "";
      self.tabrow.tooblastid = 0;
      self.tabrow.tooblastname = "";
      self.tabrow.toregionid = 0;
      self.tabrow.toregionname = "";
      self.tabrow.toorganizationid = 0;
      self.tabrow.toorganizationname = "";
      self.tabrow.istoschool = false;
      self.tabrow.istoschool = self.studentexpulsiontypelist.filter(
        (item) => item.id == self.StudentExpulsion.studentexpulsiontypeid
      )[0].istoschool;
      if (self.tabrow.studentexpulsiontypeid === 6) {
        OrgSchoolGradeService.GetAll("", 11).then((res) => {
          self.orgschoolgradelist = res.data;
        });
      } else {
        OrgSchoolGradeService.GetAll().then((res) => {
          self.orgschoolgradelist = res.data;
        });
      }
    },
    check() {
      var self = this;
      // if (self.StudentExpulsion.Tables1.length == 0) {
      //   this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
      //   return false;
      // }
      if (
        self.StudentExpulsion.docnumber === null ||
        self.StudentExpulsion.docnumber === undefined ||
        self.StudentExpulsion.docnumber === 0
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentExpulsion.schoolyearid === null ||
        self.StudentExpulsion.schoolyearid === undefined ||
        self.StudentExpulsion.schoolyearid === 0
      ) {
        this.makeToast(
          this.$t("schoolyearNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentExpulsion.detailinfo === null ||
        self.StudentExpulsion.detailinfo === undefined ||
        self.StudentExpulsion.detailinfo === 0
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentExpulsion.docdate === null ||
        self.StudentExpulsion.docdate === undefined ||
        self.StudentExpulsion.docdate === 0
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (self.StudentExpulsion.Tables.length === 0) {
      //   this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
      //   return false;
      // }
      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }

      StudentExpulsionService.Update(this.StudentExpulsion)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "StudentExpulsion",
            query: {
              StartDate: this.$route.query.StartDate,
              EndDate: this.$route.query.EndDate,
              Search: this.$route.query.Search,
            },
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>