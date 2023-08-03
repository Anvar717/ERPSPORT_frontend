<template>
    <CRow>
      <CCol sm="12" md="12">
        <CCard accent-color="primary">
          <b-row class="mt-3 mx-1">
            <b-col class="text-center">
              <h3>{{ $t("GetPersonAndStudentPlan") }}</h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-lg-right mt-3 ml-3 mb-2">
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
                @click="Refresh"
                size="sm"
              >
                <b-icon icon="arrow-repeat"></b-icon>
  
                {{ $t("Refresh") }}
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
            <!-- <CRow class="form-group">
                <CCol  class="d-flex mt-2">
                  <v-select
                    :options="SchoolYearList"
                    v-model="filter.schoolyearid"
                    :reduce="item => item.id"
                    :placeholder="$t('SchoolYear')"
                    class="mr-2"
                    label="name"
                    style="width:100%"
                    ></v-select>
                    <v-select
                        :options="OblastList"
                        v-model="filter.oblastid"
                        :reduce="item => item.id"
                        :placeholder="$t('oblast')"
                        label="name"
                        class="mr-2"
                        style="width:100%"
                        @input="ChangeOblast"
                    ></v-select>
                    <v-select
                        :options="RegionList"
                        v-model="filter.regionid"
                        :reduce="item => item.id"
                        :placeholder="$t('region')"
                        label="name"
                        class="mr-2"
                        style="width:100%"
                        @input="ChangeRegion"
                      ></v-select>
                      <v-select
                        :options="OrganizationList"
                        v-model="filter.organizationid"
                        :reduce="item => item.id"
                        :placeholder="$t('organization')"
                        label="name"
                        style="width:100%"
                        class="mr-2"
                      ></v-select>
                      <div>
                          <b-button @click="FilterFunc" variant="primary"> {{ $t('search') }} </b-button>
                      </div>
                </CCol>
              </CRow> -->
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
            <div class="mobileStyle">
              <b-table-simple class="table table-bordered">
                <thead>
                  <tr>
                    <th
                      rowspan="3"
                      v-if="filter.oblastid === 0 || filter.oblastid === null"
                      style="text-align: center; vertical-align: middle"
                    >
                      <!-- Ҳудуд спорт таълим муассасалари -->
                      {{ $t("sportPlaceName") }}
                    </th>
                    <th
                      rowspan="3"
                      v-if="
                        filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null) &&
                        !filter.byschool
                      "
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("regionname") }}
                    </th>
                    <th
                      rowspan="2"
                      v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("organizationname") }}
                    </th>
                    <!-- <th
                        rowspan="3"
                        v-if="filter.oblastid > 0 && filter.regionid > 0"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("organizationname") }}
                      </th> -->
                  </tr>
    
                  <tr>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("planemployee") }}
                    </th>
    
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("factemployee") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("emppercentage") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("plantrener") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("facttrener") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("facttrener2") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("facttrener3") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("trenerpercentage") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("plangroup") }}
                    </th>
    
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("factgroup") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("grouppercentage") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("planstudent") }}
                    </th>
    
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("factstudent") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("studentpercentage") }}
                    </th>
                  </tr>
                </thead>
    
                <tbody v-if="!Loading">
                  <tr
                    v-for="(item, i) in items"
                    style="text-align: center; vertical-align: middle"
                    :key="i"
                  >
                    <td
                      v-if="filter.oblastid === 0 || filter.oblastid === null"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a href="javascript:void(0)" @click="oblastchange(item)">{{
                        item.oblastname
                      }}</a>
                    </td>
                    <td
                      v-if="
                        filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null) &&
                        !filter.byschool
                      "
                      style="text-align: left; vertical-align: middle"
                    >
                      <a href="javascript:void(0)" @click="regionchange(item)">{{
                        item.regionname
                      }}</a>
                      <!-- {{
                          item.regionname
                        }} -->
                    </td>
                    <td
                      v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a href="javascript:void(0)">{{ item.organizationname }}</a>
                    </td>
                    <!-- <td
                        v-if="filter.oblastid > 0 && filter.regionid > 0"
                        style="text-align: center; vertical-align: middle"
                      >
                        <a href="javascript:void(0)">{{ item.schooltype }}</a>
                      </td> -->
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.planemployee, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.factemployee, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
    
                    <td class="text-right">
                      {{
                        $options.filters.currency(
                          (item.factemployee / item.planemployee) * 100,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                      }}%
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.plantrener, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.facttrener, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(
                          (item.facttrener2),
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                      }}
                    </td><td class="text-right">
                      {{
                        $options.filters.currency(
                          (item.facttrener3 ),
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(
                          (item.facttrener / item.plantrener) * 100,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                      }}%
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.plangroup, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.factgroup, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(
                          (item.factgroup / item.plangroup) * 100,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                      }}%
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.planstudent, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        $options.filters.currency(item.factstudent, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </td>
    
                    <td class="text-right">
                      {{
                        $options.filters.currency(
                          (item.factstudent / item.planstudent) * 100,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                      }}%
                    </td>
                  </tr>
                  <tr
                    style="
                      text-align: center;
                      vertical-align: middle;
                      font-weight: bold;
                    "
                  >
                    <td>{{ $t("Total") }}</td>
                    <td class="text-right">
                      {{
                        bottomrow.planemployee == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.planemployee, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.factemployee == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.factemployee, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.emppercentage == 0
                          ? "-"
                          : $options.filters.currency(
                              (bottomrow.factemployee / bottomrow.planemployee) *
                                100,
                              { symbol: "", fractionCount: 0 }
                            )
                      }}%
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.plantrener == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.plantrener, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.facttrener == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.facttrener, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.facttrener2 == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.facttrener2, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.facttrener3 == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.facttrener3, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.trenerpercentage == 0
                          ? "-"
                          : $options.filters.currency(
                              (bottomrow.facttrener / bottomrow.plantrener) * 100,
                              {
                                symbol: "",
                                fractionCount: 0,
                              }
                            )
                      }}%
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.plangroup == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.plangroup, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.factgroup == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.factgroup, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.grouppercentage == 0
                          ? "-"
                          : $options.filters.currency(
                              (bottomrow.factgroup / bottomrow.plangroup) * 100,
                              { symbol: "", fractionCount: 0 }
                            )
                      }}%
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.planstudent == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.planstudent, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.factstudent == 0
                          ? "-"
                          : $options.filters.currency(bottomrow.factstudent, {
                              symbol: "",
                              fractionCount: 0,
                            })
                      }}
                    </td>
                    <td class="text-right">
                      {{
                        bottomrow.studentpercentage == 0
                          ? "-"
                          : $options.filters.currency(
                              (bottomrow.factstudent / bottomrow.planstudent) * 100,
                              {
                                symbol: "",
                                fractionCount: 0,
                              }
                            )
                      }}%
                    </td>
                    <!-- <td>{{bottomrow.otherschoolcount== 0?'-': $options.filters.currency(bottomrow.otherschoolcount, {symbol: '', fractionCount: 0})}}</td> -->
                  </tr>
                </tbody>
                <tbody v-if="Loading">
                  <tr>
                    <td class="text-center" colspan="19">
                      <b-spinner></b-spinner>
                    </td>
                  </tr>
                </tbody>
              </b-table-simple>
            </div>
            <!-- <div class="pb-2">
                <div style="float:left;font-size:12px">
                  {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
                  {{ this.lastNumber }} {{ $t("of") }}
                  {{ this.totalRows }}
                </div>
                <div style="float:left" class="ml-2 mr-2 mt-n1">
                  <b-form-select
                    v-model="filter.PageLimit"
                    id="PageLimitSelect"
                    size="sm"
                    :options="filter.pageOptions"
                  ></b-form-select>
                </div>
                <div style="float:left;font-size:12px">
                  {{ $t("RecordsPerPage") }}
                </div>
                <div style="float:right">
                  <b-pagination
                    v-model="filter.PageNumber"
                    :total-rows="totalRows"
                    :per-page="filter.PageLimit"
                    align="right"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </div>
              </div> -->
          </CCardBody>
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
  import {
    BRow,
    BCol,
    BCard,
    BButton,
    BSpinner,
    BTabs,
    BTab,
    BCardText,
    BModal,
    BListGroup,
    BListGroupItem,
    BTable,
    BSidebar,
    BOverlay,
    BBadge,
    BFormInput,
  } from "bootstrap-vue";
  export default {
    components: {
      BRow,
      BCol,
      BCard,
      BButton,
      BSpinner,
      BTabs,
      BTab,
      BListGroup,
      BListGroupItem,
      BCardText,
      BTable,
      BSidebar,
      BModal,
      BBadge,
      BOverlay,
      BFormInput,
    },
    data() {
      return {
        items: [],
        totalRows: "",
        Loading: false,
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
          OblastName: "",
          RegionName: "",
        },
        bottomrow: {
          planemployee: 0,
            factemployee: 0,
            emppercentage: 0,
            planstudent: 0,
            factstudent: 0,
            studentpercentage: 0,
            plangroup: 0,
            factgroup: 0,
            grouppercentage: 0,
            plantrener: 0,
            facttrener: 0,
            facttrener2: 0,
            facttrener3: 0,
            trenerpercentage: 0,
        },
        SchoolYearList: [],
        OblastList: [],
        RegionList: [],
        OrganizationList: [],
        PrintLoading: false,
        lang: localStorage.getItem("locale") || "ru",
      };
    },
    created() {
      // SchoolYearService.GetAll().then(res => {
      //     this.SchoolYearList = res.data
      // })
      // OblastService.GetAll().then(res => {
      //     this.OblastList = res.data
      // })
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
        this.Refresh();
      },
      Print() {
        this.PrintLoading = true;
        ReportLearningProcessService.PrintPersonAndStudentPlan(
          // this.filter.schoolyearid,
          this.filter.oblastid,
          this.filter.regionid
          // this.filter.organizationid,
          // this.filter.SortColumn,
          // this.filter.OrderType,
          // this.filter.PageNumber,
          // this.filter.PageLimit
        )
          .then((res) => {
            this.PrintLoading = false;
            this.forceFileDownload(res, "PrintPersonAndStudentPlan");
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
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
      },
      ChangeRegion() {
        if (!!this.filter.regionid) {
          OrganizationService.GetAll(
            this.filter.oblastid,
            this.filter.regionid,
            false
          ).then((res) => {
            this.OrganizationList = res.data;
          });
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
        this.Loading = true;
        ReportLearningProcessService.GetPersonAndStudentPlan(
          this.filter.oblastid,
          this.filter.regionid
        ).then((res) => {
          this.Loading = false;
          this.items = res.data.data;
          this.totalRows = res.data.total;
          this.filter.oblastid = res.data.oblastid;
          if (res.data.oblastid > 0)
            this.filter.oblastname = " / " + res.data.oblastname;
          this.filter.regionid = res.data.regionid;
          if (res.data.regionid > 0)
            this.filter.regionname = " / " + res.data.regionname;
          if (this.filter.bycolor == true) {
            this.items.sort(function (a, b) {
              return a.fillcoef - b.fillcoef;
            });
          }
          this.bottomrow = {
            planemployee: 0,
            factemployee: 0,
            emppercentage: 0,
            planstudent: 0,
            factstudent: 0,
            studentpercentage: 0,
            plangroup: 0,
            factgroup: 0,
            grouppercentage: 0,
            plantrener: 0,
            facttrener: 0,
            facttrener2: 0,
            facttrener3: 0,
            trenerpercentage: 0,
          };
          this.calculateTotal(this.items);
        });
      },
      calculateTotal(item) {
        var planemployee = 0;
        var factemployee = 0;
        var emppercentage = 0;
        var planstudent = 0;
        var factstudent = 0;
        var studentpercentage = 0;
        var plangroup = 0;
        var factgroup = 0;
        var grouppercentage = 0;
        var plantrener = 0;
        var facttrener = 0;
        var facttrener2 = 0;
        var facttrener3 = 0;
        var trenerpercentage = 0;
  
        item.forEach(function (item) {
          planemployee = planemployee + item.planemployee;
          factemployee = factemployee + item.factemployee;
          emppercentage = emppercentage + item.emppercentage;
  
          plantrener = plantrener + item.plantrener;
          facttrener = facttrener + item.facttrener;
          facttrener2 = facttrener2 + item.facttrener2;
          facttrener3 = facttrener3 + item.facttrener3;
          trenerpercentage = trenerpercentage + item.trenerpercentage;
  
          plangroup = plangroup + item.plangroup;
          factgroup = factgroup + item.factgroup;
          grouppercentage = grouppercentage + item.grouppercentage;
  
          planstudent = planstudent + item.planstudent;
          factstudent = factstudent + item.factstudent;
          studentpercentage = studentpercentage + item.studentpercentage;
        });
        this.bottomrow = {
          planemployee: planemployee,
          factemployee: factemployee,
          emppercentage: emppercentage,
  
          plantrener: plantrener,
          facttrener: facttrener,
          facttrener2: facttrener2,
          facttrener3: facttrener3,
          trenerpercentage: trenerpercentage,
          plangroup: plangroup,
          factgroup: factgroup,
          grouppercentage: grouppercentage,
  
          planstudent: planstudent,
          factstudent: factstudent,
          studentpercentage: studentpercentage,
        };
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
      topcountrychange() {
        this.filter.oblastid = 0;
        this.filter.educationlanguageid = 0;
        this.filter.OblastName = "";
        this.filter.RegionName = "";
      },
      topoblastchange() {
        this.filter.regionid = 0;
        this.filter.RegionName = "";
      },
      oblastchange(item) {
        console.log(item);
        this.filter.oblastid = item.oblastid;
        this.filter.OblastName = " / " + item.oblastname;
        console.log(this.filter.oblastid);
        this.Refresh();
      },
      regionchange(item) {
        this.filter.regionid = item.regionid;
        this.filter.schoolsubjectid = item.schoolsubjectid;
        this.filter.schoolgradegroupid = item.schoolgradegroupid;
        this.filter.RegionName = " / " + item.regionname;
        this.Refresh();
      },
    },
    watch: {
      "filter.oblastid": {
        handler(newValue, oldValue) {
          if (newValue) {
            this.items = [];
            this.bottomrow = {
              planemployee: 0,
              factemployee: 0,
              emppercentage: 0,
              planstudent: 0,
              factstudent: 0,
              studentpercentage: 0,
              plangroup: 0,
              factgroup: 0,
              grouppercentage: 0,
              plantrener: 0,
              facttrener: 0,
              facttrener2: 0,
            facttrener3: 0,
              trenerpercentage: 0,
            };
            this.filter.regionid = 0;
          }
          this.Refresh();
        },
      },
      "filter.regionid": {
        handler(newValue, oldValue) {
          if (newValue) {
            this.items = [];
            this.bottomrow = {
              planemployee: 0,
              factemployee: 0,
              emppercentage: 0,
              planstudent: 0,
              factstudent: 0,
              studentpercentage: 0,
              plangroup: 0,
              factgroup: 0,
              grouppercentage: 0,
              plantrener: 0,
              facttrener: 0,
              facttrener2: 0,
            facttrener3: 0,
              trenerpercentage: 0,
            };
          }
          this.Refresh();
        },
      },
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
    