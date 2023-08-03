<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <CCardHeader>
          <b-row>
            <b-col lg="12" md="6" sm="12" class="text-center">
              <h3 v-if="persontypeid == 1" class="mt-1">{{ $t("Student") }}</h3>
              <h3 v-if="persontypeid == 2" class="mt-1">
                {{ $t("EmployeeReports") }}
              </h3>
            </b-col>
            <b-col lg="12" md="6" sm="12" class="mb-3 mt-3">
              <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton
                color="primary"
                class="float-sm-right mr-2"
                @click="Print"
                size="sm"
              >
                <b-icon icon="printer" v-if="!PrintLoading"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                {{ $t("Print") }}
              </CButton>
              <CButton
                v-if="
                  persontypeid == 1
                    ? $can('StudentEdit', 'permissions')
                    : $can('EmployeeEdit', 'permissions')
                "
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2 float-sm-right"
                size="sm"
              >
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton>
            </b-col>
          </b-row>
          <CRow class="form-group">
            <CCol
              lg="4"
              md="6"
              sm="6"
              xs="12"
              class="text-left mt-2"
              v-if="persontypeid == 1"
            >
              <v-select
                :options="IdentityDocumentList"
                :reduce="(item) => item.id"
                :placeholder="$t('identitydocument')"
                label="name"
                style="width: 100%"
                v-model="filter.identitydocumentid"
                @input="ChangeIdentityDoc"
              ></v-select>
            </CCol>
            <CCol lg="4" md="6" sm="12" class="text-left mt-2">
              <CRow class="">
                <CCol
                  lg="6"
                  sm="12"
                  v-if="persontypeid != 1 || filter.identitydocumentid !== 1"
                >
                  <b-form-input
                    class="mr-2 achievement-input"
                    :placeholder="$t('DocumentSeries')"
                    v-model="filter.DocumentSeries"
                  ></b-form-input>
                </CCol>
                <CCol
                  lg="6"
                  sm="12"
                  v-if="persontypeid == 1 && filter.identitydocumentid === 1"
                >
                  <v-select
                    class="mr-2 achievement-input"
                    :options="DocSeriesList"
                    :reduce="(item) => item.name"
                    :placeholder="$t('docseries')"
                    label="name"
                    v-model="filter.DocumentSeries"
                  ></v-select>
                </CCol>
                <CCol lg="6" sm="12">
                  <b-form-input
                    class=""
                    :placeholder="$t('DocumentNumber')"
                    v-model="filter.DocumentNumber"
                  ></b-form-input>
                </CCol>
              </CRow>
            </CCol>
            <CCol lg="2" md="4" sm="12" class="text-left mt-2">
              <v-select
                :options="SearchTypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('SearchType')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.searchtype"
                @input="ChangeSearchType"
              ></v-select>
            </CCol>
            <CCol lg="4" md="6" sm="12" class="text-left mt-2">
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
            </CCol>
            <CCol
              lg="3"
              md="3"
              sm="12"
              class="text-left mt-2"
              v-if="persontypeid != 1"
            ></CCol>
          </CRow>
          <b-row>
            <b-col
              class="mt-2"
            >
              <b-button-group @click="Refresh" size="sm">
                <b-button
                  @click="changeIsCheckResult"
                  :variant="
                    filter.ischeckresult == false &&
                    filter.isnotcheckresult == false
                      ? 'primary'
                      : 'outline-primary'
                  "
                >
                  {{ $t("All") }}
                </b-button>
                <b-button
                  @click="changeNotCheckResult"
                  :variant="
                    filter.isnotcheckresult == true &&
                    filter.ischeckresult == false
                      ? 'primary'
                      : 'outline-primary'
                  "
                >
                  {{ $t("notcheckresult") }}
                </b-button>
                <b-button
                  @click="changeCheckResult"
                  :variant="
                    filter.ischeckresult == true &&
                    filter.isnotcheckresult == false
                      ? 'primary'
                      : 'outline-primary'
                  "
                >
                  {{ $t("checkresult") }}
                </b-button>
              </b-button-group>
            </b-col>
            <b-col class="text-right">
                  <b-button-group @click="Refresh" size="sm">
                    <b-button
                      @click="filter.isphotoexists = null"
                      :variant="
                        filter.isphotoexists == null
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("All") }}
                    </b-button>
                    <b-button
                      @click="filter.isphotoexists = true"
                      :variant="
                        filter.isphotoexists == true
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("photoexists") }}
                    </b-button>
                    <b-button
                      @click="filter.isphotoexists = false"
                      :variant="
                        filter.isphotoexists == false
                          ? 'primary'
                          : 'outline-primary'
                      "
                    >
                      {{ $t("notphotoexists") }}
                    </b-button>
                  </b-button-group>
                <!-- <b-col
                  lg="4"
                  md="6"
                  sm="12"
                  class="btn_group"
                  style="text-align: right"
                >
                  <div v-if="$can('AdminView', 'permissions')">
                    <b-button-group @click="Refresh" size="sm">
                      <b-button
                        @click="changeIsCheckResult"
                        :variant="
                          filter.ischeckresult == false &&
                          filter.isnotcheckresult == false
                            ? 'primary'
                            : 'outline-primary'
                        "
                      >
                        {{ $t("All") }}
                      </b-button>
                      <b-button
                        @click="changeNotCheckResult"
                        :variant="
                          filter.isnotcheckresult == true &&
                          filter.ischeckresult == false
                            ? 'primary'
                            : 'outline-primary'
                        "
                      >
                        {{ $t("notcheckresult") }}
                      </b-button>
                      <b-button
                        @click="changeCheckResult"
                        :variant="
                          filter.ischeckresult == true &&
                          filter.isnotcheckresult == false
                            ? 'primary'
                            : 'outline-primary'
                        "
                      >
                        {{ $t("checkresult") }}
                      </b-button>
                    </b-button-group>
                  </div>
                </b-col> -->
            </b-col>
          </b-row>
          <CModal :title="$t('Import')" :show.sync="ImportModal">
            <b-form-file
              type="file"
              id="file"
              accept=".xls, .xlsx"
              ref="file"
              v-on:change="handleFileUpload()"
              v-model="file"
              :browse-text="$t('DoImport')"
              :placeholder="$t('DoImport')"
              drop-placeholder="Импортироват:"
            ></b-form-file>
            <template #footer>
              <CButton @click="ImportFromExcel" color="primary">
                <b-spinner small v-if="ImportLoading"></b-spinner>
                <b-icon v-if="!ImportLoading" icon="cloud-arrow-up"></b-icon>
                {{ $t("DoImport") }}
              </CButton>
            </template>
          </CModal>
        </CCardHeader>
        <CCardBody>
          <!-- <b-row
            class="mx-n3 mb-4"
            v-if="
              $can('AdminView', 'permissions') ||
              $can('MinSportView', 'permissions') ||
              $can('OblastSport', 'permissions') ||
              $can('RegionXTB', 'permissions')
            "
          >
            <b-col sm="12" md="12" lg="12">
              <b-row>
                <b-col lg="3" md="6" sm="12">
                  <div class="mr-2" style="width: 100%">
                    <label>{{ $t("sporttypeclassifier") }}</label>
                    <v-select
                      :options="SportTypeClassifierList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      class="fname-select"
                      v-model="filter.sporttypeclassifierid"
                      @input="Refresh"
                    ></v-select>
                  </div>
                </b-col>
                <b-col lg="3" md="6" sm="12">
                  <div class="mr-2" style="width: 100%">
                    <label>{{ $t("oblast") }}</label>
                    <v-select
                      :options="OblastList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      class="fname-select"
                      :disabled="
                        (!$can('AdminView', 'permissions') &&
                          !$can('MinSportView', 'permissions') &&
                          $can('OblastSport', 'permissions')) ||
                        $can('RegionXTB', 'permissions')
                      "
                      v-model="filter.oblastid"
                      @input="ChangeOblast"
                    ></v-select>
                  </div>
                </b-col>
                <b-col lg="3" md="6" sm="12">
                  <div class="mr-2" style="width: 100%">
                    <label>{{ $t("region") }}</label>
                    <v-select
                      :options="RegionList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      class="fname-select"
                      :disabled="
                        !$can('AdminView', 'permissions') &&
                        !$can('MinSportView', 'permissions') &&
                        !$can('OblastSport', 'permissions') &&
                        $can('RegionXTB', 'permissions')
                      "
                      v-model="filter.regionid"
                      @input="ChangeRegion"
                    ></v-select>
                  </div>
                </b-col>
                <b-col lg="3" md="6" sm="12">
                  <div class="mr-2" style="width: 100%">
                    <label>{{ $t("organization") }}</label>
                    <v-select
                      :options="OrganizationList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="filter.organizationid"
                    ></v-select>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row> -->

          <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap"
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
            <template v-slot:head(fullname)>
              <div style="cursor: pointer" @click="ChangeSort('fullname')">
                {{ $t("fullname") }}
                <b-icon
                  v-if="filter.SortColumn === 'fullname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(dateofbirth)>
              <div style="cursor: pointer" @click="ChangeSort('dateofbirth')">
                {{ $t("dateofbirth") }}
                <b-icon
                  v-if="filter.SortColumn === 'dateofbirth'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(gender)>
              <div style="cursor: pointer" @click="ChangeSort('gender')">
                {{ $t("gender") }}
                <b-icon
                  v-if="filter.SortColumn === 'gender'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(nationality)>
              <div style="cursor: pointer" @click="ChangeSort('nationality')">
                {{ $t("nationality") }}
                <b-icon
                  v-if="filter.SortColumn === 'nationality'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(citizenship)>
              <div style="cursor: pointer" @click="ChangeSort('citizenship')">
                {{ $t("citizenship") }}
                <b-icon
                  v-if="filter.SortColumn === 'citizenship'"
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
            <template v-slot:head(checkresult)>
              <div style="cursor: pointer" @click="ChangeSort('checkresult')">
                {{ $t("checkresult") }}
                <b-icon
                  v-if="filter.SortColumn === 'checkresult'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(pinfl)>
              <div style="cursor: pointer" @click="ChangeSort('pinfl')">
                {{ $t("pinfl") }}
                <b-icon
                  v-if="filter.SortColumn === 'pinfl'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(contactinfo)>
              <div style="cursor: pointer" @click="ChangeSort('contactinfo')">
                {{ $t("contactinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'contactinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <!-- <template v-slot:cell(photoexists)="{ item }">
              <CBadge :color="getItemColor1(item.photoexists)">{{
                  item.photoexists ? "Да" : "Нет"
              }}</CBadge>
            </template> -->
            <template v-slot:cell(photo)="{ item }">
              <div>
                <img
                  :src="
                    !!item.attachmentfileid
                      ? axios.defaults.baseURL +
                        'FileManage/Get?id=' +
                        item.attachmentfileid
                      : 'data:image/jpg;base64,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'
                  "
                  class="img-thumbnail float-end"
                  fluid
                  style="
                    width: 70px;
                    height: 70px;
                    object-fit: cover;
                    max-width: 70px !important;
                  "
                />
              </div>
            </template>
            <template #cell(checkresult)="{ item }">
              <b-icon
                scale="1.5"
                :icon="
                  item.checkresult ? 'check-circle-fill' : 'info-circle-fill'
                "
                :variant="item.checkresult ? 'success' : 'warning'"
              ></b-icon>
            </template>
            <template #cell(fullname)="{ item }">
              <div class="text-left">
                <span
                  style="
                    color: blue;
                    text-decoration: underline;
                    cursor: pointer;
                  "
                  @click="GotoCard(item)"
                  >{{ item.fullname }}</span
                >
              </div>
            </template>
            <!-- patch-check-fill -->
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="
                    !$can('MinSportView', 'permissions') ||
                    !$can('OblastSport', 'permissions') ||
                    !$can('RegionXTB', 'permissions')
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="
                    persontypeid == 1
                      ? $can('StudentDelete', 'permissions')
                      : $can('EmployeeDelete', 'permissions')
                  "
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('AdminView', 'permissions')"
                  @click="$bvModal.show('DeleteIsAdminModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('DeleteIsAdminModal') }"
                >
                  <b-icon icon="info-circle"></b-icon>
                </b-link>
              </div>
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
                    {{ $t("Accept") }}
                  </CButton>
                </div>
              </b-modal>
              <b-modal :id="'DeleteIsAdminModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{
                  $t("DeleteIsAdminModal")
                }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('DeleteIsAdminModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("NotAccept") }}
                  </CButton>
                  <CButton @click="DeletePersonIsAdmin(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Accept") }}
                  </CButton>
                </div>
              </b-modal>
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
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0 mobile-pagination"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import PersonService from "@/services/person.service";
import IdentityDocumentService from "@/services/IdentityDocument.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
export default {
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      ImportModal: false,
      ImportLoading: false,
      DownloadLoading: false,
      fields: [],
      DocSeriesList: [],
      SportTypeClassifierList: [],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        personid: 0,
        personname: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        DocumentSeries: "",
        DocumentNumber: "",
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        persontypeid: 1,
        identitydocumentid: 1,
        organizationid: 0,
        isphotoexists: null,
        regionid: 0,
        oblastid: 0,
        inn: "",
        pinfl: "",
        isnotcheckresult: false,
        ischeckresult: false,
        searchtype: 2,
        fakeSearch: "",
        sporttypeclassifierid: 0,
        documentTypeId:0,
      },
      SearchTypeList: [
        { id: 1, name: this.$t("ID") },
        { id: 2, name: this.$t("fio") },
        { id: 3, name: this.$t("pinfl") },
        // { id : 4,name : this.$t('inn') }
      ],
      IdentityDocumentList: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      file: null,
      fillLoading: false,
      PrintLoading: false,
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    if (
      this.$route.query.docseries ||
      this.$route.query.docnumber ||
      this.$route.query.search ||
      this.$route.query.pagelimit
    ) {
      this.filter.personname = this.$route.query.search;
      this.filter.DocumentSeries = this.$route.query.docseries;
      this.filter.DocumentNumber = this.$route.query.docnumber;
      this.filter.PageLimit = this.$route.query.pagelimit;
    }
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocSeriesList = res.data.result;
    });
    IdentityDocumentService.GetAll().then((res) => {
      this.IdentityDocumentList = res.data.result;
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SportTypeClassifierList = res.data;
    });
    this.personfieldchange();
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
    ChangeIdentityDoc() {
      this.filter.DocumentSeries = "";
      this.filter.DocumentNumber = "";
      this.filter.pinfl = "";
    },
    ChangeSearchType() {
      this.filter.inn = "";
      this.filter.pinfl = "";
      this.filter.personid = "";
      this.filter.personname = "";
      this.filter.fakeSearch = "";
    },
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
    GotoCard(item) {
      if (this.persontypeid == 1) {
        // if (this.person.DocumentTables.length != 0) {
        // this.$router.push({
        //   name: "StudentCard1",
        //   query: {
        //     ID: item.id,
        //     docseries: item.documentseries,
        //     docnumber: item.documentnumber,
        //     dateofbirth: item.dateofbirth,
        //   },
        // });
        this.$router.push(
          `/StudentCard1/id=${item.id}&DocumentSeries=${item.documentseries}&DocumentNumber=${item.documentnumber}`
        );
        // }
      } else {
        // if (this.person.DocumentTables.length != 0) {
        this.$router.push({
          name: "EmployeeCard",
          query: {
            docseries: item.documentseries,
            docnumber: item.documentnumber,
            pinfl: item.pinfl,
            ID: item.id,
          },
        });
        // }
      }
      // this.$router.push({
      //        name: "EmployeeCard",
      //        name: this.isStudent ? "StudentCard" : "EmployeeCard",
      //        query: {
      //          docseries: item.documentseries,
      //          docnumber: item.documentnumber,
      //          pinfl: item.pinfl,
      //        },
      //     });
    },
    changeIsCheckResult() {
      this.filter.ischeckresult = false;
      this.filter.isnotcheckresult = false;
    },
    changeNotCheckResult() {
      this.filter.ischeckresult = false;
      this.filter.isnotcheckresult = true;
    },
    changeCheckResult() {
      this.filter.ischeckresult = true;
      this.filter.isnotcheckresult = false;
    },
    CheckFromGovData() {
      this.fillLoading = true;
      PersonService.CheckFromGovData(
        this.filter.organizationid,
        this.persontypeid
      )
        .then((res) => {
          this.makeToast(
            this.$t("CheckeMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
          this.fillLoading = false;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
          this.fillLoading = false;
        });
    },
    ChangeOblast() {
      this.filter.regionid = "";
      this.filter.organizationid = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = "";
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false,
          0
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: this.persontypeid == 1 ? "EditStudent" : "EditEmployee",
        params: {
          id: 0,
          persontypeid: this.persontypeid,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: this.persontypeid == 1 ? "EditStudent" : "EditEmployee",
        params: {
          id: item.id,
          persontypeid: this.persontypeid,
        },
        query: {
          docseries: this.filter.DocumentSeries,
          docnumber: this.filter.DocumentNumber,
          search: this.filter.personname,
          pagelimit: this.filter.PageLimit,
        },
      });
    },
    Delete(item) {
      PersonService.Delete(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          this.$bvModal.hide("DeleteModal" + item.id);
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    DeletePersonIsAdmin(item) {
      PersonService.DeletePersonIsAdmin(item.id)
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
    personfieldchange() {
      if (this.persontypeid == 1) {
        this.fields = [
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
            key: "photo",
            label: this.$t("image"),
            sortable: false,
          },
          {
            key: "fullname",
            label: this.$t("fullname"),
            sortable: false,
          },
          {
            key: "dateofbirth",
            label: this.$t("dateofbirth"),
            sortable: false,
          },
          {
            key: "gender",
            label: this.$t("gender"),
            sortable: false,
          },
          {
            key: "nationality",
            label: this.$t("nationality"),
            sortable: false,
            class: "text-left",
          },
          {
            key: "citizenship",
            label: this.$t("citizenship"),
            sortable: false,
          },
          {
            key: "pinfl",
            label: this.$t("pinfl"),
            sortable: false,
          },
          {
            key: "documentseries",
            label: this.$t("documentseries"),
            sortable: false,
          },
          {
            key: "documentnumber",
            label: this.$t("documentnumber"),
            sortable: false,
          },
          {
            key: "checkresult",
            label: this.$t("checkresult"),
            sortable: false,
          },
          {
            key: "contactinfo",
            label: this.$t("contactinfo"),
            sortable: false,
          },
          {
            key: "orgoblast",
            label: this.$t("oblast"),
            sortable: false,
          },
          {
            key: "orgregion",
            label: this.$t("region"),
            sortable: false,
          },
          {
            key: "organization",
            label: this.$t("organization"),
            sortable: false,
          },
          {
            key: "orginn",
            label: this.$t("organizationinn"),
            sortable: false,
          },
          {
            key: "orgschoolgradename",
            label: this.$t("orgschoolgrade"),
            sortable: false,
          },
          // {
          //   key: "photoexists",
          //   thClass: "text-center",
          //   tdClass: "text-center",
          //   label: this.$t("image"),
          //   sortable: false,
          // },
        ];
      } else {
        this.fields = [
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
            key: "photo",
            label: this.$t("image"),
            sortable: false,
          },
          {
            key: "fullname",
            label: this.$t("fullname"),
            sortable: false,
          },
          {
            key: "dateofbirth",
            label: this.$t("dateofbirth"),
            sortable: false,
          },
          {
            key: "gender",
            label: this.$t("gender"),
            sortable: false,
          },
          {
            key: "nationality",
            label: this.$t("nationality"),
            sortable: false,
            class: "text-left",
          },
          {
            key: "citizenship",
            label: this.$t("citizenship"),
            sortable: false,
          },
          {
            key: "pinfl",
            label: this.$t("pinfl"),
            sortable: false,
          },
          {
            key: "documentseries",
            label: this.$t("documentseries"),
            sortable: false,
          },
          {
            key: "documentnumber",
            label: this.$t("documentnumber"),
            sortable: false,
          },
          {
            key: "checkresult",
            label: this.$t("checkresult"),
            sortable: false,
          },
          {
            key: "contactinfo",
            label: this.$t("contactinfo"),
            sortable: false,
          },
          // {
          //   key: "organization",
          //   label: this.$t("organization"),
          //   sortable: false,
          // },
          // {
          //   key: "positionname",
          //   label: this.$t("positionname"),
          //   sortable: false,
          // },
          // {
          //   key: "schoolsubjectname",
          //   label: this.$t("schoolsubjectname"),
          //   sortable: false,
          // },
          // {
          //   key: "photoexists",
          //   thClass: "text-center",
          //   tdClass: "text-center",
          //   label: this.$t("image"),
          //   sortable: false,
          // },
        ];
      }
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
    // checkFilter() {
    //   var self = this;
    //   if (!!self.filter.oblastid && !self.filter.regionid) {
    //     this.makeToast(this.$t("regionNotSelect"), this.$t("Error"), "danger");
    //     return false;
    //   }
    //   if (
    //     !!self.filter.oblastid &&
    //     !!self.filter.regionid &&
    //     !this.filter.organizationid
    //   ) {
    //     this.makeToast(
    //       this.$t("OrganizationNotSelected"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   return true;
    // },
    Refresh() {
      // if (!this.checkFilter()) {
      //   return false;
      // }
      if (this.persontypeid == 2) {
        this.filter.identitydocumentid = 2;
      }
      if (!!this.filter.identitydocumentid) {
        this.filter.documentTypeId = this.filter.identitydocumentid
      }
      this.isBusy = true;
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
        false,
        this.filter.organizationid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.isnotcheckresult,
        this.filter.ischeckresult,
        this.filter.inn,
        this.filter.pinfl,
        this.filter.identitydocumentid,
        this.filter.isphotoexists,
        this.filter.sporttypeclassifierid,
        0,
        this.filter.documentTypeId
      )
        .then((res) => {
          this.isBusy = false;
          this.items = res.data.data.rows;
          this.totalRows = res.data.data.total;
          if (res.data.oblastid != 0) {
            this.filter.oblastid = res.data.oblastid;
            if (!!this.filter.oblastid) {
              RegionService.GetAll(this.lang, this.filter.oblastid).then(
                (res) => {
                  this.RegionList = res.data;
                }
              );
            }
          }
          if (res.data.regionid != 0) {
            // this.filter.oblastid = res.data.oblastid;
            // this.ChangeOblast();
            this.filter.regionid = res.data.regionid;
            if (!!this.filter.regionid) {
              OrganizationService.GetAll(0, this.filter.regionid).then(
                (res) => {
                  this.OrganizationList = res.data;
                }
              );
            }
          }
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
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
    handleFileUpload() {
      this.file = this.$refs.file;
    },
    ImportFromExcel() {
      this.ImportLoading = true;
      let formData = new FormData();

      var selectfiles = this.file;
      formData.append("excelfile", selectfiles);
      /* formData.append("budget", this.Budget); */
      PersonService.ImportFromExcel(formData)
        .then((res) => {
          /* this.Budget = res.data
                this.items1 = res.data.Tables1
                this.items2 = res.data.Tables2 */
          this.ImportLoading = false;
          this.ImportModal = false;
          alert(this.$t("ImportOnQueue"));
          this.Refresh();
          window.location.assign("/StudentManagement/ImportDocument");
          this.file = null;
        })
        .catch((error) => {
          alert(error.response.data.error);
          this.ImportLoading = false;
        });
    },
    Print() {
      if (
        this.$can("AdminView", "permissions") &&
        this.filter.isnotcheckresult
      ) {
        this.makeToast(this.$t("AdminRoleNotHave"), this.$t("error"), "danger");
      }
      if (this.$can("AdminView", "permissions") && !this.filter.oblastid) {
        this.makeToast(this.$t("oblastNotCorrect"), this.$t("error"), "danger");
      }
      // else if (
      //   this.$can("AdminView", "permissions") &&
      //   !this.filter.isnotcheckresult &&
      //   !this.filter.regionid
      // ) {
      //   this.makeToast(
      //     this.$t("RegionNotSelected"),
      //     this.$t("error"),
      //     "danger"
      //   );
      // }
      else {
        this.PrintLoading = true;
        this.persontypeid == 1
          ? PersonService.PrintStudent(
              this.filter.personid,
              this.filter.personname,
              this.filter.SortColumn,
              "",
              0,
              0,
              this.filter.DocumentSeries,
              this.filter.DocumentNumber,
              this.persontypeid,
              false,
              this.filter.organizationid,
              this.filter.oblastid,
              this.filter.regionid,
              this.filter.isnotcheckresult,
              this.filter.ischeckresult,
              this.filter.isphotoexists
            )
              .then((res) => {
                this.PrintLoading = false;
                this.forceFileDownload(res, "ReportStudentList");
              })
              .catch((error) => {
                this.makeToast(
                  error.response.data.error,
                  this.$t("error"),
                  "danger"
                );
                this.PrintLoading = false;
              })
          : PersonService.PrintPerson(
              this.filter.personid,
              this.filter.personname,
              this.filter.SortColumn,
              "",
              0,
              0,
              this.filter.DocumentSeries,
              this.filter.DocumentNumber,
              this.persontypeid,
              false,
              this.filter.organizationid,
              this.filter.oblastid,
              this.filter.regionid,
              this.filter.isnotcheckresult,
              this.filter.ischeckresult,
              this.filter.isphotoexists
            )
              .then((res) => {
                this.forceFileDownload(res, "ReportPersonList");
                this.PrintLoading = false;
              })
              .catch((error) => {
                this.makeToast(
                  error.response.data.error,
                  this.$t("error"),
                  "danger"
                );
                this.PrintLoading = false;
              });
      }
    },
    DownloadTemplate() {
      this.DownloadLoading = true;
      PersonService.PrintTemplate()
        .then((res) => {
          this.forceFileDownload(res, "template");
          this.DownloadLoading = false;
          this.makeToast(
            this.$t("SuccessPrint"),
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
          this.DownloadLoading = false;
        });
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
    /* "filter.DocumentNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.DocumentSeries": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    }, */
    persontypeid: {
      handler(newValue, oldValue) {
        this.filter.DocumentNumber = "";
        this.filter.DocumentSeries = "";
        this.filter.personname = "";
        this.filter.ischeckresult = false;
        this.filter.isnotcheckresult = false;
        (this.filter.oblastid = 0),
          (this.filter.regionid = 0),
          (this.filter.organizationid = 0),
          this.filter;
        this.personfieldchange();
        this.Refresh();
      },
    },
  },
};
</script>

<style lang="scss">
</style>
