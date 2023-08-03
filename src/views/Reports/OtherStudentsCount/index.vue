<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mx-1">
          <b-col>
            <h3 class="mt-3 text-center">{{ $t("StudentsCount") }}</h3>
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
            <b-col sm="12" md="5">
              <div class="d-flex">
                <div class="mr-2" style="width: 100%">
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
                <div class="mr-2" style="width: 100%">
                      <label for=""> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="filter.organizationtypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('organizationtype')"
                label="name"
              >
              </v-select>
                </div>
                <div class="mr-2" style="width: 140%">
                  <label for=""> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="filter.schooltypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('schooltype')"
                label="name"
              >
              </v-select>
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="7">
               <div class="d-flex">
                <div class="mr-2" style="width: 100%">
              <label for=""> {{ $t("schoollegalform") }} </label>
              <v-select
                :options="schoollegalformlist"
                v-model="filter.schoollegalformid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoollegalform')"
                label="name"
              >
              </v-select>
                </div>
                <div class="mr-2" style="width: 120%">
              <label for=""> {{ $t("SchoolManagementForm") }} </label>
                  <v-select
                    style="width: 100%"
                    class="mr-2"
                    :options="SchoolManagementFormList"
                    v-model="filter.schoolmanagementformid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolManagementForm')"
                    label="name"
                  >
                  </v-select>
                </div>
                <div  style="width: 78%">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="margin-top: 28px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t("Refresh") }}
                </CButton>
                <CButton
                  @click="Print"
                  color="primary"
                  class="ml-2"
                  style="margin-top: 28px"
                  size="sm"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
              </div>
               </div>
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
            <CCol> </CCol>
          </CRow>
        </CCardHeader>
        <div class="table-container" style="padding: 5px">
          <table class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th
                  v-if="filter.oblastid === 0 || filter.oblastid === null"
                  rowspan="2"
                  width="15%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("oblastname") }}
                </th>
                <th
                  v-if="
                    filter.oblastid > 0 &&
                    (filter.regionid === 0 || filter.regionid === null) &&
                    !filter.byschool
                  "
                  rowspan="2"
                  width="15%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("regionname") }}
                </th>
                <th
                  v-if="
                    filter.oblastid > 0 &&
                    (filter.regionid === 0 || filter.regionid === null) &&
                    filter.byschool
                  "
                  rowspan="2"
                  width="15%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  rowspan="2"
                  width="15%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("organizationname") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount0") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount1") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount2") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount3") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount4") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount5") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount6") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount7") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount8") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount9") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount10") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount11") }}
                </th>
                <th colspan="2" style="text-align: center">
                  {{ $t("TotalSudentsount12") }}
                </th>
              </tr>
              <tr>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("sudentscount") }}
                </th>
                <th
                  width="10%"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("girlscount") }}
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
                <td
                  v-if="
                    filter.oblastid > 0 &&
                    (filter.regionid === 0 || filter.regionid === null) &&
                    filter.byschool
                  "
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="GotoStudentList(item)">{{
                    item.organizationname
                  }}</a>
                </td>
                <td
                  v-if="filter.oblastid > 0 && filter.regionid > 0"
                  style="text-align: left; vertical-align: middle"
                >
                  <a href="javascript:void(0)" @click="GotoStudentList(item)">{{
                    item.organizationname
                  }}</a>
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount0, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount0, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount1, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount1, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount2, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount2, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount3, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount3, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount4, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount4, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount5, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount5, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount6, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount6, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount7, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount7, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount8, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount8, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount9, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount9, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount10, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount10, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount11, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount11, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.sudentscount12, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    $options.filters.currency(item.girlscount12, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
              </tr>
              <tr
                style="
                  text-align: center;
                  vertical-align: middle;
                  font-weight: bold;
                "
              >
                <td>{{ $t("Total") }}</td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalsudentscount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                 <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount0 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount0,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount0 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount0, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount1 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount1,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount1 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount1, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount2 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount2,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount2 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount2, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount3 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount3,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount3 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount3, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount4 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount4,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount4 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount4, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount5 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount5,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount5 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount5, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount6 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount6,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount6 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount6, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount7 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount7,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount7 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount7, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount8 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount8,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount8 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount8, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount9 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount9,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount9 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount9, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount10 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount10,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount10 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount10, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount11 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount11,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount11 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount11, {
                          symbol: "",
                          fractionCount: 0,
                        })
                  }}
                </td>
                 <td style="white-space: nowrap">
                  {{
                    bottomrow.totalsudentscount12 == 0
                      ? "-"
                      : $options.filters.currency(
                          bottomrow.totalsudentscount12,
                          { symbol: "", fractionCount: 0 }
                        )
                  }}
                </td>
                <td style="white-space: nowrap">
                  {{
                    bottomrow.totalgirlscount12 == 0
                      ? "-"
                      : $options.filters.currency(bottomrow.totalgirlscount12, {
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
          </table>

          <br />
        </div>
        <b-row>
          <b-col class="text-right mr-3 mb-2">
            <span> {{ $t("lasttime", { lasttime: lasttime }) }} </span>
          </b-col>
        </b-row>
        <!-- <b-row v-if="$can('MinSportView','permissions')">
          <b-col class="text-right mr-3 mb-2">
            <CButton
                  @click="RefreshStatistics"
                  size="sm"
                  color="primary"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('RefreshStatistics') }}
                </CButton>
          </b-col>
        </b-row> -->
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import ReportStudentsCountService from "@/services/ReportStudentsCount.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import SchoolManagementFormService from "@/services/SchoolManagementForm.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      educationlanguagelist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading: false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        totalsudentscount: 0,
        totalgirlscount: 0,
        totalsudentscount0: 0,
        totalgirlscount0: 0,
        totalsudentscount1: 0,
        totalgirlscount1: 0,
        totalsudentscount2: 0,
        totalgirlscount2: 0,
        totalsudentscount3: 0,
        totalgirlscount3: 0,
        totalsudentscount4: 0,
        totalgirlscount4: 0,
        totalsudentscount5: 0,
        totalgirlscount5: 0,
        totalsudentscount6: 0,
        totalgirlscount6: 0,
        totalsudentscount7: 0,
        totalgirlscount7: 0,
        totalsudentscount8: 0,
        totalgirlscount8: 0,
        totalsudentscount9: 0,
        totalgirlscount9: 0,
        totalsudentscount10: 0,
        totalgirlscount10: 0,
        totalsudentscount11: 0,
        totalgirlscount11: 0,
        totalsudentscount12: 0,
        totalgirlscount12: 0,
      },
      filter: {
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        OblastName: "",
        RegionName: "",
        organizationtypeid: 4,
        schooltypeid: 0,
        schoollegalformid: 1,
        educationlanguageid: 0,
        schoolmanagementformid: 1,
        genderid: 0,
      },
      lasttimereshreshloading: false,
      lasttime: "-",
      lang: localStorage.getItem("locale") || "ru",
      organizationtypelist: [],
      schooltypelist: [],
      schoollegalformlist: [],
      SchoolManagementFormList: [],
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.oblastlist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
    SchoolManagementFormService.GetAll().then((res) => {
      this.SchoolManagementFormList = res.data;
    });
    this.LastTimeRefresh();
    this.createDate();
    this.Refresh();
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastid && !this.filter.regionid) {
        this.filter.oblastid = 0;
        this.filter.OblastName = "";
      }
      if (!!this.filter.oblastid && !!this.filter.regionid) {
        this.filter.regionid = 0;
        this.filter.RegionName = "";
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
    GotoStudentList(item) {
      // console.log(item)
      this.$router.push({
        name: "StudentList",
        query: {
          oblastid: this.filter.oblastid,
          regionid: this.filter.regionid,
          orgid: item.organizationid,
          schoolyearid: this.filter.schoolyearid,
        },
      });
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
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.OblastName = " / " + item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.RegionName = " / " + item.regionname;
    },
    Print() {
      ReportStudentsCountService.PrintStudentsCount(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.schoollegalformid,
        this.filter.educationlanguageid,
        this.filter.genderid
      )
        .then((response) => {
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

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    RefreshStatistics() {
      this.Loading = true;
      ReportStudentsCountService.RefreshStudentsCount()
        .then((response) => {
          this.lasttime = response.data;
          this.Refresh();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);
          this.Loading = false;
          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Refresh() {
      this.Loading = true;
      ReportStudentsCountService.GetStudentsCount(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid,
        this.filter.schoollegalformid,
        this.filter.educationlanguageid,
        this.filter.genderid,
        this.filter.schoolmanagementformid
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
          this.items.sort(function (a, b) {
            return a.fillcoef - b.fillcoef;
          });
        }
        this.bottomrow = {
          totalsudentscount: 0,
          totalgirlscount: 0,
          totalsudentscount0: 0,
          totalgirlscount0: 0,
          totalsudentscount1: 0,
          totalgirlscount1: 0,
          totalsudentscount2: 0,
          totalgirlscount2: 0,
          totalsudentscount3: 0,
          totalgirlscount3: 0,
          totalsudentscount4: 0,
          totalgirlscount4: 0,
          totalsudentscount5: 0,
          totalgirlscount5: 0,
          totalsudentscount6: 0,
          totalgirlscount6: 0,
          totalsudentscount7: 0,
          totalgirlscount7: 0,
          totalsudentscount8: 0,
          totalgirlscount8: 0,
          totalsudentscount9: 0,
          totalgirlscount9: 0,
          totalsudentscount10: 0,
          totalgirlscount10: 0,
          totalsudentscount11: 0,
          totalgirlscount11: 0,
          totalsudentscount12: 0,
          totalgirlscount12: 0,
        };
        this.calculateTotal(this.items);
      });
    },
    calculateTotal(item) {
      var totalsudentscount = 0;
      var totalgirlscount = 0;
      var totalsudentscount0 = 0;
      var totalgirlscount0 = 0;
      var totalsudentscount1 = 0;
      var totalgirlscount1 = 0;
      var totalsudentscount2 = 0;
      var totalgirlscount2 = 0;
      var totalsudentscount3 = 0;
      var totalgirlscount3 = 0;
      var totalsudentscount4 = 0;
      var totalgirlscount4 = 0;
      var totalsudentscount5 = 0;
      var totalgirlscount5 = 0;
      var totalsudentscount6 = 0;
      var totalgirlscount6 = 0;
      var totalsudentscount7 = 0;
      var totalgirlscount7 = 0;
      var totalsudentscount8 = 0;
      var totalgirlscount8 = 0;
      var totalsudentscount9 = 0;
      var totalgirlscount9 = 0;
      var totalsudentscount10 = 0;
      var totalgirlscount10 = 0;
      var totalsudentscount11 = 0;
      var totalgirlscount11 = 0;
      var totalsudentscount12 = 0;
      var totalgirlscount12 = 0;

      item.forEach(function (item) {
        totalsudentscount = totalsudentscount + item.sudentscount;
        totalgirlscount = totalgirlscount + item.girlscount;
        totalsudentscount0 = totalsudentscount0 + item.sudentscount0;
        totalgirlscount0 = totalgirlscount0 + item.girlscount0;
        totalsudentscount1 = totalsudentscount1 + item.sudentscount1;
        totalgirlscount1 = totalgirlscount1 + item.girlscount1;
        totalsudentscount2 = totalsudentscount2 + item.sudentscount2;
        totalgirlscount2 = totalgirlscount2 + item.girlscount2;
        totalsudentscount3 = totalsudentscount3 + item.sudentscount3;
        totalgirlscount3 = totalgirlscount3 + item.girlscount3;
        totalsudentscount4 = totalsudentscount4 + item.sudentscount4;
        totalgirlscount4 = totalgirlscount4 + item.girlscount4;
        totalsudentscount5 = totalsudentscount5 + item.sudentscount5;
        totalgirlscount5 = totalgirlscount5 + item.girlscount5;
        totalsudentscount6 = totalsudentscount6 + item.sudentscount6;
        totalgirlscount6 = totalgirlscount6 + item.girlscount6;
        totalsudentscount7 = totalsudentscount7 + item.sudentscount7;
        totalgirlscount7 = totalgirlscount7 + item.girlscount7;
        totalsudentscount8 = totalsudentscount8 + item.sudentscount8;
        totalgirlscount8 = totalgirlscount8 + item.girlscount8;
        totalsudentscount9 = totalsudentscount9 + item.sudentscount9;
        totalgirlscount9 = totalgirlscount9 + item.girlscount9;
        totalsudentscount10 = totalsudentscount10 + item.sudentscount10;
        totalgirlscount10 = totalgirlscount10 + item.girlscount10;
        totalsudentscount11 = totalsudentscount11 + item.sudentscount11;
        totalgirlscount11 = totalgirlscount11 + item.girlscount11;
        totalsudentscount12 = totalsudentscount12 + item.sudentscount12;
        totalgirlscount12 = totalgirlscount12 + item.girlscount12;
      });
      this.bottomrow = {
        totalsudentscount: totalsudentscount,
        totalgirlscount: totalgirlscount,
        totalsudentscount0: totalsudentscount0,
        totalgirlscount0: totalgirlscount0,
        totalsudentscount1: totalsudentscount1,
        totalgirlscount1: totalgirlscount1,
        totalsudentscount2: totalsudentscount2,
        totalgirlscount2: totalgirlscount2,
        totalsudentscount3: totalsudentscount3,
        totalgirlscount3: totalgirlscount3,
        totalsudentscount4: totalsudentscount4,
        totalgirlscount4: totalgirlscount4,
        totalsudentscount5: totalsudentscount5,
        totalgirlscount5: totalgirlscount5,
        totalsudentscount6: totalsudentscount6,
        totalgirlscount6: totalgirlscount6,
        totalsudentscount7: totalsudentscount7,
        totalgirlscount7: totalgirlscount7,
        totalsudentscount8: totalsudentscount8,
        totalgirlscount8: totalgirlscount8,
        totalsudentscount9: totalsudentscount9,
        totalgirlscount9: totalgirlscount9,
        totalsudentscount10: totalsudentscount10,
        totalgirlscount10: totalgirlscount10,
        totalsudentscount11: totalsudentscount11,
        totalgirlscount11: totalgirlscount11,
        totalsudentscount12: totalsudentscount12,
        totalgirlscount12: totalgirlscount12,
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
            totalsudentscount: 0,
            totalgirlscount: 0,
            totalsudentscount0: 0,
            totalgirlscount0: 0,
            totalsudentscount1: 0,
            totalgirlscount1: 0,
            totalsudentscount2: 0,
            totalgirlscount2: 0,
            totalsudentscount3: 0,
            totalgirlscount3: 0,
            totalsudentscount4: 0,
            totalgirlscount4: 0,
            totalsudentscount5: 0,
            totalgirlscount5: 0,
            totalsudentscount6: 0,
            totalgirlscount6: 0,
            totalsudentscount7: 0,
            totalgirlscount7: 0,
            totalsudentscount8: 0,
            totalgirlscount8: 0,
            totalsudentscount9: 0,
            totalgirlscount9: 0,
            totalsudentscount10: 0,
            totalgirlscount10: 0,
            totalsudentscount11: 0,
            totalgirlscount11: 0,
            totalsudentscount12: 0,
            totalgirlscount12: 0,
          };
          this.filter.regionid = 0;

          var self = this;
          this.getregionlist(newValue, function (data) {
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
            totalsudentscount: 0,
            totalgirlscount: 0,
            totalsudentscount0: 0,
            totalgirlscount0: 0,
            totalsudentscount1: 0,
            totalgirlscount1: 0,
            totalsudentscount2: 0,
            totalgirlscount2: 0,
            totalsudentscount3: 0,
            totalgirlscount3: 0,
            totalsudentscount4: 0,
            totalgirlscount4: 0,
            totalsudentscount5: 0,
            totalgirlscount5: 0,
            totalsudentscount6: 0,
            totalgirlscount6: 0,
            totalsudentscount7: 0,
            totalgirlscount7: 0,
            totalsudentscount8: 0,
            totalgirlscount8: 0,
            totalsudentscount9: 0,
            totalgirlscount9: 0,
            totalsudentscount10: 0,
            totalgirlscount10: 0,
            totalsudentscount11: 0,
            totalgirlscount11: 0,
            totalsudentscount12: 0,
            totalgirlscount12: 0,
          };
        }
        this.Refresh();
      },
    },
  },
};
</script>
