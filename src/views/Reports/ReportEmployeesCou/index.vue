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
            ><h4 class="text-center">{{ $t("ReportEmployeesCou") }}</h4></b-col
          >
          <b-col md="2">
            <CButton
              @click="Print"
              class="float-right mr-2"
              color="primary"
              size="sm"
            >
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              {{ $t("Print") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              "
              sm="12"
              md="2"
              lg="3"
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
              lg="3"
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
            <b-col sm="12" md="2" lg="2" class="achievement-input">
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
            <b-col sm="12" md="2" lg="3" class="achievement-input">
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
            <b-col style="margin-top: 30px">
              <CButton @click="Refresh" size="sm" color="primary" class="ml-2">
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </b-col>
          </b-row>
        </CCardHeader>
        <b-tabs
          class="mt-1"
          variant="tabs"
          v-model="activeTab"
          @input="onTabChange"
        >
          <b-tab :title="$t('byRegion')" key="0" />
          <b-tab :title="$t('Kiritilgan hujjatlar boyicha')" key="1" />
        </b-tabs>

        <div class="table-container" style="padding: 5px">
          <div class="mobileStyle">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th
                    rowspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("OrderNumber") }}
                  </th>
                  <th
                    rowspan="3"
                    v-if="
                      filter.oblastid === 0 ||
                      filter.oblastid === null ||
                      filter.oblastid === 999
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Oblast") }}
                  </th>
                  <th
                    rowspan="3"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 ||
                        filter.regionid === null ||
                        filter.regionid === 999) &&
                      !filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="3"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th
                    rowspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{
                      $t(
                        "allEmploeeCount"
                      )
                    }}
                  </th>
                  <th
                    colspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Included") }}
                  </th>
                  <!-- <th
                    rowspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Total") }}
                  </th> -->
                  <th
                    :colspan="filter.isByDiplomDoc ? '8' : '6'"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("byEducationType") }}
                  </th>
                   <!-- <th
                    rowspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Total") }}
                  </th> -->
                   
                  <th
                    colspan="5"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("QualificationCategory") }}
                  </th>
                  <th
                    rowspan="3"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Age") }}
                  </th>
                </tr>
                <tr>
                  <th 
                  rowspan="2"
                  style="text-align: center; vertical-align: middle">
                    {{ $t("Erkak") }}
                  </th>
                  <th
                   rowspan="2"
                   style="text-align: center; vertical-align: middle">
                    {{ $t("Ayol") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Ўрта махсуслар") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Malumoti boyicha jami") }}
                  </th>
                  <th
                  :colspan="filter.isByDiplomDoc ? '2' : '1'"
                    :rowspan="filter.isByDiplomDoc ? '1' : '2'"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("personhighereducount1") }}
                  </th>
                  <th
                  :colspan="filter.isByDiplomDoc ? '2' : '1'"
                    :rowspan="filter.isByDiplomDoc ? '1' : '2'"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("personhighereducount5") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("personhighereducount6") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Олий таълимдан кейинги таълим") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Тоифаси мавжуд эмас") }}
                  </th>
                  <th
                   rowspan="2"
                   style="text-align: center; vertical-align: middle">
                    {{ $t("Malaka toifasi boyicha jami") }}
                  </th>
                  <th 
                   rowspan="2"
                  style="text-align: center; vertical-align: middle">
                    {{ $t("Oliy toifa") }}
                  </th>
                  <th 
                   rowspan="2"
                  style="text-align: center; vertical-align: middle">
                    {{ $t("FirstCategory") }}
                  </th>
                  <th
                   rowspan="2" 
                  style="text-align: center; vertical-align: middle">
                    {{ $t("SecondCategory") }}
                  </th>
                </tr>
                <tr>
                   <th
                    v-if="filter.isByDiplomDoc"
                    style="text-align: center; vertical-align: middle">
                    {{ $t("isverified") }}
                  </th>
                  <th
                    v-if="filter.isByDiplomDoc" 
                    style="text-align: center; vertical-align: middle">
                    {{ $t("тасдиқланмаган") }}
                  </th>
                   <th
                    v-if="filter.isByDiplomDoc"
                    style="text-align: center; vertical-align: middle">
                    {{ $t("isverified") }}
                  </th>
                  <th
                    v-if="filter.isByDiplomDoc" 
                    style="text-align: center; vertical-align: middle">
                    {{ $t("тасдиқланмаган") }}
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
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 ||
                        filter.regionid === null ||
                        filter.regionid === 999)
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
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      v-if="!filter.isByDiplomDoc"
                      @click="organizationChange(item, i)"
                      >{{ item.organizationname }}</a
                    >
                    <span v-else>{{ item.organizationname }}</span>
                  </td>
                  <td>
                    {{ item.employeecount | currency }}
                  </td>
                  <td>
                    {{ item.manemployeecount | currency }}
                  </td>
                  <td>
                    {{ item.womanemployeecount | currency }}
                  </td>
                  <!-- <td>
                    {{ item.employeecounteduschool + item.employeecountedutotal | currency }}
                  </td> -->
                  <td v-if="!filter.isByDiplomDoc">
                    {{ item.employeecounteduschool | currency }}
                  </td>
                  <td v-if="filter.isByDiplomDoc">
                    {{ item.employeecounteducollegeapprove | currency }}
                  </td>
                  <td v-if="filter.isByDiplomDoc">
                    {{ item.employeecounteducollegedraft | currency }}
                  </td>
                  <td>
                    {{ item.employeecountedutotal | currency }}
                  </td>
                  <td>
                    {{ item.employeecounteducollege | currency }}
                  </td>
                  <td v-if="!filter.isByDiplomDoc">
                    {{ item.employeecountedubachelor | currency }}
                  </td>
                   <td v-if="filter.isByDiplomDoc">
                    {{ item.employeecounteducollegeapprove | currency }}
                  </td>
                  <td v-if="filter.isByDiplomDoc">
                    {{ item.employeecounteducollegedraft | currency }}
                  </td>
                  <td>
                    {{ item.employeecountedumaster | currency }}
                  </td>
                  <td>
                    {{ item.employeecounteduphd | currency }}
                  </td>
                  <!-- <td>
                    {{ item.employeecountcategorynone + item.employeecountcategorytotal | currency }}
                  </td> -->
                  <td>
                    {{ item.employeecountcategorynone | currency }}
                  </td>
                  <td>
                    {{ item.employeecountcategorytotal | currency }}
                  </td>
                  <td>
                    {{ item.employeecountcategoryhigh | currency }}
                  </td>
                  <td>
                    {{ item.employeecountcategory1 | currency }}
                  </td>
                  <td>
                    {{ item.employeecountcategory2 | currency }}
                  </td>
                  <td>
                    {{ item.avgage | currency }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="Loading">
                <tr>
                  <td class="text-center" colspan="30">
                    <b-spinner></b-spinner>
                  </td>
                </tr>
              </tbody>
               <tbody v-if="items.length == 0">
              <tr>
                <td :colspan="tabindex == 0 ? 25 : 20">
                  <h5 class="text-center">{{ $t("NoItems") }}</h5>
                </td>
              </tr>
            </tbody>
              <tfoot  v-if="items.length != 0">
                <tr
                  style="
                    text-align: center;
                    vertical-align: middle;
                    font-weight: bold;
                    white-space: nowrap;
                  "
                >
                  <td
                    :colspan="
                      filter.oblastid === 999 || filter.regionid === 999 ? 3 : 2
                    "
                  >
                    {{ $t("Total") }}
                  </td>

                  <td>
                    {{ calculateAllCounts("employeecount") | currency }}
                  </td>
                  <td>
                    {{ calculateAllCounts("manemployeecount") | currency }}
                  </td>
                  <td>
                    {{ calculateAllCounts("womanemployeecount") | currency }}
                  </td>
                  <!-- <td>
                    {{ calculateAllCounts("employeecounteduschool") + ("employeecountedutotal") | currency }}
                  </td> -->
                  <td>
                    {{
                      calculateAllCounts("employeecounteduschool") | currency
                    }}
                  </td>
                  <td>
                    {{
                      calculateAllCounts("employeecountedutotal") | currency
                    }}
                  </td>
                  <td v-if="!filter.isByDiplomDoc">
                    {{
                      calculateAllCounts("employeecounteducollege") | currency
                    }}
                  </td>
                  <td v-if="filter.isByDiplomDoc">
                    {{
                      calculateAllCounts("employeecounteducollegeapprove") | currency
                    }}
                  </td>
                  <td v-if="filter.isByDiplomDoc">
                    {{
                      calculateAllCounts("employeecounteducollegedraft") | currency
                    }}
                  </td>
                  <td v-if="!filter.isByDiplomDoc">
                    {{
                      calculateAllCounts("employeecountedubachelor") | currency
                    }}
                  </td>
                    <td v-if="filter.isByDiplomDoc">
                    {{
                      calculateAllCounts("employeecounteducollegeapprove") | currency
                    }}
                  </td>
                  <td v-if="filter.isByDiplomDoc">
                    {{
                      calculateAllCounts("employeecounteducollegedraft") | currency
                    }}
                  </td>
                  <td>
                    {{
                      calculateAllCounts("employeecountedumaster") | currency
                    }}
                  </td>
                   <td>
                    {{
                      calculateAllCounts("employeecounteduphd") | currency
                    }}
                  </td>
                   <!-- <td>
                    {{
                      calculateAllCounts("employeecountcategorynone") + ("employeecountcategorytotal") | currency
                    }}
                  </td> -->
                   <td>
                    {{
                      calculateAllCounts("employeecountcategorynone") | currency
                    }}
                  </td>
                   <td>
                    {{
                      calculateAllCounts("employeecountcategorytotal") | currency
                    }}
                  </td>
                   <td>
                    {{
                      calculateAllCounts("employeecountcategoryhigh") | currency
                    }}
                  </td>
                   <td>
                    {{
                      calculateAllCounts("employeecountcategory1") | currency
                    }}
                  </td>
                   <td>
                    {{
                      calculateAllCounts("employeecountcategory2") | currency
                    }}
                  </td>
                   <td>
                    {{
                      (calculateAllCounts("avgage")  / index) | currency
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
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportReportService from "@/services/SportReport.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import PositionService from "@/services/Position.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
export default {
  data() {
    return {
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
      PrintLoading: false,
      totalRows: "",
      index: null,
      PositionList: [],
      organizationtypelist: [],
      schooltypelist: [],
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
      activeTab: 0,
      sportTypeClassifierlist: [],
      index:0,
      filter: {
        oblastid: 0,
        regionid: 0,
        positionId: 0,
        organizationTypeId: 0,
        schoolTypeId: 0,
        OblastName: "",
        RegionName: "",
        isByDiplomDoc: false,
        showAllRegion: false,
        showAllOrganization: false,
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
    if (this.$route.query.regionid) {
      this.filter.regionid = parseInt(this.$route.query.regionid);
      if (this.filter.regionid == 999) {
        this.filter.showAllOrganization = true;
      }
    }
    if (this.$route.query.activeTab) {
      this.activeTab = parseInt(this.$route.query.activeTab);
      this.filter.isByDiplomDoc = this.activeTab ? true : false;
    }
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({
        id: 999,
        countryid: 999,
        name: this.$t("seeAllDistricts"),
      });
    });
    PositionService.GetAll(0, 0, false, 0).then((res) => {
      this.PositionList = res.data;
    }),
      SchoolTypeService.GetAll().then((res) => {
        this.schooltypelist = res.data;
      });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    this.Refresh();
  },

  methods: {
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
    },
    organizationChange(item) {
      let positionId = this.filter.isByDiplomDoc ? item.positionid : null;
      if (item.positionid) {
        this.$router.push({
          name: "EmployeeList",
          query: { ...this.filter, PositionID: positionId },
        });
      } else {
        this.$router.push({
          name: "EmployeeList",
          query: { ...this.filter, organizationid: item.organizationid },
        });
      }
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportEmployeeCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.isByDiplomDoc,
        this.filter.positionId
      )
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
              "Отчет о кадрах и занятости.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Shtat birliklari va bandligi boʼyicha hisobot.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Штат бирликлари ва бандлиги бўйича ҳисобот.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    calculateAllCounts(key) {
      let total = 0;
      this.items.forEach((el) => {
        total = total + el[key];
      });
      return total;
    },

    onTabChange(val) {
      if (val == 1) {
        this.filter.isByDiplomDoc = true;
      } else {
        this.filter.isByDiplomDoc = false;
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
      //   SportReportService.GetReportEmployeeCount(this.filter)
      ReportLearningProcessService.GetReportTeacherCount(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.isByDiplomDoc,
        this.filter.showAllRegion,
        this.filter.showAllOrganization
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.index = res.data.data.length
        if (res.data.oblastid || res.data.oblastid) {
          this.filter.oblastid = res.data.oblastid || res.data.oblastid;
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
        if (res.data.regionid || res.data.regionid) {
          this.filter.regionid = res.data.regionid || res.data.regionid;
        }
        this.totalRows = res.data.total;
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
  },
  watch: {
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
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
  },
};
</script>
<style lang="scss" scoped>
.success {
  background-color: rgb(200, 238, 247);
}
</style>
