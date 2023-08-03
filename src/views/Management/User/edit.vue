<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary">
        <CCardHeader>
          <b-row>
            <b-col sm="12" md="6" class="text-md-left text-center ">
              <h3 class="m-0">{{ $t("User") }}</h3>
            </b-col>
            <b-col class="text-md-right text-center" sm="12" md="6">
              <b-form-checkbox
                v-model="Account.EnableTwoFactor"
                name="check-button"
                switch
              >
                {{ $t("EnableTwoFactor") }}
              </b-form-checkbox>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12" md="4">
              <CInput
                :label="$t('OrgUsersTable.login')"
                v-model="Account.Username"
              />
            </CCol>
            <CCol sm="12" md="4">
              <CInput
                :label="$t('OrgUsersTable.displayName')"
                v-model="Account.DisplayName"
              />
            </CCol>
            <CCol sm="12" md="4">
              <CInput
                autocomplete="off"
                v-mask="'##############'"
                :label="$t('pinfl')"
                v-model="Account.pinfl"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4" sm="12">
              <label for>{{ $t("OrgUsersTable.orgName") }}</label>
              <!-- <v-select
                :placeholder="$t('ChooseBelow')"
                :options="OrganizationList"
                :reduce="item => item.id"
                label="shortname"
                v-model="Account.OrganizationID"
              ></v-select> -->
              <b-input-group class="achievement-input">
                <b-form-input
                  v-model="Account.OrganizationName"
                  disabled
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenOrganizationModal">
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </CCol>
            <CCol md="4" sm="12">
              <!-- <CInput :label="$t('Password')" type="password" v-model="Account.password" /> -->
              <label for=""> {{ $t("Password") }} </label>
              <b-input-group class="achievement-input">
                <template #prepend>
                  <b-input-group-text>
                    <b-icon icon="key"></b-icon>
                  </b-input-group-text>
                </template>
                <b-form-input
                  type="password"
                  v-model="Account.password"
                  aria-describedby="input-live-help input-live-feedback"
                  @keyup="CheckPassword"
                  :state="nameState"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  {{ $t("PasswordNotSameControl") }}
                </b-form-invalid-feedback>
              </b-input-group>
            </CCol>
            <CCol md="4" sm="12">
              <label for=""> {{ $t("ConfirmPassword") }} </label>
              <b-input-group class="achievement-input">
                <template #prepend>
                  <b-input-group-text>
                    <b-icon icon="key"></b-icon>
                  </b-input-group-text>
                </template>
                <b-form-input
                  type="password"
                  v-model="Account.passwordConfirm"
                  aria-describedby="input-live-help input-live-feedback"
                  @keyup="CheckPassword1"
                  :state="checkpass"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  {{ $t("PasswordNotSame") }}
                </b-form-invalid-feedback>
              </b-input-group>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4" sm="12">
              <CInput
                :label="$t('OrgUsersTable.email')"
                type="email"
                v-model="Account.Email"
              />
            </CCol>
            <CCol sm="12" md="4">
              <label for>{{ $t("roles") }}</label>
              <v-select
                :placeholder="$t('ChooseBelow')"
                :options="RoleList"
                :reduce="(item) => item.shortname"
                label="shortname"
                multiple
                v-model="Account.Roles"
                class="achievement-input"
              ></v-select>
            </CCol>
            <CCol sm="12" md="4">
              <CInput
              type="number"
                :label="$t('MobileNumber')"
                v-model="Account.MobileNumber"
              />
            </CCol>
            <CCol sm="12" md="4">
              <label for>{{ $t("state") }}</label>
              <v-select
                :options="statelist"
                v-model="Account.StateID"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              ></v-select>
            </CCol>
            <CCol sm="6" md="4"></CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol>
              <div class="form-group form-action" style="text-align:center">
                <CButton
                  variant="outline"
                  type="button"
                  size="sm"
                  color="primary"
                  class="mr-1"
                  @click="SaveAccount"
                >
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Save") }}
                </CButton>
                <CButton
                  variant="outline"
                  type="submit"
                  size="sm"
                  color="danger"
                  @click="Back"
                >
                  <b-icon icon="arrow-left"></b-icon>
                  &nbsp; {{ $t("Back") }}
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <b-modal
          id="OrganizationModal"
          size="xl"
          :title="$t('Organization')"
          no-close-on-backdrop
          hide-footer
          modal-class="custom-size-modal"
        >
          <organization-list
            @SelectedItem="SelectedItem"
            @DblClick="AddData"
          ></organization-list>
          <b-row>
            <b-col class="text-center">
              <b-button
                size="sm"
                @click="$bvModal.hide('OrganizationModal')"
                class="mr-2"
                variant="danger"
              >
                <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
              </b-button>
              <b-button
                size="sm"
                @click="AddData(organizationvalue)"
                variant="success"
              >
                <b-icon icon="check2"></b-icon> {{ $t("save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OrganizationService from "@/services/organization.service";
import OrganizationList from "@/components/OrganizationList.vue";
import HelperService from "@/services/helper.service";
import AccountService from "@/services/account.service";
import { BFormInvalidFeedback } from "bootstrap-vue";
export default {
  components: { OrganizationList, BFormInvalidFeedback },
  data() {
    return {
      OrganizationList: [],
      organizationvalue: {},
      RoleList: [],
      statelist: [],
      nameState: null,
      checkpass: null,
      Account: {
        id: "",
        Username: "",
        DisplayName: "",
        Email: "",
        isActive: false,
        OrganizationID: 0,
        stateID: 1,
        organizationName: "",
        organizationINN: "",
        Roles: [],
        password: "",
        passwordConfirm: "",
        expirationDate: "",
        WeightList: [],
        departmentList: "",
      },
    };
  },
  created() {
    OrganizationService.GetAll().then((res) => {
      this.OrganizationList = res.data;
    }),
      HelperService.GetRoleList().then((res) => {
        this.RoleList = res.data;
        res.data;
      }),
      HelperService.GetStateList().then((res) => {
        this.statelist = res.data;
      });
    AccountService.Get(this.$route.params.id).then((res) => {
      this.Account = res.data;
      res.data;
    });
  },
  methods: {
    CheckPassword() {
      if (this.$route.params.id == 0) {
        var strongRegex = new RegExp(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})"
        );
        this.CheckPassword1();
        return !strongRegex.test(this.Account.password)
          ? (this.nameState = false)
          : (this.nameState = true);
      }
    },
    CheckPassword1() {
      if (this.$route.params.id == 0) {
        if (this.Account.password != this.Account.passwordConfirm) {
          this.checkpass = false;
        } else {
          this.checkpass = true;
        }
      }
    },
    AddData(data) {
      this.Account.OrganizationID = data.id;
      this.Account.OrganizationName = data.fullname;
      this.$bvModal.hide("OrganizationModal");
    },
    SelectedItem(data) {
      this.organizationvalue = data;
    },
    OpenOrganizationModal() {
      this.$bvModal.show("OrganizationModal");
    },
    check() {
      var self = this;
      if (
        self.Account.Username === null ||
        self.Account.Username === undefined ||
        self.Account.Username === 0 ||
        self.Account.Username === ""
      ) {
        self.makeToast(
          self.$t("UsernameNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Account.DisplayName === null ||
        self.Account.DisplayName === undefined ||
        self.Account.DisplayName === 0 ||
        self.Account.DisplayName === ""
      ) {
        self.makeToast(
          self.$t("DisplayNameNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.Account.password === null ||
      //   self.Account.password === undefined ||
      //   self.Account.password === 0 ||
      //   self.Account.password === ""
      // ) {
      //   self.makeToast(
      //     self.$t("passwordNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.Account.passwordConfirm === null ||
      //   self.Account.passwordConfirm === undefined ||
      //   self.Account.passwordConfirm === 0 ||
      //   self.Account.passwordConfirm === ""
      // ) {
      //   self.makeToast(
      //     self.$t("passwordConfirmNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (self.nameState === false) {
        self.makeToast(
          self.$t("PasswordNotSameControl"),
          self.$t("error"),
          "danger"
        );
        return false;
      }
      if (self.checkpass === false) {
        self.makeToast(self.$t("PasswordNotSame"), self.$t("error"), "danger");
        return false;
      }
      if (
        self.Account.MobileNumber === null ||
        self.Account.MobileNumber === undefined ||
        self.Account.MobileNumber === 0 ||
        self.Account.MobileNumber === ""
      ) {
        self.makeToast(
          self.$t("MobileNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Account.OrganizationID === null ||
        self.Account.OrganizationID === undefined ||
        self.Account.OrganizationID === 0 ||
        self.Account.OrganizationID === ""
      ) {
        self.makeToast(
          self.$t("OrganizationNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    Back() {
      this.$router.push({
        name: "User",
        query: {
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
        },
      });
    },
    SaveAccount() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      AccountService.Update(this.Account)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          self.$router.push({
            name: "User",
            query: {
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
            },
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
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
  },
};
</script>

<style></style>
