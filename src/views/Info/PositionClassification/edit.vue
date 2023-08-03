<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('PositionClassification')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="ordernumber" rules="required|max:9">
                  <CInput
                    :placeholder="$t('ordernumber')"
                    autocomplete="ordernumber"
                    horizontal
                    :label="$t('ordernumber')"
                    v-model="PositionClassification.ordernumber"
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
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('nscocode')"
                    autocomplete="nscocode"
                    horizontal
                    :label="$t('nscocode')"
                    v-model="PositionClassification.nscocode"
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
                    v-model="PositionClassification.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="PositionClassification.TranslatableColumns.includes('shortname')"
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
                    v-model="PositionClassification.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="PositionClassification.TranslatableColumns.includes('fullname')"
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="qualificationrank" rules="required|max:9">
                  <CInput
                    :placeholder="$t('qualificationrank')"
                    autocomplete="qualificationrank"
                    horizontal
                    :label="$t('qualificationrank')"
                    v-model="PositionClassification.qualificationrank"
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
                <ValidationProvider v-slot="v" name="mineducation" rules="required|max:9">
                  <CInput
                    :placeholder="$t('mineducation')"
                    autocomplete="mineducation"
                    horizontal
                    :label="$t('mineducation')"
                    v-model="PositionClassification.mineducation"
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
                <ValidationProvider v-slot="v" name="educationdirection" rules="required|max:9">
                  <CInput
                    :placeholder="$t('educationdirection')"
                    autocomplete="educationdirection"
                    horizontal
                    :label="$t('educationdirection')"
                    v-model="PositionClassification.educationdirection"
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
                <ValidationProvider v-slot="v" name="typeid" rules="required|max:9">
                  <CInput
                    :placeholder="$t('typeid')"
                    autocomplete="typeid"
                    horizontal
                    :label="$t('typeid')"
                    v-model="PositionClassification.typeid"
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
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('categoryname')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="staffcategorylist"
                    v-model="PositionClassification.staffcategoryid"
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
                  <label class="col-form-label col-sm-3" for>{{$t('state')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="PositionClassification.stateid"
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
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'PositionClassification'})"
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
import PositionClassificationService from "@/services/PositionClassification.service";
import StaffCategoryService from "@/services/StaffCategory.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      PositionClassification: { TranslatableColumns: [] },
      selectedrowid: 0,
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
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      staffcategorylist: []
    };
  },
  created() {
    var self = this;
    
    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then(res => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
    StaffCategoryService.GetAll().then(res => {
      this.staffcategorylist = res.data;
    });
    PositionClassificationService.Get(self.selectedrowid).then(res => {
      self.PositionClassification = res.data;
    });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.PositionClassification.ordernumber === 0 ||
        self.PositionClassification.ordernumber === null ||
        self.PositionClassification.ordernumber === undefined ||
        self.PositionClassification.ordernumber === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.PositionClassification.nscocode === 0 ||
        self.PositionClassification.nscocode === null ||
        self.PositionClassification.nscocode === undefined ||
        self.PositionClassification.nscocode === ""
      ) {
        this.makeToast(
          this.$t("nscocodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PositionClassification.shortname === 0 ||
        self.PositionClassification.shortname === null ||
        self.PositionClassification.shortname === undefined ||
        self.PositionClassification.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PositionClassification.fullname === 0 ||
        self.PositionClassification.fullname === null ||
        self.PositionClassification.fullname === undefined ||
        self.PositionClassification.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PositionClassification.qualificationrank === 0 ||
        self.PositionClassification.qualificationrank === null ||
        self.PositionClassification.qualificationrank === undefined ||
        self.PositionClassification.qualificationrank === ""
      ) {
        this.makeToast(
          this.$t("qualificationrankNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PositionClassification.mineducation === 0 ||
        self.PositionClassification.mineducation === null ||
        self.PositionClassification.mineducation === undefined ||
        self.PositionClassification.mineducation === ""
      ) {
        this.makeToast(
          this.$t("mineducationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PositionClassification.educationdirection === 0 ||
        self.PositionClassification.educationdirection === null ||
        self.PositionClassification.educationdirection === undefined ||
        self.PositionClassification.educationdirection === ""
      ) {
        this.makeToast(
          this.$t("educationdirectionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PositionClassification.staffcategoryid === 0 ||
        self.PositionClassification.staffcategoryid === null ||
        self.PositionClassification.staffcategoryid === undefined ||
        self.PositionClassification.staffcategoryid === ""
      ) {
        this.makeToast(
          this.$t("StaffcategoryNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PositionClassification.typeid === 0 ||
        self.PositionClassification.typeid === null ||
        self.PositionClassification.typeid === undefined ||
        self.PositionClassification.typeid === ""
      ) {
        this.makeToast(this.$t("TypeNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.PositionClassification.stateid === 0 ||
        self.PositionClassification.stateid === null ||
        self.PositionClassification.stateid === undefined ||
        self.PositionClassification.stateid === ""
      ) {
        this.makeToast(this.$t("stateNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      PositionClassificationService.Update(self.PositionClassification)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "PositionClassification" });
        })
        .catch(error => {
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
      self.translatelist = self.PositionClassification.Translates.filter(
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
      self.PositionClassification.Translates = self.PositionClassification.Translates.filter(
        x => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach(item => {
        self.PositionClassification.Translates.push(item);
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
        solid: true
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    }
  }
};
</script>

<style>
</style>