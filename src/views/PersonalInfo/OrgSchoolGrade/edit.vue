<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("OrgSchoolGrade") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="code"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="OrgSchoolGrade.code"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
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
                  <label class="col-form-label col-sm-3" for>{{
                    $t("SchoolGrade")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="schoolgradelist"
                    v-model="OrgSchoolGrade.schoolgradeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeFillNames"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("SchoolGradeLetter")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="schoolgradeletterlist"
                    v-model="OrgSchoolGrade.schoolgradeletterid"
                    :reduce="(item) => item.id"
                    @input="ChangeFillNames"
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
                  <label class="col-form-label col-sm-3" for>{{
                    $t("OrganizationBranch")
                  }}</label>
                 <v-select
                 class="col-sm-9"
                    :options="OrganizationBranchList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="FillNames"
                    v-model="OrgSchoolGrade.organizationbranchid"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="shortname"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    disabled
                    :label="$t('shortname')"
                    v-model="OrgSchoolGrade.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
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
                <ValidationProvider v-slot="v" name="fullname" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    disabled
                    :label="$t('fullname')"
                    v-model="OrgSchoolGrade.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
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
                  <label class="col-form-label col-sm-3" for>{{
                    $t("Status")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="OrgSchoolGrade.stateid"
                    :reduce="(item) => item.id"
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
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton class="ml-4" size="sm" color="danger" @click="Back">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
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
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import OrganizationBranchService from '@/services/organizationbranch.service';
export default {
  data() {
    return {
      SaveLoading: false,
      OrgSchoolGrade: {
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
      OrganizationBranchList : [],
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
      schoolgradelist: [],
      schoolgradeletterlist: [],
    };
  },
  created() {
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    SchoolGradeLetterService.GetAll().then((res) => {
      this.schoolgradeletterlist = res.data;
    });
    OrganizationBranchService.GetAll().then(res => {
      this.OrganizationBranchList = res.data
    })
    SchoolGradeService.GetAll().then((res) => {
      this.schoolgradelist = res.data;
    });
    OrgSchoolGradeService.Get(this.$route.params.id).then((res) => {
      this.OrgSchoolGrade = res.data;
      this.items1 =
        res.data.Translates.filter((item) => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter((item) => item.columnname == "fullname") ||
        [];
    });
  },
  methods: {
    Back() {
      this.$router.push({
        name: "OrgSchoolGrade",
        query: {
          schoolgradeid: this.$route.query.schoolgradeid,
        },
      });
    },
    FillNames() {
      if (
        !!this.OrgSchoolGrade.schoolgradeid &&
        !!this.OrgSchoolGrade.schoolgradeletterid &&
        !!this.OrgSchoolGrade.organizationbranchid
      ) {
        // this.OrgSchoolGrade.schoolgradename = this.schoolgradelist.filter(item => item.id === this.OrgSchoolGrade.schoolgradeid)[0].name
        this.OrgSchoolGrade.schoolgradelettername = this.schoolgradeletterlist.filter(
          (item) => item.id === this.OrgSchoolGrade.schoolgradeletterid
        )[0].name;
        this.OrgSchoolGrade.organizationbranchname = this.OrganizationBranchList.filter(
          (item) => item.id === this.OrgSchoolGrade.organizationbranchid
        )[0].name;
        if(this.OrgSchoolGrade.schoolgradeid != 13){
          this.OrgSchoolGrade.fullname =
          this.OrgSchoolGrade.schoolgradeid +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername +
          " класс" +  " " + "(" + this.OrgSchoolGrade.organizationbranchname + ")";
        this.OrgSchoolGrade.shortname =
          this.OrgSchoolGrade.schoolgradeid +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername
          +  " " + "(" + this.OrgSchoolGrade.organizationbranchname + ")";
        }
        else{
          this.OrgSchoolGrade.fullname =
          "Подготовительный класс" +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername +
          " класс" +  " " + "(" + this.OrgSchoolGrade.organizationbranchname + ")";
        this.OrgSchoolGrade.shortname =
          "Подготовительный класс" +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername
          +  " " + "(" + this.OrgSchoolGrade.organizationbranchname + ")";
        }
      }
    },
    ChangeFillNames() {
      if (
        !!this.OrgSchoolGrade.schoolgradeid &&
        !!this.OrgSchoolGrade.schoolgradeletterid
      ) {
        // this.OrgSchoolGrade.schoolgradename = this.schoolgradelist.filter(item => item.id === this.OrgSchoolGrade.schoolgradeid)[0].name
        this.OrgSchoolGrade.schoolgradelettername = this.schoolgradeletterlist.filter(
          (item) => item.id === this.OrgSchoolGrade.schoolgradeletterid
        )[0].name;
        if(this.OrgSchoolGrade.schoolgradeid != 13){
          this.OrgSchoolGrade.fullname =
          this.OrgSchoolGrade.schoolgradeid +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername +
          " класс";
        this.OrgSchoolGrade.shortname =
          this.OrgSchoolGrade.schoolgradeid +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername;
        }
        else{
          this.OrgSchoolGrade.fullname =
           "Подготовительный класс" +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername +
          " класс";
        this.OrgSchoolGrade.shortname =
           "Подготовительный класс" +
          "-" +
          this.OrgSchoolGrade.schoolgradelettername;
        }
      }
    },
    check() {
      var self = this;
      if (
        self.OrgSchoolGrade.code === 0 ||
        self.OrgSchoolGrade.code === null ||
        self.OrgSchoolGrade.code === undefined ||
        self.OrgSchoolGrade.code === ""
      ) {
        this.makeToast(this.$t("codetNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.OrgSchoolGrade.shortname === 0 ||
        self.OrgSchoolGrade.shortname === null ||
        self.OrgSchoolGrade.shortname === undefined ||
        self.OrgSchoolGrade.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGrade.fullname === 0 ||
        self.OrgSchoolGrade.fullname === null ||
        self.OrgSchoolGrade.fullname === undefined ||
        self.OrgSchoolGrade.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGrade.schoolgradeid === 0 ||
        self.OrgSchoolGrade.schoolgradeid === null ||
        self.OrgSchoolGrade.schoolgradeid === undefined ||
        self.OrgSchoolGrade.schoolgradeid === ""
      ) {
        this.makeToast(
          this.$t("schoolgradeNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGrade.schoolgradeletterid === 0 ||
        self.OrgSchoolGrade.schoolgradeletterid === null ||
        self.OrgSchoolGrade.schoolgradeletterid === undefined ||
        self.OrgSchoolGrade.schoolgradeletterid === ""
      ) {
        this.makeToast(
          this.$t("schoolgradeletterNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgSchoolGrade.stateid === 0 ||
        self.OrgSchoolGrade.stateid === null ||
        self.OrgSchoolGrade.stateid === undefined ||
        self.OrgSchoolGrade.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotSelect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      OrgSchoolGradeService.Update(this.OrgSchoolGrade)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "OrgSchoolGrade" });
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
        this.OrgSchoolGradeTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.OrgSchoolGradeTranslatePush();
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
    OrgSchoolGradeTranslatePush() {
      this.OrgSchoolGrade.Translates.push({
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

<style></style>
