<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("TaxBenefit") }}</h4>
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
                  name="docnumber"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="TaxBenefit.docnumber"
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
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("docdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="TaxBenefit.docdate"
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
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("Person")
                  }}</label>
                  <div class="col-sm-9 d-flex">
                    <c-input
                      style="width:100%"
                      disabled
                      v-model="TaxBenefit.personname"
                    >
                      <template #append>
                        <CButton
                          @click="$bvModal.show('PersonModal')"
                          size="sm"
                          type="button"
                          color="primary"
                        >
                          <b-icon icon="three-dots"></b-icon>
                        </CButton>
                      </template>
                    </c-input>
                  </div>
                </div>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("TaxBenefitName")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="TaxBenefittypelist"
                      v-model="TaxBenefit.taxbenefittypeid"
                      :reduce="(item) => item.id"
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
            <CRow class="mt-n2">
              <CCol>
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("enddate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="TaxBenefit.enddate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('enddate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('basis')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('basis')"
                    v-model="TaxBenefit.detailinfo"
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
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-2" for>{{
                      $t("basisforbenefit")
                    }}</label>
                    <v-select
                      class="col-sm-10"
                      disabled
                      :options="TaxBenefittypelist"
                      v-model="TaxBenefit.taxbenefittypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="normativeact"
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
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'TaxBenefit' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="TaxBenefit.CanSave"
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
      <b-modal
        id="PersonModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Person')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <!-- <person-list  @SelectedItem="SelectedItem(personvalue)" @DblClick="AddPersonData"></person-list>     -->
        <employee-list
        :hrappointordertypeid="4"
          @SelectedItem="SelectedItem"
          :isAllEmployee="true"
          @DblClick="AddPerson"
        ></employee-list>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddPerson(personvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import TaxBenefitService from "@/services/TaxBenefit.service";
import TaxBenefitTypeService from "@/services/TaxBenefitType.service";
import EmployeeList from "@/components/EmployeeList";
import EmployeeListComponent from "@/components/EmployeeList";
export default {
  components: { EmployeeListComponent, EmployeeList },
  data() {
    return {
      SaveLoading: false,
      TaxBenefit: {},
      selectedrowid: 0,
      employeelist: [],
      TaxBenefittypelist: [],
      lang: "",
      editedIndex: -1,
      personvalue: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    TaxBenefitService.Get(self.$route.params.id).then((res) => {
      self.TaxBenefit = res.data;
    });
    TaxBenefitTypeService.GetAll(self.lang).then((res) => {
      self.TaxBenefittypelist = res.data;
    });
  },
  methods: {
    SelectedItem(data) {
      this.personvalue = data;
    },
    AddPerson(data) {
      console.log(data);
      this.TaxBenefit.personid = data.personid;
      this.TaxBenefit.personname = data.personname;
      this.TaxBenefit.employeeenrolmentid = data.employeeenrolmentid;
      this.CloseEmployeeModal();
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    CloseEmployeeModal() {
      this.$bvModal.hide("PersonModal");
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          departmentid: 0,
          departmentname: "",
          personid: 0,
          personname: "",
          employeeenrolmentid: 0,
          calcpercentage: "",
          calcsum: "",
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    employeechange() {
      var self = this;
      if (self.tabrow.employeeenrolmentid > 0) {
        self.tabrow.employeeenrolmentid = "";
      }
      self.tabrow.personname = self.employeelist.filter(function(item) {
        if (item.id === self.tabrow.personid) return item;
      })[0].name;
      self.tabrow.employeeenrolmentid = self.employeelist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.personid) return item;
      })[0].employeeenrolmentid;
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

    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.TaxBenefit.Tables1.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.TaxBenefit.docnumber === 0 ||
        self.TaxBenefit.docnumber === null ||
        self.TaxBenefit.docnumber === undefined ||
        self.TaxBenefit.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TaxBenefit.docdate === 0 ||
        self.TaxBenefit.docdate === null ||
        self.TaxBenefit.docdate === undefined ||
        self.TaxBenefit.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TaxBenefit.personid === 0 ||
        self.TaxBenefit.personid === null ||
        self.TaxBenefit.personid === undefined ||
        self.TaxBenefit.personid === ""
      ) {
        this.makeToast(this.$t("personNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.TaxBenefit.taxbenefittypeid === 0 ||
        self.TaxBenefit.taxbenefittypeid === null ||
        self.TaxBenefit.taxbenefittypeid === undefined ||
        self.TaxBenefit.taxbenefittypeid === ""
      ) {
        this.makeToast(
          this.$t("TaxBenefitNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TaxBenefit.detailinfo === 0 ||
        self.TaxBenefit.detailinfo === null ||
        self.TaxBenefit.detailinfo === undefined ||
        self.TaxBenefit.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      TaxBenefitService.Update(this.TaxBenefit)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "TaxBenefit" });
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
