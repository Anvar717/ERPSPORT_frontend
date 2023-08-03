<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SportTypeClassifier") }}</h4>
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
                v-model="SportTypeClassifier.code"
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
                v-model="SportTypeClassifier.shortname"
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
                v-model="SportTypeClassifier.fullname"
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
              <CInput
                type="number"
                :placeholder="$t('Registrynumber')"
                autocomplete="text"
                horizontal
                disabled
                :label="$t('Registrynumber')"
                v-model="SportTypeClassifier.registrynumber"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>

          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("SportBranch")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="sportbranchlist"
                  @input="changeSportBranch"
                  v-model="SportTypeClassifier.sportbranchid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="codename"
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
                  $t("SportSeason")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="sportseasonlist"
                  @input="changeSportSeason"
                  v-model="SportTypeClassifier.sportseasonid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="codename"
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
                  $t("SportGrowthRate")
                }}</label>
                <v-select
                  class="col-sm-9"
                  @input="changeSportGrowthRate"
                  :options="sportgrowthratelist"
                  v-model="SportTypeClassifier.sportgrowthrateid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="codename"
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
                  $t("SportTypeDependence")
                }}</label>
                <v-select
                  class="col-sm-9"
                  @input="changeSportTypeDependence"
                  :options="sporttypedependencelist"
                  v-model="SportTypeClassifier.sporttypedependenceid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="codename"
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
                  $t("SportTypeRestriction")
                }}</label>
                <v-select
                  class="col-sm-9"
                  @input="changeSportTypeRestriction"
                  :options="sporttyperestrictionlist"
                  v-model="SportTypeClassifier.sporttyperestrictionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="codename"
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
                  $t("SportTypeGender")
                }}</label>
                <v-select
                  class="col-sm-9"
                  @input="changeSportTypeGender"
                  :options="sporttypegenderlist"
                  v-model="SportTypeClassifier.sporttypegenderid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="codename"
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
                  $t("SportTypeDivision")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="sporttypedivisionlist"
                  v-model="SportTypeClassifier.sporttypedivisionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="codename"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>

          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('detail')"
                autocomplete="text"
                horizontal
                :label="$t('detail')"
                v-model="SportTypeClassifier.normativeact"
              ></CInput>
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
                  v-model="SportTypeClassifier.stateid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <b-modal id="AddModal" size="lg" no-close-on-backdrop>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="shortname">
                  <CInput
                    type="text"
                    :placeholder="$t('shortname')"
                    autocomplete="shortname"
                    horizontal
                    :label="$t('shortname')"
                    v-model="tabrow.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <!-- v-if="tabrow.TranslatableColumns.includes('shortname')" -->
                      <CButton
                        @click="translate('shortname')"
                        style="height: 35px"
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
                <ValidationProvider v-slot="v" name="fullname">
                  <CInput
                    type="text"
                    :placeholder="$t('fullname')"
                    autocomplete="fullname"
                    horizontal
                    :label="$t('fullname')"
                    v-model="tabrow.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                  <template #append>
                    <!-- v-if="tabrow.TranslatableColumns.includes('fullname')" -->
                      <CButton
                        @click="translate('fullname')"
                        style="height: 35px"
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
              <CCol sm="12">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("UnitOfMeasure")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="unitofmeasurelist"
                    v-model="tabrow.unitofmeasureid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CModal
              :title="$t('translate')"
              :show.sync="translatemodal"
              size="lg"
              :closeOnBackdrop="false"
            >
              <b-table
                :fields="translitefields"
                :items="translatelist"
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
                        :options="languagelist"
                        :reduce="(item) => item.id"
                        label="name"
                        v-model="translaterow.languageid"
                        style="z-index: 9999"
                      ></v-select>
                    </b-th>
                    <b-th style="width: 60%">
                      <CInput
                        class="mb-0"
                        v-model="translaterow.translatetext"
                      ></CInput>
                    </b-th>
                    <b-th style="width: 10%">
                      <CButton
                        @click="addtranslite"
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
                  @click="saveTranslate"
                  color="primary"
                  size="sm"
                  variant="outline"
                >
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Save") }}
                </CButton>
              </template>
            </CModal>
            <template v-slot:modal-footer>
              <div class="text-center mx-auto">
                <CButton size="sm" color="danger" class="mr-2" @click="Close">
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
                <CButton size="sm" color="primary" @click="AddRow">
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
                :items="SportTypeClassifier.sporttypeclassifierdiscipline"
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
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="$router.push({ name: 'SportTypeClassifier' })"
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
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportBranchService from "@/services/SportBranch.service";
import SportSeasonService from "@/services/SportSeason.service";
import SportActivityTypeService from "@/services/SportActivityType.service";
import SportGrowthRateService from "@/services/SportGrowthRate.service";
import SportTypeDependenceService from "@/services/SportTypeDependence.service";
import SportTypeRestrictionService from "@/services/SportTypeRestriction.service";
import SportTypeGenderService from "@/services/SportTypeGender.service";
import SportTypeDivisionService from "@/services/SportTypeDivision.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
export default {
  data() {
    return {
      SaveLoading: false,
      SportTypeClassifier: {
        code: "",
        shortname: "",
        fullname: "",
        Translates: [],
      },
      TranslateModal: false,
      translatemodal: false,
      fields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" },
      ],
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],
      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      Fields: [
        {
          key: "shortname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("shortname"),
        },
        {
          key: "fullname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("fullname"),
        },
        {
          key: "unitofmeasurename",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("UnitOfMeasure"),
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
        shortname: "",
        fullname: "",
        Status: 1,
        unitofmeasureid: 0,
        unitofmeasurename: "",
        // Translates:[],
      },
        sporttypeclassifierdiscipline: {
        Translates:[],
      },
      editedIndex: -1,
      isDisabled: false,
      items1: [],
      items2: [],
      items: [],
      LanguageList: [],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      statelist: [],
      sportbranchlist: [],
      unitofmeasurelist: [],
      sportseasonlist: [],
      sportactivitytypelist: [],
      sportgrowthratelist: [],
      sporttypedependencelist: [],
      sporttyperestrictionlist: [],
      sporttypegenderlist: [],
      sporttypedivisionlist: [],
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
    SportBranchService.GetAll().then((res) => {
      this.sportbranchlist = res.data;
    });
    SportSeasonService.GetAll().then((res) => {
      this.sportseasonlist = res.data;
    });
    SportActivityTypeService.GetAll().then((res) => {
      this.sportactivitytypelist = res.data;
    });
    SportGrowthRateService.GetAll().then((res) => {
      this.sportgrowthratelist = res.data;
    });
    SportTypeDependenceService.GetAll().then((res) => {
      this.sporttypedependencelist = res.data;
    });
    SportTypeRestrictionService.GetAll().then((res) => {
      this.sporttyperestrictionlist = res.data;
    });
    SportTypeGenderService.GetAll().then((res) => {
      this.sporttypegenderlist = res.data;
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    SportTypeDivisionService.GetAll()
      .then((res) => {
        this.sporttypedivisionlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
      HelperService.GetLanguageList().then((res) => {
      this.languagelist = res.data;
    });
    SportTypeClassifierService.Get(this.$route.params.id).then((res) => {
      this.SportTypeClassifier = res.data;
      this.items1 =
        res.data.Translates.filter((item) => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter((item) => item.columnname == "fullname") ||
        [];

      if (this.$route.params.id > 0) {
        this.SportTypeClassifier.sportbranchcode = this.sportbranchlist.filter(
          (item) => this.SportTypeClassifier.sportbranchid === item.id
        )[0].code;
        this.SportTypeClassifier.sportseasoncode = this.sportseasonlist.filter(
          (item) => this.SportTypeClassifier.sportseasonid === item.id
        )[0].code;
        this.SportTypeClassifier.sportgrowthratecode =
          this.sportgrowthratelist.filter(
            (item) => this.SportTypeClassifier.sportgrowthrateid === item.id
          )[0].code;
        this.SportTypeClassifier.sporttypedependencecode =
          this.sporttypedependencelist.filter(
            (item) => this.SportTypeClassifier.sporttypedependenceid === item.id
          )[0].code;
        this.SportTypeClassifier.sporttyperestrictioncode =
          this.sporttyperestrictionlist.filter(
            (item) =>
              this.SportTypeClassifier.sporttyperestrictionid === item.id
          )[0].code;
      }
    });
  },
  methods: {
    changeSportBranch() {
      this.SportTypeClassifier.sportbranchcode = this.sportbranchlist.filter(
        (item) => this.SportTypeClassifier.sportbranchid === item.id
      )[0].code;
      this.SportTypeClassifier.sportseasonid = 0;
      this.SportTypeClassifier.sportseasoncode = "";
      this.SportTypeClassifier.sportgrowthrateid = 0;
      (this.SportTypeClassifier.sportgrowthratecode = ""),
        (this.SportTypeClassifier.sporttypedependenceid = 0);
      this.SportTypeClassifier.sporttypedependencecode = "";
      this.SportTypeClassifier.sporttyperestrictionid = 0;
      this.SportTypeClassifier.sporttyperestrictioncode = "";
      this.SportTypeClassifier.sporttypegenderid = 0;
      this.SportTypeClassifier.sporttypegendercode = "";
      this.SportTypeClassifier.registrynumber = "";
    },
    changeSportSeason() {
      this.SportTypeClassifier.sportseasoncode = this.sportseasonlist.filter(
        (item) => this.SportTypeClassifier.sportseasonid === item.id
      )[0].code;
      this.SportTypeClassifier.sportgrowthrateid = 0;
      (this.SportTypeClassifier.sportgrowthratecode = ""),
        (this.SportTypeClassifier.sporttypedependenceid = 0);
      this.SportTypeClassifier.sporttypedependencecode = "";
      this.SportTypeClassifier.sporttyperestrictionid = 0;
      this.SportTypeClassifier.sporttyperestrictioncode = "";
      this.SportTypeClassifier.sporttypegenderid = 0;
      this.SportTypeClassifier.sporttypegendercode = "";
      this.SportTypeClassifier.registrynumber = "";
    },
    changeSportGrowthRate() {
      this.SportTypeClassifier.sportgrowthratecode =
        this.sportgrowthratelist.filter(
          (item) => this.SportTypeClassifier.sportgrowthrateid === item.id
        )[0].code;
      this.SportTypeClassifier.sporttypedependenceid = 0;
      this.SportTypeClassifier.sporttypedependencecode = "";
      this.SportTypeClassifier.sporttyperestrictionid = 0;
      this.SportTypeClassifier.sporttyperestrictioncode = "";
      this.SportTypeClassifier.sporttypegenderid = 0;
      this.SportTypeClassifier.sporttypegendercode = "";
      this.SportTypeClassifier.registrynumber = "";
    },
    changeSportTypeDependence() {
      this.SportTypeClassifier.sporttypedependencecode =
        this.sporttypedependencelist.filter(
          (item) => this.SportTypeClassifier.sporttypedependenceid === item.id
        )[0].code;
      this.SportTypeClassifier.sporttyperestrictionid = 0;
      this.SportTypeClassifier.sporttyperestrictioncode = "";
      this.SportTypeClassifier.sporttypegenderid = 0;
      this.SportTypeClassifier.sporttypegendercode = "";
      this.SportTypeClassifier.registrynumber = "";
    },
    changeSportTypeRestriction() {
      this.SportTypeClassifier.sporttyperestrictioncode =
        this.sporttyperestrictionlist.filter(
          (item) => this.SportTypeClassifier.sporttyperestrictionid === item.id
        )[0].code;
      this.SportTypeClassifier.registrynumber = "";
      this.SportTypeClassifier.sporttypegenderid = 0;
      this.SportTypeClassifier.sporttypegendercode = "";
    },
    changeSportTypeGender() {
      this.SportTypeClassifier.sporttypegendercode =
        this.sporttypegenderlist.filter(
          (item) => this.SportTypeClassifier.sporttypegenderid === item.id
        )[0].code;
      console.log(this.SportTypeClassifier);
      this.SportTypeClassifier.registrynumber =
        this.SportTypeClassifier.code.toString() +
        this.SportTypeClassifier.sportbranchcode.toString() +
        this.SportTypeClassifier.sportseasoncode.toString() +
        this.SportTypeClassifier.sportgrowthratecode.toString() +
        this.SportTypeClassifier.sporttypedependencecode.toString() +
        this.SportTypeClassifier.sporttyperestrictioncode.toString() +
        this.SportTypeClassifier.sporttypegendercode.toString();
      console.log(this.SportTypeClassifier.registrynumber);
    },

    check() {
      var self = this;
      if (
        self.SportTypeClassifier.code === 0 ||
        self.SportTypeClassifier.code === null ||
        self.SportTypeClassifier.code === undefined ||
        self.SportTypeClassifier.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportTypeClassifier.shortname === 0 ||
        self.SportTypeClassifier.shortname === null ||
        self.SportTypeClassifier.shortname === undefined ||
        self.SportTypeClassifier.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.fullname === 0 ||
        self.SportTypeClassifier.fullname === null ||
        self.SportTypeClassifier.fullname === undefined ||
        self.SportTypeClassifier.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.registrynumber === 0 ||
        self.SportTypeClassifier.registrynumber === null ||
        self.SportTypeClassifier.registrynumber === undefined ||
        self.SportTypeClassifier.registrynumber === ""
      ) {
        this.makeToast(
          this.$t("RegistrynumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.sportbranchid === 0 ||
        self.SportTypeClassifier.sportbranchid === null ||
        self.SportTypeClassifier.sportbranchid === undefined ||
        self.SportTypeClassifier.sportbranchid === ""
      ) {
        this.makeToast(
          this.$t("SportBranchNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.sportseasonid === 0 ||
        self.SportTypeClassifier.sportseasonid === null ||
        self.SportTypeClassifier.sportseasonid === undefined ||
        self.SportTypeClassifier.sportseasonid === ""
      ) {
        this.makeToast(
          this.$t("SportSeasonNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.sportgrowthrateid === 0 ||
        self.SportTypeClassifier.sportgrowthrateid === null ||
        self.SportTypeClassifier.sportgrowthrateid === undefined ||
        self.SportTypeClassifier.sportgrowthrateid === ""
      ) {
        this.makeToast(
          this.$t("SportGrowthRateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.sporttypedependenceid === 0 ||
        self.SportTypeClassifier.sporttypedependenceid === null ||
        self.SportTypeClassifier.sporttypedependenceid === undefined ||
        self.SportTypeClassifier.sporttypedependenceid === ""
      ) {
        this.makeToast(
          this.$t("SportTypeDependenceNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.sporttyperestrictionid === 0 ||
        self.SportTypeClassifier.sporttyperestrictionid === null ||
        self.SportTypeClassifier.sporttyperestrictionid === undefined ||
        self.SportTypeClassifier.sporttyperestrictionid === ""
      ) {
        this.makeToast(
          this.$t("SportTypeRestrictionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.sporttypegenderid === 0 ||
        self.SportTypeClassifier.sporttypegenderid === null ||
        self.SportTypeClassifier.sporttypegenderid === undefined ||
        self.SportTypeClassifier.sporttypegenderid === ""
      ) {
        this.makeToast(
          this.$t("SportTypeGenderNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.sporttypedivisionid === 0 ||
        self.SportTypeClassifier.sporttypedivisionid === null ||
        self.SportTypeClassifier.sporttypedivisionid === undefined ||
        self.SportTypeClassifier.sporttypedivisionid === ""
      ) {
        this.makeToast(
          this.$t("SportTypeDivisionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTypeClassifier.normativeact === 0 ||
        self.SportTypeClassifier.normativeact === null ||
        self.SportTypeClassifier.normativeact === undefined ||
        self.SportTypeClassifier.normativeact === ""
      ) {
        this.makeToast(
          this.$t("normativeactNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.SportTypeClassifier.stateid === 0 ||
        self.SportTypeClassifier.stateid === null ||
        self.SportTypeClassifier.stateid === undefined ||
        self.SportTypeClassifier.stateid === ""
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
      SportTypeClassifierService.Update(this.SportTypeClassifier)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "SportTypeClassifier" });
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
        this.SportTypeClassifierTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.SportTypeClassifierTranslatePush();
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
    SportTypeClassifierTranslatePush() {
      this.SportTypeClassifier.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
    },
    OpenModal() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      self.$bvModal.show("AddModal");
    },
    EditItem(item) {
      item.Status = 2;
      this.editedIndex =
        this.SportTypeClassifier.sporttypeclassifierdiscipline.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },

    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    AddRow() {
      var self = this;
      if (!!self.tabrow.unitofmeasureid) {
        self.tabrow.unitofmeasurename = self.unitofmeasurelist.filter(
          (item) => item.id === self.tabrow.unitofmeasureid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.SportTypeClassifier.sporttypeclassifierdiscipline[
            self.editedIndex
          ],
          self.tabrow
        );
        self.Close();
      } else {
        self.Add();
      }
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          shortname: "",
          fullname: "",
          Status: 1,
          unitofmeasureid: 0,
          unitofmeasurename: "",
          Translates:[],
        };
        this.editedIndex = -1;
      });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Add() {
      var self = this;
      self.tabrow;
      self.SportTypeClassifier.sporttypeclassifierdiscipline.push(self.tabrow);
      self.tabrow = {
        id: 0,
          ownerid: 0,
          shortname: "",
          fullname: "",
          Status: 1,
          unitofmeasureid: 0,
          unitofmeasurename: "",
          Translates:[],
      };
      self.isDisabled = true;
      self.$bvModal.hide("AddModal");
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.tabrow.Translates.filter(
        (item) => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        this.makeToast(
          this.$t("languageidNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        this.makeToast(
          this.$t("translatetextNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else {
        var dublikate = false;
        self.translatelist.forEach((item) => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function (
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: "",
          };
        }
      }
    },
    saveTranslate() {
      var self = this;
      self.tabrow.Translates = self.tabrow.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.tabrow.Translates.push(item);
      });
      self.translatemodal = false;
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
  