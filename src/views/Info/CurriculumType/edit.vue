<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('CurriculumType')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="CurriculumType.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="startdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("startdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="CurriculumType.startdate"
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
              <CCol sm="4">
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
                        v-model="CurriculumType.enddate"
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
            </CRow>
            <!-- <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                 <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <date-picker
                v-model="CurriculumType.startdate"
                style="width: 100%"
                size="sm"
                lang="ru"
                :label="$t('StartDate')"
                :placeholder="$t('StartDate')"
                value-type="format"
                format="DD.MM.YYYY"
              ><template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
              </date-picker>
                 </ValidationProvider>
              
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                 <date-picker
                v-model="CurriculumType.enddate"
                style="width: 100%"
                size="sm"
                lang="ru"
                :placeholder="$t('EndDate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow> -->
            <CRow>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="CurriculumType.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="CurriculumType.TranslatableColumns.includes('shortname')"
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
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="CurriculumType.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="CurriculumType.TranslatableColumns.includes('fullname')"
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
              <CCol sm="4">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('state')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="CurriculumType.stateid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="8">
                <div class="form-group form-row">
                  <label class="col-form-label" for>{{$t('ishomeschooling')}}</label>
                  <b-form-checkbox
                    v-model="CurriculumType.ishomeschooling"
                    switch
                    class="mt-2 ml-1"
                  ></b-form-checkbox>
                  <CCol sm="2"></CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label" for>{{$t('isvariable')}}</label>
                    <b-form-checkbox v-model="CurriculumType.isvariable" switch class="mt-2 ml-1"></b-form-checkbox>
                  </div>
                  <CCol sm="2"></CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label" for>{{$t('isspecialized')}}</label>
                    <b-form-checkbox
                      v-model="CurriculumType.isspecialized"
                      switch
                      class="mt-2 ml-1"
                    ></b-form-checkbox>
                  </div>
                </div>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <!-- <!Tab begins> -->
          <CCol>
            <b-tabs pills card>
              <!-- FirstTab -->
              <b-tab :title="$t('EduLang')">
                <CRow>
                  <CCol>
                    <b-table
                      :fields="CurriculumTypeEduLang"
                      :items="CurriculumType.EduLang"
                      class="bg-color-table text-center tdpadding mx-3"
                      style="vertical-align:middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:thead-top>
                        <b-tr>
                          <b-th style="width:14%">
                            <v-select
                              :options="educationlanguagelist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow2.educationlanguageid"
                            ></v-select>
                          </b-th>
                          <b-th style="width:20%" class="text-center">
                            <CButton size="sm" color="primary" variant="outline" @click="Add2">
                              <b-icon icon="plus"> </b-icon>
                              {{ $t("Add") }}
                            </CButton>
                          </b-th>
                        </b-tr>
                      </template>

                      <template v-slot:cell(educationlanguagename)="{ item }">
                        <p>{{ item.educationlanguagename }}</p>
                      </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup class="mx-auto d-block text-center" size="sm">
                          <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                            <b-icon icon="x"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>
              </b-tab>
              <!-- hjkl -->
              <b-tab :title="$t('SchoolType')">
                <CRow>
                  <CCol>
                    <b-table
                      :fields="CurriculumTypeSchoolType"
                      :items="CurriculumType.SchoolType"
                      class="bg-color-table text-center tdpadding mx-3"
                      style="vertical-align:middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:thead-top>
                        <b-tr>
                          <b-th style="width:14%">
                            <v-select
                              :options="schooltypelist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow3.schooltypeid"
                            ></v-select>
                          </b-th>
                          <b-th style="width:20%" class="text-center">
                            <CButton size="sm" color="primary" variant="outline" @click="Add3">
                              <b-icon icon="plus"> </b-icon>
                              {{ $t("Add") }}
                            </CButton>
                          </b-th>
                        </b-tr>
                      </template>

                      <template v-slot:cell(schooltypename)="{ item }">
                        <p>{{ item.schooltypename }}</p>
                      </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup class="mx-auto d-block text-center" size="sm">
                          <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                            <b-icon icon="x"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>
              </b-tab>
              <!-- hjkl -->
            </b-tabs>
          </CCol>
        </CRow>
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
                @click="$router.push({name : 'CurriculumType'})"
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
import CurriculumTypeService from "@/services/CurriculumType.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import SchoolTypeService from "@/services/SchoolType.service";

export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      CurriculumType: { TranslatableColumns: [] },
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
      CurriculumTypeEduLang: [
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
      CurriculumTypeSchoolType: [
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
    CurriculumTypeService.Get(self.selectedrowid).then((res) => {
      self.CurriculumType = res.data;
      if(self.$route.params.id == 0){
      this.createDate();
    }
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
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.CurriculumType.startdate = dd + "." + mm + "." + yyyy;
      this.CurriculumType.enddate = dd + "." + mm + "." + yyyy;
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
      self.CurriculumType.EduLang.forEach(function (item) {
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

      self.CurriculumType.EduLang.push(self.tabrow2);
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
      self.CurriculumType.SchoolType.forEach(function (item) {
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

      self.CurriculumType.SchoolType.push(self.tabrow3);
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
        self.CurriculumType.code === 0 ||
        self.CurriculumType.code === null ||
        self.CurriculumType.code === undefined ||
        self.CurriculumType.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.CurriculumType.startdate === 0 ||
        self.CurriculumType.startdate === null ||
        self.CurriculumType.startdate === undefined ||
        self.CurriculumType.startdate === ""
      ) {
        this.makeToast(this.$t("startdateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.CurriculumType.enddate === 0 ||
        self.CurriculumType.enddate === null ||
        self.CurriculumType.enddate === undefined ||
        self.CurriculumType.enddate === ""
      ) {
        this.makeToast(this.$t("enddateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.CurriculumType.shortname === 0 ||
        self.CurriculumType.shortname === null ||
        self.CurriculumType.shortname === undefined ||
        self.CurriculumType.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CurriculumType.fullname === 0 ||
        self.CurriculumType.fullname === null ||
        self.CurriculumType.fullname === undefined ||
        self.CurriculumType.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CurriculumType.stateid === 0 ||
        self.CurriculumType.stateid === null ||
        self.CurriculumType.stateid === undefined ||
        self.CurriculumType.stateid === ""
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
      CurriculumTypeService.Update(self.CurriculumType)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "CurriculumType" });
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
      self.translatelist = self.CurriculumType.Translates.filter(
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
      self.CurriculumType.Translates = self.CurriculumType.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.CurriculumType.Translates.push(item);
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