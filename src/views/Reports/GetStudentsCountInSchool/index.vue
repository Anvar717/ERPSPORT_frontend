<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-center" >{{ $t("GetStudentsCountInSchool") }}</h3>
          </b-col>
        </b-row>

        <CCardHeader>
          <CRow class="form-group">
            <CCol class="d-flex mt-2">
              <v-select
                :options="SchoolYearList"
                v-model="filter.schoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('SchoolYear')"
                class="mr-2"
                label="name"
                style="width: 100%"
              ></v-select>
              <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                    $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast"
              ></v-select>
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
                @input="ChangeRegion"
              ></v-select>
              <v-select
                :options="OrganizationList"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                :placeholder="$t('organization')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
              <v-select
                :options="OrganizationTypeList"
                v-model="filter.organizationTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('OrganizationType')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
              <v-select
                v-if="tabindex == 0"
                :options="SchoolGradeList"
                v-model="filter.schoolgradeid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolgrade')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
              <div>
                <b-button @click="FilterFunc" variant="primary">
                  {{ $t("search") }}
                </b-button>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="4">
              <b-button-group @click="Refresh" size="sm">
                <b-button
                  @click="tabindex = 0"
                  :variant="tabindex == 0 ? 'primary' : 'outline-primary'"
                >
                  {{ $t("StudentAtSchoolGrade") }}
                </b-button>
                <b-button
                  @click="tabindex = 1"
                  :variant="tabindex == 1 ? 'primary' : 'outline-primary'"
                >
                  {{ $t("StudentAtSchool") }}
                </b-button>
              </b-button-group>
            </CCol>
            <CCol sm="12" md="3" class="text-left mr-5">
              <v-select
                :options="schoollegalformlist"
                v-model="filter.schoollegalformid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoollegalform')"
                label="name"
              >
              </v-select>
            </CCol>
            <b-col class="text-right">
            <CButton
              color="danger"
              class="float-sm-right mr-2"
              @click="$router.push('/')"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>

              {{ $t("back") }}
            </CButton>
            <CButton
              color="primary"
              class="float-sm-right mr-2"
              @click="Print"
              size="sm"
            >
              <b-spinner v-if="PrintLoading" small></b-spinner>
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              {{ $t("Print") }}
            </CButton>
          </b-col>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="table-container" style="overflow-y: auto; height: 65vh">
            <b-table-simple
              :busy="isBusy"
              small
              class="table table-bordered table-responsive stikcy-header"
              responsive
              hover
              sticky-header="65vh"
              :bordered="false"
            >
              <thead class="footer">
                <tr>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle;"
                  >
                    {{ $t("oblastname") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle;"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle;"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle;"
                  >
                    {{ $t("organizationinn") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="tabindex == 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("schoolgradename") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("schoolgradecount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("noparamsschoolgradecount") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("studentcount") }}
                  </th>
                  <th
                    colspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Actions1") }}
                  </th>
                  <!-- <th  style="text-align: center" >{{$t('boyscount')}}</th> -->
                </tr>
                <tr>
                  <th style="text-align: center">
                    {{ $t("schoolgradecount") }}
                  </th>
                  <th style="text-align: center">{{ $t("studentcount") }}</th>
                </tr>
              </thead>

              <tbody v-if="!isBusy">
                <tr
                  v-for="(item, i) in items"
                  style="text-align: center; vertical-align: middle"
                  :key="i"
                >
                  <td style="text-align: left">{{ item.oblastname }}</td>
                  <td style="text-align: left">{{ item.regionname }}</td>
                  <td style="text-align: left">{{ item.organizationname }}</td>
                  <td style="text-align: center">{{ item.organizationinn }}</td>
                  <td style="text-align: left" v-if="tabindex == 0">
                    {{ item.schoolgradename }}
                  </td>
                  <td style="text-align: right">
                    {{
                      $options.filters.currency(item.schoolgradecount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="text-align: right">
                    {{
                      $options.filters.currency(item.noparamsschoolgradecount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="text-align: right">
                    {{
                      $options.filters.currency(item.studentcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="text-align: right">
                    {{
                      $options.filters.currency(item.movedorgschoolcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td style="text-align: right">
                    {{
                      $options.filters.currency(item.movedstudentcount, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <!-- <td >{{item.boyscount}}</td> -->
                </tr>
              </tbody>
              <tbody v-if="isBusy">
                <tr>
                  <td class="text-center" colspan="19">
                    <b-spinner></b-spinner>
                  </td>
                </tr>
              </tbody>
            </b-table-simple>

            <br />
          </div>
          <div class="pb-2 mt-3">
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
        <b-row class="pb-3 mx-1 mt-n2">
          <b-col class="d-flex align-items-center">
            <span class="text-danger h5 mb-1 mr-1"> * </span>
            <span class="h6"> {{ $t("noparamsschoolgradecountfull") }} </span>
          </b-col>
        </b-row>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false,
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "organizationinn",
          label: this.$t("inn"),
          sortable: false,
          class: "text-left",
        },
        // {
        //   key: "schoolyearname",
        //   label: this.$t("schoolyearname"),
        //   sortable: false,
        // },
        // {
        //   key: "schooltypename",
        //   label: this.$t("schooltypename"),
        //   sortable: false,
        // },
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
          sortable: false,
        },
        {
          key: "schoolgradecount",
          label: this.$t("schoolgradecount"),
          sortable: false,
        },
        {
          key: "noparamsschoolgradecount",
          sortable: false,
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
          sortable: false,
        },
        {
          key: "movedorgschoolcount",
          label: this.$t("movedorgschoolcount"),
          sortable: false,
        },
        {
          key: "movedstudentcount",
          label: this.$t("movedstudentcount"),
          sortable: false,
        },
      ],
      fields1: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false,
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "organizationinn",
          label: this.$t("inn"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "schoolgradecount",
          label: this.$t("schoolgradecount"),
          sortable: false,
        },
        {
          key: "noparamsschoolgradecount",
          sortable: false,
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
          sortable: false,
        },
        {
          key: "movedorgschoolcount",
          label: this.$t("movedorgschoolcount"),
          sortable: false,
        },
        {
          key: "movedstudentcount",
          label: this.$t("movedstudentcount"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        schoolyearid: 0,
        schoolgradeid: 0,
        schoollegalformid: 0,
        organizationTypeId: 0,
      },
      SchoolYearList: [],
      OrganizationTypeList: [],
      schoollegalformlist: [],
      OblastList: [],
      RegionList: [],
      tabindex: 0,
      filteroblast: 0,
      filterregion: 0,
      OrganizationList: [],
      PrintLoading: false,
      SchoolGradeList: [],
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.SchoolYearList = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    SchoolGradeService.GetAll(this.lang, 0).then((res) => {
      this.SchoolGradeList = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
    OrganizationTypeService.GetAll(this.lang).then((res) => {
      this.OrganizationTypeList = res.data;
    });

    this.Refresh();
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
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
    FilterFunc() {
      if (this.tabindex == 0) {
        if (
          this.filter.schoolyearid === null ||
          this.filter.schoolyearid === "" ||
          this.filter.schoolyearid === undefined ||
          this.filter.schoolyearid === 0
        ) {
          this.makeToast(
            this.$t("schoolyearNotSelected"),
            this.$t("error"),
            "danger"
          );
          return false;
        }
      }
      this.Refresh();
    },
    Print() {
      this.PrintLoading = true;
      if (this.tabindex == 0) {
        ReportLearningProcessService.PrintStudentsCountInSchool(
          this.filter.schoolyearid,
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationid,
          this.filter.schoolgradeid,
          this.filter.schoollegalformid,
          this.filter.organizationTypeId
        )
          .then((res) => {
            this.PrintLoading = false;
            this.forceFileDownload(res, "StudentCount");
          })
          .catch((err) => {
            this.PrintLoading = false;
            this.makeToast(err.response.data.error, this.$t("error"), "danger");
          });
      } else {
        ReportLearningProcessService.PrintStudentsTotalCountInSchool(
          this.filter.schoolyearid,
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationid,
          this.filter.schoollegalformid,
          this.filter.organizationTypeId
        )
          .then((res) => {
            this.PrintLoading = false;
            this.forceFileDownload(res, "TotalStudentCount");
          })
          .catch((err) => {
            this.PrintLoading = false;
            this.makeToast(err.response.data.error, this.$t("error"), "danger");
          });
      }
    },
    forceFileDownload(response, name) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid
        ).then((res) => {
          this.OrganizationList = res.data;
        });
        this.filter.regionname = this.filter.RegionList(
          (item) => (this.filter.regionid = item.id)
        )[0].name;
      }
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
      if (this.tabindex == 0) {
        ReportLearningProcessService.GetStudentsCountInSchool(
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit,
          this.filter.schoolyearid,
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationid,
          this.filter.schoolgradeid,
          this.filter.schoollegalformid,
          this.filter.organizationTypeId
        ).then((res) => {
          this.isBusy = false;
          this.items = res.data.data.rows;
          if (res.data.oblastid != 0) {
            this.filter.oblastid = res.data.oblastid;
            RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.RegionList = res.data;
              }
            );
          }
          if (res.data.regionid != 0) {
            this.filter.oblastid = res.data.oblastid;
            this.filter.regionid = res.data.regionid;
            // this.filter.regionname = res.data.regionname;
            RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.RegionList = res.data;
              }
            );
            this.filter.regionname = this.filter.RegionList(
              (item) => (this.filter.regionid = item.id)
            )[0].name;
          }
          // this.filteroblast = res.data.oblastid;
          // this.filterregion = res.data.regionid;
          this.totalRows = res.data.data.total;
        });
      } else {
        (this.isBusy = true),
          ReportLearningProcessService.StudentsTotalCountInSchool(
            this.filter.SortColumn,
            this.filter.OrderType,
            this.filter.PageNumber,
            this.filter.PageLimit,
            this.filter.schoolyearid,
            this.filter.oblastid,
            this.filter.regionid,
            this.filter.organizationid,
            this.filter.schoollegalformid,
            this.filter.organizationTypeId
          ).then((res) => {
            this.isBusy = false;
            this.items = res.data.data.rows;
            if (res.data.oblastid != 0) {
              this.filter.oblastid = res.data.oblastid;
              RegionService.GetAll(this.lang, this.filter.oblastid).then(
                (res) => {
                  this.RegionList = res.data;
                }
              );
            }
            if (res.data.regionid != 0) {
              this.filter.oblastid = res.data.oblastid;
              this.filter.regionid = res.data.regionid;
              // this.filter.regionname = res.data.regionname;
              RegionService.GetAll(this.lang, this.filter.oblastid).then(
                (res) => {
                  this.RegionList = res.data;
                }
              );
              this.filter.regionname = this.filter.RegionList(
                (item) => (this.filter.regionid = item.id)
              )[0].name;
            }
            // this.filteroblast = res.data.oblastid;
            // this.filterregion = res.data.regionid;
            this.totalRows = res.data.data.total;
          });
      }
    },
    makeToast(message, title, type) {
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
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
  },
};
</script>

<style>
.footer {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
.table.b-table > thead > tr > th {
  background-color: white;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 2;
}
</style>
