<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">
                {{ $t("AllowanceFarRegion") }}
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
                    v-model="AllowanceFarRegion.docnumber"
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
                        v-model="AllowanceFarRegion.docdate"
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
                    v-model="AllowanceFarRegion.calculationkindid"
                    class="col-sm-10"
                    disabled
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("oblast")
                  }}</label>
                  <v-select
                    disabled
                    :options="OblastList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="AllowanceFarRegion.oblastid"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </CCol>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("region")
                  }}</label>
                  <v-select
                    disabled
                    :options="RegionList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="AllowanceFarRegion.regionid"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </CCol>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("organizationname")
                  }}</label>
                  <div class="d-flex col-sm-9">
                    <CInput
                      class="mb-0 mr-2"
                      style="width: 100%"
                      disabled
                      v-model="AllowanceFarRegion.organizationname"
                    ></CInput>
                    <b-button
                      size="sm"
                      variant="primary"
                      :disabled="AllowanceFarRegion.regionid == 0"
                      @click="OpenOrgModal"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </div>
                </div>
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
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="AllowanceFarRegion.detailinfo"
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
          <template v-slot:modal-title>{{ $t("AllowanceFarRegion") }}</template>
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
          <!-- <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-3" for>{{$t('isappointment')}}</label>
              <b-form-checkbox v-model="tabrow.isappointment" switch class="mt-2 ml-1"></b-form-checkbox>
            </div>
          </b-col>-->

          <b-row></b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("personname")
                }}</label>
                <div class="d-flex col-sm-9">
                  <c-input
                    disabled
                    style="width: 100%"
                    class="mr-2"
                    v-model="tabrow.personname"
                  ></c-input>
                  <b-button
                    @click="OpenPersonModal"
                    variant="primary"
                    style="height: 35px"
                    size="sm"
                  >
                    <span>
                      <b-icon icon="three-dots"></b-icon>
                    </span>
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
                @click="$router.push({ name: 'AllowanceFarRegion' })"
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
          <b-modal
            ref="my-modal"
            size="xl"
            v-model="createModal"
            hide-footer
            hide-header
            no-close-on-backdrop
          >
            <header class="modal-header">
              <h5 class="modal-title">{{ $t("Employee") }}</h5>
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
                :person-type-id="2"
                @success="studentCreated($event)"
              ></edit-person-component>
            </div>
          </b-modal>
        </CRow>
        <b-modal
          id="modalXl"
          no-close-on-backdrop
          size="xl"
          :title="$t('Organization')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <organization-list
            :regionid="AllowanceFarRegion.regionid || 0"
            @SelectedItem="SelectedItem"
            @DblClick="AddPersonData"
            isfarmfy
          ></organization-list>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button class="mr-2" variant="danger" @click="CloseOrgModal">
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPersonData(personvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="modalXlPerson"
          no-close-on-backdrop
          size="xl"
          :title="$t('Person')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            @SelectedItem="SelectedEmployeeItem"
            @DblClick="AddEmployeeData"
          ></person-list>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddEmployeeData(employeevalue)"
              >
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
import AllowanceFarRegionService from "@/services/AllowanceFarRegion.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import PersonService from "@/services/person.service";
import OrganizationList from "@/components/OrganizationList";
import PersonList from "@/components/PersonList";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
export default {
  name: "InfiniteScroll",
  components: { editPersonComponent, OrganizationList, PersonList },
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      AllowanceFarRegion: {},
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
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
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
      OblastList: [],
      organizationlist: [],
      RegionList: [],
      MfyList: [],
      personloading: false,
      innofPerson: "",
      personvalue: {},
      employeevalue: {},
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    CalculationKindService.GetAll().then((res) => {
      this.calculationkindlist = res.data;
    });
    OblastService.GetAll(211).then((res) => {
      this.OblastList = res.data;
    });
    AllowanceFarRegionService.Get(this.$route.params.id).then((res) => {
      this.AllowanceFarRegion = res.data;
      this.itemsMainTable = res.data.Tables;
      /*  this.AllowanceFarRegion.calculationkindid = 10; */
    });
  },
  mounted() {
    // this.AllowanceFarRegion.calculationkindid = 10
  },
  computed: {},
  methods: {
    OpenPersonModal() {
      this.$bvModal.show("modalXlPerson");
    },
    ClosePersonModal() {
      this.$bvModal.hide("modalXlPerson");
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    SelectedEmployeeItem(data) {
      this.employeevalue = data;
    },
    AddEmployeeData(data1) {
      var self = this;
      self.tabrow.personid = data1.id;
      self.tabrow.personname = data1.fullname;
      self.ClosePersonModal();
    },
    AddPersonData(data1) {
      var self = this;
      self.AllowanceFarRegion.organizationid = data1.id;
      self.AllowanceFarRegion.organizationname = data1.fullname;
      self.CloseOrgModal();
    },
    OpenOrgModal() {
      this.$bvModal.show("modalXl");
    },
    CloseOrgModal() {
      this.$bvModal.hide("modalXl");
    },
    studentCreated(data) {
      data;
      this.showModal("createModal", false);
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    AddPerson() {
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
            this.tabrow.personid = res.data.id;
            this.personloading = false;
            this.tabrow.personname = res.data.fullname;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
      } else {
        this.tabrow.personid = null;
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
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.lang,oblastid).then((res) => {
        setregionlist(res.data);
      });
    },
    GetOrganizationList(oblastid, regionid) {
      var self = this;
      if (!!oblastid && !!regionid) {
        OrganizationService.GetAll(oblastid, regionid, true).then((res) => {
          self.organizationlist = res.data;
        });
      } else {
        self.organizationlist = [];
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
      let oblastid = this.AllowanceFarRegion.Tables.filter(
        (el) => el.id === item.id
      )[0].oblastid;
      let regionid = this.AllowanceFarRegion.Tables.filter(
        (el) => el.id === item.id
      )[0].regionid;
      this.GetOrganizationList(oblastid, regionid);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.AllowanceFarRegion.docnumber === 0 ||
        self.AllowanceFarRegion.docnumber === null ||
        self.AllowanceFarRegion.docnumber === undefined ||
        self.AllowanceFarRegion.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceFarRegion.docdate === 0 ||
        self.AllowanceFarRegion.docdate === null ||
        self.AllowanceFarRegion.docdate === undefined ||
        self.AllowanceFarRegion.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceFarRegion.calculationkindid === 0 ||
        self.AllowanceFarRegion.calculationkindid === null ||
        self.AllowanceFarRegion.calculationkindid === undefined ||
        self.AllowanceFarRegion.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.AllowanceFarRegion.oblastid === "" ||
        this.AllowanceFarRegion.oblastid === undefined ||
        this.AllowanceFarRegion.oblastid === null ||
        this.AllowanceFarRegion.oblastid === 0
      ) {
        this.makeToast(
          this.$t("oblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        this.AllowanceFarRegion.regionid === "" ||
        this.AllowanceFarRegion.regionid === undefined ||
        this.AllowanceFarRegion.regionid === null ||
        this.AllowanceFarRegion.regionid === 0
      ) {
        this.makeToast(
          this.$t("regionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceFarRegion.detailinfo === null ||
        self.AllowanceFarRegion.detailinfo === undefined ||
        self.AllowanceFarRegion.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceFarRegion.Tables.filter((item) => item.Status !== 3)
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
      this.AllowanceFarRegion.docdate;
      /* this.CheckItemDelete(); */
      this.AllowanceFarRegion.Tables = this.itemsMainTable;
      AllowanceFarRegionService.Update(this.AllowanceFarRegion)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "AllowanceFarRegion",
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
  watch: {
    "AllowanceFarRegion.oblastid": {
      handler(newValue, oldValue) {
        var self = this;
        if (newValue) {
          if (oldValue) {
            self.AllowanceFarRegion.regionid = null;
            self.RegionList = [];
          }

          self.getregionlist(newValue, function (data) {
            self.RegionList = data;
          });
        }
      },
    },
    "AllowanceFarRegion.regionid": {
      handler(newValue, oldValue) {
        var self = this;
        if (newValue) {
          if (oldValue) {
            self.AllowanceFarRegion.organizationid = null;
            self.organizationlist = [];
          }

          self.GetOrganizationList(self.tabrow.oblastid, newValue);
        }
      },
    },
  },
};
</script>

<style>
</style>