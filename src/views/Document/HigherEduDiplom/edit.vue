<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("HigherEduDiplom") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <b-row >
              <b-col sm="12" md="6">
                <div class="form-group form-row">
                    <label
                      class="col-form-label col-sm-3"
                      >{{ $t("personname") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                       <b-input-group>
                  <b-form-input
                    disabled
                    :placeholder="$t('personname')"
                    autocomplete="personname"
                    :label="$t('personname')"
                    horizontal
                    v-model="HigherEduDiplom.personname"
                  />
                  <b-input-group-append>
                    <b-button @click="OpenEmployeeModal" variant="primary">
                      <b-icon icon="three-dots" />
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
                    </div>
                  </div>
              </b-col>
               <b-col sm="12" md="4">
                 <div class="form-group form-row">
                    <label  class="col-form-label col-sm-3">{{
                  $t("pinfl")
                }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <b-input
                  disabled
                  autocomplete="text"
                  horizontal
                  :placeholder="$t('pinfl')"
                  v-model="HigherEduDiplom.pinfl"
                >
                </b-input>
                    </div>
                  </div>
              </b-col>
            </b-row>
            <b-row class="m-2">
              <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("otmcurrentname")
                }}</label>
                <v-select
                  :options="universitylist"
                  v-model="HigherEduDiplom.otmcurrentid"
                  @input="ChangeOtmCurrent"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name_uz"
                ></v-select>
              </b-col>
                <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("faculty")
                }}</label>
                <v-select
                  :options="facultylist"
                  @input="changefaculty()"
                  v-model="HigherEduDiplom.facultyid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name_uz"
                ></v-select>
              </b-col>
               <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("facultycode")
                }}</label>
                <b-input
                  autocomplete="text"
                  horizontal
                  :placeholder="$t('facultycode')"
                  v-model="HigherEduDiplom.facultycode"
                >
                </b-input>
              </b-col>
            </b-row>
            <b-row class="m-2">
              <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("diplomaserial")
                }}</label>
                <b-input
                  autocomplete="text"
                  horizontal
                   :placeholder="$t('diplomaserial')"
                  v-model="HigherEduDiplom.diplomaserial"
                >
                </b-input>
              </b-col>
              <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("diplomanumber")
                }}</label>
                <b-input
                  autocomplete="text"
                  horizontal
                   :placeholder="$t('diplomanumber')"
                  v-model="HigherEduDiplom.diplomanumber"
                >
                </b-input>
              </b-col>
              <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("formofeducation")
                }}</label>
                <b-input
                  autocomplete="text"
                  horizontal
                  :placeholder="$t('formofeducation')"
                  v-model="HigherEduDiplom.formofeducation"
                >
                </b-input>
              </b-col>
            </b-row>
            <b-row class="m-2">
               <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("education")
                }}</label>
                <!-- <b-input
                  autocomplete="text"
                  horizontal
                  :placeholder="$t('education')"
                  v-model="HigherEduDiplom.education"
                >
                </b-input> -->
                 <v-select
                  :options="educationlanguagelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="HigherEduDiplom.education"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("educationstarteddate")
                }}</label>
                <date-picker
                  style="width: 100%"
                  v-model="HigherEduDiplom.educationstarteddate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </b-col>
              <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("diplomagivendate")
                }}</label>
                <date-picker
                  v-model="HigherEduDiplom.diplomagivendate"
                  size="sm"
                  style="width: 100%"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </b-col>
            </b-row>
            <b-row class="m-2">
              <b-col sm="12" md="4">
                <label class="col-form-label col-sm-10">{{
                  $t("privilegeddiploma")
                }}</label>
                <b-checkbox
                  v-model="HigherEduDiplom.privilegeddiploma"
                ></b-checkbox>
              </b-col>
            </b-row>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'HigherEduDiplom' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
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
          id="modalXl"
          no-close-on-backdrop
          size="xl"
          :title="$t('Person')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            @SelectedItem="SelectedItem"
            @DblClick="AddPersonData"
          ></person-list>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEmployeeModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPersonData(personvalue)">
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
import SchoolSubjectService from "@/services/SchoolSubject.service";
import HigherEduDiplomService from "@/services/higheredudiplom.service";
import AppointQualCategoryService from "@/services/AppointQualCategory.service";
import PersonList from "@/components/PersonList";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import GetEmployeeListComponent from "@/components/GetEmployeeListComponent.vue";
import EducationLanguageService from "@/services/EducationLanguage.service";
export default {
  components: { PersonList, GetEmployeeListComponent},
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      HigherEduDiplom: {},
      selectedrowid: 0,
      ownerid: 0,
      personid: 0,
      schoolsubjectid: 0,
      qualificationcategoryid: 0,
      startdate: 0,
      enddate: 0,
      fillLoading: false,
      isFill: false,
      editedIndex: -1,
      personloading: false,
      innofPerson: "",
      NotFoundPerson: true,
      personvalue: {},
      DocumentSeriesList: [],
      educationlanguagelist:[],
      RegionList: [],
      OrganizationList: [],
      otmcurrentlist : [],
      OblastList: [],
      universitylist: [],
      facultylist: [],
      lang: localStorage.getItem("locale") || "ru",
      GetFromDbTsLoading: false,
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HigherEduDiplomService.Get(self.selectedrowid).then((res) => {
      self.HigherEduDiplom = res.data;
      self.ChangeOblast();
      self.ChangeRegion();
      if (!!self.HigherEduDiplom.otmcurrentid) {
        HigherEduDiplomService.GetInstitutsFaculties(self.HigherEduDiplom.otmcurrentid).then((res) => {
      self.facultylist = res.data;
    });}
    });
    HigherEduDiplomService.GetInstituts().then((res) => {
      self.universitylist = res.data;
    });
    EducationLanguageService.GetAll().then(res => {
      self.educationlanguagelist = res.data;
    });
    OblastService.GetAll().then((res) => {
      self.OblastList = res.data;
    });
  },
  methods: {
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      
      this.$bvModal.hide("modalXl");
    },
     changefaculty(){
     this.HigherEduDiplom.facultyname = this.facultylist.filter(
          (item) => item.id == this.HigherEduDiplom.facultyid
        )[0].name_uz;
     },
    GetInfoQual(pinfl, documentseries, documentnumber) {
      var self = this
      AppointQualCategoryService.Get(
        0,
        pinfl,
        documentseries,
        documentnumber
      ).then((res) => {
        self.HigherEduDiplom = res.data;
      });
    },
    AddPersonData(data) {
      this.CloseEmployeeModal();
      this.HigherEduDiplom.personid = data.id;
      this.HigherEduDiplom.personname = data.fullname;
      this.HigherEduDiplom.pinfl = data.pinfl;
    //  this.HigherEduDiplom.personname = data.fullname;
    },
    persondata() {
      var self = this
      this.GetFromDbTsLoading = true
       var personname = this.HigherEduDiplom.personname
      AppointQualCategoryService.GetFromDbTs(
        this.HigherEduDiplom.documentseries,
        this.HigherEduDiplom.documentnumber,
        this.HigherEduDiplom.ondate,
        this.HigherEduDiplom.personid
      )
        .then((res) => {
          this.GetFromDbTsLoading = false
          self.HigherEduDiplom = res.data;
          this.HigherEduDiplom.personname = personname
          this.HigherEduDiplom.ondate = res.data.startdate
        })
        .catch((error) => {
          this.GetFromDbTsLoading = false
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
        });
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl");
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    AddPerson() {
      this.showModal("createModal", true);
    },
    ChangeOtmCurrent(){
          this.HigherEduDiplom.otmcurrentname = this.universitylist.filter(
          (item) => item.id ==this.HigherEduDiplom.otmcurrentid
        )[0].name_uz;
      this.HigherEduDiplom.facultyid = "";
      if (!!this.HigherEduDiplom.otmcurrentid) {
        HigherEduDiplomService.GetInstitutsFaculties(this.HigherEduDiplom.otmcurrentid).then((res) => {
      this.facultylist = res.data;
    });
      }
    },
    
    ChangeOblast() {
      this.HigherEduDiplom.regionid = "";
      this.HigherEduDiplom.organizationid = "";
      if (!!this.HigherEduDiplom.oblastid) {
        RegionService.GetAll(this.lang, this.HigherEduDiplom.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.HigherEduDiplom.organizationid = "";
      if (!!this.HigherEduDiplom.regionid) {
        OrganizationService.GetAll(this.HigherEduDiplom.oblastid, this.HigherEduDiplom.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
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
    check() {
      var self = this;
      if (
        self.HigherEduDiplom.personname === 0 ||
        self.HigherEduDiplom.personname === null ||
        self.HigherEduDiplom.personname === undefined ||
        self.HigherEduDiplom.personname === ""
      ) {
        this.makeToast(
          this.$t("personNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.pinfl === 0 ||
        self.HigherEduDiplom.pinfl === null ||
        self.HigherEduDiplom.pinfl === undefined ||
        self.HigherEduDiplom.pinfl === ""
      ) {
        this.makeToast(
          this.$t("pinflNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.otmcurrentid === 0 ||
        self.HigherEduDiplom.otmcurrentid === null ||
        self.HigherEduDiplom.otmcurrentid === undefined ||
        self.HigherEduDiplom.otmcurrentid === ""
      ) {
        this.makeToast(
          this.$t("otmcurrentNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.facultyid === 0 ||
        self.HigherEduDiplom.facultyid === null ||
        self.HigherEduDiplom.facultyid === undefined ||
        self.HigherEduDiplom.facultyid === ""
      ) {
        this.makeToast(
          this.$t("facultyNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.facultycode === 0 ||
        self.HigherEduDiplom.facultycode === null ||
        self.HigherEduDiplom.facultycode === undefined ||
        self.HigherEduDiplom.facultycode === ""
      ) {
        this.makeToast(
          this.$t("facultycodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.diplomaserial === 0 ||
        self.HigherEduDiplom.diplomaserial === null ||
        self.HigherEduDiplom.diplomaserial === undefined ||
        self.HigherEduDiplom.diplomaserial === ""
      ) {
        this.makeToast(
          this.$t("diplomaserialNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.formofeducation === 0 ||
        self.HigherEduDiplom.formofeducation === null ||
        self.HigherEduDiplom.formofeducation === undefined ||
        self.HigherEduDiplom.formofeducation === ""
      ) {
        this.makeToast(
          this.$t("formofeducationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.education === 0 ||
        self.HigherEduDiplom.education === null ||
        self.HigherEduDiplom.education === undefined ||
        self.HigherEduDiplom.education === ""
      ) {
        this.makeToast(
          this.$t("educationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.diplomanumber === 0 ||
        self.HigherEduDiplom.diplomanumber === null ||
        self.HigherEduDiplom.diplomanumber === undefined ||
        self.HigherEduDiplom.diplomanumber === ""
      ) {
        this.makeToast(
          this.$t("diplomanumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.educationstarteddate === 0 ||
        self.HigherEduDiplom.educationstarteddate === null ||
        self.HigherEduDiplom.educationstarteddate === undefined ||
        self.HigherEduDiplom.educationstarteddate === ""
      ) {
        this.makeToast(
          this.$t("educationstarteddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.diplomagivendate === 0 ||
        self.HigherEduDiplom.diplomagivendate === null ||
        self.HigherEduDiplom.diplomagivendate === undefined ||
        self.HigherEduDiplom.diplomagivendate === ""
      ) {
        this.makeToast(
          this.$t("diplomagivendateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduDiplom.privilegeddiploma === 0 ||
        self.HigherEduDiplom.privilegeddiploma === null ||
        self.HigherEduDiplom.privilegeddiploma === undefined ||
        self.HigherEduDiplom.privilegeddiploma === ""
      ) {
        this.makeToast(
          this.$t("privilegeddiplomaNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.HigherEduDiplom.facultyid === null ||
      //   self.HigherEduDiplom.facultyid === undefined ||
      //   self.HigherEduDiplom.facultyid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("detailinfoNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      return true;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }

      HigherEduDiplomService.Update(self.HigherEduDiplom)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HigherEduDiplom" });
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

<style></style>
