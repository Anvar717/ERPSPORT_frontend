<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <h3 class="text-center mt-2">
          <!-- <b-icon icon="pencil"></b-icon> -->
          {{ $t("PlanPersonCount") }}
        </h3>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <!-- <CCol sm="3">
                <ValidationProvider v-slot="v" name="docnumber" rules="required">
                  <label>{{ $t("docnumber") }}</label>
                  <CInput
                    autocomplete="text"
                    disabled
                    v-model="PlanPersonCount.docnumber"
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
              </CCol> -->
              <CCol sm="3">
                <label>{{ $t("docdate") }}</label>
                <custom-date-picker
                  v-model="PlanPersonCount.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                ></custom-date-picker>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("organization") }}</label>
                <v-select
                  :options="OrganizationList"
                  v-model="PlanPersonCount.organizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("studentcount") }}</label>
                <CInput autocomplete="text" type="number" v-model="PlanPersonCount.studentcount"></CInput>
              </CCol>
               <CCol sm="3">
                <label>{{ $t("employeecount") }}</label>
                <CInput autocomplete="text" type="number" v-model="PlanPersonCount.employeecount"></CInput>
              </CCol>
            </CRow>
          </ValidationObserver>
          <CRow>
            <CCol sm="3">
                <label>{{ $t("groupcount") }}</label>
                <CInput autocomplete="text" type="number" v-model="PlanPersonCount.groupcount"></CInput>
              </CCol>
               <CCol sm="3">
                <label>{{ $t("trenercount") }}</label>
                <CInput autocomplete="text" type="number" v-model="PlanPersonCount.trenercount"></CInput>
              </CCol>
          </CRow>
        </CCardBody>
       
       
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'PlanPersonCount' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import PlanPersonCountService from "@/services/planpersoncount.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import OrganizationService from "@/services/organization.service";
export default {
  components: {
    CustomDatePicker
  },
  data() {
    return {
      SaveLoading: false,
      PlanPersonCount: {},
      OrganizationList:[],
      selectedrowid: 0,
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
   
    PlanPersonCountService.Get(self.selectedrowid).then(res => {
      self.PlanPersonCount = res.data;
      (res.data);
    });
    OrganizationService.GetAll().then((res) => {
      self.OrganizationList = res.data;
    });
  
  },
  methods: {
    check() {
      var self = this;
      if (
        self.PlanPersonCount.docnumber === null ||
        self.PlanPersonCount.docnumber === undefined ||
        self.PlanPersonCount.docnumber === 0 ||
        self.PlanPersonCount.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PlanPersonCount.docdate === null ||
        self.PlanPersonCount.docdate === undefined ||
        self.PlanPersonCount.docdate === 0
      ) {
        self.makeToast(
          self.$t("docdateNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

    //   if (
    //     self.PlanPersonCount.schoolyearid === null ||
    //     self.PlanPersonCount.schoolyearid === undefined ||
    //     self.PlanPersonCount.schoolyearid === 0
    //   ) {
    //     self.makeToast(
    //       self.$t("SchoolYearNotSelected"),
    //       self.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
      return true;
    },
   
   
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      PlanPersonCountService.Update(self.PlanPersonCount)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "PlanPersonCount"
          });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
     setAllErrors(errors) {
      this.allSignupErrors = errors;
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
    
  },
  watch: {}
};
</script>

<style></style>