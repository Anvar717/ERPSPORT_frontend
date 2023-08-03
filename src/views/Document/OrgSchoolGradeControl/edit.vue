<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("OrgSchoolGradeControl") }}</h4>
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
                    disabled
                    :label="$t('docnumber')"
                    v-model="OrgSchoolGradeControl.docnumber"
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
                        v-model="OrgSchoolGradeControl.docdate"
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
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("schoolyear")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="SchoolYear"
                      disabled
                      v-model="OrgSchoolGradeControl.schoolyearid"
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
                <ValidationProvider v-slot="v" name="oblast" rules="required">
                  <label for>{{ $t("oblast") }}</label>
                  <v-select
                    :options="OblastList"
                    disabled
                    v-model="OrgSchoolGradeControl.oblastid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChooseRegion"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="region" rules="required">
                  <label for
                    >{{ $t("region") }}
                    <b-spinner v-if="RegionLoading" small></b-spinner
                  ></label>
                  <v-select
                  disabled
                    :options="RegionList"
                    v-model="OrgSchoolGradeControl.regionid"
                    :reduce="(item) => item.id"
                    @input="ChooseOrganization"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="region" rules="required">
                  <label for
                    >{{ $t("Organization") }}
                    <b-spinner v-if="OrganizationLoading" small></b-spinner
                  ></label>
                  <v-select
                    :options="OrganizationList"
                    v-model="OrgSchoolGradeControl.organizationid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{
            $t("OrgSchoolGradeControl")
          }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("schoolgrade")
                }}</label>
                <v-select
                  :options="SchoolGradeList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  class="col-sm-9"
                  label="name"
                  v-model="tabrow.schoolgradeid"
                  @input="ChangeSchoolGrade"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("schoolgradeletter")
                }}</label>
                <v-select
                  :options="schoolgradeletterlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="col-sm-9"
                  @input="changeschoolgradeletters"
                  v-model="tabrow.schoolgradeletterid"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="AddItem">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button v-if="OrgSchoolGradeControl.CanSave" size="sm" color="primary" @click="OpenModal">
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="Fields"
              :items="OrgSchoolGradeControl.Tables"
              class="bg-color-table text-center mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(isappointment)="{ item }">
                <p class="m-0">
                  {{
                    item.isappointmentid === 1
                      ? "Тайинлов/Назначение"
                      : "Озод этиш/Отстранение"
                  }}
                </p>
              </template>

              <!-- <template #cell(personname)="{item}">
                {{employeelist.filter(i => i.id === item.personid)[0].name }}
              </template> -->
              <template v-slot:cell(istemporarily)="{ item }">
                <p class="m-0">
                  {{ item.istemporarily === true ? $t("yes") : $t("no") }}
                </p>
              </template>

              <template #cell(actions)="{ item }">
                <div class="text-center">
                  <b-link
                  v-if="OrgSchoolGradeControl.CanSave"
                    @click="EditItem(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                  v-if="OrgSchoolGradeControl.CanSave"
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
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'OrgSchoolGradeControl' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="OrgSchoolGradeControl.CanSave"
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolGradeControlService from "@/services/OrgSchoolGradeControl.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  components: { EmployeeListComponent },
  data() {
    return {
      SaveLoading: false,
      OrgSchoolGradeControl: {},
      OrganizationLoading: false,
      RegionLoading: false,
      RegionList: [],
      OblastList: [],
      selectedrowid: 0,
      SchoolYear: [],
      SchoolGradeList: [],
      schoolgradeletterlist: [],
      OrganizationList: [],
      employeelist: [],
      lang: "",
      Fields: [
        { key: "schoolgradename", label: this.$t("schoolgrade") },
        { key: "schoolgradelettername", label: this.$t("schoolgradeletter") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        schoolgradeid: 0,
        schoolgradename: "",
        schoolgradeletterid: 0,
        schoolgradelettername: "",
        Status: 1,
      },
      editedIndex: -1,
      isDisabled: false,
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    SchoolGradeService.GetAll(this.lang, 0).then((res) => {
      self.SchoolGradeList = res.data;
    });
    OrgSchoolGradeControlService.Get(self.selectedrowid).then((res) => {
      self.OrgSchoolGradeControl = res.data;
      SchoolYearService.GetAll().then((res) => {
      self.SchoolYear = res.data;
    });
      self.ChooseRegion();
      self.ChooseOrganization();
    });
    SchoolGradeLetterService.GetAll().then((res) => {
      self.schoolgradeletterlist = res.data;
    });
    OblastService.GetAll().then((res) => {
      self.OblastList = res.data;
    });
  },
  methods: {
    ChangeSchoolGrade() {
      this.tabrow.schoolgradename = this.SchoolGradeList.filter(
        (item) => this.tabrow.schoolgradeid === item.id
      )[0].name;
    },
    changeschoolgradeletters() {
      this.tabrow.schoolgradelettername = this.schoolgradeletterlist.filter(
        (item) => this.tabrow.schoolgradeid === item.id
      )[0].name;
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
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    Add() {
      var self = this;
      self.tabrow;
      if (
        self.tabrow.schoolgradeid === "" ||
        self.tabrow.schoolgradeid === undefined ||
        self.tabrow.schoolgradeid === null ||
        self.tabrow.schoolgradeid === 0
      ) {
        self.makeToast(
          self.$t("orgschoolgradeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.schoolgradeletterid === "" ||
        self.tabrow.schoolgradeletterid === undefined ||
        self.tabrow.schoolgradeletterid === null ||
        self.tabrow.schoolgradeletterid === 0
      ) {
        self.makeToast(
          self.$t("schoolgradeletterNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // self.tabrow.schoolgradelettername = self.schoolgradeletterlist.filter(function(
      //   item
      // ) {
      //   if (item.id === self.tabrow.schoolgradeletterid) return item;
      // })[0].name;

      self.OrgSchoolGradeControl.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        isappointmentid: 0,
        isappointment: true,
        schoolgradeid: 0,
        schoolgradename: "",
        personid: 0,
        personname: "",
        istemporarily: false,
        startdate: 0,
        enddate: 0,
        Status: 1,
      };
      self.isDisabled = true;
      self.$bvModal.hide("AddModal");
    },
    OpenModal() {
      var self = this;
      if (!self.checkData()) {
        return false;
      }
      self.$bvModal.show("AddModal");
    },

    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.OrgSchoolGradeControl.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.OrgSchoolGradeControl.Tables[this.editedIndex],
          this.tabrow
        );
        this.Close();
      } else {
        this.Add();
      }
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          isappointmentid: 0,
          isappointment: true,
          schoolgradeid: 0,
          schoolgradename: "",
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
    ChooseRegion() {
      var vm = this;
      vm.RegionLoading = true;
      if (!!vm.OrgSchoolGradeControl.oblastid) {
        RegionService.GetAll("ru", vm.OrgSchoolGradeControl.oblastid).then(
          (res) => {
            vm.RegionList = res.data;
            vm.RegionLoading = false;
          }
        );
      } else {
        vm.OrgSchoolGradeControl.regionid = "";
        vm.RegionLoading = false;
      }
    },
    ChooseOrganization() {
      var vm = this;
      vm.OrganizationLoading = true;
      if (!!vm.OrgSchoolGradeControl.regionid) {
        OrganizationService.GetAll(
          vm.OrgSchoolGradeControl.oblastid,
          vm.OrgSchoolGradeControl.regionid
        ).then((res) => {
          vm.OrganizationList = res.data;
          vm.OrganizationLoading = false;
        });
      } else {
        vm.OrgSchoolGradeControl.organizationid = "";
        vm.OrganizationLoading = false;
      }
    },
    check() {
      var self = this;
      if (
        self.OrgSchoolGradeControl.docnumber === 0 ||
        self.OrgSchoolGradeControl.docnumber === null ||
        self.OrgSchoolGradeControl.docnumber === undefined ||
        self.OrgSchoolGradeControl.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGradeControl.docdate === 0 ||
        self.OrgSchoolGradeControl.docdate === null ||
        self.OrgSchoolGradeControl.docdate === undefined ||
        self.OrgSchoolGradeControl.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGradeControl.schoolyearid === 0 ||
        self.OrgSchoolGradeControl.schoolyearid === null ||
        self.OrgSchoolGradeControl.schoolyearid === undefined ||
        self.OrgSchoolGradeControl.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.OrgSchoolGradeControl.detailinfo === null ||
      //   self.OrgSchoolGradeControl.detailinfo === undefined ||
      //   self.OrgSchoolGradeControl.detailinfo === ""
      // ) {
      //   this.makeToast(
      //     this.$t("detailinfoNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (self.OrgSchoolGradeControl.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    checkData() {
      var self = this;
      if (
        self.OrgSchoolGradeControl.docnumber === 0 ||
        self.OrgSchoolGradeControl.docnumber === null ||
        self.OrgSchoolGradeControl.docnumber === undefined ||
        self.OrgSchoolGradeControl.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGradeControl.docdate === 0 ||
        self.OrgSchoolGradeControl.docdate === null ||
        self.OrgSchoolGradeControl.docdate === undefined ||
        self.OrgSchoolGradeControl.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGradeControl.schoolyearid === 0 ||
        self.OrgSchoolGradeControl.schoolyearid === null ||
        self.OrgSchoolGradeControl.schoolyearid === undefined ||
        self.OrgSchoolGradeControl.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGradeControl.organizationid === 0 ||
        self.OrgSchoolGradeControl.organizationid === null ||
        self.OrgSchoolGradeControl.organizationid === undefined ||
        self.OrgSchoolGradeControl.organizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.OrgSchoolGradeControl.detailinfo === null ||
      //   self.OrgSchoolGradeControl.detailinfo === undefined ||
      //   self.OrgSchoolGradeControl.detailinfo === ""
      // ) {
      //   this.makeToast(
      //     this.$t("detailinfoNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      OrgSchoolGradeControlService.Update(self.OrgSchoolGradeControl)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "OrgSchoolGradeControl" });
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





