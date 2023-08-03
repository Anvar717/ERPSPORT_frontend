<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SportEvent") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                type="number"
                :placeholder="$t('code1')"
                autocomplete="text"
                horizontal
                :label="$t('code1')"
                v-model="SportEvent.code"
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
                v-model="SportEvent.shortname"
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
                v-model="SportEvent.fullname"
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
                  $t("SportEventCategory")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="sporteventcategorylist"
                  v-model="SportEvent.sporteventcategoryid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow v-if="SportEvent.sporteventcategoryid == 2">
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("SportEventType")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="sporteventtypelist"
                  v-model="SportEvent.sporteventtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow v-if="SportEvent.sporteventcategoryid == 2">
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("CompetitionType")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="competitiontypelist"
                  v-model="SportEvent.competitiontypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
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
                  v-model="SportEvent.stateid"
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
                  @click="$router.push({ name: 'SportEvent' })"
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
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import HelperService from "@/services/helper.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventTypeService from "@/services/SportEventType.service";
import SportEventService from "@/services/SportEvent.service";
import SportEventCategoryService from "@/services/SportEventCategory.service";

export default {
  data() {
    return {
      SaveLoading: false,
      competitiontypelist: [],
      sporteventtypelist: [],
      SportEvent: {
        code: "",
        shortname: "",
        fullname: "",
        Translates: [],
      },
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" },
      ],
      items1: [],
      items2: [],
      sporteventcategorylist: [],
      items: [],
      LanguageList: [],
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
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    CompetitionTypeService.GetAll().then((res) => {
      this.competitiontypelist = res.data;
    });
    SportEventTypeService.GetAll().then((res) => {
      this.sporteventtypelist = res.data;
    });
    SportEventCategoryService.GetAll().then((res) => {
      this.sporteventcategorylist = res.data;
    });
    SportEventService.Get(this.$route.params.id).then((res) => {
      this.SportEvent = res.data;
      this.items1 =
        res.data.Translates.filter((item) => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter((item) => item.columnname == "fullname") ||
        [];
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.SportEvent.code === 0 ||
        self.SportEvent.code === null ||
        self.SportEvent.code === undefined ||
        self.SportEvent.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportEvent.shortname === 0 ||
        self.SportEvent.shortname === null ||
        self.SportEvent.shortname === undefined ||
        self.SportEvent.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportEvent.fullname === 0 ||
        self.SportEvent.fullname === null ||
        self.SportEvent.fullname === undefined ||
        self.SportEvent.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (self.SportEvent.sporteventcategoryid == 2) {
      //   if (
      //     self.SportEvent.competitiontypeid === 0 ||
      //     self.SportEvent.competitiontypeid === null ||
      //     self.SportEvent.competitiontypeid === undefined ||
      //     self.SportEvent.competitiontypeid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("competitiontypeidNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      //   if (
      //     self.SportEvent.sporteventtypeid === 0 ||
      //     self.SportEvent.sporteventtypeid === null ||
      //     self.SportEvent.sporteventtypeid === undefined ||
      //     self.SportEvent.sporteventtypeid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("sporteventtypeidNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      // }

      if (
        self.SportEvent.stateid === 0 ||
        self.SportEvent.stateid === null ||
        self.SportEvent.stateid === undefined ||
        self.SportEvent.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      SportEventService.Update(this.SportEvent)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "SportEvent" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
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
    AddItem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.SportEventTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.SportEventTranslatePush();
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
    SportEventTranslatePush() {
      this.SportEvent.Translates.push({
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
  
  <style></style>
  