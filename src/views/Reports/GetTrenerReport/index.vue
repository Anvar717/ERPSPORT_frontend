<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col lg="12" sm="12">
            <h4 class="text-center">{{ $t("GetTrenerReport") }}</h4>
          </b-col>
          <!-- <b-col class="text-lg-right mt-3">
            <CButton color="danger" @click="$router.push('/')" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col> -->
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col sm="8">
              <b-row class="">
                <b-col
                  v-if="
                    $can('AdminView', 'permissions') ||
                    $can('MinSportView', 'permissions') ||
                    $can('OblastSport', 'permissions') ||
                    $can('RegionXTB', 'permissions')
                  "
                  lg="3"
                  sm="12"
                  class="achievement-input"
                >
                  <div class="" style="width: 100%">
                    <label>{{ $t("oblast") }}</label>
                    <v-select
                      :options="OblastList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="filter.oblastid"
                      @input="ChangeOblast"
                    ></v-select>
                  </div>
                </b-col>
                <b-col
                  v-if="
                    $can('AdminView', 'permissions') ||
                    $can('MinSportView', 'permissions') ||
                    $can('OblastSport', 'permissions') ||
                    $can('RegionXTB', 'permissions')
                  "
                  lg="3"
                  sm="12"
                  class="achievement-input"
                >
                  <div class="" style="width: 100%">
                    <label>{{ $t("region") }}</label>
                    <v-select
                      :options="RegionList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="filter.regionid"
                      @input="ChangeRegion"
                    ></v-select>
                  </div>
                </b-col>
                <b-col
                  v-if="
                    $can('AdminView', 'permissions') ||
                    $can('MinSportView', 'permissions') ||
                    $can('OblastSport', 'permissions') ||
                    $can('RegionXTB', 'permissions')
                  "
                  lg="3"
                  sm="12"
                  class="achievement-input"
                >
                  <div class="" style="width: 100%">
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
                <b-col lg="3" sm="12" class="achievement-input">
                  <div class="2" style="width: 100%">
                    <label>{{ $t("SportTypeClassifier") }}</label>
                    <v-select
                      :options="SportTypeClassifierList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="filter.sporttypeclassifierid"
                    ></v-select>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class="mr-2"
                  style="margin-top: 27px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t("Refresh") }}
                </CButton>
                <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top: 27px"
                >
                  <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                  <b-spinner v-if="PrintLoading" small></b-spinner>
                  &nbsp; {{ $t("Export") }}
                </CButton>
              </div>
            </b-col>
            <b-col class="text-right mt-4">
              <CButton color="danger" @click="$router.push('/')" size="sm">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardHeader>
          <div class="table-container">
            <table
              class="table table-bordered table-responsive"
              style="height: 600px; overflow: scroll"
            >
              <thead>
                <tr>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">№</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("Territory") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("District") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("NameInstitution") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("fio") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("Pinfl") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("sporttype") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    colspan="3"
                    class="text-center"
                  >
                    <p class="text1">
                      {{ $t("PermanentAssetIntakeMetrologicalTables") }}
                    </p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("GroupNumber") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    colspan="11"
                    class="text-center"
                  >
                    <p class="text1">{{ $t("TheNumberStages") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("NumberofStudentAthletes") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    colspan="11"
                    class="text-center"
                  >
                    <p class="text1">
                      {{ $t("TheNumberofStudentAthletesBylevels") }}
                    </p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("AcademicHours") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 0;
                      background-color: rgb(183, 218, 237);
                    "
                    rowspan="2"
                  >
                    <p class="text1">{{ $t("EmploymentRate") }}</p>
                  </th>
                </tr>
                <tr>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="text1">{{ $t("SeriesAndNumber") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="text1">{{ $t("sporttype") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="text1">{{ $t("Term") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SSG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG+3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG+2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("OSMG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SSG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("BTG") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("O'MG+3") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG1") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("SKEG+2") }}</p>
                  </th>
                  <th
                    style="
                      vertical-align: middle;
                      position: sticky;
                      top: 62px;
                      background-color: rgb(183, 218, 237);
                    "
                  >
                    <p class="test2">{{ $t("OSMG") }}</p>
                  </th>
                </tr>
              </thead>
              <b-tbody v-if="Loading">
                <b-tr>
                  <b-th class="text-center" style="height: 600px" colspan="36">
                    <b-spinner></b-spinner>
                  </b-th>
                </b-tr>
              </b-tbody>
              <tbody v-if="!Loading">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.row_number }}</td>
                  <td>{{ item.oblastname }}</td>
                  <td>{{ item.regionname }}</td>
                  <td>{{ item.organizationname }}</td>
                  <td>{{ item.coachpersonname }}</td>
                  <td>{{ item.coachpersonpinfl }}</td>
                  <td>{{ item.sporttypeclassifiername }}</td>
                  <td>{{ item.documentseries }}</td>
                  <td>{{ item.sporttypeclassifiernameofsertificate }}</td>
                  <td>{{ item.enddate }}</td>
                  <td>{{ item.grouptotalcount }}</td>
                  <td>{{ item.groupcount1 }}</td>
                  <td>{{ item.groupcount2 }}</td>
                  <td>{{ item.groupcount3 }}</td>
                  <td>{{ item.groupcount4 }}</td>
                  <td>{{ item.groupcount5 }}</td>
                  <td>{{ item.groupcount6 }}</td>
                  <td>{{ item.groupcount7 }}</td>
                  <td>{{ item.groupcount8 }}</td>
                  <td>{{ item.groupcount9 }}</td>
                  <td>{{ item.groupcount10 }}</td>
                  <td>{{ item.groupcount11 }}</td>
                  <td>{{ item.studenttotalcount }}</td>
                  <td>{{ item.studentcount1 }}</td>
                  <td>{{ item.studentcount2 }}</td>
                  <td>{{ item.studentcount3 }}</td>
                  <td>{{ item.studentcount4 }}</td>
                  <td>{{ item.studentcount5 }}</td>
                  <td>{{ item.studentcount6 }}</td>
                  <td>{{ item.studentcount7 }}</td>
                  <td>{{ item.studentcount8 }}</td>
                  <td>{{ item.studentcount9 }}</td>
                  <td>{{ item.studentcount10 }}</td>
                  <td>{{ item.studentcount11 }}</td>
                  <td>{{ item.academichours }}</td>
                  <td>{{ item.staff }}</td>
                </tr>
              </tbody>
              <!-- <tbody v-if="Loading"></tbody> -->
            </table>
          </div>
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
        </CCardHeader>
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
export default {
  data() {
    return {
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      SportTypeClassifierList: [],
      items: [],
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: true,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        sporttypeclassifierid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
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
      EmployeeManageService.GetTrenerReport(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.sporttypeclassifierid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data.rows;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
        }
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.regionid = res.data.regionid;
        }
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.organizationid > 0) {
          this.filter.organizationid = res.data.organizationid;
        }
        if (!!this.filter.regionid) {
          OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
            this.OrganizationList = res.data;
          });
        }
        this.totalRows = res.data.data.total;
      });
      SportTypeClassifierService.GetAll().then((res) => {
        this.SportTypeClassifierList = res.data;
      });
    },
    Print() {
      this.PrintLoading = true;
      EmployeeManageService.PrintTrenerReport(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res);
        })
        .catch((error) => {
          this.PrintLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
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
    ChangeOblast() {
      this.filter.regionid = null;
      this.filter.organizationid = null;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = null;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
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
<style lang="scss" scoped>
p.test2 {
  //   writing-mode: sideways-lr;
  transform: rotate(180deg);
  writing-mode: vertical-lr;
  text-align: start;
  font-size: 13px;
}
p.text1 {
  // text-align: start;
  font-size: 13px;
}
</style>
  