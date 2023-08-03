<template>
  <div class="dashboard">
      <b-row class="mt-n2" v-if="false">
            <b-col>
                <sp-card class="d-block mr-auto ml-auto">
                    <sp-tabs>
                        <sp-tab v-for="(item,index) in TypeList" :key="index" @click.native="SelectType(item)" :active="filter.typeid == item.id" >
                            <span class="d-flex align-items-center"><img :src="item.icon" class="mr-2" /> {{ item.name }} </span>
                        </sp-tab>
                    </sp-tabs>
                </sp-card>
            </b-col>
        </b-row>
        <b-overlay :show="loading" v-if="$can('DashboardView', 'permissions')">
            <b-row style="margin-top:20px">
                <b-col sm="12" md="6" lg="3">
                    <sp-table idkey="OblastId" :active="filter.oblastid" :fields="fields" :items="OblastList" @select="SelectOblast"></sp-table>
                </b-col>
                <b-col sm="12" md="6" lg="9" >
                    <sp-card width="100%" padding="15px" v-if="filter.typeid == 1 && false">
                        <b-row>
                            <b-col sm="12" md="4">
                                <v-select
                                    :options="SportList"
                                    :reduce="item => item.id"
                                    label="name"
                                    v-model="filter.isAthlete"
                                    :placeholder="$t('sporttype')"
                                    @input="Refresh"
                                ></v-select>
                            </b-col>
                            <b-col sm="12" md="4">
                                <v-select
                                    :options="SportTypeList"
                                    :reduce="item => item.id"
                                    label="shortname"
                                    v-model="filter.sporttypeid"
                                    :placeholder="$t('sporttype')"
                                    @input="Refresh"
                                ></v-select>
                            </b-col>
                            <b-col sm="12" md="4">
                                
                            </b-col>
                        </b-row>
                    </sp-card>
                    
                        <b-row style="margin-top:16px" v-if="false">
                            <b-col sm="12" md="3" lg="2" style="display:contents">
                                <sp-chip v-for="(item,index) in CardList" :key="index" :item="item"  @select="SelectCard">

                                </sp-chip>
                            </b-col>
                        </b-row>
                    
                        <b-row>
                            <b-col sm="12" md="12" lg="6" v-if="filter.typeid == 2">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span class="mr-2"> {{ $t('Sport tadbirlari soni') }} </span>
                                            <b-button size="sm" variant="primary" @click="GotoDashboard3(1)"> {{ $t('Batafsil') }} </b-button>
                                        </b-col>
                                        <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#4791FF"></div>
                                                <span style="font-size:10px"> {{ $t('Buyurtma') }} </span>
                                            </div>
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FF6584"></div>
                                                <span style="font-size:10px"> {{ $t('Kalendar') }} </span>
                                            </div>
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FFD950"></div>
                                                <span style="font-size:10px"> {{ $t('Fakt') }} </span>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart type="bar" height="320" :options="chartOptions1" :series="series1"></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="12" lg="6" v-if="filter.typeid == 2">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span class="mr-2">  {{ $t('Sport tadbir harajatlari') }} </span>
                                            <b-button size="sm" variant="primary" @click="GotoDashboard3(1)"> {{ $t('Batafsil') }} </b-button>
                                        </b-col>
                                        <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#4791FF"></div>
                                                <span style="font-size:10px"> {{ $t('Buyurtma') }} </span>
                                            </div>
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FF6584"></div>
                                                <span style="font-size:10px"> {{ $t('Kalendar') }} </span>
                                            </div>
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FFD950"></div>
                                                <span style="font-size:10px"> {{ $t('Fakt') }} </span>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart type="bar" height="320" :options="chartOptions6" :series="series6"></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="12" lg="6" v-if="filter.typeid == 2" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span class="mr-2"> {{ $t('Ishtirokchilar soni') }} </span>
                                            <b-button size="sm" variant="primary" @click="GotoDashboard3(2)"> {{ $t('Batafsil') }} </b-button>
                                        </b-col>
                                        <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                        
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart type="bar" height="320" :options="chartOptions2" :series="series2"></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 2" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span class="mr-2"> {{ $t('Sport tadbirlari soni') }} </span>
                                            <b-button size="sm" variant="primary" @click="GotoDashboard3(3)"> {{ $t('Batafsil') }} </b-button>
                                        </b-col>
                                        <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#4791FF"></div>
                                                <span style="font-size:10px"> {{ $t('Belgilangan') }} </span>
                                            </div>
                                            <div class="d-flex align-items-center px-2">
                                                <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#70C1CC"></div>
                                                <span style="font-size:10px"> {{ $t("O'tkazilgan") }} </span>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="350"
                                                :options="chartOptions4"
                                                :series="series4"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <!-- <b-col sm="12" md="6" v-if="filter.typeid == 2" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span class="mr-2">  {{ $t("Qo'lga kiritgan medallar") }} </span>
                                            <b-button size="sm" variant="primary" @click="GotoDashboard3(4)"> {{ $t('Batafsil') }} </b-button>
                                        </b-col>
                                        <b-col>
                                            
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="pie"
                                                width="575"
                                                :options="chartOptions3"
                                                :series="series3"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col> -->
                            <b-col sm="12" md="12" v-if="filter.typeid == 4" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t('Moliya') }} </span>
                                        </b-col>
                                        <b-col>
                                            
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="320"
                                                :options="chartOptions5"
                                                :series="series5"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="12" v-if="filter.typeid == 4" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="p-3">
                                        <b-col sm="12" md="4">
                                            <v-select
                                                :options="YearList"
                                                :reduce="item => item.id"
                                                label="name"
                                                v-model="filter.yearid"
                                                :placeholder="$t('year')"
                                                @input="Refresh"
                                            ></v-select>
                                        </b-col>
                                        <b-col sm="12" md="4">
                                            <v-select
                                                :options="SportEventList"
                                                :reduce="item => item.id"
                                                label="shortname"
                                                v-model="filter.sporteventid"
                                                :placeholder="$t('sportevent')"
                                                @input="ChangeSportEvent"
                                            ></v-select>
                                        </b-col>
                                        <b-col sm="12" md="4">
                                            <v-select
                                                :options="SportTypeList"
                                                :reduce="item => item.id"
                                                label="shortname"
                                                v-model="filter.sporttypeid"
                                                :placeholder="$t('sporttype')"
                                                @input="Refresh"
                                            ></v-select>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 4" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col>
                                            <span> {{ $t("O'quv mashg'ulot harajatlari") }} </span>
                                        </b-col>
                                        <b-col>
                                            
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="pie"
                                                width="550"
                                                :options="chartOptions9"
                                                :series="series9"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 4" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t("O'quv mashg'ulot qatnashchilari") }} </span>
                                        </b-col>
                                        <b-col>
                                            
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart type="bar" height="320" :options="chartOptions10" :series="series10"></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 3" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span class="mr-2"> {{ $t("Bino inshootlar sig'imi") }} </span>
                                            <!-- <b-button v-if="!!filter.organizationtypeid" size="sm" variant="primary" @click="GotoDashboard3(1)"> Batafsil </b-button> -->
                                        </b-col>
                                        <b-col class="mr-2">
                                            <v-select
                                                :options="DashboardBuildingInfo.bBuildingsByOrgs"
                                                :placeholder="$t('ChooseBelow')"
                                                :reduce="item => item.SportsOrganizationTypeId"
                                                label="SportsOrganizationTypeName"
                                                v-model="filter.organizationtypeid"
                                                @input="ChangeOrganizationType"
                                            ></v-select>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="320"
                                                :options="chartOptions7"
                                                :series="series7"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 3" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t("Qurilishlar soni") }} </span>
                                        </b-col>
                                        <b-col class="mr-2">
                                            <v-select
                                                :options="YearList"
                                                :placeholder="$t('ChooseBelow')"
                                                :reduce="item => item.id"
                                                label="name"
                                                v-model="filter.yearid"
                                                @input="ChangeYear"

                                            ></v-select>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="pie"
                                                width="510"
                                                :options="chartOptions15"
                                                :series="series15"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            
                            <b-col sm="12" md="6" v-if="filter.typeid == 3" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="2">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t("Qurilish harajatlari") }} </span>
                                        </b-col>
                                        <b-col class="mr-2">
                                            <v-select
                                                :options="YearList"
                                                :placeholder="$t('ChooseBelow')"
                                                :reduce="item => item.id"
                                                label="name"
                                                v-model="filter.yearid"
                                                @input="ChangeYear"

                                            ></v-select>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="320"
                                                :options="chartOptions8"
                                                :series="series8"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 3" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t("JIhozlanganlik darajasi") }} </span>
                                        </b-col>
                                        <b-col class="mr-2">
                                            <!-- <v-select
                                                :options="YearList"
                                                :placeholder="$t('ChooseBelow')"
                                                :reduce="item => item.id"
                                                label="name"
                                                v-model="filter.yearid"
                                                @input="ChangeYear"

                                            ></v-select> -->
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="pie"
                                                width="510"
                                                :options="chartOptions16"
                                                :series="series16"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 1" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t("Sport toifalari") }} </span>
                                        </b-col>
                                        <b-col class="mr-2">
                                            
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="320"
                                                :options="chartOptions11"
                                                :series="series11"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 1" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t("Jinsi bo'yicha") }} </span>
                                        </b-col>
                                        <b-col class="mr-2">
                                            
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="pie"
                                                width="485"
                                                :options="chartOptions12"
                                                :series="series12"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 1" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t("Terma jamoa") }} </span>
                                        </b-col>
                                        <b-col class="mr-2">
                                            
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="320"
                                                :options="chartOptions13"
                                                :series="series13"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <b-col sm="12" md="6" v-if="filter.typeid == 1" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> {{ $t('Medallar') }} </span>
                                        </b-col>
                                        <b-col class="d-flex justify-content-end align-items-center" style="margin-right:19px">
                                        <div class="d-flex align-items-center px-2">
                                            <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#4791FF"></div>
                                            <span style="font-size:10px"> {{ $t('Oltin') }} </span>
                                        </div>
                                        <div class="d-flex align-items-center px-2">
                                            <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FF6584"></div>
                                            <span style="font-size:10px"> {{ $t('Kumush') }} </span>
                                        </div>
                                        <div class="d-flex align-items-center px-2">
                                            <div class="mr-1" style="width:12px;height:12px;border-radius:50%;background-color:#FFD950"></div>
                                            <span style="font-size:10px"> {{ $t('Bronza') }} </span>
                                        </div>
                                    </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="350"
                                                :options="chartOptions14"
                                                :series="series14"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col>
                            <!-- <b-col sm="12" md="6" v-if="filter.typeid == 3" style="margin-top:15px;margin-bottom : 15px">
                                <sp-card width="100%" padding="0">
                                    <b-row class="graphic-label">
                                        <b-col  >
                                            <span> Bino inshoot </span>
                                        </b-col>
                                        <b-col class="mr-2">
                                            <v-select
                                                :options="OrganizationTypeList"
                                                :placeholder="$t('ChooseBelow')"
                                                :reduce="item => item.id"
                                                label="name"
                                                v-model="filter.organizationtypeid"
                                                @input="ChangeOrganizationType"

                                            ></v-select>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <apexchart
                                                type="bar"
                                                height="320"
                                                :options="chartOptions8"
                                                :series="series8"
                                            ></apexchart>
                                        </b-col>
                                    </b-row>
                                </sp-card>
                            </b-col> -->
                        </b-row>
                </b-col>
            </b-row>
        </b-overlay>
        
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import SpCard from '../../components/Sport/SportCard.vue'
import SpTabs from '../../components/Sport/SportTabs.vue'
import SpTab from '../../components/Sport/SportTab.vue'
import SpTable from '../../components/Sport/SportTable.vue'
import SpChip from '../../components/Sport/SportChip.vue'
import DashboardService from '@/services/dashboard.service'
export default {
    components: {
        apexchart: VueApexCharts,
        SpCard,SpTabs,SpTab,SpTable,SpChip
    },
    data(){
        return {
            lang : 'ru',
            filter : {
                typeid : 1,
                oblastid : 0,
                sporttypeid : 0,
                cardid : 1,
                SportTypeId : 0,
                organizationtypeid : 0,
                yearid : 2021,
                sporteventid : 0,
                sporttypeid : 0,
                isAthlete : true
            },
            SportList:[
                {
                    id : false,
                    name : this.$t('Murabbiy')
                },
                {
                    id : true,
                    name : this.$t('Sportchi')
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
            fields : [],
            OblastList : [],
            CardList : [
                { id : 1, label : this.$t('Sportchilar'),number : 100 },
                { id : 2, label : this.$t('Murabbiylar'),number : 100 },
                { id : 3, label : this.$t('Hakamlar'),number : 100 },
                { id : 4, label : this.$t('Instruktorlar'),number : 100 },
                { id : 5, label : this.$t('Trabiyachilar'),number : 100 },
                { id : 6, label : this.$t('O`quvchilar'),number : 100 },
                { id : 7, label : this.$t('Pedagoglar'),number : 100 },
                { id : 8, label : this.$t('Psixologlar'),number : 100 },
                { id : 9, label : this.$t('Tibbiy xodimlar'),number : 100 },
                { id : 10, label : this.$t('Boshqaruv'),number : 100 },
                { id : 11, label : this.$t('Texnik xodimlar'),number : 100 },
                { id : 12, label : this.$t('Vakantlar'),number : 100 },
            ],
            SportTypeList : [],
            chartOptions1: {},
            chartOptions6: {},
            series1 : [],
            series6 : [],
            chartOptions2: {},
            series2: [],
            series3: [44, 55,34],
            chartOptions3 : {},
            chartOptions4 : {},
            series4: [],
            chartOptions5 : {},
            series5: [],
            loading : false,
            DashboardFinanceInfo : {},
            DashboardSportEvent : {},
            DashboardBuildingInfo : {},
            chartOptions7: {},
            series7 : [],
            chartOptions8: {},
            series8 : [],
            chartOptions9: {},
            series9 : [44,52,36,12],
            OrganizationTypeList : [],
            YearList : [
                { id : 2021, name : '2021' },
                { id : 2022, name : '2022' }
            ],
            SportEventList : [],
            SportTypeList : [],
            chartOptions10: {
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
                colors:['#4791FF', '#FF6584', '#FFD950'],
                dataLabels: {
                enabled: false
                },
                stroke: {
                    show: true,
                    width: 8,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: [this.$t('Asosiy tarkib'), this.$t('Zaxira tarkib'), this.$t('Murabbiy')],
                },
                yaxis: {
                // title: {
                //     text: 'Soni'
                // }
                },
                fill: {
                opacity: 1
                },
                tooltip: {
                y: {
                    formatter: function (val) {
                        //return   this.$options.filters.currency(val, {symbol: "", fractionCount: 2, })  + " ta"
                        return   val  + " ta"
                    }
                }
                }
            },
            series10: [],
            chartOptions11: {},
            series11: [],
            series12: [44,52,36,12],
            chartOptions12 : {
                chart: {
                    width: 485,
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
                labels: [this.$t("Erkak"), this.$t("Ayol")],
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
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return   val  + " ta"
                        }
                    }
                }
            },
            chartOptions13: {},
            series13: [],
            chartOptions14 : {},
            series14: [],
            chartOptions15 : {},
            series15 : [10,20],
            chartOptions16 : {},
            series16 : [0,1]
        }
    },
    created() {
        this.lang = localStorage.getItem('locale') || 'ru'
        this.filter.typeid = this.$store.state.sport.typeid
        if (this.filter.typeid == 0) {
            this.filter.typeid = 1
            this.$router.push({ path : '/dashboard1' })
        }
        
        DashboardService.GetAllSportsEvent().then(res => {
            this.SportEventList = res.data.result
        })
        this.GetSportTypeList()
        // if(this.filter.typeid == 1 || this.filter.typeid == 4){
        //     this.GetSportTypeList()
        // }
        this.Refresh()
    },
    methods:{
        GotoDashboard3(index){
            this.$store.state.sport.index = index
            this.$router.push({ path : '/dashboard3' })
        },
        ChangeSportEvent(){
            // this.GetSportTypeList()
            this.Refresh()
        },
        GetSportTypeList(){
            DashboardService.GetAllSportsType(0,0).then(res => {
                this.SportTypeList = res.data.result
            })
        },
        ChangeYear(){
            
        },
        Refresh() {
            this.loading = true
            if(this.filter.typeid == 1){
                DashboardService.GetHRByOblast(this.filter.yearid,this.filter.isAthlete, this.lang).then(res => {
                    this.OblastList = res.data.result
                    this.fields = [
                        { key : 'OblastName', label : this.$t('Hududlar'),class : 'text-left w-40' },
                        { key : 'PersonCount', label : this.$t('Umumiy'),class : 'text-center w-20' },
                        { key : 'MansCount', label : this.$t('Erkak'),class : 'text-center w-20' },
                        { key : 'WomansCount', label : this.$t('Ayol'),class : 'text-center w-20' },
                    ]
                })
                this.loading = false
                    this.loading = true
                    DashboardService.DashboardHumanResourceInfo(this.filter.oblastid,this.filter.yearid,this.filter.sporttypeid,this.filter.isAthlete, this.lang).then(res => {
                        this.loading = false
                        this.CardList = res.data.result.ForCard
                        this.chartOptions11 = {
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
                            colors:['#4791FF', '#FF6584', '#FFD950'],
                            dataLabels: {
                            enabled: false
                            },
                            stroke: {
                                show: true,
                                width: 8,
                                colors: ['transparent']
                            },
                            xaxis: {
                                categories:  res.data.result.hRBySportCategories.map(item => item.SportCategorieName.slice(0,15) + '...'),
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
                        }
                        this.series11 = [
                            {
                                name : this.$t('Sport toifalari'),
                                data : res.data.result.hRBySportCategories.map(item => item.Count)
                            }
                        ]
                        this.series12 = [res.data.result.hRByGender.MansCount,res.data.result.hRByGender.WomansCount]
                        this.chartOptions13 = {
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
                                    columnWidth: '30%',
                                    endingShape: 'flat',
                                    borderRadius: 6
                                }
                            },
                            legend :{
                                show : false
                            },
                            colors:['#4791FF', '#FF6584', '#FFD950'],
                            dataLabels: {
                            enabled: false
                            },
                            stroke: {
                                show: true,
                                width: 8,
                                colors: ['transparent']
                            },
                            xaxis: {
                                categories: [this.$t('Yoshlar'), this.$t('O`smirlar'),this.$t('Yoshi kattalar')]
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
                        }
                        this.series13 = [
                            {
                                name : this.$t('Asosiy'),
                                data : [
                                    res.data.result.hRByTeamSquad.YoungMainCount,
                                    res.data.result.hRByTeamSquad.TeenagerMainCount,
                                    res.data.result.hRByTeamSquad.OlderMainCount
                                ]
                            },
                            {
                                name : this.$t('Zaxira'),
                                data : [
                                    res.data.result.hRByTeamSquad.YoungReserveCount,
                                    res.data.result.hRByTeamSquad.TeenagerReserveCount,
                                    res.data.result.hRByTeamSquad.OlderReserveCount
                                ]
                            }
                        ]
                        this.chartOptions14 = {
                            legend : {
                                show : false
                            },
                            chart: {
                                type: "bar",
                                height: 350,
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
                            colors : ['#4791FF','#FF6584','#FFD950'],
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
                                y: {
                                    formatter: function (val) {
                                        //return   this.$options.filters.currency(val, {symbol: "", fractionCount: 2, })  + " ta"
                                        return   val  + " ta"
                                    }
                                }
                            },
                            xaxis: {
                                categories: res.data.result.hRByMedals.map(item => item.SportsDirectionName),
                            },
                        }
                        this.series14 = [
                            {
                                name : this.$t('Oltin'),
                                data : res.data.result.hRByMedals.map(item => item.GoldMedalCount)
                            },
                            {
                                name : this.$t('Kumush'),
                                data : res.data.result.hRByMedals.map(item => item.SilverMedalCount)
                            },
                            {
                                name : this.$t('Bronza'),
                                data : res.data.result.hRByMedals.map(item => item.BronzeMedalCount)
                            }
                        ]
                    })

            }
            if(this.filter.typeid == 2){
                DashboardService.GetSportEventByOblast().then(res => {
                    this.OblastList = res.data.result
                    this.fields = [
                        { key : 'OblastName', label : this.$t('Hududlar'),class : 'text-left w-40' },
                        { key : 'OrderCount', label : this.$t('Buyurtma'),class : 'text-center w-20' },
                        { key : 'CalendarCount', label : this.$t('Kal. reja'),class : 'text-center w-20' },
                        { key : 'FactCount', label : this.$t('Fakt'),class : 'text-center w-20' },
                    ]
                })
                DashboardService.DashboardSportEventInfo(this.filter.oblastid,'',this.filter.SportTypeId).then(res => {
                    this.loading = false
                    this.DashboardSportEvent = res.data.result
                    this.CardList = res.data.result.ForCard
                    this.chartOptions1 = {
                        chart: {
                            type: 'bar',
                            height: 350,
                            toolbar: {
                                show: false
                            },
                            events: {
                                dataPointSelection: (event, chartContext, config) => {
                                    this.$router.push({ path : '/dashboard3' })
                                }
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
                        colors:['#4791FF', '#FF6584', '#FFD950'],
                        dataLabels: {
                        enabled: false
                        },
                        stroke: {
                            show: true,
                            width: 8,
                            colors: ['transparent']
                        },
                        xaxis: {
                            categories: res.data.result.sESportDirections.map(item => item.SportsDirectionName.slice(0,10) + '...'),
                        },
                        yaxis: {
                        // title: {
                        //     text: 'Soni'
                        // }
                        },
                        fill: {
                        opacity: 1
                        },
                        tooltip: {
                            y: {
                                formatter: function (val) {
                                    return   `${val} ${val > 100000 ? " mln so'm" : " ta"} `
                                }
                            }
                        }
                    }
                    this.chartOptions6 = {
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
                        colors:['#4791FF', '#FF6584', '#FFD950'],
                        dataLabels: {
                        enabled: false
                        },
                        stroke: {
                            show: true,
                            width: 8,
                            colors: ['transparent']
                        },
                        xaxis: {
                            categories: res.data.result.sESportDirections.map(item => item.SportsDirectionName.slice(0,10) + '...'),
                        },
                        yaxis: {
                        // title: {
                        //     text: 'Soni'
                        // }
                        },
                        fill: {
                        opacity: 1
                        },
                        tooltip: {
                            y: {
                                formatter: function (val) {
                                    return  val +  " mln so'm"
                                }
                            }
                        }
                    }
                    this.series1 = [
                        {
                            name: this.$t('Buyurtma'),
                            data: res.data.result.sESportDirections.map(item => item.OrderCount),
                        }, 
                        {
                            name: this.$t('Kalendar'),
                            data: res.data.result.sESportDirections.map(item => item.CalendarCount),
                        }, 
                        {
                            name: this.$t('Fakt'),
                            data: res.data.result.sESportDirections.map(item => item.FactCount),
                        }
                    ]
                    this.chartOptions2 = {
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
                                columnWidth: '20%',
                                endingShape: 'flat',
                                borderRadius: 6
                            }
                        },
                        legend :{
                            show : false
                        },
                        colors:['#4791FF', '#FF6584', '#FFD950'],
                        dataLabels: {
                        enabled: false
                        },
                        stroke: {
                            show: true,
                            width: 8,
                            colors: ['transparent']
                        },
                        xaxis: {
                            categories: [this.$t('O`zbek chemp...'),this.$t('Osiyo chemp...'),this.$t('Jahon chemp...'),this.$t('Xalqaro chemp...'),this.$t('O`quv mash...')],
                        },
                        yaxis: {
                        // title: {
                        //     text: 'Soni'
                        // }
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
                    }
                    this.series2 = [
                        {
                            name: this.$t('Ishtirokchilar soni'),
                            data: [
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.UzbParticipantsCount).reduce((a,b) => a + b,0) ,
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.AsianParticipantsCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.WorldParticipantsCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.InternationalParticipantsCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.TrainingParticipantsCount).reduce((a,b) => a + b,0),
                            ]
                        }
                    ]
                    this.series6 = [
                        {
                            name: this.$t('Buyurtma'),
                            data: res.data.result.sESportDirections.map(item => item.OrderSum),
                        }, 
                        {
                            name: this.$t('Kalendar'),
                            data: res.data.result.sESportDirections.map(item => item.CalendarSum),
                        }, 
                        {
                            name: this.$t('Fakt'),
                            data: res.data.result.sESportDirections.map(item => item.FactSum),
                        }
                    ]
                    this.chartOptions4 = {
                        legend : {
                            show : false
                        },
                        chart: {
                            type: "bar",
                            height: 350,
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
                        colors : ['#4791FF','#70C1CC'],
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
                            y: {
                                formatter: function (val) {
                                    return   val  + " ta"
                                }
                            }
                        },
                        xaxis: {
                            categories: [this.$t('O`zbek chemp...'),this.$t('Osiyo chemp...'),this.$t('Jahon chemp...'),this.$t('Xalqaro chemp...'),this.$t('O`quv mash...')],
                        },
                    },
                    this.series4 = [
                        {
                            name : this.$t('Belgilangan'),
                            data: [
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.UzbFixedCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.AsianFixedNumber).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.WorldFixedNumber).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.InternationalFixedNumber).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.TrainingFixedNumber).reduce((a,b) => a + b,0),
                            ],
                        },
                        {
                            name : this.$t('O`tkazilgan'),
                            data: [
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.UzbHeldCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.AsianHeldCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.WorldHeldCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.InternationalHeldCount).reduce((a,b) => a + b,0),
                                res.data.result.sESportDirectionExecAndMeals.map(item => item.TrainingHeldCount).reduce((a,b) => a + b,0),
                            ],
                        },
                    ],
                    this.chartOptions3 = {
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
                        labels: [this.$t("Oltin"),this.$t("Kumush"),this.$t("Bronza")],
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
                        tooltip: {
                            y: {
                                formatter: function (val) {
                                    return   val  + " ta"
                                }
                            }
                        }
                    }
                    this.series3 = [
                        res.data.result.sESportDirectionExecAndMeals.map(item => item.GoldMedalCount).reduce((a,b) => a + b,0),
                        res.data.result.sESportDirectionExecAndMeals.map(item => item.SilverMedalCount).reduce((a,b) => a + b,0),
                        res.data.result.sESportDirectionExecAndMeals.map(item => item.BronzeMedalCount).reduce((a,b) => a + b,0)
                    ]
                })
            }
            if(this.filter.typeid == 4){
                DashboardService.GetFinanceByOblast(this.filter.yearid).then(res => {
                    this.OblastList = res.data.result
                    this.fields = [
                        { key : 'OblastName', label : this.$t('Hududlar'),class : 'text-left w-50' },
                        { key : 'AllocatedFunds', label : this.$t('AllocatedFunds'),class : 'text-center w-30' },
                        { key : 'ReaCost', label : this.$t('ReaCost'),class : 'text-center w-20' }
                    ]
                })
                DashboardService.DashboardFinanceInfo(this.filter.oblastid,this.filter.yearid,this.filter.sporteventid,this.filter.sporttypeid).then(res => {
                    this.loading = false
                    this.DashboardFinanceInfo = res.data.result
                    this.CardList = res.data.result.ForCard
                    this.chartOptions5 = {
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
                        colors : ['#4791FF','#70C1CC'],
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
                            y: {
                                    formatter: function (val) {
                                        return  val.toFixed(1) + " mln so'm"
                                    }
                                }
                        },
                        xaxis: {
                            categories: res.data.result.fFinance.map(item => item.FinancingTypeName),
                        },
                    }
                    this.series5 = [
                        {
                            name: this.$t('DetachedSum'),
                            data: res.data.result.fFinance.map(item => item.DetachedSum)
                        },
                        {
                            name: this.$t('UsedSum'),
                            data: res.data.result.fFinance.map(item => item.UsedSum)
                        }
                    ]
                    this.series9 = [
                        res.data.result.fFinanceBySportType.financing.FoodExpenses,
                        res.data.result.fFinanceBySportType.financing.HostelExpenses,
                    ],
                    this.chartOptions9 = {
                        chart: {
                            width: 550,
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
                        labels: [this.$t("Yashash harajatlari"), this.$t("Ovqatlanish harajatlari")],
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
                        tooltip: {
                            y: {
                                    formatter: function (val) {
                                        return  val.toFixed(1) + " mln so'm"
                                    }
                                }
                        },
                    }
                    this.series10 = [
                        {
                            name : this.$t('Erkak'),
                            data : [
                                res.data.result.fFinanceBySportType.participant.MainMansCount,
                                res.data.result.fFinanceBySportType.participant.ReserveMansCount,
                                res.data.result.fFinanceBySportType.participant.TrainersCount,
                            ]
                        },
                        {
                            name : this.$t('Ayol'),
                            data : [
                                res.data.result.fFinanceBySportType.participant.MainWomansCount,
                                res.data.result.fFinanceBySportType.participant.ReserveWomansCount,
                                0
                            ]
                        }
                    ]
                })
            }
            if(this.filter.typeid == 3){
                DashboardService.GetBuildingByOblast(this.filter.yearid).then(res => {
                    this.OblastList = res.data.result
                    this.fields = [
                        { key : 'OblastName', label : this.$t('Hududlar'),class : 'text-left w-40' },
                        { key : 'TotalBuildingsCount', label : this.$t('Jami'),class : 'text-center w-20' },
                        { key : 'EmergencySituationCount', label : this.$t('EmergencySituationCount'),class : 'text-center w-20' },
                        { key : 'NewConstruction', label : this.$t('NewConstruction'),class : 'text-center w-20' },
                    ]
                    this.chartOptions16 = {
                        chart: {
                            width: 510,
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
                        labels: [this.$t("JIhozlangan"), this.$t("Jihozlanmagan")],
                        tooltip: {
                            y: {
                                    formatter: function (val) {
                                        return  val.toFixed(1) + " %"
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
                    }
                    this.series16 = [
                        res.data.result.filter(item => item.OblastId == this.filter.oblastid)[0].EquipmentLevel * 100,
                        100 - res.data.result.filter(item => item.OblastId == this.filter.oblastid)[0].EquipmentLevel * 100
                    ]
                })
                DashboardService.DashboardBuildingInfo(this.filter.oblastid,this.filter.yearid).then(res => {
                    this.loading = false
                    this.DashboardBuildingInfo = res.data.result
                    this.CardList = res.data.result.ForCard
                    this.chartOptions8 = {
                        chart: {
                            type: 'bar',
                            height: 320,
                            toolbar: {
                                show: false
                            }
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
                            show : true
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
                        categories: [this.$t('Shartnoma'),this.$t('Bajarilishi'), this.$t('Moliyalashtirish')],
                        },
                        
                        yaxis: [
                            {
                                title: {
                                    text: this.$t('Summasi')
                                }
                            }
                        ],
                        fill: {
                        opacity: 1
                        },
                        tooltip: {
                            y: [
                                {
                                    formatter: function (val) {
                                        return  val + " mln so'm"
                                    }
                                },
                                {
                                    formatter: function (val) {
                                        return  val + " mln so'm"
                                    }
                                }
                            ]
                        }
                    }
                    this.series8 = [
                        {
                            name: this.$t('Yangi qurilish'),
                            data: [
                                res.data.result.bConstructionBuilding.NewConstruction.TotalContractSum.toFixed(1),
                                res.data.result.bConstructionBuilding.NewConstruction.PerformedSum.toFixed(1),
                                res.data.result.bConstructionBuilding.NewConstruction.FundedSum.toFixed(1)
                            ]
                        }, 
                        {
                            name: this.$t('Rekonstruktsiya'),
                            data: [
                                res.data.result.bConstructionBuilding.Reconstruction.TotalContractSum.toFixed(1),
                                res.data.result.bConstructionBuilding.Reconstruction.PerformedSum.toFixed(1),
                                res.data.result.bConstructionBuilding.Reconstruction.FundedSum.toFixed(1)
                            ]
                        }
                    ]
                    this.chartOptions15 = {
                        chart: {
                            width: 510,
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
                        labels: [this.$t("Yangi qurilish"), this.$t("Rekonstruktsiya")],
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
                    }
                    this.series15 = [
                        res.data.result.bConstructionBuilding.NewConstruction.BuildingCount,
                        res.data.result.bConstructionBuilding.Reconstruction.BuildingCount
                    ]
                })
            }
            
        },
        ChangeYear(){
            this.Refresh()
        },
        ChangeOrganizationType(){
            var bBuildingsByOrgs = this.DashboardBuildingInfo.bBuildingsByOrgs.filter(item => item.SportsOrganizationTypeId == this.filter.organizationtypeid)[0]
            this.chartOptions7 = {
                chart: {
                    type: 'bar',
                    height: 320,
                    toolbar: {
                        show: false
                    },
                    events: {
                            dataPointSelection: (event, chartContext, config) => {
                                alert(1)
                            }
                        }
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
                    show : true
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
                categories: [this.$t('Quvvati'),this.$t('Talabalar soni')],
                },
                
                yaxis: [
                    {
                        title: {
                            text: this.$t('Soni')
                        }
                    },
                    {
                        title: {
                            text: this.$t('Soni')
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
                            return  val + " ta"
                        }
                    }
                ]
                }
            }
            this.series7 = [
                {
                    name: '2020',
                    data: [
                        bBuildingsByOrgs.StudentСapacity,
                        bBuildingsByOrgs.StudentsCount,
                    ]
                }, 
                {
                    name: '2021',
                    data: [
                        bBuildingsByOrgs.StudentСapacity,
                        bBuildingsByOrgs.StudentsCount,
                    ]
                }
            ]
        },
        SelectType(item){
            if(item.id == 0){
                this.$router.push('/dashboard1')
                this.filter.typeid = item.id
                this.$store.state.sport.typeid = item.id
            }
            else{
                this.filter.typeid = item.id
                this.$store.state.sport.typeid = item.id
                this.Refresh()
            }
            
        },
        SelectCard(item){
            this.filter.cardid = item.id
        },
        SelectOblast(item){
            this.filter.oblastid = item
            this.Refresh()
        },
        SelectCard(item){

        }
    }
}
</script>

<style>
/* .dashboard{
    background-color: red;
    background-image: url('/img/sportbg.png');
} */
.graphic-label{
    font-size:13px;
    color : #4D4F52;
    margin-left: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
}
</style>