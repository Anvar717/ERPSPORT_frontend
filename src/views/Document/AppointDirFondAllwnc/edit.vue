<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('AppointDirFondAllwnc')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="docnumber" rules="required">
                  <CInput
                  disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="AppointDirFondAllwnc.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('ondate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="AppointDirFondAllwnc.docdate"
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
                    <label class="col-form-label col-sm-3" for>{{$t('schoolyear')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schoolyearlist"
                      v-model="AppointDirFondAllwnc.schoolyearid"
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
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="AppointDirFondAllwnc.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
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
                          v-model="allwnctabrow.isappointmentid"
                          @change="IsAppoinmentCheckTables"
                          class="col-sm-9"
                        ></v-select>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="form-group form-row">
                        <label class="col-form-label col-sm-3">{{$t('isteacher')}}</label>
                        <b-form-checkbox
                          class="mb-0 ml-2"
                          size="lg"
                          v-model="allwnctabrow.isteacher"
                        ></b-form-checkbox>
                      </div>
                    </b-col>
                  </b-row>
                  <!-- <b-row>
                    <b-col>
                      <div class="form-group form-row">
                        <label class="col-form-label col-sm-3">{{$t('person')}}</label>
                        <v-select
                          :options="employeelist"
                          :reduce="item => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="allwnctabrow.personid"
                          class="col-sm-9"
                        ></v-select>
                      </div>
                    </b-col>
                  </b-row> -->
                  <b-row>
                    <b-col>
                      <div class="form-group form-row">
                        <label class="col-form-label col-sm-3">{{$t('Employee')}}</label>
                        <div class="d-flex col-sm-9">
                          <CInput  class="mb-0 mr-2" style="width:100%" disabled v-model="allwnctabrow.personname"></CInput>
                          <b-button size="sm" variant="primary" @click="OpenEmployeeModal">
                            <b-icon icon="three-dots"></b-icon>
                          </b-button>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row v-if="allwnctabrow.isteacher"> 
                    <b-col>
                      <div class="form-group form-row">
                        <label class="col-form-label col-sm-3">{{$t('schoolsubject')}}</label>
                        <v-select
                          :options="schoolsubjectlist"
                          :reduce="item => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="allwnctabrow.schoolsubjectid"
                          class="col-sm-9"
                        ></v-select>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <custom-number-input
                        horizontal
                        :label="$t('allowancerate')"
                        v-model="allwnctabrow.allowancerate"
                      ></custom-number-input>
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col>
                      <div class="form-group form-row">
                        <label class="col-form-label col-sm-3">{{$t('startdate')}}</label>
                        <date-picker
                          v-model="allwnctabrow.startdate"
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
                  <b-row class="mt-3">
                    <b-col>
                      <div class="form-group form-row">
                        <label class="col-form-label col-sm-3">{{$t('enddate')}}</label>
                        <date-picker
                          v-model="allwnctabrow.enddate"
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
                      <CInput horizontal :label="$t('detailinfo')"  v-model="allwnctabrow.detailinfo"></CInput>
                    </b-col>
                  </b-row>
                  <template v-slot:modal-footer>
                    <div class="text-center mx-auto">
                      <CButton size="sm" color="danger" class="mr-2" @click="Close">
                        <b-icon icon="arrow-left-short" ></b-icon>
                        {{$t('back')}}
                      </CButton>
                      <CButton size="sm" color="primary" @click="AddItem">
                        <b-icon icon="check2"></b-icon>
                        {{$t('Save')}}
                      </CButton>
                    </div>
                  </template>
                </b-modal>
                <c-button v-if="tabindex === 0" class="ml-n5 mr-3 float-right"  size="sm" color="primary" @click="$bvModal.show('AddModal')">
                  <b-icon icon="plus"></b-icon> {{$t('Add')}}
                </c-button>
                <b-tabs v-model="tabindex" pills>
                  <b-tab :title="$t('AllwncTables')" active >
                    <CRow class="mt-4">
                      <CCol>
                        <b-table
                          :fields="AppointDirFondAllwncAllwncTables"
                          :items="AppointDirFondAllwnc.AllwncTables"
                          class="bg-color-table text-center mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                          <template #cell(isappointmentname)="{item}">
                              {{item.isappointmentid ===1 ? "Тайинлов/Назначение" : "Озод этиш/Отстранение"}}
                          </template>
                          <template #cell(isteacher)="{item}">
                              {{item.isteacher ? $t('yes') : $t('no')}}
                          </template>
                          <template #cell(actions)="{item}">
                            <div class="text-center">
                              <b-link
                                @click="EditItem(item)"
                                class="mr-2"
                                v-c-tooltip="{content: $t('Edit') }"
                              >
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
                      </CCol>
                    </CRow>
                  </b-tab>

                  <b-tab :title="$t('WorkGroupTables')">
                    <CRow class="mt-4">
                      <CCol>
                        <b-table
                          :fields="AppointDirFondAllwncWorkGroupTables"
                          :items="AppointDirFondAllwnc.WorkGroupTables"
                          class="bg-color-table text-center tdpadding mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                          <template v-slot:thead-top>
                            <b-tr>
                              <b-th style="width:15%">
                                <CInput class="mb-0" v-model="allworktabrow.membername"></CInput>
                              </b-th>
                              <b-th style="width:15%">
                                <CInput class="mb-0" v-model="allworktabrow.postionname"></CInput>
                              </b-th>
                              <b-th style="width:14%">
                                <b-form-checkbox
                                  class="mb-0"
                                  size="lg"
                                  v-model="allworktabrow.isworkgoupheader"
                                ></b-form-checkbox>
                              </b-th>
                              <b-th style="width:15%">
                                <CInput class="mb-0" v-model="allworktabrow.detailinfo"></CInput>
                              </b-th>
                              <b-th style="width:7%">
                                <CButton
                                  size="sm"
                                  color="primary"
                                  variant="outline"
                                  @click="AddWorkGroupTables"
                                >
                                  <b-icon icon="plus"> </b-icon>
                                </CButton>
                              </b-th>
                            </b-tr>
                          </template>

                          <template v-slot:cell(membername)="{item}">
                            <p v-if="item.Status == 0">{{item.membername}}</p>
                            <CInput
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              v-model="item.membername"
                            ></CInput>
                          </template>
                          <template v-slot:cell(postionname)="{item}">
                            <p v-if="item.Status == 0">{{item.postionname}}</p>
                            <CInput
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              v-model="item.postionname"
                            ></CInput>
                          </template>
                          <template v-slot:cell(isworkgoupheader)="{item}">
                            <p v-if="item.Status == 0">{{item.isworkgoupheader}}</p>
                            <b-form-checkbox
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              size="lg"
                              v-model="item.isworkgoupheader"
                            ></b-form-checkbox>
                          </template>
                          <template v-slot:cell(detailinfo)="{item}">
                            <p v-if="item.Status == 0">{{item.detailinfo}}</p>
                            <CInput
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              v-model="item.detailinfo"
                            ></CInput>
                          </template>
                          <template v-slot:cell(actions)="{item}">
                            <CButtonGroup
                              class="mx-auto d-block text-center"
                              size="sm"
                              v-if="AppointDirFondAllwnc.CanSave"
                            >
                              <CButton variant="outline" color="primary" @click="EditItem1(item)">
                                <b-icon icon="pencil"></b-icon>
                              </CButton>
                              <CButton variant="outline" color="danger" @click="DeleteItem(item)">
                                <b-icon icon="x"></b-icon>
                              </CButton>
                            </CButtonGroup>
                          </template>
                        </b-table>
                      </CCol>
                    </CRow>
                  </b-tab>
                </b-tabs>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'AppointDirFondAllwnc'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                @click="SaveData"
                v-if="AppointDirFondAllwnc.CanSave"
                enabled
                size="sm"
                color="success"
                class="mr-4"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal id="modalXl" size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal">
        <employee-list-component :ondate="AppointDirFondAllwnc.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson">

          </employee-list-component>
          <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
          <!-- <edit-person-component></edit-person-component> -->

          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddPerson(personvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import AppointDirFondAllwncService from "@/services/AppointDirFondAllwnc.service";
import HelperService from "@/services/helper.service";
import SchoolYearService from "@/services/SchoolYear.service";
import PersonService from "@/services/person.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import EmployeeListComponent from '@/components/EmployeeList'
export default {
  components : {EmployeeListComponent},
  data() {
    return {
      AppointDirFondAllwnc: {},
      tabindex : 0,
      employeelist: [],
      schoolyearlist: [],
      schoolsubjectlist: [],
      editedIndex : -1,
      AppointDirFondAllwncAllwncTables: [
        { key: "isappointmentname", label: this.$t("isappointmentname") },
        { key: "isteacher", label: this.$t("isteacher") },
        { key: "personname", label: this.$t("Employee") },
        { key: "schoolsubjectname", label: this.$t("schoolsubjectname") },
        { key: "allowancerate", label: this.$t("allowancerate") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: "" }
      ],

      allwnctabrow: {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: true,
        isteacher: false,
        personid: 0,
        personname: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        allowancerate: "",
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      },

      AppointDirFondAllwncWorkGroupTables: [
        { key: "membername", label: this.$t("membername") },
        { key: "postionname", label: this.$t("postionname") },
        { key: "isworkgoupheader", label: this.$t("isworkgoupheader") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") }
      ],

      allworktabrow: {
        id: 0,
        ownerid: 0,
        membername: "",
        postionname: "",
        isworkgoupheader: false,
        detailinfo: "",
        Status: 1
      },
      isappointmentlist: [
        { id: 1, name: "Тайинлов/Назначение" },
        { id: 2, name: "Озод этиш/Отстранение" }
      ],
      SaveLoading: false,
      personvalue : {}
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    AppointDirFondAllwncService.Get(self.selectedrowid).then(res => {
      self.AppointDirFondAllwnc = res.data;
    }),
    SchoolSubjectService.GetAll().then(res => {
      self.schoolsubjectlist = res.data;
    });
    SchoolYearService.GetAll().then(res => {
      self.schoolyearlist = res.data;
    });
  },
  methods: {
    SelectedItem(value){
      this.personvalue = value
    },
    OpenEmployeeModal(){
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl")
    },
    CloseEmployeeModal(){
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl")
    },
     AddPerson(data){
      this.allwnctabrow.personid = data.personid
      this.allwnctabrow.personname = data.personname
      this.CloseEmployeeModal()
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    IsAppoinmentCheckTables() {
      var self = this;
      if (self.allwnctabrow.isappointmentid == 1) {
        self.allwnctabrow.isappointment = true;
      } else {
        self.allwnctabrow.isappointment = false;
      }
    },
    IsAppoinmentCheckCell(item) {
      if (item.isappointmentid == 1) {
        item.isappointment = true;
      } else {
        item.isappointment = false;
      }
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    docdatechange() {
      var self = this;
      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.AppointDirFondAllwnc.docdate,
        0
      ).then(res => {
        self.employeelist = res.data;
      });
    },
    AddItem(){
      if (this.editedIndex > -1) {
          Object.assign(this.AppointDirFondAllwnc.AllwncTables[this.editedIndex], this.allwnctabrow)
          this.Close()
        } else {
          this.AddAllwncTables();
        }
    },
    Close(){
      this.$bvModal.hide('AddModal')
      this.$nextTick(() => {
        this.allwnctabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          schoolsubjectid: 0,
          schoolsubject: "",
          qualificationcategoryid: 0,
          qualificationcategory: "",
          documentseries: "",
          documentnumber: "",
          startdate: 0,
          enddate: 0,
          detailinfo: "",
          Status: 1
        };
        this.editedIndex = -1
      })
    },
    AddAllwncTables() {
      var self = this;

      if (
        self.allwnctabrow.personid === "" ||
        self.allwnctabrow.personid === undefined ||
        self.allwnctabrow.personid === null ||
        self.allwnctabrow.personid === 0
      ) {
        self.makeToast(
          self.$t("employeeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.allwnctabrow.isteacher && (
        self.allwnctabrow.schoolsubjectid === "" ||
        self.allwnctabrow.schoolsubjectid === undefined ||
        self.allwnctabrow.schoolsubjectid === null ||
        self.allwnctabrow.schoolsubjectid === 0)
      ) {
        self.makeToast(
          self.$t("schoolsubjectNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.allwnctabrow.allowancerate === "" ||
        self.allwnctabrow.allowancerate === undefined ||
        self.allwnctabrow.allowancerate === null ||
        self.allwnctabrow.allowancerate === 0
      ) {
        self.makeToast(
          self.$t("allowancerateNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.allwnctabrow.startdate === "" ||
        self.allwnctabrow.startdate === undefined ||
        self.allwnctabrow.startdate === null ||
        self.allwnctabrow.startdate === 0
      ) {
        self.makeToast(
          self.$t("startdateNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.allwnctabrow.enddate === "" ||
        self.allwnctabrow.enddate === undefined ||
        self.allwnctabrow.enddate === null ||
        self.allwnctabrow.enddate === 0
      ) {
        self.makeToast(self.$t("enddateNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.allwnctabrow.detailinfo === "" ||
        self.allwnctabrow.detailinfo === undefined ||
        self.allwnctabrow.detailinfo === null ||
        self.allwnctabrow.detailinfo === 0
      ) {
        self.makeToast(
          self.$t("detailinfoNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      self.allwnctabrow.personname = self.employeelist.filter(function(item) {
        if (item.id === self.allwnctabrow.personid) return item;
      })[0].name;
      self.allwnctabrow.schoolsubjectname = self.allwnctabrow.schoolsubjectid ? self.schoolsubjectlist.filter(
        function(item) {
          if (item.id === self.allwnctabrow.schoolsubjectid) return item;
        }
      )[0].name : '';
      self.AppointDirFondAllwnc.AllwncTables.push(self.allwnctabrow);

      self.allwnctabrow = {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: true,
        isteacher: false,
        personid: 0,
        personname: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        allowancerate: "",
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1
      };
      this.$bvModal.hide('AddModal')
    },
    EditItem(item) {
      if(item.Status === 0){
      item.Status = 2;
      }
      this.editedIndex = this.AppointDirFondAllwnc.AllwncTables.indexOf(item)
      this.allwnctabrow = Object.assign({}, item)
      this.$bvModal.show('AddModal');
            
    },
    EditItem1(item){
      item.Status = 2
    },
    DeleteItem(item) {
      item.Status = 3;
    },

    AddWorkGroupTables() {
      var self = this;

      if (
        self.allworktabrow.membername === "" ||
        self.allworktabrow.membername === undefined ||
        self.allworktabrow.membername === null ||
        self.allworktabrow.membername === 0
      ) {
        self.makeToast(
          self.$t("membernameNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.allworktabrow.postionname === "" ||
        self.allworktabrow.postionname === undefined ||
        self.allworktabrow.postionname === null ||
        self.allworktabrow.postionname === 0
      ) {
        self.makeToast(
          self.$t("postionnameNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.allworktabrow.detailinfo === "" ||
        self.allworktabrow.detailinfo === undefined ||
        self.allworktabrow.detailinfo === null ||
        self.allworktabrow.detailinfo === 0
      ) {
        self.makeToast(
          self.$t("detailinfoNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      self.AppointDirFondAllwnc.WorkGroupTables.push(self.allworktabrow);

      self.allworktabrow = {
        id: 0,
        ownerid: 0,
        membername: "",
        postionname: "",
        isworkgoupheader: false,
        detailinfo: "",
        Status: 1
      };
    },
    check() {
      var self = this;
      if (
        self.AppointDirFondAllwnc.docnumber === 0 ||
        self.AppointDirFondAllwnc.docnumber === null ||
        self.AppointDirFondAllwnc.docnumber === undefined ||
        self.AppointDirFondAllwnc.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointDirFondAllwnc.docdate === 0 ||
        self.AppointDirFondAllwnc.docdate === null ||
        self.AppointDirFondAllwnc.docdate === undefined ||
        self.AppointDirFondAllwnc.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointDirFondAllwnc.schoolyearid === 0 ||
        self.AppointDirFondAllwnc.schoolyearid === null ||
        self.AppointDirFondAllwnc.schoolyearid === undefined ||
        self.AppointDirFondAllwnc.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointDirFondAllwnc.detailinfo === null ||
        self.AppointDirFondAllwnc.detailinfo === undefined ||
        self.AppointDirFondAllwnc.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.AppointDirFondAllwnc.AllwncTables.length === 0) {
        this.makeToast(
          this.$t("AllwncTablesNotFilled"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.AppointDirFondAllwnc.WorkGroupTables.length === 0) {
        this.makeToast(
          this.$t("WorkGroupTablesNotFilled"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      AppointDirFondAllwncService.Update(self.AppointDirFondAllwnc)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "AppointDirFondAllwnc" });
        })
        .catch(error => {
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
        solid: true
      });
    }
  }
  ,
  watch: {
    "AppointDirFondAllwnc.docdate": {
      handler(newValue, oldValue) {
          this.docdatechange();
      }
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