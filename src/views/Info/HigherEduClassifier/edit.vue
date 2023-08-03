<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HigherEduClassifier')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <ValidationProvider v-slot="v" name="code" rules="required|max:10">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="HigherEduClassifier.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="HigherEduClassifier.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="HigherEduClassifier.TranslatableColumns.includes('shortname')"
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
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="HigherEduClassifier.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="HigherEduClassifier.TranslatableColumns.includes('fullname')"
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
              <CCol sm="2"></CCol>
            </CRow>
          </ValidationObserver>
          <c-row>
            <CCol sm="2"></CCol>
            <c-col sm="8">
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('parent')}}</label>
                    <v-select
                        :options="HigherEduClassifierList"
                        v-model="HigherEduClassifier.parentid"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="fullname"
                        class="col-sm-9"
                    ></v-select>
                </div>
            </c-col>
            <CCol sm="2"></CCol>
          </c-row>
          <c-row>
            <CCol sm="2"></CCol>
            <c-col sm="8">
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('educationtype')}}</label>
                    <v-select
                        :options="educationtypelist"
                        v-model="HigherEduClassifier.educationtypeid"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="fullname"
                        class="col-sm-9"
                    ></v-select>
                </div>
            </c-col>
            <CCol sm="2"></CCol>
          </c-row>
          <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <ValidationProvider v-slot="v" name="educationcode" rules="required|max:9">
                  <CInput
                    :placeholder="$t('educationcode')"
                    autocomplete="educationcode"
                    horizontal
                    :label="$t('educationcode')"
                    v-model="HigherEduClassifier.educationcode"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
          <c-row>
            <CCol sm="2"></CCol>
            <c-col sm="8">
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('isgroup')}}</label>
                    <b-form-checkbox switch class="col-sm-9 mt-1" v-model="HigherEduClassifier.isgroup"></b-form-checkbox>
                </div>
            </c-col>
            <CCol sm="2"></CCol>
          </c-row>
          <c-row>
            <CCol sm="2"></CCol>
            <c-col sm="8">
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('Status')}}</label>
                    <v-select
                        :options="statelist"
                        v-model="HigherEduClassifier.stateid"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        class="col-sm-9"
                    ></v-select>
                </div>
            </c-col>
            <CCol sm="2"></CCol>
          </c-row>
          <hr>
          <CRow>
            <CCol sm="2"></CCol>
            <CCol>
              <div class="form-group form-row">
                <v-select
                    :options="sporttypeclassifierlist"
                    v-model="tabrow.sporttypeclassifierid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="col-sm-12"
                ></v-select>
            </div>
            </CCol>
            <CCol>
              <c-button color="primary" @click="AddRow">
                <b-icon icon="plus"></b-icon> {{ $t("Add") }}
              </c-button>
            </CCol>
            <CCol sm="2"></CCol>
          </CRow>
          <CRow class="mt-2">
            <CCol sm="2"></CCol>
            <CCol>
              <b-table
                :fields="HeadOrgSchoolSubjectTables"
                :items="HigherEduClassifier.Tables"
                class="bg-color-table text-center"
                style="vertical-align:middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template #cell(actions)="{item}">
                  <div class="text-center">
                    <!-- <b-link
                      @click="EditItem(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </b-link> -->
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="DeleteItem(item)"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
                <template #cell(ordernumber)="{index}">
                  <span>{{ index * 1 + 1 }}</span>
                </template>
              </b-table>
            </CCol>
            <CCol sm="2"></CCol>
          </CRow>
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
                @click="$router.push({
                  name : 'HigherEduClassifier',
                  query : {
                    Search : $route.query.Search,
                    PageNumber : $route.query.PageNumber,
                    PageLimit : $route.query.PageLimit
                  }
                })"
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
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import EducationTypeService from "@/services/EducationType.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service"
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      HigherEduClassifier: { TranslatableColumns: [] },
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
      HigherEduClassifierList : [],
      educationtypelist: [],
      HeadOrgSchoolSubjectTables: [
        { key: "ordernumber", label: this.$t("ordernumber") },
        { key: "sporttypeclassifiername", label: this.$t("sporttypeclassifiername"), tdClass: 'text-left' },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        sporttypeclassifierid: '',
        sporttypeclassifiername: "",
        Status: 1,
      },
      sporttypeclassifierlist : []

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
    HigherEduClassifierService.Get(self.selectedrowid).then(res => {
      self.HigherEduClassifier = res.data;
    });
    HigherEduClassifierService.GetAll().then(res => {
        self.HigherEduClassifierList = res.data
    });
    EducationTypeService.GetAll().then(res => {
        self.educationtypelist = res.data
    })
    SportTypeClassifierService.GetAll(this.lang).then((res) => {
      self.sporttypeclassifierlist = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.HigherEduClassifier.code === 0 ||
        self.HigherEduClassifier.code === null ||
        self.HigherEduClassifier.code === undefined ||
        self.HigherEduClassifier.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.HigherEduClassifier.shortname === 0 ||
        self.HigherEduClassifier.shortname === null ||
        self.HigherEduClassifier.shortname === undefined ||
        self.HigherEduClassifier.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HigherEduClassifier.fullname === 0 ||
        self.HigherEduClassifier.fullname === null ||
        self.HigherEduClassifier.fullname === undefined ||
        self.HigherEduClassifier.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    AddRow() {
      var self = this;
      self.tabrow;
      if (
        self.tabrow.sporttypeclassifierid === "" ||
        self.tabrow.sporttypeclassifierid === undefined ||
        self.tabrow.sporttypeclassifierid === null ||
        self.tabrow.sporttypeclassifierid === 0
      ) {
        self.makeToast(
          self.$t("sporttypeclassifierNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      self.tabrow.sporttypeclassifiername = this.sporttypeclassifierlist.filter(e => e.id == self.tabrow.sporttypeclassifierid)[0].name

      if (self.HigherEduClassifier.Tables == null) {
        self.HigherEduClassifier.Tables = []
      }

      self.HigherEduClassifier.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        sporttypeclassifierid: '',
        sporttypeclassifiername: "",
        Status: 1,
      };
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      HigherEduClassifierService.Update(self.HigherEduClassifier)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "HigherEduClassifier",
            query : {
              Search : this.$route.query.Search,
              PageNumber : this.$route.query.PageNumber,
              PageLimit : this.$route.query.PageLimit
            }
          });
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
      self.translatelist = self.HigherEduClassifier.Translates.filter(
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
      self.HigherEduClassifier.Translates = self.HigherEduClassifier.Translates.filter(
        x => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach(item => {
        self.HigherEduClassifier.Translates.push(item);
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