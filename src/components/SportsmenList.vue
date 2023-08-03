<template>
  <b-container fluid>
    <b-row>
      <b-col sm="7">
        <div>
          <b-row>
            <b-col lg="5">
              <v-select
                :options="DocumentTypeList"
                class="mr-2 personList-select"
                @input="ChangeDocumentType"
                :reduce="(item) => item.id"
                :placeholder="$t('identitydocument')"
                v-model="filter.identitydocumentid"
                label="name"
              ></v-select>
            </b-col>
            <b-col v-if="filter.identitydocumentid === 1" lg="4">
              <v-select
                :options="DocSeriesList"
                class="mr-2 personList-select"
                :reduce="(item) => item.name"
                :placeholder="$t('docseries')"
                v-model="filter.DocumentSeries"
                label="name"
              ></v-select>
            </b-col>
            <b-col v-if="filter.identitydocumentid !== 1" lg="3">
              <b-form-input
                class="mr-2"
                style="text-transform: uppercase"
                v-mask="'AA'"
                :placeholder="$t('AA')"
                v-model="filter.DocumentSeries"
              ></b-form-input>
            </b-col>
            <b-col lg="3">
              <b-form-input
                class="mr-2"
                :placeholder="$t('docnumber')"
                v-model="filter.DocumentNumber"
              ></b-form-input>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col sm="2" class="text-left">
        <v-select
          :options="SearchTypeList"
          :reduce="(item) => item.id"
          :placeholder="$t('SearchType')"
          label="name"
          style="width: 100%"
          class="personList-select"
          v-model="filter.searchtype"
          @input="ChangeSearchType"
        ></v-select>
      </b-col>
      <b-col sm="3" class="text-left">
        <div class="d-flex">
          <b-form-input
            class="mr-2"
            :placeholder="$t('Search')"
            v-model="filter.fakeSearch"
          ></b-form-input>
          <b-button
            @click="Search"
            variant="primary"
            style="height: 37px; white-space: nowrap"
          >
            <b-icon icon="search"></b-icon> {{ $t("Search") }}
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <vs-table
          :data="SportsmenList"
          @sort="handleSort"
          @selected="SelectedItem"
          v-model="selected"
          style="border: 1px solid #eee"
          :max-items="filter.PageLimit"
        >
          <template slot="thead">
            <vs-th sort-key="schoolyearname">
              {{ $t("schoolyearname") }}
            </vs-th>
            <vs-th sort-key="personname">
              {{ $t("personname") }}
            </vs-th>
            <vs-th sort-key="pinfl">
              {{ $t("pinfl") }}
            </vs-th>
            <vs-th sort-key="dateofbirth">
              {{ $t("dateofbirth") }}
            </vs-th>
            <vs-th sort-key="documentseries">
              {{ $t("documentseries") }}
            </vs-th>
            <vs-th sort-key="documentnumber">
              {{ $t("documentnumber") }}
            </vs-th>
            <vs-th sort-key="gendername">
              {{ $t("gendername") }}
            </vs-th>
            <vs-th sort-key="sportgroupname">
              {{ $t("sportgroupname") }}
            </vs-th>
            <vs-th sort-key="sporttypeclassifiername">
              {{ $t("sporttypeclassifier") }}
            </vs-th>
            <vs-th sort-key="sporttitlenamne">
              {{ $t("sporttitlename") }}
            </vs-th>
            <vs-th sort-key="startdate">
              {{ $t("startdate") }}
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
                {{ data[indextr].schoolyearname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].personname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].pinfl }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].dateofbirth }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].documentseries }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].documentnumber }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].gendername }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].sportgroupname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].sporttypeclassifiername }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].sporttitlenamne }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].startdate }}
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
  </b-container>
</template>
  
  <script>
import SportStudentManageService from "@/services/SportStudentManage.service";
import IdentityDocumentService from "@/services/IdentityDocument.service";
export default {
  //   components: { editPersonComponent },
    props: {
    sporttypeclassifierid: {
      type: Number,
      default: 0,
    },
    sportgroupid: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      filter: {
        onDate: "",
        schoolYearID: 0,
        sportGroupId: 0,
        sportTypeClassifierId: 0,
        pinfl: "",
        identitydocumentid: 1,
        DocumentSeries: "",
        DocumentNumber: "",
        personName: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [20, 50, 100, 200],
        fakeSearch: "",
        searchtype: 2,
      },
      SearchTypeList: [
        { id: 1, name: this.$t("pinfl") },
        { id: 2, name: this.$t("fio") },
      ],
      SportsmenList: [],
      selected: [],
      totalRows: 0,
      Loading: false,
      DocumentTypeList: [],
      DocSeriesList: [],
    };
  },
  created() {
    this.filter.sportTypeClassifierId = this.sporttypeclassifierid || this.filter.sportTypeClassifierId;
     this.filter.sportGroupId = this.sportgroupid || this.filter.sportGroupId;
    IdentityDocumentService.GetAll().then((res) => {
      this.DocumentTypeList = res.data.result;
    });
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocSeriesList = res.data.result;
    });
    this.createDate();
    this.Refresh();
    // console.log(this.persontypeid);
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
    ChangeDocumentType() {
      this.filter.DocumentSeries = "";
      this.filter.DocumentNumber = "";
    },
    ChangeSearchType() {
      this.filter.pinfl = "";
      this.filter.personName = "";
      this.filter.fakeSearch = "";
    },
    Search() {
      if (this.filter.searchtype === 1) {
        this.filter.pinfl = this.filter.fakeSearch;
        // this.filter.Search = ""
      }
      if (this.filter.searchtype === 2) {
        this.filter.personName = this.filter.fakeSearch;
        // this.filter.Search = ""
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      //   this.filter.onDate = "01.01." + yyyy;
      this.filter.onDate = dd + "." + mm + "." + yyyy;
    },
    Refresh() {
      this.Loading = true;
      SportStudentManageService.GetSportsmenList(
        this.filter.onDate,
        this.filter.schoolYearID,
        this.filter.sportGroupId,
        this.filter.sportTypeClassifierId,
        this.filter.pinfl,
        this.filter.identitydocumentid,
        this.filter.DocumentSeries,
        this.filter.DocumentNumber,
        this.filter.personName,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.SportsmenList = res.data.rows;
        this.totalRows = res.data.total;
        this.Loading = false;
      });
    },
    handleSort(key, active) {},
    SelectedItem() {
      this.$emit("SelectedItem", this.selected);
      // console.log(this.selected)
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
  