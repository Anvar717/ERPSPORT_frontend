<template>
  <b-card :body-style="{ padding: '1em' }" shadow="never">
    <b-row class="w-100 mb-5 justify-content-center">
      <h3 class="text-center">{{ $t('finalmarkpage') }}</h3>
    </b-row>
    <b-row class="mb-3">
      <b-col lg="6">
        <b-button-group
          @click="Refresh"
          class="sportTitle-btn-group studentFinalMark-btn"
        >
          <b-button
            @click="filter.hasstudentfinalmark = null"
            :variant="
              filter.hasstudentfinalmark == null ? 'primary' : 'outline-primary'
            "
          >
            {{ $t("all_marked_unmarked") }}
          </b-button>
          <b-button
            @click="filter.hasstudentfinalmark = true"
            :variant="
              filter.hasstudentfinalmark == true ? 'primary' : 'outline-primary'
            "
          >
            {{ $t("only_marked") }}
          </b-button>
          <b-button
            @click="filter.hasstudentfinalmark = false"
            :variant="
              filter.hasstudentfinalmark == false ? 'primary' : 'outline-primary'
            "
          >
            {{ $t("not_marked") }}
          </b-button>
        </b-button-group>
      </b-col>
      <b-col lg="6" class="text-right">
        <custom-search
          v-model="filter.Search"
          @search="Search"
          class="searchInput"
        ></custom-search>
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col sm="12" md="2" lg="3" class="achievement-input">
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
      <b-col sm="12" md="2" lg="3" class="achievement-input">
        <label> {{ $t("Region") }} </label>
        <v-select
          :options="RegionList"
          v-model="filter.regionid"
          :reduce="(item) => item.id"
          :placeholder="$t('region')"
          label="name"
          @input="changeRegion"
          :disabled="
          !$can('AdminView', 'permissions') &&
          !$can('MinSportView', 'permissions') &&
          !$can('OblastSport', 'permissions') &&
          $can('RegionXTB', 'permissions')
          "
          class="mr-2"
          style="width: 100%"
        ></v-select>
      </b-col>
      <b-col sm="12" md="3" class="achievement-input">
        <label> {{ $t("organizationtype") }} </label>
        <v-select
          :options="organizationlist"
          v-model="filter.organizationid"
          :reduce="(item) => item.id"
          :placeholder="$t('organizationtype')"
          label="name"
          style="width: 100%"
          class="mr-2"
          @input="Refresh"
        >
        </v-select>
      </b-col>
    </b-row>
    <b-row class="px-3">    
      <b-table-simple class="table-bordered w-100 tableStudent" :items="items"
          style="height: 500px"
          small="small"
          responsive="md"
          show-empty
          :busy="isBusy"
          :current-page="filter.PageNumber"
          @row-dblclicked="Edit"
          @row-clicked="rowclicked"
          striped
          sticky-header="80vh"
          no-border-collapse
          bordered
          hover>
        <b-thead>
          <b-tr>
            <b-th class="text-center">{{ $t('№') }}</b-th>
            <b-th class="text-center">{{ $t('id') }}</b-th>
            <b-th class="text-center">{{ $t('docnumber') }}</b-th>
            <b-th class="text-center">{{ $t('oblastname') }}</b-th>
            <b-th class="text-center">{{ $t('regionname') }}</b-th>
            <b-th class="text-center">{{ $t('organizationname') }}</b-th>
            <b-th class="text-center">{{ $t('StudentFIO') }}</b-th>
            <b-th class="text-center">{{ $t('docdate') }}</b-th>
            <b-th class="text-center">{{ $t('averagemark') }}</b-th>
            <b-th class="text-center">{{ $t('schoolsubjectcount') }}</b-th>
            <b-th class="text-center">{{ $t('statusname') }}</b-th>
            <b-th class="text-center">{{ $t('actions') }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-if="items.length > 0 && !isBusy">
          <b-tr v-for="(item, index) in items" :key="index">
            <b-td class="text-center" width="50">{{ indexMethod(index) }}</b-td>
            <b-td class="text-center">{{ item.id }}</b-td>
            <b-td class="text-center">{{ item.docnumber }}</b-td>
            <b-td class="text-center" width="150">{{ item.oblastname }}</b-td>
            <b-td class="text-center" width="150">{{ item.regionname }}</b-td>
            <b-td class="text-left">{{ item.organizationname }}</b-td>
            <b-td class="text-center">{{ item.personname }}</b-td>
            <b-td class="text-center" width="120">{{ item.docdate }}</b-td>
            <b-td class="text-center">{{ item.averagemark }}</b-td>
            <b-td class="text-center">{{ item.schoolsubjectcount }}</b-td>
            <b-td class="text-center" width="120">
              <b-badge v-if="item.statusid == 1" variant="primary">{{ item.statusname }}</b-badge>
              <b-badge v-if="item.statusid == 2" variant="success">{{ item.statusname }}</b-badge>
              <b-badge v-if="item.statusid == 3" variant="danger">{{ item.statusname }}</b-badge>
              <b-badge v-if="item.statusid == 4" variant="warning">{{ item.statusname }}</b-badge>
              <!-- <b-badge :variant="getItemColor(item.id)">{{ item.statusname }}</b-badge> -->
            </b-td>
            <b-td class="text-center" fixed="right" width="100">
              <b-link
                v-if="item.canedit && $can('StudentFinalMarkEdit', 'permissions')"
                @click="Edit(item)"
                class="text-center mr-2"
                v-c-tooltip="{ content: $t('Edit') }"
              >
                <b-icon icon="pencil"></b-icon>
              </b-link>
              <b-link
                v-if="item.canapprove && $can('StudentFinalMarkApprove', 'permissions')"
                @click="Approve(item)"
                class="text-center mr-2"
                v-c-tooltip="{ content: $t('Approve') }"
              >
                <b-icon icon="check2"></b-icon>
              </b-link>
              <b-link
                v-if="item.cancancelapproval && $can('StudentFinalMarkCancelApproval', 'permissions')"
                @click="CancelApproval(item)"
                class="text-center mr-2"
                v-c-tooltip="{ content: $t('CancelApproval') }"
              >
                <b-icon icon="x"></b-icon>
              </b-link>
              <b-link
                v-if="item.candelete && $can('StudentFinalMarkDelete', 'permissions')"
                @click="Delete(item)"
                class="text-center "
                v-c-tooltip="{ content: $t('Delete') }"
              >
                <b-icon icon="trash"></b-icon>
              </b-link>
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tbody v-if="isBusy">
              <b-tr>
                <b-td colspan="12" class="text-center">
                  <b-spinner label="Spinning"></b-spinner>
                </b-td>
              </b-tr>
            </b-tbody>
      </b-table-simple>
    </b-row>
    <b-row class="px-3">
      <div class="pb-4 d-flex justify-content-between w-100">
        <div class="d-flex">
          <div class="pagination-number" style="float: left; font-size: 12px">
            {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
            {{ this.lastNumber }} {{ $t("of") }}
            {{ this.totalRows }}
          </div>
          <div class="page-limit" style="marg">
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
    </b-row>
  </b-card>
</template>

<script>
import StudentFinalMarkService from "@/services/StudentFinalMark.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";

import ToolBar from './components/Toolbar.vue'
// import PageBody from './components/PageBody.vue'
// import Pagination from './components/Pagination.vue'
export default {
  components: {
    'ToolBar': ToolBar,
    // 'PageBody': PageBody,
    // 'Pagination': Pagination,
  },
  data() {
    return {
      items: [],
      genderlist: [],
      totalRows: "",
      isBusy: true,
      FilterModal: false,
      CancelApprovalLoading: false,
      ApproveLoading: false,
      OblastList: [],
      RegionList: [],
      organizationlist: [],
      filter: {
        oblastid: 0,
        regionid: 0,
        statusid: [null],
        hasstudentfinalmark:null,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        organizationid: 0,
        OblastName: "", 
        RegionName: "",
      },
    }
  },
  created() {
    this.Refresh();
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
    });
    if (this.filter.oblastid) {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
        if (res.data && res.data.length ) {
          this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
        }
      });
    }
    OrganizationService.GetAll().then((res) => {
      this.organizationlist = res.data.rows;
    });
    
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
    indexMethod(index) {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + index + 1;
    },
    Refresh() {
      this.isBusy = true;
      StudentFinalMarkService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.statusid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.hasstudentfinalmark
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        // console.log(res.data.rows.schoolsubjectcount);
        this.totalRows = res.data.total;
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
    ChangeOblast() {
      this.organizationlist = [];
      if (this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
          if (res.data && res.data.length ) {
            this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
          }
        });
        if (this.$route.query && this.$route.query.regionid) {
          if (this.RegionList.length) {
            this.filter.regionid = 0;
            this.changeQuery('regionid', null)
          } else {
            this.filter.regionid=this.$route.query.regionid
          }
        } else {
          this.filter.regionid = 0;
          this.changeQuery('regionid', null)
        }
      } else {
        this.filter.regionid = 0;
        this.changeQuery('regionid', null)
      }
      if (this.filter.oblastid == 999) {
        this.filter.showAllRegion = true;          
      } else {
        this.filter.showAllRegion = false; 
      }
      this.changeQuery('oblastid', this.filter.oblastid);
      // this.Refresh();
    },
    changeRegion() {    
      this.changeQuery('regionid', this.filter.regionid)
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          "",
          "",
          ""
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
      // if (this.filter.regionid == 999) {
      //   this.filter.showAllOrganization = true;  
      // }else{
      //   this.filter.showAllOrganization = false;  
      // }
      // this.Refresh();
    },
    // ChangeOrg() {
    //   this.changeQuery('organizationid', this.organizationid);
    //   if (this.filter.oblastid) {
    //     OrganizationService.GetAll(this.filter.organizationid).then((res) => {
    //       this.organizationlist = res.data
    //     });
    //   }
    // },
    Edit(item) {
      this.$router.push({
        name: "StudentFinalMarkEdit",
        params: {
          id: item.id,
        },
        query: {
          personname: item.personname,
          personid: item.personid
        }
      });
    },
    Delete(item) {
      StudentFinalMarkService.Delete(item.id)
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
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    
    Approve(item) {
      var self = this;
      StudentFinalMarkService.Approve(item.id)
        .then((res) => {
          self.Refresh();
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          
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
      StudentFinalMarkService.CancelApproval(item.id)
        .then((res) => {
          self.Refresh();
          self.makeToast(
            self.$t("CancelMessage"),
            self.$t("message"),
            "success"
          );
          
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    rowclicked() { },
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
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
      //   this.getsporttype(item, i);
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
      //   this.getsporttype(item, i);
    },
  },
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
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
        }
        // this.changeQuery('oblastid', newValue)
        this.Refresh();
      },
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
        }
        this.changeQuery("regionid", newValue);
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
  
}
</script>

<style lang="scss">
.tableStudent {
  overflow-x: auto;
  tr, td {
    padding: 7px;
  }
}
.studentFinalMark-btn .btn {
  padding: 8px 20px;
  font-size: 16px;
}
.searchInput {
  float: right;
  max-width: 450px;
  .form-group {
    width: 450px;
  }
}
</style>