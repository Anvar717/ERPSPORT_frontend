<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-center">{{ $t("GetTeacherCountInSchool") }}</h3>
          </b-col>
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
        </b-row>

        <CCardHeader>
          <CRow class="form-group">
            <CCol class="d-flex mt-2">
              <v-select
                :options="organizationtypelist"
                v-model="filter.organizationtypeid"
                :reduce="(item) => item.id"
                 class="mr-2"
                style="width: 100%"
                :placeholder="$t('organizationtype')"
                label="name"
              >
              </v-select>
              <v-select
                :options="schoollegalformlist"
                v-model="filter.schoollegalformid"
                 class="mr-2"
                style="width: 100%"
                :reduce="(item) => item.id"
                :placeholder="$t('schoollegalform')"
                label="name"
              >
              </v-select>
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
              <div>
                <b-button @click="Refresh" variant="primary">
                  {{ $t("search") }}
                </b-button>
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
            <template v-slot:head(id)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('id')"
              >
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(code)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('code')"
              >
                {{ $t("code") }}
                <b-icon
                  v-if="filter.SortColumn === 'code'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(shortname)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('shortname')"
              >
                {{ $t("shortname") }}
                <b-icon
                  v-if="filter.SortColumn === 'shortname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(noparamsschoolgradecount)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('noparamsschoolgradecount')"
              >
                {{ $t("noparamsschoolgradecount") }}
                <code class="text-danger h5"> * </code>
                <b-icon
                  v-if="filter.SortColumn === 'noparamsschoolgradecount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
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
          <div class="pb-2">
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
        <!-- <b-row class="pb-3 mx-1 mt-n2">
          <b-col class="d-flex align-items-center">
            <span class="text-danger h5 mb-1 mr-1"> * </span>
            <span class="h6"> {{ $t("noparamsschoolgradecountfull") }} </span>
          </b-col>
        </b-row> -->
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
          key: "teachercount",
          label: this.$t("teachercount"),
          sortable: false,
        },
        {
          key: "employeecount",
          label: this.$t("employeecount"),
          sortable: false,
        }
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
        schoollegalformid: 1,
        organizationtypeid:4
      },
      SchoolYearList: [],
      organizationtypelist:[],
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
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
     OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
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
    Print() {
      this.PrintLoading = true;
        ReportLearningProcessService.PrintTeachersCountInSchool(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationid,
          this.filter.schoollegalformid,
          this.filter.organizationtypeid,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit,
        )
          .then((res) => {
            this.PrintLoading = false;
            this.forceFileDownload(res, "TeachersCountInSchool");
          })
          .catch((err) => {
            this.PrintLoading = false;
            this.makeToast(err.response.data.error, this.$t("error"), "danger");
          });
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
       this.filter.regionid = 0
       this.filter.organizationid = 0
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = 0
    if (!!this.filter.regionid) {
         OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid
        ).then((res) => {
          this.OrganizationList = res.data;
        });
        // this.filter.regionname = this.RegionList.filter(
        //   (item) => (this.filter.regionid = item.id)
        // )[0].name;
        }
    },
  
    Refresh() {
      this.isBusy = true;
        ReportLearningProcessService.GetTeachersCountInSchool(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationid,
          this.filter.schoollegalformid,
          this.filter.organizationtypeid,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit,
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
            // this.filter.regionname = this.RegionList.filter(
            //   (item) => (this.filter.regionid = item.id)
            // )[0].name;
          }
          // this.filteroblast = res.data.oblastid;
          // this.filterregion = res.data.regionid;
          this.totalRows = res.data.data.total;
        });
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

<style></style>
