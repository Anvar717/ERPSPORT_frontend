<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SchoolAdmEStatement") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <!-- <CRow class="mb-3">
            <CCol sm="3"></CCol>
              <CCol sm="6">
                <CInput
                  :placeholder="$t('onlinequeueinfocode')"
                  :label="$t('onlinequeueinfocode')"
                  horizontal
                  v-mask="'0000-0000-0000'"
                  autocomplete="onlinequeueinfocode"
                  v-model="SchoolAdmEStatement.onlinequeueinfocode"
                >
                  <template #append>
                    <CButton
                      @click="SearchID"
                      size="sm"
                      variant="outline"
                      type="button"
                      color="primary"
                    >
                      <b-icon icon="search"></b-icon>
                      {{$t('search')}}
                    </CButton>
                  </template>
                </CInput>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow> -->
            <CRow>
              <CCol>
                <h5>
                  {{ $t("docnumber") }}:
                  <a style="color:blue">{{ SchoolAdmEStatement.docnumber }}</a>
                </h5>
              </CCol>
              <CCol>
                <h5>
                  {{ $t("docdate") }}:
                  <a style="color:blue">{{ SchoolAdmEStatement.docdate }}</a>
                </h5>
              </CCol>
              <!-- <CCol class="text-center">
                <div class="form-group form-row">
                  <h5>
                    <a>{{$t('typequota')}}: </a>
                    <a v-if="SchoolAdmEStatement.ismainquota" style="color:blue">{{$t('ismainquota')}}</a>
                    <a v-if="!SchoolAdmEStatement.ismainquota" style="color:blue">{{$t('addquota')}}</a>
                  </h5>
                  
                  
                  
                </div>
              </CCol> -->
              <!-- <CCol class="text-center">
                <div class="form-group form-row">
                  <h5>
                    <a>{{$t('ismainquota')}}</a>
                  </h5>
                  <b-form-checkbox
                    v-if="!isdisabled"
                    disabled
                    @input="getquote"
                    class="col-sm-4"
                    v-model="SchoolAdmEStatement.ismainquota"
                    name="check-button1"
                    switch
                  ></b-form-checkbox>
                  <b-form-checkbox
                    v-if="isdisabled"
                    @input="getquote"
                    class="col-sm-4"
                    v-model="SchoolAdmEStatement.ismainquota"
                    name="check-button1"
                    switch
                  ></b-form-checkbox>
                </div>
              </CCol> -->
              <CCol class="text-center">
                <div class="form-group form-row">
                  <h5>
                    <a>{{ $t("islowincomefamily") }}</a>
                  </h5>
                  <b-form-checkbox
                    class="col-sm-4"
                    v-model="SchoolAdmEStatement.islowincomefamily"
                    name="check-button1"
                    switch
                  ></b-form-checkbox>
                </div>
              </CCol>
              <CCol class="text-center">
                <div class="form-group form-row">
                  <h5>
                    <a>{{ $t("ismainquota") }}</a>
                  </h5>
                  <b-form-checkbox
                    class="col-sm-4"
                    v-model="SchoolAdmEStatement.ismainquota"
                    name="check-button1"
                    switch
                  ></b-form-checkbox>
                </div>
              </CCol>
            </CRow>
            <CRow class="mt-4">
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="SchoolYear"
                  rules="required"
                >
                  <h5>
                    <a>{{ $t("SchoolYear") }}</a>
                  </h5>
                  <v-select
                    disabled
                    :options="schoolyearlist"
                    v-model="SchoolAdmEStatement.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="getquote"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="educationlanguage"
                  rules="required"
                >
                  <h5>
                    <a>{{ $t("educationlanguage") }}</a>
                  </h5>
                  <v-select
                    :options="EducationLanguageList"
                    v-model="SchoolAdmEStatement.educationlanguageid"
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
              <!-- <CCol sm="2">
                <label></label>
                <h5>
                  {{$t('quota')}}:
                  <a style="color:blue">{{statistica.quota}}</a>
                </h5>
              </CCol>
              <CCol sm="2">
                <label></label>
                <h5>
                  {{$t('docreseivedcount')}}:
                  <a style="color:blue">{{statistica.docreseivedcount}}</a>
                </h5>
              </CCol>
              <CCol sm="2">
                <label></label>
                <h5>
                  {{$t('docbroncount')}}:
                  <a style="color:blue">{{statistica.docbroncount}}</a>
                </h5>
              </CCol>
              <CCol sm="2">
                <label></label>
                <h5>
                  {{$t('vacancy')}}:
                  <a style="color:blue">{{statistica.vacancy}}</a>
                </h5>
              </CCol> -->
            </CRow>
            <CRow class="mt-4">
              <CCol sm="12" md="8">
                <h5>
                  <a>{{ $t("detailinfo") }}</a>
                </h5>
                <CInput
                  :placeholder="$t('detailinfo')"
                  autocomplete="detailinfo"
                  v-model="SchoolAdmEStatement.detailinfo"
                ></CInput>
              </CCol>
              <CCol sm="12" md="4">
                <!-- <h5>
                  <a>{{$t('diseases')}}</a>
                </h5>
                <CInput
                  :placeholder="$t('diseases')"
                  autocomplete="diseases"
                  v-model="SchoolAdmEStatement.diseases"
                ></CInput> -->
              </CCol>
            </CRow>

            <CRow class="mt-4">
              <CCol>
                <edit-person-component
                  :show-back-button="false"
                  :show-save-button="false"
                  :person-data="SchoolAdmEStatement.person"
                  :person-type-id="1"
                  ref="personcomp"
                  @persondatachange="persondatachange($event)"
                ></edit-person-component>
              </CCol>
            </CRow>
            <CRow class="mt-4">
              <CCol>
                <div class="text-left">
                  <CButton
                    class="ml-4"
                    size="sm"
                    color="danger"
                    @click="
                      $router.push({
                        name: 'SchoolAdmEStatement',
                        query: { schoolyear: $route.query.schoolyear },
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
                    v-if="SchoolAdmEStatement.CanSave"
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
          </ValidationObserver>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import HelperService from "@/services/helper.service";
import SchoolAdmEStatementService from "@/services/SchoolAdmEStatement.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
export default {
  components: { editPersonComponent },
  data() {
    return {
      SaveLoading: false,
      checkpersondata: false,
      SchoolAdmEStatement: {
        person: {
          familyname: "",
          firstname: "",
          lastname: "",
          dateofbirth: "",
          genderid: "",
          nationalityid: "",
          citizenshipid: "",
          inn: "",
          pinfl: "",
          contactinfo: "",
          birthcountryid: "",
          birthoblastid: "",
          birthregionid: "",
          birthmfyid: "",
          birthaddress: "",
          persontypeid: 1,
          PersonRelativeTables: [],
          LivePlaceTables: [],
          DocumentTables: [],
        },
        // code: "",
        // shortname: "",
        // fullname: "",
        // Translates: []
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
      isdisabled: this.$can(
        "SchoolAdmEStatementAdditionalQuota",
        "permissions"
      ),
      statistica: {
        quota: 0,
        docreseivedcount: 0,
        docbroncount: 0,
        vacancy: 0,
      },
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      toastCount: 0,
      allSignupErrors: {},
      EducationLanguageList: [],
      Description: "",
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    /* OrganizationService.GetAll().then(res => {
      this.organizationlist = res.data;
    }); */
    HelperService.GetOblastList().then((res) => {
      this.oblastlist = res.data;
    });

    SchoolAdmEStatementService.Get(this.$route.params.id, "").then((res) => {
      this.SchoolAdmEStatement = res.data;
      this.getquote();
    });
    EducationLanguageService.GetAll().then((res) => {
      this.EducationLanguageList = res.data;
    });
    /* this.GetOblastList(); */
  },
  methods: {
    SearchID() {
      if (!this.SchoolAdmEStatement.onlinequeueinfocode) {
        this.makeToast(this.$t("FillIDCode"), this.$t("message"), "danger");
      } else {
        SchoolAdmEStatementService.Get(
          0,
          this.SchoolAdmEStatement.onlinequeueinfocode
        )
          .then((res) => {
            this.SchoolAdmEStatement.person = res.data.person;
            this.SchoolAdmEStatement.ismainquota = res.data.ismainquota;
            this.getquote();
            this.makeToast(
              this.$t("SuccessFillAllInfo"),
              this.$t("message"),
              "success"
            );
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
      }
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    persondatachange(data) {
      this.SchoolAdmEStatement.person = data;
    },
    getquote() {
      var self = this;
      self.statistica = {
        quota: 0,
        docreseivedcount: 0,
        docbroncount: 0,
        vacancy: 0,
      };
      if (
        self.SchoolAdmEStatement.schoolyearid > 0 &&
        self.SchoolAdmEStatement.educationlanguageid > 0
      )
        SchoolAdmEStatementService.SchoolAdmEStatementsStatus(
          self.SchoolAdmEStatement.schoolyearid,
          self.SchoolAdmEStatement.educationlanguageid,
          self.SchoolAdmEStatement.ismainquota
        ).then((res) => {
          self.statistica.quota = self.SchoolAdmEStatement.ismainquota
            ? res.data.mainquota
            : res.data.additionalquota;
          self.statistica.docreseivedcount = res.data.docreseivedcount;
          self.statistica.docbroncount = res.data.docbroncount;
          self.statistica.vacancy =
            self.statistica.quota -
            (self.statistica.docreseivedcount + self.statistica.docbroncount);
          if (self.statistica.quota === 0) {
            this.makeToast(this.$t("NotQuote"), this.$t("Error"), "danger");
            return false;
          }
        });
      /* if( self.SchoolAdmEStatement.schoolyearid>0 && self.SchoolAdmEStatement.educationlanguageid>0)
      SchoolAdmissionQuotaService.GetLastSchoolAdmissionQuota(self.SchoolAdmEStatement.schoolyearid, self.SchoolAdmEStatement.educationlanguageid).then(res => {
       if(res.data.length>0){
          self.statistica.quota = self.SchoolAdmEStatement.ismainquota? res.data.filter(function(item) {
            if (item.educationlanguageid === self.SchoolAdmEStatement.educationlanguageid) return item;
          })[0].mainquota: res.data.filter(function(item) {
            if (item.educationlanguageid === self.SchoolAdmEStatement.educationlanguageid) return item;
          })[0].additionalquota

         
          
       }
       else{
         this.makeToast(
          this.$t("NotQuote"),
          this.$t("Error"),
          "danger"
        );
        return false;
       } */

      //})
    },
    check() {
      var self = this;
      if (!this.$refs.personcomp.check()) {
        return false;
      }
      if (
        self.SchoolAdmEStatement.docnumber === 0 ||
        self.SchoolAdmEStatement.docnumber === null ||
        self.SchoolAdmEStatement.docnumber === undefined ||
        self.SchoolAdmEStatement.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmEStatement.docdate === 0 ||
        self.SchoolAdmEStatement.docdate === null ||
        self.SchoolAdmEStatement.docdate === undefined ||
        self.SchoolAdmEStatement.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmEStatement.schoolyearid === 0 ||
        self.SchoolAdmEStatement.schoolyearid === null ||
        self.SchoolAdmEStatement.schoolyearid === undefined ||
        self.SchoolAdmEStatement.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("studentschoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmEStatement.educationlanguageid === 0 ||
        self.SchoolAdmEStatement.educationlanguageid === null ||
        self.SchoolAdmEStatement.educationlanguageid === undefined ||
        self.SchoolAdmEStatement.educationlanguageid === ""
      ) {
        this.makeToast(
          this.$t("educationlanguageNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      SchoolAdmEStatementService.Get(
        0,
        this.SchoolAdmEStatement.onlinequeueinfocode
      ).then((res) => {
        if (
          this.SchoolAdmEStatement.person.familyname !==
          res.data.person.familyname
        ) {
          this.makeToast(this.$t("Conflict"), this.$t("Error"), "danger");
          return false;
        }
      });
      /* if (
        self.SchoolAdmEStatement.detailinfo === 0 ||
        self.SchoolAdmEStatement.detailinfo === null ||
        self.SchoolAdmEStatement.detailinfo === undefined ||
        self.SchoolAdmEStatement.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmEStatement.diseases === 0 ||
        self.SchoolAdmEStatement.diseases === null ||
        self.SchoolAdmEStatement.diseases === undefined ||
        self.SchoolAdmEStatement.diseases === ""
      ) {
        this.makeToast(
          this.$t("diseasesNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }

      SchoolAdmEStatementService.Update(this.SchoolAdmEStatement)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "SchoolAdmEStatement" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
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
  watch: {},
};
</script>

<style>
@media (min-width: 1200px) {
  .modal-xl {
    max-width: 90% !important;
  }
}
@media (min-width: 992px) {
  .modal-lg {
    max-width: auto !important;
  }
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 90% !important;
  }
}
</style>
