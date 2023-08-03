<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AnthropometricIndicator") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                type="number"
                :placeholder="$t('ordernumber')"
                autocomplete="text"
                horizontal
                :label="$t('ordernumber')"
                v-model="AnthropometricIndicator.ordernumber"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('shortname')"
                autocomplete="text"
                horizontal
                :label="$t('shortname')"
                v-model="AnthropometricIndicator.shortname"
              >
                <template #append>
                  <CButton
                    @click="ShortNameLang"
                    style="height: 35px"
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
                :placeholder="$t('fullname')"
                autocomplete="text"
                horizontal
                :label="$t('fullname')"
                v-model="AnthropometricIndicator.fullname"
              >
                <template #append>
                  <CButton
                    @click="FullNameLang"
                    style="height: 35px"
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
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("parent")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="parentlist"
                  v-model="AnthropometricIndicator.parentid"
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
              <label class="ol-form-label col-sm-3" for>{{
                $t("isgroup")
              }}</label>
              <b-form-checkbox
                v-model="AnthropometricIndicator.isgroup"
                switch
                class="col-sm-9"
              ></b-form-checkbox>
            </div>
          </CCol>
          <CCol sm="3"></CCol>
          </CRow>
          <CRow v-if="AnthropometricIndicator.isgroup == false">
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("unitofmeasure")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="unitofmeasurelist"
                  v-model="AnthropometricIndicator.unitofmeasureid"
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
                type="number"
                :placeholder="$t('minstandart')"
                autocomplete="text"
                horizontal
                v-mask="'#####'"
                :label="$t('minstandart')"
                v-model="AnthropometricIndicator.minstandard"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                type="number"
                :placeholder="$t('maxstandart')"
                autocomplete="text"
                horizontal
                :label="$t('maxstandart')"
                 v-mask="'#####'"
                v-model="AnthropometricIndicator.maxstandard"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("Status")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="statelist"
                  v-model="AnthropometricIndicator.stateid"
                  :reduce="(item) => item.id"
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
                  @click="$router.push({ name: 'AnthropometricIndicator' })"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
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
                    :options="LanguageList"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="Translate.languageid"
                    style="z-index: 9999"
                  ></v-select>
                </b-th>
                <b-th style="width: 60%">
                  <CInput
                    class="mb-0"
                    v-model="Translate.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width: 10%">
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
import AnthropometricIndicatorService from "@/services/AnthropometricIndicator.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
export default {
  data() {
    return {
      SaveLoading: false,
      AnthropometricIndicator: {
        code: "",
        shortname: "",
        fullname: "",
        Translates: [],
      },
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" },
      ],
      items1: [],
      items2: [],
      unitofmeasurelist: [],
      parentlist: [],
      items: [],
      LanguageList: [],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      statelist: [],
    };
  },
  created() {
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    AnthropometricIndicatorService.GetAll().then((res) => {
      this.parentlist = res.data;
    });
    AnthropometricIndicatorService.Get(this.$route.params.id).then((res) => {
      this.AnthropometricIndicator = res.data;
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
        self.AnthropometricIndicator.ordernumber === 0 ||
        self.AnthropometricIndicator.ordernumber === null ||
        self.AnthropometricIndicator.ordernumber === undefined ||
        self.AnthropometricIndicator.ordernumber === ""
      ) {
        this.makeToast(this.$t("ordernumberNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.AnthropometricIndicator.shortname === 0 ||
        self.AnthropometricIndicator.shortname === null ||
        self.AnthropometricIndicator.shortname === undefined ||
        self.AnthropometricIndicator.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AnthropometricIndicator.fullname === 0 ||
        self.AnthropometricIndicator.fullname === null ||
        self.AnthropometricIndicator.fullname === undefined ||
        self.AnthropometricIndicator.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!self.AnthropometricIndicator.isgroup &&
        (self.AnthropometricIndicator.unitofmeasureid === 0 ||
        self.AnthropometricIndicator.unitofmeasureid === null ||
        self.AnthropometricIndicator.unitofmeasureid === undefined ||
        self.AnthropometricIndicator.unitofmeasureid === "")
      ) {
        this.makeToast(
          this.$t("unitofmeasureNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.AnthropometricIndicator.stateid === 0 ||
        self.AnthropometricIndicator.stateid === null ||
        self.AnthropometricIndicator.stateid === undefined ||
        self.AnthropometricIndicator.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.AnthropometricIndicator.minstandard = parseInt(this.AnthropometricIndicator.minstandard)
      this.AnthropometricIndicator.maxstandard = parseInt(this.AnthropometricIndicator.maxstandard)
      AnthropometricIndicatorService.Update(this.AnthropometricIndicator)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "AnthropometricIndicator" });
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
        this.AnthropometricIndicatorTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.AnthropometricIndicatorTranslatePush();
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
    AnthropometricIndicatorTranslatePush() {
      this.AnthropometricIndicator.Translates.push({
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
  