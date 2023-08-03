<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("QualificationCategory") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="code"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="QualificationCategory.code"
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="QualificationCategory.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        @click="translate('shortname')"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="QualificationCategory.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        @click="translate('fullname')"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("employeetype")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="organizationtypelist"
                    v-model="QualificationCategory.qualcategorytypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <CInput
                  :placeholder="$t('DetailInfo')"
                  autocomplete="text"
                  horizontal
                  :label="$t('DetailInfo')"
                  v-model="QualificationCategory.detailinfo"
                ></CInput>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="QualificationCategory.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>

        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{
            $t("SportQualSpecialTy")
          }}</template>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("SportQualSpecialTy")
                }}</label>
                <v-select
                  :options="sportqualspecialtylist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="col-sm-9"
                  @input="ChangeSportqualspecialty"
                  v-model="tabrow.sportqualspecialtyid"
                ></v-select>
              </div>
            </CCol>
          </CRow>
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
        <CRow>
          <CCol class="text-right mr-3 mb-3">
            <CButton size="sm" color="primary" @click="OpenModal">
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <b-table
              :fields="Fields"
              :items="QualificationCategory.Tables"
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

        <CModal
          :title="$t('translate')"
          :show.sync="translatemodal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="translitefields"
            :items="translatelist"
            class="bg-color-table text-center"
            style="vertical-align: middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width: 30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="languagelist"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index: 9999"
                  ></v-select>
                </b-th>
                <b-th style="width: 60%">
                  <CInput
                    class="mb-0"
                    v-model="translaterow.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width: 10%">
                  <CButton
                    @click="addtranslite"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{ item }">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton
              @click="SaveTranslate"
              color="primary"
              size="sm"
              variant="outline"
            >
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </template>
        </CModal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'QualificationCategory' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      QualificationCategory: { TranslatableColumns: [], Tables: [] },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      Fields: [
        {
          key: "sportqualspecialtyname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("SportQualSpecialTy"),
        },
        {
          key: "actions",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("actions"),
        },
      ],
      translatelist: [],
      languagelist: [],
      organizationtypelist: [],
      sportqualspecialtylist: [],
      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],

      tabrow: {
        id: 0,
        ownerid: 0,
        sportqualspecialtyid: 0,
        sportqualspecialtyname: "",
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
    QualificationCategoryService.Get(self.selectedrowid).then((res) => {
      self.QualificationCategory = res.data;
    });
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    HelperService.GetAllSportQualSpecialty().then((res) => {
      self.sportqualspecialtylist = res.data;
    });
    HelperService.GetQualCategoryTypeList().then((res) => {
      self.organizationtypelist = res.data;
    });
  },
  methods: {
    checkData() {
      var self = this;

      if (
        self.QualificationCategory.code === 0 ||
        self.QualificationCategory.code === null ||
        self.QualificationCategory.code === undefined ||
        self.QualificationCategory.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.QualificationCategory.shortname === 0 ||
        self.QualificationCategory.shortname === null ||
        self.QualificationCategory.shortname === undefined ||
        self.QualificationCategory.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.QualificationCategory.fullname === 0 ||
        self.QualificationCategory.fullname === null ||
        self.QualificationCategory.fullname === undefined ||
        self.QualificationCategory.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.QualificationCategory.qualcategorytypeid === 0 ||
        self.QualificationCategory.qualcategorytypeid === null ||
        self.QualificationCategory.qualcategorytypeid === undefined ||
        self.QualificationCategory.qualcategorytypeid === ""
      ) {
        this.makeToast(
          this.$t("employeetypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.QualificationCategory.detailinfo === 0 ||
        self.QualificationCategory.detailinfo === null ||
        self.QualificationCategory.detailinfo === undefined ||
        self.QualificationCategory.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.QualificationCategory.stateid === 0 ||
        self.QualificationCategory.stateid === null ||
        self.QualificationCategory.stateid === undefined ||
        self.QualificationCategory.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.checkData()) {
        return false;
        5;
      }
      var self = this;
      QualificationCategoryService.Update(self.QualificationCategory)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "QualificationCategory" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.QualificationCategory.Translates.filter(
        (item) => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        this.makeToast(
          this.$t("languageidNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        this.makeToast(
          this.$t("translatetextNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else {
        var dublikate = false;
        self.translatelist.forEach((item) => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function (
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: "",
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.QualificationCategory.Translates =
        self.QualificationCategory.Translates.filter(
          (x) => x.columnname !== self.translatebyname
        );
      self.translatelist.forEach((item) => {
        self.QualificationCategory.Translates.push(item);
      });
      self.translatemodal = false;
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
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenModal() {
      var self = this;
      if (!self.checkData()) {
        return false;
      }
      self.$bvModal.show("AddModal");
    },
    Add() {
      var self = this;
      self.tabrow;
      if (
        self.tabrow.sportqualspecialtyid === "" ||
        self.tabrow.sportqualspecialtyid === undefined ||
        self.tabrow.sportqualspecialtyid === null ||
        self.tabrow.sportqualspecialtyid === 0
      ) {
        self.makeToast(
          self.$t("sportqualspecialtyidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.QualificationCategory.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        sportqualspecialtyid: 0,
        sportqualspecialtyname: "",
        Status: 1,
      };
      self.isDisabled = true;
      self.$bvModal.hide("AddModal");
    },
    ChangeSportqualspecialty() {
        this.tabrow.sportqualspecialtyname = this.sportqualspecialtylist.filter(
          (item) => this.tabrow.sportqualspecialtyid === item.id
        )[0].name;
      },

    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.QualificationCategory.Tables.indexOf(item);
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
          this.QualificationCategory.Tables[this.editedIndex],
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
          sportqualspecialtyid: 0,
          sportqualspecialtyname: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style>
</style>