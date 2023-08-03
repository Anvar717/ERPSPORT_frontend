<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="Back" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"
            ><h4 class="text-center">
              {{ $t("ReportFormingTeamSquadSportsman") }}
            </h4></b-col
          >
          <b-col md="2">
            <CButton
              class="float-right"
              color="primary"
              size="sm"
              @click="Print" 
            >
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              {{ $t("Print") }}
            </CButton>
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
import SportReportService from "@/services/SportReport.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportTeamSquadTypeService from "@/services/SportTeamSquadType.service";
import HelperService from "@/services/helper.service";
import SportTeamTypeService from "@/services/SportTeamType.service";
import SportTeamSquadLevelService from "@/services/SportTeamSquadLevel.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
    components: {
      CustomReportFilter
  },
  data() {
    return {
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationId: 0,
        schoolYearId: 0,
        sporttypeclassifierid: 0,
        squadlevelid: 0,
        squadtypeid: 0,
        genderid: 0,
        sportteamtypeid: 0,
        date: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
      },
      isBusy: false,
      PrintLoading: false,
      totalRows: "",
      items: [],
      squadlevellist: [],
      fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("SportTypeClassifier"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportteamsquadlevelname",
          label: this.$t("sportteamsquadlevel"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportteamsquadtypename",
          label: this.$t("sportteamsquadtype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportteamtypename",
          label: this.$t("sportteamtypename"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      oblastlist: [],
      regionlist: [],
      sporttypeclassifierlist: [],
      squadtypelist: [],
      genderlist: [],
      sportteamtypelist: [],
    };
  },
  created() {
    (this.filter.squadlevelid =
      parseInt(this.$route.query.squadLevelId) || this.filter.squadlevelid),
      (this.filter.sporttypeclassifierid =
        parseInt(this.$route.query.sportTypeclassifierid) ||
        this.filter.sporttypeclassifierid),
      (this.filter.oblastid =
        parseInt(this.$route.query.oblastid) || this.filter.oblastid),
      (this.filter.regionid =
        parseInt(this.$route.query.regionid) || this.filter.regionid),
        (this.filter.date = (this.$route.query.date) || this.filter.date),
      OblastService.GetAll(this.lang).then((res) => {
        this.oblastlist = res.data;
      });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sporttypeclassifierlist = res.data;
    });
    SportTeamSquadTypeService.GetAll().then((res) => {
      this.squadtypelist = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    SportTeamTypeService.GetAll().then((res) => {
      this.sportteamtypelist = res.data;
    });
    SportTeamSquadLevelService.GetAll().then((res) => {
      this.squadlevellist = res.data;
    });
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
  methods: {
    ChangeOblast(item) {
      if (!item) {
        this.filter.regionid = 0;
      }
      if (!!this.filter.oblastid) {
        this.Refresh();
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
     GotoStudentCard(item) {
      this.$router.push(`/StudentCard1/id=${item.personid}`);
    },
    Search() {
      this.Refresh();
    },
    indexMethod(index) {
      return ((this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1)
    },
    Back() {
      this.$router.push({
        name: "ReportFormingTeamSquad",
        query: { ...this.$route.query },
      });
    },
     Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportFormingTeamSquadList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationId,
        this.filter.sporttypeclassifierid,
        this.filter.squadlevelid,
        this.filter.squadtypeid,
        this.filter.genderid,
        this.filter.sportteamtypeid,
        this.filter.date,
        // this.filter.Search,
        // this.filter.SortColumn,
        // this.filter.OrderType,
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
              "Реестр спортсменов, входящих в сборную.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Terma jamoaga a'zo sportchilar reestri.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Терма жамоага аъзо спортчилар реестри.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    // Print() {
    //   this.PrintLoading = true;
    //   SportReportService.PrintFormingTeamSquadList(
    //    this.filter.oblastid,
    //     this.filter.regionid,
    //     this.filter.organizationId,
    //     this.filter.schoolYearId,
    //     this.filter.sporttypeclassifierid,
    //     this.filter.squadlevelid,
    //     this.filter.squadtypeid,
    //     this.filter.genderid,
    //     this.filter.sportteamtypeid,
    //     this.filter.Search,
    //     this.filter.SortColumn,
    //     this.filter.OrderType
    //   )
    //     .then((response) => {
    //       this.PrintLoading = false;
    //       var fileURL = window.URL.createObjectURL(
    //         new Blob([response.data], response.headers)
    //       );
    //       var fileLink = document.createElement("a");

    //       fileLink.href = fileURL;
    //       if (this.lang == "ru") {
    //         fileLink.setAttribute(
    //           "download",
    //           "Реестр спортсменов, входящих в сборную.xlsx"
    //         );
    //       } else if (this.lang == "uz_latn") {
    //         fileLink.setAttribute(
    //           "download",
    //           "Terma jamoaga aʼzo sportchilar reyestri.xlsx"
    //         );
    //       } else {
    //         fileLink.setAttribute(
    //           "download",
    //           "Терма жамоага аъзо спортчилар реестри.xlsx"
    //         );
    //       }

    //       fileLink.click();
    //     })
    //     .catch((e) => {
    //       let response = JSON.parse(e.request.response);

    //       self.makeToast(response.error, self.$t("actions.error"), "danger");
    //     });
    // },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetReportFormingTeamSquadList(
        this.filter.oblastid,
        this.filter.regionId,
        this.filter.sporttypeclassifierid,
        this.filter.squadlevelid,
        this.filter.squadtypeid,
        this.filter.genderid,
        this.filter.sportteamtypeid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.date
      ).then((res) => {
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
      })
      .finally(res =>{
        this.isBusy= false
      })
    },
  },
};
</script>