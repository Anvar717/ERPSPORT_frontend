<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col class="mt-2" md="2" lg="2">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"
            ><h4 class="text-center">
              {{ $t("ReportSportTitleDocument") }}
            </h4></b-col
          >
          <b-col md="2" class="text-right d-flex justify-content-end">
            <!-- <div class="mr-2">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </div> -->
            <!-- <div class="mr-2">
              <b-button
                :variant="cache_filters === false ? 'primary' : 'danger'"
                size="sm"
                v-b-toggle.collapse-1
                ><b-icon icon="funnel-fill"></b-icon>
              </b-button>
            </div> -->
            <div class="mr-2">
              <CButton
                @click="Print"
                color="primary"
                class="text-right mr-2"
                size="sm"
              >
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
          <!-- <b-row>
            <b-col md="2" sm="12" lg="2" class="achievement-input">
              <div>
                <label> {{ $t("SchoolYear") }} </label>
                <v-select
                  :options="schoolyearlist"
                  v-model="filter.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('SchoolYear')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              "
              sm="12"
              md="2"
              lg="2"
              class="achievement-input"
            >
              <label> {{ $t("Oblast") }} </label>
              <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast"
              ></v-select>
            </b-col>
            <b-col
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              "
              sm="12"
              md="2"
              lg="2"
              class="achievement-input"
            >
              <label> {{ $t("Region") }} </label>
              <v-select
                :options="RegionList"
                v-model="filter.regionid"
                :disabled="
                  !$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  !$can('OblastSport', 'permissions') &&
                  $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 100%"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("SportTypeClassifier") }} </label>
              <v-select
                :options="sportTypeClassifierlist"
                v-model="filter.sportTypeClassifierId"
                :reduce="(item) => item.id"
                @input="changeSportClassifier(filter.sportTypeClassifierId)"
                :placeholder="$t('SportTypeClassifier')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="filter.organizationTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('organizationtype')"
                label="name"
                style="width: 100%"
                class="mr-2"
                @input="Refresh"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="filter.schoolTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('schooltype')"
                @input="Refresh"
                 style="width: 100%"
                class="mr-2"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col md="1">
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class="mr-2"
                  style="margin-top: 27px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                </CButton>
              </div>
            </b-col>
          </b-row> -->
        </CCardHeader>
        <b-tabs
          class="mt-1"
          variant="tabs"
          v-model="activeTab"
          @input="onTabChange"
        >
          <b-tab :title="$t('byRegion')" key="0" />
          <b-tab :title="$t('bySportTypes')" key="1" />
        </b-tabs>
        <div class="table-container" style="padding: 5px">
          <div class="mobileStyle">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("OrderNumber") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastid === 0 ||
                      filter.oblastid === null ||
                      filter.oblastid === 999
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sportPlaceName") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      (filter.oblastid &&
                        !filter.regionid &&
                        !filter.byschool) ||
                      filter.regionid === 999
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastid &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="filter.oblastid && filter.regionid > 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th
                    v-if="filter.isBySportTypeClassifier"
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sporttypeclassifiername") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("studentcount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("NumbeTitleHolders") }}
                  </th>
                  <th
                    colspan="9"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("SportTitle1") }}
                  </th>
                </tr>
                <tr>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("O'-III-R") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("O'-II-R") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("O'-I-R") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("III-SP") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("II-SP") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("I-SP") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("Sun1") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("Su") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("XTSU") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="!Loading">
                <tr
                  v-for="(item, i) in items"
                  :class="i == index ? 'success' : ''"
                  style="text-align: center; vertical-align: middle"
                  :key="i"
                >
                  <td>
                    {{ i + 1 }}
                  </td>
                  <td
                    v-if="
                      filter.oblastid === 0 ||
                      filter.oblastid === null ||
                      filter.oblastid === 999
                    "
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="oblastchange(item, i)"
                      >{{ item.oblastname }}</a
                    >
                  </td>
                  <td
                    v-if="
                      (filter.oblastid && !filter.regionid) ||
                      filter.regionid === 999
                    "
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="regionchange(item, i)"
                      >{{ item.regionname }}</a
                    >
                  </td>
                  <td
                    v-if="filter.oblastid && filter.regionid"
                    style="text-align: left; vertical-align: middle"
                  >
                    <!-- <a href="javascript:void(0)"  @click="organizationChange(item, i)">{{ item.organizationname }}</a> -->
                    {{ item.organizationname }}
                  </td>
                  <td
                    style="text-align: left"
                    v-if="filter.isBySportTypeClassifier"
                  >
                    {{ item.sporttypeclassifiername }}
                  </td>
                  <td>
                    <span>{{ item.sportsmencount | currency }}</span>
                  </td>
                  <td>
                    <a
                      v-if="filter.oblastid && filter.regionid"
                      href="javascript:void(0)"
                      @click="organizationChange(item, i)"
                      >{{ item.sporttitlecount | currency }}</a
                    >
                    <span v-else>{{ item.sporttitlecount | currency }}</span>
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle1count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle2count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle3count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle4count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle5count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle6count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle7count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle8count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td>
                    {{
                      $options.filters.currency(item.sporttitle9count, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="Loading">
                <tr>
                  <td class="text-center" colspan="19">
                    <b-spinner></b-spinner>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr
                  style="
                    text-align: center;
                    vertical-align: middle;
                    font-weight: bold;
                  "
                >
                  <td
                    :colspan="
                      filter.oblastid === 999 || filter.regionid === 999 ? 3 : 2
                    "
                  >
                    {{ $t("Total") }}
                  </td>
                  <td v-if="filter.isBySportTypeClassifier"></td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sportsmencount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.sportsmencount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    <a
                      v-if="filter.oblastid && filter.regionid"
                      href="javascript:void(0)"
                      @click="organizationChange(null)"
                      >{{ bottomrow.sporttitlecount | currency }}</a
                    >
                    <span v-else>{{
                      bottomrow.sporttitlecount | currency
                    }}</span>
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle1count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle1count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle2count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle2count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle3count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle3count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle4count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle4count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle5count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle5count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle6count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle6count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle7count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle7count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle8count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle8count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.sporttitle9count == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.sporttitle9count,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <br />
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportReportService from "@/services/SportReport.service";
import SportTitleService from "@/services/SportTitle.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: { CustomReportFilter },
  data() {
    return {
      schoolyearlist: [],
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      schoollegalformlist: [],
      organizationtypelist: [],
      SchoolManagementFormList: [],
      OblastList: [],
      sporttitlelist: [],
      RegionList: [],
      SportTypeTables: [],
      items: [],
      tablename: "",
      Loading: false,
      PrintSportTitleDocument: false,
      PrintLoading: false,
      totalRows: "",
      index: null,
      schooltypelist: [],
      cache_filters: false,
      // isBusy: false,
      bottomrow: {
        sportsmencount: 0,
        sporttitle1count: 0,
        sporttitle2count: 0,
        sporttitle3count: 0,
        sporttitle4count: 0,
        sporttitle5count: 0,
        sporttitle6count: 0,
        sporttitle7count: 0,
        sporttitle8count: 0,
        sporttitle9count: 0,
        sporttitlecount: 0,
      },
      bottomrow1: {
        sportsmencount: 0,
        sporttitle1count: 0,
        sporttitle2count: 0,
        sporttitle3count: 0,
        sporttitle4count: 0,
        sporttitle5count: 0,
        sporttitle6count: 0,
        sporttitle7count: 0,
        sporttitle8count: 0,
        sporttitle9count: 0,
        sporttitlecount: 0,
      },
      Fields: [
        {
          key: "index",
          tdClass: "text-cebter",
          thClass: "text-center",
          label: this.$t("OrderNumber"),
        },
        {
          key: "sportname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("sporttype"),
        },
        {
          key: "groupcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sportgroup"),
        },
        {
          key: "sporttitle1count1",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sporttitle1count"),
        },
        {
          key: "sporttitle2count",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Murabbiy"),
        },
        {
          key: "viewsportsmen",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Student"),
        },
      ],
      queryFilt: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
      },
      activeTab: 0,
      sportTypeClassifierlist: [],
      filter: {
        schoolyearid: 0,
        isBySportTypeClassifier: false,
        oblastid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        sporttypeclassifierid: null,
        regionid: 0,
        organizationtypeid: 0,
        date: "",
        genderid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    if (this.$route.query.oblastid) {
      this.filter.oblastid = parseInt(this.$route.query.oblastid);
      if (this.filter.oblastid == 999) {
        this.filter.showAllRegion = true;
      }
    }
    if (this.$route.query.schoolyearid) {
      this.filter.schoolyearid = parseInt(this.$route.query.schoolyearid);
    }
    if (this.$route.query.sportTypeClassifierId) {
      this.filter.sportTypeClassifierId = parseInt(
        this.$route.query.sportTypeClassifierId
      );
    }

    if (this.$route.query.activeTab) {
      this.activeTab = parseInt(this.$route.query.activeTab);
      this.filter.isBySportTypeClassifier = this.activeTab ? true : false;
    }
    if (this.$route.query.regionid) {
      this.filter.regionid = parseInt(this.$route.query.regionid);
      if (this.filter.regionid == 999) {
        this.filter.showAllOrganization = true;
      }
    }
    //
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      // if (this.$can('AdminView', 'permissions')) {
      this.OblastList.unshift({
        id: 999,
        countryid: 999,
        name: this.$t("seeAllDistricts"),
      });
      // }
    });
    SportTitleService.GetAll(true).then((res) => {
      this.sporttitlelist = res.data;
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sportTypeClassifierlist = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
      // this.Refresh();
    });
  },

  methods: {
    Search() {
      var self = this.filter;
      if (
        // self.schoolyearid === 0 &&
        self.sporttypeclassifierid === null &&
        self.organizationtypeid === 0 &&
        self.schooltypeid === 0
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
    clearFilter() {
      this.filter = {
        schoolyearid: 0,
        isBySportTypeClassifier: false,
        oblastid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        sporttypeclassifierid: null,
        regionid: 0,
        organizationtypeid: 0,
        // sporttitleid: 0,
        showAllRegion: false,
        showAllOrganization: false,
        OblastName: "",
        RegionName: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 50,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
      this.cache_filters = false;
      this.Refresh();
    },
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
        this.filter.qualificationcategoryid = 0;
        this.filter.schoolsubjectid = 0;
        this.filter.schoolgradegroupid = 0;
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.filter.RegionName = "";
      }
      this.Refresh();
    },
    oblastchange(item, i) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid;
        this.changeQuery("sportTypeClassifierId", item.sporttypeclassifierid);
      }
      this.ChangeOblast();
    },
    regionchange(item, i) {
      if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
        this.ChangeOblast();
      }
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      if (item.sporttypeclassifierid) {
        this.filter.sportTypeClassifierId = item.sporttypeclassifierid;
        this.changeQuery("sportTypeClassifierId", item.sporttypeclassifierid);
      }
    },
    organizationChange(item) {
      if (item) {
        this.$router.push({
          name: "ReportStudentTitleList",
          query: {
            ...this.filter,
            organizationid: item.organizationid,
            SportTypeClassifierId: item.sporttypeclassifierid,
            date: this.filter.date,
          },
        });
      } else {
        this.$router.push({
          name: "ReportStudentTitleList",
          query: {
            ...this.filter,
            organizationid: 0,
            SportTypeClassifierId: 0,
            date: "",
          },
        });
      }
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportSportTitleDocumentCount(this.filter)
        .then((response) => {
          this.PrintLoading = false;
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Число спортсменов присвоено разрядов и титулов.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Razryad va unvon berilgan sportchilar soni.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Разряд ва унвон берилган спортчилар сони.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    OrganizationPrint() {
      SportReportService.GetReportSportTitleDocumentByOrganizationPrintList(
        this.filter.schoolyearid,
        this.filter.sporttitleid
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
              "Отчет по выдаче спортивных разрядов и титулов.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Tashkilot bo'yicha razryad va unvonlar xisoboti.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Ташкилот бўйича разраяд ва унвонлар хисоботи.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    changeSportClassifier(id) {
      this.changeQuery("sportTypeClassifierId", id);
      this.Refresh();
    },
    onTabChange(val) {
      if (val == 1) {
        this.filter.isBySportTypeClassifier = true;
      } else {
        this.filter.isBySportTypeClassifier = false;
      }
      this.changeQuery("activeTab", val);

      this.Refresh();
    },
    ChangeOblast() {
      let newValue = this.filter.oblastid;
      if (newValue) {
        if (newValue == 999) {
          this.filter.showAllRegion = true;
        } else {
          this.filter.showAllRegion = false;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
            if (res.data && res.data.length) {
              this.RegionList.unshift({
                id: 999,
                oblastid: this.filter.oblastid,
                name: this.$t("seeAllOblastOrganizations"),
              });
            }
          });
        }
      }
      this.changeQuery("oblastid", newValue);
      if (newValue) {
        this.items = [];
        this.bottomrow = {
          sportsmencount: 0,
          sporttitle1count: 0,
          sporttitle2count: 0,
          sporttitle3count: 0,
          sporttitle4count: 0,
          sporttitle5count: 0,
          sporttitle6count: 0,
          sporttitle7count: 0,
          sporttitle8count: 0,
          sporttitle9count: 0,
          sporttitlecount: 0,
        };
        if (this.$route.query && this.$route.query.regionid) {
          if (this.RegionList.length) {
            this.filter.regionid = 0;
            this.changeQuery("regionid", null);
          } else {
            this.filter.regionid = this.$route.query.regionid;
          }
        } else {
          this.filter.regionid = 0;
          this.changeQuery("regionid", null);
        }
      } else {
        this.filter.regionid = 0;
        this.changeQuery("regionid", null);
        this.filter.showAllRegion = false;
        this.RegionList = [];
      }
      this.Refresh();
    },
    Refresh() {
      this.Loading = true;
      SportReportService.GetReportSportTitleDocument(this.filter).then(
        (res) => {
          this.Loading = false;
          this.items = res.data.data;
          if (res.data.oblastid || res.data.oblastId) {
            this.filter.oblastid = res.data.oblastid || res.data.oblastId;
            RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.RegionList = res.data;
                if (res.data && res.data.length) {
                  this.RegionList.unshift({
                    id: 999,
                    oblastid: this.filter.oblastid,
                    name: this.$t("seeAllOblastOrganizations"),
                  });
                }
              }
            );
          }
          if (res.data.regionid || res.data.regionId) {
            this.filter.regionid = res.data.regionid || res.data.regionId;
          }
          this.totalRows = res.data.total;
          this.calculateTotal(this.items);
        }
      );
    },
    calculateTotal(item) {
      var sportsmencount = 0;
      var sporttitle1count = 0;
      var sporttitle2count = 0;
      var sporttitle3count = 0;
      var sporttitle4count = 0;
      var sporttitle5count = 0;
      var sporttitle6count = 0;
      var sporttitle7count = 0;
      var sporttitle8count = 0;
      var sporttitle9count = 0;
      var sporttitlecount = 0;
      item.forEach(function (item) {
        sportsmencount = sportsmencount + item.sportsmencount;
        sporttitle1count = sporttitle1count + item.sporttitle1count;
        sporttitle2count = sporttitle2count + item.sporttitle2count;
        sporttitle3count = sporttitle3count + item.sporttitle3count;
        sporttitle4count = sporttitle4count + item.sporttitle4count;
        sporttitle5count = sporttitle5count + item.sporttitle5count;
        sporttitle6count = sporttitle6count + item.sporttitle6count;
        sporttitle7count = sporttitle7count + item.sporttitle7count;
        sporttitle8count = sporttitle8count + item.sporttitle8count;
        sporttitle9count = sporttitle9count + item.sporttitle9count;
        sporttitlecount = sporttitlecount + item.sporttitlecount;
      });
      this.bottomrow = {
        sportsmencount: sportsmencount,
        sporttitle1count: sporttitle1count,
        sporttitle2count: sporttitle2count,
        sporttitle3count: sporttitle3count,
        sporttitle4count: sporttitle4count,
        sporttitle5count: sporttitle5count,
        sporttitle6count: sporttitle6count,
        sporttitle7count: sporttitle7count,
        sporttitle8count: sporttitle8count,
        sporttitle9count: sporttitle9count,
        sporttitlecount: sporttitlecount,
      };
    },
    calculateTotal1(item) {
      var sportsmencount = 0;
      var sporttitle1count = 0;
      var sporttitle2count = 0;
      var sporttitle3count = 0;
      var sporttitle4count = 0;
      var sporttitle5count = 0;
      var sporttitle6count = 0;
      var sporttitle7count = 0;
      var sporttitle8count = 0;
      var sporttitle9count = 0;
      var sporttitlecount = 0;
      item.forEach(function (item) {
        sportsmencount = sportsmencount + item.sportsmencount;
        sporttitle1count = sporttitle1count + item.sporttitle1count;
        sporttitle2count = sporttitle2count + item.sporttitle2count;
        sporttitle3count = sporttitle3count + item.sporttitle3count;
        sporttitle4count = sporttitle4count + item.sporttitle4count;
        sporttitle5count = sporttitle5count + item.sporttitle5count;
        sporttitle6count = sporttitle6count + item.sporttitle6count;
        sporttitle7count = sporttitle7count + item.sporttitle7count;
        sporttitle8count = sporttitle8count + item.sporttitle8count;
        sporttitle9count = sporttitle9count + item.sporttitle9count;
        sporttitlecount = sporttitlecount + item.sporttitlecount;
      });
      this.bottomrow1 = {
        sportsmencount: sportsmencount,
        sporttitle1count: sporttitle1count,
        sporttitle2count: sporttitle2count,
        sporttitle3count: sporttitle3count,
        sporttitle4count: sporttitle4count,
        sporttitle5count: sporttitle5count,
        sporttitle6count: sporttitle6count,
        sporttitle7count: sporttitle7count,
        sporttitle8count: sporttitle8count,
        sporttitle9count: sporttitle9count,
        sporttitlecount: sporttitlecount,
      };
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
  watch: {
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            sportsmencount: 0,
            sporttitle1count: 0,
            sporttitle2count: 0,
            sporttitle3count: 0,
            sporttitle4count: 0,
            sporttitle5count: 0,
            sporttitle6count: 0,
            sporttitle7count: 0,
            sporttitle8count: 0,
            sporttitle9count: 0,
            sporttitlecount: 0,
          };
          if (newValue == 999) {
            this.filter.showAllOrganization = true;
          } else {
            this.filter.showAllOrganization = false;
          }
        } else {
          this.filter.showAllOrganization = false;
        }
        this.changeQuery("regionid", newValue);
        this.Refresh();
      },
    },
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            sportsmencount: 0,
            sporttitle1count: 0,
            sporttitle2count: 0,
            sporttitle3count: 0,
            sporttitle4count: 0,
            sporttitle5count: 0,
            sporttitle6count: 0,
            sporttitle7count: 0,
            sporttitle8count: 0,
            sporttitle9count: 0,
            sporttitlecount: 0,
          };
        }
        this.changeQuery("schoolyearid", newValue);
        this.Refresh();
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.success {
  background-color: rgb(200, 238, 247);
}
</style>
