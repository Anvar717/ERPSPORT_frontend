<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("Tariffication") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'Tariffication' })"
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
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required"
                >
                  <label class="col-form-label col-sm-12">{{
                    $t("docnumber")
                  }}</label>
                  <CInput
                    disabled
                    autocomplete="text"
                    v-model="Tariffication.docnumber"
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
                  v-model="Tariffication.docdate"
                  size="sm"
                  style="width : 100%"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </CCol>
              <CCol sm="2">
                <label>{{ $t("schoolyear") }}</label>
                <v-select
                  :options="schoolyearlist"
                  v-model="Tariffication.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol>
                <CInput
                  autocomplete="text"
                  :label="$t('detailinfo')"
                  v-model="Tariffication.detailinfo"
                ></CInput>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>

        <CRow v-if="Tariffication.CanSave">
          <CCol lg="12" class="text-lg-right">
            <div class="d-flex justify-content-lg-end">
              <div class="text-right ml-3">
                <CButton class="sm-1" size="sm" color="info" @click="fillTable">
                  <b-icon icon="list-ul"></b-icon>
                  {{ $t("Fill") }}
                </CButton>
              </div>
              <div class="text-left ml-3 mr-3">
                <CButton
                  class="xl-1"
                  size="sm"
                  color="danger"
                  @click="clearTable"
                >
                  <b-icon icon="exclamation-octagon"></b-icon>
                  {{ $t("Clear") }}
                </CButton>
              </div>
            </div>
          </CCol>
          <CCol>
          </CCol>
        </CRow>
        <CRow class="mt-2">
          <CCol>
            <div class="mobileSty mx-3" style="overflow-x: auto;">
              <b-table
                :fields="TarifficationTables"
                :items="Tariffication.Tables"
                class="bg-color-table text-center tdpadding"
                style="vertical-align: middle;"
                bordered
                :tbody-tr-class="rowClass"
              >
                <template v-slot:cell(personname)="{ item }">
                  <p>{{ item.personname }}</p>
                </template>
                <!--  <template v-slot:cell(employeeenrolmentid)="{item}">
                  <p>{{item.employeeenrolmentid}}</p>
                </template> -->
                <template v-slot:cell(qualificationcategoryname)="{ item }">
                  <p>{{ item.qualificationcategoryname }}</p>
                </template>
                <template v-slot:cell(schoolsubjectname)="{ item }">
                  <p>{{ item.schoolsubjectname }}</p>
                </template>
                <template v-slot:cell(basictariffratesum)="{ item }">
                  <p>
                    {{
                      $options.filters.currency(item.basictariffratesum, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}
                  </p>
                </template>
                <template v-slot:cell(headorgschoolgradename)="{ item }">
                  <p v-if="item.headorgschoolgradeid > 0">
                    {{ $t("orgschoolgradename") }}:{{
                      item.headorgschoolgradename
                    }}
                  </p>
                </template>
                <template v-slot:cell(employmenttypename)="{ item }">
                  <p>{{ item.employmenttypename }}</p>
                </template>
                <template v-slot:cell(schoolgradegroupname)="{ item }">
                  <p>{{ item.schoolgradegroupname }}</p>
                </template>
                <template v-slot:cell(workhours)="{ item }">
                  <p>{{ item.workhours }}</p>
                </template>
                <template v-slot:cell(teachinghours)="{ item }">
                  <p>{{ item.teachinghours }}</p>
                </template>
                <template v-slot:cell(totalhours)="{ item }">
                  <p>{{ item.totalhours }}</p>
                </template>
                <template v-slot:cell(worksalary)="{ item }">
                  <p>
                    {{
                      $options.filters.currency(item.worksalary, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}
                  </p>
                </template>
                <template v-slot:cell(teachingsalary)="{ item }">
                  <p>
                    {{
                      $options.filters.currency(item.teachingsalary, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}
                  </p>
                </template>
                <template v-slot:cell(tarifficationcalckindssum)="{ item }">
                  <p>
                    {{
                      $options.filters.currency(item.tarifficationcalckindssum, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}
                  </p>
                </template>
                <template v-slot:cell(tarifficationcalckinds)="{ item }">
                  <p>{{ item.tarifficationcalckinds }}</p>
                </template>
                <template v-slot:cell(totalsalary)="{ item }">
                  <p>
                    {{
                      $options.filters.currency(item.totalsalary, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}
                  </p>
                </template>
                <template v-slot:custom-foot>
                  <b-tr>
                    <!-- <b-th></b-th> -->
                    <b-th
                      style="text-align: center; font-size: 15px; color: blue"
                      >{{ $t("Total") }}</b-th
                    >
                    <b-th></b-th>
                    <b-th></b-th>
                    <b-th></b-th>
                    <b-th></b-th>
                    <b-th></b-th>
                    <b-th></b-th>
  
                    <b-th
                      style="text-align: center; font-size: 15px; color: blue"
                      >{{
                        $options.filters.currency(tablestotaltabrow.workhours, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}</b-th
                    >
                    <b-th>
                      <p style="text-align: center; font-size: 15px; color: blue">
                        {{
                          $options.filters.currency(
                            tablestotaltabrow.teachinghours,
                            { symbol: "", fractionCount: 2 }
                          )
                        }}
                      </p>
                    </b-th>
                    <b-th>
                      <p style="text-align: center; font-size: 15px; color: blue">
                        {{
                          $options.filters.currency(
                            tablestotaltabrow.totalhours,
                            { symbol: "", fractionCount: 2 }
                          )
                        }}
                      </p>
                    </b-th>
                    <b-th>
                      <p style="text-align: center; font-size: 15px; color: blue">
                        {{
                          $options.filters.currency(
                            tablestotaltabrow.worksalary,
                            { symbol: "", fractionCount: 2 }
                          )
                        }}
                      </p>
                    </b-th>
                    <b-th>
                      <p style="text-align: center; font-size: 15px; color: blue">
                        {{
                          $options.filters.currency(
                            tablestotaltabrow.teachingsalary,
                            { symbol: "", fractionCount: 2 }
                          )
                        }}
                      </p>
                    </b-th>
                    <b-th>
                      <p style="text-align: center; font-size: 15px; color: blue">
                        {{
                          $options.filters.currency(
                            tablestotaltabrow.tarifficationcalckindssum,
                            { symbol: "", fractionCount: 2 }
                          )
                        }}
                      </p>
                    </b-th>
                    <b-th></b-th>
                    <b-th>
                      <p style="text-align: center; font-size: 15px; color: blue">
                        {{
                          $options.filters.currency(
                            tablestotaltabrow.totalsalary,
                            { symbol: "", fractionCount: 2 }
                          )
                        }}
                      </p>
                    </b-th>
                  </b-tr>
                </template>
              </b-table>
            </div>
          </CCol>
        </CRow>
        <CRow class="mt-3">
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-3"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'Tariffication' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="Tariffication.CanSave"
                size="sm"
                color="success"
                class="mr-3"
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
import TarifficationService from "@/services/Tariffication.service";
import SchoolYearService from "@/services/SchoolYear.service";

export default {
  data() {
    return {
      SaveLoading: false,
      Tariffication: {},
      schoolyearlist: [],

      TarifficationTables: [
        { key: "personname", label: this.$t("Employee") },
        /*  { key: "employeeenrolmentid", label: this.$t("employeeenrolmentid") }, */
        {
          key: "qualificationcategoryname",
          label: this.$t("qualificationcategory"),
        },
        { key: "schoolsubjectname", label: this.$t("schoolsubjectname") },
        { key: "headorgschoolgradename", label: this.$t("HeadOrgSchoolGrade") },
        { key: "basictariffratesum", label: this.$t("basictariffratesum") },
        { key: "employmenttypename", label: this.$t("employmenttype") },
        { key: "schoolgradegroupname", label: this.$t("schoolgradegroup") },
        { key: "workhours", label: this.$t("workhours") },
        { key: "teachinghours", label: this.$t("teachinghours") },
        { key: "totalhours", label: this.$t("totalhours") },
        { key: "worksalary", label: this.$t("worksalary") },
        { key: "teachingsalary", label: this.$t("teachingsalary") },
        {
          key: "tarifficationcalckindssum",
          label: this.$t("tarifficationcalckindssum"),
        },
        {
          key: "tarifficationcalckinds",
          label: this.$t("tarifficationcalckinds"),
          class: "text-left",
        },
        { key: "totalsalary", label: this.$t("totalsalary") },
        /*  { key: "actions", label: this.$t("actions") }, */
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        qualificationcategoryid: 0,
        schoolsubjectid: 0,
        basictariffratesum: 0,
        employmenttypeid: 0,
        schoolgradegroupid: 0,
        workhours: 0,
        teachinghours: 0,
        totalhours: 0,
        worksalary: 0,
        teachingsalary: 0,
        totalsalary: 0,
        Status: 1,
      },
      tablestotaltabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        qualificationcategoryid: 0,
        schoolsubjectid: 0,
        basictariffratesum: 0,
        employmenttypeid: 0,
        schoolgradegroupid: 0,
        workhours: 0,
        teachinghours: 0,
        totalhours: 0,
        worksalary: 0,
        teachingsalary: 0,
        tarifficationcalckindssum: 0,
        totalsalary: 0,
        Status: 1,
      },
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    this.loadhelpers();
    this.loaddata();
  },
  methods: {
    loadhelpers() {
      var self = this;
      SchoolYearService.GetAll().then((res) => {
        self.schoolyearlist = res.data;
      });
    },
    loaddata() {
      var self = this;
      TarifficationService.Get(self.$route.params.id).then((res) => {
        self.Tariffication = res.data;
        this.calculatetotalrow();
      });
    },
    check() {
      /* var self = this;
      if (
        self.StudentGradeMovement.docnumber === null ||
        self.StudentGradeMovement.docnumber === undefined ||
        self.StudentGradeMovement.docnumber === 0 ||
        self.StudentGradeMovement.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.docdate === null ||
        self.StudentGradeMovement.docdate === undefined ||
        self.StudentGradeMovement.docdate === 0 ||
        self.StudentGradeMovement.docdate === ""
      ) {
        self.makeToast(
          self.$t("docdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.fromschoolyearid === null ||
        self.StudentGradeMovement.fromschoolyearid === undefined ||
        self.StudentGradeMovement.fromschoolyearid === 0 ||
        self.StudentGradeMovement.fromschoolyearid === ""
      ) {
        self.makeToast(
          self.$t("fromschoolyearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.toschoolyearid === null ||
        self.StudentGradeMovement.toschoolyearid === undefined ||
        self.StudentGradeMovement.toschoolyearid === 0 ||
        self.StudentGradeMovement.toschoolyearid === ""
      ) {
        self.makeToast(
          self.$t("toschoolyearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.fromorgschoolgradeid === null ||
        self.StudentGradeMovement.fromorgschoolgradeid === undefined ||
        self.StudentGradeMovement.fromorgschoolgradeid === 0 ||
        self.StudentGradeMovement.fromorgschoolgradeid === ""
      ) {
        self.makeToast(
          self.$t("fromorgschoolgradeNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StudentGradeMovement.toorgschoolgradeid === null ||
        self.StudentGradeMovement.toorgschoolgradeid === undefined ||
        self.StudentGradeMovement.toorgschoolgradeid === 0 ||
        self.StudentGradeMovement.toorgschoolgradeid === ""
      ) {
        self.makeToast(
          self.$t("toorgschoolgradeNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var tableitemscount = 0;
      tableitemscount = self.StudentGradeMovement.Tables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      }*/
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      TarifficationService.Update(self.Tariffication)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Tariffication" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    fillTable() {
      var self = this;
      self.Tariffication.Tables.forEach(function (item) {
        item.Status = 3;
      });
      TarifficationService.FillTarifficationTable(
        self.Tariffication.schoolyearid,
        self.Tariffication.docdate
      )
        .then((res) => {
          res.data.Tables.forEach(function (item) {
            self.Tariffication.Tables.push(item);
            self.calculatetotalrow();
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
    clearTable() {
      var self = this;
      self.Tariffication.Tables.forEach(function (item) {
        item.Status = 3;
      });
      self.calculatetotalrow();
    },
    calculatetotalrow() {
      var self = this;
      (self.tablestotaltabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        employeeenrolmentid: 0,
        qualificationcategoryid: 0,
        schoolsubjectid: 0,
        basictariffratesum: 0,
        employmenttypeid: 0,
        schoolgradegroupid: 0,
        workhours: 0,
        teachinghours: 0,
        totalhours: 0,
        worksalary: 0,
        teachingsalary: 0,
        tarifficationcalckindssum: 0,
        totalsalary: 0,
        Status: 1,
      }),
        self.Tariffication.Tables.forEach(function (item) {
          if (item.Status !== 3) {
            self.tablestotaltabrow;
            self.tablestotaltabrow.workhours =
              self.tablestotaltabrow.workhours + item.workhours;
            self.tablestotaltabrow.teachinghours =
              self.tablestotaltabrow.teachinghours + item.teachinghours;
            self.tablestotaltabrow.totalhours =
              self.tablestotaltabrow.totalhours + item.totalhours;
            self.tablestotaltabrow.worksalary =
              self.tablestotaltabrow.worksalary + item.worksalary;
            self.tablestotaltabrow.teachingsalary =
              self.tablestotaltabrow.teachingsalary + item.teachingsalary;
            self.tablestotaltabrow.tarifficationcalckindssum =
              self.tablestotaltabrow.tarifficationcalckindssum +
              item.tarifficationcalckindssum;
            self.tablestotaltabrow.totalsalary =
              self.tablestotaltabrow.totalsalary + item.totalsalary;
          }
        });
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
};
</script>

<style></style>
