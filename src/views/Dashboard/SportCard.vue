<template>
  <b-overlay :show="loading">
    <b-row>
      <b-col>
        <b-button variant="danger" @click="Back" pill> {{ $t('back') }} </b-button>
      </b-col>
    </b-row>
    <div class="sp-results mt-5">
      <sp-card width="100%" class="ht8 p-4" style="position:relative" height="auto" padding="2">
          <div style="position:absolute;top:-64px;left:86px">
              <img src="/img/cardimg.svg" alt="">
          </div>
          <h4 class="text-center" style="margin-top:68px;font-size:20px"> {{ SportCard.Name }} </h4>
          <p></p>
          <b-row>
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('Sport turi') }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.educatedSportsInstitution ? SportCard.educatedSportsInstitution.SportTypeName : '' }} </span>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('DateOfBirthday') }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.DateOfBirthday }} </span>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('GenderName') }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.GenderName }} </span>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('NationalitieName') }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.NationalitieName }} </span>
            </b-col>
          </b-row>
          
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('DocumentSeries') }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.participantDocument ? SportCard.participantDocument.DocumentSeries : '' }}  {{ SportCard.participantDocument ? SportCard.participantDocument.DocumentNumber : '' }} </span>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('placeOfLiving') }} </label>
              <span style="font-size:14px;color:black"> 
                {{ SportCard.placeOfLiving ? SportCard.placeOfLiving.OblastName + ',' + SportCard.placeOfLiving.RegionName + ',' + SportCard.placeOfLiving.Address : '' }} 
              </span>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('placeOfBirth') }} </label>
              <span style="font-size:14px;color:black"> 
                {{ SportCard.placeOfBirth ? SportCard.placeOfBirth.OblastName + ',' + SportCard.placeOfBirth.RegionName + ',' + SportCard.placeOfBirth.Address || '' : '' }} 
              </span>
            </b-col>
          </b-row>
      </sp-card>
      <sp-card width="100%" class="ht4 p-4" height="auto" padding="2">
        <h4> {{ $t('Образовательные спортивные учреждения') }} </h4>
          <b-row class="mt-4">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t("Sport turi") }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.educatedSportsInstitution ? SportCard.educatedSportsInstitution.SportTypeName : '' }} </span>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('InstitutionName') }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.educatedSportsInstitution ? SportCard.educatedSportsInstitution.InstitutionName : '' }} </span>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col style="display:grid">
              <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('TrainerName') }} </label>
              <span style="font-size:14px;color:black"> {{ SportCard.educatedSportsInstitution ? SportCard.educatedSportsInstitution.TrainerName : '' }} </span>
            </b-col>
          </b-row>
      </sp-card>
      <sp-card width="100%" class="ht4 p-4" height="auto" padding="2">
        <h4> {{ $t("Спортивный разряд") }} </h4>
        <b-row class="mt-4">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('SportTypeName') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.sportsDischarge ? SportCard.sportsDischarge.SportTypeName : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('Discharge') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.sportsDischarge ? SportCard.sportsDischarge.Discharge : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('DischargeDate') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.sportsDischarge ? SportCard.sportsDischarge.DischargeDate : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('IssueOrganization') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.sportsDischarge ? SportCard.sportsDischarge.IssueOrganization : '' }} </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht2 p-4" height="auto" padding="2">
        <h4> {{ $t("Государственная премия") }} </h4>
        <b-row class="mt-4">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('StateAwardName') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.stateAward ? SportCard.stateAward.StateAwardName : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('StateAwardDate') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.stateAward ? SportCard.stateAward.StateAwardDate : '' }} </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht4 p-4" height="auto" padding="2">
        <h4> {{ $t("Достижения на соревнованиях") }} </h4>
        <b-row class="mt-4">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('CompetitionLevel') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.resultsInCompetition ? SportCard.resultsInCompetition.CompetitionLevel : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('CompetitionName') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.resultsInCompetition ? SportCard.resultsInCompetition.CompetitionName : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('Plase') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.resultsInCompetition ? SportCard.resultsInCompetition.Plase : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('Weight1') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.resultsInCompetition ? SportCard.resultsInCompetition.Weight : '' }} </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht3 p-4" height="auto" padding="2">
        <h4> {{ $t("Физические показатели") }} </h4>
        <b-row class="mt-4">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('IndicatorDate') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.physicalIndicator ? SportCard.physicalIndicator.IndicatorDate : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('Height') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.physicalIndicator ? SportCard.physicalIndicator.Height : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('Weight1') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.physicalIndicator ? SportCard.physicalIndicator.Weight : '' }} </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht3 p-4" height="auto" padding="2">
        <h4> {{ $t("Спортивный титул") }} </h4>
        <b-row class="mt-4">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('SportsTitleName') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.sportsTitle ? SportCard.sportsTitle.SportsTitleName : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('SportsTitleDate') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.sportsTitle ? SportCard.sportsTitle.SportsTitleDate : '' }} </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht3 p-4" height="auto" padding="2">
        <h4> {{ $t("Отношение к сборной") }} </h4>
        <b-row class="mt-4">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('Membership') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.relationToNationalTeam ? SportCard.relationToNationalTeam.Membership : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('NationalTeamTypeName') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.relationToNationalTeam ? SportCard.relationToNationalTeam.NationalTeamTypeName : '' }} </span>
          </b-col>
        </b-row>
      </sp-card>
      <sp-card width="100%" class="ht3 p-4" height="auto" padding="2">
        <h4> {{ $t("Физическая подготовка") }} </h4>
        <b-row class="mt-4">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('GeneralPhysicalTraining') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.physicalTraining ? SportCard.physicalTraining.GeneralPhysicalTraining : '' }} </span>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col style="display:grid">
            <label class="mb-0" style="color:#73777A;font-size:12px" for=""> {{ $t('SpecialPhysicalTraining') }} </label>
            <span style="font-size:14px;color:black"> {{ SportCard.physicalTraining ? SportCard.physicalTraining.SpecialPhysicalTraining : '' }} </span>
          </b-col>
        </b-row>
      </sp-card>
  </div>
  </b-overlay>
</template>

<script>
import SpCard from '../../components/Sport/SportCard.vue'
import DashboardService from '@/services/dashboard.service'
export default {
    components : { SpCard },
    data(){
      return{
        filter : {
          yearid : 2021
        },
        loading : false,
        SportCard : {}
      }
    },
    created(){
      this.filter.yearid = this.$route.query.Year
      this.Refresh()
    }, 
    methods:{
      Back(){
        this.$router.push({ path : '/dashboard3' })
      },
      Refresh(){
        this.loading = true
          DashboardService.ParticipantCard(this.$route.params.id,this.filter.yearid).then(res => {
              this.loading = false
              this.SportCard = res.data.result
          })
      }
    }
}
</script>

<style lang="scss" scoped>
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
  width: 600px;
  /* only for older non-grid browsers: */
  float: left;  
  /* only for older non-grid browsers: */
  margin: 45px;
}

.ht0 { grid-row-end: span 2; }
.ht1 { grid-row-end: span 3; }
.ht2 { grid-row-end: span 4; }
.ht3 { grid-row-end: span 5; }
.ht4 { grid-row-end: span 6; }
.ht5 { grid-row-end: span 7; }
.ht6 { grid-row-end: span 8; }
.ht7 { grid-row-end: span 9; }
.ht8 { grid-row-end: span 10; }

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
  font-family: 'Ultra';
}
</style>