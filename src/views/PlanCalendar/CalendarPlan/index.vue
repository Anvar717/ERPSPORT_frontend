<template>
  <CRow>
    <CCol sm="12" md="12" lg="12">
      <CCard accent-color="primary">
        <div class="pl-3 pr-2 pt-3">
          <h3 class="text-center">{{ $t("CalendarPlan") }}</h3>
          <div class="d-flex justify-content-end mt-3">
            <div class="mr-2">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </div>
            <div class="mr-2">
              <b-button
                :variant="cache_filters === false ? 'primary' : 'danger'"
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
              <!-- <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton> -->
          </div>
        </div>
        <CCardHeader>                   
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
          <!-- <CRow class="form-group">
            <CCol lg="12" md="10" sm="11" class="text-left mt-2">
              <b-row>
                <b-col lg="4" sm="12">
                  <v-select
                    :options="SportEventCategoryList"
                    v-model="filter.sporteventcategoryid"
                    :reduce="(item) => item.id"
                    @input="Refresh"
                    :placeholder="$t('SportEventCategory')"
                    style="width: 100%"
                    label="name"
                    class="personList-select"
                  ></v-select>
                </b-col>
                <b-col lg="4" sm="12">
                  <v-select
                    :options="SportEventParticipantList"
                    v-model="filter.sporttypegroupid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SportEventParticipant1')"
                    label="name"
                    @input="Refresh"
                    style="width: 100%"
                    class="personList-select"
                  ></v-select>
                </b-col>
                <b-col lg="4" sm="12">
                  <v-select
                    :options="SportEventTypeList"
                    v-model="filter.sporteventtypeid"
                    @input="Refresh"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SportEventType')"
                    label="name"
                    style="width: 100%"
                    class="personList-select"
                  ></v-select>
                </b-col>
              </b-row>
              <b-row class="mt-lg-4">
                <b-col lg="4" sm="12">
                  <v-select
                    :options="CompetitionTypeList"
                    v-model="filter.competitiontypeid"
                    :reduce="(item) => item.id"
                    @input="Refresh"
                    :placeholder="$t('CompetitionType')"
                    label="name"
                    style="width: 100%"
                    class="personList-select"
                  ></v-select>
                </b-col>
                <b-col lg="4" sm="12">
                  <v-select
                    :options="SporttypeclassifierList"
                    v-model="filter.sporttypeclassifierid"
                    @input="Refresh"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SportTypeClassifier')"
                    label="name"
                    style="width: 100%"
                    class="personList-select"
                  ></v-select>
                </b-col>
                <b-col lg="4" sm="12">
                  <div class="d-flex">
                    <v-select
                      :options="SportEventList"
                      @input="Refresh"
                      v-model="filter.sporteventid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('SportEvent')"
                      label="name"
                      style="width: 100%"
                      class="mr-2 personList-select"
                    ></v-select>
                    <CButton
                      @click="Refresh"
                      size="sm"
                      color="primary"
                      variant="outline"
                      class="refresh_btn"
                      style="height: 36px"
                    >
                      <b-icon icon="arrow-repeat"> </b-icon>
                    </CButton>
                  </div>
                </b-col>
              </b-row>
            </CCol> -->
            <!-- <CCol lg="4" md="5" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('search')"
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
            </CCol> -->
            <!-- <CCol lg="2" md="2" sm="1" class="text-left mt-2 pl-0">
              <v-select
                :options="schoolyearlist"
                v-model="filter.schoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolyear')"
                label="name"
              ></v-select>
            </CCol>
            <CCol lg="3" md="3" sm="1" class="text-left mt-2 pl-0">
              <v-select
                :options="sportgrouplist"
                v-model="filter.sportgroupid"
                :reduce="(item) => item.id"
                :placeholder="$t('SportGroup')"
                label="sportgroupname"
              ></v-select>
            </CCol> -->
          <!-- </CRow> -->
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap; min-height: 500px"
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
            <template v-slot:head(toschoolyear)>
              <div style="cursor: pointer" @click="ChangeSort('toschoolyear')">
                {{ $t("toschoolyear") }}
                <b-icon
                  v-if="filter.SortColumn === 'toschoolyear'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(fromorgschoolgrade)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('fromorgschoolgrade')"
              >
                {{ $t("fromorgschoolgrade") }}
                <b-icon
                  v-if="filter.SortColumn === 'fromorgschoolgrade'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(toorgschoolgrade)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('toorgschoolgrade')"
              >
                {{ $t("toorgschoolgrade") }}
                <b-icon
                  v-if="filter.SortColumn === 'toorgschoolgrade'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor: pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'detailinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor: pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(isparticipantunknown)="{ item }">
              <div v-if="item.isparticipantunknown == true">
                <b-badge :variant="getItemColor(item.isparticipantunknown)">
                  {{$t("uncknown")}}
                </b-badge>
              </div>
              <div v-if="item.isparticipantunknown == false"  class="text-left">
                <span> {{ item.sporteventparticipantname }} </span>
              </div>
            </template>
            <template v-slot:cell(islocationunknown)="{ item }">
              <div v-if="item.islocationunknown == true">
                <b-badge :variant="getItemColor(item.islocationunknown)">{{$t("uncknown")}}</b-badge>
              </div>
               <div  v-if="item.islocationunknown == false" class="text-left">
                    <span>
                      {{item.countryname}} {{item.oblastname}} {{item.regionname}}
                    </span>
              </div>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="$can('SportEventCalendarEdit', 'permissions') && item.statusid != 2"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('SportEventCalendarView', 'permissions')"
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <!-- <b-link
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" scale="1.2"></b-icon>
                </b-link> -->
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
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
                      v-if="$can('SportEventCalendarDelete', 'permissions')"
                      @click="Delete(item)"
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
                      v-if="
                        $can('SportEventCalendarCancelApproval', 'permissions')
                      "
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
                      v-if="$can('SportEventCalendarApprove', 'permissions')"
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
import SportEventCalendarService from "@/services/SportEventCalendar.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SportGroupService from "@/services/SportGroup.service";
import SportEventCategoryService from "@/services/SportEventCategory.service";
import vSelect from "vue-select";
import SportTypeGroupService from "@/services/SportTypeGroup.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventTypeService from "@/services/SportEventType.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportEventService from "@/services/SportEvent.service";
import CustomFilterCollapse from "../../../components/customFilterCollapse.vue";
export default {
  components: { CustomFilterCollapse,
    vSelect,
  },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventcategoryname",
          label: this.$t("SportEventCategory"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventtypename",
          label: this.$t("SportEventType"),
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
        // {
        //   key: "details",
        //   label: this.$t("detail"),
        //   sortable: false,
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
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
          key: "sporttypeclassifiername",
          label: this.$t("Sport turi"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "islocationunknown",
          label: this.$t("islocationunknown"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "isparticipantunknown",
          label: this.$t("isparticipantunknown"),
          sortable: false,
          thClass: "text-center",    
          tdClass: "text-center",
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      cache_filters: false,
      filter: {
        sporteventid: 0,
        competitiontypeid: 0,
        sporttypeclassifierid: 0,
        sporteventtypeid: 0,
        sporttypegroupid: 0,
        sporteventcategoryid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      schoolyearlist: [],
      sportgrouplist: [],
      SportEventParticipantList: [],
      SportEventCategoryList: [],
      SportTypeGroupList: [],
      SportEventTypeList: [],
      CompetitionTypeList: [],
      SporttypeclassifierList: [],
      SportEventList: [],
    };
  },
  created() {
    if (!!this.$route.query.Search) {
      this.filter.Search = this.$route.query.Search;
    }
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    SportGroupService.GetAll().then((res) => {
      this.sportgrouplist = res.data;
    });
    SportEventCategoryService.GetAll().then((res) => {
      this.SportEventCategoryList = res.data;
    });
    SportTypeGroupService.GetAll().then((res) => {
      this.SportEventParticipantList = res.data;
    });
    SportEventTypeService.GetAll().then((res) => {
      this.SportEventTypeList = res.data;
    });
    SportEventService.GetAll().then((res) => {
      this.SportEventList = res.data;
    });
    CompetitionTypeService.GetAll().then((res) => {
      this.CompetitionTypeList = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SporttypeclassifierList = res.data;
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
        sporteventid: 0,
        competitiontypeid: 0,
        sporttypeclassifierid: 0,
        sporteventtypeid: 0,
        sporttypegroupid: 0,
        sporteventcategoryid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
      this.cache_filters = false;
      this.Refresh();
    },
    Search() {
      var self = this.filter;
      if (
        self.sporteventid == 0 &&
        self.competitiontypeid == 0 &&
        self.sporteventtypeid == 0 &&
        self.sporttypeclassifierid == 0 &&
        self.sporttypegroupid == 0 &&
        self.sporteventcategoryid == 0
      ) {
        this.cache_filters = false;
        this.Refresh();
        return;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      }
      this.cache_filters = true;
      this.Refresh();
    },
    View(item) {
      this.$router.push({
        name: "ViewCalendarPlan",
        params: {
          id: item.id,
        },
        query: {
          isremain: false,
        },
      });
    },
    PushRemainStudents(item) {
      this.$router.push({
        name: "ViewCalendarPlan",
        params: {
          id: item.id,
        },
        query: {
          isremain: true,
        },
      });
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
        name: "EditCalendarPlan",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditCalendarPlan",
        params: {
          id: item.id,
        },
        query: {
          Search: this.filter.Search,
        },
      });
    },
    Delete(item) {
      SportEventCalendarService.Delete(item.id)
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
    Approve(item) {
      var self = this;
      SportEventCalendarService.Approve(item.id)
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
      SportEventCalendarService.CancelApproval(item.id)
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
    
    Refresh() {
      this.isBusy = true;
      SportEventCalendarService.GetList(
        this.filter.sporteventcategoryid,
        this.filter.sporttypegroupid,
        this.filter.sporteventtypeid,
        this.filter.competitiontypeid,
        this.filter.sporttypeclassifierid,
        this.filter.sporteventid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.schoolyearid,
        this.filter.sportgroupid
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
    "filter.sporteventcategoryid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.sporttypegroupid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.sporteventtypeid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.competitiontypeid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.sporttypeclassifierid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.sporteventid": {
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
