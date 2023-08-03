<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("StudentSchoolMovement") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'StudentSchoolMovement',query : { Search : $route.query.Search } })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol sm="2">
                    <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                      <CInput
                        :placeholder="$t('docnumber')"
                        autocomplete="docnumber"
                        :label="$t('docnumber')"
                        v-model="StudentSchoolMovement.docnumber"
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
                        v-model="StudentSchoolMovement.docdate"
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
                  <CCol sm="8">
                    <ValidationProvider v-slot="v" name="detailinfo" rules="required|max:9">
                      <CInput
                        :placeholder="$t('detailinfo')"
                        :label="$t('detailinfo')"
                        autocomplete="detailinfo"
                        v-model="StudentSchoolMovement.detailinfo"
                        :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                      ></CInput>
                    </ValidationProvider>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            <CCard sm="12">
              <CCardHeader>
                <strong>{{$t('fromorganizationdata')}}</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol sm="2">
                    <div class="form-group form-row">
                      <label>{{$t('fromoblast')}}</label>
                      <span
                        style="color:blue;height:32px;vertical-align:middle"
                        class="form-control"
                      >{{StudentSchoolMovement.fromoblastname}}</span>
                    </div>
                  </CCol>
                  <CCol sm="2">
                    <label>{{$t('fromregion')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromregionname}}</span>
                  </CCol>
                  <CCol sm="4">
                    <label>{{$t('fromorganization')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromorganizationname}}</span>
                  </CCol>
                  <CCol sm="4">
                    <label>{{$t('fromdirector')}}</label>
                    <br />
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromdirector}}</span>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="2">
                    <label>{{ $t("fromschoolyear") }}</label>
                    <v-select
                      :options="schoolyearlist"
                      v-model="StudentSchoolMovement.fromschoolyearid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="fromschoolyearchange"
                    ></v-select>
                  </CCol>
                  <CCol sm="2">
                    <div v-if="StudentSchoolMovement.CanSave">
                      <label>{{ $t("fromorgschoolgrade") }}</label>
                      <v-select
                        :options="orgschoolgradelist"
                        v-model="StudentSchoolMovement.fromorgschoolgradeid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="fromorgschoolgradechange"
                      ></v-select>
                    </div>
                    <div v-if="!StudentSchoolMovement.CanSave">
                      <label>{{$t('fromorgschoolgrade')}}</label>
                      <span
                        style="color:blue;height:32px"
                        class="form-control"
                      >{{StudentSchoolMovement.fromorgschoolgradename}}</span>
                    </div>
                  </CCol>
                  <CCol sm="4">
                    <div v-if="StudentSchoolMovement.CanSave">
                      <label>{{ $t("StudentPerson") }}</label>
                      <v-select
                        @input="frompersonchange"
                        :options="personlist"
                        v-model="StudentSchoolMovement.frompersonid"
                        :reduce="(item) => item.personid"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      ></v-select>
                    </div>
                    <div v-if="!StudentSchoolMovement.CanSave">
                      <label>{{$t('StudentPerson')}}</label>
                      <span
                        style="color:blue;height:32px"
                        class="form-control"
                      >{{StudentSchoolMovement.frompersonname}}</span>
                    </div>
                  </CCol>
                  <CCol sm="4">
                    <CInput
                      disabled
                      :label="$t('FromStudentAdmissionid')"
                      autocomplete="text"
                      v-model="StudentSchoolMovement.fromstudentadmissionid"
                    ></CInput>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            <CCard sm="6">
              <CCardHeader>
                <strong>{{$t('toorganizationdata')}}</strong>
              </CCardHeader>
              <CCardBody>
                <CRow class="mb-2">
                  <CCol sm="3">
                    
                      <label>{{$t('tooblast')}}</label>
                      <v-select
                        @input="ChangeOblast"
                        :options="oblastlist"
                        v-model="StudentSchoolMovement.tooblastid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      ></v-select>
                  </CCol>
                  <CCol sm="3">
                    <label>{{$t('toregion')}}</label>
                    <v-select
                      @input="ChangeRegion"
                      :options="regionlist"
                      v-model="StudentSchoolMovement.toregionid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>
                  <CCol sm="6">
                    <label>{{$t('toorganization')}}</label>
                    <v-select
                      @input="toorganizationchange"
                      :options="organizationlist"
                      v-model="StudentSchoolMovement.toorganizationid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="shortname"
                    ></v-select>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm="6">
                    <ValidationProvider v-slot="v" name="todirector" rules="required">
                      <CInput
                        :placeholder="$t('todirector')"
                        :label="$t('todirector')"
                        autocomplete="todirector"
                        v-model="StudentSchoolMovement.todirector"
                        :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                      ></CInput>
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="6">
                    <ValidationProvider v-slot="v" name="tocontactinfo" rules="required">
                      <CInput
                        :placeholder="$t('tocontactinfo')"
                        :label="$t('tocontactinfo')"
                        autocomplete="tocontactinfo"
                        v-model="StudentSchoolMovement.tocontactinfo"
                        :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                      ></CInput>
                    </ValidationProvider>
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
                @click="$router.push({ name: 'StudentSchoolMovement',query : { Search : $route.query.Search } })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="StudentSchoolMovement.CanSave"
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
// import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolYearService from "@/services/SchoolYear.service";
import StudentSchoolMovementService from "@/services/StudentSchoolMovement.service";
// import PersonService from "@/services/person.service";
import RegionService from "@/services/Region.service";
import OblastService from "@/services/Oblast.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import OrganizationService from "@/services/organization.service";
import HelperService from "@/services/helper.service";
import StudentManageService from "@/services/StudentManage.service";

export default {
  data() {
    return {
      SaveLoading: false,
      StudentSchoolMovement: {
        docdate: "",
        docnumber: "",
        fromoblastname: "",
        fromregionname: "",
        fromorganizationname: "",
        fromdirector: "",
        fromschoolyearid: 0,
        fromorgschoolgradeid: 0,
        frompersonid: 0,
        tooblastid: 0,
        toregionid: 0,
        toorganizationid: 0,
        todirector: "",
        tocontactinfo: "",
        detailinfo: ""
      },

      orgschoolgradelist: [],
      organizationlist: [],
      oblastlist: [],
      regionlist: [],
      personlist: [],
      schoolyearlist: [],

      toastCount: 0,
      allSignupErrors: {},
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    var self = this;

    SchoolYearService.GetAll().then(res => {
      this.schoolyearlist = res.data;
    });

    OrgSchoolGradeService.GetAll().then(res => {
      this.orgschoolgradelist = res.data;
    });
    StudentSchoolMovementService.Get(this.$route.params.id).then(res => {
      this.StudentSchoolMovement = res.data;
      this.GetOblastList();
      this.GetRegionList(this.StudentSchoolMovement.tooblastid);
      this.getorganizationlist(
        this.StudentSchoolMovement.tooblastid,
        this.StudentSchoolMovement.toregionid
      );
      this.fromschoolyearchange();
    });
  },
  methods: {
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    GetOblastList() {
      HelperService.GetOblastList().then(res => {
        this.oblastlist = res.data;
      });
    },
    GetRegionList(oblastid) {
      if (!!oblastid) {
        RegionService.GetAll(this.lang,oblastid).then(res => {
          this.regionlist = res.data;
        });
      } else {
        this.regionlist = [];
      }
    },

    ChangeOblast() {
      if (this.StudentSchoolMovement.toregionid > 0) {
        this.StudentSchoolMovement.toregionid = "";
        this.StudentSchoolMovement.toorganizationid = "";
      }
      this.GetRegionList(this.StudentSchoolMovement.tooblastid);
    },
    ChangeRegion() {
      if (this.StudentSchoolMovement.toorganizationid > 0) {
        this.StudentSchoolMovement.toorganizationid = "";
      }
      this.getorganizationlist(
        this.StudentSchoolMovement.tooblastid,
        this.StudentSchoolMovement.toregionid
      );
    },

    getorganizationlist(oblastid, regionid) {
      var self = this;

      if (
        self.StudentSchoolMovement.tooblastid > 0 &&
        self.StudentSchoolMovement.toregionid > 0
      ) {
        OrganizationService.GetAll(oblastid, regionid).then(res => {
          this.organizationlist = res.data;
        });
      } else {
        this.organizationlist = [];
      }
    },

    toorganizationchange() {
      var self = this;

      if (
        this.StudentSchoolMovement.todirector !== "" ||
        this.StudentSchoolMovement.tocontactinfo !== ""
      ) {
        self.StudentSchoolMovement.todirector = null;
        self.StudentSchoolMovement.tocontactinfo = null;
      }
      if (self.StudentSchoolMovement.toorganizationid > 0) {
        self.StudentSchoolMovement.todirector = self.organizationlist.filter(
          function(item) {
            if (item.id === self.StudentSchoolMovement.toorganizationid)
              return item;
          }
        )[0].director;
        self.StudentSchoolMovement.tocontactinfo = self.organizationlist.filter(
          function(item) {
            if (item.id === self.StudentSchoolMovement.toorganizationid)
              return item;
          }
        )[0].contactinfo;
      }
    },
    fromschoolyearchange() {
      var self = this;
      StudentManageService.GetAllInOrgSchoolGrade(
        "",
        "",
        self.StudentSchoolMovement.docdate,
        self.StudentSchoolMovement.fromschoolyearid,
        self.StudentSchoolMovement.fromorgschoolgradeid
      ).then(res => {
        self.personlist = res.data;
      });
    },
    fromorgschoolgradechange() {
      var self = this;
      self.fromschoolyearchange();
    },

    frompersonchange() {
      var self = this;
      if (self.StudentSchoolMovement.fromstudentadmissionid > 0) {
        self.StudentSchoolMovement.fromstudentadmissionid = "";
      }
      self.StudentSchoolMovement.frompersonname = self.personlist.filter(
        function(item) {
          if (item.personid === self.StudentSchoolMovement.frompersonid)
            return item;
        }
      )[0].name;
      self.StudentSchoolMovement.fromstudentadmissionid = self.personlist.filter(
        function(item) {
          if (item.personid === self.StudentSchoolMovement.frompersonid)
            return item;
        }
      )[0].studentadmissionid;

      HelperService.GetEmployeeEnrolment(
        self.StudentSchoolMovement.frompersonid
      ).then(res => {
        if (!!res.data && res.data.length > 0) {
          self.StudentSchoolMovement.fromstudentadmissionid =
            res.data[0].employeeenrolmentid;
        }
      });
    },
    schoolyearchange() {
      var self = this;
      self.StudentSchoolMovement.schoolyearname = self.schoolyearlist.filter(
        function(item) {
          if (item.id === self.StudentSchoolMovement.schoolyearid) return item;
        }
      )[0].name;
      (self.StudentSchoolMovement.schoolyearname);
    },
    curriculumtypechange() {
      var self = this;
      self.StudentSchoolMovement.curriculumtypename = self.curriculumtypelist.filter(
        function(item) {
          if (item.id === self.StudentSchoolMovement.curriculumtypeid)
            return item;
        }
      )[0].name;
      (self.StudentSchoolMovement.curriculumtypename);
    },

    check() {
      var self = this;
      if (
        self.StudentSchoolMovement.docnumber === null ||
        self.StudentSchoolMovement.docnumber === undefined ||
        self.StudentSchoolMovement.docnumber === 0 ||
        self.StudentSchoolMovement.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.StudentSchoolMovement.docdate === null ||
        self.StudentSchoolMovement.docdate === undefined ||
        self.StudentSchoolMovement.docdate === 0 ||
        self.StudentSchoolMovement.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.fromschoolyearid === null ||
        self.StudentSchoolMovement.fromschoolyearid === undefined ||
        self.StudentSchoolMovement.fromschoolyearid === 0 ||
        self.StudentSchoolMovement.fromschoolyearid === ""
      ) {
        this.makeToast(
          this.$t("fromschoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.fromorgschoolgradeid === null ||
        self.StudentSchoolMovement.fromorgschoolgradeid === undefined ||
        self.StudentSchoolMovement.fromorgschoolgradeid === 0 ||
        self.StudentSchoolMovement.fromorgschoolgradeid === ""
      ) {
        this.makeToast(
          this.$t("fromorgschoolgradeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.frompersonid === null ||
        self.StudentSchoolMovement.frompersonid === undefined ||
        self.StudentSchoolMovement.frompersonid === 0 ||
        self.StudentSchoolMovement.frompersonid === ""
      ) {
        this.makeToast(
          this.$t("fromstudentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.tooblastid === null ||
        self.StudentSchoolMovement.tooblastid === undefined ||
        self.StudentSchoolMovement.tooblastid === 0 ||
        self.StudentSchoolMovement.tooblastid === ""
      ) {
        this.makeToast(
          this.$t("tooblastNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.toregionid === null ||
        self.StudentSchoolMovement.toregionid === undefined ||
        self.StudentSchoolMovement.toregionid === 0 ||
        self.StudentSchoolMovement.toregionid === ""
      ) {
        this.makeToast(
          this.$t("toregionidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.toorganizationid === null ||
        self.StudentSchoolMovement.toorganizationid === undefined ||
        self.StudentSchoolMovement.toorganizationid === 0 ||
        self.StudentSchoolMovement.toorganizationid === ""
      ) {
        this.makeToast(
          this.$t("toorganizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.todirector === null ||
        self.StudentSchoolMovement.todirector === undefined ||
        self.StudentSchoolMovement.todirector === 0 ||
        self.StudentSchoolMovement.todirector === ""
      ) {
        this.makeToast(
          this.$t("todirectorNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentSchoolMovement.tocontactinfo === null ||
        self.StudentSchoolMovement.tocontactinfo === undefined ||
        self.StudentSchoolMovement.tocontactinfo === 0 ||
        self.StudentSchoolMovement.tocontactinfo === ""
      ) {
        this.makeToast(
          this.$t("tocontactinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      StudentSchoolMovementService.Update(self.StudentSchoolMovement)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "StudentSchoolMovement",
            query : { Search : this.$route.query.Search }
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