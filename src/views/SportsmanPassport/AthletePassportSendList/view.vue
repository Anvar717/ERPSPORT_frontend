<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("AthletePassportSendList") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="12" lg="2" md="2">
          <div>
            <img
              v-if="isImage"
              :src="
              AthletePassport.Person.PersonPhoto != null && AthletePassport.Person.PersonPhoto.attachmentfileid ? axios.defaults.baseURL + 'FileManage/Get?id=' + AthletePassport.Person.PersonPhoto.attachmentfileid
              : 'data:image/jpg;base64,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'
              "
              class="img-thumbnail"
              fluid
              style="width: 150px; height: 180px; object-fit: cover"
            />
          </div>
        </b-col>
        <b-col cols="12" md="4">
          <b-card>
            <table>
              <tbody>
                <tr>
                  <td class="pr-1 pb-1">{{ $t("StudentPerson") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ AthletePassport.personname }}
                  </td>
                </tr>
                <tr>
                  <td class="pr-1 pb-1">{{ $t("dateofbirth") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ person.dateofbirth }}
                  </td>
                </tr>
                <tr>
                  <td class="pr-1 pb-1">{{ $t("gender") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ person.gendername }}
                  </td>
                </tr>
                <tr v-for="(el, index) in person.DocumentTables" :key="index">
                  <td class="pr-1 pb-1">{{ $t("IdentityDocumenT") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ el.documentseries }} {{ el.documentnumber }}
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in person.PersonRelativeTables"
                  :key="index"
                >
                  <td class="pr-1 pb-1">{{ $t("AthleteParents") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ item.fullname }}
                  </td>
                </tr>
                <tr>
                  <td class="pr-1 pb-1">{{ $t("pinfl") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ person.pinfl }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card>
            <table>
              <tbody>
                <tr
                  v-if="
                    AthletePassport.statusid != 10 &&
                    AthletePassport.statusid != 8
                  "
                >
                  <td class="pr-1 pb-1">
                    {{ $t("Sport passport seriyasi") }} :
                  </td>
                  <td class="pb-1">
                    <span class="font-weight-bold">
                      {{ AthletePassport.athletepassportseriesname }}
                    </span>
                  </td>
                </tr>
                <tr
                  v-if="
                    AthletePassport.statusid != 10 &&
                    AthletePassport.statusid != 8
                  "
                >
                  <td class="pr-1 pb-1">{{ $t("Sport passport raqami") }} :</td>
                  <td class="pb-1">
                    <span class="font-weight-bold">
                      {{ AthletePassport.docnumber }}
                    </span>
                  </td>
                </tr>
                <tr v-if="AthletePassport.oldathletepassportserial">
                  <td class="pr-1 pb-1" style="color: red">
                    {{ $t("oldathletepassportserial") }}
                    :
                  </td>
                  <td class="pb-1" style="color: red">
                    <span class="font-weight-bold">
                      {{ AthletePassport.oldathletepassportserial }}
                    </span>
                  </td>
                </tr>
                <tr v-if="AthletePassport.oldathletepassportnumber">
                  <td class="pr-1 pb-1" style="color: red">
                    {{ $t("oldathletepassportnumber") }}
                    :
                  </td>
                  <td class="pb-1" style="color: red">
                    <span class="font-weight-bold">
                      {{ AthletePassport.oldathletepassportnumber }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    {{ $t("dateofissue") }}
                  </td>
                  <td class="font-weight-bold pb-1">
                    {{ AthletePassport.docdate }}
                  </td>
                </tr>
                <tr>
                  <td>
                    {{ $t("expirationdate") }}
                  </td>
                  <td class="font-weight-bold pb-1">
                    {{ AthletePassport.docexpiredate }}
                  </td>
                </tr>
                <tr>
                  <td class="pr-1 pb-1">{{ $t("oblastname") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ AthletePassport.oblastname }}
                  </td>
                </tr>
                <tr>
                  <td class="pr-1 pb-1">{{ $t("regionname") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ AthletePassport.regionname }}
                  </td>
                </tr>
                <tr>
                  <td>
                    {{ $t("status") }}
                  </td>
                  <td>
                    <b-badge
                      style="color: white"
                      :variant="
                        AthletePassport.statusid == 1
                          ? 'primary'
                          : AthletePassport.statusid == 2
                          ? 'success'
                          : AthletePassport.statusid == 3
                          ? 'danger'
                          : AthletePassport.statusid == 4
                          ? 'primary'
                          : AthletePassport.statusid == 8
                          ? 'warning'
                          : AthletePassport.statusid == 10
                          ? 'danger'
                          : AthletePassport.statusid == 9
                          ? 'success'
                          : 'primary'
                      "
                    >
                      {{ AthletePassport.statusname }}
                    </b-badge>
                  </td>
                </tr>
                <tr v-if="AthletePassport.rejectreason.adddata">
                  <td class="pr-1 pb-1">{{ $t("Reason") }} :</td>
                  <td class="font-weight-bold pb-1">
                    {{ AthletePassport.rejectreason.returnreasontypename }}
                    {{ AthletePassport.rejectreason.adddata }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>
        </b-col>
        <b-col cols="12" md="2">
          <b-button @click="Back" size="sm" variant="danger" class="w-100 mb-1">
            <b-icon-arrow-left-short scale="1.7" />
            {{ $t("back") }}
          </b-button>
          <b-button
            v-if="AthletePassport.CanSend"
            @click="OpenSendModal"
            size="sm"
            variant="success"
            class="w-100 mb-1"
          >
            <b-icon scale="1.4" icon="check2"></b-icon>
            {{ $t("Send") }}
          </b-button>
          <b-button
            v-if="
              AthletePassport.CanAccept &&
              $can('AthletePassportAccept', 'permissions')
            "
            @click="OpenAcceptModal"
            size="sm"
            variant="success"
            class="w-100 mb-1"
            style="color: white"
          >
            <b-icon scale="1.4" icon="check2"></b-icon>
            {{ $t("Qabul qilish") }}
          </b-button>
          <b-button
            v-if="
              AthletePassport.CanReject &&
              $can('AthletePassportReject', 'permissions')
            "
            @click="OpenRejectModal"
            size="sm"
            variant="danger"
            class="w-100 mb-1"
          >
            <b-icon scale="1.4" icon="check2"></b-icon>
            {{ $t("Reject") }}
          </b-button>
          <b-button
            v-if="AthletePassport.CanCancelApproval"
            @click="OpenCancelApproveModal"
            size="sm"
            variant="danger"
            class="w-100 mb-1"
          >
            <b-icon icon="x" scale="1.5"></b-icon>
            {{ $t("CancelApproval") }}
          </b-button>
          <b-button
            v-if="AthletePassport.statusid == 9"
            @click="OpenCancelAcceptModal"
            size="sm"
            variant="danger"
            class="w-100 mb-1"
          >
            <b-icon icon="x" scale="1.5"></b-icon>
            {{ $t("CancelAccept") }}
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mobileStyle">
          <custom-file-group
            :labels="TitleFileTypeList"
            @change="ChangeFile1"
            :items="AthletePassport.FileTables"
            @delete="
              (el) => {
                AthletePassport.FileTables = el;
              }
            "
          ></custom-file-group>
        </b-col>
      </b-row>
      <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Approve") }}
          <b-spinner v-if="ApproveLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
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
      <b-modal :ref="'SendModal'" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Send") }}
          <b-spinner v-if="SendLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("WantSend") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['SendModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Send">
              {{ $t("Accept") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal :ref="'CancelAcceptModal'" hide-footer no-close-on-backdrop>
        <template #modal-title>
          {{ $t("CancelAccept") }}
          <b-spinner v-if="CancelAcceptLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("WantCancel") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['CancelAcceptModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="CancelAccept">
              {{ $t("Accept") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal :ref="'AcceptModal'" size="lg" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Accept") }}
          <b-spinner v-if="AcceptLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("WantAccept") }}</h5>
          <div class="form-group form-row mt-3">
            <label class="col-form-label col-sm-3" for>{{
              $t("DocDate")
            }}</label>
            <div class="col-sm-9">
              <!-- <date-picker
                v-model="Acceptfilter.DocDate"
                style="width: 100%"
                size="sm"
                lang="ru"
                :placeholder="$t('DocDate')"
                value-type="format"
                format="DD.MM.YYYY"
                class="fname-select"
              >
              </date-picker> -->
              <custom-date-picker
                v-model="Acceptfilter.DocDate"
                @keyup="BindValueApplicationEnd"
                format="DD.MM.YYYY"
                style="width: 100%"
                size="sm"
                lang="ru"
                type="date"
                :placeholder="$t('DocDate')"
              >
              </custom-date-picker>
            </div>
          </div>
          <div class="form-group form-row mt-3">
            <label class="col-form-label col-sm-3" for>{{
              $t("AthletepassportSeriesId")
            }}</label>
            <div class="col-sm-9">
              <v-select
                class="w-100"
                :options="AthletepassportSerieslist"
                v-model="Acceptfilter.AthletepassportSeriesId"
                :reduce="(item) => item.id"
                disabled
                :placeholder="$t('ChooseBelow')"
                label="name"
              >
              </v-select>
            </div>
          </div>
          <div class="form-group form-row mt-3">
            <label class="col-form-label col-sm-3" for>{{
              $t("Docnumber")
            }}</label>
            <div class="col-sm-9">
              <b-form-input
                type="number"
                :placeholder="$t('Docnumber')"
                v-model="Acceptfilter.Docnumber"
                v-mask="'#######'"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row mt-3">
            <label class="col-form-label col-sm-3" for>{{
              $t("isoldathletepassport")
            }}</label>
            <div class="col-sm-9">
              <b-form-checkbox
                v-model="Acceptfilter.isoldathletepassport"
                switch
                class="mt-2"
              ></b-form-checkbox>
            </div>
          </div>
          <div
            v-if="Acceptfilter.isoldathletepassport"
            class="form-group form-row mt-3"
          >
            <label class="col-form-label col-sm-3" for>{{
              $t("oldathletepassportserial")
            }}</label>
            <div class="col-sm-9">
              <b-form-input
                :placeholder="$t('oldathletepassportserial')"
                v-model="Acceptfilter.oldathletepassportserial"
                v-mask="'AAA'"
                style="text-transform: uppercase"
              />
            </div>
          </div>
          <div
            v-if="Acceptfilter.isoldathletepassport"
            class="form-group form-row mt-3"
          >
            <label class="col-form-label col-sm-3" for>{{
              $t("oldathletepassportnumber")
            }}</label>
            <div class="col-sm-9">
              <b-form-input
                type="number"
                :placeholder="$t('oldathletepassportnumber')"
                v-model="Acceptfilter.oldathletepassportnumber"
                v-mask="'#####'"
              />
            </div>
          </div>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['AcceptModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Accept">
              {{ $t("Accept") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal :ref="'RejectModal'" size="lg" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Reject") }}
          <b-spinner v-if="RejectLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("WantReject") }}</h5>
          <div class="form-group form-row mt-3">
            <label class="col-form-label col-sm-3" for>{{
              $t("Reason")
            }}</label>
            <div class="col-sm-9">
              <v-select
                class="w-100"
                :options="Reasonlist"
                v-model="filter.ReasonId"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              >
              </v-select>
            </div>
          </div>
          <div class="form-group form-row mt-3">
            <label class="col-form-label col-sm-3" for>{{
              $t("comment")
            }}</label>
            <div class="col-sm-9">
              <b-form-textarea
                :placeholder="$t('Reason')"
                v-model="filter.Reason"
              ></b-form-textarea>
            </div>
          </div>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['RejectModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Reject">
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
      <b-row class="mt-3">
        <b-col sm="12" lg="6" md="6">
          <h4>{{ $t("EduSportSchoolTable") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            :fields="EduSportSchoolfields"
            :items="AthletePassport.EduSportSchoolTable"
            class="text-center"
            head-variant="light"
            sticky-header
            style="vertical-align: middle"
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
            <template v-slot:empty>
              <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" lg="6" md="6">
          <h4>{{ $t("Coachtabrow") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            :fields="coachfields"
            :items="AthletePassport.CoachTables"
            class="text-center"
            head-variant="light"
            sticky-header
            style="vertical-align: middle"
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
            <template #cell(isfirstcoach)="{ item }">
              <CBadge :color="getItemColor1(item.isfirstcoach)">{{
                item.isfirstcoach ? $t("yess") : $t("noo")
              }}</CBadge>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" lg="6" md="6">
          <h4>{{ $t("EduTables") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            :fields="EduTablesfields"
            :items="AthletePassport.EduTables"
            class="bg-color-table text-center"
            style="vertical-align: middle"
            head-variant="light"
            sticky-header
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" lg="6" md="6">
          <h4>{{ $t("AchievementTables") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            :fields="AchievementTablesfields"
            :items="AthletePassport.AchievementTables"
            class="bg-color-table text-center"
            head-variant="light"
            sticky-header
            style="vertical-align: middle"
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" lg="6" md="6">
          <h4>{{ $t("TeamActivityTables") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            :fields="TeamActivityTablesfields"
            :items="AthletePassport.TeamActivityTables"
            class="bg-color-table text-center"
            style="vertical-align: middle"
            head-variant="light"
            sticky-header
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
          </b-table>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="12" lg="6" md="6">
          <h4>{{ $t("EduSchoolTable") }}</h4>
        </b-col>
        <b-col class="text-right"> </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b-table
            :fields="EduSchoolTablefields"
            :items="AthletePassport.EduSchoolTable"
            class="bg-color-table text-center"
            style="vertical-align: middle"
            head-variant="light"
            sticky-header
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
            <template v-slot:empty>
              <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="12">
          <history-detail-info
            :history="AthletePassport.History"
          ></history-detail-info>
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
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import AthletePassportService from "@/services/AthletePassport.service";
import ReturnReasonTypeService from "@/services/ReturnReasonType.service";
import AthletePassportSeriesService from "@/services/AthletePassportSeries.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
import FileManageService from "@/services/filemanage.service";
import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
import CustomDatePicker from "@/components/customDatePicker.vue";
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
    CustomFileGroup,
    HistoryDetailInfo,
    CustomDatePicker
  },
  watch: {
    isImage(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false;
        this.isCanvas = false;
      }
    },
    isCanvas(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false;
        this.isImage = false;
      }
    },
    isVideo(newValue, oldValue) {
      if (newValue) {
        this.isImage = false;
        this.isCanvas = false;
      }
    },
  },
  data() {
    return {
      Reasonlist: [],
      isImage: true,
      TitleFileTypeList: [],
      AthletepassportSerieslist: [],
      ApproveLoading: false,
      SendLoading: false,
      AcceptLoading: false,

      RejectLoading: false,
      CancelApprovalLoading: false,
      CancelAcceptLoading: false,
      show: false,
      AthletePassport: {},
      SaveLoading: false,
      studentvalue: {},
      filter: {
        AthletePassportId: 0,
        ReasonId: 0,
        Reason: "",
      },
      Acceptfilter: {
        AthletePassportId: 0,
        AthletepassportSeriesId: 0,
        DocDate: "",
        Docnumber: "",
        isoldathletepassport: false,
        oldathletepassportserial: "",
        oldathletepassportnumber: "",
      },
      lang: localStorage.getItem("locale") || "ru",
      EduSportSchoolfields: [
        {
          key: "oblastname",
          label: this.$t("oblast"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("region"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        // { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      coachfields: [
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "dateofacception",
          label: this.$t("dateofacception"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "coachworkplacename",
          label: this.$t("coachworkplacename"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "isfirstcoach",
          label: this.$t("isfirstcoach"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      EduTablesfields: [
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifier"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitle"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitleissuedate",
          label: this.$t("sporttitleissuedate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttitleissueorgname",
          label: this.$t("sporttitleissueorg"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      AchievementTablesfields: [
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventtypename",
          label: this.$t("sporteventtype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "competitiontypename",
          label: this.$t("competitiontype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifier"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifierdisciplinename",
          label: this.$t("sporttypeclassifierdiscipline"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "achievement",
          label: this.$t("achievementname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasurename"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sportrankname",
          label: this.$t("sportrank"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      TeamActivityTablesfields: [
        {
          key: "sportteamtypename",
          label: this.$t("competitionlevelname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportteamsquadtypename",
          label: this.$t("sportteamsquadtypename"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "squadacceptancedate",
          label: this.$t("squadacceptancedate"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "squaddismissaldate",
          label: this.$t("squaddismissaldate"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "coachname",
          label: this.$t("coachname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      EduSchoolTablefields: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
    };
  },
  created() {
    this.show = true;
    AthletePassportService.Get(this.$route.params.id)
      .then((res) => {
        this.AthletePassport = res.data;
        this.TitleFileTypeList = res.data.table.Tables;
        this.person = res.data.Person;
        this.show = false;
        AthletePassportSeriesService.GetAll(this.AthletePassport.oblastid).then(
          (res) => {
            this.AthletepassportSerieslist = res.data;
            this.Acceptfilter.AthletepassportSeriesId =
              this.AthletepassportSerieslist[0].id;
          }
        );
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, this.$t("error"), "danger");
      });
    ReturnReasonTypeService.GetAll().then((res) => {
      this.Reasonlist = res.data;
    });
  },
  methods: {
    getItemColor1(text) {
      return text === true
        ? "success"
        : text === false
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "danger";
    },
    Approve() {
      this.ApproveLoading = true;
      AthletePassportService.Approve(this.AthletePassport.id)
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

    savePhoto() {
      let obj = {
        target: {
          files: [this.DataURIToBlob(this.canvasImage)],
        },
      };
      var formData = new FormData();
      formData.append("attachfile", obj.target.files[0], "image.jpeg");
      if (!!obj.target.files[0]) {
        if (obj.target.files[0].size < 204800) {
          this.FileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.AthletePassport.Person.PersonPhoto.attachmentfileid =
                res.data.id;
              this.AthletePassport.Person.PersonPhoto.attachmentfilename =
                res.data.pfiletext;
              this.AthletePassport.Person.PersonPhoto.attachmentfiletype =
                res.data.pfiletype;

              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.url = URL.createObjectURL(file);

              // console.log("---------", this.FileAttach.url);
              // console.log("---------", res);
              // this.DownloadFile();

              let text =
                this.AthletePassport.Person.PersonPhoto.attachmentfilename;
              let result = text.slice(-3);
              this.filetype = result;
            })
            .catch((error) => {
              this.FileLoading = false;
              this.makeToast(
                error.response.data.error,
                this.$t("error"),
                "danger"
              );
            });
        } else {
          this.makeToast(
            this.$t("FileSizeLargerThan200kb"),
            this.$t("error"),
            "danger"
          );
        }
      }

      this.isImage = true;
    },
    Send() {
      this.SendLoading = true;
      AthletePassportService.Send(this.AthletePassport.id)
        .then((res) => {
          this.SendLoading = false;
          this.$refs["SendModal"].hide();
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
    ChangeFile1(event, item) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.AthletePassport.FileTables.push({
              id: 0,
              ownerid: 0,
              attachmentfileid: res.data.id,
              attachmentfilename: item.fullname,
              attachmentfiletype: res.data.pfiletype,
              tablefileconfigid: item.id,
              Status: 1,
            });
            this.FileAttach.attachmentfileid = res.data.id;
            this.FileAttach.attachmentfilename = res.data.pfiletext;
            this.FileAttach.attachmentfiletype = res.data.pfiletype;
            this.FileAttach.url = URL.createObjectURL(file);
            this.fileLoading = false;
            alert(index);
          })
          .catch((error) => {
            this.fileLoading = false;
            this.makeToast(
              error.response.data.error,
              this.$t("error"),
              "danger"
            );
          });
      } else {
        this.makeToast(
          this.$t("FileSizeLargerThan4mb", { mb: item.maxsize }),
          this.$t("error"),
          "danger"
        );
      }
    },
    OpenCancelAcceptModal() {
      this.$refs["CancelAcceptModal"].show();
    },
    CancelAccept() {
      this.CancelAcceptLoading = true;
      AthletePassportService.CancelAccept(this.AthletePassport.id)
        .then((res) => {
          this.CancelAcceptLoading = false;
          this.$refs["CancelAcceptModal"].hide();
          this.makeToast(
            this.$t("CancelAcceptSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.CancelAcceptLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    Accept() {
      this.AcceptLoading = true;
      AthletePassportService.Accept(
        this.AthletePassport.id,
        this.Acceptfilter.AthletepassportSeriesId,
        this.Acceptfilter.DocDate,
        this.Acceptfilter.Docnumber,
        this.Acceptfilter.isoldathletepassport,
        this.Acceptfilter.oldathletepassportserial,
        this.Acceptfilter.oldathletepassportnumber
      )
        .then((res) => {
          this.AcceptLoading = false;
          this.$refs["AcceptModal"].hide();
          this.makeToast(
            this.$t("ApproveSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.AcceptLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },

    Reject() {
      this.RejectLoading = true;
      this.filter.AthletePassportId = this.AthletePassport.id;
      AthletePassportService.Reject(
        this.filter.AthletePassportId,
        this.filter.ReasonId,
        this.filter.Reason
      )
        .then((res) => {
          this.RejectLoading = false;
          this.$refs["RejectModal"].hide();
          this.makeToast(
            this.$t("ApproveSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.RejectLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      AthletePassportService.CancelApproval(this.AthletePassport.id)
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
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenSendModal() {
      this.$refs["SendModal"].show();
    },
    BindValueApplicationEnd(value) {
      this.Acceptfilter.DocDate = value;
    },
    OpenAcceptModal() {
      this.$refs["AcceptModal"].show();
      AthletePassportService.GetAthletePassportNextDocNumber().then((res) => {
        this.Acceptfilter.Docnumber = res.data;
      });
    },
    OpenRejectModal() {
      this.$refs["RejectModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Back() {
      this.$router.push({
        name: "AthletePassportSendList",
        query: this.$route.query,
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