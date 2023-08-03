<template>
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("SportGroupMovement") }}</h4>
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
                    type="number"
                      :placeholder="$t('docnumber')"
                      autocomplete="docnumber"
                      horizontal
                      :label="$t('docnumber')"
                      v-model="SportGroupMovement.docnumber"
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
                          v-model="SportGroupMovement.docdate"
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
                      v-model="SportGroupMovement.detail"
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
              <!-- <CRow>
                <CCol>
                  <ValidationProvider v-slot="v" name="oblast" rules="required">
                    <label for>{{ $t("oblast") }}</label>
                    <v-select
                      :options="OblastList"
                      disabled
                      v-model="SportGroupMovement.oblastid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="ChooseRegion"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </ValidationProvider>
                </CCol>
                <CCol>
                  <ValidationProvider v-slot="v" name="region" rules="required">
                    <label for
                      >{{ $t("region") }}
                      <b-spinner v-if="RegionLoading" small></b-spinner
                    ></label>
                    <v-select
                    disabled
                      :options="RegionList"
                      v-model="SportGroupMovement.regionid"
                      :reduce="(item) => item.id"
                      @input="ChooseOrganization"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </ValidationProvider>
                </CCol>
                <CCol>
                  <ValidationProvider v-slot="v" name="region" rules="required">
                    <label for
                      >{{ $t("Organization") }}
                      <b-spinner v-if="OrganizationLoading" small></b-spinner
                    ></label>
                    <v-select
                      :options="OrganizationList"
                      v-model="SportGroupMovement.organizationid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </ValidationProvider>
                </CCol>
              </CRow> -->
            </ValidationObserver>
          </CCardBody>
          <b-modal id="AddModal" size="lg" no-close-on-backdrop>
            <template v-slot:modal-title>{{ $t("SportGroupMovement") }}</template>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("fromsportgroupcategorytype")
                  }}</label>
                  <v-select
                    :options="SportGroupCategoryTypeList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    class="col-sm-9"
                    label="name"
                    v-model="tabrow.fromsportgroupcategorytypeid"
                    @input="ChangeFromSportGroup"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
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
                    $t("tosportgroupcategorytype")
                  }}</label>
                  <v-select
                    :options="SportGroupCategoryTypeList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    class="col-sm-9"
                    label="name"
                    v-model="tabrow.tosportgroupcategorytypeid"
                    @input="ChangeToSportGroup"
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
              <div class="mobileStyle mx-3">
                <b-table
                  :fields="Fields"
                  :items="SportGroupMovement.Tables"
                  class="bg-color-table text-center"
                  style="vertical-align: middle"
                  bordered
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
              </div>
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
                <b-button
                  variant="primary"
                  @click="AddEmployeeData(personvalue)"
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
  import SchoolYearService from "@/services/SchoolYear.service";
  import SportGroupMovementService from "@/services/SportGroupMovement.service";
  import EmployeeListComponent from "@/components/EmployeeList";
  import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
  import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
  import MemberShipTypeService from "@/services/MemberShipType.service";
  import PersonMemberService from "@/services/PersonMember.service";
  import MemberComponent from '@/components/MemberList';
  import PersonComponent from "@/components/PersonMember";
  export default {
    components: { EmployeeListComponent, MemberComponent, PersonComponent },
    data() {
      return {
        SaveLoading: false,
        SportGroupMovement: {},
        OrganizationLoading: false,
        RegionLoading: false,
        RegionList: [],
        OblastList: [],
        selectedrowid: 0,
        SchoolYear: [],
        SchoolGradeList: [],
        personvalue:{},
        schoolgradeletterlist: [],
        MemberShipList: [],
        SportGroupCategoryTypeList: [],
        OrganizationList: [],
        PersonMemberList: [],
        employeelist: [],
        lang: "",
        Fields: [
          {
            key: "fromsportgroupcategorytypename",
            tdClass: "text-left",
            thClass: "text-center",
            label: this.$t("fromsportgroupcategorytype"),
          },
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
            key: "tosportgroupcategorytypename",
            tdClass: "text-left",
            thClass: "text-center",
            label: this.$t("tosportgroupcategorytype"),
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
          membershipid: 0,
          membershipname: "",
          personmemberid: 0,
          personmembername: "",
          tosportgroupcategorytypeid: 0,
          tosportgroupcategorytypename: "",
          Status: 1,
        },
        personvalue1: {},
        editedIndex: -1,
        isDisabled: false,
      };
    },
    created() {
      var self = this;
      this.lang = localStorage.getItem("locale") || "ru";
      self.selectedrowid = self.$route.params.id;
      SportGroupMovementService.Get(self.selectedrowid).then((res) => {
        self.SportGroupMovement = res.data;
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
    },
    methods: {
      OpenPersonMemberModal() {
        this.$bvModal.show("modalmember");
      },
      ClosePersonMemberModal() {
        this.$bvModal.hide("modalmember");
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
          name: "SportGroupMovement",
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
        if (
          self.tabrow.fromsportgroupcategorytypeid === "" ||
          self.tabrow.fromsportgroupcategorytypeid === undefined ||
          self.tabrow.fromsportgroupcategorytypeid === null ||
          self.tabrow.fromsportgroupcategorytypeid === 0
        ) {
          self.makeToast(
            self.$t("fromsportgroupcategorytypeNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.tosportgroupcategorytypeid === "" ||
          self.tabrow.tosportgroupcategorytypeid === undefined ||
          self.tabrow.tosportgroupcategorytypeid === null ||
          self.tabrow.tosportgroupcategorytypeid === 0
        ) {
          self.makeToast(
            self.$t("tosportgroupcategorytypeNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
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
        // self.tabrow.schoolgradelettername = self.schoolgradeletterlist.filter(function(
        //   item
        // ) {
        //   if (item.id === self.tabrow.schoolgradeletterid) return item;
        // })[0].name;
  
        self.SportGroupMovement.Tables.push(self.tabrow);
        self.tabrow = {
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
        this.editedIndex = this.SportGroupMovement.Tables.indexOf(item);
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
            this.SportGroupMovement.Tables[this.editedIndex],
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
      //   if (!!vm.SportGroupMovement.oblastid) {
      //     RegionService.GetAll("ru", vm.SportGroupMovement.oblastid).then(
      //       (res) => {
      //         vm.RegionList = res.data;
      //         vm.RegionLoading = false;
      //       }
      //     );
      //   } else {
      //     vm.SportGroupMovement.regionid = "";
      //     vm.RegionLoading = false;
      //   }
      // },
      // ChooseOrganization() {
      //   var vm = this;
      //   vm.OrganizationLoading = true;
      //   if (!!vm.SportGroupMovement.regionid) {
      //     OrganizationService.GetAll(
      //       vm.SportGroupMovement.oblastid,
      //       vm.SportGroupMovement.regionid
      //     ).then((res) => {
      //       vm.OrganizationList = res.data;
      //       vm.OrganizationLoading = false;
      //     });
      //   } else {
      //     vm.SportGroupMovement.organizationid = "";
      //     vm.OrganizationLoading = false;
      //   }
      // },
      check() {
        var self = this;
        if (
          self.SportGroupMovement.docnumber === 0 ||
          self.SportGroupMovement.docnumber === null ||
          self.SportGroupMovement.docnumber === undefined ||
          self.SportGroupMovement.docnumber === ""
        ) {
          this.makeToast(
            this.$t("docnumberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.SportGroupMovement.docdate === 0 ||
          self.SportGroupMovement.docdate === null ||
          self.SportGroupMovement.docdate === undefined ||
          self.SportGroupMovement.docdate === ""
        ) {
          this.makeToast(
            this.$t("docdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        //   if (
        //     self.SportGroupMovement.schoolyearid === 0 ||
        //     self.SportGroupMovement.schoolyearid === null ||
        //     self.SportGroupMovement.schoolyearid === undefined ||
        //     self.SportGroupMovement.schoolyearid === ""
        //   ) {
        //     this.makeToast(
        //       this.$t("schoolyearNotCorrect"),
        //       this.$t("Error"),
        //       "danger"
        //     );
        //     return false;
        //   }
        if (
          self.SportGroupMovement.detail === null ||
          self.SportGroupMovement.detail === undefined ||
          self.SportGroupMovement.detail === ""
        ) {
          this.makeToast(
            this.$t("detailinfoNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (self.SportGroupMovement.Tables.length === 0) {
          this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
          return false;
        }
  
        return true;
      },
      checkData() {
        var self = this;
        if (
          self.SportGroupMovement.docnumber === 0 ||
          self.SportGroupMovement.docnumber === null ||
          self.SportGroupMovement.docnumber === undefined ||
          self.SportGroupMovement.docnumber === ""
        ) {
          this.makeToast(
            this.$t("docnumberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.SportGroupMovement.docdate === 0 ||
          self.SportGroupMovement.docdate === null ||
          self.SportGroupMovement.docdate === undefined ||
          self.SportGroupMovement.docdate === ""
        ) {
          this.makeToast(
            this.$t("docdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        //   if (
        //     self.SportGroupMovement.schoolyearid === 0 ||
        //     self.SportGroupMovement.schoolyearid === null ||
        //     self.SportGroupMovement.schoolyearid === undefined ||
        //     self.SportGroupMovement.schoolyearid === ""
        //   ) {
        //     this.makeToast(
        //       this.$t("schoolyearNotCorrect"),
        //       this.$t("Error"),
        //       "danger"
        //     );
        //     return false;
        //   }
        //   if (
        //     self.SportGroupMovement.organizationid === 0 ||
        //     self.SportGroupMovement.organizationid === null ||
        //     self.SportGroupMovement.organizationid === undefined ||
        //     self.SportGroupMovement.organizationid === ""
        //   ) {
        //     this.makeToast(
        //       this.$t("organizationNotCorrect"),
        //       this.$t("Error"),
        //       "danger"
        //     );
        //     return false;
        //   }
        // if (
        //   self.SportGroupMovement.detailinfo === null ||
        //   self.SportGroupMovement.detailinfo === undefined ||
        //   self.SportGroupMovement.detailinfo === ""
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
        SportGroupMovementService.Update(self.SportGroupMovement)
          .then((res) => {
            self.makeToast(
              self.$t("SuccessMessage"),
              self.$t("message"),
              "success"
            );
            self.$router.push({
              name: "SportGroupMovement",
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
  
  
  
  
  
  