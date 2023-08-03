<template>
    <div class="dashboard" v-if="false">
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
        <b-row class="mt-4">
            <b-col sm="12" md="2">
                <sp-list-group @click.native="SelectOblast({ id : 0 })" :active="filter.oblastid == 0"> {{ $t('Respublika') }} </sp-list-group>
                <sp-list-group @click.native="SelectOblast(item)" v-for="(item,index) in OblastList" :active="filter.oblastid == item.id" :key="index">
                     {{ item.name }} 
                </sp-list-group>
            </b-col>
            <b-col sm="12" md="10">
                <b-overlay :show="loading">
                    <b-row>
                    <b-col sm="12" md="6">
                        <sp-card width="100%" padding="0">
                            <b-row class="graphic-label">
                                <b-col  >
                                    <span>  {{ $t('Inson resurslari') }} </span>
                                </b-col>
                                <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                                    <div class="d-flex align-items-center px-2">
                                        <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FFD950"></div>
                                        <span style="font-size:10px"> {{ $t('Jami') }} </span>
                                    </div>
                                    <div class="d-flex align-items-center px-2">
                                        <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#4791FF"></div>
                                        <span style="font-size:10px"> {{ $t('Erkak') }} </span>
                                    </div>
                                    <div class="d-flex align-items-center px-2">
                                        <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FF6584"></div>
                                        <span style="font-size:10px"> {{ $t('Ayol') }} </span>
                                    </div>
                                    
                                </b-col>
                            </b-row>
                            <b-row style="background-color : #F5F8FC">
                                <b-col class="d-block" sm="12" md="6" lg="3" style="background-color : #F5F8FC;" v-for="(item,index) in CardList" :key="index">
                                    <b-row style="margin-left:16px;margin-top:7px">
                                        <b-col style="font-size:12px"> 
                                            {{ item.name }}
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-left:16px;margin-bottom:7px">
                                        <b-col style="font-size:12px;color : #4791FF">
                                            {{ $options.filters.currency(item.number, {symbol: "", fractionCount: 0, }) }}
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <apexchart type="bar" height="320" :options="chartOptions1" :series="series1"></apexchart>
                                </b-col>
                            </b-row>
                        </sp-card>
                    </b-col>
                    <b-col sm="12" md="6">
                        <sp-card width="100%" padding="0">
                            <b-row class="graphic-label">
                                <b-col  >
                                    <span>  {{ $t('Sport tadbir') }} </span>
                                </b-col>
                                <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                                    <div class="d-flex align-items-center px-2">
                                        <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#4791FF"></div>
                                        <span style="font-size:10px"> {{ $t('Tadbirlar (soni)') }} </span>
                                    </div>
                                    <div class="d-flex align-items-center px-2">
                                        <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#70C1CC"></div>
                                        <span style="font-size:10px"> {{ $t('Ishlatilgan (summa)') }} </span>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row style="background-color : #F5F8FC">
                                <b-col class="d-block" sm="12" md="6" lg="3"  v-for="(item,index) in CardList1" :key="index">
                                    <b-row style="margin-left:16px;margin-top:7px">
                                        <b-col style="font-size:12px"> 
                                            {{ item.name }}
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-left:16px;margin-bottom:7px">
                                        <b-col style="font-size:12px">
                                            <span style="color : #4791FF;margin-right:11px">
                                                 {{ $options.filters.currency(item.number, {symbol: "", fractionCount: 0, }) }}
                                            </span>
                                            <!-- <span style="color : #70C1CC"> {{ item.sum }} </span> -->
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <apexchart type="bar" height="320" :options="chartOptions2" :series="series2"></apexchart>
                                </b-col>
                            </b-row>
                        </sp-card>
                    </b-col>
                    <b-col sm="12" md="6" style="margin-top:15px;margin-bottom : 15px">
                        <sp-card width="100%" padding="0">
                            <b-row class="graphic-label">
                                <b-col  >
                                    <span> {{ $t('Bino inshoot') }} </span>
                                </b-col>
                                <b-col>
                                    
                                </b-col>
                            </b-row>
                            <b-row style="background-color : #F5F8FC">
                                <b-col class="d-block" sm="12" md="6" lg="3"  v-for="(item,index) in CardList2" :key="index">
                                    <b-row style="margin-left:16px;margin-top:7px">
                                        <b-col style="font-size:12px"> 
                                            {{ item.name }}
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-left:16px;margin-bottom:7px">
                                        <b-col style="font-size:12px">
                                            <span style="color : #FF6584;margin-right:11px">
                                                {{ $options.filters.currency(item.number, {symbol: "", fractionCount: 0, }) }}
                                            </span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <apexchart
                                        type="pie"
                                        width="550"
                                        :options="chartOptions3"
                                        :series="series3"
                                    ></apexchart>
                                </b-col>
                            </b-row>
                        </sp-card>
                    </b-col>
                    <b-col sm="12" md="6" style="margin-top:15px;margin-bottom : 15px">
                        <sp-card width="100%" padding="0">
                            <b-row class="graphic-label">
                                <b-col  >
                                    <span> {{ $t('Moliya') }} </span>
                                </b-col>
                                <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                                    <!-- <div class="d-flex align-items-center px-2">
                                        <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#4791FF"></div>
                                        <span style="font-size:10px"> 2020 y. </span>
                                    </div> -->
                                    <div class="d-flex align-items-center px-2">
                                        <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#70C1CC"></div>
                                        <span style="font-size:10px"> 2021 y. </span>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row style="background-color : #F5F8FC">
                                <b-col class="d-block" sm="12" md="6" lg="3"  v-for="(item,index) in CardList3" :key="index">
                                    <b-row style="margin-left:16px;margin-top:7px">
                                        <b-col style="font-size:12px"> 
                                            {{ item.name }}
                                        </b-col>
                                    </b-row>
                                    <b-row style="margin-left:16px;margin-bottom:7px">
                                        <b-col style="font-size:12px">
                                            <span style="color : #4791FF;margin-right:11px">
                                                {{ $options.filters.currency(item.number, {symbol: "", fractionCount: 0, }) }}
                                            </span>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <apexchart
                                        type="bar"
                                        height="320"
                                        :options="chartOptions4"
                                        :series="series4"
                                    ></apexchart>
                                </b-col>
                            </b-row>
                        </sp-card>
                    </b-col>
                    <!-- <b-col sm="12" md="6" style="margin-top:15px">
                        <b-card>
                            <h4 class="text-center"> Moliya </h4>
                            <b-row class="mt-4">
                                <b-col sm="12" md="6" lg="3" v-for="(item,index) in CardList3" :key="index">
                                    <CCard style="background:rgba(50,31,219,0.05);border:none;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;min-height : 120px" >
                                        <CCardBody>
                                            <CCardTitle style="font-size:16px"> {{ item.name }} </CCardTitle>
                                            <CCardSubtitle class="mb-2 text-success text-right"> {{ item.number }} </CCardSubtitle>
                                        </CCardBody>
                                    </CCard>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col> -->
                </b-row>
                </b-overlay>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import SpCard from '../../components/Sport/SportCard.vue'
import SpTabs from '../../components/Sport/SportTabs.vue'
import SpTab from '../../components/Sport/SportTab.vue'
import SpListGroup from '../../components/Sport/SportListGroup.vue'
import OblastService from '@/services/Oblast.service'
import DashboardService from '@/services/dashboard.service'
export default{
    components: {
        apexchart: VueApexCharts,
        SpCard,SpTabs,SpTab,SpListGroup
    },
    data(){
        return{
            filter : {
                typeid : 0,
                oblastid : 0
            },
            loading : false,
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
            OblastList : [],
            CardList : [],
            CardList1 : [],
            CardList2 : [],
            CardList3 : [],
            chartOptions1: {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'flat',
                        borderRadius: 6
                    }
                },
                legend :{
                    show : false
                },
                colors:['#FFD950','#4791FF', '#FF6584'],
                dataLabels: {
                enabled: false
                },
                stroke: {
                    show: true,
                    width: 8,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: [this.$t('Sportchi'), this.$t('Murabbiy'), this.$t('Hakam'), this.$t('Pedagog'), this.$t('Med'), this.$t('Adm')],
                },
                yaxis: {
                },
                fill: {
                opacity: 1
                },
                tooltip: {
                y: {
                    formatter: function (val) {
                        
                        return   val  + " ta"
                    }
                }
                }
            },
            series1: [],
            chartOptions2: {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: {
                        show: false
                    },
                },
                plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '35%',
                    endingShape: 'rounded',
                    borderRadius: 6
                },
                },
                legend : {
                    show : false
                },
                colors : ['#4791FF','#70C1CC'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 8,
                    colors: ['transparent']
                },
                xaxis: {
                categories: [this.$t('Yozgi olimpiada'), this.$t('Qishgi olimpiada'), this.$t('Milliy'), this.$t('Noolimpiada'), this.$t('Paralimpiya')],
                },
                yaxis: [
                    {
                        title: {
                            text: this.$t('Soni')
                        }
                    },
                    {
                        title: {
                            text: this.$t('Summa')
                        },
                        opposite : true
                    }
                ],
                fill: {
                opacity: 1
                },
                tooltip: {
                    y: [
                        {
                            formatter: function (val) {
                                return  val + " ta"
                            }
                        },
                        {
                            formatter: function (val) {
                                return  val + " mln so'm"
                            }
                        }
                    ]
                }
            },
            series2: [],
            series3: [44,52,36,12],
            chartOptions3 : {
                chart: {
                    width: 420,
                    type: "pie",
                },
                plotOptions: {
                    pie: {
                        customScale: 0.8
                    }
                },
                dataLabels:{
                    background: {
                        enabled: true,
                        foreColor: '#000',
                        padding: 8,
                        borderRadius: 2,
                        borderColor: '#fff',
                        opacity: 1
                    },
                },
                labels: [this.$t("Ma'muriy binolar"), this.$t("Sport inshootlari"), this.$t("O'quv binolari"), this.$t("Balansida bo'lmagan binolar")],
                tooltip: {
                    y: {
                            formatter: function (val) {
                                return  val + " ta"
                            }
                        }
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                ],
            },
            chartOptions4 : {
                legend : {
                    show : false
                },
                chart: {
                    type: "bar",
                    height: 430,
                    toolbar: {
                        show: false
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 6,
                        columnHeight: '55%',
                        columnWidth: '25%',
                        endingShape: 'flat',
                        dataLabels: {
                            position: "top",
                        },
                    },
                },
                colors : ['#70C1CC'],
                // '#4791FF',
                dataLabels: {
                    enabled: false,
                    offsetX: -6,
                    style: {
                        fontSize: "12px",
                        colors: ["#fff"],
                    },
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["#fff"],
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                },
                xaxis: {
                    categories: [this.$t('Ish haqi'), this.$t('Qurilish'), this.$t('Sport tadbirlari'), this.$t('Saqlash'), this.$t('jihozlash'), this.$t('Oziq-ovqat')],
                },
            },
            series4: [],
            lang : localStorage.getItem('locale') || 'ru',
            dashboardData:{}
        }
    },
    created(){
        this.filter.typeid = this.$store.state.sport.typeid
        OblastService.GetAll(this.lang).then(res => {
            this.OblastList = res.data
        })
        this.Refresh()
    },
    methods:{
        Refresh(){
            this.loading = true
            DashboardService.GetDashboardInfo(this.filter.oblastid).then(res => {
                this.loading = false
                this.dashboardData = res.data.result
                this.CardList = [
                    { id : 1, name : this.$t('Sportchilar'), number : this.dashboardData.humanResources.Athletes },
                    { id : 2, name : this.$t('Trenerlar'), number : this.dashboardData.humanResources.Trainers },
                    { id : 3, name : this.$t('Shtat birliklari'), number : this.dashboardData.humanResources.StaffingUnits },
                    { id : 4, name : this.$t('JTDSS ishtirokchilari'), number : this.dashboardData.humanResources.JTDSSParticipants },
                ]
                this.series1 = [
                    {
                        name: this.$t('Jami'),
                        data: [
                            this.dashboardData.humanResources.AthletesCount,
                            this.dashboardData.humanResources.TrainersCount,
                            this.dashboardData.humanResources.ArbitratorsCount,
                            this.dashboardData.humanResources.TeachersCount,
                            this.dashboardData.humanResources.DoctorsCount,
                            this.dashboardData.humanResources.AdministrationsCount,
                        ]
                    },
                    {
                        name: this.$t('Erkak'),
                        data: [
                            this.dashboardData.humanResources.AthleteMansCount,
                            this.dashboardData.humanResources.TrainerMansCount,
                            this.dashboardData.humanResources.ArbitratorMansCount,
                            this.dashboardData.humanResources.TeacherMansCount,
                            this.dashboardData.humanResources.DoctorMansCount,
                            this.dashboardData.humanResources.AdministrationMansCount,
                        ]
                    }, 
                    {
                        name: this.$t('Ayol'),
                        data: [
                            this.dashboardData.humanResources.AthleteWomansCount,
                            this.dashboardData.humanResources.TrainerWomansCount,
                            this.dashboardData.humanResources.ArbitratorWomansCount,
                            this.dashboardData.humanResources.TeacherWomansCount,
                            this.dashboardData.humanResources.DoctorWomansCount,
                            this.dashboardData.humanResources.AdministrationWomansCount,
                        ]
                    }
                    
                ]
                this.CardList1 = [
                    { id : 1, name : this.$t('Barcha sport tadbirlari'), number : this.dashboardData.sportsEvent.AllSportingEvents ,sum : 0 },
                    { id : 2, name : this.$t('Paralimpiya'), number : this.dashboardData.sportsEvent.ParalympicEvents,sum : 0 },
                    { id : 3, name : this.$t('JTDSS tadbirlari'), number : this.dashboardData.sportsEvent.JTDSSEvents,sum : 0 },
                    { id : 4, name : this.$t('Ommaviy tadbirlari'), number : this.dashboardData.sportsEvent.MassEvents,sum : 0 },
                ]
                this.series2 = [
                    {
                        name: this.$t('Tadbirlar soni'),
                        data: [
                            this.dashboardData.sportsEvent.SummerOlympicEventsCount,
                            this.dashboardData.sportsEvent.WinterOlympicEventsCount,
                            this.dashboardData.sportsEvent.NationalSportEventsCount,
                            this.dashboardData.sportsEvent.NoolimpiadGameEventsCount,
                            this.dashboardData.sportsEvent.ParalympicEventsCount
                        ]
                    }, 
                    {
                        name: this.$t('Ishlatilgan mablag`i'),
                        data: [
                            this.dashboardData.sportsEvent.SummerOlympicUsedFunds,
                            this.dashboardData.sportsEvent.WinterOlympicUsedFunds,
                            this.dashboardData.sportsEvent.NationalSportUsedFunds,
                            this.dashboardData.sportsEvent.NoolimpiadGameUsedFunds,
                            this.dashboardData.sportsEvent.ParalympicUsedFunds
                        ]
                    }
                ],
                this.CardList2 = [
                    { id : 1, name : this.$t('Barcha mavjud bino inshootlari'), number : this.dashboardData.building.AllBuildings, },
                    { id : 2, name : this.$t('O`quv binolari'), number : this.dashboardData.building.EducationalBuildings, },
                    { id : 3, name : this.$t('Qurilish obyektlari'), number : this.dashboardData.building.ConstructionBuildings, },
                    { id : 4, name : this.$t('`Work Out` maydonchalari'), number : this.dashboardData.building.WorkOutPlatforms, },
                ]
                this.series3 = [
                    this.dashboardData.building.AdministrativeBuildingCount || 0,
                    this.dashboardData.building.SportsBuildingCount || 0,
                    this.dashboardData.building.LearningBuildingCount || 0,
                    this.dashboardData.building.OutOfBalanceBuildingCount || 0
                ],
                this.CardList3 = [
                    { id : 1, name : this.$t('Kalendar reja'), number : this.dashboardData.finance.CalendarPlans},
                    { id : 2, name : this.$t('Ommaviy tadbirlar'), number : this.dashboardData.finance.MassEvents },
                    { id : 3, name : this.$t('Xalqaro musobaqalar'), number : this.dashboardData.finance.InternationalCompetitions},
                    { id : 4, name : this.$t('Fed-ya va ass-yalar'), number : this.dashboardData.finance.FederationsAndAssociations },
                ]
                this.series4 = [
                    // {
                    //     name : '2020 y',
                    //     data: [
                    //         this.dashboardData.finance.SalariesPercent,
                    //         this.dashboardData.finance.ConstructionPercent,
                    //         this.dashboardData.finance.SportsEventPercent,
                    //         this.dashboardData.finance.StorageCostPercent,
                    //         this.dashboardData.finance.EquipmentPercent,
                    //         this.dashboardData.finance.FoodPercent,
                    //     ],
                    // },
                    {
                        name : '2021 y',
                        data: [
                            this.dashboardData.finance.SalariesCount,
                            this.dashboardData.finance.ConstructionCount,
                            this.dashboardData.finance.SportsEventCount,
                            this.dashboardData.finance.StorageCostCount,
                            this.dashboardData.finance.EquipmentCount,
                            this.dashboardData.finance.FoodCount,
                        ],
                    },
                ]
                
            })
        },
        SelectType(item){
            this.filter.typeid = item.id
            this.$store.state.sport.typeid = item.id
            if(this.filter.typeid != 0){
                this.$router.push({ path : '/dashboard2' })
            }
        },
        SelectOblast(item){
            this.filter.oblastid = item.id
            this.Refresh()
        }
    }
}
</script>
<style>