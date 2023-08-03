<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AppClient") }}</h4>
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
                  name="appname"
                  rules="required|max:9"
                >
                  <label for="">{{ $t("appname") }}</label>
                  <CInput
                    :placeholder="$t('appname')"
                    autocomplete="appname"
                    horizontal
                    v-model="AppClient.appname"
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
                <ValidationProvider
                  v-slot="v"
                  name="allowedip"
                  rules="required"
                >
                  <label for="">{{ $t("allowedip") }}</label>
                  <CInput
                    :placeholder="$t('allowedip')"
                    autocomplete="text"
                    horizontal
                    v-model="AppClient.allowedip"
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
                <ValidationProvider
                  v-slot="v"
                  name="tokenlifetime"
                  rules="required"
                >
                  <label for="">{{ $t("tokenlifetime") }}</label>
                  <CInput
                    :placeholder="$t('tokenlifetime')"
                    horizontal
                    v-model="AppClient.tokenlifetime"
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
                <ValidationProvider
                  v-slot="v"
                  name="redirecturi"
                  rules="required"
                >
                  <label for="">{{ $t("redirecturi") }}</label>
                  <CInput
                    :placeholder="$t('redirecturi')"
                    autocomplete="text"
                    horizontal
                    v-model="AppClient.redirecturi"
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
                <ValidationProvider
                  v-slot="v"
                  name="postlogoutredirecturi"
                  rules="required"
                >
                  <label for="">{{ $t("postlogoutredirecturi") }}</label>
                  <CInput
                    :placeholder="$t('postlogoutredirecturi')"
                    autocomplete="text"
                    horizontal
                    v-model="AppClient.postlogoutredirecturi"
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
                <label for>{{ $t("authusertype") }}</label>
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-9"
                    :options="AuthusertypeList"
                    v-model="AppClient.authusertypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow v-if="AppClient.id != 0">
              <CCol sm="6">
                <div>
                  <label for="">{{ $t("appid") }}</label>
                  <div>
                    <span style="color:blue">{{ AppClient.appid }}</span>
                  </div>
                </div>
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
                @click="$router.push({ name: 'AppClient' })"
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
import AuthUserTypeService from "@/services/AuthUserType.service";
import AppClientService from "@/services/AppClient.service";
export default {
  data() {
    return {
      SaveLoading: false,
      AppClient: {},
      selectedrowid: 0,
      AuthusertypeList: [],
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    AuthUserTypeService.GetAll().then((res) => {
      self.AuthusertypeList = res.data;
    });
    AppClientService.Get(self.selectedrowid).then((res) => {
      self.AppClient = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.AppClient.appname === 0 ||
        self.AppClient.appname === null ||
        self.AppClient.appname === undefined ||
        self.AppClient.appname === ""
      ) {
        this.makeToast(
          this.$t("appnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppClient.allowedip === 0 ||
        self.AppClient.allowedip === null ||
        self.AppClient.allowedip === undefined ||
        self.AppClient.allowedip === ""
      ) {
        this.makeToast(
          this.$t("allowedipNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppClient.tokenlifetime === 0 ||
        self.AppClient.tokenlifetime === null ||
        self.AppClient.tokenlifetime === undefined ||
        self.AppClient.tokenlifetime === ""
      ) {
        this.makeToast(
          this.$t("tokenlifetimeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppClient.redirecturi === 0 ||
        self.AppClient.redirecturi === null ||
        self.AppClient.redirecturi === undefined ||
        self.AppClient.redirecturi === ""
      ) {
        this.makeToast(
          this.$t("redirecturiNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppClient.postlogoutredirecturi === 0 ||
        self.AppClient.postlogoutredirecturi === null ||
        self.AppClient.postlogoutredirecturi === undefined ||
        self.AppClient.postlogoutredirecturi === ""
      ) {
        this.makeToast(
          this.$t("postlogoutredirecturiNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppClient.authusertypeid === 0 ||
        self.AppClient.authusertypeid === null ||
        self.AppClient.authusertypeid === undefined ||
        self.AppClient.authusertypeid === ""
      ) {
        this.makeToast(
          this.$t("authusertypeNotCorrect"),
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
      AppClientService.Update(self.AppClient)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "AppClient" });
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
