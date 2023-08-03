<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SchoolGradeAgeLimit") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="6">
                    <label>{{$t('schooltype')}}</label>
                    <v-select
                      :options="schooltypelist"
                      v-model="schoolgradeagelimit.schooltypeid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>
                   <CCol sm="6">
                    <label>{{$t('schoolgrade')}}</label>
                    <v-select
                      :options="schoolgradelist"
                      v-model="schoolgradeagelimit.schoolgradeid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>
            </CRow>
            <CRow>
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="fromage"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('fromage')"
                    autocomplete="fromage"
                    :label="$t('fromage')"
                    v-model="schoolgradeagelimit.fromage"
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
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="toage"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('toage')"
                    autocomplete="toage"
                    :label="$t('toage')"
                    v-model="schoolgradeagelimit.toage"
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
              <CCol sm="4">
                  <label  for>{{
                    $t("state")
                  }}</label>
                  <v-select
                    :options="statelist"
                    v-model="schoolgradeagelimit.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
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
                @click="$router.push({ name: 'SchoolGradeAgeLimit' })"
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
import SchoolTypeService from "@/services/SchoolType.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolGradeAgeLimitService from "@/services/SchoolGradeAgeLimit.service";
export default {
  data() {
    return {
      SaveLoading: false,
      schoolgradeagelimit: { },
      schoolgradelist: [],
      schooltypelist: [],
      statelist: [],
      selectedrowid : 0,
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    SchoolGradeService.GetAll().then((res) => {
      this.schoolgradelist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    SchoolGradeAgeLimitService.Get(self.selectedrowid).then((res) => {
      self.schoolgradeagelimit = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.schoolgradeagelimit.toage === 0 ||
        self.schoolgradeagelimit.toage === null ||
        self.schoolgradeagelimit.toage === undefined ||
        self.schoolgradeagelimit.toage === ""
      ) {
        this.makeToast(this.$t("toageNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.schoolgradeagelimit.fromage === 0 ||
        self.schoolgradeagelimit.fromage === null ||
        self.schoolgradeagelimit.fromage === undefined ||
        self.schoolgradeagelimit.fromage === ""
      ) {
        this.makeToast(
          this.$t("fromageNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.schoolgradeagelimit.schoolgradeid === 0 ||
        self.schoolgradeagelimit.schoolgradeid === null ||
        self.schoolgradeagelimit.schoolgradeid === undefined ||
        self.schoolgradeagelimit.schoolgradeid === ""
      ) {
        this.makeToast(
          this.$t("SchoolGradeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.schoolgradeagelimit.schooltypeid === 0 ||
        self.schoolgradeagelimit.schooltypeid === null ||
        self.schoolgradeagelimit.schooltypeid === undefined ||
        self.schoolgradeagelimit.schooltypeid === ""
      ) {
        this.makeToast(
          this.$t("SchoolTypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.schoolgradeagelimit.stateid === 0 ||
        self.schoolgradeagelimit.stateid === null ||
        self.schoolgradeagelimit.stateid === undefined ||
        self.schoolgradeagelimit.stateid === ""
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
      SchoolGradeAgeLimitService.Update(self.schoolgradeagelimit)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "SchoolGradeAgeLimit" });
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
