<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">
              {{ $t("SpecializedSchool") }}
            </h4>
          </b-col>
          <b-col class="text-right">
            <CButton
              @click="Print"
              color="primary"
              class="mr-2"
              style="margin-top: 28px"
              size="sm"
            >
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
            <CButton
              color="danger"
              class="float-right"
              style="margin-top: 28px"
              @click="backbyregion"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col md="3">
              <div>
                <label> {{ $t("SchoolYear") }} </label>
                <v-select
                  :options="schoolyearlist"
                  v-model="filter.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('SchoolYear')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col sm="12" md="5">
              <label for=""> {{ $t("schoollegalform") }} </label>
              <v-select
                :options="schoollegalformlist"
                v-model="filter.schoollegalformid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoollegalform')"
                label="name"
              >
              </v-select>
            </b-col>
            <!-- <b-col>
              <div>
                <label> {{ $t('qualificationcategory') }} </label>
                <v-select
                    :options="qualificationcategorylist"
                    v-model="filter.schoollegalformid"
                    :reduce="item => item.id"
                    :placeholder="$t('qualificationcategory')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col> -->
            <!-- <b-col>
              <div>
                <label> {{ $t('schoolsubject') }} </label>
                <v-select
                    :options="schoolsubjectlist"
                    v-model="filter.schoolyearid"
                    :reduce="item => item.id"
                    :placeholder="$t('schoolsubject')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col> -->
            <!-- <b-col>
              <div>
                <label> {{ $t('schoolgradegroup') }} </label>
                <v-select
                    :options="schoolgradegrouplist"
                    v-model="filter.schoolgradegroupid"
                    :reduce="item => item.id"
                    :placeholder="$t('schoolgradegroup')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col> -->
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
                <!-- <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton> -->
              </div>
            </b-col>
          </b-row>
          <CRow class="form-group">
            <CCol lg="4" md="6" sm="6" class="text-left mt-2 pl-0"> </CCol>
          </CRow>
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
        <div class="table-container" style="padding: 5px">
          <table class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th
                  rowspan="3"
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("oblastname") }}
                </th>
                <th
                  rowspan="3"
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("regionname") }}
                </th>
                <th
                  rowspan="2"
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  rowspan="3"
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Жами ихтисослашган мактаблар сони") }}
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("шундан") }}
                </th>
                <th
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Жами ўқувчилар сони") }}
                </th>
                <th
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Шундан ихтисослашган синфлардан ўқувчилар сони") }}
                </th>
                <th
                  colspan="15"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Фанлар кесимида") }}
                </th>

                <!-- <th rowspan="2" style="text-align: center;vertical-align: middle">{{$t('Aввалдан мавжуд ва ПКлари билан ташкил етилган мактабларга богланмаган ихтисослашган мактаблар сони')}}</th>
                                <th rowspan="2" style="text-align: center;vertical-align: middle">{{$t('Жами ўқувчилар сони')}}</th>
                                <th rowspan="2" style="text-align: center;vertical-align: middle">{{$t('Шундан ихтисослашган синфлардан ўқувчилар сони')}}</th>		 -->
              </tr>
              <tr>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("ихтисослашган мактаб") }}
                </th>
                <th
                  rowspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("ихтисослашган мактаб-интернати") }}
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Математика ") }}
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Кимё-биология") }}
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("AКТ") }}
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Физика таянч") }}
                </th>
                <th
                  colspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Чет тили") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Мактаб сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Жами ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Шундан ихтисослашган синфлардаги ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Мактаб сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Жами ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Шундан ихтисослашган синфлардаги ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Мактаб сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Жами ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Шундан ихтисослашган синфлардаги ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Мактаб сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Жами ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Шундан ихтисослашган синфлардаги ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Мактаб сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Жами ўқувчилар сони") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Шундан ихтисослашган синфлардаги ўқувчилар сони") }}
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
                  style="text-align: left; vertical-align: middle"
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
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="regionchange(item)">{{
                    item.regionname
                  }}</a>
                </td>
                <!-- <td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)" @click="organizationchange(item)">{{item.organizationname}}</a>
                </td> -->
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td>{{ item.organizationcount }}</td>
                <td>{{ item.organization3count }}</td>
                <td>{{ item.organization15count }}</td>
                <td>{{ item.sudentscount }}</td>
                <td>{{ item.specializedsudentscount }}</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
                <td class="text-right">0</td>
              </tr>
              <tr
                style="
                  text-align: center;
                  vertical-align: middle;
                  font-weight: bold;
                "
              >
                <td>{{ $t("Total") }}</td>
                <td>
                  {{
                    bottomrow.organizationcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.organizationcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization3count == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.organization3count,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.organization15count == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.organization15count,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.sudentscount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.sudentscount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.specializedsudentscount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.specializedsudentscount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
            <tbody v-if="Loading">
              <tr>
                <td class="text-center" colspan="22">
                  <b-spinner></b-spinner>
                </td>
              </tr>
            </tbody>
          </table>

          <br />
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      schoollegalformlist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        organizationcount: 0,
        organization3count: 0,
        organization15count: 0,
        sudentscount: 0,
        specializedsudentscount: 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid: 1,
        oblastid: 0,
        regionid: 0,
        schoolgradegroupid: 0,
        OblastName: "",
        RegionName: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });

    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });

    this.createDate();
    SchoolYearService.GetDefault().then((res) => {
        this.filter.schoolyearid = res.data.id;
        this.Refresh();
      });
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
        this.filter.schoollegalformid = 0;
        this.filter.schoolyearid = 0;
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.filter.RegionName = "";
      }
    },
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.filter.oblastid).then((res) => {
        setregionlist(res.data);
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.schoolyearid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      // this.filter.schoollegalformid = item.schoollegalformid;
      //  this.filter.schoolyearid = item.schoolyearid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      // this.filter.schoollegalformid = item.schoollegalformid;
      //this.filter.schoolyearid = item.schoolyearid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportLearningProcessService.PrintSpecializedSchools(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SpecializedSchools.xlsx");
          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetSpecializedSchools(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolyearid,
        this.filter.schoollegalformid
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;

        this.bottomrow = {
          organization3count: 0,
          organizationcount: 0,
          organization15count: 0,
          sudentscount: 0,
          specializedsudentscount: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var organizationcount = 0;
      var organization3count = 0;
      var organization15count = 0;
      var sudentscount = 0;
      var specializedsudentscount = 0;
      item.forEach(function(item) {
        organizationcount = organizationcount + item.organizationcount;
        organization3count = organization3count + item.organization3count;
        organization15count = organization15count + item.organization15count;
        sudentscount = sudentscount + item.sudentscount;
        specializedsudentscount =
          specializedsudentscount + item.specializedsudentscount;
      });
      this.bottomrow = {
        organizationcount: organizationcount,
        organization3count: organization3count,
        organization15count: organization15count,
        sudentscount: sudentscount,
        specializedsudentscount: specializedsudentscount,
      };
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
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            organization3count: 0,
            organization15count: 0,
            sudentscount: 0,
            specializedsudentscount: 0,
          };
          this.filter.regionid = 0;
        }
        this.Refresh();
      },
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            organization3count: 0,
            organization15count: 0,
            sudentscount: 0,
            specializedsudentscount: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.schoollegalformid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            organization3count: 0,
            organization15count: 0,
            sudentscount: 0,
            specializedsudentscount: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            organizationcount: 0,
            organization3count: 0,
            organization15count: 0,
            sudentscount: 0,
            specializedsudentscount: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>