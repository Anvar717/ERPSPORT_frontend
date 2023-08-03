<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('AppointEmpAllWnc')}}</h4>
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
                    disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="AppointEmpAllWnc.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
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
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="AppointEmpAllWnc.docdate"
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
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('schoolyear')}}</label>
                    <v-select
                      disabled
                      class="col-sm-9"
                      :options="SchoolYear"
                      v-model="AppointEmpAllWnc.schoolyearid"
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
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('CalculationKind')}}</label>
                    <v-select
                      disabled
                      class="col-sm-9"
                      :options="CalculationKind"
                      v-model="AppointEmpAllWnc.calculationkindid"
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
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="AppointEmpAllWnc.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="$bvModal.show('AddModal')">
              <b-icon icon="plus"></b-icon>
              {{$t('Add')}}
            </c-button>
          </c-col>
        </c-row>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('AllwncTables')}}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('isappointment')}}</label>
                <v-select
                  :options="isappointmentlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="Tables.isappointmentid"
                  @change="IsAppoinmentCheckTables"
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
                  $t("person")
                  }}
                </label>
                <div class="col-sm-9 d-flex">
                  <c-input style="width:100%" disabled v-model="Tables.personname">
                    <template #append>
                      <CButton @click="OpenPersonModal" size="sm" type="button" color="primary">
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
                <label class="col-form-label col-sm-3">{{$t('schoolsubject')}}</label>
                <v-select
                  :options="SchoolSubjectList"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="Tables.schoolsubjectid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="Tables.isappointmentid === 1">
            <b-col>
              <custom-number-input
                horizontal
                :label="$t('allowancerate')"
                v-model="Tables.allowancerate"
              ></custom-number-input>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('startdate')}}</label>
                <date-picker
                  v-model="Tables.startdate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-9"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3" v-if="Tables.isappointmentid === 1">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('enddate')}}</label>
                <date-picker
                  v-model="Tables.enddate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('enddate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-9"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <CInput horizontal :label="$t('detailinfo')" v-model="Tables.detailinfo"></CInput>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
              <CButton size="sm" color="primary" @click="Add">
                <b-icon icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </template>
        </b-modal>
        <CRow>
          <CCol>
            <b-table
              :fields="fieldsMainTable"
              :items="itemsMainTable"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(allowancerate)="{item}">{{item.allowancerate + ' %'}}</template>
              <template #cell(actions)="{item}">
                <div class="text-center">
                  <b-link @click="EditItem(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                    <b-icon icon="pencil" ></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{content: $t('Delete') }"
                    @click="DeleteItem(item)"
                  >
                    <b-icon icon="trash" ></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
            <b-modal ref="my-modal" size="xl" v-model="createModal" hide-footer hide-header no-close-on-backdrop>
              <header class="modal-header">
                <h5 class="modal-title">{{$t('Employee')}}</h5>
                <button
                  type="button"
                  aria-label="Close"
                  class="close"
                  @click="showModal('createModal',false)"
                >×</button>
              </header>
              <div class="modal-body">
                <edit-person-component
                  :show-back-button="false"
                  :person-type-id="2"
                  @success="studentCreated($event)"
                ></edit-person-component>
              </div>
            </b-modal>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'AppointEmpAllWnc'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal id="PersonModal" no-close-on-backdrop size="xl" :title="$t('Person')" hide-footer modal-class="custom-size-modal">
        <person-list  @SelectedItem="SelectedItem(personvalue)" @DblClick="AddPersonData"></person-list>    

          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddEmployeePersonData(personvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import CalculationKindService from "@/services/CalculationKind.service";
import AppointEmpAllWncService from "@/services/AppointEmpAllWnc.service";
import PersonService from "@/services/person.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import PersonList from '@/components/PersonList'
export default {
  components: { editPersonComponent,PersonList },
  data() {
    return {
      createModal : false,
      SaveLoading: false,
      AppointEmpAllWnc: {
        docdate: "",
        docnumber: "",
        schoolyearid: "",
        calculationkind: "",
        detailinfo: "",
        Tables: [],
      },
      personloading: false,
      innofPerson: "",
      SchoolYear: [],
      CalculationKind: [],
      lang: "",
      fieldsMainTable: [
        {
          key: "isappointmentname",
          label: this.$t("IsAppointment"),
        },
        {
          key: "personname",
          label: this.$t("EmployeePerson"),
        },
        {
          key: "schoolsubject",
          label: this.$t("SchoolSubject"),
        },
        {
          key: "allowancerate",
          label: this.$t("Allowancerate"),
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      itemsMainTable: [],
      Tables: {
        isappointmentid: null,
        isappointment: false,
        isappointmentname: "",
        personid: null,
        personname: "",
        schoolsubjectid: null,
        schoolsubject: "",
        allowancerate: "",
        startdate: "",
        enddate: "",
        detailinfo: "",
        Status: 1,
      },
      isappointmentlist: [
        {
          id: 1,
          name: "Тайинлов/Назначение",
        },
        {
          id: 2,
          name: "Озод этиш/Отстранение",
        },
      ],
      SchoolSubjectList: [],
      editedIndex: -1,
      personvalue : {}
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.SchoolYear = res.data;
    });
    CalculationKindService.GetAll().then((res) => {
      this.CalculationKind = res.data;
    });
    AppointEmpAllWncService.Get(this.$route.params.id).then((res) => {
      this.AppointEmpAllWnc = res.data;
      this.itemsMainTable = res.data.Tables;
    });
    SchoolSubjectService.GetAll().then((res) => {
      this.SchoolSubjectList = res.data;
    });
  },
  computed: {},
  methods: {
    studentCreated(data) {
      (data);
      this.showModal("createModal", false);
    },
    AddPersonData(data){
      var self = this
      self.Tables.personid = data.id
      self.Tables.personname = data.fullname
      self.ClosePersonModal()
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    SelectedItem(value,data){
        value = data
    },
    OpenPersonModal(){
      this.$bvModal.show('PersonModal')
    }, 
    ClosePersonModal(){
      this.$bvModal.hide("PersonModal")
    }, 
    AddPerson (){
      this.showModal("createModal", true);
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
            this.Tables.personid = res.data.id;
            this.personloading = false;
            this.Tables.personname = res.data.fullname
          })
          .catch((error) => {
            this.Tables.personname = ''
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
      } else {
        this.tabrow.personid = null;
        this.Tables.personname = ''
      }
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

    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.Tables = {
          isappointmentid: null,
          isappointment: false,
          isappointmentname: "",
          personid: null,
          personname: "",
          schoolsubjectid: null,
          schoolsubject: "",
          allowancerate: "",
          startdate: "",
          enddate: "",
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    Add() {
      var self = this;
      if (
        self.Tables.isappointmentid === "" ||
        self.Tables.isappointmentid === undefined ||
        self.Tables.isappointmentid === null ||
        self.Tables.isappointmentid === 0
      ) {
        self.makeToast(
          self.$t("isappointmentNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Tables.personid === "" ||
        self.Tables.personid === undefined ||
        self.Tables.personid === null ||
        self.Tables.personid === 0
      ) {
        self.makeToast(
          self.$t("EmployeePersonNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Tables.schoolsubjectid === "" ||
        self.Tables.schoolsubjectid === undefined ||
        self.Tables.schoolsubjectid === null ||
        self.Tables.schoolsubjectid === 0
      ) {
        self.makeToast(
          self.$t("schoolsubjectNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.Tables.isappointmentid === 1) {
        if (
          self.Tables.allowancerate === "" ||
          self.Tables.allowancerate === undefined ||
          self.Tables.allowancerate === null ||
          self.Tables.allowancerate === 0
        ) {
          self.makeToast(
            self.$t("allowancerateNotSelect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      } else {
        self.Tables.allowancerate = 0;
      }

      if (
        self.Tables.startdate === "" ||
        self.Tables.startdate === undefined ||
        self.Tables.startdate === null ||
        self.Tables.startdate === 0
      ) {
        self.makeToast(
          self.$t("startdateNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.Tables.isappointmentname = self.isappointmentlist.filter(
        (item) => item.id === self.Tables.isappointmentid
      )[0].name;
      self.Tables.schoolsubject = self.SchoolSubjectList.filter(
        (item) => item.id === self.Tables.schoolsubjectid
      )[0].name;

      if (self.editedIndex > -1) {
        Object.assign(self.itemsMainTable[self.editedIndex], self.Tables);
      } else {
        self.itemsMainTable.push(self.Tables);
      }

      self.Tables = {
        isappointmentid: null,
        isappointment: false,
        isappointmentname: "",
        personid: null,
        personname: "",
        schoolsubjectid: null,
        schoolsubject: "",
        allowancerate: "",
        startdate: "",
        enddate: "",
        detailinfo: "",
        Status: 1,
      };
      self.$bvModal.hide("AddModal");
    },
    IsAppoinmentCheckTables() {
      if (this.Tables.isappointmentid == 1) {
        this.Tables.isappointment = true;
      } else {
        this.Tables.isappointment = false;
      }
    },
    IsAppoinmentCheckCell(item) {
      if (item.isappointmentid == 1) {
        item.isappointment = true;
      } else {
        item.isappointment = false;
      }
    },
    EditItem(item) {
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.itemsMainTable.indexOf(item);
      this.Tables = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    SaveData() {
      this.CheckItemDelete();
      this.AppointEmpAllWnc.Tables = this.itemsMainTable;
      AppointEmpAllWncService.Update(this.AppointEmpAllWnc)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "AppointEmpAllWnc",
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
    CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          (this.itemsMainTable[i].Status == 3 &&
            this.itemsMainTable[i].personid == "") ||
          this.itemsMainTable[i].schoolsubjectid == ""
        ) {
          this.itemsMainTable.splice(i, 1);
        }
      }
    },
  },
};
</script>

<style>
</style>