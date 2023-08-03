<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-center">{{ $t("StudentList") }}</h3>
          </b-col>
        </b-row>
        <CCardHeader>
          <CRow sm="12" md="12" class="form-group">
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
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
                    <!-- <custom-date-input />  -->
                    <date-picker
                      v-model="filter.OnDate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('OnDate')"
                      value-type="format"
                      format="DD.MM.YYYY"
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
              md="2"
              lg="2"
              sm="12"
              class="text-left mt-2"
              v-if="!$can('MinSportView', 'permissions')"
            >
              <ValidationProvider v-slot="v" name="OrgSchoolGrade">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="orgschoolgradelist"
                    v-model="filter.OrgSchoolGradeID"
                    :reduce="(item) => item.id"
                    :placeholder="$t('OrgSchoolGrade')"
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
              <CInput
                :placeholder="$t('FullName')"
                autocomplete="text"
                v-model="filter.FullName"
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
            <CCol md="3" lg="3" sm="12" class="text-left mt-2 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height: 35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
              <CButton @click="Print" color="primary" class="mr-2" size="sm" style="margin-left:100px">
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                &nbsp; {{ $t("Export") }}
              </CButton>
              <CButton color="danger" @click="$router.go(-1)" size="sm">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </CCol>
          </CRow>
          <CRow
            sm="12"
            md="12"
            class="form-group"
            v-if="$can('MinSportView', 'permissions')"
          >
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="OrgSchoolGrade">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="oblastlist"
                    v-model="filter.oblastid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('oblast')"
                    label="name"
                    @input="ChangeOblast"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="schoolyear">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="regionlist"
                    v-model="filter.regionid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('region')"
                    label="name"
                    @input="ChangeRegion"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="3" lg="3" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="schoolyear">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="organizationlist"
                    v-model="filter.organizationid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('organization')"
                    label="shortname"
                    @input="ChangeOrg"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="OrgSchoolGrade">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="orgschoolgradelist"
                    v-model="filter.OrgSchoolGradeID"
                    :reduce="(item) => item.id"
                    :placeholder="$t('OrgSchoolGrade')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
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
            :current-page="filter.currentPage"
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
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.perPage"
                id="perPageSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.currentPage"
                :total-rows="totalRows"
                :per-page="filter.perPage"
                align="right"
                size="sm"
                class="my-0"
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
import StudentManageService from "@/services/StudentManage.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      organizationlist: [],
      oblastlist: [],
      regionlist: [],
      orgschoolgradelist: [],
      fields: [
        {
          key: "schoolyearname",
          label: this.$t("schoolyear"),
          sortable: false,
        },
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgrade"),
          sortable: false,
        },
        {
          key: "personname",
          label: this.$t("StudentFIO"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          sortable: false,
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          sortable: false,
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          sortable: false,
        },
        {
          key: "studentexpulsiontype",
          label: this.$t("studentexpulsiontype"),
          sortable: false,
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          sortable: false,
        },

        // {
        //   key: "nationality",
        //   label: this.$t("nationality"),
        //   sortable: false,
        // },
        /* {
          key: "citizenship",
          label: this.$t("citizenship"),
          sortable: false
        },
        {
          key: "inn",
          label: this.$t("inn"),
          sortable: false
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          sortable: false
        },
        {
          key: "contactinfo",
          label: this.$t("contactinfo"),
          sortable: false
        } */
      ],
      items: [],
      totalRows: "",
      isBusy: false,
      PrintLoading: false,
      filter: {
        FullName: "",
        DateOfBirth: "",
        OnDate: "",
        SchoolYearID: 0,
        OrgSchoolGradeID: 0,
        organizationid: 0,
        currentPage: 1,
        order: "asc",
        PageNumber: 1,
        perPage: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        Sort: "",
        oblastid: 0,
        regionid: 0,
        isfarmfy: false,
      },
    };
  },
  created() {
    // if(!!this.$route.query.orgid){
    OrgSchoolGradeService.GetAll("", 0, this.$route.query.orgid).then((res) => {
      this.orgschoolgradelist = res.data;
    });
    // }
    OblastService.GetAll("", 211, "").then((res) => {
      this.oblastlist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    if (!!this.$route.query.orgid) {
      this.filter.oblastid = this.$route.query.oblastid;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
      this.filter.regionid = this.$route.query.regionid;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
      this.filter.organizationid = this.$route.query.orgid;
      this.filter.SchoolYearID = this.$route.query.schoolyearid;
      this.Refresh();
    }
    if (!this.$can("MinSportView", "permissions")) {
      this.Refresh();
    }
    this.createDate();
  },
  computed: {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.totalRows < this.filter.perPage) {
        return this.totalRows;
      } else {
        if (this.filter.currentPage * this.filter.perPage > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.currentPage * this.filter.perPage;
        }
      }
    },
  },
  methods: {
    ChangeRegion() {
      this.filter.organizationid = 0;
      this.filter.OrgSchoolGradeID = 0;
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
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      this.filter.OrgSchoolGradeID = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    ChangeOrg() {
      this.filter.OrgSchoolGradeID = 0;
      OrgSchoolGradeService.GetAll("", 0, this.filter.organizationid).then(
        (res) => {
          this.orgschoolgradelist = res.data;
        }
      );
    },
    ChangeSchoolYear() {
      this.filter.OrgSchoolGradeID = "";
      if (!!this.filter.SchoolYearID) {
        OrgSchoolGradeService.GetAll(0, 0, 0, this.filter.SchoolYearID).then(
          (res) => {
            this.orgschoolgradelist = res.data;
          }
        );
      }
    },
    GotoStudentCard(item) {
      this.$router.push({
        name: "StudentCard",
        query: {
          personid: item.personid,
          docseries: item.documentseries,
          docnumber: item.documentnumber,
          dateofbirth: item.dateofbirth,
        },
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.OnDate = dd + "." + mm + "." + yyyy;
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      StudentManageService.GetList(
        this.filter.FullName,
        this.filter.DateOfBirth,
        this.filter.organizationid,
        this.filter.OnDate,
        this.filter.SchoolYearID,
        this.filter.OrgSchoolGradeID,
        this.filter.Sort,
        this.filter.order,
        this.filter.PageNumber,
        this.filter.perPage
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
      });
    },
    Print() {
      this.PrintLoading = true;
      StudentManageService.PrintStudentList(
        this.filter.FullName,
        this.filter.DateOfBirth,
        this.filter.organizationid,
        this.filter.OnDate,
        this.filter.SchoolYearID,
        this.filter.OrgSchoolGradeID,
        this.filter.Sort,
        this.filter.order,
        this.filter.PageNumber,
        this.filter.perPage
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res, "StudentList");
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
    "filter.currentPage": {
      handler(newValue) {
        this.filter.PageNumber = newValue;
        this.Refresh();
      },
    },
  },
};
</script>
