<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('Kitchen')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="Kitchen.code"
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
                    v-model="Kitchen.shortname"
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
                    v-model="Kitchen.fullname"
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
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('status')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="Kitchen.stateid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
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
                    <v-select
                      :options="organizationaccountlist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="code"
                      v-model="Tables.organizationaccountid"
                    ></v-select>
                  </b-th>

                  <b-th style="width:7%">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(code)="{item}">
                <p v-if="item.Status == 0">{{item.code}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="organizationaccountlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="code"
                  v-model="item.organizationaccountid"
                  class="mb-2"
                ></v-select>
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
                @click="$router.push({name : 'Kitchen'})"
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
import OrganizationService from "@/services/organization.service";
import HelperService from "@/services/helper.service";
import KitchenService from "@/services/Kitchen.service";
export default {
  data() {
    return {
      SaveLoading: false,
      Kitchen: {},
      selectedrowid: 0,
      organizationaccountlist: [],
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
      fieldsMainTable: [
        {
          key: "organizationaccountcode",
          label: this.$t("organizationaccountcode")
        },
        { key: "actions", label: this.$t("actions") }
      ],
      itemsMainTable: [],
      Tables: {
        id: 0,
        ownerid: 0,
        organizationaccountid: 0,
        organizationaccountcode: "",
        Status: 1
      }
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;
    KitchenService.Get(self.$route.params.id).then(res => {
      self.Kitchen = res.data;
      self.itemsMainTable = res.data.Tables;
      self.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      self.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
    });
    HelperService.GetLanguageList().then(res => {
      self.LanguageList = res.data;
    });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
    OrganizationService.GetOrganizationAccountList().then(res => {
      self.organizationaccountlist = res.data;
    });
  },
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
    Add() {
      var self = this;

      if (
        self.Tables.organizationaccountid === 0 ||
        self.Tables.organizationaccountid === null ||
        self.Tables.organizationaccountid === undefined ||
        self.Tables.organizationaccountid === ""
      ) {
        self.makeToast(
          self.$t("organizationaccountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.Tables.organizationaccountcode = self.organizationaccountlist.filter(
        function(item) {
          if (item.id === self.Tables.organizationaccountid) return item;
        }
      )[0].code;
      self.itemsMainTable.push(self.Tables);
      self.Tables = {
        id: 0,
        ownerid: 0,
        organizationaccountid: 0,
        organizationaccount: "",
        Status: 1
      };
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
        self.Kitchen.code === 0 ||
        self.Kitchen.code === null ||
        self.Kitchen.code === undefined ||
        self.Kitchen.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.Kitchen.shortname === 0 ||
        self.Kitchen.shortname === null ||
        self.Kitchen.shortname === undefined ||
        self.Kitchen.shortname === ""
      ) {
        this.makeToast(
          this.$t("ShortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Kitchen.fullname === 0 ||
        self.Kitchen.fullname === null ||
        self.Kitchen.fullname === undefined ||
        self.Kitchen.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Kitchen.stateid === 0 ||
        self.Kitchen.stateid === null ||
        self.Kitchen.stateid === undefined ||
        self.Kitchen.stateid === ""
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

      this.Kitchen.Tables = this.itemsMainTable;
      KitchenService.Update(this.Kitchen)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "Kitchen" });
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
        this.KitchenTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.KitchenTranslatePush();
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
    KitchenTranslatePush() {
      this.Kitchen.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          item => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName
      });
    }
  }
};
</script>

<style>
</style>





