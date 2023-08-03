<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AssessmentCriteria") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-row>
            <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("docnumber")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    autocomplete="text"
                    horizontal
                    disabled
                    style="width: 100%"
                    v-model="Data.docnumber"
                  >
                  </b-form-input>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("docdate")
                }}</label>
                <div class="col-sm-9">
                  <custom-date-picker
                    v-model="Data.docdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("highereduclassifier")
                }}</label>
                <div class="col-sm-9">
                  <v-select
                    :options="HigherEduClassifierList"
                    v-model="Data.highereduclassifierid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="fullname"
                  ></v-select>
                </div>
              </div>
            </b-col>
            <!-- <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("EducationFormType")
                }}</label>
                <div class="col-sm-9">
                  <v-select
                    :options="EducationFormTypeList"
                    v-model="Data.educationformtypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
            </b-col> -->
            <!-- <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("educationlanguage")
                }}</label>
                <div class="col-sm-9">
                  <v-select
                    :options="EducationLanguageList"
                    v-model="Data.educationlanguageid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
            </b-col> -->
            <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("schoolyear")
                }}</label>
                <div class="col-sm-9">
                  <v-select
                    :options="SchoolYearList"
                    v-model="Data.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("gender")
                }}</label>
                <div class="col-sm-9">
                  <v-select
                    :options="GenderList"
                    v-model="Data.genderid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("detailinfo")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    autocomplete="text"
                    horizontal
                    style="width: 100%"
                    v-model="Data.detailinfo"
                  >
                  </b-form-input>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="6" class="my-1">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("maxscore")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    autocomplete="text"
                    horizontal
                    style="width: 100%"
                    v-model="Data.maxscore"
                  >
                  </b-form-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col class="text-right">
              <b-button variant="primary" @click="openModal">
                {{ $t("Add") }}
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-table
                :fields="fields"
                :items="Data.AssessmentCriteriaTables"
                style="min-height: 200px"
                small="small"
                responsive="sm"
                class="generalTableClass"
                show-empty
               
                striped
                sticky-header="60vh"
                :tbody-tr-class="rowClass"
                no-border-collapse
                bordered
              >
                <template v-slot:cell(index)="{ index }">
                  {{ index + 1 }}
                </template>
                <template v-slot:cell(actions)="{ item, index }">
                  <CButtonGroup
                    class="mx-auto d-block text-center d-flex"
                    size="sm"
                  >
                    <CButton
                      variant="outline"
                      color="primary"
                      @click="EditTableRow(item)"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </CButton>
                    <CButton
                      variant="outline"
                      color="danger"
                      @click="$bvModal.show('DeleteModal' + index)"
                    >
                      <b-icon icon="x"></b-icon>
                    </CButton>
                  </CButtonGroup>

                  <b-modal size="sm" :id="'DeleteModal' + index" hide-footer>
                    <template v-slot:modal-title>{{
                      $t("WantDelete")
                    }}</template>
                    <div class="d-block text-right">
                      <CButton
                        @click="$bvModal.hide('DeleteModal' + index)"
                        color="danger"
                        class="mr-2"
                      >
                        <b-icon icon="x"></b-icon>
                        {{ $t("NotAccept") }}
                      </CButton>
                      <CButton
                        @click="DeleteTableRow(item, index)"
                        color="success"
                      >
                        <b-icon icon="check2"></b-icon>
                        {{ $t("Approve") }}
                      </CButton>
                    </div>
                  </b-modal>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-modal
            id="AssessmentCriteriaTables"
            no-close-on-backdrop
            hide-footer
            size="xl"
          >
            <b-row>
              <b-col sm="12" md="6" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("physicaltrainingtype")
                  }}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="PhysicalTrainingTypeList"
                      v-model="AssessmentCriteriaTables.physicaltrainingtypeid"
                      :reduce="(item) => item.id"
                      @input="physicaltrainingtypechange"
                      :placeholder="$t('ChooseBelow')"
                      label="shortname"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="6" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("standard")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      style="width: 100%"
                      v-model="AssessmentCriteriaTables.standardname"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="6" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("maxscore")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      style="width: 100%"
                      v-model="AssessmentCriteriaTables.maxscore"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="6" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("attemptcount1")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      style="width: 100%"
                      v-model="AssessmentCriteriaTables.attemptcount"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="6" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("scorecalculationtypename")
                  }}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="scorecalculationtypelist"
                      @input="scorecalculationtypechange"
                      v-model="AssessmentCriteriaTables.scorecalculationtypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="6" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("detailinfo")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-textarea
                      id="textarea"
                      v-model="AssessmentCriteriaTables.detailinfo"
                      :placeholder="$t('detailinfo')"
                      rows="2"
                      max-rows="6"
                      class="mb-3"
                    ></b-form-textarea>
                  </div>
                </div>
              </b-col>
              <b-col class="text-right">
                <b-button @click="AddStandartRow()" variant="primary">
                  <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                </b-button>
              </b-col>
              <!-- DeleteStandartTableRow -->

              <b-col sm="12" md="12" class="mt-2">
                <b-table
                  :fields="fields2"
                  :items="AssessmentCriteriaTables.StandarTables"
                  style="min-height: 150px"
                  small="small"
                  responsive="sm"
                  class="generalTableClass"
                  show-empty
                 
                  striped
                  sticky-header="60vh"
                  no-border-collapse
                  :tbody-tr-class="rowClassStandart"
                  bordered
                >
                  <template v-slot:cell(actions)="{ item, index }">
                    <CButtonGroup class="mx-auto d-block text-center" size="sm">
                      <CButton
                        variant="outline"
                        color="primary"
                        @click="EditStandartTableRow(item)"
                      >
                        <b-icon icon="pencil"></b-icon>
                      </CButton>
                      <CButton
                        variant="outline"
                        color="danger"
                        @click="DeleteStandartTableRow(item, index)"
                      >
                        <b-icon icon="x"></b-icon>
                      </CButton>
                    </CButtonGroup>
                  </template>
                  <template v-slot:cell(istechscore)="{ item }">
                    <div>
                      <b-badge :variant="getItemColor(item.istechscore)">{{
                        item.istechscore ? "Да" : "Нет"
                      }}</b-badge>
                    </div>
                  </template>
                </b-table>
              </b-col>
              <b-col sm="12" md="6" class="my-1">
                <b-button @click="CloseTable" variant="danger">
                  {{ $t("Back") }}
                </b-button>
              </b-col>
              <b-col sm="12" md="6" class="text-right">
                <b-button @click="AddTable()" variant="success">
                  {{ $t("Save") }}
                </b-button>
              </b-col>
            </b-row>
          </b-modal>
          <b-modal
            id="AssessmentCriteriaStandartTables"
            no-close-on-backdrop
            hide-footer
            size="lg"
          >
            <b-row>
              <b-col sm="12" md="12" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("ordernumber")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      style="width: 100%"
                      disabled
                      v-model="AssessmentCriteriaStandartTables.ordernumber"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="12" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("indicator")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      style="width: 100%"
                      v-model="AssessmentCriteriaStandartTables.indicatorname"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="12" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("scoretypename")
                  }}</label>
                  <div class="col-sm-9">
                    <v-select
                      @input="scoretypechange"
                      :options="scoretypelist"
                      v-model="AssessmentCriteriaStandartTables.scoretypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="12" class="my-1">
                <div class="form-group form-row">
                  <label
                    v-if="AssessmentCriteriaStandartTables.scoretypeid != 3"
                    class="col-form-label col-sm-3"
                    for
                    >{{ $t("score") }}</label
                  >
                  <label
                    v-if="AssessmentCriteriaStandartTables.scoretypeid == 3"
                    class="col-form-label col-sm-3"
                    for
                    >{{ $t("fromscore") }}</label
                  >
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      type="number"
                      style="width: 100%"
                      v-model="AssessmentCriteriaStandartTables.fromscore"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col
                v-if="AssessmentCriteriaStandartTables.scoretypeid == 3"
                sm="12"
                md="12"
                class="my-1"
              >
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("toscore")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      type="number"
                      style="width: 100%"
                      v-model="AssessmentCriteriaStandartTables.toscore"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col sm="12" md="12" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("istechscore")
                  }}</label>
                  <b-form-checkbox
                    v-model="AssessmentCriteriaStandartTables.istechscore"
                    switch
                    @change="changetechscore"
                    class="mt-2 ml-1"
                  ></b-form-checkbox>
                </div>
              </b-col>
              <b-col
                v-if="AssessmentCriteriaStandartTables.istechscore == true"
                sm="12"
                md="12"
                class="my-1"
              >
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("scoretypename")
                  }}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="techscoretypelist"
                      @input="techscoretypechange"
                      v-model="AssessmentCriteriaStandartTables.techscoretypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col
                v-if="AssessmentCriteriaStandartTables.istechscore == true"
                sm="12"
                md="12"
                class="my-1"
              >
                <div class="form-group form-row">
                  <label
                    v-if="AssessmentCriteriaStandartTables.techscoretypeid != 3"
                    class="col-form-label col-sm-3"
                    for
                    >{{ $t("score") }}</label
                  >
                  <label
                    v-if="AssessmentCriteriaStandartTables.techscoretypeid == 3"
                    class="col-form-label col-sm-3"
                    for
                    >{{ $t("fromtechscore") }}</label
                  >
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      number
                      style="width: 100%"
                      v-model="AssessmentCriteriaStandartTables.fromtechscore"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col
                v-if="
                  AssessmentCriteriaStandartTables.istechscore == true &&
                  AssessmentCriteriaStandartTables.techscoretypeid == 3
                "
                sm="12"
                md="12"
                class="my-1"
              >
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("totechscore")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      number
                      style="width: 100%"
                      v-model="AssessmentCriteriaStandartTables.totechscore"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col>
              <!-- <b-col sm="12" md="12" class="my-1">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("attemptcount")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      autocomplete="text"
                      horizontal
                      style="width: 100%"
                      v-model="AssessmentCriteriaStandartTables.attemptcount"
                    >
                    </b-form-input>
                  </div>
                </div>
              </b-col> -->
            </b-row>
            <b-row>
              <b-col sm="12" md="6" class="my-1">
                <b-button @click="CloseStandardTable" variant="danger">
                  {{ $t("Back") }}
                </b-button>
              </b-col>
              <b-col sm="12" md="6" class="text-right">
                <b-button @click="AddStandartTable" variant="success">
                  {{ $t("Add") }}
                </b-button>
              </b-col>
            </b-row>
          </b-modal>
          <!-- <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("state")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="statelist"
                  v-model="AllowedSchoolGradeMove.statusid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow> -->

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
                <CButton
                  v-if="Data.CanSave"
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import AssessmentCriteriaService from "@/services/AssessmentCriteria.service";
// import EducationFormTypeService from "@/services/EducationFormType.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
// import EducationLanguageService from "@/services/EducationLanguage.service";
import SchoolYearService from "@/services/SchoolYear.service";
import PhysicalTrainingTypeService from "@/services/PhysicalTrainingType.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    CustomDatePicker
  },
  data() {
    return {
      SaveLoading: false,
      Data: {},
      fields: [
        {
          key: "index",
          label: this.$t("ordernumber"),
          sortable: true,
          class: "text-center",
        },
        {
          key: "physicaltrainingtypename",
          label: this.$t("physicaltrainingtype"),
          sortable: true,
          tdClass: "text-left",
          thClass: "text-center",
        },
        {
          key: "standardname",
          label: this.$t("standard"),
          sortable: true,
          tdClass: "text-left",
          thClass: "text-center",
        },
        {
          key: "attemptcount",
          label: this.$t("attemptcount1"),
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "scorecalculationtypename",
          label: this.$t("scorecalculationtypename"),
          sortable: true,
          tdClass: "text-left",
          thClass: "text-center",
        },
        { key: "maxscore", label: this.$t("maxscore"), class: "text-center" },
        { key: "actions", label: this.$t("actions") },
      ],
      fields2: [
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
          sortable: true,
        },
        {
          key: "indicatorname",
          label: this.$t("indicator"),
          sortable: true,
        },
        {
          key: "scoretypename",
          label: this.$t("scoretypename"),
          sortable: true,
        },
        { key: "fromscore", label: this.$t("fromscore") },
        {
          key: "toscore",
          label: this.$t("toscore"),
          sortable: true,
        },
        { key: "istechscore", label: this.$t("istechscore") },
        { key: "techscoretypename", label: this.$t("techscoretypename") },
        { key: "fromtechscore", label: this.$t("fromtechscore") },
        { key: "totechscore", label: this.$t("totechscore") },
        { key: "actions", label: this.$t("actions") },
      ],
      // EducationFormTypeList: [],
      HigherEduClassifierList: [],
      scorecalculationtypelist: [],
      techscoretypelist: [],
      scoretypelist: [],
      // EducationLanguageList: [],
      SchoolYearList: [],
      GenderList: [],
      AssessmentCriteriaTables: {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        standardname: "",
        attemptcount: 0,
        scorecalculationtypeid: 0,
        scorecalculationtypename: "",
        maxscore: 0,
        detailinfo: "",
        normativeact: "",
        Status: 1,
        StandarTables: [],
      },
      AssessmentCriteriaStandartTables: {
        id: 0,
        ownerid: 0,
        ordernumber: 1,
        indicatorname: "",
        scoretypeid: 0,
        scoretypename: "",
        fromscore: 0,
        toscore: 0,
        istechscore: true,
        techscoretypeid: 0,
        techscoretypename: "",
        fromtechscore: 0,
        totechscore: 0,
        Status: 1,
      },
      editedIndex: -1,
      UpdateID: "",
      editedIndex1: -1,
      PhysicalTrainingTypeList: [],
    };
  },
  created() {
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    HelperService.GetAllScoreType().then((res) => {
      this.scoretypelist = res.data;
      this.techscoretypelist = res.data;
    });
    // EducationFormTypeService.GetAll().then((res) => {
    //   this.EducationFormTypeList = res.data;
    // });
    if (
      this.$route.query.IsClone == true ||
      this.$route.query.IsClone == "true"
    ) {
      AssessmentCriteriaService.GetClone(this.$route.params.id).then((res) => {
        this.Data = res.data;
      });
    } else {
      AssessmentCriteriaService.Get(this.$route.params.id).then((res) => {
        this.Data = res.data;
      });
    }
    HigherEduClassifierService.GetAll().then((res) => {
      this.HigherEduClassifierList = res.data;
    });
    // EducationLanguageService.GetAll().then((res) => {
    //   this.EducationLanguageList = res.data;
    // });
    SchoolYearService.GetAll().then((res) => {
      this.SchoolYearList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
    });
    HelperService.GetAllScoreCalculationType().then((res) => {
      this.scorecalculationtypelist = res.data;
    });
    PhysicalTrainingTypeService.GetAll().then((res) => {
      this.PhysicalTrainingTypeList = res.data;
    });
  },
  methods: {
    Close() {
      this.$router.push({
        name: "AssessmentCriteria",
        query: {
          schoolYearId: this.$route.query.schoolYearId,
          higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
          educationFormTypemId: this.$route.query.educationFormTypemId,
          educationLanguageId: this.$route.query.educationLanguageId,
          statusId: this.$route.query.statusId,
          genderId: this.$route.query.genderId,
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
        },
      });
    },
    openModal() {
      this.editedIndex = -1;
      (this.AssessmentCriteriaTables = {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        standardname: "",
        attemptcount: 0,
        scorecalculationtypeid: 0,
        scorecalculationtypename: "",
        maxscore: 0,
        detailinfo: "",
        normativeact: "",
        Status: 1,
        StandarTables: [],
      }),
        this.$bvModal.show("AssessmentCriteriaTables");
    },
    AddStandartRow() {
      if (
        this.AssessmentCriteriaTables.maxscore === 0 ||
        this.AssessmentCriteriaTables.maxscore === null ||
        this.AssessmentCriteriaTables.maxscore === undefined ||
        this.AssessmentCriteriaTables.maxscore === ""
      ) {
        this.makeToast(
          this.$t("maxscoreNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // let a = AssessmentCriteriaStandartTables;
      (this.AssessmentCriteriaStandartTables = {
        id: 0,
        ownerid: 0,
        ordernumber:
          this.AssessmentCriteriaTables.StandarTables.length != 0
            ? this.AssessmentCriteriaTables.StandarTables[
                this.AssessmentCriteriaTables.StandarTables.length - 1
              ].ordernumber + 1
            : 1,
        indicatorname: "",
        scoretypeid: 0,
        scoretypename: "",
        fromscore: 0,
        toscore: 0,
        istechscore: true,
        techscoretypeid: 0,
        techscoretypename: "",
        fromtechscore: 0,
        totechscore: 0,
        Status: 1,
      }),
        (this.editedIndex1 = -1);
      this.$bvModal.show("AssessmentCriteriaStandartTables");
    },
    CloseStandardTable() {
      this.$bvModal.hide("AssessmentCriteriaStandartTables");
      this.$nextTick(() => {
        this.editedIndex1 = -1;
      });
    },
    CloseTable() {
      this.$bvModal.hide("AssessmentCriteriaTables");
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    EditTableRow(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex = this.Data.AssessmentCriteriaTables.indexOf(item);
      this.AssessmentCriteriaTables = Object.assign({}, item);
      console.log(this.AssessmentCriteriaTables);
      this.$bvModal.show("AssessmentCriteriaTables");
    },
    DeleteTableRow(item, index) {
      if (item.Status == 1) {
        this.Data.AssessmentCriteriaTables.splice(index, 1);
      } else {
        item.Status = 3;
      }
      this.$bvModal.hide("DeleteModal" + index);
    },
    EditStandartTableRow(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex1 =
        this.AssessmentCriteriaTables.StandarTables.indexOf(item);
      this.AssessmentCriteriaStandartTables = Object.assign({}, item);
      this.$bvModal.show("AssessmentCriteriaStandartTables");
    },
    DeleteStandartTableRow(item, index) {
      if (item.Status == 1) {
        this.AssessmentCriteriaTables.StandarTables.splice(index, 1);
      } else {
        item.Status = 3;
      }
    },
    physicaltrainingtypechange() {
      var self = this;
      self.AssessmentCriteriaTables.physicaltrainingtypename =
        self.PhysicalTrainingTypeList.filter(function (item) {
          if (item.id === self.AssessmentCriteriaTables.physicaltrainingtypeid)
            return item;
        })[0].shortname;
    },
    scoretypechange() {
      var self = this;
      self.AssessmentCriteriaStandartTables.fromscore = 0;
      self.AssessmentCriteriaStandartTables.toscore = 0;
      self.AssessmentCriteriaStandartTables.scoretypename =
        self.scoretypelist.filter(function (item) {
          if (item.id === self.AssessmentCriteriaStandartTables.scoretypeid)
            return item;
        })[0].name;
    },
    techscoretypechange() {
      var self = this;
      self.AssessmentCriteriaStandartTables.fromtechscore = 0;
      self.AssessmentCriteriaStandartTables.totechscore = 0;
      self.AssessmentCriteriaStandartTables.techscoretypename =
        self.scoretypelist.filter(function (item) {
          if (item.id === self.AssessmentCriteriaStandartTables.techscoretypeid)
            return item;
        })[0].name;
    },
    scorecalculationtypechange() {
      var self = this;
      self.AssessmentCriteriaTables.scorecalculationtypename =
        self.scorecalculationtypelist.filter(function (item) {
          if (item.id === self.AssessmentCriteriaTables.scorecalculationtypeid)
            return item;
        })[0].name;
    },
    SaveData() {
      if (
        this.$route.query.IsClone == true ||
        this.$route.query.IsClone == "true"
      ) {
        this.Data.id = 0;
      }
      if (!this.check()) {
        return false;
      }

      AssessmentCriteriaService.Update(this.Data)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "AssessmentCriteria",
            query: {
              schoolYearId: this.$route.query.schoolYearId,
              higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
              educationFormTypemId: this.$route.query.educationFormTypemId,
              educationLanguageId: this.$route.query.educationLanguageId,
              statusId: this.$route.query.statusId,
              genderId: this.$route.query.genderId,
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
            },
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
    checkTables() {
      var self = this;
      var tableitemscount = 0;
      tableitemscount = self.AssessmentCriteriaTables.StandarTables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    checkAssessmentTables() {
      var self = this;
      if (
        self.AssessmentCriteriaTables.standardname === 0 ||
        self.AssessmentCriteriaTables.standardname === null ||
        self.AssessmentCriteriaTables.standardname === undefined ||
        self.AssessmentCriteriaTables.standardname === ""
      ) {
        this.makeToast(
          this.$t("standardNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AssessmentCriteriaTables.attemptcount === 0 ||
        self.AssessmentCriteriaTables.attemptcount === null ||
        self.AssessmentCriteriaTables.attemptcount === undefined ||
        self.AssessmentCriteriaTables.attemptcount === ""
      ) {
        this.makeToast(
          this.$t("attemptcountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.AssessmentCriteriaTables.maxscore === 0 ||
      //   self.AssessmentCriteriaTables.maxscore === null ||
      //   self.AssessmentCriteriaTables.maxscore === undefined ||
      //   self.AssessmentCriteriaTables.maxscore === ""
      // ) {
      //   this.makeToast(
      //     this.$t("maxscoreNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.AssessmentCriteriaTables.normativeact === 0 ||
      //   self.AssessmentCriteriaTables.normativeact === null ||
      //   self.AssessmentCriteriaTables.normativeact === undefined ||
      //   self.AssessmentCriteriaTables.normativeact === ""
      // ) {
      //   this.makeToast(
      //     this.$t("normativeactNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.AssessmentCriteriaTables.physicaltrainingtypeid === 0 ||
        self.AssessmentCriteriaTables.physicaltrainingtypeid === null ||
        self.AssessmentCriteriaTables.physicaltrainingtypeid === undefined ||
        self.AssessmentCriteriaTables.physicaltrainingtypeid === ""
      ) {
        this.makeToast(
          this.$t("physicaltrainingtypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AssessmentCriteriaTables.scorecalculationtypeid === 0 ||
        self.AssessmentCriteriaTables.scorecalculationtypeid === null ||
        self.AssessmentCriteriaTables.scorecalculationtypeid === undefined ||
        self.AssessmentCriteriaTables.scorecalculationtypeid === ""
      ) {
        this.makeToast(
          this.$t("scorecalculationtypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // var tableitemscount = 0;
      // tableitemscount = self.Data.AssessmentCriteriaTables.filter(
      //   (item) => item.Status !== 3
      // ).length;
      // if (tableitemscount === 0) {
      //   self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
      //   return false;
      // }
      return true;
    },
    checkStandartTables() {
      var self = this;

      if (
        self.AssessmentCriteriaStandartTables.indicatorname === 0 ||
        self.AssessmentCriteriaStandartTables.indicatorname === null ||
        self.AssessmentCriteriaStandartTables.indicatorname === undefined ||
        self.AssessmentCriteriaStandartTables.indicatorname === ""
      ) {
        this.makeToast(
          this.$t("indicatorNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AssessmentCriteriaStandartTables.scoretypeid === 0 ||
        self.AssessmentCriteriaStandartTables.scoretypeid === null ||
        self.AssessmentCriteriaStandartTables.scoretypeid === undefined ||
        self.AssessmentCriteriaStandartTables.scoretypeid === ""
      ) {
        this.makeToast(
          this.$t("scoretypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AssessmentCriteriaStandartTables.fromscore === null ||
        self.AssessmentCriteriaStandartTables.fromscore === undefined ||
        self.AssessmentCriteriaStandartTables.fromscore === ""
      ) {
        this.makeToast(
          this.$t("fromscoreNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AssessmentCriteriaStandartTables.toscore === null ||
        self.AssessmentCriteriaStandartTables.toscore === undefined ||
        self.AssessmentCriteriaStandartTables.toscore === ""
      ) {
        this.makeToast(
          this.$t("toscoreNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AssessmentCriteriaStandartTables.scoretypeid != 3 &&
        self.AssessmentCriteriaStandartTables.fromscore >
          self.AssessmentCriteriaTables.maxscore
      ) {
        this.makeToast(
          this.$t("fromscorelengthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AssessmentCriteriaStandartTables.scoretypeid == 3 &&
        (parseInt(self.AssessmentCriteriaStandartTables.toscore) -
          parseInt(self.AssessmentCriteriaStandartTables.fromscore)) >
          parseInt(self.AssessmentCriteriaTables.maxscore)
      ) {
        this.makeToast(
          this.$t("fromscorelengthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.AssessmentCriteriaStandartTables.istechscore == true) {
        if (
          self.AssessmentCriteriaStandartTables.techscoretypeid === 0 ||
          self.AssessmentCriteriaStandartTables.techscoretypeid === null ||
          self.AssessmentCriteriaStandartTables.techscoretypeid === undefined ||
          self.AssessmentCriteriaStandartTables.techscoretypeid === ""
        ) {
          this.makeToast(
            this.$t("techscoretypeNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.fromtechscore === null ||
          self.AssessmentCriteriaStandartTables.fromtechscore === undefined ||
          self.AssessmentCriteriaStandartTables.fromtechscore === ""
        ) {
          this.makeToast(
            this.$t("fromtechscoreNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.totechscore === null ||
          self.AssessmentCriteriaStandartTables.totechscore === undefined ||
          self.AssessmentCriteriaStandartTables.totechscore === ""
        ) {
          this.makeToast(
            this.$t("totechscoreNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.techscoretypeid != 3 &&
          parseInt(self.AssessmentCriteriaStandartTables.fromtechscore) >
            parseInt(self.AssessmentCriteriaTables.maxscore)
        ) {
          this.makeToast(
            this.$t("techfromscorelengthNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.techscoretypeid == 3 &&
          (self.AssessmentCriteriaStandartTables.totechscore -
            self.AssessmentCriteriaStandartTables.fromtechscore) >
            self.AssessmentCriteriaTables.maxscore
        ) {
          this.makeToast(
            this.$t("techfromscorelengthNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.techscoretypeid == 3 &&
          self.AssessmentCriteriaStandartTables.scoretypeid == 3 &&
          (parseInt(self.AssessmentCriteriaStandartTables.toscore) -
            parseInt(self.AssessmentCriteriaStandartTables.fromscore) +
            (parseInt(self.AssessmentCriteriaStandartTables.totechscore) -
              parseInt(self.AssessmentCriteriaStandartTables.fromtechscore))) >
            parseInt(self.AssessmentCriteriaTables.maxscore)
        ) {
          this.makeToast(
            this.$t("techfromscorelengthNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.techscoretypeid != 3 &&
          self.AssessmentCriteriaStandartTables.scoretypeid == 3 &&
          (parseInt(self.AssessmentCriteriaStandartTables.toscore) -
            parseInt(self.AssessmentCriteriaStandartTables.fromscore) +
            parseInt(self.AssessmentCriteriaStandartTables.fromtechscore)) >
            parseInt(self.AssessmentCriteriaTables.maxscore)
        ) {
          this.makeToast(
            this.$t("techfromscorelengthNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.techscoretypeid == 3 &&
          self.AssessmentCriteriaStandartTables.scoretypeid != 3 &&
          (parseInt(self.AssessmentCriteriaStandartTables.totechscore) -
            parseInt(self.AssessmentCriteriaStandartTables.fromtechscore) +
            parseInt(self.AssessmentCriteriaStandartTables.fromscore)) >
            parseInt(self.AssessmentCriteriaTables.maxscore)
        ) {
          this.makeToast(
            this.$t("techfromscorelengthNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.AssessmentCriteriaStandartTables.techscoretypeid != 3 &&
          self.AssessmentCriteriaStandartTables.scoretypeid != 3 &&
          (parseInt(self.AssessmentCriteriaStandartTables.fromscore) +
            parseInt(self.AssessmentCriteriaStandartTables.fromtechscore)) >
            parseInt(self.AssessmentCriteriaTables.maxscore)
        ) {
          this.makeToast(
            this.$t("techfromscorelengthNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      return true;
    },

    check() {
      var self = this;

      if (
        self.Data.docnumber === 0 ||
        self.Data.docnumber === null ||
        self.Data.docnumber === undefined ||
        self.Data.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.docdate === 0 ||
        self.Data.docdate === null ||
        self.Data.docdate === undefined ||
        self.Data.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.highereduclassifierid === 0 ||
        self.Data.highereduclassifierid === null ||
        self.Data.highereduclassifierid === undefined ||
        self.Data.highereduclassifierid === ""
      ) {
        this.makeToast(
          this.$t("highereduclassifierNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.Data.educationformtypeid === 0 ||
      //   self.Data.educationformtypeid === null ||
      //   self.Data.educationformtypeid === undefined ||
      //   self.Data.educationformtypeid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("educationformtypeNotSelected"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.Data.educationlanguageid === 0 ||
      //   self.Data.educationlanguageid === null ||
      //   self.Data.educationlanguageid === undefined ||
      //   self.Data.educationlanguageid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("educationlanguageNotSelected"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.Data.schoolyearid === 0 ||
        self.Data.schoolyearid === null ||
        self.Data.schoolyearid === undefined ||
        self.Data.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.genderid === 0 ||
        self.Data.genderid === null ||
        self.Data.genderid === undefined ||
        self.Data.genderid === ""
      ) {
        this.makeToast(
          this.$t("genderidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.maxscore === 0 ||
        self.Data.maxscore === null ||
        self.Data.maxscore === undefined ||
        self.Data.maxscore === ""
      ) {
        this.makeToast(
          this.$t("maxscoreNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.detailinfo === 0 ||
        self.Data.detailinfo === null ||
        self.Data.detailinfo === undefined ||
        self.Data.detailinfo === ""
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

    ShortNameLang() {
      this.items = this.items1;
      this.TranslateModal = true;
      this.TranslatebyName = "shortname";
      this.Translate = {};
    },
    FullNameLang() {
      this.items = this.items2;
      this.TranslateModal = true;
      this.TranslatebyName = "fullname";
      this.Translate = {};
    },
    AddItem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.AllowedSchoolGradeMoveTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.AllowedSchoolGradeMoveTranslatePush();
        this.items2 = this.items;
      }
      this.Translate = {};
    },
    SaveTranslate() {
      this.TranslateModal = false;
    },
    ItemsPush() {
      this.items.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
    },
    AddStandartTable() {
      var self = this;
      if (!self.checkStandartTables()) {
        return false;
      }

      if (self.editedIndex1 > -1) {
        Object.assign(
          self.AssessmentCriteriaTables.StandarTables[self.editedIndex1],
          self.AssessmentCriteriaStandartTables
        );
      } else {
        self.AssessmentCriteriaTables.StandarTables.push(
          self.AssessmentCriteriaStandartTables
        );
      }
      self.AssessmentCriteriaStandartTables = {
        id: 0,
        ownerid: 0,
        indicatorname: "",
        scoretypeid: 0,
        scoretypename: "",
        fromscore: 0,
        toscore: 0,
        istechscore: true,
        techscoretypeid: 0,
        techscoretypename: "",
        ordernumber: 0,
        fromtechscore: 0,
        totechscore: 0,
        Status: 1,
      };
      this.$bvModal.hide("AssessmentCriteriaStandartTables");
      // }
    },
    changetechscore() {
      if (this.AssessmentCriteriaStandartTables.techscoretypeid == false) {
        this.AssessmentCriteriaStandartTables.techscoretypeid = 0;
        this.AssessmentCriteriaStandartTables.techscoretypename = "";
        this.AssessmentCriteriaStandartTables.fromtechscore = 0;
        this.AssessmentCriteriaStandartTables.totechscore = 0;
      }
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    AddTable() {
      var self = this;
      if (!self.checkTables()) {
        return false;
      }
      AssessmentCriteriaService.Update(this.Data)
        .then((res) => {
          this.UpdateID = res.data.id;
          AssessmentCriteriaService.Get(this.UpdateID).then((res) => {
            this.Data = res.data;
            this.makeToast(
              this.$t("SuccessMessage"),
              this.$t("message"),
              "success"
            );
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
      if (!this.checkAssessmentTables()) {
        return false;
      }
      if (self.editedIndex > -1) {
        console.log(self.AssessmentCriteriaTables);
        Object.assign(
          self.Data.AssessmentCriteriaTables[self.editedIndex],
          self.AssessmentCriteriaTables
        );
      } else {
        self.Data.AssessmentCriteriaTables.push(self.AssessmentCriteriaTables);
      }
      self.AssessmentCriteriaTables = {
        //   AssessmentCriteriaTables: {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        standardname: "",
        attemptcount: 0,
        scorecalculationtypeid: 0,
        scorecalculationtypename: "",
        maxscore: 0,
        detailinfo: "",
        normativeact: "",
        Status: 1,
        StandarTables: [],
        //  };
      };
      this.$bvModal.hide("AssessmentCriteriaTables");
      // }
    },
    rowClass(item, type) {
      if (item == undefined) {
        return false;
      }
      if (item.Status === 3) {
        return "d-none";
      }
    },

    rowClassStandart(item, type) {
      if (item == undefined) {
        return false;
      }
      if (item.Status === 3) {
        return "d-none";
      }
    },
    AllowedSchoolGradeMoveTranslatePush() {
      this.AllowedSchoolGradeMove.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
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
  },
};
</script>

<style></style>
