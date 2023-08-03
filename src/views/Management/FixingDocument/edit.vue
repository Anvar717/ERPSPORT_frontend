<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow >
            <CCol>
              <h4 class="text-center">{{ $t("FixingDocument") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow class="m-2">
              <CCol lg="4" md="4" sm="11" class="text-left mt-2">
                 <label  for>{{
                    $t("fixingdocumenttype")
                  }}</label>
                <v-select
                  v-model="FixingDocument.fixingdocumenttypeid"
                  :reduce="(item) => item.id"
                  label="name"
                  :options="FixingDocumentTypeList"
                  :placeholder="$t('fixingdocumenttype')"
                >
                </v-select>
              </CCol>
              <CCol lg="4" md="4" sm="11" class="text-left mt-2">
                 <label  for>{{
                    $t("oblast")
                  }}</label>
                <v-select
                  v-model="FixingDocument.oblastid"
                  :reduce="(item) => item.id"
                  label="name"
                  @input="changeOblast()"
                  :options="OblastList"
                  :placeholder="$t('oblast')"
                >
                </v-select>
              </CCol>
               <CCol lg="4" md="4" sm="11" class="text-left mt-2">
                <label  for>{{
                    $t("region")
                  }}</label>
                <v-select
                  v-model="FixingDocument.regionid"
                  :options="RegionList"
                  :reduce="(item) => item.id"
                  label="name"
                   @input="changeRegion()"
                  :placeholder="$t('region')"
                >
                </v-select>
              </CCol>
            </CRow>
            <CRow class="m-2">
              <CCol lg="4" md="4" sm="11" class="text-left mt-2">
               <label  for>{{
                    $t("organization")
                  }}</label>
                <v-select
                  v-model="FixingDocument.organizationid"
                  :options="OrganizationList"
                  :reduce="(item) => item.id"
                  @input="changeOrg()"
                  label="name"
                  :placeholder="$t('organization')"
                >
                </v-select>
              </CCol>
              <CCol lg="4" md="4" sm="11" class="text-left mt-2">
               <label  for>{{
                    $t("schoolyear")
                  }}</label>
              <v-select
                    :options="SchoolYearList"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="FixingDocument.schoolyearid"
                    :placeholder="$t('SchoolYear')"
                  >
                  </v-select>
              </CCol>
              <CCol lg="4" md="4" sm="11" class="text-left mt-2">
               <label  for>{{
                    $t("schoolgrade")
                  }}</label>
               <v-select
                      :options="OrgSchoolGradeList"
                      :reduce="item => item.id"
                      :placeholder="$t('orgschoolgrade')"
                      label="name"
                      v-model="FixingDocument.orgschoolgradeid"
                    ></v-select>
              </CCol>
            </CRow>
            <CRow class="m-2">
              <CCol sm="4" class="text-left mt-2" v-if="FixingDocument.fixingdocumenttypeid != 6 && FixingDocument.fixingdocumenttypeid != 7">
               <label for="">{{$t('DocumentID')}}</label>
                        <b-form-input
                         v-model="FixingDocument.documentid"
                          :placeholder="$t('DocumentID')"
                          ></b-form-input>
              </CCol>
              <CCol v-if="FixingDocument.fixingdocumenttypeid == 3 || FixingDocument.fixingdocumenttypeid == 6 || FixingDocument.fixingdocumenttypeid == 7" sm="4" class="text-left mt-2">
               <label for="">{{$t('PersonId')}}</label>
                        <b-form-input
                        type="number"
                         v-model="FixingDocument.personid"
                          :placeholder="$t('PersonId')"
                          ></b-form-input>
              </CCol>
              <CCol v-if="FixingDocument.fixingdocumenttypeid == 7" sm="4" class="text-left mt-2">
               <label for="">{{$t('personidentitydocumentid')}}</label>
                        <b-form-input
                         v-model="FixingDocument.personidentitydocumentid"
                          :placeholder="$t('personidentitydocumentid')"
                          ></b-form-input>
              </CCol>
              <CCol v-if="FixingDocument.fixingdocumenttypeid == 6" sm="4" class="text-left mt-2">
               <label for="">{{$t('dateofbirth')}}</label>
                       <date-picker  style="width:100%" v-model="FixingDocument.dateofbirth" size="sm" lang="ru" class="mr-2"
                        :placeholder="$t('DateOfBirth')"  value-type="format" format="DD.MM.YYYY"></date-picker>
              </CCol>
              <CCol v-if="FixingDocument.fixingdocumenttypeid == 6 || FixingDocument.fixingdocumenttypeid == 7" sm="4" class="text-left mt-2">
               <label for="">{{$t('pinfl')}}</label>
                        <b-form-input
                        type="number"
                         v-model="FixingDocument.pinfl"
                          :placeholder="$t('pinfl')"
                          ></b-form-input>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'FixingDocument' })"
              >
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
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import FixingDocumentService from "@/services/FixingDocument.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrganizationService from "@/services/organization.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
export default {
  data() {
    return {
      SaveLoading: false,
      FixingDocument: {},
      OblastList: [],
      FixingDocumentTypeList: [],
      SchoolYearList : [],
      OrgSchoolGradeList: [],
      RegionList: [],
      OrganizationList :  [],
      selectedrowid: 0,
    };
  },
  created() { 
    var self = this;
    self.selectedrowid = self.$route.params.id;
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      self.OblastList = res.data;
    });
    HelperService.GetFixingDocumentTypeList().then((res) => {
      self.FixingDocumentTypeList = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      self.SchoolYearList = res.data;
    });
    HelperService.GetTableList().then((res) => {
      self.tableslist = res.data;
    });
    FixingDocumentService.Get(self.selectedrowid).then((res) => {
      self.FixingDocument = res.data;
      self.changeOblast();
    self.changeRegion();
    self.changeOrg();
    });
  },
  methods: {
    changeOblast() {
      if(this.FixingDocument.oblastid !=0){
        RegionService.GetAll(this.lang, this.FixingDocument.oblastid).then((res) => {
        this.RegionList = res.data;
      });
      }
    },
    changeOrg(){
      if(this.FixingDocument.organizationid != 0) {
        OrgSchoolGradeService.GetAll("", 0, this.FixingDocument.organizationid).then(res => {
         this.OrgSchoolGradeList = res.data;
    });
      }
    },
    changeRegion(){
      if(this.FixingDocument.oblastid !=0 && this.FixingDocument.regionid !=0){
        OrganizationService.GetAll(this.FixingDocument.oblastid,this.FixingDocument.regionid, false).then(res => {
        this.OrganizationList = res.data
      })
      }
    },
    check() {
      var self = this;
      if(self.FixingDocument.fixingdocumenttypeid == 3){
        if (
        self.FixingDocument.personid === 0 ||
        self.FixingDocument.personid === null ||
        self.FixingDocument.personid === undefined ||
        self.FixingDocument.personid === ""
      ) {
        this.makeToast(
          this.$t("PersonIdNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      }
      if(self.FixingDocument.fixingdocumenttypeid == 6){
        if (
        self.FixingDocument.pinfl === 0 ||
        self.FixingDocument.pinfl === null ||
        self.FixingDocument.pinfl === undefined ||
        self.FixingDocument.pinfl === ""
      ) {
        this.makeToast(
          this.$t("pinflNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixingDocument.dateofbirth === 0 ||
        self.FixingDocument.dateofbirth === null ||
        self.FixingDocument.dateofbirth === undefined ||
        self.FixingDocument.dateofbirth === ""
      ) {
        this.makeToast(
          this.$t("dateofbirthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      }
      if (
        self.FixingDocument.fixingdocumenttypeid === 0 ||
        self.FixingDocument.fixingdocumenttypeid === null ||
        self.FixingDocument.fixingdocumenttypeid === undefined ||
        self.FixingDocument.fixingdocumenttypeid === ""
      ) {
        this.makeToast(
          this.$t("FixingdocumenttypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixingDocument.oblastid === 0 ||
        self.FixingDocument.oblastid === null ||
        self.FixingDocument.oblastid === undefined ||
        self.FixingDocument.oblastid === ""
      ) {
        this.makeToast(
          this.$t("OblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixingDocument.organizationid === 0 ||
        self.FixingDocument.organizationid === null ||
        self.FixingDocument.organizationid === undefined ||
        self.FixingDocument.organizationid === ""
      ) {
        this.makeToast(
          this.$t("OrganizationNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if(self.FixingDocument.fixingdocumenttypeid == 8){
        if (
        self.FixingDocument.orgschoolgradeid === 0 ||
        self.FixingDocument.orgschoolgradeid === null ||
        self.FixingDocument.orgschoolgradeid === undefined ||
        self.FixingDocument.orgschoolgradeid === ""
      ) {
        this.makeToast(
          this.$t("OrgSchoolGradeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixingDocument.schoolyearid === 0 ||
        self.FixingDocument.schoolyearid === null ||
        self.FixingDocument.schoolyearid === undefined ||
        self.FixingDocument.schoolyearid === ""
      ) {
        this.makeToast(
          this.$t("SchoolYearNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FixingDocument.documentid === 0 ||
        self.FixingDocument.documentid === null ||
        self.FixingDocument.documentid === undefined ||
        self.FixingDocument.documentid === ""
      ) {
        this.makeToast(
          this.$t("DocumentIDNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      }
      if (
        self.FixingDocument.regionid === 0 ||
        self.FixingDocument.regionid === null ||
        self.FixingDocument.regionid === undefined ||
        self.FixingDocument.regionid === ""
      ) {
        this.makeToast(
          this.$t("RegionNotSelected"),
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
        5;
      }
      var self = this;
      if(self.fixingdocumenttypeid == 3){
        self.FixingDocument.personid=parseInt(self.FixingDocument.personid)
      }
      FixingDocumentService.Update(self.FixingDocument)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "FixingDocument" });
        })
        .catch((error) => {
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
