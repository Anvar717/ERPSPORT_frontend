<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("PriceList") }}</h4>
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
                    disabled
                    :label="$t('docnumber')"
                    v-model="PriceList.docnumber"
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
                        v-model="PriceList.docdate"
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
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="servicepocket"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("servicepocket")
                    }}</label>
                    <v-select
                      :options="ServicePocketList"
                      class="col-sm-9"
                      v-model="PriceList.servicepocketid"
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
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="sporttypeclassifier"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for
                      >{{ $t("sporttypeclassifier") }}
                    </label>
                    <v-select
                      class="col-sm-9"
                      :options="sporttypeclassifierlist"
                      v-model="PriceList.sporttypeclassifierid"
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
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="membershiptype"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for
                      >{{ $t("membershiptype") }}
                    </label>
                    <v-select
                      class="col-sm-9"
                      :options="MemberShipList"
                      v-model="PriceList.membershiptypeid"
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
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="minimumvaluetype"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("minimumvaluetype")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="MinimumValueTypeList"
                      v-model="PriceList.minimumvaluetypeid"
                      :reduce="(item) => item.id"
                      @input="ChangeMinimumValue"
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
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("isfree")
                  }}</label>
                  <b-form-checkbox
                    v-model="PriceList.isfree"
                    switch
                    @change="changeFreeTrener"
                    class="col-sm-9 mt-1"
                  ></b-form-checkbox>
                </div>
              </CCol>
              <CCol v-if="!PriceList.isfree">
                <ValidationProvider
                  v-slot="v"
                  name="percentage"
                  rules="required|max:3"
                >
                  <CInput
                    type="number"
                    :placeholder="$t('percentage')"
                    autocomplete="percentage"
                    horizontal
                    @input="changepercentage"
                    :label="$t('percentage')"
                    v-model="PriceList.percentage"
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
              <CCol v-if="!PriceList.isfree">
                <ValidationProvider
                  v-slot="v"
                  name="amount"
                  rules="required|min:1"
                >
                  <CInput
                    type="number"
                    :placeholder="$t('amount')"
                    autocomplete="amount"
                    horizontal
                    :label="$t('amount')"
                    v-model="PriceList.amount"
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
              <CCol v-if="PriceList.isfree"> </CCol>
            </CRow>
            <CRow>
              <CCol sm="4" v-if="!PriceList.isfree">
                <ValidationProvider
                  v-slot="v"
                  name="morethanonechild"
                  rules="required|min:1"
                >
                  <CInput
                    type="number"
                    :placeholder="$t('morethanonechild')"
                    autocomplete="morethanonechild"
                    horizontal
                    :label="$t('morethanonechild')"
                    v-model="PriceList.morethanonechild"
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
              <CCol sm="4" v-if="!PriceList.isfree">
                <ValidationProvider
                  v-slot="v"
                  name="coachpayment"
                  rules="required|min:1"
                >
                  <CInput
                    type="number"
                    :placeholder="$t('coachpayment')"
                    autocomplete="coachpayment"
                    horizontal
                    :label="$t('coachpayment')"
                    v-model="PriceList.coachpayment"
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
                <!-- <ValidationProvider
                  v-slot="v"
                  name="detail"
                  rules="required|min:1"
                >
                  <CInput
                    :placeholder="$t('detail')"
                    autocomplete="detail"
                    horizontal
                    :label="$t('detail')"
                    v-model="PriceList.detail"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider> -->
              </CCol>
              <CCol></CCol>
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
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import PriceListService from "@/services/PriceList.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
import HelperService from "@/services/helper.service";
import MemberShipTypeService from "@/services/MemberShipType.service";
import ServicePocketService from "@/services/ServicePocket.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import PersonMemberService from "@/services/PersonMember.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  components: { EmployeeListComponent },
  data() {
    return {
      SaveLoading: false,
      PriceList: {},
      OrganizationLoading: false,
      RegionLoading: false,
      RegionList: [],
      OblastList: [],
      selectedrowid: 0,
      SchoolYear: [],
      SchoolGradeList: [],
      schoolgradeletterlist: [],
      MinimumValueTypeList: [],
      ServicePocketList: [],
      sporttypeclassifierlist: [],
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
    PriceListService.Get(self.selectedrowid).then((res) => {
      self.PriceList = res.data;
      SchoolYearService.GetAll().then((res) => {
        self.SchoolYear = res.data;
      });
    });
    SchoolGradeLetterService.GetAll().then((res) => {
      self.schoolgradeletterlist = res.data;
    });
    SportGroupCategoryTypeService.GetAll().then((res) => {
      self.SportGroupCategoryTypeList = res.data;
    });
    MemberShipTypeService.GetAll().then((res) => {
      self.MemberShipList = res.data;
    });
    PersonMemberService.GetAll().then((res) => {
      self.PersonMemberList = res.data;
    });
    HelperService.GetMinimumValueTypeList().then((res) => {
      self.MinimumValueTypeList = res.data;
    });
    ServicePocketService.GetAll().then((res) => {
      self.ServicePocketList = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      self.sporttypeclassifierlist = res.data;
    });
  },
  methods: {
    changeFreeTrener() {
      if (this.PriceList.isfree) {
        this.PriceList.percentage = 0;
        this.PriceList.amount = 0;
        this.PriceList.coachpayment = 0;
      }
    },
    ChangeFromSportGroup() {
      this.tabrow.fromsportgroupcategorytypename =
        this.SportGroupCategoryTypeList.filter(
          (item) => this.tabrow.fromsportgroupcategorytypeid === item.id
        )[0].name;
    },
    ChangeToSportGroup() {
      this.tabrow.tosportgroupcategorytypename =
        this.SportGroupCategoryTypeList.filter(
          (item) => this.tabrow.tosportgroupcategorytypeid === item.id
        )[0].name;
    },
    ChangePersonMember() {
      this.tabrow.personmembername = this.PersonMemberList.filter(
        (item) => this.tabrow.personmemberid === item.id
      )[0].name;
    },
    ChangeMemberShip() {
      this.tabrow.membershipname = this.MemberShipList.filter(
        (item) => this.tabrow.membershipid === item.id
      )[0].name;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Back() {
      this.$router.push({
        name: "PriceList",
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
        self.PriceList.docnumber === 0 ||
        self.PriceList.docnumber === null ||
        self.PriceList.docnumber === undefined ||
        self.PriceList.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PriceList.docdate === 0 ||
        self.PriceList.docdate === null ||
        self.PriceList.docdate === undefined ||
        self.PriceList.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PriceList.servicepocketid === 0 ||
        self.PriceList.servicepocketid === null ||
        self.PriceList.servicepocketid === undefined ||
        self.PriceList.servicepocketid === ""
      ) {
        this.makeToast(
          this.$t("servicepocketNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PriceList.sporttypeclassifierid === 0 ||
        self.PriceList.sporttypeclassifierid === null ||
        self.PriceList.sporttypeclassifierid === undefined ||
        self.PriceList.sporttypeclassifierid === ""
      ) {
        this.makeToast(
          this.$t("sporttypeclassifieridNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PriceList.membershiptypeid === 0 ||
        self.PriceList.membershiptypeid === null ||
        self.PriceList.membershiptypeid === undefined ||
        self.PriceList.membershiptypeid === ""
      ) {
        this.makeToast(
          this.$t("membershiptypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PriceList.minimumvaluetypeid === 0 ||
        self.PriceList.minimumvaluetypeid === null ||
        self.PriceList.minimumvaluetypeid === undefined ||
        self.PriceList.minimumvaluetypeid === ""
      ) {
        this.makeToast(
          this.$t("minimumvaluetypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!this.PriceList.isfree) {
        if (
          self.PriceList.percentage === 0 ||
          self.PriceList.percentage === null ||
          self.PriceList.percentage === undefined ||
          self.PriceList.percentage === ""
        ) {
          this.makeToast(
            this.$t("percentageNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.PriceList.amount === 0 ||
          self.PriceList.amount === null ||
          self.PriceList.amount === undefined ||
          self.PriceList.amount === ""
        ) {
          this.makeToast(
            this.$t("amountNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.PriceList.morethanonechild === 0 ||
          self.PriceList.morethanonechild === null ||
          self.PriceList.morethanonechild === undefined ||
          self.PriceList.morethanonechild === ""
        ) {
          this.makeToast(
            this.$t("morethanonechildNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.PriceList.coachpayment === 0 ||
          self.PriceList.coachpayment === null ||
          self.PriceList.coachpayment === undefined ||
          self.PriceList.coachpayment === ""
        ) {
          this.makeToast(
            this.$t("coachpaymentNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      // if (
      //   self.PriceList.detail === null ||
      //   self.PriceList.detail === undefined ||
      //   self.PriceList.detail === ""
      // ) {
      //   this.makeToast(
      //     this.$t("detailinfoNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      return true;
    },
    checkData() {
      var self = this;
      if (
        self.PriceList.docnumber === 0 ||
        self.PriceList.docnumber === null ||
        self.PriceList.docnumber === undefined ||
        self.PriceList.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PriceList.docdate === 0 ||
        self.PriceList.docdate === null ||
        self.PriceList.docdate === undefined ||
        self.PriceList.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      //   if (
      //     self.PriceList.schoolyearid === 0 ||
      //     self.PriceList.schoolyearid === null ||
      //     self.PriceList.schoolyearid === undefined ||
      //     self.PriceList.schoolyearid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("schoolyearNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      //   if (
      //     self.PriceList.organizationid === 0 ||
      //     self.PriceList.organizationid === null ||
      //     self.PriceList.organizationid === undefined ||
      //     self.PriceList.organizationid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("organizationNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      // if (
      //   self.PriceList.detailinfo === null ||
      //   self.PriceList.detailinfo === undefined ||
      //   self.PriceList.detailinfo === ""
      // ) {
      //   this.makeToast(
      //     this.$t("detailinfoNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      return true;
    },
    ChangeMinimumValue() {
      if (!!this.PriceList.docdate) {
        HelperService.GetFixedMinimumValueByDate(
          this.PriceList.minimumvaluetypeid,
          this.PriceList.docdate
        ).then((res) => {
          this.PriceList.amount = res.data[0].fixedvalue;
        });
      } else {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
      }
    },
    changepercentage() {
      if (
        !!this.PriceList.docdate &&
        !!this.PriceList.minimumvaluetypeid &&
        this.PriceList.percentage.length != 0
      ) {
        HelperService.GetFixedMinimumValueByDate(
          this.PriceList.minimumvaluetypeid,
          this.PriceList.docdate
        ).then((res) => {
          this.PriceList.amount =
            (res.data[0].fixedvalue * parseInt(this.PriceList.percentage)) /
            100;
        });
      } else {
        this.makeToast(this.$t("amountNotCorrect"), this.$t("Error"), "danger");
      }
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      PriceListService.Update(self.PriceList)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "PriceList",
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





