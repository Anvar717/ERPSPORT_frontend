<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("SportOrgRatingCriteria") }}
          <div class="card-header-actions">
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
        </CCardHeader>
         <!-- <CRow>
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
        </CRow> -->
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
                        disabled
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
                      lang="ru"
                      disabled
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
                        :options="organizationtypelist"
                        disabled
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
                        :options="schooltypelist"
                        disabled
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
        <b-row class="mt-3">
          <b-col sm="12" md="12" lg="12">
            <b-table-simple responsive bordered striped>
              <b-thead>
                <b-tr class="headStyle">
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
              >
                <b-tr>
                  <td
                    :rowspan="item.sportOrgRatingCriteriaScoreTable.length + 1"
                    class="text-center"
                    style="vertical-align: middle"
                  >
                  {{ item.sportorgratingindicatorcode }}
                  </td>
                  <td
                    :rowspan="item.sportOrgRatingCriteriaScoreTable.length + 1"
                    class="text-left"
                    style="vertical-align: middle"
                  >
                    {{ item.sportorgratingindicatorname }}
                  </td>
                  <td
                    class="text-center"
                    style="vertical-align: middle"
                    v-if="item.sportOrgRatingCriteriaScoreTable.length == 0"
                  >
                    <span style="font-size: 21px">-</span>
                  </td>
                  <td
                    class="text-center"
                    style="vertical-align: middle"
                    v-if="item.sportOrgRatingCriteriaScoreTable.length == 0"
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
                  </td>
                <td class="text-center" style="vertical-align: middle">
                    {{ item1.score == null ? "-" : item1.score }}
                  </td>
                </b-tr>
              </b-tbody>
              <tbody v-if="isBusy">
                <tr>
                  <td class="text-center" colspan="19">
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
                  <td colspan="4">
                    <h5 class="text-center">{{ $t("NoItems") }}</h5>
                  </td>
                </tr>
              </tbody>
            </b-table-simple>
          </b-col>
        </b-row>
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
            isBusy:false,
      SportOrgRatingCriteriaScoreTableItem: [],
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
        minindicator: 0,
        maxindicator: 0,
        unitofmeasureid: 0,
        unitofmeasurename: "",
        score: 0,
        Status: 1,
      },

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
    SportOrgRatingCriteriaService.Get(self.selectedrowid).then((res) => {
      self.SportOrgRatingCriteria = res.data;
      self.isBusy = false;
    });
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