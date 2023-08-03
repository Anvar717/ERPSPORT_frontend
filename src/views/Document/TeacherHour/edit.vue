<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("TeacherHour") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="TeacherHour.docnumber"
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
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <label>{{ $t("docdate") }}</label>

                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="TeacherHour.docdate"
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
                </ValidationProvider>
              </CCol>

              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="schoolyear"
                  rules="required"
                >
                  <label for>{{ $t("schoolyear") }}</label>
                  <v-select
                    :options="schoolyearlist"
                    v-model="TeacherHour.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <!-- <CCol>
                <ValidationProvider v-slot="v" name="personname" rules="required">
                  <label for>{{$t('EmployeePerson')}}</label>
                  <v-select
                    :options="employeelist"
                    v-model="TeacherHour.employeeenrolmentid"
                    :reduce="item => item.employeeenrolmentid"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="employeechange"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol> -->
              <b-col class="mt-n1">
                <label class="col-form-label col-sm-3">{{
                  $t("Employee")
                }}</label>
                <div class="d-flex">
                  <CInput
                    class="mb-0 mr-2"
                    style="width:100%"
                    disabled
                    v-model="TeacherHour.personname"
                  ></CInput>
                  <b-button
                    v-if="
                      $route.params.id == 0 && TeacherHour.Tables.length == 0
                    "
                    size="sm"
                    variant="primary"
                    @click="OpenEmployeeModal"
                  >
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </b-col>
              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="employeeenrolmentid"
                  rules="required|max:9"
                >
                  <CInput
                    disabled
                    :placeholder="$t('employeeenrolmentid')"
                    autocomplete="employeeenrolmentid"
                    :label="$t('employeeenrolmentid')"
                    v-model="TeacherHour.employeeenrolmentid"
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
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="TeacherHour.detailinfo"
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
                <label for="#"> {{ $t("OrganizationAccount") }} </label>
                <v-select
                  :options="OrganizationAccountList"
                  v-model="TeacherHour.organizationaccountid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="code"
                ></v-select>
              </CCol>
            </CRow>

            <!-- ----------------------------------------------- -->
            <CRow>
              <CCol>
                <b-tabs pills>
                  <b-tab :title="$t('Hours')" active>
                    <CRow>
                      <CCol class="text-right mb-4 mr-3">
                        <CButton
                          color="primary"
                          size="sm"
                          v-if="TeacherHour.CanSave"
                          @click="AddRow"
                        >
                          <b-icon icon="plus"> </b-icon>
                          {{ $t("Add") }}
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <b-table
                          :fields="fieldsMainTable"
                          :items="TeacherHour.Tables"
                          class="bg-color-table text-center tdpadding mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                          <template v-slot:cell(schoolsubjectname)="{ item }">
                            <p>{{ item.schoolsubjectname }}</p>
                          </template>
                          <template
                            v-slot:cell(qualificationcategoryname)="{ item }"
                          >
                            <p>{{ item.qualificationcategoryname }}</p>
                          </template>
                          <template v-slot:cell(orgschoolgradename)="{ item }">
                            <p>{{ item.orgschoolgradename }}</p>
                          </template>
                          <template v-slot:cell(hours)="{ item }">
                            <p>{{ item.hours }}</p>
                          </template>
                          <template v-slot:cell(studentcount)="{ item }">
                            <p>{{ item.studentcount }}</p>
                          </template>
                          <template v-slot:cell(homeschoolinghour)="{ item }">
                            <p>{{ item.homeschoolinghour }}</p>
                          </template>
                          <template
                            v-slot:cell(homeschstdudentcount)="{ item }"
                          >
                            <p>{{ item.homeschstdudentcount }}</p>
                          </template>
                          <template v-slot:cell(isvacancyname)="{ item }">
                            <p>{{ item.isvacancyname }}</p>
                          </template>
                          <template v-slot:cell(detailinfo)="{ item }">
                            <p>{{ item.detailinfo }}</p>
                          </template>
                          <template v-slot:cell(actions)="{ item }">
                            <div class="text-center" v-if="TeacherHour.CanSave">
                              <b-link class="mr-2" @click="EditRow(item)">
                                <b-icon icon="pencil"></b-icon>
                              </b-link>
                              <b-link @click="DeleteItem(item)">
                                <b-icon icon="trash"> </b-icon>
                              </b-link>
                            </div>
                          </template>
                          <template #custom-foot>
                            <b-tr>
                              <b-th colspan="3" class="text-center">
                                {{ $t("Total") }}
                              </b-th>
                              <b-th class="text-center">
                                {{ allsum.hours }}
                              </b-th>
                              <b-th class="text-center">
                                {{ allsum.studentcount }}
                              </b-th>
                              <b-th class="text-center">
                                {{ allsum.homeschoolinghour }}
                              </b-th>
                              <b-th class="text-center">
                                {{ allsum.homeschstdudentcount }}
                              </b-th>
                              <b-th> </b-th>
                              <b-th> </b-th>
                              <b-th> </b-th>
                            </b-tr>
                          </template>
                        </b-table>
                      </CCol>
                    </CRow>

                    <b-modal no-close-on-backdrop id="AddModal" size="xl">
                      <template v-slot:modal-title>{{
                        $t("TeacherHour")
                      }}</template>
                      <CCard sm="6">
                        <CCardBody sm="6">
                          <CRow>
                            <CCol>
                              <label>{{ $t("orgschoolgrade") }}</label>
                              <v-select
                                :options="orgschoolgradelist"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                v-model="tabrow.orgschoolgradeid"
                                @input="ChangeOrgGrade"
                              ></v-select>
                            </CCol>
                            <CCol>
                              <label>{{ $t("schoolsubject") }}</label>
                              <v-select
                                :options="schoolsubjectlist"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                v-model="tabrow.schoolsubjectid"
                                @input="ChangeTabrow"
                              ></v-select>
                            </CCol>
                            <CCol>
                              <label>{{ $t("qualificationcategory") }}</label>
                              <c-input
                                disabled
                                v-model="tabrow.qualificationcategoryname"
                              ></c-input>
                              <!-- <v-select
                    :options="qualificationcategorylist"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.qualificationcategoryid"
                  ></v-select> -->
                            </CCol>
                          </CRow>
                          <CRow class="mt-3">
                            <CCol>
                              <label>{{ $t("hours") }}</label>
                              <custom-number-input
                                v-if="firstgetdata.hours > 0"
                                class="mb-0"
                                size="lg"
                                v-model="tabrow.hours"
                              ></custom-number-input>
                              <custom-number-input
                                v-if="firstgetdata.hours == 0"
                                disabled
                                class="mb-0"
                                size="lg"
                                v-model="tabrow.hours"
                              ></custom-number-input>
                            </CCol>
                            <CCol>
                              <label>{{ $t("studentcount") }}</label>
                              <custom-number-input
                                v-if="firstgetdata.hours > 0"
                                class="mb-0"
                                size="lg"
                                v-model="tabrow.studentcount"
                              ></custom-number-input>
                              <custom-number-input
                                v-if="firstgetdata.hours == 0"
                                disabled
                                class="mb-0"
                                size="lg"
                                v-model="tabrow.studentcount"
                              ></custom-number-input>
                            </CCol>
                            <CCol>
                              <label>{{ $t("homeschoolinghour") }}</label>
                              <custom-number-input
                                class="mb-0"
                                v-if="firstgetdata.homeschoolinghour > 0"
                                size="lg"
                                v-model="tabrow.homeschoolinghour"
                              ></custom-number-input>
                              <custom-number-input
                                class="mb-0"
                                v-if="firstgetdata.homeschoolinghour == 0"
                                disabled
                                size="lg"
                                v-model="tabrow.homeschoolinghour"
                              ></custom-number-input>
                            </CCol>
                            <CCol>
                              <label>{{ $t("homeschstdudentcount") }}</label>
                              <custom-number-input
                                class="mb-0"
                                v-if="firstgetdata.homeschoolinghour > 0"
                                size="lg"
                                v-model="tabrow.homeschstdudentcount"
                              ></custom-number-input>
                              <custom-number-input
                                class="mb-0"
                                v-if="firstgetdata.homeschoolinghour == 0"
                                disabled
                                size="lg"
                                v-model="tabrow.homeschstdudentcount"
                              ></custom-number-input>
                            </CCol>
                          </CRow>
                          <CRow class="mt-3">
                            <CCol sm="9">
                              <label>{{ $t("detailinfo") }}</label>
                              <CInput
                                class="mb-0"
                                v-model="tabrow.detailinfo"
                              ></CInput>
                            </CCol>
                            <CCol sm="3">
                              <label for>{{ $t("isvacancy") }}</label>
                              <b-form-checkbox
                                v-model="tabrow.isvacancy"
                                name="check-button"
                                switch
                              ></b-form-checkbox>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCard>

                      <template v-slot:modal-footer>
                        <div class="text-center mx-auto">
                          <CButton
                            size="sm"
                            color="danger"
                            class="mr-2"
                            @click="$bvModal.hide('AddModal')"
                          >
                            <b-icon icon="arrow-left-short"></b-icon>
                            {{ $t("back") }}
                          </CButton>
                          <CButton size="sm" color="primary" @click="AddData">
                            <b-icon icon="check2"></b-icon>
                            {{ $t("Save") }}
                          </CButton>
                        </div>
                      </template>
                    </b-modal>
                  </b-tab>

                  <b-tab :title="$t('Salary')">
                    <CRow>
                      <CCol>
                        <div class="text-center mx-auto">
                          <CButton
                            size="sm"
                            class="mr-2"
                            color="info"
                            @click="OpenFillTableModal"
                          >
                            <b-icon icon="check2"></b-icon>
                            {{ $t("Calculate") }}
                          </CButton>
                          <!-- <CButton  size="sm" class="mr-2" color="danger" @click="clearTable">
                <b-icon icon="check2"></b-icon>
                {{ $t("Clear") }}
              </CButton> -->
                        </div>
                      </CCol>
                    </CRow>

                    <CRow class="mt-4">
                      <CCol>
                        <CRow>
                          <CCol>
                            <b-table
                              :fields="calcKindTable"
                              :items="TeacherHour.CalcKindTables"
                              class="bg-color-table text-center tdpadding mx-3"
                              style="vertical-align:middle"
                              bordered
                              responsive="sm"
                              :tbody-tr-class="rowClass"
                            >
                              <template
                                v-slot:cell(organizationaccountcode)="{ item }"
                              >
                                <p>{{ item.organizationaccountcode }}</p>
                              </template>
                              <template
                                v-slot:cell(schoolsubjectname)="{ item }"
                              >
                                <p>{{ item.schoolsubjectname }}</p>
                              </template>
                              <template
                                v-slot:cell(qualificationcategoryname)="{
                                  item,
                                }"
                              >
                                <p>{{ item.qualificationcategoryname }}</p>
                              </template>
                              <template
                                v-slot:cell(calculationkindname)="{ item }"
                              >
                                <p>{{ item.calculationkindname }}</p>
                              </template>
                              <template v-slot:cell(planhours)="{ item }">
                                <p>{{ item.planhours }}</p>
                              </template>
                              <template v-slot:cell(facthours)="{ item }">
                                <p>{{ item.facthours }}</p>
                              </template>
                              <template v-slot:cell(insum)="{ item }">
                                <p style="white-space:nowrap">
                                  {{
                                    $options.filters.currency(item.insum, {
                                      symbol: "",
                                      fractionCount: 2,
                                    })
                                  }}
                                </p>
                              </template>
                              <template v-slot:cell(percentage)="{ item }">
                                <p>{{ item.percentage }}</p>
                              </template>
                              <template v-slot:cell(outsum)="{ item }">
                                <p style="white-space:nowrap">
                                  {{
                                    $options.filters.currency(item.outsum, {
                                      symbol: "",
                                      fractionCount: 2,
                                    })
                                  }}
                                </p>
                              </template>
                              <!-- <template v-slot:cell(actions)="{item}">
                <div class="text-center" v-if="TeacherHour.CanSave">
                  <b-link class="mr-2" @click="EditRow(item)">
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link @click="DeleteItem(item)">
                    <b-icon icon="trash">

                    </b-icon>
                  </b-link>
                </div>
              </template> -->
                              <template #custom-foot>
                                <b-tr>
                                  <b-th colspan="8" class="text-center">
                                    {{ $t("Total") }}
                                  </b-th>
                                  <!--                   <b-th class="text-center">
                    {{ allsumkindtables.planhours }}
                  </b-th>
                  <b-th class="text-center">
                    {{ allsumkindtables.facthours }}
                  </b-th>
                  <b-th class="text-center">
                    <p style="white-space:nowrap">{{  $options.filters.currency(allsumkindtables.insum, {
                                            symbol: "",
                                            fractionCount: 2,
                                        })}}  </p>
                  </b-th> -->
                                  <!-- <b-th class="text-center">

                  </b-th>
                                    <b-th class="text-center">

                  </b-th>
                                    <b-th class="text-center">

                  </b-th>
                                    <b-th class="text-center">

                  </b-th> -->
                                  <b-th class="text-center">
                                    <p style="white-space:nowrap">
                                      {{
                                        $options.filters.currency(
                                          allsumkindtables.outsum,
                                          {
                                            symbol: "",
                                            fractionCount: 2,
                                          }
                                        )
                                      }}
                                    </p>
                                  </b-th>
                                </b-tr>
                              </template>
                            </b-table>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </b-tab>
                </b-tabs>
              </CCol>
            </CRow>

            <!-- ---------------------------------- -->
          </ValidationObserver>
        </CCardBody>

        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'TeacherHour' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="TeacherHour.CanSave"
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
          size="xl"
          :title="$t('Employee')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <employee-list-component
            :ondate="TeacherHour.docdate"
            @SelectedItem="SelectedItem"
            @DblClick="Enterdata"
          >
          </employee-list-component>
          <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
          <!-- <edit-person-component></edit-person-component> -->

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEmployeeModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPerson">
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
import SchoolYearService from "@/services/SchoolYear.service";
import TeacherHourService from "@/services/TeacherHour.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import CurriculumOrgschGradeService from "@/services/CurriculumOrgschGrade.service";
import EmployeeListComponent from "@/components/EmployeeList";
import OrganizationService from "@/services/organization.service";
export default {
  components: { EmployeeListComponent },
  data() {
    return {
      SaveLoading: false,
      selectedrowid: 0,
       checkhours : '',
      TeacherHour: {},
      schoolyearlist: [],
      employeelist: [],
      schoolsubjectlist: [],
      qualificationcategorylist: [],
      orgschoolgradelist: [],
      OrganizationAccountList: [],
      lang: localStorage.getItem("locale") || "ru",
      fieldsMainTable: [
        { key: "schoolsubjectname", label: this.$t("schoolsubjectname") },
        {
          key: "qualificationcategoryname",
          label: this.$t("qualificationcategoryname"),
        },
        { key: "orgschoolgradename", label: this.$t("orgschoolgradename") },
        { key: "hours", label: this.$t("hours") },
        { key: "studentcount", label: this.$t("studentcount") },
        { key: "homeschoolinghour", label: this.$t("homeschoolinghour") },
        { key: "homeschstdudentcount", label: this.$t("homeschstdudentcount") },
        { key: "isvacancyname", label: this.$t("isvacancyname") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") },
      ],
      calcKindTable: [
        {
          key: "organizationaccountcode",
          label: this.$t("organizationaccountcode"),
        },
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubjectname"),
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("qualificationcategoryname"),
        },
        { key: "calculationkindname", label: this.$t("calculationkindname") },
        { key: "planhours", label: this.$t("planhours") },
        { key: "facthours", label: this.$t("facthours") },
        { key: "insum", label: this.$t("insum") },
        { key: "percentage", label: this.$t("percentage") },
        { key: "outsum", label: this.$t("outsum") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        hours: 0,
        studentcount: 0,
        homeschoolinghour: 0,
        homeschstdudentcount: 0,
        detailinfo: "",
        isvacancy: false,
        Status: 1,
      },
      tabrow1: {
        id: 0,
        ownerid: 0,
        organizationaccountid: 0,
        organizationaccountcode: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        calculationkindid: 0,
        calculationkindname: "",
        planhours: 0,
        facthours: 0,
        insum: 0,
        percentage: 0,
        outsum: "",
        Status: 1,
      },
      firstgetdata: {
        hours: 0,
        studentcount: 0,
        homeschoolinghour: 0,
        homeschstdudentcount: 0,
      },
      personvalue: {},
      allsum: {
        hours: 0,
        studentcount: 0,
        homeschoolinghour: 0,
        homeschstdudentcount: 0,
      },
      allsumkindtables: {
        planhours: 0,
        facthours: 0,
        insum: 0,
        outsum: 0,
      },
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;

    SchoolYearService.GetAll().then((res) => {
      self.schoolyearlist = res.data;
    });

    OrgSchoolGradeService.GetAll().then((res) => {
      self.orgschoolgradelist = res.data;
    });
    QualificationCategoryService.GetAll().then((res) => {
      self.qualificationcategorylist = res.data;
    });
    OrganizationService.GetOrganizationAccountList().then((res) => {
      this.OrganizationAccountList = res.data;
    });
    TeacherHourService.Get(self.selectedrowid).then((res) => {
      self.TeacherHour = res.data;
      self.calculateTablesAllSum();
      self.calculateCalcKindTables();
      self.ChangeOrgGrade();
    });
  },
  computed: {},
  methods: {
    calculateCalcKindTables() {
      var self = this;
      self.allsumkindtables = {
        planhours: 0,
        facthours: 0,
        insum: 0,
        outsum: 0,
      };
      self.TeacherHour.CalcKindTables.forEach(function(item) {
        if (item.Status !== 3) {
          self.allsumkindtables.planhours += item.planhours;
          self.allsumkindtables.facthours += item.facthours;
          self.allsumkindtables.insum += item.insum;
          self.allsumkindtables.outsum += item.outsum;
        }
      });
    },
    calculateTablesAllSum() {
      var self = this;
      self.allsum = {
        hours: 0,
        homeschoolinghour: 0,
        studentcount: 0,
        homeschstdudentcount: 0,
      };
      self.TeacherHour.Tables.forEach(function(item) {
        if (item.Status !== 3) {
          self.allsum.hours += item.hours;
          self.allsum.homeschstdudentcount += item.homeschstdudentcount;
          self.allsum.studentcount += item.studentcount;
          self.allsum.homeschoolinghour += item.homeschoolinghour;
        }
      });
    },
    clearTable() {
      var self = this;
      self.TeacherHour.CalcKindTables.forEach(function(item) {
        item.Status = 3;
      });

      self.calculateCalcKindTables();
    },
    OpenFillTableModal() {
      var self = this;
      if (
        self.TeacherHour.organizationaccountid === 0 ||
        self.TeacherHour.organizationaccountid === null ||
        self.TeacherHour.organizationaccountid === undefined ||
        self.TeacherHour.organizationaccountid === ""
      ) {
        self.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.TeacherHour.CalcKindTables.forEach(function(item) {
        item.Status = 3;
      });
      self.calculateCalcKindTables();
      TeacherHourService.RecalcCalcKindTables(self.TeacherHour).then((res) => {
        res.data.CalcKindTables.forEach(function(item) {
          if (item.Status != 3) {
            item.Status = 1;
            self.TeacherHour.CalcKindTables.push(item);
          }
        });
        self.calculateCalcKindTables();
      });
    },
    Enterdata(data) {
      this.TeacherHour.personid = data.personid;
      this.TeacherHour.personname = data.personname;
      this.TeacherHour.employeeenrolmentid = data.employeeenrolmentid;

      this.CloseEmployeeModal();
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl");
    },
    AddPerson() {
      this.CloseEmployeeModal();
      this.TeacherHour.personid = this.personvalue.personid;
      this.TeacherHour.personname = this.personvalue.personname;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    schoolyearchange() {
      var self = this;
      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.TeacherHour.docdate,
        0
      ).then((res) => {
        self.employeelist = res.data;
      });
    },
    employeechange() {
      var self = this;
      /*   if (self.TeacherHour.personid > 0) {
        self.TeacherHour.personid = "";
      } */
      console.log(self.TeacherHour.employeeenrolmentid);
      if (self.TeacherHour.employeeenrolmentid > 0) {
        self.TeacherHour.personname = self.employeelist.filter(function(item) {
          if (item.employeeenrolmentid === self.TeacherHour.employeeenrolmentid)
            return item;
        })[0].name;
        self.TeacherHour.personid = self.employeelist.filter(function(item) {
          if (item.employeeenrolmentid === self.TeacherHour.employeeenrolmentid)
            return item;
        })[0].id;
        console.log(self.TeacherHour.employeeenrolmentid);
        console.log(self.TeacherHour.personid);
      }
    },

    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        self: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    AddRow() {
      var self = this;
      self.tabrow = {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        orgschoolgradeid: 0,
        orgschoolgradename: "",
        hours: 0,
        studentcount: 0,
        homeschoolinghour: 0,
        homeschstdudentcount: 0,
        detailinfo: "",
        isvacancy: false,
        Status: 1,
      };
      self.firstgetdata = {
        hours: 0,
        studentcount: 0,
        homeschoolinghour: 0,
        homeschstdudentcount: 0,
      };
      self.$bvModal.show("AddModal");
    },
    ChangeOrgGrade() {
      SchoolSubjectService.GetAll(
        this.lang,
        false,
        this.TeacherHour.schoolyearid,
        this.tabrow.orgschoolgradeid,
        false
      ).then((res) => {
        this.schoolsubjectlist = res.data;
      });
      this.ChangeTabrow();
    },
    ChangeTabrow() {
      var self = this;
      self.tabrow.schoolsubjectname = self.schoolsubjectlist.filter(
        (item) => item.id === self.tabrow.schoolsubjectid
      )[0].name;
      self.tabrow.hours = 0;
      self.tabrow.studentcount = 0;
      self.tabrow.homeschoolinghour = 0;
      self.tabrow.homeschstdudentcount = 0;
      if (
        self.tabrow.schoolsubjectid > 0 &&
        self.tabrow.orgschoolgradeid > 0 &&
        self.TeacherHour.schoolyearid > 0
      ) {
        CurriculumOrgschGradeService.GetFreeClassTime(
          self.TeacherHour.schoolyearid,
          self.tabrow.schoolsubjectid,
          self.tabrow.orgschoolgradeid,
          self.TeacherHour.id
        )
          .then((res) => {
            self.tabrow.hours = res.data.hours;
            self.checkhours = res.data.hours;
            self.tabrow.studentcount = res.data.studentcount;
            self.tabrow.homeschoolinghour = res.data.homeschoolinghour;
            self.tabrow.homeschstdudentcount = res.data.homeschstdudentcount;
            self.firstgetdata = {
              hours: res.data.hours,
              studentcount: res.data.studentcount,
              homeschoolinghour: res.data.homeschoolinghour,
              homeschstdudentcount: res.data.homeschstdudentcount,
            };
          })
          .catch((err) => {
            this.makeToast(err.response.data.error, this.$t("error"), "danger");
          });
      }
      // console.log(self.TeacherHour.personid);
      // console.log(self.tabrow.schoolsubjectid);
      // console.log(self.TeacherHour.docdate);
      if (self.TeacherHour.personid > 0 && self.tabrow.schoolsubjectid > 0) {
        QualificationCategoryService.GetPersonQualificationCategory(
          self.TeacherHour.personid,
          self.tabrow.schoolsubjectid,
          self.TeacherHour.docdate
        )
          .then((res) => {
            self.tabrow.qualificationcategoryid =
              res.data.QualificationCategoryID;
            self.tabrow.qualificationcategoryname =
              res.data.QualificationCategoryName;
          })
          .catch((error) => {
            self.makeToast(
              error.response.data.error || error,
              self.$t("error"),
              "danger"
            );
          });
      }
    },
    AddData() {
      var self = this;

      if (
        self.tabrow.schoolsubjectid === null ||
        self.tabrow.schoolsubjectid === undefined ||
        self.tabrow.schoolsubjectid === 0
      ) {
        this.makeToast(
          this.$t("schoolsubjectidNotSelected"),
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
          this.$t("qualificationcategoryidNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.tabrow.orgschoolgradeid === null ||
        self.tabrow.orgschoolgradeid === undefined ||
        self.tabrow.orgschoolgradeid === 0
      ) {
        this.makeToast(
          this.$t("orgschoolgradeidNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.tabrow.hours === 0 && self.tabrow.homeschoolinghour > 0) {
        if (
          self.tabrow.homeschstdudentcount === null ||
          self.tabrow.homeschstdudentcount === undefined ||
          self.tabrow.homeschstdudentcount === 0
        ) {
          this.makeToast(
            this.$t("homeschstdudentcountNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.tabrow.hours > 0 && self.tabrow.homeschoolinghour === 0) {
        if (
          self.tabrow.studentcount === null ||
          self.tabrow.studentcount === undefined ||
          self.tabrow.studentcount === 0
        ) {
          this.makeToast(
            this.$t("studentcountNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.tabrow.hours === 0 && self.tabrow.homeschoolinghour === 0) {
        this.makeToast(
          this.$t("hoursANDhomeschoolinghourNot"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      var mainhours = 0;
      self.TeacherHour.Tables.forEach(function(item) {
        if (item.Status !== 3) {
          mainhours += item.hours;
        }
      });

      if (mainhours === 0 && self.tabrow.hours === 0) {
        if (
          self.tabrow.homeschoolinghour === null ||
          self.tabrow.homeschoolinghour === undefined ||
          self.tabrow.homeschoolinghour === 0
        ) {
          this.makeToast(
            this.$t("homeschoolinghourNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.homeschstdudentcount === null ||
          self.tabrow.homeschstdudentcount === undefined ||
          self.tabrow.homeschstdudentcount === 0
        ) {
          this.makeToast(
            this.$t("homeschstdudentcountNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      self.tabrow.schoolsubjectname = self.schoolsubjectlist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.schoolsubjectid) return item;
      })[0].name;
      self.tabrow.qualificationcategoryname = self.qualificationcategorylist.filter(
        function(item) {
          if (item.id === self.tabrow.qualificationcategoryid) return item;
        }
      )[0].name;
      self.tabrow.orgschoolgradename = self.orgschoolgradelist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.orgschoolgradeid) return item;
      })[0].name;

      // if (
      //   self.tabrow.hours > self.firstgetdata.hours ||
      //   self.tabrow.hours < 0
      // ) {
      //   this.makeToast(this.$t("hoursNotSelected"), this.$t("Error"), "danger");
      //   return false;
      // }
      // if (
      //   self.tabrow.studentcount > self.firstgetdata.studentcount ||
      //   self.tabrow.studentcount < 0
      // ) {
      //   this.makeToast(
      //     this.$t("studentcountNotSelected"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.tabrow.homeschoolinghour > self.firstgetdata.homeschoolinghour ||
        self.tabrow.homeschoolinghour < 0
      ) {
        this.makeToast(
          this.$t("homeschoolinghourNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.homeschstdudentcount >
          self.firstgetdata.homeschstdudentcount ||
        self.tabrow.homeschstdudentcount < 0
      ) {
        this.makeToast(
          this.$t("homeschoolinghourNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if(self.firstgetdata.hours > 0) {
         if (
        self.tabrow.hours > self.checkhours
      ) {
        this.makeToast(
          this.$t("hoursnotcorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      }
      if (self.tabrow.id === 0) {
        var addrow = true;
        self.TeacherHour.Tables.forEach(function(item) {
          if (
            item.schoolsubjectid === self.tabrow.schoolsubjectid &&
            item.orgschoolgradeid === self.tabrow.orgschoolgradeid &&
            item.id === 0
          ) {
            item.schoolsubjectid = self.tabrow.schoolsubjectid;
            item.schoolsubjectname = self.tabrow.schoolsubjectname;
            item.qualificationcategoryid = self.tabrow.qualificationcategoryid;
            item.qualificationcategoryname =
              self.tabrow.qualificationcategoryname;
            item.orgschoolgradeid = self.tabrow.orgschoolgradeid;
            item.orgschoolgradename = self.tabrow.orgschoolgradename;
            item.hours = self.tabrow.hours;
            item.studentcount = self.tabrow.studentcount;
            item.homeschoolinghour = self.tabrow.homeschoolinghour;
            item.homeschstdudentcount = self.tabrow.homeschstdudentcount;
            item.detailinfo = self.tabrow.detailinfo;
            item.isvacancy = self.tabrow.isvacancy;
            item.Status = 1;
            addrow = false;
          }
        });
        if (addrow) {
          var dubl = 0;
          self.TeacherHour.Tables.forEach(function(item) {
            if (item.Status !== 3) {
              if (
                item.schoolsubjectid === self.tabrow.schoolsubjectid &&
                item.orgschoolgradeid === self.tabrow.orgschoolgradeid
              )
                dubl = dubl + 1;
              console.log("this is item " + item.schoolsubjectid);
              console.log("this is tabrow" + self.tabrow.schoolsubjectid);
              console.log("this is " + dubl);
            }
          });
          if (dubl >= 1) {
            this.makeToast(this.$t("dubl"), this.$t("Error"), "danger");
            return false;
          }
          self.TeacherHour.Tables.push(self.tabrow);
          self.tabrow = {
            id: 0,
            ownerid: 0,
            schoolsubjectid: 0,
            schoolsubjectname: "",
            qualificationcategoryid: 0,
            qualificationcategoryname: "",
            orgschoolgradeid: 0,
            orgschoolgradename: "",
            hours: 0,
            studentcount: 0,
            homeschoolinghour: 0,
            homeschstdudentcount: 0,
            detailinfo: "",
            isvacancy: false,
            Status: 1,
          };
        }
      } else {
        self.TeacherHour.Tables.forEach(function(item) {
          if (item.id === self.tabrow.id) {
            item.schoolsubjectid = self.tabrow.schoolsubjectid;
            item.schoolsubjectname = self.tabrow.schoolsubjectname;
            item.qualificationcategoryid = self.tabrow.qualificationcategoryid;
            item.qualificationcategoryname =
              self.tabrow.qualificationcategoryname;
            item.orgschoolgradeid = self.tabrow.orgschoolgradeid;
            item.orgschoolgradename = self.tabrow.orgschoolgradename;
            item.hours = self.tabrow.hours;
            item.studentcount = self.tabrow.studentcount;
            item.homeschoolinghour = self.tabrow.homeschoolinghour;
            item.homeschstdudentcount = self.tabrow.homeschstdudentcount;
            item.detailinfo = self.tabrow.detailinfo;
            item.isvacancy = self.tabrow.isvacancy;
            item.Status = 2;
          }
        });
        self.tabrow = {
          id: 0,
          ownerid: 0,
          schoolsubjectid: 0,
          schoolsubjectname: "",
          qualificationcategoryid: 0,
          qualificationcategoryname: "",
          orgschoolgradeid: 0,
          orgschoolgradename: "",
          hours: 0,
          studentcount: 0,
          homeschoolinghour: 0,
          homeschstdudentcount: 0,
          detailinfo: "",
          isvacancy: false,
          Status: 1,
        };
      }
      self.firstgetdata = {
        hours: 0,
        studentcount: 0,
        homeschoolinghour: 0,
        homeschstdudentcount: 0,
      };
      self.$bvModal.hide("AddModal");
      self.calculateTablesAllSum();
    },

    EditRow(item) {
      var self = this;
      self.tabrow = {
        id: item.id,
        ownerid: item.ownerid,
        schoolsubjectid: item.schoolsubjectid,
        schoolsubjectname: item.schoolsubjectname,
        qualificationcategoryid: item.qualificationcategoryid,
        qualificationcategoryname: item.qualificationcategoryname,
        orgschoolgradeid: item.orgschoolgradeid,
        orgschoolgradename: item.orgschoolgradename,
        hours: item.hours,
        studentcount: item.studentcount,
        homeschoolinghour: item.homeschoolinghour,
        homeschstdudentcount: item.homeschstdudentcount,
        detailinfo: item.detailinfo,
        isvacancy: item.isvacancy,
        Status: 2,
      };
      self.calculateTablesAllSum();
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
      this.calculateTablesAllSum();
    },
    checkdata() {
      var self = this;
      if (
        self.TeacherHour.docnumber === 0 ||
        self.TeacherHour.docnumber === null ||
        self.TeacherHour.docnumber === undefined ||
        self.TeacherHour.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeacherHour.docdate === 0 ||
        self.TeacherHour.docdate === null ||
        self.TeacherHour.docdate === undefined ||
        self.TeacherHour.docdate === ""
      ) {
        self.makeToast(
          this.$t("docdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeacherHour.schoolyearid === 0 ||
        self.TeacherHour.schoolyearid === null ||
        self.TeacherHour.schoolyearid === undefined ||
        self.TeacherHour.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeacherHour.personid === 0 ||
        self.TeacherHour.personid === null ||
        self.TeacherHour.personid === undefined ||
        self.TeacherHour.personid === ""
      ) {
        this.makeToast(
          this.$t("EmployeePersonNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeacherHour.organizationaccountid === 0 ||
        self.TeacherHour.organizationaccountid === null ||
        self.TeacherHour.organizationaccountid === undefined ||
        self.TeacherHour.organizationaccountid === ""
      ) {
        self.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.TeacherHour.Tables.length === 0) {
        self.makeToast(this.$t("TablesNotFilled"), self.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.checkdata()) {
        return false;
      }
      self.TeacherHour;

      TeacherHourService.Update(self.TeacherHour)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "TeacherHour" });
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
  watch: {
    "TeacherHour.docdate": {
      handler(newValue, oldValue) {
        this.schoolyearchange();
      },
    },
    "TeacherHour.schoolyearid": {
      handler(newValue, oldValue) {
        this.schoolyearchange();
      },
    },
    /* "TeacherHour.personid": {
      handler(newValue, oldValue) {
          this.employeechange();
      }
    }, */
  },
};
</script>

<style>

</style>
