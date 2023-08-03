<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head p-2 mt-3">
          <div class="w-100 text-center">
            <h3 class="text-center">{{ $t("AthleticAchievement") }}</h3>
          </div>
        </div>
        <CCardHeader>
          <CRow class="form-group">
            <CCol sm="12" md="4" lg="5">
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>
            <CCol>
              <CCol>
                <CCol>
                  <div class="d-flex justify-content-end">
                    <div
                      class="mr-2"
                      v-if="
                          $can('AdminView', 'permissions') ||
                          $can('MinSportView', 'permissions') ||
                          $can('OblastSport', 'permissions') ||
                          $can('RegionXTB', 'permissions')
                      "
                    >
                      <b-button
                        variant="primary"
                        size="sm"
                        :variant="cache_filters == false ? 'primary' : 'danger' "
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
                    <CButton
                      @click="Print"
                      color="primary"
                      class="mr-2"
                      size="sm"
                    >
                      <b-icon icon="printer" v-if="!PrintLoading"> </b-icon>
                      <b-spinner v-if="PrintLoading" small></b-spinner>
                      &nbsp; {{ $t("Print") }}
                    </CButton>
                  </div>
                </CCol>
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
            <b-col lg="6" md="4" sm="12" >
              <b-button-group
                @click="Refresh"
                size="sm"
                class="sportTitle-btn-group"
              >
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
            style="height: 500px"
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
            <template v-slot:head(studentcount)>
              <div style="cursor: pointer" @click="ChangeSort('studentcount')">
                {{ $t("studentcount") }}
                <b-icon
                  v-if="filter.SortColumn === 'studentcount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(employeecount)>
              <div style="cursor: pointer" @click="ChangeSort('employeecount')">
                {{ $t("employeecount") }}
                <b-icon
                  v-if="filter.SortColumn === 'employeecount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(statusname)>
              <div style="cursor: pointer" @click="ChangeSort('statusname')">
                {{ $t("statusname") }}
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
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="
                    $can('AthleticAchievementEdit', 'permissions') &&
                      item.statusid != 2
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="
                        $can('AthleticAchievementApprove', 'permissions') &&
                          item.statusid != 2
                      "
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can(
                          'AthleticAchievementCancelApproval',
                          'permissions'
                        ) &&
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
                        $can('AthleticAchievementDelete', 'permissions') &&
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
                    <CButton @click="Delete(item)" color="success">
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
                class="text-center text-primary my-2 mt-5"
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
import AthleticAchievementService from "@/services/AthleticAchievement.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
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
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
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
          key: "personname",
          label: this.$t("personname1"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "details",
          label: this.$t("detail"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      FilterModal: false,
      PrintLoading: false,
      cache_filters: false,
      isBusy: true,
      filter: {
        statusId: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        organizationid: 0,
        oblastid: 0,
        regionid: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
    };
  },
  created() {
    if (this.$store.state.AthleticAchievementFilter.Search != undefined) {
      this.filter = this.$store.state.AthleticAchievementFilter;
    }
    HelperService.GetOblastList().then((res) => {
      this.OblastList = res.data;
    });
    this.clearFilter()
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
  //   getText(key) {  
  //   return this.$t(key);
  // },
    clearFilter() {     
      this.filter = {
        statusId: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        organizationid: 0,
        oblastid: 0,
        regionid: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      };
      this.cache_filters = false
      this.Refresh();  
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
        name: "EditAthleticAchievement",
        params: {
          id: 0,
        },
      });
      this.$store.state.AthleticAchievementFilter = this.filter;
    },
    Edit(item) {
      this.$router.push({
        name: "EditAthleticAchievement",
        params: {
          id: item.id,
        },
      });
      this.$store.state.AthleticAchievementFilter = this.filter;
    },
    View(item) {
      this.$router.push({
        name: "ViewAthleticAchievement",
        params: {
          id: item.id,
        },
        query: {
          isremain: false,
        },
      });
      this.$store.state.AthleticAchievementFilter = this.filter;
    },
    Delete(item) {
      AthleticAchievementService.Delete(item.id)
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
    changeOblast() {
      this.filter.regionid = null;
      this.filter.organizationid = null;
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
      });
    },
    changeRegion() {
      this.filter.organizationid = null;
      OrganizationService.GetAll(
        this.filter.oblastid,
        this.filter.regionid,
        "",
        "",
        ""
      ).then((res) => {
        this.OrganizationList = res.data;
      });
    },
    Approve(item) {
      var self = this;
      AthleticAchievementService.Approve(item.id)
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
      AthleticAchievementService.CancelApproval(item.id)
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
    OpenFiltModal() {
      this.FilterModal = true;
    },
    Search() {
      this.FilterModal = false;    
      var self = this.filter  

      if (self.oblastid == 0 && self.regionid == 0 && self.organizationid == 0) {
        this.cache_filters = false 
        this.Refresh();
        return
      } else {
        if (this.filter.PageNumber !== 1) {
          this.filter.PageNumber = 1;
      }   
      this.cache_filters = true    
        this.Refresh();
        this.$store.state.AthleticAchievementFilter = this.filter;
      }
      
       
        
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
    Print() {
      (this.PrintLoading = true),
        AthleticAchievementService.PrintAthleticAchievement(
          this.filter.statusId,
          this.filter.Search,
          this.filter.SortColumn,
          this.filter.OrderType,
          this.filter.PageNumber,
          this.filter.PageLimit,
          this.filter.organizationid,
          this.filter.oblastid,
          this.filter.regionid
        )
          .then((res) => {
            (this.PrintLoading = false),
              this.forceFileDownload(res, "PrintAthleticAchievement");
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
      AthleticAchievementService.GetList(
        this.filter.statusid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.organizationid,
        this.filter.oblastid,
        this.filter.regionid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;

        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
        }
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.regionId = res.data.regionid;
        }
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
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
