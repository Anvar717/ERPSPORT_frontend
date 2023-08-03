<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("BasicTariffRate") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'BasicTariffRate' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors"
            >{{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required"
                >
                  <CInput
                    :label="$t('docnumber')"
                    autocomplete="text"
                    v-model="BasicTariffRate.docnumber"
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
              <CCol sm="2">
                <label>{{ $t("docdate") }}</label>
                <custom-date-picker
                  v-model="BasicTariffRate.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></custom-date-picker>
                <!-- <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("docdate")
                  }}</label>
                  <div class="col-sm-9">
                    <custom-date-picker
                      v-model="BasicTariffRate.docdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      style="width: 100%"
                    ></custom-date-picker>
                  </div>
                </div> -->
              </CCol>
              <CCol sm="4">
                <label>{{ $t("StaffTypeBasicTariff") }}</label>
                <v-select
                  v-if="canchange"
                  :options="stafftypebasictarifflist"
                  size="sm"
                  v-model="BasicTariffRate.stafftypebasictariffid"
                  @input="ChangeTypeBasicTraff"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                <v-select
                  v-if="!canchange"
                  disabled
                  :options="stafftypebasictarifflist"
                  size="sm"
                  v-model="BasicTariffRate.stafftypebasictariffid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="normativedoc"
                  rules="required"
                >
                  <CInput
                    :label="$t('normativedoc')"
                    autocomplete="text"
                    v-model="BasicTariffRate.normativedoc"
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
                <CInput
                  :label="$t('DetailInfo')"
                  autocomplete="text"
                  v-model="BasicTariffRate.detailinfo"
                ></CInput>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol v-if="BasicTariffRate.stafftypebasictariffid === 1">
            <b-table
              :fields="BasicTariffRateTables1"
              :items="BasicTariffRate.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:thead-top v-if="BasicTariffRate.CanSave">
                <b-tr>
                  <b-th style="width: 20%">
                    <v-select
                      :options="positionlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.positionid"
                    >
                    <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                  </b-th>
                  <b-th style="width: 20%">
                    <v-select
                      :options="qualificationcategorylist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.qualificationcategoryid"
                    >
                    <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                  </b-th>
                  <b-th style="width: 10%">
                    <custom-number-input
                      v-model="tabrow.ratesum"
                    ></custom-number-input>
                  </b-th>

                  <b-th style="width: 10%">
                    <CButton
                      size="sm"
                      color="primary"
                      variant="outline"
                      @click="AddRow"
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(positionname)="{ item }">
                <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                  @input="ChangePosition(item)"
                  :options="positionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.positionid"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                <p v-if="item.Status == 0">{{ item.positionname }}</p>
              </template>
              <template v-slot:cell(qualificationcategoryname)="{ item }">
                <p v-if="item.Status == 0">
                  {{ item.qualificationcategoryname }}
                </p>
                <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                  @input="ChangeQualificationCategory(item)"
                  :options="qualificationcategorylist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.qualificationcategoryid"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
              </template>
              <template v-slot:cell(ratesum)="{ item }">
                <p v-if="item.Status == 0">{{ item.ratesum }}</p>
                <custom-number-input
                  class="mb-2"
                  v-if="item.Status == 2 || item.Status == 1"
                  v-model="item.ratesum"
                ></custom-number-input>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <div class="text-center" v-if="BasicTariffRate.CanSave">
                  <b-link
                    @click="EditRow(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    @click="DeleteRow(item)"
                    v-c-tooltip="{ content: $t('Delete') }"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
          </CCol>
          <CCol v-if="BasicTariffRate.stafftypebasictariffid === 2">
            <b-table
              :fields="BasicTariffRateTables2"
              :items="BasicTariffRate.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:thead-top v-if="BasicTariffRate.CanSave">
                <b-tr>
                  <b-th style="width: 20%">
                    <v-select
                      :options="positionlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.positionid"
                    >
                    <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                  </b-th>

                  <b-th style="width: 20%">
                    <v-select
                      :options="schoolgroupcontingentlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolgroupcontingentid"
                    >
                    <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                  </b-th>

                  <b-th style="width: 10%">
                    <custom-number-input
                      v-model="tabrow.ratesum"
                    ></custom-number-input>
                  </b-th>

                  <b-th style="width: 10%">
                    <CButton
                      size="sm"
                      color="primary"
                      variant="outline"
                      @click="AddRow"
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(positionname)="{ item }">
                <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                  @input="ChangePosition(item)"
                  :options="positionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.positionid"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                <p v-if="item.Status == 0">{{ item.positionname }}</p>
              </template>

              <template v-slot:cell(schoolgroupcontingentname)="{ item }">
                <p v-if="item.Status == 0">
                  {{ item.schoolgroupcontingentname }}
                </p>
                <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                  @input="ChangeSchoolGroupContigent(item)"
                  :options="schoolgroupcontingentlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.schoolgroupcontingentid"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
              </template>

              <template v-slot:cell(ratesum)="{ item }">
                <p v-if="item.Status == 0">{{ item.ratesum }}</p>
                <custom-number-input
                  class="mb-2"
                  v-if="item.Status == 2 || item.Status == 1"
                  v-model="item.ratesum"
                ></custom-number-input>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <div class="text-center" v-if="BasicTariffRate.CanSave">
                  <b-link
                    @click="EditRow(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    @click="DeleteRow(item)"
                    v-c-tooltip="{ content: $t('Delete') }"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
          </CCol>
          <CCol v-if="BasicTariffRate.stafftypebasictariffid === 3">
            <b-table
              :fields="BasicTariffRateTables3"
              :items="BasicTariffRate.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:thead-top v-if="BasicTariffRate.CanSave">
                <b-tr>
                  <b-th style="width: 20%">
                    <v-select
                      :options="positionlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.positionid"
                    >
                    <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                  </b-th>

                  <b-th style="width: 15%">
                    <v-select
                      :options="regiontypelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.regiontypeid"
                    ></v-select>
                  </b-th>
                  <b-th style="width: 15%">
                    <v-select
                      :options="regiongrouplist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.regiongroupid"
                    >
                    <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                  </b-th>
                  <b-th style="width: 10%">
                    <custom-number-input
                      v-model="tabrow.ratesum"
                    ></custom-number-input>
                  </b-th>

                  <b-th style="width: 10%">
                    <CButton
                      size="sm"
                      color="primary"
                      variant="outline"
                      @click="AddRow"
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </CButton>
                  </b-th>
                </b-tr>
              </template>

              <template v-slot:cell(positionname)="{ item }">
                <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                  @input="ChangePosition(item)"
                  :options="positionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.positionid"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
                <p v-if="item.Status == 0">{{ item.positionname }}</p>
              </template>

              <template v-slot:cell(regiontypename)="{ item }">
                <p v-if="item.Status == 0">{{ item.regiontypename }}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  @input="ChangeRegiontype(item)"
                  :options="regiontypelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.regiontypeid"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
              </template>
              <template v-slot:cell(regiongroupname)="{ item }">
                <p v-if="item.Status == 0">{{ item.regiongroupname }}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  @input="ChangeRegionGroup(item)"
                  :options="regiongrouplist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.regiongroupid"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
              </template>
              <template v-slot:cell(ratesum)="{ item }">
                <p v-if="item.Status == 0">{{ item.ratesum }}</p>
                <custom-number-input
                  class="mb-2"
                  v-if="item.Status == 2 || item.Status == 1"
                  v-model="item.ratesum"
                ></custom-number-input>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <div class="text-center" v-if="BasicTariffRate.CanSave">
                  <b-link
                    @click="EditRow(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    @click="DeleteRow(item)"
                    v-c-tooltip="{ content: $t('Delete') }"
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
                @click="$router.push({ name: 'BasicTariffRate' })"
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
                v-if="BasicTariffRate.CanSave"
              >
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
import RegionGroupService from "@/services/RegionGroup.service";
import RegionTypeService from "@/services/RegionType.service";
import SchoolGroupContingentService from "@/services/SchoolGroupContingent.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import PositionService from "@/services/Position.service";
import StaffTypeBasicTariffService from "@/services/StaffTypeBasicTariff.service";
import BasicTariffRateService from "@/services/BasicTariffRate.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    CustomDatePicker,
  },
  data() {
    return {
      isclone: false,
      SaveLoading: false,
      BasicTariffRate: {},
      selectedrowid: 0,

      stafftypebasictarifflist: [],
      positionlist: [],
      qualificationcategorylist: [],
      schoolgroupcontingentlist: [],
      regiontypelist: [],
      regiongrouplist: [],

      BasicTariffRateTables1: [
        {
          key: "positionname",
          label: this.$t("Position"),
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("QualificationCategory"),
        },
        {
          key: "ratesum",
          label: this.$t("ratesum"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      BasicTariffRateTables2: [
        {
          key: "positionname",
          label: this.$t("Position"),
        },

        {
          key: "schoolgroupcontingentname",
          label: this.$t("SchoolGroupContingent"),
        },

        {
          key: "ratesum",
          label: this.$t("ratesum"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      BasicTariffRateTables3: [
        {
          key: "positionname",
          label: this.$t("Position"),
        },
        {
          key: "regiontypename",
          label: this.$t("regiontype"),
        },
        {
          key: "regiongroupname",
          label: this.$t("regiongroup"),
        },
        {
          key: "ratesum",
          label: this.$t("ratesum"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        schoolgroupcontingentid: 0,
        schoolgroupcontingentname: "",
        regiontypeid: 0,
        regiontypename: "",
        regiongroupid: 0,
        regiongroupname: "",
        ratesum: 0,
        Status: 1,
      },
      canchange: true,
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    self.isclone = self.$route.params.isclone;
    RegionGroupService.GetAll().then((res) => {
      self.regiongrouplist = res.data;
    });
    RegionTypeService.GetAll().then((res) => {
      self.regiontypelist = res.data;
    });
    SchoolGroupContingentService.GetAll().then((res) => {
      self.schoolgroupcontingentlist = res.data;
    });
    QualificationCategoryService.GetAll().then((res) => {
      self.qualificationcategorylist = res.data;
    });

    StaffTypeBasicTariffService.GetAll().then((res) => {
      self.stafftypebasictarifflist = res.data;
    });
    BasicTariffRateService.Get(self.selectedrowid, self.isclone).then((res) => {
      self.BasicTariffRate = res.data;
      self.calculate();
      this.ChangeTypeBasicTraff();
    });
  },
  methods: {
    ChangeSchoolGroupContigent(item) {
      item.schoolgroupcontingentname = this.schoolgroupcontingentlist.filter(
        (el) => el.id == item.schoolgroupcontingentid
      )[0].name;
    },
    ChangePosition(item) {
      item.positionname = this.positionlist.filter(
        (el) => el.id == item.positionid
      )[0].name;
    },
    ChangeQualificationCategory(item) {
      item.qualificationcategoryname = this.qualificationcategorylist.filter(
        (el) => el.id == item.qualificationcategoryid
      )[0].name;
    },
    ChangeRegionGroup(item) {
      item.regiongroupname = this.regiongrouplist.filter(
        (el) => el.id == item.regiongroupid
      )[0].name;
    },
    ChangeRegiontype(item) {
      item.regiontypename = this.regiontypelist.filter(
        (el) => el.id === item.regiontypeid
      )[0].name;
    },
    ChangeTypeBasicTraff() {
      if (!!this.BasicTariffRate.stafftypebasictariffid) {
        PositionService.GetAll(
          0,
          0,
          false,
          this.BasicTariffRate.stafftypebasictariffid
        ).then((res) => {
          this.positionlist = res.data;
        });
      }
    },
    check() {
      var self = this;
      if (
        self.BasicTariffRate.docnumber === null ||
        self.BasicTariffRate.docnumber === undefined ||
        self.BasicTariffRate.docnumber === 0 ||
        self.BasicTariffRate.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BasicTariffRate.docdate === null ||
        self.BasicTariffRate.docdate === undefined ||
        self.BasicTariffRate.docdate === 0 ||
        self.BasicTariffRate.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BasicTariffRate.stafftypebasictariffid === null ||
        self.BasicTariffRate.stafftypebasictariffid === undefined ||
        self.BasicTariffRate.stafftypebasictariffid === 0
      ) {
        this.makeToast(
          this.$t("StafftypebasictariffNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BasicTariffRate.normativedoc === null ||
        self.BasicTariffRate.normativedoc === undefined ||
        self.BasicTariffRate.normativedoc === 0 ||
        self.BasicTariffRate.normativedoc === ""
      ) {
        this.makeToast(
          this.$t("NormativeDocNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      var tableitemscount = 0;
      tableitemscount = self.BasicTariffRate.Tables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        this.makeToast(this.$t("TableNotfull"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      BasicTariffRateService.Update(self.BasicTariffRate)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "BasicTariffRate",
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
    AddRow(data) {
      var self = this;
      if (self.BasicTariffRate.stafftypebasictariffid === 1) {
        if (
          self.tabrow.positionid === null ||
          self.tabrow.positionid === undefined ||
          self.tabrow.positionid === 0 ||
          self.tabrow.positionid === ""
        ) {
          this.makeToast(
            this.$t("positionNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        if (
          self.tabrow.qualificationcategoryid === null ||
          self.tabrow.qualificationcategoryid === undefined ||
          self.tabrow.qualificationcategoryid === 0 ||
          self.tabrow.qualificationcategoryid === ""
        ) {
          this.makeToast(
            this.$t("qualificationcategoryNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        self.tabrow.positionname = self.positionlist.filter(function (item) {
          if (item.id === self.tabrow.positionid) return item;
        })[0].name;
        self.tabrow.qualificationcategoryname =
          self.qualificationcategorylist.filter(function (item) {
            if (item.id === self.tabrow.qualificationcategoryid) return item;
          })[0].name;

        var dublicate = false;
        self.BasicTariffRate.Tables.forEach(function (item) {
          if (
            item.Status !== 3 &&
            item.positionid === self.tabrow.positionid &&
            item.qualificationcategoryid === self.tabrow.qualificationcategoryid
          ) {
            dublicate = true;
          }
        });
        if (dublicate) {
          this.makeToast(
            this.$t("Dublicate") +
              ": " +
              self.tabrow.positionname +
              ", " +
              self.tabrow.qualificationcategoryname,
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.BasicTariffRate.stafftypebasictariffid === 2) {
        if (
          self.tabrow.positionid === null ||
          self.tabrow.positionid === undefined ||
          self.tabrow.positionid === 0 ||
          self.tabrow.positionid === ""
        ) {
          this.makeToast(
            this.$t("positionNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        if (
          self.tabrow.schoolgroupcontingentid === null ||
          self.tabrow.schoolgroupcontingentid === undefined ||
          self.tabrow.schoolgroupcontingentid === 0 ||
          self.tabrow.schoolgroupcontingentid === ""
        ) {
          this.makeToast(
            this.$t("schoolgroupcontingentNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        self.tabrow.positionname = self.positionlist.filter(function (item) {
          if (item.id === self.tabrow.positionid) return item;
        })[0].name;
        self.tabrow.schoolgroupcontingentname =
          self.schoolgroupcontingentlist.filter(function (item) {
            if (item.id === self.tabrow.schoolgroupcontingentid) return item;
          })[0].name;

        var dublicate = false;
        self.BasicTariffRate.Tables.forEach(function (item) {
          if (
            item.Status !== 3 &&
            item.positionid === self.tabrow.positionid &&
            item.schoolgroupcontingentid === self.tabrow.schoolgroupcontingentid
          ) {
            dublicate = true;
          }
        });
        if (dublicate) {
          this.makeToast(
            this.$t("Dublicate") +
              ": " +
              self.tabrow.positionname +
              ", " +
              self.tabrow.schoolgroupcontingentname,
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.BasicTariffRate.stafftypebasictariffid === 3) {
        if (
          self.tabrow.positionid === null ||
          self.tabrow.positionid === undefined ||
          self.tabrow.positionid === 0 ||
          self.tabrow.positionid === ""
        ) {
          this.makeToast(
            this.$t("positionNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        if (
          self.tabrow.regiontypeid === null ||
          self.tabrow.regiontypeid === undefined ||
          self.tabrow.regiontypeid === 0 ||
          self.tabrow.regiontypeid === ""
        ) {
          this.makeToast(
            this.$t("regiontypeNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.regiongroupid === null ||
          self.tabrow.regiongroupid === undefined ||
          self.tabrow.regiongroupid === 0 ||
          self.tabrow.regiongroupid === ""
        ) {
          this.makeToast(
            this.$t("regiongroupNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        self.tabrow.positionname = self.positionlist.filter(function (item) {
          if (item.id === self.tabrow.positionid) return item;
        })[0].name;
        self.tabrow.regiontypename = self.regiontypelist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.regiontypeid) return item;
        })[0].name;
        self.tabrow.regiongroupname = self.regiongrouplist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.regiongroupid) return item;
        })[0].name;

        var dublicate = false;
        self.BasicTariffRate.Tables.forEach(function (item) {
          if (
            item.Status !== 3 &&
            item.positionid === self.tabrow.positionid &&
            item.regiontypeid === self.tabrow.regiontypeid &&
            item.regiongroupid === self.tabrow.regiongroupid
          ) {
            dublicate = true;
          }
        });
        if (dublicate) {
          this.makeToast(
            this.$t("Dublicate") +
              ": " +
              self.tabrow.positionname +
              ", " +
              self.tabrow.regiontypename +
              ", " +
              self.tabrow.regiongroupname,
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      if (
        self.tabrow.ratesum === null ||
        self.tabrow.ratesum === undefined ||
        self.tabrow.ratesum === 0 ||
        self.tabrow.ratesum === ""
      ) {
        this.makeToast(
          this.$t("ratesumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.BasicTariffRate.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        schoolgroupcontingentid: 0,
        schoolgroupcontingentname: "",
        regiontypeid: 0,
        regiontypename: "",
        regiongroupid: 0,
        regiongroupname: "",
        ratesum: 0,
        Status: 1,
      };
      self.calculate();
    },
    calculate() {
      var self = this;
      var index = 0;
      self.BasicTariffRate.Tables.forEach(function (item) {
        if (item.Status !== 3) {
          index++;
        }
      });
      if (index > 0) self.canchange = false;
      else self.canchange = true;
    },
    EditRow(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
    },
    DeleteRow(item) {
      var self = this;
      item.Status = 3;
      self.calculate();
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
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
  },
};
</script>

<style></style>
