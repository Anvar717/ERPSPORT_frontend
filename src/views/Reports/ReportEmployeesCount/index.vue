<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mx-1">
          <b-col class="d-flex align-items-center">
            <h3 class="mb-0">{{ $t("EmployeesCount") }}</h3>
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
            <b-col sm="12" md="6" lg="3" class="mt-2">
              <div>
                <label>{{ $t("ondate") }}</label>
                <date-picker
                  v-model="filter.ondate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('OnDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </div>
            </b-col>
            <b-col sm="12" md="6" lg="3" class="mt-2">
                <label >{{$t('schoolsubject')}}</label>
                <v-select
                    :options="SchoolSubjectList"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.schoolSubjectId"
                ></v-select>
            </b-col>
            <b-col sm="12" md="6" lg="3" class="mt-2">
                <label >{{$t('organizationtype')}}</label>
                <v-select
                    :options="OrganizationTypeList"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.organizationTypeId"
                ></v-select>
            </b-col>
            <b-col sm="12" md="6" lg="3" class="mt-2">
                <label >{{$t('schooltype')}}</label>
                <v-select
                    :options="SchoolTypeList"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.schoolTypeId"
                ></v-select>
            </b-col>
            <b-col sm="12" md="6" lg="3" class="mt-2">
                <label >{{$t('schoollegalform')}}</label>
                <v-select
                    :options="SchoolLegalFormList"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.schoolLegalFormId"
                ></v-select>
            </b-col>
            <b-col sm="12" md="6" lg="3" class="mt-2">
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="margin-top:28px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t("Refresh") }}
                </CButton>
                
              </div>
            </b-col>
            <b-col>
              
            </b-col>
          </b-row>
          <CRow class="form-group mt-3">
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
          <table class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  rowspan="3"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("oblastname") }}
                </th>
                <th
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      !filter.byschool
                  "
                  rowspan="3"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("regionname") }}
                </th>
                <th
                  v-if="
                    filter.oblastid > 0 &&
                      (filter.regionid === 0 || filter.regionid === null) &&
                      filter.byschool
                  "
                  rowspan="3"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  rowspan="3"
                  width="15%"
                  style="text-align: center;vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalEmployeesCount") }}
                </th>
                <th colspan="5" style="text-align: center">
                  {{ $t("EducationType") }}
                </th>
                <th colspan="5" style="text-align: center">
                  {{ $t("Categories") }}
                </th>
                <th rowspan="3" style="text-align: center">
                  {{ $t("LanguageCertificate") }}
                </th>
                <th colspan="3" style="text-align: center">
                  {{ $t("TeacherEvaluation") }}
                </th>
                <th rowspan="3" style="text-align: center">
                  {{ $t("InRemoteAreas") }}
                </th>
                <th colspan="4" style="text-align: center">
                  {{ $t("Olympics") }}
                </th>
              </tr>
              <tr>
                <th rowspan="2" style="text-align: center">
                  {{ $t("employeescount") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("employeesgirlscount") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("personhighereducount3") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("personhighereducount1") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("personhighereducount4") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("personhighereducount5") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("personhighereducount6") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("highcategory") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("category1") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("category2") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("higherducation") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("mediumspecial") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("reade") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("Yellow") }}
                </th>
                <th rowspan="2" style="text-align: center">
                  {{ $t("Green") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Teacher") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("Student") }}
                </th>
              </tr>
              <tr>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("International") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("Local") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("International") }}
                </th>
                <th style="text-align: center;vertical-align: middle">
                  {{ $t("Local") }}
                </th>
              </tr>
            </thead>

            <tbody v-if="!Loading">
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
                  <a
                    href="javascript:void(0)"
                    @click="GoToEmployeeList(item)"
                    >{{ item.organizationname }}</a
                  >
                </td>
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left;vertical-align: middle"
                >
                  <a
                    href="javascript:void(0)"
                    @click="GoToEmployeeList(item)"
                    >{{ item.organizationname }}</a
                  >
                </td>
                <td  style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.employeescount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.employeesgirlscount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.personhighereducount1, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.personhighereducount3, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.personhighereducount4, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.personhighereducount5, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.personhighereducount6, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.appointqualcategory5, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.appointqualcategory4, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.appointqualcategory3, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.appointqualcategory2, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.appointqualcategory1, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.certforeignlang, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.teacherassessment1, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.teacherassessment2, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.teacherassessment3, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.allowancefarregion, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(
                      item.olympiadwinnerteacherglobal,
                      {
                        symbol: "",
                        fractionCount: 0,
                      }
                    )
                  }}
                </td>
                <td  style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.olympiadwinnerteacherlocal, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(
                      item.olympiadwinnerstudentglobal,
                      {
                        symbol: "",
                        fractionCount: 0,
                      }
                    )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.olympiadwinnerstudentlocal, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
              </tr>
              <tr
                style="text-align: center;vertical-align: middle;font-weight: bold"
              >
                <td>{{ $t("Total") }}</td>
                <td>
                  {{
                    bottomrow.employeescount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.employeescount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.employeesgirlscount == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.employeesgirlscount,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.personhighereducount1 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.personhighereducount1,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.personhighereducount3 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.personhighereducount3,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.personhighereducount4 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.personhighereducount4,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.personhighereducount5 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.personhighereducount5,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.personhighereducount6 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.personhighereducount6,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.appointqualcategory5 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.appointqualcategory5,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.appointqualcategory4 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.appointqualcategory4,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.appointqualcategory3 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.appointqualcategory3,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.appointqualcategory2 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.appointqualcategory2,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.appointqualcategory1 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.appointqualcategory1,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.certforeignlang == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.certforeignlang, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td>
                  {{
                    bottomrow.teacherassessment1 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.teacherassessment1,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.teacherassessment2 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.teacherassessment2,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.teacherassessment3 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.teacherassessment3,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.allowancefarregion == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.allowancefarregion,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.olympiadwinnerteacherglobal == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.olympiadwinnerteacherglobal,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.olympiadwinnerteacherlocal == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.olympiadwinnerteacherlocal,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.olympiadwinnerstudentglobal == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.olympiadwinnerstudentglobal,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
                  }}
                </td>
                <td>
                  {{
                    bottomrow.olympiadwinnerstudentlocal == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.olympiadwinnerstudentlocal,
                          {
                            symbol: "",
                            fractionCount: 0,
                          }
                        )
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
          </table>

          <br />
        </div>
        <b-row>
          <b-col class="text-right mr-3 mb-2">
            <span> {{ $t("lasttime", { lasttime: lasttime }) }} </span>
          </b-col>
        </b-row>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import ReportEmployeesCountService from "@/services/ReportEmployeesCount.service";
import ReportStudentsCountService from "@/services/ReportStudentsCount.service";
import ReportLearningProcessService from '@/services/ReportLearningProcess.service'
import OrganizationTypeService from '@/services/OrganizationType.service'
import SchoolTypeService from '@/services/SchoolType.service'
import SchoolLegalFormService from '@/services/SchoolLegalForm.service'
export default {
  data() {
    return {
      educationlanguagelist: [],
      oblastlist: [],
      SchoolSubjectList : [],
      regionlist: [],
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        employeescount: 0,
        employeesgirlscount: 0,
        personhighereducount1: 0,
        personhighereducount3: 0,
        personhighereducount4: 0,
        personhighereducount5: 0,
        personhighereducount6: 0,
        appointqualcategory1: 0,
        appointqualcategory2: 0,
        appointqualcategory3: 0,
        appointqualcategory4: 0,
        appointqualcategory5: 0,
        certforeignlang: 0,
        teacherassessment1: 0,
        teacherassessment2: 0,
        teacherassessment3: 0,
        allowancefarregion: 0,
        olympiadwinnerteacherglobal: 0,
        olympiadwinnerteacherlocal: 0,
        olympiadwinnerstudentglobal: 0,
        olympiadwinnerstudentlocal: 0,
      },
      filter: {
        ondate: "",
        oblastid: 0,
        regionid: 0,
        schoolSubjectId : 0,
        OblastName: "",
        RegionName: "",
        organizationTypeId : 0,
        schoolTypeId : 0,
        schoolLegalFormId : 0
      },
      lasttimereshreshloading: false,
      lasttime: "-",
      lang : localStorage.getItem('locale') || 'ru',
      PrintLoading : false,
      OrganizationTypeList : [],
      SchoolTypeList : [],
      SchoolLegalFormList : []
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.oblastlist = res.data;
    });
    SchoolSubjectService.GetAll().then(res => {
        this.SchoolSubjectList = res.data;
    });
    OrganizationTypeService.GetAll().then(res => {
      this.OrganizationTypeList = res.data
    })
    SchoolTypeService.GetAll().then(res => {
      this.SchoolTypeList = res.data
    })
    SchoolLegalFormService.GetAll().then(res => {
      this.SchoolLegalFormList = res.data
    })
    this.LastTimeRefresh();
    this.createDate();
    this.Refresh();
  },

  methods: {
    backbyregion(){
      if(!!this.filter.oblastid && !this.filter.regionid){
        this.filter.oblastid = 0
        this.filter.OblastName = ""
      }
      if(!!this.filter.oblastid && !!this.filter.regionid){
        this.filter.regionid = 0
        this.filter.RegionName = ""
      }
    },
    LastTimeRefresh() {
      this.lasttimereshreshloading = true;
      ReportStudentsCountService.GetStudentsCountLastRefreshTime()
        .then((res) => {
          this.lasttime = res.data;
          this.lasttimereshreshloading = false;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.lasttimereshreshloading = false;
        });
    },
    GoToEmployeeList(item) {
      // console.log(item)
      this.$router.push({
        name: "EmployeeList",
        query: {
          orgid: item.organizationid,
        },
      });
    },
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.lang,this.filter.oblastid).then((res) => {
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
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      this.PrintLoading = true
      ReportLearningProcessService.PrintEmployeesCount(
        this.filter.ondate,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolSubjectId,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.schoolLegalFormId
      )
        .then((response) => {
          this.PrintLoading = false
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "ReportStudentsCountList.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          this.PrintLoading = false
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportEmployeesCountService.GetEmployeesCount(
        this.filter.ondate,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolSubjectId,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.schoolLegalFormId
      ).then((res) => {
        this.Loading = false;
        this.items = res.data.data;

        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0)
          this.filter.OblastName = " / " + res.data.oblastname;
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0)
          this.filter.RegionName = " / " + res.data.regionname;
        if (this.filter.bycolor == true) {
          this.items.sort(function(a, b) {
            return a.fillcoef - b.fillcoef;
          });
        }
        this.bottomrow = {
          employeescount: 0,
          employeesgirlscount: 0,
          personhighereducount1: 0,
          personhighereducount3: 0,
          personhighereducount4: 0,
          personhighereducount5: 0,
          personhighereducount6: 0,
          appointqualcategory1: 0,
          appointqualcategory2: 0,
          appointqualcategory3: 0,
          appointqualcategory4: 0,
          appointqualcategory5: 0,
          certforeignlang: 0,
          teacherassessment1: 0,
          teacherassessment2: 0,
          teacherassessment3: 0,
          allowancefarregion: 0,
          olympiadwinnerteacherglobal: 0,
          olympiadwinnerteacherlocal: 0,
          olympiadwinnerstudentglobal: 0,
          olympiadwinnerstudentlocal: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var employeescount = 0;
      var employeesgirlscount = 0;
      var personhighereducount1 = 0;
      var personhighereducount3 = 0;
      var personhighereducount4 = 0;
      var personhighereducount5 = 0;
      var personhighereducount6 = 0;
      var appointqualcategory1 = 0;
      var appointqualcategory2 = 0;
      var appointqualcategory3 = 0;
      var appointqualcategory4 = 0;
      var appointqualcategory5 = 0;
      var certforeignlang = 0;
      var teacherassessment1 = 0;
      var teacherassessment2 = 0;
      var teacherassessment3 = 0;
      var allowancefarregion = 0;
      var olympiadwinnerteacherglobal = 0;
      var olympiadwinnerteacherlocal = 0;
      var olympiadwinnerstudentglobal = 0;
      var olympiadwinnerstudentlocal = 0;

      item.forEach(function(item) {
        employeescount = employeescount + item.employeescount;
        employeesgirlscount = employeesgirlscount + item.employeesgirlscount;
        personhighereducount1 =
          personhighereducount1 + item.personhighereducount1;
        personhighereducount3 =
          personhighereducount3 + item.personhighereducount3;
        personhighereducount4 =
          personhighereducount4 + item.personhighereducount4;
        personhighereducount5 =
          personhighereducount5 + item.personhighereducount5;
        personhighereducount6 =
          personhighereducount6 + item.personhighereducount6;
        appointqualcategory1 = appointqualcategory1 + item.appointqualcategory1;
        appointqualcategory2 = appointqualcategory2 + item.appointqualcategory2;
        appointqualcategory3 = appointqualcategory3 + item.appointqualcategory3;
        appointqualcategory4 = appointqualcategory4 + item.appointqualcategory4;
        appointqualcategory5 = appointqualcategory5 + item.appointqualcategory5;
        certforeignlang = certforeignlang + item.certforeignlang;
        teacherassessment1 = teacherassessment1 + item.teacherassessment1;
        teacherassessment2 = teacherassessment2 + item.teacherassessment2;
        teacherassessment3 = teacherassessment3 + item.teacherassessment3;
        allowancefarregion = allowancefarregion + item.allowancefarregion;
        olympiadwinnerteacherglobal =
          olympiadwinnerteacherglobal + item.olympiadwinnerteacherglobal;
        olympiadwinnerteacherlocal =
          olympiadwinnerteacherlocal + item.olympiadwinnerteacherlocal;
        olympiadwinnerstudentglobal =
          olympiadwinnerstudentglobal + item.olympiadwinnerstudentglobal;
      });
      this.bottomrow = {
        employeescount: employeescount,
        employeesgirlscount: employeesgirlscount,
        personhighereducount1: personhighereducount1,
        personhighereducount3: personhighereducount3,
        personhighereducount4: personhighereducount4,
        personhighereducount5: personhighereducount5,
        personhighereducount6: personhighereducount6,
        appointqualcategory1: appointqualcategory1,
        appointqualcategory2: appointqualcategory2,
        appointqualcategory3: appointqualcategory3,
        appointqualcategory4: appointqualcategory4,
        appointqualcategory5: appointqualcategory5,
        certforeignlang: certforeignlang,
        teacherassessment1: teacherassessment1,
        teacherassessment2: teacherassessment2,
        teacherassessment3: teacherassessment3,
        allowancefarregion: allowancefarregion,
        olympiadwinnerteacherglobal: olympiadwinnerteacherglobal,
        olympiadwinnerteacherlocal: olympiadwinnerteacherlocal,
        olympiadwinnerstudentglobal: olympiadwinnerstudentglobal,
        olympiadwinnerstudentlocal: olympiadwinnerstudentlocal,
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
            employeescount: 0,
            employeesgirlscount: 0,
            personhighereducount1: 0,
            personhighereducount3: 0,
            personhighereducount4: 0,
            personhighereducount5: 0,
            personhighereducount6: 0,
            appointqualcategory1: 0,
            appointqualcategory2: 0,
            appointqualcategory3: 0,
            appointqualcategory4: 0,
            appointqualcategory5: 0,
            certforeignlang: 0,
            teacherassessment1: 0,
            teacherassessment2: 0,
            teacherassessment3: 0,
            allowancefarregion: 0,
            olympiadwinnerteacherglobal: 0,
            olympiadwinnerteacherlocal: 0,
            olympiadwinnerstudentglobal: 0,
            olympiadwinnerstudentlocal: 0,
          };
          this.filter.regionid = 0;

          var self = this;
          this.getregionlist(newValue, function(data) {
            self.regionlist = data;
          });
        }
        this.Refresh();
      },
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            employeescount: 0,
            employeesgirlscount: 0,
            personhighereducount1: 0,
            personhighereducount3: 0,
            personhighereducount4: 0,
            personhighereducount5: 0,
            personhighereducount6: 0,
            appointqualcategory1: 0,
            appointqualcategory2: 0,
            appointqualcategory3: 0,
            appointqualcategory4: 0,
            appointqualcategory5: 0,
            certforeignlang: 0,
            teacherassessment1: 0,
            teacherassessment2: 0,
            teacherassessment3: 0,
            allowancefarregion: 0,
            olympiadwinnerteacherglobal: 0,
            olympiadwinnerteacherlocal: 0,
            olympiadwinnerstudentglobal: 0,
            olympiadwinnerstudentlocal: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
