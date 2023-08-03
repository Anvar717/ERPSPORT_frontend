<template>
  <CRow>
    <CCol class="p-0">
      <CCard accent-color="primary" class="pb-4">
        <b-row v-if="!personCreateContent" class="p-4">
          <b-col sm="9" lg="9" class="text-left">
            <label>{{ $t("Sportchini tanlang") }}</label>
            <v-select
              :options="SportCompetition.athlete"
              v-model="filter.athleteid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="fullname"
              @input="changeAthleteItem"
            ></v-select>
          </b-col>
          <b-col sm="3" lg="3">
            <div class="text-right">
              <CButton
                size="sm"
                color="primary"
                class="mt-4"
                @click="personCreateContent = true"
              >
                {{ $t("Yangi xakam qo'shish") }}
              </CButton>
            </div>
          </b-col>
        </b-row>
        <div v-if="personCreateContent">
          <div class="text-right">
            <CButton
              size="sm"
              class="mr-4 mt-2"
              color="primary"
              @click="personCreateContent = false"
            >
            {{ $t("Xakamlar ro'yxatidan tanlash") }}
            </CButton>
          </div>
          <!--  -->
          <PersonCreate
            @save="Add"
            :SportCompetition="SportCompetition"
            ref="personCreate"
          />

          <div
            v-if="typeForm == 'AthleteCreate' && person.pinfl"
            sm="3"
            lg="3"
            class="ml-4 text-left"
          >
            <label> {{ $t("pinfl") }} : <b> {{ person.pinfl }} </b> </label>
          </div>
        </div>
        <b-row class="p-4">
          <b-col
            v-if="typeForm == 'JuryCreate' || typeForm == 'SaffCreate'"
            sm="5"
            lg="5"
            class="text-left"
          >
            <label>{{ $t("Position") }}</label>
            <v-select
              :options="PositionList"
              v-model="filter.positionid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              @input="changePositionItem"
            ></v-select>
          </b-col>
          <b-col
            v-if="typeForm == 'JuryCreate'"
            sm="6"
            lg="6"
            class="text-left"
          >
            <label>{{ $t("qualificationcategory") }}</label>
            <v-select
              class="w-100"
              :options="qualificationcategorylist"
              v-model="filter.qualificationcategoryid"
              :reduce="(item) => item.qualificationcategoryid"
              :placeholder="$t('ChooseBelow')"
              @input="changeQualificationItem"
              label="qualificationcategoryname"
            />
          </b-col>
          <b-col
            v-if="typeForm == 'AthleteCreate'"
            sm="6"
            lg="6"
            class="text-left"
          >
            <label>{{ $t("SportTitle") }}</label>
            <v-select
              :options="SportTitleList"
              v-model="filter.sporttitleid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            />
          </b-col>
          <b-col
            v-if="typeForm == 'AthleteCreate'"
            sm="6"
            lg="6"
            class="text-left"
          >
            <label> {{ $t("organization") }} </label>
            <v-select
              :options="organizationlist"
              v-model="filter.organizationid"
              :reduce="(item) => item.id"
              :placeholder="$t('organization')"
              label="name"
              @input="ChangeOrganization"
              style="width: 100%"
              class="mr-2"
            ></v-select>
          </b-col>
        </b-row>
        <b-row v-if="typeForm == 'AthleteCreate'" class="px-4">
          <b-col sm="6" lg="6" class="text-left">
            <label> {{ $t("sporttypeclassifierdiscipline") }} </label>
            <v-select
              :options="sporttypeclassifierdisciplinelist"
              class="w-100"
              multiple
              v-model="sporttypeclassifierdisciplineids"
              :reduce="(item) => item.sporttypeclassifierdisciplineid"
              :placeholder="$t('ChooseBelow')"
              label="sporttypeclassifierdisciplinename"
            ></v-select>
          </b-col>
        </b-row>
        <b-row class="p-4">
          <b-col
            v-if="typeForm == 'ResultCreate' || typeForm == 'WinnerCreate'"
            sm="3"
            lg="3"
            class="ml-4 text-left"
          >
            <label> {{ $t("sporttypeclassifierdiscipline") }} </label>
            <v-select
              :options="sporttypeclassifierdisciplinelist"
              class="w-100"
              v-model="sporttypeclassifierdisciplineid"
              :reduce="(item) => item.sporttypeclassifierdisciplineid"
              :placeholder="$t('ChooseBelow')"
              label="sporttypeclassifierdisciplinename"
            ></v-select>
          </b-col>
          <b-col
            v-if="typeForm == 'ResultCreate'"
            sm="2"
            lg="2"
            class="ml-4 text-left"
          >
            <label> {{ $t("athleteindicator") }} </label>
            <b-form-input
              type="number"
              :placeholder="$t('athleteindicator')"
              v-model="person.athleteindicator"
            />
          </b-col>
          <b-col
            v-if="typeForm == 'ResultCreate'"
            sm="3"
            lg="3"
            class="ml-4 text-left"
          >
            <label> {{ $t("unitofmeasure") }} </label>
            <v-select
              class="w-100"
              :options="unitofmeasurelist"
              v-model="person.unitofmeasureid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
            />
          </b-col>
          <b-col
            v-if="typeForm == 'WinnerCreate' || typeForm == 'ResultCreate'"
            sm="3"
            lg="3"
            class="ml-4 text-left"
          >
            <label> {{ $t("sportrank") }} </label>
            <v-select
              class="w-100"
              :options="sportranklist"
              v-model="person.sportrankid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
            />
          </b-col>
          <b-col
            v-if="typeForm == 'AthleteCreate'"
            sm="3"
            lg="3"
            class="text-left"
          >
            <label> {{ $t("contactinfo") }} </label>
            <b-form-input
              v-mask="'+998 ## ### ## ##'"
              :placeholder="$t('contactinfo')"
              v-model="person.contactinfo"
            />
          </b-col>
          
        </b-row>
        <CRow>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import PersonService from "@/services/person.service";
import HelperService from "@/services/helper.service";
import IdentityDocumentService from "@/services/IdentityDocument.service";
import OrganizationList from "@/components/OrganizationList";
import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
import CustomDatePicker from "@/components/customDatePicker.vue";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SportCompetitionService from "@/services/SportCompetition.service";
import SportTitleService from "@/services/SportTitle.service";
import OrganizationService from "@/services/organization.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import SportRankService from "@/services/SportRank.service";
import PersonCreate from "./_personCreate.vue";

export default {
  name: "editPersonComponent",
  components: {
    OrganizationList,
    HistoryDetailInfo,
    CustomDatePicker,
    PersonCreate,
  },
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
    personId: {
      type: Number,
      default: 0,
    },
    uid: {
      type: String,
      default: "",
    },
    SportCompetition: {
      type: Object,
      default: null,
    },
    typeForm: {
      type: String,
      default: "JuryCreate",
    },

    model: {
      prop: "personData",
      event: "persondatachange",
    },
  },
  data() {
    return {
      organizationlist: [],
      qualificationcategorylist: [],
      SportTitleList: [],
      sporttypeclassifierdisciplinelist: [],
      PositionList: [],
      sporttypeclassifierdisciplineids: [],
      sporttypeclassifierdisciplineid: null,
      DocSeriesList: [],
      sportranklist: [],
      person: {},
      OblastLoading: false,
      RegionLoading: false,
      MfyLoading: false,
      canvasImage: null,
      GenderList: [],
      lang: "",
      personCreateContent: true,
      liveplacetabrow: {
        ondate: "",
        countryname: "",
        countryid: 211,
        oblastname: "",
        oblastid: null,
        regionname: "",
        regionid: null,
        mfyid: null,
        address: "",
        stateid: 1,
        Status: 1,
      },

      filter: {
        organizationid: null,
        organizationname: "",
        sporttitleid: null,
        identitydocumentid: 2,
        islocaljury: true,
        positionid: null,
        qualificationcategoryid: null,
        docseries: "",
        docnumber: "",
        athleteid: null,
        inn: "",
        pinfl: "",
        dateofbirth: "",
      },
      unitofmeasurelist: [],
      pinflLoading: false,
      SaveLoading: false,
      tabIndex: 0,
      today: "",
      CheckResult: false,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";

    this.loadhelper();
    if (this.typeForm == "AthleteCreate") {
      OrganizationService.GetAll().then((res) => {
        this.organizationlist = res.data;
      });
    }
    if (this.typeForm == "ResultCreate") {
      UnitOfMeasureService.GetAll().then((res) => {
        this.unitofmeasurelist = res.data;
      });
    }
    if (this.typeForm == "WinnerCreate" || this.typeForm == "ResultCreate") {
      SportRankService.GetAll().then((res) => {
        this.sportranklist = res.data;
      });
    }
    if (
      this.typeForm == "ResultCreate" ||
      this.typeForm == "AthleteCreate" ||
      this.typeForm == "WinnerCreate"
    ) {
      this.sporttypeclassifierdisciplinelist =
        this.SportCompetition.sportcompetitionsportdiscipline;
    }

    if (this.typeForm == "JuryCreate") {
      SportCompetitionService.GetJuryStaffingPosition(this.uid, true).then(
        (res) => {
          this.PositionList = res.data;
        }
      );
    } else if (this.typeForm == "AthleteCreate") {
      SportTitleService.GetAll(true)
        .then((res) => {
          this.SportTitleList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    } else {
      SportCompetitionService.GetEmployeeStaffingPosition(this.uid, true).then(
        (res) => {
          this.PositionList = res.data;
        }
      );
    }
    this.getJuryQualifiation();
    this.filteridentitydocumentchange(this.filter);
  },
  computed: {
    pickerOption() {
      let self = this;
      return {
        firstDayOfWeek: 1,
        disabledDate(time) {
          const currentDate = new Date();
          const year = currentDate.getFullYear() - 16;
          const month = currentDate.getMonth();
          const day = currentDate.getDate();
          let date = new Date(year, month, day);
          if (
            self.filter.identitydocumentid == 2 ||
            self.filter.identitydocumentid == 5
          ) {
            date.setDate(date.getDate());
          } else {
            date = new Date();
          }
          return date < time.getTime();
        },
      };
    },
    isEdit() {
      return this.personId;
    },
  },
  watch: {
    "filter.docseries"(val) {
      if (val) {
        this.filter.docseries = val.toUpperCase();
      }
    },
  },
  directives: {
    insertDots: {
      bind(el) {
        el.addEventListener("input", function (e) {
          const input = e.target;
          const value = input.value;
          const formattedValue = value
            .replace(/[^0-9]/g, "") // Remove non-numeric characters
            .replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1.$2.$3"); // Insert dots after the second and fourth character
          // .replace(/(\..*)\./g, '$1'); // Remove multiple consecutive dots
          if (formattedValue !== value) {
            input.value = formattedValue;
            input.dispatchEvent(new Event("input"));
          }
        });
      },
    },
  },
  methods: {
    ChangeOrganization() {
      var self = this
      if (self.filter.organizationid) {
        self.filter.organizationname = self.OrganizationList.filter(item => item.id == self.filter.organizationid)[0].name  
      }
    },
    Add(data) {
      this.person = data;
    },
    changeAthleteItem() {
      this.person = this.SportCompetition.athlete.find(
        (el) => el.id == this.filter.athleteid
      );
    },
    getJuryQualifiation() {
      let params = {
        positionId: this.filter.positionid,
        sportCompetitionUId: this.uid,
      };
      SportCompetitionService.GetJuryStaffingCategory(params)
        .then((res) => {
          this.qualificationcategorylist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    },
    juryTypeChange() {
      if (this.filter.islocaljury) {
        this.filter.identitydocumentid = 2;
      } else {
        this.filter.identitydocumentid = 4;
      }
    },

    disabledForDateofBirth(date) {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      if (this.persontypeid == 1) {
        // alert(date)
        return !(
          date < new Date(yyyy - 7, mm, dd - 21) &&
          date > new Date(yyyy - 20, mm, dd)
        );
      }
    },

    loadhelper() {
      HelperService.GetGenderList(this.lang).then((res) => {
        this.GenderList = res.data;
      });
      IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
        this.DocSeriesList = res.data.result;
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.rowbreak === true) {
        return "bottom-color-red";
      }
      if (item.Status === 3) {
        return "d-none";
      }
    },
    isCheckDisabled() {
      if (
        ((this.filter.identitydocumentid == 3 ||
          this.filter.identitydocumentid == 4 ||
          this.filter.identitydocumentid == 6) &&
          this.tabIndex == 0) ||
        (this.tabIndex == 0 && this.person.DocumentTables.length == 0)
      ) {
        return true;
      }
    },
    filteridentitydocumentchange(row) {
      if (this.filter.identitydocumentid == 4) {
        this.filter.islocaljury = false;
      } else {
        this.filter.islocaljury = true;
      }
      this.filter.dateofbirth = "";
      this.filter.docseries = "";
    },

    check() {
      if (
        this.typeForm == "athleteTable" &&
        !this.sporttypeclassifierdisciplineids.length
      ) {
        this.makeToast(
          this.$t("selectSporttypeclassifierdiscipline"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.typeForm == "athleteTable" && !this.filter.sporttitleid) {
        this.makeToast(
          this.$t("sporttitleNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        (this.typeForm == "WinnerCreate" || this.typeForm == "ResultCreate") &&
        !this.sporttypeclassifierdisciplineid
      ) {
        this.makeToast(
          this.$t("selectSporttypeclassifierdiscipline"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }      
      if (this.typeForm == "JuryCreate" && !this.filter.qualificationcategoryid) {
        this.makeToast(
          this.$t("qualificationcategoryNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.typeForm == "JuryCreate" && !this.filter.positionid) {
        this.makeToast(
          this.$t("selectPosition"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if ((this.typeForm == "WinnerCreate" || this.typeForm == "ResultCreate") && !this.person.sportrankid) {
        this.makeToast(this.$t("selectSportrank"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    getDisciplineName(id) {
      return this.sporttypeclassifierdisciplinelist.find((el) => el.sporttypeclassifierdisciplineid == id);
    },
    SaveData() {
      if (!this.person.firstname) {
        this.$refs['personCreate'].SaveData()
        return false
      }
      var self = this;
      if (
        self.filter.identitydocumentid == 4 ||
        self.filter.identitydocumentid == 6
      ) {
        self.person.identitydocumentid = self.filter.identitydocumentid;
        self.person.docnumber = self.filter.docnumber;
        self.person.docseries = self.filter.docseries;
      }
      if (!self.check()) {
        return false;
      }

      if (this.person.id === 0) {
        this.person.persontypeid = this.persontypeid;
      }
    
      this.SaveLoading = true;
      this.person.persontypeid = this.persontypeid;
      
      if (this.filter.sporttitleid) {
        this.person.sporttitlename = this.SportTitleList.find(
          (el) => el.id == this.filter.sporttitleid
        ).name;
      }
      if (this.sporttypeclassifierdisciplineid) {
        console.log(this.sporttypeclassifierdisciplinelist)
        this.person.sporttypeclassifierdisciplineid =
          this.sporttypeclassifierdisciplineid;
        this.person.sporttypeclassifierdisciplinename =
          this.sporttypeclassifierdisciplinelist.find(
            (el) => el.sporttypeclassifierdisciplineid == this.sporttypeclassifierdisciplineid
          ).sporttypeclassifierdisciplinename;
      }
      if (this.person.sportrankid) {
        // this.person.athleteindicator = null;
        this.person.sportrankname = this.sportranklist.find(
          (el) => el.id == this.person.sportrankid
        ).name;
      }
      if (this.person.unitofmeasureid) {
        this.person.unitofmeasurename = this.unitofmeasurelist.find(
          (el) => el.id == this.person.unitofmeasureid
        ).name;
      }
      if (this.check()) {
        this.person.athleteTable = this.sporttypeclassifierdisciplineids.map(
          (el) => {
            return { ...this.getDisciplineName(el), Status: 1 };
          }
        );
        let personData = { ...this.person };
        personData.identitydocumentid = this.filter.identitydocumentid;
        this.$emit("save", personData);
        this.SaveLoading = false;
        if (this.typeForm != "JuryCreate") {
          this.makeToast(
          this.$t("SuccessMessage"),
          this.$t("message"),
          "success"
        );
        }
        
      }
    },
    changePositionItem(id) {
      let item = this.PositionList.find((el) => el.id == id);
      this.$emit("changePosition", item);
      if (this.typeForm == "JuryCreate") {
        if (
          this.SportCompetition &&
          this.SportCompetition.sportcompetitionjurystaffing.length
        ) {
          let juryStaffing =
            this.SportCompetition.sportcompetitionjurystaffing.find(
              (el) => el.positionid == id
            );
          this.filter.qualificationcategoryid =
            juryStaffing.qualificationcategoryid;
          this.changeQualificationItem(this.filter.qualificationcategoryid);
        }
        this.getJuryQualifiation();
      }
    },
    changeQualificationItem(id) {
      let item = this.qualificationcategorylist.find(
        (el) => el.qualificationcategoryid == id
      );
      this.$emit("changeQualification", item);
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
<style lang="scss">
.bottom-color-red {
  border-bottom: 2px solid red;
}
</style>
