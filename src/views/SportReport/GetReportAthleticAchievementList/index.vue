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
          <b-col md="8"
            ><h4 class="text-center">
              {{ $t("GetReportAthleticAchievementList") }}
            </h4></b-col
          >
          <b-col md="2">
            <CButton
              @click="Print"
              class="float-right"
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
          <CRow class="mt-3">
            <CCol lg="2" sm="12" class="achievement-input">
              <v-select
                :options="schoolYearlist"
                v-model="filter.schoolYearId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('schoolYear')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol lg="2" sm="12" class="achievement-input">
              <v-select
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
            <CCol lg="2" sm="12" class="achievement-input">
              <v-select
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
            <CCol lg="2" sm="12" class="achievement-input">
              <v-select
                :options="organizationlist"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('organization')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol lg="2" sm="12" class="achievement-input">
              <v-select
                :options="sportRanklist"
                v-model="filter.sportRankId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('sportrank')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol lg="2" sm="12" class="achievement-input">
            <v-select
              :options="SportEventTypeList"
              v-model="filter.sportEventTypeId"
              :reduce="(item) => item.id"
               @input="Refresh"
              :placeholder="$t('SportEventType')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
            </v-select>
            </CCol>
          </CRow>
          <CRow class="mt-3">
              <CCol md="2" sm="12" class="achievement-input">
              <div>
                <custom-date-picker
                  v-model="filter.date"
                  style="width: 100%"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></custom-date-picker>
              </div>
            </CCol>
            <CCol lg="2" sm="12" class="achievement-input">
              <v-select
                :options="sporttypeclassifierlist"
                v-model="filter.sporttypeclassifierId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('sporttypeclassifier')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol lg="2" md="3" sm="12" class="text-left mt-1">
              <b-input-group>
                <b-input
                  size="sm"
                  :placeholder="$t('personname')"
                  type="text"
                  v-model="filter.personName"
                  v-on:keyup.enter="personName"
                ></b-input>
                <b-input
                  size="sm"
                  :placeholder="$t('pinfl')"
                  type="number"
                  v-model="filter.personPinfl"
                  v-on:keyup.enter="personPinfl"
                ></b-input>
              </b-input-group>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-1">
              <b-input-group>
                <b-input
                  size="sm"
                  :placeholder="$t('coachname')"
                  type="text"
                  v-model="filter.coachName"
                  v-on:keyup.enter="coachname"
                ></b-input>
                <b-input
                  size="sm"
                  :placeholder="$t('pinfl')"
                  type="number"
                  v-model="filter.coachPinfl"
                  v-on:keyup.enter="coachpinfl"
                ></b-input>
              </b-input-group>
            </CCol>
            <CCol lg="3" sm="12" class="achievement-input">
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
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:cell(index)="{ index }">
              <p class="m-0">
                {{ indexMethod(index)}}
              </p>
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
            <!-- <template v-slot:cell(oblastname)="{ item }">
              <a href="javascript:void(0)" @click="oblastchange(item)">{{
                item.oblastname
              }}</a>
            </template>
            <template v-slot:cell(regionname)="{ item }">
              <a href="javascript:void(0)" @click="regionchange(item)">{{
                item.regionname
              }}</a>
            </template> -->
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
import SportEventTypeService from "@/services/SportEventType.service";
import SportReportService from "@/services/SportReport.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SpCard from "@/components/Sport/SportCard.vue";
import SportRankService from "@/services/SportRank.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    SpCard,
    CustomDatePicker
  },
  data() {
    return {
      sporttypeclassifierlist: [],
      schoolYearlist: [],
      organizationlist: [],
      sportRanklist: [],
      oblastlist: [],
      regionlist: [],
      total: {},
      items: [],
      fields: [
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
          key: "regionname",
          label: this.$t("region"),
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
          label: this.$t("personname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifiername"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventtypename",
          label: this.$t("sporteventtype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "competitiontypename",
          label: this.$t("CompetitionType"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporteventname",
          label: this.$t("SportEvent"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifierdisciplinename",
          label: this.$t("sporttypeclassifierdiscipline"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "achievement",
          label: this.$t("achievement"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasure"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportrankname",
          label: this.$t("sportrank"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        //   {
        //     key: "documentnumber",
        //     label: this.$t("documentnumber"),
        //     sortable: false,
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //   },
        //   {
        //     key: "docnumber",
        //     label: this.$t("docnumber"),
        //     sortable: false,
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //   },
        //   {
        //     key: "documentseries",
        //     label: this.$t("documentseries"),
        //     sortable: false,
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //   },
        //   {
        //     key: "docdate",
        //     label: this.$t("docdate"),
        //     sortable: false,
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //   },
        //   {
        //     key: "pinfl",
        //     label: this.$t("pinfl"),
        //     sortable: false,
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //   },
        //   {
        //     key: "gendername",
        //     label: this.$t("gendername"),
        //     sortable: false,
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //   },
        //   {
        //     key: "sporttypeclassifiername",
        //     label: this.$t("sporttypeclassifiername"),
        //     sortable: false,
        //     thClass: "text-center",
        //     tdClass: "text-center",
        //   },
      ],
      totalRows: "",
      lang: "ru",
      isBusy: false,
      PrintLoading: false,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierId: 0,
        sportRankId: 0,
        sportEventTypeId: 0,
        date: "",
        Search: "",
        Sort: "",
        order: "asc",
        PageNumber: 1,
        PageLimit: 20,
        schoolYearId: 0,
        OrgSchoolGradeID: 0,
        coachpinfl: '',
        coachName: '',
        personPinfl: '',
        personName:'',
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        OblastName: "",
        RegionName: "",
      },
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    (this.filter.oblastid =
      parseInt(this.$route.query.oblastid) || this.filter.oblastid),
      (this.filter.regionid =
        parseInt(this.$route.query.regionid) || this.filter.regionid),
      (this.filter.organizationid =
        parseInt(this.$route.query.organizationid) || this.filter.organizationid),
      (this.filter.sporttypeclassifierId =
        parseInt(this.$route.query.sportTypeClassifierId) ||
        this.filter.sporttypeclassifierId),
        (this.filter.date = (this.$route.query.date) || this.filter.date),
      OblastService.GetAll("", 211, "").then((res) => {
        this.oblastlist = res.data;
      });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sporttypeclassifierlist = res.data;
    });
     SportEventTypeService.GetAll()
        .then((res) => {
          this.SportEventTypeList = res.data;
        })
     SportRankService.GetAll().then((res) => {
      this.sportRanklist = res.data;
    });
    SchoolYearService.GetAll(this.lang).then((res) => {
      this.schoolYearlist = res.data;
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
    Back() {
      this.$router.push({
        name: "GetReportAthleticAchievementCount",
        query: { ...this.$route.query },
      });
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
      GotoStudentCard(item) {
      this.$router.push(`/StudentCard1/id=${item.personid}`);
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
      Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportAthleticAchievementList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.schoolYearId,
        this.filter.sporttypeclassifierId,
        this.filter.sportEventTypeId,
        this.filter.date
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
              "Реестр спортсменов с введенными достигнутыми результатами.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Erishgan natijalari kiritilgan sportchilar reestri.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Эришган натижалари киритилган спортчилар реестри.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetReportAthleticAchievementList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierId,
        this.filter.Search,
        this.filter.Sort,
        this.filter.order,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.schoolYearId,
        this.filter.personName,
        this.filter.personPinfl,
        this.filter.coachName,
        this.filter.coachPinfl,
        this.filter.date,
        this.filter.sportRankId,
        this.filter.sportEventTypeId
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.total;
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
        this.totalRows = res.data.data.total;
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
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    indexMethod(index) {
      return ((this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1)
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
    