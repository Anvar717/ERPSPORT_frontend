<template>
  <b-overlay :show="show">
    <b-card v-loading="loading" class="mt-3">
      <b-row>
        <b-col sm="12" md="3">
          <b-button variant="danger" @click="$router.push({ name: 'SportCompetition' })"> {{ $t('back') }}</b-button>
        </b-col>
        <b-col sm="12" md="6">
          <h3 class="text-center w-100">{{ $t("SportCompetition") }} : <span style="font-size:22px"> {{
            this.mainPart.docnumber }} {{ this.mainPart.competitionname }} </span> </h3>
          <p v-if="SportCompetition && SportCompetition.mainPart" class="text-center w-100 sportcompetitiontypeClass"> {{
            $t('sportcompetitiontype') }}: <b>{{ SportCompetition.mainPart.sportcompetitiontypename }}</b></p>
        </b-col>
        <b-col sm="12" md="3">
        </b-col>
      </b-row>
      <div class="overflovWidth">
        <div class="regProgress mb-5">
          <div class="centerLine"></div> <!-- add this line -->
          <ul>
            <template v-for="(item, index) in SportCompetition.Steps">
              <li :key="index"
                :class="{ 'active': currentTabIndex == Number(item.ordernumber), 'visited': item.isfilled && currentTabIndex != Number(item.ordernumber), 'approved': item.isapproved && currentTabIndex != Number(item.ordernumber) }"
                @click="goToStep(Number(item.ordernumber))">
                <span class="label" :class="{ 'font-weight-bold': currentTabIndex == Number(item.ordernumber) }">{{
                  item.shortname }}</span>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <!--  -->
      <b-card class="mt-2" v-if="currentTabIndex == 1">
        <b-row>
          <b-col>
            <h4>{{ $t("SportCompetition") }}</h4>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("docnumber") }} </label>
            <b-form-input disabled v-model="mainPart.docnumber"></b-form-input>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("ihincomedate") }} </label>
            <date-picker v-model="mainPart.docdate" style="width: 100%" size="sm" disabled lang="ru"
              :placeholder="$t('ihincomedate')" value-type="format" format="DD.MM.YYYY">
            </date-picker>
          </b-col>

          <b-col sm="12" md="4" class="mt-2">
            <label class="col-form-label col-sm-6" for>{{
              $t("issporteventcalendar")
            }}</label>
            <b-form-checkbox v-model="mainPart.issporteventcalendar" @change="Changesporteventcalendar" switch
              class="ml-4"></b-form-checkbox>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("Sport turi") }} </label>
            <v-select :options="sporttypeclassifierlist" v-model="mainPart.sporttypeclassifierid"
              :reduce="(item) => item.id" :disabled="!!isFilled" :placeholder="$t('ChooseBelow')"
              @input="onSelectSportTypeClassifier" label="name"></v-select>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("SportEventType") }} </label>
            <v-select :options="sporteventtypelist" v-model="mainPart.sporteventtypeid" :reduce="(item) => item.id"
              @input="changeEventtype" :disabled="!!isFilled" :placeholder="$t('ChooseBelow')" label="name"></v-select>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("competitiontype") }} </label>
            <v-select :options="competitiontypelist" @input="changecompetitiontype" :disabled="!!isFilled"
              v-model="mainPart.competitiontypeid" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
              label="name"></v-select>
          </b-col>
          <b-col v-if="!mainPart.issporteventcalendar" sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("SportEvent") }} </label>
            <v-select :options="sporteventlist" v-model="mainPart.sporteventid" @input="onSelectSportEvent"
              :disabled="!!isFilled" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="name"></v-select>
          </b-col>

          <b-col sm="12" md="4" class="mt-2" v-if="mainPart.issporteventcalendar">
            <div class="form-group">
              <label for="datepicker-dateformat2" class="col-form-label">{{
                $t("CalendarPlan")
              }}</label>
              <div>
                <CInput class="mr-2" style="width: 100%" disabled v-model="mainPart.sporteventcalendarname">
                  <template #append>
                    <b-button size="sm" variant="primary" @click="OpenPlanModal">
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </template>
                </CInput>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("competitionname") }} </label>
            <CInput class="mr-2" style="width: 100%" v-model="mainPart.competitionname" :disabled="!!isFilled">
              <template #append>
                <b-button size="sm" variant="primary" @click="translate('competitionname')">
                  <b-icon icon="globe2"></b-icon>
                </b-button>
              </template>
            </CInput>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <div class="d-flex">
              <div class="mr-2">
                <label for=""> {{ $t("startdate") }} </label>
                <date-picker v-model="mainPart.startdate" :disabled-date="DisabledDateForStartdate" style="width: 100%"
                  size="sm" lang="ru" :placeholder="$t('startdate')" value-type="format" format="DD.MM.YYYY">
                </date-picker>
              </div>
              <div>
                <label for=""> {{ $t("enddate") }} </label>
                <date-picker v-model="mainPart.enddate" :disabled-date="DisabledDateForEnddate" style="width: 100%"
                  size="sm" lang="ru" :placeholder="$t('enddate')" value-type="format" format="DD.MM.YYYY">
                </date-picker>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <b-button variant="success" v-if="!isApproved" class="mr-2" @click="SaveMainPart" :disabled="SaveLoading">
              <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
            <!-- <b-button variant="success" v-if="!isApproved && isFilled" :disabled="!SportCompetition.result && !!SportCompetition.result.length" class="mr-2" @click="AcceptMainPart"> {{ $t('finishCompetition') }} </b-button> -->
            <b-button variant="primary" v-if="isFilled" @click="nextStep"> {{ $t('next') }} </b-button>
          </b-col>
        </b-row>
      </b-card>
      <div v-for="i in 15" :key="i">
        <div class="mt-2" v-if="currentTabIndex && (currentTabIndex == (i + 1))">
          <component :is="'step'+currentTabIndex" :SportCompetition="SportCompetition" @GetAction="GetAction" :uid="uid"
            ref="stepComponent" @next="nextStep"
            :sportcompetitionindicator="SportCompetition.sportcompetitionindicator" />
        </div>
      </div>
      <custom-file-group v-if="SportCompetition && SportCompetition.Steps && fileStepTable && fileStepTable.length"
        :labels="fileStepTable" @change="ChangeFile1" :items="FileTables"></custom-file-group>
      <!--  -->
      <div class="d-flex" v-if="SportCompetition && SportCompetition.Steps && currentStep">
        <div class="my-3 mt-1 mr-2" v-for="(i, index) in currentStep.FileTables" :key="index">
          <b-button-group size="sm" v-if="i.Status != 3">
            <b-button @click="DownloadFile(i)" variant="primary"><b-icon v-if="DownloadLoading != i.attachmentfileid"
                icon="download"></b-icon>
              <b-spinner small v-if="DownloadLoading == i.attachmentfileid"></b-spinner>
            </b-button>
            <b-button variant="primary">{{ i.attachmentfilename }}</b-button>
            <b-button @click="DeleteFile(i, index)" variant="danger"><b-icon v-if="DeleteLoading != i.attachmentfileid"
                icon="trash">
                <b-spinner small v-if="DeleteLoading == i.attachmentfileid"></b-spinner> </b-icon></b-button>
          </b-button-group>
        </div>
      </div>
    </b-card>

    <b-modal id="PlanModal" no-close-on-backdrop size="xl" :title="$t('CalendarPlan')" hide-footer
      modal-class="custom-size-modal" scrollable>
      <calendar-plan-list @SelectedItem="SelectedItem" @DblClick="AddPlanData" :sporteventid="mainPart.sporteventid"
        :competitiontypeid="mainPart.competitiontypeid" :sporteventtypeid="mainPart.sporteventtypeid"
        :sporttypeclassifierid="mainPart.sporttypeclassifierid" isComponent />

      <c-row class="mt-2">
        <c-col class="text-center">
          <b-button class="mr-2" variant="danger" @click="ClosePlanModal">
            {{ $t("back") }}
          </b-button>
          <b-button variant="primary" @click="AddPlanData(planvalue)">
            {{ $t("Add") }}
          </b-button>
        </c-col>
      </c-row>
    </b-modal>
    <!--  -->
    <CModal :title="$t('translate')" :show.sync="translatemodal" size="lg" :closeOnBackdrop="false">
      <b-table :fields="translitefields" :items="translatelist" class="bg-color-table text-center"
        style="vertical-align:middle" bordered responsive="sm">
        <template v-slot:thead-top>
          <b-tr>
            <b-th style="width:30%">
              <v-select :placeholder="$t('ChooseBelow')" class="mb-0" :options="languagelist" :reduce="(item) => item.id"
                label="name" v-model="translaterow.languageid" style="z-index:9999"></v-select>
            </b-th>
            <b-th style="width:60%">
              <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
            </b-th>
            <b-th style="width:10%">
              <CButton @click="addtranslite" color="primary" variant="outline" class="text-center mx-auto d-block">
                <b-icon icon="plus"> </b-icon>
              </CButton>
            </b-th>
          </b-tr>
        </template>
        <template v-slot:cell(translatetext)="{ item }">
          <CInput v-model="item.translatetext" class="mb-0"></CInput>
        </template>
      </b-table>
      <template #footer>
        <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
          <b-icon icon="check2"></b-icon>
          {{ $t("Save") }}
        </CButton>
      </template>
    </CModal>
  </b-overlay>
</template>

<script>
import { BOverlay, BCard, BRow, BCol, BFormInput, BButton, BTable } from "bootstrap-vue";
import SportCompetitionService from "@/services/SportCompetition.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportEventTypeService from "@/services/SportEventType.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventService from "@/services/SportEvent.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import EmployeeList from "@/components/EmployeeList";
import PersonList from "@/components/PersonList";
import CustomDatePicker from "../../../components/customDatePicker.vue";
import CalendarPlanList from "../../../components/Musobaqa/CalendarPlanList.vue";
import HelperService from "@/services/helper.service";
import FileManageService from "@/services/filemanage.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";

export default {
  components: {
    BOverlay, BCard, BRow, BCol, BFormInput, DatePicker, vSelect, BButton, BTable, PersonList, EmployeeList, CustomDatePicker, CalendarPlanList, CustomFileGroup,
    step2: () => import("./components/step2.vue"),  // Musobaqaning o'tkazish joyi
    step3: () => import("./components/step3.vue"),  // Musobaqaning sport dasturlari
    step4: () => import("./components/step4.vue"),  // Ҳакамлар ҳайъати сони
    step5: () => import("./components/step5.vue"),  // Musobaqada qatnashuvchi xodimlar soni
    step6: () => import("./components/step6.vue"),  // Мусобақада қатнашувчи ташкилотлар
    step7: () => import("./components/step7.vue"),  // Musobaqa qatnashuvchilariga qo'yiladigan talablar
    step8: () => import("./components/step8.vue"),  // Musobaqaning moliyalashtirish manbalari
    step9: () => import("./components/step9.vue"),  // Musobaqa xarajatlari
    step10: () => import("./components/step10.vue"),// Hakamlar hay'ati tarkibi
    step11: () => import("./components/step11.vue"),// Musobaqaning xodimlar tarkibi
    // step12: () => import("./components/step12.vue"),// Мусобақанинг норматив хужжатлари
    step13: () => import("./components/step13.vue"),// Musobaqada qatnashuvchi sportchilar ro'yxati
    step14: () => import("./components/step14.vue"),// Musobaqa natijalarini kiritish
    step15: () => import("./components/step15.vue"),// Musobaqa g'oliblarini kiritish
  },
  data() {
    return {
      FileTables: [],
      DownloadLoading: false,
      DeleteLoading: false,
      currentTabIndex: 1,
      show: false,
      firstMainInfo: null,
      financialyearlist: [],
      sporttypeclassifierlist: [],
      sporteventtypelist: [],
      sporteventlist: [],
      oblastlist: [],
      competitiontypelist: [],
      SaveLoading: false,
      PlanModal: false,
      loading: false,
      SportCompetition: {},
      planvalue: {},
      lang: "ru",
      mainPart: {},
      uid: "",
      translatemodal: false,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],
      sportCompetitionTypes: [],
      TranslatableColumns: [],
      items1: [],
      items2: [],
      items: [],
      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      translatebyname: "",
    };
  },
  async created() {
    // console.log(this.$route);
    this.show = true;
    this.lang = localStorage.getItem("locale") || "ru";
    this.uid = this.$route.query.uid || ''
    SportCompetitionService.GetMainPart(this.uid, this.$route.query.sportCompetitionType).then(res => {
      this.mainPart = res.data
      this.firstMainInfo = JSON.stringify(res.data)
    })
    this.GetAction()
    HelperService.GetLanguageList().then(res => {
      this.languagelist = res.data;
    });
    HelperService.GetAllSportCompetitionType().then(res => {
      this.sportCompetitionTypes = res.data;
    });
    SportTypeClassifierService.GetAll(true)
      .then((res) => {
        this.sporttypeclassifierlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportEventTypeService.GetAll()
      .then((res) => {
        this.sporteventtypelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    this.getSportCompetitions()
    this.getSportEventList()
  },
  computed: {
    fileStepTable() {
      return this.SportCompetition.Steps.find(el => el.ordernumber == this.currentTabIndex)?.Table?.Tables
    },
    currentStep() {
      return this.SportCompetition.Steps.find(el => el.ordernumber == this.currentTabIndex)
    },

    newSportCompetitionCreated() {
      return !!(this.$route.params.id == 0 && this.$route.query.uid)
    },
    isApproved() {
      let isapproved = false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isapproved = this.SportCompetition.Steps[0].isapproved
      }
      return isapproved
    },
    isFilled() {
      let isfilled = false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isfilled = this.SportCompetition.Steps[0].isfilled
      }
      return isfilled
    },
    isNewAdded() {
      let oldTable = this.firstMainInfo
      let newTable = JSON.stringify(this.mainPart)
      if (this.SportCompetition.Steps[0].isfilled && oldTable != newTable) {
        return true
      }
      return false
    }
  },
  watch: {
    // 'mainPart.issporteventcalendar'(newVal) {
    //   this.mainPart.sporteventid = null
    //   this.mainPart.sporteventname = null
    // }
  },
  methods: {
    Changesporteventcalendar() {
      this.mainPart.sporteventid = null
      this.mainPart.sporteventname = null
    },
    DisabledDateForEnddate(date) {
      if (!!this.mainPart.startdate) {
        var arr = this.mainPart.startdate.split('.')
        return date < new Date(arr[2], arr[1] - 1, arr[0])
      }
    },
    DisabledDateForStartdate(date) {
      if (!!this.mainPart.enddate) {
        var arr = this.mainPart.enddate.split('.')
        return date > new Date(arr[2], arr[1] - 1, arr[0])
      }
    },
    getSportCompetitions() {
      CompetitionTypeService.GetAll(this.mainPart.sporteventtypeid, this.lang)
        .then((res) => {
          // this.mainPart.competitiontypeid = null
          this.competitiontypelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.mainPart.Translates.filter(
        (item) => item.columnname == selectcolumnname
      );
      this.translaterow = {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      }
      self.translatemodal = true;
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        this.makeToast(
          this.$t("languageidNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        this.makeToast(
          this.$t("translatetextNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else {
        var dublikate = false;
        self.translatelist.forEach((item) => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function (
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: "",
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.mainPart.Translates = self.mainPart.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.mainPart.Translates.push(item);
      });
      self.translatemodal = false;
    },
    onSelectSportEvent(item) {
      this.mainPart.sporteventname = this.sporteventlist.filter(el => el.id == this.mainPart.sporteventid)[0].name
      this.getCompetitionName()
    },
    onSelectSportTypeClassifier(item) {
      this.mainPart.sporteventname = null
      this.mainPart.sporteventid = 0
      this.mainPart.sporttypeclassifiername = this.sporttypeclassifierlist.filter(el => el.id == this.mainPart.sporttypeclassifierid)[0].name
      this.getCompetitionName()
    },
    getCompetitionName() {
      this.mainPart.competitionname = (this.mainPart.sporteventname || '') + (!!this.mainPart.sporttypeclassifiername ? (' (' + this.mainPart.sporttypeclassifiername + ') ') : '') + ' ' + this.mainPart.docdate.split('.')[2]
    },
    getSportEventList() {
      SportEventService.GetAll(
        0,
        this.mainPart.sporteventtypeid,
        this.mainPart.competitiontypeid,
        this.lang
      )
        .then((res) => {
          this.sporteventlist = res.data;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("Error"),
            "danger"
          );
        });
    },
    GetAction() {
      this.loading = true
      this.sportCompetitionGet()
    },
    sportCompetitionGet() {
      SportCompetitionService.Get(this.$route.query.uid, this.$route.query.sportCompetitionType)
        .then((res) => {
          this.loading = false
          this.SportCompetition = res.data;
          if (res.data.Steps.filter(element => element.isfilled == false).length) {
            let ordernumber = res.data.Steps.filter(element => element.isfilled == false)[0].ordernumber
            this.currentTabIndex = Number(ordernumber)
          } else {
            this.currentTabIndex = 1
          }
          this.show = false;
        })
        .catch((error) => {
          this.loading = false
          if (error.response) {
            this.makeToast(error.response.data.error, this.$t("Error"), "danger");
          }
        })
        .finally(() => {
          this.loading = false
          this.show = false;
        })
    },
    onTabChange(oldVal, newVal) {
      this.currentTabIndex = newVal;
    },
    SaveMainPart() {
      if (this.mainPart.sporteventid) {
        this.SaveLoading = true;
        SportCompetitionService.UpdateMainPart(this.mainPart)
          .then((res) => {
            this.SaveLoading = false;
            this.uid = res.data.uid;
            this.changeQuery('uid', res.data.uid)
            this.GetAction()
            this.makeToast(this.$t("SavedSuccessfully"), this.$t("message"), "success");
          })
          .catch((error) => {
            this.SaveLoading = false;
            this.makeToast(error.response.data.error, this.$t("Error"), "danger");
          });
      } else {
        this.makeToast(this.$t("selectSportevent"), this.$t("Error"), "danger");
      }
    },
    AcceptMainPart() {
      SportCompetitionService.ApproveMainPart(this.uid)
        .then((res) => {
          this.nextStep();
          this.GetAction()
          this.makeToast(
            this.$t("AcceptedSuccessfully"),
            this.$t("message"),
            "success"
          );
        })
        .catch((error) => {
          this.SaveLoading = false;
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    },
    nextStep() {
      let item = this.SportCompetition.Steps.find(el => el.ordernumber == this.currentTabIndex)
      let goToIndex = this.SportCompetition.Steps.indexOf(item)
      if (goToIndex != this.SportCompetition.Steps.length - 1) {
        this.currentTabIndex = this.SportCompetition.Steps[goToIndex + 1].ordernumber
      }
    },
    goToStep(step) {
      if (this.$route.query.uid) {
        if (this.$refs && this.$refs.stepComponent && this.$refs.stepComponent[0] && (this.$refs.stepComponent[0].isNewAdded ||
          ((JSON.stringify(this.$refs.stepComponent[0].firstList) < JSON.stringify(this.$refs.stepComponent[0].step1list)) && (JSON.stringify(this.$refs.stepComponent[0].firstList) != JSON.stringify(this.$refs.stepComponent[0].step1list))))) {
          this.$confirm(this.$t('areYouSureWithUnsavedDates'), this.$t('warning'), {
            confirmButtonText: this.$t('yes'),
            cancelButtonText: this.$t('no'),
            type: 'warning'
          }).then(() => {
            this.currentTabIndex = step;
          }).catch(() => {
            return false
          });
          return false
        }
        this.currentTabIndex = step;
      } else {
        this.makeToast(this.$t("pleaseFirstFillSportCompetition"), this.$t("Error"), "danger");
      }
    },
    changecompetitiontype() {
      this.mainPart.sporteventid = 0;
      this.mainPart.sporteventname = null
      this.sporteventlist = [];
      this.getSportEventList()
      this.getCompetitionName()
    },
    changeEventtype() {
      this.mainPart.sporteventid = 0;
      this.mainPart.sporteventname = null
      this.sporteventlist = [];
      this.getSportEventList()
      this.getSportCompetitions()
      this.getCompetitionName()
    },
    OpenPlanModal() {
      var self = this;

      if (!this.mainPart.sporttypeclassifierid) {
        self.makeToast(
          self.$t("sporttypeclassifierNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!this.mainPart.sporteventtypeid) {
        self.makeToast(
          self.$t("sporteventtypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!this.mainPart.competitiontypeid) {
        self.makeToast(
          self.$t("competitiontypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.mainPart.issporteventcalendar == false) {
        if (!this.mainPart.sporteventid) {
          self.makeToast(
            self.$t("sporteventidNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      self.$bvModal.show("PlanModal");
      return true;
    },
    SelectedItem(data) {
      this.planvalue = data;
    },
    ClosePlanModal() {
      this.$bvModal.hide("PlanModal");
    },
    AddPlanData(data) {
      this.mainPart.sporteventid = data.sporteventid;
      this.mainPart.sporteventname = data.sporteventname;
      this.mainPart.competitiontypeid = data.competitiontypeid;
      this.mainPart.sporteventtypeid = data.sporteventtypeid;
      this.mainPart.sporttypeclassifierid = data.sporttypeclassifierid;
      this.mainPart.sporteventcalendarname = data.sporteventname;
      this.mainPart.sporteventcalendarid = data.id; 
      this.getCompetitionName()
      this.ClosePlanModal();
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            let data = {
              sportCompetitionUId: this.uid,
              tableId: this.currentStep.tableid,
              fileTable: {
                id: 0,
                ownerid: 0,
                attachmentfileid: res.data.id,
                attachmentfilename: item.fullname,
                attachmentfiletype: res.data.pfiletype,
                tablefileconfigid: item.id,
                Status: 1,
              }
            }
            SportCompetitionService.StepInfoUpdateFile(data).then(res => {
              this.makeToast(
                this.$t("fileAttached"),
                this.$t("message"),
                "success"
              );
              SportCompetitionService.Get(this.$route.query.uid, this.$route.query.sportCompetitionType)
                .then((res) => {
                  this.loading = false
                  this.SportCompetition = res.data;
                })
            }).catch(error => {
              this.makeToast(error.response.data.error, this.$t("Error"), "danger");
              return false;
            })
            // this.currentStep.isfilled = false
            this.FileAttach.attachmentfileid = res.data.id;
            this.FileAttach.attachmentfilename = res.data.pfiletext;
            this.FileAttach.attachmentfiletype = res.data.pfiletype;
            this.FileAttach.url = URL.createObjectURL(file);
            this.fileLoading = false;
          })
          .catch((error) => {
            this.fileLoading = false;
            if (error.response) {
              this.makeToast(
                error.response.data.error,
                this.$t("error"),
                "danger"
              );
            }
          })
          .finally(() => {
            this.fileLoading = false;
          })
      } else {
        this.makeToast(
          this.$t("FileSizeLargerThan4mb", { mb: item.maxsize }),
          this.$t("error"),
          "danger"
        );
      }
    },
    check() {
      var self = this;

      if (!self.SportCompetition.docnumber) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!self.SportCompetition.docdate) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (!self.SportCompetition.sporteventcalendarid) {
        this.makeToast(
          this.$t("CalendarPlanNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.SportCompetition.issporteventcalendar == false) {
        if (!self.SportCompetition.sporttypeclassifierid) {
          this.makeToast(
            this.$t("sporttypeclassifierNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.SportCompetition.issporteventcalendar == false) {
        if (!self.SportCompetition.competitionlevelid) {
          this.makeToast(
            this.$t("competitionlevelidNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.SportCompetition.issporteventcalendar == false) {
        if (!self.SportCompetition.sporteventtypeid) {
          this.makeToast(
            this.$t("sporteventtypeidNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.SportCompetition.issporteventcalendar == false) {
        if (!self.SportCompetition.sporteventid) {
          this.makeToast(
            this.$t("sporteventidNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.SportCompetition.issporteventcalendar == false) {
        if (!self.SportCompetition.competitiontypeid) {
          this.makeToast(
            this.$t("competitiontypeidNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (
        self.SportCompetition.sportcompetitionindicator.filter(
          (item) => item.Status != 3
        ).length === 0
      ) {
        self.makeToast(
          self.$t("FileTables1NotFilled"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportCompetition.sportcompetitionsportdiscipline.filter(
          (item) => item.Status != 3
        ).length === 0
      ) {
        self.makeToast(
          self.$t("FileTables2NotFilled"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportCompetition.sportcompetitionjurystaffing.filter(
          (item) => item.Status != 3
        ).length === 0
      ) {
        self.makeToast(
          self.$t("FileTables3NotFilled"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportCompetition.sportcompetitionparticipantrequirement.filter(
          (item) => item.Status != 3
        ).length === 0
      ) {
        self.makeToast(
          self.$t("FileTables4NotFilled"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
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
    DownloadFile(item) {
      this.DownloadLoading = item.attachmentfileid;
      FileManageService.Get(item.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(
            res,
            item.attachmentfilename + "." + item.attachmentfileid.split(".")[1]
          );
        })
        .catch((error) => {
          this.DownloadLoading = "";
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    DeleteFile(item, index) {
      this.$confirm(this.$t('areYouReallyWantToDeleteFile'), this.$t('warning'), {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('no'),
        type: 'warning'
      }).then(() => {
        let data = {
          sportCompetitionUId: this.uid,
          tableId: this.currentStep.tableid,
          fileTable: {
            id: item.id,
            ownerid: item.ownerid,
            attachmentfileid: item.attachmentfileid,
            attachmentfilename: item.fullname,
            attachmentfiletype: item.attachmentfiletype,
            tablefileconfigid: item.id,
            Status: 3,
          }
        }
        SportCompetitionService.StepInfoDeleteFile(data)
          .then((res) => {
            this.makeToast(
              this.$t("fileDeletedSuccessfully"),
              this.$t("message"),
              "success"
            );
            SportCompetitionService.Get(this.$route.query.uid, this.$route.query.sportCompetitionType)
              .then((res) => {
                this.loading = false
                this.SportCompetition = res.data;
              })
          })
          .catch((error) => {
            this.SaveLoading = false;
            this.makeToast(error.response.data.error, this.$t("Error"), "danger");
          });
      }).catch(() => {
        return false
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.overflovWidth {
  overflow: auto;
  height: 145px
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
  {
  transform: translateX(10px);
  opacity: 0;
}

.container {
  display: flex;
  column-gap: 40px;
  max-width: 100%;
}

.scrollbar {
  height: 800px;
  width: 100%;
  overflow: auto;
  padding: 0 2px;
}

#scrollbar2::-webkit-scrollbar {
  width: 12px;
}

#scrollbar2::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e7;
  border: 1px solid #cacaca;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#scrollbar2::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #363636;
}

.regProgress {
  background: #fff;
  padding: 13px 89px;
  border-radius: 8px;
  margin: 0 0 24px;
  position: relative;

  .centerLine {
    position: absolute;
    top: 50%;
    left: 90px;
    width: 145%;
    /* add this line */
    height: 1px;
    background: rgba(41, 71, 169, 0.2);
    z-index: 0;
  }

  ul {
    display: flex;
    padding: 0;
    z-index: 2;
    margin: 0;
    width: 170%;
    justify-content: space-between;
    position: relative;

    li {
      position: relative;
      /* add this line */
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid rgba(41, 71, 169, 0.2);
      background: #fff;
      list-style: none;

      // &::before{
      //   height: 5px;
      //   width: 317%;
      //   background: rgba(41, 71, 169, 0.2);
      //   content: "";
      //   position: absolute;
      //   top: 9px;
      //   z-index: -1;
      // }
      &:last-child {
        &::before {
          display: none;
        }
      }

      &.visited {
        background: #3557C2;
        box-shadow: 0 0 0 3px rgba(53, 87, 194, 0.3);

        &:before {
          background: #414C92;
        }

        &:after {
          width: 100%;
          height: 100%;
          content: "";
          display: block;
        }
      }

      &.approved {
        background: #2EB85C;
        box-shadow: 0 0 0 3px rgba(53, 87, 194, 0.3);

        &:before {
          background: #2EB85C;
        }

        &:after {
          width: 100%;
          height: 100%;
          content: "";
          display: block;
        }
      }

      &.active {
        border-color: #fff;
        box-shadow: 0px 2px 12px rgba(26, 38, 115, 0.26);

        &:after {
          width: 10px;
          height: 10px;
          background: #2947A9;
          border-radius: 50%;
          content: "";
          display: block;
          margin: 6px;
        }
      }
    }

    .label {
      position: absolute;
      top: 30px;
      right: 0;
      text-overflow: ellipsis;
      -webkit-transform: translateX(50%);
      transform: translateX(50%);
      font-size: 14px;
      color: #2947A9;
      width: 200px;
      text-align: center;
      word-wrap: break-word;
    }
  }
}
</style>