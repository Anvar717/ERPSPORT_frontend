<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('RegionState')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="5">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('ondate')}}</label>
                <date-picker
                  class="col-sm-9"
                  v-model="RegionState.ondate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                ></date-picker>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="5">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('oblast')}}</label>
                <v-select
                  @input="ChangeOblast"
                  class="col-sm-9"
                  :options="oblastlist"
                  v-model="RegionState.oblastid"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="5">
              <div class="form-group form-row">
                <label v-if="!RegionLoading" class="col-form-label col-sm-3" for>{{$t('region')}}</label>
                <v-select
                  class="col-sm-9"
                  :options="regionlist"
                  v-model="RegionState.regionid"
                  :reduce="item => item.id"
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
                <label class="col-form-label col-sm-3" for>{{$t('regiongroup')}}</label>
                <v-select
                  class="col-sm-4 w-100"
                  :options="regiongrouplist"
                  v-model="RegionState.regiongroupid"
                  :reduce="item => item.id"
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
                <label class="col-form-label col-sm-3" for>{{$t('regiontype')}}</label>
                <v-select
                  class="col-sm-4 w-100"
                  :options="regiontypelist"
                  v-model="RegionState.regiontypeid"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-lg-4"
                  size="sm"
                  color="danger"
                  @click="$router.push({name : 'RegionState'})"
                >
                  <b-icon icon="arrow-left-short" ></b-icon>
                  {{$t('back')}}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <CButton size="sm" color="success" class="mr-lg-4" @click="SaveData">
                  <b-spinner v-if="SaveLoading" small></b-spinner>
                  <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                  {{$t('Save')}}
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
            style="vertical-align:middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width:30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="LanguageList"
                    :reduce="item => item.id"
                    label="name"
                    v-model="Translate.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput class="mb-0" v-model="Translate.translatetext"></CInput>
                </b-th>
                <b-th style="width:10%">
                  <CButton
                    @click="AddItem"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{item}">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
              <b-icon icon="check2"></b-icon>
              {{$t('Save')}}
            </CButton>
          </template>
        </CModal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import RegionGroupService from "@/services/RegionGroup.service";
import RegionTypeService from "@/services/RegionType.service";
import HelperService from "@/services/helper.service";
import RegionStateService from "@/services/RegionState.service";
export default {
  data() {
    return {
      SaveLoading: false,
      RegionState: {
        ondate: "",
        normativedoc: "",
        RegionLoading: false,

        Translates: []
      },
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("translateModal.status") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" }
      ],
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      Translate: {
        languageid: "",
        translatetext: ""
      },
      TranslatebyName: "shortname",
      oblastlist: [],
      regionlist: [],
      regiongrouplist: [],
      regiontypelist: []
      /*          statuslist : [], */
    };
  },
  created() {
    HelperService.GetLanguageList().then(res => {
      this.LanguageList = res.data;
    });
    RegionStateService.Get(this.$route.params.id).then(res => {
      this.RegionState = res.data;
      this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];

      this.GetOblastList();

      this.GetRegionList(this.RegionState.oblastid);
      RegionGroupService.GetAll().then(res => {
        this.regiongrouplist = res.data;
      });
    });
    RegionTypeService.GetAll().then(res => {
      this.regiontypelist = res.data;
    });

    /*  HelperService.GetStateList().then(res => {
            this.statuslist = res.data
        }) */
  },
  methods: {
    check() {
      var self = this;

      if (
        self.RegionState.oblastid === null ||
        self.RegionState.oblastid === undefined ||
        self.RegionState.oblastid === 0
      ) {
        this.makeToast(
          this.$t("OblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.RegionState.regionid === null ||
        self.RegionState.regionid === undefined ||
        self.RegionState.regionid === 0
      ) {
        this.makeToast(
          this.$t("RegionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.RegionState.regiontypeid === null ||
        self.RegionState.regiontypeid === undefined ||
        self.RegionState.regiontypeid === 0
      ) {
        this.makeToast(
          this.$t("regiontypeidNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.RegionState.regiongroupid === null ||
        self.RegionState.regiongroupid === undefined ||
        self.RegionState.regiongroupid === 0
      ) {
        this.makeToast(
          this.$t("regiongroupidNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.RegionState.ondate === null ||
        self.RegionState.ondate === undefined
      ) {
        this.makeToast(this.$t("OndateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },

    SaveData() {
      if (!this.check()) {
        return false;
      }
      RegionStateService.Update(this.RegionState)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "RegionState" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    GetOblastList() {
      HelperService.GetOblastList(this.lang).then(res => {
        this.oblastlist = res.data;
      });
    },
    GetRegionList(oblastid) {
      this.RegionLoading = true;
      if (!!oblastid) {
        RegionService.GetRegionList().then(res => {
          this.regionlist = res.data;
          this.RegionLoading = false;
        });
      } else {
        this.regionlist = [];
        this.RegionLoading = false;
      }
    },
    ChangeOblast() {
      if (this.RegionState.regionid > 0) {
        this.RegionState.regionid = "";
        //this.regionlist= [];
        //this.RegionLoading  = false;
      }
      this.GetRegionList(this.RegionState.oblastid);
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
        this.SchoolSubjectTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.SchoolSubjectTranslatePush();
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
          item => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName
      });
    },
    RegionStateTranslatePush() {
      this.RegionState.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          item => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName
      });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    }
  }
};
</script>

<style>
</style>