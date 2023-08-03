<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head mt-3 p-3">
          <div class="w-100 text-center">
            <h3 class="text-center">{{ $t("FormingTeamSquad") }}</h3>
          </div>
        </div>
        <CCardHeader>
          <CRow class=" form-group">

            <CCol
              lg="4"
              md="4"
              sm="12"
              class="text-left mt-3 ml-0 mr-2 pl-0 pr-0"
            >
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>

            <CCol class=" d-flex align-items-center justify-content-end">
              <div class=" d-flex justify-content-end ">
                <div class="mr-2">
                  <b-button 
                  variant="primary"
                  size="sm"
                  v-b-toggle.collapse-1
                    ><b-icon icon="funnel-fill"></b-icon>
                  </b-button>
                </div>

                <CButton
                  @click="Create"
                  color="primary"
                  variant="outline"
                  class="mr-2"
                  size="sm"
                >
                  <b-icon icon="plus"> </b-icon>
                  &nbsp; {{ $t("Create") }}
                </CButton>
              </div>
            </CCol>
          </CRow>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <custom-filter-collapse
                :filter="filter"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-filter-collapse>
            </b-card>
          </b-collapse>
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
              <div
                style="cursor: pointer"
                @click="ChangeSort('sportteamsquadlevelname')"
              >
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
                <div>{{ item.statusname }}</div>
              </CBadge>
            </template>
            <template v-slot:cell(sportsmennames)="{ item }">
              <span>{{ item.sportsmennames }}</span>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="Edit(item)"
                  v-if="
                    $can('FormingTeamSquadEdit', 'permissions') &&
                      item.statusid != 2
                  "
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('FormingTeamSquadView', 'permissions')"
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="
                    $can('FormingTeamSquadDelete', 'permissions') &&
                      item.statusid != 2
                  "
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" scale="1.2"></b-icon>
                </b-link>
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="
                        $can('FormingTeamSquadApprove', 'permissions') &&
                          item.statusid != 2
                      "
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can('FormingTeamSquadCancelApproval', 'permissions') &&
                          item.statusid != 3 &&
                          item.statusid != 1
                      "
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can('FormingTeamSquadDelete', 'permissions') &&
                          item.statusid != 2
                      "
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
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
                      v-if="
                        $can('FormingTeamSquadDelete', 'permissions') &&
                          item.statusid != 2
                      "
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
                    <CButton @click="CancelApproval(item)" color="success">
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
                    <CButton @click="Approve(item)" color="success">
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
            >
            </custom-filter>
          </b-modal>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import FormingTeamSquadService from "@/services/FormingTeamSquad.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SportGroupService from "@/services/SportGroup.service";
import SportTeamSquadLevelService from "@/services/SportTeamSquadLevel.service";
import SportTeamSquadTypeService from "@/services/SportTeamSquadType.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import HelperService from "@/services/helper.service";
import CustomFilter from "../../../components/CustomFilter.vue";
import CustomFilterCollapse from "../../../components/customFilterCollapse.vue";

export default {
  components: { CustomFilter, CustomFilterCollapse },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "id",
          label: this.$t("id"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifier"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportteamsquadlevelname",
          label: this.$t("SportTeamSquadLevel"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportteamsquadtypename",
          label: this.$t("SportTeamSquadType"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },

        {
          key: "gendername",
          label: this.$t("gender"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      items: [],
      sportteamsquadtypelist: [],
      sportteamsquadlevellist: [],
      SporttypeclassifierList: [],
      genderlist: [],
      totalRows: "",
      isBusy: true,
      FilterModal: false,
      CancelApprovalLoading: false,
      ApproveLoading: false,
      filter: {
        sportteamsquadtypeid: 0,
        sportteamsquadlevelid: 0,
        sporttypeclassifierid: 0,
        genderid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        // schoolyearid: 0,
        // sportgroupid: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        // searchtype: 2,
        // fakeSearch: "",
      },
      schoolyearlist: [],
      sportgrouplist: [],
    };
  },
  created() {
    if (this.$store.state.FormingTeamSquadFilter.Search != undefined) {
      this.filter = this.$store.state.FormingTeamSquadFilter;
    }
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    SportGroupService.GetAll().then((res) => {
      this.sportgrouplist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SporttypeclassifierList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    SportTeamSquadLevelService.GetAll()
      .then((res) => {
        this.sportteamsquadlevellist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportTeamSquadTypeService.GetAll()
      .then((res) => {
        this.sportteamsquadtypelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
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
    clearFilter() {
      this.filter = {
        sportteamsquadtypeid: 0,
        sportteamsquadlevelid: 0,
        sporttypeclassifierid: 0,
        genderid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
    },
    OpenFiltModal() {
      this.FilterModal = true;
    },
    View(item) {
      this.$router.push({
        name: "ViewFormingTeamSquad",
        params: {
          id: item.id,
        },
        query: {
          isremain: false,
        },
      });
      this.$store.state.FormingTeamSquadFilter = this.filter;
    },
    Search() {
      this.FilterModal = false;
      this.Refresh();
      this.$store.state.FormingTeamSquadFilter = this.filter;
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
    Create() {
      this.$router.push({
        name: "EditFormingTeamSquad",
        params: {
          id: 0,
        },
      });
      this.$store.state.FormingTeamSquadFilter = this.filter;
    },
    Edit(item) {
      this.$router.push({
        name: "EditFormingTeamSquad",
        params: {
          id: item.id,
        },
        query: {
          Search: this.filter.Search,
        },
      });
      this.$store.state.FormingTeamSquadFilter = this.filter;
    },
    Approve(item) {
      var self = this;
      FormingTeamSquadService.Approve(item.id)
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
      FormingTeamSquadService.CancelApproval(item.id)
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
      FormingTeamSquadService.Delete(item.id)
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
      FormingTeamSquadService.GetList(
        this.filter.sportteamsquadtypeid,
        this.filter.sportteamsquadlevelid,
        this.filter.sporttypeclassifierid,
        this.filter.genderid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
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
    ChangeSort(columnName) {
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
