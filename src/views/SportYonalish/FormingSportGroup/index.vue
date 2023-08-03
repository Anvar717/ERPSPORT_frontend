<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-2">
          <b-col >
            <CButton
                color="danger"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col>
            <h3 class="text-center ">{{ $t("FormingSportGroup") }}</h3>
          </b-col>
          <b-col class="text-right">
            <CButton
              @click="Create"
              color="primary"
              variant="outline"
              size="sm"
            >
              <b-icon icon="plus"> </b-icon>
              &nbsp; {{ $t("Create") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <CRow class="form-group text-lg-right">
            <CCol sm="12" md="4" lg="4">
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>
            <CCol style="margin-right: -7px;">
              <CCol>
                <div class="d-flex justify-content-end">
                  <div class="mr-2" >
                    <b-button  :variant="
                    cache_filters == false ? 'primary' : 'danger'"
                    size="sm" v-b-toggle.collapse-1
                      ><b-icon icon="funnel-fill"></b-icon>
                    </b-button>
                  </div>
                  <div class="mr-2">
                    <CButton @click="Print" color="primary" size="sm">
                      <b-icon icon="printer" v-if="!PrintLoading"></b-icon>
                      <b-spinner v-if="PrintLoading" small></b-spinner>
                      &nbsp; {{ $t("Print") }}
                    </CButton>
                  </div>
                </div>
              </CCol>
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
          <b-row>
            <b-col>
              <status-list @refresh="statusFilter"></status-list>
            </b-col>
            <b-col>
            </b-col>
          </b-row>
          <!-- <CRow v-if="cache_filters == true">
           <CCol>
             <div class="d-flex flex-row flex-wrap justify-content-end">
               <template v-for="(f, key, index) in shortfilter">
                 <div
                   v-if="f"
                   :key="index"
                   class="shortfilter border" 
                   @click="OpenFiltModal"
                 >
                   <span >{{ getText(key) }} </span>:
                   <span> {{ f }}</span>
                 </div>
               </template>
               <div
               class="shortfilter border"
               @click="clearFilter">
                 <i>
                 <b-icon icon="arrow-repeat"></b-icon>                 
                 <span> {{ $t("Clear") }}</span> </i>
               </div>
             </div>
           </CCol>
         </CRow> -->
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
            @row-dblclicked="Edit"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
            hover
          >
            
           <template #head()="{ label, field: { key, sortable }}">
              <div style="cursor: pointer"  @click="ChangeSort(key)">
                {{ $t(key) }}
                <b-icon
                  :icon="filter.SortIcon"
                  v-if="filter.SortColumn == key"
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
                  v-if="
                    $can('FormingSportGroupEdit', 'permissions') &&
                      item.statusid != 2
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('FormingSportGroupView', 'permissions') && item.statusid == 2"
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="item.statusid != 2"
                  @click="$bvModal.show('AcceptModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Acceptt') }"
                >
                  <b-icon scale="1.2" class="mr-2" icon="check2"></b-icon>
                </b-link>
                <b-link
                  v-if="item.statusid != 2"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" scale="1.2"></b-icon>
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
                      v-if="
                        $can('FormingSportGroupDelete', 'permissions') &&
                          item.statusid != 2
                      "
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
                        $can(
                          'FormingSportGroupCancelApproval',
                          'permissions'
                        ) &&
                          item.statusid != 3 &&
                          item.statusid != 1
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
                      v-if="
                        $can('FormingSportGroupApprove', 'permissions') &&
                          item.statusid != 2
                      "
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
import FormingSportGroupService from "@/services/FormingSportGroup.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SportGroupService from "@/services/SportGroup.service";
import CustomFilter from "../../../components/CustomFilter.vue";
import CustomFilterCollapse from "../../../components/customFilterCollapse.vue";
import StatusList from '../../../components/StatusList.vue'
import indexTable from '../../../mixins/indexTable'
export default {
  components: { CustomFilter, CustomFilterCollapse, StatusList },
  mixins : [indexTable],
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
          sortable : false
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
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("Sport turi"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportgroupname",
          label: this.$t("sportgroupname"),
          thStyle: { width: "20%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "academichours",
          label: this.$t("academichours"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "coachpersonname",
          label: this.$t("coachpersonname"),
          thStyle: { width: "15%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportsmennames",
          label: this.$t("sportsmennames"),
          thStyle: { width: "30%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "detail",
          label: this.$t("detail"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
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
      totalRows: "",
      PrintLoading: false,
      FilterModal: false,
      isBusy: true,   
      cache_filters: false,
      shortfilter: [],  
      filter: {
        // ID: 0,
        statusid: 0,
        sporttypeclassifierid:0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 50,
        schoolyearid: 0,
        sportgroupid: 0,
        sportsmename: "",
        coachname: "",
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        // searchtype: 2,
        searchtype2: "",
        searchtype1: "",
        fakeSearch: "",
      },
      schoolyearlist: [],
      SearchTypeList: [
        { id: 1, name: this.$t("personname1") },
        { id: 2, name: this.$t("Coach") },
        // { id : 4,name : this.$t('inn') }
      ],
      sportgrouplist: [],
    };
  },
  created() {
    if (this.$store.state.FormingSportGroupFilter.Search != undefined) {
      this.filter = this.$store.state.FormingSportGroupFilter;
    }
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    SportGroupService.GetAll().then((res) => {
      this.sportgrouplist = res.data;
    });
    this.Refresh();
  },
  methods: {  
    onSortChanged(data) {
      this.filter.OrderType = data.sortDesc ? 'desc' : 'asc'
      this.filter.SortColumn = data.sortBy
      this.Refresh()
    },  
    statusFilter(status) {
      this.filter.statusid = status
      this.Refresh()
    },
    
    View(item) {
      this.$router.push({
        name: "ViewFormingSportGroup",
        params: {
          id: item.id,
        },
        query: {
          isremain: false,
        },
      });
      this.$store.state.FormingSportGroupFilter = this.filter;
    },
    PushRemainStudents(item) {
      this.$router.push({
        name: "ViewFormingSportGroup",
        params: {
          id: item.id,
        },
        query: {
          isremain: true,
        },
      });
      this.$store.state.FormingSportGroupFilter = this.filter;
    },
    Approve(item) {
        var self = this;
        FormingSportGroupService.Approve(item.id)
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
    ChangeSearchType() {
      this.filter.sportsmename = "";
      this.filter.coachname = "";
      this.filter.fakeSearch = "";
    },
    OpenFiltModal() {
      this.FilterModal = true;
    },
    Search() {
      this.FilterModal = false;
      this.cache_filters = true
      var self = this.filter

      if (self.schoolyearid == 0 &&
        self.sportgroupid == 0 && self.sporttypeclassifierid == 0 &&
        self.sportsmename == "" && self.coachname == ""
      ) {
        this.cache_filters = false;
        this.Refresh();
        return
      } else {

        if (this.filter.PageNumber !== 1) {
          this.filter.PageNumber = 1;
        }
        // this.shortfilter = {
        //   // ID: this.filter.ID,
        //   sporttypeclassifier: this.filter.sporttypeclassifierid,        
        //   schoolyear: this.filter.schoolyearid,
        //   SportGroup: this.filter.sportgroupid,
        //   Student: this.filter.sportsmename,
        //   coachname: this.filter.coachname,
        }
        this.Refresh();
            
    },
    clearFilter() {
      // this.shortfilter = {
      //   // ID: 0,       
      //   schoolyearid: 0,
      //   sportgroupid: 0,
      //   sporttypeclassifierid:0,
      //   sportsmename: "",
      //   coachname: "",  
      // }    
       this.filter = {
         // ID: 0,
        statusid: 0,
        sporttypeclassifierid:0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        schoolyearid: 0,
        sportgroupid: 0,
        sportsmename: "",
        coachname: "",
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      }           
      this.cache_filters = false
      this.Refresh();      
    },
    Create() {
      this.$router.push({
        name: "EditFormingSportGroup",
        params: {
          id: 0,
        },
      });
      this.$store.state.FormingSportGroupFilter = this.filter;
    },
    Edit(item) {
      this.$router.push({
        name: "EditFormingSportGroup",
        params: {
          id: item.id,
          isEdit: true
        },
        query: {
          Search: this.filter.Search,
        },
      });
      this.$store.state.FormingSportGroupFilter = this.filter;
    },
    Delete(item) {
      FormingSportGroupService.Delete(item.id)
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
    
    Print() {
      (this.PrintLoading = true),
        FormingSportGroupService.PrintFormingSportGroup(
          this.filter.statusid,
          this.filter.Search,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit,
          this.filter.schoolyearid,
          this.filter.sportgroupid,
          this.filter.sportsmename,
          this.filter.coachname,
          this.filter.sporttypeclassifierid
        )
          .then((res) => {
            (this.PrintLoading = false),
              this.forceFileDownload(res, "PrintFormingSportGroup");
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
            this.PrintLoading = false;
          });
    },

    Refresh() {
      this.isBusy = true;
      FormingSportGroupService.GetList(
        this.filter.statusid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.schoolyearid,
        this.filter.sportgroupid,
        this.filter.sportsmename,
        this.filter.coachname,
        this.filter.sporttypeclassifierid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
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
