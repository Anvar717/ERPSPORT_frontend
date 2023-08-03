<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("CurrencyCourse") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="4"></CCol>
            <CCol sm="4">
              <div class="form-group form-row">
                <label
                  for="datepicker-dateformat2"
                  class="col-form-label col-sm-3"
                  >{{ $t("Date") }}</label
                >
                <div class="form-group col-sm-9 ">
                  <!-- <custom-date-input />  -->
                  <date-picker
                    style="width:100%"
                    v-model="CurrencyCourse.ondate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('ondate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="4"></CCol>
            <CCol sm="4">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("currency")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="currencylist"
                  v-model="CurrencyCourse.currencyid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
                <CCol sm="2"></CCol>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="4"></CCol>
            <CCol sm="4">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("course")
                }}</label>
                <div class="col-sm-9">
                  <custom-number-input
                    :placeholder="$t('course')"
                    autocomplete="text"
                    v-model="CurrencyCourse.course"
                  ></custom-number-input>
                </div>
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
                  @click="$router.push({ name: 'CurrencyCourse' })"
                >
                  <b-icon icon="arrow-left-short" ></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <CButton
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
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="Translate.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput
                    class="mb-0"
                    v-model="Translate.translatetext"
                  ></CInput>
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import CurrencyService from "@/services/Currency.service";
import CurrencyCourseService from "@/services/CurrencyCourse.service";
export default {
  data() {
    return {
      SaveLoading: false,
      CurrencyCourse: {
        ondate: "",
        currencyid: 0,
        course: 0,
        Translates: [],
      },
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("translateModal.status") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" },
      ],
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      currencylist: [],
    };
  },
  created() {
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    CurrencyService.GetAll().then((res) => {
      this.currencylist = res.data;
    });
    CurrencyCourseService.Get(this.$route.params.id).then((res) => {
      this.CurrencyCourse = res.data;
      this.items1 =
        res.data.Translates.filter((item) => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter((item) => item.columnname == "fullname") ||
        [];
    });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.CurrencyCourse.ondate === 0 ||
        self.CurrencyCourse.ondate === null ||
        self.CurrencyCourse.ondate === undefined ||
        self.CurrencyCourse.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.CurrencyCourse.currencyid === 0 ||
        self.CurrencyCourse.currencyid === null ||
        self.CurrencyCourse.currencyid === undefined ||
        self.CurrencyCourse.currencyid === ""
      ) {
        this.makeToast(
          this.$t("currencyNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CurrencyCourse.course === 0 ||
        self.CurrencyCourse.course === null ||
        self.CurrencyCourse.course === undefined ||
        self.CurrencyCourse.course === ""
      ) {
        this.makeToast(this.$t("courseNotCorrect"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },

    SaveData() {
      if (!this.check()) {
        return false;
      }
      CurrencyCourseService.Update(this.CurrencyCourse)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "CurrencyCourse" });
        })
        .catch((error) => {
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
        this.CurrencyCourseTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.CurrencyCourseTranslatePush();
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
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
    },
    CurrencyCourseTranslatePush() {
      this.CurrencyCourse.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
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
  },
};
</script>

<style></style>
