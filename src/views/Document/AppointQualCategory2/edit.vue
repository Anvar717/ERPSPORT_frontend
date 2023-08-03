<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">
                {{ $t("AppointQualCategoryName") }} - ({{
                  $route.query.sportqualspecialtyName
                }})
              </h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label for="v" class="col-form-label col-sm-3">{{
                    $t("docnumber")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      :placeholder="$t('docnumber')"
                      disabled
                      autocomplete="docnumber"
                      horizontal
                      v-model="AppointQualCategory.docnumber"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("ihmovementdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="AppointQualCategory.docdate"
                        style="width: 100%"
                        size="sm"
                        disabled
                        lang="ru"
                        :placeholder="$t('ihmovementdate')"
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
              <!-- <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("personname")
                  }}</label>
                  <div class="col-sm-9">
                    <b-input-group>
                      <b-form-input
                        disabled
                        :placeholder="$t('personname')"
                        autocomplete="personname"
                        :label="$t('personname')"
                        horizontal
                        v-model="AppointQualCategory.personname"
                      />
                      <b-input-group-append>
                        <b-button @click="OpenEmployeeModal" variant="primary">
                          <b-icon icon="three-dots" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol> -->
              <!-- <CCol sm="12" md="6" v-if="!$can('AdminView', 'permissions')">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("search")
                  }}</label>
                  <div class="col-sm-9">
                    <b-input-group>
                      <b-select
                        :options="DocumentSeriesList"
                        v-model="AppointQualCategory.documentseries"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      />

                      <b-form-input
                        :placeholder="$t('documentnumber')"
                        autocomplete="documentnumber"
                        horizontal
                        v-model="AppointQualCategory.documentnumber"
                      />

                      <b-input-group-append>
                        <date-picker
                          v-model="AppointQualCategory.ondate"
                          style="width: 100%"
                          size="mm"
                          lang="ru"
                          :placeholder="$t('ondate')"
                          value-type="format"
                          format="DD.MM.YYYY"
                        />
                      </b-input-group-append>
                      <b-input-group-append>
                        <b-button @click="persondata" variant="primary">
                          <b-icon v-if="!GetFromDbTsLoading" icon="search" />
                          <b-spinner v-if="GetFromDbTsLoading" small>
                          </b-spinner>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol> -->
            </CRow>
            <CRow>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("personname")
                  }}</label>
                  <div class="col-sm-9">
                    <b-input-group>
                      <b-form-input
                        disabled
                        :placeholder="$t('personname')"
                        autocomplete="personname"
                        :label="$t('personname')"
                        horizontal
                        v-model="AppointQualCategory.personname"
                      />
                      <b-input-group-append>
                        <b-button @click="OpenEmployeeModal" variant="primary">
                          <b-icon icon="three-dots" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6" v-if="$route.params.id != 0">
                <div class="form-group form-row">
                  <label for="v" class="col-form-label col-sm-3">{{
                    $t("SportQualSpecialTy")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      type="text"
                      :placeholder="$t('SportQualSpecialTy')"
                      autocomplete="SportQualSpecialTy"
                      horizontal
                      disabled
                      v-model="AppointQualCategory.sportqualspecialtyname"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
              <CCol
                sm="12"
                md="6"
                v-if="$route.query.sportqualspecialtyid != 2"
              >
                <ValidationProvider
                  v-slot="v"
                  name="Sport turi"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("Sport turi") }}</label
                    >
                    <div class="col-sm-9">
                      <v-select
                        :options="SportTypeClassifierList"
                        :reduce="(item) => item.id"
                        @input="changeSportType"
                        :placeholder="$t('Sport turi')"
                        v-model="AppointQualCategory.sporttypeclassifierid"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template></v-select
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label for="v" class="col-form-label col-sm-3">{{
                    $t("documentseries")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      type="text"
                      :placeholder="$t('documentseries')"
                      autocomplete="certificateseria"
                      horizontal
                      v-model="AppointQualCategory.documentseries"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label col-sm-3"
                    >{{ $t("ihmenunumber") }}</label
                  >
                  <div class="col-sm-9">
                    <b-form-input
                      type="text"
                      :placeholder="$t('ihmenunumber')"
                      autocomplete="certificatenumber"
                      horizontal
                      v-model="AppointQualCategory.documentnumber"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label for="v" class="col-form-label col-sm-3">{{
                      $t("givendate")
                    }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="AppointQualCategory.startdate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        @input="ChangeStartDate"
                        :placeholder="$t('givendate')"
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
              <CCol sm="12" md="6" v-if="$route.query.sportqualspecialtyid != 3">
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("enddate1") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="AppointQualCategory.enddate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('enddate1')"
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
              <!-- <CCol
                sm="12"
                md="6"
                v-if="AppointQualCategory.TalimSifatiInfo != null"
              >
                <ValidationProvider
                  v-slot="v"
                  name="personfullname"
                  rules="required"
                >
                  <CInput
                    :disabled="!$can('AdminView', 'permissions')"
                    :placeholder="$t('personnameDBS')"
                    autocomplete="personnameDBS"
                    horizontal
                    :label="$t('personnameDBS')"
                    v-model="AppointQualCategory.TalimSifatiInfo.personfullname"
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
              </CCol> -->
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required|max:9"
                >
                  <CInput
                    :disabled="!$can('AdminView', 'permissions')"
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="AppointQualCategory.docnumber"
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
              </CCol> -->
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="givenorganization"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('GivenOrganization')"
                    autocomplete="givenorganization"
                    horizontal
                    :label="$t('GivenOrganization')"
                    v-model="AppointQualCategory.givenorganization"
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
              </CCol> -->
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="trainingcoursename"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('trainingcoursename')"
                    autocomplete="trainingcoursename"
                    horizontal
                    disabled
                    :label="$t('trainingcoursename')"
                    v-model="AppointQualCategory.coursename"
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
              </CCol> -->
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="QualificationCategory"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("QualificationCategory") }}</label
                    >
                    <div class="col-sm-9">
                      <v-select
                        :options="QualificationCategoryList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('QualificationCategory')"
                        v-model="AppointQualCategory.qualificationcategoryid"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template></v-select
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="academichours"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("academichours") }}</label
                    >
                    <div class="col-sm-9">
                      <v-select
                        :options="AcademicHoursList"
                        :reduce="(item) => item.id"
                        @input="changeacademichour"
                        :placeholder="$t('ChooseBelow')"
                        v-model="
                          AppointQualCategory.qualcategorytrainingtypetableid
                        "
                        label="academichours"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template></v-select
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </CCol> -->
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <c-row> </c-row>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'AppointQualCategory2' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="AppointQualCategory.CanSave"
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
import AppointQualCategoryService from "@/services/AppointQualCategory.service";
// import PersonService from "@/services/person.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import PersonList from "@/components/PersonList";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import GetEmployeeListComponent from "@/components/GetEmployeeListComponent.vue";
import OrganizationListComponent from "@/components/OrganizationListComponent.vue";
import QualCategoryTrainingTypeService from "@/services/QualCategoryTrainingType.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
export default {
  components: {
    PersonList,
    GetEmployeeListComponent,
    OrganizationListComponent,
    EmployeeListComponent,
  },
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      AppointQualCategory: {},
      QualificationCategoryList: [],
      AcademicHoursList: [],
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
      filter: {
        organizationid: "",
        regionid: "",
        oblastid: "",
      },
      personloading: false,
      innofPerson: "",
      NotFoundPerson: true,
      personvalue: {},
      DocumentSeriesList: [],
      sporttypelist: [],
      SchoolSubjectList: [],
      RegionList: [],
      OrganizationList: [],
      SportTypeClassifierList: [],
      QualCategoryTrainingTypeList: [],
      PropsOrganization: 0,
      lang: localStorage.getItem("locale") || "ru",
      GetFromDbTsLoading: false,
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    AppointQualCategoryService.Get(self.selectedrowid).then((res) => {
      self.AppointQualCategory = res.data;
      if (self.selectedrowid > 0) {
        self.$route.query.sportqualspecialtyName =
          res.data.sportqualspecialtyname;
      }
    });
    SportTypeClassifierService.GetAll().then((res) => {
      self.SportTypeClassifierList = res.data;
    });
    QualificationCategoryService.GetAll(
      self.lang,
      false,
      this.$route.query.sportqualspecialtyid
    ).then((res) => {
      self.QualificationCategoryList = res.data;
    });
  },
  methods: {
    // changeacademichour() {
    //   var self = this;
    //   self.AppointQualCategory.academichours = self.AcademicHoursList.filter(
    //     (item) =>
    //       item.id === self.AppointQualCategory.qualcategorytrainingtypetableid
    //   )[0].academichours;
    // },
    ChangeStartDate(date) {
      console.log(date);
      if (!!this.AppointQualCategory.startdate) {
        var day = parseInt(date.slice(6, 10));
        day = parseInt(day) + 5;
        console.log(day);
        console.log(date.slice(0, 3) + date.slice(3, 6) + day);
        this.AppointQualCategory.enddate =
          date.slice(0, 3) + date.slice(3, 6) + day;
      }
    },
    changeSportType() {
      var self = this;
      self.AppointQualCategory.sporttypeclassifiername =
        self.SportTypeClassifierList.filter(
          (item) => item.id === self.AppointQualCategory.sporttypeclassifierid
        )[0].name;
    },
    Fill() {
      if (!!this.filter.organizationid) {
        this.fillLoading = true;
        AppointQualCategoryService.Import(this.filter.organizationid)
          .then((res) => {
            this.fillLoading = false;
            this.AppointQualCategory.Tables = res.data;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error || error,
              this.$t("error"),
              "danger"
            );
          });
      }
    },
    ChangeOblast() {
      this.filter.regionid = "";
      this.filter.organizationid = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = "";
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false

      this.$bvModal.hide("modalXl");
    },
    CloseOrganizationModal() {
      // this.EmployeeModal = false

      this.$bvModal.hide("OrganizationModal");
    },
    GetInfoQual(pinfl, documentseries, documentnumber) {
      var self = this;
      AppointQualCategoryService.Get(
        0,
        pinfl,
        documentseries,
        documentnumber
      ).then((res) => {
        self.AppointQualCategory = res.data;
      });
    },
    AddPersonData(data) {
      this.CloseEmployeeModal();
      this.AppointQualCategory.personid = data.id;
      this.AppointQualCategory.personname = data.fullname;
    },
    AddOrganizationData(data) {
      this.AppointQualCategory.personname = "";
      this.CloseOrganizationModal();
      this.AppointQualCategory.organizationid = data.id;
      this.AppointQualCategory.organizationname = data.shortname;
    },
    persondata() {
      var self = this;
      this.GetFromDbTsLoading = true;
      var personname = this.AppointQualCategory.personname;
      AppointQualCategoryService.GetFromDbTs(
        this.AppointQualCategory.documentseries,
        this.AppointQualCategory.documentnumber,
        this.AppointQualCategory.ondate,
        this.AppointQualCategory.personid
      )
        .then((res) => {
          this.GetFromDbTsLoading = false;
          self.AppointQualCategory = res.data;
          this.AppointQualCategory.personname = personname;
          this.AppointQualCategory.ondate = res.data.startdate;
        })
        .catch((error) => {
          this.GetFromDbTsLoading = false;
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
    // SelectedOrganizationItem(value) {
    //   this.organizationvalue = value;
    // },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      // this.PropsOrganization = this.AppointQualCategory.organizationid;
      this.$bvModal.show("modalXl");
    },
    // OpenOrganizationModal() {
    //   this.$bvModal.show("OrganizationModal");
    // },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    AddPerson() {
      this.showModal("createModal", true);
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
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.AppointQualCategory[this.editedIndex],
          this.AppointQualCategory
        );
        this.Close();
      } else {
        this.Add();
      }
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          schoolsubjectid: 0,
          schoolsubject: "",
          qualificationcategoryid: 0,
          qualificationcategory: "",
          documentseries: "",
          documentnumber: "",
          startdate: 0,
          enddate: 0,
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    Add() {
      var self = this;
      if (
        self.AppointQualCategory.startdate === "" ||
        self.AppointQualCategory.startdate === undefined ||
        self.AppointQualCategory.startdate === null ||
        self.AppointQualCategory.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.AppointQualCategory.enddate === "" ||
        self.AppointQualCategory.enddate === undefined ||
        self.AppointQualCategory.enddate === null ||
        self.AppointQualCategory.enddate === 0
      ) {
        this.makeToast(
          this.$t("endtimeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.AppointQualCategory.personid === "" ||
        self.AppointQualCategory.personid === undefined ||
        self.AppointQualCategory.personid === null ||
        self.AppointQualCategory.personid === 0
      ) {
        this.makeToast(
          this.$t("employeeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointQualCategory.documentseries === "" ||
        self.AppointQualCategory.documentseries === undefined ||
        self.AppointQualCategory.documentseries === null ||
        self.AppointQualCategory.documentseries === 0
      ) {
        this.makeToast(
          this.$t("documentseriesNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointQualCategory.documentnumber === "" ||
        self.AppointQualCategory.documentnumber === undefined ||
        self.AppointQualCategory.documentnumber === null ||
        self.AppointQualCategory.documentnumber === 0
      ) {
        this.makeToast(
          this.$t("documentnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      this.$bvModal.hide("AddModal");
    },
    check() {
      var self = this;
      if (
        self.AppointQualCategory.docnumber === 0 ||
        self.AppointQualCategory.docnumber === null ||
        self.AppointQualCategory.docnumber === undefined ||
        self.AppointQualCategory.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointQualCategory.docdate === 0 ||
        self.AppointQualCategory.docdate === null ||
        self.AppointQualCategory.docdate === undefined ||
        self.AppointQualCategory.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointQualCategory.personid === "" ||
        self.AppointQualCategory.personid === undefined ||
        self.AppointQualCategory.personid === null ||
        self.AppointQualCategory.personid === 0
      ) {
        this.makeToast(
          this.$t("employeeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.$route.query.sportqualspecialtyid != 2) {
        if (
          self.AppointQualCategory.sporttypeclassifierid === "" ||
          self.AppointQualCategory.sporttypeclassifierid === undefined ||
          self.AppointQualCategory.sporttypeclassifierid === null ||
          self.AppointQualCategory.sporttypeclassifierid === 0
        ) {
          this.makeToast(
            this.$t("sporttypeclassifierNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (
        self.AppointQualCategory.documentseries === "" ||
        self.AppointQualCategory.documentseries === undefined ||
        self.AppointQualCategory.documentseries === null ||
        self.AppointQualCategory.documentseries === 0
      ) {
        this.makeToast(
          this.$t("documentseriesNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointQualCategory.documentnumber === "" ||
        self.AppointQualCategory.documentnumber === undefined ||
        self.AppointQualCategory.documentnumber === null ||
        self.AppointQualCategory.documentnumber === 0
      ) {
        this.makeToast(
          this.$t("documentnumber1NotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointQualCategory.startdate === "" ||
        self.AppointQualCategory.startdate === undefined ||
        self.AppointQualCategory.startdate === null ||
        self.AppointQualCategory.startdate === 0
      ) {
        this.makeToast(
          this.$t("dateofissueNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.$route.query.sportqualspecialtyid != 3) {
        if (
        self.AppointQualCategory.enddate === "" ||
        self.AppointQualCategory.enddate === undefined ||
        self.AppointQualCategory.enddate === null ||
        self.AppointQualCategory.enddate === 0
      ) {
        this.makeToast(
          this.$t("dateofexpireNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      }
      if (
        self.AppointQualCategory.qualificationcategoryid === "" ||
        self.AppointQualCategory.qualificationcategoryid === undefined ||
        self.AppointQualCategory.qualificationcategoryid === null ||
        self.AppointQualCategory.qualificationcategoryid === 0
      ) {
        this.makeToast(
          this.$t("qualificationcategoryNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      this.AppointQualCategory.qualcategorytypeid = 3;
      (this.AppointQualCategory.sportqualspecialtyid =
        this.$route.query.sportqualspecialtyid),
        AppointQualCategoryService.Update(self.AppointQualCategory)
          .then((res) => {
            self.makeToast(
              self.$t("SuccessMessage"),
              self.$t("message"),
              "success"
            );
            self.$router.push({ name: "AppointQualCategory2" });
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
