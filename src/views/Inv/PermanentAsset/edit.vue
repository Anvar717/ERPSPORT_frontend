<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("PermanentAsset") }}</h4>
            </CCol>
          </CRow>
          <CRow>
            <CCol class="text-right mr-3">
              <b-button @click="GoReport" class="mr-1" variant="outline-info">
                {{ $t("gotoPermamentAssetCard") }}
                <b-icon icon="arrow-bar-right"></b-icon></b-button
            ></CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="4">
                <div class="form-group">
                  <label for
                    >{{ $t("asboid")
                    }}<code color="red" style="font-size: 16px">*</code></label
                  >
                  <ValidationProvider v-slot="v" name="asboid">
                    <CInput
                      :placeholder="$t('asboid')"
                      autocomplete="asboid"
                      v-model="PermanentAsset.asboid"
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
                </div>
              </CCol>

              <CCol sm="4">
                <ValidationProvider v-slot="v" name="inventorynumber">
                  <CInput
                    :placeholder="$t('inventorynumber')"
                    autocomplete="inventorynumber"
                    vertical
                    :label="$t('inventorynumber')"
                    v-model="PermanentAsset.inventorynumber"
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
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="subinventorynumber"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('subinventorynumber')"
                    autocomplete="subinventorynumber"
                    vertical
                    :label="$t('subinventorynumber')"
                    v-model="PermanentAsset.subinventorynumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">
                        {{ v.errors[0] }}
                      </div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>

              <CCol sm="6">
                <div class="form-group">
                  <label for>{{ $t("ismanufacturerunknown") }}</label>
                  <b-form-checkbox
                    v-model="PermanentAsset.ismanufacturerunknown"
                    switch
                    class="mt-2 ml-1"
                  ></b-form-checkbox>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="6">
                <CCard accent-color="primary">
                  <CCardBody>
                    <CRow>
                      <CCol sm="12">
                        <div class="form-group">
                          <label for
                            >{{ $t("shortname")
                            }}<code color="red" style="font-size: 16px"
                              >*</code
                            ></label
                          >
                          <ValidationProvider
                            v-slot="v"
                            name="code"
                            rules="required"
                          >
                            <CInput
                              :placeholder="$t('shortname')"
                              autocomplete="text"
                              v-model="PermanentAsset.shortname"
                              :addInputClasses="{
                                'is-invalid': v.classes.invalid,
                                'is-valid': v.classes.valid,
                              }"
                            >
                              <!-- <template #append>
                                <CButton
                                  v-if="
                                    PermanentAsset.TranslatableColumns.includes(
                                      'shortname'
                                    )
                                  "
                                  @click="translate('shortname')"
                                  style="height: 35px"
                                  variant="outline"
                                  type="button"
                                  color="primary"
                                >
                                  <b-icon icon="globe2"></b-icon>
                                </CButton>
                              </template> -->
                              <template slot="invalid-feedback">
                                <div class="invalid-feedback">
                                  {{ v.errors[0] }}
                                </div>
                              </template>
                            </CInput>
                          </ValidationProvider>
                        </div>
                      </CCol>
                      <CCol sm="12">
                        <div class="form-group">
                          <label for
                            >{{ $t("fullname")
                            }}<code color="red" style="font-size: 16px"
                              >*</code
                            ></label
                          >
                          <ValidationProvider
                            v-slot="v"
                            name="fullname"
                            rules="required"
                          >
                            <CInput
                              :placeholder="$t('fullname')"
                              autocomplete="text"
                              v-model="PermanentAsset.fullname"
                              :addInputClasses="{
                                'is-invalid': v.classes.invalid,
                                'is-valid': v.classes.valid,
                              }"
                            >
                              <!-- <template #append>
                                <CButton
                                  v-if="
                                    PermanentAsset.TranslatableColumns.includes(
                                      'fullname'
                                    )
                                  "
                                  @click="translate('fullname')"
                                  style="height: 35px"
                                  variant="outline"
                                  type="button"
                                  color="primary"
                                >
                                  <b-icon icon="globe2"></b-icon>
                                </CButton>
                              </template> -->
                              <template slot="invalid-feedback">
                                <div class="invalid-feedback">
                                  {{ v.errors[0] }}
                                </div>
                              </template>
                            </CInput>
                          </ValidationProvider>
                        </div>
                      </CCol>
                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="brand"
                          rules="required"
                        >
                          <div>
                            <label for
                              >{{ $t("brand") }}
                              <code color="red" style="font-size: 16px">*</code>
                            </label>

                            <div>
                              <v-select
                                :options="brandlist"
                                v-model="PermanentAsset.brandid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                :class="{ danger: v.errors[0] }"
                                label="name"
                              />
                              <div v-if="!!v.errors[0]" class="err-msg">
                                {{ v.errors[0] }}
                              </div>
                            </div>
                          </div>
                        </ValidationProvider>
                      </CCol>
                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="unitofmeasure"
                          rules="required"
                        >
                          <div>
                            <label class="col-form-label" for>{{
                              $t("unitofmeasure")
                            }}</label>
                            <v-select
                              :options="unitofmeasurelist"
                              v-model="PermanentAsset.unitofmeasureid"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                            >
                              <template slot="invalid-feedback">
                                <div class="invalid-feedback">
                                  {{ v.errors[0] }}
                                </div>
                              </template>
                            </v-select>
                          </div>
                        </ValidationProvider>
                      </CCol>
                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="seriesnumber"
                          rules="required"
                        >
                          <CInput
                            :placeholder="$t('seriesnumber')"
                            autocomplete="seriesnumber"
                            vertical
                            :label="$t('seriesnumber')"
                            v-model="PermanentAsset.seriesnumber"
                            :addInputClasses="{
                              'is-invalid': v.classes.invalid,
                              'is-valid': v.classes.valid,
                            }"
                          >
                            <template slot="invalid-feedback">
                              <div class="invalid-feedback">
                                {{ v.errors[0] }}
                              </div>
                            </template>
                          </CInput>
                        </ValidationProvider>
                      </CCol>

                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="productclassification"
                          rules="required"
                        >
                          <div class="form-group">
                            <label for>{{ $t("productclassification") }}</label>
                            <v-select
                              :options="ProductclassificationList"
                              v-model="PermanentAsset.productclassificationid"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                            >
                              <template slot="invalid-feedback">
                                <div class="invalid-feedback">
                                  {{ v.errors[0] }}
                                </div>
                              </template>
                            </v-select>
                          </div>
                        </ValidationProvider>
                      </CCol>

                      <CCol sm="12">
                        <div class="form-group">
                          <label for>
                            {{ $t("deliverydate") }}
                            <code color="red" style="font-size: 16px"
                              >*</code
                            ></label
                          >
                          <custom-date-picker
                            v-model="PermanentAsset.deliverydate"
                            @keyup="BindValue"
                            format="DD.MM.YYYY"
                            type="date"
                            :clearable="false"
                            :placeholder="$t('deliverydate')"
                          >
                          </custom-date-picker>
                        </div>
                      </CCol>

                      <CCol sm="12">
                        <div class="form-group">
                          <label for
                            >{{ $t("implementationdate") }}
                            <code color="red" style="font-size: 16px"
                              >*</code
                            ></label
                          >
                          <custom-date-picker
                            v-model="PermanentAsset.implementationdate"
                            @keyup="BindValue2"
                            format="DD.MM.YYYY"
                            type="date"
                            :clearable="false"
                            :placeholder="$t('implementationdate')"
                          >
                          </custom-date-picker>
                        </div>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm="6">
                <CCard accent-color="primary">
                  <CCardBody>
                    <CRow>
                      <CCol
                        sm="12"
                        v-if="!PermanentAsset.ismanufacturerunknown"
                      >
                        <div class="form-group">
                          <label for>{{ $t("manufacturer") }}</label>
                          <v-select
                            :options="manufacturerlist"
                            @input="Changemanufacture"
                            v-model="PermanentAsset.manufaturerid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                          ></v-select>
                        </div>
                      </CCol>
                      <CCol
                        sm="12"
                        v-if="!PermanentAsset.ismanufacturerunknown"
                      >
                        <div class="form-group">
                          <label for>{{ $t("manufacturercountry") }}</label>
                          <v-select
                            :options="ManufactureCountryList"
                            v-model="PermanentAsset.manufacturercountryid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                          ></v-select>
                        </div>
                      </CCol>
                      <!-- 
                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="Organization"
                          rules="required"
                        >
                          <div class="form-group">
                            <label for>{{ $t("Organization") }}</label>
                            <v-select
                              :options="organizationlist"
                              v-model="PermanentAsset.organizationid"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                            >
                              <template slot="invalid-feedback">
                                <div class="invalid-feedback">
                                  {{ v.errors[0] }}
                                </div>
                              </template>
                            </v-select>
                          </div>
                        </ValidationProvider>
                      </CCol> -->

                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="pagroup"
                          rules="required"
                        >
                          <div class="form-group">
                            <label for>{{ $t("pagroup") }}</label>
                            <v-select
                              :options="pagrouplist"
                              v-model="PermanentAsset.pagroupid"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                            >
                              <template slot="invalid-feedback">
                                <div class="invalid-feedback">
                                  {{ v.errors[0] }}
                                </div>
                              </template>
                            </v-select>
                          </div>
                        </ValidationProvider>
                      </CCol>

                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="pasubrroup"
                          rules="required"
                        >
                          <div class="form-group">
                            <label for>{{ $t("pasubrroup") }}</label>
                            <v-select
                              :options="pasubgrouplist"
                              v-model="PermanentAsset.pasubrroupid"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                            >
                              <template slot="invalid-feedback">
                                <div class="invalid-feedback">
                                  {{ v.errors[0] }}
                                </div>
                              </template>
                            </v-select>
                          </div>
                        </ValidationProvider>
                      </CCol>

                      <!-- <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="subinventorynumber"
                          rules="required"
                        >
                          <CInput
                            :placeholder="$t('subinventorynumber')"
                            autocomplete="subinventorynumber"
                            vertical
                            :label="$t('subinventorynumber')"
                            v-model="PermanentAsset.subinventorynumber"
                            :addInputClasses="{
                              'is-invalid': v.classes.invalid,
                              'is-valid': v.classes.valid,
                            }"
                          >
                            <template slot="invalid-feedback">
                              <div class="invalid-feedback">
                                {{ v.errors[0] }}
                              </div>
                            </template>
                          </CInput>
                        </ValidationProvider>
                      </CCol> -->

                      <CCol sm="12">
                        <div class="form-group">
                          <label for>{{ $t("retirementdate") }}</label>
                          <custom-date-picker
                            v-model="PermanentAsset.retirementdate"
                            @keyup="BindValue"
                            format="DD.MM.YYYY"
                            type="date"
                            :clearable="false"
                            :placeholder="$t('retirementdate')"
                          >
                          </custom-date-picker>
                        </div>
                      </CCol>

                      <CCol sm="12">
                        <ValidationProvider
                          v-slot="v"
                          name="state"
                          rules="required"
                        >
                          <div class="form-group">
                            <label for
                              >{{ $t("state") }}
                              <code color="red" style="font-size: 16px">*</code>
                            </label>

                            <div>
                              <v-select
                                :options="statelist"
                                v-model="PermanentAsset.stateid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                :class="{ danger: v.errors[0] }"
                                label="name"
                              />
                              <div v-if="!!v.errors[0]" class="err-msg">
                                {{ v.errors[0] }}
                              </div>
                            </div>
                          </div>
                        </ValidationProvider>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
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
                  >
                  </v-select>
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
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'PermanentAsset' })"
              >
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
import HelperService from "@/services/helper.service";
import BrandService from "@/services/Brand.service";
import CountryService from "@/services/Country.service";
import ManufacturerService from "@/services/Manufacturer.service";
import PermanentAssetService from "@/services/PermanentAsset.service";
import OrganizationService from "@/services/organization.service";
import PaGroupService from "@/services/PaGroup.service";
import PaSubGroupService from "@/services/PaSubGroup.service";
import ProductClassificationService from "@/services/ProductClassification.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: { CustomDatePicker },
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      PermanentAsset: { TranslatableColumns: [] },
      selectedrowid: 0,
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
      statelist: [],
      brandlist: [],
      countrylist: [],
      manufacturerlist: [],
      organizationlist: [],
      pagrouplist: [],
      pasubgrouplist: [],
      ProductclassificationList: [],
      unitofmeasurelist: [],
      ManufactureCountryList: [],
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    BrandService.GetAll().then((res) => {
      self.brandlist = res.data;
    });
    CountryService.GetAll().then((res) => {
      self.countrylist = res.data;
    });
    ManufacturerService.GetAll().then((res) => {
      self.manufacturerlist = res.data;
    });
    OrganizationService.GetAll().then((res) => {
      self.organizationlist = res.data;
    });
    PaGroupService.GetAll().then((res) => {
      self.pagrouplist = res.data;
    });
    PaSubGroupService.GetAll().then((res) => {
      self.pasubgrouplist = res.data;
    });
    ProductClassificationService.GetAll().then((res) => {
      self.ProductclassificationList = res.data;
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    PermanentAssetService.Get(this.$route.params.id).then((res) => {
      self.PermanentAsset = res.data;
    });
  },
  methods: {
    GoReport() {
      this.$router.push({
        name: "GetPermanentAssetCard",
        query: {
          inventorynumber: this.PermanentAsset.inventorynumber,
        },
      });
    },
    Changemanufacture() {
      this.PermanentAsset.manufacturercountryid = 0;
      this.getManufactureCountryList();
    },
    getManufactureCountryList() {
      if (!!this.PermanentAsset.manufaturerid) {
        ManufacturerService.GetAllManufacturerCountry(
          this.PermanentAsset.manufaturerid
        ).then((res) => {
          this.ManufactureCountryList = res.data;
        });
      }
    },
    BindValue(value) {
      this.PermanentAsset.deliverydate = value;
    },
    BindValue2(value) {
      this.PermanentAsset.implementationdate = value;
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.PermanentAsset.Translates.filter(
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
          self.translaterow.languagename = self.languagelist.filter(function(
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
    SaveTranslate() {
      var self = this;
      self.PermanentAsset.Translates = self.PermanentAsset.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.PermanentAsset.Translates.push(item);
      });
      self.translatemodal = false;
    },
    check() {
      var self = this;

      var checkCode = (code) => {
        return (
          code === 0 ||
          code === null ||
          code === undefined ||
          code === "" ||
          !Number.isInteger(Number(code)) ||
          Number(code) < 0
        );
      };

      var checkStringSpace = (string) => {
        return (
          string === 0 ||
          string === null ||
          string === undefined ||
          string === "" ||
          String(string).trim().length === 0
        );
      };

      // if (checkCode(self.PermanentAsset.code)) {
      //   this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
      //   return false;
      // }
      if (checkCode(self.PermanentAsset.asboid)) {
        this.makeToast(this.$t("asboidNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (checkCode(self.PermanentAsset.inventorynumber)) {
        this.makeToast(
          this.$t("inventorynumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (checkStringSpace(self.PermanentAsset.shortname)) {
        this.makeToast(
          this.$t("ShortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (checkStringSpace(self.PermanentAsset.fullname)) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (checkCode(self.PermanentAsset.subinventorynumber)) {
        this.makeToast(
          this.$t("subinventorynumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PermanentAsset.brandid === 0 ||
        self.PermanentAsset.brandid === null ||
        self.PermanentAsset.brandid === undefined ||
        self.PermanentAsset.brandid === ""
      ) {
        this.makeToast(this.$t("brandNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.PermanentAsset.stateid === 0 ||
        self.PermanentAsset.stateid === null ||
        self.PermanentAsset.stateid === undefined ||
        self.PermanentAsset.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }

      return true;
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      PermanentAssetService.Update(self.PermanentAsset)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "PermanentAsset" });
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
.danger .vs__dropdown-toggle {
  border: 1px solid #e55353 !important;
}
.err-msg {
  color: #e55353;
}
</style>
