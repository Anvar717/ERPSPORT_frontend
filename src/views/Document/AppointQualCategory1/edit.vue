<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AppointQualCategory1") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="12" md="6" v-if="$can('AdminView', 'permissions')">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("organization")
                  }}</label>
                  <div class="col-sm-9">
                    <!-- <custom-date-input />  -->
                    <b-input-group>
                      <b-form-input
                        disabled
                        :placeholder="$t('organization')"
                        autocomplete="organization"
                        :label="$t('organization')"
                        horizontal
                        v-model="AppointQualCategory.organizationname"
                      />
                      <b-input-group-append>
                        <b-button @click="OpenOrganizationModal" variant="primary">
                          <b-icon icon="three-dots" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("personname")
                  }}</label>
                  <div class="col-sm-9">
                    <!-- <custom-date-input />  -->
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
              <CCol sm="12" md="6" v-if="!$can('AdminView', 'permissions')">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("search")
                  }}</label>
                  <div class="col-sm-9">
                    <!-- <custom-date-input />  -->
                    <b-input-group>
                      <!-- <b-form-input
                        
                          :placeholder="$t('documentseries')"
                          autocomplete="documentseries"
                          horizontal
                          v-model="AppointQualCategory.documentseries"
                        /> -->
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
              </CCol>
            </CRow>
            <CRow>
               <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label
                    for="v"
                    class="col-form-label col-sm-3"
                    >{{ $t("number") }}</label
                  >
                  <div class="col-sm-9">
                    <b-form-input
                    :disabled="!$can('AdminView', 'permissions')"
                      :placeholder="$t('number')"
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
                      >{{ $t("docdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        :disabled="!$can('AdminView', 'permissions')"
                        v-model="AppointQualCategory.docdate"
                        style="width: 100%"
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
            <CRow v-if="!!$can('AdminView', 'permissions')">
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label col-sm-3"
                    >{{ $t("documentseries") }}</label
                  >
                  <div class="col-sm-9">
                    <!-- <custom-date-input />  -->
                    <b-select
                      :options="DocumentSeriesList"
                      v-model="AppointQualCategory.documentseries"
                      :reduce="(item) => item.id"
                      :placeholder="$t('documentseries')"
                      label="name"
                    ></b-select>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label col-sm-3"
                    >{{ $t("documentnumber") }}</label
                  >
                  <div class="col-sm-9">
                    <b-form-input
                      :placeholder="$t('documentnumber')"
                      autocomplete="documentnumber"
                      horizontal
                      v-model="AppointQualCategory.documentnumber"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label for="v" class="col-form-label col-sm-3">{{
                      $t("startdate")
                    }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        :disabled="!$can('AdminView', 'permissions')"
                        v-model="AppointQualCategory.startdate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('startdate')"
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
              <CCol sm="12" md="6">
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("enddate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        :disabled="!$can('AdminView', 'permissions')"
                        v-model="AppointQualCategory.enddate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('enddate')"
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
              <CCol
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
              </CCol>
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
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :disabled="!$can('AdminView', 'permissions')"
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="AppointQualCategory.detailinfo"
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
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="givenorganization"
                  rules="required"
                >
                  <CInput
                    :disabled="!$can('AdminView', 'permissions')"
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
              </CCol>
              <!-- <CCol sm="12" md="6">
                 <ValidationProvider
                  v-slot="v"
                  name="schoolsubjectname"
                  rules="required"
                >
                  <CInput
                  :disabled="!$can('AdminView', 'permissions')"
                    :placeholder="$t('schoolsubject')"
                    autocomplete="schoolsubjectname"
                    horizontal
                    :label="$t('schoolsubject')"
                    v-model="AppointQualCategory.schoolsubjectname"
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
                  name="schoolsubjectname"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("SchoolSubject") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <v-select
                        :disabled="!$can('AdminView', 'permissions')"
                        :options="SchoolSubjectList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('schoolsubject')"
                        v-model="AppointQualCategory.schoolsubjectid"
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
                <ValidationProvider
                  v-slot="v"
                  name="qualificationcategoryname"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("qualificationcategory") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <v-select
                        :disabled="!$can('AdminView', 'permissions')"
                        :options="QualificationCategoryList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('qualificationcategory')"
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
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <c-row>
          <!-- <c-col class="text-left ml-0 ">
            <div class="form-group form-row">
              <label style="margin-left:20px" class="text-left mr-3">{{
                $t("isFill")
              }}</label>
              <b-form-checkbox
                class="ml-3 mt-n1"
                v-model="isFill"
                size="lg"
                value="accepted"
              ></b-form-checkbox>
            </div>
          </c-col> -->
          <!-- <c-col class="text-right mr-3">
            <c-button
              size="sm"
              color="primary"
              @click="$bvModal.show('AddModal')"
            >
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </c-button>
          </c-col> -->
        </c-row>
        <!-- <b-row class="mx-0 mb-3" v-if="isFill">
          <b-col sm="8">
            <div class="d-flex">
              <div class="mr-2" style="width : 100%">
                <label>{{ $t("oblast") }}</label>
                <v-select
                  :options="OblastList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.oblastid"
                  @input="ChangeOblast"
                ></v-select>
              </div>
              <div class="mr-2" style="width : 100%">
                <label>{{ $t("region") }}</label>
                <v-select
                  :options="RegionList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.regionid"
                  @input="ChangeRegion"
                ></v-select>
              </div>
              <div class="mr-2" style="width : 100%">
                <label>{{ $t("organization") }}</label>
                <v-select
                  :options="OrganizationList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.organizationid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="4">
            <b-button class="mt-4" variant="primary" @click="Fill">
              <b-icon icon="search" v-if="!fillLoading"></b-icon>
              <b-spinner small v-if="fillLoading"></b-spinner> {{ $t("Fill") }}
            </b-button>
          </b-col>
        </b-row> -->
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'AppointQualCategory1' })"
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
          id="OrganizationModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Organization')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <organization-list-component
            @SelectedItem="SelectedOrganizationItem"
            @DblClick="AddOrganizationData"
          >
          </organization-list-component>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseOrganizationModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddOrganizationData(organizationvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
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
import AppointQualCategoryService from "@/services/AppointQualCategory.service";
// import PersonService from "@/services/person.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import PersonList from "@/components/PersonList";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import GetEmployeeListComponent from "@/components/GetEmployeeListComponent.vue";
import OrganizationListComponent from "@/components/OrganizationListComponent.vue";
export default {
  components: { PersonList, GetEmployeeListComponent, OrganizationListComponent},
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      AppointQualCategory: {},
      QualificationCategoryList: [],
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
      SchoolSubjectList: [],
      RegionList: [],
      OrganizationList: [],
      PropsOrganization:0,
      lang: localStorage.getItem("locale") || "ru",
      GetFromDbTsLoading: false,
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    AppointQualCategoryService.Get(self.selectedrowid).then((res) => {
      self.AppointQualCategory = res.data;
    });
    AppointQualCategoryService.GetDocumentSeries().then((res) => {
      self.DocumentSeriesList = res.data;
    });
    SchoolSubjectService.GetAll(self.lang).then((res) => {
      self.SchoolSubjectList = res.data;
    });
    QualificationCategoryService.GetAll(self.lang).then((res) => {
      self.QualificationCategoryList = res.data;
    });
  },
  methods: {
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
      this.AppointQualCategory.personname = '';
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
    SelectedOrganizationItem(value){
       this.organizationvalue = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.PropsOrganization = this.AppointQualCategory.organizationid
      this.$bvModal.show("modalXl");
    },
    OpenOrganizationModal(){
      this.$bvModal.show("OrganizationModal");
    },
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

      if (
        self.AppointQualCategory.schoolsubjectid === "" ||
        self.AppointQualCategory.schoolsubjectid === undefined ||
        self.AppointQualCategory.schoolsubjectid === null ||
        self.AppointQualCategory.schoolsubjectid === 0
      ) {
        this.makeToast(
          this.$t("schoolsubjectNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
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
      if (
        self.AppointQualCategory.qualificationcategoryid === 1 ||
        self.AppointQualCategory.qualificationcategoryid === 2
      ) {
        this.makeToast(
          this.$t("qualificationcategoryWrong"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.AppointQualCategory.detailinfo === "" ||
        self.AppointQualCategory.detailinfo === undefined ||
        self.AppointQualCategory.detailinfo === null ||
        self.AppointQualCategory.detailinfo === 0
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
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
      if(self.$can('AdminView', 'permissions')){
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
      }
      if (
        self.AppointQualCategory.givenorganization === 0 ||
        self.AppointQualCategory.givenorganization === null ||
        self.AppointQualCategory.givenorganization === undefined ||
        self.AppointQualCategory.givenorganization === ""
      ) {
        this.makeToast(
          this.$t("givenorganizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointQualCategory.detailinfo === null ||
        self.AppointQualCategory.detailinfo === undefined ||
        self.AppointQualCategory.detailinfo === ""
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
      var self = this;
      if (!this.check()) {
        return false;
      }
       this.AppointQualCategory.qaulcategorytypeid = 2
      AppointQualCategoryService.Update(self.AppointQualCategory)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "AppointQualCategory1" });
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
