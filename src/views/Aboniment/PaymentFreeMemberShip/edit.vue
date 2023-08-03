<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("PaymentFreeMemberShip") }}</h4>
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
                  type="number"
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="PaymentFreeMemberShip.docnumber"
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
                        v-model="PaymentFreeMemberShip.docdate"
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
                  name="docnumber"
                  rules="required|min:1"
                >
                  <CInput
                    :placeholder="$t('detail')"
                    autocomplete="detail"
                    horizontal
                    :label="$t('detail')"
                    v-model="PaymentFreeMemberShip.detail"
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
          </ValidationObserver>
        </CCardBody>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{
            $t("PaymentFreeMemberShip")
          }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("personmember")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    disabled
                    :placeholder="$t('personmember')"
                    v-model="tabrow.personmembername"
                  ></CInput>
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="OpenPersonMemberModal"
                  >
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
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
                    v-model="tabrow.membershipname"
                  ></CInput>
                  <b-button size="sm" variant="primary" @click="OpenOrgModal">
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("privilegereason")
                }}</label>
                <v-select
                  :options="privilegereasonlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="col-sm-9"
                  @input="ChangePrivilegeReason"
                  v-model="tabrow.privilegereasonid"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="AddItem">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="OpenModal">
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="Fields"
              :items="PaymentFreeMemberShip.Tables"
              class="bg-color-table text-center mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(isappointment)="{ item }">
                <p class="m-0">
                  {{
                    item.isappointmentid === 1
                      ? "Тайинлов/Назначение"
                      : "Озод этиш/Отстранение"
                  }}
                </p>
              </template>

              <!-- <template #cell(personname)="{item}">
                {{employeelist.filter(i => i.id === item.personid)[0].name }}
              </template> -->
              <template v-slot:cell(istemporarily)="{ item }">
                <p class="m-0">
                  {{ item.istemporarily === true ? $t("yes") : $t("no") }}
                </p>
              </template>

              <template #cell(actions)="{ item }">
                <div class="text-center">
                  <b-link
                    @click="EditItem(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteItem(item)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
          </CCol>
        </CRow>
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
import SchoolYearService from "@/services/SchoolYear.service";
import PaymentFreeMemberShipService from "@/services/PaymentFreeMemberShip.service";
import EmployeeListComponent from "@/components/EmployeeList";
import PrivilegeReasonService from "@/services/PrivilegeReason.service";
import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
import MemberShipTypeService from "@/services/MemberShipType.service";
import PersonMemberService from "@/services/PersonMember.service";
import MemberComponent from "@/components/MemberList";
import PersonComponent from "@/components/PersonMember";
export default {
  components: { EmployeeListComponent, MemberComponent, PersonComponent },
  data() {
    return {
      SaveLoading: false,
      PaymentFreeMemberShip: {},
      OrganizationLoading: false,
      RegionLoading: false,
      RegionList: [],
      personvalue1: {},
      OblastList: [],
      privilegereasonlist: [],
      selectedrowid: 0,
      SchoolYear: [],
      SchoolGradeList: [],
      personvalue: {},
      schoolgradeletterlist: [],
      MemberShipList: [],
      SportGroupCategoryTypeList: [],
      OrganizationList: [],
      PersonMemberList: [],
      employeelist: [],
      lang: "",
      Fields: [
        {
          key: "personmembername",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("personmember"),
        },
        {
          key: "membershipname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("membership"),
        },
        {
          key: "privilegereasonname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("privilegereason"),
        },
        {
          key: "actions",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("actions"),
        },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        fromsportgroupcategorytypeid: 0,
        fromsportgroupcategorytypename: "",
        personmembername: "",
        personmemberid: 0,
        membershipid: 0,
        membershipname: "",
        personmemberid: 0,
        personmembername: "",
        tosportgroupcategorytypeid: 0,
        tosportgroupcategorytypename: "",
        Status: 1,
      },
      editedIndex: -1,
      isDisabled: false,
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    PaymentFreeMemberShipService.Get(self.selectedrowid).then((res) => {
      self.PaymentFreeMemberShip = res.data;
      SchoolYearService.GetAll().then((res) => {
        self.SchoolYear = res.data;
      });
    });
    SchoolGradeLetterService.GetAll(this.lang).then((res) => {
      self.schoolgradeletterlist = res.data;
    });
    SportGroupCategoryTypeService.GetAll(this.lang).then((res) => {
      self.SportGroupCategoryTypeList = res.data;
    });
    MemberShipTypeService.GetAll(this.lang).then((res) => {
      self.MemberShipList = res.data;
    });
    PrivilegeReasonService.GetAll(this.lang).then((res) => {
      self.privilegereasonlist = res.data;
    });
    PersonMemberService.GetAll(this.lang).then((res) => {
      self.PersonMemberList = res.data;
    });
  },
  methods: {
    ChangePrivilegeReason() {
      this.tabrow.privilegereasonname = this.privilegereasonlist.filter(
        (item) => this.tabrow.privilegereasonid === item.id
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
    AddPersonMemberData(data) {
      var self = this;
      self.tabrow.personmemberid = data.id;
      self.tabrow.personmembername = data.fullname;
      self.ClosePersonMemberModal();
    },
    SelectedPersonMemberItem(data) {
      this.personvalue1 = data;
    },
    OpenPersonMemberModal() {
      this.$bvModal.show("modalmember");
    },
    ClosePersonMemberModal() {
      this.$bvModal.hide("modalmember");
    },
    OpenOrgModal() {
      this.$bvModal.show("modalXl");
    },
    ClosePersonModal() {
      this.$bvModal.hide("modalXl");
    },
    SelectedEmployeeItem(data) {
      this.personvalue = data;
    },
    AddEmployeeData(data) {
      var self = this;
      self.tabrow.membershipid = data.id;
      self.tabrow.membershipname = data.membershiptypename;
      self.ClosePersonModal();
    },
    Back() {
      this.$router.push({
        name: "PaymentFreeMemberShip",
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
    Add() {
      var self = this;
      self.tabrow;
      //   if (
      //     self.tabrow.fromsportgroupcategorytypeid === "" ||
      //     self.tabrow.fromsportgroupcategorytypeid === undefined ||
      //     self.tabrow.fromsportgroupcategorytypeid === null ||
      //     self.tabrow.fromsportgroupcategorytypeid === 0
      //   ) {
      //     self.makeToast(
      //       self.$t("fromsportgroupcategorytypeNotCorrect"),
      //       self.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      if (
        self.tabrow.membershipid === "" ||
        self.tabrow.membershipid === undefined ||
        self.tabrow.membershipid === null ||
        self.tabrow.membershipid === 0
      ) {
        self.makeToast(
          self.$t("membershipNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.personmemberid === "" ||
        self.tabrow.personmemberid === undefined ||
        self.tabrow.personmemberid === null ||
        self.tabrow.personmemberid === 0
      ) {
        self.makeToast(
          self.$t("personmemberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
        if (
          self.tabrow.privilegereasonid === "" ||
          self.tabrow.privilegereasonid === undefined ||
          self.tabrow.privilegereasonid === null ||
          self.tabrow.privilegereasonid === 0
        ) {
          self.makeToast(
            self.$t("privilegereasonNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      // self.tabrow.schoolgradelettername = self.schoolgradeletterlist.filter(function(
      //   item
      // ) {
      //   if (item.id === self.tabrow.schoolgradeletterid) return item;
      // })[0].name;

      self.PaymentFreeMemberShip.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        fromsportgroupcategorytypeid: 0,
        fromsportgroupcategorytypename: "",
        membershipid: 0,
        membershipname: "",
        privilegereasonname: "",
        privilegereasonid: 0,
        personmemberid: 0,
        personmembername: "",
        tosportgroupcategorytypeid: 0,
        tosportgroupcategorytypename: "",
        Status: 1,
      };
      self.isDisabled = true;
      self.$bvModal.hide("AddModal");
    },
    OpenModal() {
      var self = this;
      if (!self.checkData()) {
        return false;
      }
      self.$bvModal.show("AddModal");
    },

    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.PaymentFreeMemberShip.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.PaymentFreeMemberShip.Tables[this.editedIndex],
          this.tabrow
        );
        this.Close();
      } else {
        this.Add();
      }
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          fromsportgroupcategorytypeid: 0,
          fromsportgroupcategorytypename: "",
          membershipid: 0,
          membershipname: "",
          personmemberid: 0,
          personmembername: "",
          tosportgroupcategorytypeid: 0,
          tosportgroupcategorytypename: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    // ChooseRegion() {
    //   var vm = this;
    //   vm.RegionLoading = true;
    //   if (!!vm.PaymentFreeMemberShip.oblastid) {
    //     RegionService.GetAll("ru", vm.PaymentFreeMemberShip.oblastid).then(
    //       (res) => {
    //         vm.RegionList = res.data;
    //         vm.RegionLoading = false;
    //       }
    //     );
    //   } else {
    //     vm.PaymentFreeMemberShip.regionid = "";
    //     vm.RegionLoading = false;
    //   }
    // },
    // ChooseOrganization() {
    //   var vm = this;
    //   vm.OrganizationLoading = true;
    //   if (!!vm.PaymentFreeMemberShip.regionid) {
    //     OrganizationService.GetAll(
    //       vm.PaymentFreeMemberShip.oblastid,
    //       vm.PaymentFreeMemberShip.regionid
    //     ).then((res) => {
    //       vm.OrganizationList = res.data;
    //       vm.OrganizationLoading = false;
    //     });
    //   } else {
    //     vm.PaymentFreeMemberShip.organizationid = "";
    //     vm.OrganizationLoading = false;
    //   }
    // },
    check() {
      var self = this;
      if (
        self.PaymentFreeMemberShip.docnumber === 0 ||
        self.PaymentFreeMemberShip.docnumber === null ||
        self.PaymentFreeMemberShip.docnumber === undefined ||
        self.PaymentFreeMemberShip.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PaymentFreeMemberShip.docdate === 0 ||
        self.PaymentFreeMemberShip.docdate === null ||
        self.PaymentFreeMemberShip.docdate === undefined ||
        self.PaymentFreeMemberShip.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      //   if (
      //     self.PaymentFreeMemberShip.schoolyearid === 0 ||
      //     self.PaymentFreeMemberShip.schoolyearid === null ||
      //     self.PaymentFreeMemberShip.schoolyearid === undefined ||
      //     self.PaymentFreeMemberShip.schoolyearid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("schoolyearNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      if (
        self.PaymentFreeMemberShip.detail === null ||
        self.PaymentFreeMemberShip.detail === undefined ||
        self.PaymentFreeMemberShip.detail === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.PaymentFreeMemberShip.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    checkData() {
      var self = this;
      if (
        self.PaymentFreeMemberShip.docnumber === 0 ||
        self.PaymentFreeMemberShip.docnumber === null ||
        self.PaymentFreeMemberShip.docnumber === undefined ||
        self.PaymentFreeMemberShip.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PaymentFreeMemberShip.docdate === 0 ||
        self.PaymentFreeMemberShip.docdate === null ||
        self.PaymentFreeMemberShip.docdate === undefined ||
        self.PaymentFreeMemberShip.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      //   if (
      //     self.PaymentFreeMemberShip.schoolyearid === 0 ||
      //     self.PaymentFreeMemberShip.schoolyearid === null ||
      //     self.PaymentFreeMemberShip.schoolyearid === undefined ||
      //     self.PaymentFreeMemberShip.schoolyearid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("schoolyearNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      //   if (
      //     self.PaymentFreeMemberShip.organizationid === 0 ||
      //     self.PaymentFreeMemberShip.organizationid === null ||
      //     self.PaymentFreeMemberShip.organizationid === undefined ||
      //     self.PaymentFreeMemberShip.organizationid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("organizationNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      // if (
      //   self.PaymentFreeMemberShip.detailinfo === null ||
      //   self.PaymentFreeMemberShip.detailinfo === undefined ||
      //   self.PaymentFreeMemberShip.detailinfo === ""
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
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      PaymentFreeMemberShipService.Update(self.PaymentFreeMemberShip)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "PaymentFreeMemberShip",
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





