<template>
  <CContainer class="d-flex content-center min-vh-100">
    <b-row>
      <b-col>
        <CCardGroup>
          <CCard class="p-4 mycss">
            <CCardBody>
              <CForm>
                <h1>{{ $t("auth") }}</h1>
                <p class="text-muted">{{ $t("Sign In to your account") }}</p>

                <ValidationProvider v-slot="v" name="login" rules="required">
                  <CInput
                    :placeholder="$t('Username')"
                    v-model="Login.username"
                    autofocus
                    required
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #prepend-content><b-icon-person /> </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">
                        {{ v.errors[0] }}
                      </div>
                    </template>
                  </CInput>
                </ValidationProvider>
                <ValidationProvider v-slot="v" name="password" rules="required">
                  <CInput
                    :placeholder="$t('Password')"
                    type="password"
                    autocomplete="curent-password"
                    v-model="Login.password"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                    v-on:keyup.enter="send1"
                  >
                    <template #prepend-content><b-icon-lock /></template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">
                        {{ v.errors[0] }}
                      </div>
                    </template>
                  </CInput>
                </ValidationProvider>
                <b-row>
                  <b-col
                    sm="12"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <CButton
                        color="primary"
                        v-if="isLocal"
                        class="px-4 mr-2"
                        @click="send"
                        :disabled="isLoading || isLoadingEspLogin"
                        @keydown.enter.prevent="send"
                      >
                        <b-spinner small v-if="isLoading"></b-spinner>
                        {{ $t("login") }}</CButton
                      >
                      <CButton
                        color="primary"
                        v-if="!isLocal"
                        class="px-4"
                        @click="send1"
                      >
                        <b-spinner v-if="twofactorloading" small></b-spinner>
                        {{ $t("login") }}</CButton
                      >
                    </div>
                    <a @click="OpenContactModal" href="#">
                      {{ $t("ContactInfo") }}
                    </a>
                    <a @click="OpenForgotPasswordModal" href="#">
                      {{ $t("ForgotPassword") }}
                    </a>
                  </b-col>
                  <b-modal
                    id="ForgotPasswordModal"
                    hide-footer
                    :title="$t('ResetPassword')"
                    no-close-on-backdrop
                  >
                    <ValidationProvider
                      v-slot="v"
                      name="birthregion"
                      rules="required"
                    >
                      <div class="form-group form-row">
                        <label
                          class="pt-1 col-sm-4"
                          style="font-size:12px"
                          for
                          >{{ $t("username") }}</label
                        >
                        <CInput
                          class="col-sm-8"
                          size="sm"
                          :placeholder="$t('username')"
                          v-model="Reset.username"
                          autofocus
                          required
                          :addInputClasses="{
                            'is-invalid': v.classes.invalid,
                            'is-valid': v.classes.valid,
                          }"
                        >
                          <template #prepend-content
                            ><b-icon-person
                          /></template>
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">
                              {{ v.errors[0] }}
                            </div>
                          </template>
                        </CInput>
                      </div>
                    </ValidationProvider>
                    <b-row v-if="!OpenRestorePassword">
                      <b-col class="text-right">
                        <b-button
                          @click="RestorePassword"
                          variant="success"
                          size="sm"
                        >
                          <b-spinner
                            v-if="RestorePasswordLoading"
                            small
                          ></b-spinner>
                          {{ $t("Reset") }}
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-collapse v-model="OpenRestorePassword">
                      <b-row>
                        <b-col>
                          <p>
                            {{
                              $t("SendSmmYourPhone", {
                                phonenumber: phonenumber,
                              })
                            }}
                          </p>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <ValidationProvider
                            v-slot="v"
                            name="birthregion1"
                            rules="required"
                          >
                            <div class="form-group form-row">
                              <label
                                class="pt-1 col-sm-4"
                                style="font-size:12px"
                                for
                                >{{ $t("smscode") }}</label
                              >
                              <CInput
                                class="col-sm-8"
                                size="sm"
                                :placeholder="$t('smscode')"
                                v-model="Reset.smscode"
                                autofocus
                                required
                                :addInputClasses="{
                                  'is-invalid': v.classes.invalid,
                                  'is-valid': v.classes.valid,
                                }"
                              >
                                <template #prepend-content
                                  ><b-icon-lock
                                /></template>
                                <template slot="invalid-feedback">
                                  <div class="invalid-feedback">
                                    {{ v.errors[0] }}
                                  </div>
                                </template>
                              </CInput>
                            </div>
                          </ValidationProvider>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <ValidationProvider
                            v-slot="v"
                            name="newpassword"
                            :rules="{
                              required: true,
                              regex: /^(?=.*\d)[A-Za-z\d@$!%*#?&]{4,}$/,
                            }"
                          >
                            <div class="form-group form-row">
                              <label
                                class="pt-1 col-sm-4"
                                style="font-size:12px"
                                for
                                >{{ $t("newpassword") }}</label
                              >
                              <CInput
                                type="password"
                                class="col-sm-8"
                                :description="
                                  !v.classes.valid ? $t('password.info1') : ''
                                "
                                size="sm"
                                :placeholder="$t('newpassword')"
                                v-model="Reset.newpassword"
                                autofocus
                                required
                                :addInputClasses="{
                                  'is-invalid': v.classes.invalid,
                                  'is-valid': v.classes.valid,
                                }"
                              >
                                <template #prepend-content
                                  ><b-icon-lock
                                /></template>
                                <template slot="invalid-feedback">
                                  <div class="invalid-feedback">
                                    {{ v.errors[0] }}
                                  </div>
                                </template>
                              </CInput>
                            </div>
                          </ValidationProvider>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <ValidationProvider
                            v-slot="v"
                            name="confirmedpassword"
                            rules="required|confirmed:newpassword"
                          >
                            <div class="form-group form-row">
                              <label
                                class="pt-1 col-sm-4"
                                style="font-size:12px"
                                for
                                >{{ $t("confirmpassword") }}</label
                              >
                              <CInput
                                class="col-sm-8"
                                size="sm"
                                type="password"
                                :placeholder="$t('confirmpassword')"
                                v-model="Reset.confirmedpassword"
                                autofocus
                                required
                                :addInputClasses="{
                                  'is-invalid': v.classes.invalid,
                                  'is-valid': v.classes.valid,
                                }"
                              >
                                <template #prepend-content
                                  ><b-icon-lock
                                /></template>
                                <template slot="invalid-feedback">
                                  <div class="invalid-feedback">
                                    {{ v.errors[0] }}
                                  </div>
                                </template>
                              </CInput>
                            </div>
                          </ValidationProvider>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col class="d-flex justify-content-between">
                          <b-button
                            size="sm"
                            @click="CloseResetPassword"
                            variant="danger"
                          >
                            {{ $t("back") }}
                          </b-button>
                          <b-button
                            size="sm"
                            @click="ChangePassword"
                            variant="success"
                          >
                            <b-spinner
                              v-if="ChangePasswordLoading"
                              small
                            ></b-spinner>
                            {{ $t("Reset") }}
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-collapse>
                  </b-modal>
                </b-row>
              </CForm>
            </CCardBody>
          </CCard>
          <b-modal
            id="ContactModal"
            size="md"
            :title="$t('ContactInfo')"
            :centered="true"
            no-close-on-backdrop
            hide-footer
          >
            <b-row>
              <b-col class="d-flex justify-content-between">
                <span> {{ $t("TelegramGroup") }} </span>
                <a
                  style="color : blue"
                  target="_blank"
                  href="https://t.me/erpmaktabuz"
                >
                  https://t.me/erpmaktabuz
                </a>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="d-flex justify-content-between">
                <span> {{ $t("TelegramChannel") }} </span>
                <a
                  style="color : blue"
                  target="_blank"
                  href="https://t.me/joinchat/RPvzxvmSBOY4up_L"
                >
                  Видео</a
                >
              </b-col>
            </b-row>
          </b-modal>
          <b-modal
            id="TwoFactorModal"
            :title="$t('TwoFactor')"
            :centered="true"
            no-close-on-backdrop
            hide-footer
          >
            <b-row v-if="!isPhoneNumber">
              <b-col>
                <b-alert variant="danger" show>
                  <div class="alert-body">
                    <b-icon-exclamation-triangle-fill
                      class="mr-3"
                      scale="1.8"
                      variant="danger"
                    />
                    {{ $t("NotFoundYourPhoneNumber") }}
                  </div>
                </b-alert>
              </b-col>
            </b-row>
            <!-- <b-row v-if="isPhoneNumber">
              <b-col>
                <b-alert
                  variant="success"
                  show
                >
                  <div class="alert-body">
                    <b-icon icon="check-square" class="mr-3" scale="1.8" variant="success"></b-icon> Sizning telefon raqamingiz o'rnatilgan
                  </div>
                </b-alert>
              </b-col>
            </b-row> -->
            <b-row v-if="!isPhoneNumber">
              <b-col>
                <label for=""> {{ $t("EnterYourPhoneNumber") }} </label>
                <b-input-group prepend="+998">
                  <b-form-input
                    v-model="enterphonenumber"
                    v-mask="'##-###-##-##'"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" @click="SendPhoneNumber">
                      {{ $t("Send") }}
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
            <b-collapse v-model="isSmsCode">
              <b-row>
                <b-col>
                  <p>
                    {{ $t("SendSmmYourPhone", { phonenumber: phonenumber }) }}
                  </p>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <label for="" class="d-flex justify-content-between">
                    <span>{{ $t("EnterSmsCode") }} </span>
                    <span>
                      <b> {{ time }} </b></span
                    >
                  </label>
                  <b-form-input
                    v-mask="'####'"
                    v-model="smscode"
                  ></b-form-input>
                  <a
                    @click="ReSendSmsCodeFunc"
                    style="color:blue;cursor:pointer"
                    v-if="ResendSmsCodeBool"
                  >
                    <b-icon-arrow-clockwise /> {{ $t("ReSendSmsCode") }}
                  </a>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="text-center">
                  <b-button variant="success" @click="SendSmsCode">
                    <b-spinner v-if="loading" small></b-spinner>
                    {{ $t("login") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-collapse>
          </b-modal>
          <!-- <b-modal id="SendSmsCodeModal"  :title="$t('Telefon raqam')" :centered="true" no-close-on-backdrop hide-footer>
            <b-row>
              <b-col>
                <label for=""> Telefon raqamingizni kiriting  </label>
                <b-input v-model="enterphonenumber"></b-input>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="text-center">
                <b-button variant="success" @click="SendPhoneNumber"> Ok </b-button>
              </b-col>
            </b-row>
          </b-modal> -->
          <!-- <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
            <CButton
              color="primary"
              class="active mt-3"
            >
              Register Now!
            </CButton>
          </CCard> -->
        </CCardGroup>
      </b-col>
    </b-row>
  </CContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountService from "@/services/account.service";
import {
  CContainer,
  CCardGroup,
  CCard,
  CCardBody,
  CForm,
  CInput,
  CButton,
} from "@coreui/vue";
import { ValidationProvider } from "vee-validate";
import {
  BRow,
  BCol,
  BModal,
  BCollapse,
  BButton,
  BIconPerson,
  BIconLock,
  BSpinner,
  BAlert,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BIconExclamationTriangleFill,
  BIconArrowClockwise,
} from "bootstrap-vue";
export default {
  components: {
    CContainer,
    CCardGroup,
    CCard,
    CCardBody,
    CForm,
    ValidationProvider,
    CInput,
    CButton,
    BIconPerson,
    BRow,
    BCol,
    BModal,
    BCollapse,
    BButton,
    BIconLock,
    BSpinner,
    BAlert,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BIconExclamationTriangleFill,
    BIconArrowClockwise,
  },
  name: "Login",
  data() {
    return {
      Login: {
        username: "",
        password: "",
      },
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      submitted: false,
      isLoading: false,
      isLoadingEspLogin: false,
      phonenumber: "",
      smscode: "",
      enterphonenumber: "",
      isSmsCode: false,
      isPhoneNumber: false,
      twofactorloading: false,
      loading: false,
      RestorePasswordLoading: false,
      Reset: {
        username: "",
        smscode: "",
        newpassword: "",
        confirmedpassword: "",
      },
      OpenRestorePassword: false,
      ChangePasswordLoading: false,
      time: "",
      clearTime: null,
      ResendSmsCodeBool: false,
    };
  },
  created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    if (!!code) {
      this.oneIdLoading = true;
      AccountService.OneIdSignIn({ code: code, redirectUrl: this.$clientUrl })
        .then((res) => {
          this.oneIdLoading = false;
          // localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_info", JSON.stringify(res.data.userinfo));
          this.$store.dispatch("auth/signIn", res.data);
          this.$router.push(
            this.$route.query.redirectFrom || {
              path: "/",
            }
          );
        })
        .catch((error) => {
          this.oneIdLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters("auth", ["loginFail"]),
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode",
    ]),
    isLocal() {
      if (window.location.href.indexOf("http://localhost") > -1) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions("auth", ["login", "loginByToken"]),
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        variant: type,
        solid: true,
      });
    },
    async send() {
      this.isLoading = true;
      if (this.Login.username == "" && this.Login.password == "") {
        this.$makeToast(this.$t("validateMessage"), this.$t("error"), "danger");
        this.isLoading = false;
      } else {
        this.login({
          Username: this.Login.username,
          Password: this.Login.password,
        }).then((res) => {
          if (!res) {
            this.$makeToast(
              "Неправильное имя пользователя или пароль.",
              this.$t("actions.error"),
              "danger"
            );
          }
          this.isLoading = false;
        });
      }
    },
    OpenContactModal() {
      this.$bvModal.show("ContactModal");
    },
    ReSendSmsCodeFunc() {
      AccountService.ReSendSmsCode()
        .then((res) => {
          clearTimeout(this.clearTime);
          this.countdown(10, 0);
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    OpenForgotPasswordModal() {
      this.Reset.username = "";
      this.Reset.smscode = "";
      this.Reset.newpassword = "";
      this.Reset.confirmedpassword = "";
      this.OpenRestorePassword = false;
      this.phonenumber = "";
      this.$bvModal.show("ForgotPasswordModal");
    },
    send1() {
      this.twofactorloading = true;
      this.enterphonenumber = "";
      this.phonenumber = "";
      this.smscode = "";
      AccountService.SignIn(this.Login)
        .then((res) => {
          this.twofactorloading = false;
          if (res.data.requiredphonenumber) {
            this.$bvModal.show("TwoFactorModal");
            this.enterphonenumber = "";
            this.isSmsCode = false;
          }
          if (res.data.phoneNumber && !res.data.trusteddevice) {
            this.$bvModal.show("TwoFactorModal");
            this.phonenumber = res.data.phoneNumber;
            this.isPhoneNumber = true;
            this.isSmsCode = true;
            clearTimeout(this.clearTime);
            this.countdown(10, 0);
          }
          if (res.data.trusteddevice) {
            localStorage.setItem(
              "user_info",
              JSON.stringify(res.data.userinfo)
            );
            this.$store.dispatch("auth/signIn", res.data);
          }
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.twofactorloading = false;
        });
    },
    CloseResetPassword() {
      this.$bvModal.hide("ForgotPasswordModal");
    },
    countdown(minutes, seconds) {
      var endTime, hours, mins, msLeft, time, x;

      const twoDigits = (n) => {
        return n <= 9 ? "0" + n : n;
      };

      const updateTimer = () => {
        this.ResendSmsCodeBool = false;
        msLeft = endTime - +new Date();
        if (msLeft < 1000) {
          this.$bvModal.hide("TwoFactorModal");
          clearTimeout(this.clearTime);
        } else {
          if (msLeft < 420 * 1000) {
            this.ResendSmsCodeBool = true;
          }
          time = new Date(msLeft);
          hours = time.getUTCHours();
          mins = time.getUTCMinutes();
          this.time =
            (hours ? hours + ":" + twoDigits(mins) : mins) +
            ":" +
            twoDigits(time.getUTCSeconds());
          this.clearTime = setTimeout(
            updateTimer,
            time.getUTCMilliseconds() + 500
          );
        }
      };
      endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
      updateTimer();
    },
    RestorePassword() {
      this.Reset.smscode = "";
      this.Reset.newpassword = "";
      this.Reset.confirmedpassword = "";
      this.RestorePasswordLoading = true;
      AccountService.RestorePassword({ username: this.Reset.username })
        .then((res) => {
          this.RestorePasswordLoading = false;
          this.phonenumber = res.data.phoneNumber;
          this.OpenRestorePassword = true;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.RestorePasswordLoading = false;
        });
    },
    SendSmsCode() {
      this.loading = true;
      AccountService.SignInTwoFactor({ smscode: this.smscode })
        .then((res) => {
          localStorage.setItem("user_info", JSON.stringify(res.data.userinfo));
          this.$store.dispatch("auth/signIn", res.data);
          this.loading = false;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.loading = false;
        });
    },
    SendPhoneNumber() {
      var enterphonenumber = "+998" + this.enterphonenumber.split("-").join("");
      AccountService.SendSmsCodeForSignIn({ phonenumber: enterphonenumber })
        .then((res) => {
          this.isSmsCode = true;
          clearTimeout(this.clearTime);
          this.countdown(10, 0);
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    ChangePassword() {
      this.ChangePasswordLoading = true;
      AccountService.RestorePasswordConfirm(this.Reset)
        .then((res) => {
          this.ChangePasswordLoading = false;
          this.makeToast(
            this.$t("ChangePasswordSuccess"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("ForgotPasswordModal");
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.ChangePasswordLoading = true;
        });
    },
  },
};
</script>

<style scoped>
.mycss {
  width: 600px;
}
@media only screen and (max-width: 620px) {
  .mycss {
    width: 480px;
  }
}
</style>
