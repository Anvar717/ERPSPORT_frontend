<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('University')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    :label="$t('code')"
                    v-model="University.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                  <label for>{{$t('country')}}</label>
                  <v-select
                    :options="countrylist"
                    v-model="University.countryid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="changeCountry"
                  ></v-select>
              </CCol>
              <CCol>
                  <label for>{{$t('oblast')}}</label>
                  <v-select
                    :options="oblastlist"
                    v-model="University.oblastid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
              </CCol>
              
            </CRow>
            <CRow>
              <CCol>
                <CInput
                  :placeholder="$t('shortname')"
                  autocomplete="text"
                  :label="$t('shortname')"
                  v-model="University.shortname"
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

              <CCol>
                <CInput
                  :placeholder="$t('fullname')"
                  autocomplete="text"
                  :label="$t('fullname')"
                  v-model="University.fullname"
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
              <CCol>
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label"
                  >{{$t('AllowanCeperc')}}</label>
                    <custom-number-input v-model="University.allowanceperc"></custom-number-input>
              </CCol>
              
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="allowancenormdoc" rules="required">
                  <CInput
                    :placeholder="$t('AllowanCenormDoc')"
                    autocomplete="allowancenormdoc"
                    :label="$t('AllowanCenormDoc')"
                    v-model="University.allowancenormdoc"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <label
                      for="datepicker-dateformat2"
                    >{{$t('DateofAdopted')}}</label>
                      <date-picker
                        v-model="University.dateofadopted"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('docdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                      </date-picker>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="adoptnormdoc" rules="required">
                  <CInput
                    :placeholder="$t('AdoptNormDoc')"
                    autocomplete="adoptnormdoc"
                    :label="$t('AdoptNormDoc')"
                    v-model="University.adoptnormdoc"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              
            </CRow>
            <CRow>
              <CCol>
                  <label for>{{$t('status')}}</label>
                  <v-select
                    :options="statelist"
                    v-model="University.stateid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
              </CCol>
              <CCol></CCol>
              <CCol></CCol>
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
                <b-th style="width:10%" class="text-center">
                  <CButton
                    @click="AddItem"
                    color="primary"
                    variant="outline"
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
            <h4 class="text-center">{{$t('UniversityOldName')}}</h4>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <b-table
              :fields="fieldsMainTable"
              :items="itemsMainTable"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:thead-top>
                <b-tr>
                  <b-th style="width:14%">
                    <date-picker
                      v-model="Tables.ondate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('ondate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </b-th>
                  <b-th style="width:20">
                    <CInput class="mb-0" v-model="Tables.shortname"></CInput>
                  </b-th>
                  <b-th style="width:25%">
                    <CInput class="mb-0" v-model="Tables.fullname"></CInput>
                  </b-th>
                  <b-th style="width:36%">
                    <CInput class="mb-0" v-model="Tables.adoptnormdoc"></CInput>
                  </b-th>
                  <b-th style="width:7%">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(ondate)="{item}">
                <p v-if="item.Status == 0">{{item.ondate}}</p>
                <date-picker
                  v-model="item.ondate"
                  v-if="item.Status == 1 || item.Status == 2"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('ondate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </template>
              <template v-slot:cell(shortname)="{item}">
                <p v-if="item.Status == 0">{{item.shortname}}</p>
                <CInput
                  v-if="item.Status == 1 || item.Status == 2"
                  class="mb-2"
                  v-model="item.shortname"
                ></CInput>
              </template>
              <template v-slot:cell(fullname)="{item}">
                <p v-if="item.Status == 0">{{item.fullname}}</p>
                <CInput
                  v-if="item.Status == 1 || item.Status == 2"
                  class="mb-2"
                  v-model="item.fullname"
                ></CInput>
              </template>
              <template v-slot:cell(adoptnormdoc)="{item}">
                <p v-if="item.Status == 0">{{item.adoptnormdoc}}</p>
                <CInput
                  v-if="item.Status == 1 || item.Status == 2"
                  class="mb-2"
                  v-model="item.adoptnormdoc"
                ></CInput>
              </template>
              <template v-slot:cell(actions)="{item}">
                <CButtonGroup class="mx-auto d-block text-center" size="sm">
                  <CButton variant="outline" color="primary" @click="EditItem(item)">
                    <b-icon icon="pencil"></b-icon>
                  </CButton>
                  <CButton variant="outline" color="danger" @click="DeleteItem(item)">
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </CButtonGroup>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'University'})"
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
import UniversityService from "@/services/University.service";
import CountryService from "@/services/Country.service"; 
import OblastService from "@/services/Oblast.service";
export default {
  data() {
    return {
      SaveLoading: false,
      University: {
        code: "",
        stateid: "",
        shortname: "",
        fullname: "",
        allowanceperc: "",
        allowancenormdoc: "",
        dateofadopted: "",
        adoptnormdoc: "",
        stateid: "",
        Tables: []
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
      lang: "",
      fieldsMainTable: [
        { key: "ondate", label: this.$t("ondate") },
        { key: "shortname", label: this.$t("shortname") },
        { key: "fullname", label: this.$t("fullname") },
        { key: "adoptnormdoc", label: this.$t("AdoptNormDoc") },
        { key: "actions", label: this.$t("actions") }
      ],
      itemsMainTable: [],
      Tables: {
        id: 0,
        ownerid: 0,
        ondate: "",
        shortname: "",
        fullname: "",
        adoptnormdoc: ""
      },
      countrylist : [],
      oblastlist : []
    };
  },
  created() {
    this.lang = localStorage.getItem('locale') || 'ru'
    UniversityService.Get(this.$route.params.id).then(res => {
      this.University = res.data;
      this.itemsMainTable = res.data.Tables;
      this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
        this.getCountryList()
        this.getOblastList()
    });
    HelperService.GetLanguageList().then(res => {
      this.LanguageList = res.data;
    });
    
    
    HelperService.GetStateList().then(res => {
      this.statelist = res.data;
    });
  },
  computed: {},
  methods: {
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    getCountryList(){
      CountryService.GetAll().then((res) => {
        this.countrylist = res.data;
      });
    },
    getOblastList(){
      if(!!this.University.countryid){
        OblastService.GetAll(this.lang, this.University.countryid).then((res) => {
          this.oblastlist = res.data;
        });
      }
    },
    changeCountry(){
      this.University.oblastid = 0
      this.getOblastList()
    },
    Add() {
      var self = this;

      if (
        this.Tables.ondate === 0 ||
        this.Tables.ondate === null ||
        this.Tables.ondate === undefined ||
        this.Tables.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        this.Tables.shortname === 0 ||
        this.Tables.shortname === null ||
        this.Tables.shortname === undefined ||
        this.Tables.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables.fullname === 0 ||
        this.Tables.fullname === null ||
        this.Tables.fullname === undefined ||
        this.Tables.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables.adoptnormdoc === 0 ||
        this.Tables.adoptnormdoc === null ||
        this.Tables.adoptnormdoc === undefined ||
        this.Tables.adoptnormdoc === ""
      ) {
        this.makeToast(
          this.$t("adoptnormdocNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      this.itemsMainTable.push({
        id: this.Tables.id,
        ownerid: this.Tables.ownerid,
        ondate: this.Tables.ondate,
        shortname: this.Tables.shortname,
        fullname: this.Tables.fullname,
        adoptnormdoc: this.Tables.adoptnormdoc,
        Status: 1
      });
      this.Tables = {};
    },

    EditItem(item) {
      item.Status = 2;
    },
    DeleteItem(item) {
      item.Status = 3;
    },

    check() {
      var self = this;
      if (
        self.University.dateofadopted === 0 ||
        self.University.dateofadopted === null ||
        self.University.dateofadopted === undefined ||
        self.University.dateofadopted === ""
      ) {
        this.makeToast(
          this.$t("dateofadoptedNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.University.code === 0 ||
        self.University.code === null ||
        self.University.code === undefined ||
        self.University.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.University.countryid === 0 ||
        self.University.countryid === null ||
        self.University.countryid === undefined ||
        self.University.countryid === ""
      ) {
        this.makeToast(this.$t("countryNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.University.shortname === 0 ||
        self.University.shortname === null ||
        self.University.shortname === undefined ||
        self.University.shortname === ""
      ) {
        this.makeToast(
          this.$t("ShortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.University.fullname === 0 ||
        self.University.fullname === null ||
        self.University.fullname === undefined ||
        self.University.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.University.allowanceperc === null ||
        self.University.allowanceperc === undefined ||
        self.University.allowanceperc === ""
      ) {
        this.makeToast(
          this.$t("allowancepercNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.University.allowancenormdoc === 0 ||
        self.University.allowancenormdoc === null ||
        self.University.allowancenormdoc === undefined ||
        self.University.allowancenormdoc === ""
      ) {
        this.makeToast(
          this.$t("allowancenormdocNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.University.adoptnormdoc === 0 ||
        self.University.adoptnormdoc === null ||
        self.University.adoptnormdoc === undefined ||
        self.University.adoptnormdoc === ""
      ) {
        this.makeToast(
          this.$t("adoptnormdocNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.University.stateid === 0 ||
        self.University.stateid === null ||
        self.University.stateid === undefined ||
        self.University.stateid === ""
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
      this.CheckItemDelete();
      this.University.Tables = this.itemsMainTable;
      UniversityService.Update(this.University)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "University" });
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
        this.UniversityTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.UniversityTranslatePush();
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
    UniversityTranslatePush() {
      this.University.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          item => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName
      });
    },
    CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          (this.itemsMainTable[i].Status == 3 &&
            this.itemsMainTable[i].personid == "") ||
          this.itemsMainTable[i].schoolsubjectid == ""
        ) {
          this.itemsMainTable.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style>
</style>






<div class="form-group form-row">
    <label for="datepicker-dateformat2" class="col-form-label col-sm-3"> {{$t('docdate')}} </label>
    <div class="col-sm-9">
        <custom-number-input></custom-number-input>
    </div>
</div>