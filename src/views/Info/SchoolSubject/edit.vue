<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('SchoolSubject')}}</h4>
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
                    v-model="SchoolSubject.code"
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
                    v-model="SchoolSubject.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="SchoolSubject.TranslatableColumns.includes('shortname')"
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
                    v-model="SchoolSubject.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="SchoolSubject.TranslatableColumns.includes('fullname')"
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
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('SchoolSubjectGroup')}}</label>
                  <v-select
                    class="col-sm-5"
                    :options="schoolsubjectgrouplist"
                    v-model="SchoolSubject.schoolsubjectgroupid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                  <label class="col-form-label col-sm-3" for>{{$t('ischecknotebookpayment')}}</label>
                  <b-form-checkbox
                    v-model="SchoolSubject.ischecknotebookpayment"
                    switch
                    class="mt-2 ml-1"
                  ></b-form-checkbox>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('Parent')}}</label>
                  <v-select
                    class="col-sm-5"
                    :options="parentlist"
                    v-model="SchoolSubject.parentid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                  <label class="col-form-label col-sm-3" for>{{$t('canbedivided')}}</label>
                  <b-form-checkbox v-model="SchoolSubject.canbedivided" switch class="mt-2 ml-1"></b-form-checkbox>
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
                    v-model="SchoolSubject.stateid"
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
        <b-tabs class="ml-2">
          <b-tab :title="$t('Tables')" active>
            <CRow v-if="SchoolSubject.canbedivided" class="mt-3">
          <CCol>
            <b-table
              :fields="SchoolSubjectTables"
              :items="SchoolSubject.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template  v-slot:thead-top>
                <b-tr>
                  <b-th style="width:10%">
                    <date-picker
                      v-model="tabrow.ondate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      style="width:100%"
                    ></date-picker>
                  </b-th>
                  <b-th style="width:10%">
                    <b-form-checkbox  v-model="tabrow.canbedivided" switch class="mt-2 ml-1"></b-form-checkbox>
                  </b-th>
                  <b-th >
                    <v-select
                      :options="schoolgradelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolgradeid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:10%">
                    <custom-number-input v-model="tabrow.minquantity"></custom-number-input>
                  </b-th>
                  <b-th style="width:10%">
                    <b-form-checkbox  v-model="tabrow.isalloblast" switch class="mt-2 ml-1"></b-form-checkbox>
                  </b-th>
                  <b-th >
                    <v-select
                    v-if="!tabrow.isalloblast"
                      :options="oblastlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.oblastid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:10%">
                    <CButton size="sm" color="primary" variant="outline" @click="AddRow">
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(ondate)="{ item }">
                <p >{{ item.ondate }}</p>
              </template>
              <template v-slot:cell(canbedivided)="{ item }">
                <p>
                  <b-form-checkbox disabled v-model="item.canbedivided" switch class="mt-2 ml-1"></b-form-checkbox>
                </p>
              </template>
              <template v-slot:cell(schoolgradename)="{ item }">
                <p>{{ item.schoolgradename }}</p>
              </template>
              <template v-slot:cell(minquantity)="{ item }">
                <p v-if="item.Status == 0">{{ item.minquantity }}</p>
                <custom-number-input
                  v-if="item.Status == 2 || item.Status == 1"
                  v-model="item.minquantity"
                ></custom-number-input>
              </template>
              <template v-slot:cell(isalloblast)="{ item }">
                <p>
                  <b-form-checkbox disabled v-model="item.isalloblast" switch class="mt-2 ml-1"></b-form-checkbox>
                </p>
              </template>
              <template v-slot:cell(oblastname)="{ item }">
                <p>{{ item.oblastname }}</p>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <CButtonGroup class="mx-auto d-block text-center" size="sm">
                  
                  <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </CButtonGroup>
              </template>
            </b-table>
          </CCol>
        </CRow>
          </b-tab>
          <b-tab :title="$t('ExternalDataTables')">
            <b-row class="mt-3">
          <b-col>
            <b-table
              :fields="RegionFields"
              :items="SchoolSubject.ExternalDataCodeTables"
              bordered
              class="bg-color-table text-center"
              responsive="sm"
              :tbody-tr-class="rowClass"
              small
            >
              <template #thead-top>
                <b-tr>
                  <b-th>
                    <b-form-input
                      size="sm"
                      v-model="ExternalDataTabrow.code"
                    ></b-form-input>
                  </b-th>
                  <b-th>
                    <v-select
                      :options="ExternalDataCodeList"
                      v-model="ExternalDataTabrow.externaldatasourceid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="ChangeExternalDataCode"
                    ></v-select>
                  </b-th>
                  <b-th class="text-center">
                    <b-button size="sm" @click="AddTable" variant="primary">
                      <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                    </b-button>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(actions)="{ item, index }">
                <div class="text-center">
                  <b-link
                    @click="EditItem(item, index)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteItem(item, index)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
              <template v-slot:cell(code)="{ item }">
                <p v-if="item.status == 0" class="p-0 m-0">{{ item.code }}</p>
                <b-form-input
                  v-if="item.status == 1 || item.status == 2"
                  size="sm"
                  v-model="item.code"
                ></b-form-input>
              </template>
              <template v-slot:cell(externaldatasourcename)="{ item }">
                <p v-if="item.status == 0" class="p-0 m-0">
                  {{ item.externaldatasourcename }}
                </p>
                <v-select
                  v-if="item.status == 1 || item.status == 2"
                  :options="ExternalDataCodeList"
                  v-model="item.externaldatasourceid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </template>
            </b-table>
          </b-col>
        </b-row>
          </b-tab>
        </b-tabs>
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
                @click="$router.push({name : 'SchoolSubject'})"
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
import OblastService from "@/services/Oblast.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolSubjectGroupService from "@/services/SchoolSubjectGroup.service";
import HelperService from "@/services/helper.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      SchoolSubject: { TranslatableColumns: [] },
      schoolgradelist: [],
      oblastlist: [],

      selectedrowid: 0,
      SchoolSubjectTables: [
        { key: "ondate", label: this.$t("ondate") },
        { key: "canbedivided", label: this.$t("canbedivided") },
        { key: "schoolgradename", label: this.$t("SchoolGradeName") },
        { key: "minquantity", label: this.$t("minquantity") },
        { key: "isalloblast", label: this.$t("isalloblast") },
        { key: "oblastname", label: this.$t("oblastname") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        ondate: '',
        canbedivided: true,
        schoolgradeid: 0,
        schoolgradename: "",
        minquantity: 0,
        isalloblast: false,
        oblastid: 0,
        oblastname: '',
        Status: 1,
      },
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" }
      ],
      translatelist: [],
      ExternalDataCodeList: [],
      languagelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: ""
      },
      RegionFields: [
        { key: "code", label: this.$t("code"), thClass: "text-center" },
        {
          key: "externaldatasourcename",
          label: this.$t("externaldatasource"),
          thClass: "text-center",
        },
        { key: "actions", label: this.$t("actions"), thClass: "text-center" },
      ],
      ExternalDataTabrow: {
        id: 0,
        tableid: 0,
        tablename: "",
        tablerowid: 0,
        externaldatasourceid: 0,
        externaldatasourcename: "",
        code: "",
        status: 1,
      },
      filter:{
        forCurriculum:false,
        schoolyearid:0,
        orgschoolgradeid:0,
        IsAllSubjects: true

      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      parentlist: [],
      schoolsubjectgrouplist: [],
      today:'',
      lang:''
    };
  },
  created() {
    this.lang = localStorage.getItem('locale')|| 'ru'
    var self = this;
    
    self.selectedrowid = self.$route.params.id;
    SchoolGradeService.GetAll().then((res) => {
      self.schoolgradelist = res.data;
    });
    OblastService.GetAll().then((res) => {
      self.oblastlist = res.data;
    });
    HelperService.GetAllExternalDataSource().then((res) => {
      self.ExternalDataCodeList = res.data;
    });
    HelperService.GetLanguageList().then(res => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
    SchoolSubjectService.GetAll(
      this.lang,
      this.filter.forCurriculum,
      this.filter.schoolyearid,
      this.filter.orgschoolgradeid,
      this.filter.IsAllSubjects,
    ).then(res => {
      this.parentlist = res.data;
    });
    SchoolSubjectGroupService.GetAll().then(res => {
      this.schoolsubjectgrouplist = res.data;
    });
    SchoolSubjectService.Get(self.selectedrowid).then(res => {
      self.SchoolSubject = res.data;
    });
    self.createDate();
  },
  methods: {
    createDate() {
          var todaydate = new Date();
          var dd = String(todaydate.getDate()).padStart(2, "0");
          var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
          var yyyy = todaydate.getFullYear();
          this.today = dd + "." + mm + "." + yyyy;
          this.tabrow.ondate = dd + "." + mm + "." + yyyy;
        },
    AddRow(data) {
      var self = this;
      if (
        self.tabrow.ondate === 0 ||
        self.tabrow.ondate === null ||
        self.tabrow.ondate === undefined ||
        self.tabrow.ondate === ""
      ) {
        self.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
      }
      if (
        self.tabrow.minquantity === 0 ||
        self.tabrow.minquantity === null ||
        self.tabrow.minquantity === undefined ||
        self.tabrow.minquantity === ""
      ) {
        self.makeToast(this.$t("minquantityNotCorrect"), this.$t("Error"), "danger");
      }
      if (
        self.tabrow.schoolgradeid === 0 ||
        self.tabrow.schoolgradeid === null ||
        self.tabrow.schoolgradeid === undefined ||
        self.tabrow.schoolgradeid === ""
      ) {
        self.makeToast(this.$t("schoolgradeidNotSelected"), this.$t("Error"), "danger");
      }
      
      self.tabrow.schoolgradename = self.schoolgradelist.filter(function (item) {
        if (item.id === self.tabrow.schoolgradeid) return item;
      })[0].name;
      if(!self.tabrow.isalloblast){
        if (
          self.tabrow.oblastid === 0 ||
          self.tabrow.oblastid === null ||
          self.tabrow.oblastid === undefined ||
          self.tabrow.oblastid === ""
        ) {
          self.makeToast(this.$t("oblastNotSelected"), this.$t("Error"), "danger");
        }
          self.tabrow.oblastname = self.oblastlist.filter(function (item) {
          if (item.id === self.tabrow.oblastid) return item;
        })[0].name;
      }
      else{
        self.tabrow.oblastid = 0;
      }
      
      self.SchoolSubject.Tables.push(self.tabrow);
      self.tabrow= {
        id: 0,
        ownerid: 0,
        ondate: self.today,
        canbedivided: true,
        schoolgradeid: 0,
        schoolgradename: "",
        minquantity: 0,
        isalloblast: false,
        oblastid: 0,
        oblastname: '',
        Status: 1,
      }
     
    },
    EditItem(item, index) {
      if (item.status == 0) {
        item.status = 2;
      }
    },
    DeleteItem(item, index) {
      item.status = 3;
    },
    EditRow(item) {
      item.Status = 2;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    ChangeExternalDataCode() {
      if (!!this.ExternalDataTabrow.externaldatasourceid) {
        this.ExternalDataTabrow.externaldatasourcename = this.ExternalDataCodeList.filter(
          (item) => item.id == this.ExternalDataTabrow.externaldatasourceid
        )[0].name;
      }
    },
    AddTable() {
      var self = this;
      if (
        self.ExternalDataTabrow.code === 0 ||
        self.ExternalDataTabrow.code === null ||
        self.ExternalDataTabrow.code === undefined ||
        self.ExternalDataTabrow.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.ExternalDataTabrow.externaldatasourceid === 0 ||
        self.ExternalDataTabrow.externaldatasourceid === null ||
        self.ExternalDataTabrow.externaldatasourceid === undefined ||
        self.ExternalDataTabrow.externaldatasourceid === ""
      ) {
        this.makeToast(
          this.$t("externaldatasourceNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.SchoolSubject.ExternalDataCodeTables.push(self.ExternalDataTabrow);
      self.ExternalDataTabrow = {
        id: 0,
        tableid: 0,
        tablename: "",
        tablerowid: 0,
        externaldatasourceid: 0,
        externaldatasourcename: "",
        code: "",
        status: 1,
      };
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    check() {
      var self = this;

      if (
        self.SchoolSubject.code === 0 ||
        self.SchoolSubject.code === null ||
        self.SchoolSubject.code === undefined ||
        self.SchoolSubject.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SchoolSubject.shortname === 0 ||
        self.SchoolSubject.shortname === null ||
        self.SchoolSubject.shortname === undefined ||
        self.SchoolSubject.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolSubject.fullname === 0 ||
        self.SchoolSubject.fullname === null ||
        self.SchoolSubject.fullname === undefined ||
        self.SchoolSubject.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolSubject.schoolsubjectgroupid === 0 ||
        self.SchoolSubject.schoolsubjectgroupid === null ||
        self.SchoolSubject.schoolsubjectgroupid === undefined ||
        self.SchoolSubject.schoolsubjectgroupid === ""
      ) {
        this.makeToast(
          this.$t("schoolsubjectgroupNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolSubject.stateid === 0 ||
        self.SchoolSubject.stateid === null ||
        self.SchoolSubject.stateid === undefined ||
        self.SchoolSubject.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if(!self.SchoolSubject.canbedivided){
        self.SchoolSubject.Tables.forEach(item => {
          item.Status = 3;
        });
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      SchoolSubjectService.Update(self.SchoolSubject)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "SchoolSubject" });
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
      self.translatelist = self.SchoolSubject.Translates.filter(
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
      self.SchoolSubject.Translates = self.SchoolSubject.Translates.filter(
        x => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach(item => {
        self.SchoolSubject.Translates.push(item);
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