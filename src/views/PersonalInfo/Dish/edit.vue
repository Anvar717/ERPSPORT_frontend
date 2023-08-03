<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('Dish')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="Dish.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="Dish.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="Dish.TranslatableColumns.includes('shortname')"
                        @click="translate('shortname')"
                        style="height:35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="Dish.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="Dish.TranslatableColumns.includes('fullname')"
                        @click="translate('fullname')"
                        style="height:35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="outputsz" rules="required|max:9">
                  <CInput
                    :placeholder="$t('outputsz')"
                    autocomplete="outputsz"
                    horizontal
                    :label="$t('outputsz')"
                    v-model="Dish.outputsz"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('dishgroup')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="dishgrouplist"
                    v-model="Dish.dishgroupid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('diettable')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="diettablelist "
                    v-model="Dish.diettableid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('state')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="Dish.stateid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="DishTables"
              :items="Dish.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:thead-top>
                <b-tr>
                  <b-th style="width : 40%">
                    <v-select
                      :options="inventoryholdinglist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.ihid"
                    ></v-select>
                  </b-th>
                  <b-th style="width : 40%">
                    <custom-number-input v-model="tabrow.norm"></custom-number-input>
                  </b-th>

                  <b-th style="width:20%">
                    <CButton size="sm" color="primary" variant="outline" @click="AddRow">
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(inventoryholding)="{ item }">
                <p v-if="item.Status == 0">{{ item.inventoryholding }}</p>
                <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                  :options="inventoryholdinglist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.ihid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(norm)="{ item }">
                <p v-if="item.Status == 0">{{ item.norm }}</p>
                <custom-number-input
                  v-if="item.Status == 2 || item.Status == 1"
                  v-model="item.norm"
                ></custom-number-input>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <CButtonGroup class="mx-auto d-block text-center" size="sm">
                  <CButton variant="outline" color="primary" @click="EditRow(item)">
                    <b-icon icon="pencil"></b-icon>
                  </CButton>
                  <CButton variant="outline" color="danger" @click="DeleteRow(item)">
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
                @click="$router.push({ name: 'Dish' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
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
import DishService from "@/services/Dish.service";
import HelperService from "@/services/helper.service";
import DishGroupService from "@/services/DishGroup.service";
import DietTableService from "@/services/DietTable.service";
import InventoryHoldingService from "@/services/InventoryHolding.service";

export default {
  data() {
    return {
      SaveLoading: false,
      Dish: {},
      selectedrowid: 0,

      Dishtypelist: [],
      diettablelist: [],
      dishgrouplist: [],
      inventoryholdinglist: [],
      statelist: [],

      DishTables: [
        { key: "InventoryHolding", label: this.$t("InventoryHolding") },
        { key: "norm", label: this.$t("norm") },
        { key: "actions", label: this.$t("actions") }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        schoolgradeid: 0,
        schoolgradename: "",
        hours: 0,
        Status: 1
      },
      toastCount: 0,
      allSignupErrors: {}
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    DishService.Get(self.selectedrowid).then(res => {
      self.Dish = res.data;
    });
    DietTableService.GetAll().then(res => {
      self.diettablelist = res.data;
    });
    DishGroupService.GetAll().then(res => {
      self.dishgrouplist = res.data;
    });
    InventoryHoldingService.GetAll().then(res => {
      self.inventoryholdinglist = res.data;
    });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.Dish.code === null ||
        self.Dish.code === undefined ||
        self.Dish.code === 0 ||
        self.Dish.code === ""
      ) {
        self.makeToast(self.$t("codeNotCorrect"), self.$t("Error"), "danger");
        return false;
      }

      if (
        self.Dish.shortname === null ||
        self.Dish.shortname === undefined ||
        self.Dish.shortname === 0
      ) {
        self.makeToast(
          self.$t("shortnameNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Dish.fullname === null ||
        self.Dish.fullname === undefined ||
        self.Dish.fullname === 0
      ) {
        self.makeToast(
          self.$t("fullnameNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Dish.dishgroupid === null ||
        self.Dish.dishgroupid === undefined ||
        self.Dish.dishgroupid === 0 ||
        self.Dish.dishgroupid === ""
      ) {
        self.makeToast(
          self.$t("dishgroupNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Dish.outputsz === null ||
        self.Dish.outputsz === undefined ||
        self.Dish.outputsz === 0 ||
        self.Dish.outputsz === ""
      ) {
        self.makeToast(
          self.$t("outputszNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Dish.diettableid === null ||
        self.Dish.diettableid === undefined ||
        self.Dish.diettableid === 0 ||
        self.Dish.diettableid === ""
      ) {
        self.makeToast(
          self.$t("diettableNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var tableitemscount = 0;
      tableitemscount = self.Dish.Tables.filter(item => item.Status !== 3)
        .length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      DishService.Update(self.Dish)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Dish" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    AddRow(data) {
      var self = this;
      self.Dish.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        ihid: 0,
        norm: "",
        Status: 1
      };
    },
    EditRow(item) {
      item.Status = 2;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
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

<style></style>
