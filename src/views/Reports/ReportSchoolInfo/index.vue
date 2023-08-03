<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-center">{{$t('ReportSchoolInfo')}}</h4>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col>
              <div>
                <label> {{ $t('SchoolYear') }} </label>
                <v-select
                  :options="schoolyearlist"
                  v-model="filter.schoolyearid"
                  :reduce="item => item.id"
                  :placeholder="$t('SchoolYear')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col  sm="12" md="3">
              <div>
                <label> {{ $t('SchoolLegalForm') }} </label>
                <v-select
                  :options="schoollegalformlist"
                  v-model="filter.schoollegalformid"
                  :reduce="item => item.id"
                  :placeholder="$t('SchoolLegalForm')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>      
             <b-col sm="12" md="2">
              <label for=""> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="filter.organizationtypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('organizationtype')"
                label="name"
              >
              </v-select>
            </b-col>   
            <b-col>
              <div class="d-flex">
                <CButton
                v-if="filter.typeid == 0"
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class="mr-2"
                  style="margin-top:27px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }}
                </CButton>
                <CButton
                v-if="filter.typeid == 1"
                  @click="RefreshOblast"
                  size="sm"
                  color="primary"
                  class="mr-2"
                  style="margin-top:27px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }}
                </CButton>
                <CButton
                v-if="filter.typeid == 2"
                  @click="RefreshRegion"
                  size="sm"
                  color="primary"
                  class="mr-2"
                  style="margin-top:27px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }}
                </CButton>
                <!-- <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton> -->
              </div>
            </b-col>
            <b-col class="text-right mt-4">
            <CButton
                color="danger"
                @click="backbyregion"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
          </b-col>
          </b-row>
          <CRow class="form-group">
            <CCol lg="4" md="6" sm="6" class="text-left mt-2 pl-0">
 
            </CCol>    
          </CRow>
          <CRow class="form-group">  
            <CCol >         
              <h4 class="region-text"> 
                <a href="javascript:void(0)" @click="topcountrychange">{{$t('O`zbekiston')}}</a>
                <a href="javascript:void(0)" @click="topoblastchange" >{{filter.OblastName}}</a> 
                <a href="javascript:void(0)" >{{filter.RegionName}}</a>
              </h4>
            </CCol>
            
          </CRow>
          
        </CCardHeader>
        <div class="table-container" style="padding:5px">
						<table class="table table-bordered ">
							<thead>
							<tr>
								<th  v-if="filter.oblastid===0 || filter.oblastid===null" style="text-align: center;vertical-align: middle">{{$t('oblastname')}}</th>
								<th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && !filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('regionname')}}</th>
                                <th  v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th  v-if="filter.oblastid>0 && filter.regionid>0"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('organizationcount')}}</th>
								<th style="text-align: center" >{{$t('Employeescount')}}</th>
								<th  style="text-align: center" >{{$t('studentscount')}}</th>
								<th  style="text-align: center" >{{$t('girlscount')}}</th>
								<!-- <th  style="text-align: center" >{{$t('boyscount')}}</th> -->
							</tr>
							
							</thead>
						
							<tbody v-if="!Loading">
							<tr v-for="(item,i) in items" style="text-align: center;vertical-align: middle" :key="i" >
              
								
								<td v-if="filter.oblastid===0 || filter.oblastid===null" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)" @click="oblastchange(item)">{{item.oblastname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && !filter.byschool" style="text-align: left;vertical-align: middle">
                  <a href="javascript:void(0)" @click="regionchange(item)">{{item.regionname}}</a>
                </td>
                <td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool" style="text-align: center;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.schooltype}}</a>
                </td>
								<td v-if="filter.oblastid>0 && filter.regionid > 0" style="text-align: center;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.schooltype}}</a>
                </td>
								<td >{{$options.filters.currency(item.organizationcount, {symbol: '', fractionCount: 0})}} </td>		
								<td >{{$options.filters.currency(item.employeescount, {symbol: '', fractionCount: 0})}} </td>
                                <td > {{$options.filters.currency(item.studentscount, {symbol: '', fractionCount: 0})}}</td>
                                <td> {{$options.filters.currency(item.girlscount, {symbol: '', fractionCount: 0})}}</td>
								<!-- <td >{{item.boyscount}}</td> -->
							
                 
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td >{{$t('Total')}}</td>							
								<td>{{bottomrow.organizationcount== 0?'-': $options.filters.currency(bottomrow.organizationcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.employeescount== 0?'-': $options.filters.currency(bottomrow.employeescount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.studentscount== 0?'-': $options.filters.currency(bottomrow.studentscount, {symbol: '', fractionCount: 0})}}</td>
                                <td>{{bottomrow.girlscount== 0?'-': $options.filters.currency(bottomrow.girlscount, {symbol: '', fractionCount: 0})}}</td>
								<!-- <td>{{bottomrow.boyscount== 0?'-': $options.filters.currency(bottomrow.boyscount, {symbol: '', fractionCount: 0})}}</td> -->
							</tr>
							</tbody>
              <tbody v-if="Loading">
                  <tr>
                    <td class="text-center" colspan="19">
                      <b-spinner></b-spinner>
                    </td>
                  </tr>
              </tbody>
						</table>
						
						<br>
					</div>
      
        
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import RegionService from "@/services/Region.service";
import OblastService from "@/services/Oblast.service"
import DashboardService from '@/services/dashboard.service';
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      oblastlist: [],
      schoollegalformlist :[],
      organizationtypelist : [],
      regionlist: [],
      items: [],
      Loading : false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
          organizationcount : 0,
          employeescount : 0,
          studentscount : 0,
          girlscount : 0,
          boyscount  :0,
          typeid : 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid :0,
        organizationtypeid :4,
        oblastid: 0,
        regionid: 0,
        OblastName:'',
        RegionName:'',
        
      },
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    SchoolYearService.GetAll().then(res => {
      this.schoolyearlist = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      this.schoollegalformlist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    OblastService.GetAll().then(res =>{
      this.oblastlist = res.data
    })  
    this.createDate();
    this.Refresh();
  },
  
  methods: {
    backbyregion(){
      if(!!this.filter.oblastid && !this.filter.regionid){
        this.filter.oblastid = 0
        this.filter.OblastName = ""
        this.Refresh()
      }
      if(!!this.filter.oblastid && !!this.filter.regionid){
        this.filter.regionid = 0
        this.filter.RegionName = ""
        this.RefreshOblast({ oblastid : this.filter.oblastid })
      }
    },
    getregionlist(oblastid, setregionlist) {

      RegionService.GetAll(this.lang,this.filter.oblastid).then(res => {
        setregionlist(res.data);
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate =  "01.01." + yyyy;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.OblastName = "";
      this.filter.regionid = 0;
      this.filter.RegionName = "";
      this.Refresh()
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
      this.RefreshOblast({oblastid : this.filter.oblastid})
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = ' / '+ item.oblastname;
    this.RefreshOblast()
    },
    RefreshOblast(){
      this.filter.typeid = 1, 
        DashboardService.SchoolInfoForReport(this.filter.oblastid,this.filter.regionid,false,this.filter.schoolyearid,this.filter.schoollegalformid,this.filter.organizationtypeid).then(res => {
            this.Loading = false
        this.items = res.data.result;
        
        this.bottomrow= {
            doctabcount: 0,
            doctabsum: 0
          }
          this.calculateTotal(this.items)
        })
    },
    RefreshRegion(){
      this.filter.typeid = 2, 
        DashboardService.SchoolInfoForReport(this.filter.oblastid,this.filter.regionid,false,this.filter.schoolyearid,this.filter.schoollegalformid,this.filter.organizationtypeid).then(res => {
            this.Loading = false
        this.items = res.data.result;
        
        this.bottomrow= {
            doctabcount: 0,
            doctabsum: 0
          }
          this.calculateTotal(this.items)
        })
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = ' / '+item.regionname;
      this.RefreshRegion()
    },
   Print() {
      /* ReportLearningProcessService.Print(
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid)
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "ReportTarifficationData.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        }); */
      
    },
    Refresh() {
      this.filter.typeid = 0,
      this.Loading = true
      DashboardService.SchoolInfoForReport(
         this.filter.oblastid,
         this.filter.regionid,
        false,     
        this.filter.schoolyearid,
        this.filter.schoollegalformid,
        this.filter.organizationtypeid
      ).then(res => {
        this.Loading = false
        this.items = res.data.result;
        if(res.data.oblastid !=0){
          this.filter.oblastid = res.data.oblastid
        }
        if(res.data.regionid !=0){
          this.filter.oblastid = res.data.oblastid
          this.filter.regionid = res.data.regionid
        }
        
        this.bottomrow= {
            doctabcount: 0,
            doctabsum: 0
          }
          this.calculateTotal(this.items)

      });
    },
    calculateTotal(item){
      var  organizationcount= 0;
      var employeescount= 0;      
      var studentscount= 0;    
      var  girlscount= 0;
      var boyscount = 0;    
      item.forEach(function (item) {          
            organizationcount = organizationcount + item.organizationcount;
            employeescount = employeescount + item.employeescount;
            studentscount = studentscount + item.studentscount;
            girlscount = girlscount + item.girlscount;
            boyscount = boyscount+ item.boyscount;
      });
      this.bottomrow= {
        organizationcount : organizationcount,
        employeescount: employeescount, 
        studentscount : studentscount,
        girlscount : girlscount,
        boyscount: boyscount
      }
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    roundToTwo(value, decimals) {
      value;
      decimals;

      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    },
  },
  watch: {
    // "filter.oblastid": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //        this.items = [];
    //        this.bottomrow= {
    //         doctabcount: 0,
    //         doctabsum: 0
    //       }
    //       this.filter.regionid = 0;
                   
    //     }
    //     this.Refresh();
    //   },
      
    // },
    // "filter.regionid": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //        this.items = [];
    //       this.bottomrow= {
    //          doctabcount: 0,
    //         doctabsum: 0
    //       }
    //     }
    //         this.Refresh();
    //   }
    // },
    
  
    
  }
};
</script>
