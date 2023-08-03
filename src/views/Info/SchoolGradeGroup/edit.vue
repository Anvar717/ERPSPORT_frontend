<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('SchoolGradeGroup')}}</h4>
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
                    type="number"
                    horizontal
                    :label="$t('code')"
                    v-model="SchoolGradeGroup.code"
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
                    v-model="SchoolGradeGroup.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="SchoolGradeGroup.TranslatableColumns.includes('shortname')"
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
                    v-model="SchoolGradeGroup.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="SchoolGradeGroup.TranslatableColumns.includes('fullname')"
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
                <CInput
                  :placeholder="$t('workhours')"
                  autocomplete="text"
                  type="number"
                  horizontal
                  :label="$t('workhours')"
                  v-model="SchoolGradeGroup.workhours"
                ></CInput>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <CInput
                  :placeholder="$t('teachinghours')"
                  autocomplete="text"
                  type="number"
                  horizontal
                  :label="$t('teachinghours')"
                  v-model="SchoolGradeGroup.teachinghours"
                ></CInput>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <CInput
                  :placeholder="$t('totalhours')"
                  autocomplete="text"
                  type="number"
                  horizontal
                  :label="$t('totalhours')"
                  v-model="SchoolGradeGroup.totalhours"
                ></CInput>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <CInput
                  :placeholder="$t('monthlytotalhours')"
                  autocomplete="text"
                  type="number"
                  horizontal
                  :label="$t('monthlytotalhours')"
                  v-model="SchoolGradeGroup.monthlytotalhours"
                ></CInput>
              </CCol>

              <CCol sm="3"></CCol>
            </CRow>

            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('status')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="SchoolGradeGroup.stateid"
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
        <CModal
          :title="$t('translate')"
          :show.sync="translatemodal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="translitefields"
            :items="translatelist"
            class="bg-color-table text-center"
            style="vertical-align:middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width:30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="languagelist"
                    :reduce="item => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
                </b-th>
                <b-th style="width:10%">
                  <CButton
                    @click="addtranslite"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{item}">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
              <b-icon icon="check2"></b-icon>
              {{$t('Save')}}
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
                @click="$router.push({name : 'SchoolGradeGroup'})"
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
import SchoolGradeGroupService from "@/services/SchoolGradeGroup.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      SchoolGradeGroup: { TranslatableColumns: [] },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" }
      ],
      translatelist: [],
      languagelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: ""
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: []
    };
  },
  created() {
    var self = this;
    
    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then(res => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
    SchoolGradeGroupService.Get(self.selectedrowid).then(res => {
      self.SchoolGradeGroup = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.SchoolGradeGroup.code === 0 ||
        self.SchoolGradeGroup.code === null ||
        self.SchoolGradeGroup.code === undefined ||
        self.SchoolGradeGroup.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SchoolGradeGroup.shortname === 0 ||
        self.SchoolGradeGroup.shortname === null ||
        self.SchoolGradeGroup.shortname === undefined ||
        self.SchoolGradeGroup.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolGradeGroup.fullname === 0 ||
        self.SchoolGradeGroup.fullname === null ||
        self.SchoolGradeGroup.fullname === undefined ||
        self.SchoolGradeGroup.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolGradeGroup.workhours === 0 ||
        self.SchoolGradeGroup.workhours === null ||
        self.SchoolGradeGroup.workhours === undefined ||
        self.SchoolGradeGroup.workhours === ""
      ) {
        this.makeToast(
          this.$t("workhoursNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolGradeGroup.teachinghours === 0 ||
        self.SchoolGradeGroup.teachinghours === null ||
        self.SchoolGradeGroup.teachinghours === undefined ||
        self.SchoolGradeGroup.teachinghours === ""
      ) {
        this.makeToast(
          this.$t("teachinghoursNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolGradeGroup.totalhours === 0 ||
        self.SchoolGradeGroup.totalhours === null ||
        self.SchoolGradeGroup.totalhours === undefined ||
        self.SchoolGradeGroup.totalhours === ""
      ) {
        this.makeToast(
          this.$t("totalhoursNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SchoolGradeGroup.monthlytotalhours === 0 ||
        self.SchoolGradeGroup.monthlytotalhours === null ||
        self.SchoolGradeGroup.monthlytotalhours === undefined ||
        self.SchoolGradeGroup.monthlytotalhours === ""
      ) {
        this.makeToast(
          this.$t("monthlytotalhoursNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.SchoolGradeGroup.stateid === 0 ||
        self.SchoolGradeGroup.stateid === null ||
        self.SchoolGradeGroup.stateid === undefined ||
        self.SchoolGradeGroup.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
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
      SchoolGradeGroupService.Update(self.SchoolGradeGroup)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "SchoolGradeGroup" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.SchoolGradeGroup.Translates.filter(
        item => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
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
        self.translatelist.forEach(item => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function(
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
            translatetext: ""
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.SchoolGradeGroup.Translates = self.SchoolGradeGroup.Translates.filter(
        x => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach(item => {
        self.SchoolGradeGroup.Translates.push(item);
      });
      self.translatemodal = false;
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

<style>
</style>