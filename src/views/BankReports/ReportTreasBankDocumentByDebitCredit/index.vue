<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col class="text-center">
            <h3>{{ $t("ReportTreasBankDocumentByDebitCredit") }}</h3>
          </b-col>
        </b-row>
        <b-row class="p-3">
          <b-col lg="12" md="12" sm="12" class="text-left mt-0">
            <b-row class="">
              <b-col lg="3" md="4" sm="12" class="achievement-input">
                <div class="">
                  <label for>{{ $t("StartDate") }}</label>
                  <date-picker
                    v-model="filter.StartDate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('StartDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker>
                </div>
              </b-col>
              <b-col lg="4" md="4" sm="12" class="d-flex">
                <div class="mr-2">
                  <label for>{{ $t("EndDate") }}</label>
                  <date-picker
                    v-model="filter.EndDate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('EndDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker>
                </div>
                  <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class=""
                  style="margin-top: 27px; width: 125px;"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t("Refresh") }}
                </CButton>
              </b-col>
            </b-row>
          </b-col>
          <!-- <b-col sm="12" md="3" lg="3">
            <div>
              <label> {{ $t("Oblast") }} </label>
              <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                  $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast"
              ></v-select>
            </div>
          </b-col>
          <b-col sm="12" md="3" lg="3">
            <div>
              <label> {{ $t("Region") }} </label>
              <v-select
                :options="RegionList"
                v-model="filter.regionid"
                :disabled="
                  !$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  !$can('OblastSport', 'permissions') &&
                  $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 100%"
              ></v-select>
            </div>
          </b-col> -->

              
              <!-- <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton> -->
        </b-row>
        <CCardHeader>
          <CRow class="form-group">
            <CCol>
              <h4 class="region-text">
                <a href="javascript:void(0)" @click="topcountrychange">{{
                  $t("O`zbekiston")
                }}</a>
                <a href="javascript:void(0)" @click="topoblastchange">{{
                  filter.OblastName
                }}</a>
                <a href="javascript:void(0)">{{ filter.RegionName }}</a>
              </h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="mobileStyle">
            <b-table-simple class="table table-bordered">
              <thead>
                <tr>
                  <th
                    rowspan="3"
                    v-if="filter.oblastid === 0 || filter.oblastid === null"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("oblast") }}
                  </th>
                  <th
                    rowspan="3"
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null)
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                </tr>
                <tr>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("incomenotbudget") }}
                  </th>
  
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("outgoingsbudget") }}
                  </th>
                  <th style="text-align: center; vertical-align: middle">
                    {{ $t("outgoingsnotbudget") }}
                  </th>
                </tr>
              </thead>
  
              <tbody v-if="!Loading">
                <tr
                  v-for="(item, i) in items"
                  style="text-align: center; vertical-align: middle"
                  :key="i"
                >
                  <td
                    v-if="filter.oblastid === 0 || filter.oblastid === null"
                    style="text-align: center; vertical-align: middle"
                  >
                    <a href="javascript:void(0)" @click="oblastchange(item)">{{
                      item.oblastname
                    }}</a>
                  </td>
                  <td
                    v-if="
                      filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null)
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    <a href="javascript:void(0)" @click="regionchange(item)">{{
                      item.regionname
                    }}</a>
                  </td>
                  <td
                    v-if="filter.oblastid > 0 && filter.regionid > 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    <a href="javascript:void(0)">{{ item.organizationname }}</a>
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.incomenotbudget, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.outgoingsbudget, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      $options.filters.currency(item.outgoingsnotbudget, {
                        symbol: "",
                        fractionCount: 0,
                      })
                    }}
                  </td>
                </tr>
              </tbody>
            </b-table-simple>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import TreasBankDocumentService from "@/services/TreasBankDocument.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import {
  BRow,
  BCol,
  BCard,
  BButton,
  BSpinner,
  BTabs,
  BTab,
  BCardText,
  BModal,
  BListGroup,
  BListGroupItem,
  BTable,
  BSidebar,
  BOverlay,
  BBadge,
  BFormInput,
} from "bootstrap-vue";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BSpinner,
    BTabs,
    BTab,
    BListGroup,
    BListGroupItem,
    BCardText,
    BTable,
    BSidebar,
    BModal,
    BBadge,
    BOverlay,
    BFormInput,
  },
  data() {
    return {
      items: [],
      OblastList: [],
      RegionList: [],
      totalRows: "",
      isBusy: true,
      Loading: false,
      filter: {
        onDate: "23.11.2022",
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        SortColumn: "",
        StartDate: "",
        EndDate: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    this.createDate();
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
      this.isBusy = true;
      TreasBankDocumentService.ReportTreasBankDocumentByDebitCredit(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.StartDate,
        this.filter.EndDate
      ).then((res) => {
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0)
          this.filter.OblastName = " / " + res.data.oblastname;
        this.filter.regionid = res.data.regionid;
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid > 0)
          this.filter.RegionName = " / " + res.data.regionname;
        if (!!this.filter.oblastid) {
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = "01.01." + yyyy;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    makeToast(message, title, type) {
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
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
      this.Refresh()
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      this.filter.RegionName = "";
      this.Refresh()
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
    },
  },
};
</script>

<style></style>
