<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("Staffing") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'Staffing' })"
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
                  <CCol sm="1">
                    <ValidationProvider
                      v-slot="v"
                      name="docnumber"
                      rules="required"
                    >
                      <CInput
                        disabled
                        :label="$t('docnumber')"
                        autocomplete="text"
                        v-model="Staffing.docnumber"
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
                    <date-picker
                      v-model="Staffing.docdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                  <CCol sm="2">
                    <label>{{ $t("startdate") }}</label>
                    <date-picker
                      v-model="Staffing.startdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                  <CCol sm="1">
                    <label>{{ $t("docsum") }}</label>
                    <p>
                      {{
                        $options.filters.currency(Staffing.docsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}
                    </p>
                  </CCol>
                  <CCol sm="2">
                    <ValidationProvider
                      v-slot="v"
                      name="financeyear"
                      rules="required"
                    >
                      <CInput
                        :label="$t('financeyear')"
                        autocomplete="text"
                        v-model="Staffing.financeyear"
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
                  <CCol sm="3">
                    <label>{{ $t("organizationaccount") }}</label>
                    <v-select
                      :options="organizationaccountlist"
                      v-model="Staffing.organizationaccountid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="code"
                    ></v-select>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="2">
                    <label>{{ $t("staffingtype") }}</label>
                    <v-select
                      :options="staffingtypelist"
                      v-model="Staffing.staffingtypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>
                  <CCol>
                    <label>{{ $t("SchoolGroupContingent") }}</label>
                    <v-select
                      :options="schoolgroupcontingentlist"
                      v-model="Staffing.schoolgroupcontingentid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>

                  <CCol sm="1">
                    <CInput
                      autocomplete="text"
                      :label="$t('formonths')"
                      v-model="Staffing.formonths"
                      @input="calculatetotal"
                    ></CInput>
                  </CCol>
                  <CCol>
                    <CInput
                      autocomplete="text"
                      :label="$t('detailinfo')"
                      v-model="Staffing.detailinfo"
                    ></CInput>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
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
          <CCol class="text-right mb-4 mr-3">
            <CButton color="primary" size="sm" @click="AddRow"
              ><b-icon icon="plus"> </b-icon>{{ $t("Add") }}</CButton
            >
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <b-table
              :fields="StaffingStaffingPositionTables"
              :items="Staffing.StaffingPositionTables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(departmentname)="{ item }">
                <p>{{ item.departmentname }}</p>
              </template>
              <template v-slot:cell(positionname)="{ item }">
                <p>{{ item.positionname }}</p>
              </template>
              <template v-slot:cell(qualificationcategoryname)="{ item }">
                <p>{{ item.qualificationcategoryname }}</p>
              </template>
              <template v-slot:cell(quantity)="{ item }">
                <p>
                  {{
                    $options.filters.currency(item.quantity, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template v-slot:cell(formonths)="{ item }">
                <p>{{ item.formonths }}</p>
              </template>
              <template v-slot:cell(tariffscaletype)="{ item }">
                <p>{{ item.tariffscaletype }}</p>
              </template>
              <template v-slot:cell(tariffscale)="{ item }">
                <p>{{ item.tariffscale }}</p>
              </template>
              <template v-slot:cell(rankname)="{ item }">
                <p>{{ item.rankname }}</p>
              </template>
              <template v-slot:cell(salary)="{ item }">
                <p>
                  {{
                    $options.filters.currency(item.salary, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>

              <template v-slot:cell(corrcoef)="{ item }">
                <p>{{ item.corrcoef }}</p>
              </template>
              <template v-slot:cell(staffingcalckindnames)="{ item }">
                <p>{{ item.staffingcalckindnames }}</p>
              </template>
              <template v-slot:cell(fot)="{ item }">
                <p>
                  {{
                    $options.filters.currency(item.fot, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>

              <template v-slot:cell(actions)="{ item }">
                <CButtonGroup class="mx-auto d-block text-center" size="sm">
                  <CButton
                    variant="outline"
                    color="primary"
                    @click="EditRow(item)"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </CButton>

                  <CButton
                    variant="outline"
                    color="danger"
                    @click="DeleteRow(item)"
                  >
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </CButtonGroup>
              </template>
              <template v-slot:custom-foot>
                <b-tr>
                  <b-th colspan="3">
                    <p
                      style="
                                text-align: center;
                                font-size: 15px;
                                
                              "
                    >
                      {{ $t("Total") }}
                    </p></b-th
                  >

                  <b-th
                    ><p
                      style="
                                text-align: center;
                                font-size: 15px;
                                
                              "
                    >
                      {{
                        $options.filters.currency(totalquantity, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}
                    </p></b-th
                  >
                  <b-th colspan="7"></b-th>

                  <b-th>
                    <p
                      style="
                                text-align: right;
                                font-size: 15px;
                                
                              "
                    >
                      {{
                        $options.filters.currency(totalsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}
                    </p>
                  </b-th>

                  <b-th> </b-th>
                </b-tr>
              </template>
            </b-table>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <div>
              <b-table
                :fields="StaffingIndicatorValueTables"
                :items="Staffing.IndicatorValueTables"
                class="bg-color-table text-center tdpadding mx-3"
                style="vertical-align: middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template v-slot:cell(staffingindicatorid)="{ item }">
                  <div class="text-left">
                    <p>{{ item.staffingindicatorid }}</p>
                  </div>
                </template>
                <template v-slot:cell(staffingindicatorname)="{ item }">
                  <div class="text-left">
                    <p>{{ item.staffingindicatorname }}</p>
                  </div>
                </template>
                <template v-slot:cell(quantity)="{ item }">
                  <p>{{ item.quantity }}</p>

                  <!--   <custom-number-input  v-model="item.quantity" @input="calculatetotal"></custom-number-input> -->
                </template>
                <template v-slot:cell(totalsum)="{ item }">
                  <p>
                    {{
                      $options.filters.currency(item.totalsum, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}
                  </p>
                </template>
              </b-table>
            </div>
          </CCol>
        </CRow>

        <b-modal id="AddModal" size="xl">
          <template v-slot:modal-title>{{
            $t("StaffingInformation")
          }}</template>
          <CCard sm="6">
            <CCardBody sm="6">
              <CRow>
                <CCol sm="4">
                  <label>{{ $t("department") }}</label>
                  <v-select
                    :disabled="!DisabledItem()"
                    :options="departmentlist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.departmentid"
                  ></v-select>
                </CCol>
                <CCol>
                  <label>{{ $t("position") }}</label>
                  <v-select
                    :disabled="!DisabledItem()"
                    :options="positionlist"
                    :reduce="(item) => item.positionid"
                    :placeholder="$t('ChooseBelow')"
                    label="positionidname"
                    v-model="tabrow.positionid"
                  ></v-select>
                </CCol>
                <CCol sm="2">
                  <label>{{ $t("quantity") }}</label>
                  <custom-number-input
                    :disabled="!DisabledItem()"
                    v-model="tabrow.quantity"
                    @input="tabrowtotalsumcalc"
                  ></custom-number-input>
                </CCol>
              </CRow>
              <CRow class="mt-3">
                <CCol sm="4">
                  <label>{{ $t("tariffscaletype") }}</label>
                  <v-select
                    disabled
                    :options="tariffscaletypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.tariffscaletypeid"
                  ></v-select>
                </CCol>
                <CCol v-if="tabrow.tariffscaletypeid === 1">
                  <label>{{ $t("tariffscale") }}</label>
                  <v-select
                    :disabled="!DisabledItem()"
                    :options="tariffscalelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.tariffscaleid"
                  ></v-select>
                </CCol>
                <CCol sm="2" v-if="tabrow.tariffscaletypeid === 1">
                  <label>{{ $t("rankcode") }}</label>
                  <v-select
                    :disabled="!DisabledItem()"
                    :options="tariffscaletablelist"
                    :reduce="(item) => item.rankcode"
                    :placeholder="$t('ChooseBelow')"
                    label="rankname"
                    v-model="tabrow.rankcode"
                  ></v-select>
                </CCol>
              </CRow>
              <CRow class="mt-3">
                <CCol sm="4">
                  <label>{{ $t("qualificationcategory") }}</label>
                  <v-select
                    :disabled="!DisabledItem()"
                    :options="qualificationcategorylist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.qualificationcategoryid"
                  ></v-select>
                </CCol>
                <CCol sm="2">
                  <label>{{ $t("formonths") }}</label>
                  <custom-number-input
                    :disabled="!DisabledItem()"
                    v-model="tabrow.formonths"
                  ></custom-number-input>
                </CCol>

                <CCol sm="2">
                  <label>{{ $t("corrcoef") }}</label>
                  <custom-number-input
                    :disabled="!DisabledItem()"
                    v-model="tabrow.corrcoef"
                    @input="tabrowtotalsumcalc"
                  ></custom-number-input>
                </CCol>
                <CCol sm="4">
                  <label></label>
                  <h5>
                    {{ $t("fixedvalue") }} :
                    <a style="color: blue">{{
                      $options.filters.currency(tabrow.fixedvalue, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}</a>
                  </h5>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <CCard sm="6">
            <CCardHeader>
              <h6>{{ $t("StaffingCalcKind") }}</h6>
            </CCardHeader>

            <CCardBody sm="6">
              <b-table
                :fields="currentcalckindfields"
                :items="tabrow.StaffingCalcKindTables"
                class="bg-color-table text-center tdpadding mx-3"
                style="vertical-align: middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template v-slot:thead-top v-if="DisabledItem()">
                  <b-tr>
                    <b-th style="width: 55%">
                      <v-select
                        :options="calculationkindlist"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="calckindtabrow.calculationkindid"
                      ></v-select>
                    </b-th>
                    <b-th style="width: 15%">
                      <custom-number-input
                        v-model="calckindtabrow.calccoef"
                      ></custom-number-input>
                    </b-th>
                    <b-th style="width: 15%">
                      <p>
                        {{
                          $options.filters.currency(calckindtabrow.calcsum, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}
                      </p>
                    </b-th>
                    <b-th style="width: 15%">
                      <CButton
                        size="sm"
                        color="primary"
                        @click="addcalckindRow"
                      >
                        <b-icon icon="plus"> </b-icon>
                        {{ $t("Add") }}
                      </CButton>
                    </b-th>
                  </b-tr>
                </template>

                <template v-slot:cell(calculationkindname)="{ item }">
                  <p>{{ item.calculationkindname }}</p>
                </template>
                <template v-slot:cell(calccoef)="{ item }">
                  <p>{{ item.calccoef }}</p>
                </template>
                <template v-slot:cell(calcsum)="{ item }">
                  <p>
                    {{
                      $options.filters.currency(item.calcsum, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}
                  </p>
                </template>
                <template v-slot:cell(actions)="{ item }">
                  <CButtonGroup class="mx-auto d-block text-center" size="sm">
                    <CButton
                      v-if="DisabledItem()"
                      variant="outline"
                      color="danger"
                      @click="DeleteRow(item)"
                    >
                      <b-icon icon="x"></b-icon>
                    </CButton>
                  </CButtonGroup>
                </template>
              </b-table>
            </CCardBody>
          </CCard>
          <CRow>
            <div class="text-center mx-auto">
              <CButton
                size="sm"
                class="mb-2"
                color="primary"
                @click="RecalcData"
              >
                <b-icon icon="check2"></b-icon>
                {{ $t("Recalc") }}
              </CButton>
              <CButton
                size="sm"
                class="mb-2 ml-2"
                color="danger"
                @click="ClearTable"
              >
                <b-icon icon="info-circle" class="mr-2"></b-icon>
                {{ $t("Clear") }}
              </CButton>
            </div>
          </CRow>
          <CCard sm="6">
            <CCardBody sm="6">
              <CRow>
                <CCol sm="4">
                  <h5>
                    {{ $t("salary") }} :
                    <a style="color: blue">{{
                      $options.filters.currency(tabrow.salary, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}</a>
                  </h5>
                </CCol>
                <CCol sm="4">
                  <h5>
                    {{ $t("calckindtotalsum") }} :
                    <a style="color: blue">{{
                      $options.filters.currency(calckindtotalsum, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}</a>
                  </h5>
                </CCol>

                <CCol sm="4">
                  <h5>
                    {{ $t("fot") }} :
                    <a style="color: blue">{{
                      $options.filters.currency(tabrow.fot, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}</a>
                  </h5>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton
                size="sm"
                color="danger"
                class="mr-2"
                @click="$bvModal.hide('AddModal')"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton
                :disabled="DisabledItem()"
                size="sm"
                color="primary"
                @click="AddData"
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
                @click="$router.push({ name: 'Staffing' })"
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
import CalculationKindService from "@/services/CalculationKind.service";
import FixedMinimumValueService from "@/services/FixedMinimumValue.service";
import BasicTariffRateService from "@/services/BasicTariffRate.service";
import TariffScaleService from "@/services/TariffScale.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import HROrgStructureService from "@/services/HROrgStructure.service";
import DepartmentService from "@/services/Department.service";
import SchoolGroupContingentService from "@/services/SchoolGroupContingent.service";
import OrganizationService from "@/services/organization.service";
import HelperService from "@/services/helper.service";
import StaffingService from "@/services/Staffing.service";

export default {
  data() {
    return {
      SaveLoading: false,
      CalcKindModal: false,
      Staffing: {},
      selectedrowid: 0,
      basictariffrate: 0,

      staffingtypelist: [],
      organizationaccountlist: [],
      schoolgroupcontingentlist: [],

      departmentlist: [],
      positionlist: [],
      qualificationcategorylist: [],
      tariffscaletypelist: [],
      tariffscalelist: [],
      tariffscaletablelist: [],
      fixedvalue: [],
      isdisabled: false,
      StaffingStaffingPositionTables: [
        {
          key: "departmentname",
          label: this.$t("Department"),
          class: "text-left",
        },
        {
          key: "positionname",
          label: this.$t("Position"),
          class: "text-left",
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("QualificationCategory"),
          class: "text-left",
        },
        {
          key: "quantity",
          label: this.$t("Quantity"),
        },
        {
          key: "formonths",
          label: this.$t("formonths"),
        },
        {
          key: "tariffscaletype",
          label: this.$t("tariffscaletype"),
          class: "text-left",
        },
        {
          key: "tariffscale",
          label: this.$t("TariffScale"),
          class: "text-left",
        },
        {
          key: "rankname",
          label: this.$t("Rank"),
        },
        {
          key: "corrcoef",
          label: this.$t("Corrcoef"),
        },
        {
          key: "salary",
          label: this.$t("salary"),
          class: "text-right",
        },
        {
          key: "staffingcalckindnames",
          label: this.$t("staffingcalckindnames"),
          class: "text-left",
        },
        {
          key: "fot",
          label: this.$t("fot"),
          class: "text-right",
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      StaffingIndicatorValueTables: [
        {
          key: "staffingindicatorid",
          label: this.$t("OrderNumber"),
        },
        {
          key: "staffingindicatorname",
          label: this.$t("staffingindicator"),
        },
        {
          key: "quantity",
          label: this.$t("quantity"),
        },
        {
          key: "totalsum",
          label: this.$t("totalsum"),
          class: "text-right",
        },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        quantity: 1,
        tariffscaletypeid: 0,
        tariffscaleid: 0,
        rankid: 0,
        rankname: "",
        rankcode: "",
        rankcoef: 0,
        corrcoef: 1,
        salary: 0,
        fot: 0,
        formonths: 12,
        fixedvalue: 0,
        schoolgroupcontingentid: 0,
        ownerdocdate: "",
        StaffingCalcKindTables: [],
        Status: 1,
      },

      minimumvaluetypeid: 0,
      oldquantity: 0,
      totalsum: 0,
      totalquantity: 0,
      calckindtotalsum: 0,

      currentcalckindfields: [
        {
          key: "calculationkindname",
          label: this.$t("calculationkind"),
        },
        {
          key: "calccoef",
          label: this.$t("calccoef"),
        },
        {
          key: "calcsum",
          label: this.$t("calcsum"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      rowtotalsum: 0,
      calculationkindlist: [],
      calckindtabrow: {
        id: 0,
        ownerid: 0,
        calculationkindid: 0,
        calculationkindname: "",
        calccoef: 0,
        calcsum: 0,
        Status: 1,
      },
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    CalculationKindService.GetAll().then((res) => {
      self.calculationkindlist = res.data;
    });
    HelperService.GetTariffScaleTypeList().then((res) => {
      self.tariffscaletypelist = res.data;
    });
    QualificationCategoryService.GetAll().then((res) => {
      self.qualificationcategorylist = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      self.departmentlist = res.data;
    });
    SchoolGroupContingentService.GetAll().then((res) => {
      self.schoolgroupcontingentlist = res.data;
    });
    OrganizationService.GetOrganizationAccountList().then((res) => {
      self.organizationaccountlist = res.data;
    });
    HelperService.GetStaffingType().then((res) => {
      self.staffingtypelist = res.data;
    });
    StaffingService.Get(self.selectedrowid).then((res) => {
      self.Staffing = res.data;
      self.calculatetotal();
    });
  },
  methods: {
    getposition() {
      var self = this;
      if (self.tabrow.departmentid > 0) {
        HROrgStructureService.GetAll(
          self.tabrow.departmentid,
          self.Staffing.startdate
        ).then((res) => {
          self.positionlist = res.data;
        });
      }
    },
    gettariffscale() {
      var self = this;
      self.basictariffrate = 0;
      /* self.tabrow.salary = 0; */
      /* self.tabrow.fot = 0; */
      if (self.tabrow.tariffscaletypeid === 1) {
        TariffScaleService.GetAll(self.tabrow.tariffscaletypeid).then((res) => {
          self.tariffscalelist = res.data;
        });
      } else {
        /* if(self.tabrow.positionid !==0 && self.tabrow.positionid !==null && self.tabrow.positionid !==undefined)
        {
          if( self.tabrow.qualificationcategoryid === null && self.tabrow.qualificationcategoryid === undefined )
          self.tabrow.qualificationcategoryid = 0;
        BasicTariffRateService.GetBasicTariffRateIsPosition(
          self.tabrow.qualificationcategoryid,
          self.Staffing.docdate,
          self.tabrow.positionid,
          self.Staffing.schoolgroupcontingentid
        ).then((res) => {
          self.basictariffrate = res.data;
          self.tabrowtotalsumcalc();
        }).catch((error) => {
          self.tabrow.salary = 0;
          self.tabrow.fot = 0;
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
        }
        else
        {
          self.basictariffrate = 0;
          self.tabrowtotalsumcalc();
        } */
      }
    },
    gettariffscaletable() {
      var self = this;
      if (self.tabrow.tariffscaleid > 0) {
        TariffScaleService.GetAllTableList(self.tabrow.tariffscaleid).then(
          (res) => {
            self.tariffscaletablelist = res.data;
          }
        );
      }
    },
    getfixedvalue() {
      var self = this;

      /*    FixedMinimumValueService.GetMinimumValue(          
          self.Staffing.docdate,self.tabrow.tariffscaleid,7
        ).then((res) => {
          self.tabrow.fixedvalue = res.data.fixedvalue;
        }); */
    },
    positionchange() {
      var self = this;
      if (self.tabrow.positionid > 0 && self.positionlist.length > 0) {
        self.oldquantity = self.positionlist.filter(function(item) {
          if (item.positionid === self.tabrow.positionid) return item;
        })[0].ratecount;
        self.tabrow.quantity = self.positionlist.filter(function(item) {
          if (item.positionid === self.tabrow.positionid) return item;
        })[0].ratecount;
        self.tabrow.tariffscaletypeid = self.positionlist.filter(function(
          item
        ) {
          if (item.positionid === self.tabrow.positionid) return item;
        })[0].tariffscaletypeid;
      }

      /* self.tabrowtotalsumcalc(); */
    },

    tariffscalechange() {
      var self = this;
      self.gettariffscaletable();
      if (self.tariffscalelist.length > 0) {
        self.minimumvaluetypeid = self.tariffscalelist.filter(function(item) {
          if (item.id === self.tabrow.tariffscaleid) return item;
        })[0].minimumvaluetypeid;
        self.minimumvaluetypeid;
      }
      self.getfixedvalue();
    },
    tariffscaletablechange() {
      var self = this;
      if (self.tariffscaletablelist.length > 0) {
        self.tabrow.rankcoef = self.tariffscaletablelist.filter(function(item) {
          if (item.rankcode === self.tabrow.rankcode) return item;
        })[0].coef;
        self.tabrow.rankname = self.tariffscaletablelist.filter(function(item) {
          if (item.rankcode === self.tabrow.rankcode) return item;
        })[0].rankname;
        self.tabrow.rankid = self.tariffscaletablelist.filter(function(item) {
          if (item.rankcode === self.tabrow.rankcode) return item;
        })[0].tariffscaletableid;
        /* self.RecalcData(); */
        /*  self.tabrowtotalsumcalc(); */
      }
    },
    tabrowtotalsumcalc() {
      var self = this;
      var coef = 0;

      if (self.tabrow.tariffscaletypeid === 1) {
        self.tabrow.rankcoef;
        self.tabrow.corrcoef;
        self.tabrow.fixedvalue;
        if (self.tabrow.corrcoef > 0) {
          coef = self.tabrow.rankcoef * self.tabrow.corrcoef;
        } else {
          coef = self.tabrow.rankcoef;
        }
        self.tabrow.salary = self.roundToTwo(
          coef * self.tabrow.fixedvalue * self.tabrow.quantity,
          0
        );
      } else {
        if (self.tabrow.corrcoef > 0) {
          self.tabrow.salary =
            self.tabrow.corrcoef * self.basictariffrate * self.tabrow.quantity;
        } else {
          self.tabrow.salary = self.basictariffrate * self.tabrow.quantity;
        }
      }

      self.calckindclaculate();
    },
    DisabledItem() {
      var self = this;
      if (self.isdisabled) {
        return true;
      } else {
        return false;
      }
    },
    check() {
      var self = this;
      if (
        self.Staffing.docnumber === null ||
        self.Staffing.docnumber === undefined ||
        self.Staffing.docnumber === 0 ||
        self.Staffing.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Staffing.docdate === null ||
        self.Staffing.docdate === undefined ||
        self.Staffing.docdate === 0 ||
        self.Staffing.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Staffing.financeyear === null ||
        self.Staffing.financeyear === undefined ||
        self.Staffing.financeyear === 0 ||
        self.Staffing.financeyear === ""
      ) {
        this.makeToast(
          this.$t("FinanceYearNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Staffing.staffingtypeid === null ||
        self.Staffing.staffingtypeid === undefined ||
        self.Staffing.staffingtypeid === 0
      ) {
        this.makeToast(
          this.$t("StaffingTypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Staffing.organizationaccountid === null ||
        self.Staffing.organizationaccountid === undefined ||
        self.Staffing.organizationaccountid === 0
      ) {
        this.makeToast(
          this.$t("organizationaccountNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Staffing.schoolgroupcontingentid === null ||
        self.Staffing.schoolgroupcontingentid === undefined ||
        self.Staffing.schoolgroupcontingentid === 0
      ) {
        this.makeToast(
          this.$t("SchoolgroupcontingentNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      var tableitemscount = 0;
      tableitemscount = self.Staffing.StaffingPositionTables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        this.makeToast(this.$t("TableNotfull"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    checktabrowdata() {
      var self = this;
      if (
        self.tabrow.departmentid === null ||
        self.tabrow.departmentid === undefined ||
        self.tabrow.departmentid === 0
      ) {
        this.makeToast(
          this.$t("departmentNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.tabrow.positionid === null ||
        self.tabrow.positionid === undefined ||
        self.tabrow.positionid === 0
      ) {
        this.makeToast(
          this.$t("PositionNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      /*       if (
        self.tabrow.qualificationcategoryid === null ||
        self.tabrow.qualificationcategoryid === undefined ||
        self.tabrow.qualificationcategoryid === 0
      ) {
        this.makeToast(
          this.$t("QualificationCategoryNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.tabrow.quantity === null ||
        self.tabrow.quantity === undefined ||
        self.tabrow.quantity === 0
      ) {
        this.makeToast(
          this.$t("QuantityNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.tariffscaletypeid === null ||
        self.tabrow.tariffscaletypeid === undefined ||
        self.tabrow.tariffscaletypeid === 0
      ) {
        this.makeToast(
          this.$t("TariffScaleTypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow.tariffscaletypeid === 1) {
        if (
          self.tabrow.tariffscaleid === null ||
          self.tabrow.tariffscaleid === undefined ||
          self.tabrow.tariffscaleid === 0
        ) {
          this.makeToast(
            this.$t("TariffScaleNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.rankcode === null ||
          self.tabrow.rankcode === undefined ||
          self.tabrow.rankcode === 0
        ) {
          this.makeToast(
            this.$t("RankCodeNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.rankid === null ||
          self.tabrow.rankid === undefined ||
          self.tabrow.rankid === 0
        ) {
          this.makeToast(
            this.$t("rankNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        self.tabrow.tariffscale = self.tariffscalelist.filter(function(item) {
          if (item.id === self.tabrow.tariffscaleid) return item;
        })[0].name;
      } else {
        self.tabrow.tariffscaleid = 0;
        self.tabrow.rankcode = "";
      }

      if (
        self.tabrow.formonths === null ||
        self.tabrow.formonths === undefined ||
        self.tabrow.formonths === 0
      ) {
        this.makeToast(
          this.$t("ForMonthsNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.oldquantity < self.tabrow.quantity) {
        this.makeToast(
          this.$t("quantity") + ":" + self.oldquantity,
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
      StaffingService.Update(self.Staffing)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "Staffing",
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
    fillTable() {
      var self = this;
      self.Staffing.StaffingPositionTables.forEach(function(item) {
        item.Status = 3;
      });
      StaffingService.FillStaffingTableWithTemplote(self.Staffing)
        .then((res) => {
          res.data.StaffingPositionTables.forEach(function(item) {
            if (item.Status !== 3)
              self.Staffing.StaffingPositionTables.push(item);
          });
          self.calculatetotal();
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
      self.calckindtotalsum = 0;
      self.tabrow = {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        quantity: 1,
        tariffscaletypeid: 0,
        tariffscaleid: 0,
        rankid: 0,
        rankname: "",
        rankcode: "",
        rankcoef: 0,
        corrcoef: 1,
        salary: 0,
        fot: 0,
        formonths: 12,
        fixedvalue: 0,
        schoolgroupcontingentid: 0,
        ownerdocdate: self.Staffing.ownerdocdate,
        schoolgroupcontingentid: self.Staffing.schoolgroupcontingentid,
        StaffingCalcKindTables: [],
        staffingcalckindnames: "",
        Status: 1,
      };
      self.isdisabled = true;
      self.getfixedvalue();
      self.$bvModal.show("AddModal");
    },
    AddData() {
      var self = this;
      if (!self.checktabrowdata()) {
        return false;
      }
      /* self.RecalcData(); */
      var StaffingCalcKindTablescalcsum = 0;
      var StaffingCalcKindTablescalculationkindname = "";
      self.tabrow.StaffingCalcKindTables.forEach(function(item) {
        if (item.Status !== 3 && item.calcsum === 0) {
          StaffingCalcKindTablescalcsum = item.calcsum;
          StaffingCalcKindTablescalculationkindname = item.calculationkindname;
        }
      });
      console.log(StaffingCalcKindTablescalcsum);
      if (StaffingCalcKindTablescalculationkindname != "") {
        this.makeToast(
          this.$t("calculationkindnameNot") +
            ": " +
            StaffingCalcKindTablescalculationkindname,
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.tabrow.fot === null ||
        self.tabrow.fot === undefined ||
        self.tabrow.fot === 0
      ) {
        this.makeToast(this.$t("FotNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;
      self.tabrow.positionname = self.positionlist.filter(function(item) {
        if (item.positionid === self.tabrow.positionid) return item;
      })[0].positionidname;
      if (self.tabrow.qualificationcategoryid > 0) {
        self.tabrow.qualificationcategoryname = self.qualificationcategorylist.filter(
          function(item) {
            if (item.id === self.tabrow.qualificationcategoryid) return item;
          }
        )[0].name;
      } else self.tabrow.qualificationcategoryname = null;
      self.tabrow.tariffscaletype = self.tariffscaletypelist.filter(function(
        item
      ) {
        if (item.id === self.tabrow.tariffscaletypeid) return item;
      })[0].name;

      if (self.tabrow.id === 0) {
        var addrow = true;
        self.Staffing.StaffingPositionTables.forEach(function(item) {
          if (
            item.departmentid === self.tabrow.departmentid &&
            item.positionid === self.tabrow.positionid &&
            item.id === 0
          ) {
            item.departmentid = self.tabrow.departmentid;
            item.departmentname = self.tabrow.departmentname;
            item.positionid = self.tabrow.positionid;
            item.positionidname = self.tabrow.positionidname;
            item.qualificationcategoryid = self.tabrow.qualificationcategoryid;
            item.qualificationcategoryname =
              self.tabrow.qualificationcategoryname;
            item.quantity = self.tabrow.quantity;
            item.tariffscaletypeid = self.tabrow.tariffscaletypeid;
            item.tariffscaleid = self.tabrow.tariffscaleid;
            item.rankid = self.tabrow.rankid;
            item.rankname = self.tabrow.rankname;
            item.rankcode = self.tabrow.rankcode;
            item.rankcoef = self.tabrow.rankcoef;
            item.corrcoef = self.tabrow.corrcoef;
            item.salary = self.tabrow.salary;
            item.fot = self.tabrow.fot;
            item.formonths = self.tabrow.formonths;
            item.fixedvalue = self.tabrow.fixedvalue;
            item.ownerdocdate = self.tabrow.ownerdocdate;
            item.schoolgroupcontingentid = self.tabrow.schoolgroupcontingentid;
            item.StaffingCalcKindTables = self.tabrow.StaffingCalcKindTables;
            item.Status = 1;
            addrow = false;
            var kindname = "";
            self.tabrow.StaffingCalcKindTables.forEach(function(item) {
              if (item.Status !== 3) {
                if (kindname === "")
                  kindname =
                    item.calculationkindname + "(" + item.calcsum + ")";
                else {
                  kindname =
                    kindname +
                    "," +
                    item.calculationkindname +
                    "(" +
                    item.calcsum +
                    ")";
                }
              }
            });
            item.staffingcalckindnames = kindname;
          }
        });
        if (addrow) {
          var kindname = "";
          self.tabrow.StaffingCalcKindTables.forEach(function(item) {
            if (item.Status !== 3) {
              if (kindname === "")
                kindname = item.calculationkindname + "(" + item.calcsum + ")";
              else {
                kindname =
                  kindname +
                  ", " +
                  item.calculationkindname +
                  "(" +
                  item.calcsum +
                  ")";
              }
            }
          });
          self.tabrow.staffingcalckindnames = kindname;
          self.Staffing.StaffingPositionTables.push(self.tabrow);
          self.tabrow = {
            id: 0,
            ownerid: 0,
            departmentid: 0,
            departmentname: "",
            positionid: 0,
            positionname: "",
            qualificationcategoryid: 0,
            qualificationcategoryname: "",
            quantity: 1,
            tariffscaletypeid: 0,
            tariffscaleid: 0,
            rankid: 0,
            rankname: "",
            rankcode: "",
            rankcoef: 0,
            corrcoef: 1,
            salary: 0,
            fot: 0,
            formonths: 12,
            fixedvalue: 0,
            ownerdocdate: "",
            schoolgroupcontingentid: 0,
            StaffingCalcKindTables: [],
            staffingcalckindnames: "",
            Status: 1,
          };
        }
      } else {
        self.Staffing.StaffingPositionTables.forEach(function(item) {
          if (item.id === self.tabrow.id) {
            item.departmentid = self.tabrow.departmentid;
            item.departmentname = self.tabrow.departmentname;
            item.positionid = self.tabrow.positionid;
            item.positionidname = self.tabrow.positionidname;
            item.qualificationcategoryid = self.tabrow.qualificationcategoryid;
            item.qualificationcategoryname =
              self.tabrow.qualificationcategoryname;
            item.quantity = self.tabrow.quantity;
            item.tariffscaletypeid = self.tabrow.tariffscaletypeid;
            item.tariffscaleid = self.tabrow.tariffscaleid;
            item.rankid = self.tabrow.rankid;
            item.rankname = self.tabrow.rankname;
            item.rankcode = self.tabrow.rankcode;
            item.rankcoef = self.tabrow.rankcoef;
            item.corrcoef = self.tabrow.corrcoef;
            item.salary = self.tabrow.salary;
            item.fot = self.tabrow.fot;
            item.formonths = self.tabrow.formonths;
            item.fixedvalue = self.tabrow.fixedvalue;
            item.ownerdocdate = self.tabrow.ownerdocdate;
            item.schoolgroupcontingentid = self.tabrow.schoolgroupcontingentid;
            item.StaffingCalcKindTables = self.tabrow.StaffingCalcKindTables;
            item.Status = 2;
            var kindname = "";
            self.tabrow.StaffingCalcKindTables.forEach(function(item1) {
              if (item1.Status !== 3) {
                if (kindname === "")
                  kindname =
                    item1.calculationkindname + "(" + item1.calcsum + ")";
                else {
                  kindname =
                    kindname +
                    ", " +
                    item1.calculationkindname +
                    "(" +
                    item1.calcsum +
                    ")";
                }
              }
            });
            item.staffingcalckindnames = kindname;
          }
        });
        self.tabrow = {
          iid: 0,
          ownerid: 0,
          departmentid: 0,
          departmentname: "",
          positionid: 0,
          positionname: "",
          qualificationcategoryid: 0,
          qualificationcategoryname: "",
          quantity: 1,
          tariffscaletypeid: 0,
          tariffscaleid: 0,
          rankid: 0,
          rankname: "",
          rankcode: "",
          rankcoef: 0,
          corrcoef: 1,
          salary: 0,
          fot: 0,
          formonths: 12,
          fixedvalue: 0,
          schoolgroupcontingentid: 0,
          fixedvalue: 0,
          StaffingCalcKindTables: [],
          staffingcalckindnames: "",
          Status: 1,
        };
      }
      self.$bvModal.hide("AddModal");
      self.calculatetotal();
    },
    EditRow(item) {
      var self = this;
      self.tabrow = {
        id: item.id,
        ownerid: item.ownerid,
        departmentid: item.departmentid,
        departmentname: item.departmentname,
        positionid: item.positionid,
        positionname: item.positionname,
        qualificationcategoryid: item.qualificationcategoryid,
        qualificationcategoryname: item.qualificationcategoryname,
        quantity: item.quantity,
        tariffscaletypeid: item.tariffscaletypeid,
        tariffscaleid: item.tariffscaleid,
        rankid: item.rankid,
        rankname: item.rankname,
        rankcode: item.rankcode,
        corrcoef: item.corrcoef,
        salary: item.salary,
        fot: item.fot,
        formonths: item.formonths,
        fixedvalue: item.fixedvalue,
        ownerdocdate: self.Staffing.ownerdocdate,
        schoolgroupcontingentid: self.Staffing.schoolgroupcontingentid,
        StaffingCalcKindTables: item.StaffingCalcKindTables,
        staffingcalckindnames: item.staffingcalckindnames,
        Status: 2,
      };
      self.oldquantity = item.quantity;
      self.tabrow.StaffingCalcKindTables.forEach(function(item) {
        if (item.Status === 0) item.Status = 2;
      });
      self.getposition();
      self.gettariffscale();
      self.gettariffscaletable();
      self.calckindclaculate();
      this.$bvModal.show("AddModal");
    },
    DeleteRow(item) {
      var self = this;
      item.Status = 3;
      self.calckindclaculate();
      self.calculatetotal();
    },
    RecalcData() {
      var self = this;
      if (!self.checktabrowdata()) {
        return false;
      }

      /* if (self.tabrow.StaffingCalcKindTables.filter(function (item) {
        if (item.Status !== 3) return item;
      }).length===0) {
        this.makeToast(
          this.$t("TablesNot"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      self.tabrow.ownerdocdate = self.Staffing.docdate;
      self.tabrow.schoolgroupcontingentid =
        self.Staffing.schoolgroupcontingentid;
      StaffingService.RecalcStaffingCalcKindTables(self.tabrow)
        .then((res) => {
          self.tabrow.StaffingCalcKindTables.forEach(function(item) {
            item.Status = 3;
          });
          self.tabrow.salary = res.data.salary;
          self.tabrow.fot = res.data.fot;
          self.tabrow.fixedvalue = res.data.fixedvalue;
          self.calckindtotalsum = 0;

          res.data.StaffingCalcKindTables.forEach(function(item) {
            if (item.Status != 3) {
              self.tabrow.StaffingCalcKindTables.push(item);
              self.calckindtotalsum = self.calckindtotalsum + item.calcsum * 1;
            }
          });

          self.isdisabled = false;
          /*  self.calckindclaculate(); */
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.calckindclaculate();
        });
      /* .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        }); */
    },
    ClearTable() {
      var self = this;
      self.tabrow.salary = 0;
      self.tabrow.fot = 0;
      self.calckindtotalsum = 0;
      self.isdisabled = true;
    },
    addcalckindRow() {
      var self = this;
      if (
        self.calckindtabrow.calculationkindid === null ||
        self.calckindtabrow.calculationkindid === undefined ||
        self.calckindtabrow.calculationkindid === 0
      ) {
        this.makeToast(
          this.$t("CalculationKindNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      if (
        self.calckindtabrow.calccoef === null ||
        self.calckindtabrow.calccoef === undefined ||
        self.calckindtabrow.calccoef === 0
      ) {
        this.makeToast(
          this.$t("CalcCoefNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      /* if (
        self.calckindtabrow.calcsum === null ||
        self.calckindtabrow.calcsum === undefined ||
        self.calckindtabrow.calcsum === 0
      ) {
        this.makeToast(
          this.$t("calcsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      } */

      self.calckindtabrow.calculationkindname = self.calculationkindlist.filter(
        function(item) {
          if (item.id === self.calckindtabrow.calculationkindid) return item;
        }
      )[0].name;
      var dublicate = false;
      self.tabrow.StaffingCalcKindTables.forEach(function(item) {
        if (
          item.Status !== 3 &&
          item.calculationkindid === self.calckindtabrow.calculationkindid
        )
          dublicate = true;
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + ": " + self.calckindtabrow.calculationkindname,
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      self.tabrow.StaffingCalcKindTables.push(self.calckindtabrow);
      self.calckindtabrow = {
        id: 0,
        ownerid: 0,
        calculationkindid: 0,
        calculationkindname: "",
        calccoef: 0,
        calcsum: 0,
        Status: 1,
      };
      self.isdisabled = true;
      self.calckindclaculate();
    },

    calckindclaculate() {
      var self = this;
      self.calckindtotalsum = 0;
      self.tabrow.StaffingCalcKindTables.forEach(function(item) {
        if (item.Status !== 3) {
          /*  item.calcsum = self.roundToTwo(
            (self.tabrow.salary * item.calccoef) / 100,
            0
          ); */
          self.calckindtotalsum = self.calckindtotalsum + item.calcsum * 1;
        }
      });
      console.log(self.tabrow.salary);
      self.tabrow.fot = self.tabrow.salary + self.calckindtotalsum;
    },

    calculatetotal() {
      var self = this;
      var stablelfot = 0;
      var stablequantity = 0;
      var totalstablelfot = 0;

      var seasonalfot = 0;
      var seasonalquantity = 0;
      var totalseasonalfot = 0;

      var stableandseasonalfot = 0;
      var stableandseasonalquantity = 0;
      var totalstableandseasonalfot = 0;

      self.Staffing.StaffingPositionTables.forEach(function(item) {
        if (item.Status !== 3) {
          if (item.formonths === 12) {
            stablelfot = stablelfot + item.fot * 1;
            totalstablelfot =
              totalstablelfot + item.fot * self.Staffing.formonths;
            stablequantity = stablequantity + item.quantity * 1;
          } else if (item.formonths === 5) {
            seasonalfot = seasonalfot + item.fot * 1;
            totalseasonalfot =
              totalseasonalfot +
              item.fot *
                (item.formonths > self.Staffing.formonths
                  ? self.Staffing.formonths
                  : item.formonths);
            seasonalquantity = seasonalquantity + item.quantity * 1;
          } else {
            stableandseasonalfot = stableandseasonalfot + item.fot * 1;
            totalstableandseasonalfot =
              totalstableandseasonalfot +
              item.fot *
                (item.formonths > self.Staffing.formonths
                  ? self.Staffing.formonths
                  : item.formonths);
            stableandseasonalquantity =
              stableandseasonalquantity + item.quantity * 1;
          }
        }
      });

      self.totalsum = stablelfot + seasonalfot + stableandseasonalfot;
      self.totalquantity =
        stablequantity + seasonalquantity + stableandseasonalquantity;

      var rowvalue1 = 0;
      var rowvalue2 = 0;
      var rowvalue3 = 0;
      var rowvalue4 = 0;
      var rowvalue5 = 0;
      var rowvalue6 = 0;
      var rowvalue6 = 0;
      var rowvalue7 = 0;
      var rowvalue8 = 0;
      var rowvalue9 = 0;
      var rowvalue10 = 0;
      var rowvalue11 = 0;
      var rowvalue12 = 0;
      var rowvalue13 = 0;
      var rowvalue14 = 0;
      var rowvalue15 = 0;
      var rowvalue16 = 0;
      var rowvalue17 = 0;
      var rowvalue18 = 0;
      self.Staffing.IndicatorValueTables.forEach(function(item) {
        // Жами муқим ишчилар
        if (item.staffingindicatorid === 1) {
          item.totalsum = self.roundToTwo(stablelfot, 0);
          item.quantity = stablequantity;
          rowvalue1 = item.totalsum;
        }
        // Жами мавсумий ишчилар
        if (item.staffingindicatorid === 2) {
          item.totalsum = self.roundToTwo(seasonalfot, 0);
          item.quantity = seasonalquantity;
          rowvalue2 = item.totalsum;
        }
        // Жами муқим-мавсумий ишчилар
        if (item.staffingindicatorid === 3) {
          item.totalsum = self.roundToTwo(stableandseasonalfot, 0);
          item.quantity = stableandseasonalquantity;
          rowvalue3 = item.totalsum;
        }
        // Маъмурий бошқарув/ Маъмурий-хўжалик/ ўқув-ёрдамчи ва бошқа ходимлар ойлик иш ҳақи жамғармаси
        if (item.staffingindicatorid === 4) {
          item.totalsum = self.roundToTwo(self.totalsum, 0);
          item.quantity = self.totalquantity;
          rowvalue4 = item.totalsum;
        }
        // Шунинг ўзи бир йилда
        if (item.staffingindicatorid === 5) {
          item.totalsum = self.roundToTwo(
            totalstablelfot + totalseasonalfot + totalstableandseasonalfot,
            0
          );
          item.quantity = self.totalquantity;
          rowvalue5 = item.totalsum;
        }
        // Шунинг ўзи бир йилда касаллик варақаси ва вакансиялар иқтисодидан ҳисоблаганда
        if (item.staffingindicatorid === 6) {
          item.totalsum = self.roundToTwo(rowvalue5 * 0.98, 0);
          rowvalue6 = item.totalsum;
        }
        // Тарификация бўйича ходимларнинг иш ҳақи фонди (педагогик) бир ойда
        if (item.staffingindicatorid === 7) {
          rowvalue7 = item.totalsum;
        }
        // (Шунинг ўзи бир йилда) Тарификация бўйича ходимларнинг иш ҳақи фонди (педагогик) бир йил
        if (item.staffingindicatorid === 8) {
          item.totalsum = self.roundToTwo(
            rowvalue7 * self.Staffing.formonths,
            0
          );
          rowvalue8 = item.totalsum;
        }
        // Соатбай (келишув асосида) ойлик иш ҳақи бир йилга
        if (item.staffingindicatorid === 9) {
          rowvalue9 = item.totalsum;
        }
        // Таътил пайтида/ навбатчиликда/байрамда/тунги вақтда ишчиларни алмаштириш учун йиллик иш ҳақи фонди
        if (item.staffingindicatorid === 10) {
          rowvalue10 = item.totalsum;
        }
        //  Моддий рағбатлантиришга/моддий ёрдам беришга/узоқ йиллик меҳнати учун бир марталик тўлов
        if (item.staffingindicatorid === 11) {
          rowvalue11 = item.totalsum;
        }
        // Махсус унвон ва узоқ йиллик меҳнати учун ҳар ойлик бериладиган иш ҳақи фонди
        if (item.staffingindicatorid === 12) {
          rowvalue12 = item.totalsum;
        }
        // Йиллик бюджет муассасалари ва ташкилотлари ходимларини моддий рағбатлантиришнинг махсус жамғармаси
        if (item.staffingindicatorid === 13) {
          rowvalue13 = item.totalsum;
        }
        // Таълим муассасаларида йиллик директор фонди
        if (item.staffingindicatorid === 14) {
          item.totalsum = self.roundToTwo(
            (rowvalue6 + rowvalue8 + rowvalue9) * 0.12,
            0
          );
          rowvalue14 = item.totalsum;
        }
        //  Касаллик варақаси тўлови бир йилга
        if (item.staffingindicatorid === 15) {
          item.totalsum = self.roundToTwo(
            (rowvalue6 + rowvalue8 + rowvalue9) * 0.01,
            0
          );
          rowvalue15 = item.totalsum;
        }
        // Жами йиллик иш ҳақи фонди
        if (item.staffingindicatorid === 16) {
          item.totalsum =
            rowvalue6 +
            rowvalue8 +
            rowvalue9 +
            rowvalue10 +
            rowvalue14 +
            rowvalue15;
          self.Staffing.docsum = item.totalsum;
        }
      });
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
  watch: {
    "tabrow.departmentid": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (newValue!=oldValue) {
          self.tabrow.positionid = null;
          self.positionlist = [];
        } */
        if (newValue) {
          self.getposition();
        }
      },
    },
    "tabrow.positionid": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (oldValue) {
          self.tabrow.quantity = 0;
          self.tabrow.tariffscaletypeid = 0;
          self.tabrow.tariffscaleid = 0;
        } */
        if (newValue) {
          self.positionchange();
        }
        this.gettariffscale();
      },
    },
    "tabrow.qualificationcategoryid": {
      handler(newValue, oldValue) {
        var self = this;
        this.gettariffscale();
      },
    },
    "tabrow.tariffscaletypeid": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (oldValue) {
          self.tabrow.tariffscaleid = 0;
          self.tariffscalelist = [];
        } */
        if (newValue) {
          this.gettariffscale();
        }
      },
    },
    "tabrow.tariffscaleid": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (oldValue) {
          self.tabrow.rankcode = "";
          self.tabrow.rankname = "";
          self.tariffscaletablelist = [];
        } */
        if (newValue) {
          self.tariffscalechange();
        }
      },
    },
    "tabrow.rankcode": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (oldValue) {
          self.tabrow.salary = 0;
          self.tabrow.rankname = "";
        } */
        if (newValue) {
          /* console.log("94+9849+4894"); */
          self.tariffscaletablechange();
        }
      },
    },
  },
};
</script>

<style></style>
