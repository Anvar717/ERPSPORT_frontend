<template>
  <b-container fluid>
    <b-row class="mt-2">
      <b-col class="text-right">
        <CRow class="form-group">
          <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
          </CRow> 
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <vs-table
          :data="MemberList"
          @sort="handleSort"
          @selected="SelectedItem"
          v-model="selected"
          style="border: 1px solid #eee"
          :max-items="filter.PageLimit"
        >
          <template slot="thead">
            <vs-th sort-key="id">
              {{ $t("id") }}
            </vs-th>
            <!-- <vs-th sort-key="inn" v-if="persontypeid == 2">
              {{ $t("inn") }}
            </vs-th> -->
            <vs-th sort-key="circlesporttypename">
              {{ $t("circlesporttype") }}
            </vs-th>
            <vs-th sort-key="sportgroupcategorytypename">
              {{ $t("sportgroupcategorytype") }}
            </vs-th>
            <vs-th sort-key="membershiptypename">
              {{ $t("membershiptype") }}
            </vs-th>
            <vs-th sort-key="servicepocketname">
              {{ $t("servicepocket") }}
            </vs-th>
            <!-- <vs-th sort-key="gender">
                        {{$t('gender')}}
                    </vs-th> -->

            <!-- <vs-th sort-key="pinfl" v-if="persontypeid == 2">
              {{ $t("pinfl") }}
            </vs-th> -->
            <!-- <vs-th sort-key="contactinfo">
              {{ $t("contactinfo") }}
            </vs-th> -->
            <!-- <vs-th sort-key="workschedule">
                        {{$t('workschedule')}}
                    </vs-th> -->
          </template>
          <template
            slot-scope="{ data }"
            style="overflow-y: scroll; height: 400px"
          >
            <vs-tr v-if="Loading" class="text-center">
              <vs-td colspan="10"
                ><b-spinner variant="primary"></b-spinner
              ></vs-td>
            </vs-tr>
            <vs-tr
              :data="tr"
              :key="indextr"
              v-for="(tr, indextr) in data"
              v-show="!Loading"
              @dblclick.native="$emit('DblClick', tr)"
            >
              <vs-td :data="data[indextr].id">
                {{ data[indextr].id }}
              </vs-td>
              <!-- <vs-td :data="data[indextr].id" v-if="persontypeid == 2">
                {{ data[indextr].inn }}
              </vs-td> -->
              <vs-td :data="data[indextr].id" >
                {{ data[indextr].circlesporttypename }}
              </vs-td>
              <vs-td :data="data[indextr].id" >
                {{ data[indextr].sportgroupcategorytypename }}
              </vs-td>
              <vs-td :data="data[indextr].id" >
                {{ data[indextr].membershiptypename }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].servicepocketname }}
              </vs-td>
              <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].gender}}
                            </vs-td> -->

              <!-- <vs-td :data="data[indextr].id">
                {{ data[indextr].pinfl }}
              </vs-td> -->
              <!-- <vs-td :data="data[indextr].contactinfo">
                {{ data[indextr].contactinfo }}
              </vs-td> -->
              <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].workschedule}}
                            </vs-td> -->
            </vs-tr>
          </template>
        </vs-table>
        <div class="my-3 personList-pagination justify-content-between d-flex align-items-center">
          <div style="white-space: nowrap" class="col-sm-6">
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
          </div>
          <b-pagination
            class="text-right mobile-pagination"
            v-model="filter.PageNumber"
            :total-rows="totalRows"
            :per-page="filter.PageLimit"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MemberShipService from "@/services/MemberShip.service";
export default {
  data() {
    return {
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 20,
        pageOptions: [20, 50, 100, 200],
        PageNumber: 1,
      },
      MemberList: [],
      selected: [],
      totalRows: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
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
    Refresh() {
      this.Loading = true;
      MemberShipService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
      ).then((res) => {
        this.MemberList = res.data.rows;
        this.totalRows = res.data.total;
        this.Loading = false;
      });
    },
    handleSort(key, active) {},
    SelectedItem() {
      this.$emit("SelectedItem", this.selected);
      // console.log(this.selected)
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        this.Refresh();
      },
    },
  },
};
</script>

<style>
.vs-pagination--ul {
  margin-bottom: 0;
}
</style>
