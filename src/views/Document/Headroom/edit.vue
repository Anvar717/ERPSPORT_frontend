<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('Headroom')}}</h4>
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
                    v-model="Headroom.docnumber"
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
                        v-model="Headroom.docdate"
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
                      class="col-sm-9"
                      :options="SchoolYear"
                      v-model="Headroom.schoolyearid"
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
                    v-model="Headroom.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
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
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="$bvModal.show('AddModal')">
              <b-icon icon="plus"></b-icon>
              {{$t('Add')}}
            </c-button>
          </c-col>
        </c-row>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('Headroom')}}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('IsAppointment')}}</label>
                <v-select
                  :options="isappointmentlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  class="col-sm-9"
                  label="name"
                  v-model="tabrow.isappointmentid"
                  @change="IsAppoinmentCheckTables"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('Room')}}</label>
                <v-select
                  :options="roomlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.roomid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-modal id="modalXl" size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal">
            <employee-list-component :ondate="Headroom.docdate" @SelectedItem="SelectedItem" @DblClick="Enterdata">

              </employee-list-component>
              <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
              <!-- <edit-person-component></edit-person-component> -->

              <c-row class="mt-2">
                  <c-col class="text-center">
                      <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                          {{$t('back')}}
                      </b-button>
                      <b-button variant="primary" @click="AddPerson">
                          {{$t('Add')}}
                      </b-button>
                  </c-col>
              </c-row>
          </b-modal>
          <!-- <vs-popup fullscreen :title="$t('EmployeeList')" :active.sync="EmployeeModal">
              <employee-list-component :ondate="Headroom.docdate" @SelectedItem="SelectedItem">

              </employee-list-component>

              <c-row class="mt-2">
                  <c-col class="text-center">
                      <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                          {{$t('back')}}
                      </b-button>
                      <b-button variant="primary" @click="AddPerson">
                          {{$t('Add')}}
                      </b-button>
                  </c-col>
              </c-row>
          </vs-popup> -->
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('Employee')}}</label>
                <div class="d-flex col-sm-9">
                  <CInput  class="mb-0 mr-2" style="width:100%" disabled v-model="tabrow.personname"></CInput>
                  <b-button size="sm" variant="primary" @click="OpenEmployeeModal">
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
                <!-- <v-select
                  :options="employeelist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.personid"
                  class="col-sm-9"
                ></v-select> -->
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('IsTemporarily')}}</label>
                <b-form-checkbox class="mb-0 ml-2" size="lg" v-model="tabrow.istemporarily"></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('startdate')}}</label>
                <date-picker
                  v-model="tabrow.startdate"
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
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('enddate')}}</label>
                <date-picker
                  v-if="tabrow.istemporarily"
                  v-model="tabrow.enddate"
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
              <CInput horizontal :label="$t('detailinfo')" class="mb-0" v-model="tabrow.detailinfo"></CInput>
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
              :fields="HeadroomTables"
              :items="Headroom.Tables"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template
                v-slot:cell(isappointment)="{item}"
              >{{isappointmentlist.filter(el => el.id === item.isappointmentid)[0].name}}</template>

              <template v-slot:cell(personname)="{item}">{{item.personname}}</template>
              <template
                v-slot:cell(istemporarily)="{item}"
              >{{item.istemporarily ? $t('yes') : $t('no')}}</template>
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
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'Headroom'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="Headroom.CanSave"
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
import HeadroomService from "@/services/Headroom.service";
import RoomService from "@/services/Room.service";
import EmployeeListComponent from '@/components/EmployeeList'
export default {
  components : {EmployeeListComponent},
  data() {
    return {
      value1: '',
      EmployeeModal : false,
      SaveLoading: false,
      Headroom: {},
      selectedrowid: 0,
      editedIndex: -1,
      SchoolYear: [],
      roomlist: [],
      lang: "",

      HeadroomTables: [
        { key: "isappointment", label: this.$t("IsAppointment") },
        { key: "room", label: this.$t("Room") },
        { key: "personname", label: this.$t("Employee") },
        { key: "istemporarily", label: this.$t("IsTemporarily") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") },
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: true,
        roomid: 0,
        room: "",
        personid: 0,
        personname: "",
        istemporarily: false,
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1,
      },
      isappointmentlist: [
        { id: 1, name: "Тайинлов/Назначение" },
        { id: 2, name: "Озод этиш/Отстранение" },
      ],
      toastCount: 0,
      allSignupErrors: {},
      personvalue : {}
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    SchoolYearService.GetAll().then((res) => {
      self.SchoolYear = res.data;
    });
    RoomService.GetAll().then((res) => {
      self.roomlist = res.data;
    });
    HeadroomService.Get(self.selectedrowid).then((res) => {
      self.Headroom = res.data;
      isappointmentlist: [
        { id: 1, name: "Тайинлов/Назначение" },
        { id: 2, name: "Озод этиш/Отстранение" },
      ];
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    AddPerson(){
      this.CloseEmployeeModal()
      this.tabrow.personid = this.personvalue.personid
      this.tabrow.personname = this.personvalue.personname
    },
    Enterdata(data){
      this.tabrow.personid = data.personid
      this.tabrow.personname = data.personname
      this.CloseEmployeeModal()
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

    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          isappointmentid: 0,
          isappointment: true,
          roomid: 0,
          room: "",
          personid: 0,
          personname: "",
          istemporarily: false,
          startdate: 0,
          enddate: 0,
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    Add() {
      var self = this;
      self.tabrow;
      if (
        self.tabrow.startdate === "" ||
        self.tabrow.startdate === undefined ||
        self.tabrow.startdate === null ||
        self.tabrow.startdate === 0
      ) {
        self.makeToast(
          self.$t("startdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.tabrow.istemporarily) {
        if (
          self.tabrow.enddate === "" ||
          self.tabrow.enddate === undefined ||
          self.tabrow.enddate === null ||
          self.tabrow.enddate === 0
        ) {
          self.makeToast(
            self.$t("endtimeNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      } else {
        self.tabrow.enddate = "";
      }
      if (
        self.tabrow.personid === "" ||
        self.tabrow.personid === undefined ||
        self.tabrow.personid === null ||
        self.tabrow.personid === 0
      ) {
        self.makeToast(
          self.$t("employeeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.roomid === "" ||
        self.tabrow.roomid === undefined ||
        self.tabrow.roomid === null ||
        self.tabrow.roomid === 0
      ) {
        self.makeToast(self.$t("roomNotCorrect"), self.$t("Error"), "danger");
        return false;
      }

      if (
        self.tabrow.isappointmentid === "" ||
        self.tabrow.isappointmentid === undefined ||
        self.tabrow.isappointmentid === null ||
        self.tabrow.isappointmentid === 0
      ) {
        self.makeToast(
          self.$t("isappointmentNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      var dubl = false;
      self.Headroom.Tables.forEach(function (item) {
        if (
          item.Status !== 3 &&
          self.Headroom.Tables.indexOf(item) !== self.editedIndex
        ) {
          if (
            item.roomid === self.tabrow.roomid &&
            item.isappointmentid === self.tabrow.isappointmentid
          )
            dubl = true;
        }
      });
      if (dubl) {
        this.makeToast(this.$t("dublClass"), this.$t("Error"), "danger");
        return false;
      }

      if (
        self.tabrow.detailinfo === "" ||
        self.tabrow.detailinfo === undefined ||
        self.tabrow.detailinfo === null ||
        self.tabrow.detailinfo === 0
      ) {
        self.makeToast(
          self.$t("detailinfoNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      self.tabrow.room = self.roomlist.filter(function (item) {
        if (item.id === self.tabrow.roomid) return item;
      })[0].name;

      if (this.editedIndex > -1) {
        Object.assign(this.Headroom.Tables[this.editedIndex], this.tabrow);
      } else {
        self.Headroom.Tables.push(self.tabrow);
      }

      self.tabrow = {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: true,
        roomid: 0,
        room: "",
        personid: 0,
        personname: "",
        istemporarily: false,
        startdate: 0,
        enddate: 0,
        detailinfo: "",
        Status: 1,
      };
      this.$bvModal.hide("AddModal");
    },
    IsAppoinmentCheckTables() {
      var self = this;
      if (self.tabrow.isappointmentid == 1) {
        self.tabrow.isappointment = true;
      } else {
        self.tabrow.isappointment = false;
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
      this.editedIndex = this.Headroom.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.Headroom.docnumber === 0 ||
        self.Headroom.docnumber === null ||
        self.Headroom.docnumber === undefined ||
        self.Headroom.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Headroom.docdate === 0 ||
        self.Headroom.docdate === null ||
        self.Headroom.docdate === undefined ||
        self.Headroom.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Headroom.schoolyearid === 0 ||
        self.Headroom.schoolyearid === null ||
        self.Headroom.schoolyearid === undefined ||
        self.Headroom.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Headroom.detailinfo === null ||
        self.Headroom.detailinfo === undefined ||
        self.Headroom.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.Headroom.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      HeadroomService.Update(self.Headroom)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Headroom" });
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
};
</script>

<style>


  
</style>





