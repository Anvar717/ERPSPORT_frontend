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
          <b-col md="8"><h4 class="text-center">{{ $t("StaffReportList") }}</h4></b-col>
          <b-col md="2" class="text-right">
            <CButton @click="Print" color="primary" class="mr-2" size="sm">
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <CRow sm="12" md="12" class="form-group">
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
                v-model="filter.oblastId"
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
                v-model="filter.regionId"
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeRegion()"
              ></v-select>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
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
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
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
            </CCol>
            <CCol lg="2" md="4" sm="12" class="text-left mt-2">
              <v-select
                :options="organizationlist"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                @input="Refresh()"
                :placeholder="$t('organization')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
                <div class="form-group form-row">
                  <v-select
                    :options="staffcategorylist"
                    v-model="filter.staffCategoryId"
                    :reduce="(item) => item.id"
                    :placeholder="$t('StaffCategory')"
                    style="width: 100%"
                    label="name"
                    @input="Refresh()"
                  >
                  </v-select>
                </div>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left mt-2">
              <div class="form-group form-row">
                <v-select
                :options="positionlist"
                 class="w-100"
                v-model="filter.positionId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('position')"
                label="name"
              ></v-select>
              </div>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left  d-flex align-items-center">
              <div class="d-flex align-items-center">
                  <label class="mr-2">{{
                    $t("showOnlyHasVacancy")
                  }}</label>
                  <b-form-checkbox
                    v-model="filter.showOnlyHasVacancy"
                    switch
                    class="mt-n1"
                    @input="Refresh"
                  ></b-form-checkbox>
                </div>
            </CCol>
            <CCol
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
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
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
            <template #custom-foot>
              <b-tr>
                <b-th></b-th>
                <b-th></b-th>
                <b-th></b-th>
                <b-th></b-th>
                <b-th></b-th>
                <b-th></b-th>
                <b-th style="white-space:nowrap" class="text-center">
                  {{
                    $options.filters.currency(totalrowinfo.structureratecount, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }} 
                </b-th>
                <b-th style="white-space:nowrap" class="text-center">
                  {{
                    $options.filters.currency(totalrowinfo.ratecount, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }} 
                </b-th>
                <b-th style="white-space:nowrap" class="text-center"> 
                  {{
                    $options.filters.currency(totalrowinfo.freeratecount, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }} 
                </b-th>
              </b-tr>
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

import PositionService from "@/services/Position.service";
import StaffCategoryService from "@/services/StaffCategory.service";
import SportReportService from "@/services/SportReport.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
export default {
  data() {
    return {
      positionlist: [],
      organizationlist: [],
      oblastlist: [],
      staffcategorylist: [],
      SportTitleList: [],
      genderlist: [],
      sportgrouplist: [],
      organizationtypelist: [],
      regionlist: [],
      orgschoolgradelist: [],
      schooltypelist:[],
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
          key: "positionname",
          label: this.$t("positionname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "staffcategoryname",
          label: this.$t("staffcategory"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "structureratecount",
          label: this.$t("structureratecount"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "ratecount",
          label: this.$t("ratecount"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        
        {
          key: "freeratecount",
          label: this.$t("freeratecount"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        
      ],
      items: [],
      totalRows: "",
      isBusy: false,
      PrintLoading: false,
      filter: {
        oblastId: 0,
        regionId: 0,
        organizationid: 0,
        positionId: 0,
        staffCategoryId: 0,
        organizationTypeId: 0,
        schoolTypeId:0,
        Sort: "",
        order: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        showOnlyHasVacancy : false
      },
      totalrowinfo: {
        freeratecount: 0,
        ratecount: 0,
        structureratecount : 0
      }
    };
  },
  created() {
    Object.keys(this.filter).forEach(key => {
      if (key && this.$route.query[key]) {
        this.filter[key] = isNaN(this.$route.query[key]) ? this.$route.query[key] : parseInt(this.$route.query[key])
      }
    })
    OblastService.GetAll("", 211, "").then((res) => {
      this.oblastlist = res.data;
    });
    StaffCategoryService.GetAll().then((res) => {
      this.staffcategorylist=res.data;
    });
    PositionService.GetAll(0, 0, false, 0)
      .then((res) => {
        this.positionlist = res.data;
      })
    if (!!this.filter.oblastId) {
      RegionService.GetAll("", this.filter.oblastId).then((res) => {
        this.regionlist = res.data;
      });
    }
    if (!!this.filter.regionId) {
      OrganizationService.GetAll(
        this.filter.oblastId,
        this.filter.regionId,
        false
      ).then((res) => {
        this.organizationlist = res.data;
      });
    }
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
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
      this.filter.regionId = 0;
      this.filter.organizationid = 0;
      if (!!this.filter.oblastId) {
        RegionService.GetAll("", this.filter.oblastId).then((res) => {
          this.regionlist = res.data;
        });
      }
      this.Refresh()
    },
    indexMethod(index) {
      return ((this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1)
    },
    ChangeRegion() {
      this.filter.organizationid = 0;
      if (!!this.filter.regionId) {
        OrganizationService.GetAll(
          this.filter.oblastId,
          this.filter.regionId,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
      this.Refresh()
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.OnDate = dd + "." + mm + "." + yyyy;
    },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetStaffReportList(this.filter).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalrowinfo = res.data.data.totalrowinfo
        if (res.data.oblastid > 0) {
          this.filter.oblastId = res.data.oblastid;
          this.filter.oblastId = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastId).then((res) => {
            this.regionlist = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.regionId = res.data.regionid;
          this.filter.oblastId = res.data.oblastid;
          OrganizationService.GetAll(
            res.data.oblastid,
            res.data.regionid,
            false
          ).then((res) => {
            this.organizationlist = res.data;
          });
        }
        this.totalRows = res.data.data.total;
      });
    },
   Print() {
      this.PrintLoading = true
      SportReportService.PrintStaffReportList(
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.organizationid,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.staffCategoryId,
        this.filter.positionId,
        this.filter.Sort,
        this.filter.order,
      )
        .then((response) => {
          this.PrintLoading = false
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Список единиц штата.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Shtat birliklari ro'yxati.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Штат бирликлари рўйхати.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

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
    "filter.PageLimit":{
      handler(newValue) {
        this.Refresh();
      },
    }
  },
};
</script>
