<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-left">Чет тилларини ўқитилиши</h4>
            <!-- {{ $t("studentcapacity") }} -->
          </b-col>
          <b-col class="text-right">
            <CButton class="mr-2" color="primary" size="sm">
              <b-icon icon="printer"></b-icon>
              {{ $t("Print") }}
            </CButton>
            <CButton color="danger" @click="backbyregion" size="sm">
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
            <b-col sm="12" md="3">
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
            <!-- <thead>
              <tr>
                <th
                  rowspan="2"
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("oblastname") }}
                </th>
                <th
                  rowspan="2"
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
                  rowspan="2"
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  rowspan="2"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("totalschools") }}
                </th>
                <th
                  colspan="5"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("Included") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("oblastschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("regionschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("villageschools") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("distantschools") }}
                </th>
              </tr>
            </thead> -->
            <thead>
              <tr>
                <th rowspan="2" class="text-center">Вилоят</th>
                <th colspan="3" class="text-center">инглиз тили</th>
                <th colspan="3" class="text-center">немис тили</th>
                <th colspan="3" class="text-center">француз тили</th>
                <th colspan="3" class="text-center">бошқа тиллар</th>
              </tr>
              <tr>
                <th class="text-center">мактаблар сони</th>
                <th class="text-center">синфлар сони</th>
                <th class="text-center">ўқувчилар сони</th>
                <th class="text-center">мактаблар сони</th>
                <th class="text-center">синфлар сони</th>
                <th class="text-center">ўқувчилар сони</th>
                <th class="text-center">мактаблар сони</th>
                <th class="text-center">синфлар сони</th>
                <th class="text-center">ўқувчилар сони</th>
                <th class="text-center">мактаблар сони</th>
                <th class="text-center">синфлар сони</th>
                <th class="text-center">ўқувчилар сони</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Қорақалпоғистон Республикаси</td>
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
              <tr>
                <td>Андижон вилояти</td>
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
              <tr>
                <td>Бухоро вилояти</td>
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
              <tr>
                <td>Жиззах вилояти</td>
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
              <tr>
                <td>Қашқадарё вилояти</td>
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
              <tr>
                <td>Навоий вилояти</td>
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
              <tr>
                <td>Наманган вилояти</td>
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
              <tr>
                <td>Самарқанд вилояти</td>
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
              <tr>
                <td>Сурхандарё вилояти</td>
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
              <tr>
                <td>Сирдарё вилояти</td>
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
              <tr>
                <td>Тошкент вилояти</td>
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
              <tr>
                <td>Фарғона вилояти</td>
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
              <tr>
                <td>Хоразм вилояти</td>
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
              <tr>
                <td>Тошкент шаҳри</td>
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
            </tbody>

            <!-- <tbody v-if="!Loading">
              <tr
                v-for="(item, i) in items"
                style="text-align: center;vertical-align: middle"
                :key="i"
              >
                <td
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  style="text-align: left;vertical-align: middle"
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
                  style="text-align: left;vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="regionchange(item)">{{
                    item.regionname
                  }}</a>
                </td>
                <td
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                  "
                  style="text-align: left;vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left;vertical-align: middle"
                >
                  <a href="javascript:void(0)">{{ item.organizationname }}</a>
                </td>
                <td style="text-align: left;vertical-align: middle">
                  {{ item.qualificationcategoryname }}
                </td>
                <td style="text-align: left;vertical-align: middle">
                  {{ item.schoolsubjectname }}
                </td>
                <td style="text-align: left;vertical-align: middle">
                  {{ item.schoolgradegroupname }}
                </td>

                <td>
                  {{
                    item.doctabcount == 0
                      ? "-"
                      : $options.filters.currency(item.doctabcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    item.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(item.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
              </tr>
              <tr
                style="text-align: center;vertical-align: middle;font-weight: bold"
              >
                <td colspan="4">{{ $t("Total") }}</td>
                <td>
                  {{
                    bottomrow.doctabcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
              </tr>
            </tbody> -->
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
                    bottomrow.doctabcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabcount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabcount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.doctabsum == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.doctabsum, {
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
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolGradeGroupService from "@/services/SchoolGradeGroup.service";
import ReportTarifficationDataService from "@/services/ReportTarifficationData.service";
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
      totalRows: "",
      isBusy: true,
      bottomrow: {
        doctabcount: 0,
        doctabsum: 0,
      },
      filter: {
        schoolyearid: 1,
        qualificationcategoryid: 0,
        oblastid: 0,
        regionid: 0,
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
     SchoolYearService.GetDefault().then((res) => {
        this.filter.schoolyearid = res.data.id;
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
     // this.filter.qualificationcategoryid = item.qualificationcategoryid;
     // this.filter.schoolsubjectid = item.schoolsubjectid;
     // this.filter.schoolgradegroupid = item.schoolgradegroupid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
    //  this.filter.qualificationcategoryid = item.qualificationcategoryid;
    //  this.filter.schoolsubjectid = item.schoolsubjectid;
    //  this.filter.schoolgradegroupid = item.schoolgradegroupid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportTarifficationDataService.Print(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.qualificationcategoryid,
        this.filter.schoolsubjectid,
        this.filter.schoolgradegroupid
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "ReportTarifficationData.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      // this.Loading = true
      //   ReportTarifficationDataService.GetTarifficationData(
      //     this.filter.schoolyearid,
      //     this.filter.oblastid,
      //     this.filter.regionid,
      //     this.filter.qualificationcategoryid,
      //     this.filter.schoolsubjectid,
      //     this.filter.schoolgradegroupid
      //   ).then(res => {
      //     this.Loading = false
      //     this.items = res.data;
      //     this.bottomrow= {
      //         doctabcount: 0,
      //         doctabsum: 0
      //       }
      //       this.calculateTotal(this.items)
      //   });
    },
    // calculateTotal(item){
    //   var  doctabcount= 0;
    //   var doctabsum= 0;
    //   item.forEach(function (item) {
    //         doctabcount = doctabcount + item.doctabcount;
    //         doctabsum = doctabsum+ item.doctabsum;

    //   });
    //   this.bottomrow= {
    //     doctabcount : doctabcount,
    //     doctabsum: doctabsum,
    //   }
    // },
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
