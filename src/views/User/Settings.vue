<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-tabs pills vertical>
          <!-- <b-tab :title="$t('DevicesHistory')" active>
            <b-card>
              <vs-list>
                <vs-list-header
                  color="success"
                  :title="$t('isCurrent')"
                ></vs-list-header>
                <vs-list-item
                  v-for="(el, i) in IsCurrents"
                  :key="i"
                  :title="
                    el.DeviceInfo.UA.Family +
                      ' ' +
                      el.DeviceInfo.UA.Major +
                      '.' +
                      el.DeviceInfo.UA.Minor +
                      ',   ' +
                      el.DeviceInfo.OS.Family +
                      ' ' +
                      el.DeviceInfo.OS.Major
                  "
                  :subtitle="el.RequestInfo.IpAdress"
                >
                  <p class="m-0 p-0">
                    <b-badge variant="success">
                      {{ el.RequestInfo.LastAccessTime }}
                    </b-badge>
                  </p>
                </vs-list-item>
                <vs-list-header :title="$t('Devices')"></vs-list-header>
                <vs-list-item
                  v-for="(item, index) in DevicesHistory"
                  :key="index"
                  :title="
                    item.DeviceInfo.UA.Family +
                      ' ' +
                      item.DeviceInfo.UA.Major +
                      '.' +
                      item.DeviceInfo.UA.Minor +
                      ',   ' +
                      item.DeviceInfo.OS.Family +
                      ' ' +
                      item.DeviceInfo.OS.Major
                  "
                  :subtitle="item.RequestInfo.IpAdress"
                >
                  <p class="m-0 p-0 d-flex align-items-center">
                    <b-badge variant="inherit">
                      {{ item.RequestInfo.LastAccessTime }}
                    </b-badge>
                    <vs-tooltip :text="$t('Delete')" position="top">
                      <b-icon
                        scale="1.4"
                        @click="
                          $bvModal.show('DeleteModal' + item.RequestInfo.Id)
                        "
                        style="cursor:pointer"
                        variant="danger"
                        icon="trash"
                      ></b-icon>
                    </vs-tooltip>
                    <b-modal
                      :id="'DeleteModal' + item.RequestInfo.Id"
                      hide-footer
                    >
                      <template v-slot:modal-title>{{
                        $t("WantDelete")
                      }}</template>
                      <div class="d-block text-right">
                        <CButton
                          @click="
                            $bvModal.hide('DeleteModal' + item.RequestInfo.Id)
                          "
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Delete(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Approve") }}
                        </CButton>
                      </div>
                    </b-modal>
                  </p>
                </vs-list-item>
              </vs-list>
            </b-card>
          </b-tab> -->
          
          <b-tab
            :title="$t('OrganizationInfoChange')"
            v-if="$can('OrganizationEditByUser', 'permissions')"
          >
            <b-card>
              <CRow>
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="ShortName"
                    rules="required|max:250"
                  >
                    <CInput
                      :placeholder="$t('ShortName')"
                      autocomplete="ShortName"
                      horizontal
                      :label="$t('ShortName')"
                      v-model="OrganizationInfoChange.ShortName"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="FullName"
                    rules="required|max:250"
                  >
                    <CInput
                      :placeholder="$t('FullName')"
                      autocomplete="FullName"
                      horizontal
                      :label="$t('FullName')"
                      v-model="OrganizationInfoChange.FullName"
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
                <CCol>
                  <ValidationProvider v-slot="v" name="oked" rules="required">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3" for>{{
                        $t("oked")
                      }}</label>
                      <v-select
                        class="col-sm-9"
                        :options="okedlist"
                        v-model="OrganizationInfoChange.okedid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="fullname"
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
                  <ValidationProvider
                    v-slot="v"
                    name="Adress"
                    rules="required|max:250"
                  >
                    <CInput
                      :placeholder="$t('Adress')"
                      autocomplete="Adress"
                      horizontal
                      :label="$t('Adress')"
                      v-model="OrganizationInfoChange.Adress"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="ZipCode"
                    rules="required|max:40"
                  >
                    <CInput
                      :placeholder="$t('ZipCode')"
                      autocomplete="ZipCode"
                      horizontal
                      :label="$t('ZipCode')"
                      v-model="OrganizationInfoChange.ZipCode"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="ContactInfo"
                    rules="required|max:40"
                  >
                    <CInput
                      :placeholder="$t('ContactInfo')"
                      autocomplete="ContactInfo"
                      horizontal
                      :label="$t('ContactInfo')"
                      v-model="OrganizationInfoChange.ContactInfo"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="Director"
                    rules="required|max:40"
                  >
                    <CInput
                      :placeholder="$t('Director')"
                      autocomplete="Director"
                      horizontal
                      :label="$t('Director')"
                      v-model="OrganizationInfoChange.Director"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="Accounter"
                    rules="required|max:40"
                  >
                    <CInput
                      :placeholder="$t('Accounter')"
                      autocomplete="Accounter"
                      horizontal
                      :label="$t('Accounter')"
                      v-model="OrganizationInfoChange.Accounter"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="Cashier"
                    rules="required|max:40"
                  >
                    <CInput
                      :placeholder="$t('Cashier')"
                      autocomplete="Cashier"
                      horizontal
                      :label="$t('Cashier')"
                      v-model="OrganizationInfoChange.Cashier"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="website"
                    rules="required|max:40"
                  >
                    <CInput
                      :placeholder="$t('website')"
                      autocomplete="website"
                      horizontal
                      :label="$t('website')"
                      v-model="OrganizationInfoChange.website"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="foundationdocument"
                    rules="required|max:40"
                  >
                    <CInput
                      :placeholder="$t('foundationdocument')"
                      autocomplete="foundationdocument"
                      horizontal
                      :label="$t('foundationdocument')"
                      v-model="OrganizationInfoChange.foundationdocument"
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
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="foundationdate"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label
                        for="datepicker-dateformat2"
                        class="col-form-label col-sm-3"
                        >{{ $t("foundationdate") }}</label
                      >
                      <div class="col-sm-9">
                        <!-- <custom-date-input />  -->
                        <date-picker
                          v-model="OrganizationInfoChange.foundationdate"
                          style="width:100%"
                          size="sm"
                          lang="ru"
                          :placeholder="$t('foundationdate')"
                          value-type="format"
                          format="DD.MM.YYYY"
                        >
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">
                              {{ v.errors[0] }}
                            </div>
                          </template>
                        </date-picker>
                      </div>
                    </div>
                  </ValidationProvider>
                </CCol>
              </CRow>
              <CRow>
                 <CCol lg="4" sm="4" md="4">
                <ValidationProvider
                  v-slot="v"
                  name="studentcapacity"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('studentcapacity')"
                    autocomplete="studentсapacity"
                    horizontal
                    type="number"
                    :label="$t('studentcapacity')"
                    v-model="OrganizationInfoChange.studentсapacity"
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
                <CCol>
                  <div class="text-left">
                    <CButton
                      class="ml-4"
                      size="sm"
                      color="danger"
                      @click="$router.push(`/dashboard`)"
                    >
                      <b-icon icon="arrow-left-short"></b-icon>
                      {{ $t("back") }}
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
                      {{ $t("Save") }}
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </b-card>
          </b-tab>
          <b-tab
            :title="$t('MobilNumberChange')"
            v-if="$can('ChangeUserMobileNumberByAdmin', 'permissions')"
          >
            <b-card>
              <CRow>
                <CCol lg="10">
                  <ValidationProvider
                    v-slot="v"
                    name="username"
                    rules="required|max:250"
                  >
                    <CInput
                      :placeholder="$t('username')"
                      autocomplete="username"
                      horizontal
                      :label="$t('username')"
                      v-model="MobilNumberChange.username"
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
                <CCol lg="10">
                  <ValidationProvider
                    v-slot="v"
                    name="mobilenumber"
                    rules="required|max:250"
                  >
                    <CInput
                      :placeholder="$t('mobilenumber')"
                      autocomplete="mobilenumber"
                      horizontal
                        v-mask="'+###-##-###-##-##'"
                      :label="$t('mobilenumber')"
                      v-model="MobilNumberChange.mobilenumber"
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
                <CCol>
                  <div class="text-left">
                    <CButton
                      class="ml-4"
                      size="sm"
                      color="danger"
                      @click="$router.push(`/dashboard`)"
                    >
                      <b-icon icon="arrow-left-short"></b-icon>
                      {{ $t("back") }}
                    </CButton>
                  </div>
                </CCol>
                <CCol>
                  <div class="text-right">
                    <CButton
                      size="sm"
                      color="success"
                      class="mr-4"
                      @click="SaveMobileNumberData"
                    >
                      <b-spinner v-if="SaveMobileLoading" small></b-spinner>
                      <b-icon v-if="!SaveMobileLoading" icon="check2"></b-icon>
                      {{ $t("Save") }}
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </b-card>
          </b-tab>

          <!-- <b-tab title="Tab 2"><b-card>Tab contents 2</b-card></b-tab>
                    <b-tab title="Tab 3"><b-card>Tab contents 3</b-card></b-tab> -->
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AccountService from "@/services/account.service";
import OrgInfoService from "@/services/orginfo.service";
import OkedService from "@/services/Oked.service";
import OrganizationService from "@/services/organization.service";
export default {
  data() {
    return {
      DevicesHistory: [],
      IsCurrents: [],
      SaveMobileLoading : false,
      SaveLoading : false,
      okedlist: [],
      OrganizationInfoChange: {},
      MobilNumberChange:{
        username: "",
        mobilenumber:"+998",
      }
    };
  },
  created() {
    this.GetDevicesList();
    OrgInfoService.GetByUser().then((res) => {
      this.OrganizationLocationChange = res.data;
    });
    OkedService.GetAll().then((res) => {
      this.okedlist = res.data;
    });
    OrganizationService.GetOrganizationByUser().then((res) => {
      this.OrganizationInfoChange = res.data;
    });
  },
  methods: {
    GetDevicesList() {
      AccountService.GetUserTrustedDevices().then((res) => {
        this.DevicesHistory = res.data.filter(
          (item) => item.RequestInfo.IsCurrent === false
        );
        this.IsCurrents = res.data.filter(
          (item) => item.RequestInfo.IsCurrent === true
        );
      });
    },
    Delete(item) {
      AccountService.DeleteTrustedDevice(item.RequestInfo.Id)
        .then((res) => {
          this.$bvModal.hide("DeleteModal" + item.RequestInfo.Id);
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.GetDevicesList();
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.$bvModal.hide("DeleteModal" + item.RequestInfo.Id);
        });
    },
    SaveData() {
      OrganizationService.UpdateOrganizationByUser(this.OrganizationInfoChange)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/dashboard`);
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
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    SaveMobileNumberData() {
      AccountService.ChangeUserMobileNumberByAdmin(this.MobilNumberChange.username,this.MobilNumberChange.mobilenumber)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/dashboard`);
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
      this.$bvToast.toast(message, {
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
