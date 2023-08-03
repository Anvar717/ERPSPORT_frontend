<template>
  <div>
    <CCard>
      <CCardHeader>
        <h4>{{ $route.params.id > 0 ? $t("save") : $t("create") }}</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol lg="4" sm="12">
            <ValidationProvider v-slot="v" name="name" rules="required">
              <CInput :horizontal="{ label: 'col-sm-6', input: 'col-sm-8' }" v-model="role.ShortName" :addInputClasses="{
                'is-invalid': v.classes.invalid,
                'is-valid': v.classes.valid,
              }">
                <template #append>
                  <!-- v-if="role.TranslatableColumns.includes('shortname')" -->
                  <CButton @click="translate('ShortName')" style="height: 35px" variant="outline" type="button"
                    color="primary">
                    <b-icon icon="globe2"></b-icon>
                  </CButton>
                </template>
                <template slot="label">
                  <label class="col-form-label col-sm-4">{{ $t("shortname") }}
                    <span class="text-danger"> *</span></label>
                </template>
                <template slot="invalid-feedback">
                  <div class="invalid-feedback">
                    {{ v.errors[0] }}
                  </div>
                </template>
              </CInput>
            </ValidationProvider>
          </CCol>
          <CCol lg="4" sm="12">
            <ValidationProvider v-slot="v" name="name" rules="required">
              <CInput :horizontal="{ label: 'col-sm-6', input: 'col-sm-8' }" v-model="role.FullName" :addInputClasses="{
                'is-invalid': v.classes.invalid,
                'is-valid': v.classes.valid,
              }"> <template #append>
                  <!-- v-if="role.TranslatableColumns.includes('fullname')" -->
                  <CButton @click="translate('FullName')" style="height: 35px" variant="outline" type="button"
                    color="primary">
                    <b-icon icon="globe2"></b-icon>
                  </CButton>
                </template>
                <template slot="label">
                  <label class="col-form-label col-sm-4">{{ $t("fullname") }}
                    <span class="text-danger"> *</span></label>
                </template>
                <template slot="invalid-feedback">
                  <div class="invalid-feedback">
                    {{ v.errors[0] }}
                  </div>
                </template>
              </CInput>
            </ValidationProvider>
          </CCol>
          <CModal :title="$t('translate')" :show.sync="translatemodal" size="lg" :closeOnBackdrop="false">
            <b-table :fields="translitefields" :items="translatelist" class="bg-color-table text-center"
              style="vertical-align: middle" bordered responsive="sm">
              <template v-slot:thead-top>
                <b-tr>
                  <b-th style="width: 30%">
                    <v-select :placeholder="$t('ChooseBelow')" class="mb-0" :options="languagelist"
                      :reduce="(item) => item.id" label="name" v-model="translaterow.languageid"
                      style="z-index: 9999"></v-select>
                  </b-th>
                  <b-th style="width: 60%">
                    <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
                  </b-th>
                  <b-th style="width: 10%">
                    <CButton @click="addtranslite" color="primary" variant="outline" class="text-center mx-auto d-block">
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
              <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </template>
          </CModal>
          <CCol lg="4" sm="12">
            <div class="d-flex">
              <CCol lg="3" sm="12">
                <div class="text-center">
                  <b-form-checkbox v-model="role.IsDefault" name="check-button1" switch>
                    {{ $t("isdefault") }}
                  </b-form-checkbox>
                </div>
                <!-- <div class="form-group form-row text-center">
                                    <label class="col-form-label" for>{{$t('calculationkind')}}</label>
                                    <b-form-checkbox v-model="role.isdefault" name="check-button" switch>
                          
                        </b-form-checkbox>
                                </div> -->
              </CCol>
              <CCol lg="3" sm="12">
                <div class="text-center">
                  <b-form-checkbox v-model="role.IsAdmin" name="check-button" switch>
                    {{ $t("isadmin") }}
                  </b-form-checkbox>
                </div>
              </CCol>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div v-for="(value, key, index) in moduleList" class="row"
              style="padding: 3px; border: solid 1px #a4a8ab; margin-top: 25px">
              <div class="form-check col-sm-12" style="margin-top: -15px">
                <mark style="background-color: #f5f5f5"><b-icon icon="check2"></b-icon></mark>

                <span class="form-check-label" style="color: green">
                  <mark style="background-color: #f5f5f5">{{
                    value.objectname
                  }}</mark>
                </span>
              </div>

              <div v-for="child in value.modulelist" class="col-sm-3" style="margin-left: 50px; padding-top: 5px"
                :key="child.id">
                <input :id="'child' + child.id" class="form-check-input" type="checkbox" :value="child.id"
                  v-model="role.ModuleIDList" @change="onChangeCheckbox(child.id)" />

                <label :for="'child' + child.id" style="color: #000">{{
                  child.name
                }}</label>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <b-button variant="danger" :disabled="loadingButton" @click="backToList" class="float-left mt-5">
              {{ $t("back") }}
            </b-button>
            <b-button variant="success" :disabled="loadingButton" @click="saveRole()" class="float-right mt-5">
              <b-spinner small v-if="loadingButton"></b-spinner>
              {{ $route.params.id > 0 ? $t("Save") : $t("create") }}
            </b-button>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import HelperService from "@/services/helper.service";
import RoleService from "@/services/role.service";

export default {
  name: "CreateOrUpdateRole",
  data() {
    return {
      moduleList: [],
      loadingButton: false,
      translatemodal: false,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      role: {
        ID: 0,
        ShortName: "",
        FullName: "",
        Modules: [],
        ModuleIDList: [],
        Translates: [],
        TranslatableColumns: [
          "ShortName",
          "FullName"
        ],
        IsDefault: false,
        isadmin: false,
      },
      translatelist: [],
      languagelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
    };
  },
  methods: {
    backToList() {
      this.$router.push({ name: "Roles" });
    },
    onChangeCheckbox(id) { },
    checkValid() {
      let valid = false;
      if (this.role.ShortName !== "" && this.role.ShortName !== null) {
        valid = true;
      } else {
        valid = false;
      }
      return valid;
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        variant: type,
        solid: true,
      });
    },
    saveRole() {
      this.loadingButton = true;
      let vm = this;
      if (this.checkValid()) {
        try {
          RoleService.Update(this.role).then((response) => {
            vm.loadingButton = false;
            if (response.data.success) {
              if (this.$route.params.id) {
                vm.makeToast(
                  vm.$t("SuccessMessage"),
                  vm.$t("message"),
                  "success"
                );
              } else {
                vm.makeToast(
                  vm.$t("SuccessMessage"),
                  vm.$t("message"),
                  "success"
                );
              }
              setTimeout(function () {
                vm.$router.push({ name: "Roles" });
              }, 500);
            } else {
              vm.makeToast(vm.$t("error"), vm.$t("message"), "danger");
            }
          });
        } catch (e) {
          this.loadingButton = false;
          let response = JSON.parse(e.request.response);
          this.makeToast(response.error, this.$t("error"), "danger");
        }
      } else {
        this.loadingButton = false;
        this.makeToast(
          this.$t("messages.all_field_required"),
          this.$t("message"),
          "danger"
        );
      }
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        this.makeToast(
          this.$t("languageidNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        this.makeToast(
          this.$t("translatetextNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else {
        var dublikate = false;
        self.translatelist.forEach((item) => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function (
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: "",
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.role.Translates = self.role.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.role.Translates.push(item);
      });
      self.translatemodal = false;
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.role.Translates.filter(
        (item) => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
    },
    getModules() {
      HelperService.GetModuleList().then((response) => {
        this.moduleList = response.data;
      });
    },
    getRole() {
      if (this.$route.params.id > 0) {
        RoleService.Get(this.$route.params.id).then((response) => {
          this.role = response.data;
        });
      }
    },
  },
  created() {
    this.getModules();
    this.getRole();
    HelperService.GetLanguageList().then((res) => {
      this.languagelist = res.data;
    });
  },
};
</script>
<style scoped>
legend {
  background-color: #000;
  color: #fff;
  padding: 3px 6px;
}

.output {
  font: 1rem "Fira Sans", sans-serif;
}

input {
  margin: 0.4rem;
}
</style>
