<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('TariffScale')}}</h4>
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
                    horizontal
                    :label="$t('code')"
                    v-model="TariffScale.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="TariffScale.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="TariffScale.TranslatableColumns.includes('shortname')"
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
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="TariffScale.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="TariffScale.TranslatableColumns.includes('fullname')"
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
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('tariffscaletype')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="TariffScaleTypeList"
                      v-model="TariffScale.tariffscaletypeid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('minimumvaluetype')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="MinimumValueTypeList"
                      v-model="TariffScale.minimumvaluetypeid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('state')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="statelist"
                      v-model="TariffScale.stateid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
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
                    :reduce="item => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
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
              :fields="TariffScaleTables"
              :items="TariffScale.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:thead-top>
                <b-tr>
                  <b-th style="width : 40%">
                    <CInput class="mb-0" v-model="tabrow.rankcode"></CInput>
                  </b-th>
                  <b-th style="width : 40%">
                    <v-select
                      :options="statelist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.stateid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:20%" class="text-center">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                      {{$t('Add')}}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(rankcode)="{item}">
                <p v-if="item.Status == 0">{{item.rankcode}}</p>
                <CInput
                  v-if="item.Status == 2 || item.Status == 1"
                  class="mb-2"
                  v-model="item.rankcode"
                ></CInput>
              </template>
              <template v-slot:cell(state)="{item}">
                <p v-if="item.Status == 0">{{item.state}}</p>
                <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                  :options="statelist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.stateid"
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
                @click="$router.push({name : 'TariffScale'})"
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
import TariffScaleService from "@/services/TariffScale.service";
export default {
  data() {
    return {
      TariffScale: {TranslatableColumns: []},
      selectedrowid: 0,

      lang: "",
      TariffScaleTypeList: [],
      MinimumValueTypeList: [],
      statelist: [],
      translatemodal: false,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" }
      ],
      translatelist: [],
      languagelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: ""
      },
      translatebyname: "",
      items1: [],
      items2: [],
      items: [],
      TranslateModal: false,
      LanguageList: [],
      
      TranslatebyName: "shortname",
      TariffScaleTables: [
        { key: "rankcode", label: this.$t("rankcode") },
        { key: "state", label: this.$t("status") },
        { key: "actions", label: this.$t("actions") }
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        stateid: 0,
        rankcode: "",
        Status: 1
      },
      SaveLoading: false
    };
  },
  created() {
    var self = this;
    
    self.selectedrowid = self.$route.params.id;
    HelperService.GetTariffScaleTypeList(self.lang).then(res => {
      self.TariffScaleTypeList = res.data;
      (res.data);
    }),
    HelperService.GetLanguageList().then(res => {
      self.languagelist = res.data;
    });
      HelperService.GetMinimumValueTypeList(self.lang).then(res => {
        self.MinimumValueTypeList = res.data;
      });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
   
    TariffScaleService.Get(self.selectedrowid).then(res => {
      self.TariffScale = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.TariffScale.code === 0 ||
        self.TariffScale.code === null ||
        self.TariffScale.code === undefined ||
        self.TariffScale.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.TariffScale.shortname === 0 ||
        self.TariffScale.shortname === null ||
        self.TariffScale.shortname === undefined ||
        self.TariffScale.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TariffScale.fullname === 0 ||
        self.TariffScale.fullname === null ||
        self.TariffScale.fullname === undefined ||
        self.TariffScale.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TariffScale.minimumvaluetypeid === 0 ||
        self.TariffScale.minimumvaluetypeid === null ||
        self.TariffScale.minimumvaluetypeid === undefined ||
        self.TariffScale.minimumvaluetypeid === ""
      ) {
        this.makeToast(
          this.$t("minimumvaluetypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TariffScale.tariffscaletypeid === 0 ||
        self.TariffScale.tariffscaletypeid === null ||
        self.TariffScale.tariffscaletypeid === undefined ||
        self.TariffScale.tariffscaletypeid === ""
      ) {
        this.makeToast(
          this.$t("tariffscaletypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        h;
        return false;
      }
      if (
        self.TariffScale.stateid === 0 ||
        self.TariffScale.stateid === null ||
        self.TariffScale.stateid === undefined ||
        self.TariffScale.stateid === ""
      ) {
        this.makeToast(this.$t("StateNotSelected"), this.$t("Error"), "danger");
        h;
        return false;
      }
      return true;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.TariffScale.Translates.filter(
        item => item.columnname == selectcolumnname
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
        self.translatelist.forEach(item => {
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
            translatetext: ""
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.TariffScale.Translates = self.TariffScale.Translates.filter(
        x => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach(item => {
        self.TariffScale.Translates.push(item);
      });
      self.translatemodal = false;
    },
    
    Add(data) {
      var self = this;

      if (
        self.tabrow.stateid === "" ||
        self.tabrow.stateid === undefined ||
        self.tabrow.stateid === null ||
        self.tabrow.stateid === 0
      ) {
        self.makeToast(self.$t("StatusNotCorrect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow.rankcode === "" ||
        self.tabrow.rankcode === undefined ||
        self.tabrow.rankcode === null ||
        self.tabrow.rankcode === 0
      ) {
        self.makeToast(
          self.$t("rankcodeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.TariffScale.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        stateid: 0,
        rankcode: "",
        Status: 1
      };
    },
    EditItem(item) {
      item.Status = 2;
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }

      TariffScaleService.Update(self.TariffScale)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "TariffScale" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
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