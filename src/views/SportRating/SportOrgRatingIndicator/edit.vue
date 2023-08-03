<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SportOrgRatingIndicator") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('ordernumber')"
                autocomplete="text"
                horizontal
                :label="$t('ordernumber')"
                v-model="SportOrgRatingIndicator.ordernumber"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('buyervatcode')"
                autocomplete="text"
                horizontal
                :label="$t('buyervatcode')"
                v-model="SportOrgRatingIndicator.code"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('shortname')"
                autocomplete="text"
                horizontal
                :label="$t('shortname')"
                v-model="SportOrgRatingIndicator.shortname"
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
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('fullname')"
                autocomplete="text"
                horizontal
                :label="$t('fullname')"
                v-model="SportOrgRatingIndicator.fullname"
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
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
         
          
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("indicator")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="sportorgratingcalcindicatorlist"
                  v-model="
                    SportOrgRatingIndicator.sportorgratingcalcindicatorid
                  "
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="ol-form-label col-sm-3" for>{{
                  $t("isgroup")
                }}</label>
                <b-form-checkbox
                  v-model="SportOrgRatingIndicator.isgroup"
                  switch
                  class="col-sm-9"
                ></b-form-checkbox>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("organizationtype")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="organizationtypelist"
                  v-model="SportOrgRatingIndicator.organizationtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="ChangeParent"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow v-if="SportOrgRatingIndicator.organizationtypeid==6">
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("schooltype")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="schooltypelist"
                  v-model="SportOrgRatingIndicator.schooltypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                
                ></v-select>
              </div>
            </CCol>
          </CRow>
         
          <CRow v-if="!SportOrgRatingIndicator.isgroup">
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("parent")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="parentlist"
                  v-model="SportOrgRatingIndicator.parentid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("Status")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="statelist"
                  v-model="SportOrgRatingIndicator.stateid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="Back()"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
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
        </CCardBody>
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
                    @click="AddItem"
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
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import HelperService from "@/services/helper.service";
import IHGroupService from "@/services/IHGroup.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SportOrgRatingIndicatorService from "@/services/SportOrgRatingIndicator.service";
import SchoolTypeService from "@/services/SchoolType.service";
export default {
  data() {
    return {
      SaveLoading: false,
      SportOrgRatingIndicator: {
        shortname: "",
        fullname: "",
        tableid: 0,
        Translates: [],
      },
      TranslateModal: false,
      parentlist: [],
      sportorgratingcalcindicatorlist: [],
      organizationtypelist: [],
      fields: [
        {
          key: "languagename",
          label: this.$t("translateModal.status"),
        },
        {
          key: "translatetext",
          label: this.$t("translateModal.name"),
        },
        {
          key: "actions",
          label: "",
        },
      ],
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      schooltypelist:[],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      statelist: [],
    };
  },
  created() {
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    HelperService.GetAllSportOrgRatingCalcIndicator().then((res) => {
      this.sportorgratingcalcindicatorlist = res.data;
    });
      SchoolTypeService.GetAll().then(res => {
      this.schooltypelist = res.data;
    })

    OrganizationTypeService.GetAll(this.lang).then((res) => {
      this.organizationtypelist = res.data;
    });
    SportOrgRatingIndicatorService.Get(this.$route.params.id).then((res) => {
      this.SportOrgRatingIndicator = res.data;
        if (res.data.id > 0) {
          this.ChangeParent()
      }
      this.items1 =
        res.data.Translates.filter((item) => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter((item) => item.columnname == "fullname") ||
        [];
    });
  },
  methods: {
    SaveData() {
      if (!this.check()) {
        return false;
      }
      SportOrgRatingIndicatorService.Update(this.SportOrgRatingIndicator)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "SportOrgRatingIndicator",
          });
        })
        .catch((error) => {
          error;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    check() {
      var self = this;
      if (
        self.SportOrgRatingIndicator.ordernumber === 0 ||
        self.SportOrgRatingIndicator.ordernumber === null ||
        self.SportOrgRatingIndicator.ordernumber === undefined ||
        self.SportOrgRatingIndicator.ordernumber === ""
      ) {
        this.makeToast(
          this.$t("ordernumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRatingIndicator.code === 0 ||
        self.SportOrgRatingIndicator.code === null ||
        self.SportOrgRatingIndicator.code === undefined ||
        self.SportOrgRatingIndicator.code === ""
      ) {
        this.makeToast(this.$t("code1NotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportOrgRatingIndicator.shortname === 0 ||
        self.SportOrgRatingIndicator.shortname === null ||
        self.SportOrgRatingIndicator.shortname === undefined ||
        self.SportOrgRatingIndicator.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRatingIndicator.fullname === 0 ||
        self.SportOrgRatingIndicator.fullname === null ||
        self.SportOrgRatingIndicator.fullname === undefined ||
        self.SportOrgRatingIndicator.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRatingIndicator.organizationtypeid === 0 ||
        self.SportOrgRatingIndicator.organizationtypeid === null ||
        self.SportOrgRatingIndicator.organizationtypeid === undefined ||
        self.SportOrgRatingIndicator.organizationtypeid === ""
      ) {
        this.makeToast(
          this.$t("OrganizationTypeNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRatingIndicator.stateid === 0 ||
        self.SportOrgRatingIndicator.stateid === null ||
        self.SportOrgRatingIndicator.stateid === undefined ||
        self.SportOrgRatingIndicator.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    ChangeParent() {
        if (this.SportOrgRatingIndicator.organizationtypeid != 6) {
          this.SportOrgRatingIndicator.schooltypeid = 0
      }
    
      // if (this.Data.isgroup==false) {
        SportOrgRatingIndicatorService.GetAll(
          this.SportOrgRatingIndicator.organizationtypeid,
          this.SportOrgRatingIndicator.schooltypeid,
          true
        ).then((res) => {
          this.parentlist = res.data;
        });
      // }
    },
       Back() {
      this.$router.push({
        name: "SportOrgRatingIndicator",
        query: {
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
        },
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
    AddItem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.SportOrgRatingIndicatorTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.SportOrgRatingIndicatorTranslatePush();
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
    SportOrgRatingIndicatorTranslatePush() {
      this.SportOrgRatingIndicator.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
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
  },
};
</script>
  
  <style>
</style>