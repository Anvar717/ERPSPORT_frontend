<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("SchoolAdmission") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <CRow>
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="docnumber"
                    rules="required|max:9"
                  >
                    <CInput
                      :placeholder="$t('docnumber')"
                      autocomplete="docnumber"
                      horizontal
                      :label="$t('docnumber')"
                      v-model="SchoolAdmission.docnumber"
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
                  <ValidationProvider
                    v-slot="v"
                    name="startdate"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label
                        for="datepicker-dateformat2"
                        class="col-form-label col-sm-3"
                        >{{ $t("docdate") }}</label
                      >
                      <div class="col-sm-9">
                        <!-- <custom-date-input />  -->
                        <date-picker
                          v-model="SchoolAdmission.docdate"
                          style="width: 100%"
                          size="sm"
                          lang="ru"
                          :placeholder="$t('docdate')"
                          value-type="format"
                          format="DD.MM.YYYY"
                        >
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">
                              {{ v.errors[0] }}
                            </div>
                          </template>
                        </date-picker>
                      </div>
                    </div>
                  </ValidationProvider>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <ValidationProvider v-slot="v" name="code" rules="required">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3" for>{{
                        $t("schoolyear")
                      }}</label>
                      <v-select
                        class="col-sm-9"
                        :options="schoolyearlist"
                        v-model="SchoolAdmission.schoolyearid"
                        :reduce="(item) => item.id"
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
                  <ValidationProvider v-slot="v" name="code" rules="required">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3" for>{{
                        $t("OrgSchoolGrade")
                      }}</label>
                      <v-select
                        class="col-sm-9"
                        :options="orgschoolgradelist"
                        v-model="SchoolAdmission.orgschoolgradeid"
                        :reduce="(item) => item.id"
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
              </CRow>
              <CRow>
                <CCol>
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="SchoolAdmission.detailinfo"
                  >
                  </CInput>
                </CCol>
              </CRow>
            </ValidationObserver>
            <!--           <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('isAllStudent')}}</label>
                <div class="col-sm-9 d-flex align-items-center">
                  <b-form-checkbox v-model="isAllStudent" name="check-button" switch></b-form-checkbox>
                </div>
              </div>
            </b-col>
          </b-row> -->
            <!--<CRow>
            <CCol lg="2" md="1" sm="2" class="text-left mt-2">
              <CInput
                :placeholder="$t('StudentFIO')"
                autocomplete="text"
                v-model="studentfilter.fullname"
                v-on:keyup.enter="Search"
              ></CInput>
            </CCol>
            <CCol lg="3" md="2" sm="3" class="text-left mt-2">
              <CInput
                :placeholder="$t('DateOfBirth')"
                autocomplete="text"
                v-model="studentfilter.dateofbirth"
                v-on:keyup.enter="loadstudentlist"
              >
                <template #append>
                  <CButton
                    @click="loadstudentlist"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{$t('search')}}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol lg="3" md="2" sm="3" class="text-left mt-2">
              <CButton
                @click="showModal('createModal',true)"
                size="sm"
                variant="outline"
                type="button"
                color="primary"
              >
                <b-icon icon="plus"> </b-icon>
                {{$t('AddNewStudent')}}
              </CButton>
            </CCol>
          </CRow>-->
          </CCardBody>
          <b-row class="mx-1 mb-3">
            <b-col class="text-right">
              <b-button
                variant="primary"
                v-if="SchoolAdmission.CanSave"
                @click="OpenModal"
              >
                <b-icon icon="plus"></b-icon> {{ $t("Add") }}
              </b-button>
              <b-button
                variant="primary"
                v-if="
                  !SchoolAdmission.CanSave &&
                  $can('DeleteStudentInApprovedDocument', 'permissions')
                "
                @click="OpenModal"
              >
                <b-icon icon="plus"></b-icon> {{ $t("Add") }}
              </b-button>
            </b-col>
          </b-row>
          <b-modal
            id="OpenModal"
            size="lg"
            :title="$t('SchoolAdmission')"
            no-close-on-backdrop
            hide-footer
            modal-class="custom-size-modal1"
          >
            <b-row>
              <b-col>
                <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                    {{ $t("StudentPerson") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <CInput
                      class="mr-2"
                      style="width: 100%"
                      disabled
                      v-model="tabrow.personname"
                    >
                      <template #append>
                        <b-button
                          size="sm"
                          variant="primary"
                          @click="OpenStudentModal"
                        >
                          <b-icon icon="three-dots"></b-icon>
                        </b-button>
                      </template>
                    </CInput>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-4">
                    {{ $t("estatementnumber") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <CInput
                      class="w-100"
                      v-model="tabrow.estatementnumber"
                    ></CInput>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4">
                    {{ $t("estatementdate") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <date-picker
                      v-model="tabrow.estatementdate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('estatementdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4">
                    {{ $t("studentadmission") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <v-select
                      class="w-100"
                      :options="StudentAdmissionTypeList"
                      v-model="tabrow.studentadmissiontypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      @input="ChangeStudentAdmissiontype"
                      label="name"
                    >
                    </v-select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="tabrow.istoschool == true">
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4">
                    {{ $t("fromoblast") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <v-select
                      class="w-100"
                      :options="OblastList"
                      v-model="tabrow.fromoblastid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="ChangeOblast"
                    >
                    </v-select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="tabrow.istoschool == true">
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4">
                    {{ $t("fromregion") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <v-select
                      class="w-100"
                      :options="RegionList"
                      v-model="tabrow.fromregionid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="ChangeRegion"
                    >
                    </v-select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="tabrow.istoschool == true">
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4">
                    {{ $t("fromorganization") }}
                  </label>
                  <div class="col-sm-8 d-flex">
                    <v-select
                      class="w-100"
                      :options="OrganizationList"
                      v-model="tabrow.fromorganizationid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="ChangeOrganization"
                    >
                    </v-select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-center">
                <b-button variant="danger" @click="CloseModal" class="mr-2">
                  <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                </b-button>
                <b-button variant="success" @click="Add">
                  <b-spinner v-if="AddLoading" small></b-spinner>
                  <b-icon v-if="!AddLoading" icon="check2"></b-icon>
                  {{ $t("Save") }}
                </b-button>
              </b-col>
            </b-row>
          </b-modal>
          <CRow>
            <CCol>
              <b-table
                :fields="SchoolAdmissionTables"
                :items="SchoolAdmission.Tables"
                class="bg-color-table text-center mx-3"
                style="vertical-align: middle"
                bordered
                responsive="sm"
                small
                :tbody-tr-class="rowClass"
              >
                <template v-slot:cell(actions)="{ item }">
                  <div class="text-center">
                    <b-link
                      class="mr-2"
                      @click="EditItem(item)"
                      v-if="SchoolAdmission.CanSave"
                    >
                      <b-icon icon="pencil"> </b-icon>
                    </b-link>
                    <b-link
                      @click="OpenDeleteItembyDbModal(item)"
                      v-if="
                        !SchoolAdmission.CanSave &&
                        $can('DeleteStudentInApprovedDocument', 'permissions')
                      "
                    >
                      <b-icon icon="trash"> </b-icon>
                    </b-link>
                    <b-link
                      @click="DeleteItem(item)"
                      v-if="SchoolAdmission.CanSave"
                    >
                      <b-icon icon="trash"> </b-icon>
                    </b-link>
                    <b-modal :id="'DeleteModal' + item.id" hide-footer>
                      <template v-slot:modal-title>{{
                        $t("WantDelete")
                      }}</template>
                      <div class="d-block text-right">
                        <CButton
                          @click="$bvModal.hide('DeleteModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("CancelApproval") }}
                        </CButton>
                        <CButton @click="DeleteItembyDb(item)" color="success">
                          <b-icon v-if="!DeleteLoading" icon="check2"></b-icon>
                          <b-spinner v-if="DeleteLoading" small></b-spinner>
                          {{ $t("Approve") }}
                        </CButton>
                      </div>
                    </b-modal>
                  </div>
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
                  @click="
                    $router.push({
                      name: 'SchoolAdmission',
                      query: {
                        startdate: $route.query.startdate,
                        enddate: $route.query.enddate,
                        search: $route.query.search,
                        schoolyear: $route.query.schoolyear,
                        orgschoolgrade: $route.query.orgschoolgrade,
                        pagelimit: $route.query.pagelimit,
                      },
                    })
                  "
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <CButton
                  v-if="SchoolAdmission.CanSave"
                  size="sm"
                  color="success"
                  class="mr-4"
                  @click="SaveData"
                  :disabled="SaveLoading"
                >
                  <b-spinner v-if="SaveLoading" small></b-spinner>
                  <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                  {{ $t("Save") }}
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCard>
        <b-modal
          ref="my-modal"
          size="xl"
          no-close-on-backdrop
          v-model="createModal"
          hide-footer
          hide-header
          modal-class="custom-size-modal"
        >
          <header class="modal-header">
            <h5 class="modal-title">{{ $t("Student") }}</h5>
            <button
              type="button"
              aria-label="Close"
              class="close"
              @click="showModal('createModal', false)"
            >
              ×
            </button>
          </header>
          <div class="modal-body">
            <edit-person-component
              :show-back-button="false"
              :person-type-id="1"
              @success="studentCreated($event)"
            ></edit-person-component>
          </div>
        </b-modal>
        <!-- <b-modal id="StudentModal" no-close-on-backdrop size="xl" :title="$t('Student')" hide-footer modal-class="custom-size-modal">
          <get-student-list-component :isAllStudent="isAllStudent" @SelectedItem="SelectedItem" @DblClick="AddStudentData"></get-student-list-component>
          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseStudentModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddStudentData(studentvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal> -->
        <b-modal
          id="StudentModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Student')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            persontypeid="1"
            @SelectedItem="SelectedItem"
            @DblClick="AddStudentData"
          ></person-list>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseStudentModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddStudentData(studentvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="SchoolAdmission"
          no-close-on-backdrop
          size="xl"
          :title="$t('Student')"
          hide-footer
          modal-class="custom-size-modal"
        >
        </b-modal>
      </CCol>
    </CRow>
  </b-overlay>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import StudentManageService from "@/services/StudentManage.service";
import SchoolAdmissionService from "@/services/SchoolAdmission.service";
import PersonList from "@/components/PersonList";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import StudentAdmissionTypeService from "@/services/StudentAdmissionType.service";
import GetStudentListComponent from "@/components/GetStudentListComponent";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  components: { editPersonComponent, GetStudentListComponent, PersonList },
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      SchoolAdmission: {},
      selectedrowid: 0,
      schoolyearlist: [],
      orgschoolgradelist: [],
      studentlist: [],
      isAllStudent: false,
      lang: "",
      SchoolAdmissionTables: [
        { key: "personname", label: this.$t("StudentName") },
        { key: "estatementnumber", label: this.$t("EstatementNumber") },
        { key: "estatementdate", label: this.$t("EstatementDate") },
        {
          key: "studentadmissiontypename",
          label: this.$t("studentadmissiontypename"),
        },
        { key: "fromorganizationname", label: this.$t("fromorganizationname") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        estatementnumber: "",
        estatementdate: "",
        studentadmissionid: 0,
        Status: 1,
        studentadmissiontypeid: 5,
        studentadmissiontypename: "",
        fromoblastid: 0,
        fromoblastname: "",
        fromregionid: 0,
        fromregionname: "",
        fromorganizationid: 0,
        fromorganizationname: "",
        istoschool: false,
      },
      toastCount: 0,
      allSignupErrors: {},
      studentfilter: {
        fullname: "",
        dateofbirth: "",
      },

      studentvalue: {},
      StudentAdmissionTypeList: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      editedIndex: -1,
      DeleteLoading: false,
      show: false,
      AddLoading: false,
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    this.Get();

    StudentAdmissionTypeService.GetAll().then((res) => {
      this.StudentAdmissionTypeList = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    this.loaddata();
  },
  computed: {},
  methods: {
    Get() {
      this.show = true;
      SchoolAdmissionService.Get(this.$route.params.id)
        .then((res) => {
          this.SchoolAdmission = res.data;
          this.show = false;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    getOblast() {
      if (!!this.tabrow.fromoblastid) {
        this.tabrow.fromoblastname = this.OblastList.filter(
          (item) => item.id === this.tabrow.fromoblastid
        )[0].name;
        RegionService.GetAll(this.lang, this.tabrow.fromoblastid).then(
          (res) => {
            this.RegionList = res.data;
          }
        );
      }
    },
    ChangeOblast() {
      this.tabrow.fromregionid = 0;
      this.tabrow.fromregionname = "";
      this.tabrow.fromorganizationid = 0;
      this.tabrow.fromorganizationname = "";
      this.getOblast();
    },
    OpenDeleteItembyDbModal(item) {
      this.$bvModal.show("DeleteModal" + item.id);
    },
    DeleteItembyDb(item) {
      this.DeleteLoading = true;
      SchoolAdmissionService.DeleteStudentInApprovedDocument(
        this.SchoolAdmission.id,
        item.id
      )
        .then((res) => {
          this.DeleteLoading = false;
          this.makeToast(
            this.$t("DeletedSuccessfully"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("DeleteModal" + item.id);
          this.Get();
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.DeleteLoading = false;
        });
    },
    ChangeOrganization() {
      if (!!this.tabrow.fromorganizationid) {
        this.tabrow.fromorganizationname = this.OrganizationList.filter(
          (item) => item.id === this.tabrow.fromorganizationid
        )[0].name;
      }
    },
    getRegion() {
      if (!!this.tabrow.fromregionid) {
        /* this.tabrow.fromregionname = this.RegionList.filter(item => item.id === this.tabrow.fromregionid)[0].name */
        if (this.tabrow.studentadmissiontypeid == 2) {
          OrganizationService.GetAll(
            this.tabrow.fromoblastid,
            this.tabrow.fromregionid,
            "",
            0,
            undefined,
            1
          ).then((res) => {
            this.OrganizationList = res.data;
          });
        } else if (this.tabrow.studentadmissiontypeid == 3) {
          OrganizationService.GetAll(
            this.tabrow.fromoblastid,
            this.tabrow.fromregionid,
            "",
            0,
            undefined,
            2
          ).then((res) => {
            this.OrganizationList = res.data;
          });
        } else {
          OrganizationService.GetAll(
            this.tabrow.fromoblastid,
            this.tabrow.fromregionid,
            "",
            2
          ).then((res) => {
            this.OrganizationList = res.data;
          });
        }
      }
    },
    ChangeRegion() {
      this.tabrow.fromorganizationid = 0;
      this.tabrow.fromorganizationname = "";
      this.getRegion();
    },
    ChangeStudentAdmissiontype() {
      this.tabrow.studentadmissiontypename = "";
      this.tabrow.fromorganizationid = 0;
      this.tabrow.fromorganizationname = "";
      this.tabrow.fromoblastid = 0;
      this.tabrow.fromoblastname = "";
      this.tabrow.fromregionid = 0;
      this.tabrow.fromregionname = "";
      if (!!this.tabrow.studentadmissiontypeid) {
        this.tabrow.studentadmissiontypename =
          this.StudentAdmissionTypeList.filter(
            (item) => item.id === this.tabrow.studentadmissiontypeid
          )[0].name;
        this.tabrow.istoschool = this.StudentAdmissionTypeList.filter(
          (item) => item.id === this.tabrow.studentadmissiontypeid
        )[0].istoschool;
      }
    },
    OpenModal() {
      this.$bvModal.show("OpenModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          estatementnumber: "",
          estatementdate: "",
          studentadmissionid: 0,
          Status: 1,
          studentadmissiontypeid: 5,
          studentadmissiontypename: this.StudentAdmissionTypeList.filter(
            (item) => item.id === 5
          )[0].name,
          fromoblastid: 0,
          fromoblastname: "",
          fromregionid: 0,
          fromregionname: "",
          fromorganizationid: 0,
          fromorganizationname: "",
        };
        this.editedIndex = -1;
      });
    },
    OpenStudentModal() {
      this.$bvModal.show("StudentModal");
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    AddStudentData(data) {
      this.tabrow.personname = data.fullname;
      this.tabrow.personid = data.id;
      // console.log(data)
      this.CloseStudentModal();
    },
    CloseModal() {
      this.$bvModal.hide("OpenModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          estatementnumber: "",
          estatementdate: "",
          studentadmissionid: 0,
          Status: 1,
          studentadmissiontypeid: 5,
          studentadmissiontypename: "",
          fromoblastid: 0,
          fromoblastname: "",
          fromregionid: 0,
          fromregionname: "",
          fromorganizationid: 0,
          fromorganizationname: "",
        };
        this.editedIndex = -1;
      });
    },
    CloseStudentModal() {
      this.$bvModal.hide("StudentModal");
    },
    studentCreated(data) {
      data;
      this.showModal("createModal", false);
      this.tabrow.personid = data.id;
      this.tabrow.personname = data.fullname + "(" + data.dateofbirth + ")";
      this.loadstudentlist(this.tabrow.personid);
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    loaddata() {
      SchoolYearService.GetAll().then((res) => {
        this.schoolyearlist = res.data;
      });
      OrgSchoolGradeService.GetAll("", 0, 0).then((res) => {
        this.orgschoolgradelist = res.data;
      });
    },
    loadstudentlist(personid) {
      this.tabrow.personid = 0;
      StudentManageService.GetAllFree(
        this.studentfilter.fullname,
        this.studentfilter.dateofbirth,
        personid
      ).then((res) => {
        this.studentlist = res.data;
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
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
    find_duplicate_in_array(arra1) {
      var object = {};
      var result = [];

      arra1.forEach(function (item) {
        if (!object[item]) object[item] = 0;
        object[item] += 1;
      });

      for (var prop in object) {
        if (object[prop] >= 1) {
          result.push(prop);
        }
      }

      return result;
    },
    Add() {
      var self = this;

      if (
        self.tabrow.personid === null ||
        self.tabrow.personid === undefined ||
        self.tabrow.personid === 0 ||
        self.tabrow.personid === ""
      ) {
        self.makeToast(self.$t("StudentNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow.studentadmissiontypeid === null ||
        self.tabrow.studentadmissiontypeid === undefined ||
        self.tabrow.studentadmissiontypeid === 0 ||
        self.tabrow.studentadmissiontypeid === ""
      ) {
        self.makeToast(
          self.$t("studentadmissiontypeNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow.istoschool) {
        if (
          self.tabrow.fromorganizationid === null ||
          self.tabrow.fromorganizationid === undefined ||
          self.tabrow.fromorganizationid === 0 ||
          self.tabrow.fromorganizationid === ""
        ) {
          self.makeToast(
            self.$t("OrganizationNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (
        self.SchoolAdmission.Tables.length === 50 ||
        self.SchoolAdmission.Tables.length > 50
      ) {
        self.makeToast(
          self.$t("MaxStudentCount50"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        !this.SchoolAdmission.CanSave &&
        this.$can("DeleteStudentInApprovedDocument", "permissions")
      ) {
        this.AddLoading = true;
        this.tabrow.ownerid = this.SchoolAdmission.id;
        SchoolAdmissionService.AddStudentToApprovedDocument(this.tabrow)
          .then((res) => {
            this.AddLoading = false;
            this.makeToast(
              this.$t("SuccessAdd"),
              this.$t("message"),
              "success"
            );
            this.Get();
            this.CloseAndClear();
          })
          .catch((error) => {
            this.AddLoading = false;
            this.makeToast(
              error.response.data.error,
              this.$t("error"),
              "danger"
            );
          });
      } else {
        if (self.editedIndex > -1) {
          Object.assign(
            self.SchoolAdmission.Tables[self.editedIndex],
            self.tabrow
          );
        } else {
          var dublicate = false;
          self.SchoolAdmission.Tables.forEach(function (item) {
            if (item.personid === self.tabrow.personid) dublicate = true;
          });
          if (dublicate) {
            self.makeToast(
              self.$t("personalreadyadd"),
              self.$t("Error"),
              "danger"
            );
            return false;
          }
          self.SchoolAdmission.Tables.push(self.tabrow);
        }
        this.CloseAndClear();
      }
    },
    CloseAndClear() {
      var self = this;
      self.tabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        estatementnumber: "",
        estatementdate: "",
        studentadmissionid: 0,
        Status: 1,
        studentadmissiontypeid: 5,
        studentadmissiontypename: "",
        fromoblastid: 0,
        fromoblastname: "",
        fromregionid: 0,
        fromregionname: "",
        fromorganizationid: 0,
        fromorganizationname: "",
      };

      self.studentfilter.fullname = "";
      self.studentfilter.dateofbirth = "";
      this.$bvModal.hide("OpenModal");
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.SchoolAdmission.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("OpenModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;

      var tableitemscount = 0;
      tableitemscount = self.SchoolAdmission.Tables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      }

      if (
        self.SchoolAdmission.docnumber === null ||
        self.SchoolAdmission.docnumber === undefined ||
        self.SchoolAdmission.docnumber === 0
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmission.schoolyearid === null ||
        self.SchoolAdmission.schoolyearid === undefined ||
        self.SchoolAdmission.schoolyearid === 0
      ) {
        this.makeToast(
          this.$t("schoolyearNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmission.orgschoolgradeid === null ||
        self.SchoolAdmission.orgschoolgradeid === undefined ||
        self.SchoolAdmission.orgschoolgradeid === 0
      ) {
        this.makeToast(
          this.$t("orgschoolgradeNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmission.detailinfo === null ||
        self.SchoolAdmission.detailinfo === undefined ||
        self.SchoolAdmission.detailinfo === 0
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmission.docdate === null ||
        self.SchoolAdmission.docdate === undefined ||
        self.SchoolAdmission.docdate === 0
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      this.SaveLoading = true
      if (!this.check()) {
        return false;
      }
      SchoolAdmissionService.Update(this.SchoolAdmission)
        .then((res) => {
          this.SaveLoading = false
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "SchoolAdmission",
            query: {
              startdate: this.$route.query.startdate,
              enddate: this.$route.query.enddate,
              search: this.$route.query.search,
              schoolyear: this.$route.query.schoolyear,
              orgschoolgrade: this.$route.query.orgschoolgrade,
              pagelimit: this.$route.query.pagelimit,
            },
          });
        })
        .catch((error) => {
          this.SaveLoading = false
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
  },
  watch: {
    "tabrow.fromoblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.tabrow.fromregionid = null;
          }
          var self = this;
          self.getOblast();
        }
      },
    },
    "tabrow.fromregionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.tabrow.fromorganizationid = null;
          }
          var self = this;
          self.getRegion();
        }
      },
    },
    /* "tabrow.studentadmissiontypeid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.tabrow.fromoblastid = null;
            this.tabrow.fromregionid = null;
            this.tabrow.fromorganizationid = null;
          }
        
        }
      },
    }, */
  },
};
</script>

<style>
</style>
