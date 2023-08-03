<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('OrgStateInfo')}}</h4>
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
                    v-model="OrgStateInfo.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <custom-date-picker
                        v-model="OrgStateInfo.docdate"
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
                      </custom-date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="Organization" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('Organization')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationlist"
                      v-model="OrgStateInfo.organizationid"
                      :reduce="item => item.id"
                      @input="organizationchange"
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
                <ValidationProvider v-slot="v" name="ParentOrganization" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('ParentOrganization')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationlist"
                      v-model="OrgStateInfo.parentorgid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="shortname"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="shortname" rules="required|max:100">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="shortname"
                    horizontal
                    :label="$t('shortname')"
                    v-model="OrgStateInfo.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="fullname" rules="required|max:100">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="fullname"
                    horizontal
                    :label="$t('fullname')"
                    v-model="OrgStateInfo.fullname"
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
                <ValidationProvider v-slot="v" name="inn" rules="required|max:9">
                  <CInput
                    disabled
                    :placeholder="$t('inn')"
                    autocomplete="inn"
                    horizontal
                    :label="$t('inn')"
                    v-model="OrgStateInfo.inn"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="oblast" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('oblastid')}}</label>
                    <v-select
                      @input="ChangeOblast"
                      class="col-sm-9"
                      :options="oblastlist"
                      v-model="OrgStateInfo.oblastid"
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
                <ValidationProvider v-slot="v" name="region" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('regionid')}}</label>
                    <v-select
                      @input="ChangeRegion"
                      class="col-sm-9"
                      :options="regionlist"
                      v-model="OrgStateInfo.regionid"
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
                <ValidationProvider v-slot="v" name="mfy" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('mfyid')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="mfylist"
                      v-model="OrgStateInfo.mfyid"
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
                <ValidationProvider v-slot="v" name="address" rules="required|max:100">
                  <CInput
                    :placeholder="$t('address')"
                    autocomplete="address"
                    horizontal
                    :label="$t('address')"
                    v-model="OrgStateInfo.address"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="organizationtype" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('organizationtype')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationtypelist"
                      v-model="OrgStateInfo.organizationtypeid"
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
                <ValidationProvider v-slot="v" name="schoollegalform" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('schoollegalform')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schoollegalformlist"
                      v-model="OrgStateInfo.schoollegalformid"
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
                <ValidationProvider v-slot="v" name="oked" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('oked')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="okedlist"
                      v-model="OrgStateInfo.okedid"
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
                <ValidationProvider v-slot="v" name="schoolgroupcontingent" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('schoolgroupcontingent')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schoolgroupcontingentlist"
                      v-model="OrgStateInfo.schoolgroupcontingentid"
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
                <ValidationProvider v-slot="v" name="schooltype" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('schooltype')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schooltypelist"
                      v-model="OrgStateInfo.schooltypeid"
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
                <ValidationProvider v-slot="v" name="director" rules="required|max:40">
                  <CInput
                    :placeholder="$t('director')"
                    autocomplete="director"
                    horizontal
                    :label="$t('director')"
                    v-model="OrgStateInfo.director"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="accounter" rules="required|max:40">
                  <CInput
                    :placeholder="$t('accounter')"
                    autocomplete="accounter"
                    horizontal
                    :label="$t('accounter')"
                    v-model="OrgStateInfo.accounter"
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
              <CCol sm="1"></CCol>
              <CCol sm="1">
                <div class="form-group form-row">
                  <label class="col-form-label" for>{{$t('isreconstructed')}}</label>
                  <b-form-checkbox v-model="OrgStateInfo.isreconstructed" switch class="mt-1 ml-1"></b-form-checkbox>
                </div>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>

        <label style="text-align:center" for>{{$t('ChooseSpecSubject')}}</label>

        <CRow>
          <CCol>
            <b-table
              :fields="OrgStateInfoTables"
              :items="OrgStateInfo.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-if="OrgStateInfo.CanSave" v-slot:thead-top>
                <b-tr>
                  <b-th style="width:14%">
                    <v-select
                      :options="schoolsubjectlist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolsubjectid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:20%">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(schoolsubject)="{item}">
                <p v-if="item.Status == 0">{{item.schoolsubject}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="schoolsubjectlist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.schoolsubjectid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(actions)="{item}">
                <CButtonGroup
                  v-if="OrgStateInfo.CanSave"
                  class="mx-auto d-block text-center"
                  size="sm"
                >
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
                @click="$router.push({name : 'OrgStateInfo'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="OrgStateInfo.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
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
import OrgStateInfoService from "@/services/OrgStateInfo.service";
import OrganizationService from "@/services/organization.service";
import HelperService from "@/services/helper.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import MfyService from "@/services/Mfy.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import SchoolGroupContingentService from "@/services/SchoolGroupContingent.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OkedService from "@/services/Oked.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import CustomDatePicker from "@/components/customDatePicker.vue";

export default {
  components: {
    CustomDatePicker
  },
  data() {
    return {
      SaveLoading: false,
      OrgStateInfo: {},
      selectedrowid: 0,
      organizationlist: [],
      oblastlist: [],
      regionlist: [],
      mfylist: [],
      organizationtypelist: [],
      schoollegalformlist: [],
      okedlist: [],
      schoolgroupcontingentlist: [],
      schooltypelist: [],
      schoolsubjectlist: [],
      OrgStateInfoTables: [
        {
          key: "schoolsubject",
          label: this.$t("schoolsubject")
        },

        { key: "actions", label: this.$t("actions") }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        Status: 1
      },
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;

    OrgStateInfoService.Get(self.selectedrowid).then(res => {
      self.OrgStateInfo = res.data;
      self.GetOblastList();
      self.GetRegionList(self.OrgStateInfo.oblastid);
      self.GetMfyList(self.OrgStateInfo.regionid);
    });

    SchoolLegalFormService.GetAll().then(res => {
      self.schoollegalformlist = res.data;
    });
    SchoolGroupContingentService.GetAll().then(res => {
      self.schoolgroupcontingentlist = res.data;
    });
    OrganizationTypeService.GetAll().then(res => {
      self.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then(res => {
      self.schooltypelist = res.data;
    });
    OkedService.GetAll().then(res => {
      self.okedlist = res.data;
    });
    OrganizationService.GetAll().then(res => {
      self.organizationlist = res.data;
    });
    SchoolSubjectService.GetAll().then(res => {
      self.schoolsubjectlist = res.data;
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
    organizationchange() {
      var self = this;
      HelperService.GetOrganizationData(self.OrgStateInfo.organizationid).then(
        res => {
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.shortname = res.data[0].shortname;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.fullname = res.data[0].fullname;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.inn = res.data[0].inn;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.oblastid = res.data[0].oblastid;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.regionid = res.data[0].regionid;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.mfyid = res.data[0].mfyid;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.mfyid = res.data[0].mfyid;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.organizationtypeid =
              res.data[0].organizationtypeid;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.schoollegalformid = res.data[0].schoollegalformid;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.address = res.data[0].adress;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.okedid = res.data[0].okedid;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.director = res.data[0].director;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.accounter = res.data[0].accounter;
          }
          if (!!res.data && res.data.length > 0) {
            self.OrgStateInfo.schooltypeid = res.data[0].schooltypeid;
          }
          self.GetRegionList(self.OrgStateInfo.oblastid);
          self.GetMfyList(self.OrgStateInfo.regionid);
        }
      );
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
        self.tabrow.schoolsubjectid === "" ||
        self.tabrow.schoolsubjectid === undefined ||
        self.tabrow.schoolsubjectid === null ||
        self.tabrow.schoolsubjectid === 0
      ) {
        this.makeToast(
          this.$t("schoolsubjectNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.OrgStateInfo.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        organizationaccountid: 0,
        calculationkindid: 0,
        insum: 0,
        percentage: 0,
        outsum: 0,
        Status: 1
      };
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
        self.OrgStateInfo.docnumber === 0 ||
        self.OrgStateInfo.docnumber === null ||
        self.OrgStateInfo.docnumber === undefined ||
        self.OrgStateInfo.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.docdate === 0 ||
        self.OrgStateInfo.docdate === null ||
        self.OrgStateInfo.docdate === undefined ||
        self.OrgStateInfo.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.organizationid === 0 ||
        self.OrgStateInfo.organizationid === null ||
        self.OrgStateInfo.organizationid === undefined ||
        self.OrgStateInfo.organizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.shortname === 0 ||
        self.OrgStateInfo.shortname === null ||
        self.OrgStateInfo.shortname === undefined ||
        self.OrgStateInfo.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.fullname === 0 ||
        self.OrgStateInfo.fullname === null ||
        self.OrgStateInfo.fullname === undefined ||
        self.OrgStateInfo.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.inn === 0 ||
        self.OrgStateInfo.inn === null ||
        self.OrgStateInfo.inn === undefined ||
        self.OrgStateInfo.inn === ""
      ) {
        this.makeToast(this.$t("innNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.OrgStateInfo.oblastid === 0 ||
        self.OrgStateInfo.oblastid === null ||
        self.OrgStateInfo.oblastid === undefined ||
        self.OrgStateInfo.oblastid === ""
      ) {
        this.makeToast(
          this.$t("oblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.regionid === 0 ||
        self.OrgStateInfo.regionid === null ||
        self.OrgStateInfo.regionid === undefined ||
        self.OrgStateInfo.regionid === ""
      ) {
        this.makeToast(
          this.$t("regionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.address === 0 ||
        self.OrgStateInfo.address === null ||
        self.OrgStateInfo.address === undefined ||
        self.OrgStateInfo.address === ""
      ) {
        this.makeToast(
          this.$t("addressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.organizationtypeid === 0 ||
        self.OrgStateInfo.organizationtypeid === null ||
        self.OrgStateInfo.organizationtypeid === undefined ||
        self.OrgStateInfo.organizationtypeid === ""
      ) {
        this.makeToast(
          this.$t("organizationtypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.organizationtypeid === 0 ||
        self.OrgStateInfo.organizationtypeid === null ||
        self.OrgStateInfo.organizationtypeid === undefined ||
        self.OrgStateInfo.organizationtypeid === ""
      ) {
        this.makeToast(
          this.$t("organizationtypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.schoollegalformid === 0 ||
        self.OrgStateInfo.schoollegalformid === null ||
        self.OrgStateInfo.schoollegalformid === undefined ||
        self.OrgStateInfo.schoollegalformid === ""
      ) {
        this.makeToast(
          this.$t("schoollegalformNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.okedid === 0 ||
        self.OrgStateInfo.okedid === null ||
        self.OrgStateInfo.okedid === undefined ||
        self.OrgStateInfo.okedid === ""
      ) {
        this.makeToast(this.$t("okedNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.OrgStateInfo.schoolgroupcontingentid === 0 ||
        self.OrgStateInfo.schoolgroupcontingentid === null ||
        self.OrgStateInfo.schoolgroupcontingentid === undefined ||
        self.OrgStateInfo.schoolgroupcontingentid === ""
      ) {
        this.makeToast(
          this.$t("schoolgroupcontingentNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.schooltypeid === 0 ||
        self.OrgStateInfo.schooltypeid === null ||
        self.OrgStateInfo.schooltypeid === undefined ||
        self.OrgStateInfo.schooltypeid === ""
      ) {
        this.makeToast(
          this.$t("schooltypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.director === 0 ||
        self.OrgStateInfo.director === null ||
        self.OrgStateInfo.director === undefined ||
        self.OrgStateInfo.director === ""
      ) {
        this.makeToast(
          this.$t("directorNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgStateInfo.accounter === 0 ||
        self.OrgStateInfo.accounter === null ||
        self.OrgStateInfo.accounter === undefined ||
        self.OrgStateInfo.accounter === ""
      ) {
        this.makeToast(
          this.$t("accounterNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      OrgStateInfoService.Update(this.OrgStateInfo)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "OrgStateInfo" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    GetOblastList() {
      HelperService.GetOblastList().then(res => {
        this.oblastlist = res.data;
      });
    },
    GetRegionList(oblastid) {
      this.RegionLoading = true;
      if (!!oblastid) {
        RegionService.GetAll(this.lang,oblastid).then(res => {
          this.regionlist = res.data;
          this.RegionLoading = false;
        });
      } else {
        this.regionlist = [];
        this.RegionLoading = false;
      }
    },
    ChangeOblast() {
      if (this.OrgStateInfo.regionid > 0) {
        this.OrgStateInfo.regionid = "";
        this.mfylist = [];
        //this.regionlist= [];
        //this.RegionLoading  = false;
      }
      this.GetRegionList(this.OrgStateInfo.oblastid);
    },
    GetMfyList(regionid) {
      this.MfyLoading = true;
      if (!!regionid) {
        MfyService.GetAll(regionid).then(res => {
          this.mfylist = res.data;
          this.MfyLoading = false;
        });
      } else {
        this.mfylist = [];
        this.MfyLoading = false;
      }
    },
    ChangeRegion() {
      if (this.OrgStateInfo.mfyid > 0) {
        this.OrgStateInfo.mfyid = "";
      }
      this.GetMfyList(this.OrgStateInfo.regionid);
    }
  }
};
</script>





