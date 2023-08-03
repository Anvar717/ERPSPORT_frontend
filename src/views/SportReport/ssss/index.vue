<template>
    <CRow>
      <CCol sm="12" md="12">
        <CCard accent-color="primary">
          <div class="card-head mt-3 mx-1">
            <div class="w-100 text-center">
              <h3>{{ $t("GetAnthropometricCount") }}</h3>
            </div>
            <div class="btn_list w-100 text-lg-right mt-4 mr-3">
              <CButton @click="Print" color="primary" class="mr-2 ml-2" size="sm">
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                &nbsp; {{ $t("Export") }}
              </CButton>
              <CButton color="danger" @click="$router.go(-1)" size="sm">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </div>
  
          <CCardHeader>
            <CRow class="form-group">
              <CCol lg="9" class="mt-2">
                <CRow>
                  <CCol lg="3" sm="12" class="achievement-input">
                    <v-select
                      :disabled="
                        (!$can('AdminView', 'permissions') &&
                          !$can('MinSportView', 'permissions') &&
                          $can('OblastSport', 'permissions')) ||
                        $can('RegionXTB', 'permissions')
                      "
                      :options="oblastlist"
                      v-model="filter.oblastid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('oblast')"
                      label="name"
                      class="mr-2"
                      style="width: 100%"
                      @input="ChangeOblast()"
                    ></v-select>
                  </CCol>
                  <CCol lg="3" sm="12" class="achievement-input">
                    <v-select
                      :disabled="
                        (!$can('AdminView', 'permissions') &&
                          !$can('MinSportView', 'permissions') &&
                          $can('OblastSport', 'permissions')) ||
                        $can('RegionXTB', 'permissions')
                      "
                      :options="regionlist"
                      v-model="filter.regionid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('region')"
                      label="name"
                      class="mr-2"
                      style="width: 100%"
                      @input="ChangeRegion()"
                    ></v-select>
                  </CCol>
                  <CCol lg="3" sm="12" class="achievement-input">
                    <v-select
                      :options="organizationlist"
                      v-model="filter.organizationid"
                      :reduce="(item) => item.id"
                      :disabled="
                        (!$can('AdminView', 'permissions') &&
                          !$can('MinSportView', 'permissions') &&
                          $can('OblastSport', 'permissions')) ||
                        $can('RegionXTB', 'permissions')
                      "
                      @input="Refresh"
                      :placeholder="$t('organization')"
                      label="name"
                      style="width: 100%"
                      class="mr-2"
                    ></v-select>
                  </CCol>
                </CRow>
              </CCol>
              <CCol md="3" lg="3" sm="12" class="text-left mt-2">
                <CInput
                  :placeholder="$t('FullName')"
                  autocomplete="text"
                  v-model="filter.personName"
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
            </CRow>
            <CRow class="form-group">
              <CCol lg="4" md="6" sm="6" class="text-left mt-2 pl-0"> </CCol>
            </CRow>
            <CRow class="form-group">
              <CCol>
                <h4 class="region-text">
                  <a href="javascript:void(0)" @click="topcountrychange">{{
                    $t("O`zbekiston")
                  }}</a>
                  <a href="javascript:void(0)" @click="topoblastchange">{{
                    filter.OblastName
                  }}</a>
                  <a href="javascript:void(0)">{{ filter.RegionName }}</a>
                </h4>
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
              foot-clone
              sticky-header="60vh"
              no-border-collapse
              bordered
            >
              <template v-slot:empty>
                <h5 class="text-center">{{ $t("NoItems") }}</h5>
              </template>
              <template v-slot:cell(index)="{ index }">
                <p class="m-0">
                  {{ index + 1 }}
                </p>
              </template>
              <template v-slot:cell(sportsmencount)="{ item }">
                {{ item.sportsmencount | currency }}
              </template>
              <template v-slot:cell(anthropometriccount)="{ item }">
                {{ item.anthropometriccount | currency }}
              </template>
              <template v-slot:cell(anthropometricpercent)="{ item }">
                <p class="m-0">{{ item.anthropometricpercent }}{{ "%" }}</p>
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
              <template v-slot:cell(oblastname)="{ item }">
                <a href="javascript:void(0)" @click="oblastchange(item)">{{
                  item.oblastname
                }}</a>
              </template>
              <template v-slot:cell(regionname)="{ item }">
                <a href="javascript:void(0)" @click="regionchange(item)">{{
                  item.regionname
                }}</a>
              </template>
              <template v-slot:cell(organizationname)="{ item }">
                <a href="javascript:void(0)" @click="ChangeOrg(item)">{{
                  item.organizationname
                }}</a>
              </template>
              <template v-slot:foot(regionname)>
                {{ $t("Total") }}
              </template>
              <template v-slot:foot(index)>
                <span></span>
              </template>
              <template v-slot:foot(oblastname)>
                {{ $t("Total") }}
              </template>
              <template v-slot:foot(organizationname)>
                {{ $t("Total") }}
              </template>
              <template v-slot:foot(indicatorsenteredcount)>
                {{ total.totaltotaladmissionapplicationdelayedcount }}
              </template>
              <template v-slot:foot(sportsmencount)>
                {{ bottomrow.sportsmencount | currency }}
              </template>
              <template v-slot:foot(anthropometriccount)>
                {{ bottomrow.anthropometriccount | currency }}
              </template>
              <template v-slot:foot(anthropometricpercent)>
                {{
                  $options.filters.currency(
                    (bottomrow.anthropometriccount / bottomrow.sportsmencount) *
                      100,
                    {
                      symbol: "%",
                      fractionCount: 0,
                    }
                  )
                }}
              </template>
            </b-table>
  
            <!-- <div class="pb-4">
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
            </div> -->
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>
  
  <script>
  import OrganizationService from "@/services/organization.service";
  import OblastService from "@/services/Oblast.service";
  import RegionService from "@/services/Region.service";
  import SportReportService from "@/services/SportReport.service";
  import AnthropometricService  from "@/services/Anthropometric.service";
  import SpCard from "@/components/Sport/SportCard.vue";
  export default {
    components: {
      SpCard,
    },
    data() {
      return {
        schoolyearlist: [],
        organizationlist: [],
        oblastlist: [],
        SportTypeClassifierList: [],
        SportTitleList: [],
        sportgrouplist: [],
        regionlist: [],
        orgschoolgradelist: [],
        fields: [],
        total: {},
        items: [],
        totalRows: "",
        isBusy: false,
        PrintLoading: false,
        bottomrow: {
          sportsmencount: 0,
          anthropometriccount: 0,
          anthropometricpercent: 0,
        },
        filter: {
          oblastid: 0,
          regionid: 0,
          organizationid: 0,
          Search: "",
          Sort: "",
          order: "asc",
          PageNumber: 1,
          PageLimit: 20,
          FullName: "",
          OrgSchoolGradeID: 0,
          personName: "",
          pageOptions: [5, 10, 15, 20, 25, 50, 100],
          SortIcon: "arrow-up",
          OblastName: "",
          RegionName: "",
        },
      };
    },
    created() {
      (this.filter.oblastid =
        parseInt(this.$route.query.oblastid) || this.filter.oblastid),
        (this.filter.regionid =
          parseInt(this.$route.query.regionid) || this.filter.regionid),
        (this.filter.organizationid =
          parseInt(this.$route.query.organizationid) ||
          this.filter.organizationid),
        OblastService.GetAll("", 211, "").then((res) => {
          this.oblastlist = res.data;
        });
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
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
      // this.createDate();
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
      // GotoStudentCard(item) {
      //   this.$router.push(`/StudentCard1/id=${item.personid}`);
      // },
      // createDate() {
      //   var todaydate = new Date();
      //   var dd = String(todaydate.getDate()).padStart(2, "0");
      //   var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      //   var yyyy = todaydate.getFullYear();
      //   this.filter.OnDate = dd + "." + mm + "." + yyyy;
      // },
      Search() {
        if (this.filter.PageNumber !== 1) {
          this.filter.PageNumber = 1;
        } else {
          this.Refresh();
        }
      },
      changefields() {
        if (this.filter.oblastid == 0) {
          this.fields = [
            {
              key: "index",
              label: this.$t("OrderNumber"),
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
              key: "sportsmencount",
              label: this.$t("Sportsmancount"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "anthropometriccount",
              label: this.$t("indicatorsenteredcount"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "anthropometricpercent",
              label: this.$t("anthropometricpercent"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
          ];
        } else if (this.filter.oblastid > 0 && this.filter.regionid == 0) {
          this.fields = [
            {
              key: "index",
              label: this.$t("OrderNumber"),
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "regionname",
              label: this.$t("Region"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-left",
            },
            ,
            {
              key: "sportsmencount",
              label: this.$t("sportsmancount"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "anthropometriccount",
              label: this.$t("indicatorsenteredcount"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "anthropometricpercent",
              label: this.$t("anthropometricpercent"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
          ];
        } else if (this.filter.oblastid > 0 && this.filter.regionid > 0) {
          this.fields = [
            {
              key: "index",
              label: this.$t("OrderNumber"),
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "organizationname",
              label: this.$t("organization"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-left",
            },
            ,
            {
              key: "sportsmencount",
              label: this.$t("sportsmancount"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "anthropometriccount",
              label: this.$t("indicatorsenteredcount"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
            {
              key: "anthropometricpercent",
              label: this.$t("anthropometricpercent"),
              sortable: false,
              thClass: "text-center",
              tdClass: "text-center",
            },
          ];
        }
      },
      Refresh() {
        this.isBusy = true;
        SportReportService.GetAnthropometricCount(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.organizationid,
          this.filter.Search,
          this.filter.Sort,
          this.filter.order,
          this.filter.PageNumber,
          this.filter.PageLimit
        ).then((res) => {
          this.isBusy = false;
          this.items = res.data.data;
          this.calculateTotal(this.items);
          this.total.totaltotaladmissionapplicationcount =
            res.data.data.totalsportsmancount;
          this.total.totaltotaladmissionapplicationdelayedcount =
            res.data.data.totalindicatorsenteredcount;
          if (res.data.oblastid > 0) {
            this.filter.oblastid = res.data.oblastid;
            this.filter.OblastName = "/" + res.data.oblastname;
            RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
              this.regionlist = res.data;
            });
          }
          if (res.data.regionid > 0) {
            this.filter.oblastid = res.data.oblastid;
            this.filter.OblastName = "/" + res.data.oblastname;
            this.filter.regionid = res.data.regionid;
            this.filter.RegionName = "/" + res.data.regionname;
            OrganizationService.GetAll(
              this.filter.oblastid,
              this.filter.regionid,
              false
            ).then((res) => {
              this.organizationlist = res.data;
            });
          }
          this.changefields();
          this.totalRows = res.data.data.total;
        });
      },
      calculateTotal(item) {
        var sportsmencount = 0;
        var anthropometriccount = 0;
        var anthropometricpercent = 0;
        item.forEach(function (item) {
          sportsmencount = sportsmencount + item.sportsmencount;
          anthropometriccount = anthropometriccount + item.anthropometriccount;
          anthropometricpercent =
            anthropometricpercent + item.anthropometricpercent;
        });
        this.bottomrow = {
          sportsmencount: sportsmencount,
          anthropometriccount: anthropometriccount,
          anthropometricpercent: anthropometricpercent,
        };
      },
      Print() {
        this.PrintLoading = true;
        AnthropometricService.PrintEnteredIndicatorsStudentCount(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.schoolYearId
        )
          .then((res) => {
            this.PrintLoading = false;
            if (this.lang == "ru") {
              this.forceFileDownload(
                res,
                "Отчет по спортсменам с введенными данными антропометрических показателей"
              );
            } else if (this.lang == "uz_latn") {
              this.forceFileDownload(
                res,
                "Аntropometrik koʼrsatkichlari kiritilgan sportchilar soni"
              );
            } else {
              this.forceFileDownload(
                res,
                "Антропометрик кўрсаткичлари киритилган спортчилар сони"
              );
            }
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
      topcountrychange() {
        this.filter.oblastid = 0;
        this.filter.regionid = 0;
        this.filter.OblastName = "";
        this.filter.RegionName = "";
        this.Refresh();
        this.isShow = false;
      },
      topoblastchange() {
        this.filter.regionid = 0;
        this.filter.RegionName = "";
        this.Refresh();
      },
      oblastchange(item) {
        this.filter.oblastid = item.oblastid;
        this.filter.OblastName = " / " + item.oblastname;
        this.Refresh();
      },
      regionchange(item) {
        this.filter.regionid = item.regionid;
        this.filter.RegionName = " / " + item.regionname;
        this.Refresh();
      },
      ChangeOrg(item) {
        this.$router.push({
          name: "SportStudentManageList",
          query: {
            oblastid: item.oblastid,
            regionid: item.regionid,
            orgid: item.organizationid,
          },
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
      "filter.oblastid": {
        handler(newValue, oldValue) {
          if (newValue) {
            this.items = [];
            this.bottomrow = {
              doctabcount: 0,
              doctabsum: 0,
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
          }
          this.changeQuery("oblastid", newValue);
          this.Refresh();
        },
      },
      "filter.regionid": {
        handler(newValue, oldValue) {
          if (newValue) {
            this.items = [];
            this.bottomrow = {
              doctabcount: 0,
              doctabsum: 0,
            };
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
              doctabcount: 0,
              doctabsum: 0,
            };
          }
          this.changeQuery("schoolyearid", newValue);
          this.Refresh();
        },
      },
    },
  };
  </script>
  