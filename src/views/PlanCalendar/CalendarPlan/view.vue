<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("CalendarPlan") }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" :md="10">
          <b-row>
            <b-col cols="12" md="6">
              <b-card>
                <table>
                  <tbody>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("docnumber") }} :</td>
                      <td class="pb-1">
                        <span class="font-weight-bold">
                          {{ CalendarPlan.docnumber }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {{ $t("docdate") }}
                      </td>
                      <td>
                        {{ CalendarPlan.docdate }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">
                        {{ $t("SportEventCategory") }} :
                      </td>
                      <td class="font-weight-bold pb-1">
                        {{ CalendarPlan.sporteventcategoryname }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">
                        {{ $t("SportTypeGroup") }} :
                      </td>
                      <td class="font-weight-bold pb-1">
                        {{ CalendarPlan.sporttypegroupname }}
                      </td>
                    </tr>
                    <!-- <tr>
                    <td class="pr-1 pb-1">{{ $t("ondate") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <b-badge
                      >
                        {{ CalendarPlan.ondate }}
                      </b-badge>
                    </td>
                  </tr> -->
                  </tbody>
                </table>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card>
                <table>
                  <tbody>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("SportEventType") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ CalendarPlan.sporteventtypename }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("CompetitionType") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ CalendarPlan.competitiontypename }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1">{{ $t("SportEvent") }} :</td>
                      <td class="font-weight-bold">
                        {{ CalendarPlan.sporteventname }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6">
              <b-card>
                <table>
                  <tbody>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("startdate") }} :</td>
                      <td class="pb-1">
                        <span class="font-weight-bold">
                          {{ CalendarPlan.startdate }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("enddate") }} :</td>
                      <td class="pb-1">
                        <span class="font-weight-bold">
                          {{ CalendarPlan.enddate }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("islocationunknown") }} :</td>
                      <td class="pb-1">
                         <div v-if="CalendarPlan.islocationunknown == true">
                <span>{{$t("true")}}</span>
              </div>
               <div  v-if="CalendarPlan.islocationunknown == false" class="text-left">
                    <span>
                      {{CalendarPlan.countryname}} {{CalendarPlan.oblastname}} {{CalendarPlan.regionname}}
                    </span>
              </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">
                        {{ $t("isparticipantunknown") }} :
                      </td>
                      <td class="pb-1">
                         <div v-if="CalendarPlan.isparticipantunknown == true">
                <span>
                  {{$t("true")}}
               </span>
              </div>
              <div v-if="CalendarPlan.isparticipantunknown == false"  class="text-left">
                <span> {{ CalendarPlan.sporteventparticipantname }} </span>
              </div>
                      </td>
                    </tr>
                    <!-- <tr>
                    <td class="pr-1 pb-1">{{ $t("detailinfo") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CalendarPlan.detailinfo }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("qualificationcategory") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CalendarPlan.qualificationcategoryname }}
                    </td>
                  </tr> -->
                  </tbody>
                </table>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card>
                <table>
                  <tbody>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("givenorganization") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ CalendarPlan.givenorganization }}
                      </td>
                    </tr>
                    <!-- <tr>
                    <td class="pr-1 pb-1">{{ $t("schoolsubject") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <b-badge
                      >
                        {{ CalendarPlan.schoolsubjectname }}
                      </b-badge>
                    </td>
                  </tr> -->
                    <tr>
                      <td>
                        {{ $t("status") }}
                      </td>
                      <td>
                        <b-badge
                          :variant="
                            CalendarPlan.statusname == 'Утвержден'
                              ? 'success'
                              : CalendarPlan.statusname == 'Отправлен'
                              ? 'info'
                              : CalendarPlan.statusname == 'Создан' ||
                                CalendarPlan.statusname == 'Изминен' ||
                                CalendarPlan.statusname == 'Изменен'
                              ? 'primary'
                              : 'danger'
                          "
                        >
                          {{ CalendarPlan.statusname }}
                        </b-badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="12">
              <b-card>
                <history-detail-info
                  :history="CalendarPlan.History"
                ></history-detail-info>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="2">
          <b-button @click="Back" size="sm" variant="danger" class="w-100 mb-1">
            <b-icon-arrow-left-short scale="1.7" />
            {{ $t("back") }}
          </b-button>
          <b-button
            v-if="CalendarPlan.CanApprove"
            @click="OpenApproveModal"
            size="sm"
            variant="primary"
            class="w-100 mb-1"
          >
            <b-icon scale="1.4" icon="check2"></b-icon>
            {{ $t("Approve") }}
          </b-button>
          <b-button
            v-if="CalendarPlan.CanCancelApproval"
            @click="OpenCancelApproveModal"
            size="sm"
            variant="danger"
            class="w-100 mb-1"
          >
            <b-icon icon="x" scale="1.5"></b-icon>
            {{ $t("CancelApproval") }}
          </b-button>
          <b-button
            v-if="CalendarPlan.CanSend"
            @click="$refs['SendModal'].show()"
            size="sm"
            variant="success"
            class="w-100 mb-1"
          >
            {{ $t("Send") }}
          </b-button>
        </b-col>
        <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
          <template #modal-title>
            {{ $t("Approve") }}
            <b-spinner v-if="ApproveLoading" small></b-spinner>
          </template>
          <b-card-text class="mt-3">
            <h5>{{ $t("id") }} : {{ CalendarPlan.id }}</h5>
            <span>
              <h5>{{ $t("docnumber") }} : {{ CalendarPlan.docnumber }}</h5></span
            >
            <h5>{{ $t("WantApprove") }}</h5>
          </b-card-text>
          <b-row>
            <b-col class="text-right">
              <b-button
                class="mr-2"
                variant="danger"
                @click="$refs['ApproveModal'].hide()"
              >
                {{ $t("Cancel") }}
              </b-button>
              <b-button variant="success" @click="Approve">
                {{ $t("Accept") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal :ref="'CancelApprovalModal'" hide-footer no-close-on-backdrop>
          <template #modal-title>
            {{ $t("CancelApproval") }}
            <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
          </template>
          <b-card-text class="mt-3">
            <h5>{{ $t("id") }} : {{ CalendarPlan.id }}</h5>
            <span>
              <h5>{{ $t("docnumber") }} : {{ CalendarPlan.docnumber }}</h5></span
            >
            <h5>{{ $t("WantCancelApproval") }}</h5>
          </b-card-text>
          <b-row>
            <b-col class="text-right">
              <b-button
                class="mr-2"
                variant="danger"
                @click="$refs['CancelApprovalModal'].hide()"
              >
                {{ $t("Cancel") }}
              </b-button>
              <b-button variant="success" @click="CancelApproval">
                {{ $t("Accept") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal
          :ref="'SendModal'"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Send(CalendarPlan)"
        >
          <template #modal-title>
            {{ $t("Send") }} <b-spinner v-if="SendLoading" small></b-spinner>
          </template>
          <b-card-text>
            <h5>{{ $t("id") }} : {{ CalendarPlan.id }}</h5>
            <span>
              <h5>{{ $t("name") }} : {{ CalendarPlan.personname }}</h5></span
            >
            <h5>{{ $t("WantSend") }}</h5>
          </b-card-text>
        </b-modal>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-tabs>
            <b-tab active class="">
              <template slot="title">
                <b-icon icon="trophy"></b-icon>
                {{ $t("sporttype") }}
              </template>
              <b-row class="mt-3">
                <!-- <b-col class="text-right">
                  <b-button variant="primary" @click="OpenAddSportTypeModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col> -->
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="SportTypeFields"
                      :items="CalendarPlan.Tables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditSportTypeItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteSportTypeItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="">
              <template slot="title">
                <b-icon icon="geo"></b-icon>
                {{ $t("LoacationTables") }}
              </template>
              <b-row class="mt-3">
                <!-- <b-col class="text-right">
                  <b-button variant="primary" @click="OpenLocationModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col> -->
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="LoacationFields"
                      :items="CalendarPlan.LocationTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditLocationItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteLocationItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="">
              <template slot="title">
                <b-icon icon="person"></b-icon>
                {{ $t("ParticipantTables") }}
              </template>
              <b-row class="mt-3">
                <!-- <b-col class="text-right">
                  <b-button variant="primary" @click="OpenParticipantModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col> -->
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="ParticipantFields"
                      :items="CalendarPlan.ParticipantTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditParticipantItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteParticipantItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                    </b-table>
                     <div class="pb-4">
                      <div
                        class="pagination-number"
                        style="float: left; font-size: 12px"
                      >
                        {{ $t("RecordsFrom") }} {{ firstNumber }}
                        {{ $t("by") }} {{ lastNumber }} {{ $t("of") }}
                        {{ totalRows }}
                      </div>
                      <div class="page-limit">
                        <div
                          style="float: left"
                          class="per-page ml-2 mr-2 mt-n1"
                        >
                          <b-form-select
                            v-model="filter.PageLimit"
                            id="PageLimitSelect"
                            @input="Refresh"
                            :options="filter.pageOptions"
                          ></b-form-select>
                        </div>
                        <div
                          class="per-page"
                          style="float: left; font-size: 12px"
                        >
                          {{ $t("RecordsPerPage") }}
                        </div>
                      </div>
                      <div style="float: right">
                        <b-pagination
                          v-model="filter.PageNumber"
                          :total-rows="totalRows"
                          @input="Refresh"
                          align="right"
                          size="sm"
                          class="my-0 mobile-pagination"
                        ></b-pagination>
                      </div>
                    </div>
                  </div>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="">
              <template slot="title">
                <b-icon icon="credit-card"></b-icon>
                {{ $t("SportEventCalendarBudgetTables") }}
              </template>
              <b-row class="mt-3">
                <!-- <b-col class="text-right">
                  <b-button variant="primary" @click="OpenRequiredAmountModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col> -->
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="RequiredAmountFields"
                      :items="CalendarPlan.SportEventCalendarBudgetTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditRequiredAmountItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteRequiredAmountItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                      <template v-slot:cell(quantity)="{ item }">
                        <span class="font-weight-bold">{{ item.quantity }}</span>
                      </template>
                      <template v-slot:cell(price)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.price, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                      <template v-slot:cell(amount)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.amount, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
               <b-tab class="">
              <template slot="title">
                <b-icon icon="credit-card"></b-icon>
                {{ $t("SportEventCalendarBudgetSourceTables") }}
              </template>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="BudgetSourceTablesFields"
                      :items="CalendarPlan.SportEventCalendarBudgetSourceTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditBudgetSourceTables(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteBudgetSourceTables(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                      <template v-slot:cell(quantity)="{ item }">
                        <span class="font-weight-bold">{{
                          item.quantity
                        }}</span>
                      </template>
                      <template v-slot:cell(price)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.price, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                      <template v-slot:cell(amount)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.amount, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
} from "bootstrap-vue";
import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import SportEventCalendarService from "@/services/SportEventCalendar.service";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    DatePicker,
    vSelect,
    BButton,
    BTable,
    HistoryDetailInfo,
  },
  data() {
    return {
      show: false,
      CalendarPlan: {},
      SaveLoading: false,
      studentvalue: {},
      lang: localStorage.getItem("locale") || "ru",
      coachvalue: {},
      AttachedFiles: [],
        filter: {
        Search: "",
        SortColumn: "",
        PageNumber: 1,
        PageLimit: 20,
        OrderType: "asc",
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
      },
      ApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
      },
      CancelApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
        returnReason: "",
      },
      DocumentSeriesList: [],
      DeleteLoading: false,
      totalRows: 0,
      DownloadLoading: false,
      ApproveLoading:false,
      CancelApprovalLoading:false,
      fileLoading: false,
      SportTypeFields: [
        {
          key: "id",
          label: this.$t("ID"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttype"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      LoacationFields: [
        {
          key: "id",
          label: this.$t("ID"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "countryname",
          label: this.$t("Country"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("Region"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      ParticipantFields: [
        {
          key: "id",
          label: this.$t("ID"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventparticipantname",
          label: this.$t("sporteventparticipant"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
       RequiredAmountFields: [
        {
          key: "sportitemofexpensename",
          label: this.$t("SportItemOfExpense"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "quantity",
          label: this.$t("Quantity"),
          thClass: "text-center",
          tdClass: "text-right",
        },
        {
          key: "price",
          label: this.$t("price"),
          thClass: "text-center",
          tdClass: "text-right",
        },
        {
          key: "amount",
          label: this.$t("RowTotalSum"),
          thClass: "text-center",
          tdClass: "text-right",
        },
        {
          key: "detail",
          label: this.$t("detail"),
          thClass: "text-center",
          tdClass: "text-left",
        }
      ],
       BudgetSourceTablesFields: [
        {
          key: "sourceoffinancename",
          label: this.$t("sourceoffinance"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "amount",
          label: this.$t("RowTotalSum"),
          thClass: "text-center",
          tdClass: "text-right",
        }
      ],
    };
  },
  created() {
    this.show = true;
    SportEventCalendarService.Get(this.$route.params.id)
      .then((res) => {
        this.CalendarPlan = res.data;
        this.show = false;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, this.$t("error"), "danger");
      });
      this.Refresh()
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
    Back() {
      this.$router.push({ name: "CalendarPlan" });
    },
    // query : {
    //     statusid : this.$route.query.statusid,
    //     oblastid : this.$route.query.oblastid,
    //     regionid : this.$route.query.regionid,
    //     organizationid : this.$route.query.organizationid,
    //     documentseries : this.$route.query.documentseries,
    //     documentnumber : this.$route.query.documentnumber,
    //     personname : this.$route.query.personname,
    //   }
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
      this.ApproveData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
      };
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
      this.CancelApproveData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
        returnReason: "",
      };
    },
    Approve() {
      this.ApproveLoading = true;
      SportEventCalendarService.Approve(this.CalendarPlan.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$refs["ApproveModal"].hide();
          this.makeToast(
            this.$t("ApproveSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      SportEventCalendarService.CancelApproval(this.CalendarPlan.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$refs["CancelApprovalModal"].hide();
          this.makeToast(
            this.$t("CancelApprovalSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.CancelApprovalLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    Refresh() {
      var self = this;
      self.loading = true;
      SportEventCalendarService.GetSportEventCalendarParticipantList(
        self.CalendarPlan.id,
        self.filter.oblastid,
        self.filter.regionid,
        self.filter.organizationid,
        self.filter.organizationtypeid,
        self.filter.schooltypeid,
        self.filter.Search,
        self.filter.SortColumn,
        self.filter.OrderType,
        self.filter.PageNumber,
        self.filter.PageLimit
      )
        .then((res) => {
          self.loading = false;
          self.CalendarPlan.ParticipantTables = res.data.rows;
          self.totalRows = res.data.total;
        })
        .catch((error) => {
          self.$makeToast(
            error.response.data.error,
            self.$t("error"),
            "danger"
          );
          self.loading = false;
        });
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
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>