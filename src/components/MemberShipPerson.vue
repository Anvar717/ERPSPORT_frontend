<template>
  <b-container fluid>
    <b-row class="mt-2">
      <b-col sm="7">
          <!-- <b-form-select value-field="id" style="width : 60%" text-field="name" class="mr-2" v-model="filter.identitydocumentid" @change="ChangeDocumentType" :options="DocumentTypeList" >
                    <template #first>
                        <b-form-select-option :value="null" disabled>-- {{ $t('ChooseBelow') }} --</b-form-select-option>
                    </template>
                </b-form-select> -->
          <!-- <b-form-select class="mr-2" style="width : 40%" text-field="name" value-field="name" v-if="filter.identitydocumentid === 1" v-model="filter.DocumentSeries" :options="DocSeriesList">
                    <template #first>
                        <b-form-select-option :value="0" disabled>-- {{ $t('docseries') }} --</b-form-select-option>
                    </template>
                </b-form-select> -->
        <b-row>
          <b-col sm="12" lg="4" class="achievement-input">
            <v-select
              :options="DocumentTypeList"
              class=" fname-select"
              @change="ChangeDocumentType"
              :reduce="(item) => item.id"
              :placeholder="$t('identitydocument')"
              v-model="filter.identitydocumentid"
              label="name"
            ></v-select>
          </b-col>  
          <b-col sm="12" lg="4" class="achievement-input" v-if="filter.identitydocumentid === 1">
            <v-select
              :options="DocSeriesList"
              class=" fname-select"
              :reduce="(item) => item.name"
              :placeholder="$t('docseries')"
              v-model="filter.documentseries"
              label="name"
            ></v-select>
          </b-col>
          <b-col sm="12" lg="4" class="achievement-input" v-if="filter.identitydocumentid !== 1">
            <b-form-input
              class=""
              :placeholder="$t('docseries')"
              v-model="filter.documentseries"
            ></b-form-input>
          </b-col>
          <b-col sm="12" lg="4" class="achievement-input">
            <b-form-input
              class=""
              :placeholder="$t('docnumber')"
              v-model="filter.documentnumber"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="2" class="text-left achievement-input">
        <v-select
          :options="SearchTypeList"
          :reduce="(item) => item.id"
          :placeholder="$t('SearchType')"
          label="name"
          class="fname-select"
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
    <CRow class="form-group mt-2" >
      <CCol lg="12" md="12" sm="12" class="text-left mt-2">
        <b-row class="">
          <b-col class="achievement-input" lg="3" sm="12" >
            <v-select
              :options="ServicePocketList"
              :reduce="(item) => item.id"
              :placeholder="$t('servicepocket')"
              label="name"
              class="fname-select"
              v-model="filter.servicepocketid"
            ></v-select>
          </b-col>
          <b-col class="achievement-input" lg="3" sm="12">
            <v-select
              :options="MemberShipTypeList"
              v-model="filter.membershiptypeid"
              :reduce="(item) => item.id"
              :placeholder="$t('membershiptype')"
              label="name"
              class="fname-select"
            >
            </v-select>
          </b-col>
          <b-col class="achievement-input" lg="3" sm="12">
            <v-select
              class=" fname-select"
              :options="CircleSportTypeList"
              v-model="filter.circlesporttypeid"
              :reduce="(item) => item.id"
              :placeholder="$t('circlesporttype')"
              label="name"
            >
            </v-select>
          </b-col>
          <b-col class="achievement-input" lg="3" sm="12">
            <div class="d-flex">
              <v-select
                class=" fname-select"
                style="width:98%"
                :options="SportGroupCategoryTypeList"
                v-model="filter.sportgroupcategorytypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('sportgroupcategorytype')"
                label="name"
              >
              </v-select>
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                class="ml-1"
                style="height: 36px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </div>
          </b-col>
        </b-row>
      </CCol>
      <!-- <CCol lg="4" md="4" sm="12" class="text-lg-right mt-2">
        
      </CCol> -->
    </CRow>
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
            <!-- <vs-th sort-key="id">
              {{ $t("id") }}
            </vs-th> -->
            <!-- <vs-th sort-key="inn" v-if="persontypeid == 2">
              {{ $t("inn") }}
            </vs-th> -->
            <vs-th sort-key="personmembername">
              {{ $t("personmember") }}
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
            <vs-th sort-key="circlesporttypename">
              {{ $t("circlesporttype") }}
            </vs-th>
            <vs-th sort-key="membershiptype">
              {{ $t("membershiptype") }}
            </vs-th>
            <vs-th sort-key="servicepocketname">
              {{ $t("servicepocket") }}
            </vs-th>
            <vs-th sort-key="sportgroupcategorytypename">
              {{ $t("sportgroupcategorytype") }}
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
              <vs-td :data="data[indextr].personmembername">
                {{ data[indextr].personmembername }}
              </vs-td>
              <vs-td :data="data[indextr].documentseries">
                {{ data[indextr].documentseries }}
              </vs-td>
              <vs-td :data="data[indextr].documentnumber">
                {{ data[indextr].documentnumber }}
              </vs-td>
              <vs-td :data="data[indextr].dateofbirth">
                {{ data[indextr].dateofbirth }}
              </vs-td>

              <vs-td :data="data[indextr].circlesporttypename">
                {{ data[indextr].circlesporttypename }}
              </vs-td>
              <vs-td :data="data[indextr].membershiptype">
                {{ data[indextr].membershiptype }}
              </vs-td>

              <vs-td :data="data[indextr].servicepocketname">
                {{ data[indextr].servicepocketname }}
              </vs-td>
              <vs-td :data="data[indextr].sportgroupcategorytypename">
                {{ data[indextr].sportgroupcategorytypename }}
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
import MemberShipService from "@/services/MemberShip.service";
import EditPersonComponent from "@/components/EditPersonMember";
import IdentityDocumentService from "@/services/IdentityDocument.service";
import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
import MemberShipTypeService from "@/services/MemberShipType.service";
import CircleSportTypeService from "@/services/CircleSportType.service";
import ServicePocketService from "@/services/ServicePocket.service";

export default {
  components: { EditPersonComponent },
  data() {
    return {
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 20,
        pageOptions: [20, 50, 100, 200],
        PageNumber: 1,
        personmembershipnumber: "",
        identitydocumentid: 0,
        documentseries: "",
        documentnumber: "",
        servicepocketid: 0,
        membershiptypeid: 0,
        circlesporttypeid: 0,
        sportgroupcategorytypeid: 0,
        fakeSearch: "",
      },
      MemberList: [],
      SearchTypeList: [
        { id: 1, name: this.$t("ID") },
        { id: 2, name: this.$t("fio") },
        { id: 3, name: this.$t("pinfl") },
        // { id : 4,name : this.$t('inn') }
      ],
      DocSeriesList:[],
      DocumentTypeList:[],
      MemberShipTypeList:[],
      CircleSportTypeList:[],
      SportGroupCategoryTypeList:[],
      ServicePocketList:[],
      selected: [],
      totalRows: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocSeriesList = res.data.result;
    });
    IdentityDocumentService.GetAll().then((res) => {
      this.DocumentTypeList = res.data.result;
    });
     ServicePocketService.GetAll().then((res) => {
      this.ServicePocketList = res.data;
    });
    SportGroupCategoryTypeService.GetAll().then((res) => {
      this.SportGroupCategoryTypeList = res.data;
    });
    MemberShipTypeService.GetAll().then((res) => {
      this.MemberShipTypeList = res.data;
    });
    CircleSportTypeService.GetAll().then((res) => {
      this.CircleSportTypeList = res.data;
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
    Refresh() {
      this.Loading = true;
      MemberShipService.GetMemberShipPersonMemberList(
        this.filter.personmembershipnumber,
        this.filter.identitydocumentid,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.servicepocketid,
        this.filter.membershiptypeid,
        this.filter.circlesporttypeid,
        this.filter.sportgroupcategorytypeid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.MemberList = res.data.rows;
        this.totalRows = res.data.total;
        this.Loading = false;
      });
    },
     ChangeDocumentType() {
      this.filter.DocumentSeries = "";
      this.filter.DocumentNumber = "";
      this.filter.DateOfBirth = "";
    },
     ChangeSearchType() {
      this.filter.inn = "";
      this.filter.pinfl = "";
      this.filter.personid = "";
      this.filter.personname = "";
      this.filter.fakeSearch = "";
    },
    Search() {
      if (this.filter.searchtype === 1) {
        this.filter.personid = this.filter.fakeSearch;
        // this.filter.Search = ""
      }
      if (this.filter.searchtype === 3) {
        this.filter.pinfl = this.filter.fakeSearch;
        // this.filter.Search = ""
      }
      if (this.filter.searchtype === 2) {
        this.filter.personname = this.filter.fakeSearch;
        // this.filter.Search = ""
      }
      if (this.filter.searchtype === 4) {
        this.filter.inn = this.filter.fakeSearch;
        // this.filter.Search = ""
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    create() {
      this.showModal("createModal", true);
    },
    studentCreated(data) {
      data;
      this.showModal("createModal", false);
      if (data.success) {
        this.Refresh();
      }
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
