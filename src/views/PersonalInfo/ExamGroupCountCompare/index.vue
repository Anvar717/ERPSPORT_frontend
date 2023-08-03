<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-center">{{ $t("ExamGroupCountCompare") }}</h3>
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
                  {{ $t("DTMGroup") }}
                </b-button>
                <b-button
                  @click="tabindex = 1"
                  :variant="tabindex == 1 ? 'primary' : 'outline-primary'"
                >
                  {{ $t("DTMGroupByEduClassifier") }}
                </b-button>
              </b-button-group>
              <div>
                <b-button @click="Refresh" variant="primary">
                  {{ $t("search") }}
                </b-button>
              </div>
            </CCol>
            <CCol>
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
          <b-table
            :fields="tabindex == 0 ? fields : fields1"
            :items="items"
            style="white-space: nowrap"
            small="small"
            responsive="sm"
            show-empty
            :busy="isBusy"
           
            sticky-header="70vh"
            
            no-border-collapse
            bordered
          >
            <template v-slot:head(educationlanguagename)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('educationlanguagename')"
              >
                {{ $t("educationlanguage") }}
                <b-icon
                  v-if="filter.SortColumn === 'educationlanguagename'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(highereduclassifiername)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('highereduclassifiername')"
              >
                {{ $t("highereduclassifier") }}
                 <code class="text-danger h5"> * </code>
                <b-icon
                  v-if="filter.SortColumn === 'highereduclassifiername'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(gendername)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('gendername')"
              >
                {{ $t("gender") }}
                <b-icon
                  v-if="filter.SortColumn === 'gendername'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(dtmgroupcount)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('dtmgroupcount')"
              >
                {{ $t("dtmgroupcount") }}
                <b-icon
                  v-if="filter.SortColumn === 'dtmgroupcount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(abiturientcount)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('abiturientcount')"
              >
                {{ $t("abiturientcount") }}
                <code class="text-danger h5"> * </code>
                <b-icon
                  v-if="filter.SortColumn === 'abiturientcount'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(highereduclassifiername)="{ item }">
              <span style="font-weight: bold">{{
                item.highereduclassifiername
              }}</span>
            </template>
            <template v-slot:cell(index)="{ index }">
              <span style="font-weight: bold">{{ index + 1 }}</span>
            </template>
            <template v-slot:head(educationformtypename)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('educationformtypename')"
              >
                {{ $t("educationformtype") }}
                <code class="text-danger h5"> * </code>
                <b-icon
                  v-if="filter.SortColumn === 'educationformtypename'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template class="tablefoot" variant="info" #custom-foot>
              <b-tr class="tablefoot">
                <b-th
                  :colspan="tabindex == 0 ? 5 : 2"
                  class="text-center bg-secondary"
                >
                  <span style="font-weight: bold"> {{ $t("Total") }} </span>
                </b-th>
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
                      bottomrow.dtmgroupcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.dtmgroupcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.realgroupcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.realgroupcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span style="font-weight: bold">
                    {{
                      bottomrow.diffgroupcount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.diffgroupcount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </span>
                </td>
              </b-tr>
            </template>
            <!-- <template #foot(highereduclassifiername)>
              <span class="text-danger">{{ $t('Total')}}</span>
           </template> -->
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
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
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "index",
          label: this.$t("ordernumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
        {
          key: "highereduclassifiername",
          label: this.$t("highereduclassifier"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "educationformtypename",
          label: this.$t("educationformtype"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguage"),
          class: "text-center",
          sortable: false,
          class: "text-left",
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "abiturientcount",
          label: this.$t("abiturientcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
        {
          key: "dtmgroupcount",
          label: this.$t("dtmgroupcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
        {
          key: "realgroupcount",
          label: this.$t("realgroupcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
        {
          key: "diffgroupcount",
          label: this.$t("diffgroupcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
      ],
      fields1: [
        {
          key: "index",
          label: this.$t("ordernumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
        {
          key: "highereduclassifiername",
          label: this.$t("highereduclassifier"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "abiturientcount",
          label: this.$t("abiturientcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
        {
          key: "dtmgroupcount",
          label: this.$t("dtmgroupcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
        {
          key: "realgroupcount",
          label: this.$t("realgroupcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
        {
          key: "diffgroupcount",
          label: this.$t("diffgroupcount"),
          thClass: "text-center",
          tdClass: "text-right",
          sortable: false,
        },
      ],
      items: [],
      filter: {},
      bottomrow: {
        abiturientcount: 0,
        dtmgroupcount: 0,
        realgroupcount: 0,
        diffgroupcount: 0,
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
  },
  computed: {},
  methods: {
    Print() {
      this.PrintLoading = true;
      // ReportLearningProcessService.PrintTeachersCountInSchool(
      //   this.filter.SortColumn,
      //   this.filter.OrderType,
      //   this.filter.PageNumber,
      //   this.filter.PageLimit,
      // )
      //   .then((res) => {
      //     this.PrintLoading = false;
      //     this.forceFileDownload(res, "TeachersCountInSchool");
      //   })
      //   .catch((err) => {
      //     this.PrintLoading = false;
      //     this.makeToast(err.response.data.error, this.$t("error"), "danger");
      //   });
    },
    calculateTotal(item) {
      var abiturientcount = 0;
      var dtmgroupcount = 0;
      var realgroupcount = 0;
      var diffgroupcount = 0;
      item.forEach(function (item) {
        abiturientcount = abiturientcount + item.abiturientcount;
        dtmgroupcount = dtmgroupcount + item.dtmgroupcount;
        realgroupcount = realgroupcount + item.realgroupcount;
        diffgroupcount = diffgroupcount + item.diffgroupcount;
      });
      this.bottomrow = {
        abiturientcount: abiturientcount,
        dtmgroupcount: dtmgroupcount,
        realgroupcount: realgroupcount,
        diffgroupcount: diffgroupcount,
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
      this.isBusy = true;
      if (this.tabindex == 0) {
        ReportLearningProcessService.ExamGroupCountCompareDTMGroup().then(
          (res) => {
            this.isBusy = false;
            this.items = res.data.data.rows;
            this.calculateTotal(this.items);
          }
        );
      } else {
        ReportLearningProcessService.ExamGroupCountCompareDTMGroupByEduClassifier().then(
          (res) => {
            this.isBusy = false;
            this.items = res.data.data.rows;
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
</style>
 