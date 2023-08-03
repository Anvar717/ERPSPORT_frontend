<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("SportOrgRatingCriteria") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'SportOrgRatingCriteria' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CCard sm="6">
              <CCardBody sm="6">
                <CRow>
                  <CCol sm="3" lg="3" class="fname-select">
                    <ValidationProvider
                      v-slot="v"
                      name="docnumber"
                      rules="required"
                    >
                      <CInput
                        :label="$t('docnumber')"
                        autocomplete="text"
                        :disabled="IsDisabled()"
                        v-model="SportOrgRatingCriteria.docnumber"
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
                  <CCol sm="3" lg="3" class="achievement-input fname-select">
                    <label>{{ $t("docdate") }}</label>
                    <date-picker
                      v-model="SportOrgRatingCriteria.docdate"
                      size="sm"
                      :disabled="IsDisabled()"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      style="width: 100%"
                    ></date-picker>
                  </CCol>
                  <CCol sm="12" lg="3" class="achievement-input fname-select">
                    <ValidationProvider
                      v-slot="v"
                      name="organizationtype"
                      rules="required"
                    >
                      <label>{{ $t("organizationtype") }}</label>
                      <v-select
                        :disabled="IsDisabled()"
                        :options="organizationtypelist"
                        v-model="SportOrgRatingCriteria.organizationtypeid"
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
                  <CCol
                    v-if="SportOrgRatingCriteria.organizationtypeid == 6"
                    sm="12"
                    lg="3"
                    class="achievement-input fname-select"
                  >
                    <ValidationProvider
                      v-slot="v"
                      name="organizationtype"
                      rules="required"
                    >
                      <label>{{ $t("schooltype") }}</label>
                      <v-select
                        :disabled="IsDisabled()"
                        :options="schooltypelist"
                        v-model="SportOrgRatingCriteria.schooltypeid"
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
                </CRow>
              </CCardBody>
            </CCard>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol
            class="text-right mb-4 mr-3"
            v-if="SportOrgRatingCriteria.CanSave"
          >
            <CButton color="primary" class="mr-2" size="sm" @click="FillTable">
              <b-spinner v-if="FillLoading" small></b-spinner>
              {{ $t("Fill") }}
            </CButton>
            <CButton color="danger" class="mr-2" size="sm" @click="Clear">
              {{ $t("Clear") }}
            </CButton>
          </CCol>
        </CRow>
        <CRow class="mt-1">
          <CCol sm="12" md="12" lg="12">
            <b-table-simple responsive bordered striped>
              <b-thead>
                <b-tr class="headStyle">
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("actions") }}
                  </b-th>
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("№") }}
                  </b-th>
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("sportorgratingindicator") }}
                  </b-th>
                  <!-- <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("unitofmeasure") }}
                  </b-th> -->
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("Баҳолаш мезонлари") }}
                  </b-th>
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("Баллар тақсимоти") }}
                  </b-th>
                </b-tr>
              </b-thead>
              <b-tbody
                v-for="(
                  item, index
                ) in SportOrgRatingCriteria.sportOrgRatingCriteriaTable"
                :key="index"
                v-show="item.Status != 3"
              >
                <b-tr>
                  <td
                    :rowspan="
                      item.sportOrgRatingCriteriaScoreTable.length == 0
                        ? 1
                        : item.sportOrgRatingCriteriaScoreTable.length + 1
                    "
                    v-if="!item.sportorgratingindicatorisgroup"
                    class="text-center"
                    style="vertical-align: middle"
                  >
                    <CButtonGroup class="mx-auto d-block text-center" size="sm">
                      <CButton
                        variant="outline"
                        color="primary"
                        @click="EditRow(item)"
                      >
                        <b-icon
                          v-if="SportOrgRatingCriteria.CanSave"
                          icon="pencil"
                        ></b-icon>
                        <b-icon
                          v-if="!SportOrgRatingCriteria.CanSave"
                          icon="eye"
                        ></b-icon>
                      </CButton>

                      <CButton
                        v-if="SportOrgRatingCriteria.CanSave"
                        variant="outline"
                        color="danger"
                        @click="DeleteRow(item)"
                      >
                        <b-icon icon="x"></b-icon>
                      </CButton>
                    </CButtonGroup>
                  </td>
                  <td
                    v-if="!item.sportorgratingindicatorisgroup"
                    :rowspan="
                      item.sportOrgRatingCriteriaScoreTable.length == 0
                        ? 1
                        : item.sportOrgRatingCriteriaScoreTable.length + 1
                    "
                    class="text-center"
                    style="vertical-align: middle"
                  >
                    {{ item.sportorgratingindicatorcode }}
                  </td>
                  <td
                    :rowspan="
                      item.sportOrgRatingCriteriaScoreTable.length == 0
                        ? 1
                        : item.sportOrgRatingCriteriaScoreTable.length + 1
                    "
                    class="text-left"
                    :colspan="item.sportorgratingindicatorisgroup ? 5 : 1"
                    style="vertical-align: middle"
                  >
                    <p
                      :style="
                        item.sportorgratingindicatorisgroup
                          ? 'font-weight:500;text-align:center'
                          : ''
                      "
                    >
                      {{ item.sportorgratingindicatorname }}
                    </p>
                  </td>
                  <td
                    class="text-center"
                    style="vertical-align: middle"
                    v-if="
                      item.sportOrgRatingCriteriaScoreTable.length == 0 &&
                      !item.sportorgratingindicatorisgroup
                    "
                  >
                    <span style="font-size: 21px">-</span>
                  </td>
                  <td
                    class="text-center"
                    style="vertical-align: middle"
                    v-if="
                      item.sportOrgRatingCriteriaScoreTable.length == 0 &&
                      !item.sportorgratingindicatorisgroup
                    "
                  >
                    <span style="font-size: 21px">-</span>
                  </td>
                </b-tr>
                <b-tr
                  v-for="(item1, i) in item.sportOrgRatingCriteriaScoreTable"
                  :key="i"
                >
                  <!-- <td class="text-center" style="vertical-align: middle">
                    {{ item1.unitofmeasurename }}
                  </td> -->
                  <td class="text-center" style="vertical-align: middle">
                    <span v-if="!!item1.minindicator || !!item1.maxindicator">
                      {{ item1.minindicator == null ? 0 : item1.minindicator
                      }}{{ $t("by") }}
                      {{ item1.maxindicator == null ? 0 : item1.maxindicator
                      }}{{ $t("of") }}</span
                    >
                    <span v-if="item1.minindicator == null && item1.maxindicator == null">
                     0</span
                    >
                    <!-- <span v-if="!!item1.minstandard && lang == 'ru'">
                            ( от {{ item1.minstandard }} до
                            {{ item1.maxstandard }})</span
                          > -->
                  </td>
                  <td class="text-center" style="vertical-align: middle">
                    {{ item1.score == null ? "-" : item1.score }}
                  </td>
                </b-tr>
              </b-tbody>
              <tbody v-if="isBusy">
                <tr>
                  <td class="text-center" colspan="5">
                    <b-spinner></b-spinner>
                  </td>
                </tr>
              </tbody>
              <tbody
                v-if="
                  SportOrgRatingCriteria.sportOrgRatingCriteriaTable.length ==
                    0 && !isBusy
                "
              >
                <tr>
                  <td colspan="5">
                    <h5 class="text-center">{{ $t("NoItems") }}</h5>
                  </td>
                </tr>
              </tbody>
            </b-table-simple>
          </CCol>
        </CRow>

        <b-modal id="AddModal" size="xl" no-close-on-backdrop>
          <template v-slot:modal-title>{{
            $t("SportOrgRatingCriteriaInformation")
          }}</template>
          <CCard sm="6">
            <CCardBody sm="6">
              <CRow>
                <CCol>
                  <span style="color: blue; font-size: 20px">
                    {{ sportorgratingindicatorname }}
                  </span>
                </CCol>
              </CRow>
              <CRow class="mt-4">
                <CCol sm="3">
                  <label>{{ $t("unitofmeasure") }}</label>
                  <v-select
                    :options="unitofmeasurelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    :disabled="isunitofmeasuredisabled"
                    v-model="tabrow.unitofmeasureid"
                  ></v-select>
                </CCol>
                <CCol sm="3">
                  <CInput
                    :label="$t('minindicator')"
                    v-model="tabrow.minindicator"
                    type="number"
                  >
                  </CInput>
                </CCol>
                <CCol sm="3">
                  <CInput
                    :label="$t('maxindicator')"
                    v-model="tabrow.maxindicator"
                    type="number"
                  >
                  </CInput>
                </CCol>
                <CCol sm="3">
                  <CInput
                    :label="$t('score')"
                    v-model="tabrow.score"
                    type="number"
                  >
                  </CInput>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="text-right" v-if="SportOrgRatingCriteria.CanSave">
                  <CButton
                    color="primary"
                    class="my-2"
                    size="sm"
                    @click="AddData"
                  >
                    <b-icon icon="plus"></b-icon>
                    {{ $t("Add") }}
                  </CButton>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="sportOrgRatingCriteriaScoreTableFields"
                      :items="tabrowParent.sportOrgRatingCriteriaScoreTable"
                      class="bg-color-table text-center tdpadding"
                      style="vertical-align: middle"
                      bordered
                      small
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:cell(maxindicator)="{ item }">
                        <span>
                          {{
                            item.maxindicator == null ? 0 : item.maxindicator
                          }}
                        </span>
                      </template>
                      <template v-slot:cell(minindicator)="{ item }">
                        <span>
                          {{
                            item.minindicator == null ? 0 : item.minindicator
                          }}
                        </span>
                      </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          v-if="SportOrgRatingCriteria.CanSave"
                          class="mx-auto d-block text-center"
                          size="sm"
                        >
                          <CButton
                            variant="outline"
                            color="primary"
                            @click="EditRowItem(item)"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </CButton>

                          <CButton
                            variant="outline"
                            color="danger"
                            @click="DeleteRowItem(item)"
                          >
                            <b-icon icon="x"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>
                    </b-table>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="BackTable">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton
                v-if="SportOrgRatingCriteria.CanSave"
                :disabled="DisabledItem()"
                size="sm"
                color="success"
                @click="UpdateTable"
              >
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'SportOrgRatingCriteria' })"
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
                v-if="SportOrgRatingCriteria.CanSave"
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
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import HelperService from "@/services/helper.service";
import SportOrgRatingCriteriaService from "@/services/SportOrgRatingCriteria.service";

export default {
  data() {
    return {
      SaveLoading: false,
      CalcKindModal: false,
      isBusy: false,
      isunitofmeasuredisabled: false,
      SportOrgRatingCriteria: {},
      selectedrowid: 0,
      basictariffrate: 0,
      FillLoading: false,
      organizationtypelist: [],
      schooltypelist: [],
      positionlist: [],

      tariffscaletypelist: [],
      tariffscalelist: [],
      tariffscaletablelist: [],

      isdisabled: false,
      sportOrgRatingCriteriaScoreTableFields: [
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasure"),
          class: "text-center",
        },
        {
          key: "minindicator",
          label: this.$t("minindicator"),
          class: "text-right",
        },

        {
          key: "maxindicator",
          label: this.$t("maxindicator"),
          class: "text-right",
        },

        {
          key: "score",
          label: this.$t("score"),
          class: "text-right",
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      SportOrgRatingCriteriaScoreTableItem: [],
      SportOrgRatingCriteriaPositionTables: [
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
          class: "text-center",
        },

        {
          key: "sportorgratingindicatorname",
          label: this.$t("sportorgratingindicator"),
          class: "text-left",
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],

      unitofmeasurelist: [],
      editIndexItem: -1,
      editedIndex: -1,
      tabrowParent: {
        id: 0,
        ordernumber: 0,
        ownerid: 0,
        sportorgratingindicatorid: 0,
        sportorgratingindicatorname: "",
        sportOrgRatingCriteriaScoreTable: [],
        Status: 1,
      },
      tabrow: {
        id: 0,
        ownerid: 0,
        minindicator: "",
        maxindicator: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        score: "",
        Status: 1,
      },
      sportorgratingindicatorname: "",

      allSignupErrors: {},
    };
  },
  created() {
    var self = this;
    self.isBusy = true;
    self.selectedrowid = self.$route.params.id;

    OrganizationTypeService.GetAll().then((res) => {
      self.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    HelperService.GetTariffScaleTypeList().then((res) => {
      self.tariffscaletypelist = res.data;
    });
    this.getData();
  },
  methods: {
    DisabledItem() {
      var self = this;
      if (self.isdisabled) {
        return true;
      } else {
        return false;
      }
    },
    IsDisabled() {
      var self = this;
      if (
        self.SportOrgRatingCriteria.sportOrgRatingCriteriaTable.filter(
          (item) => item.Status !== 3
        ).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    getData() {
      var self = this;
      self.isBusy = true;
      SportOrgRatingCriteriaService.Get(self.selectedrowid).then((res) => {
        self.SportOrgRatingCriteria = res.data;
        self.isBusy = false;
      });
    },
    Clear() {
      var self = this;
      self.SportOrgRatingCriteria.sportOrgRatingCriteriaTable.forEach(function (
        item
      ) {
        item.Status = 3;
      });
    },
    check() {
      var self = this;
      if (
        self.SportOrgRatingCriteria.docnumber === null ||
        self.SportOrgRatingCriteria.docnumber === undefined ||
        self.SportOrgRatingCriteria.docnumber === 0 ||
        self.SportOrgRatingCriteria.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRatingCriteria.docdate === null ||
        self.SportOrgRatingCriteria.docdate === undefined ||
        self.SportOrgRatingCriteria.docdate === 0 ||
        self.SportOrgRatingCriteria.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      return true;
    },
    checktabrowdata() {
      var self = this;

      if (
        self.tabrow.unitofmeasureid === null ||
        self.tabrow.unitofmeasureid === undefined ||
        self.tabrow.unitofmeasureid === 0
      ) {
        this.makeToast(
          this.$t("unitofmeasureNotSelect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }

      if (
        self.tabrow.minindicator === null ||
        self.tabrow.minindicator === undefined
      ) {
        this.makeToast(
          this.$t("MinIndicatorNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.maxindicator === null ||
        self.tabrow.maxindicator === undefined
      ) {
        this.makeToast(
          this.$t("MaxIndicatorNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow.score === null || self.tabrow.score === undefined) {
        this.makeToast(this.$t("ScoreNotSelected"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    fillCheck() {
      var self = this;
      if (
        self.SportOrgRatingCriteria.docnumber === null ||
        self.SportOrgRatingCriteria.docnumber === undefined ||
        self.SportOrgRatingCriteria.docnumber === 0 ||
        self.SportOrgRatingCriteria.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRatingCriteria.docdate === null ||
        self.SportOrgRatingCriteria.docdate === undefined ||
        self.SportOrgRatingCriteria.docdate === 0 ||
        self.SportOrgRatingCriteria.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRatingCriteria.organizationtypeid === null ||
        self.SportOrgRatingCriteria.organizationtypeid === undefined ||
        self.SportOrgRatingCriteria.organizationtypeid === 0 ||
        self.SportOrgRatingCriteria.organizationtypeid === ""
      ) {
        this.makeToast(
          this.$t("OrganizationTypeIdNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },

    FillTable() {
      var self = this;
      if (!self.fillCheck()) {
        return false;
      }
      self.FillLoading = true;
      SportOrgRatingCriteriaService.Fill(self.SportOrgRatingCriteria)
        .then((res) => {
          self.makeToast(self.$t("FillSuccess"), self.$t("message"), "success");
          self.SportOrgRatingCriteria = res.data.data;
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        })
        .finally(() => {
          self.FillLoading = false;
        });
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      SportOrgRatingCriteriaService.Update(self.SportOrgRatingCriteria)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "SportOrgRatingCriteria",
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

    AddRow() {
      var self = this;
      self.tabrow = {
        id: 0,
        ownerid: 0,
        minindicator: 0,
        maxindicator: 0,
        unitofmeasureid: 0,
        unitofmeasurename: "",
        score: 0,
        Status: 1,
      };
      self.isdisabled = false;
      self.isunitofmeasuredisabled = false;
      this.sportorgratingindicatorname = "";
      self.$bvModal.show("AddModal");
    },
    AddData() {
      var self = this;
      if (!self.checktabrowdata()) {
        return false;
      }
      if (!!this.tabrow.unitofmeasureid) {
        this.tabrow.unitofmeasurename = this.unitofmeasurelist.filter(
          (item) => item.id == this.tabrow.unitofmeasureid
        )[0].name;
      }
      if (this.editIndexItem > -1) {
        Object.assign(
          self.tabrowParent.sportOrgRatingCriteriaScoreTable[
            self.editIndexItem
          ],
          self.tabrow
        );
      } else {
        self.tabrowParent.sportOrgRatingCriteriaScoreTable.push(self.tabrow);
      }

      self.tabrow = {
        id: 0,
        ownerid: this.tabrow.ownerid,
        minindicator: "",
        maxindicator: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        score: "",
        Status: 1,
      };
      if (this.tabrowParent.sportOrgRatingCriteriaScoreTable.length > 0) {
        this.tabrow.unitofmeasureid =
          this.tabrowParent.sportOrgRatingCriteriaScoreTable[0].unitofmeasureid;
        this.isunitofmeasuredisabled = true;
      }
      self.editedIndex1 = -1;
      self.editIndexItem = -1;
      self.isunitofmeasuredisabled = true;

      //   self.$bvModal.hide("AddModal");
    },
    BackTable() {
      this.$bvModal.hide("AddModal");
      this.getData();
    },
    UpdateTable() {
      var self = this;
      SportOrgRatingCriteriaService.UpdateSportOrgRatingCriteriaScoreTable(
        self.tabrowParent.sportOrgRatingCriteriaScoreTable
      )
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$bvModal.hide("AddModal");
          this.getData();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          this.getData();
          self.$bvModal.hide("AddModal");
        });
    },
    EditRow(item) {
      var self = this;
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex =
        this.SportOrgRatingCriteria.sportOrgRatingCriteriaTable.indexOf(item);
      this.tabrowParent = Object.assign({}, item);
      //   this.tabrowParent.sportOrgRatingCriteriaScoreTable =
      //     item.sportOrgRatingCriteriaScoreTable;
      UnitOfMeasureService.GetAll().then((res) => {
        this.unitofmeasurelist = res.data;
      });
      this.sportorgratingindicatorname = item.sportorgratingindicatorname;
      if (this.tabrowParent.sportOrgRatingCriteriaScoreTable.length > 0) {
        this.tabrow.unitofmeasureid =
          this.tabrowParent.sportOrgRatingCriteriaScoreTable[0].unitofmeasureid;
        this.isunitofmeasuredisabled = true;
        this.tabrow.ownerid = item.id;
      } else {
        this.tabrow.unitofmeasureid = 0;
        this.tabrow.ownerid = item.id;
        this.isunitofmeasuredisabled = false;
      }

      this.$bvModal.show("AddModal");
    },
    DeleteRow(item) {
      var self = this;
      item.Status = 3;
    },
    EditRowItem(item) {
      var self = this;
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editIndexItem =
        this.tabrowParent.sportOrgRatingCriteriaScoreTable.indexOf(item);
      this.tabrow = Object.assign({}, item);
      self.tabrow = {
        id: item.id,
        ownerid: item.ownerid,
        minindicator: item.minindicator,
        maxindicator: item.maxindicator,
        unitofmeasureid: item.unitofmeasureid,
        unitofmeasurename: item.unitofmeasurename,
        score: item.score,
        Status: 2,
      };
      UnitOfMeasureService.GetAll().then((res) => {
        this.unitofmeasurelist = res.data;
      });
      self.isunitofmeasuredisabled = true;
      // this.$bvModal.show("AddModal");
    },
    DeleteRowItem(item) {
      var self = this;
      item.Status = 3;
      if (
        tabrowParent.sportOrgRatingCriteriaScoreTable.filter(
          (item) => item.Status !== 3
        ).length == 0
      ) {
        self.isunitofmeasuredisabled = false;
      }
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },

    roundToTwo(value, decimals) {
      value;
      decimals;

      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
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
  watch: {},
};
</script>
  
  <style>
</style>