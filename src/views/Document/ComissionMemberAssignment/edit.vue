<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <h4>{{ $t("ComissionMemberAssignment") }}</h4>
          <!-- <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'ComissionMemberAssignment' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div> -->
        </CCardHeader>
        <CCardBody class="mt-n3">
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="12" md="6" lg="4" class="mt-3">
                <label>{{ $t("docnumber") }}</label>
                <b-form-input
                  autocomplete="text"
                  horizontal
                  style="width: 100%"
                  v-model="ComissionMemberAssignment.docnumber"
                >
                </b-form-input>
              </CCol>
              <CCol sm="12" md="6" lg="4" class="mt-3">
                <label>{{ $t("docdate") }}</label>
                <custom-date-picker
                  v-model="ComissionMemberAssignment.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></custom-date-picker>
              </CCol>
              <CCol sm="12" md="6" lg="4" class="mt-3">
                <label>{{ $t("schoolyear") }}</label>
                <v-select
                  :options="schoolyearlist"
                  v-model="ComissionMemberAssignment.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="schoolyearchange"
                ></v-select>
              </CCol>
              <CCol sm="12" md="6" lg="4" class="mt-3">
                <label>{{ $t("highereduclassifier") }}</label>
                <v-select
                  :options="highereduclassifierlist"
                  v-model="ComissionMemberAssignment.highereduclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="fullname"
                  @input="highereduclassifierchange"
                ></v-select>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <b-row class="mx-2" v-if="ComissionMemberAssignment.CanSave">
          <b-col sm="12" md="3" lg="2" class="my-2">
            <v-select
              :options="comissionmembertypelist"
              v-model="filter.comissionmembertypeid"
              :reduce="(item) => item.id"
              style="width: 100%"
              :placeholder="$t('ComissionMemberType')"
              label="shortname"
              @input="comissionmembertypechange"
            ></v-select>
          </b-col>
          <b-col sm="12" md="2" lg="1" class="my-2">
            <b-form-input
              v-mask="'AA'"
              style="width: 100%"
              :placeholder="$t('docseries')"
              v-model="filter.documentseries"
            ></b-form-input>
          </b-col>
          <b-col sm="12" md="3" lg="1" class="my-2">
            <b-form-input
              v-mask="'#######'"
              style="width: 100%"
              :placeholder="$t('docnumber')"
              v-model="filter.documentnumber"
            ></b-form-input>
          </b-col>
          <b-col class="my-2" sm="12" md="5" lg="5">
            <div class="d-flex">
              <custom-date-picker
                v-model="filter.dateofbirth"
                size="sm"
                lang="ru"
                style="width: 40%"
                class="mr-2"
                :placeholder="$t('DateOfBirth')"
                value-type="format"
                format="DD.MM.YYYY"
              ></custom-date-picker>
            <b-form-input
              v-mask="'##############'"
              style="width: 50%"
              class="mr-2"
              :placeholder="$t('pinfl')"
              v-model="filter.pinfl"
            ></b-form-input>
              <b-form-input
                v-mask="'+### ## ### ## ##'"
                style="width: 40%"
                :placeholder="$t('mobilenumber')"
                v-model="filter.mobilenumber"
                class="mr-2"
              ></b-form-input>
              <b-button
                @click="Search()"
                variant="primary"
                style="height: 37px; white-space: nowrap"
              >
                <b-icon v-if="!SearchLoading" icon="search"></b-icon>
                <b-spinner v-if="SearchLoading" small></b-spinner>
                {{ $t("Search") }}
              </b-button>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="!!tabrow.fullname" class="mt-3">
          <b-col sm="12" md="5">
            <label class="ml-4">{{ $t("fullname") }}</label>
            <b-form-input
              style="width: 100%"
              class="ml-4"
              disabled
              :placeholder="$t('fullname')"
              v-model="tabrow.fullname"
            ></b-form-input>
          </b-col>
          <b-col sm="12" md="4">
            <label class="ml-4">{{ $t("pinfl") }}</label>
            <b-form-input
              style="width: 100%"
              class="ml-4"
              disabled
              :placeholder="$t('pinfl')"
              v-model="tabrow.pinfl"
            ></b-form-input>
          </b-col>
          <b-col sm="12" md="3">
            <b-button @click="AddRow" variant="primary" class="ml-4 mt-4">
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </b-button>
          </b-col>
        </b-row>
        <CRow class="mt-4">
          <CCol>
            <b-table
              :fields="CurriculumTables"
              :items="ComissionMemberAssignment.Tables"
              class="bg-color-table text-center tdpadding"
              style="vertical-align: middle"
              bordered
              responsive
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(actions)="{ item, index }">
                <b-button-group class="mx-auto d-block text-center" size="sm">
                  <!-- <b-button
                    v-if="ComissionMemberAssignment.CanSave"
                    variant="primary"
                    class="mr-2"
                    @click="EditRow(item)"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-button> -->
                  <b-button
                    class="mr-2"
                    v-if="ComissionMemberAssignment.CanSave"
                    variant="danger"
                    @click="DeleteRow(item, index)"
                  >
                    <b-icon icon="x"></b-icon>
                  </b-button>
                </b-button-group>
              </template>
              <template v-slot:cell(mobilenumber)="{ item }">
                <span class="text-nowrap">{{
                  item.mobilenumber | VMask("+### ##-###-##-##")
                }}</span>
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
                @click="$router.push({ name: 'ComissionMemberAssignment' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="ComissionMemberAssignment.CanSave"
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
import PersonService from "@/services/person.service";
import SchoolYearService from "@/services/SchoolYear.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import ComissionMemberAssignmentService from "@/services/ComissionMemberAssignment.service";
import ComissionMemberTypeService from "@/services/ComissionMemberType.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import { transform } from "@babel/core";

export default {
  components: {
    CustomDatePicker
  },
  data() {
    return {
      SaveLoading: false,
      ComissionMemberAssignment: {},
      selectedrowid: 0,
      isclone: false,

      schoolyearlist: [],
      curriculumtypelist: [],
      highereduclassifierlist: [],
      comissionmembertypelist: [],
      filter: {
        documentseries: "",
        documentnumber: "",
        dateofbirth: "",
        identitydocumentid: 2,
        mobilenumber: "998",
      },
      Tables: [],
      schoolsubjectlist: [],
      schoolgradelist: [],

      CurriculumTables: [
        {
          key: "comissionmembertypename",
          label: this.$t("ComissionMemberType"),
          sortable: true,
        },
        {
          key: "fullname",
          label: this.$t("fullname"),
          class: "text-left",
          sortable: true,
        },
        { key: "dateofbirth", label: this.$t("dateofbirth") },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          sortable: true,
        },
        { key: "gendername", label: this.$t("gender") },
        { key: "identitydocumentname", label: this.$t("identitydocument") },
        { key: "documentseries", label: this.$t("documentseries") },
        { key: "documentnumber", label: this.$t("documentnumber") },
        { key: "dateofissue", label: this.$t("dateofissue") },
        { key: "dateofexpire", label: this.$t("dateofexpire") },
        {
          key: "issueorganization",
          label: this.$t("issueorganization"),
          class: "text-left",
        },
        { key: "mobilenumber", label: this.$t("mobilenumber") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        comissionmembertypeid: 0,
        positionname: "",
        familyname: "",
        firstname: "",
        lastname: "",
        shortname: "",
        fullname: "",
        dateofbirth: "",
        pinfl: "",
        genderid: 0,
        identitydocumentid: 0,
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: "",
        issueorganization: "",
        Status: 1,
      },
      editedIndex: -1,
      lang: "",
      toastCount: 0,
      totalhours: 0,
      SearchLoading: false,
      allSignupErrors: {},
    };
  },
  /*   Mount() {
    this.curriculumtypechange();
  }, */
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    var self = this;

    self.selectedrowid = self.$route.params.id;
    SchoolGradeService.GetAll().then((res) => {
      self.schoolgradelist = res.data;
    });

    SchoolYearService.GetAll().then((res) => {
      self.schoolyearlist = res.data;
    });
    HigherEduClassifierService.GetAll().then((res) => {
      self.highereduclassifierlist = res.data;
    });
    ComissionMemberTypeService.GetAll().then((res) => {
      self.comissionmembertypelist = res.data;
    });
    ComissionMemberAssignmentService.Get(self.selectedrowid).then((res) => {
      self.ComissionMemberAssignment = res.data;
      if (self.selectedrowid != 0) {
        this.schoolyearchange();
      }
    });
  },

  methods: {
    check() {
      var self = this;
      if (
        self.ComissionMemberAssignment.docnumber === null ||
        self.ComissionMemberAssignment.docnumber === undefined ||
        self.ComissionMemberAssignment.docnumber === 0 ||
        self.ComissionMemberAssignment.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      // var tableitemscount = 0;
      // tableitemscount = self.ComissionMemberAssignment.Tables.filter(
      //   (item) => item.Status !== 3
      // ).length;
      // if (tableitemscount === 0) {
      //   self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
      //   return false;
      // }
      return true;
    },
    checkTables() {
      var self = this;
      if (
        self.filter.comissionmembertypeid === null ||
        self.filter.comissionmembertypeid === undefined ||
        self.filter.comissionmembertypeid === 0 ||
        self.filter.comissionmembertypeid === ""
      ) {
        self.makeToast(
          self.$t("comissionmembertypeNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.filter.mobilenumber === null ||
        self.filter.mobilenumber === undefined ||
        self.filter.mobilenumber === 0 ||
        self.filter.mobilenumber === ""
      ) {
        self.makeToast(
          self.$t("MobileNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.filter.mobilenumber.length < 12) {
        self.makeToast(
          self.$t("MobileNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.fullname === null ||
        self.tabrow.fullname === undefined ||
        self.tabrow.fullname === 0 ||
        self.tabrow.fullname === ""
      ) {
        self.makeToast(
          self.$t("fullnameNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.ComissionMemberAssignment.schoolyearid === null ||
        self.ComissionMemberAssignment.schoolyearid === undefined ||
        self.ComissionMemberAssignment.schoolyearid === 0 ||
        self.ComissionMemberAssignment.schoolyearid === ""
      ) {
        self.makeToast(
          self.$t("schoolyearNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    Search() {
      // var self = this;
      // if (!self.checkfilter()) {
      //   return false;
      // }
      this.SearchLoading = true;
      PersonService.GetFromGovData(
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.pinfl,
        this.filter.dateofbirth,
        "",
        "",
        2
      )
        .then((res) => {
          // this.relativetabrow = {
          //   Status : 1,
          //   familyname : res.data.familyname,
          //   firstname : res.data.firstname,
          //   lastname : res.data.lastname,
          //   dateofbirth : res.data.dateofbirth,
          //   pinfl : res.data.pinfl,

          // }
          this.tabrow = res.data;
          this.tabrow.Status = 1;
          // this.tabrow.countryid = res.data.birthcountryid;
          // this.tabrow.oblastid = res.data.birthoblastid;
          // this.tabrow.regionid = res.data.birthregionid;
          // this.tabrow.mfyid = res.data.birthmfyid;
          // this.tabrow.hasdied = fetch;
          // this.tabrow.address = res.data.birthaddress
          this.tabrow.comissionmembertypename =
            this.filter.comissionmembertypename;
          this.tabrow.identitydocumentid =
            res.data.DocumentTables[0].identitydocumentid;
          this.tabrow.identitydocumentname =
            res.data.DocumentTables[0].identitydocumentname;
          this.tabrow.documentseries =
            res.data.DocumentTables[0].documentseries;
          this.tabrow.documentnumber =
            res.data.DocumentTables[0].documentnumber;
          this.tabrow.dateofissue = res.data.DocumentTables[0].dateofissue;
          this.tabrow.dateofexpire = res.data.DocumentTables[0].dateofexpire;
          this.tabrow.issueorganization =
            res.data.DocumentTables[0].issueorganization;
          this.SearchLoading = false;
          //  this.pinflRelativeLoading = false;
        })
        .catch((error) => {
          this.pinflRelativeLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      ComissionMemberAssignmentService.Update(self.ComissionMemberAssignment)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "ComissionMemberAssignment" });
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
      this.tabrow.comissionmembertypeid = this.filter.comissionmembertypeid;
      this.tabrow.mobilenumber = this.filter.mobilenumber;
      var self = this;
      if (!self.checkTables()) {
        return false;
      }
      if (self.editedIndex > -1) {
        console.log(self.tabrow);
        Object.assign(
          self.ComissionMemberAssignment.Tables[self.editedIndex],
          self.tabrow
        );
      } else {
        self.ComissionMemberAssignment.Tables.push(self.tabrow);
        self.tabrow = {
          id: 0,
          ownerid: 0,
          comissionmembertypeid: 0,
          positionname: "",
          familyname: "",
          firstname: "",
          lastname: "",
          shortname: "",
          fullname: "",
          dateofbirth: "",
          pinfl: "",
          genderid: 0,
          identitydocumentid: 0,
          documentseries: "",
          documentnumber: "",
          dateofissue: "",
          dateofexpire: "",
          issueorganization: "",
          Status: 1,
        };
        self.filter = {
          documentseries: "",
          documentnumber: "",
          dateofbirth: "",
          identitydocumentid: 2,
          mobilenumber: "+998",
        };
      }
      // }
    },
    // EditRow(item) {
    //   if(item.Status == 0){
    //     item.Status = 2
    //   }
    //   this.editedIndex = this.ComissionMemberAssignment.Tables.indexOf(item);
    //   this.tabrow = Object.assign({}, item);
    //   console.log(this.ComissionMemberAssignment.Tables)
    // },
    DeleteRow(item, index) {
      if (item.Status == 1) {
        this.ComissionMemberAssignment.Tables.splice(index, 1);
      } else {
        item.Status = 3;
      }
      console.log(this.tabrow);
    },
    rowClass(item, type) {
      if (!!item && item.Status === 3) {
        return "d-none";
      }
    },
    schoolyearchange() {
      var self = this;
      self.ComissionMemberAssignment.schoolyearname =
        self.schoolyearlist.filter(function (item) {
          if (item.id === self.ComissionMemberAssignment.schoolyearid)
            return item;
        })[0].name;
      self.ComissionMemberAssignment.schoolyearname;

      this.tabrow.schoolsubjectid = 0;
      SchoolSubjectService.GetAll(
        this.lang,
        true,
        this.ComissionMemberAssignment.schoolyearid,
        this.tabrow.schoolgradeid
      ).then((res) => {
        self.schoolsubjectlist = res.data;
      });
    },
    comissionmembertypechange() {
      var self = this;
      self.filter.comissionmembertypename = self.comissionmembertypelist.filter(
        function (item) {
          if (item.id === self.filter.comissionmembertypeid) return item;
        }
      )[0].shortname;
    },
    highereduclassifierchange() {
      var self = this;
      self.ComissionMemberAssignment.highereduclassifiername =
        self.highereduclassifierlist.filter(function (item) {
          if (item.id === self.ComissionMemberAssignment.highereduclassifierid)
            return item;
        })[0].name;
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
