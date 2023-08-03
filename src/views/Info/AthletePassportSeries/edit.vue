<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AthletePassportSeries") }}</h4>
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
                  name="ordernumber"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('ordernumber')"
                    autocomplete="ordernumber"
                    horizontal
                    :label="$t('ordernumber')"
                    v-model="AthletePassportSeries.ordernumber"
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
                    v-model="AthletePassportSeries.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          AthletePassportSeries.TranslatableColumns.includes(
                            'shortname'
                          )
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
                    v-model="AthletePassportSeries.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          AthletePassportSeries.TranslatableColumns.includes(
                            'fullname'
                          )
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
                    $t("oblast")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="oblastlist"
                    v-model="AthletePassportSeries.oblastid"
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
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="AthletePassportSeries.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
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
                @click="$router.push(`/Info/AthletePassportSeries`)"
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
import AthletePassportSeriesService from "@/services/AthletePassportSeries.service";
import OblastService from '@/services/Oblast.service'
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      AthletePassportSeries: { TranslatableColumns: [] },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],
      oblastlist: [],
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
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    AthletePassportSeriesService.Get(self.selectedrowid).then((res) => {
      self.AthletePassportSeries = res.data;
      if (self.selectedrowid == 0) {
        self.AthletePassportSeries.Translates = [];
      }
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    OblastService.GetAll().then((res) => {
      self.oblastlist = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.AthletePassportSeries.ordernumber === 0 ||
        self.AthletePassportSeries.ordernumber === null ||
        self.AthletePassportSeries.ordernumber === undefined ||
        self.AthletePassportSeries.ordernumber === ""
      ) {
        this.makeToast(
          this.$t("ordernumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthletePassportSeries.shortname === 0 ||
        self.AthletePassportSeries.shortname === null ||
        self.AthletePassportSeries.shortname === undefined ||
        self.AthletePassportSeries.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthletePassportSeries.fullname === 0 ||
        self.AthletePassportSeries.fullname === null ||
        self.AthletePassportSeries.fullname === undefined ||
        self.AthletePassportSeries.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthletePassportSeries.oblastid === 0 ||
        self.AthletePassportSeries.oblastid === null ||
        self.AthletePassportSeries.oblastid === undefined ||
        self.AthletePassportSeries.oblastid === ""
      ) {
        this.makeToast(
          this.$t("oblastidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      AthletePassportSeriesService.Update(self.AthletePassportSeries)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "AthletePassportSeries" });
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
      self.translatelist = self.AthletePassportSeries.Translates.filter(
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
      self.AthletePassportSeries.Translates =
        self.AthletePassportSeries.Translates.filter(
          (x) => x.columnname !== self.translatebyname
        );
      self.translatelist.forEach((item) => {
        self.AthletePassportSeries.Translates.push(item);
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