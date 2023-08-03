<template>
  <div>
      <b-row class="mt-n2">
            <b-col>
                <sp-card class="d-block mr-auto ml-auto">
                    <sp-tabs>
                        <sp-tab v-for="(item,index) in TypeList" :key="index" @click.native="SelectType(item)" :active="filter.typeid == item.id" >
                            <span class="d-flex align-items-center"> <img :src="item.icon" class="mr-2" /> {{ item.name }} </span>
                        </sp-tab>
                    </sp-tabs>
                </sp-card>
            </b-col>
        </b-row>
      
      <b-overlay :show="loading" >
          <b-row style="margin-top:20px">
        <b-col sm="12" md="6" lg="3">
            <sp-table idkey="OblastId" :active="filter.oblastid" :fields="Oblastfields" :items="OblastList" @select="SelectOblast"></sp-table>
        </b-col>
        <b-col sm="12" md="6" lg="9">
            <b-row>
                <b-col>
                    <b-button variant="danger" pill  @click="Back"> <b-icon icon="arrow-left-short"></b-icon> {{ $t('back') }} </b-button>
                </b-col>
            </b-row>
            <b-row v-if="filter.SportTypeId != 0" style="margin-bottom:20px">
                <b-col>
                    <sp-card class="d-block mr-auto ml-auto">
                        <sp-tabs>
                            <sp-tab v-for="(item,index) in SportManTypeList" :key="index" @click.native="SelectSportManType(item)" :active="filter.sportmantypeid == item.id" >
                                <span class="d-flex align-items-center">  {{ item.name }} </span>
                            </sp-tab>
                        </sp-tabs>
                    </sp-card>
                </b-col>
            </b-row>
            
                <b-row v-if="filter.SportTypeId == 0" style="margin-top:20px">
                    <b-col>
                        <sp-table-one :fields="fields" :items="items">
                            <template #header_SportsTypeName="{ item }">
                                <a href="#" @click="SelectSportType(item)"> {{ item.SportsTypeName }} </a>
                            </template>
                        </sp-table-one>
                    </b-col>
                </b-row>
                <b-row v-if="filter.SportTypeId != 0">
                    <b-col>
                        <sp-table-one :fields="Sportfields" :items="SportManList">
                            <template #header_Name="{ item }">
                                <a href="#" @click="SelectSportMan(item)"> {{ item.Name }} </a>
                            </template>
                        </sp-table-one>
                    </b-col>
                </b-row>
        </b-col>
      </b-row>
      </b-overlay>
      
      
  </div>
</template>

<script>
import SpTableOne from '../../components/Sport/SportTable1.vue'
import DashboardService from '@/services/dashboard.service'
import SpTabs from '../../components/Sport/SportTabs.vue'
import SpTab from '../../components/Sport/SportTab.vue'
import SpCard from '../../components/Sport/SportCard.vue'
import SpTable from '../../components/Sport/SportTable.vue'
export default {
    components : {
        SpTableOne,
        SpTabs,
        SpTab,SpCard,SpTable
    },
    data(){
        return{
            fields : [],
            items : [],
            filter : {
                typeid : 0,
                oblastid : 0,
                SportTypeId : 0,
                index : 0,
                yearid : 2021,
                sportmantypeid : 0
            },
            loading : false,
            OblastList : [],
            Oblastfields : [
                { key : 'OblastName', label : this.$t('Hududlar'),class : 'text-left w-50' },
                { key : 'OrderCount', label : this.$t('Buyurtma'),class : 'text-center' },
                { key : 'CalendarCount', label : this.$t('Kal. reja'),class : 'text-center' },
                { key : 'FactCount', label : this.$t('Fakt'),class : 'text-center' }
            ],
            SportManTypeList : [
                {
                    id : 0,
                    name : this.$t('Asosiy'),
                },
                {
                    id : 1,
                    name : this.$t('Zaxira')
                },
                {
                    id : 2,
                    name : this.$t('Murabbiy')
                }
            ],
            TypeList : [
                {
                    id : 0,
                    name : this.$t('Main'),
                    icon : '/sportIcon/main.svg'
                },
                {
                    id : 1,
                    name : this.$t('Inson resurslari'),
                    icon : '/sportIcon/insonresurslari.svg'
                },
                {
                    id : 2,
                    name : this.$t('Sport tadbirlari'),
                    icon : '/sportIcon/sporttadbirlari.svg'
                },
                {
                    id : 3,
                    name : this.$t('Bino inshoot'),
                    icon : '/sportIcon/binoinshoot.svg'
                },
                {
                    id : 4,
                    name : this.$t('Moliya'),
                    icon : '/sportIcon/moliya.svg'
                }
            ],
            Sportfields: [
                { key : 'Name',label : this.$t('Name')},
                { key : 'DateOfBirthdayYear',label : this.$t('DateOfBirthdayYear'),class : 'text-center' },
                { key : 'Weight',label : this.$t('Weight1'),class : 'text-center' },
                { key : 'CategoryName',label : this.$t('CategoryName'),class : 'text-center' }
            ],
            Sportitems : [],
            SportManList : [] 
        }
    },
    created(){
        this.filter.typeid = this.$store.state.sport.typeid
        this.filter.index = this.$store.state.sport.index
        
        this.filter.sportmantypeid = this.$store.state.sport.sportmantypeid
        this.filter.SportTypeId = this.$store.state.sport.sporttypeid
        DashboardService.GetSportEventByOblast().then(res => {
            this.OblastList = res.data.result
        })
        
        if(this.filter.typeid == 0){
            this.$router.push({ path : '/dashboard1' })
        }
        this.Refresh()
    },
    methods:{
        func(){
            if(!!this.filter.SportTypeId){
                this.loading = true
                DashboardService.GetListOfParticipantBySportType(this.filter.oblastid,this.filter.yearid,this.filter.SportTypeId).then(res => {
                    this.Sportitems = res.data.result
                    this.loading = false
                    if(this.filter.sportmantypeid == 0){
                        this.SportManList = this.Sportitems.MainContentAthletes
                        
                    }
                    if(this.filter.sportmantypeid == 1){
                        this.SportManList = this.Sportitems.ReserveContentAthletes
                    }
                    if(this.filter.sportmantypeid == 2){
                        this.SportManList = this.Sportitems.Trainers
                    }
                    
                })
            }
        },
        Back(){
            if(this.filter.SportTypeId == 0){
                this.$router.push({ path : '/dashboard2' })
            }
            else{
                this.filter.SportTypeId = 0
                this.$store.state.sport.sporttypeid = 0
                this.Refresh()
            }
            
        },
        SelectSportMan(item){
            if(this.filter.sportmantypeid == 2){
                this.$router.push(`/trenercard/id=${item.Id}?Year=${this.filter.yearid}`)
            }
            else{
                this.$router.push(`/sportcard/id=${item.Id}?Year=${this.filter.yearid}`)
            }
            
        },
        SelectSportType(item){
            this.loading = true
            this.filter.SportTypeId = item.SportsTypeId
            this.$store.state.sport.sporttypeid = item.SportsTypeId
            DashboardService.GetListOfParticipantBySportType(this.filter.oblastid,this.filter.yearid,this.filter.SportTypeId).then(res => {
                this.Sportitems = res.data.result
                this.SelectSportManType({ id : 0 })
                this.loading = false
            })
        },
        SelectSportManType(item){
            this.filter.sportmantypeid = item.id
            this.$store.state.sport.sportmantypeid = item.id
            if(item.id == 0){
                this.SportManList = this.Sportitems.MainContentAthletes
            }
            if(item.id == 1){
                this.SportManList = this.Sportitems.ReserveContentAthletes
            }
            if(item.id == 2){
                this.SportManList = this.Sportitems.Trainers
            }
        },
        SelectType(item){
            if(item.id == 0){
                this.$router.push('/dashboard1')
                this.$store.state.sport.typeid = item.id
            }
            if(item.id == 2){
                this.filter.typeid = item.id
                this.$store.state.sport.typeid = item.id
                this.Refresh()
            }
        },
        SelectOblast(item){
            this.filter.oblastid = item
            this.Refresh()
        },
        Refresh(){
            this.loading = true
            if(this.filter.typeid == 2){
                DashboardService.DashboardSportEventInfo(this.filter.oblastid,'',this.filter.SportTypeId).then(res => {
                    if(this.filter.index == 1){
                        this.fields = [
                            { key : 'SportsTypeName',label : this.$t('SportsTypeName') },
                            { key : 'OrderCount',label : this.$t('OrderCount'),class : 'text-center' },
                            { key : 'OrderSum',label : this.$t('OrderSum'),class : 'text-center' },
                            { key : 'CalendarCount',label : this.$t('CalendarCount'),class : 'text-center' },
                            { key : 'CalendarSum',label : this.$t('CalendarSum'),class : 'text-center' },
                            { key : 'FactCount',label : this.$t('FactCount'),class : 'text-center' },
                            { key : 'FactSum',label : this.$t('FactSum'),class : 'text-center' },
                        ]
                        this.items = res.data.result.sESportTypes
                        this.loading = false
                    }
                    if(this.filter.index == 2){
                        this.fields = [
                            { key : 'SportsTypeName',label : this.$t('SportsTypeName') },
                            { key : 'UzbParticipantsCount',label : this.$t('UzbParticipantsCount'),class : 'text-center' },
                            { key : 'AsianParticipantsCount',label : this.$t('AsianParticipantsCount'),class : 'text-center' },
                            { key : 'WorldParticipantsCount',label : this.$t('WorldParticipantsCount'),class : 'text-center' },
                            { key : 'InternationalParticipantsCount',label : this.$t('InternationalParticipantsCount'),class : 'text-center' },
                            { key : 'TrainingParticipantsCount',label : this.$t('TrainingParticipantsCount'),class : 'text-center' }
                        ]
                        this.items = res.data.result.sESportTypeExecAndMeals
                        this.loading = false
                    }
                    if(this.filter.index == 3){
                        this.fields = [
                            { key : 'SportsTypeName',label : this.$t('SportsTypeName') },
                            { key : 'UzbFixedCount',label : this.$t('UzbFixedCount'),class : 'text-center' },
                            { key : 'UzbHeldCount',label : this.$t('UzbHeldCount'),class : 'text-center' },
                            { key : 'AsianFixedNumber',label : this.$t('AsianFixedNumber'),class : 'text-center' },
                            { key : 'AsianHeldCount',label : this.$t('AsianHeldCount'),class : 'text-center' },
                            { key : 'WorldFixedNumber',label : this.$t('WorldFixedNumber'),class : 'text-center' },
                            { key : 'WorldHeldCount',label : this.$t('WorldHeldCount'),class : 'text-center' },
                            { key : 'InternationalFixedNumber',label : this.$t('InternationalFixedNumber'),class : 'text-center' },
                            { key : 'InternationalHeldCount',label : this.$t('InternationalHeldCount'),class : 'text-center' },
                            { key : 'TrainingFixedNumber',label : this.$t('TrainingFixedNumber'),class : 'text-center' },
                            { key : 'TrainingHeldCount',label : this.$t('TrainingHeldCount'),class : 'text-center' }
                        ]
                        this.items = res.data.result.sESportTypeExecAndMeals
                        this.loading = false
                    }
                    if(this.filter.index == 4){
                        this.fields = [
                            { key : 'SportsTypeName',label : this.$t('SportsTypeName') },
                            { key : 'GoldMedalCount',label : this.$t('GoldMedalCount'),class : 'text-center' },
                            { key : 'SilverMedalCount',label : this.$t('SilverMedalCount'),class : 'text-center' },
                            { key : 'BronzeMedalCount',label : this.$t('BronzeMedalCount'),class : 'text-center' }
                        ]
                        this.items = res.data.result.sESportTypeExecAndMeals
                        this.loading = false
                    }
                    this.func()
                })
            }
            
        },
    }
}
</script>

<style>

</style>