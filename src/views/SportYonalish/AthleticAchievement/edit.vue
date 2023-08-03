<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <h3 class="text-center mt-2">
          {{ $t("AthleticAchievement") }}
        </h3>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="docnumber">
                  <label>{{ $t("docnumber") }}</label>
                  <CInput
                    disabled
                    type="number"
                    autocomplete="text"
                    v-model="AthleticAchievement.docnumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="4">
                <label>{{ $t("docdate") }}</label>
                <date-picker
                  v-model="AthleticAchievement.docdate"
                  size="sm"
                  lang="ru"
                  disabled
                  :placeholder="$t('docdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></date-picker>
              </CCol>
              <CCol sm="4">
                <label>{{ $t("Sportchi") }}</label>
                <b-input-group>
                  <b-form-input
                    disabled
                    v-model="AthleticAchievement.personname"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" @click="OpenPersonModal">
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="errors">
                  <label>{{ $t("detail") }}</label>
                  <CInput
                    autocomplete="text"
                    v-model="AthleticAchievement.details"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
            <b-row class="mt-3">
              <h4 class="text-left" style="margin-left: 30px">
                {{ $t("AthleticAchievement") }}
              </h4>
              <b-col class="text-right">
                <b-button variant="primary" @click="OpenModal">
                  {{ $t("Add") }}
                </b-button>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b-table
                  :fields="fields"
                  :items="AthleticAchievement.athleticachievementtable"
                  class="bg-color-table text-center"
                  style="vertical-align: middle"
                  bordered
                  responsive="sm"
                  :tbody-tr-class="rowClass"
                >
                  <template v-slot:empty>
                    <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                  </template>
                  <template #cell(actions)="{ item }">
                    <div class="text-center">
                      <b-link
                        @click="EditItem(item)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Edit') }"
                      >
                        <b-icon icon="pencil"></b-icon>
                      </b-link>
                      <b-link
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Delete') }"
                        @click="Delete(item)"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-link>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-modal
              v-model="AddModal"
              hide-footer
              size="lg"
              no-close-on-backdrop
              :title="$t('AthleticAchievement')"
            >
              <b-row>
                <b-col>
                  <div class="form-group form-row mb-0">
                    <label class="col-form-label col-sm-4">
                      {{ $t("startdate") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <custom-date-picker
                        v-model="tabrow.startdate"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('startdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                        @keyup="BindValue"
                        style="width: 100%"
                      ></custom-date-picker>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <div class="form-group form-row mb-0">
                    <label class="col-form-label col-sm-4">
                      {{ $t("enddate") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <custom-date-picker
                        v-model="tabrow.enddate"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('enddate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                        @keyup="BindValueEndDate"
                        style="width: 100%"
                      ></custom-date-picker>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("sporteventtype") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <v-select
                        class="w-100"
                        :options="sporteventtypelist"
                        v-model="tabrow.sporteventtypeid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="ChangeSportEvent"
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("competitiontype") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <v-select
                        class="w-100"
                        :options="competitiontypelist"
                        v-model="tabrow.competitiontypeid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="ChangeCompetitionType"
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("sporteventname") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <v-select
                        class="w-100"
                        :options="sporteventlist"
                        v-model="tabrow.sporteventid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("sporttypeclassifier") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <v-select
                        class="w-100"
                        :options="sporttypeclassifierlist"
                        v-model="tabrow.sporttypeclassifierid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="Change"
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("sporttypeclassifierdiscipline1") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <v-select
                        class="w-100"
                        :options="sporttypeclassifierdisciplinelist"
                        v-model="tabrow.sporttypeclassifierdisciplineid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="sporttypeclassifierdisciplinename"
                        @input="ChangeSporttypeclassifierdiscipline"
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("achievementname") }}
                    </label>
                    <div class="col-sm-4 d-flex">
                      <b-form-input
                        :placeholder="$t('achievement')"
                        v-model="tabrow.achievement"
                        type="number"
                        :disabled="tabrow.unitofmeasureid <= 0 || null"
                      ></b-form-input>
                    </div>
                    <div class="col-sm-4 d-flex">
                      <v-select
                        class="w-100"
                        :options="unitofmeasurelist"
                        v-model="tabrow.unitofmeasureid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        disabled
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("sportrank") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <v-select
                        class="w-100"
                        :options="sportranklist"
                        v-model="tabrow.sportrankid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <custom-file-group
                    :labels="TitleFileTypeList"
                    @change="ChangeFile1"
                    :items="tabrow.FileTables"
                    @delete="
                      (el) => {
                        tabrow.FileTables = el;
                      }
                    "
                  ></custom-file-group>
                </b-col>
              </b-row>
              <!-- <b-row class="mt-2">
                <b-col>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4">
                      {{ $t("unitofmeasure") }}
                    </label>
                    <div class="col-sm-8 d-flex">
                      <v-select
                        class="w-100"
                        :options="unitofmeasurelist"
                        v-model="tabrow.unitofmeasureid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                      </v-select>
                    </div>
                  </div>
                </b-col>
              </b-row> -->
              <c-row class="mt-2">
                <c-col class="text-center">
                  <b-button
                    class="mr-2"
                    variant="danger"
                    @click="CloseTableModal"
                  >
                    {{ $t("back") }}
                  </b-button>
                  <b-button variant="primary" @click="AddTable">
                    {{ $t("Add") }}
                  </b-button>
                </c-col>
              </c-row>
            </b-modal>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'AthleticAchievement' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                size="sm"
                :disabled="SaveLoading"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal
        id="PersonModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Student')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <sportsmen-list
          persontypeid="1"
          isallperson="false"
          @SelectedItem="SelectedItem"
          @DblClick="AddPersonData"
        ></sportsmen-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddPersonData(personvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import AthleticAchievementService from "@/services/AthleticAchievement.service";
import SportEventTypeService from "@/services/SportEventType.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventService from "@/services/SportEvent.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportRankService from "@/services/SportRank.service";
import SportsmenList from "@/components/SportsmenList";
import CustomDatePicker from "@/components/customDatePicker.vue";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
import FileManageService from "@/services/filemanage.service";
// import OrganizationService from "@/services/organization.service";

export default {
  components: {
    SportsmenList,
    CustomDatePicker,
    CustomFileGroup,
  },
  data() {
    return {
      SaveLoading: false,
      AddModal: false,
      personvalue: {},
      AthleticAchievement: {},
      FileAttach: {},
      lang: "ru",
      editedIndex: -1,
      tabrow: {
        id: 0,
        ownerid: 0,
        FileTables: [],
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        competitiontypeid: 0,
        competitiontypename: "",
        sporteventid: 0,
        sporteventname: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        achievement: "",
        sportrankid: 0,
        sportrankname: "",
        Status: 1,
      },
      sporteventtypelist: [],
      competitiontypelist: [],
      sporteventlist: [],
      sporttypeclassifierlist: [],
      TitleFileTypeList: [],
      sporttypeclassifierdisciplinelist: [],
      sportranklist: [],
      unitofmeasurelist: [],
      selectedrowid: 0,
      fields: [
        {
          key: "startdate",
          label: this.$t("startdate"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventtypename",
          label: this.$t("sporteventtype"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "competitiontypename",
          label: this.$t("competitiontype"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventname",
          label: this.$t("sporteventname"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifier"),
          thStyle: { width: "20%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifierdisciplinename",
          label: this.$t("sporttypeclassifierdiscipline"),
          thStyle: { width: "15%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "achievement",
          label: this.$t("achievementname"),
          thStyle: { width: "30%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasurename"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sportrankname",
          label: this.$t("sportrank"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  created() {
    var self = this;
    self.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    AthleticAchievementService.Get(self.selectedrowid).then((res) => {
      self.AthleticAchievement = res.data;
      self.TitleFileTypeList = res.data.achievementtable.Tables;
      if (self.selectedrowid != 0) {
        // self.changeOblast();
        // self.changeRegion();
        // self.changeOrg();
        self.Change();
        self.ChangeSportEvent();
      }
      SportEventTypeService.GetAll().then((res) => {
        self.sporteventtypelist = res.data;
      });
      SportTypeClassifierService.GetAll().then((res) => {
        self.sporttypeclassifierlist = res.data;
      });
      SportRankService.GetAll().then((res) => {
        self.sportranklist = res.data;
      });
      UnitOfMeasureService.GetAll().then((res) => {
        self.unitofmeasurelist = res.data;
      });
    });
  },
  methods: {
    ChangeSportEvent() {
      this.tabrow.competitiontypeid = 0;
      this.tabrow.competitiontypename = "";
      CompetitionTypeService.GetAll(
        this.tabrow.sporteventtypeid,
        this.lang
      ).then((res) => {
        this.competitiontypelist = res.data;
      });
    },
    Change() {
      this.tabrow.sporttypeclassifierdisciplineid = 0;
      this.tabrow.sporttypeclassifierdisciplinename = "";
      this.tabrow.unitofmeasureid = 0;
      this.tabrow.unitofmeasurename = "";
      SportTypeClassifierService.GetAllSportTypeClassifierDiscipLine(
        this.tabrow.sporttypeclassifierid
      ).then((res) => {
        this.sporttypeclassifierdisciplinelist = res.data;
      });
    },
    ChangeCompetitionType() {
      SportEventService.GetAll(
        0,
        this.tabrow.sporteventtypeid,
        this.tabrow.competitiontypeid,
        this.lang
      ).then((res) => {
        this.sporteventlist = res.data;
      });
    },
    ChangeSporttypeclassifierdiscipline() {
      if (!!this.tabrow.sporttypeclassifierdisciplineid) {
        this.tabrow.unitofmeasureid = this.sporttypeclassifierdisciplinelist.filter(
          (item) => item.id === this.tabrow.sporttypeclassifierdisciplineid
        )[0].unitofmeasureid;
      }
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      console.log(item);
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.tabrow.FileTables.push({
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
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenModal() {
      this.AddModal = true;
      this.editedIndex = -1;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        competitiontypeid: 0,
        competitiontypename: "",
        sporteventid: 0,
        sporteventname: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        FileTables: [],
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        achievement: "",
        sportrankid: 0,
        sportrankname: "",
        Status: 1,
      };
    },
    CloseTableModal() {
      this.AddModal = false;
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          startdate: "",
          enddate: "",
          sporteventtypeid: 0,
          sporteventtypename: "",
          competitiontypeid: 0,
          competitiontypename: "",
          sporteventid: 0,
          sporteventname: "",
          unitofmeasureid: 0,
          FileTables: [],
          unitofmeasurename: "",
          sporttypeclassifierid: 0,
          sporttypeclassifiername: "",
          sporttypeclassifierdisciplineid: 0,
          sporttypeclassifierdisciplinename: "",
          achievement: "",
          sportrankid: 0,
          sportrankname: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    BindValue(value) {
      this.tabrow.startdate = value;
    },
    BindValueEndDate(value) {
      this.tabrow.enddate = value;
    },
    // disableddate(date) {
    //   var todaydate = new Date();
    //   var dd = String(todaydate.getDate()).padStart(2, "0");
    //   var mm = String(todaydate.getMonth()).padStart(2, "0");
    //   var yyyy = todaydate.getFullYear();
    //   return date > new Date(parseInt(yyyy), parseInt(mm), parseInt(dd));
    // },
    AddTable() {
      var self = this;
      if (
        self.tabrow.startdate === null ||
        self.tabrow.startdate === undefined ||
        self.tabrow.startdate === 0 ||
        self.tabrow.startdate === ""
      ) {
        self.makeToast(
          self.$t("startdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.enddate === null ||
        self.tabrow.enddate === undefined ||
        self.tabrow.enddate === 0 ||
        self.tabrow.enddate === ""
      ) {
        self.makeToast(
          self.$t("enddateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporteventtypeid === null ||
        self.tabrow.sporteventtypeid === undefined ||
        self.tabrow.sporteventtypeid === 0 ||
        self.tabrow.sporteventtypeid === ""
      ) {
        self.makeToast(
          self.$t("sporteventtypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.competitiontypeid === null ||
        self.tabrow.competitiontypeid === undefined ||
        self.tabrow.competitiontypeid === 0 ||
        self.tabrow.competitiontypeid === ""
      ) {
        self.makeToast(
          self.$t("competitiontypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporteventid === null ||
        self.tabrow.sporteventid === undefined ||
        self.tabrow.sporteventid === 0 ||
        self.tabrow.sporteventid === ""
      ) {
        self.makeToast(
          self.$t("sporteventNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporttypeclassifierid === null ||
        self.tabrow.sporttypeclassifierid === undefined ||
        self.tabrow.sporttypeclassifierid === 0 ||
        self.tabrow.sporttypeclassifierid === ""
      ) {
        self.makeToast(
          self.$t("sporttypeclassifieridNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporttypeclassifierdisciplineid === null ||
        self.tabrow.sporttypeclassifierdisciplineid === undefined ||
        self.tabrow.sporttypeclassifierdisciplineid === 0 ||
        self.tabrow.sporttypeclassifierdisciplineid === ""
      ) {
        self.makeToast(
          self.$t("sporttypeclassifierdisciplineidNotCorrect1"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if(!!self.tabrow.unitofmeasureid){
      //   if (
      //   self.tabrow.achievement === null ||
      //   self.tabrow.achievement === undefined ||
      //   self.tabrow.achievement === 0 ||
      //   self.tabrow.achievement === ""
      // ) {
      //   self.makeToast(
      //     self.$t("achievementNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // }
      if (
        self.tabrow.sportrankid === null ||
        self.tabrow.sportrankid === undefined ||
        self.tabrow.sportrankid === 0 ||
        self.tabrow.sportrankid === ""
      ) {
        self.makeToast(
          self.$t("sportrankNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.tabrow.sporteventtypeid) {
        self.tabrow.sporteventtypename = self.sporteventtypelist.filter(
          (item) => item.id === self.tabrow.sporteventtypeid
        )[0].name;
      }
      if (!!self.tabrow.competitiontypeid) {
        self.tabrow.competitiontypename = self.competitiontypelist.filter(
          (item) => item.id === self.tabrow.competitiontypeid
        )[0].name;
      }
      if (!!self.tabrow.sporteventid) {
        self.tabrow.sporteventname = self.sporteventlist.filter(
          (item) => item.id === self.tabrow.sporteventid
        )[0].name;
      }
      if (!!self.tabrow.sporttypeclassifierid) {
        self.tabrow.sporttypeclassifiername = self.sporttypeclassifierlist.filter(
          (item) => item.id === self.tabrow.sporttypeclassifierid
        )[0].name;
      }
      if (!!self.tabrow.sporttypeclassifierdisciplineid) {
        self.tabrow.sporttypeclassifierdisciplinename = self.sporttypeclassifierdisciplinelist.filter(
          (item) => item.id === self.tabrow.sporttypeclassifierdisciplineid
        )[0].sporttypeclassifierdisciplinename;
      }
      if (!!self.tabrow.sportrankid) {
        self.tabrow.sportrankname = self.sportranklist.filter(
          (item) => item.id === self.tabrow.sportrankid
        )[0].name;
      }
      if (!!self.tabrow.unitofmeasureid) {
        self.tabrow.unitofmeasurename = self.unitofmeasurelist.filter(
          (item) => item.id === self.tabrow.unitofmeasureid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.AthleticAchievement.athleticachievementtable[self.editedIndex],
          self.tabrow
        );
      } else {
        self.AthleticAchievement.athleticachievementtable.push(self.tabrow);
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        competitiontypeid: 0,
        competitiontypename: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        sporteventid: 0,
        FileTables: [],
        sporteventname: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        achievement: "",
        sportrankid: 0,
        sportrankname: "",
        Status: 1,
      };
      this.AddModal = false;
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.AthleticAchievement.athleticachievementtable.indexOf(
        item
      );
      this.tabrow = Object.assign({}, item);
      if (!!this.tabrow.sporttypeclassifierid) {
        SportTypeClassifierService.GetAllSportTypeClassifierDiscipLine(
          this.tabrow.sporttypeclassifierid
        ).then((res) => {
          this.sporttypeclassifierdisciplinelist = res.data;
        });
      }
      this.AddModal = true;
    },
    Delete(item) {
      item;
      item.Status = 3;
    },
    OpenPersonModal() {
      this.$bvModal.show("PersonModal");
    },
    ClosePersonModal() {
      this.$bvModal.hide("PersonModal");
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    AddPersonData(data) {
      var self = this;
      console.log(data);
      self.AthleticAchievement.personid = data.personid;
      self.AthleticAchievement.personname = data.personname;
      self.ClosePersonModal();
    },
    check() {
      var self = this;
      if (
        self.AthleticAchievement.docnumber === null ||
        self.AthleticAchievement.docnumber === undefined ||
        self.AthleticAchievement.docnumber === 0 ||
        self.AthleticAchievement.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthleticAchievement.docdate === null ||
        self.AthleticAchievement.docdate === undefined ||
        self.AthleticAchievement.docdate === 0 ||
        self.AthleticAchievement.docdate === ""
      ) {
        self.makeToast(
          self.$t("docdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthleticAchievement.personid === null ||
        self.AthleticAchievement.personid === undefined ||
        self.AthleticAchievement.personid === 0
      ) {
        self.makeToast(self.$t("StudentNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.AthleticAchievement.athleticachievementtable.filter(
          (item) => item.Status != 3
        ).length == 0
      ) {
        self.makeToast(self.$t("TablesNotFilled"), self.$t("Error"), "danger");
        return false;
      }
      // if (
      //   self.AthleticAchievement.details === null ||
      //   self.AthleticAchievement.details === undefined ||
      //   self.AthleticAchievement.details === 0
      // ) {
      //   self.makeToast(
      //     self.$t("detailsNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      self.SaveLoading = true;
      AthleticAchievementService.Update(self.AthleticAchievement)
        .then((res) => {
          self.SaveLoading = false;
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "AthleticAchievement",
          });
        })
        .catch((error) => {
          self.SaveLoading = false;
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
  },
  watch: {},
};
</script>

<style></style>
