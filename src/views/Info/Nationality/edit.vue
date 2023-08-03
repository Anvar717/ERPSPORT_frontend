<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("Nationality") }}</h4>
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
                    v-model="Nationality.code"
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
                    v-model="Nationality.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          Nationality.TranslatableColumns.includes('shortname')
                        "
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
                    v-model="Nationality.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          Nationality.TranslatableColumns.includes('fullname')
                        "
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
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="Nationality.stateid"
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
        <b-row class="mx-3">
          <b-col>
            <b-table
              :fields="NationalityFields"
              :items="Nationality.ExternalDataCodeTables"
              bordered
              class="bg-color-table text-center"
              responsive="sm"
              :tbody-tr-class="rowClass"
              small
            >
              <template #thead-top>
                <b-tr>
                  <b-th>
                    <b-form-input
                      size="sm"
                      v-model="tabrow.code"
                    ></b-form-input>
                  </b-th>
                  <b-th>
                    <v-select
                      :options="ExternalDataCodeList"
                      v-model="tabrow.externaldatasourceid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="ChangeExternalDataCode"
                    ></v-select>
                  </b-th>
                  <b-th class="text-center">
                    <b-button size="sm" @click="AddTable" variant="primary">
                      <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                    </b-button>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(actions)="{ item, index }">
                <div class="text-center">
                  <b-link
                    @click="EditItem(item, index)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteItem(item, index)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
              <template v-slot:cell(code)="{ item }">
                <p v-if="item.status == 0" class="p-0 m-0">{{ item.code }}</p>
                <b-form-input
                  v-if="item.status == 1 || item.status == 2"
                  size="sm"
                  v-model="item.code"
                ></b-form-input>
              </template>
              <template v-slot:cell(externaldatasourcename)="{ item }">
                <p v-if="item.status == 0" class="p-0 m-0">
                  {{ item.externaldatasourcename }}
                </p>
                <v-select
                  v-if="item.status == 1 || item.status == 2"
                  :options="ExternalDataCodeList"
                  v-model="item.externaldatasourceid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </template>
            </b-table>
          </b-col>
        </b-row>
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
                @click="$router.push({ name: 'Nationality' })"
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
import NationalityService from "@/services/Nationality.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      Nationality: { TranslatableColumns: [] },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      NationalityFields: [
        { key: "code", label: this.$t("code"), thClass: "text-center" },
        {
          key: "externaldatasourcename",
          label: this.$t("externaldatasource"),
          thClass: "text-center",
        },
        { key: "actions", label: this.$t("actions"), thClass: "text-center" },
      ],
      tabrow: {
        id: 0,
        tableid: 0,
        tablename: "",
        tablerowid: 0,
        externaldatasourceid: 0,
        externaldatasourcename: "",
        code: "",
        status: 1,
      },
      ExternalDataCodeList: [],
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    NationalityService.Get(self.selectedrowid).then((res) => {
      self.Nationality = res.data;
    });
    HelperService.GetAllExternalDataSource().then((res) => {
      this.ExternalDataCodeList = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.Nationality.code === 0 ||
        self.Nationality.code === null ||
        self.Nationality.code === undefined ||
        self.Nationality.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.Nationality.shortname === 0 ||
        self.Nationality.shortname === null ||
        self.Nationality.shortname === undefined ||
        self.Nationality.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Nationality.fullname === 0 ||
        self.Nationality.fullname === null ||
        self.Nationality.fullname === undefined ||
        self.Nationality.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Nationality.stateid === 0 ||
        self.Nationality.stateid === null ||
        self.Nationality.stateid === undefined ||
        self.Nationality.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    EditItem(item, index) {
      if (item.status == 0) {
        item.status = 2;
      }
    },
    DeleteItem(item, index) {
      item.status = 3;
    },
    rowClass(item, type) {
      if (item.status === 3) {
        return "d-none";
      }
    },
    AddTable() {
      var self = this;
      if (
        self.tabrow.code === 0 ||
        self.tabrow.code === null ||
        self.tabrow.code === undefined ||
        self.tabrow.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow.externaldatasourceid === 0 ||
        self.tabrow.externaldatasourceid === null ||
        self.tabrow.externaldatasourceid === undefined ||
        self.tabrow.externaldatasourceid === ""
      ) {
        this.makeToast(
          this.$t("externaldatasourceNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.Nationality.ExternalDataCodeTables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        tableid: 0,
        tablename: "",
        tablerowid: 0,
        externaldatasourceid: 0,
        externaldatasourcename: "",
        code: "",
        status: 1,
      };
    },
    ChangeExternalDataCode() {
      if (!!this.tabrow.externaldatasourceid) {
        this.tabrow.externaldatasourcename = this.ExternalDataCodeList.filter(
          (item) => item.id == this.tabrow.externaldatasourceid
        )[0].name;
      }
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      NationalityService.Update(self.Nationality)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Nationality" });
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
      self.translatelist = self.Nationality.Translates.filter(
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
      self.Nationality.Translates = self.Nationality.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.Nationality.Translates.push(item);
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
  },
};
</script>

<style>
</style>