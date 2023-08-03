<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("CertForeignLang") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol>
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
                    v-model="CertForeignLang.personname"
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
              <CCol>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="documentseries"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('documentseries')"
                    autocomplete="documentseries"
                    horizontal
                    :label="$t('documentseries')"
                    v-model="CertForeignLang.documentseries"
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
                  name="documentnumber"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('documentnumber')"
                    autocomplete="documentnumber"
                    horizontal
                    :label="$t('documentnumber')"
                    v-model="CertForeignLang.documentnumber"
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
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("startdate") }}</label
                    >
                    <div class="col-sm-9">
                      <date-picker
                        v-model="CertForeignLang.startdate"
                        style="width:100%"
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
              <CCol>
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("enddate") }}</label
                    >
                    <div class="col-sm-9">
                      <date-picker
                        v-model="CertForeignLang.enddate"
                        style="width:100%"
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
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="CertForeignLang.docnumber"
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
                        v-model="CertForeignLang.docdate"
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
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="CertForeignLang.detailinfo"
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
                  name="givenorganization"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('GivenOrganization')"
                    autocomplete="givenorganization"
                    horizontal
                    :label="$t('GivenOrganization')"
                    v-model="CertForeignLang.givenorganization"
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
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="schoolsubjectid"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("schoolsubject")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schoolsubjectlist"
                      v-model="CertForeignLang.schoolsubjectid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="certforeignlangtype"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("CertForeignLangType")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="CertForeignLangTypeList"
                      v-model="CertForeignLang.certforeignlangtypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="fullname"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'CertForeignLang' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
          <b-modal
            ref="my-modal"
            size="xl"
            v-model="createModal"
            hide-footer
            hide-header
            no-close-on-backdrop
          >
            <header class="modal-header">
              <h5 class="modal-title">{{ $t("Employee") }}</h5>
              <button
                type="button"
                aria-label="Close"
                class="close"
                @click="showModal('createModal', false)"
              >
                ×
              </button>
            </header>
            <div class="modal-body">
              <edit-person-component
                :show-back-button="false"
                :person-type-id="2"
                @success="studentCreated($event)"
              ></edit-person-component>
            </div>
          </b-modal>
        </CRow>
      </CCard>
    </CCol>
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
          <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
            {{ $t("back") }}
          </b-button>
          <b-button variant="primary" @click="AddPersonData(personvalue)">
            {{ $t("Add") }}
          </b-button>
        </c-col>
      </c-row>
    </b-modal>
  </CRow>
</template>

<script>
import SchoolSubjectService from "@/services/SchoolSubject.service";
import CertForeignLangService from "@/services/CertForeignLang.service";
import CertForeignLangTypeService from "@/services/CertForeignLangType.service";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import PersonList from "@/components/PersonList";
export default {
  name: "InfiniteScroll",
  components: { editPersonComponent, PersonList },
  data() {
    return {
      SaveLoading: false,
      createModal: false,
      CertForeignLang: {
        docdate: "25.04.2020",
        docnumber: "",
        givenorganization: "",
        detailinfo: "",
        Tables: [],
      },
      schoolsubjectlist: [],
      CertForeignLangTypeList: [],
      lang: "",
      personvalue: {},
    };
  },
  created() {
    SchoolSubjectService.GetAll().then((res) => {
      this.schoolsubjectlist = res.data;
    });
    CertForeignLangService.Get(this.$route.params.id).then((res) => {
      this.CertForeignLang = res.data;
    });
    CertForeignLangTypeService.GetAll().then((res) => {
      this.CertForeignLangTypeList = res.data;
    });
  },
  methods: {
    CloseEmployeeModal() {
      this.$bvModal.hide("modalXl");
    },
    AddPersonData(data) {
      this.CloseEmployeeModal();
      this.CertForeignLang.personid = data.id;
      this.CertForeignLang.personname = data.fullname;
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
    OpenEmployeeModal() {
      this.$bvModal.show("modalXl");
    },
    studentCreated(data) {
      data;
      this.showModal("createModal", false);
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
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    check() {
      var self = this;
      if (
        self.CertForeignLang.docnumber === 0 ||
        self.CertForeignLang.docnumber === null ||
        self.CertForeignLang.docnumber === undefined ||
        self.CertForeignLang.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CertForeignLang.docdate === 0 ||
        self.CertForeignLang.docdate === null ||
        self.CertForeignLang.docdate === undefined ||
        self.CertForeignLang.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CertForeignLang.givenorganization === 0 ||
        self.CertForeignLang.givenorganization === null ||
        self.CertForeignLang.givenorganization === undefined ||
        self.CertForeignLang.givenorganization === ""
      ) {
        this.makeToast(
          this.$t("givenorganizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CertForeignLang.detailinfo === null ||
        self.CertForeignLang.detailinfo === undefined ||
        self.CertForeignLang.detailinfo === ""
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
      CertForeignLangService.Update(this.CertForeignLang)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "CertForeignLang",
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

<style></style>
