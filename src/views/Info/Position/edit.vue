<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("Position") }}</h4>
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
                    v-model="Position.code"
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
                    v-model="Position.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          Position.TranslatableColumns.includes('shortname')
                        "
                        @click="translate('shortname')"
                        style="height:35px"
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
                    v-model="Position.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="Position.TranslatableColumns.includes('fullname')"
                        @click="translate('fullname')"
                        style="height:35px"
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
                    $t("PositionClassification")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="positionclassificationlist"
                    v-model="Position.positionclassificationid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("positiontype")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="positiontypelist"
                    v-model="Position.positiontypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("TariffScale")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="tariffscaletypelist"
                    v-model="Position.tariffscaletypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow v-if="Position.tariffscaletypeid != 1">
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("stafftypebasictariff")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="stafftypebasictarifflist"
                    v-model="Position.stafftypebasictariffid"
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
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="Position.stateid"
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
        <b-tabs class="ml-4" pills>
          <b-tab :title="$t('PositionTable')" active>
            <CRow class="mt-4">
              <CCol>
                <b-table
                  :fields="TablesFields"
                  :items="Position.Tables"
                  class="bg-color-table text-center tdpadding mx-3"
                  style="vertical-align:middle"
                  bordered
                  responsive="sm"
                  :tbody-tr-class="rowClass"
                >
                  <template v-slot:thead-top>
                    <b-tr>
                      <b-th style="width : 20%">
                        <v-select
                          :options="organizationtypelist"
                          v-model="Tables.organizationtypeid"
                          @input="organizationtypechange"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                        ></v-select>
                      </b-th>

                      <b-th style="width:10%;">
                        <CButton
                          style=" margin-top: -20px;"
                          size="sm"
                          color="primary"
                          variant="outline"
                          @click="AddRow"
                        >
                          <b-icon icon="plus"> </b-icon>
                          {{ $t("Add") }}
                        </CButton>
                      </b-th>
                    </b-tr>
                  </template>

                  <template v-slot:cell(actions)="{ item }">
                    <CButtonGroup class="mx-auto d-block text-center" size="sm">
                      <CButton
                        class="m-1"
                        variant="outline"
                        color="danger"
                        @click="DeleteItem(item)"
                      >
                        <b-icon icon="x"> </b-icon>
                      </CButton>
                    </CButtonGroup>
                  </template>
                </b-table>
              </CCol>
            </CRow>
          </b-tab>
        </b-tabs>
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
            style="vertical-align:middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width:30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="languagelist"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput
                    class="mb-0"
                    v-model="translaterow.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width:10%">
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
                @click="$router.push({ name: 'Position' })"
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
import OrganizationType from "@/services/OrganizationType.service";
import PositionService from "@/services/Position.service";
import StaffCategoryService from "@/services/StaffCategory.service";
import PositionClassification from "@/services/PositionClassification.service";
import StaffTypeBasicTariffService from "@/services/StaffTypeBasicTariff.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      Position: { TranslatableColumns: [] },
      selectedrowid: 0,
      TablesFields: [
        {
          key: "organizationtypename",
          label: this.$t("organizationtypeid"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
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
      Tables: {
        id: 0,
        ownerid: 0,
        organizationtypeid: "",
        organizationtypename: "",
        Status: 1,
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      organizationtypelist: [],
      tariffscaletypelist: [],
      positionclassificationlist: [],
      stafftypebasictarifflist: [],
      positiontypelist: [],
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetTariffScaleTypeList().then((res) => {
      this.tariffscaletypelist = res.data;
    });
    HelperService.GetAllPositionType().then((res) => {
      this.positiontypelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    OrganizationType.GetAll().then((res) => {
      self.organizationtypelist = res.data;
    });
    StaffCategoryService.GetAll().then((res) => {
      this.staffcategorylist = res.data;
    });
    PositionClassification.GetAll().then((res) => {
      this.positionclassificationlist = res.data;
    });
    PositionService.Get(self.selectedrowid).then((res) => {
      self.Position = res.data;
    });
    StaffTypeBasicTariffService.GetAll().then((res) => {
      self.stafftypebasictarifflist = res.data;
    });
  },
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    organizationtypechange() {
      this.Tables.organizationtypename = this.organizationtypelist.filter(
        (item) => item.id === this.Tables.organizationtypeid
      )[0].name;
      console.log(this.Tables.organizationtypename);
    },
    AddRow(data) {
      var self = this;
      // console.log(self.Position.Tables);
      console.log(self.Tables);
      self.Position.Tables.push(self.Tables);
      self.Tables = {
        id: 0,
        ownerid: 0,
        organizationtypeid: "",
        Status: 1,
      };
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.Position.code === 0 ||
        self.Position.code === null ||
        self.Position.code === undefined ||
        self.Position.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.Position.shortname === 0 ||
        self.Position.shortname === null ||
        self.Position.shortname === undefined ||
        self.Position.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Position.fullname === 0 ||
        self.Position.fullname === null ||
        self.Position.fullname === undefined ||
        self.Position.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Position.fullname === 0 ||
        self.Position.fullname === null ||
        self.Position.fullname === undefined ||
        self.Position.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Position.positionclassificationid === 0 ||
        self.Position.positionclassificationid === null ||
        self.Position.positionclassificationid === undefined ||
        self.Position.positionclassificationid === ""
      ) {
        this.makeToast(
          this.$t("positionclassificationNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Position.tariffscaletypeid === 0 ||
        self.Position.tariffscaletypeid === null ||
        self.Position.tariffscaletypeid === undefined ||
        self.Position.tariffscaletypeid === ""
      ) {
        this.makeToast(
          this.$t("tariffscaletypeNotSelected"),
          "Error",
          "danger"
        );
        return false;
      }
      if (self.Position.tariffscaletypeid != 1) {
        if (
          self.Position.stafftypebasictariffid === 0 ||
          self.Position.stafftypebasictariffid === null ||
          self.Position.stafftypebasictariffid === undefined ||
          self.Position.stafftypebasictariffid === ""
        ) {
          this.makeToast(
            this.$t("StafftypebasictariffNotSelected"),
            "Error",
            "danger"
          );
          return false;
        }
      }
      if (
        self.Position.stateid === 0 ||
        self.Position.stateid === null ||
        self.Position.stateid === undefined ||
        self.Position.stateid === ""
      ) {
        this.makeToast(this.$t("stateNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      // if(this.Position.stafftypebasictariffid == 0){
      //   this.Position.stafftypebasictariffid = null
      // }
      PositionService.Update(self.Position)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Position" });
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
      self.translatelist = self.Position.Translates.filter(
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
          self.translaterow.languagename = self.languagelist.filter(function(
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
      self.Position.Translates = self.Position.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.Position.Translates.push(item);
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

<style></style>
