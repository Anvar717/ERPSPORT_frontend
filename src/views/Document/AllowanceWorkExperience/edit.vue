<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">
                {{ $t("AllowanceWorkExperience") }}
              </h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="docnumber">
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="AllowanceWorkExperience.docnumber"
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
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("docdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="AllowanceWorkExperience.docdate"
                        style="width: 100%"
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
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-2">{{
                    $t("calculationkind")
                  }}</label>
                  <v-select
                    :options="calculationkindlist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="AllowanceWorkExperience.calculationkindid"
                    class="col-sm-10"
                    disabled
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow> </CRow>
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
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="AllowanceWorkExperience.detailinfo"
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
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{
            $t("AllowanceWorkExperience")
          }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("isappointment")
                }}</label>
                <v-select
                  :options="isappointmentlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.isappointmentid"
                  @change="IsAppoinmentCheckTables"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>

          <b-row></b-row>

          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("Employee")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    disabled
                    v-model="tabrow.personname"
                  ></CInput>
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="OpenEmployeeModal"
                  >
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row v-if="tabrow.isappointmentid === 1">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("allowancerate")
                }}</label>
                <custom-number-input
                  class="mb-0"
                  size="lg"
                  v-model="tabrow.allowancerate"
                ></custom-number-input>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("startdate")
                }}</label>
                <date-picker
                  v-model="tabrow.startdate"
                  style="width: 100%"
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
          <b-row v-if="tabrow.isappointmentid === 1">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("enddate")
                }}</label>
                <date-picker
                  v-model="tabrow.enddate"
                  style="width: 100%"
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
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="Add">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="AddRow">
              <b-icon icon="plus"></b-icon>
              {{ $t("Add") }}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="fieldsMainTable"
              :items="itemsMainTable"
              class="bg-color-table text-center mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template #cell(actions)="{ item }">
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
                @click="$router.push({ name: 'AllowanceWorkExperience' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
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
        <b-modal
          id="modalXl"
          size="xl"
          :title="$t('Employee')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <employee-list-component
            :ondate="AllowanceWorkExperience.docdate"
            @SelectedItem="SelectedItem"
            @DblClick="AddPersonData"
          >
          </employee-list-component>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEmployeeModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPersonData(personvalue)">
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
import CalculationKindService from "@/services/CalculationKind.service";
import AllowanceWorkExperienceService from "@/services/AllowanceWorkExperience.service";

import OrganizationService from "@/services/organization.service";
import PersonService from "@/services/person.service";
import EmployeeListComponent from "@/components/EmployeeList";
export default {
  name: "InfiniteScroll",
  components: { EmployeeListComponent },
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      AllowanceWorkExperience: {},
      editedIndex: -1,
      lang: "",
      fieldsMainTable: [
        {
          key: "isappointmentname",
          label: this.$t("isappointmentname"),
        },

        {
          key: "personname",
          label: this.$t("personname"),
        },
        {
          key: "allowancerate",
          label: this.$t("allowancerate"),
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
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      itemsMainTable: [],
      tabrow: {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: false,
        isappointmentname: "",
        personname: "",
        allowancerate: 0,
        startdate: "",
        enddate: "",
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
      calculationkindlist: [],

      personloading: false,
      innofPerson: "",
      personvalue: {},
      employeevalue: {},
    };
  },
  created() {
    CalculationKindService.GetAll().then((res) => {
      this.calculationkindlist = res.data;
    });

    AllowanceWorkExperienceService.Get(this.$route.params.id).then((res) => {
      this.AllowanceWorkExperience = res.data;
      this.itemsMainTable = res.data.Tables;
    });
  },
  mounted() {
    // this.AllowanceWorkExperience.calculationkindid = 10
  },
  computed: {},
  methods: {
    OpenEmployeeModal() {
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      this.$bvModal.hide("modalXl");
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    SelectedEmployeeItem(data) {
      this.employeevalue = data;
    },
    AddPersonData(data1) {
      var self = this;
      self.tabrow.personid = data1.personid;
      self.tabrow.personname = data1.personname;
      self.CloseEmployeeModal();
    },

    showModal(modal, value) {
      this.$data[modal] = value;
    },

    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },

    IsAppoinmentCheckTables() {
      if (this.tabrow.isappointmentid == 1) {
        this.tabrow.isappointment = true;
      } else {
        this.tabrow.isappointment = false;
      }
    },
    AddRow() {
      var self = this;
      self.tabrow = {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: false,
        isappointmentname: "",
        personid: 0,
        personname: "",
        allowancerate: 0,
        startdate: "",
        enddate: "",
      };
      self.$bvModal.show("AddModal");
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
        (this.tabrow = {
          id: 0,
          ownerid: 0,
          isappointmentid: 0,
          isappointment: false,
          isappointmentname: "",
          personid: 0,
          personname: "",
          allowancerate: 0,
          startdate: "",
          enddate: "",
        }),
          (this.editedIndex = -1);
      });
    },
    Add() {
      if (
        this.tabrow.isappointmentid === "" ||
        this.tabrow.isappointmentid === undefined ||
        this.tabrow.isappointmentid === null ||
        this.tabrow.isappointmentid === 0
      ) {
        this.makeToast(
          this.$t("isappointmentNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        this.tabrow.startdate === "" ||
        this.tabrow.startdate === undefined ||
        this.tabrow.startdate === null ||
        this.tabrow.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.tabrow.isappointmentid === 1) {
        if (
          this.tabrow.allowancerate === "" ||
          this.tabrow.allowancerate === undefined ||
          this.tabrow.allowancerate === null ||
          this.tabrow.allowancerate === 0
        ) {
          this.makeToast(
            this.$t("allowancerateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          this.tabrow.enddate === "" ||
          this.tabrow.enddate === undefined ||
          this.tabrow.enddate === null ||
          this.tabrow.enddate === 0
        ) {
          this.makeToast(
            this.$t("enddateNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      } else {
        this.tabrow.allowancerate = 0;
      }

      if (this.editedIndex > -1) {
        this.tabrow.personname = this.tabrow.personid
          ? this.personlist.filter(
              (item) => item.id === this.tabrow.personid
            )[0].name
          : "";
        Object.assign(this.itemsMainTable[this.editedIndex], this.tabrow);
      } else {
        this.itemsMainTable.push({
          id: this.tabrow.id,
          ownerid: this.tabrow.ownerid,
          isappointmentid: this.tabrow.isappointmentid,
          isappointment: this.tabrow.isappointment,
          isappointmentname: this.isappointmentlist.filter(
            (item) => item.id === this.tabrow.isappointmentid
          )[0].name,
          personid: this.tabrow.personid,
          personname: this.tabrow.personname,
          allowancerate: this.tabrow.allowancerate,
          startdate: this.tabrow.startdate,
          enddate: this.tabrow.enddate,
          Status: 1,
        });
      }

      (this.tabrow = {
        id: 0,
        ownerid: 0,
        isappointmentid: null,
        isappointment: false,
        isappointmentname: "",
        personid: 0,
        personname: 0,
        allowancerate: 0,
        startdate: "",
        enddate: "",
      }),
        this.$bvModal.hide("AddModal");
    },
    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.itemsMainTable.indexOf(item);

      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.AllowanceWorkExperience.docnumber === 0 ||
        self.AllowanceWorkExperience.docnumber === null ||
        self.AllowanceWorkExperience.docnumber === undefined ||
        self.AllowanceWorkExperience.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceWorkExperience.docdate === 0 ||
        self.AllowanceWorkExperience.docdate === null ||
        self.AllowanceWorkExperience.docdate === undefined ||
        self.AllowanceWorkExperience.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceWorkExperience.calculationkindid === 0 ||
        self.AllowanceWorkExperience.calculationkindid === null ||
        self.AllowanceWorkExperience.calculationkindid === undefined ||
        self.AllowanceWorkExperience.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.AllowanceWorkExperience.detailinfo === null ||
        self.AllowanceWorkExperience.detailinfo === undefined ||
        self.AllowanceWorkExperience.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceWorkExperience.Tables.filter((item) => item.Status !== 3)
          .length === 0
      ) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.AllowanceWorkExperience.docdate;
      /* this.CheckItemDelete(); */
      this.AllowanceWorkExperience.Tables = this.itemsMainTable;
      AllowanceWorkExperienceService.Update(this.AllowanceWorkExperience)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "AllowanceWorkExperience",
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
    /* CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          (this.itemsMainTable[i].Status == 3 &&
            this.itemsMainTable[i].personid == "") ||
          this.itemsMainTable[i].schoolsubjectid == ""
        ) {
          this.itemsMainTable.splice(i, 1);
        }
      }
    } */
  },
  watch: {},
};
</script>

<style>
</style>