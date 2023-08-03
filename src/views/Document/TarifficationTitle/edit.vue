<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{$t('TarifficationTitle')}}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({name : 'TarifficationTitle'})"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CCard sm="6">
              <CCardBody sm="6">
                <CRow>
                  <CCol sm="2">
                    <ValidationProvider v-slot="v" name="docnumber" rules="required">
                      <CInput
                        disabled
                        :label="$t('docnumber')"
                        autocomplete="text"
                        v-model="TarifficationTitle.docnumber"
                        :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="2">
                    <label>{{$t('docdate')}}</label>
                    <date-picker
                      v-model="TarifficationTitle.docdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>

                  <CCol sm="2">
                    <label>{{$t('schoolyear')}}</label>
                    <v-select
                      :options="schoolyearlist"
                      v-model="TarifficationTitle.schoolyearid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>
                  <CCol sm="1">
                    <label for>{{$t('Isplacedincity')}}</label>
                    <b-form-checkbox
                      disabled
                      v-model="TarifficationTitle.isplacedincity"
                      name="check-button"
                      switch
                    ></b-form-checkbox>
                  </CCol>
                  <CCol>
                    <label>{{$t('schooltype')}}</label>
                    <v-select
                      disabled
                      :options="schooltypelist"
                      v-model="TarifficationTitle.schooltypeid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CInput
                      disabled
                      autocomplete="text"
                      :label="$t('schoolsubject')"
                      v-model="TarifficationTitle.specializedsubjects"
                    ></CInput>
                  </CCol>
                  <CCol>
                    <CInput
                      autocomplete="text"
                      :label="$t('detailinfo')"
                      v-model="TarifficationTitle.detailinfo"
                    ></CInput>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CRow v-if="TarifficationTitle.CanSave">
              <CCol>
                <div class="text-right">
                  <CButton class="sm-1" size="sm" color="info" @click="fillTable">
                    <b-icon icon="list-ul"></b-icon>
                    {{ $t("Fill") }}
                  </CButton>
                </div>
              </CCol>
              <CCol>
                <div class="text-left">
                  <CButton class="xl-1" size="sm" color="danger" @click="clearTable">
                    <b-icon icon="exclamation-octagon"></b-icon>
                    {{ $t("Clear") }}
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="TarifficationTitleTables"
              :items="TarifficationTitle.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(orgschoolgradename)="{item}">
                <p>{{item.orgschoolgradename}}</p>
              </template>
              <template v-slot:cell(studentcount)="{item}">
                <p>{{item.studentcount}}</p>
              </template>
              <template v-slot:cell(femalestudentcount)="{item}">
                <p>{{item.femalestudentcount}}</p>
              </template>
              <template v-slot:cell(homeschoolingstudentcount)="{item}">
                <p>{{item.homeschoolingstudentcount}}</p>
              </template>
              <template v-slot:cell(schoolingshiftname)="{item}">
                <p>{{item.schoolingshiftname}}</p>
              </template>
              <template v-slot:cell(educationlanguagename)="{item}">
                <p>{{item.educationlanguagename}}</p>
              </template>

              <template v-slot:cell(isspecialized)="{item}">
                <p v-if="item.isspecialized">{{$t('Yes')}}</p>
                <p v-if="!item.isspecialized">{{$t('No')}}</p>
              </template>
              <template v-slot:cell(specializedsubjects)="{item}">
                <p>{{item.specializedsubjects}}</p>
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
                @click="$router.push({name : 'TarifficationTitle'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="TarifficationTitle.CanSave"
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
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolTypeService from "@/services/SchoolType.service";

import TarifficationTitleService from "@/services/TarifficationTitle.service";

export default {
  data() {
    return {
      SaveLoading: false,
      CalcKindModal: false,
      TarifficationTitle: {},
      selectedrowid: 0,

      schoolyearlist: [],
      schoolsubjectlist: [],
      schooltypelist: [],

      TarifficationTitleTables: [
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgradename"),
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
        },
        {
          key: "femalestudentcount",
          label: this.$t("femalestudentcount"),
        },
        {
          key: "homeschoolingstudentcount",
          label: this.$t("homeschoolingstudentcount"),
        },
        {
          key: "schoolingshiftname",
          label: this.$t("schoolingshiftname"),
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
        },
        {
          key: "isspecialized",
          label: this.$t("isspecialized"),
        },
        {
          key: "specializedsubjects",
          label: this.$t("specializedsubjects"),
        },
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        studentcount: 0,
        femalestudentcount: 0,
        homeschoolingstudentcount: 0,
        schoolingshiftid: 0,
        schoolingshiftname: "",
        educationlanguageid: 0,
        educationlanguagename: "",
        isspecialized: false,
        SubjectTables: [],
        Status: 1,
      },

      subjecttablestabrow: {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        Status: 1,
      },
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    SchoolYearService.GetAll().then((res) => {
      self.schoolyearlist = res.data;
    });
    SchoolSubjectService.GetAll().then((res) => {
      self.schoolsubjectlist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      self.schooltypelist = res.data;
    });

    TarifficationTitleService.Get(self.selectedrowid)
      .then((res) => {
        self.TarifficationTitle = res.data;
        self.calculatetotal();
      })
      .catch((error) => {
        self.makeToast(error.response.data.error, self.$t("message"), "danger");
      });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.TarifficationTitle.docnumber === null ||
        self.TarifficationTitle.docnumber === undefined ||
        self.TarifficationTitle.docnumber === 0 ||
        self.TarifficationTitle.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TarifficationTitle.docdate === null ||
        self.TarifficationTitle.docdate === undefined ||
        self.TarifficationTitle.docdate === 0 ||
        self.TarifficationTitle.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.TarifficationTitle.schoolyearid === null ||
        self.TarifficationTitle.schoolyearid === undefined ||
        self.TarifficationTitle.schoolyearid === 0 ||
        self.TarifficationTitle.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.TarifficationTitle.schooltypeid === null ||
        self.TarifficationTitle.schooltypeid === undefined ||
        self.TarifficationTitle.schooltypeid === 0
      ) {
        this.makeToast(
          this.$t("schooltypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TarifficationTitle.detailinfo === null ||
        self.TarifficationTitle.detailinfo === undefined ||
        self.TarifficationTitle.detailinfo === 0 ||
        self.TarifficationTitle.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      var tableitemscount = 0;
      tableitemscount = self.TarifficationTitle.Tables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        this.makeToast(this.$t("TableNotfull"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    fillTable() {
      var self = this;
      self.TarifficationTitle.Tables.forEach(function (item) {
        item.Status = 3;
      });
      TarifficationTitleService.GenerateTarifficationTitleTable(
        self.TarifficationTitle.schoolyearid
      ).then((res) => {
        res.data.forEach(function (item) {
          self.tabrow = {
            id: 0,
            ownerid: 0,
            orgschoolgradeid: item.orgschoolgradeid,
            orgschoolgradename: item.orgschoolgradename,
            studentcount: item.studentcount,
            femalestudentcount: item.femalestudentcount,
            homeschoolingstudentcount: item.homeschoolingstudentcount,
            schoolingshiftid: item.schoolingshiftid,
            schoolingshiftname: item.schoolingshiftname,
            educationlanguageid: item.educationlanguageid,
            educationlanguagename: item.educationlanguagename,
            isspecialized: item.isspecialized,
            specializedsubjects: item.specializedsubjects,
            SubjectTables: item.SubjectTables,
            Status: 1,
          };
          self.TarifficationTitle.Tables.push(self.tabrow);
          self.tabrow = {
            id: 0,
            ownerid: 0,
            orgschoolgradeid: 0,
            orgschoolgradename: "",
            studentcount: 0,
            femalestudentcount: 0,
            homeschoolingstudentcount: 0,
            schoolingshiftid: 0,
            schoolingshiftname: "",
            educationlanguageid: 0,
            educationlanguagename: "",
            isspecialized: false,
            specializedsubjects: "",
            SubjectTables: [],
            Status: 1,
          };
        });
      });
    },
    clearTable() {
      var self = this;
      self.TarifficationTitle.Tables.forEach(function (item) {
        item.Status = 3;
      });
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      TarifficationTitleService.Update(self.TarifficationTitle)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "TarifficationTitle",
          });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    AddRow() {
      var self = this;
      self.calckindtotalsum = 0;
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        quantity: 1,
        tariffscaletypeid: 0,
        tariffscaleid: 0,
        rankname: "",
        rankcode: "",
        rankcoef: 0,
        corrcoef: 1,
        salary: 0,
        fot: 0,
        formonths: 12,
        fixedvalue: 0,
        TarifficationTitleCalcKindTables: [],
        staffingcalckindnames: "",
        Status: 1,
      };

      self.$bvModal.show("AddModal");
    },
    AddData() {
      var self = this;
      if (
        self.tabrow.departmentid === null ||
        self.tabrow.departmentid === undefined ||
        self.tabrow.departmentid === 0
      ) {
        this.makeToast(
          this.$t("departmentNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.tabrow.positionid === null ||
        self.tabrow.positionid === undefined ||
        self.tabrow.positionid === 0
      ) {
        this.makeToast(
          this.$t("PositionNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.tabrow.qualificationcategoryid === null ||
        self.tabrow.qualificationcategoryid === undefined ||
        self.tabrow.qualificationcategoryid === 0
      ) {
        this.makeToast(
          this.$t("QualificationCategoryNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.quantity === null ||
        self.tabrow.quantity === undefined ||
        self.tabrow.quantity === 0
      ) {
        this.makeToast(
          this.$t("QuantityNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.tariffscaletypeid === null ||
        self.tabrow.tariffscaletypeid === undefined ||
        self.tabrow.tariffscaletypeid === 0
      ) {
        this.makeToast(
          this.$t("TariffScaleTypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.tariffscaleid === null ||
        self.tabrow.tariffscaleid === undefined ||
        self.tabrow.tariffscaleid === 0
      ) {
        this.makeToast(
          this.$t("TariffScaleNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.rankcode === null ||
        self.tabrow.rankcode === undefined ||
        self.tabrow.rankcode === 0
      ) {
        this.makeToast(
          this.$t("RankCodeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.formonths === null ||
        self.tabrow.formonths === undefined ||
        self.tabrow.formonths === 0
      ) {
        this.makeToast(
          this.$t("ForMonthsNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      /* self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;
      self.tabrow.positionname = self.positionlist.filter(function(item) {
        if (item.positionid === self.tabrow.positionid) return item;
      })[0].positionidname;
      self.tabrow.qualificationcategoryname = self.qualificationcategorylist.filter(function(item) {
          if (item.id === self.tabrow.qualificationcategoryid) return item;
        })[0].name;
      self.tabrow.tariffscaletype = self.tariffscaletypelist.filter(function(item) {
        if (item.id === self.tabrow.tariffscaletypeid) return item;
      })[0].name;
      self.tabrow.tariffscale = self.tariffscalelist.filter(function(item) {
        if (item.id === self.tabrow.tariffscaleid) return item;
      })[0].name; */
      if (self.tabrow.id === 0) {
        var addrow = true;
        self.TarifficationTitle.TarifficationTitlePositionTables.forEach(
          function (item) {
            if (
              item.departmentid === self.tabrow.departmentid &&
              item.positionid === self.tabrow.positionid &&
              item.id === 0
            ) {
              item.departmentid = self.tabrow.departmentid;
              item.departmentname = self.tabrow.departmentname;
              item.positionid = self.tabrow.positionid;
              item.positionidname = self.tabrow.positionidname;
              item.qualificationcategoryid =
                self.tabrow.qualificationcategoryid;
              item.qualificationcategoryname =
                self.tabrow.qualificationcategoryname;
              item.quantity = self.tabrow.quantity;
              item.tariffscaletypeid = self.tabrow.tariffscaletypeid;
              item.tariffscaleid = self.tabrow.tariffscaleid;
              item.rankname = self.tabrow.rankname;
              item.rankcode = self.tabrow.rankcode;
              item.rankcoef = self.tabrow.rankcoef;
              item.corrcoef = self.tabrow.corrcoef;
              item.salary = self.tabrow.salary;
              item.fot = self.tabrow.fot;
              item.formonths = self.tabrow.formonths;
              item.fixedvalue = self.tabrow.fixedvalue;
              item.TarifficationTitleCalcKindTables =
                self.tabrow.TarifficationTitleCalcKindTables;
              item.Status = 1;
              addrow = false;
              var kindname = "";
              self.tabrow.TarifficationTitleCalcKindTables.forEach(function (
                item
              ) {
                if (item.Status !== 3) {
                  if (kindname === "")
                    kindname =
                      item.calculationkindname + "(" + item.calcsum + ")";
                  else {
                    kindname =
                      kindname +
                      "," +
                      item.calculationkindname +
                      "(" +
                      item.calcsum +
                      ")";
                  }
                }
              });
              item.staffingcalckindnames = kindname;
            }
          }
        );
        if (addrow) {
          var kindname = "";
          self.tabrow.TarifficationTitleCalcKindTables.forEach(function (item) {
            if (item.Status !== 3) {
              if (kindname === "")
                kindname = item.calculationkindname + "(" + item.calcsum + ")";
              else {
                kindname =
                  kindname +
                  ", " +
                  item.calculationkindname +
                  "(" +
                  item.calcsum +
                  ")";
              }
            }
          });
          self.tabrow.staffingcalckindnames = kindname;
          self.TarifficationTitle.TarifficationTitlePositionTables.push(
            self.tabrow
          );
          self.tabrow = {
            id: 0,
            ownerid: 0,
            departmentid: 0,
            departmentname: "",
            positionid: 0,
            positionname: "",
            qualificationcategoryid: 0,
            qualificationcategoryname: "",
            quantity: 1,
            tariffscaletypeid: 0,
            tariffscaleid: 0,
            rankname: "",
            rankcode: "",
            rankcoef: 0,
            corrcoef: 1,
            salary: 0,
            fot: 0,
            formonths: 12,
            fixedvalue: 0,
            TarifficationTitleCalcKindTables: [],
            staffingcalckindnames: "",
            Status: 1,
          };
        }
      } else {
        self.TarifficationTitle.TarifficationTitlePositionTables.forEach(
          function (item) {
            if (item.id === self.tabrow.id) {
              item.departmentid = self.tabrow.departmentid;
              item.departmentname = self.tabrow.departmentname;
              item.positionid = self.tabrow.positionid;
              item.positionidname = self.tabrow.positionidname;
              item.qualificationcategoryid =
                self.tabrow.qualificationcategoryid;
              item.qualificationcategoryname =
                self.tabrow.qualificationcategoryname;
              item.quantity = self.tabrow.quantity;
              item.tariffscaletypeid = self.tabrow.tariffscaletypeid;
              item.tariffscaleid = self.tabrow.tariffscaleid;
              item.rankname = self.tabrow.rankname;
              item.rankcode = self.tabrow.rankcode;
              item.rankcoef = self.tabrow.rankcoef;
              item.corrcoef = self.tabrow.corrcoef;
              item.salary = self.tabrow.salary;
              item.fot = self.tabrow.fot;
              item.formonths = self.tabrow.formonths;
              item.fixedvalue = self.tabrow.fixedvalue;
              item.TarifficationTitleCalcKindTables =
                self.tabrow.TarifficationTitleCalcKindTables;
              item.Status = 2;
              var kindname = "";
              self.tabrow.TarifficationTitleCalcKindTables.forEach(function (
                item1
              ) {
                if (item1.Status !== 3) {
                  if (kindname === "")
                    kindname =
                      item1.calculationkindname + "(" + item1.calcsum + ")";
                  else {
                    kindname =
                      kindname +
                      ", " +
                      item1.calculationkindname +
                      "(" +
                      item1.calcsum +
                      ")";
                  }
                }
              });
              item.staffingcalckindnames = kindname;
            }
          }
        );
        self.tabrow = {
          iid: 0,
          ownerid: 0,
          departmentid: 0,
          departmentname: "",
          positionid: 0,
          positionname: "",
          qualificationcategoryid: 0,
          qualificationcategoryname: "",
          quantity: 1,
          tariffscaletypeid: 0,
          tariffscaleid: 0,
          rankname: "",
          rankcode: "",
          rankcoef: 0,
          corrcoef: 1,
          salary: 0,
          fot: 0,
          formonths: 12,
          fixedvalue: 0,
          TarifficationTitleCalcKindTables: [],
          staffingcalckindnames: "",
          Status: 1,
        };
      }
      self.$bvModal.hide("AddModal");
      self.calculatetotal();
    },
    EditRow(item) {
      var self = this;
      self.tabrow = {
        id: item.id,
        ownerid: item.ownerid,
        departmentid: item.departmentid,
        departmentname: item.departmentname,
        positionid: item.positionid,
        positionname: item.positionname,
        qualificationcategoryid: item.qualificationcategoryid,
        qualificationcategoryname: item.qualificationcategoryname,
        quantity: item.quantity,
        tariffscaletypeid: item.tariffscaletypeid,
        tariffscaleid: item.tariffscaleid,
        rankname: item.rankname,
        rankcode: item.rankcode,
        corrcoef: item.corrcoef,
        salary: item.salary,
        fot: item.fot,
        formonths: item.formonths,
        fixedvalue: item.fixedvalue,
        TarifficationTitleCalcKindTables: item.TarifficationTitleCalcKindTables,
        staffingcalckindnames: item.staffingcalckindnames,
        Status: 2,
      };
      self.tabrow.TarifficationTitleCalcKindTables.forEach(function (item) {
        if (item.Status === 0) item.Status = 2;
      });
      self.getposition();
      self.gettariffscale();
      self.gettariffscaletable();
      self.calckindclaculate();
      this.$bvModal.show("AddModal");
    },
    DeleteRow(item) {
      var self = this;
      item.Status = 3;
      self.calckindclaculate();
      self.calculatetotal();
    },

    addcalckindRow() {
      var self = this;
      if (
        self.calckindtabrow.calculationkindid === null ||
        self.calckindtabrow.calculationkindid === undefined ||
        self.calckindtabrow.calculationkindid === 0
      ) {
        this.makeToast(
          this.$t("CalculationKindNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.calckindtabrow.calccoef === null ||
        self.calckindtabrow.calccoef === undefined ||
        self.calckindtabrow.calccoef === 0
      ) {
        this.makeToast(
          this.$t("CalcCoefNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.calckindtabrow.calcsum === null ||
        self.calckindtabrow.calcsum === undefined ||
        self.calckindtabrow.calcsum === 0
      ) {
        this.makeToast(
          this.$t("calcsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }

      self.calckindtabrow.calculationkindname = self.calculationkindlist.filter(
        function (item) {
          if (item.id === self.calckindtabrow.calculationkindid) return item;
        }
      )[0].name;
      var dublicate = false;
      self.tabrow.TarifficationTitleCalcKindTables.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.calculationkindid === self.calckindtabrow.calculationkindid
        )
          dublicate = true;
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + ": " + self.calckindtabrow.calculationkindname,
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      self.tabrow.TarifficationTitleCalcKindTables.push(self.calckindtabrow);
      self.calckindtabrow = {
        id: 0,
        ownerid: 0,
        calculationkindid: 0,
        calculationkindname: "",
        calccoef: 0,
        calcsum: 0,
        Status: 1,
      };
      self.calckindclaculate();
    },

    calckindchange() {
      var self = this;
      self.calckindtabrow.calcsum = self.roundToTwo(
        (self.tabrow.salary * self.calckindtabrow.calccoef) / 100,
        0
      );
    },
    calckindclaculate() {
      var self = this;
      self.calckindtotalsum = 0;
      self.tabrow.TarifficationTitleCalcKindTables.forEach(function (item) {
        if (item.Status !== 3) {
          item.calcsum = self.roundToTwo(
            (self.tabrow.salary * item.calccoef) / 100,
            0
          );
          self.calckindtotalsum = self.calckindtotalsum + item.calcsum * 1;
        }
      });
      self.tabrow.fot = self.tabrow.salary + self.calckindtotalsum;
    },

    calculatetotal() {
      var self = this;
      var totalfot = 0;
      var quantity = 0;
      self.TarifficationTitle.TarifficationTitlePositionTables.forEach(
        function (item) {
          if (item.Status !== 3) {
            totalfot = totalfot + item.fot * 1;
            quantity = quantity + item.quantity * 1;
          }
        }
      );

      self.totalsum = totalfot;
      self.totalquantity = quantity;

      var rowvalue1 = 0;
      var rowvalue2 = 0;
      var rowvalue3 = 0;
      var rowvalue4 = 0;
      var rowvalue5 = 0;
      var rowvalue6 = 0;
      var rowvalue6 = 0;
      var rowvalue7 = 0;
      var rowvalue8 = 0;
      var rowvalue9 = 0;
      var rowvalue10 = 0;
      var rowvalue11 = 0;
      var rowvalue12 = 0;
      var rowvalue13 = 0;
      var rowvalue14 = 0;
      var rowvalue15 = 0;
      var rowvalue16 = 0;
      var rowvalue17 = 0;
      var rowvalue18 = 0;
      self.TarifficationTitle.IndicatorValueTables.forEach(function (item) {
        if (item.staffingindicatorid === 1) {
          item.totalsum = self.roundToTwo(totalfot, 0);
          item.quantity = quantity;
          rowvalue1 = item.totalsum;
        }
        if (item.staffingindicatorid === 4) {
          item.totalsum = self.roundToTwo(totalfot, 0);
          item.quantity = quantity;
          rowvalue4 = item.totalsum;
        }
        if (item.staffingindicatorid === 5) {
          item.totalsum = self.roundToTwo(
            totalfot * self.TarifficationTitle.formonths,
            0
          );
          rowvalue5 = item.totalsum;
        }
        if (item.staffingindicatorid === 6) {
          rowvalue6 = item.totalsum;
        }
        if (item.staffingindicatorid === 7) {
          item.totalsum = rowvalue6 * self.TarifficationTitle.formonths;
          rowvalue7 = item.totalsum;
        }
        if (item.staffingindicatorid === 8) {
          rowvalue8 = item.totalsum;
        }
        if (item.staffingindicatorid === 9) {
          rowvalue9 = item.totalsum;
        }
        if (item.staffingindicatorid === 10) {
          rowvalue10 = item.totalsum;
        }
        if (item.staffingindicatorid === 11) {
          rowvalue11 = item.totalsum;
        }
        if (item.staffingindicatorid === 14) {
          rowvalue14 = item.totalsum;
        }
        if (item.staffingindicatorid === 15) {
          rowvalue15 = item.totalsum;
        }
        if (item.staffingindicatorid === 16) {
          rowvalue16 = item.totalsum;
        }
        if (item.staffingindicatorid === 17) {
          rowvalue17 = item.totalsum;
        }
        if (item.staffingindicatorid === 18) {
          item.totalsum =
            rowvalue5 +
            rowvalue6 +
            rowvalue8 +
            rowvalue9 +
            rowvalue10 +
            rowvalue11 +
            rowvalue14 +
            rowvalue15 +
            rowvalue16 +
            rowvalue17;
          self.TarifficationTitle.docsum = item.totalsum;
        }
      });
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },

    roundToTwo(value, decimals) {
      value;
      decimals;

      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
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