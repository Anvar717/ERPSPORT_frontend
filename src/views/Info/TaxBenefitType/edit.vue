<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('TaxBenefitType')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
                      <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="TaxBenefitType.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
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
                    v-model="TaxBenefitType.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        @click="ShortNameLang"
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
                    v-model="TaxBenefitType.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        @click="FullNameLang"
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
              <CInput
                :placeholder="$t('normativeact')"
                autocomplete="text"
                horizontal
                :label="$t('normativeact')"
                v-model="TaxBenefitType.normativeact"
              >
                <template #append>
                  <CButton
                    @click="NormativeActLang"
                    style="height:35px"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="globe2"></b-icon>
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
                    <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('fixedvalue')"
                autocomplete="text"
                horizontal
                :label="$t('fixedvalue')"
                v-model="TaxBenefitType.factor"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label for="datepicker-dateformat2" class="col-form-label col-sm-3">{{$t('startdate')}}</label>
                <div class="col-sm-4">
                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="TaxBenefitType.startdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
          </CRow>
                    <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label for="datepicker-dateformat2" class="col-form-label col-sm-3">{{$t('enddate')}}</label>
                <div class="col-sm-4">
                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="TaxBenefitType.enddate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('enddate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('minimumvaluetype')}}</label>
                <v-select
                  class="col-sm-9"
                  :options="minimumvaluetypelist"
                  v-model="TaxBenefitType.minimumvaluetypeid"
                  :reduce="item => item.id"
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
                  <label class="col-form-label col-sm-3" for>{{$t('status')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="TaxBenefitType.stateid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="$router.push({name : 'TaxBenefitType'})"
                >
                  <b-icon icon="arrow-left-short" ></b-icon>
                  {{$t('back')}}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                  <b-spinner v-if="SaveLoading" small></b-spinner>
                  <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                  {{$t('Save')}}
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <CModal
          :title="$t('translate')"
          :show.sync="TranslateModal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="fields"
            :items="items"
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
                    :options="LanguageList"
                    :reduce="item => item.id"
                    label="name"
                    v-model="Translate.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput class="mb-0" v-model="Translate.translatetext"></CInput>
                </b-th>
                <b-th style="width:10%">
                  <CButton
                    @click="AddItem"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{item}">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
              <b-icon icon="check2"></b-icon>
              {{$t('Save')}}
            </CButton>
          </template>
        </CModal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import TaxBenefitTypeService from "@/services/TaxBenefitType.service";
export default {
  data() {
    return {
      SaveLoading: false,
      TaxBenefitType: { TranslatableColumns: [] },
      TaxBenefitType: {
        code: "",
        shortname: "",
        fullname: "",
        Translates: []
      },
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("translateModal.status") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" }
      ],
      items1: [],
      items2: [],
      items3 : [],
      items: [],
      LanguageList: [],
      Translate: {
        languageid: "",
        translatetext: ""
      },
      TranslatebyName: "shortname",
      statelist: [],
      minimumvaluetypelist: []
    };
  },
  created() {
    HelperService.GetLanguageList().then(res => {
      this.LanguageList = res.data;
    });
    HelperService.GetStateList().then(res => {
      this.statelist = res.data;
    });
    HelperService.GetMinimumValuelist().then(res => {
      this.minimumvaluetypelist = res.data;
    });
    TaxBenefitTypeService.Get(this.$route.params.id).then(res => {
      this.TaxBenefitType = res.data;
      this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
      this.items3 =   res.data.Translates.filter(item => item.columnname == "normativeact") || [];
    });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.TaxBenefitType.startdate === 0 ||
        self.TaxBenefitType.startdate === null ||
        self.TaxBenefitType.startdate === undefined ||
        self.TaxBenefitType.startdate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.TaxBenefitType.code === 0 ||
        self.TaxBenefitType.code === null ||
        self.TaxBenefitType.code === undefined ||
        self.TaxBenefitType.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.TaxBenefitType.shortname === 0 ||
        self.TaxBenefitType.shortname === null ||
        self.TaxBenefitType.shortname === undefined ||
        self.TaxBenefitType.shortname === ""
      ) {
        this.makeToast(this.$t("shortnameNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.TaxBenefitType.fullname === 0 ||
        self.TaxBenefitType.fullname === null ||
        self.TaxBenefitType.fullname === undefined ||
        self.TaxBenefitType.fullname === ""
      ) {
        this.makeToast(this.$t("fullnameNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.TaxBenefitType.minimumvaluetypeid === 0 ||
        self.TaxBenefitType.minimumvaluetypeid === null ||
        self.TaxBenefitType.minimumvaluetypeid === undefined ||
        self.TaxBenefitType.minimumvaluetypeid === ""
      ) {
        this.makeToast(
          this.$t("minimumvaluetypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TaxBenefitType.factor === 0 ||
        self.TaxBenefitType.factor === null ||
        self.TaxBenefitType.factor === undefined ||
        self.TaxBenefitType.factor === ""
      ) {
        this.makeToast(
          this.$t("factorNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TaxBenefitType.normativeact === 0 ||
        self.TaxBenefitType.normativeact === null ||
        self.TaxBenefitType.normativeact === undefined ||
        self.TaxBenefitType.normativeact === ""
      ) {
        this.makeToast(
          this.$t("normativeactNotCorrect"),
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

      TaxBenefitTypeService.Update(this.TaxBenefitType)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "TaxBenefitType" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    ShortNameLang() {
      this.items = this.items1;
      this.TranslateModal = true;
      this.TranslatebyName = "shortname";
      this.Translate = {};
    },
    FullNameLang() {
      this.items = this.items2;
      this.TranslateModal = true;
      this.TranslatebyName = "fullname";
      this.Translate = {};
    },
    NormativeActLang(){
      this.items = this.items3;
      this.TranslateModal = true;
      this.TranslatebyName = "normativeact";
      this.Translate = {};
    },
    AddItem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.TaxBenefitTypeTranslatePush();
        this.items1 = this.items;
      } 
      if(this.TranslatebyName == "fullname"){
        this.ItemsPush();
        this.TaxBenefitTypeTranslatePush();
        this.items2 = this.items;
      }
      if(this.TranslatebyName == "normativeact"){
        this.ItemsPush();
        this.TaxBenefitTypeTranslatePush();
        this.items3 = this.items;
      }
      this.Translate = {};
    },
    SaveTranslate() {
      this.TranslateModal = false;
    },
    ItemsPush() {
      this.items.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          item => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName
      });
    },
    TaxBenefitTypeTranslatePush() {
      this.TaxBenefitType.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          item => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName
      });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    }
  }
};
</script>

<style>
</style>