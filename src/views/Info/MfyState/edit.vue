<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('MfyState')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label for="datepicker-dateformat2" class="col-form-label col-sm-3">{{$t('OnDate')}}</label>
                <div class="form-group col-sm-9">
                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="MfyState.ondate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    style="width : 100%"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>

          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('Oblast')}}</label>
                <v-select
                  class="col-sm-9"
                  :options="oblastlist"
                  v-model="MfyState.oblastid"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
                <CCol sm="2"></CCol>
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <ValidationProvider v-slot="v" name="region" rules="required">
                <div class="form-group form-row">
                  <label v-if="!RegionLoading" class="col-form-label col-sm-3" for>{{$t('region')}}</label>
                  <label v-if="RegionLoading" class="col-form-label col-sm-3 text-right">
                    <b-spinner small></b-spinner>
                  </label>
                  <v-select
                    class="col-sm-9"
                    :options="regionlist"
                    v-model="MfyState.regionid"
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
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <ValidationProvider v-slot="v" name="mfy" rules="required">
                <div class="form-group form-row">
                  <label v-if="!MfyLoading" class="col-form-label col-sm-3" for>{{$t('Mfy')}}</label>
                  <label v-if="MfyLoading" class="col-form-label col-sm-3 text-right">
                    <b-spinner small></b-spinner>
                  </label>
                  <v-select
                    class="col-sm-9"
                    :options="mfylist"
                    v-model="MfyState.mfyid"
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
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('normativedoc')"
                autocomplete="text"
                horizontal
                :label="$t('normativedoc')"
                v-model="MfyState.normativedoc"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="8">
              <div class="form-group form-row">
                <label class="col-form-label" for>{{$t('iscenterregion')}}</label>
                <b-form-checkbox :disabled="MfyState.iscentervillage == true || MfyState.isfarmfy == true" v-model="MfyState.iscenterregion" switch class="mt-2 ml-1"></b-form-checkbox>
                <CCol sm="2"></CCol>
                <div class="form-group form-row">
                  <label class="col-form-label" for>{{$t('iscentervillage')}}</label>
                  <b-form-checkbox :disabled="MfyState.iscenterregion == true" v-model="MfyState.iscentervillage" switch class="mt-2 ml-1"></b-form-checkbox>
                </div>
                <CCol sm="2"></CCol>
                <div class="form-group form-row">
                  <label class="col-form-label" for>{{$t('isfarmfy')}}</label>
                  <b-form-checkbox v-model="MfyState.isfarmfy" :disabled="MfyState.iscenterregion == true" switch class="mt-2 ml-1"></b-form-checkbox>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'MfyState'})"
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
import MfyStateService from "@/services/MfyState.service";
import RegionService from "@/services/Region.service";
import OblastService from "@/services/Oblast.service";
import MfyService from "@/services/Mfy.service";
export default {
  data() {
    return {
      SaveLoading: false,
      MfyState: {},

      RegionLoading: false,
      MfyLoading: false,
      oblastlist: [],
      regionlist: [],
      mfylist: [],
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    var self = this;

    MfyStateService.Get(this.$route.params.id).then(res => {
      this.MfyState = res.data;
      HelperService.GetOblastList().then(res => {
        this.oblastlist = res.data;
      });
      /*  this.GetRegionList(this.MfyState.oblastid);
      this.GetMfyList(this.MfyState.regionid); */
      /* this.getregionlist(self.MfyState.oblastid, setregionlist);
      this.getmfylist(self.MfyState.regionid, setregionlist); */
    });
  },
  methods: {
    GetOblastList() {
      HelperService.GetOblastList().then(res => {
        this.oblastlist = res.data;
      });
    },
    /* GetRegionList(oblastid) {
      this.RegionLoading = true;
      if (!!oblastid) {
        RegionService.GetAll("", oblastid).then(res => {
          this.regionlist = res.data;
          this.RegionLoading = false;
        });
      } else {
        this.regionlist = [];
        this.RegionLoading = false;
      }
    },
    GetMfyList(regionid) {
      this.MfyLoading = true;
      if (!!regionid) {
        MfyService.GetAll("", regionid).then(res => {
          this.mfylist = res.data;
          this.MfyLoading = false;
        });
      } else {
        this.mfylist = [];
        this.MfyLoading = false;
      }
    }, */

    getregionlist(oblastid, setregionlist) {
      this.RegionLoading = true;

      RegionService.GetAll(this.lang,this.MfyState.oblastid).then(res => {
        setregionlist(res.data);
        this.RegionLoading = false;
      });
    },
    getmfylist(regionid, setmfylist) {
      this.MfyLoading = true;
      MfyService.GetMfyList().then(res => {
        setmfylist(res.data);
        this.MfyLoading = false;
      });
    },

    check() {
      var self = this;
      if (
        self.MfyState.ondate === 0 ||
        self.MfyState.ondate === null ||
        self.MfyState.ondate === undefined ||
        self.MfyState.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.MfyState.oblastid === 0 ||
        self.MfyState.oblastid === null ||
        self.MfyState.oblastid === undefined ||
        self.MfyState.oblastid === ""
      ) {
        this.makeToast(this.$t("oblastNotSelect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.MfyState.regionid === 0 ||
        self.MfyState.regionid === null ||
        self.MfyState.regionid === undefined ||
        self.MfyState.regionid === ""
      ) {
        this.makeToast(this.$t("regionNotSelect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.MfyState.mfyid === 0 ||
        self.MfyState.mfyid === null ||
        self.MfyState.mfyid === undefined ||
        self.MfyState.mfyid === ""
      ) {
        this.makeToast(this.$t("mfyNotSelect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.MfyState.normativedoc === 0 ||
        self.MfyState.normativedoc === null ||
        self.MfyState.normativedoc === undefined ||
        self.MfyState.normativedoc === ""
      ) {
        this.makeToast(
          this.$t("normativedocNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
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

    SaveData() {
      if (!this.check()) {
        return false;
      }
      MfyStateService.Update(this.MfyState)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "MfyState" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    }
  },
  watch: {
    "MfyState.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          (newValue);
          if (oldValue) {
            (oldValue);
            this.MfyState.regionid = null;
            this.MfyState.mfyid = null;
          }
          var self = this;
          this.getregionlist(newValue, function(data) {
            self.regionlist = data;
          });
        }
      }
    },
    "MfyState.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.MfyState.mfyid = null;
          }
          var self = this;
          this.getmfylist(newValue, function(data) {
            self.mfylist = data;
          });
        }
      }
    }
  }
};
</script>

<style>
</style>