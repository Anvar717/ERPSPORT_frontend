<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('SchHourlyPayRate')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="SchHourlyPayRate.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="startdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="SchHourlyPayRate.docdate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('docdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="SchHourlyPayRate.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
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
                  <b-th style="width:40%">
                    <v-select
                      :options="organizationtypelist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.organizationtypeid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:40%">
                    <v-select
                      :options="qualificationcategorylist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.qualificationcategoryid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:15%">
                    <CInput class="mb-0" v-model="Tables.coef"></CInput>
                  </b-th>
                  <b-th style="width:5%">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(organizationtype)="{item}">
                <p v-if="item.Status == 0">{{item.organizationtype}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="organizationtypelist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.organizationtypeid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(qualificationcategory)="{item}">
                <p v-if="item.Status == 0">{{item.qualificationcategory}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="qualificationcategorylist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.qualificationcategoryid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(coef)="{item}">
                <p v-if="item.Status == 0">{{item.coef}}</p>
                <CInput
                  v-if="item.Status == 1 || item.Status == 2"
                  class="mb-2"
                  v-model="item.coef"
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
                @click="$router.push({name : 'SchHourlyPayRate'})"
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
import SchHourlyPayRateService from "@/services/SchHourlyPayRate.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
export default {
  data() {
    return {
      SaveLoading: false,
      SchHourlyPayRate: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables: []
      },
      organizationtypelist: [],
      qualificationcategorylist: [],
      lang: "",
      fieldsMainTable: [
        {
          key: "organizationtypename",
          label: this.$t("OrganizationType")
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("QualificationCategory")
        },
        {
          key: "coef",
          label: this.$t("percent")
        },
        {
          key: "actions",
          label: this.$t("actions")
        }
      ],
      itemsMainTable: [],
      Tables: {
        id: 0,
        ownerid: 0,
        organizationtypeid: "",
        qualificationcategoryid: "",
        coef: "",
        detailinfo: ""
      }
    };
  },
  created() {
    QualificationCategoryService.GetAll().then(res => {
      this.qualificationcategorylist = res.data;
    });
    OrganizationTypeService.GetAll().then(res => {
      this.organizationtypelist = res.data;
    });
    SchHourlyPayRateService.Get(this.$route.params.id).then(res => {
      this.SchHourlyPayRate = res.data;
      this.itemsMainTable = res.data.Tables;
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
    Add() {
      if (
        this.Tables.organizationtypeid === null ||
        this.Tables.organizationtypeid === undefined ||
        this.Tables.organizationtypeid === 0 ||
        this.Tables.organizationtypeid === ""
      ) {
        this.makeToast(
          this.$t("OrganizationTypeNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables.qualificationcategoryid === null ||
        this.Tables.qualificationcategoryid === undefined ||
        this.Tables.qualificationcategoryid === 0 ||
        this.Tables.qualificationcategoryid === ""
      ) {
        this.makeToast(
          this.$t("QualificationCategoryNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables.coef === null ||
        this.Tables.coef === undefined ||
        this.Tables.coef === 0 ||
        this.Tables.coef === ""
      ) {
        this.makeToast(this.$t("percentNotSelect"), this.$t("Error"), "danger");
        return false;
      }

      this.itemsMainTable.push({
        id: this.Tables.id,
        ownerid: this.Tables.ownerid,
        organizationtypeid: this.Tables.organizationtypeid,
        organizationtypename : this.Tables.organizationtypeid ? this.organizationtypelist.filter(item => item.id === this.Tables.organizationtypeid)[0].name : '',
        qualificationcategoryid: this.Tables.qualificationcategoryid,
        qualificationcategoryname : this.Tables.qualificationcategoryid ?  this.qualificationcategorylist.filter(item => item.id === this.Tables.qualificationcategoryid)[0].name : '',
        coef: this.Tables.coef,
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
      if (self.SchHourlyPayRate.Tables.length == 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SchHourlyPayRate.docnumber === null ||
        self.SchHourlyPayRate.docnumber === undefined ||
        self.SchHourlyPayRate.docnumber === 0
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchHourlyPayRate.docdate === null ||
        self.SchHourlyPayRate.docdate === undefined ||
        self.SchHourlyPayRate.docdate === 0
      ) {
        this.makeToast(
          this.$t("schoolyearNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchHourlyPayRate.detailinfo === null ||
        self.SchHourlyPayRate.detailinfo === undefined ||
        self.SchHourlyPayRate.detailinfo === 0
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.CheckItemDelete();
      this.SchHourlyPayRate.Tables = this.itemsMainTable;
      SchHourlyPayRateService.Update(this.SchHourlyPayRate)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "SchHourlyPayRate"
          });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          this.itemsMainTable[i].Status == 3 &&
          this.itemsMainTable[i].organizationtypeid == ""
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


