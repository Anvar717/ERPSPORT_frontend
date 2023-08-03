<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("OlympiadWinner") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput
                    disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="OlympiadWinner.docnumber"
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
                <ValidationProvider v-slot="v" name="startdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{ $t("docdate") }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="OlympiadWinner.docdate"
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
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>
                      {{
                      $t("schoolyear")
                      }}
                    </label>
                    <v-select
                      disabled
                      class="col-sm-9"
                      :options="schoolyearlist"
                      v-model="OlympiadWinner.schoolyearid"
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
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>
                      {{
                      $t("subjectolympiad")
                      }}
                    </label>
                    <v-select
                      class="col-sm-9"
                      :options="subjectolympiadlist"
                      v-model="OlympiadWinner.subjectolympiadid"
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
                    <label class="col-form-label col-sm-3" for>
                      {{
                      $t("schoolsubject")
                      }}
                    </label>
                    <v-select
                      class="col-sm-9"
                      :options="schoolsubjectlist"
                      v-model="OlympiadWinner.schoolsubjectid"
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
                <ValidationProvider v-slot="v" name="linktoresult" rules="required">
                  <CInput
                    :placeholder="$t('linktoresult')"
                    autocomplete="linktoresult"
                    horizontal
                    :label="$t('linktoresult')"
                    v-model="OlympiadWinner.linktoresult"
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
                <ValidationProvider v-slot="v" name="startdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{ $t("startdate") }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="OlympiadWinner.startdate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('date')"
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
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{ $t("enddate") }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="OlympiadWinner.enddate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('date')"
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
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="OlympiadWinner.detailinfo"
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
          </ValidationObserver>
        </CCardBody>
        <b-modal id="AddModal" size="xl" no-close-on-backdrop>
          <template v-slot:modal-title>{{ $t("OlympiadWinner") }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("oblastname")
                  }}
                </label>
                <v-select
                  :options="oblastlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.oblastid"
                  @input="ChangeOblast"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("regionname")
                  }}
                </label>
                <v-select
                  :options="regionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.regionid"
                  @input="ChangeRegion"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("Organization")
                  }}
                </label>
                <div class="col-sm-9 d-flex">
                  <c-input style="width:100%" disabled v-model="tabrow.organizationname">
                    <template #append>
                      <CButton @click="OpenOrgModal" :disabled="tabrow.regionid == 0" size="sm" type="button" color="primary">
                        <b-icon icon="three-dots"></b-icon>
                      </CButton>
                    </template>
                  </c-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("organizationname")
                  }}
                </label>
                <v-select
                  :options="organizationlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="shortname"
                  v-model="tabrow.organizationid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row> -->
          <!-- <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("InnOrPinfl")
                  }}
                </label>
                <div class="col-sm-9">
                  <b-input-group class="mb-2">
                    <b-input-group-prepend >
                      <b-form-select style="border-radius : 0px" text-field="name"  value-field="id" v-model="documenttype" :options="DocumentTypeList">
                        <template v-slot:first>
                          <b-form-select-option :value="null" disabled>-- {{$t('ChooseBelow')}} --</b-form-select-option>
                        </template>
                      </b-form-select>
                      <b-form-select text-field="name"  value-field="name" v-if="documenttype === 1" style="border-radius : 0px"  v-model="docseries" :options="DocumentSeriesList">
                        <template v-slot:first>
                          <b-form-select-option :value="null" disabled>-- {{$t('ChooseBelow')}} --</b-form-select-option>
                        </template>
                      </b-form-select>
                      <b-form-input v-model="docseries2" style="border-radius : 0px"  v-if="documenttype != 1" :placeholder="$t('docseries')" aria-label="Text input with checkbox"></b-form-input>
                    </b-input-group-prepend>
                    <b-form-input v-model="docnumber" :placeholder="$t('docnumber')" aria-label="Text input with checkbox"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary" size="sm" @click="SearchStudent" :disabled="studentloading"> 
                        <c-icon v-if="!studentloading" name="cil-magnifying-glass"></c-icon>
                        <b-spinner small v-if="studentloading"></b-spinner>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                  
                </div>
              </div>
            </b-col>
          </b-row> -->
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("Student")
                  }}
                </label>
                <div class="col-sm-9 d-flex">
                  <c-input style="width:100%" disabled v-model="tabrow.studentpersonname">
                    <template #append>
                      <CButton @click="OpenStudentPersonModal" size="sm" type="button" color="primary">
                        <b-icon icon="three-dots"></b-icon>
                      </CButton>
                    </template>
                  </c-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("schoolsubjectname")
                  }}
                </label>
                <v-select
                  :options="schoolsubjectlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.schoolsubjectid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("olympiadwinnertypename")
                  }}
                </label>
                <v-select
                  :options="olympiadwinnertypelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.olympiadwinnertypeid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
            <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("employeepersonname")
                  }}
                </label>
                <div class="col-sm-9 d-flex">
                  <c-input style="width:100%" disabled v-model="tabrow.employeepersonname">
                    <template #append>
                      <CButton @click="OpenEmployeePersonModal" size="sm" type="button" color="primary">
                        <b-icon icon="three-dots"></b-icon>
                      </CButton>
                    </template>
                  </c-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <CInput
                autocomplete="text"
                horizontal
                :label="$t('detailinfo')"
                v-model="tabrow.detailinfo"
              ></CInput>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="AddRow">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="showModal">
              <!-- $bvModal.show('AddModal') -->
              <b-icon icon="plus"></b-icon>
              {{ $t("Add") }}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="OlympiadWinnerTables"
              :items="OlympiadWinner.Tables1"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(oblastname)="{ item }">
                <p>{{ item.oblastname }}</p>
              </template>
              <template v-slot:cell(regionname)="{ item }">
                <p>{{ item.regionname }}</p>
              </template>
              <template v-slot:cell(organizationname)="{ item }">
                <p>{{ item.organizationname }}</p>
              </template>

              <template #cell(actions)="{item}">
                <div class="text-center">
                  <b-link
                    @click="EditItem(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil" ></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteItem(item)"
                  >
                    <b-icon icon="trash" ></b-icon>
                  </b-link>
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
                @click="$router.push({ name: 'OlympiadWinner' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="OlympiadWinner.CanSave"
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
        <b-modal ref="my-modal" size="xl" v-model="createModal" hide-footer hide-header no-close-on-backdrop>
          <header class="modal-header">
            <h5 class="modal-title">{{$t('Student')}}</h5>
            <button
              type="button"
              aria-label="Close"
              class="close"
              @click="showModal1('createModal',false)"
            >×</button>
          </header>
          <div class="modal-body">
            <edit-person-component
              :show-back-button="false"
              :person-type-id="1"
              @success="studentCreated($event)"
            ></edit-person-component>
          </div>
        </b-modal>
        <b-modal ref="my-modal1" size="xl" v-model="createEmployeeModal" hide-footer hide-header no-close-on-backdrop>
          <header class="modal-header">
            <h5 class="modal-title">{{$t('Employee')}}</h5>
            <button
              type="button"
              aria-label="Close"
              class="close"
              @click="showEmployeeModal('createEmployeeModal',false)"
            >×</button>
          </header>
          <div class="modal-body">
            <edit-person-component
              :show-back-button="false"
              :person-type-id="2"
              @success="EmployeeCreated($event)"
            ></edit-person-component>
          </div>
        </b-modal>
      </CCard>
      <b-modal id="OrgModal" no-close-on-backdrop size="xl" :title="$t('Organization')" hide-footer modal-class="custom-size-modal">
          <organization-list :regionid="tabrow.regionid || 0" @SelectedItem="SelectedItem(orgvalue)" @DblClick="AddOrgData"></organization-list>
          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseOrgModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddOrgData(orgvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal>
      <b-modal id="StudentPersonModal" no-close-on-backdrop size="xl" :title="$t('Student')" hide-footer modal-class="custom-size-modal">
        <person-list persontypeid @SelectedItem="SelectedItem(studentvalue)" @DblClick="AddStudentPersonData"></person-list>    

          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseStudentPersonModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddStudentPersonData(studentvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal>
      <b-modal id="EmployeePersonModal" no-close-on-backdrop size="xl" :title="$t('Person')" hide-footer modal-class="custom-size-modal">
        <person-list  @SelectedItem="SelectedItem(employeevalue)" @DblClick="AddEmployeePersonData"></person-list>    

          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseEmployeePersonModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddEmployeePersonData(employeevalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import OlympiadWinnerTypeService from "@/services/OlympiadWinnerType.service";
import PersonService from "@/services/person.service";
import OrganizationService from "@/services/organization.service";
import RegionService from "@/services/Region.service";
import HelperService from "@/services/helper.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SubjectOlympiadService from "@/services/SubjectOlympiad.service";
import OlympiadWinnerService from "@/services/OlympiadWinner.service";
import IdentityDocumentService from "@/services/IdentityDocument.service" 
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import OrganizationList from '@/components/OrganizationList'
import PersonList from '@/components/PersonList'
export default {
  components: { editPersonComponent, OrganizationList,PersonList },
  data() {
    return {
      createModal: false,
      createEmployeeModal : false,
      documenttype : null,
      DocumentTypeList : [],
      DocumentSeriesList  :[],
      docnumber : '',
      docseries : null,
      docseries2 : "",
      selected: null,
      SaveLoading: false,
      OlympiadWinner: {},
      selectedrowid: 0,
      editedIndex: -1,
      schoolyearlist: [],
      subjectolympiadlist: [],
      schoolsubjectlist: [],
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      olympiadwinnertypelist: [],

      OlympiadWinnerTables: [
        { key: "oblastname", label: this.$t("oblastname") },
        { key: "regionname", label: this.$t("regionname") },
        { key: "organizationname", label: this.$t("organizationname") },
        { key: "studentpersonname", label: this.$t("studentpersonname") },
        { key: "schoolsubjectname", label: this.$t("schoolsubjectname") },
        {
          key: "olympiadwinnertypename",
          label: this.$t("olympiadwinnertypename"),
        },
        { key: "employeepersonname", label: this.$t("employeepersonname") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        studentpersonid: 0,
        studentpersonname: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        olympiadwinnertypeid: 0,
        olympiadwinnertypename: "",
        employeepersonid: 0,
        employeepersonname: "",
        detailinfo: "",
        Status: 1,
      },
      toastCount: 0,
      allSignupErrors: {},
      lang : localStorage.getItem('locale') || 'ru',
      personloading: false,
      innofPerson: "",
      studentloading : false,
      orgvalue : {},
      studentvalue : {},
      employeevalue : {}
    };
  },
  created() {
    var self = this;
    self.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;

    self.GetOblastList();
    SchoolSubjectService.GetAll().then((res) => {
      self.schoolsubjectlist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      self.schoolyearlist = res.data;
    });
    SubjectOlympiadService.GetAll().then((res) => {
      self.subjectolympiadlist = res.data;
    });
    OlympiadWinnerTypeService.GetAll().then((res) => {
      self.olympiadwinnertypelist = res.data;
    });
    OlympiadWinnerService.Get(self.selectedrowid).then((res) => {
      self.OlympiadWinner = res.data;
    });
    IdentityDocumentService.GetAll().then(res => {
      self.DocumentTypeList = res.data.result
    })
    IdentityDocumentService.GetAllIdentityDocSeries(1).then(res => {
      self.DocumentSeriesList = res.data.result
    })
  },
  methods: {
    SelectedItem(value,data){
        value = data
    },
    AddOrgData(data){
      var self = this
      self.tabrow.organizationid = data.id
      self.tabrow.organizationname = data.fullname
      self.CloseOrgModal()
    },
    AddStudentPersonData(data){
      var self = this
      self.tabrow.studentpersonid = data.id
      self.tabrow.studentpersonname = data.fullname
      self.CloseStudentPersonModal()
    },
    AddEmployeePersonData(data){
      var self = this
      self.tabrow.employeepersonid = data.id
      self.tabrow.employeepersonname = data.fullname
      self.CloseEmployeePersonModal()
    },
    OpenOrgModal(){
      this.$bvModal.show("OrgModal")
    },
    OpenStudentPersonModal(){
      this.$bvModal.show('StudentPersonModal')
    }, 
    OpenEmployeePersonModal(){
      this.$bvModal.show('EmployeePersonModal')
    },  
    CloseOrgModal(){
      this.$bvModal.hide("OrgModal")
    },
    CloseEmployeePersonModal(){
      this.$bvModal.hide("EmployeePersonModal")
    },
    CloseStudentPersonModal(){
      this.$bvModal.hide("StudentPersonModal")
    },
    SearchStudent(){
      if(!!this.docseries && !!this.docnumber){
        this.studentloading = true
        PersonService.Get(0,this.documenttype,this.documenttype == 1 ? this.docseries : this.docseries2,this.docnumber,"",true,true).then(res => {
          this.studentloading = false
          this.tabrow.studentpersonname = res.data.fullname
          this.tabrow.studentpersonid = res.data.id
        }).catch(error => {
          this.studentloading = false
          this.tabrow.studentpersonname = ""
        })
      }
      else{
        this.tabrow.studentpersonname = ""
      }
    },
    studentCreated(data) {
      (data);
      this.showModal1("createModal", false);
    },
    showModal1(modal, value) {
      this.$data[modal] = value;
    },
    AddStudent (){
      this.showModal1("createModal", true);
    },
    EmployeeCreated(data) {
      (data);
      this.showEmployeeModal("createEmployeeModal", false);
    },
    showEmployeeModal(modal, value) {
      this.$data[modal] = value;
    },
    AddEmployee (){
      this.showEmployeeModal("createEmployeeModal", true);
    },
    showModal() {
      var self = this;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        studentpersonid: 0,
        studentpersonname: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        olympiadwinnertypeid: 0,
        olympiadwinnertypename: "",
        employeepersonid: 0,
        employeepersonname: "",
        detailinfo: "",
        Status: 1,
      };
      this.editedIndex = -1;
      console.log(self.OlympiadWinner.schoolsubjectid);
      self.tabrow.schoolsubjectid = self.OlympiadWinner.schoolsubjectid;
      console.log(self.tabrow.schoolsubjectid);

      self.$bvModal.show("AddModal");
    },

    FindPersonByInn() {
      if (!!this.innofPerson) {
        this.personloading = true;
        PersonService.GetByInnORPinfl(
          "",
          2,
          "",
          "",
          this.innofPerson.length === 9 ? this.innofPerson : "",
          this.innofPerson.length === 14 ? this.innofPerson : "",
          "",
          ""
        )
          .then((res) => {
            this.tabrow.employeepersonid = res.data.id;
            this.tabrow.employeepersonname = res.data.fullname
            this.personloading = false;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
            this.tabrow.employeepersonname = ''
            this.personloading = false;
          });
      } else {
        this.tabrow.employeepersonid = null;
        this.tabrow.employeepersonname = ''
      }
    },
    GetOblastList() {
      var self = this;
      HelperService.GetOblastList(self.lang).then((res) => {
        self.oblastlist = res.data;
      });
    },
    GetRegionList(oblastid) {
      var self = this;
      if (!!oblastid) {
        RegionService.GetAll(this.lang,oblastid).then((res) => {
          self.regionlist = res.data;
        });
      } else {
        self.regionlist = [];
      }
    },
    GetOrganizationList(oblastid, regionid) {
      var self = this;
      if (!!oblastid && !!regionid) {
        OrganizationService.GetAll(oblastid, regionid).then((res) => {
          self.organizationlist = res.data;
        });
      } else {
        self.organizationlist = [];
      }
    },

    check() {
      var self = this;
      if (
        self.OlympiadWinner.docnumber === null ||
        self.OlympiadWinner.docnumber === undefined ||
        self.OlympiadWinner.docnumber === 0 ||
        self.OlympiadWinner.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.OlympiadWinner.docdate === null ||
        self.OlympiadWinner.docdate === undefined ||
        self.OlympiadWinner.docdate === 0 ||
        self.OlympiadWinner.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.OlympiadWinner.schoolyearid === null ||
        self.OlympiadWinner.schoolyearid === undefined ||
        self.OlympiadWinner.schoolyearid === 0
      ) {
        this.makeToast(
          this.$t("SchoolYearNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OlympiadWinner.subjectolympiadid === null ||
        self.OlympiadWinner.subjectolympiadid === undefined ||
        self.OlympiadWinner.subjectolympiadid === 0
      ) {
        this.makeToast(
          this.$t("SubjectOlympiadNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OlympiadWinner.schoolsubjectid === null ||
        self.OlympiadWinner.schoolsubjectid === undefined ||
        self.OlympiadWinner.schoolsubjectid === 0
      ) {
        this.makeToast(
          this.$t("SchoolSubjectNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OlympiadWinner.startdate === null ||
        self.OlympiadWinner.startdate === undefined ||
        self.OlympiadWinner.startdate === 0 ||
        self.OlympiadWinner.startdate === ""
      ) {
        this.makeToast(
          this.$t("StartDateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OlympiadWinner.enddate === null ||
        self.OlympiadWinner.enddate === undefined ||
        self.OlympiadWinner.enddate === 0 ||
        self.OlympiadWinner.enddate === ""
      ) {
        this.makeToast(
          this.$t("EndDateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      var tableitemscount = 0;

      tableitemscount = self.OlympiadWinner.Tables1.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        this.makeToast(this.$t("TableNotfull"), this.$t("Error"), "danger");

        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      OlympiadWinnerService.Update(self.OlympiadWinner)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "OlympiadWinner" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    ChangeOblast() {
      var self = this;
      if (self.tabrow.regionid > 0) {
        self.tabrow.regionid = "";
        self.tabrow.mfyid = "";
        self.mfylist = [];
      }
      self.GetRegionList(self.tabrow.oblastid);
    },
    ChangeRegion() {
      var self = this;
      if (self.tabrow.organizationid > 0) {
        self.tabrow.organizationid = "";
      }
      if (self.tabrow.olympiadwinnertypeid > 0) {
        self.tabrow.olympiadwinnertypeid = "";
      }
      self.GetOrganizationList(self.tabrow.oblastid, self.tabrow.regionid);
    },

    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          organizationid: 0,
          organizationname: "",
          studentpersonid: 0,
          studentpersonname: "",
          schoolsubjectid: 0,
          schoolsubjectname: "",
          olympiadwinnertypeid: 0,
          olympiadwinnertypename: "",
          employeepersonid: 0,
          employeepersonname: "",
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    AddRow(data) {
      var self = this;
      self.tabrow.oblastname = self.oblastlist.filter(function (item) {
        if (item.id === self.tabrow.oblastid) return item;
      })[0].name;
      self.tabrow.regionname = self.regionlist.filter(function (item) {
        if (item.id === self.tabrow.regionid) return item;
      })[0].name;
      self.tabrow.organizationname = self.organizationlist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.organizationid) return item;
      })[0].shortname;
      self.tabrow.schoolsubjectname = self.schoolsubjectlist.filter(
        (item) => item.id === self.tabrow.schoolsubjectid
      )[0].name;
      self.tabrow.olympiadwinnertypename = self.olympiadwinnertypelist.filter(
        (item) => item.id === self.tabrow.olympiadwinnertypeid
      )[0].name;

      if (self.editedIndex > -1) {
        Object.assign(
          self.OlympiadWinner.Tables1[self.editedIndex],
          self.tabrow
        );
      } else {
        self.OlympiadWinner.Tables1.push(self.tabrow);
      }

      self.tabrow = {
        id: 0,
        ownerid: 0,
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        studentpersonid: 0,
        studentpersonname: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        olympiadwinnertypeid: 0,
        olympiadwinnertypename: "",
        employeepersonid: 0,
        employeepersonname: "",
        detailinfo: "",
        Status: 1,
      };
      this.$bvModal.hide("AddModal");
    },
    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.OlympiadWinner.Tables1.indexOf(item);
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
