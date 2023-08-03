<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-left">{{ $t("AllowedTeachingSubject") }}</h4>
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
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="AllowedTeachingSubject.docnumber"
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
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <label for="datepicker-dateformat2">{{
                    $t("docdate")
                  }}</label>
                  <date-picker
                    v-model="AllowedTeachingSubject.docdate"
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
                </ValidationProvider>
              </CCol>

              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="schoolsubject"
                  rules="required"
                >
                  <label for>{{ $t("highereduclassifier") }}</label>
                  <v-select
                    :options="highereduclassifierlist"
                    v-model="AllowedTeachingSubject.highereduclassifierid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="fullname"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
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
                    :label="$t('detailinfo')"
                    v-model="AllowedTeachingSubject.detailinfo"
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
              <CCol> </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow class="mb-4">
          <CCol class="text-right">
            <CButton size="sm" color="primary" @click="OpenModal" class="mr-3">
              <b-icon icon="plus"> </b-icon>
              {{ $t("Add") }}
            </CButton>
          </CCol>
        </CRow>
        <CRow class="mx-2 mb-3">
          <CCol>
            <vs-table
              :data="AllowedTeachingSubject.Tables"
              style="border:1px solid #eee"
              :noDataText="$t('NoItems')"
            >
              <template slot="thead">
                <vs-th
                  v-for="(th, indexth) in fields"
                  :key="indexth"
                  style="backgroundColor : #eee"
                  >{{ th.label }}</vs-th
                >
              </template>

              <template slot-scope="{ data }">
                <vs-tr
                  :key="indextr"
                  v-for="(tr, indextr) in data"
                  v-show="tr.Status != 3"
                >
                  <vs-td :data="tr.qualschoolsubjectname">
                    {{ tr.qualschoolsubjectname }}
                  </vs-td>
                  <vs-td :data="tr.isallschoolgrade">
                    {{ tr.isallschoolgrade ? $t("yes") : $t("no") }}
                  </vs-td>
                  <vs-td
                    v-if="!tabrow.isallschoolgrade == true"
                    :data="tr.schoolgradegroupname"
                  >
                    {{ tr.schoolgradegroupname }}
                  </vs-td>
                  <vs-td
                    v-if="!tabrow.isallschoolgrade == true"
                    :data="tr.schoolgradename"
                  >
                    {{ tr.schoolgradename }}
                  </vs-td>
                  <vs-td :data="tr.schoolsubjectname">
                    {{ tr.schoolsubjectname }}
                  </vs-td>
                  <vs-td :data="tr.actions">
                    <div class="text-left">
                      <b-link
                        @click="EditItem(tr, indextr)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Edit') }"
                      >
                        <b-icon icon="pencil"></b-icon>
                      </b-link>
                      <b-link
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Delete') }"
                        @click="DeleteItem(tr, indextr)"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-link>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <b-modal
              v-model="tableModal"
              size="lg"
              hide-footer
              no-close-on-backdrop
            >
              <CRow>
                <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4" for>{{
                      $t("qualschoolsubject")
                    }}</label>
                    <div class="col-sm-8">
                      <v-select
                        :options="schoolsubjectlist"
                        v-model="tabrow.qualschoolsubjectid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                      </v-select>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4" for>{{
                      $t("isallschoolgrade")
                    }}</label>
                    <div class="col-sm-8">
                      <b-form-checkbox switch v-model="tabrow.isallschoolgrade">
                      </b-form-checkbox>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow v-if="!tabrow.isallschoolgrade == true">
                <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4" for>{{
                      $t("schoolgradegroup")
                    }}</label>
                    <div class="col-sm-8">
                      <v-select
                        :options="schoolgradegrouplist"
                        v-model="tabrow.schoolgradegroupid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="ChangeSchoolGrade"
                      >
                      </v-select>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow v-if="!tabrow.isallschoolgrade == true">
                <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4" for>{{
                      $t("schoolgrade")
                    }}</label>
                    <div class="col-sm-8">
                      <v-select
                        :options="schoolgradelist"
                        v-model="tabrow.schoolgradeid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                      </v-select>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4" for>{{
                      $t("schoolsubject")
                    }}</label>
                    <div class="col-sm-8">
                      <v-select
                        :options="schoolsubjectlist"
                        v-model="tabrow.schoolsubjectid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                      </v-select>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="text-right">
                  <CButton @click="tableModal = false" color="danger" size="sm">
                    <b-icon icon="arrow-left-short"></b-icon>
                    {{ $t("back") }}
                  </CButton>
                </CCol>
                <CCol class="text-left">
                  <CButton color="success" @click="AddRow" size="sm">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("save") }}
                  </CButton>
                </CCol>
              </CRow>
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
                @click="$router.push({ name: 'AllowedTeachingSubject' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="AllowedTeachingSubject.CanSave"
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
import AllowedTeachingSubjectService from "@/services/AllowedTeachingSubject.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import SchoolGradeGroupService from "@/services/SchoolGradeGroup.service";
export default {
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      SaveLoading: false,
      AddModal: false,
      editedIndex: 0,
      search: "",
      sum: 0,
      firstTableAllCheck: false,
      secondTableAllCheck: false,
      IHMovement: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables: [],
      },
      AllowedTeachingSubject: { stateid: 1, tables: [] },
      FirstTableItems: [],
      SecondTableItems: [],
      honorarytitletypelist: [],
      personlist: [],
      accountlist: [],
      departmentlist: [],
      personlist: [],
      lang: "",
      fields: [
        {
          key: "qualschoolsubjectname",
          label: this.$t("qualschoolsubject"),
        },
        {
          key: "isallschoolgrade",
          label: this.$t("isallschoolgrade"),
        },
        {
          key: "schoolgradegroupname",
          label: this.$t("schoolgradegroup"),
        },
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
        },
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubjectname"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      items: [],
      Tables: {},
      tabrow: {
        Status: 1,
      },
      unitofmeasurelist: [],
      InventoryHoldingList: [],
      ExciserateList: [],
      plus: false,
      EraseWarningModal: false,
      EraseWarning: "a",
      tableModal: false,
      editedIndex1: -1,
      statelist: [],
      schoolsubjectlist: [],
      schoolgradelist: [],
      highereduclassifierlist: [],
      schoolgradegrouplist : []
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    AllowedTeachingSubjectService.Get(this.$route.params.id).then((res) => {
      this.AllowedTeachingSubject = res.data;
    });
    SchoolSubjectService.GetAll(this.lang, false, 0, 0).then((res) => {
      this.schoolsubjectlist = res.data;
    });

    HigherEduClassifierService.GetAll(this.lang).then((res) => {
      this.highereduclassifierlist = res.data;
    });
    SchoolGradeGroupService.GetAll().then((res) => {
      this.schoolgradegrouplist = res.data;
    });
  },

  computed: {},
  mounted() {},
  methods: {
    ChangeSchoolGrade() {
      if (!!this.tabrow.schoolgradegroupid) {
        SchoolGradeService.GetAll(
          this.lang,
          this.tabrow.schoolgradegroupid
        ).then((res) => {
          this.schoolgradelist = res.data;
        });
        this.tabrow.schoolgradename = this.schoolgradelist.filter(
          (item) => item.id == this.tabrow.schoolgradeid
        )[0].name;
      }
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    DeleteItem(item, index) {
      item.Status = 3;
    },
    OpenModal() {
      this.tabrow = {
        Status: 1,
      };
      this.tableModal = true;
    },
    AddRow() {
      if (!this.checkTable()) {
        return false;
      }
      if (!!this.tabrow.qualschoolsubjectid) {
        this.tabrow.qualschoolsubjectname = this.schoolsubjectlist.filter(
          (item) => item.id == this.tabrow.qualschoolsubjectid
        )[0].name;
      }
      if (!!this.tabrow.schoolgradeid) {
        this.tabrow.schoolgradename = this.schoolgradelist.filter(
          (item) => item.id == this.tabrow.schoolgradeid
        )[0].name;
      }
      if (!!this.tabrow.schoolgradegroupid) {
        this.tabrow.schoolgradegroupname = this.schoolgradegrouplist.filter(
          (item) => item.id == this.tabrow.schoolgradegroupid
        )[0].name;
      }
      if (!!this.tabrow.schoolsubjectid) {
        this.tabrow.schoolsubjectname = this.schoolsubjectlist.filter(
          (item) => item.id == this.tabrow.schoolsubjectid
        )[0].name;
      }
      if (!!this.tabrow.highereduclassifierid) {
        this.tabrow.highereduclassifiername = this.highereduclassifierlist.filter(
          (item) => item.id == this.tabrow.highereduclassifierid
        )[0].fullname;
      }
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.AllowedTeachingSubject.Tables[this.editedIndex1],
          this.tabrow
        );
      } else {
        this.AllowedTeachingSubject.Tables.push(this.tabrow);
      }
      this.tableModal = false;
      this.tabrow = {
        Status: 1,
      };
      this.editedIndex1 = -1;
      console.log(this.Tables);
    },
    EditItem(item, index) {
      item.Status = 2;
      this.editedIndex1 = this.AllowedTeachingSubject.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.tableModal = true;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
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
    check() {
      var self = this;
      if (
        self.AllowedTeachingSubject.docnumber === 0 ||
        self.AllowedTeachingSubject.docnumber === null ||
        self.AllowedTeachingSubject.docnumber === undefined ||
        self.AllowedTeachingSubject.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowedTeachingSubject.docdate === 0 ||
        self.AllowedTeachingSubject.docdate === null ||
        self.AllowedTeachingSubject.docdate === undefined ||
        self.AllowedTeachingSubject.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowedTeachingSubject.highereduclassifierid === 0 ||
        self.AllowedTeachingSubject.highereduclassifierid === null ||
        self.AllowedTeachingSubject.highereduclassifierid === undefined ||
        self.AllowedTeachingSubject.highereduclassifierid === ""
      ) {
        this.makeToast(
          this.$t("schoolsubjectNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowedTeachingSubject.detailinfo === 0 ||
        self.AllowedTeachingSubject.detailinfo === null ||
        self.AllowedTeachingSubject.detailinfo === undefined ||
        self.AllowedTeachingSubject.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      // if (this.itemsMainTable.length === 0) {
      //   this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
      //   return false;
      // }
      // if (
      //   self.IHMovement.fromdepartmentid === self.IHMovement.todepartmentid &&
      //   self.IHMovement.fromresponsiblepersonid ===
      //     self.IHMovement.toresponsiblepersonid
      // ) {
      //   {
      //     this.makeToast(this.$t("CantMoveToSame"), this.$t("Error"), "danger");
      //     return false;
      //   }
      // }

      return true;
    },
    checkTable() {
      var self = this;
      if (
        self.tabrow.qualschoolsubjectid === 0 ||
        self.tabrow.qualschoolsubjectid === null ||
        self.tabrow.qualschoolsubjectid === undefined ||
        self.tabrow.qualschoolsubjectid === ""
      ) {
        this.makeToast(
          this.$t("qualschoolsubjectidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (self.tabrow.isallschoolgrade === true) {
      // }
      if(self.tabrow.isallschoolgrade == false){
        if (
        self.tabrow.isallschoolgrade === true ||
        self.tabrow.schoolgradegroupid === 0 ||
        self.tabrow.schoolgradegroupid === null ||
        self.tabrow.schoolgradegroupid === undefined ||
        self.tabrow.schoolgradegroupid === ""
      ) {
        this.makeToast(
          this.$t("schoolgradegroupNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
        if (
        self.tabrow.schoolsubjectid === 0 ||
        self.tabrow.schoolsubjectid === null ||
        self.tabrow.schoolsubjectid === undefined ||
        self.tabrow.schoolsubjectid === ""
      ) {
        this.makeToast(
          this.$t("schoolsubjectNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      AllowedTeachingSubjectService.Update(this.AllowedTeachingSubject)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "AllowedTeachingSubject" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style></style>
