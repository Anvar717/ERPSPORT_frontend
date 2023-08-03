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
          <b-col md="8"><h4 class="text-center">{{ $t("ReportSportTitleDocumentList") }}</h4></b-col>
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
            </div>
            <div class="mr-2">
              <b-button
                :variant="cache_filters === false ? 'primary' : 'danger'"
                size="sm"
                v-b-toggle.collapse-1
                ><b-icon icon="funnel-fill"></b-icon>
              </b-button>
            </div> -->
            <div class="mr-2">
            <CButton @click="Print" color="primary" class="mr-2" size="sm">
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
            <CCol lg="2" md="4" sm="12" class="text-left mt-2"
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')"
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
            <CCol lg="2" md="4" sm="12" class="text-left mt-2"
            v-if="
            ($can('AdminView', 'permissions') ||
              $can('MinSportView', 'permissions') ||
              $can('OblastSport', 'permissions') ||
              $can('RegionXTB', 'permissions'))">
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
            <CCol lg="2" md="4" sm="12" class="text-left mt-2">
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
          
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
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
                    :options="genderlist"
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
            </CCol> -->
            <CCol md="4" lg="4" sm="12" class="text-left mt-4">
              <CInput
                :placeholder="$t('FullName')"
                autocomplete="text"
                v-model="filter.Search"
                v-on:keyup.enter="Search"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <!-- <CCol
              md="1"
              lg="1"
              sm="12"
              class="text-left mt-2"
              style="padding-left: 15px"
            >
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height: 35px"
                class="d-flex align-items-center"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol> -->
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
import SportGroupService from "@/services/SportGroup.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportTitleService from "@/services/SportTitle.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SportLevelService from "@/services/SportLevel.service";
import HelperService from "@/services/helper.service";
import SportReportService from "@/services/SportReport.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";

export default {
  components: { CustomReportFilter },
  data() {
    return {
      cache_filters: false,
      schoolyearlist: [],
      organizationlist: [],
      oblastlist: [],
      SportTypeClassifierList: [],
      SportTitleList: [],
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
          key: "pinfl",
          label: this.$t("pinfl"),
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
          label: this.$t("sporttypeclassifiername"),
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
          key: "orderdate",
          label: this.$t("SportsTitleDate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "givenorganizationname",
          label: this.$t("GivenOrganization"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
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
      filter: {
        // OnDate: "",
        schoolyearid: 0,
        // sportgroupid: 0,
        sporttitleid: 0,
        sporttypeclassifierid: 0,
        // personName: "",
        // coachPersonName: "",
        genderid: 0,
        // startage: "",
        // endage: "",
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        date: "",
        Sort: "",
        order: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        Search: "",
        SortIcon: "arrow-up",
        searchtype: 2,
        isfarmfy: false,
      },
    };
  },
  created() {
    Object.keys(this.filter).forEach(key => {
      if (key && this.$route.query[key]) {
        this.filter[key] = isNaN(this.$route.query[key]) ? this.$route.query[key] : parseInt(this.$route.query[key])
      }
    })
    (this.filter.date = (this.$route.query.date) || this.filter.date),
    OblastService.GetAll("", 211, "").then((res) => {
      this.oblastlist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SportTypeClassifierList = res.data;
    });
    SportTitleService.GetAll(true).then((res) => {
      this.SportTitleList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
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
    //   this.filter.SchoolYearID = this.$route.query.schoolyearid;
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
    clearFilter() {
      this.cache_filters = false;
      this.createDate();
      this.Refresh();
      this.filter = {
        OnDate: "",
        schoolyearid: 0,
        sporttitleid: 0,
        sporttypeclassifierid: 0,
        genderid: 0,
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 50,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
      
      
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      // this.filter.OrgSchoolGradeID = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    indexMethod(index) {
      return ((this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1)
    },
    ChangeRegion() {
      this.filter.organizationid = 0;
      // this.filter.OrgSchoolGradeID = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    ChangeOrg() {
      // this.filter.OrgSchoolGradeID = 0;
      OrgSchoolGradeService.GetAll("", 0, this.filter.organizationid).then(
        (res) => {
          this.orgschoolgradelist = res.data;
        }
      );
      SportGroupService.GetAll(0, 0, this.filter.organizationid).then((res) => {
        this.sportgrouplist = res.data;
      });
    },
    ChangeOrganizationType() {
      this.filter.schooltypeid = 0;
      SchoolTypeService.GetAll().then((res) => {
        this.schooltypelist = res.data;
      });
    },
    ChangeSchoolYear() {
      // this.filter.OrgSchoolGradeID = "";
      if (!!this.filter.SchoolYearID) {
        OrgSchoolGradeService.GetAll(0, 0, 0, this.filter.SchoolYearID).then(
          (res) => {
            this.orgschoolgradelist = res.data;
          }
        );
      }
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
      var self = this.filter;
      if (
        self.schoolyearid === 0 &&
        self.sporttypeclassifierid === 0 &&
        self.organizationtypeid === 0 &&
        self.sporttitleid === 0 &&
        self.genderid === 0 &&
        self.schooltypeid === 0
      ) {
        this.cache_filters = false;
        this.Refresh();
        return;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.cache_filters = true;
      this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;      
      SportReportService.GetReportSportTitleDocumentList(       
        {
        OnDate:this.filter.OnDate,
        SchoolYearID:this.filter.schoolyearid,
        SportGroupId:this.filter.SportGroupId,
        SportTitleId:this.filter.sporttitleid,
        SportTypeClassifierId:this.filter.sporttypeclassifierid,
        personName:this.filter.personName,
        coachPersonName:this.filter.coachPersonName,
        genderid:this.filter.genderid,
        startage:this.filter.startage,
        endage:this.filter.endage,
        oblastid:this.filter.oblastid,
        regionid:this.filter.regionid,
        organizationid:this.filter.organizationid,
        organizationtypeid:this.filter.organizationtypeid,
        schooltypeid:this.filter.schooltypeid,
        sportlevelid:this.filter.sportlevelid,
        Sort:this.filter.Sort,
        Search:this.filter.Search,
        order:this.filter.order,
        PageNumber:this.filter.PageNumber,
        PageLimit:this.filter.PageLimit,
        date:this.filter.date
        }
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.regionlist = res.data;
          });
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
      });
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportSportTitleDocumentList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.SportTypeClassifierId,
        this.filter.SportTitleId,
        this.filter.SchoolYearID,
        this.filter.Search,
        this.filter.Sort,
        this.filter.order,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.genderid,
        this.filter.date,
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res, "PrintReportSportTitleDocumentList");
        })
        .catch((error) => {
          this.PrintLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
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
  },
};
</script>
