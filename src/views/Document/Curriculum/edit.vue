<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("Curriculum") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'Curriculum' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docnumber" rules="required">
                  <label>{{ $t("docnumber") }}</label>
                  <CInput
                    autocomplete="text"
                    horizontal
                    v-model="Curriculum.docnumber"
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
                <label>{{ $t("docdate") }}</label>
                <date-picker
                  v-model="Curriculum.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                ></date-picker>
              </CCol>
              <CCol sm="2">
                <label>{{ $t("schoolyear") }}</label>
                <v-select
                  :options="schoolyearlist"
                  v-model="Curriculum.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="schoolyearchange"
                ></v-select>
              </CCol>
              <CCol>
                <label>{{ $t("CurriculumType") }}</label>
                <v-select
                  :options="curriculumtypelist"
                  v-model="Curriculum.curriculumtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="curriculumtypechange"
                ></v-select>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="2">
                <label>{{ $t("ishomeschooling") }}</label>
                <b-form-checkbox
                  disabled
                  v-model="Curriculum.ishomeschooling"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </CCol>
              <CCol sm="2">
                <label>{{ $t("isvariable") }}</label>
                <b-form-checkbox disabled v-model="Curriculum.isvariable" switch class="mt-2 ml-1"></b-form-checkbox>
              </CCol>
              <CCol sm="2">
                <label>{{ $t("isspecialized") }}</label>
                <b-form-checkbox
                  disabled
                  v-model="Curriculum.isspecialized"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </CCol>
              <CCol sm="5">
                <ValidationProvider v-slot="v" name="normativedoc" rules="required">
                  <label>{{ $t("normativedoc") }}</label>
                  <CInput
                    autocomplete="text"
                    horizontal
                    v-model="Curriculum.normativedoc"
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
              <CCol sm="5">
                <label>{{ $t("DetailInfo") }}</label>
                <CInput autocomplete="text" horizontal v-model="Curriculum.detailinfo"></CInput>
              </CCol>
              <CCol sm="2">
                <label>{{ $t("totalhours") }}</label>
                <h5>
                  <a style="color:blue">{{$options.filters.currency(totalhours, {symbol: '', fractionCount: 2})}}</a>
                </h5>

              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="CurriculumTables"
              :items="Curriculum.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-if="Curriculum.CanSave" v-slot:thead-top>
                <b-tr>
                  <b-th style="width : 40%">
                    <v-select
                      :options="schoolsubjectlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolsubjectid"
                    ></v-select>
                  </b-th>
                  <b-th style="width : 10%">
                    <b-form-checkbox  v-model="tabrow.isoptionalsubject" switch class="mt-2 ml-1"></b-form-checkbox>
                  </b-th>
                  <b-th style="width : 40%">
                    <v-select
                      :options="schoolgradelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolgradeid"
                    ></v-select>
                  </b-th>
                  <b-th style="width : 40%">
                    <custom-number-input v-model="tabrow.hours"></custom-number-input>
                  </b-th>

                  <b-th style="width:20%">
                    <CButton size="sm" color="primary" variant="outline" @click="AddRow">
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(schoolsubjectname)="{ item }">
                <p>{{ item.schoolsubjectname }}</p>
              </template>
              <template v-slot:cell(isoptionalsubject)="{ item }">
                <p>
                  <b-form-checkbox disabled v-model="item.isoptionalsubject" switch class="mt-2 ml-1"></b-form-checkbox>
                </p>
              </template>
              <template v-slot:cell(schoolgradename)="{ item }">
                <p>{{ item.schoolgradename }}</p>
              </template>
              <template v-slot:cell(hours)="{ item }">
                <p v-if="item.Status == 0">{{ item.hours }}</p>
                <custom-number-input
                  v-if="item.Status == 2 || item.Status == 1"
                  v-model="item.hours"
                ></custom-number-input>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <CButtonGroup class="mx-auto d-block text-center" size="sm">
                  <CButton
                    v-if="Curriculum.CanSave"
                    variant="outline"
                    color="primary"
                    @click="EditRow(item)"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </CButton>
                  <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </CButtonGroup>
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
                @click="$router.push({ name: 'Curriculum' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="Curriculum.CanSave"
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
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolYearService from "@/services/SchoolYear.service";
import CurriculumTypeService from "@/services/CurriculumType.service";
import CurriculumService from "@/services/Curriculum.service";
import { transform } from '@babel/core';

export default {
  data() {
    return {
      SaveLoading: false,
      Curriculum: {},
      selectedrowid: 0,
      isclone: false,

      schoolyearlist: [],
      curriculumtypelist: [],
      schoolsubjectlist: [],
      schoolgradelist: [],

      CurriculumTables: [
        { key: "schoolsubjectname", label: this.$t("SchoolSubjectName"),sortable : true },
        { key: "isoptionalsubject", label: this.$t("isoptionalsubject") },
        { key: "schoolgradename", label: this.$t("SchoolGradeName"),sortable : true },
        { key: "hours", label: this.$t("hours") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        isoptionalsubject: false,
        schoolsubjectname: "",
        schoolgradeid: 0,
        schoolgradename: "",
        hours: 0,
        Status: 1,
      },
      lang:"",
      toastCount: 0,
      totalhours: 0,
      allSignupErrors: {},
    };
  },
  /*   Mount() {
    this.curriculumtypechange();
  }, */
  created() {
    this.lang = localStorage.getItem('locale')||'ru'
    var self = this;

    self.selectedrowid = self.$route.params.id;
    self.isclone = self.$route.params.isclone;
    SchoolGradeService.GetAll().then((res) => {
      self.schoolgradelist = res.data;
    });
   
    SchoolYearService.GetAll().then((res) => {
      self.schoolyearlist = res.data;
    });
    CurriculumTypeService.GetAll().then((res) => {
      self.curriculumtypelist = res.data;
    });
    CurriculumService.Get(self.selectedrowid, self.isclone).then((res) => {
      self.Curriculum = res.data;
      self.calculate();
      this.curriculumtypechange();
      if(self.selectedrowid!=0){
        this.schoolyearchange()
      }
    });
  },

  methods: {
    check() {
      var self = this;
      if (
        self.Curriculum.docnumber === null ||
        self.Curriculum.docnumber === undefined ||
        self.Curriculum.docnumber === 0 ||
        self.Curriculum.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Curriculum.schoolyearid === null ||
        self.Curriculum.schoolyearid === undefined ||
        self.Curriculum.schoolyearid === 0
      ) {
        self.makeToast(
          self.$t("SchoolYearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Curriculum.curriculumtypeid === null ||
        self.Curriculum.curriculumtypeid === undefined ||
        self.Curriculum.curriculumtypeid === 0
      ) {
        self.makeToast(
          self.$t("CurriculumTypeNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Curriculum.normativedoc === null ||
        self.Curriculum.normativedoc === undefined ||
        self.Curriculum.normativedoc === 0 ||
        self.Curriculum.normativedoc === ""
      ) {
        self.makeToast(
          self.$t("NormativeDocNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var tableitemscount = 0;
      tableitemscount = self.Curriculum.Tables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      CurriculumService.Update(self.Curriculum)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Curriculum" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    AddRow(data) {
      var self = this;
      self.tabrow.schoolsubjectname = self.schoolsubjectlist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.schoolsubjectid) return item;
      })[0].name;
      self.tabrow.schoolgradename = self.schoolgradelist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.schoolgradeid) return item;
      })[0].name;
      var dublicate = false;
      self.Curriculum.Tables.forEach(function(item) {
        if(item.Status!==3 && item.schoolsubjectid === self.tabrow.schoolsubjectid && item.isoptionalsubject === self.tabrow.isoptionalsubject && item.schoolgradeid === self.tabrow.schoolgradeid){
            dublicate = true;
        }    
      });
      if (dublicate) {
        self.makeToast(
          self.$t("Dublicate"),
          self.$t("Error"),
          "danger"
        );
      }
      else{
      self.Curriculum.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        isoptionalsubject: false,
        schoolsubjectname: "",
        schoolgradeid: 0,
        schoolgradename: "",
        hours: 0,
        Status: 1,
      };
      }
      self.calculate();
    },
    calculate() {
      var self = this;
      self.totalhours = 0;
      self.Curriculum.Tables.forEach(function(item) {
        if(item.Status!==3){
            self.totalhours = self.totalhours + item.hours;
        }    
      });
    },
    EditRow(item) {
      item.Status = 2;
    },
    DeleteRow(item) {
      item.Status = 3;
      this.calculate();
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    schoolyearchange() {
      var self = this;
      self.Curriculum.schoolyearname = self.schoolyearlist.filter(function (
        item
      ) {
        if (item.id === self.Curriculum.schoolyearid) return item;
      })[0].name;
      self.Curriculum.schoolyearname;
     
        this.tabrow.schoolsubjectid = 0
         SchoolSubjectService.GetAll(this.lang,true,this.Curriculum.schoolyearid,this.tabrow.schoolgradeid).then((res) => {
      self.schoolsubjectlist = res.data;
    });
      
      
    },
    curriculumtypechange() {
      var self = this;
      self.Curriculum.curriculumtypename = self.curriculumtypelist.filter(
        function (item) {
          if (item.id === self.Curriculum.curriculumtypeid) return item;
        }
      )[0].name;
      self.Curriculum.curriculumtypename;
      self.Curriculum.ishomeschooling = self.curriculumtypelist.filter(
        function (item) {
          if (item.id === self.Curriculum.curriculumtypeid) return item;
        }
      )[0].ishomeschooling;
      self.Curriculum.isvariable = self.curriculumtypelist.filter(function (
        item
      ) {
        if (item.id === self.Curriculum.curriculumtypeid) return item;
      })[0].isvariable;
      self.Curriculum.isspecialized = self.curriculumtypelist.filter(function (
        item
      ) {
        if (item.id === self.Curriculum.curriculumtypeid) return item;
      })[0].isspecialized;
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

<style></style>
