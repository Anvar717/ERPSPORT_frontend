<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">
              {{ $t("Умумтаълим мактабларининг гуруҳлари") }}
            </h4>
          </b-col>
          <b-col class="text-right">
            <CButton
              @click="Print"
              color="primary"
              class="mr-2"
              style="margin-top:28px"
              size="sm"
            >
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
            <CButton
              color="danger"
              class="float-right"
              style="margin-top:28px"
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
                  class="mr-2"
                  :options="schoolyearlist"
                  v-model="filter.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('SchoolYear')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col sm="12" md="3">
              <label for=""> {{ $t("schoollegalform") }} </label>
              <v-select
                class="mr-2"
                :options="schoollegalformlist"
                v-model="filter.schoollegalformid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoollegalform')"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="3">
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
                style="width:100%"
                @input="ChangeOblast"
              ></v-select>
            </b-col>
            <b-col sm="12" md="3">
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
                style="width:100%"
              ></v-select>
            </b-col>
            <!-- <b-col>
              <div>
                <label> {{ $t('qualificationcategory') }} </label>
                <v-select
                    :options="qualificationcategorylist"
                    v-model="filter.qualificationcategoryid"
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
                    v-model="filter.schoolsubjectid"
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
                  style="margin-top:27px"
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
        <div class="table-container" style="padding:5px">
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th
                  rowspan="3"
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: center;vertical-align: middle"
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
                  style="text-align: center;vertical-align: middle"
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
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  rowspan="3"
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  rowspan="3"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("totalschools") }}
                </th>
                <th
                  colspan="4"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("Шундан ўқувчилар сони бўйича мактаблар сони") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("I гуруҳ") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("II гуруҳ") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("III гуруҳ") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("IV гуруҳ") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("ўқувчилар сони 1601 нафардан кўп бўлган мактаблар") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{
                    $t(
                      "ўқувчилар сони 881 нафардан 1600 нафаргача бўлган мактаблар"
                    )
                  }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{
                    $t(
                      "ўқувчилар сони 401 нафардан 880 нафаргача бўлган мактаблар "
                    )
                  }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("ўқувчилар сони 400 нафаргача бўлган мактаблар") }}
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
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool
                  "
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="regionchange(item)">{{
                    item.regionname
                  }}</a>
                </td>
                <!-- <td
                  v-if="
                    filter.oblastid > 0 &&
                    (filter.regionid === 0 || filter.regionid === null) &&
                    filter.byschool
                  "
                  style="text-align: center; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.schooltype }}</a>
                </td> -->
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td>
                  {{
                    $options.filters.currency(item.totalorgcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td>
                  {{
                    $options.filters.currency(item.firstgroup, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td>
                  {{
                    $options.filters.currency(item.secondgroup, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td>
                  {{
                    $options.filters.currency(item.thirdgroup, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td>
                  {{
                    $options.filters.currency(item.fourthgroup, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="Loading">
              <tr>
                <td class="text-center" colspan="19">
                  <b-spinner></b-spinner>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr
                style="text-align: center;vertical-align: middle;font-weight: bold"
              >
                <td colspan="1">{{ $t("Total") }}</td>
                <td>
                  {{
                    bottomrow.totalorgcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalorgcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.firstgroup == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.firstgroup, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.secondgroup == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.secondgroup, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.thirdgroup == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.thirdgroup, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.fourthgroup == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.fourthgroup, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
              </tr>
            </tfoot>
          </table>

          <br />
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
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
      OblastList: [],
      RegionList: [],
      items: [],
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        totalorgcount: 0,
        firstgroup: 0,
        secondgroup: 0,
        thirdgroup: 0,
        fourthgroup: 0,
      },
      filter: {
        schoolyearid: 3,
        qualificationcategoryid: 0,
        oblastid: 0,
        regionid: 0,
        schoollegalformid: 1,
        schoolsubjectid: 0,
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
    // QualificationCategoryService.GetAll().then(res => {
    //   this.qualificationcategorylist = res.data;
    // });
    // SchoolSubjectService.GetAll().then(res => {
    //   this.schoolsubjectlist = res.data;
    // });
    // SchoolGradeGroupService.GetAll().then(res => {
    //   this.schoolgradegrouplist = res.data;
    // });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
     SchoolYearService.GetDefault().then((res) => {
        this.filter.schoolyearid = res.data.id;
        this.Refresh();
      });

    this.createDate();
    // this.Refresh();
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
        this.filter.qualificationcategoryid = 0;
        this.filter.schoolsubjectid = 0;
        this.filter.schoolgradegroupid = 0;
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
      this.filter.educationlanguageid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      //this.filter.qualificationcategoryid = item.qualificationcategoryid;
      //this.filter.schoolsubjectid = item.schoolsubjectid;
      // this.filter.schoolgradegroupid = item.schoolgradegroupid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      // this.filter.qualificationcategoryid = item.qualificationcategoryid;
      // this.filter.schoolsubjectid = item.schoolsubjectid;
      // this.filter.schoolgradegroupid = item.schoolgradegroupid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportLearningProcessService.PrintSchoolGroupCount(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoollegalformid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SchoolGroupCount.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    Refresh() {
      this.isBusy = true;
      ReportLearningProcessService.GetSchoolGroupCount(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoollegalformid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.ChangeOblast();
          this.filter.OblastName = " / " + res.data.oblastname;
        }
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0) {
          // this.changeRegion()
          this.filter.RegionName = " / " + res.data.regionname;
        }

        // if (res.data.oblastid != 0) {
        //     this.filter.oblastid = res.data.oblastid;
        //      RegionService.GetAll(this.lang, this.filter.oblastid).then(
        //       (res) => {
        //         this.RegionList = res.data;
        //       }
        //     );
        //   }
        //   if (res.data.regionid != 0) {
        //     this.filter.oblastid = res.data.oblastid;
        //     this.filter.regionid = res.data.regionid;
        //     // this.filter.regionname = res.data.regionname;
        //     RegionService.GetAll(this.lang, this.filter.oblastid).then(
        //       (res) => {
        //         this.RegionList = res.data;
        //       }
        //     );
        //   }

        // Tuman Oblast ozini rolida korinadigan qilingan
        this.totalRows = res.data.total;
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var totalorgcount = 0;
      var firstgroup = 0;
      var secondgroup = 0;
      var thirdgroup = 0;
      var fourthgroup = 0;
      item.forEach(function(item) {
        totalorgcount = totalorgcount + item.totalorgcount;
        firstgroup = firstgroup + item.firstgroup;
        secondgroup = secondgroup + item.secondgroup;
        thirdgroup = thirdgroup + item.thirdgroup;
        fourthgroup = fourthgroup + item.fourthgroup;
      });
      this.bottomrow = {
        totalorgcount: totalorgcount,
        firstgroup: firstgroup,
        secondgroup: secondgroup,
        thirdgroup: thirdgroup,
        fourthgroup: fourthgroup,
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
            doctabcount: 0,
            doctabsum: 0,
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
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.qualificationcategoryid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.Refresh();
      },
    },
    "filter.schoolsubjectid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.Refresh();
      },
    },

    "filter.schoolgradegroupid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>