<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{$t('ImportDocument')}}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <!--             <CCol lg="2" md="5" sm="11" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="OnDate">
                <div class="form-group form-row">
                  <div class="col-sm-9">
                    <date-picker
                      v-model="ImportDocument.OnDate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('OnDate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </date-picker>
                  </div>
                </div>
              </ValidationProvider>
            </CCol>-->
            <!--             <CCol lg="2" md="5" sm="11" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="OrgSchoolGrade">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-9"
                    :options="orgschoolgradelist"
                    v-model="filter.OrgSchoolGradeID"
                    :reduce="item => item.id"
                    :placeholder="$t('OrgSchoolGrade')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol lg="3" md="5" sm="11" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="schoolyear">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-9"
                    :options="schoolyearlist"
                    v-model="filter.SchoolYearID"
                    :reduce="item => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>-->
            <!--             <CCol lg="3" md="5" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('FullName')"
                autocomplete="text"
                v-model="filter.FullName"
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
                    {{$t('search')}}
                  </CButton>
                </template>
              </CInput>
            </CCol>-->
            <CCol lg="12" md="12" sm="12" class="text-left">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                class="mr-2"
              >
                <b-icon icon="arrow-repeat"> </b-icon> {{$t('Refresh')}}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template #cell(status)="{item}">
              <CBadge :color="getItemColor(item.status)">{{
                item.status
              }}</CBadge>
            </template>
            <template #cell(actions)="{item}">
                <b-link
                  @click="Download(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Download') }"
                >
                  <b-icon icon="cloud-download"></b-icon>
                </b-link>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-primary my-2" style="vertical-align:middle">
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>

          <div class="pb-4">
            <div style="float:left;font-size:12px">
              {{$t('RecordsFrom')}} {{this.firstNumber}} {{$t('by')}} {{this.lastNumber}} {{$t('of')}}
              {{this.totalRows}}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="perPageSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float:left;font-size:12px">{{$t('RecordsPerPage')}}</div>
            <div style="float:right">
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
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import StudentManageService from "@/services/StudentManage.service";
import ImportDocumentService from "@/services/ImportDocument.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      orgschoolgradelist: [],
      fields: [
        {
          key : 'actions',
          label : this.$t('actions'),
          sortable : false
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        },
        {
          key: "importfilename",
          label: this.$t("importfilename"),
          sortable: false,
        },
        {
          key: "documentcount",
          label: this.$t("documentcount"),
          sortable: false,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
        },
        {
          key: "resultinfo",
          label: this.$t("resultinfo"),
          sortable: false,
        },
        {
          key: "starttime",
          label: this.$t("starttime"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "endtime",
          label: this.$t("endtime"),
          sortable: false,
        },
        {
          key: "tablename",
          label: this.$t("tablename"),
          sortable: false,
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
        },
        /* {
          key: "citizenship",
          label: this.$t("citizenship"),
          sortable: false
        },
        {
          key: "inn",
          label: this.$t("inn"),
          sortable: false
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          sortable: false
        },
        {
          key: "contactinfo",
          label: this.$t("contactinfo"),
          sortable: false
        } */
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        FullName: "",
        DateOfBirth: "",
        OnDate: "",
        SchoolYearID: 0,
        OrgSchoolGradeID: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
        Sort: "",
        Search : ''
      },
    };
  },
  created() {
    OrgSchoolGradeService.GetAll().then((res) => {
      this.orgschoolgradelist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    this.Refresh();
    this.createDate();
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
    }
  },
  methods: {
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
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
    Download(item){
      // console.log(item.importfilename)
      ImportDocumentService.GetImportedFile(item.id).then(res => {
        
        this.forceFileDownload(res, item.importfilename)
      }).catch(error => {
        this.makeToast(error.response.data.error,this.$t('message'),'danger')
      })
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.OnDate = dd + "." + mm + "." + yyyy;
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
      ImportDocumentService.GetList(
        this.filter.Search,
        this.filter.Sort,
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
      this.filter.Sort = columnName;
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
      }
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.filter.PageLimit = newValue
          this.Refresh();
        }
      }
    }
  }
};
</script>
