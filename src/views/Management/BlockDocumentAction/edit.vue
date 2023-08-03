<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('BlockDocumentAction')}}</h4>
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
                      v-model="BlockDocumentAction.blockorganizationid"
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
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <custom-date-picker
                        v-model="BlockDocumentAction.blockuntildate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('docdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </custom-date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required|max:100">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="BlockDocumentAction.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="documentid" rules="required|max:100">
                  <CInput
                    :placeholder="$t('documentid')"
                    autocomplete="documentid"
                    horizontal
                    :label="$t('Document')"
                    v-model="BlockDocumentAction.documentid"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
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
                <ValidationProvider v-slot="v" name="Table" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('Table')}}</label>
                    <v-select
                      class="col-sm-9"
                      :options="tablelist"
                      v-model="BlockDocumentAction.tableid"
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
            <b-table
              :fields="BlockDocumentActionTables"
              :items="BlockDocumentAction.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-if="BlockDocumentAction.CanSave" v-slot:thead-top>
                <b-tr>
                  <b-th style="width:14%">
                    <v-select
                      :options="statuslist"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.statusid"
                    ></v-select>
                  </b-th>
                  <b-th style="width:20%">
                    <CButton size="sm" color="primary" variant="outline" @click="Add">
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(statusname)="{item}">
                <p v-if="item.Status == 0">{{item.statusname}}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="statuslist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.statusid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(actions)="{item}">
                <CButtonGroup
                  v-if="BlockDocumentAction.CanSave"
                  class="mx-auto d-block text-center"
                  size="sm"
                >
                  <CButton variant="outline" color="primary" @click="EditItem(item)">
                    <b-icon icon="pencil"></b-icon>
                  </CButton>
                  <CButton variant="outline" color="danger" @click="DeleteItem(item)">
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </CButtonGroup>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'BlockDocumentAction'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="BlockDocumentAction.CanSave"
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
import BlockDocumentActionService from "@/services/BlockDocumentAction.service";
import OrganizationService from "@/services/organization.service";
import CustomDatePicker from "@/components/customDatePicker.vue";

import HelperService from "@/services/helper.service";
export default {
  components: {
    CustomDatePicker
  },
  data() {
    return {
      SaveLoading: false,
      BlockDocumentAction: {},
      selectedrowid: 0,
      organizationlist: [],
      statuslist: [],
      tablelist: [],
      BlockDocumentActionTables: [
        {
          key: "statusname",
          label: this.$t("statusname"),
        },

        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        statusid: 0,
        Status: 1,
      },
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;

    BlockDocumentActionService.Get(self.selectedrowid).then((res) => {
      self.BlockDocumentAction = res.data;
    });
    OrganizationService.GetAll().then((res) => {
      self.organizationlist = res.data;
    });

    HelperService.GetStatusList().then((res) => {
      self.statuslist = res.data;
    });
    HelperService.GetTableList().then((res) => {
      this.tablelist = res.data;
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

    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    Add() {
      var self = this;
      if (
        self.tabrow.statusid === "" ||
        self.tabrow.statusid === undefined ||
        self.tabrow.statusid === null ||
        self.tabrow.statusid === 0
      ) {
        this.makeToast(
          this.$t("statusNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.BlockDocumentAction.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        statusid: 0,
        Status: 1,
      };
      this.Tables = {};
    },
    EditItem(item) {
      item.Status = 2;
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.BlockDocumentAction.blockuntildate === 0 ||
        self.BlockDocumentAction.blockuntildate === null ||
        self.BlockDocumentAction.blockuntildate === undefined ||
        self.BlockDocumentAction.blockuntildate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BlockDocumentAction.detailinfo === 0 ||
        self.BlockDocumentAction.detailinfo === null ||
        self.BlockDocumentAction.detailinfo === undefined ||
        self.BlockDocumentAction.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        self.BlockDocumentAction.shortname === 0 ||
        self.BlockDocumentAction.shortname === null ||
        self.BlockDocumentAction.shortname === undefined ||
        self.BlockDocumentAction.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      BlockDocumentActionService.Update(this.BlockDocumentAction)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "BlockDocumentAction" });
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





