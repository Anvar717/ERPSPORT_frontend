<template>
  <b-container fluid>
    <b-row>
      <b-col sm="7">
        <div class="">
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
              <b-col lg="6" sm="12">
                <v-select
                :options="DocumentTypeList"
                class="mr-2 personList-select"
                @change="ChangeDocumentType"
                :reduce="(item) => item.id"
                :placeholder="$t('identitydocument')"
                v-model="filter.identitydocumentid"
                label="name"
              ></v-select>
              </b-col>
              <b-col v-if="persontypeid == 1 && filter.identitydocumentid === 1" lg="3" sm="12">
                <v-select
                  :options="DocSeriesList"
                  class="mr-2 personList-select"
                  :reduce="(item) => item.name"
                  :placeholder="$t('docseries')"
                  v-model="filter.DocumentSeries"
                  label="name"
                ></v-select>
              </b-col>
              <b-col v-if="persontypeid != 1 || filter.identitydocumentid !== 1" lg="3" sm="12">
                <b-form-input
                  class="mr-2 personList-select"
                  :placeholder="$t('docseries')"
                  v-model="filter.DocumentSeries"
                ></b-form-input>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-input
                  class="mr-2 personList-select"
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
            @keyup.enter="Search"
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
      <b-col class="text-right">
        <b-button variant="primary" v-if="isViewAddButton" @click="AddModal"
          >{{ $t("Add") }} <b-icon icon="plus"></b-icon
        ></b-button>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <vs-table
          :data="EmployeeList"
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
            <!-- <vs-th sort-key="inn" v-if="persontypeid == 2">
              {{ $t("inn") }}
            </vs-th> -->
            <vs-th sort-key="identitydocument" v-if="persontypeid == 1">
              {{ $t("identitydocument") }}
            </vs-th>
            <vs-th sort-key="documentseries" v-if="persontypeid == 1">
              {{ $t("documentseries") }}
            </vs-th>
            <vs-th sort-key="documentnumber" v-if="persontypeid == 1">
              {{ $t("documentnumber") }}
            </vs-th>
            <vs-th sort-key="dateofbirth">
              {{ $t("dateofbirth") }}
            </vs-th>
            <!-- <vs-th sort-key="gender">
                        {{$t('gender')}}
                    </vs-th> -->

            <vs-th sort-key="pinfl" v-if="persontypeid == 2">
              {{ $t("pinfl") }}
            </vs-th>
            <vs-th sort-key="photoexists">
              {{ $t("photoexists") }}
            </vs-th>
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
                {{ data[indextr].fullname }}
              </vs-td>
              <!-- <vs-td :data="data[indextr].id" v-if="persontypeid == 2">
                {{ data[indextr].inn }}
              </vs-td> -->
              <vs-td :data="data[indextr].id" v-if="persontypeid == 1">
                {{ data[indextr].identitydocument }}
              </vs-td>
              <vs-td :data="data[indextr].id" v-if="persontypeid == 1">
                {{ data[indextr].documentseries }}
              </vs-td>
              <vs-td :data="data[indextr].id" v-if="persontypeid == 1">
                {{ data[indextr].documentnumber }}
              </vs-td>

              <vs-td :data="data[indextr].dateofbirth">
                {{ data[indextr].dateofbirth }}
              </vs-td>
              <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].gender}}
                            </vs-td> -->

              <vs-td :data="data[indextr].id" v-if="persontypeid == 2">
                {{ data[indextr].pinfl }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                <CBadge
                  :color="getItemColor1(data[indextr].photoexists)"
                  class="text-center"
                  >{{ data[indextr].photoexists ? "Да" : "Нет" }}</CBadge
                >
              </vs-td>
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
    <b-modal
      ref="my-modal"
      size="xl"
      v-model="createModal"
      hide-footer
      hide-header
      no-close-on-backdrop
    >
      <header class="modal-header">
        <h5 class="modal-title">{{ $t("Employee") }}</h5>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="showModal('createModal', false)"
        >
          ×
        </button>
      </header>
      <div class="modal-body">
        <edit-person-component
          :show-back-button="false"
          :persontypeid="persontypeid"
          @success="studentCreated($event)"
        ></edit-person-component>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import PersonService from "@/services/person.service";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import IdentityDocumentService from "@/services/IdentityDocument.service";
export default {
  components: { editPersonComponent },
  props: {
    persontypeid: {
      type: Number,
      default: 2,
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
        personid: 0,
        personname: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 20,
        pageOptions: [20, 50, 100, 200],
        PageNumber: 1,
        DocumentSeries: "",
        DocumentNumber: "",
        organizationid: 0,
        searchtype: 2,
        oblastid: 0,
        regionid: 0,
        isnotcheckresult: false,
        ischeckresult: false,
        inn: "",
        pinfl: "",
        fakeSearch: "",
        identitydocumentid: 1,
        sporttypeclassifierid: 0,
      },
      EmployeeList: [],
      SearchTypeList: [
        { id: 1, name: this.$t("ID") },
        { id: 2, name: this.$t("fio") },
        { id: 3, name: this.$t("pinfl") },
        // { id : 4,name : this.$t('inn') }
      ],
      DocSeriesList: [],
      DocumentTypeList: [],
      selected: [],
      totalRows: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
    if (this.persontypeid == 2) {
      this.filter.identitydocumentid = 2;
    }
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocSeriesList = res.data.result;
    });
    IdentityDocumentService.GetAll().then((res) => {
      this.DocumentTypeList = res.data.result;
    });
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
    ChangeSearchType() {
      this.filter.inn = "";
      this.filter.pinfl = "";
      this.filter.personid = "";
      this.filter.personname = "";
      this.filter.fakeSearch = "";
    },
    ChangeDocumentType() {
      this.filter.DocumentSeries = "";
      this.filter.DocumentNumber = "";
      this.filter.DateOfBirth = "";
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

    // isCheck() {
    //   if (
    //     this.isRefresh == 2 &&
    //     ((this.filter.DocumentSeries != 0 &&
    //       this.filter.DocumentSeries != null &&
    //       this.filter.DocumentSeries != undefined &&
    //       this.filter.DocumentSeries != "" &&
    //       this.filter.DocumentNumber != 0 &&
    //       this.filter.DocumentNumber != null &&
    //       this.filter.DocumentNumber != undefined &&
    //       this.filter.DocumentNumber != "") ||
    //       (this.filter.pinfl != 0 &&
    //         this.filter.pinfl != null &&
    //         this.filter.pinfl != undefined &&
    //         this.filter.pinfl != "") ||
    //          (this.filter.personname != 0 &&
    //         this.filter.personname != null &&
    //         this.filter.personname != undefined &&
    //         this.filter.personname != ""))
    //   ) {
    //     this.Search();
    //   }
    //   if (this.isRefresh == 1) {
    //     this.Search();
    //   }
    // },
    getItemColor1(text) {
      return text === true
        ? "success"
        : text === false
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "danger";
    },
    Refresh() {
      this.Loading = true;
      PersonService.GetList(
        this.filter.personid,
        this.filter.personname,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.DocumentSeries,
        this.filter.DocumentNumber,
        this.persontypeid,
        this.isallperson,
        this.filter.organizationid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.isnotcheckresult,
        this.filter.ischeckresult,
        this.filter.inn,
        this.filter.pinfl,
        this.filter.identitydocumentid,
        null,
        this.sporttypeclassifierid,
        this.genderid
      ).then((res) => {
        this.EmployeeList = res.data.data.rows;
        this.totalRows = res.data.data.total;
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
