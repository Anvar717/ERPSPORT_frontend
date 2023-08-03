<template>
  <b-container fluid   >
    <b-overlay :show="show" rounded="sm"  v-if="!$can('DashboardView', 'permissions')">
      <!-- <b-card>
        <vs-alert @click="OpenReadySchoolModal" style="cursor:pointer" :active="!isreadyschoolyear" color="danger" class="alert-schoolyear text-center"> {{ $t('schooldontready') }} </vs-alert>
      </b-card> -->
        <b-row style="background-image: url('/img/Frame.png'); background-repeat: no-repeat; margin: -30px -40px; background-size: cover; height: calc(100vh - 110px);">
        <!-- <b-col > -->
          <!-- <img style="width: 100%"  src="/img/Frame.png" alt="" /> -->
        <!-- </b-col> --> 
      </b-row>
      <!-- <b-card v-if="$can('StudentListView', 'permissions')">
          <b-row>
            <b-col>
              <h5 class="text-center"> {{$t('students')}} </h5>
              <apexchart type="bar" height="350" :options="StudentchartOptions" :series="StudentSeries"></apexchart>
            </b-col>
          </b-row>
      </b-card>
      <b-row v-if="$can('StudentListView', 'permissions')">
        <b-col>
          <b-card>
            <h5 class="text-center"> {{$t('Employeescount')}} </h5>
            <apexchart type="bar" height="350" :options="EmployeechartOptions" :series="EmployeeSeries"></apexchart>
          </b-card>
        </b-col>
      </b-row> -->
      <b-modal v-model="ReadySchoolModal" hide-footer :title="$t('note')">
        <b-row>
          <b-col>
            <p>
              {{ $t('ReadySchoolText') }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <b-button @click="ReadySchoolModal = false" variant="success">ok</b-button>
          </b-col>
        </b-row>
      </b-modal>
    </b-overlay>
    <b-overlay   v-if="$can('DashboardView', 'permissions')">
      <b-row>
        <b-col>
          <dashboard2></dashboard2>
        </b-col>
      </b-row>
    </b-overlay>
  </b-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import DashboardService from '@/services/dashboard.service'
import { BContainer,BOverlay,BCard,BRow,BCol,BAlert,BModal } from 'bootstrap-vue'
import SchoolYearService from '@/services/SchoolYear.service'
import dashboard2 from './dashboard_v2.vue'
export default {
  name: 'Dashboard',
  components: {
    apexchart : VueApexCharts,BContainer,BOverlay,BCard,BRow,BCol,BAlert,BModal,dashboard2
  },
  created() {
      this.employees()
      this.students()
      SchoolYearService.IsSchoolReadyForActiveSchoolYear().then(res => {
        this.isreadyschoolyear = res.data.result
      })
      this.show = false
  },
  methods : {
    students(){
      DashboardService.StudentsCountInSchool(true).then(res => {
      this.StudentSeries = [
        {
          name: 'O`g`il bolalar',
          data: res.data.result.map(item => item.CountOfBoys)
        }, 
        {
          name: 'Qiz bolalar',
          data: res.data.result.map(item => item.CountOfGirls)
        },
        {
          name: 'Jami',
          data: res.data.result.map(item => item.CountOFStudents)
        }
      ],
      this.StudentchartOptions = {
            chart: {
              type: 'bar',
              height: 350
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
              offsetY: 0,
              style: {
                fontSize: '12px',
                colors: ["#000"]
              }
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: res.data.result.map(x => x.schoolgradename),
            },
            yaxis: {
              title: {
                text: 'Jami o`quvchilar'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " ta"
                }
              }
            }
          }
    })
    },
    employees(){
      DashboardService.EmployeesCountInSchool(true).then(res => {
        this.EmployeeSeries = [{
            name : 'Jami',
            data: res.data.result.map(item => item.employeecount)
          }],
          this.EmployeechartOptions = {
            chart: {
              type: 'bar',
              height: 350
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
              offsetX: 0,
              style: {
                fontSize: '12px',
                colors: ['#000']
              }
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            fill: {
              opacity: 1
            },
            xaxis: {
              categories: res.data.result.map(item => item.staffcategoryfullname)
            }
          }
      })
    },
    OpenReadySchoolModal(){
      this.ReadySchoolModal = true
    },
    
  },
  data (){
    return {
      show : true,
      StudentSeries : [],
      StudentchartOptions : {},
      EmployeeSeries : [],
      EmployeechartOptions : {},
      isreadyschoolyear : false,
      ReadySchoolModal : false

    }
  },
  
}
</script>
<style>
.alert-schoolyear:hover{
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
/* .dashboard{ */
    /* background-color: red; */
    /* background-image: url('/img/sportbg.png'); */
/* } */
.graphic-label{
    font-size:13px;
    color : #4D4F52;
    margin-left: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
}
</style>