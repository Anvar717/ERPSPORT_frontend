<template>
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("Payment") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <CRow>
                <CCol sm="12" lg="4">
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
                      v-model="Payment.docnumber"
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
                <CCol sm="12" lg="4">
                  <ValidationProvider
                    v-slot="v"
                    name="startdate"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label
                        for="datepicker-dateformat2"
                        class="col-form-label col-sm-3"
                        >{{ $t("docdate") }}</label
                      >
                      <div class="col-sm-9">
                        <!-- <custom-date-input />  -->
                        <date-picker
                          v-model="Payment.docdate"
                          style="width: 100%"
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
                <CCol sm="12" lg="4">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{
                      $t("membership")
                    }}</label>
                    <div class="d-flex col-sm-9">
                      <CInput
                        class="mb-0 mr-2"
                        style="width: 100%"
                        disabled
                        :placeholder="$t('membership')"
                        v-model="Payment.membershipname"
                      ></CInput>
                      <b-button
                        size="sm"
                        variant="primary"
                        @click="OpenpaymentAccrualModal"
                      >
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <!-- <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{
                      $t("personmember")
                    }}</label>
                    <CInput
                      class="col-sm-9"
                      style="width: 100%"
                      disabled
                      :placeholder="$t('personmember')"
                      v-model="Payment.personmembername"
                    ></CInput>
                  </div>
                </CCol> -->
                <CCol sm="12" lg="4">
                  <ValidationProvider v-slot="v" name="amount" rules="required">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3" for
                        >{{ $t("amount") }}
                      </label>
                      <CInput
                      type="number"
                        class="col-sm-9"
                        :placeholder="$t('amount')"
                        v-model="Payment.amount"
                        :decimals="0"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </div>
                  </ValidationProvider>
                </CCol>
                <CCol sm="12" lg="4">
                  <ValidationProvider
                    v-slot="v"
                    name="detail"
                    rules="required|min:1"
                  >
                    <CInput
                      :placeholder="$t('detail')"
                      autocomplete="detail"
                      horizontal
                      :label="$t('detail')"
                      v-model="Payment.detail"
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
                  
                </CCol>
                <!-- <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{
                      $t("paymentaccrual")
                    }}</label>
                    <div class="d-flex col-sm-9">
                      <CInput
                        class="mb-0 mr-2"
                        style="width: 100%"
                        disabled
                        :placeholder="$t('paymentaccrual')"
                        v-model="Payment.paymentaccrual"
                      ></CInput>
                      <b-button size="sm" variant="primary" @click="OpenpaymentAccrualModal">
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </div>
                  </div>
                </CCol> -->
              </CRow>
            </ValidationObserver>
          </CCardBody>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton class="ml-4" size="sm" color="danger" @click="Back()">
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
        <b-modal
          id="modalXl"
          no-close-on-backdrop
          size="xl"
          :title="$t('membership')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <Member-Component
            :isview="false"
            @SelectedItem="SelectedEmployeeItem"
            @DblClick="AddEmployeeData"
          ></Member-Component>
  
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddEmployeeData(personvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="paymentaccrualmodal"
          no-close-on-backdrop
          size="xl"
          :title="$t('paymentaccrual')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <payment-accrual-component
            :isview="false"
            :ondate="Payment.docdate"
            @SelectedItem="SelectedPaymentAccrualItem"
            @DblClick="AddPaymentAccrualData"
          ></payment-accrual-component>
  
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="ClosePaymentAccrualModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddPaymentAccrualData(personvalue)"
              >
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="modalmember"
          no-close-on-backdrop
          size="xl"
          :title="$t('PersonMember')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <Person-Component
            :isview="false"
            @SelectedItem="SelectedPersonMemberItem"
            @DblClick="AddPersonMemberData"
          ></Person-Component>
  
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="ClosePersonMemberModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddPersonMemberData(personvalue1)"
              >
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
      </CCol>
    </CRow>
  </template>
  
  <script>
  import PaymentService from "@/services/Payment.service";
  import EmployeeListComponent from "@/components/EmployeeList";
  import MemberShipTypeService from "@/services/MemberShipType.service";
  import PersonMemberService from "@/services/PersonMember.service";
  import MemberComponent from "@/components/MemberList";
  import PersonComponent from "@/components/PersonMember";
  import PaymentAccrualComponent from "@/components/PaymentAccrualComponent";
  export default {
    components: {
      EmployeeListComponent,
      MemberComponent,
      PersonComponent,
      PaymentAccrualComponent,
    },
    data() {
      return {
        SaveLoading: false,
        Payment: {},
        OrganizationLoading: false,
        RegionLoading: false,
        RegionList: [],
        OblastList: [],
        selectedrowid: 0,
        checkamount: 0,
        SchoolYear: [],
        SchoolGradeList: [],
        schoolgradeletterlist: [],
        MinimumValueTypeList: [],
        ServicePocketList: [],
        personvalue: {},
        personvalue1: {},
        paymentvalue: {},
        CircleSportTypeList: [],
        MemberShipList: [],
        SportGroupCategoryTypeList: [],
        OrganizationList: [],
        PersonMemberList: [],
        employeelist: [],
        lang: "",
        isDisabled: false,
      };
    },
    created() {
      var self = this;
      this.lang = localStorage.getItem("locale") || "ru";
      self.selectedrowid = self.$route.params.id;
      PaymentService.Get(self.selectedrowid).then((res) => {
        self.Payment = res.data;
      });
      MemberShipTypeService.GetAll().then((res) => {
        self.MemberShipList = res.data;
      });
      PersonMemberService.GetAll().then((res) => {
        self.PersonMemberList = res.data;
      });
    },
    methods: {
      ChangePersonMember() {
        this.Payment.personmembername = this.PersonMemberList.filter(
          (item) => this.Payment.personmemberid === item.id
        )[0].name;
      },
      ChangeMemberShip() {
        this.Payment.membershipname = this.MemberShipList.filter(
          (item) => this.Payment.membershipid === item.id
        )[0].name;
      },
      OpenOrgModal() {
        this.$bvModal.show("modalXl");
      },
      OpenPersonModal() {
        this.$bvModal.show("modalmember");
      },
      OpenpaymentAccrualModal() {
        this.$bvModal.show("paymentaccrualmodal");
      },
      ClosePaymentAccrualModal() {
        this.$bvModal.hide("paymentaccrualmodal");
      },
      ClosePersonModal() {
        this.$bvModal.hide("modalXl");
      },
      ClosePersonMemberModal() {
        this.$bvModal.hide("modalmember");
      },
      setAllErrors(errors) {
        this.allSignupErrors = errors;
      },
      SelectedEmployeeItem(data) {
        this.personvalue = data;
      },
      SelectedPaymentAccrualItem(data) {
        this.paymentvalue = data;
      },
      SelectedPersonMemberItem(data) {
        this.personvalue1 = data;
      },
      AddPaymentAccrualData(data) {
        var self = this;
        self.Payment.membershipid = data.membershipid;
        self.Payment.membershipname = data.personmembershipnumber;
        self.Payment.personmemberid = data.personmemberid;
        self.Payment.personmembername = data.personmembername;
        self.Payment.amount = data.balanceamount;
        self.checkamount = data.balanceamount
        self.ClosePaymentAccrualModal();
      },
      AddEmployeeData(data) {
        var self = this;
        self.Payment.membershipid = data.id;
        self.Payment.membershipname = data.membershiptypename;
        self.ClosePersonModal();
      },
      AddPersonMemberData(data) {
        var self = this;
        self.Payment.personmemberid = data.id;
        self.Payment.personmembername = data.fullname;
        self.ClosePersonMemberModal();
      },
      rowClass(item, type) {
        if (item.Status === 3) {
          return "d-none";
        }
      },
      Back() {
        this.$router.push({
          name: "Payment",
          query: {
            Search: this.$route.query.Search,
            SortColumn: this.$route.query.SortColumn,
            OrderType: this.$route.query.OrderType,
            PageNumber: this.$route.query.PageNumber,
            PageLimit: this.$route.query.PageLimit,
          },
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
      check() {
        var self = this;
        if (
          self.Payment.docnumber === 0 ||
          self.Payment.docnumber === null ||
          self.Payment.docnumber === undefined ||
          self.Payment.docnumber === ""
        ) {
          this.makeToast(
            this.$t("docnumberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.Payment.docdate === 0 ||
          self.Payment.docdate === null ||
          self.Payment.docdate === undefined ||
          self.Payment.docdate === ""
        ) {
          this.makeToast(
            this.$t("docdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.Payment.membershipid === 0 ||
          self.Payment.membershipid === null ||
          self.Payment.membershipid === undefined ||
          self.Payment.membershipid === ""
        ) {
          this.makeToast(
            this.$t("membershiptypeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.Payment.amount === 0 ||
          self.Payment.amount === null ||
          self.Payment.amount === undefined ||
          self.Payment.amount === ""
        ) {
          this.makeToast(this.$t("amountNotCorrect"), this.$t("Error"), "danger");
          return false;
        }
        if(!!self.checkamount && self.Payment.amount > self.checkamount){
               this.makeToast(
            this.$t("amountlengthNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.Payment.detail === null ||
          self.Payment.detail === undefined ||
          self.Payment.detail === ""
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
        if (!self.check()) {
          return false;
        }
        PaymentService.Update(self.Payment)
          .then((res) => {
            self.makeToast(
              self.$t("SuccessMessage"),
              self.$t("message"),
              "success"
            );
            self.$router.push({
              name: "Payment",
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
            self.makeToast(
              error.response.data.error,
              self.$t("message"),
              "danger"
            );
          });
      },
    },
  };
  </script>
  
  <style>
  </style>
  
  
  
  
  
  