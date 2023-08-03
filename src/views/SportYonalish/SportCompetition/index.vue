<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head mt-3 p-3 text-center">
          <h3 class="text-center w-100">{{ $t("SportCompetition") }}</h3>
        </div>
        <CCardHeader>
          <CRow class="form-group ">
            <CCol lg="4" md="4" sm="12" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="8" md="8" sm="12">
              <div class="d-flex w-100 justify-content-lg-end">
                <div class="mr-2">
                 <b-button variant="primary" size="sm" @click="OpenFiltModal"
                    ><b-icon icon="funnel-fill"></b-icon>
                  </b-button>
              </div>
              <div class="mr-2">
                <CDropdown placement="bottom-end" add-menu-classes="pt-0">
                  <template #toggler>
                    <CHeaderNavLink class="mx-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        size="sm"
                      >
                        <b-icon icon="plus"> </b-icon>
                        &nbsp; {{ $t("Create") }}
                      </CButton>
                    </CHeaderNavLink>
                  </template>
                  <CDropdownItem @click="Create(item.id)" v-for="(item, index) in sportCompetitionTypes" :key="index">{{ item.name }}</CDropdownItem>
                </CDropdown>
              </div>
              <!-- <div class="mr-2">
                <CButton @click="Print" color="primary"  size="sm">
                  <b-icon icon="printer" v-if="!PrintLoading"></b-icon>
                  <b-spinner v-if="PrintLoading" small></b-spinner>
                  
                  &nbsp; {{ $t("Print") }}
                </CButton>
              </div> -->

              <!-- <div class="mr-2">
                <CButton
                  color="danger"
                  class="float-sm-right"
                  @click="$router.push('/')"
                  size="sm"
                >
                  <b-icon icon="arrow-right"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div> -->
              </div>
            </CCol>
          </CRow>
           <b-row>
            <b-col lg="6">
              <b-button-group @click="Refresh" size="sm" class="sportTitle-btn-group">
                <b-button
                  @click="filter.statusid = 0"
                  :variant="
                    filter.statusid == 0 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("All") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 1"
                  :variant="
                    filter.statusid == 1 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("AllNew") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 4"
                  :variant="
                    filter.statusid == 4 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("edited") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 2"
                  :variant="
                    filter.statusid == 2 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("accepted") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 3"
                  :variant="
                    filter.statusid == 3 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("canceled1") }}
                </b-button>
              </b-button-group>
            </b-col>
            <b-col lg="6" style="display: flex; justify-content: right;">
              <b-button-group @click="Refresh" size="sm" class="sportTitle-btn-group">
                <b-button
                  @click="filter.sportcompetitiontypeid = 0"
                  :variant="
                    filter.sportcompetitiontypeid == 0 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("All") }}
                </b-button>
                <b-button
                  v-for="(item, index) in sportCompetitionTypes"
                  @click="filter.sportcompetitiontypeid = item.id"
                  :variant="
                    filter.sportcompetitiontypeid == item.id ? 'primary' : 'outline-primary'
                  "
                >
                  {{ item.name }}
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="min-height: 500px"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            @row-dblclicked="Edit"
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
            
            hover
          >
            <template v-slot:head(id)>
              <div style="cursor: pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor: pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon
                  v-if="filter.SortColumn === 'docnumber'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor: pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon
                  v-if="filter.SortColumn === 'docdate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(fromschoolyear)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('fromschoolyear')"
              >
                {{ $t("fromschoolyear") }}
                <b-icon
                  v-if="filter.SortColumn === 'fromschoolyear'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(sportteamsquadlevelname)>
              <div style="cursor: pointer" @click="ChangeSort('sportteamsquadlevelname')">
                {{ $t("SportTeamSquadLevel") }}
                <b-icon
                  v-if="filter.SortColumn === 'sportteamsquadlevelname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(sportteamsquadtypename)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('sportteamsquadtypename')"
              >
                {{ $t("sportteamsquadtype") }}
                <b-icon
                  v-if="filter.SortColumn === 'sportteamsquadtypename'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(sporttypeclassifiername)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('sporttypeclassifiername')"
              >
                {{ $t("sporttypeclassifier") }}
                <b-icon
                  v-if="filter.SortColumn === 'sporttypeclassifiername'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(gendername)>
              <div style="cursor: pointer" @click="ChangeSort('gendername')">
                {{ $t("gender") }}
                <b-icon
                  v-if="filter.SortColumn === 'gendername'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(statusname)>
              <div style="cursor: pointer" @click="ChangeSort('statusname')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'statusname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">
              <div class="statcol">{{item.statusname}}</div>
            </CBadge>
            </template>
            <template v-slot:cell(sportsmennames)="{ item }">
              <span>{{ item.sportsmennames }}</span>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="Edit(item)"
                  v-if="$can('SportCompetitionEdit', 'permissions') && item.statusid != 2"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('SportCompetitionView', 'permissions')"
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                 v-if="$can('SportCompetitionDelete', 'permissions') && item.statusid != 2"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" scale="1.2"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('SportCompetitionApprove', 'permissions') && item.statusid != 2"
                   @click="$bvModal.show('AcceptModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Acceptt') }"
                >
                    <b-icon  scale="1.2" icon="check2"></b-icon>
                </b-link>
                <b-link
                 v-if="$can('SportCompetitionCancelApproval', 'permissions') && item.statusid != 3 && item.statusid != 1 && item.statusid != 4"
                 @click="$bvModal.show('CancelModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('NotAccept') }"
                >
                  <b-icon icon="x" scale="1.2" ></b-icon>
                </b-link>
                <b-modal :id="'DeleteModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('DeleteModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton
                      @click="Delete(item)"
                      v-if="$can('SportCompetitionDelete', 'permissions') && item.statusid != 2"
                      color="success"
                    >
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'CancelModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantCancel") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('CancelModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton
                      @click="CancelApproval(item)"
                      color="success"
                    >
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'AcceptModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('AcceptModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton
                      @click="Approve(item)"
                      color="success"
                    >
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
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
                  id="PageLimitSelect"
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
                class="my-0"
              ></b-pagination>
            </div>
          </div>
          <b-modal
            v-model="FilterModal"
            hide-footer
            size="lg"
            no-close-on-backdrop
            :title="$t('Filters')"
          >
            <custom-filter
              :filter="filter"
              @search="Search"
              v-model="filter"
              @clear="clearFilter"
              @close="FilterModal = false"
            ></custom-filter>
          </b-modal>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SportCompetitionService from "@/services/SportCompetition.service";
import CustomFilter from "../../../components/CustomFilter.vue";
import HelperService from "@/services/helper.service";
export default {
  components: { CustomFilter },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "id",
          label: this.$t("id"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "docdate",
          label: this.$t("ihincomedate"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("Sport turi"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "sportcompetitiontypename",
          label: this.$t("sportcompetitiontypename"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "sporteventtypename",
          label: this.$t("SportEventType"),
          thStyle: { width: "20%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "sporteventname",
          label: this.$t("SportEvent"),
          thStyle: { width: "20%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "competitiontypename",
          label: this.$t("competitiontype"),
          thStyle: { width: "20%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
          thStyle: "vertical-align: middle;"
        },
         {
          key: "currentstepname",
          label: this.$t("currentstepname"),
          thStyle: { width: "20%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
          thStyle: "vertical-align: middle;"
        },
        {
          key: "statusname",
          label: this.$t("status"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: "vertical-align: middle;"
        },
      ],
      items: [],
      sportteamsquadtypelist:[],
      sportteamsquadlevellist:[],
      sporttypeclassifierlist:[],
      genderlist:[],
      totalRows: "",
      isBusy: true,
      CancelApprovalLoading:false,
      ApproveLoading:false,
      FilterModal: false,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporteventtypeid: 0,
        competitiontypeid: 0,
        sporttypeclassifierid:0,
        sporteventid: 0,
        statusid:0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        sportcompetitiontypeid : 0
      },
      schoolyearlist: [],
      sportgrouplist: [],
      sportCompetitionTypes: [],
      OblastList: [],
      RegionList: [],
      OrganizationList:[],
    };
  },
  created() {
    if (this.$store.state.CompetitionFilter.Search != undefined) {
      this.filter = this.$store.state.CompetitionFilter;
    }
    HelperService.GetAllSportCompetitionType().then(res => {
      this.sportCompetitionTypes = res.data;
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
    View(item) {
      this.$router.push({
        name: "ViewSportCompetition",
        params: {
          id: item.id,
        },
        query: {
          Search: this.filter.Search,
          uid : item.uid
        },
      });
      this.$store.state.CompetitionFilter = this.filter;
    },
    OpenFiltModal() {
      this.FilterModal = true;
    },
    Search() {
      this.FilterModal = false;
        this.Refresh();
        this.$store.state.CompetitionFilter = this.filter;
    },
    ChangeSearchType() {
      this.filter.sportsmename = "";
      this.filter.coachname = "";
    },
    getItemColor(id) {
      return id === 1
        ? "primary"
        : id === 2
        ? "success"
        : id === 3
        ? "danger"
        : id === 4
        ? "primary"
        : "primary";
    },
    rowclicked() {},
    Create(id) {
      this.$router.push({
        name: "EditSportCompetition",
        params: {
          id: 0,
        },
        query:{sportCompetitionType: id}
      });
      this.$store.state.CompetitionFilter = this.filter;
    },
    Edit(item) {
      this.$router.push({
        name: "EditSportCompetition",
        params: {
          id: item.id,
        },
        query: {
          Search: this.filter.Search,
          uid : item.uid
        },
      });
      this.$store.state.CompetitionFilter = this.filter;
    },
    Approve(item) {
      var self = this;
      SportCompetitionService.Approve(item.uid)
        .then((res) => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    CancelApproval(item) {
      var self = this;
      SportCompetitionService.CancelApproval(item.uid)
        .then((res) => {
          self.makeToast(
            self.$t("CancelMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    Delete(item) {
      SportCompetitionService.Delete(item.uid)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    Refresh() {
      this.isBusy = true;
      SportCompetitionService.GetList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.sportcompetitiontypeid,
        this.filter.competitiontypeid,
        this.filter.sporteventtypeid,
        this.filter.sporteventid,
        this.filter.statusid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
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
    
    clearFilter(){
    this.filter = {
      oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporteventtypeid: 0,
        competitiontypeid: 0,
        sporttypeclassifierid:0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
    };
    this.Refresh()
    },ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
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
