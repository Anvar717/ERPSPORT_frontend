<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("GroupFormByEduDirection") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'GroupFormByEduDirection' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <!-- <b-row>
                        <b-col sm="12" md="6" lg="4" class="my-1">
                            <label>{{
                                $t("docnumber")
                            }}</label>
                            <CInput
                                autocomplete="text"
                                v-model="SalaryCalc.docnumber"
                                disabled
                            >
                            </CInput>
                        </b-col>
                        <b-col sm="12" md="6" lg="4" class="my-1">
                            <label>{{ $t("docdate") }}</label>
                            <date-picker
                            v-model="SalaryCalc.docdate"
                            size="sm"
                            lang="ru"
                            :placeholder="$t('date')"
                            value-type="format"
                            format="DD.MM.YYYY"
                            style="width:100%"
                            ></date-picker>
                        </b-col>
                        <b-col sm="12" md="6" lg="4" class="mb-1">
                            <label for="#"> {{ $t('SchoolYear') }} </label>
                            <v-select
                                :options="SchoolYearList"
                                v-model="SalaryCalc.schoolyearid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                            ></v-select>
                        </b-col>
                        
                        <b-col sm="12" md="6" lg="4" class="mb-1">
                            <label for="#"> {{ $t('EducationFormType') }} </label>
                            <v-select
                                :options="EducationFormTypeList"
                                v-model="SalaryCalc.educationformtypeid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                            ></v-select>
                        </b-col>
                        <b-col sm="12" md="12" lg="4" class="my-2">
                            <label for="#"> {{ $t('HigherEduClassifier') }} </label>
                            <v-select
                                :options="HigherEduClassifierList"
                                v-model="SalaryCalc.highereduclassifierid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="fullname"
                            ></v-select>
                        </b-col>
                        <b-col sm="12" md="6" lg="4" class="my-2">
                            <label for="#"> {{ $t('EducationLanguage') }} </label>
                            <v-select
                                :options="EducationLanguageList"
                                v-model="SalaryCalc.educationlanguageid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                            ></v-select>
                        </b-col>
                        <b-col sm="12" md="6" lg="4" class="my-1">
                            <label for="#"> {{ $t('gender') }} </label>
                            <v-select
                                :options="GenderList"
                                v-model="SalaryCalc.genderid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                            ></v-select>
                        </b-col>
                        <b-col sm="12" md="6" lg="4" class="my-1">
                            <label for="#"> {{ $t('ExamGroup') }} </label>
                            <v-select
                                :options="ExamGroupList"
                                v-model="SalaryCalc.examgroupid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                            ></v-select>
                        </b-col>
                        <b-col sm="12" md="6" lg="4" class="my-1">
                            <CInput
                            autocomplete="text"
                            :label="$t('normativeact')"
                            v-model="SalaryCalc.normativeact"
                            ></CInput>
                        </b-col>
                    </b-row> -->
          <b-row>
            <b-col xs="12" sm="4" md="4" lg="4">
              <b-list-group>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <span> {{ $t("docnumber") }} : </span>
                  <span class="font-weight-bold">
                    {{ SalaryCalc.docnumber }}
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <span> {{ $t("docdate") }} : </span>
                  <span class="font-weight-bold">
                    {{ SalaryCalc.docdate }}
                  </span>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <span> {{ $t("SchoolYear") }} : </span>
                  <span class="font-weight-bold">
                    {{ SalaryCalc.schoolyearname }}
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col xs="12" sm="4" md="4" lg="4">
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span> {{ $t("EducationFormType") }} : </span>
                <span class="font-weight-bold">
                  {{ SalaryCalc.educationformtypename }}
                </span>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span> {{ $t("highereduclassifier") }} : </span>
                <span class="font-weight-bold">
                  {{ SalaryCalc.highereduclassifiername }}
                </span>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span> {{ $t("EducationLanguage") }} : </span>
                <span class="font-weight-bold">
                  {{ SalaryCalc.educationlanguagename }}
                </span>
              </b-list-group-item>
            </b-col>
            <b-col xs="12" sm="4" md="4" lg="4">
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span> {{ $t("gender") }} : </span>
                <span class="font-weight-bold">
                  {{ SalaryCalc.gendername }}
                </span>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span> {{ $t("ExamGroup") }} : </span>
                <span class="font-weight-bold">
                  {{ SalaryCalc.examgroupname }}
                </span>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span> {{ $t("normativeact") }} : </span>
                <span class="font-weight-bold">
                  {{ SalaryCalc.normativeact }}
                </span>
              </b-list-group-item>
            </b-col>
          </b-row>
          <!-- <b-row>
                      <b-col class="text-right">
                        <b-button variant="primary" @click="$bvModal.show('AddModal')" >
                          {{ $t('Add') }}
                        </b-button>
                      </b-col>
                    </b-row> -->
          <b-row class="mt-3">
            <b-col>
              <b-table
                :fields="SalaryCalcTables"
                :items="SalaryCalc.Tables"
                class="text-center"
                
                style="vertical-align: middle"
                bordered
                responsive
                :tbody-tr-class="rowClass"
                sticky-header="60vh"
                no-border-collapse
              >
                <template #cell(fullname)="{ item }">
                  <span
                    >{{ item.firstname }} {{ item.familyname }}
                    {{ item.lastname }}</span
                  >
                </template>
                <template #empty>
                  <h5 class="text-center">{{ $t("NoItems") }}</h5>
                </template>
                <template #table-busy>
                  <div
                    class="text-center text-primary my-2"
                    style="vertical-align: middle"
                  >
                    <b-spinner class="align-middle mr-2"></b-spinner>
                    <strong>{{ $t("Loading") }}</strong>
                  </div>
                </template>
                <template #cell(actions)="{ item }">
                  <div class="text-center">
                    <b-link
                      @click="ViewItem(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('View') }"
                    >
                      <b-icon icon="eye"></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-modal
            id="AddModal"
            size="xl"
            :title="$t('GroupFormByEduDirection')"
            no-close-on-backdrop
            hide-footer
            modal-class="custom-size-modal-planshet"
          >
            <!-- <b-row>
                          <b-col>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("dtmid")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-model="tabrow.dtmid"></c-input>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("firstname")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-model="tabrow.firstname"></c-input>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("familyname")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-model="tabrow.familyname"></c-input>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("lastname")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-model="tabrow.lastname"></c-input>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("dateofbirth")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <date-picker
                                    v-model="tabrow.dateofbirth"
                                    size="sm"
                                    lang="ru"
                                    :placeholder="$t('date')"
                                    value-type="format"
                                    format="DD.MM.YYYY"
                                    style="width:100%"
                                ></date-picker>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0 mt-3">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("pinfl")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-mask="'##############'" v-model="tabrow.pinfl"></c-input>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("gender")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <v-select
                                    :options="GenderList"
                                    v-model="tabrow.genderid"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                ></v-select>
                                </div>
                            </div>
                          </b-col>
                          <b-col>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("IdentityDocument")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <v-select
                                    :options="IdentityDocumentList"
                                    v-model="tabrow.identitydocumentid"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                ></v-select> 
                                </div>
                            </div>
                            <div class="form-group form-row mb-0 mt-3">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("documentseries")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-model="tabrow.documentseries"></c-input>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("documentnumber")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-mask="'#######'" v-model="tabrow.documentnumber"></c-input>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("dateofissue")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <date-picker
                                    v-model="tabrow.dateofissue"
                                    size="sm"
                                    lang="ru"
                                    :placeholder="$t('date')"
                                    value-type="format"
                                    format="DD.MM.YYYY"
                                    style="width:100%"
                                ></date-picker>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0 mt-3">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("dateofexpire")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <date-picker
                                    v-model="tabrow.dateofexpire"
                                    size="sm"
                                    lang="ru"
                                    :placeholder="$t('date')"
                                    value-type="format"
                                    format="DD.MM.YYYY"
                                    style="width:100%"
                                ></date-picker>
                                </div>
                            </div>
                            <div class="form-group form-row mb-0 mt-3">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("issueorganization")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <c-input v-model="tabrow.issueorganization"></c-input>
                                </div>
                            </div>
                          </b-col>
                        </b-row> -->
            <b-row>
              <b-col xs="12" sm="6" md="6" lg="6">
                <b-list-group>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("dtmid") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.dtmid }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("fio") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.fullname }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("dateofbirth") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.dateofbirth }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("documentseries") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.documentseries }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("documentnumber") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.documentnumber }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("gender") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.gendername }}
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col xs="12" sm="6" md="6" lg="6">
                <b-list-group>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("pinfl") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.pinfl }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("identitydocument") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.identitydocumentname }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("dateofissue") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.dateofissue }}
                    </span>
                  </b-list-group-item>

                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("dateofexpire") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.dateofexpire }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("issueorganization") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.issueorganization }}
                    </span>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span> {{ $t("mobilenumber") }} : </span>
                    <span class="font-weight-bold">
                      {{ tabrow.mobilenumber | VMask("##-###-##-##") }}
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
            <c-row class="mt-2">
              <c-col class="text-center">
                <b-button
                  class="mr-2"
                  variant="danger"
                  @click="CloseAddTableModal"
                >
                  {{ $t("back") }}
                </b-button>
                <!-- <b-button variant="primary" @click="AddTable">
                                    {{$t('Save')}}
                                </b-button> -->
              </c-col>
            </c-row>
          </b-modal>
          <div class="pb-4">
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
              {{ lastNumber }} {{ $t("of") }}
              {{ totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
          <CRow class="mt-3">
            <CCol>
              <div class="text-left">
                <CButton
                  size="sm"
                  color="danger"
                  @click="Close()"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <CButton
                  v-if="SalaryCalc.CanSave"
                  size="sm"
                  color="success"
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
import GroupFormByEduDirectionService from "@/services/GroupFormByEduDirection.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SalaryCalcService from '@/services/salarycalc.service'
import ExamGroupService from "@/services/ExamGroup.service";
import { BListGroup, BListGroupItem } from "bootstrap-vue";
export default {
  components: { EmployeeListComponent, BListGroup, BListGroupItem },
  data() {
    return {
      SalaryCalc: {},
      salaryloading: false,
      OrganizationList: [],
      StatusList: [],
      SaveLoading: false,
      totalRows: "",
      isBusy: false,
      isBusy2: false,
      filter: {
        DocumentId: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      SalaryCalcTables: [
        {
          key: "fullname",
          label: this.$t("fullname"),
          tdClass: "text-left",
          thClass: "text-center",
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          tdClass: "text-left",
          thClass: "text-center",
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "dateofissue",
          label: this.$t("dateofissue"),
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "dateofexpire",
          label: this.$t("dateofexpire"),
          tdClass: "text-center",
          thClass: "text-center",
        },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        dtmid: "",
        familyname: "",
        firstname: "",
        lastname: "",
        shortname: "",
        fullname: "",
        dateofbirth: "",
        pinfl: 0,
        genderid: 0,
        identitydocumentid: "",
        documentseries: "",
        documentnumber: "",
        dateofexpire: "",
        issueorganization: "",
        dateofissue: "",
        Status: 1,
      },
      editedIndex: -1,
      editedIndex1: -1,
      HigherEduClassifierList: [],
      EducationLanguageList: [],
      EducationFormTypeList: [],
      ExamGroupList: [],
      SchoolYearList: [],
      GenderList: [],
      IdentityDocumentList: [],
    };
  },
  created() {
    GroupFormByEduDirectionService.Get(this.$route.params.id).then((res) => {
      this.SalaryCalc = res.data;
      this.filter.DocumentId = this.$route.params.id;
      this.Refresh();
    });
    //   OrganizationService.GetAll().then(res => {
    //       this.OrganizationList = res.data
    //   })
    //   HelperService.GetStateList().then(res => {
    //       this.StatusList = res.data
    //   })
    // HigherEduClassifierService.GetAll().then(res => {
    //     this.HigherEduClassifierList = res.data
    // })
    // EducationFormTypeService.GetAll().then(res => {
    //     this.EducationFormTypeList = res.data
    // })
    // EducationLanguageService.GetAll().then(res => {
    //     this.EducationLanguageList = res.data
    // })
    //   ExamGroupService.GetGetAllExamGroup().then(res => {
    //     this.ExamGroupList = res.data
    //   })
    //   SchoolYearService.GetAll().then(res => {
    //     this.SchoolYearList = res.data
    //   })
    // HelperService.GetGenderList().then(res => {
    //     this.GenderList = res.data
    // })
    // IdentityDocumentService.GetAll().then(res => {
    //     this.IdentityDocumentList = res.data.result
    //   })
  },

  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  methods: {
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Close() {
      this.$router.push({
        name: 'GroupFormByEduDirection',
        query: {
          schoolYearId: this.$route.query.schoolYearId,
          higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
          educationFormTypemId: this.$route.query.educationFormTypemId,
          educationLanguageId: this.$route.query.educationLanguageId,
          statusId : this.$route.query.statusId,
          genderId: this.$route.query.genderId,
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit
        }
      })
    },
    Refresh() {
      this.isBusy = true;
      SalaryCalcService.GetSalaryCalcEnrolments(
        this.filter.DocumentId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.SalaryCalc.EnrolmentTables = res.data.rows;
        this.totalRows = res.data.total;
      });
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    AddTable() {
      if (this.editedIndex > -1) {
        Object.assign(this.SalaryCalc.Tables[this.editedIndex], this.tabrow);
      } else {
        this.SalaryCalc.Tables.push(this.tabrow);
      }
      this.tabrow = {
        id: 0,
        ownerid: 0,
        dtmid: "",
        familyname: "",
        firstname: "",
        lastname: "",
        shortname: "",
        fullname: "",
        dateofbirth: "",
        pinfl: 0,
        genderid: 0,
        identitydocumentid: "",
        documentseries: "",
        documentnumber: "",
        dateofexpire: "",
        issueorganization: "",
        dateofissue: "",
        Status: 1,
      };
      this.editedIndex = -1;
      this.$bvModal.hide("AddModal");
    },
    ViewItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.SalaryCalc.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    CloseAddTableModal() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        (this.tabrow = {
          id: 0,
          ownerid: 0,
          ondate: "",
          plandays: 0,
          planhours: 0,
          factdays: 0,
          facthours: 0,
          personid: 0,
          personname: "",
          employeeenrolmentid: 0,
          positionid: 0,
          employmenttypeid: 0,
          employmentrate: 0,
          Status: 1,
          rowTables: [],
        }),
          (this.editedIndex = -1);
      });
    },
    makeToast(message, title, type) {
      var self = this;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    CloseEmployeeModal() {
      this.$bvModal.hide("PersonModal");
    },
    check() {
      var self = this;
      if (
        self.SalaryCalc.docnumber === 0 ||
        self.SalaryCalc.docnumber === null ||
        self.SalaryCalc.docnumber === undefined ||
        self.SalaryCalc.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SalaryCalc.docdate === 0 ||
        self.SalaryCalc.docdate === null ||
        self.SalaryCalc.docdate === undefined ||
        self.SalaryCalc.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //     self.SalaryCalc.organizationaccountid === 0 ||
      //     self.SalaryCalc.organizationaccountid === null ||
      //     self.SalaryCalc.organizationaccountid === undefined ||
      //     self.SalaryCalc.organizationaccountid === ""
      // ) {
      //     this.makeToast(this.$t("organizationaccountidNotCorrect"), this.$t("Error"), "danger");
      //     return false;
      // }
      // if (
      //     self.SalaryCalc.statusid === 0 ||
      //     self.SalaryCalc.statusid === null ||
      //     self.SalaryCalc.statusid === undefined ||
      //     self.SalaryCalc.statusid === ""
      // ) {
      //     this.makeToast(this.$t("statusidNotCorrect"), this.$t("Error"), "danger");
      //     return false;
      // }
      return true;
    },
    getExamGroupList() {
      if (
        !!this.SalaryCalc.highereduclassifierid &&
        !!this.SalaryCalc.educationformtypeid &&
        !!this.SalaryCalc.schoolyearid &&
        !!this.SalaryCalc.educationlanguageid
      ) {
        ExamGroupService.GetGetAllExamGroup(
          this.SalaryCalc.schoolyearid,
          this.SalaryCalc.highereduclassifierid,
          this.SalaryCalc.educationformtypeid,
          this.SalaryCalc.educationlanguageid
        ).then((res) => {
          this.ExamGroupList = res.data;
        });
      }
    },
    // SaveData(){
    //     var self = this;
    //     if (!self.check()) {
    //         return false;
    //     }
    //     this.SaveLoading = true
    //     GroupFormByEduDirectionService.Update(self.SalaryCalc)
    //         .then((res) => {
    //             this.SaveLoading = false
    //         self.makeToast(
    //             self.$t("SuccessMessage"),
    //             self.$t("message"),
    //             "success"
    //         );
    //         self.$router.push({ name: "GroupFormByEduDirection" });
    //         })
    //         .catch((error) => {
    //             this.SaveLoading = false
    //         self.makeToast(
    //             error.response.data.error,
    //             self.$t("message"),
    //             "danger"
    //         );
    //     });

    // },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "SalaryCalc.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.getExamGroupList();
        }
      },
    },
    "SalaryCalc.highereduclassifierid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.getExamGroupList();
        }
      },
    },
    "SalaryCalc.educationformtypeid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.getExamGroupList();
        }
      },
    },
    "SalaryCalc.educationlanguageid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.getExamGroupList();
        }
      },
    },
  },
};
</script>

<style></style>