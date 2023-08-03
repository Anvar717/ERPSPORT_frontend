<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-2">
          <b-col>
            <h3 class="text-left ">{{ $t("AssessmentCriteria") }}</h3>
          </b-col>
          <b-col>
            <CButton
                color="danger"
                class="float-sm-right"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col sm="12" md="2" lg="1">
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
            </b-col>
            
            <b-col lg="2" md="2" sm="12" >
              <v-select
                :options="SchoolYearList"
                v-model="filter.schoolYearId"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolYear')"
                @input="Refresh"
                label="name"
                style="width: 100%"
              ></v-select>
            </b-col>
            <b-col lg="4" md="4" sm="12" >
              <v-select
                :options="HigHerEduClassifierList"
                v-model="filter.higHerEduClassifierId"
                :reduce="(item) => item.id"
                :placeholder="$t('higHerEduClassifier')"
                label="fullname"
                style="width: 100%"
              ></v-select>
            </b-col>
            <b-col lg="2" md="2" sm="12" >
              <v-select
                :options="EducationFormTypemList"
                v-model="filter.educationFormTypemId"
                :reduce="(item) => item.id"
                :placeholder="$t('educationFormTypem')"
                label="name"
                class="mr-2"
                style="width: 100%"
              ></v-select>
            </b-col>
            <b-col lg="3" md="2" sm="12" >
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
            </b-col>
          </b-row>
          <CRow class="mt-3 form-group">
            
            <CCol lg="3" md="4" sm="12" class="d-flex mt-2">
              
              
              
              <v-select
                :options="GenderList"
                v-model="filter.genderId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('gender')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
            </CCol>
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
          </CRow>
          <b-row class="mt-n2">
            <b-col sm="12" >
              <b-button-group size="sm" @click="Refresh">
                <b-button @click="filter.statusId = 0" :variant="filter.statusId == 0 ? 'primary' : 'outline-primary'"> {{ $t('All') }} </b-button>
                <b-button @click="filter.statusId = 1" :variant="filter.statusId == 1 ? 'primary' : 'outline-primary'"> {{ $t('draftAll') }} </b-button>
                <b-button @click="filter.statusId = 2" :variant="filter.statusId == 2 ? 'primary' : 'outline-primary'"> {{ $t('accepted') }} </b-button>
              </b-button-group>
            </b-col>
          </b-row>
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
            :current-page="filter.PageNumber"
           
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
            <template v-slot:head(schoolyearname)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('schoolyearname')"
              >
                {{ $t("schoolyearname") }}
                <b-icon
                  v-if="filter.SortColumn === 'schoolyearname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(curriculumtypename)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('curriculumtypename')"
              >
                {{ $t("curriculumtypename") }}
                <b-icon
                  v-if="filter.SortColumn === 'curriculumtypename'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(highereduclassifiername)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('highereduclassifiername')"
              >
                {{ $t("highereduclassifiername") }}
                <b-icon
                  v-if="filter.SortColumn === 'highereduclassifiername'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor: pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(status)="{ item }">
              <CBadge :color="getItemColor(item.status)">{{
                item.status
              }}</CBadge>
            </template>
           
            <template v-slot:cell(actions)="{ item }">
              <div class="text-right">
                <b-link
                  v-if="$can('AssessmentCriteriaEdit', 'permissions') && item.statusid != 2"
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
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('AssessmentCriteriaEdit', 'permissions')"
                  @click="Clone(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Clone') }"
                >
                  <b-icon icon="book"></b-icon>
                </b-link>
                <!-- <b-link
                  v-if="$can('CurriculumView', 'permissions')"
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon icon="eye"></b-icon>
                </b-link> -->

                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="$can('AssessmentCriteriaApprove', 'permissions') && item.statusid != 2"
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Accept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="$can('AssessmentCriteriaCancelApproval', 'permissions') && item.statusid != 3"
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="$can('AssessmentCriteriaDelete', 'permissions') && item.statusid != 2"
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                    <!-- <b-dropdown-item @click="Print(item)">
                      <b-icon icon="printer" class="mr-2"></b-icon>
                      {{ $t("Print") }}
                    </b-dropdown-item> -->
                  </div>
                </b-dropdown>
                <b-modal size="sm" :id="'DeleteModal' + item.id" hide-footer>
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
                <b-modal size="sm" :id="'CancelModal' + item.id" hide-footer>
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
                <b-modal size="sm" :id="'AcceptModal' + item.id" hide-footer>
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
import AssessmentCriteriaService from "@/services/AssessmentCriteria.service";
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
          key: "id",
          label: this.$t("id"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "highereduclassifiername",
          label: this.$t("highereduclassifiername"),
          class: "text-left",
          sortable: false,
          tdClass: "text-left",
          thClass: "text-center",
        },
        // {
        //   key: "educationformtypename",
        //   label: this.$t("educationformtypename"),
        //   sortable: false,
        // },
        // {
        //   key: "educationlanguagename",
        //   label: this.$t("educationlanguagename"),
        //   sortable: false,
        // },
        {
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          sortable: false,
          tdClass: "text-left",
          thClass: "text-center",
        },
        {
          key: "criteriacount",
          label: this.$t("criteriacount"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "maxscore",
          label: this.$t("maxscore"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "actions",
          tdClass: "text-right",
          thClass: "text-center",
          label: this.$t("actions"),
        },
      ],
      items: [],
      CurriculumTypeList: [],
      SchoolYearList: [],
      HigHerEduClassifierList: [],
      EducationFormTypemList: [],
      EducationLanguageList: [],
      GenderList: [],
      SchoolYearList: [],
      totalRows: "",
      isBusy: true,
      filter: {
        schoolYearId: 0,
        higHerEduClassifierId: 0,
        educationFormTypemId: 0,
        educationLanguageId: 0,
        statusId : 0,
        genderId: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100, 500, 1000],
        SortIcon: "arrow-up",
      },
      PrintLoading: false,
    };
  },
  created() {
    (this.filter.schoolYearId =
      this.$route.query.schoolYearId || this.filter.schoolYearId),
      (this.filter.higHerEduClassifierId =
        this.$route.query.higHerEduClassifierId || this.filter.higHerEduClassifierId),
      (this.filter.educationFormTypemId =
        this.$route.query.educationFormTypemId || this.filter.educationFormTypemId),
      (this.filter.educationLanguageId =
        this.$route.query.educationLanguageId || this.filter.educationLanguageId),
      (this.filter.statusId =
        this.$route.query.statusId || this.filter.statusId),
      (this.filter.genderId =
        this.$route.query.genderId || this.filter.genderId),
      (this.filter.Search =
        this.$route.query.Search || this.filter.Search),
      (this.filter.SortColumn =
        this.$route.query.SortColumn || this.filter.SortColumn),
      (this.filter.OrderType =
        this.$route.query.OrderType || this.filter.OrderType),
      (this.filter.PageNumber =
        this.$route.query.PageNumber || this.filter.PageNumber),
      (this.filter.PageLimit =
      this.$route.query.PageLimit  || this.filter.PageLimit),
    this.Refresh();
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
    // Print(item) {
    //   this.PrintLoading = true;
    //   CurriculumService.Print(item.id)
    //     .then((res) => {
    //       this.PrintLoading = false;
    //       this.forceFileDownload(res, "Cirriculum");
    //     })
    //     .catch((error) => {
    //       this.makeToast(error.response.data.error, this.$t("error"), "danger");
    //     });
    // },
    // forceFileDownload(response, name) {
    //   var headers = response.headers;
    //   var blob = new Blob([response.data]);
    //   const url = window.URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", name + ".xlsx"); //or any other extension
    //   document.body.appendChild(link);
    //   link.click();
    // },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Создан"
        ? "primary"
        : text === "Yaratilgan"
        ? "primary"
        : text === "Утвержден"
        ? "success"
        : text === "Tasdiqlangan"
        ? "success"
        : text === "Тасдиқланган"
        ? "success"
         : text ===  "Bekor qilingan"
        ? "danger"
        : text ===  "Бекор қилинган"
        ? "danger"
        : text === "Отменено"
        ? "danger"
        : text === true
        ? "success"
        : text === false
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditAssessmentCriteria",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditAssessmentCriteria",
        params: {
          id: item.id,
        },
        query: {
          IsClone: false,
          schoolYearId: this.filter.schoolYearId,
          higHerEduClassifierId: this.filter.higHerEduClassifierId,
          educationFormTypemId: this.filter.educationFormTypemId,
          educationLanguageId: this.filter.educationLanguageId,
          statusId : this.filter.statusId,
          genderId: this.filter.genderId,
          Search: this.filter.Search,
          SortColumn: this.filter.SortColumn,
          PageNumber: this.filter.PageNumber,
          PageLimit: this.filter.PageLimit
        },
      });
    },
    Clone(item) {
      this.$router.push({
        name: "EditAssessmentCriteria",
        params: {
          id: item.id,
        },
        query: {
          IsClone: true,
          schoolYearId: this.filter.schoolYearId,
          higHerEduClassifierId: this.filter.higHerEduClassifierId,
          educationFormTypemId: this.filter.educationFormTypemId,
          educationLanguageId: this.filter.educationLanguageId,
          statusId : this.filter.statusId,
          genderId: this.filter.genderId,
          Search: this.filter.Search,
          SortColumn: this.filter.SortColumn,
          PageNumber: this.filter.PageNumber,
          PageLimit: this.filter.PageLimit
        },
      });
    },
    View(item) {
      this.$router.push({
        name: "ViewAssessmentCriteria",
        params: {
          id: item.id,
        },
        query: {
          schoolYearId: this.filter.schoolYearId,
          higHerEduClassifierId: this.filter.higHerEduClassifierId,
          educationFormTypemId: this.filter.educationFormTypemId,
          educationLanguageId: this.filter.educationLanguageId,
          statusId : this.filter.statusId,
          genderId: this.filter.genderId,
          Search: this.filter.Search,
          SortColumn: this.filter.SortColumn,
          PageNumber: this.filter.PageNumber,
          PageLimit: this.filter.PageLimit
        }
      });
    },
    Delete(item) {
      AssessmentCriteriaService.Delete(item.id)
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
      AssessmentCriteriaService.Approve(item.id)
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
      AssessmentCriteriaService.CancelApproval(item.id)
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
      AssessmentCriteriaService.GetList(
        this.filter.schoolYearId,
        this.filter.higHerEduClassifierId,
        this.filter.educationFormTypemId,
        this.filter.educationLanguageId,
        this.filter.genderId,
        this.filter.statusId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
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
