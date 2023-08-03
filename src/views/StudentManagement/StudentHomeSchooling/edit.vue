<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("StudentHomeSchooling") }}</h4>
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
                    v-model="StudentHomeSchooling.docnumber"
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

                  <date-picker
                    v-model="StudentHomeSchooling.docdate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('docdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @input="orgschoolgradechange"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="StudentHomeSchooling.detailinfo"
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
            <CCard sm="6">
              <CCardHeader>
                <h5 class="text-left">{{ $t("MedicalData") }}</h5>
              </CCardHeader>
              <CCardBody sm="6">
                <CRow sm="6">
                  <CCol>
                    <ValidationProvider
                      v-slot="v"
                      name="medicalconclnumber"
                      rules="required"
                    >
                      <CInput
                        :placeholder="$t('medicalconclnumber')"
                        autocomplete="medicalconclnumber"
                        :label="$t('medicalconclnumber')"
                        v-model="StudentHomeSchooling.medicalconclnumber"
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
                  <CCol>
                    <ValidationProvider
                      v-slot="v"
                      name="medicalconcldate"
                      rules="required"
                    >
                      <label>{{ $t("medicalconcldate") }}</label>

                      <date-picker
                        v-model="StudentHomeSchooling.medicalconcldate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('medicalconcldate')"
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
                    <ValidationProvider
                      v-slot="v"
                      name="medicalconclenddate"
                      rules="required"
                    >
                      <label>{{ $t("medicalconclenddate") }}</label>

                      <date-picker
                        v-model="StudentHomeSchooling.medicalconclenddate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('medicalconclenddate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <ValidationProvider
                      v-slot="v"
                      name="homeschoolingdisease"
                      rules="required"
                    >
                      <label for>{{ $t("homeschoolingdisease") }}</label>
                      <v-select
                        :options="homeschoolingdiseaselist"
                        v-model="StudentHomeSchooling.homeschoolingdiseaseid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard sm="6">
              <CCardHeader>
                <h5 class="text-left">{{ $t("RemainingInformation") }}</h5>
              </CCardHeader>
              <CCardBody sm="6">
                <CRow>
                  <CCol>
                    <ValidationProvider v-slot="v" name="code" rules="required">
                      <label for>{{ $t("Oblast") }}</label>
                      <v-select
                        :options="oblastlist"
                        v-model="StudentHomeSchooling.studentoblastid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                  <CCol>
                    <ValidationProvider v-slot="v" name="code" rules="required">
                      <label v-if="!RegionLoading" for>{{
                        $t("region")
                      }}</label>
                      <v-select
                        :options="regionlist"
                        v-model="StudentHomeSchooling.studentregionid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                  <CCol>
                    <ValidationProvider v-slot="v" name="name" rules="required">
                      <label for>{{ $t("Organization") }}</label>
                      <v-select
                        :options="organizationlist"
                        v-model="StudentHomeSchooling.studentorganizationid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <CRow style="padding-top: 10px">
                  <CCol>
                    <ValidationProvider
                      v-slot="v"
                      name="SchoolYear"
                      rules="required"
                    >
                      <label for>{{ $t("SchoolYear") }}</label>
                      <v-select
                        :options="schoolyearlist"
                        v-model="StudentHomeSchooling.studentschoolyearid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="orgschoolgradechange"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                  <CCol>
                    <ValidationProvider v-slot="v" name="code" rules="required">
                      <label for>{{ $t("OrgSchoolGrade") }}</label>
                      <v-select
                        :options="orgschoolgradelist"
                        v-model="StudentHomeSchooling.studentorgschoolgradeid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="orgschoolgradechange"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                  <CCol>
                    <ValidationProvider v-slot="v" name="code" rules="required">
                      <label for>{{ $t("Student") }}</label>
                      <v-select
                        :options="personlist"
                        v-model="StudentHomeSchooling.personid"
                        :reduce="(item) => item.personid"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="personchange"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                  <!-- <CCol>
               
                  <label >{{$t('studentadmission')}}</label>
                 
                    <custom-number-input
                      :placeholder="$t('studentadmission')"
                      autocomplete="text"
                      
                      :label="$t('course')"
                      v-model="StudentHomeSchooling.studentadmission"
                    ></custom-number-input>
                 
              </CCol> -->
                </CRow>
                <CRow style="padding-top: 10px">
                  <CCol>
                    <ValidationProvider v-slot="v" name="code" rules="required">
                      <label for>{{ $t("CurriculumType") }}</label>
                      <v-select
                        :options="curriculumtypelist"
                        v-model="StudentHomeSchooling.curriculumtypeid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="2">
                    <label>{{ $t("Enddate") }}</label>

                    <date-picker
                      v-model="StudentHomeSchooling.enddate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('Enddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'StudentHomeSchooling' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="StudentHomeSchooling.CanSave"
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
import SchoolYearService from "@/services/SchoolYear.service";
import HelperService from "@/services/helper.service";
import PersonService from "@/services/person.service";
import OrganizationService from "@/services/organization.service";
import CurriculumTypeService from "@/services/CurriculumType.service";
import StudentHomeSchoolingService from "@/services/StudentHomeSchooling.service";
import HomeSchoolingDiseaseService from "@/services/HomeSchoolingDisease.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import StudentManageService from "@/services/StudentManage.service";
export default {
  data() {
    return {
      SaveLoading: false,
      StudentHomeSchooling: {
        code: "",
        shortname: "",
        fullname: "",
        Translates: [],
      },
      RegionLoading: false,
      OrganizationLoading: false,
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("translateModal.status") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" },
      ],
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      schoolyearlist: [],
      orgschoolgradelist: [],
      homeschoolingdiseaselist: [],
      organizationlist: [],
      curriculumtypelist: [],
      oblastlist: [],
      regionlist: [],
      personlist: [],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      lang: "",
      TranslatebyName: "shortname",
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    CurriculumTypeService.GetAll().then((res) => {
      this.curriculumtypelist = res.data;
    });
    OrgSchoolGradeService.GetAll().then((res) => {
      this.orgschoolgradelist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    /* OrganizationService.GetAll().then(res => {
      this.organizationlist = res.data;
    }); */
    HomeSchoolingDiseaseService.GetAll().then((res) => {
      this.homeschoolingdiseaselist = res.data;
    });
    HelperService.GetOblastList().then((res) => {
      this.oblastlist = res.data;
    });

    StudentHomeSchoolingService.Get(this.$route.params.id).then((res) => {
      this.StudentHomeSchooling = res.data;
      this.items1 =
        res.data.Translates.filter((item) => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter((item) => item.columnname == "fullname") ||
        [];
      this.orgschoolgradechange();
    });
    /* this.GetOblastList(); */
  },
  methods: {
    check() {
      var self = this;

      if (
        self.StudentHomeSchooling.docnumber === 0 ||
        self.StudentHomeSchooling.docnumber === null ||
        self.StudentHomeSchooling.docnumber === undefined ||
        self.StudentHomeSchooling.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.docdate === 0 ||
        self.StudentHomeSchooling.docdate === null ||
        self.StudentHomeSchooling.docdate === undefined ||
        self.StudentHomeSchooling.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.medicalconclnumber === 0 ||
        self.StudentHomeSchooling.medicalconclnumber === null ||
        self.StudentHomeSchooling.medicalconclnumber === undefined ||
        self.StudentHomeSchooling.medicalconclnumber === ""
      ) {
        this.makeToast(
          this.$t("medicalconclnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.medicalconcldate === 0 ||
        self.StudentHomeSchooling.medicalconcldate === null ||
        self.StudentHomeSchooling.medicalconcldate === undefined ||
        self.StudentHomeSchooling.medicalconcldate === ""
      ) {
        this.makeToast(
          this.$t("medicalconcldateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.medicalconclenddate === 0 ||
        self.StudentHomeSchooling.medicalconclenddate === null ||
        self.StudentHomeSchooling.medicalconclenddate === undefined ||
        self.StudentHomeSchooling.medicalconclenddate === ""
      ) {
        this.makeToast(
          this.$t("medicalconclenddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.homeschoolingdiseaseid === 0 ||
        self.StudentHomeSchooling.homeschoolingdiseaseid === null ||
        self.StudentHomeSchooling.homeschoolingdiseaseid === undefined ||
        self.StudentHomeSchooling.homeschoolingdiseaseid === ""
      ) {
        this.makeToast(
          this.$t("homeschoolingdiseaseNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.medicalconclnumber === 0 ||
        self.StudentHomeSchooling.medicalconclnumber === null ||
        self.StudentHomeSchooling.medicalconclnumber === undefined ||
        self.StudentHomeSchooling.medicalconclnumber === ""
      ) {
        this.makeToast(
          this.$t("medicalconclnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.studentoblastid === 0 ||
        self.StudentHomeSchooling.studentoblastid === null ||
        self.StudentHomeSchooling.studentoblastid === undefined ||
        self.StudentHomeSchooling.studentoblastid === ""
      ) {
        this.makeToast(
          this.$t("oblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.studentregionid === 0 ||
        self.StudentHomeSchooling.studentregionid === null ||
        self.StudentHomeSchooling.studentregionid === undefined ||
        self.StudentHomeSchooling.studentregionid === ""
      ) {
        this.makeToast(
          this.$t("regionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.studentorganizationid === 0 ||
        self.StudentHomeSchooling.studentorganizationid === null ||
        self.StudentHomeSchooling.studentorganizationid === undefined ||
        self.StudentHomeSchooling.studentorganizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.studentschoolyearid === 0 ||
        self.StudentHomeSchooling.studentschoolyearid === null ||
        self.StudentHomeSchooling.studentschoolyearid === undefined ||
        self.StudentHomeSchooling.studentschoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.studentorgschoolgradeid === 0 ||
        self.StudentHomeSchooling.studentorgschoolgradeid === null ||
        self.StudentHomeSchooling.studentorgschoolgradeid === undefined ||
        self.StudentHomeSchooling.studentorgschoolgradeid === ""
      ) {
        this.makeToast(
          this.$t("orgschoolgradeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.personid === 0 ||
        self.StudentHomeSchooling.personid === null ||
        self.StudentHomeSchooling.personid === undefined ||
        self.StudentHomeSchooling.personid === ""
      ) {
        this.makeToast(
          this.$t("StudentNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.curriculumtypeid === 0 ||
        self.StudentHomeSchooling.curriculumtypeid === null ||
        self.StudentHomeSchooling.curriculumtypeid === undefined ||
        self.StudentHomeSchooling.curriculumtypeid === ""
      ) {
        this.makeToast(
          this.$t("curriculumtypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.enddate === 0 ||
        self.StudentHomeSchooling.enddate === null ||
        self.StudentHomeSchooling.enddate === undefined ||
        self.StudentHomeSchooling.enddate === ""
      ) {
        this.makeToast(
          this.$t("enddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentHomeSchooling.detailinfo === 0 ||
        self.StudentHomeSchooling.detailinfo === null ||
        self.StudentHomeSchooling.detailinfo === undefined ||
        self.StudentHomeSchooling.detailinfo === ""
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

      StudentHomeSchoolingService.Update(this.StudentHomeSchooling)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "StudentHomeSchooling" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    /*    GetOblastList() {
      HelperService.GetOblastList(this.lang).then(res => {
        this.oblastlist = res.data;
      });
    }, */
    /*  GetRegionList(studentoblastid) {
      this.RegionLoading = true;
      if (!!studentoblastid) {
        RegionService.GetAll(this.lang, studentoblastid).then(res => {
          this.regionlist = res.data;
          this.RegionLoading = false;
        });
      } else {
        this.regionlist = [];
        this.RegionLoading = false;
      }
    }, */
    getregionlist(oblastid, setregionlist) {
      this.RegionLoading = true;

      RegionService.GetAll(
        this.lang,
        this.StudentHomeSchooling.studentoblastid
      ).then((res) => {
        setregionlist(res.data);
        this.RegionLoading = false;
      });
    },
    getorganizationlist(regionid, setorganizationlist) {
      this.OrganizationLoading = true;

      OrganizationService.GetAll(
        this.StudentHomeSchooling.studentoblastid,
        this.StudentHomeSchooling.studentregionid
      ).then((res) => {
        setorganizationlist(res.data);
        this.OrganizationLoading = false;
      });
    },
    /*  ChangeOblast() {
      if (this.StudentHomeSchooling.studentregionid > 0) {
        this.StudentHomeSchooling.studentregionid = "";
        //this.regionlist= [];
        //this.RegionLoading  = false;
      }
      this.GetRegionList(this.StudentHomeSchooling.studentoblastid);
    }, */
    ShortNameLang() {
      this.items = this.items1;
      this.TranslateModal = true;
      this.TranslatebyName = "shortname";
      this.Translate = {};
    },
    FullNameLang() {
      this.items = this.items2;
      this.TranslateModal = true;
      this.TranslatebyName = "fullname";
      this.Translate = {};
    },
    AddItem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.StudentHomeSchoolingTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.StudentHomeSchoolingTranslatePush();
        this.items2 = this.items;
      }
      this.Translate = {};
    },
    SaveTranslate() {
      this.TranslateModal = false;
    },
    ItemsPush() {
      this.items.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
    },
    StudentHomeSchoolingTranslatePush() {
      this.StudentHomeSchooling.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
    },
    orgschoolgradechange() {
      var self = this;
      StudentManageService.GetAllInOrgSchoolGrade(
        "",
        "",
        self.StudentHomeSchooling.docdate,
        self.StudentHomeSchooling.studentschoolyearid,
        self.StudentHomeSchooling.studentorgschoolgradeid
      ).then((res) => {
        self.personlist = res.data;
      });
    },
    personchange() {
      var self = this;
      if (self.StudentHomeSchooling.studentadmissionid > 0) {
        self.StudentHomeSchooling.studentadmissionid = "";
      }
      self.StudentHomeSchooling.personname = self.personlist.filter(function (
        item
      ) {
        if (item.personid === self.StudentHomeSchooling.personid) return item;
      })[0].name;
      self.StudentHomeSchooling.studentadmissionid = self.personlist.filter(
        function (item) {
          if (item.personid === self.StudentHomeSchooling.personid) return item;
        }
      )[0].studentadmissionid;
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
  watch: {
    "StudentHomeSchooling.studentoblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          newValue;
          if (oldValue) {
            oldValue;
            this.StudentHomeSchooling.studentregionid = null;
            this.StudentHomeSchooling.studentorganizationid = null;
          }
          var self = this;
          this.getregionlist(newValue, function (data) {
            self.regionlist = data;
          });
        }
      },
    },
    "StudentHomeSchooling.studentregionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          newValue;
          if (oldValue) {
            oldValue;
            this.StudentHomeSchooling.studentregionid = null;
            this.StudentHomeSchooling.studentorganizationid = null;
          }
          var self = this;
          this.getorganizationlist(newValue, function (data) {
            self.organizationlist = data;
          });
        }
      },
    },
  },
};
</script>

<style>
</style>






