




<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="$router.go(-1)" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"
            ><h4 class="text-center">
              {{ $t("SportStudentManageList") }}
            </h4></b-col
          >
          <b-col md="2" class="text-right d-flex justify-content-end">
            <div class="mr-2">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </div>
            <!-- <div class="mr-2">
              <b-button
                :variant="cache_filters === false ? 'primary' : 'danger'"
                size="sm"
                v-b-toggle.collapse-1
                ><b-icon icon="funnel-fill"></b-icon>
              </b-button>
            </div> -->
            <div class="mr-2">
              <CButton @click="Print" color="primary" size="sm">
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                <!-- &nbsp; {{ $t("Export") }} -->
              </CButton>
            </div>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-card class="mb-n2">
              <custom-report-filter
              ref="getRegionList"
                :filter="filter"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-report-filter>
            </b-card>
          <CRow sm="12" md="12" class="form-group">
            <!-- <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="schoolyear">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="schoolyearlist"
                    v-model="filter.SchoolYearID"
                    @input="ChangeSchoolYear"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="OnDate">
                <div class="form-group form-row">
                  <div class="col-sm-12">
                    <date-picker
                      v-model="filter.OnDate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('OnDate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      @change="Refresh"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </date-picker>
                  </div>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol
              lg="3"
              md="3"
              sm="12"
              class="text-left mt-2"
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              "
            >
              <v-select
                :options="oblastlist"
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                  $can('RegionXTB', 'permissions')
                "
                v-model="filter.oblastid"
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast()"
              ></v-select>
            </CCol>
            <CCol
              lg="2"
              md="2"
              sm="12"
              class="text-left mt-2"
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              "
            >
              <v-select
                :options="regionlist"
                :disabled="
                  !$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  !$can('OblastSport', 'permissions') &&
                  $can('RegionXTB', 'permissions')
                "
                v-model="filter.regionid"
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeRegion()"
              ></v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
              <v-select
                :options="organizationlist"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                @input="ChangeOrg"
                :placeholder="$t('organization')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol md="3" lg="3" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="SportGroup">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="sportgrouplist"
                    @input="Refresh"
                    v-model="filter.sportGroupId"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SportGroup')"
                    label="sportgroupname"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="3" lg="3" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="OrganizationType">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="organizationtypelist"
                    @input="ChangeOrganizationType"
                    v-model="filter.organizationtypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('OrganizationType')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="schooltype">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="schooltypelist"
                    v-model="filter.schooltypeid"
                    @input="Refresh"
                    :reduce="(item) => item.id"
                    :placeholder="$t('schooltype')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="SportTypeClassifier">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="SportTypeClassifierList"
                    v-model="filter.SportTypeClassifierId"
                    :reduce="(item) => item.id"
                    @input="Refresh"
                    :placeholder="$t('SportTypeClassifier')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="SportTitle">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="SportTitleList"
                    @input="Refresh"
                    v-model="filter.SportTitleId"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SportTitle')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="SportLeve;">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="sportlevelList"
                    @input="Refresh"
                    v-model="filter.sportlevelid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SportLevel')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="SportLeve;">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="genderlist"
                    @input="Refresh"
                    v-model="filter.genderid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('gender')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="3" lg="3" sm="12" class="text-left mt-2">
              <div class="d-flex">
                <div class="mr-2">
                  <CInput
                    type="number"
                    @input="changeStartAge"
                    :placeholder="$t('FromBirth')"
                    autocomplete="text"
                    v-model="filter.startage"
                  >
                  </CInput>
                </div>
                <div class="mr-2">
                  <CInput
                    type="number"
                    :placeholder="$t('ToBirth')"
                    @input="changeEndAge"
                    autocomplete="text"
                    v-model="filter.endage"
                  >
                  </CInput>
                </div>
              </div>
            </CCol>
            <CCol lg="2" md="2" sm="12" class="text-left mt-2">
              <v-select
                :options="SearchTypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('Sportchi') + '/' + $t('Murabbiy')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.searchtype"
                @input="ChangeSearchType"
              ></v-select>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <CInput
                :placeholder="$t('fio')"
                autocomplete="text"
                v-model="filter.fakeSearch"
                v-on:keyup.enter="Search"
              >
              </CInput>
            </CCol>
            <CCol
              md="1"
              lg="1"
              sm="12"
              class="text-left mt-2"
              style="padding-left: 15px"
            >
              <div class="d-flex">
                <div class="mr-2">
                  <CButton
                    @click="Clear"
                    size="sm"
                    color="primary"
                    variant="outline"
                    style="height: 35px"
                    class="d-flex align-items-center mr-2"
                  >
                    <b-icon icon="x-circle"> </b-icon>
                    <span class="on-mobile pl-1">{{ $t("Clear") }}</span>
                  </CButton>
                </div>
                <div class="mr-2">
                  <CButton
                    @click="Refresh"
                    size="sm"
                    color="primary"
                    variant="outline"
                    style="height: 35px"
                    class="d-flex align-items-center mr-2"
                  >
                    <b-icon icon="arrow-repeat"> </b-icon>
                  </CButton>
                </div>
              </div>
            </CCol> -->
            <CCol class="text-left mt-2" style="padding-left: 15px">
              <div class="d-flex">
                <div class="mr-2">
                  <b-button-group
                    @click="Refresh"
                    size="sm"
                    class="sportTitle-btn-group"
                  >
                    <b-button
                      @click="filter.hasSportTitle = null"
                      :variant="
                        filter.hasSportTitle == null
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("All") }}
                    </b-button>
                    <b-button
                      @click="filter.hasSportTitle = false"
                      :variant="
                        filter.hasSportTitle == false
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("nothasSportTitle") }}
                    </b-button>
                    <b-button
                      @click="filter.hasSportTitle = true"
                      :variant="
                        filter.hasSportTitle == true
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("hasSportTitle") }}
                    </b-button>
                  </b-button-group>
                </div>
                <div class="mr-2">
                  <b-button-group
                    @click="Refresh"
                    size="sm"
                    class="sportTitle-btn-group"
                  >
                    <b-button
                      @click="filter.hasAnthropometricData = null"
                      :variant="
                        filter.hasAnthropometricData == null
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("All") }}
                    </b-button>
                    <b-button
                      @click="filter.hasAnthropometricData = false"
                      :variant="
                        filter.hasAnthropometricData == false
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("notexistsanthropometric") }}
                    </b-button>
                    <b-button
                      @click="filter.hasAnthropometricData = true"
                      :variant="
                        filter.hasAnthropometricData == true
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("isexistsanthropometric") }}
                    </b-button>
                  </b-button-group>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template #cell(personname)="{ item }">
              <a
                @click="GotoStudentCard(item)"
                style="color: blue; cursor: pointer; text-decoration: underline"
              >
                {{ item.personname }}</a
              >
            </template>
            <template v-slot:cell(index)="{ index }">
              {{ indexMethod(index) }}
            </template>
            <template v-slot:cell(isantropometric)="{ item }">
              <b-badge
                :variant="!!item.anthropometricid ? 'success' : 'danger'"
                >{{ !!item.anthropometricid ? $t("yes") : $t("no") }}</b-badge
              >
            </template>
            <template v-slot:cell(actions)="{ item }">
              <b-button
                v-if="!!item.anthropometricid"
                variant="primary"
                @click="View(item)"
                >{{ $t("View") }}</b-button
              >
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div class="pagination-number" style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="perPageSelect"
                  size="sm"
                  :options="filter.pageOptions"
                ></b-form-select>
              </div>
              <div class="per-page" style="float: left; font-size: 12px">
                {{ $t("RecordsPerPage") }}
              </div>
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0 mobile-pagination"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SportStudentManageService from "@/services/SportStudentManage.service";
import SportGroupService from "@/services/SportGroup.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportTitleService from "@/services/SportTitle.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SportLevelService from "@/services/SportLevel.service";
import SportReportService from "@/services/SportReport.service";
import HelperService from "@/services/helper.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: { CustomReportFilter },
  data() {
    return {
      schoolyearlist: [],
      organizationlist: [],
      oblastlist: [],
      SportTypeClassifierList: [],
      SportTitleList: [],
      sportlevelList: [],
      genderlist: [],
      sportgrouplist: [],
      organizationtypelist: [],
      schooltypelist: [],
      regionlist: [],
      orgschoolgradelist: [],
      fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyear"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("Region"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "personname",
          label: this.$t("Student"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personage",
          label: this.$t("personage"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("SportTypeClassifier"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitle"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportgroupname",
          label: this.$t("SportGroup"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "coachpersonname",
          label: this.$t("Coach"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "academichours",
          label: this.$t("academichours"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "isantropometric",
          label: this.$t("isexistsanthropometric"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: this.$t("View"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      SearchTypeList: [
        { id: 1, name: this.$t("personname1") },
        { id: 2, name: this.$t("Coach") },
      ],
      items: [],
      totalRows: "",
      isBusy: false,
      PrintLoading: false,
      cache_filters: false,
      filter: {
        OnDate: "",
        SortColumn: "",
        OrderType: "",
        hassporttitle: "",
        schoolyearid: 0,
        sportgroupid: 0,
        sporttitleid: 0,
        sporttypeclassifierid: 0,
        personName: "",
        coachPersonName: "",
        genderid: 0,
        startage: "",
        endage: "",
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        sportlevelid: 0,
        Sort: "",
        order: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        fakeSearch: "",
        SortIcon: "arrow-up",
        searchtype: 2,
        isfarmfy: false,
        hasAnthropometricData: null,
        hasSportTitle: null,
      },
    };
  },
  created() {
    Object.keys(this.filter).forEach((key) => {
      if (key && this.$route.query[key]) {
        this.filter[key] = isNaN(this.$route.query[key])
          ? this.$route.query[key]
          : parseInt(this.$route.query[key]);
      }
    });
      (this.filter.date = (this.$route.query.date) || this.filter.date),
    OblastService.GetAll("", 211, "").then((res) => {
      this.oblastlist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SportTypeClassifierList = res.data;
    });
    SportTitleService.GetAll().then((res) => {
      this.SportTitleList = res.data;
    });
    SportLevelService.GetAll().then((res) => {
      this.sportlevelList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    // SchoolTypeService.GetAll().then((res) => {
    //   this.schooltypelist = res.data;
    // });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    // if (!!this.$route.query.orgid) {
    //   this.filter.oblastid = this.$route.query.oblastid;
    if (!!this.filter.oblastid) {
      RegionService.GetAll("", this.filter.oblastid).then((res) => {
        this.regionlist = res.data;
      });
    }
    //   this.filter.regionid = this.$route.query.regionid;
    if (!!this.filter.regionid) {
      OrganizationService.GetAll(
        this.filter.oblastid,
        this.filter.regionid,
        false
      ).then((res) => {
        this.organizationlist = res.data;
      });
    }
    //   this.filter.organizationid = this.$route.query.orgid;
    //   this.filter.schoolyearid = this.$route.query.schoolyearid;
    //   this.Refresh()
    // }
    this.Refresh();
    this.createDate();
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  methods: {
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
      this.Refresh();
    },
    changeStartAge() {
      if (this.filter.startage < 0) {
        this.filter.startage = 0;
        this.Refresh();
      } else {
        this.Refresh();
      }
    },
    changeEndAge() {
      if (this.filter.endage < 0) {
        this.filter.endage = 0;
        this.Refresh();
      } else {
        this.Refresh();
      }
    },
    indexMethod(index) {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1;
    },
    ChangeRegion() {
      this.filter.organizationid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
      this.Refresh();
    },
    View(item) {
      this.$router.push({
        name: "ViewAnthropometric",
        params: {
          id: item.anthropometricid,
        },
        query: {
          isView: 0,
        },
      });
    },
    ChangeOrg() {
      OrgSchoolGradeService.GetAll("", 0, this.filter.organizationid).then(
        (res) => {
          this.orgschoolgradelist = res.data;
        }
      );
      SportGroupService.GetAll(0, 0, this.filter.schoolyearid).then((res) => {
        this.sportgrouplist = res.data;
      });
      this.Refresh();
    },
    ChangeOrganizationType() {
      this.filter.schooltypeid = 0;
      SchoolTypeService.GetAll().then((res) => {
        this.schooltypelist = res.data;
      });
      this.Refresh();
    },
    ChangeSchoolYear() {
      if (!!this.filter.schoolyearid) {
        OrgSchoolGradeService.GetAll(0, 0, 0, this.filter.schoolyearid).then(
          (res) => {
            this.orgschoolgradelist = res.data;
          }
        );
      }
      this.Refresh();
    },
    GotoStudentCard(item) {
      this.$router.push(`/StudentCard1/id=${item.personid}`);
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.OnDate = dd + "." + mm + "." + yyyy;
    },

    Search() {
      // if (this.filter.searchtype === 1) {
      //   this.filter.personName = this.filter.fakeSearch;
      // }
      // if (this.filter.searchtype === 2) {
      //   this.filter.coachPersonName = this.filter.fakeSearch;
      // }
      this.cache_filters = false;
      var self = this.filter;
      if (
        self.schoolyearid === 0 &&
        self.sportgroupid === 0 &&
        self.organizationtypeid === 0 &&
        self.schooltypeid === 0 &&
        self.sporttypeclassifierid === 0 &&
        self.sporttitleid === 0 &&
        self.sportlevelid === 0 &&
        self.genderid === 0 &&
        self.startage === "" &&
        self.endage === "" &&
        self.personName === "" &&
        self.coachPersonName === ""
      ) {
        this.cache_filters = false;
        this.Refresh();
        return;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      }
      this.cache_filters = true;
      this.Refresh();
    },
    ChangeSearchType() {
      this.filter.personName = "";
      this.filter.coachPersonName = "";
      this.filter.fakeSearch = "";
      this.Refresh();
    },
    clearFilter() {
      this.filter = {
        OnDate: "",
        SortColumn: "",
        OrderType: "",
        hassporttitle: "",
        schoolyearid: 0,
        sportgroupid: 0,
        sporttitleid: 0,
        sporttypeclassifierid: 0,
        personName: "",
        coachPersonName: "",
        genderid: 0,
        startage: "",
        endage: "",
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        sportlevelid: 0,
        Sort: "",
        order: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        fakeSearch: "",
        SortIcon: "arrow-up",
        searchtype: 2,
        isfarmfy: false,
        hasAnthropometricData: null,
        hasSportTitle: null,
      };
      this.cache_filters = false;
      this.Refresh();
    },
    Refresh() {
      this.isBusy = true;
      SportStudentManageService.GetSportStudentManageList(this.filter).then(
        (res) => {
          this.isBusy = false;
          this.items = res.data.data.rows;
          this.filter.oblastid = res.data.oblastid;
          if (res.data.oblastid > 0) {
            this.filter.oblastid = res.data.oblastid;
            RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.regionlist = res.data;
              }
            );
          }
          this.filter.regionid = res.data.regionid;
          if (res.data.regionid > 0) {
            this.filter.oblastid = res.data.oblastid;
            this.filter.regionid = res.data.regionid;
            OrganizationService.GetAll(
              this.filter.oblastid,
              this.filter.regionid,
              false
            ).then((res) => {
              this.organizationlist = res.data;
            });
          }
          this.totalRows = res.data.data.total;
        }
      );
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintSportStudentManageList(
        this.filter.OnDate,
        this.filter.schoolyearid,
        this.filter.sportgroupid,
        this.filter.sporttitleid,
        this.filter.sporttypeclassifierid,
        this.filter.personName,
        this.filter.coachPersonName,
        this.filter.genderid,
        this.filter.startage,
        this.filter.endage,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.sportlevelid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.hasSportTitle,
        this.filter.hasAnthropometricData,
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Реестр спортсменов и тренеров, прикрепленных к группе.xlsx"
            );
          } else if (this.lang == "uz_cyrl") {
            fileLink.setAttribute(
              "download",
              "Гуруҳга бириктирилган спортчи va тренерлар реестри.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Guruhga biriktirilgan sportchi va trenerlar reyestri.xlsx"
            );
          }

          fileLink.click();
          this.PrintLoading = false;
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          this.PrintLoading = false;

          self.makeToast(response.error, self.$t("actions.error"), "danger");
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
    ChangeSort(columnName) {
      this.filter.Sort = columnName;
      if (this.filter.order == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.order = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.order = "asc";
      }
      this.Refresh();
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue) {
        this.filter.PageNumber = newValue;
        this.Refresh();
      },
    },
    "filter.PageLimit": {
      handler(newValue) {
        this.filter.PageLimit = newValue;
        this.Refresh();
      },
    },
  },
};
</script>
