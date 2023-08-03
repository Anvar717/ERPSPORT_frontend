<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SportLevel") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    type="number"
                    :placeholder="$t('code1')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code1')"
                    v-model="SportLevel.code"
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
                <ValidationProvider v-slot="v" name="ordernumber" rules="required|max:9">
                  <CInput
                    type="number"
                    :placeholder="$t('ordernumber')"
                    autocomplete="ordernumber"
                    horizontal
                    :label="$t('ordernumber')"
                    v-model="SportLevel.ordernumber"
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
                <ValidationProvider v-slot="v" name="code" rules="required|min:1">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="SportLevel.shortname"
                  >
                    <template #append>
                      <CButton
                        @click="ShortNameLang"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" md="4" lg="4">
                <ValidationProvider v-slot="v" name="code" rules="required|min:1">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="SportLevel.fullname"
                  >
                    <template #append>
                      <CButton
                        @click="FullNameLang"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="4" lg="4">
                <ValidationProvider v-slot="v" name="academichours" rules="required|min:1">
                  <CInput
                    type="number"
                    :placeholder="$t('academichours')"
                    autocomplete="academichours"
                    horizontal
                    :label="$t('academichours')"
                    v-model="SportLevel.academichours"
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
              <CCol sm="12" md="4" lg="4">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>
                    {{
                    $t("ismultiplesports")
                    }}
                  </label>
                  <b-form-checkbox v-model="SportLevel.ismultiplesports" switch class="mt-2 ml-1"></b-form-checkbox>
                </div>
              </CCol>

              <CCol sm="12" md="4" lg="4">
                <ValidationProvider>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">
                      {{
                      $t("Status")
                      }}
                    </label>
                    <v-select
                      class="col-sm-9"
                      :options="statelist"
                      v-model="SportLevel.stateid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{ $t("SportLevel") }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("SchoolType")
                  }}
                </label>
                <v-select
                  :options="schooltypelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="ChangeSchoolType"
                  class="col-sm-9"
                  v-model="tabrow.schooltypeid"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("SportLevelGroup")
                  }}
                </label>
                <v-select
                  :options="sportlevelgrouplist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="col-sm-9"
                  @input="ChangeSportLevelGroup"
                  v-model="tabrow.sportlevelgroupid"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("sporttitle")
                  }}
                </label>
                <v-select
                  :options="sporttitlelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="col-sm-9"
                  @input="ChangeSportTitle"
                  v-model="tabrow.sporttitleid"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <CCol>
              <ValidationProvider v-slot="v" name="minamount" rules="required|min:1">
                <CInput
                  :placeholder="$t('minamount')"
                  autocomplete="minamount"
                  horizontal
                  type="number"
                  :label="$t('minamount')"
                  v-model="tabrow.minamount"
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
          </b-row>
          <b-row>
            <CCol>
              <ValidationProvider v-slot="v" name="maxamount" rules="required|min:1">
                <CInput
                  :placeholder="$t('maxamount')"
                  autocomplete="maxamount"
                  horizontal
                  type="number"
                  :label="$t('maxamount')"
                  v-model="tabrow.maxamount"
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
              <b-icon icon="plus"></b-icon>
              {{ $t("Add") }}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="Fields"
              :items="SportLevel.sportleveltable"
              class="bg-color-table text-center mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
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
            <b-button class="mr-2" variant="danger" @click="ClosePersonModal">{{ $t("back") }}</b-button>
            <b-button variant="primary" @click="AddEmployeeData(personvalue)">{{ $t("Add") }}</b-button>
          </c-col>
        </c-row>
      </b-modal>

      <CModal
        :title="$t('translate')"
        :show.sync="TranslateModal"
        size="lg"
        :closeOnBackdrop="false"
      >
        <b-table
          :fields="fields"
          :items="items"
          class="bg-color-table text-center"
          style="vertical-align: middle"
          bordered
          responsive="sm"
        >
          <template v-slot:thead-top>
            <b-tr>
              <b-th style="width: 30%">
                <v-select
                  :placeholder="$t('ChooseBelow')"
                  class="mb-0"
                  :options="LanguageList"
                  :reduce="(item) => item.id"
                  label="name"
                  v-model="Translate.languageid"
                  style="z-index: 9999"
                ></v-select>
              </b-th>
              <b-th style="width: 60%">
                <CInput class="mb-0" v-model="Translate.translatetext"></CInput>
              </b-th>
              <b-th style="width: 10%">
                <CButton
                  @click="additem"
                  color="primary"
                  variant="outline"
                  class="text-center mx-auto d-block"
                >
                  <b-icon icon="plus"></b-icon>
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
    </CCol>
  </CRow>
</template>
  <script>
import SchoolYearService from "@/services/SchoolYear.service";
import HelperService from "@/services/helper.service";
import SportLevelService from "@/services/SportLevel.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SportLevelGroupService from "@/services/SportLevelGroup.service";
import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
import SportTitleService from "@/services/SportTitle.service";
import SchoolTypeService from "@/services/SchoolType.service";
import MemberShipTypeService from "@/services/MemberShipType.service";
import PersonMemberService from "@/services/PersonMember.service";
import MemberComponent from "@/components/MemberList";
import PersonComponent from "@/components/PersonMember";
export default {
  components: { EmployeeListComponent, MemberComponent, PersonComponent },
  data() {
    return {
      SaveLoading: false,
      SportLevel: {},
      OrganizationLoading: false,
      RegionLoading: false,
      RegionList: [],
      personvalue1: {},
      OblastList: [],
      sportlevelgrouplist: [],
      schooltypelist: [],
      sporttitlelist: [],
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
      SportLevel: {
        code: "",
        shortname: "",
        fullname: "",
        Translates: []
      },
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" }
      ],
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      Translate: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      statelist: [],
      Fields: [
        {
          key: "schooltypename",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("SchoolType")
        },
        {
          key: "sportlevelgroupname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("SportLevelGroup")
        },
        {
          key: "sporttitlename",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("sporttitlename")
        },
        {
          key: "minamount",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("minamount")
        },
        {
          key: "maxamount",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("maxamount")
        },
        {
          key: "actions",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("actions")
        }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        schooltypeid: 0,
        schooltypename: "",
        sportlevelgroupid: 0,
        sporttitlename: "",
        sportlevelgroupname: "",
        sporttitleid: 0,
        minamount: 0,
        maxamount: 0,
        Status: 1
      },
      editedIndex: -1,
      isDisabled: false
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    SportLevelService.Get(self.selectedrowid).then(res => {
      self.SportLevel = res.data;
       this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
      SchoolYearService.GetAll().then(res => {
        self.SchoolYear = res.data;
      });
    });
    SportLevelGroupService.GetAll(this.lang).then(res => {
      self.sportlevelgrouplist = res.data;
    });
    SportTitleService.GetAll(this.lang).then(res => {
      self.sporttitlelist = res.data;
    });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
     HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    SchoolTypeService.GetAll().then(res => {
      self.schooltypelist = res.data;
    });
  },
  methods: {
    ChangeSportLevelGroup() {
      this.tabrow.sportlevelgroupname = this.sportlevelgrouplist.filter(
        item => this.tabrow.sportlevelgroupid === item.id
      )[0].name;
    },
    ChangeSportTitle() {
      if (!!this.tabrow.sporttitleid) {
        this.tabrow.sporttitlename = this.sporttitlelist.filter(
          item => this.tabrow.sporttitleid === item.id
        )[0].name;
      } else {
        this.tabrow.sporttitlename = "";
      }
    },
    ChangeSchoolType() {
      if (!!this.tabrow.schooltypeid) {
        this.tabrow.schooltypename = this.schooltypelist.filter(
          item => this.tabrow.schooltypeid === item.id
        )[0].name;
      } else {
        this.tabrow.schooltypename = "";
      }
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
        name: "SportLevel",
        query: {
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit
        }
      });
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
    Add() {
      var self = this;
      self.tabrow;
      if (
        self.tabrow.schooltypeid === "" ||
        self.tabrow.schooltypeid === undefined ||
        self.tabrow.schooltypeid === null ||
        self.tabrow.schooltypeid === 0
      ) {
        self.makeToast(
          self.$t("schooltypeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sportlevelgroupid === "" ||
        self.tabrow.sportlevelgroupid === undefined ||
        self.tabrow.sportlevelgroupid === null ||
        self.tabrow.sportlevelgroupid === 0
      ) {
        self.makeToast(
          self.$t("sportlevelgroupidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.minamount === "" ||
        self.tabrow.minamount === undefined ||
        self.tabrow.minamount === null ||
        self.tabrow.minamount === 0
      ) {
        self.makeToast(
          self.$t("minamountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.maxamount === "" ||
        self.tabrow.maxamount === undefined ||
        self.tabrow.maxamount === null ||
        self.tabrow.maxamount === 0
      ) {
        self.makeToast(
          self.$t("maxamountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.SportLevel.sportleveltable.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        sportlevelgroupid: 0,
        sporttitlename: "",
        schooltypeid: 0,
        schooltypename: "",
        sportlevelgroupname: "",
        sporttitleid: 0,
        minamount: "",
        maxamount: 0,
        Status: 1
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
      this.editedIndex = this.SportLevel.sportleveltable.indexOf(item);
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
          this.SportLevel.sportleveltable[this.editedIndex],
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
          schooltypeid: 0,
          schooltypename: "",
          tosportgroupcategorytypeid: 0,
          tosportgroupcategorytypename: "",
          Status: 1
        };
        this.editedIndex = -1;
      });
    },

    check() {
      var self = this;
      if (
        self.SportLevel.code === 0 ||
        self.SportLevel.code === null ||
        self.SportLevel.code === undefined ||
        self.SportLevel.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }

      if (self.SportLevel.sportleveltable.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    checkData() {
      var self = this;
      if (
        self.SportLevel.code === 0 ||
        self.SportLevel.code === null ||
        self.SportLevel.code === undefined ||
        self.SportLevel.code === ""
      ) {
        this.makeToast(this.$t("CodeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportLevel.ordernumber === 0 ||
        self.SportLevel.ordernumber === null ||
        self.SportLevel.ordernumber === undefined ||
        self.SportLevel.ordernumber === ""
      ) {
        this.makeToast(
          this.$t("ordernumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportLevel.shortname === 0 ||
        self.SportLevel.shortname === null ||
        self.SportLevel.shortname === undefined ||
        self.SportLevel.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportLevel.fullname === 0 ||
        self.SportLevel.fullname === null ||
        self.SportLevel.fullname === undefined ||
        self.SportLevel.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportLevel.stateid === 0 ||
        self.SportLevel.stateid === null ||
        self.SportLevel.stateid === undefined ||
        self.SportLevel.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportLevel.academichours === 0 ||
        self.SportLevel.academichours === null ||
        self.SportLevel.academichours === undefined ||
        self.SportLevel.academichours === ""
      ) {
        this.makeToast(
          this.$t("academichoursNotCorrect"),
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
      SportLevelService.Update(self.SportLevel)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "SportLevel",
            query: {
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit
            }
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
    ShortNameLang() {
      this.items = this.items1;
      this.TranslateModal = true;
      this.TranslatebyName = "shortname";
      this.Translate = {};
    },
    FullNameLang() {
      this.items = this.items2;
      this.TranslateModal = true;
      this.TranslatebyName = "fullname";
      this.Translate = {};
    },
     additem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.SportLevelPush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.SportLevelPush();
        this.items2 = this.items;
      }
      this.Translate = {};
    },
    SaveTranslate() {
      this.TranslateModal = false;
    },
    ItemsPush() {
      this.items.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
        tableid: this.SportLevel.TableID,
        tablerowid: this.SportLevel.id
      });
    },
     SportLevelPush() {
      this.SportLevel.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
        tableid: this.SportLevel.TableID,
        tablerowid: this.SportLevel.id
      });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
  }
};
</script>
  
  <style>
</style>
  
  
  
  
  
  