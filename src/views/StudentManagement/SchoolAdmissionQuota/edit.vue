<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
                <h4  class="text-left">{{$t('SchoolAdmissionQuota')}}</h4>
            </CCol> 
            <CCol>
               <h4 class="text-right" v-if="isview" >{{$t('Organization')}} : {{ SchoolAdmissionQuota.OrgName + ' (' + SchoolAdmissionQuota.OrgINN+')' }}</h4>
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
                  disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="SchoolAdmissionQuota.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <!-- <CCol class="sm-0"></CCol> -->
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                    <label
                      for="datepicker-dateformat2"
                    >{{$t('docdate')}}</label>
                      <!-- <custom-date-input />  -->
                      <date-picker
                      v-if="!SchoolAdmissionQuota.CanSave"
                      disabled
                        v-model="SchoolAdmissionQuota.docdate"
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
                      <date-picker
                      v-if="SchoolAdmissionQuota.CanSave"
                        v-model="SchoolAdmissionQuota.docdate"
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
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="schoolyear" rules="required">

                    <label for>{{$t('schoolyear')}}</label>
                    <v-select
                      v-if="!SchoolAdmissionQuota.CanSave"
                      disabled
                      :options="schoolyearlist"
                      v-model="SchoolAdmissionQuota.schoolyearid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                    <v-select
                    v-if="SchoolAdmissionQuota.CanSave"
                      :options="schoolyearlist"
                      v-model="SchoolAdmissionQuota.schoolyearid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="oblast" rules="required">

                    <label for>{{$t('oblast')}}</label>
                    <v-select
                    disabled
                      :options="OblastList"
                      v-model="SchoolAdmissionQuota.oblastid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="ChooseRegion"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="region" rules="required">

                    <label for>{{$t('region')}} <b-spinner v-if="RegionLoading" small></b-spinner></label>
                    <v-select
                    disabled
                      :options="RegionList"
                      v-model="SchoolAdmissionQuota.regionid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow class="mt-3">
              <CCol>
                <label for>{{$t('streetinfo')}}</label>
                <textarea v-if="!SchoolAdmissionQuota.CanSave" disabled class="form-control" v-model="SchoolAdmissionQuota.streetinfo" rows="5"></textarea>
                <textarea v-if="SchoolAdmissionQuota.CanSave" class="form-control" v-model="SchoolAdmissionQuota.streetinfo" rows="5"></textarea>
              </CCol>
              <CCol>
                <label for>{{$t('homeinfo')}}</label>
                <textarea v-if="!SchoolAdmissionQuota.CanSave" disabled class="form-control" v-model="SchoolAdmissionQuota.homeinfo" rows="5"></textarea>
                <textarea v-if="SchoolAdmissionQuota.CanSave" class="form-control" v-model="SchoolAdmissionQuota.homeinfo" rows="5"></textarea>
              </CCol>
            </CRow>
            <CRow class="mt-4">
                <CCol sm="8">
                  <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                    <CInput
                    v-if="!SchoolAdmissionQuota.CanSave"
                    disabled
                      :placeholder="$t('detailinfo')"
                      autocomplete="detailinfo"
                      :label="$t('detailinfo')"
                      v-model="SchoolAdmissionQuota.detailinfo"
                      :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                    <CInput
                    v-if="SchoolAdmissionQuota.CanSave"
                      :placeholder="$t('detailinfo')"
                      autocomplete="detailinfo"
                      :label="$t('detailinfo')"
                      v-model="SchoolAdmissionQuota.detailinfo"
                      :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </CCol>
                <!--<CCol sm="4">
                  <ValidationProvider v-slot="v" name="region" rules="required">

                      <label for>{{$t('schoolgradeid')}}</label>
                      <v-select
                        :options="schoolgradelist"
                        v-model="SchoolAdmissionQuota.schoolgradeid"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                  </ValidationProvider>
                </CCol>-->
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="SchoolAdmissionQuotaTables"
              :items="SchoolAdmissionQuota.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-if="SchoolAdmissionQuota.CanSave" v-slot:thead-top>
                <b-tr>
                  
                  <b-th style="width:14%">
                    <v-select
                      :options="EducationLanguageList"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.educationlanguageid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:14%">
                    <custom-number-input class="mb-0" v-model="tabrow.mainquota" @input="CalculateQuota(tabrow)"></custom-number-input>
                  </b-th>
                  <b-th style="width:8%">
                    <custom-number-input v-if="isdisabled" class="mb-0" v-model="tabrow.additionalquota" @input="CalculateQuota(tabrow)"></custom-number-input>
                  </b-th>
                  <b-th style="width:15%">
                    <!-- <custom-number-input class="mb-0" v-model="tabrow.totalquota"></custom-number-input> -->
                    <p class="p-0 m-0">{{tabrow.totalquota}}</p>
                  </b-th>       
                  <b-th style="width:8%">
                    <custom-number-input class="mb-0" v-model="tabrow.schoolgradecount" @input="CalculateQuota(tabrow)"></custom-number-input>
                  </b-th>
                   <b-th style="width:15%">
                    <p class="p-0 m-0" v-if="tabrow.averagevalue<10 || tabrow.averagevalue>50 " style="color:red">{{tabrow.averagevalue}}</p>
                    <p class="p-0 m-0" v-if="tabrow.averagevalue>=10 && tabrow.averagevalue<=50 " style="color:blue">{{tabrow.averagevalue}}</p>
                  </b-th>
                  <b-th style="width:7%">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(educationlanguage)="{item}">
                <p>{{item.educationlanguagename}}</p>             
              </template>
              <template v-slot:cell(mainquota)="{item}">
                <p class="m-0" >{{item.mainquota}}</p>
              </template>
              <template v-slot:cell(additionalquota)="{item}">
                <p class="m-0" >{{item.additionalquota}}</p>
              </template> 
              <template v-slot:cell(schoolgradecount)="{item}">
                <p class="m-0" >{{item.schoolgradecount}}</p>
              </template>
              <template v-slot:cell(averagevalue)="{item}">
                <p class="m-0" >{{item.averagevalue}}</p>
              </template>
              <template v-slot:cell(actions)="{item}">
                <CButtonGroup
                  v-if="SchoolAdmissionQuota.CanSave"
                  class="mx-auto d-block text-center mb-1 mt-n1"
                  size="sm"
                >
                  
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
                @click="$router.push({name :isview?'SchoolAdmissionQuotaSend': 'SchoolAdmissionQuota'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="SchoolAdmissionQuota.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
              <CButton
                v-if="isview && ((SchoolAdmissionQuota.statusid === 8 && SchoolAdmissionQuotaManage) ||SchoolAdmissionQuotaMNOView)"
                size="sm"
                color="danger"
                class="mr-4"
                @click="$bvModal.show('NotReceivedModal')"
              >
                <b-icon icon="x"></b-icon>
                {{$t('NotReceivedd')}}
              </CButton>
              <CButton
                v-if="isview && SchoolAdmissionQuotaMNOView"
                size="sm"
                color="success"
                class="mr-4"
                @click="$bvModal.show('ReceivedModal')"
              >
                <b-icon icon="check2"></b-icon>
                {{$t('Received')}}
              </CButton>
              <CButton
                v-if="isview && SchoolAdmissionQuota.statusid === 8 && SchoolAdmissionQuotaManage"
                size="sm"
                color="success"
                class="mr-4"
                @click="$bvModal.show('ForConsiderationModal')"
              >
                <b-icon icon="check2"></b-icon>
                {{$t('ForConsideration')}}
              </CButton>
                <b-modal :id="'NotReceivedModal'" hide-footer>
                  <template v-slot:modal-title>{{$t('WantNotAccept')}}</template>
                  <div class="d-block text-right">
                    <CRow class="mt-3">
                      <CCol v-if="SchoolAdmissionQuota.statusid === 8 || SchoolAdmissionQuota.statusid === 13">
                        <label class="d-block text-left" for>{{$t('Description')}}</label>
                        <v-select
                          :options="tablecolumntemplate"
                          v-model="templaterow.Description"
                          :reduce="item => item.name"
                          :placeholder="$t('Description')"
                          label="name"
                          @input="descriptionchange"
                        ></v-select>
                      </CCol>
                    </CRow>
                     <CRow class="mt-3"  v-if="(SchoolAdmissionQuota.statusid === 8 || SchoolAdmissionQuota.statusid === 13) && templaterow.isother">
                       <CCol>
                         <!-- <label class="d-block text-left" for>{{$t('Description')}}</label> -->
                          <textarea class="form-control" v-model="Description" rows="5"></textarea>
                       </CCol> 
                       
                     </CRow>
                     <CRow class="mt-3">
                      
                       <CCol>
                         <CButton
                              @click="$bvModal.hide('NotReceivedModal')"
                              color="danger"
                              class="mr-2"
                            >
                              <b-icon icon="x"></b-icon>
                              {{$t('NotAccept')}}
                            </CButton>
                            <CButton @click="NotReceived" color="success">
                              <b-icon icon="check2"></b-icon>
                              {{$t('Accept')}}
                            </CButton>
                       </CCol>
                     </CRow>

                    
                  </div>
                </b-modal>
                <b-modal :id="'ReceivedModal'" hide-footer>
                  <template v-slot:modal-title>{{$t('WantAccept')}}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('ReceivedModal')"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{$t('NotAccept')}}
                    </CButton>
                    <CButton @click="Received" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{$t('Accept')}}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'ForConsiderationModal'" hide-footer>
                  <template v-slot:modal-title>{{$t('WantAccept')}}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('ForConsiderationModal')"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{$t('NotAccept')}}
                    </CButton>
                    <CButton @click="ForConsideration" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{$t('Accept')}}
                    </CButton>
                  </div>
                </b-modal>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <history-detail-info :history="history"></history-detail-info>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolAdmissionQuotaService from '@/services/schooladmissionquota.service'
import OblastService from '@/services/Oblast.service'
import RegionService from '@/services/Region.service'
import EducationLanguageService from '@/services/EducationLanguage.service'
import TableColumnTemplateService from "@/services/TableColumnTemplate.service";
import HistoryDetailInfo from "@/components/HistoryDetailInfo";
export default {
  props: {isview:Boolean},
  components: { HistoryDetailInfo },
  data() {
    return {
      SaveLoading: false,
      SchoolAdmissionQuota: {},
      selectedrowid: 0,
      RegionLoading : false,
      schoolgradelist: [],
      schoolyearlist: [],
      OblastList : [],
      RegionList : [],
      lang: "",
       tablecolumntemplate: [],
      templaterow: {
        Description: "",
        isother: false
      },
      Description: "",
      EducationLanguageList : [],
      SchoolAdmissionQuotaTables: [
        { key: "educationlanguage", label: this.$t("educationlanguage") },
        { key: "mainquota", label: this.$t("mainquota") },
        { key: "additionalquota", label: this.$t("additionalquota") },
        { key: "totalquota", label: this.$t("totalquota") },
        { key: "schoolgradecount", label: this.$t("schoolgradecount") },
        { key: "averagevalue", label: this.$t("averagevalue") },
        { key: "actions", label: this.$t("actions") }
      ],
      isdisabled:this.$can("SchoolAdmissionAdditionalQuota", "permissions"),
       SchoolAdmissionQuotaManage: this.$can("SchoolAdmissionQuotaManage","permissions"),
      SchoolAdmissionQuotaMNOView: this.$can("SchoolAdmissionQuotaMNOView","permissions"),
      tabrow: {
        id: 0,
        ownerid: 0,
        educationlanguageid : 0,
        educationlanguagename : '',
        mainquota : 0,
        additionalquota : 0,
        totalquota : 0,
        schoolgradecount : 0,
        averagevalue : 0,
        Status: 1
      }
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    SchoolAdmissionQuotaService.Get(self.selectedrowid).then(res => {
      self.SchoolAdmissionQuota = res.data.schoolAdmissionQuota;
      this.history = res.data.history;
      self.ChooseRegion();
    });
    SchoolYearService.GetAll().then(res => {
      self.schoolyearlist = res.data;
    });
    SchoolGradeService.GetAll().then(res => {
      self.schoolgradelist = res.data;
    });
    OblastService.GetAll().then(res => {
      self.OblastList = res.data
    })
   
    EducationLanguageService.GetAll().then(res => {
      self.EducationLanguageList = res.data
    })
    TableColumnTemplateService.GetAll(291, "returnreason").then(res => {
      self.tablecolumntemplate = res.data;
    });
  },
  methods: {
    descriptionchange() {
      var self = this;
      self.templaterow.isother = self.tablecolumntemplate.filter(function(
        item
      ) {
        if (item.name === self.templaterow.Description) return item;
      })[0].isother;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    ChooseRegion(){
      var vm = this
      vm.RegionLoading = true
      if(!!vm.SchoolAdmissionQuota.oblastid){
        RegionService.GetAll(vm.SchoolAdmissionQuota.oblastid).then(res => {
          vm.RegionList = res.data
          vm.RegionLoading = false
        })
      }
      else{
        vm.SchoolAdmissionQuota.regionid = ''
        vm.RegionLoading = false
      }
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
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
    CalculateQuota(row){
      var self = this;
        row.totalquota = row.mainquota + row.additionalquota;
        row.averagevalue = row.schoolgradecount===0?0: self.roundToTwo(row.totalquota / row.schoolgradecount, 2);

    },
    Add() {
      var self = this;
      if (
        self.tabrow.educationlanguageid === "" ||
        self.tabrow.educationlanguageid === undefined ||
        self.tabrow.educationlanguageid === null ||
        self.tabrow.educationlanguageid === 0
      ) {
        this.makeToast(
          this.$t("EducationLanguageNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      var Mainquota = self.tabrow.mainquota;
      self.SchoolAdmissionQuota.Tables.forEach(function(item) {
        if (item.Status !== 3 ) {
          Mainquota = Mainquota + item.mainquota;
        }
      });
      if (Mainquota === 0) {
        this.makeToast(
          this.$t("MainQuotaNotCorrect") ,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        self.tabrow.mainquota === "" ||
        self.tabrow.mainquota === undefined ||
        self.tabrow.mainquota === null ||
        self.tabrow.mainquota === 0
      ) {
        this.makeToast(
          this.$t("MainQuotaNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.tabrow.schoolgradecount === "" ||
        self.tabrow.schoolgradecount === undefined ||
        self.tabrow.schoolgradecount === null ||
        self.tabrow.schoolgradecount === 0
      ) {
        this.makeToast(
          this.$t("schoolgradecountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.totalquota === "" ||
        self.tabrow.totalquota === undefined ||
        self.tabrow.totalquota === null ||
        self.tabrow.totalquota === 0
      ) {
        this.makeToast(
          this.$t("TotalQuotaeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
       self.tabrow.educationlanguagename = self.EducationLanguageList.filter(function(item) {
          if (item.id === self.tabrow.educationlanguageid) return item;
        })[0].name;

      var dublicate = false;
      self.SchoolAdmissionQuota.Tables.forEach(function(item) {
        if (item.Status !== 3 && item.educationlanguageid === self.tabrow.educationlanguageid) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + '' + self.tabrow.educationlanguagename,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if(self.tabrow.totalquota/self.tabrow.schoolgradecount<10 || self.tabrow.totalquota/self.tabrow.schoolgradecount>50)
      {
        this.makeToast(
          this.$t("TheNumberOfChildrenDoesNotMatchTheNumberOfClasses"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.SchoolAdmissionQuota.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid : 0,
        educationlanguageid : 0,
        educationlanguagename : '',
        mainquota : 0,
        additionalquota : 0,
        totalquota : 0,
        schoolgradecount : 0,
        averagevalue : 0,
        Status: 1
      }
    },

    EditItem(item) {
      item.Status = 2;
    },
    DeleteItem(item) {
      var self = this
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.SchoolAdmissionQuota.docnumber === 0 ||
        self.SchoolAdmissionQuota.docnumber === null ||
        self.SchoolAdmissionQuota.docnumber === undefined ||
        self.SchoolAdmissionQuota.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmissionQuota.docdate === 0 ||
        self.SchoolAdmissionQuota.docdate === null ||
        self.SchoolAdmissionQuota.docdate === undefined ||
        self.SchoolAdmissionQuota.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmissionQuota.schoolyearid === 0 ||
        self.SchoolAdmissionQuota.schoolyearid === null ||
        self.SchoolAdmissionQuota.schoolyearid === undefined ||
        self.SchoolAdmissionQuota.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

     
      if (
        self.SchoolAdmissionQuota.oblastid === 0 ||
        self.SchoolAdmissionQuota.oblastid === null ||
        self.SchoolAdmissionQuota.oblastid === undefined ||
        self.SchoolAdmissionQuota.oblastid === ""
      ) {
        this.makeToast(
          this.$t("oblastidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmissionQuota.regionid === 0 ||
        self.SchoolAdmissionQuota.regionid === null ||
        self.SchoolAdmissionQuota.regionid === undefined ||
        self.SchoolAdmissionQuota.regionid === ""
      ) {
        this.makeToast(
          this.$t("regionidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmissionQuota.streetinfo === null ||
        self.SchoolAdmissionQuota.streetinfo === undefined ||
        self.SchoolAdmissionQuota.streetinfo === ""
      ) {
        this.makeToast(
          this.$t("streetinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolAdmissionQuota.homeinfo === null ||
        self.SchoolAdmissionQuota.homeinfo === undefined ||
        self.SchoolAdmissionQuota.homeinfo === ""
      ) {
        this.makeToast(
          this.$t("homeinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
       if (
        self.SchoolAdmissionQuota.detailinfo === null ||
        self.SchoolAdmissionQuota.detailinfo === undefined ||
        self.SchoolAdmissionQuota.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      var hastables = false;
      self.SchoolAdmissionQuota.Tables.forEach(function(item) {
        if (item.Status !== 3) {
          hastables = true;
        }
      });
     
      if (!hastables) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }

      SchoolAdmissionQuotaService.Update(self.SchoolAdmissionQuota)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "SchoolAdmissionQuota" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    }
    ,
    Received() {
      var self = this;
      SchoolAdmissionQuotaService.Accept(self.SchoolAdmissionQuota.id)
        .then(res => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.$bvModal.hide("ReceivedModal");
          self.$router.push({ name: "SchoolAdmissionQuotaSend" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.$bvModal.hide("ReceivedModal");
        });
    },
    ForConsideration() {
      var self = this;
      SchoolAdmissionQuotaService.ForConsideration(self.SchoolAdmissionQuota.id)
        .then(res => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.$bvModal.hide("ForConsiderationModal");
          self.$router.push({ name: "SchoolAdmissionQuotaSend" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.$bvModal.hide("ForConsiderationModal");
        });
    },
    NotReceived(item) {
       var self = this;
       if(self.SchoolAdmissionQuota.id.statusid === 8 &&  self.templaterow.Description   === ''){
        this.makeToast(
          this.$t("DescriptionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      SchoolAdmissionQuotaService.Reject(self.SchoolAdmissionQuota.id, self.templaterow.Description)
        .then(res => {
          self.$bvModal.hide("NotReceivedModal");
          self.makeToast(
            self.$t("NotAcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            isother: false
          };
          self.$router.push({ name: "SchoolAdmissionQuotaSend" });

        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
         self.templaterow.Description = "";
          self.$bvModal.hide("NotReceivedModal");
        });
    },
    roundToTwo(value, decimals) {

      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    },
  }
};
</script>

<style>
</style>
