<template>
  <b-container fluid>
    <CRow class="form-group">
      <CCol lg="4" md="4" sm="12" class="text-left">
        <b-row class="">
          <b-col class="achievement-input fname-select" lg="6" sm="12">
            <v-select
              :options="OblastList"
              :reduce="(item) => item.id"
              :placeholder="$t('oblast')"
              label="name"
              v-model="filter.oblastid"
              @input="ChangeOblast"
            ></v-select>
          </b-col>
          <b-col lg="6" sm="12" class="achievement-input fname-select">
            <v-select
              :options="RegionList"
              :reduce="(item) => item.id"
              :placeholder="$t('region')"
              label="name"
              v-model="filter.regionid"
              @input="Refresh"
            ></v-select>
          </b-col>
        </b-row>
      </CCol>
      <CCol lg="4" md="4" sm="11" class="text-left">
        <custom-search v-model="filter.Search" @search="Search"></custom-search>
      </CCol>
      <CCol lg="4" md="4" sm="12" class="text-lg-right mt-2"> </CCol>
    </CRow>
    <b-row class="mt-2">
      <b-col>
        <vs-table
          :data="OrganizationAllList"
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
            <vs-th sort-key="fullname">
              {{ $t("fullname") }}
            </vs-th>
            <vs-th sort-key="shortname">
              {{ $t("shortname") }}
            </vs-th>
            <vs-th sort-key="oblast">
              {{ $t("oblast") }}
            </vs-th>
            <vs-th sort-key="region">
              {{ $t("region") }}
            </vs-th>
            <vs-th sort-key="inn">
              {{ $t("inn") }}
            </vs-th>
            <vs-th sort-key="directer">
              {{ $t("directer") }}
            </vs-th>
            <vs-th sort-key="accounter">
              {{ $t("accounter") }}
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
                {{ data[indextr].id }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].fullname }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].shortname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].oblast }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].region }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].inn }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].director }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].accounter }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="my-3 justify-content-between d-flex align-items-center">
          <span></span>
          <b-pagination
            v-model="filter.PageNumber"
            :total-rows="totalItems"
            :per-page="filter.PageLimit"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
export default {
  props: {
    isAllEmployee: {
      default: false,
      type: Boolean,
    },
    organizationtypeid: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      OrganizationAllList: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        PageLimit: 20,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
      },
      selected: [],
      totalItems: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
    this.Refresh();
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
  },
  methods: {
    handleSort(key, active) {},
    SelectedItem() {
      this.$emit("SelectedItem", this.selected);
    },
    Refresh() {
      this.Loading = true;
      OrganizationService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.oblastid,
        this.filter.regionid,
        undefined,
        this.organizationtypeid
      ).then((res) => {
        this.Loading = false;
        this.OrganizationAllList = res.data.rows;
        this.totalItems = res.data.total;
      });
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    ChangeOblast() {
      this.filter.regionid = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
      this.Refresh();
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(oldValue, newValue) {
        this.Refresh();
      },
    },
    "filter.HREmpAppointOrderTypeID": {
      handler(oldValue, newValue) {
        this.Refresh();
      },
    },
    "filter.DepartmentID": {
      handler(oldValue, newValue) {
        this.Refresh();
      },
    },
  },
};
</script>

<style>
</style>