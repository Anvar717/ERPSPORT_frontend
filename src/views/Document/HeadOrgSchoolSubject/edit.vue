<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("HeadOrgSchoolSubject") }}</h4>
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
                    v-model="HeadOrgSchoolSubject.docnumber"
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
                        v-model="HeadOrgSchoolSubject.docdate"
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
                    <label class="col-form-label col-sm-3" for>{{
                      $t("schoolyear")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="SchoolYear"
                      v-model="HeadOrgSchoolSubject.schoolyearid"
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
                    v-model="HeadOrgSchoolSubject.detailinfo"
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
            $t("HeadOrgSchoolSubject")
          }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("IsAppointment")
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
                  $t("OrgSchoolGrade")
                }}</label>
                <v-select
                  :options="SchoolSubjectList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="col-sm-9"
                  v-model="tabrow.schoolsubjectid"
                  @input="ChangeSchoolSubject"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <CInput
                horizontal
                class="mb-0"
                :label="$t('detailinfo')"
                v-model="tabrow.detailinfo"
              ></CInput>
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
            <c-button
              size="sm"
              color="primary"
              @click="$bvModal.show('AddModal')"
            >
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="HeadOrgSchoolSubjectTables"
              :items="HeadOrgSchoolSubject.Tables"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template #cell(actions)="{item}">
                <div class="text-center">
                  <b-link
                    @click="EditItem(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
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
                @click="$router.push({ name: 'HeadOrgSchoolSubject' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HeadOrgSchoolSubject.CanSave"
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
import HeadOrgSchoolSubjectService from "@/services/HeadOrgSchoolSubject.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import EmployeeListComponent from "@/components/EmployeeList";
export default {
  components: { EmployeeListComponent },
  data() {
    return {
      SaveLoading: false,
      HeadOrgSchoolSubject: {},
      selectedrowid: 0,
      SchoolYear: [],
      SchoolSubjectList: [],
      SchoolGradeList: [],
      HeadOrgSchoolSubjectTables: [
        { key: "schoolgradename", label: this.$t("schoolgrade") },
        { key: "schoolsubjectname", label: this.$t("schoolsubject") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") },
      ],
      filter: {
        forCurriculum: false,
        schoolyearid: 0,
        orgschoolgradeid: 0,
        lang: "",
        schoolGradeGroupId: 0,
      },
      tabrow: {
        id: 0,
        ownerid: 0,
        schoolgradeid: 0,
        schoolgradename: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        detailinfo: "",
        Status: 1,
      },
      isappointmentlist: [
        { id: 1, name: "Тайинлов/Назначение" },
        { id: 2, name: "Озод этиш/Отстранение" },
      ],
      toastCount: 0,
      allSignupErrors: {},
      editedIndex: -1,
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    SchoolYearService.GetAll().then((res) => {
      self.SchoolYear = res.data;
    });
    SchoolSubjectService.GetAll(
      this.filter.lang,
      this.filter.forCurriculum,
      this.filter.schoolyearid,
      this.filter.orgschoolgradeid
    ).then((res) => {
      self.SchoolSubjectList = res.data;
    });
    SchoolGradeService.GetAll(
      this.filter.lang,
      this.filter.schoolGradeGroupId
    ).then((res) => {
      self.SchoolGradeList = res.data;
    });

    HeadOrgSchoolSubjectService.Get(self.selectedrowid).then((res) => {
      self.HeadOrgSchoolSubject = res.data;
    });
  },
  methods: {
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl");
    },
    AddPerson(data) {
      this.CloseEmployeeModal();
      this.tabrow.personid = data.personid;
      this.tabrow.personname = data.personname;
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
        self.tabrow.schoolsubjectid === "" ||
        self.tabrow.schoolsubjectid === undefined ||
        self.tabrow.schoolsubjectid === null ||
        self.tabrow.schoolsubjectid === 0
      ) {
        self.makeToast(
          self.$t("isappointmentNotCorrect"),
          self.$t("Error"),
          "danger"
        );
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
      self.HeadOrgSchoolSubject.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        schoolgradeid: 0,
        schoolgradename: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        detailinfo: "",
        Status: 1,
      };
      self.$bvModal.hide("AddModal");
    },
    ChangeSchoolGrade() {
      this.tabrow.schoolgradename = this.SchoolGradeList.filter(
        (item) => item.id === this.tabrow.schoolgradeid
      )[0].name;
    },
    ChangeSchoolSubject() {
      this.tabrow.schoolsubjectname = this.SchoolSubjectList.filter(
        (item) => item.id === this.tabrow.schoolsubjectid
      )[0].name;
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
      item.Status = 2;
      this.editedIndex = this.HeadOrgSchoolSubject.Tables.indexOf(item);
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
          this.HeadOrgSchoolSubject.Tables[this.editedIndex],
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
          schoolgradeid: 0,
          schoolgradename: "",
          schoolsubjectid: 0,
          schoolsubjectname: "",
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    check() {
      var self = this;
      if (
        self.HeadOrgSchoolSubject.docnumber === 0 ||
        self.HeadOrgSchoolSubject.docnumber === null ||
        self.HeadOrgSchoolSubject.docnumber === undefined ||
        self.HeadOrgSchoolSubject.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolSubject.docdate === 0 ||
        self.HeadOrgSchoolSubject.docdate === null ||
        self.HeadOrgSchoolSubject.docdate === undefined ||
        self.HeadOrgSchoolSubject.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolSubject.schoolyearid === 0 ||
        self.HeadOrgSchoolSubject.schoolyearid === null ||
        self.HeadOrgSchoolSubject.schoolyearid === undefined ||
        self.HeadOrgSchoolSubject.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HeadOrgSchoolSubject.detailinfo === null ||
        self.HeadOrgSchoolSubject.detailinfo === undefined ||
        self.HeadOrgSchoolSubject.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HeadOrgSchoolSubject.Tables.length === 0) {
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
      HeadOrgSchoolSubjectService.Update(self.HeadOrgSchoolSubject)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HeadOrgSchoolSubject" });
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
  watch: {
    // "HeadOrgSchoolSubject.docdate": {
    //   handler(newValue, oldValue) {
    //     this.docdatechange();
    //   },
    // },
    /* "TeacherHour.personid": {
      handler(newValue, oldValue) {
          this.employeechange();
      }
    }, */
  },
};
</script>

<style></style>
