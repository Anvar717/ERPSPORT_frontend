<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-left">{{ $t("OrgIntegrationInfo") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="organizationname"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('organizationname')"
                    autocomplete="organizationname"
                    :label="$t('organizationname')"
                    v-model="OrgIntegrationInfo.organizationname"
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
                  name="responsibleperson"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('responsibleperson')"
                    autocomplete="responsibleperson"
                    :label="$t('responsibleperson')"
                    v-model="OrgIntegrationInfo.responsibleperson"
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
                <CInput
                  :placeholder="$t('phonenumber')"
                  autocomplete="personphonenumber"
                  :label="$t('phonenumber')"
                  v-model="OrgIntegrationInfo.personphonenumber"
                >
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <label for="datepicker-dateformat2">{{
                    $t("startdate")
                  }}</label>
                  <date-picker
                    v-model="OrgIntegrationInfo.startdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
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
                <label for="datepicker-dateformat2">{{ $t("iserpapi") }}</label>
                <b-form-checkbox
                  v-model="OrgIntegrationInfo.iserpapi"
                  switch
                ></b-form-checkbox>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="stateid" rules="required">
                  <label for>{{ $t("state") }}</label>
                  <v-select
                    :options="statelist"
                    v-model="OrgIntegrationInfo.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow class="mb-4">
          <CCol class="text-right">
            <CButton size="sm" color="primary" @click="OpenModal" class="mr-3">
              <b-icon icon="plus"> </b-icon>
              {{ $t("Add") }}
            </CButton>
          </CCol>
        </CRow>
        <CRow class="mx-2 mb-3">
          <CCol>
            <vs-table
              :data="OrgIntegrationInfo.Tables"
              :noDataText="$t('NoItems')"
              style="border:1px solid #eee"
            >
              <template slot="thead">
                <vs-th
                  v-for="(th, indexth) in fields"
                  :key="indexth"
                  style="backgroundColor : #eee"
                  >{{ th.label }}</vs-th
                >
              </template>

              <template slot-scope="{ data }">
                <vs-tr
                  :key="indextr"
                  v-for="(tr, indextr) in data"
                  v-show="tr.Status != 3"
                >
                  <vs-td :data="tr.integrationname">
                    {{ tr.integrationname }}
                  </vs-td>
                  <vs-td :data="tr.description"> {{ tr.description }} </vs-td>
                  <vs-td :data="tr.ismspd"> {{ tr.ismspd }} </vs-td>
                  <vs-td :data="tr.apicoreurl"> {{ tr.apicoreurl }} </vs-td>
                  <vs-td :data="tr.apiurl"> {{ tr.apiurl }} </vs-td>
                  <vs-td :data="tr.samplerequest">
                    {{ tr.samplerequest }}
                  </vs-td>
                  <vs-td :data="tr.sampleresponse">
                    {{ tr.sampleresponse }}
                  </vs-td>
                  <vs-td :data="tr.responsibleperson">
                    {{ tr.responsibleperson }}
                  </vs-td>
                  <vs-td :data="tr.personphonenumber">
                    {{ tr.personphonenumber }}
                  </vs-td>
                  <vs-td :data="tr.startdate"> {{ tr.startdate }} </vs-td>
                  <vs-td :data="tr.authinfo"> {{ tr.authinfo }} </vs-td>
                  <vs-td :data="tr.actions">
                    <div class="text-left">
                      <b-link
                        @click="EditItem(tr, indextr)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Edit') }"
                      >
                        <b-icon icon="pencil"></b-icon>
                      </b-link>
                      <b-link
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Delete') }"
                        @click="DeleteItem(tr, indextr)"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-link>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <b-modal
              v-model="tableModal"
              size="xl"
              hide-footer
              no-close-on-backdrop
            >
              <CRow>
                <CCol>
                  <CInput
                    :placeholder="$t('integrationname')"
                    autocomplete="integrationname"
                    :label="$t('integrationname')"
                    v-model="tabrow.integrationname"
                  >
                  </CInput>
                </CCol>
                <CCol>
                  <label for="datepicker-dateformat2">{{ $t("ismspd") }}</label>
                  <b-form-checkbox
                    v-model="tabrow.ismspd"
                    switch
                  ></b-form-checkbox>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CInput
                    :placeholder="$t('apicoreurl')"
                    autocomplete="apicoreurl"
                    :label="$t('apicoreurl')"
                    v-model="tabrow.apicoreurl"
                  >
                  </CInput>
                </CCol>
                <CCol>
                  <CInput
                    :placeholder="$t('apiurl')"
                    autocomplete="apiurl"
                    :label="$t('apiurl')"
                    v-model="tabrow.apiurl"
                  >
                  </CInput>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <label class="col-form-label">{{
                    $t("samplerequest")
                  }}</label>
                  <b-form-textarea
                    v-model="tabrow.samplerequest"
                    :placeholder="$t('samplerequest')"
                    rows="1"
                    max-rows="50"
                  ></b-form-textarea>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <label class="col-form-label">{{
                    $t("sampleresponse")
                  }}</label>
                  <b-form-textarea
                    v-model="tabrow.sampleresponse"
                    :placeholder="$t('sampleresponse')"
                    rows="1"
                    max-rows="50"
                  ></b-form-textarea>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CInput
                    :placeholder="$t('responsibleperson')"
                    autocomplete="responsibleperson"
                    :label="$t('responsibleperson')"
                    v-model="tabrow.responsibleperson"
                  >
                  </CInput>
                </CCol>
                <CCol>
                  <CInput
                    :placeholder="$t('phonenumber')"
                    autocomplete="personphonenumber"
                    :label="$t('phonenumber')"
                    v-model="tabrow.personphonenumber"
                  >
                  </CInput>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <label for="datepicker-dateformat2">{{
                    $t("startdate")
                  }}</label>
                  <date-picker
                    v-model="tabrow.startdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker>
                </CCol>
                <CCol>
                  <CInput
                    :placeholder="$t('authinfo')"
                    autocomplete="authinfo"
                    :label="$t('authinfo')"
                    v-model="tabrow.authinfo"
                  >
                  </CInput>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="mb-3">
                  <label class="col-form-label">{{ $t("description") }}</label>
                  <b-form-textarea
                    v-model="tabrow.description"
                    :placeholder="$t('description')"
                    rows="1"
                    max-rows="10"
                  ></b-form-textarea>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="text-right">
                  <CButton @click="tableModal = false" color="danger" size="sm">
                    <b-icon icon="arrow-left-short"></b-icon>
                    {{ $t("back") }}
                  </CButton>
                </CCol>
                <CCol class="text-left">
                  <CButton color="success" @click="AddRow" size="sm">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("save") }}
                  </CButton>
                </CCol>
              </CRow>
            </b-modal>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'OrgIntegrationInfo' })"
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
import { mapState } from "vuex";
import HelperService from "@/services/helper.service";
import OrgIntegrationInfoService from "@/services/OrgIntegrationInfo.service";
import { parse } from "@babel/core";
export default {
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      SaveLoading: false,
      AddModal: false,
      editedIndex: 0,
      search: "",
      sum: 0,
      firstTableAllCheck: false,
      secondTableAllCheck: false,
      IHMovement: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables: [],
      },
      OrgIntegrationInfo: { stateid: 1, tables: [] },
      FirstTableItems: [],
      SecondTableItems: [],
      honorarytitletypelist: [],
      personlist: [],
      accountlist: [],
      departmentlist: [],
      personlist: [],
      lang: "",
      fields: [
        {
          key: "integrationname",
          label: this.$t("integrationname"),
        },
        {
          key: "description",
          label: this.$t("description"),
        },
        {
          key: "ismspd",
          label: this.$t("ismspd"),
        },
        {
          key: "apicoreurl",
          label: this.$t("apicoreurl"),
        },
        {
          key: "apiurl",
          label: this.$t("apiurl"),
        },
        {
          key: "samplerequest",
          label: this.$t("samplerequest"),
        },
        {
          key: "sampleresponse",
          label: this.$t("sampleresponse"),
        },
        {
          key: "responsibleperson",
          label: this.$t("responsibleperson"),
        },
        {
          key: "personphonenumber",
          label: this.$t("phonenumber"),
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
        },
        {
          key: "authinfo",
          label: this.$t("authinfo"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      items: [],
      Tables: {},
      tabrow: {
        integrationname: "",
        description: "",
        ismspd: false,
        apicoreurl: "",
        apiurl: "",
        samplerequest: "",
        sampleresponse: "",
        responsibleperson: "",
        personphonenumber: "",
        startdate: "",
        authinfo: "",
        Status: 1,
      },
      unitofmeasurelist: [],
      InventoryHoldingList: [],
      ExciserateList: [],
      plus: false,
      EraseWarningModal: false,
      EraseWarning: "a",
      tableModal: false,
      editedIndex1: -1,
      statelist: [],
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    OrgIntegrationInfoService.Get(this.$route.params.id).then((res) => {
      this.OrgIntegrationInfo = res.data;
    });
    HelperService.GetStateList(this.lang, false).then((res) => {
      this.statelist = res.data;
    });
  },

  computed: {},
  mounted() {},
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    DeleteItem(item, index) {
      item.Status = 3;
    },
    OpenModal() {
      this.tableModal = true;
    },
    AddRow() {
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.OrgIntegrationInfo.Tables[this.editedIndex1],
          this.tabrow
        );
      } else {
        this.OrgIntegrationInfo.Tables.push(this.tabrow);
      }
      this.tableModal = false;
      this.tabrow = {
        Status: 1,
      };
      this.editedIndex1 = -1;
    },
    EditItem(item, index) {
      item.Status = 2;
      this.editedIndex1 = this.OrgIntegrationInfo.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.tableModal = true;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
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
    check() {
      var self = this;
      // if (
      //   self.IHMovement.ihmovementnumber === 0 ||
      //   self.IHMovement.ihmovementnumber === null ||
      //   self.IHMovement.ihmovementnumber === undefined ||
      //   self.IHMovement.ihmovementnumber === ""
      // ) {
      //   this.makeToast(
      //     this.$t("contractnumberNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.IHMovement.ihmovementdate === 0 ||
      //   self.IHMovement.ihmovementdate === null ||
      //   self.IHMovement.ihmovementdate === undefined ||
      //   self.IHMovement.ihmovementdate === ""
      // ) {
      //   this.makeToast(
      //     this.$t("contractdateNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.IHMovement.ihmovementsum === 0 ||
      //   self.IHMovement.ihmovementsum === null ||
      //   self.IHMovement.ihmovementsum === undefined ||
      //   self.IHMovement.ihmovementsum === ""
      // ) {
      //   this.makeToast(
      //     this.$t("IHMovementsumNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      // if (this.itemsMainTable.length === 0) {
      //   this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
      //   return false;
      // }
      // if (
      //   self.IHMovement.fromdepartmentid === self.IHMovement.todepartmentid &&
      //   self.IHMovement.fromresponsiblepersonid ===
      //     self.IHMovement.toresponsiblepersonid
      // ) {
      //   {
      //     this.makeToast(this.$t("CantMoveToSame"), this.$t("Error"), "danger");
      //     return false;
      //   }
      // }

      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      OrgIntegrationInfoService.Update(this.OrgIntegrationInfo)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "OrgIntegrationInfo" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style></style>
