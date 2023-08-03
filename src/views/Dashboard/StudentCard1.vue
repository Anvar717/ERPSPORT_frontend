<template>
  <b-overlay :show="loading">
    <b-row>
      <b-col>
        <b-button
          variant="danger"
          @click="$router.go(-1)"
          pill
          >
          <!-- @click="$router.push({ name: 'SportStudentManageList' })" -->
          {{ $t("back") }}
        </b-button>
      </b-col>
       <b-col style="margin-right:650px">
            <h4 class="text-center mb-3"> {{ $t('StudentCard') }} </h4>
          </b-col>
    </b-row>
    <div class="sp-results mt-5">
      <sp-card
        width="100%"
        class="ht8 p-4"
        style="position: relative"
        height="auto"
        padding="2"
      >
        <div
          style="position: absolute; top: -70px; left: 80px; width: 120px;height: 150px;overflow: hidden;"
          class="image_carousel"
        >
          <img
            style="width: 100%;height: 150px;"
            :src="
              SportCard.PersonPhoto && !!SportCard.PersonPhoto.attachmentfileid
                ? axios.defaults.baseURL +
                  'FileManage/Get?id=' +
                  SportCard.PersonPhoto.attachmentfileid
                : 'data:image/jpg;base64,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'
            "
          />
        </div>
        <h4 class="text-center" style="margin-top: 68px; font-size: 20px">
          {{ SportCard.fullname }}
        </h4>
        <p></p>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("DateOfBirthday") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ SportCard.dateofbirth }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("GenderName") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ SportCard.gendername }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("NationalitieName") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ SportCard.nationalityname }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("pinfl") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ SportCard.pinfl }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("docserainumber") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                SportCard.CheckResult
                  ? SportCard.CheckResult.documentseries
                  : ""
              }}
              {{
                SportCard.CheckResult
                  ? SportCard.CheckResult.documentnumber
                  : ""
              }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("AddressPlace") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ SportCard.birthoblastname }}, {{ SportCard.birthregionname }},
              {{ SportCard.birthaddress }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("InfoLivePlace") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                SportCard.LivePlaceTables && SportCard.LivePlaceTables[0]
                  ? SportCard.LivePlaceTables[0].oblastname
                  : ""
              }},
              {{
                SportCard.LivePlaceTables && SportCard.LivePlaceTables[0]
                  ? SportCard.LivePlaceTables[0].regionname
                  : ""
              }},
              {{
                SportCard.LivePlaceTables && SportCard.LivePlaceTables[0]
                  ? SportCard.LivePlaceTables[0].mfyname
                  : ""
              }},
              {{
                SportCard.LivePlaceTables && SportCard.LivePlaceTables[0]
                  ? SportCard.LivePlaceTables[0].address
                  : ""
              }},
            </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card v-if="educationOrg" width="100%" class="ht4 p-4" height="auto" padding="2">
        <h4>{{ $t("Образовательные спортивные учреждения") }}</h4>
        <b-row class="mt-4">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("Sport turi") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ educationOrg.sporttypeclassifiername }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("InstitutionName") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ educationOrg.organizationname }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("Sportgroup") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ educationOrg.sportgroupname }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("firstcoach") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ educationOrg.coachname }}
            </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht4 p-4" height="auto" padding="2">
        <h4>{{ $t("SportTitle") }}</h4>
        <b-row class="mt-4">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("sporttitleName") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ sportTitleInfo != null ? sportTitleInfo.sporttitlename : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("DischargeDate") }}
            </label>
            <span style="font-size: 14px; color: black"
              >{{ sportTitleInfo != null ? sportTitleInfo.docdate : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("IssueOrganization") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                sportTitleInfo != null ? sportTitleInfo.organizationname : ""
              }}
            </span>
          </b-col>
        </b-row>
      </sp-card>
      <!-- <sp-card width="100%" class="ht3 p-4" height="auto" padding="2"></sp-card> -->
      <sp-card width="100%" class="ht8 p-4" height="auto" padding="2">
        <h4>{{ $t("Достижения на соревнованиях") }}</h4>
        <b-row class="mt-4">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("CompetitionLevel") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                achievementInfo != null
                  ? achievementInfo.sporteventtypename
                  : ""
              }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("CompetitionName") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                achievementInfo != null
                  ? achievementInfo.competitiontypename
                  : ""
              }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("achievementname") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ achievementInfo != null ? achievementInfo.achievement : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("SportProgram") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                achievementInfo != null
                  ? achievementInfo.sporttypeclassifierdisciplinename
                  : ""
              }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("sportrank") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ achievementInfo != null ? achievementInfo.sportrankname : "" }}
            </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht8 p-4" height="auto" padding="2">
        <b-row>
          <b-col sm="12" md="9" lg="9">
            <h4>{{ $t("AnthropometricIndicators") }}</h4>
          </b-col>
          <b-col sm="12" md="3" lg="3">
            <b-icon
              style="cursor: pointer"
              font-scale="1.5"
              @click="changeAllInfo"
              :icon="IsAllInfo ? 'chevron-down' : 'chevron-up'"
            ></b-icon>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("IndicatorDate") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ anthropometricInfo != null ? anthropometricInfo.date : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("Height") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ anthropometricInfo != null ? anthropometricInfo.height : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("Weight1") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ anthropometricInfo != null ? anthropometricInfo.weight : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row
          class="mt-2"
          v-for="(item, key) in anthropometricInfoList"
          :key="key"
          v-show="IsAllInfo"
        >
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ item.anthropometricindicatorname }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ item.oldtindicator != null ? item.oldtindicator : 0 }}
              {{ item.unitofmeasurename }} -
              {{ item.nextindicator != null ? item.nextindicator : 0 }}
              {{ item.unitofmeasurename }}
            </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht3 p-4" height="auto" padding="2">
        <h4>{{ $t("Отношение к сборной") }}</h4>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("NationalTeamTypeName") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ squadTeam != null ? squadTeam.sportteamsquadtypename : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("Membership") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ squadTeam != null ? squadTeam.sportteamtypename : "" }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("coachname") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{ squadTeam != null ? squadTeam.teamcoachname : "" }}
            </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht3 p-4" height="auto" padding="2">
        <h4>{{ $t("Государственная премия") }}</h4>
        <b-row class="mt-4">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("StateAwardName") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                SportCard.stateAward ? SportCard.stateAward.StateAwardName : ""
              }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display: grid">
            <label class="mb-0" style="color: #73777a; font-size: 12px" for="">
              {{ $t("StateAwardDate") }}
            </label>
            <span style="font-size: 14px; color: black">
              {{
                SportCard.stateAward ? SportCard.stateAward.StateAwardDate : ""
              }}
            </span>
          </b-col>
        </b-row>
      </sp-card>
    </div>
  </b-overlay>
</template>

<script>
import SpCard from "../../components/Sport/SportCard.vue";
import StudentManageService from "@/services/StudentManage.service";
import FileManageService from "@/services/filemanage.service";
import axios from "axios";
export default {
  components: { SpCard },
  data() {
    return {
      filter: {
        yearid: 2021,
      },
      IsAllInfo: false,
      axios,
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
        attachmentfiletype: "",
      },
      loading: false,
      SportCard: {},
      PersonPhoto: {},
      educationOrg: {},
      sportTitleInfo: {},
      squadTeam: {},
      achievementInfo: {},
      anthropometricInfo: {},
      anthropometricInfoList: [],
      studentdochistory: [],
    };
  },
  created() {
    this.filter.yearid = this.$route.query.Year;
    this.Refresh();
  },
  methods: {
    Back() {
      this.$router.push({ path: "/dashboard3" });
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
              this.SportCard.PersonPhoto.attachmentfileid = res.data.id;
              this.SportCard.PersonPhoto.attachmentfilename =
                res.data.pfiletext;
              this.SportCard.PersonPhoto.attachmentfiletype =
                res.data.pfiletype;
              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;
              this.FileAttach.url = URL.createObjectURL(file);
              let text = this.SportCard.PersonPhoto.attachmentfilename;
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
    DownloadFile() {
      this.DownloadLoading = this.FileAttach.attachmentfileid;
      FileManageService.Get(this.FileAttach.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(res, this.FileAttach.attachmentfilename);
        })
        .catch((error) => {
          this.DownloadLoading = "";
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    changeAllInfo() {
      if (this.IsAllInfo == false) {
        this.IsAllInfo = true;
      } else {
        this.IsAllInfo = false;
      }
    },
    Refresh() {
      this.loading = true;
      StudentManageService.GetStudentCard(
        this.$route.params.id,
        this.filter.DocumentSeries,
        this.filter.DocumentNumber,
        this.filter.Pinfl,
        this.filter.DateOfBirth
      )
        .then((res) => {
          this.loading = false;
          this.SportCard = res.data.personData;
          this.educationOrg = res.data.educationOrg;
          this.sportTitleInfo = res.data.sportTitleInfo;
          this.squadTeam = res.data.squadTeam;
          this.achievementInfo = res.data.achievementInfo;
          this.anthropometricInfo = res.data.anthropometricInfo;
          this.studentdochistory = res.data.StudentDocHistory;
          this.anthropometricInfoList =
            res.data.athleteInfo.Anthropometric.anthropometricTable;
        })
        .catch((err) => {
          this.makeToast(
            err.response.data.error || error,
            this.$t("error"),
            "danger"
          );
          this.Loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.image_carousel img {
  border-radius: 51% 49% 50% 50% / 47% 46% 54% 53%;
}
.sp-results {
  /* fit in up to 5 columns of 1580px wide tiles, 20px gutters: 5*300 + 4*20: */
  max-width: 1580px;
  margin: 0 auto;
  display: grid;
  grid-gap: 20px;
  /* fit as many columns as possible, 180px wide each: */
  grid-template-columns: repeat(auto-fill, 300px);
  /* each row is 20px high -- we always span 2+ */
  grid-auto-rows: minmax(20px, auto);
  justify-content: center;
}

.sp-results > * {
  width: 300px;
  /* only for older non-grid browsers: */
  float: left;
  /* only for older non-grid browsers: */
  margin: 15px;
}

.ht0 {
  grid-row-end: span 2;
}

.ht1 {
  grid-row-end: span 3;
}

.ht2 {
  grid-row-end: span 4;
}

.ht3 {
  grid-row-end: span 5;
}

.ht4 {
  grid-row-end: span 6;
}

.ht5 {
  grid-row-end: span 7;
}

.ht6 {
  grid-row-end: span 8;
}

.ht7 {
  grid-row-end: span 9;
}

.ht8 {
  grid-row-end: span 10;
}

@supports (display: grid) {
  .sp-results > * {
    /* modern browser -- grid-gap takes care of us: */
    margin: 0 auto;
  }
}

/* cosmetics only from here on down */
// .sp-results > * {
//   background-color: #ddd;
// }
.sp-results > * img {
  max-width: 100%;
}

.sp-results > * span {
  font-size: 125%;
  color: #cc3333;
  font-family: "Ultra";
}
.scrollable {
  overflow-y: auto;
  max-height: 300px;
}
</style>