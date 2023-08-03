<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SportTypeGroup") }}</h4>
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
                  name="code"
                  rules="required|max:9"
                >
                  <CInput
                    type="number"
                    :placeholder="$t('code1')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="SportTypeGroup.code"
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
                  name="code"
                  rules="required|min:1"
                >
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="shortname"
                    horizontal
                    :label="$t('shortname')"
                    v-model="SportTypeGroup.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        @click="ShortNameLang"
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
              <CCol>
                <ValidationProvider v-slot="v" rules="required|min:1">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="fullname"
                    horizontal
                    :label="$t('fullname')"
                    v-model="SportTypeGroup.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        @click="FullNameLang"
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
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{
                      $t("sporttypedivisionname1")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="sporttypedivisionlist"
                      v-model="SportTypeGroup.sporttypedivisionid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{
                      $t("SportSeason")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="sportseasonlist"
                      v-model="SportTypeGroup.sportseasonid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{
                      $t("SportEventCategory")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="sporteventcategorylist"
                      v-model="SportTypeGroup.sporteventcategoryid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" md="4" lg="4">
                <ValidationProvider>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3">{{
                      $t("Status")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="statelist"
                      v-model="SportTypeGroup.stateid"
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
        <CRow>
          <CCol>
            <div class="text-right">
              <CButton class="sm-1" size="sm" color="info" @click="fillTable">
                <b-icon icon="list-ul"></b-icon>
                {{ $t("Fill") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-left">
              <CButton
                class="xl-1"
                size="sm"
                color="danger"
                @click="clearTable"
              >
                <b-icon icon="exclamation-octagon"></b-icon>
                {{ $t("Clear") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
        <CRow class="mt-2">
          <CCol>
            <b-table
              :fields="Fields"
              :items="SportTypeGroup.sporttypegrouptable"
              class="bg-color-table text-center mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template #cell(actions)="{ item }">
                <div class="text-center">
                  <!-- <b-link
                    @click="EditItem(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link> -->
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

      <CRow>
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
                  <CInput
                    class="mb-0"
                    v-model="Translate.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width: 10%">
                  <CButton
                    @click="AddItemModal"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
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
            <CButton
              @click="SaveTranslate"
              color="primary"
              size="sm"
              variant="outline"
            >
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </template>
        </CModal>
      </CRow>
    </CCol>
  </CRow>
</template>
    <script>
import SchoolYearService from "@/services/SchoolYear.service";
import HelperService from "@/services/helper.service";
import SportTypeGroupService from "@/services/SportTypeGroup.service";
import SportEventCategoryService from "@/services/SportEventCategory.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SportTypeDivisionService from "@/services/SportTypeDivision.service";
import SportSeasonService from "@/services/SportSeason.service";
import MemberComponent from "@/components/MemberList";
import PersonComponent from "@/components/PersonMember";
export default {
  components: { EmployeeListComponent, MemberComponent, PersonComponent },
  data() {
    return {
      SaveLoading: false,
      SportTypeGroup: {
        code: "",
        shortname: "",
        fullname: "",
        Translates: [],
      },
      fields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" },
      ],
      TranslateModal: false,
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",

      OrganizationLoading: false,
      RegionLoading: false,
      RegionList: [],
      QualCategoryTypeList: [],
      sporttypedivisionlist: [],
      sportseasonlist: [],
      personvalue1: {},
      OblastList: [],
      sporteventcategorylist:[],
      lang: "",
      TranslatebyName: "shortname",
      statelist: [],
      Fields: [
        {
          key: "sporttypeclassifiername",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("SportTypeClassifier"),
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
        courseduration: 0,
        academichours: 0,
        Status: 1,
      },
      editedIndex: -1,
      isDisabled: false,
      SportTypeGrouptable: [],
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    SportTypeGroupService.Get(self.selectedrowid).then((res) => {
      self.SportTypeGroup = res.data;
      SchoolYearService.GetAll().then((res) => {
        self.SchoolYear = res.data;
      });
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    HelperService.GetQualCategoryTypeList().then((res) => {
      this.QualCategoryTypeList = res.data;
    });
    SportTypeDivisionService.GetAll(this.lang).then((res) => {
      self.sporttypedivisionlist = res.data;
    });
    SportSeasonService.GetAll(this.lang).then((res) => {
      self.sportseasonlist = res.data;
    });
    SportEventCategoryService.GetAll().then((res) => {
      self.sporteventcategorylist = res.data;
    });
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
        SportTypeGroupService.Get(this.$route.params.id).then(res => {
      this.SportTypeGroup = res.data;
      this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
    });
  },
  methods: {
    async fillTable() {
      await SportTypeGroupService.FillSportTypeGroup(this.SportTypeGroup)
        .then((res) => {
          this.SportTypeGroup = res.data.result;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
        });
    },
    clearTable() {
      var self = this;
      if (self.$route.params.id == 0) {
        self.SportTypeGroup.sporttypegrouptable.forEach(function (item) {
          item.Status = 3;
        });
      } else {
        SportTypeGroupService.ClearSportTypeGroup(self.SportTypeGroup.id)
          .then((res) => {
            SportTypeGroupService.Get(self.SportTypeGroup.id).then((res) => {
              self.SportTypeGroup = res.data;
              SchoolYearService.GetAll().then((res) => {
                self.SchoolYear = res.data;
              });
            });
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error || error,
              this.$t("error"),
              "danger"
            );
          });
      }
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    Back() {
      this.$router.push({
        name: "SportTypeGroup",
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
    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.SportTypeGroup.SportTypeGrouptable.indexOf(item);
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
          this.SportTypeGroup.SportTypeGrouptable[this.editedIndex],
          this.tabrow
        );
        this.Close();
      } else {
        this.Add();
      }
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
    AddItemModal() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.SportEventCategoryTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.SportEventCategoryTranslatePush();
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
      });
    },
    SportEventCategoryTranslatePush() {
      this.SportTypeGroup.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
    },

    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          academichours: 0,
          courseduration: 0,
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },

    check() {
      var self = this;
      if (
        self.SportTypeGroup.code === 0 ||
        self.SportTypeGroup.code === null ||
        self.SportTypeGroup.code === undefined ||
        self.SportTypeGroup.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    checkData() {
      var self = this;
      if (
        self.SportTypeGroup.code === 0 ||
        self.SportTypeGroup.code === null ||
        self.SportTypeGroup.code === undefined ||
        self.SportTypeGroup.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportTypeGroup.shortname === 0 ||
        self.SportTypeGroup.shortname === null ||
        self.SportTypeGroup.shortname === undefined ||
        self.SportTypeGroup.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeGroup.fullname === 0 ||
        self.SportTypeGroup.fullname === null ||
        self.SportTypeGroup.fullname === undefined ||
        self.SportTypeGroup.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeGroup.stateid === 0 ||
        self.SportTypeGroup.stateid === null ||
        self.SportTypeGroup.stateid === undefined ||
        self.SportTypeGroup.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      SportTypeGroupService.Update(self.SportTypeGroup)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "SportTypeGroup",
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