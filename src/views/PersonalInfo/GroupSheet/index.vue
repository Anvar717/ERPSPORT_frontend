<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="m-2">
          <b-col>
            <h3 class="text-center">{{ $t("GroupSheet") }}</h3>
            <CButton
              color="danger"
              class="float-sm-right mt-1"
              @click="$router.push('/')"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>

        <CCardHeader>
          <CRow>
            <CCol sm="12" md="3" lg="2" class="my-2">
              <v-select
                :options="SchoolYearList"
                v-model="filter.schoolYearId"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolYear')"
                @input="Refresh"
                :searchable="false"
                label="name"
                style="width: 100%"
              ></v-select>
            </CCol>
            <CCol sm="12" md="6" lg="3" class="my-2">
              <v-select
                :options="HigHerEduClassifierList"
                v-model="filter.higHerEduClassifierId"
                :reduce="(item) => item.id"
                :placeholder="$t('higHerEduClassifier')"
                label="fullname"
                :searchable="false"
                class="mr-2"
                style="width: 100%"
              ></v-select>
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
            <CCol sm="12" md="3" lg="2" class="my-2">
              <v-select
                :options="EducationFormTypemList"
                v-model="filter.educationFormTypemId"
                :reduce="(item) => item.id"
                :searchable="false"
                :placeholder="$t('educationFormTypem')"
                label="name"
                class="mr-2"
                style="width: 100%"
              ></v-select>
            </CCol>
            <CCol lg="4" md="6" sm="12" class="d-flex my-2">
              <v-select
                :options="EducationLanguageList"
                v-model="filter.educationLanguageId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :searchable="false"
                :placeholder="$t('educationLanguage')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
              <v-select
                :options="GenderList"
                v-model="filter.genderId"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('gender')"
                :searchable="false"
                label="name"
                style="width: 100%"
              ></v-select>
            </CCol>
            <CCol sm="12" md="3" lg="2" class="my-2">
              <b-form-input
                v-model="filter.dtmId"
                :placeholder="$t('dtmId')"
              ></b-form-input>
            </CCol>
            <CCol sm="12" md="3" lg="2" class="my-2">
              <b-form-checkbox @input="Refresh" v-model="filter.isretaketheexam"> {{ $t('isretaketheexam') }} </b-form-checkbox>
            </CCol>
            <CCol sm="12" md="3" lg="2" class="my-2">
              <b-form-checkbox @input="Refresh" v-model="filter.isprotocolformed"> {{ $t('isprotocolformed') }} </b-form-checkbox>
            </CCol>
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap; min-height: 500px"
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
            <!-- <template v-slot:head(ihexpenditurenumber)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('ihexpenditurenumber')"
              >
                {{ $t("ihexpenditurenumber") }}
                <b-icon v-if="filter.SortColumn === 'ihexpenditurenumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template> -->
            <!-- <template v-slot:head(ihexpendituredate)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('ihexpendituredate')"
              >
                {{ $t("ihexpendituredate") }}
                <b-icon v-if="filter.SortColumn === 'ihexpendituredate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template> -->
            <!-- <template v-slot:head(ihexpendituresum)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('ihexpendituresum')"
              >
                {{ $t("ihexpendituresum") }}
                <b-icon v-if="filter.SortColumn === 'ihexpendituresum'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template> -->
            <template v-slot:head(status)>
              <div style="cursor: pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">
                {{ item.statusname }}
              </CBadge>
            </template>
            <template v-slot:cell(childrencount)="{ item }">
              {{ item.participatedexamcount }}/{{ item.childrencount }}
            </template>
            <template v-slot:cell(isprotocolformed)="{ item }">
              <CBadge :color="item.isprotocolformed ? 'success' : 'danger'">
                {{ item.isprotocolformed ? $t("yes") : $t("no") }}
              </CBadge>
            </template>
            <template v-slot:cell(isretaketheexam)="{ item }">
              <CBadge :color="item.isretaketheexam ? 'success' : 'danger'">
                {{ item.isretaketheexam ? $t("yes") : $t("no") }}
              </CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="
                    $can('GroupSheetEdit', 'permissions') && item.statusid != 2
                  "
                  @click="Edit(item)"
                  class="mr-2"
                >
                  {{ $t("rating") }}
                </b-link>
                <b-link
                  v-if="$can('GroupSheetView', 'permissions')"
                  @click="View(item)"
                  class="mr-2"
                >
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('GroupSheetView', 'permissions')"
                  @click="Print(item)"
                  class="mr-2"
                >
                  <b-icon icon="printer"></b-icon>
                </b-link>
                <b-link
                  @click="OpenModal(item)"
                  v-if="item.isprotocolformed == true"
                >
                  <b-icon icon="download"> </b-icon>
                </b-link>
                <b-link
                  v-if="
                    $can('GroupSheetFormed', 'permissions') &&
                    item.statusid == 2 &&
                    !item.isprotocolformed
                  "
                  @click="Formed(item)"
                  class="mr-2"
                >
                  <b-icon icon="check-circle-fill"></b-icon>
                </b-link>
                <!-- <b-dropdown variant="link" no-caret class="ml-n2 px-0">
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
                      v-if="$can('GroupSheetDelete', 'permissions')"
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown> -->
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
                <b-modal
                  :id="'AddModal' + item.id"
                  size="xl"
                  :title="$t('ApplicantsExams')"
                  no-close-on-backdrop
                  hide-footer
                  modal-class="custom-size-modal-planshet"
                >
                  <CRow>
                    <CCol sm="12" md="6" lg="4">
                      <label for="datepicker-dateformat2">{{
                        $t("examstartdate")
                      }}</label>
                      <custom-date-picker
                        v-model="filterRetakethEexam.examstartdate"
                        @keyup="BindValueExamStartDate"
                        format="DD.MM.YYYY"
                        v-mask="'##.##.####'"
                        type="date"
                        :clearable="false"
                        lang="ru"
                        :placeholder="$t('examstartdate')"
                      >
                      </custom-date-picker>
                    </CCol>
                    <CCol sm="12" md="6" lg="4">
                      <label for="datepicker-dateformat2">{{
                        $t("examstarttime")
                      }}</label>
                      <date-picker
                        v-model="filterRetakethEexam.examstarttime"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        type="time"
                        :placeholder="$t('examstarttime')"
                        value-type="format"
                        input-class="my-custom-date "
                        format="HH:mm:ss"
                      >
                        <template #input>
                          <b-form-input
                            :placeholder="$t('examstarttime')"
                            v-mask="'##:##:##'"
                            type="text"
                            maxlength="10"
                            v-model="filterRetakethEexam.examstarttime"
                            class="my-custom-date"
                          />
                        </template>
                      </date-picker>
                    </CCol>
                  </CRow>
                  <b-row class="mt-4">
                    <b-col
                      v-for="(item, index) in Data"
                      :key="index"
                      sm="6"
                      md="4"
                    >
                      <b-table-simple small class="border">
                        <b-tbody>
                          <b-tr>
                            <b-td>
                              <span
                                >{{
                                  $t("groupformbyedudirectiontablename")
                                }}
                                :</span
                              >
                            </b-td>
                            <b-td class="text-right">
                              <b>
                                {{ item.groupformbyedudirectiontablename }}
                              </b>
                            </b-td>
                          </b-tr>
                          <b-tr>
                            <b-td>
                              <span>{{ $t("dtmid") }} :</span>
                            </b-td>
                            <b-td class="text-right">
                              <b> {{ item.dtmid }} </b>
                            </b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="text-center">
                      <b-button
                        variant="danger"
                        @click="CloseAddModal(item)"
                        class="mr-2"
                      >
                        <b-icon icon="arrow-left-short"></b-icon>
                        {{ $t("back") }}
                      </b-button>
                      <b-button
                        v-if="$can('RetakeTheExamGroupSheet', 'permissions')"
                        variant="success"
                        @click="Add(item)"
                      >
                        <!-- @click="Add" -->
                        <b-icon icon="check2"></b-icon> {{ $t("Add") }}
                      </b-button>
                    </b-col>
                  </b-row>
                </b-modal>
              </div>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2"
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
import GroupSheetService from "@/services/GroupSheet.service";
import SchoolYearService from "@/services/SchoolYear.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import EducationFormTypeService from "@/services/EducationFormType.service";
import HelperService from "@/services/helper.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import {
  BListGroup,
  BListGroupItem,
  BTableSimple,
  BTbody,
  BTr,
  BTd,
} from "bootstrap-vue";
export default {
  components: {
    CustomDatePicker,
    BListGroupItem,
    BListGroup,
    BTableSimple,
    BTbody,
    BTr,
    BTd,
  },
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
        {
          key: "docnumber",
          label: this.$t("docnumber"),
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false,
        },
        {
          key: "highereduclassifiername",
          label: this.$t("highereduclassifiername"),
          class: "text-left",
        },
        {
          key: "examgroupname",
          label: this.$t("examgroupname"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "educationformtypename",
          label: this.$t("educationformtypename"),
          class: "text-left",
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
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
          key: "childrencount",
          label: this.$t("childrencount"),
          class: "text-right",
          sortable: false,
        },
        {
          key: "isprotocolformed",
          label: this.$t("isprotocolformed"),
          sortable: false,
        },
        {
          key: "isretaketheexam",
          label: this.$t("isretaketheexam"),
          sortable: false,
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      fieldsGetRetakethEexamAbiturients: [
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false,
        },
        {
          key: "highereduclassifiername",
          label: this.$t("highereduclassifiername"),
          class: "text-left",
        },
        {
          key: "examgroupname",
          label: this.$t("examgroupname"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "educationformtypename",
          label: this.$t("educationformtypename"),
          class: "text-left",
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
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
          key: "childrencount",
          label: this.$t("childrencount"),
          class: "text-right",
          sortable: false,
        },
        {
          key: "isprotocolformed",
          label: this.$t("isprotocolformed"),
          sortable: false,
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      filterRetakethEexam: {
        groupSheetId: 0,
        examstartdate: "",
        examstarttime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          minutes: 0,
          seconds: 0,
        },
      },
      items: [],
      Data: [],
      totalRows: "",
      isBusy: true,
      SchoolYearList: [],
      HigHerEduClassifierList: [],
      EducationFormTypemList: [],
      EducationLanguageList: [],
      GenderList: [],
      filter: {
        schoolYearId: 0,
        higHerEduClassifierId: 0,
        educationFormTypemId: 0,
        educationLanguageId: 0,
        genderId: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        dtmId: "",
        pageOptions: [5, 10, 15, 20, 25, 50, 100, 500, 1000],
        SortIcon: "arrow-up",
        isretaketheexam: false,
        isprotocolformed: false
      },
    };
  },
  created() {
    (this.filter.schoolYearId =
      this.$route.query.schoolYearId || this.filter.schoolYearId),
      (this.filter.higHerEduClassifierId =
        this.$route.query.higHerEduClassifierId ||
        this.filter.higHerEduClassifierId),
      (this.filter.educationFormTypemId =
        this.$route.query.educationFormTypemId ||
        this.filter.educationFormTypemId),
      (this.filter.educationLanguageId =
        this.$route.query.educationLanguageId ||
        this.filter.educationLanguageId),
      (this.filter.genderId =
        this.$route.query.genderId || this.filter.genderId),
      (this.filter.Search = this.$route.query.Search || this.filter.Search),
      (this.filter.SortColumn =
        this.$route.query.SortColumn || this.filter.SortColumn),
      (this.filter.OrderType =
        this.$route.query.OrderType || this.filter.OrderType),
      (this.filter.PageNumber =
        this.$route.query.PageNumber || this.filter.PageNumber),
      (this.filter.PageLimit =
        this.$route.query.PageLimit || this.filter.PageLimit),
      (this.filter.dtmId = this.$route.query.dtmId || this.filter.dtmId),
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
    OpenModal(item) {
      GroupSheetService.GetRetakethEexamAbiturients(item.id)
        .then((res) => {
          this.Data = res.data;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
      this.$bvModal.show("AddModal" + item.id);
    },
    CloseAddModal(item) {
      this.$bvModal.hide("AddModal" + item.id);
    },
    Add(item) {
      var filterID = this.filterRetakethEexam;
      filterID.groupSheetId = item.id;
      GroupSheetService.UpdateRetakethEexamGroupSheet(filterID)
        .then((res) => {
          this.CloseAddModal(item);
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
    BindValueExamStartDate(value) {
      this.filterRetakethEexam.examstartdate = value;
    },
    Create() {
      this.$router.push({
        name: "EditGroupSheet",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditGroupSheet",
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
          dtmId: this.filter.dtmId,
        },
      });
    },
    View(item) {
      this.$router.push({
        name: "ViewGroupSheet",
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
          dtmId: this.filter.dtmId,
        },
      });
    },
    Delete(item) {
      GroupSheetService.Delete(item.id)
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
      GroupSheetService.Approve(item.id)
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
      GroupSheetService.CancelApproval(item.id)
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
      GroupSheetService.GetList(
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
        this.filter.dtmId,
        this.filter.isprotocolformed,
        this.filter.isretaketheexam
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
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    Print(item) {
      GroupSheetService.Print(item.id)
        .then((res) => {
          this.forceFileDownload(res, "GroupSheet");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    Formed(item) {
      GroupSheetService.FormedGroupSheet(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("FormedSuccess"),
            this.$t("message"),
            "success"
          );
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
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
