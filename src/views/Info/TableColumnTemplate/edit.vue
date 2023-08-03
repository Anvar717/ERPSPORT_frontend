<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('TableColumnTemplate')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <ValidationProvider v-slot="v" name="ordernumber" rules="required|max:9">
                <CInput
                  :placeholder="$t('ordernumber')"
                  autocomplete="ordernumber"
                  horizontal
                  :label="$t('ordernumber')"
                  v-model="TableColumnTemplate.ordernumber"
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
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('Table')}}</label>
                <v-select
                  class="col-sm-9"
                  :options="tablelist"
                  v-model="TableColumnTemplate.tableid"
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
                :placeholder="$t('columnname')"
                autocomplete="text"
                horizontal
                :label="$t('columnname')"
                v-model="TableColumnTemplate.columnname"
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
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('templatetext')"
                autocomplete="text"
                horizontal
                :label="$t('templatetext')"
                v-model="TableColumnTemplate.templatetext"
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
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('isother')}}</label>
                <b-form-checkbox class="col-sm-9 mt-2" v-model="TableColumnTemplate.isother" switch ></b-form-checkbox>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('state')}}</label>
                <v-select
                  class="col-sm-9"
                  :options="statelist"
                  v-model="TableColumnTemplate.stateid"
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
                  @click="$router.push({name : 'TableColumnTemplate'})"
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
import TableColumnTemplateService from "@/services/TableColumnTemplate.service";
export default {
  data() {
    return {
      SaveLoading: false,
      TableColumnTemplate: {
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
      tablelist: []
    };
  },
  created() {
    HelperService.GetLanguageList().then(res => {
      this.LanguageList = res.data;
    });
    HelperService.GetStateList().then(res => {
      this.statelist = res.data;
    });
    HelperService.GetTableList().then(res => {
      this.tablelist = res.data;
    });
    TableColumnTemplateService.Get(this.$route.params.id).then(res => {
      this.TableColumnTemplate = res.data;
      this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
    });
  },
  methods: {
    SaveData() {
      if (!this.check()) {
        return false;
      }

      TableColumnTemplateService.Update(this.TableColumnTemplate)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "TableColumnTemplate" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    check() {
      var self = this;

      /* if (
        self.TableColumnTemplate.shortname === 0 ||
        self.TableColumnTemplate.shortname === null ||
        self.TableColumnTemplate.shortname === undefined ||
        self.TableColumnTemplate.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TableColumnTemplate.fullname === 0 ||
        self.TableColumnTemplate.fullname === null ||
        self.TableColumnTemplate.fullname === undefined ||
        self.TableColumnTemplate.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

      return true;
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
        this.TableColumnTemplateTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.TableColumnTemplateTranslatePush();
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
    TableColumnTemplateTranslatePush() {
      this.TableColumnTemplate.Translates.push({
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