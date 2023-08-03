<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('StudentAdmissionType')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="StudentAdmissionType.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="StudentAdmissionType.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="StudentAdmissionType.TranslatableColumns.includes('shortname')"
                        @click="translate('shortname')"
                        style="height:35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="StudentAdmissionType.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="StudentAdmissionType.TranslatableColumns.includes('fullname')"
                        @click="translate('fullname')"
                        style="height:35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('istoschool')}}</label>
                  <b-form-checkbox
                    v-model="StudentAdmissionType.istoschool"
                    switch
                    class="mt-2 col-sm-9"
                  ></b-form-checkbox>
                  
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('state')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="StudentAdmissionType.stateid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <!-- END TAB -->

        <CModal
          :title="$t('translate')"
          :show.sync="translatemodal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="translitefields"
            :items="translatelist"
            class="bg-color-table text-center"
            style="vertical-align:middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width:30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="languagelist"
                    :reduce="item => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
                </b-th>
                <b-th style="width:10%">
                  <CButton
                    @click="addtranslite"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{item}">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
              <b-icon icon="check2"></b-icon>
              {{$t('Save')}}
            </CButton>
          </template>
        </CModal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'StudentAdmissionType'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import StudentAdmissionTypeService from "@/services/StudentAdmissionType.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import SchoolTypeService from "@/services/SchoolType.service";

export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      StudentAdmissionType: { TranslatableColumns: [] },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],
      educationlanguagelist: [],
      schooltypelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      StudentAdmissionTypeEduLang: [
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
        },

        { key: "actions", label: this.$t("actions") },
      ],
      tabrow2: {
        id: 0,
        ownerid: 0,
        educationlanguageid: 0,
        educationlanguagename: "",
        Status: 1,
      },
      StudentAdmissionTypeSchoolType: [
        {
          key: "schooltypename",
          label: this.$t("schooltypename"),
        },

        { key: "actions", label: this.$t("actions") },
      ],
      tabrow3: {
        id: 0,
        ownerid: 0,
        schooltypeid: 0,
        schooltypename: "",
        Status: 1,
      },
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    StudentAdmissionTypeService.Get(self.selectedrowid).then((res) => {
      self.StudentAdmissionType = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      self.schooltypelist = res.data;
    });
    EducationLanguageService.GetAll().then((res) => {
      self.educationlanguagelist = res.data;
    });
  },
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    Add2() {
      var self = this;
      if (
        self.tabrow2.educationlanguageid === "" ||
        self.tabrow2.educationlanguageid === undefined ||
        self.tabrow2.educationlanguageid === null ||
        self.tabrow2.educationlanguageid === 0
      ) {
        this.makeToast(
          this.$t("educationlanguageNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.tabrow2.educationlanguagename = self.educationlanguagelist.filter(
        function (item) {
          if (item.id === self.tabrow2.educationlanguageid) return item;
        }
      )[0].name;

      var dublicate = false;
      self.StudentAdmissionType.EduLang.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.educationlanguageid === self.tabrow2.educationlanguageid
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + "" + self.tabrow2.educationlanguageid,
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.StudentAdmissionType.EduLang.push(self.tabrow2);
      self.tabrow2 = {
        id: 0,
        ownerid: 0,
        educationlanguageid: 0,
        educationlanguagename: "",
        Status: 1,
      };
    },
    /* //////// */
    Add3() {
      var self = this;
      if (
        self.tabrow3.schooltypeid === "" ||
        self.tabrow3.schooltypeid === undefined ||
        self.tabrow3.schooltypeid === null ||
        self.tabrow3.schooltypeid === 0
      ) {
        this.makeToast(
          this.$t("schooltypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.tabrow3.schooltypename = self.schooltypelist.filter(function (item) {
        if (item.id === self.tabrow3.schooltypeid) return item;
      })[0].name;

      var dublicate = false;
      self.StudentAdmissionType.SchoolType.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.schooltypeid === self.tabrow3.schooltypeid
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + "" + self.tabrow3.schooltypeid,
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.StudentAdmissionType.SchoolType.push(self.tabrow3);
      self.tabrow3 = {
        id: 0,
        ownerid: 0,
        schooltypeid: 0,
        schooltypename: "",
        Status: 1,
      };
    },
    check() {
      var self = this;

      if (
        self.StudentAdmissionType.code === 0 ||
        self.StudentAdmissionType.code === null ||
        self.StudentAdmissionType.code === undefined ||
        self.StudentAdmissionType.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.StudentAdmissionType.shortname === 0 ||
        self.StudentAdmissionType.shortname === null ||
        self.StudentAdmissionType.shortname === undefined ||
        self.StudentAdmissionType.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentAdmissionType.fullname === 0 ||
        self.StudentAdmissionType.fullname === null ||
        self.StudentAdmissionType.fullname === undefined ||
        self.StudentAdmissionType.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentAdmissionType.stateid === 0 ||
        self.StudentAdmissionType.stateid === null ||
        self.StudentAdmissionType.stateid === undefined ||
        self.StudentAdmissionType.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      StudentAdmissionTypeService.Update(self.StudentAdmissionType)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "StudentAdmissionType" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.StudentAdmissionType.Translates.filter(
        (item) => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        this.makeToast(
          this.$t("languageidNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        this.makeToast(
          this.$t("translatetextNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else {
        var dublikate = false;
        self.translatelist.forEach((item) => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function (
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: "",
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.StudentAdmissionType.Translates = self.StudentAdmissionType.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.StudentAdmissionType.Translates.push(item);
      });
      self.translatemodal = false;
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
};
</script>

<style>
</style>