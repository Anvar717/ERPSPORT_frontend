<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('InventoryHolding')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <label class="col-form-label col-sm-10" for>{{$t('code')}}</label>

                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    v-model="InventoryHolding.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>

              <CCol sm="4">
                <ValidationProvider v-slot="v" name="shortname" rules="required">
                  <label class="col-form-label col-sm-10" for>{{$t('shortname')}}</label>
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    v-model="InventoryHolding.shortname"
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

              <CCol sm="4">
                <ValidationProvider v-slot="v" name="fullname" rules="required">
                  <label class="col-form-label col-sm-10" for>{{$t('fullname')}}</label>
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    v-model="InventoryHolding.fullname"
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

            <CRow class="mt-4">
              <CCol sm="3">
                <div>
                  <label for>{{$t('UnitOfMeasure')}}</label>
                  <v-select
                    :options="unitofmeasurelist"
                    v-model="InventoryHolding.unitofmeasureid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>

              <CCol sm="3">
                <div>
                  <label for>{{$t('IHGroup')}}</label>
                  <v-select
                    :options="ihgrouplist"
                    v-model="InventoryHolding.ihgroupid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>

              <CCol>
                <ValidationProvider v-slot="v" name="calorie" rules="required">
                  <div>
                    <label for>{{$t('calorie')}}</label>
                    <custom-number-input v-model="InventoryHolding.calorie" size="sm">
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </custom-number-input>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="caloriegramm" rules="required">
                  <div>
                    <label for>{{$t('caloriegramm')}}</label>
                    <custom-number-input v-model="InventoryHolding.caloriegramm" size="sm">
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </custom-number-input>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>

            <CRow class="mt-4">
              <CCol>
                <ValidationProvider v-slot="v" name="protein" rules="required">
                  <div>
                    <label for>{{$t('protein')}}</label>
                    <custom-number-input v-model="InventoryHolding.protein">
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </custom-number-input>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="fat" rules="required">
                  <div>
                    <label for>{{$t('fat')}}</label>
                    <custom-number-input v-model="InventoryHolding.fat">
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </custom-number-input>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="carbohydrate" rules="required">
                  <div>
                    <label for>{{$t('carbohydrate')}}</label>
                    <custom-number-input v-model="InventoryHolding.carbohydrate">
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </custom-number-input>
                  </div>
                </ValidationProvider>
              </CCol>

              <CCol sm="3">
                <div>
                  <label for>{{$t('Status')}}</label>
                  <v-select
                    :options="statelist"
                    v-model="InventoryHolding.stateid"
                    :reduce="item => item.id"
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
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                v-if="showBackButton"
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'InventoryHolding'})"
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import IHGroupService from "@/services/IHGroup.service";
import InventoryHoldingService from "@/services/InventoryHolding.service";

export default {
  name: "editTmzComponent",
  props: {
    showBackButton: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      SaveLoading: false,
      InventoryHolding: {
        code: "",
        shortname: "",
        fullname: "",
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
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      unitofmeasurelist: [],
      ihgrouplist: [],
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
    IHGroupService.GetAll().then((res) => {
      this.ihgrouplist = res.data;
    });
    InventoryHoldingService.Get(this.$route.params.id).then((res) => {
      this.InventoryHolding = res.data;
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
        self.InventoryHolding.code === 0 ||
        self.InventoryHolding.code === null ||
        self.InventoryHolding.code === undefined ||
        self.InventoryHolding.code === ""
      ) {
        this.makeToast(this.$t("codetNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.InventoryHolding.shortname === 0 ||
        self.InventoryHolding.shortname === null ||
        self.InventoryHolding.shortname === undefined ||
        self.InventoryHolding.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.InventoryHolding.fullname === 0 ||
        self.InventoryHolding.fullname === null ||
        self.InventoryHolding.fullname === undefined ||
        self.InventoryHolding.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.InventoryHolding.unitofmeasureid === 0 ||
        self.InventoryHolding.unitofmeasureid === null ||
        self.InventoryHolding.unitofmeasureid === undefined ||
        self.InventoryHolding.unitofmeasureid === ""
      ) {
        this.makeToast(
          this.$t("unitofmeasureNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.InventoryHolding.ihgroupid === 0 ||
        self.InventoryHolding.ihgroupid === null ||
        self.InventoryHolding.ihgroupid === undefined ||
        self.InventoryHolding.ihgroupid === ""
      ) {
        this.makeToast(this.$t("ihgroupNotSelect"), this.$t("Error"), "danger");
        return false;
      }
      /*       if (
        self.InventoryHolding.calorie === 0 ||
        self.InventoryHolding.calorie === null ||
        self.InventoryHolding.calorie === undefined ||
        self.InventoryHolding.calorie === ""
      ) {
        this.makeToast(
          this.$t("calorieNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.InventoryHolding.caloriegramm === 0 ||
        self.InventoryHolding.caloriegramm === null ||
        self.InventoryHolding.caloriegramm === undefined ||
        self.InventoryHolding.caloriegramm === ""
      ) {
        this.makeToast(
          this.$t("caloriegrammNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.InventoryHolding.protein === 0 ||
        self.InventoryHolding.protein === null ||
        self.InventoryHolding.protein === undefined ||
        self.InventoryHolding.protein === ""
      ) {
        this.makeToast(
          this.$t("proteinNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.InventoryHolding.fat === 0 ||
        self.InventoryHolding.fat === null ||
        self.InventoryHolding.fat === undefined ||
        self.InventoryHolding.fat === ""
      ) {
        this.makeToast(this.$t("fatNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.InventoryHolding.carbohydrate === 0 ||
        self.InventoryHolding.carbohydrate === null ||
        self.InventoryHolding.carbohydrate === undefined ||
        self.InventoryHolding.carbohydrate === ""
      ) {
        this.makeToast(
          this.$t("carbohydrateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.InventoryHolding.stateid === 0 ||
        self.InventoryHolding.stateid === null ||
        self.InventoryHolding.stateid === undefined ||
        self.InventoryHolding.stateid === ""
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
      InventoryHoldingService.Update(this.InventoryHolding)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          if (this.showBackButton === true) {
            this.$router.push({ name: "InventoryHolding" });
          } else {
            var self = this;
            setTimeout(function () {
              self.$emit("success", res.data);
            }, 500);
          }
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
        this.InventoryHoldingTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.InventoryHoldingTranslatePush();
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
    InventoryHoldingTranslatePush() {
      this.InventoryHolding.Translates.push({
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
};
</script>

<style>
</style>