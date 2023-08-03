<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('FixedMinimumValue')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label for="datepicker-dateformat2" class="col-form-label col-sm-3">{{$t('ondate')}}</label>
                <div class="col-sm-9">
                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="FixedMinimumValue.ondate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('ondate')"
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
                  v-model="FixedMinimumValue.minimumvaluetypeid"
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
              <CInput
                :placeholder="$t('fixedvalue')"
                autocomplete="text"
                horizontal
                :label="$t('fixedvalue')"
                v-model="FixedMinimumValue.fixedvalue"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('changepercentage')"
                autocomplete="text"
                horizontal
                :label="$t('changepercentage')"
                v-model="FixedMinimumValue.changepercentage"
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
              </CInput>
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
                v-model="FixedMinimumValue.normativeact"
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
              </CInput>
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
                  @click="$router.push({name : 'FixedMinimumValue'})"
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
import FixedMinimumValueService from "@/services/FixedMinimumValue.service";
export default {
  data() {
    return {
      SaveLoading: false,
      FixedMinimumValue: {
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
    FixedMinimumValueService.Get(this.$route.params.id).then(res => {
      this.FixedMinimumValue = res.data;
      this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
    });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.FixedMinimumValue.ondate === 0 ||
        self.FixedMinimumValue.ondate === null ||
        self.FixedMinimumValue.ondate === undefined ||
        self.FixedMinimumValue.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.FixedMinimumValue.minimumvaluetypeid === 0 ||
        self.FixedMinimumValue.minimumvaluetypeid === null ||
        self.FixedMinimumValue.minimumvaluetypeid === undefined ||
        self.FixedMinimumValue.minimumvaluetypeid === ""
      ) {
        this.makeToast(
          this.$t("minimumvaluetypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixedMinimumValue.fixedvalue === 0 ||
        self.FixedMinimumValue.fixedvalue === null ||
        self.FixedMinimumValue.fixedvalue === undefined ||
        self.FixedMinimumValue.fixedvalue === ""
      ) {
        this.makeToast(
          this.$t("fixedvalueNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixedMinimumValue.changepercentage === 0 ||
        self.FixedMinimumValue.changepercentage === null ||
        self.FixedMinimumValue.changepercentage === undefined ||
        self.FixedMinimumValue.changepercentage === ""
      ) {
        this.makeToast(
          this.$t("changepercentageNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixedMinimumValue.normativeact === 0 ||
        self.FixedMinimumValue.normativeact === null ||
        self.FixedMinimumValue.normativeact === undefined ||
        self.FixedMinimumValue.normativeact === ""
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

      FixedMinimumValueService.Update(this.FixedMinimumValue)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "FixedMinimumValue" });
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
    AddItem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.FixedMinimumValueTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.FixedMinimumValueTranslatePush();
        this.items2 = this.items;
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
    FixedMinimumValueTranslatePush() {
      this.FixedMinimumValue.Translates.push({
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