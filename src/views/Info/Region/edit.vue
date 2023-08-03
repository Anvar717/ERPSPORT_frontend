<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("Region") }}</h4>
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
                    :placeholder="$t('ordernumber')"
                    autocomplete="ordernumber"
                    horizontal
                    :label="$t('ordernumber')"
                    v-model="Region.ordernumber"
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
                    v-model="Region.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="Region.TranslatableColumns.includes('shortname')"
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
                    v-model="Region.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="Region.TranslatableColumns.includes('fullname')"
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
                    v-model="Region.stateid"
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
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("oblast")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="oblastlist"
                    v-model="Region.oblastid"
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
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('soatocode')"
                    autocomplete="soatocode"
                    horizontal
                    :label="$t('soatocode')"
                    v-model="Region.soatocode"
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
          </ValidationObserver>
        </CCardBody>
        <b-row class="">
          <b-col class="mobileStyle mx-3">
            <b-table
              :fields="RegionFields"
              :items="Region.ExternalDataCodeTables"
              bordered
              responsive="sm"
              class="bg-color-table text-center"
              :tbody-tr-class="rowClass"
              style="min-height: 200px;"
              small
            >
              <template #thead-top>
                <b-tr>
                  <b-th>
                    <b-form-input
                      size="sm"
                      v-model="tabrow.code"
                      class="organiation-input"
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
                      class="status-select"
                    ></v-select>
                  </b-th>
                  <b-th class="text-center">
                    <b-button size="sm" @click="AddTable" variant="primary" class="add-btn">
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
                @click="$router.push({ name: 'Region' })"
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
import RegionService from "@/services/Region.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      Region: { TranslatableColumns: [] },
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
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      oblastlist: [],
      RegionFields: [
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
    HelperService.GetOblastList().then((res) => {
      this.oblastlist = res.data;
    });
    RegionService.Get(self.selectedrowid).then((res) => {
      self.Region = res.data;
    });
    HelperService.GetAllExternalDataSource().then((res) => {
      this.ExternalDataCodeList = res.data;
    });
  },
  methods: {
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
      self.Region.ExternalDataCodeTables.push(self.tabrow);
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
    check() {
      var self = this;

      if (
        self.Region.ordernumber === 0 ||
        self.Region.ordernumber === null ||
        self.Region.ordernumber === undefined ||
        self.Region.ordernumber === ""
      ) {
        this.makeToast(
          this.$t("ordernumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Region.shortname === 0 ||
        self.Region.shortname === null ||
        self.Region.shortname === undefined ||
        self.Region.shortname === ""
      ) {
        this.makeToast(
          this.$t("ShortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Region.fullname === 0 ||
        self.Region.fullname === null ||
        self.Region.fullname === undefined ||
        self.Region.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Region.oblastid === 0 ||
        self.Region.oblastid === null ||
        self.Region.oblastid === undefined ||
        self.Region.oblastid === ""
      ) {
        this.makeToast(this.$t("oblastNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.Region.stateid === 0 ||
        self.Region.stateid === null ||
        self.Region.stateid === undefined ||
        self.Region.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      RegionService.Update(self.Region)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Region" });
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
      self.translatelist = self.Region.Translates.filter(
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
      self.Region.Translates = self.Region.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.Region.Translates.push(item);
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