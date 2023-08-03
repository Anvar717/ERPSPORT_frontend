<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('BatchDeleteLog')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="Organization" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('Organization')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationlist"
                      v-model="BatchDeleteLog.organizationid"
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
                <ValidationProvider v-slot="v" name="oblast" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('orgschoolgrade')}}</label>
                    <v-select
                    
                      class="col-sm-9"
                      :options="schoolgradelist"
                      v-model="BatchDeleteLog.schoolgradeid"
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
                <ValidationProvider v-slot="v" name="oblast" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('schoolgradeletter')}}</label>
                    <v-select
                    
                      class="col-sm-9"
                      :options="schoolgradeletterlist"
                      v-model="BatchDeleteLog.schoolgradeletterid"
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

        
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'BatchDeleteLog'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                
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
import BatchDeleteLogService from "@/services/BatchDeleteLog.service";
import OrganizationService from "@/services/organization.service";
import HelperService from "@/services/helper.service";
import OblastService from "@/services/Oblast.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
export default {
  data() {
    return {
      SaveLoading: false,
      BatchDeleteLog: {
        id:0,
        deletetypecode:'',
        deletetypename:'',
        functionname: '',
        functionparams: '',
        paramsdata: '',
        ipadress:'',
        useragent:'',
        statusid:0,
        username:'',
        userinfo:'',
        organizationinfo:'',
        organizationid:0,
        schoolgradeid:0,
        schoolgradeletterid:0
      },
      selectedrowid: 0,
      organizationlist: [],
      oblastlist: [],
      schoolgradelist: [],
      schoolgradeletterlist: [],

    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;


    OrganizationService.GetAll().then(res => {
      self.organizationlist = res.data;
    });
    
    SchoolGradeService.GetAll().then(res => {
      self.schoolgradelist = res.data;
    });
        SchoolGradeLetterService.GetAll().then(res => {
      self.schoolgradeletterlist = res.data;
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
      HelperService.GetOrganizationData(self.BatchDeleteLog.organizationid).then(
        res => {

          if (!!res.data && res.data.length > 0) {
            self.BatchDeleteLog.oblastid = res.data[0].oblastid;
          }
          if (!!res.data && res.data.length > 0) {
            self.BatchDeleteLog.schoolgradeid = res.data[0].schoolgradeid;
          }
                    if (!!res.data && res.data.length > 0) {
            self.BatchDeleteLog.schoolgradeletter = res.data[0].schoolgradeletter;
          }
        self.GetSchoolGradeList();
        self.GetSchoolGradeLetterList();

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

    check() {
      var self = this;
      if (
        self.BatchDeleteLog.organizationid === 0 ||
        self.BatchDeleteLog.organizationid === null ||
        self.BatchDeleteLog.organizationid === undefined ||
        self.BatchDeleteLog.organizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BatchDeleteLog.schoolgradeid === 0 ||
        self.BatchDeleteLog.schoolgradeid === null ||
        self.BatchDeleteLog.schoolgradeid === undefined ||
        self.BatchDeleteLog.schoolgradeid === ""
      ) {
        this.makeToast(
          this.$t("schoolgradeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
            if (
        self.BatchDeleteLog.schoolgradeid === 1
      ) {
        this.makeToast(
          this.$t("NotAllowed"),
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
      BatchDeleteLogService.Update(this.BatchDeleteLog)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "BatchDeleteLog" });
        })
        .catch(error => {
          this.makeToast(
            error,
            this.$t("message"),
            "danger"
          );
        });
    },
/*     GetOblastList() {
      HelperService.GetOblastList().then(res => {
        this.oblastlist = res.data;
      });
    }, */
        GetSchoolGradeList() {
      SchoolGradeService.GetAll().then(res => {
        this.schoolgradelist = res.data;
      });
    },
        GetSchoolGradeLetterList() {
      SchoolGradeLetterService.GetAll().then(res => {
        this.schoolgradeletterlist = res.data;
      });
    },

  }
};
</script>





