<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-center">{{ $t("HigHerEduClassiFierCountByGroup") }}</h3>
          </b-col>
        </b-row>

        <CCardHeader>
          <CRow class="form-group">
            <CCol class="d-flex mt-2">
              <b-button-group @click="Refresh" size="sm" class="mr-2">
                <b-button
                  @click="tabindex = 0"
                  :variant="tabindex == 0 ? 'primary' : 'outline-primary'"
                >
                  {{ $t("GroupCount") }}
                </b-button>
                <b-button
                  @click="tabindex = 1"
                  :variant="tabindex == 1 ? 'primary' : 'outline-primary'"
                >
                  {{ $t("AbiturientCount") }}
                </b-button>
              </b-button-group>
               <v-select
               v-if="tabindex == 1"
                :options="HigHerEduClassifierList"
                v-model="filter.higHerEduClassifierId"
                :reduce="(item) => item.id"
                :placeholder="$t('higHerEduClassifier')"
                label="fullname"
                class="mr-2"
                style="width: 40%"
              ></v-select>
              <div>
              </div>
            </CCol>
            <CCol class="text-right">
            <CButton
              color="primary"
              class="float-sm-right mr-2"
              @click="Refresh"
              size="sm"
            >
              {{ $t("Refresh") }}
            </CButton>
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
              <b-spinner v-if="PrintLoading" small></b-spinner>
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              {{ $t("Print") }}
            </CButton>
          </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table-simple
            small="small"
            responsive="sm"
            show-empty
           
            sticky-header="70vh"
            no-border-collapse
            bordered
            class="table table-bordered"
          >
            <thead class="tablehead">
              <tr>
                <th
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("ordernumber") }}
                </th>
                <th
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("highereduclassifier") }}
                </th>
                <th
                  rowspan="3"
                  v-if="tabindex == 1"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("examgroupname") }}
                </th>
                <th
                  rowspan="3"
                  v-if="tabindex == 1"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("educationformtype") }}
                </th>
                <th
                  rowspan="3"
                  v-if="tabindex == 1"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("educationlanguage") }}
                </th>
                <th
                  rowspan="3"
                  v-if="tabindex == 1"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("genders") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  rowspan="3"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("groupsheetcount") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  rowspan="1"
                  colspan="6"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("RatedGroup") }}
                </th>
                <th
                  rowspan="3"
                  width="15px"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("abiturientcount") }}
                </th>

                <th
                  rowspan="1"
                  colspan="6"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("RatedAbiturent") }}
                </th>
              </tr>
              <tr>
                <th
                  v-if="tabindex == 0"
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("RatedTotal") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("PateRate") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("NotRate") }}
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("RatedTotal") }}
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("PateRate") }}
                </th>
                <th
                  colspan="2"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("NotRate") }}
                </th>
              </tr>
              <tr>
                <th
                  v-if="tabindex == 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Count1") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("%") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Count1") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("%") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("Count1") }}
                </th>
                <th
                  v-if="tabindex == 0"
                  style="text-align: center; vertical-align: middle"
                >
                  {{ $t("%") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Count1") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("%") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Count1") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("%") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("Count1") }}
                </th>
                <th style="text-align: center; vertical-align: middle">
                  {{ $t("%") }}
                </th>
              </tr>
            </thead>
            <tbody v-if="!isBusy">
              <tr
                v-for="(item, i) in items"
                style="text-align: center; vertical-align: middle"
                :key="i"
              >
                <td style="text-align: center; vertical-align: middle">
                  <span style="font-weight: bold">{{ i + 1 }}</span>
                </td>
                <td style="text-align: left; vertical-align: middle">
                  <span style="font-weight: bold">{{
                    item.highereduclassifiername
                  }}</span>
                </td>
                <td
                  v-if="tabindex == 1"
                  style="text-align: left; vertical-align: middle"
                >
                  <span>{{ item.examgroupname }}</span>
                </td>
                <td
                  v-if="tabindex == 1"
                  style="text-align: left; vertical-align: middle"
                >
                  <span>{{ item.educationformtypename }}</span>
                </td>
                <td
                  v-if="tabindex == 1"
                  style="text-align: left; vertical-align: middle"
                >
                  <span>{{ item.educationlanguagename }}</span>
                </td>
                <td
                  v-if="tabindex == 1"
                  style="text-align: left; vertical-align: middle"
                >
                  <span>{{ item.gendername }}</span>
                </td>
                <td v-if="tabindex == 0" class="text-right">
                  {{
                    $options.filters.currency(item.groupsheetcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td v-if="tabindex == 0" class="text-right">
                  {{
                    $options.filters.currency(item.fullratedgroupsheetcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td v-if="tabindex == 0" class="text-right">
                  {{
                    $options.filters.currency(item.fullratedgroupsheetpercent, {
                      symbol: "",
                      fractionCount: 1,
                    })
                  }}
                </td>
                <td v-if="tabindex == 0" class="text-right">
                  {{
                    $options.filters.currency(item.partlyratedgroupsheetcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td v-if="tabindex == 0" class="text-right">
                  {{
                    $options.filters.currency(item.partlyratedgroupsheetpercent, {
                      symbol: "",
                      fractionCount: 1,
                    })
                  }}
                </td>
                <td v-if="tabindex == 0" class="text-right">
                  {{
                    $options.filters.currency(item.notratedgroupsheetcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td v-if="tabindex == 0" class="text-right">
                  {{
                    $options.filters.currency(item.notratedgroupsheetpercent, {
                      symbol: "",
                      fractionCount: 1,
                    })
                  }}
                </td>
                <td class="text-right">
                  {{
                    $options.filters.currency(item.abiturientcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td class="text-right">
                  {{
                    $options.filters.currency(item.fullratedabiturientcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td class="text-right">
                  {{
                    $options.filters.currency(
                      item.fullratedabiturientpercent,
                      {
                        symbol: "",
                        fractionCount: 1,
                      }
                    )
                  }}
                </td>
                <td class="text-right">
                  {{
                    $options.filters.currency(
                      item.partlyratedabiturientcount,
                      {
                        symbol: "",
                        fractionCount: 0,
                      }
                    )
                  }}
                </td>
                <td class="text-right">
                  {{
                    $options.filters.currency(
                      item.partlyratedabiturientpercent,
                      {
                        symbol: "",
                        fractionCount: 1,
                      }
                    )
                  }}
                </td>
                <td class="text-right">
                  {{
                    $options.filters.currency(item.notratedabiturientcount, {
                      symbol: "",
                      fractionCount: 0,
                    })
                  }}
                </td>
                <td class="text-right">
                  {{
                    $options.filters.currency(
                      item.notratedabiturientpercent,
                      {
                        symbol: "",
                        fractionCount: 1,
                      }
                    )
                  }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="isBusy">
              <tr>
                <td class="text-center" colspan="19">
                  <b-spinner></b-spinner>
                </td>
              </tr>
            </tbody>
            <tbody v-if="items.length == 0">
              <tr>
                <td :colspan="tabindex == 0 ? 17 : 10">
                  <h5 class="text-center">{{ $t("NoItems") }}</h5>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <b-tr class="tablefoot">
                <b-th
                  :colspan="tabindex == 0 ? 2 : 6"
                  class="text-center bg-secondary"
                >
                  <span style="font-weight: bold"> {{ $t("Total") }} </span>
                </b-th>
                <td v-if="tabindex == 0" style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.groupsheetcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.groupsheetcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </span>
                </td>
                <td v-if="tabindex == 0" style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.fullratedgroupsheetcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.fullratedgroupsheetcount,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </span>
                </td>
                <td v-if="tabindex == 0" style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.fullratedgroupsheetpercent == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.fullratedgroupsheetpercent,
                            {
                              symbol: "",
                              fractionCount: 1,
                            }
                          )
                    }}
                  </span>
                </td>
                <td v-if="tabindex == 0" style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.partlyratedgroupsheetcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.partlyratedgroupsheetcount,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </span>
                </td>
                <td v-if="tabindex == 0" style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.partlyratedgroupsheetpercent == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.partlyratedgroupsheetpercent,
                            {
                              symbol: "",
                              fractionCount: 1,
                            }
                          )
                    }}
                  </span>
                </td>
                <td v-if="tabindex == 0" style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.notratedgroupsheetcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.notratedgroupsheetcount,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </span>
                </td>
                <td v-if="tabindex == 0" style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.notratedgroupsheetpercent == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.notratedgroupsheetpercent,
                            {
                              symbol: "",
                              fractionCount: 1,
                            }
                          )
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.abiturientcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.abiturientcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.fullratedabiturientcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.fullratedabiturientcount,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.fullratedabiturientpercent == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.fullratedabiturientpercent,
                            {
                              symbol: "",
                              fractionCount: 1,
                            }
                          )
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.partlyratedabiturientcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.partlyratedabiturientcount,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.partlyratedabiturientpercent == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.partlyratedabiturientpercent,
                            {
                              symbol: "",
                              fractionCount: 1,
                            }
                          )
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.notratedabiturientcount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.notratedabiturientcount,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.notratedabiturientpercent == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.notratedabiturientpercent,
                            {
                              symbol: "",
                              fractionCount: 1,
                            }
                          )
                    }}
                  </span>
                </td>
              </b-tr>
            </tfoot>
          </b-table-simple>
        </CCardBody>
        <!-- <b-row class="pb-3 mx-1 mt-n2">
          <b-col class="d-flex align-items-center">
            <span class="text-danger h5 mb-1 mr-1"> * </span>
            <span class="h6"> {{ $t("noparamsschoolgradecountfull") }} </span>
          </b-col>
        </b-row> -->
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HigHerEduClassiFierCountByGroupService from "@/services/HigHerEduClassiFierCountByGroup.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import HigHerEduClassiFierByAbiturientCountService from "@/services/HigHerEduClassiFierByAbiturientCount.service";
export default {
  data() {
    return {
      items: [],
      filter: {
        higHerEduClassifierId: 0,
      },
      HigHerEduClassifierList:[],
      FillData: {
        fullratedgroupsheetpercent: 0,
        partlyratedgroupsheetpercent: 0,
        notratedgroupsheetpercent: 0,
        fullratedabiturientpercent: 0,
        notratedabiturientpercent: 0,
        partlyratedabiturientpercent: 0,
      },
      bottomrow: {
        abiturientcount: 0,
        fullratedabiturientcount: 0,
        fullratedabiturientpercent: 0,
        fullratedgroupsheetcount: 0,
        fullratedgroupsheetpercent: 0,
        groupsheetacceptedcount: 0,
        groupsheetcount: 0,
        notratedabiturientcount: 0,
        notratedabiturientpercent: 0,
        notratedgroupsheetcount: 0,
        notratedgroupsheetpercent: 0,
        partlyratedabiturientcount: 0,
        partlyratedabiturientpercent: 0,
        partlyratedgroupsheetcount: 0,
        partlyratedgroupsheetpercent: 0,
      },
      totalRows: "",
      totalRows1: "",
      isBusy: true,
      tabindex: 0,
      PrintLoading: false,
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    this.Refresh();
    HigherEduClassifierService.GetAll(this.lang).then((res) => {
      this.HigHerEduClassifierList = res.data;
    });
  },
  computed: {},
  methods: {
    Print() {
      if (this.tabindex == 1) {
        this.PrintLoading = true;
        HigHerEduClassiFierByAbiturientCountService.PrintHigHerEduClassiFierByAbiturientCount(this.filter.higHerEduClassifierId)
          .then((res) => {
            this.PrintLoading = false;
            this.forceFileDownload(res, "HigHerEduClassiFierByAbiturientCount");
          })
          .catch((err) => {
            this.PrintLoading = false;
            this.makeToast(err.response.data.error, this.$t("error"), "danger");
          });
      } else {
        HigHerEduClassiFierCountByGroupService.PrintHigHerEduClassiFierCountByGroup()
          .then((res) => {
            this.PrintLoading = false;
            this.forceFileDownload(res, "HigHerEduClassiFierCountByGroup");
          })
          .catch((err) => {
            this.PrintLoading = false;
            this.makeToast(err.response.data.error, this.$t("error"), "danger");
          });
      }
    },
    calculateTotal(item) {
      var abiturientcount = 0;
      var fullratedabiturientcount = 0;
      var fullratedgroupsheetcount = 0;
      var groupsheetacceptedcount = 0;
      var groupsheetcount = 0;
      var notratedabiturientcount = 0;
      var notratedgroupsheetcount = 0;
      var partlyratedabiturientcount = 0;
      var partlyratedgroupsheetcount = 0;
      item.forEach(function (item) {
        abiturientcount = abiturientcount + item.abiturientcount;
        fullratedabiturientcount =
          fullratedabiturientcount + item.fullratedabiturientcount;
        fullratedgroupsheetcount = fullratedgroupsheetcount + item.fullratedgroupsheetcount;
        groupsheetacceptedcount =
          groupsheetacceptedcount + item.groupsheetacceptedcount;
        groupsheetcount = groupsheetcount + item.groupsheetcount;
        notratedabiturientcount =
          notratedabiturientcount + item.notratedabiturientcount;
        notratedgroupsheetcount = notratedgroupsheetcount + item.notratedgroupsheetcount;
        partlyratedabiturientcount =
          partlyratedabiturientcount + item.partlyratedabiturientcount;
        partlyratedgroupsheetcount =
          partlyratedgroupsheetcount + item.partlyratedgroupsheetcount;
      });
      this.bottomrow = {
        abiturientcount: abiturientcount,
        fullratedabiturientcount: fullratedabiturientcount,
        fullratedgroupsheetcount: fullratedgroupsheetcount,
        groupsheetacceptedcount: groupsheetacceptedcount,
        groupsheetcount: groupsheetcount,
        notratedabiturientcount: notratedabiturientcount,
        notratedgroupsheetcount: notratedgroupsheetcount,
        partlyratedabiturientcount: partlyratedabiturientcount,
        partlyratedgroupsheetcount: partlyratedgroupsheetcount,
        fullratedgroupsheetpercent : (fullratedgroupsheetcount * 100) / groupsheetcount,
        partlyratedgroupsheetpercent : (partlyratedgroupsheetcount * 100) / groupsheetcount,
        notratedgroupsheetpercent : (notratedgroupsheetcount * 100) / groupsheetcount,
        fullratedabiturientpercent : (fullratedabiturientcount * 100) / abiturientcount,
        notratedabiturientpercent : (notratedabiturientcount * 100) / abiturientcount,
        partlyratedabiturientpercent : (partlyratedabiturientcount * 100) / abiturientcount,
      };
    },
    forceFileDownload(response, name) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    Refresh() {
      if (this.tabindex == 0) {
        this.isBusy = true;
        HigHerEduClassiFierCountByGroupService.GetHigHerEduClassiFierCountByGroup().then(
          (res) => {
            this.isBusy = false;
            this.items = res.data;
            // for (let i = 0; i < this.items.length; i++) {
            //   this.FillData.fullratedgroupsheetpercent = (this.items[i].fullratedgroupsheetcount * 100) / this.items[i].groupsheetcount;
            //   this.FillData.partlyratedgroupsheetpercent = (this.items[i].partlyratedgroupsheetcount * 100) / this.items[i].groupsheetcount;
            //   this.FillData.notratedgroupsheetpercent = (this.items[i].notratedgroupsheetcount * 100) / this.items[i].groupsheetcount;
            //   this.FillData.fullratedabiturientpercent = (this.items[i].fullratedabiturientcount * 100) / this.items[i].abiturientcount;
            //   this.FillData.notratedabiturientpercent = (this.items[i].notratedabiturientcount * 100) / this.items[i].abiturientcount;
            //   this.FillData.partlyratedabiturientpercent = (this.items[i].partlyratedabiturientcount * 100) / this.items[i].abiturientcount;
            //   this.items[i].fullratedgroupsheetpercent = this.FillData.fullratedgroupsheetpercent;
            //   this.items[i].partlyratedgroupsheetpercent = this.FillData.partlyratedgroupsheetpercent;
            //   this.items[i].notratedgroupsheetpercent = this.FillData.notratedgroupsheetpercent;
            //   this.items[i].fullratedabiturientpercent = this.FillData.fullratedabiturientpercent;
            //   this.items[i].notratedabiturientpercent = this.FillData.notratedabiturientpercent;
            //   this.items[i].partlyratedabiturientpercent = this.FillData.partlyratedabiturientpercent;
            // }
            this.calculateTotal(this.items);
          }
        );
      } else {
        this.isBusy = true;
        HigHerEduClassiFierByAbiturientCountService.GetHigHerEduClassiFierByAbiturientCount(this.filter.higHerEduClassifierId).then(
          (res) => {
            this.isBusy = false;
            this.items = res.data;
            //  for (let i = 0; i < this.items.length; i++) {
            //   this.FillData.fullratedgroupsheetpercent = (this.items[i].fullratedgroupsheetcount * 100) / this.items[i].groupsheetcount;
            //   this.FillData.partlyratedgroupsheetpercent = (this.items[i].partlyratedgroupsheetcount * 100) / this.items[i].groupsheetcount;
            //   this.FillData.notratedgroupsheetpercent = (this.items[i].notratedgroupsheetcount * 100) / this.items[i].groupsheetcount;
            //   this.FillData.fullratedabiturientpercent = (this.items[i].fullratedabiturientcount * 100) / this.items[i].abiturientcount;
            //   this.FillData.notratedabiturientpercent = (this.items[i].notratedabiturientcount * 100) / this.items[i].abiturientcount;
            //   this.FillData.partlyratedabiturientpercent = (this.items[i].partlyratedabiturientcount * 100) / this.items[i].abiturientcount;
            //   this.items[i].fullratedgroupsheetpercent = this.FillData.fullratedgroupsheetpercent;
            //   this.items[i].partlyratedgroupsheetpercent = this.FillData.partlyratedgroupsheetpercent;
            //   this.items[i].notratedgroupsheetpercent = this.FillData.notratedgroupsheetpercent;
            //   this.items[i].fullratedabiturientpercent = this.FillData.fullratedabiturientpercent;
            //   this.items[i].notratedabiturientpercent = this.FillData.notratedabiturientpercent;
            //   this.items[i].partlyratedabiturientpercent = this.FillData.partlyratedabiturientpercent;
            // }
            this.calculateTotal(this.items);
          }
        );
      }
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
  },
  watch: {
    // "filter.PageNumber": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //       this.Refresh();
    //     }
    //   },
    // },
    // "filter.PageLimit": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //       this.Refresh();
    //     }
    //   },
    // },
    // "filter1.PageNumber": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //       this.Refresh();
    //     }
    //   },
    // },
    // "filter1.PageLimit": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //       this.Refresh();
    //     }
    //   },
    // },
  },
};
</script>

<style>
.tablefoot {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background: #c6e2ff;
  color: rgb(34, 30, 30);
  z-index: 4;
}
.tablehead {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background: #c6e2ff;
  color: rgb(34, 30, 30);
  z-index: 4;
}
table thead,
table tfoot {
  position: sticky;
}
table thead {
  inset-block-start: 0; /* "top" */
}
table tfoot {
  inset-block-end: 0; /* "bottom" */
}
</style>
 