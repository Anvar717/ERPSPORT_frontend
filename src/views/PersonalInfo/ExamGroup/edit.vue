<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("ExamGroup") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow class="my-2">
              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for="">{{ $t("docnumber") }}</label>
                <b-form-input
                  type="number"
                  disabled
                  v-model="ExamGroup.docnumber"
                  :placeholder="$t('docnumber')"
                ></b-form-input>
              </CCol>

              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for="">{{ $t("docdate") }}</label>
                <date-picker
                  v-model="ExamGroup.docdate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('docdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  :disabled="isFormsDisabled"
                >
                  <!-- <template slot="invalid-feedback">
                    <div class="invalid-feedback">{{ v.errors[0] }}</div>
                  </template> -->
                </date-picker>
              </CCol>

              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for>{{ $t("schoolyear") }}</label>
                <v-select
                  v-model="ExamGroup.schoolyearid"
                  :reduce="(item) => item.id"
                  label="name"
                  :options="SchoolyearList"
                  :disabled="isFormsDisabled"
                  :placeholder="$t('schoolyear')"
                >
                </v-select>
              </CCol>
              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for="">{{ $t("educationformtype") }}</label>
                <v-select
                  :options="EducationFormTypeList"
                  v-model="ExamGroup.educationformtypeid"
                  :reduce="(item) => item.id"
                  :disabled="isFormsDisabled"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for>{{ $t("highereduclassifier") }}</label>
                <v-select
                  v-model="ExamGroup.highereduclassifierid"
                  :reduce="(item) => item.id"
                  label="fullname"
                  :disabled="isFormsDisabled"
                  :options="HighereduclassifierList"
                  :placeholder="$t('highereduclassifier')"
                >
                </v-select>
              </CCol>
              <!-- <CCol lg="4" md="4" sm="11" class="text-left mt-2">
                <label for>{{ $t("educationform") }}</label>
                <v-select v-model="ExamGroup.educationformid" :reduce="(item) => item.id" label="name"
                  :options="EducationformList" :placeholder="$t('educationform')">
                </v-select>
              </CCol> -->
              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for>{{ $t("educationlanguage") }}</label>
                <v-select
                  v-model="ExamGroup.educationlanguageid"
                  :reduce="(item) => item.id"
                  label="name"
                  :disabled="isFormsDisabled"
                  :options="EducationlanguageList"
                  :placeholder="$t('educationlanguage')"
                >
                </v-select>
              </CCol>

              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for>{{ $t("gender") }}</label>
                <v-select
                  v-model="ExamGroup.genderid"
                  :reduce="(item) => item.id"
                  label="name"
                  :disabled="isFormsDisabled"
                  :options="GenderList"
                  :placeholder="$t('gender')"
                >
                </v-select>
              </CCol>
              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for="">{{ $t("groupname") }}</label>
                <b-form-input
                  v-model="ExamGroup.groupname"
                  :disabled="isFormsDisabled"
                  :placeholder="$t('groupname')"
                ></b-form-input>
              </CCol>
              <CCol sm="12" md="6" lg="4" class="text-left mt-2">
                <label for="">{{ $t("normativeact") }}</label>
                <b-form-input
                  v-model="ExamGroup.normativeact"
                  :disabled="isFormsDisabled"
                  :placeholder="$t('normativeact')"
                ></b-form-input>
              </CCol>
            </CRow>
            <!-- <CRow class="m-2">

            </CRow> -->

            <!-- <CRow class="m-2">
              <CCol lg="4" md="4" sm="11" class="text-left mt-2">
                <label for>{{ $t("status") }}</label>
                <v-select
                  v-model="ExamGroup.statusid"
                  :reduce="(item) => item.id"
                  label="name"
                  :options="statelist"
                  :placeholder="$t('status')"
                >
                </v-select>
              </CCol>
              <CCol lg="4" md="4" sm="11" class="text-left mt-2">
                <label for>{{ $t("organization") }}</label>
                <v-select
                  v-model="ExamGroup.organizationid"
                  :reduce="(item) => item.id"
                  label="name"
                  :options="OrganizationList"
                  :placeholder="$t('organization')"
                >
                </v-select>
              </CCol>
              <CCol sm="4" class="text-left mt-2">
                <label for="">{{ $t("canSave") }}</label>
                <b-form-checkbox
                  v-model="ExamGroup.canSave"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </CCol>
            </CRow> -->
            <b-row class="mb-2">
              <b-col class="text-right">
                <b-button variant="primary" @click="FillModal">
                  <b-icon v-if="!FillLoading" icon="arrow-down"></b-icon>
                  {{ $t("Fill") }}
                  <b-spinner v-if="FillLoading" small></b-spinner>
                </b-button>
                <!-- <b-button class="ml-2" variant="primary" @click="OpenAddModal">
                  <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                </b-button> -->
              </b-col>
            </b-row>
            <CRow class="">
              <CCol>
                <b-table
                  :fields="fieldsMainTable"
                  :items="itemsMainTable"
                  class="bg-color-table text-center"
                  style="vertical-align: middle"
                  bordered
                  :responsive="true"
                  :tbody-tr-class="rowClass"
                >
                  <template #cell(actions)="{ item }">
                    <div class="text-center">
                      <b-link
                        @click="EditItem(item)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Edit') }"
                      >
                        <b-icon icon="pencil"></b-icon>
                      </b-link>
                      <b-link
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Delete') }"
                        @click="DeleteItem(item)"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-link>
                    </div>
                  </template>
                </b-table>
              </CCol>
            </CRow>

            <b-modal
              id="AddModal"
              size="lg"
              :title="$t('ExamGroup')"
              no-close-on-backdrop
              modal-class="custom-size-modal-planshet"
              hide-footer
            >
              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("physicaltrainingtype") }}</label
                >
                <div class="col-sm-8">
                  <v-select
                    :options="physicaltrainingtypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="shortname"
                    v-model="tabrow.physicaltrainingtypeid"
                    @input="GetAssessmentcriteriaTableList"
                  >
                  </v-select>
                </div>
              </div>
              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("assessmentcriteriatable") }}</label
                >
                <div class="col-sm-8">
                  <v-select
                    :options="assessmentcriteriatablelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeCriteraTable"
                    v-model="tabrow.assessmentcriteriatableid"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examstartdate") }}</label
                >
                <div class="col-sm-8">
                  <custom-date-picker
                    v-model="tabrow.examstartdate"
                    @keyup="BindValueExamStartDate"
                    format="DD.MM.YYYY"
                    v-mask="'##.##.####'"
                    type="date"
                    :clearable="false"
                    lang="ru"
                    :placeholder="$t('examstartdate')"
                  >
                  </custom-date-picker>
                </div>
              </div>

              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examstarttime") }}</label
                >
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow.examstarttime"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    type="time"
                    :placeholder="$t('examstarttime')"
                    value-type="format"
                    input-class="my-custom-date "
                    format="HH:mm:ss"
                  >
                    <template #input>
                      <b-form-input
                        :placeholder="$t('examstarttime')"
                        v-mask="'##:##:##'"
                        type="text"
                        maxlength="10"
                        v-model="tabrow.examstarttime"
                        class="my-custom-date"
                      />
                    </template>
                  </date-picker>
                </div>
              </div>

              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examenddate") }}</label
                >
                <div class="col-sm-8">
                  <!-- <date-picker
                    v-model="tabrow.examenddate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('examenddate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker> -->
                  <custom-date-picker
                    v-model="tabrow.examenddate"
                    @keyup="BindValueExamEndDate"
                    format="DD.MM.YYYY"
                    v-mask="'##.##.####'"
                    type="date"
                    lang="ru"
                    :clearable="false"
                    :placeholder="$t('examenddate')"
                  >
                  </custom-date-picker>
                </div>
              </div>

              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examendtime") }}</label
                >
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow.examendtime"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    type="time"
                    :placeholder="$t('examendtime')"
                    value-type="format"
                    input-class="my-custom-date "
                    format="HH:mm:ss"
                  >
                    <template #input>
                      <b-form-input
                        :placeholder="$t('examendtime')"
                        v-mask="'##:##:##'"
                        type="text"
                        maxlength="10"
                        v-model="tabrow.examendtime"
                        class="my-custom-date"
                      />
                    </template>
                  </date-picker>
                </div>
              </div>

              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examaddress") }}</label
                >
                <div class="col-sm-8">
                  <b-form-input
                    v-model="tabrow.examaddress"
                    :placeholder="$t('examaddress')"
                  >
                  </b-form-input>
                </div>
              </div>
              <b-row>
                <b-col class="text-center">
                  <b-button
                    variant="danger"
                    @click="CloseAddModal"
                    class="mr-2"
                  >
                    <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                  </b-button>
                  <b-button variant="success" @click="Add">
                    <!-- @click="Add" -->
                    <b-icon icon="check2"></b-icon> {{ $t("Save") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-modal>
            <b-modal
              id="AddFillModal"
              size="lg"
              :title="$t('Fill')"
              no-close-on-backdrop
              modal-class="custom-size-modal-planshet"
              hide-footer
            >
              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examstartdate") }}</label
                >
                <div class="col-sm-8">
                  <!-- <date-picker
                    v-mask="'##.##.####'"
                    v-model="c"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('examstartdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker> -->
                  <custom-date-picker
                    v-model="FillData.examstartdate"
                    @keyup="BindValueExamStartDate"
                    format="DD.MM.YYYY"
                    v-mask="'##.##.####'"
                    type="date"
                    :clearable="false"
                    lang="ru"
                    :placeholder="$t('examstartdate')"
                  >
                  </custom-date-picker>
                </div>
              </div>

              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examstarttime") }}</label
                >
                <div class="col-sm-8">
                  <!-- <date-picker
                    v-model="tabrow.examstarttime"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    type="time"
                    :placeholder="$t('examstarttime')"
                    value-type="format"
                    format="HH:mm:ss"
                  >
                  </date-picker> -->
                  <date-picker
                    v-model="FillData.examstarttime"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    type="time"
                    :placeholder="$t('examstarttime')"
                    value-type="format"
                    input-class="my-custom-date "
                    format="HH:mm:ss"
                  >
                    <template #input>
                      <b-form-input
                        :placeholder="$t('examstarttime')"
                        v-mask="'##:##:##'"
                        type="text"
                        maxlength="10"
                        v-model="FillData.examstarttime"
                        class="my-custom-date"
                      />
                    </template>
                  </date-picker>
                </div>
              </div>

              <!-- <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examenddate") }}</label
                >
                <div class="col-sm-8">
                  <custom-date-picker
                    v-model="FillData.examenddate"
                    @keyup="BindValueExamEndDate"
                    format="DD.MM.YYYY"
                    v-mask="'##.##.####'"
                    type="date"
                    lang="ru"
                    :clearable="false"
                    :placeholder="$t('examenddate')"
                  >
                  </custom-date-picker>
                </div>
              </div> -->

              <!-- <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examendtime") }}</label
                >
                <div class="col-sm-8">
                  <date-picker
                    v-model="FillData.examendtime"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    type="time"
                    :placeholder="$t('examendtime')"
                    value-type="format"
                    input-class="my-custom-date "
                    format="HH:mm:ss"
                  >
                    <template #input>
                      <b-form-input
                        :placeholder="$t('examendtime')"
                        v-mask="'##:##:##'"
                        type="text"
                        maxlength="10"
                        v-model="FillData.examendtime"
                        class="my-custom-date"
                      />
                    </template>
                  </date-picker>
                </div>
              </div> -->

              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-4"
                  >{{ $t("examaddress") }}</label
                >
                <div class="col-sm-8">
                  <b-form-input
                    v-model="FillData.examaddress"
                    :placeholder="$t('examaddress')"
                  >
                  </b-form-input>
                </div>
              </div>
              <b-col class="text-center">
                <b-button
                  variant="danger"
                  @click="CloseAddFillModal"
                  class="mr-2"
                >
                  <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                </b-button>
                <b-button variant="success" @click="FillAdd">
                  <!-- @click="Add" -->
                  <b-icon icon="check2"></b-icon> {{ $t("Fill") }}
                </b-button>
              </b-col>
            </b-modal>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton class="ml-4" size="sm" color="danger" @click="Close">
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
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ExamGroupService from "@/services/ExamGroup.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import SchoolYearService from "@/services/SchoolYear.service";
import HelperService from "@/services/helper.service";
// import OrganizationService from "@/services/organization.service";
import PhysicalTrainingTypeService from "@/services/PhysicalTrainingType.service";
import EducationFormTypeService from "@/services/EducationFormType.service";
import AssessmentCriteriaService from "@/services/AssessmentCriteria.service";
import CustomDatePicker from "@/components/customDatePicker.vue";

export default {
  components: { CustomDatePicker },
  data() {
    return {
      SaveLoading: false,
      ExamGroup: {},
      HighereduclassifierList: [],
      EducationformList: [],
      EducationlanguageList: [],
      SchoolyearList: [],
      GenderList: [],
      statelist: [],
      OrganizationList: [],
      physicaltrainingtypelist: [],
      EducationFormTypeList: [],
      assessmentcriteriatablelist: [],
      itemsMainTable: [],
      ExamGroupTable: [],
      fieldsMainTable: [
        // {
        //   key: "physicaltrainingtypeid",
        //   label: this.$t("physicaltrainingtype"),
        // },

        {
          key: "physicaltrainingtypename",
          label: this.$t("physicaltrainingtypename"),
          class: "text-left",
        },
        {
          key: "assessmentcriteriatablename",
          label: this.$t("assessmentcriteriatable"),
          class: "text-left",
        },
        {
          key: "examstartdate",
          label: this.$t("examstartdate"),
        },
        {
          key: "examstarttime",
          label: this.$t("examstarttime"),
        },
        // {
        //   key: "examenddate",
        //   label: this.$t("examenddate"),
        // },
        {
          key: "examendtime",
          label: this.$t("examendtime"),
        },
        {
          key: "examaddress",
          label: this.$t("examaddress"),
          class: "text-left",
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      selectedrowid: 0,
      tabrow: {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        assessmentcriteriatableid: 0,
        assessmentcriteriatable: "",
        examstartdate: "",
        examstarttime: {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          ticks: 0,
        },
        examenddate: "",
        examendtime: {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          ticks: 0,
        },

        examaddress: "",
        Status: 1,
      },
      FillData: {
        examstartdate: "30.07.2022",
        examstarttime: {
          hour: "07",
          minute: 0,
          second: 0,
          millisecond: 0,
          ticks: 0,
        },
        examenddate: "30.07.2022",
        // examendtime: {
        //   hour: 19,
        //   minute: 0,
        //   second: 0,
        //   millisecond: 0,
        //   ticks: 0,
        // },
        examendtime: "19:00:00",
        examaddress: "Universitet hududi",
        Status: 1,
      },
      editedIndex: -1,
      FillLoading: false,
    };
  },
  computed: {
    isFormsDisabled() {
      if (this.ExamGroup.Tables.filter(item => item.Status != 3).length == 0) {
        return false
      }
      else {
        return true
      }
    }
  },
  created() {
    this.selectedrowid = this.$route.params.id;
    ExamGroupService.Get(this.selectedrowid).then((res) => {
      this.ExamGroup = res.data;
      if (this.selectedrowid != 0) {
        this.itemsMainTable = res.data.Tables;
      }
    });

    EducationFormTypeService.GetAll().then((res) => {
      this.EducationFormTypeList = res.data;
    });
    HigherEduClassifierService.GetAll().then((res) => {
      this.HighereduclassifierList = res.data;
    });
    EducationLanguageService.GetAll().then((res) => {
      this.EducationlanguageList = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.SchoolyearList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
    });
    // HelperService.GetStateList().then((res) => {
    //   this.statelist = res.data;
    // });
    // OrganizationService.GetAll().then((res) => {
    //   this.OrganizationList = res.data;
    // });
    PhysicalTrainingTypeService.GetAll().then((res) => {
      this.physicaltrainingtypelist = res.data;
    });
  },
  methods: {
    BindValueExamEndTime(value) {
      this.tabrow.examendtime = value;
    },
    BindValueExamEndDate(value) {
      this.tabrow.examenddate = value;
    },
    BindValueExamStartTime(value) {
      this.tabrow.examstarttime = value;
    },
    BindValueExamStartDate(value) {
      this.tabrow.examstartdate = value;
    },
    GetAssessmentcriteriaTableList() {
      AssessmentCriteriaService.GetAllAssessmentCriteriaTable(
        this.ExamGroup.schoolyearid,
        this.ExamGroup.highereduclassifierid,
        this.ExamGroup.educationformtypeid,
        this.ExamGroup.educationlanguageid,
        this.tabrow.physicaltrainingtypeid,
        this.ExamGroup.genderid
      ).then((res) => {
        this.assessmentcriteriatablelist = res.data;
      });
    },
    ChangeCriteraTable() {
      this.tabrow.assessmentcriteriatablename =
        this.assessmentcriteriatablelist.filter(
          (item) => item.id === this.tabrow.assessmentcriteriatableid
        )[0].name;
    },
    // Fill() {
    //   AssessmentCriteriaService.GetAllAssessmentCriteriastandard(
    //     this.ExamGroup.schoolyearid,
    //     this.ExamGroup.highereduclassifierid,
    //     this.ExamGroup.genderid
    //   ).then((res) => {
    //     this.FillData = res.data;
    //   });
    // },
    Add() {
      this.tabrow.physicaltrainingtypename =
        this.physicaltrainingtypelist.filter(
          (item) => item.id == this.tabrow.physicaltrainingtypeid
        )[0].shortname;
      // this.tabrow.assessmentcriteriatablename = this.assessmentcriteriatablelist.filter(item => this.tabrow.assessmentcriteriatableid == item.id)[0].name
      if (this.editedIndex > -1) {
        Object.assign(this.itemsMainTable[this.editedIndex], this.tabrow);
      } else {
        this.itemsMainTable.push(this.tabrow);
      }
      (this.tabrow = {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        assessmentcriteriatableid: 0,
        assessmentcriteriatablename: "",
        examstartdate: "",
        examstarttime: {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          ticks: 0,
        },
        examenddate: "",
        examendtime: {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          ticks: 0,
        },

        examaddress: "",
        Status: 1,
      }),
        this.$bvModal.hide("AddModal");
    },
    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.itemsMainTable.indexOf(item);
      this.GetAssessmentcriteriaTableList();
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenAddModal() {
      if (!this.ExamGroup.schoolyearid) {
        this.makeToast("notSelectschoolyearid", this.$t("message"), "danger");
        return false;
      }
      if (!this.ExamGroup.highereduclassifierid) {
        this.makeToast(
          "notSelecthighereduclassifierid",
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.ExamGroup.educationformtypeid) {
        this.makeToast(
          "notSelecteducationformtypeid",
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.ExamGroup.educationlanguageid) {
        this.makeToast(
          "notSelecteducationlanguageid",
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.ExamGroup.genderid) {
        this.makeToast("notSelectedgenderId", this.$t("message"), "danger");
        return false;
      }
      this.$bvModal.show("AddModal");
      // this.GetAssessmentcriteriaTableList();
      this.tabrow = {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        assessmentcriteriatablename: "",
        assessmentcriteriatableid: 0,
        examstartdate: "",
        examstarttime: {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          ticks: 0,
        },
        examenddate: "",
        examendtime: {
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          ticks: 0,
        },
        examaddress: "",
        Status: 1,
      };
    },
    FillModal() {
      var self = this;
      console.log(self.itemsMainTable);
      if (self.selectedrowid == 0 && self.itemsMainTable.length > 0) {
        self.itemsMainTable.forEach(function (item) {
          if (item.Status == 3) {
            self.$bvModal.show("AddFillModal");
          }
        });
      } else if (self.selectedrowid == 0 && self.itemsMainTable.length == 0) {
        self.$bvModal.show("AddFillModal");
      } else if (self.selectedrowid != 0 && self.itemsMainTable.length == 0) {
        self.$bvModal.show("AddFillModal");
      } else if (self.selectedrowid != 0 && self.itemsMainTable.length > 0) {
        self.itemsMainTable.forEach(function (item) {
          if (item.Status == 3) {
            self.$bvModal.show("AddFillModal");
          }
        });
      }
    },
    // AddTable() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.itemsMainTable[this.editedIndex], this.FillData);
    //   } else {
    //     this.itemsMainTable.push(this.FillData);
    //   }
    //   (this.FillData = {
    //     examstartdate: "",
    //     examstarttime: {
    //       hour: 0,
    //       minute: 0,
    //       second: 0,
    //       millisecond: 0,
    //       ticks: 0,
    //     },
    //     examenddate: "",
    //     examendtime: {
    //       hour: 0,
    //       minute: 0,
    //       second: 0,
    //       millisecond: 0,
    //       ticks: 0,
    //     },

    //     examaddress: "",
    //     Status: 1,
    //   }),
    //     this.$bvModal.hide("AddFillModal");
    // },
    checkTables() {
      var self = this;
      if (
        self.FillData.examaddress === null ||
        self.FillData.examaddress === undefined ||
        self.FillData.examaddress === 0 ||
        self.FillData.examaddress === ""
      ) {
        self.makeToast(
          self.$t("examaddressNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FillData.examstartdate === null ||
        self.FillData.examstartdate === undefined ||
        self.FillData.examstartdate === 0 ||
        self.FillData.examstartdate === ""
      ) {
        self.makeToast(
          self.$t("examstartdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FillData.examstarttime === null ||
        self.FillData.examstarttime === undefined ||
        self.FillData.examstarttime === 0 ||
        self.FillData.examstarttime === ""
      ) {
        self.makeToast(
          self.$t("examstarttimeNotCorrect"),
          self.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.FillData.examenddate === null ||
        self.FillData.examenddate === undefined ||
        self.FillData.examenddate === 0 ||
        self.FillData.examenddate === ""
      ) {
        self.makeToast(
          self.$t("examenddateNotCorrect"),
          self.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.FillData.examendtime === null ||
        self.FillData.examendtime === undefined ||
        self.FillData.examendtime === 0 ||
        self.FillData.examendtime === ""
      ) {
        self.makeToast(
          self.$t("examendtimeNotCorrect"),
          self.$t("Error"),
          "danger"
        );

        return false;
      }
      return true;
    },
    FillAdd() {
      var self = this;
      if (!self.checkTables()) {
        return false;
      }
      if (this.itemsMainTable.length > 0) {
        for (let i = 0; i < this.itemsMainTable.length; i++) {
          this.itemsMainTable[i].Status = 3;
        }
        this.ExamGroupTable = this.itemsMainTable;
      }
      console.log(this.ExamGroupTable);

      AssessmentCriteriaService.GetAllAssessmentCriteriastandard(
        this.ExamGroup.schoolyearid,
        this.ExamGroup.highereduclassifierid,
        this.ExamGroup.genderid
      ).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.itemsMainTable.push({
            examaddress: this.FillData.examaddress,
            examstartdate: this.FillData.examstartdate,
            examstarttime: this.FillData.examstarttime,
            examenddate: this.FillData.examenddate,
            examendtime: this.FillData.examendtime,
            assessmentcriteriatableid: res.data[i].id,
            assessmentcriteriatablename: res.data[i].standardname,
            physicaltrainingtypename: res.data[i].physicaltrainingtypename,
            physicaltrainingtypeid: res.data[i].physicaltrainingtypeid,
            id: 0,
            ownerid: 0,
            Status : 1
          })
        }
        console.log(this.ExamGroupTable);
        this.$bvModal.hide("AddFillModal");
      });
    },
    CloseAddModal() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          physicaltrainingtypeid: 0,
          physicaltrainingtypename: "",
          assessmentcriteriatableid: 0,
          assessmentcriteriatablename: "",
          examstartdate: "",
          examstarttime: {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            ticks: 0,
          },
          examenddate: "",
          examendtime: {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            ticks: 0,
          },
          examaddress: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    CloseAddFillModal() {
      this.$bvModal.hide("AddFillModal");
    },
    check() {
      var self = this;
      if (
        self.ExamGroup.docnumber === 0 ||
        self.ExamGroup.docnumber === null ||
        self.ExamGroup.docnumber === undefined ||
        self.ExamGroup.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.ExamGroup.Tables.filter((item) => item.Status !== 3).length === 0
      // ) {
      //   this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
      //   return false;
      // }
      return true;
    },
    Close() {
      this.$router.push({
        name: "ExamGroup",
        query: {
          schoolYearId: this.$route.query.schoolYearId,
          higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
          educationFormTypemId: this.$route.query.educationFormTypemId,
          educationLanguageId: this.$route.query.educationLanguageId,
          genderId: this.$route.query.genderId,
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
        },
      });
    },
    SaveData() {
      var self = this;
      Array.prototype.push.apply(this.itemsMainTable, this.ExamGroupTable);
      self.ExamGroup.Tables = this.itemsMainTable;

      if (!this.check()) {
        return false;
      }
      ExamGroupService.Update(self.ExamGroup)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "ExamGroup",
            query: {
              schoolYearId: this.$route.query.schoolYearId,
              higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
              educationFormTypemId: this.$route.query.educationFormTypemId,
              educationLanguageId: this.$route.query.educationLanguageId,
              genderId: this.$route.query.genderId,
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
            },
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
