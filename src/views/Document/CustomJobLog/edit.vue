<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('CustomJobLog')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{$t('oblastid')}}</label>
                  <v-select
                        :options="OblastList"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="CustomJobLog.oblastid"
                        @input="ChangeOblast"
                        class="col-sm-8"
                    ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{$t('regionid')}}</label>
                  <v-select
                        :options="RegionList"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="CustomJobLog.regionid"
                        @input="ChangeRegion"
                        class="col-sm-8"
                    ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{$t('organization')}}</label>
                  <v-select
                        :options="OrganizationList"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="CustomJobLog.organizationid"
                        class="col-sm-8"
                    ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{$t('jobtype')}}</label>
                  <v-select
                        :options="JobTypeList"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="CustomJobLog.jobtypeid"
                        @input="ChangeJobType"
                        class="col-sm-8"
                    ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <!-- <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{$t('errorinfo')}}</label>
                  <div class="col-sm-8">
                      <CInput
                            :placeholder="$t('errorinfo')"
                            autocomplete="errorinfo"
                            v-model="CustomJobLog.errorinfo"
                        >
                        </CInput>
                  </div>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow> -->
            <CRow class="mt-n1">
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{$t('detailinfo')}}</label>
                  <div class="col-sm-8">
                      <CInput
                            :placeholder="$t('detailinfo')"
                            autocomplete="detailinfo"
                            v-model="CustomJobLog.detailinfo"
                        >
                        </CInput>
                  </div>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow class="mt-n3"> 
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4">{{ $t("forceupdate") }}</label>
                  <div class="col-sm-8">
                    <b-form-checkbox
                      v-model="CustomJobLog.forceupdate"
                      switch
                      class="mt-2 ml-1"
                    ></b-form-checkbox>
                  </div>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <!-- <CRow class="mt-n3"> 
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{$t('state')}}</label>
                  <v-select
                    class="col-sm-8"
                    :options="statelist"
                    v-model="CustomJobLog.statusid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow> -->
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push(`/Document/CustomJobLog`)"
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
import CustomJobLogService from "@/services/CustomJobLog.service";
import OblastService from '@/services/Oblast.service'
import RegionService from '@/services/Region.service'
import OrganizationService from '@/services/organization.service'
export default {
  data() {
    return {
      SaveLoading: false,
      CustomJobLog: {},
      fields: [
        {
          key: "languagename",
          label: this.$t("translateModal.status")
        },
        {
          key: "translatetext",
          label: this.$t("translateModal.name")
        },
        {
          key: "actions",
          label: ""
        }
      ],
      allSignupErrors: {},
      OblastList : [],
      RegionList : [],
      OrganizationList : [],
      JobTypeList : [],
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    HelperService.GetStateList().then(res => {
      this.statelist = res.data;
    });
    CustomJobLogService.Get(this.$route.params.id).then(res => {
      this.CustomJobLog = res.data;
      this.ChangeOblast();
      this.ChangeRegion();
    });
    OblastService.GetAll().then(res => {
        this.OblastList = res.data
    })
    HelperService.GetCustomJobTypeList().then(res => {
        this.JobTypeList = res.data 
    })
  },
  methods: {
    ChangeJobType(){
        if(!!this.CustomJobLog.jobtypeid){
            this.CustomJobLog.jobtypename = this.JobTypeList.filter(item => item.id == this.CustomJobLog.jobtypeid)[0].shortname
        }
    },
    ChangeOblast(){
      //this.CustomJobLog.regionid = ''
      //this.CustomJobLog.organizationid = ''
      if(!!this.CustomJobLog.oblastid){
        RegionService.GetAll(this.lang,this.CustomJobLog.oblastid).then(res => {
          this.RegionList = res.data
        })
      }
    },
    ChangeRegion(){
     // this.CustomJobLog.organizationid = ''
      if(!!this.CustomJobLog.regionid){
        OrganizationService.GetAll(0,this.CustomJobLog.regionid).then(res => {
          this.OrganizationList = res.data
        })
      }
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.SaveLoading = true
      CustomJobLogService.Update(this.CustomJobLog)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/Document/CustomJobLog`);
        })
        .catch(error => {
            this.SaveLoading = false
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    check() {
      var self = this;
      if (
        self.CustomJobLog.oblastid === 0 ||
        self.CustomJobLog.oblastid === null ||
        self.CustomJobLog.oblastid === undefined ||
        self.CustomJobLog.oblastid === ""
      ) {
        this.makeToast(this.$t("oblastNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      // if (
      //   self.CustomJobLog.regionid === 0 ||
      //   self.CustomJobLog.regionid === null ||
      //   self.CustomJobLog.regionid === undefined ||
      //   self.CustomJobLog.regionid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("regionNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      /* if (
        self.CustomJobLog.organizationid === 0 ||
        self.CustomJobLog.organizationid === null ||
        self.CustomJobLog.organizationid === undefined ||
        self.CustomJobLog.organizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.CustomJobLog.jobtypeid === 0 ||
        self.CustomJobLog.jobtypeid === null ||
        self.CustomJobLog.jobtypeid === undefined ||
        self.CustomJobLog.jobtypeid === ""
      ) {
        this.makeToast(this.$t("jobtypeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
    //   if (
    //     self.CustomJobLog.errorinfo === 0 ||
    //     self.CustomJobLog.errorinfo === null ||
    //     self.CustomJobLog.errorinfo === undefined ||
    //     self.CustomJobLog.errorinfo === ""
    //   ) {
    //     this.makeToast(this.$t("errorinfoNotCorrect"), this.$t("Error"), "danger");
    //     return false;
    //   }
      if (
        self.CustomJobLog.detailinfo === 0 ||
        self.CustomJobLog.detailinfo === null ||
        self.CustomJobLog.detailinfo === undefined ||
        self.CustomJobLog.detailinfo === ""
      ) {
        this.makeToast(this.$t("detailinfoNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
    //   if (
    //     self.CustomJobLog.statusid === 0 ||
    //     self.CustomJobLog.statusid === null ||
    //     self.CustomJobLog.statusid === undefined ||
    //     self.CustomJobLog.statusid === ""
    //   ) {
    //     this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
    //     return false;
    //   }
      return true;
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
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