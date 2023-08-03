<template>
  <b-container fluid>
    <b-row>
      <b-col sm="7">
        <div class="d-flex"></div>
      </b-col>
      <b-col sm="2" class="text-left"> </b-col>
      <b-col sm="3" class="text-left">
        <div class="d-flex">
          <!-- <b-button
            @click="filter.Search"
            variant="primary"
            style="height: 37px; white-space: nowrap"
          >
            <b-icon icon="search"></b-icon> {{ $t("Search") }}
          </b-button> -->
        </div>
      </b-col>
    </b-row>
    <!-- <b-row class="mt-2">
      <b-col class="text-right">
        <b-button variant="primary" v-if="isViewAddButton" @click="AddModal"
          >{{ $t("Add") }} <b-icon icon="plus"></b-icon
        ></b-button>
      </b-col>
    </b-row> -->
    <b-row class="mt-2">
      <b-col>
        <vs-table
          :data="FormingTeamSquadList"
          @sort="handleSort"
          @selected="SelectedItem"
          v-model="selected"
          style="border: 1px solid #eee"
          :max-items="filter.PageLimit"
        >
          <template slot="thead">
            <vs-th sort-key="personname">
              {{ $t("personname") }}
            </vs-th>
            <vs-th sort-key="documentseries">
              {{ $t("documentseries") }}
            </vs-th>
            <vs-th sort-key="documentnumber">
              {{ $t("documentnumber") }}
            </vs-th>
            <vs-th sort-key="dateofbirth">
              {{ $t("dateofbirth") }}
            </vs-th>
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
                {{ data[indextr].personname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].documentseries }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].documentnumber }}
              </vs-td>
              <vs-td :data="data[indextr].dateofbirth">
                {{ data[indextr].dateofbirth }}
              </vs-td>
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
    <b-modal
      ref="my-modal"
      size="xl"
      v-model="createModal"
      hide-footer
      hide-header
      no-close-on-backdrop
    >
      <header class="modal-header">
        <h5 class="modal-title">{{ $t("FormingTeamSquad") }}</h5>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="showModal('createModal', false)"
        >
          ×
        </button>
      </header>
    </b-modal>
  </b-container>
</template>
  
  <script>
import FormingTeamSquadService from "@/services/FormingTeamSquad.service";
export default {
  components: {},
  props: {
    sportteamtypeid: {
      type: Number,
      default: 0,
    },
    sporttypeclassifierid: {
      type: Number,
      default: 0,
    },
    genderid: {
      type: Number,
      default: 0,
    },
    isallperson: {
      type: Boolean,
      default: true,
    },
    isViewAddButton: {
      type: Boolean,
      default: true,
    },
    isRefresh: {
      type: Number | String,
      default: 1,
    },
  },
  data() {
    return {
      filter: {
        sportteamtypeid: 0,
        sporttypeclassifierid: 0,
        genderid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 20,
        PageNumber: 1,
        pageOptions: [20, 50, 100, 200],
      },
      FormingTeamSquadList: [],
      selected: [],
      totalRows: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
    if (this.isRefresh == 1) {
      this.Refresh();
    }
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
    AddModal() {
      this.showModal("createModal", true);
    },
    Refresh() {
      this.Loading = true;
      FormingTeamSquadService.GetFormingTeamSquadAthleteList(
        this.sportteamtypeid,
        this.sporttypeclassifierid,
        this.genderid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.FormingTeamSquadList = res.data.rows;
        this.totalRows = res.data.total;
        this.Loading = false;
      });
    },
    handleSort(key, active) {},
    SelectedItem() {
      this.$emit("SelectedItem", this.selected);
    },
    studentCreated(data) {
      data;
      this.showModal("createModal", false);
      if (data.success) {
        this.Refresh();
      }
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
  