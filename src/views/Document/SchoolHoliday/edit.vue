<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('SchoolHoliday')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="SchoolHoliday.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <!-- <CCol class="sm-0"></CCol> -->
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-2"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-6">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="SchoolHoliday.docdate"
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
              <CCol>
                <ValidationProvider v-slot="v" name="schoolyear" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('schoolyear')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schoolyearlist"
                      v-model="SchoolHoliday.schoolyearid"
                      :reduce="item => item.id"
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
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="SchoolHoliday.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="SchoolHolidayTables"
              :items="SchoolHoliday.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-if="SchoolHoliday.CanSave" v-slot:thead-top>
                <b-tr>
                  <b-th style="width:14%">
                    <v-select
                      :options="schoolholidaytypelist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolholidaytypeid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:14%">
                    <v-select
                      :options="schoolgradelist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolgradeid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:14%">
                    <v-select
                      :options="schooltypelist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schooltypeid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:8%">
                    <date-picker
                      v-model="tabrow.startdate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('startdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </b-th>
                  <b-th style="width:8%">
                    <date-picker
                      v-model="tabrow.enddate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('enddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </b-th>
                  <b-th style="width:15%">
                    <CInput class="mb-0" v-model="tabrow.detailinfo"></CInput>
                  </b-th>
                  <b-th style="width:7%">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(schoolholidaytypename)="{item}">
                <p v-if="item.Status == 0">{{item.schoolholidaytypename}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="schoolholidaytypelist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.schoolholidaytypeid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(schoolgradename)="{item}">
                <p v-if="item.Status == 0">{{item.schoolgradename}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="schoolgradelist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.schoolgradeid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(schooltypename)="{item}">
                <p v-if="item.Status == 0">{{item.schooltypename}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="schooltypelist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.schooltypeid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(startdate)="{item}">
                <p v-if="item.Status == 0">{{item.startdate}}</p>
                <date-picker
                  v-model="item.startdate"
                  v-if="item.Status == 1 || item.Status == 2"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </template>
              <template v-slot:cell(enddate)="{item}">
                <p v-if="item.Status == 0">{{item.enddate}}</p>
                <date-picker
                  v-model="item.enddate"
                  v-if="item.Status == 1 || item.Status == 2"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('enddate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </template>
              <template v-slot:cell(detailinfo)="{item}">
                <p v-if="item.Status == 0">{{item.detailinfo}}</p>
                <CInput
                  v-if="item.Status == 1 || item.Status == 2"
                  class="mb-2"
                  v-model="item.detailinfo"
                ></CInput>
              </template>
              <template v-slot:cell(actions)="{item}">
                <CButtonGroup
                  v-if="SchoolHoliday.CanSave"
                  class="mx-auto d-block text-center"
                  size="sm"
                >
                  <CButton variant="outline" color="primary" @click="EditItem(item)">
                    <b-icon icon="pencil"></b-icon>
                  </CButton>
                  <CButton variant="outline" color="danger" @click="DeleteItem(item)">
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
                @click="$router.push({name : 'SchoolHoliday'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="SchoolHoliday.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
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
import SchoolYearService from "@/services/SchoolYear.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SchoolHolidayTypeService from "@/services/SchoolHolidayType.service";
import SchoolHolidayService from "@/services/SchoolHoliday.service";
export default {
  data() {
    return {
      SaveLoading: false,
      SchoolHoliday: {},
      selectedrowid: 0,

      schoolgradelist: [],
      schooltypelist: [],
      schoolholidaytypelist: [],
      schoolyearlist: [],

      lang: "",
      SchoolHolidayTables: [
        {
          key: "schoolholidaytypename",
          label: this.$t("schoolholidaytypename")
        },
        { key: "schoolgradename", label: this.$t("schoolgradename") },
        { key: "schooltypename", label: this.$t("schooltypename") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") }
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        schoolholidaytypeid: 0,
        schoolholidaytypename: "",
        schoolgradeid: 0,
        schoolgradename: "",
        schooltypeid: 0,
        schooltypename: "",
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      }
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    SchoolHolidayService.Get(self.selectedrowid).then(res => {
      self.SchoolHoliday = res.data;
    });
    SchoolYearService.GetAll().then(res => {
      self.schoolyearlist = res.data;
    });
    SchoolGradeService.GetAll().then(res => {
      self.schoolgradelist = res.data;
    });
    SchoolTypeService.GetAll().then(res => {
      self.schooltypelist = res.data;
    });
    SchoolHolidayTypeService.GetAll().then(res => {
      self.schoolholidaytypelist = res.data;
    });
  },
  methods: {
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
        solid: true
      });
    },
    Add() {
      var self = this;
      if (
        self.tabrow.schoolholidaytypeid === "" ||
        self.tabrow.schoolholidaytypeid === undefined ||
        self.tabrow.schoolholidaytypeid === null ||
        self.tabrow.schoolholidaytypeid === 0
      ) {
        this.makeToast(
          this.$t("schoolholidaytypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.schoolgradeid === "" ||
        self.tabrow.schoolgradeid === undefined ||
        self.tabrow.schoolgradeid === null ||
        self.tabrow.schoolgradeid === 0
      ) {
        this.makeToast(
          this.$t("schoolgradeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.schooltypeid === "" ||
        self.tabrow.schooltypeid === undefined ||
        self.tabrow.schooltypeid === null ||
        self.tabrow.schooltypeid === 0
      ) {
        this.makeToast(
          this.$t("schooltypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.startdate === "" ||
        self.tabrow.startdate === undefined ||
        self.tabrow.startdate === null ||
        self.tabrow.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.enddate === "" ||
        self.tabrow.enddate === undefined ||
        self.tabrow.enddate === null ||
        self.tabrow.enddate === 0
      ) {
        this.makeToast(
          this.$t("enddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.detailinfo === "" ||
        self.tabrow.detailinfo === undefined ||
        self.tabrow.detailinfo === null ||
        self.tabrow.detailinfo === 0
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.tabrow.schoolholidaytypename = self.schoolholidaytypelist.filter(
        function(item) {
          if (item.id === self.tabrow.schoolholidaytypeid) return item;
        }
      )[0].name;

      self.tabrow.schoolgradename = self.schoolgradelist.filter(function(item) {
        if (item.id === self.tabrow.schoolgradeid) return item;
      })[0].name;

      self.tabrow.schooltypename = self.schooltypelist.filter(function(item) {
        if (item.id === self.tabrow.schooltypeid) return item;
      })[0].name;

      self.SchoolHoliday.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        schoolholidaytypeid: 0,
        schoolholidaytypename: "",
        schoolgradeid: 0,
        schoolgradename: "",
        schooltypeid: 0,
        schooltypename: "",
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      };
    },

    EditItem(item) {
      item.Status = 2;
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.SchoolHoliday.docnumber === 0 ||
        self.SchoolHoliday.docnumber === null ||
        self.SchoolHoliday.docnumber === undefined ||
        self.SchoolHoliday.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolHoliday.docdate === 0 ||
        self.SchoolHoliday.docdate === null ||
        self.SchoolHoliday.docdate === undefined ||
        self.SchoolHoliday.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolHoliday.schoolyearid === 0 ||
        self.SchoolHoliday.schoolyearid === null ||
        self.SchoolHoliday.schoolyearid === undefined ||
        self.SchoolHoliday.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.SchoolHoliday.detailinfo === null ||
        self.SchoolHoliday.detailinfo === undefined ||
        self.SchoolHoliday.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.SchoolHoliday.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }

      SchoolHolidayService.Update(self.SchoolHoliday)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "SchoolHoliday" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    }
  }
};
</script>

<style>
</style>





