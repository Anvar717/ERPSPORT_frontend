<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("ExamGroup") }}</h3>
        <CCardHeader>
          <CRow>
            <CCol sm="12" md="6">
              <!-- <CButton
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton> -->
            </CCol>
            <CCol sm="12" md="6">
              
              <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </CCol>
          </CRow>
          <CRow class="mt-2">
            <!-- <CCol lg="4" md="5" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('search')"
                autocomplete="text"
                v-model="filter.code"
                v-on:keyup.enter="Search"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol> -->
            <CCol lg="2" md="3" sm="12" class="d-flex mt-2">
              <v-select
                :options="SchoolYearList"
                v-model="filter.schoolYearId"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolYear')"
                @input="Refresh"
                label="name"
                style="width: 100%"
              ></v-select>
            </CCol>
            <CCol lg="3" md="6" sm="12" class="d-flex mt-2">
              <v-select
                :options="HigHerEduClassifierList"
                v-model="filter.higHerEduClassifierId"
                :reduce="(item) => item.id"
                :placeholder="$t('higHerEduClassifier')"
                label="fullname"
                style="width: 100%"
              ></v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="d-flex mt-2">
              <v-select
                :options="EducationFormTypemList"
                v-model="filter.educationFormTypemId"
                :reduce="(item) => item.id"
                :placeholder="$t('educationFormTypem')"
                label="name"
                class="mr-2"
                style="width: 100%"
              ></v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="d-flex mt-2">
              <v-select
                :options="EducationLanguageList"
                v-model="filter.educationLanguageId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('educationLanguage')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol lg="2" md="3" sm="12" class="d-flex mt-3">
              <v-select
                :options="GenderList"
                v-model="filter.genderId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('gender')"
                label="name"
                style="width: 100%"
              ></v-select>
            </CCol>
            <CCol lg="2" md="2" sm="2" class="text-left mt-3 pl-0">
              <b-form-checkbox @input="Refresh" class="ml-3" v-model="filter.withoutTable">
                {{ $t('withoutTable') }}
              </b-form-checkbox>
            </CCol>
            <CCol lg="1" md="1" sm="1" class="text-left mt-3 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height: 35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol>
            
          </CRow>
          
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap; height: 500px"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.currentPage"
           
            @row-dblclicked="Edit"
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            
            no-border-collapse
            bordered
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
            <template v-slot:head(shortname)>
              <div style="cursor: pointer" @click="ChangeSort('shortname')">
                {{ $t("shortname") }}
                <b-icon
                  v-if="filter.SortColumn === 'shortname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(fullname)>
              <div style="cursor: pointer" @click="ChangeSort('fullname')">
                {{ $t("fullname") }}
                <b-icon
                  v-if="filter.SortColumn === 'fullname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(inn)>
              <div style="cursor: pointer" @click="ChangeSort('inn')">
                {{ $t("inn") }}
                <b-icon
                  v-if="filter.SortColumn === 'inn'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(statusname)>
              <div style="cursor: pointer" @click="ChangeSort('statusname')">
                {{ $t("statusname") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="$can('ExamGroupEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="$can('ExamGroupDelete', 'permissions')"
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
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float: left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float: left; font-size: 12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ExamGroupService from "@/services/ExamGroup.service";
import SchoolYearService from "@/services/SchoolYear.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import EducationFormTypeService from "@/services/EducationFormType.service";
import HelperService from "@/services/helper.service";
export default {
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
        // {
        //   key: "docnumber",
        //   label: this.$t("docnumber"),
        //   sortable: false,
        // },
        // {
        //   key: "docdate",
        //   label: this.$t("docdate"),
        //   sortable: false,
        // },
        {
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false,
        },
        {
          key: "highereduclassifiername",
          label: this.$t("highereduclassifiername"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "groupname",
          label: this.$t("groupname"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "educationformtypename",
          label: this.$t("educationformtypename"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguage"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "examstartdate",
          label: this.$t("examstartdate"),
          class: "text-center",
          sortable: false,
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,

      filter: {
        schoolYearId: '',
        higHerEduClassifierId: '',
        educationFormTypemId: '',
        educationLanguageId: '',
        genderId: '',
        withoutTable : false,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100, 500, 1000],
        SortIcon: "arrow-up",
      },
      SchoolYearList: [],
      HigHerEduClassifierList: [],
      EducationFormTypemList: [],
      EducationLanguageList: [],
      GenderList: [],
    };
  },
  created() {
    this.filter.schoolYearId = this.$route.query.schoolYearId || this.filter.schoolYearId,
    this.filter.higHerEduClassifierId = this.$route.query.higHerEduClassifierId || this.filter.higHerEduClassifierId,
    this.filter.educationFormTypemId = this.$route.query.educationFormTypemId || this.filter.educationFormTypemId,
    this.filter.educationLanguageId = this.$route.query.educationLanguageId || this.filter.educationLanguageId,
    this.filter.genderId = this.$route.query.genderId || this.filter.genderId,
    this.filter.Search = this.$route.query.Search || this.filter.Search,
    this.filter.SortColumn = this.$route.query.SortColumn || this.filter.SortColumn,
    this.filter.OrderType = this.$route.query.OrderType || this.filter.OrderType,
    this.filter.PageNumber = this.$route.query.PageNumber || this.filter.PageNumber,
    this.filter.PageLimit = this.$route.query.PageLimit || this.filter.PageLimit,
    
    SchoolYearService.GetAll().then((res) => {
      this.SchoolYearList = res.data;
    });
    HigherEduClassifierService.GetAll().then((res) => {
      this.HigHerEduClassifierList = res.data;
    });
    EducationFormTypeService.GetAll().then((res) => {
      this.EducationFormTypemList = res.data;
    });
    EducationLanguageService.GetAll().then((res) => {
      this.EducationLanguageList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
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
        name: "EditExamGroup",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditExamGroup",
        params: {
          id: item.id,
        },
        query: {
          schoolYearId: this.filter.schoolYearId,
          higHerEduClassifierId: this.filter.higHerEduClassifierId,
          educationFormTypemId: this.filter.educationFormTypemId,
          educationLanguageId: this.filter.educationLanguageId,
          genderId: this.filter.genderId,
          Search: this.filter.Search,
          SortColumn: this.filter.SortColumn,
          OrderType: this.filter.OrderType,
          PageNumber: this.filter.PageNumber,
          PageLimit: this.filter.PageLimit,
        }
      });
    },
    Delete(item) {
      ExamGroupService.Delete(item.id)
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
    Approve(item) {
      var self = this;
      ExamGroupService.Approve(item.id)
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
      ExamGroupService.CancelApproval(item.id)
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

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      ExamGroupService.GetList(
        this.filter.schoolYearId,
        this.filter.higHerEduClassifierId,
        this.filter.educationFormTypemId,
        this.filter.educationLanguageId,
        this.filter.genderId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.withoutTable
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
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
