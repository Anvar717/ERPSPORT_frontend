<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row>
          <b-col lg="12">
            <h4 class="text-center ml-3 mt-3">{{ $t("EmployeeList") }}</h4>
          </b-col>
          <b-col md="2" class="text-lg-left mx-3 mt-2">
            <CButton color="danger" @click="$router.go(-1)" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col class="text-lg-right mx-3">
            <b-button
              class="mr-2"
              :variant="cache_filters == false ? 'primary' : 'danger'"
              size="sm"
              @click="onClickFilter"
              ><b-icon icon="funnel-fill"></b-icon>
            </b-button>

            <CButton @click="Print" color="primary" class="mr-2" size="sm">
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
            <label for="" style="height: 35px"></label>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-collapse id="collapse-1" class="mt-2" v-model="visible">
            <b-card>
              <custom-filter-collapse
                :key="componentKey"
                :filter="filter"
                v-if="isView"
                :oblastid="filter.oblastid"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-filter-collapse>
            </b-card>
          </b-collapse>
          <!-- <b-row>
            <b-col lg="2" sm="12" class="achievement-input">
              <div>
                <label for>{{ $t("StartDate") }}</label>
                <date-picker
                  v-model="filter.StartDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('StartDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </div>
            </b-col>
            <b-col lg="2" sm="12" class="achievement-input">
              <div>
                <label for>{{ $t("EndDate") }}</label>
                <date-picker
                  v-model="filter.EndDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </div>
            </b-col>
            <b-col lg="2" sm="12" class="achievement-input">
              <div>
                <label> {{ $t("department") }} </label>
                <v-select
                  :options="Departmentlist"
                  @input="ChangeDepartment()"
                  v-model="filter.DepartmentID"
                  :reduce="(item) => item.id"
                  :placeholder="$t('Department')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col lg="2" sm="12" class="achievement-input">
              <div>
                <label> {{ $t("HREmpAppointOrderType") }} </label>
                <v-select
                  :options="HREmpAppointOrderTypelist"
                  v-model="filter.HREmpAppointOrderTypeID"
                  :reduce="(item) => item.id"
                  :placeholder="$t('HREmpAppointOrderType')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col lg="2" sm="12" class="achievement-input">
              <div>
                <label> {{ $t("Position") }} </label>
                <v-select
                  :options="PositionList"
                  v-model="filter.PositionID"
                  :reduce="(item) => item.id"
                  :placeholder="$t('Position')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col sm="12" lg="2">
              <div>
                <label> {{ $t("employmenttype") }} </label>
                <v-select
                  :options="employmenttypelist"
                  v-model="filter.employmenttypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('employmenttype')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col class="text-right mr-3">
            <CButton @click="Print" color="primary" class="mr-2" size="sm">
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
            <label for="" style="height: 35px"></label>
            <CButton color="danger" @click="$router.push('/')" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col> 
          </b-row>
          <b-row class="mt-3">
            <b-col lg="2" sm="12">
              <div class="achievement-input">
                <label>{{ $t("StartDateOfBirth") }}</label>
                <date-picker
                  v-model="filter.StartDateOfBirth"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('StartDateOfBirth')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </div>
            </b-col>
            <b-col lg="2" sm="12">
              <div class="achievement-input">
                <label>{{ $t("EndDateOfBirth") }}</label>
                <date-picker
                  v-model="filter.EndDateOfBirth"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDateOfBirth')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </div>
            </b-col>
            <b-col lg="2" sm="12">
              <div class="achievement-input" style="width: 100%">
                <label>{{ $t("oblast") }}</label>
                <v-select
                  :disabled="
                    (!$can('AdminView', 'permissions') &&
                      !$can('MinSportView', 'permissions') &&
                      $can('OblastSport', 'permissions')) ||
                    $can('RegionXTB', 'permissions')
                  "
                  :options="OblastList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.oblastid"
                  @input="ChangeOblast"
                ></v-select>
              </div>
            </b-col>
            <b-col lg="2" sm="12">
              <div class="achievement-input" style="width: 100%">
                <label>{{ $t("region") }}</label>
                <v-select
                  :disabled="
                    (!$can('AdminView', 'permissions') &&
                      !$can('MinSportView', 'permissions') &&
                      $can('OblastSport', 'permissions')) ||
                    $can('RegionXTB', 'permissions')
                  "
                  :options="RegionList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.regionid"
                  @input="ChangeRegion"
                ></v-select>
              </div>
            </b-col>
            <b-col lg="2" sm="12">
              <div class="achievement-input" style="width: 100%">
                <label>{{ $t("organization") }}</label>
                <v-select
                  :disabled="
                    (!$can('AdminView', 'permissions') &&
                      !$can('MinSportView', 'permissions') &&
                      $can('OblastSport', 'permissions')) ||
                    $can('RegionXTB', 'permissions')
                  "
                  :options="OrganizationList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.organizationid"
                ></v-select>
              </div>
            </b-col>
            <b-col sm="12" lg="2" class="achievement-input">
              <label for=""> {{ $t("gender") }} </label>
              <v-select
                :options="genderlist"
                v-model="filter.genderid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              ></v-select>
            </b-col>

            <b-col sm="12" lg="2" class="achievement-input">
              <label for=""> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="filter.organizationtypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('organizationtype')"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="12" lg="2" class="achievement-input">
              <label for=""> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="filter.schooltypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('schooltype')"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="12" lg="2" class="achievement-input">
              <label for=""> {{ $t("StaffCategory") }} </label>
              <v-select
                :options="staffcategorylist"
                v-model="filter.staffcategoryid"
                :reduce="(item) => item.id"
                :placeholder="$t('StaffCategory')"
                label="name"
              >
              </v-select>
            </b-col>
            <CCol md="1" lg="2" sm="4" class="text-left mt-4">
              <CInput
                type="number"
                :placeholder="$t('fromemploymentrate')"
                autocomplete="text"
                v-model="filter.fromemploymentrate"
              >
              </CInput>
            </CCol>
            <CCol md="1" lg="2" sm="4" class="text-left mt-4">
              <CInput
                type="number"
                :placeholder="$t('toemploymentrate')"
                autocomplete="text"
                v-model="filter.toemploymentrate"
              >
              </CInput>
            </CCol>
            <b-col lg="2" sm="12">
              <div class="achievement-input" style="width: 100%">
                <label for=""> {{ $t("Search") }} </label>
                <CInput
                  :placeholder="$t('FullName')"
                  autocomplete="text"
                  v-model="filter.FullName"
                  v-on:keyup.enter="Search"
                  class="mr-2"
                  style="width: 100%"
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
              </div>
            </b-col>
          </b-row> -->
          <b-row class="mt-3">
            <b-col> </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            responsive="sm"
            style="min-height: 400px"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(employeeenrolmentid)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('employeeenrolmentid')"
              >
                {{ $t("employeeenrolmentid") }}
                <b-icon
                  v-if="filter.SortColumn === 'employeeenrolmentid'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(department)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('department')"
              >
                {{ $t("department") }}
                <b-icon
                  v-if="filter.SortColumn === 'department'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(hrempappointordertype)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('hrempappointordertype')"
              >
                {{ $t("hrempappointordertype") }}
                <b-icon
                  v-if="filter.SortColumn === 'hrempappointordertype'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(position)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('position')"
              >
                {{ $t("position") }}
                <b-icon
                  v-if="filter.SortColumn === 'position'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(employmenttype)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('employmenttype')"
              >
                {{ $t("employmenttype") }}
                <b-icon
                  v-if="filter.SortColumn === 'employmenttype'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(workschedule)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('workschedule')"
              >
                {{ $t("workschedule") }}
                <b-icon
                  v-if="filter.SortColumn === 'workschedule'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(startdate)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('startdate')"
              >
                {{ $t("startdate") }}
                <b-icon
                  v-if="filter.SortColumn === 'startdate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(enddatebydocument)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('enddatebydocument')"
              >
                {{ $t("enddatebydocument") }}
                <b-icon
                  v-if="filter.SortColumn === 'enddatebydocument'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(enddate)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('enddate')"
              >
                {{ $t("enddate") }}
                <b-icon
                  v-if="filter.SortColumn === 'enddate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(personname)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('personname')"
              >
                {{ $t("personname") }}
                <b-icon
                  v-if="filter.SortColumn === 'personname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(dateofbirth)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('dateofbirth')"
              >
                {{ $t("dateofbirth") }}
                <b-icon
                  v-if="filter.SortColumn === 'dateofbirth'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(gender)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('gender')"
              >
                {{ $t("gender") }}
                <b-icon
                  v-if="filter.SortColumn === 'gender'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(nationality)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('nationality')"
              >
                {{ $t("nationality") }}
                <b-icon
                  v-if="filter.SortColumn === 'nationality'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(inn)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('inn')"
              >
                {{ $t("inn") }}
                <b-icon
                  v-if="filter.SortColumn === 'inn'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(pinfl)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('pinfl')"
              >
                {{ $t("pinfl") }}
                <b-icon
                  v-if="filter.SortColumn === 'pinfl'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(contactinfo)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('contactinfo')"
              >
                {{ $t("contactinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'contactinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template #cell(personname)="{ item }">
              <a
                @click="GotoCard(item)"
                style="color: blue; cursor: pointer; text-decoration: underline"
              >
                {{ item.personname }}
              </a>
            </template>
            <template #cell(index)="{ index }">
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
                  id="PageLimitSelect"
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
import HelperService from "@/services/helper.service";
import PositionService from "@/services/Position.service";
import DepartmentService from "@/services/Department.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import SchoolTypeService from "@/services/SchoolType.service";
import StaffCategoryService from "@/services/StaffCategory.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import CustomFilterCollapse from "../../../components/customFilterCollapse.vue";
export default {
  components: { CustomFilterCollapse },
  data() {
    return {
      Departmentlist: [],
      HREmpAppointOrderTypelist: [],
      PositionList: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      genderlist: [],
      schooltypelist: [],
      staffcategorylist: [],
      organizationtypelist: [],
      fields: [
        {
          key: "index",
          label: this.$t("id"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "employeeenrolmentid",
          label: this.$t("employeeenrolmentid"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "oblastname",
          label: this.$t("oblast"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("region"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "organizationinn",
          label: this.$t("organizationinn"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "department",
          label: this.$t("department"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "hrempappointordertype",
          label: this.$t("hrempappointordertype"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "positionname",
          label: this.$t("positionname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "employmenttype",
          label: this.$t("employmenttype"),
          sortable: false,
        },
        {
          key: "employmentrate",
          label: this.$t("employmentrate"),
          sortable: false,
        },
        {
          key: "workschedule",
          label: this.$t("workschedule"),
          sortable: false,
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          sortable: false,
        },
        {
          key: "enddatebydocument",
          label: this.$t("enddatebydocument"),
          sortable: false,
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          sortable: false,
        },
        {
          key: "personname",
          label: this.$t("Employee"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          sortable: false,
        },
        {
          key: "gender",
          label: this.$t("gender"),
          sortable: false,
        },
        {
          key: "nationality",
          label: this.$t("nationality"),
          sortable: false,
        },
        /* {
          key: "citizenship",
          label: this.$t("citizenship"),
          sortable: false
        }, */
        // {
        //   key: "inn",
        //   label: this.$t("inn"),
        //   sortable: false,
        // },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          sortable: false,
        },
        {
          key: "contactinfo",
          label: this.$t("contactinfo"),
          sortable: false,
        },
      ],
      items: [],
      lang: "",
      employmenttypelist: [],
      totalRows: "",
      isBusy: true,
      PrintLoading: false,
      cache_filters: false,
      filter: {
        FullName: "",
        DateOfBirth: "",
        StartDate: "",
        EndDateOfBirth: "",
        StartDateOfBirth: "",
        EndDate: "",
        employmenttypeid: 0,
        genderid: 0,
        schooltypeid: 0,
        organizationtypeid: 0,
        fromemploymentrate: "",
        toemploymentrate: "",
        staffcategoryid: 0,
        DepartmentID: 0,
        PositionID: 0,
        HREmpAppointOrderTypeID: 0,
        SortColumn: "",
        oblastid: 0,
        regionid: 0,
        OrderType: "asc",
        organizationid: 0,
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      isView: true,
      visible: false,
      componentKey : 0
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";

    if (!!this.$route.query.oblastId) {
      this.filter.oblastid = parseInt(this.$route.query.oblastId);
    }
    if (!!this.$route.query.regionId) {
      this.filter.regionid = parseInt(this.$route.query.regionId);
    }
    if (!!this.$route.query.organizationid) {
      this.filter.organizationid = parseInt(this.$route.query.organizationid);
    }
    
    if (!!this.$route.query.PositionID) {
      this.filter.PositionID = parseInt(this.$route.query.PositionID);
    }
    HelperService.HrEmpAppointOrderType().then((res) => {
      this.HREmpAppointOrderTypelist = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      this.Departmentlist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    HelperService.GetEmploymentType(this.lang).then((res) => {
      this.employmenttypelist = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.SchoolTypeService = res.data;
    });
    StaffCategoryService.GetAll().then((res) => {
      this.staffcategorylist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    PositionService.GetAll(0, 0, false, 0).then((res) => {
      this.PositionList = res.data;
    }),
      this.createDate();
    if (!!this.$route.query.orgid) {
      this.filter.organizationid = this.$route.query.orgid;
    }
    this.Refresh();
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
    onClickFilter() {
      this.isView = false
      this.visible = !this.visible  
      this.componentKey += 1;  
      this.$forceUpdate();
      this.isView = true
    },
    Search() {      
      var self = this.filter;
      if (
        self.genderid === 0 &&
        self.DepartmentID === 0 &&
        self.HREmpAppointOrderTypeID === 0 &&
        self.PositionID === 0 &&
        self.employmenttypeid === 0 &&
        self.organizationtypeid === 0 &&
        self.schooltypeid === 0 &&
        self.staffcategoryid === 0 &&
        self.toemploymentrate === "" &&
        self.fromemploymentrate === ""
      ) {
        this.cache_filters = false;
        this.Refresh();
        return;
      } else {
        if (this.filter.PageNumber !== 1) {
          this.filter.PageNumber = 1;
        }
        this.cache_filters = true;
        this.Refresh();
      }
    },
    clearFilter() {
      this.filter = {
        FullName: "",
        DateOfBirth: "",
        StartDate: "",
        EndDateOfBirth: "",
        StartDateOfBirth: "",
        EndDate: "",
        employmenttypeid: 0,
        genderid: 0,
        schooltypeid: 0,
        organizationtypeid: 0,
        fromemploymentrate: "",
        toemploymentrate: "",
        staffcategoryid: 0,
        DepartmentID: 0,
        PositionID: 0,
        HREmpAppointOrderTypeID: 0,
        SortColumn: "",
        oblastid: 0,
        regionid: 0,
        OrderType: "asc",
        organizationid: 0,
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
      this.cache_filters = false;
      this.Refresh();
    },
    GotoCard(item) {
      this.$router.push({
        name: "EmployeeCard",
        query: {
          docseries: item.documentseries,
          docnumber: item.documentnumber,
          pinfl: item.pinfl,
        },
      });
    },
    ChangeOblast() {
      this.filter.regionid = "";
      this.filter.organizationid = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = "";
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = "01.01.2020";
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },

    indexMethod(index) {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1;
    },

    Print() {
      this.PrintLoading = true;
      EmployeeManageService.Print(
        this.filter.FullName,
        this.filter.StartDateOfBirth,
        this.filter.EndDateOfBirth,
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.DepartmentID,
        this.filter.HREmpAppointOrderTypeID,
        this.filter.PositionID,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res, "EmployeeList");
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
    Refresh() {
      this.isBusy = true;
      EmployeeManageService.GetList(
        this.filter.FullName,
        this.filter.StartDateOfBirth,
        this.filter.EndDateOfBirth,
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.DepartmentID,
        this.filter.HREmpAppointOrderTypeID,
        this.filter.PositionID,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.employmenttypeid,
        this.filter.genderid,
        this.filter.schooltypeid,
        this.filter.organizationtypeid,
        this.filter.fromemploymentrate,
        this.filter.toemploymentrate,
        this.filter.staffcategoryid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
        }
        if (res.data.regionid > 0) {
          this.filter.regionId = res.data.regionid;
        }
        this.totalRows = res.data.data.total;
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
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
      }
      this.Refresh();
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.oblastid": {
      handler(newValue) {
        if (newValue) {
          this.filter.oblastid = newValue
        }
      }
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    persontypeid: {
      handler(newValue, oldValue) {
        this.Refresh();
      },
    },
  },
};
</script>
