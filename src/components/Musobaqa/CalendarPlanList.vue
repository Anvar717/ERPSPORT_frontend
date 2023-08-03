<template>
  <b-container fluid>
    <b-row class="mt-2" v-if="!isComponent">
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
            <vs-th sort-key="docnumber">
              {{ $t("docnumber") }}
            </vs-th>
            <vs-th sort-key="docdate">
              {{ $t("docdate") }}
            </vs-th>
            <vs-th sort-key="sporteventcategoryname">
              {{ $t("SportEventCategory") }}
            </vs-th>
            <vs-th sort-key="sporttypegroupname">
              {{ $t("SportEventParticipant1") }}
            </vs-th>
            <vs-th sort-key="sporteventtypename">
              {{ $t("SportEventType") }}
            </vs-th>
            <vs-th sort-key="competitiontypename">
              {{ $t("CompetitionType") }}
            </vs-th>
            <vs-th sort-key="sporteventname">
              {{ $t("SportEvent") }}
            </vs-th>
            <vs-th sort-key="startdate">
              {{ $t("startdate") }}
            </vs-th>
            <vs-th sort-key="enddate">
              {{ $t("enddate") }}
            </vs-th>
            <vs-th sort-key="sporttypeclassifiername">
              {{ $t("Sport turi") }}
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
                {{ data[indextr].docnumber }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].docdate }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].sporteventcategoryname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].sporttypegroupname }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].sporteventtypename }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].competitiontypename }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].sporteventname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].startdate }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].enddate }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].sporttypeclassifiername }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div
          class="my-3 personList-pagination justify-content-between d-flex align-items-center"
        >
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
import SportEventCalendarService from "@/services/SportEventCalendar.service";
import SportEventCategoryService from "@/services/SportEventCategory.service";
import vSelect from "vue-select";
import SportTypeGroupService from "@/services/SportTypeGroup.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventTypeService from "@/services/SportEventType.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportEventService from "@/services/SportEvent.service";
export default {
  components: {
    vSelect,
  },
  props: {
    sporteventid: {
      type: Number,
      default: 0,
    },
    competitiontypeid: {
      type: Number,
      default: 0,
    },
    sporteventtypeid: {
      type: Number,
      default: 0,
    },
    sporttypeclassifierid: {
      type: Number,
      default: 0,
    },
    isComponent: {
      type: Boolean,
      default : false
    }
  },
  data() {
    return {
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
      totalRows: "",
      isBusy: true,
      MemberList: [],
      schoolyearlist: [],
      sportgrouplist: [],
      SportEventParticipantList: [],
      SportEventCategoryList: [],
      SportTypeGroupList: [],
      SportEventTypeList: [],
      CompetitionTypeList: [],
      SporttypeclassifierList: [],
      SportEventList: [],
      selected: [],
      totalRows: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
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
    this.filter.sporteventid =  this.sporteventid;
    this.filter.competitiontypeid = this.competitiontypeid;
    this.filter.sporttypeclassifierid = this.sporttypeclassifierid;
    this.filter.sporteventtypeid = this.sporteventtypeid;
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
