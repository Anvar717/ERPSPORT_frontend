<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("SportOrgRating") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'SportOrgRating' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <b-row>
        <b-col cols="12" md="10" lg="10">
          <b-row class="ml-4">
                  <b-col sm="6" lg="6" class="fname-select">
                    <ValidationProvider
                      v-slot="v"
                      name="docnumber"
                      rules="required"
                    >
                      <CInput
                        disabled
                        :label="$t('docnumber')"
                        autocomplete="text"
                        v-model="SportOrgRating.docnumber"
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
                  </b-col>
                  <b-col sm="6" lg="6" class="achievement-input fname-select">
                    <label>{{ $t("docdate") }}</label>
                    <date-picker
                      disabled
                      v-model="SportOrgRating.docdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      style="width: 100%"
                    ></date-picker>
                  </b-col>
          </b-row>
          <b-row class="ml-4">
            <b-col sm="6" lg="6" md="6">
                    <label>{{ $t("SchoolYear") }}</label>
                    <v-select
                      :options="SchoolYearList"
                      disabled
                      v-model="SportOrgRating.schoolyearid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </b-col>
                  <b-col sm="6" lg="6" md="6">
                    <label>{{ $t("ratingperiod") }}</label>
                    <v-select
                      :options="ratingperiodlist"
                      disabled
                      v-model="SportOrgRating.ratingperiodid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="ratingperiodname"
                    ></v-select>
                  </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" md="2" lg="2" class="mt-2">
          <b-button  @click="$router.push({ name: 'SportOrgRating' })" size="sm" variant="danger" class="w-100 mb-1 mr-3">
            <b-icon-arrow-left-short scale="1.7" />
            {{ $t("back") }}
          </b-button>
          <b-button
          v-if="$can('SportOrgRatingApprove', 'permissions') && SportOrgRating.statusid != 2 && SportOrgRating.statusid != 8  && SportOrgRating.statusid != 9"
            @click="OpenApproveModal"
            size="sm"
            variant="primary"
            class="w-100 mb-1 mr-3"
          >
            <b-icon scale="1.4" icon="check2"></b-icon>
            {{ $t("Approve") }}
          </b-button>
          <b-button
          v-if="$can('SportOrgRatingCancelApproval', 'permissions') && SportOrgRating.statusid == 2"
            @click="OpenCancelApproveModal"
            size="sm"
            variant="danger"
            class="w-100 mb-1 mr-3"
          >
            <b-icon icon="x" scale="1.5"></b-icon>
            {{ $t("CancelApproval") }}
          </b-button>
          <b-button
            v-if="SportOrgRating.CanSend"
            @click="$refs['SendModal'].show()"
            size="sm"
            variant="success"
            class="w-100 mb-1 mr-3"
          >
            {{ $t("Send") }}
          </b-button>
        </b-col>
        <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
          <template #modal-title>
            {{ $t("Approve") }}
            <b-spinner v-if="ApproveLoading" small></b-spinner>
          </template>
          <b-card-text class="mt-3">
            <h5>{{ $t("id") }} : {{ SportOrgRating.id }}</h5>
            <span>
              <h5>{{ $t("docnumber") }} : {{ SportOrgRating.docnumber }}</h5></span
            >
            <h5>{{ $t("WantApprove") }}</h5>
          </b-card-text>
          <b-row>
            <b-col class="text-right">
              <b-button
                class="mr-2"
                variant="danger"
                @click="$refs['ApproveModal'].hide()"
              >
                {{ $t("Cancel") }}
              </b-button>
              <b-button variant="success" @click="Approve">
                {{ $t("Accept") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal :ref="'CancelApprovalModal'" hide-footer no-close-on-backdrop>
          <template #modal-title>
            {{ $t("CancelApproval") }}
            <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
          </template>
          <b-card-text class="mt-3">
            <h5>{{ $t("id") }} : {{ SportOrgRating.id }}</h5>
            <span>
              <h5>{{ $t("docnumber") }} : {{ SportOrgRating.docnumber }}</h5></span
            >
            <h5>{{ $t("WantCancelApproval") }}</h5>
          </b-card-text>
          <!-- <b-row class="mt-2">
          <b-col>
            <label for=""> {{ $t('Reason') }} </label>
            <b-form-textarea v-model="CancelApproveData.returnReason"></b-form-textarea>
          </b-col>
        </b-row> -->
          <b-row class="mt-2">
            <b-col class="text-right">
              <b-button
                class="mr-2"
                variant="danger"
                @click="$refs['CancelApprovalModal'].hide()"
              >
                {{ $t("Cancel") }}
              </b-button>
              <b-button variant="success" @click="CancelApproval">
                {{ $t("Accept") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal
          :ref="'SendModal'"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Send(SportOrgRating)"
        >
          <template #modal-title>
            {{ $t("Send") }} <b-spinner v-if="SendLoading" small></b-spinner>
          </template>
          <b-card-text>
            <h5>{{ $t("id") }} : {{ SportOrgRating.id }}</h5>
            <span>
              <h5>{{ $t("name") }} : {{ SportOrgRating.personname }}</h5></span
            >
            <h5>{{ $t("WantSend") }}</h5>
          </b-card-text>
        </b-modal>
      </b-row>
        <!-- <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CCard sm="8">
              <CCardBody sm="6">
                <CRow>
                  <CCol sm="3" lg="3" class="fname-select">
                    <ValidationProvider
                      v-slot="v"
                      name="docnumber"
                      rules="required"
                    >
                      <CInput
                        disabled
                        :label="$t('docnumber')"
                        autocomplete="text"
                        v-model="SportOrgRating.docnumber"
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
                      disabled
                      v-model="SportOrgRating.docdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      style="width: 100%"
                    ></date-picker>
                  </CCol>
                  <CCol sm="3">
                    <label>{{ $t("SchoolYear") }}</label>
                    <v-select
                      :options="SchoolYearList"
                      disabled
                      v-model="SportOrgRating.schoolyearid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </CCol>
                  <CCol sm="3">
                    <label>{{ $t("ratingperiod") }}</label>
                    <v-select
                      :options="ratingperiodlist"
                      disabled
                      v-model="SportOrgRating.ratingperiodid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="ratingperiodname"
                    ></v-select>
                  </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol class="mobileStyle mx-3">
                    <custom-file-label
                      :labels="TitleFileTypeList"
                      @change="ChangeFile1"
                      :items="SportOrgRating.FileTables"
                      @delete="
                        (el) => {
                          SportOrgRating.FileTables = el;
                        }
                      "
                    ></custom-file-label>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard sm="4">

            </CCard>
          </ValidationObserver>
        </CCardBody> -->
        <!-- <CRow>
          <CCol class="m-2 text-right">
            <CButton size="sm" color="primary" @click="FillTable">
              <b-spinner v-if="FillLoading" small></b-spinner>
              {{ $t("Fill") }}
            </CButton>
          </CCol>
        </CRow> -->
        <CRow class="mt-3">
          <CCol class="text-right mb-4 ml-4">
            <b-tabs>
              <b-tab active>
                <template slot="title">
                  <!-- <b-icon icon="box-arrow-up"></b-icon> -->
                  {{ $t("All") }}
                </template>
                <CRow class="my-2">
                  <CCol>
                    <div class="mobileStyle mx-3">
                      <b-table-simple bordered>
                        <b-thead>
                          <b-tr>
                            <b-th
                              class="bg-secondary text-dark"
                              v-for="(allItem, allIndex) in sportOrgRatingTable"
                              :key="allIndex"
                            >{{ allItem.label }}</b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody>
                          <b-tr
                            v-for="(
                              item, index
                            ) in SportOrgRating.sportOrgRatingTable"
                            v-if="item.Status != 3"
                          >
                            <b-td
                              v-if="
                                item.sportorgratingindicatorcode.includes('.')
                              "
                            >{{ item.sportorgratingindicatorcode }}</b-td>
                            <b-td
                              :colspan="
                                item.sportorgratingindicatorcode.includes('.')
                                  ? 1
                                  : 5
                              "
                              class="text-left"
                            >
                              <span
                                v-if="
                                  item.sportorgratingindicatorcode.includes('.')
                                "
                              >{{ item.sportorgratingindicatorname }}</span>
                              <b
                                v-if="
                                  !item.sportorgratingindicatorcode.includes(
                                    '.'
                                  )
                                "
                              >{{ item.sportorgratingindicatorname }}</b>
                            </b-td>
                            <b-td
                              v-if="
                                item.sportorgratingindicatorcode.includes('.')
                              "
                            >
                              <p class="text-center">
                                <span>{{ item.minindicator }}</span>
                                <span v-if="item.minindicator && item.maxindicator">-</span>
                                <span>{{ item.maxindicator }}</span>
                              </p>
                            </b-td>
                            <b-td
                              v-if="
                                item.sportorgratingindicatorcode.includes('.')
                              "
                            >{{ item.sportschoolrealindicator }}</b-td>
                            <b-td
                              v-if="
                                item.sportorgratingindicatorcode.includes('.')
                              "
                            >{{ item.score }}</b-td>
                          </b-tr>
                        </b-tbody>
                        <b-tfoot>
                          <b-tr>
                            <b-td class="text-center text-bold" colspan="2">
                              {{
                              $t("Total")
                              }}
                            </b-td>
                            <b-td></b-td>
                            <b-td></b-td>
                            <b-td class="text-bold">
                              {{
                              calculateAllCounts("score") | currency
                              }}
                            </b-td>
                          </b-tr>
                        </b-tfoot>
                      </b-table-simple>
                    </div>
                  </CCol>
                </CRow>
              </b-tab>
              <b-tab>
                <template slot="title">
                  {{ $t("Manual") }}
                </template>
                <CRow class="my-2">
                  <CCol>
                    <div class="mobileStyle mx-3">
                      <b-table
                        :fields="sportOrgRatingTableManual"
                        :items="SportOrgRating.sportOrgRatingTable"
                        class="bg-color-table text-center tdpadding"
                        style="vertical-align: middle"
                        bordered
                        small
                        :tbody-tr-class="rowClassManual"
                      >
                        <template v-slot:cell(indicator)="{ item }">
                          <p class="text-center">
                            <span>{{ item.minindicator }}</span>
                            <span v-if="item.minindicator && item.maxindicator">
                              -
                            </span>
                            <span>{{ item.maxindicator }}</span>
                          </p>
                        </template>

                        <!-- <template v-slot:cell(actions)="{ item }">
                          <CButtonGroup
                            class="mx-auto d-block text-center"
                            size="sm"
                          >
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
                        </template> -->
                      </b-table>
                    </div>
                  </CCol>
                </CRow>
              </b-tab>
              <b-tab>
                <template slot="title">
                  {{ $t("Automatic") }}
                </template>
                <CRow class="my-2">
                  <CCol>
                    <div class="mobileStyle mx-3">
                      <b-table
                        :fields="sportOrgRatingTable"
                        :items="SportOrgRating.sportOrgRatingTable"
                        class="bg-color-table text-center tdpadding"
                        style="vertical-align: middle"
                        bordered
                        small
                        :tbody-tr-class="rowClassAutomatic"
                      >
                        <template v-slot:cell(indicator)="{ item }">
                          <p class="text-center">
                            <span>{{ item.minindicator }}</span>
                            <span v-if="item.minindicator && item.maxindicator">
                              -
                            </span>
                            <span>{{ item.maxindicator }}</span>
                          </p>
                        </template>

                        <!-- <template v-slot:cell(actions)="{ item }">
                          <CButtonGroup
                            class="mx-auto d-block text-center"
                            size="sm"
                          >
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
                        </template> -->
                      </b-table>
                    </div>
                  </CCol>
                </CRow>
              </b-tab>
            </b-tabs>
          </CCol>
        </CRow>
           <b-row>
              <b-col sm="12" md="12">
                <history-detail-info
                  :history="SportOrgRating.History">
                </history-detail-info>
              </b-col>
            </b-row>
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
              <CRow>
                <CCol sm="5">
                  <CInput
                    :label="$t('sportschoolrealindicator')"
                    v-model="tabrowParent.sportschoolrealindicator"
                    type="number"
                  >
                  </CInput>
                </CCol>
              </CRow>
              <CRow class="mt-4">
                <CCol>
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="sportOrgRatingCriteriaScoreTableFields"
                      :items="Tables"
                      selectable
                      ref="selectableTable"
                      :select-mode="selectMode"
                      @row-selected="SelectedItem"
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
              <CButton size="sm" color="success" @click="UpdateTable">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import PositionService from "@/services/Position.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import BasicTariffRateService from "@/services/BasicTariffRate.service";
import TariffScaleService from "@/services/TariffScale.service";
import HelperService from "@/services/helper.service";
import FileManageService from "@/services/filemanage.service";
import SportOrgRatingService from "@/services/SportOrgRating.service";
import CustomFileLabel from "@/components/customFileLabel.vue";
import SportOrgRatingCriteriaService from "@/services/SportOrgRatingCriteria.service";
import SchoolYearService from "@/services/SchoolYear.service";
import HistoryDetailInfo from '@/components/HistoryDetailInfo.vue'

export default {
  components: {
    CustomFileLabel,
    HistoryDetailInfo
  },
  data() {
    return {
      SaveLoading: false,
      CalcKindModal: false,
      SportOrgRating: {},
      selectedrowid: 0,
      basictariffrate: 0,

      organizationtypelist: [],
      TitleFileTypeList: [],
      schooltypelist: [],
      DownloadLoading: false,
      SchoolYearList:[],
      DeleteLoading: false,
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
        url: "",
        attachmentfiletype: "",
      },
      selectMode: "single",
      editedIndex: -1,
      tabrow: {
        id: 0,
        ownerid: 0,
        minindicator: "",
        maxindicator: "",
        score: "",
        Status: 1,
      },

      AttachedFiles: [],
      positionlist: [],
      fileLoading: false,
      fileLoading: false,
      tariffscaletypelist: [],
      tariffscalelist: [],
      FillLoading: false,
      tariffscaletablelist: [],

      isdisabled: false,
      sportOrgRatingTable: [
        {
          key: "sportorgratingindicatorcode",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "sportorgratingindicatorname",
          label: this.$t("sportorgratingindicator"),
          thClass: "text-center",
          tdClass: "text-left"
        },

        {
          key: "indicator",
          label: this.$t("assessmentcriteriatablename"),
          thClass: "text-center",
          tdClass: "text-centr"
        },
        {
          key: "sportschoolrealindicator",
          label: this.$t("sportschoolrealindicator"),
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "score",
          label: this.$t("score"),
          thClass: "text-center",
          tdClass: "text-center"
        }

        // {
        //   key: "actions",
        //   label: this.$t("actions"),
        // },
      ],
      sportOrgRatingCriteriaScoreTableFields: [
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasure"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "minindicator",
          label: this.$t("minindicator"),
          thClass: "text-center",
          tdClass: "text-center",
        },

        {
          key: "maxindicator",
          label: this.$t("maxindicator"),
          thClass: "text-center",
          tdClass: "text-center",
        },

        {
          key: "score",
          label: this.$t("score"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      sportOrgRatingTableManual: [
        {
          key: "sportorgratingindicatorname",
          label: this.$t("sportorgratingindicator"),
          thClass: "text-center",
          tdClass: "text-left",
        },

        {
          key: "indicator",
          label: this.$t("indicator"),
          thClass: "text-center",
          tdClass: "text-centr",
        },
        {
          key: "sportschoolrealindicator",
          label: this.$t("sportschoolrealindicator"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "score",
          label: this.$t("score"),
          thClass: "text-center",
          tdClass: "text-center",
        },

        // {
        //   key: "actions",
        //   label: this.$t("actions"),
        //   thClass: "text-center",
        //   tdClass: "text-center",
        // },
      ],
      Tables: [],
      selected: [],
      ratingperiodlist:[],
      sportorgratingindicatorname: "",
      ApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
      },
      CancelApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
        returnReason: "",
      },
      DocumentSeriesList: [],
      DeleteLoading: false,
      DownloadLoading: false,
      ApproveLoading:false,
      CancelApprovalLoading:false,
      tabrow: {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        tariffscaletypeid: 0,
        tariffscaleid: 0,
        rankid: 0,
        rankname: "",
        rankcode: "",
        Status: 1,
      },
        tabrowParent: {
          sportschoolrealindicator:""
      },

      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    SchoolTypeService.GetAll().then((res) => {
      self.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      self.organizationtypelist = res.data;
    });
    HelperService.GetTariffScaleTypeList().then((res) => {
      self.tariffscaletypelist = res.data;
    });
    SportOrgRatingService.Get(self.selectedrowid).then((res) => {
      self.SportOrgRating = res.data;
      self.TitleFileTypeList = res.data.table.Tables;
    });
    HelperService.GetAllRatingPeriod().then(res => {
      self.ratingperiodlist = res.data;
    });
    SchoolYearService.GetAll().then(res => {
      self.SchoolYearList = res.data;
    });
  },
  methods: {
    tariffscaletypechange() {
      var self = this;

      TariffScaleService.GetAll(self.tabrow.tariffscaletypeid).then((res) => {
        self.tariffscalelist = res.data;
      });
    },
    SelectedItem(items) {
      this.selected = items;
    },
    changeTariffScaleType() {
      PositionService.GetAll(0, this.tabrow.tariffscaletypeid, null, 0).then(
        (res) => {
          this.positionlist = res.data;
        }
      );
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
      this.ApproveData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
      };
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
      this.CancelApproveData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
        returnReason: "",
      };
    },
    Approve() {
      this.ApproveLoading = true;
      SportOrgRatingService.Approve(this.SportOrgRating.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$refs["ApproveModal"].hide();
          this.makeToast(
            this.$t("AcceptedSuccessfully"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      SportOrgRatingService.CancelApproval(this.SportOrgRating.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$refs["CancelApprovalModal"].hide();
          this.makeToast(
            this.$t("NotAcceptMessage"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.CancelApprovalLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
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
      Back() {
        this.$router.push({ name: 'SportOrgRating' })
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.SportOrgRating.FileTables.push({
              id: 0,
              ownerid: 0,
              attachmentfileid: res.data.id,
              attachmentfilename: item.fullname,
              attachmentfiletype: res.data.pfiletype,
              tablefileconfigid: item.id,
              Status: 1,
            });
            console.log(this.SportOrgRating.FileTables);
            this.FileAttach.attachmentfileid = res.data.id;
            this.FileAttach.attachmentfilename = res.data.pfiletext;
            this.FileAttach.attachmentfiletype = res.data.pfiletype;
            this.FileAttach.url = URL.createObjectURL(file);
            this.fileLoading = false;
          })
          .catch((error) => {
            this.fileLoading = false;
            this.makeToast(
              error.response.data.error,
              this.$t("error"),
              "danger"
            );
          });
      } else {
        this.makeToast(
          this.$t("FileSizeLargerThan4mb", { mb: item.maxsize }),
          this.$t("error"),
          "danger"
        );
      }
    },
    calculateAllCounts(key) {
      let total = 0;
      this.SportOrgRating.sportOrgRatingTable.forEach((el) => {
        total = total + el[key];
      });
      return total;
    },
    tariffscaletablechange() {
      var self = this;
      if (self.tariffscaletablelist.length > 0) {
        self.tabrow.rankcoef = self.tariffscaletablelist.filter(function (
          item
        ) {
          if (item.rankcode === self.tabrow.rankcode) return item;
        })[0].coef;
        self.tabrow.rankname = self.tariffscaletablelist.filter(function (
          item
        ) {
          if (item.rankcode === self.tabrow.rankcode) return item;
        })[0].rankname;
        self.tabrow.rankid = self.tariffscaletablelist.filter(function (item) {
          if (item.rankcode === self.tabrow.rankcode) return item;
        })[0].tariffscaletableid;
      }
    },
    OpenModal() {
      this.$bvModal.show("OpenModal");
    },
    DisabledItem() {
      var self = this;
      if (self.isdisabled) {
        return true;
      } else {
        return false;
      }
    },
    FillTable() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      this.FillLoading = true;
      SportOrgRatingService.Fill(self.SportOrgRating)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          this.SportOrgRating = res.data.data;
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        })
        .finally(() => {
          this.FillLoading = false;
        });
    },
    EditRow(item) {
      var self = this;
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.tabrowParent.sportschoolrealindicator = '';
      this.editedIndex = this.SportOrgRating.sportOrgRatingTable.indexOf(item);
      this.tabrow = Object.assign({}, item);
      SportOrgRatingCriteriaService.GetScoreTables(
        this.tabrow.sportorgratingcriteriatablerowid
      )
        .then((res) => {
          this.makeToast(this.$t("FillSuccess"), this.$t("message"), "success");
          this.Tables = res.data;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        })
        .finally(() => {
          this.FillLoading = false;
        });
      //   this.tabrowParent.sportOrgRatingCriteriaScoreTable =
      //     item.sportOrgRatingCriteriaScoreTable;
      this.sportorgratingindicatorname = item.sportorgratingindicatorname;
      this.$bvModal.show("AddModal");
    },
    checktabrowdata() {
      var self = this;
      if (
        self.tabrowParent.sportschoolrealindicator === null ||
        self.tabrowParent.sportschoolrealindicator === undefined ||
        self.tabrowParent.sportschoolrealindicator === 0 ||
        self.tabrowParent.sportschoolrealindicator === ""
      ) {
        this.makeToast(
          this.$t("sportschoolrealindicatorNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.selected.length == 0
      ) {
        this.makeToast(
          this.$t("ItemNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      return true;
    },
    UpdateTable() {
      var self = this;
      if (!self.checktabrowdata()) {
        return false;
      }
      if (this.selected.length > 0) {
        this.tabrow.sportorgratingcriteriascoretableid =
          this.selected[0].sportorgratingcriteriascoretableid;
        this.tabrow.sportschoolrealindicator =
          this.tabrowParent.sportschoolrealindicator;
        this.tabrow.score = this.selected[0].score;
        this.tabrow.minindicator = this.selected[0].minindicator;
        this.tabrow.maxindicator = this.selected[0].maxindicator;
      }
      if (this.editedIndex > -1) {
        Object.assign(
          self.SportOrgRating.sportOrgRatingTable[self.editedIndex],
          self.tabrow
        );
      } else {
        self.SportOrgRating.sportOrgRatingTable.push(self.tabrow);
      }

      self.tabrow = {
        id: 0,
        ownerid: 0,
        minindicator: "",
        maxindicator: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        score: "",
        Status: 1,
      };
      self.editedIndex = -1;

      self.$bvModal.hide("AddModal");
    },
    check() {
      var self = this;
      if (
        self.SportOrgRating.docnumber === null ||
        self.SportOrgRating.docnumber === undefined ||
        self.SportOrgRating.docnumber === 0 ||
        self.SportOrgRating.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportOrgRating.docdate === null ||
        self.SportOrgRating.docdate === undefined ||
        self.SportOrgRating.docdate === 0 ||
        self.SportOrgRating.docdate === ""
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
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    DeleteFile(item, index) {
      // this.DeleteFileLoading = item.id
      // FileManageService.Delete(item.id).then(res => {
      //   this.DeleteFileLoading = ""
      if (item.Status == 1) {
        this.SportOrgRating.FileTables.splice(index, 1);
      } else {
        this.SportOrgRating.FileTables.forEach(function (item) {
          if (el.attachmentfileid == item.attachmentfileid) {
            item.Status = 3;
          }
        });
      }
    },
    DownloadFile() {
      this.DownloadLoading = this.FileAttach.attachmentfileid;
      FileManageService.Get(this.FileAttach.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(res, this.FileAttach.attachmentfilename);
        })
        .catch((error) => {
          this.DownloadLoading = "";
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      SportOrgRatingService.Update(self.SportOrgRating)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "SportOrgRating",
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

    BackTable() {
      var self = this;
      self.$bvModal.hide("AddModal");
    },
    DeleteRow(item) {
      var self = this;
      item.Status = 3;
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    rowClassAutomatic(item, type) {
      if (item.Status === 3 || item.isautomatonformed == false) {
        return "d-none";
      }
    },
    rowClassManual(item, type) {
      if (item.Status === 3 || item.isautomatonformed == true) {
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
};
</script>
  
  <style>
</style>