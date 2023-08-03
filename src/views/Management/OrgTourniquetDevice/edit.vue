<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("OrgTourniquetDevice") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="devicecode"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('devicecode')"
                    autocomplete="devicecode"
                    horizontal
                    :label="$t('devicecode')"
                    v-model="OrgTourniquetDevice.devicecode"
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

              <CCol sm="6">
                <ValidationProvider v-slot="v" name="deviceip" rules="required">
                  <CInput
                    :placeholder="$t('deviceip')"
                    autocomplete="text"
                    horizontal
                    :label="$t('deviceip')"
                    v-model="OrgTourniquetDevice.deviceip"
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
            </CRow>

            <CRow>
              <CCol sm="6">
                <CInput
                  :placeholder="$t('deviceport')"
                  horizontal
                  :label="$t('deviceport')"
                  v-model="OrgTourniquetDevice.deviceport"
                >
                </CInput>
              </CCol>
              <CCol sm="6">
                <CInput
                  :placeholder="$t('deviceprotocol')"
                  horizontal
                  :label="$t('deviceprotocol')"
                  v-model="OrgTourniquetDevice.deviceprotocol"
                >
                </CInput>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="deviceusername"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('deviceusername')"
                    autocomplete="text"
                    horizontal
                    :label="$t('deviceusername')"
                    v-model="OrgTourniquetDevice.deviceusername"
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

              <CCol sm="6">
                <ValidationProvider v-slot="v" name="deviceip" rules="required">
                  <CInput
                    :placeholder="$t('devicepassword')"
                    autocomplete="text"
                    horizontal
                    :label="$t('devicepassword')"
                    v-model="OrgTourniquetDevice.devicepassword"
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
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("organization")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="organizationlist"
                    v-model="OrgTourniquetDevice.organizationid"
                    :reduce="(item) => item.id"
                    @input="ChangeOrg"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("orgtourniquetuser")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="orgtourniquetuserlist"
                    v-model="OrgTourniquetDevice.orgtourniquetuserid"
                    :reduce="(item) => item.ID"
                    :placeholder="$t('ChooseBelow')"
                    label="DisplayName"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label
                    class="col-form-label col-sm-3"
                    for="datepicker-dateformat2"
                    >{{ $t("isinputdevice") }}</label
                  >
                  <b-form-checkbox
                    style="margin-top: 8px"
                    class="col-sm-9"
                    v-model="OrgTourniquetDevice.isinputdevice"
                    switch
                  ></b-form-checkbox>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("OrganizationBuildingInfo")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="orgbuildinginfolist"
                    v-model="OrgTourniquetDevice.orgbuildinginfoid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="address"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="OrgTourniquetDevice.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <!-- <CRow>
                <C-Col>
                  <div class="form-group form-row">
                    <label
                      class="col-form-label col-sm-1"
                      for="datepicker-dateformat2"
                      >{{ $t("isinputdevice") }}</label
                    >
                    <b-form-checkbox
                    style="margin-top:8px"
                      class="col-sm-9"
                      v-model="OrgTourniquetDevice.isinputdevice"
                      switch
                    ></b-form-checkbox>
                  </div>
                </C-Col>
              </CRow> -->
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
            style="vertical-align: middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width: 30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="LanguageList"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="Translate.languageid"
                    style="z-index: 9999"
                  ></v-select>
                </b-th>
                <b-th style="width: 60%">
                  <CInput
                    class="mb-0"
                    v-model="Translate.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width: 10%">
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
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push(`/Management/OrgTourniquetDevice`)"
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
import OrgTourniquetDeviceService from "@/services/OrgTourniquetDevice.service";
import OrganizationService from "@/services/organization.service";
import OrganizationBuildingInfoService from "@/services/OrganizationBuildingInfo.service";
import AccountService from '../../../services/account.service';
export default {
  data() {
    return {
      SaveLoading: false,
      OrgTourniquetDevice: {},
      Translates: [],
      organizationlist: [],
      orgbuildinginfolist: [],
      statelist: [],
      TranslateModal: false,
      fields: [
        {
          key: "languagename",
          label: this.$t("translateModal.status"),
        },
        {
          key: "translatetext",
          label: this.$t("translateModal.name"),
        },
        {
          key: "actions",
          label: "",
        },
      ],
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      orgtourniquetuserlist:[],
      organizationlist: [],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    OrgTourniquetDeviceService.Get(this.$route.params.id).then((res) => {
      this.OrgTourniquetDevice = res.data;
      this.ChangeOrg();
    });
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    OrganizationService.GetAll().then((res) => {
      this.organizationlist = res.data;
    });
  },
  methods: {
    SaveData() {
      if (!this.check()) {
        return false;
      }
      OrgTourniquetDeviceService.Update(this.OrgTourniquetDevice)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/Management/OrgTourniquetDevice`);
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    ChangeOrg() {
      this.OrgTourniquetDevice.orgbuildinginfoid = 0;
      this.OrgTourniquetDevice.orgtourniquetuserid = 0;
      if (!!this.OrgTourniquetDevice.organizationid) {
        OrganizationBuildingInfoService.GetAll(
          this.OrgTourniquetDevice.organizationid
        ).then((res) => {
          this.orgbuildinginfolist = res.data;
        });
        AccountService.GetUserListByOrg(
          this.OrgTourniquetDevice.organizationid
        ).then((res) => {
          this.orgtourniquetuserlist = res.data;
        });
      }
    },
    check() {
      var self = this;
      if (
        self.OrgTourniquetDevice.devicecode === 0 ||
        self.OrgTourniquetDevice.devicecode === null ||
        self.OrgTourniquetDevice.devicecode === undefined ||
        self.OrgTourniquetDevice.devicecode === ""
      ) {
        this.makeToast(
          this.$t("devicecodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgTourniquetDevice.deviceip === 0 ||
        self.OrgTourniquetDevice.deviceip === null ||
        self.OrgTourniquetDevice.deviceip === undefined ||
        self.OrgTourniquetDevice.deviceip === ""
      ) {
        this.makeToast(
          this.$t("deviceipNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.OrgTourniquetDevice.deviceport === 0 ||
      //   self.OrgTourniquetDevice.deviceport === null ||
      //   self.OrgTourniquetDevice.deviceport === undefined ||
      //   self.OrgTourniquetDevice.deviceport === ""
      // ) {
      //   this.makeToast(
      //     this.$t("deviceportNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.OrgTourniquetDevice.deviceprotocol === 0 ||
      //   self.OrgTourniquetDevice.deviceprotocol === null ||
      //   self.OrgTourniquetDevice.deviceprotocol === undefined ||
      //   self.OrgTourniquetDevice.deviceprotocol === ""
      // ) {
      //   this.makeToast(
      //     this.$t("deviceprotocolNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.OrgTourniquetDevice.deviceusername === 0 ||
        self.OrgTourniquetDevice.deviceusername === null ||
        self.OrgTourniquetDevice.deviceusername === undefined ||
        self.OrgTourniquetDevice.deviceusername === ""
      ) {
        this.makeToast(
          this.$t("deviceusernameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgTourniquetDevice.devicepassword === 0 ||
        self.OrgTourniquetDevice.devicepassword === null ||
        self.OrgTourniquetDevice.devicepassword === undefined ||
        self.OrgTourniquetDevice.devicepassword === ""
      ) {
        this.makeToast(
          this.$t("devicepasswordNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgTourniquetDevice.organizationid === 0 ||
        self.OrgTourniquetDevice.organizationid === null ||
        self.OrgTourniquetDevice.organizationid === undefined ||
        self.OrgTourniquetDevice.organizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.OrgTourniquetDevice.orgtourniquetuserid === 0 ||
        self.OrgTourniquetDevice.orgtourniquetuserid === null ||
        self.OrgTourniquetDevice.orgtourniquetuserid === undefined ||
        self.OrgTourniquetDevice.orgtourniquetuserid === ""
      ) {
        this.makeToast(
          this.$t("orgtourniquetuserNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.OrgTourniquetDevice.orgbuildinginfoid === 0 ||
      //   self.OrgTourniquetDevice.orgbuildinginfoid === null ||
      //   self.OrgTourniquetDevice.orgbuildinginfoid === undefined ||
      //   self.OrgTourniquetDevice.orgbuildinginfoid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("orgbuildinginfoidNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.OrgTourniquetDevice.stateid === 0 ||
        self.OrgTourniquetDevice.stateid === null ||
        self.OrgTourniquetDevice.stateid === undefined ||
        self.OrgTourniquetDevice.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
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
        this.OrgTourniquetDeviceTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.OrgTourniquetDeviceTranslatePush();
        this.items2 = this.items;
      }
      this.Translate = {};
    },
    SaveTranslate() {
      this.TranslateModal = false;
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
    
  <style>
</style>
  