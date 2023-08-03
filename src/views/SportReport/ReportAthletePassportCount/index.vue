<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"
            ><h4 class="text-center">
              {{ $t("ReportAthletePassportCount") }}
            </h4></b-col
          >
          <b-col md="2" class="text-right">
            <CButton @click="Print" color="primary" size="sm">
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              &nbsp; {{ $t("Export") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-card class="mb-n2">
              <custom-report-filter
              ref="getRegionList"
                :filter="filter"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-report-filter>
            </b-card>
        </CCardHeader>
        <b-tabs class="mt-2" pills card>
          <b-tab
            :title="$t('Hudud boyicha')"
            active
            @click="ChangeNotSportType"
          >
            <div class="table-container" style="padding: 5px">
              <div class="mobileStyle">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("OrderNumber") }}
                        <!-- {{ $t("totalschools") }} -->
                      </th>
                      <th
                        v-if="(filter.oblastid === 0 || filter.oblastid === null) || filter.oblastid === 999"
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("sportPlaceName") }}
                      </th>
                      <th
                        rowspan="2"
                        v-if="filter.oblastid > 0 && (filter.regionid === 0 || filter.regionid === null) || filter.regionid === 999"
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
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("Sportsmencount") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("NumbeTitleHolders") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("totalpassportcount") }}
                      </th>
                      <th
                        colspan="9"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("SportTitle1") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <!-- <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sporttype") }}
                    
                  </th> -->
                    </tr>
                    <tr>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("O'-II-R") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("O'-I-R") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("I-SP") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("II-SP") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("III-SP") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Sun1") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Su") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("XTSU") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in items"
                      style="text-align: center; vertical-align: middle"
                      :key="i"
                      v-show="items.length > 0 && !Loading"
                    >
                      <td>
                        {{ i + 1 }}
                      </td>
                      <td
                        v-if="(filter.oblastid === 0 || filter.oblastid === null) || filter.oblastid === 999"
                        style="text-align: left; vertical-align: middle"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="oblastchange(item)"
                          >{{ item.oblastname }}</a
                        >
                      </td>
                      <td
                        v-if="(filter.oblastid > 0 && (filter.regionid === 0 || filter.regionid === null)) || filter.regionid === 999"
                        style="text-align: left; vertical-align: middle"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="regionchange(item)"
                          >{{ item.regionname }}</a
                        >
                      </td>
                      <td
                        v-if="filter.oblastid > 0 && filter.regionid > 0"
                        style="text-align: left; vertical-align: middle"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="organizationChange(item)"
                          >{{ item.organizationname }}</a
                        >
                      </td>
                      <td>
                        {{
                          item.totalathletecount == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totalathletecount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount == 0
                            ? "0"
                            : $options.filters.currency(item.totaltitledcount, {
                                symbol: "",
                                fractionCount: 0,
                              })
                        }}
                      </td>
                      <td>
                        {{
                          item.totalpassportcount == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totalpassportcount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_002 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_002,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_005 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_005,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_004 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_004,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_003 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_003,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_006 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_006,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_007 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_007,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_008 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_008,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_009 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_009,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                    </tr>
                    <tr
                      v-if="!Loading"
                      style="
                        text-align: center;
                        vertical-align: middle;
                        font-weight: bold;
                      "
                    >
                      <td :colspan="(filter.oblastid === 999 || filter.regionid === 999)?3:2">{{ $t("Total") }}</td>
                      <td>
                        {{
                          bottomrow.totalathletecount == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totalathletecount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totalpassportcount == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totalpassportcount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_002 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_002,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_005 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_005,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_004 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_004,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_003 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_003,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_006 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_006,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_007 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_007,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_008 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_008,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_009 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_009,
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
                      <td colspan="15">
                        <div
                          class="text-center text-primary my-2"
                          style="vertical-align: middle"
                        >
                          <b-spinner class="align-middle mr-2"></b-spinner>
                          <strong>{{ $t("Loading") }}</strong>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-tab>
          <b-tab :title="$t('bySportTypes')" @click="ChangeSportType">
            <div class="table-container" style="padding: 5px">
              <div class="mobileStyle">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("OrderNumber") }}
                        <!-- {{ $t("totalschools") }} -->
                      </th>
                      <th
                        v-if="filter.oblastid === 0 || filter.oblastid === null"
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("sportPlaceName") }}
                      </th>
                      <th
                        rowspan="2"
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

                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("sporttypeclassifiername") }}
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("Sportsmencount") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("NumbeTitleHolders") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("totalpassportcount") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        colspan="9"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("SportTitle1") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <!-- <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sporttype") }}
                    
                  </th> -->
                    </tr>
                    <tr>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("O'-II-R") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("O'-I-R") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("I-SP") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("II-SP") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("III-SP") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Sun1") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Su") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("XTSU") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in items"
                      style="text-align: center; vertical-align: middle"
                      :key="i"
                      v-show="items.length > 0 && !Loading"
                    >
                      <td>
                        {{ i + 1 }}
                      </td>
                      <td
                        v-if="filter.oblastid === 0 || filter.oblastid === null"
                        style="text-align: left; vertical-align: middle"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="oblastchange1(item)"
                          >{{ item.oblastname }}</a
                        >
                      </td>
                      <td
                        v-if="
                          filter.oblastid > 0 &&
                          (filter.regionid === 0 || filter.regionid === null)
                        "
                        style="text-align: left; vertical-align: middle"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="regionchange1(item)"
                          >{{ item.regionname }}</a
                        >
                      </td>
                      <td
                        v-if="filter.oblastid > 0 && filter.regionid > 0"
                        style="text-align: left; vertical-align: middle"
                      >
                        <a
                          href="javascript:void(0)"
                          @click="organizationChange(item)"
                          >{{ item.organizationname }}</a
                        >
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.sporttypeclassifiername }}
                      </td>
                      <td>
                        {{
                          item.totalathletecount == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totalathletecount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount == 0
                            ? "0"
                            : $options.filters.currency(item.totaltitledcount, {
                                symbol: "",
                                fractionCount: 0,
                              })
                        }}
                      </td>
                      <td>
                        {{
                          item.totalpassportcount == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totalpassportcount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_002 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_002,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_005 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_005,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_004 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_004,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_003 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_003,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_006 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_006,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_007 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_007,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_008 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_008,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          item.totaltitledcount_009 == 0
                            ? "0"
                            : $options.filters.currency(
                                item.totaltitledcount_009,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                    </tr>
                    <tr
                      v-if="!Loading"
                      style="
                        text-align: center;
                        vertical-align: middle;
                        font-weight: bold;
                      "
                    >
                      <td colspan="3">{{ $t("Total") }}</td>
                      <td>
                        {{
                          bottomrow.totalathletecount == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totalathletecount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totalpassportcount == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totalpassportcount,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_002 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_002,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_005 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_005,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_004 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_004,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_003 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_003,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_006 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_006,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_007 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_007,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_008 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_008,
                                {
                                  symbol: "",
                                  fractionCount: 0,
                                }
                              )
                        }}
                      </td>
                      <td>
                        {{
                          bottomrow.totaltitledcount_009 == 0
                            ? "0"
                            : $options.filters.currency(
                                bottomrow.totaltitledcount_009,
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
                      <td colspan="16">
                        <div
                          class="text-center text-primary my-2"
                          style="vertical-align: middle"
                        >
                          <b-spinner class="align-middle mr-2"></b-spinner>
                          <strong>{{ $t("Loading") }}</strong>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </CCard>
    </CCol>
  </CRow>
</template>
      
<script>
import SportReportService from "@/services/SportReport.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import CustomReportFilter from "../../../components/customReportFilter.vue";
export default {
  components: {CustomReportFilter},
  data() {
    return {
      oblastlist: [],
      PrintLoading: false,
      regionlist: [],
      schoolyearlist: [],
      sporttypeclassifierlist: [],
      SportTypeTables: [],
      organizationtypelist: [],
      schooltypelist:[],
      items: [],
      totalRows: "",
      Loading: false,
      activeTab: 0,
      isShow: false,
      filter: {
        oblastid: 0,
        regionid: 0,
        OblastName: "",
        RegionName: "",
        schoolYearId: 0,
        organizationTypeId: 0,
        showAllRegion: false,
        showAllOrganization: false,
        schoolTypeId:0,
        genderid:0,
        sportTypeClassifierId: 0,
        isBySportTypeClassifier: false,
        date: "",
      },
      bottomrow: {
        totalathletecount: 0,
        totaltitledcount: 0,
        totalpassportcount: 0,
        totaltitledcount_001: 0,
        totaltitledcount_002: 0,
        totaltitledcount_003: 0,
        totaltitledcount_004: 0,
        totaltitledcount_005: 0,
        totaltitledcount_006: 0,
        totaltitledcount_008: 0,
        totaltitledcount_007: 0,
        totaltitledcount_009: 0,
        totaltitledcount_012: 0,
      },
    };
  },
  created() {
    (this.filter.oblastid =
      parseInt(this.$route.query.oblastid) || this.filter.oblastid),
      (this.filter.regionid =
        parseInt(this.$route.query.regionid) || this.filter.regionid),
      (this.filter.schoolyearid =
        parseInt(this.$route.query.schoolyearid) || this.filter.schoolyearid),
      (this.filter.sportTypeClassifierId =
        parseInt(this.$route.query.sportTypeClassifierId) ||
        this.filter.sportTypeClassifierId),
      (this.filter.isBySportTypeClassifier =
        parseInt(this.$route.query.isBySportTypeClassifier) ||
        this.filter.isBySportTypeClassifier);
    if (this.filter.isBySportTypeClassifier) {
      this.activeTab = 1;
    }
    if (this.filter.regionid ==999) {
      this.filter.showAllOrganization = true;          
    }
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
      this.Refresh();
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.oblastlist = res.data;
      // if (this.$can('AdminView', 'permissions')) {
      this.oblastlist.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
      // }
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SportTypeClassifierService.GetAll(true)
      .then((res) => {
        this.sporttypeclassifierlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
  },
  computed: {},
  methods: {
    ChangeOblast() {
      this.filter.regionid = 0;
      this.regionlist = [];
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
          if (res.data && res.data.length ) {
            this.regionlist.unshift({ id: 999, oblastid: this.filter.oblastid,  name: this.$t("seeAllOblastOrganizations")})
          }
        });
      }
    },
    ChangeSportType() {
      this.filter.isBySportTypeClassifier = true;
      this.Refresh();
    },
    ChangeNotSportType() {
      this.filter.isBySportTypeClassifier = false;
      this.Refresh();
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
      this.Refresh();
      }
    },
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
    Refresh() {
      this.Loading = true;
      SportReportService.GetReportAthletePassportCount(this.filter).then((res) => {
        this.Loading = false;
        this.items = res.data.data;
        this.calculateTotal(this.items);
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.ChangeOblast();
          this.filter.OblastName = " / " + res.data.oblastname;

           
        }
        if (res.data.regionid > 0) {
          this.filter.regionid = res.data.regionid;
          this.filter.RegionName = " / " + res.data.regionname;
        }
      });
    },
      Print() {
      this.PrintLoading = true;
      SportReportService.PrintReportAthletePassportCount(this.filter)
        .then((response) => {
          this.PrintLoading = false
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          if (this.lang == "ru") {
            fileLink.setAttribute(
              "download",
              "Число спортсменов с выданными спортивными паспортами.xlsx"
            );
          } else if (this.lang == "uz_latn") {
            fileLink.setAttribute(
              "download",
              "Sport pasporti berilgan sportchilar soni.xlsx"
            );
          } else {
            fileLink.setAttribute(
              "download",
              "Спорт паспорти берилган спортчилар сони.xlsx"
            );
          }

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    calculateTotal(item) {
      var totalathletecount = 0;
      var totaltitledcount = 0;
      var totalpassportcount = 0;
      var totaltitledcount_001 = 0;
      var totaltitledcount_002 = 0;
      var totaltitledcount_003 = 0;
      var totaltitledcount_004 = 0;
      var totaltitledcount_005 = 0;
      var totaltitledcount_006 = 0;
      var totaltitledcount_008 = 0;
      var totaltitledcount_007 = 0;
      var totaltitledcount_009 = 0;
      var totaltitledcount_012 = 0;
      item.forEach(function (item) {
        totalathletecount = totalathletecount + item.totalathletecount;
        totaltitledcount = totaltitledcount + item.totaltitledcount;
        totalpassportcount = totalpassportcount + item.totalpassportcount;
        totaltitledcount_001 = totaltitledcount_001 + item.totaltitledcount_001;
        totaltitledcount_002 = totaltitledcount_002 + item.totaltitledcount_002;
        totaltitledcount_003 = totaltitledcount_003 + item.totaltitledcount_003;
        totaltitledcount_004 = totaltitledcount_004 + item.totaltitledcount_004;
        totaltitledcount_005 = totaltitledcount_005 + item.totaltitledcount_005;
        totaltitledcount_006 = totaltitledcount_006 + item.totaltitledcount_006;
        totaltitledcount_007 = totaltitledcount_007 + item.totaltitledcount_007;
        totaltitledcount_008 = totaltitledcount_008 + item.totaltitledcount_008;
        totaltitledcount_009 = totaltitledcount_009 + item.totaltitledcount_009;
        totaltitledcount_012 = totaltitledcount_012 + item.totaltitledcount_012;
      });
      this.bottomrow = {
        totalathletecount: totalathletecount,
        totaltitledcount: totaltitledcount,
        totalpassportcount: totalpassportcount,
        totaltitledcount_001: totaltitledcount_001,
        totaltitledcount_002: totaltitledcount_002,
        totaltitledcount_003: totaltitledcount_003,
        totaltitledcount_004: totaltitledcount_004,
        totaltitledcount_005: totaltitledcount_005,
        totaltitledcount_006: totaltitledcount_006,
        totaltitledcount_008: totaltitledcount_008,
        totaltitledcount_007: totaltitledcount_007,
        totaltitledcount_009: totaltitledcount_009,
        totaltitledcount_012: totaltitledcount_012,
      };
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
    },
    oblastchange1(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh1();
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
       if (this.filter.showAllRegion) {
        this.changeQuery("regionid", item.regionid);
        this.filter.oblastid = item.oblastid;
      } else {
        this.Refresh();
      }
    },
    regionchange1(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh1();
    },
    organizationChange(item) {
      this.$router.push({
        name: "ReportAthletePassportList",
        query: {
          ...this.filter,
          organizationid: item.organizationid,
          sportid: item.sportTypeClassifierId,
          date: this.filter.date,
        },
      });
    },
    changeSportClassifier(id) {
      this.changeQuery("sportTypeClassifierId", id);
      this.Refresh();
    },
    onTabChange(val) {
      if (val == 1) {
        this.filter.isBySportTypeClassifier = true;
        SportTypeClassifierService.GetAll(true).then((res) => {
          this.sportTypeClassifierlist = res.data;
        });
      } else {
        this.filter.isBySportTypeClassifier = false;
      }
      this.changeQuery("activeTab", val);

      this.Refresh();
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
          if (this.$route.query && this.$route.query.regionid) {
            if (this.regionlist.length) {
              this.filter.regionid = 0;
              this.changeQuery("regionid", null);
            } else {
              this.filter.regionid = this.$route.query.regionid;
            }
          } else {
            this.filter.regionid = 0;
            this.changeQuery("regionid", null);
          }
        }
        if (this.filter.oblastid == 999) {
          this.filter.showAllRegion = true;          
        } else {
          this.filter.showAllRegion = false; 
        }
        this.changeQuery("oblastid", newValue);
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
        if (this.filter.regionid == 999) {
          this.filter.showAllOrganization = true;  
        }else{
          this.filter.showAllOrganization = false;  
        }
        this.changeQuery("regionid", newValue);
        this.Refresh();
      },
    },
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
          this.bottomrow = {
            doctabcount: 0,
            doctabsum: 0,
          };
        }
        this.changeQuery("schoolyearid", newValue);
        this.Refresh();
      },
    },
    activeTab(val) {
      if (val == 1) {
        this.filter.isBySportTypeClassifier = true;
      } else {
        this.filter.isBySportTypeClassifier = false;
      }
      this.Refresh();
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
