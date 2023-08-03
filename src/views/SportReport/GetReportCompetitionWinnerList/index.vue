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
          <b-col md="8">
            <h4 class="text-center">{{ $t("Musobaqa hisoboti") }}</h4>
          </b-col>
          <b-col md="2">
            <CButton class="float-right" color="primary" size="sm" @click="Print">
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
              >{{ item.personname }}</a>
            </template>
            <template v-slot:cell(index)="{ index }">{{ indexMethod(index) }}</template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-primary my-2" style="vertical-align: middle">
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
              <div class="per-page" style="float: left; font-size: 12px">{{ $t("RecordsPerPage") }}</div>
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
        genderid: 0,
        sportrankId: 0,
        sporttypeclassifierid: 0,
        sporteventtypeid: 0, 
        competitiontypeid: 0, 
        sporteventid: 0, 
        sportcompetitiontypeid: 0, 
        // oblastid: 0,
        // regionid:0, 
        // organizationid: 0, 
        personName: "", 
        pinfl: "", 
        StartDate: "", 
        EndDate: "", 
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
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
          tdClass: "text-center"
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "fullname",
          label: this.$t("personname1"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
        {
          key: "pinfl",
          label: this.$t("Pinfl"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
        // {
        //   key: "competitonnumber",
        //   label: this.$t("CompetitonNumber"),
        //   sortable: false,
        //   thClass: "text-center",
        //   tdClass: "text-left"
        // },
        {
          key: "sportcompetitiontypename",
          label: this.$t("sportcompetitiontypename"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
        {
          key: "sporteventtypename",
          label: this.$t("SportEventType"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
          {
            key: "competitiontypename",
            label: this.$t("CompetitionType"),
            sortable: false,
            thClass: "text-center",
            tdClass: "text-left"
          },
        {
          key: "sporteventname",
          label: this.$t("SportEvent"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left"
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "sporttypeclassifierdisciplinename",
          label: this.$t("SportProgram"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-cenetr"
        },
        // {
        //   key: "result",
        //   label: this.$t("resultinfo"),
        //   sortable: false,
        //   thClass: "text-center",
        //   tdClass: "text-left"
        // },
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasure"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "sportrankname",
          label: this.$t("sportrank"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
      ],
      oblastlist: [],
      regionlist: [],
      sporttypeclassifierlist: [],
      squadtypelist: [],
      genderlist: [],
      sportteamtypelist: []
    };
  },
  created() {
    (this.filter.squadlevelid =
      parseInt(this.$route.query.squadLevelId) || this.filter.squadlevelid),
      (this.filter.sporttypeclassifierid =
        parseInt(this.$route.query.sportTypeclassifierid) ||
        this.filter.sporttypeclassifierid),
      // (this.filter.oblastid =
      //   parseInt(this.$route.query.oblastid) || this.filter.oblastid),
      (this.filter.regionid =
        parseInt(this.$route.query.regionid) || this.filter.regionid),
      OblastService.GetAll(this.lang).then(res => {
        this.oblastlist = res.data;
      });
    SportTypeClassifierService.GetAll(true).then(res => {
      this.sporttypeclassifierlist = res.data;
    });
    SportTeamSquadTypeService.GetAll().then(res => {
      this.squadtypelist = res.data;
    });
    HelperService.GetGenderList().then(res => {
      this.genderlist = res.data;
    });
    SportTeamTypeService.GetAll().then(res => {
      this.sportteamtypelist = res.data;
    });
    SportTeamSquadLevelService.GetAll().then(res => {
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
    }
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue) {
        this.filter.PageNumber = newValue;
        this.Refresh();
      }
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    }
  },
  methods: {
    ChangeOblast(item) {
      if (!item) {
        this.filter.regionid = 0;
      }
      if (!!this.filter.oblastid) {
        this.Refresh();
        RegionService.GetAll(this.lang, this.filter.oblastid).then(res => {
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
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1;
    },
    Back() {
      this.$router.push({
        name: "ReportFormingTeamSquad",
        query: { ...this.$route.query }
      });
    },
    Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportCompetitionWinnerList(
         this.filter.genderid,
        this.filter.sportrankId,
        this.filter.sporttypeclassifierid,
        this.filter.sporteventtypeid,
        this.filter.competitiontypeid,
        this.filter.sporteventid,
        this.filter.sportcompetitiontypeid,
        0,
        0,
        0,
        this.filter.personName,
        this.filter.pinfl,
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then(response => {
          this.PrintLoading = false;
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Отчет о соревнованиях.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Musobaqa hisoboti.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Мусобақа хисоботи.xlsx"
            );
          }

          fileLink.click();
        })
        .catch(e => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetReportCompetitionWinnerList(
        this.filter.genderid,
        this.filter.sportrankId,
        this.filter.sporttypeclassifierid,
        this.filter.sporteventtypeid,
        this.filter.competitiontypeid,
        this.filter.sporteventid,
        this.filter.sportcompetitiontypeid,
        // this.filter.oblastid,
        // this.filter.regionid,
        // this.filter.organizationid,
        0,
        0,
        0,
        this.filter.personName,
        this.filter.pinfl,
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then(res => {
          this.items = res.data.rows;
          this.totalRows = res.data.total;
        })
        .finally(res => {
          this.isBusy = false;
        });
    }
  }
};
</script>