<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{$t('ReportVacancy')}}</h3>
        <CCardHeader>
          <b-row>
            <b-col>
              <div>
                <label> {{ $t('SchoolYear') }} </label>
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
            <b-col>
              <div>
                <label> {{ $t('schoolsubject') }} </label>
                <v-select
                    :options="schoolsubjectlist"
                    v-model="filter.schoolsubjectid"
                    :reduce="item => item.id"
                    :placeholder="$t('schoolsubject')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  class="mr-2"
                  color="primary"
                  style="margin-top:28px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }}
                </CButton>
                <CButton
                  @click="Print"
                  color="primary"
                  class="float-right"
                  size="sm"
                  style="margin-top:28px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
              </div>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right"
                @click="backbyregion"
                size="sm"
                style="margin-top:28px"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </b-col>
          </b-row>
          <CRow class="form-group mt-3">  
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
								<th v-if="filter.oblastid===0 || filter.oblastid===null"  style="text-align: center;vertical-align: middle">{{$t('oblastname')}}</th>
								<th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && !filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('regionname')}}</th>
                <th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th v-if="filter.oblastid>0 && filter.regionid>0"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th  style="text-align: center" >{{$t('schoolsubjectname')}}</th>
								<th  style="text-align: center">{{$t('totalhours')}}</th>
								<th  style="text-align: center">{{$t('Sum')}}</th>		
                						
							</tr>
							
							</thead>
						
							<tbody v-if="!Loading">
							<tr v-for="(item,i) in items" style="text-align: center;vertical-align: middle" :key="i">
								
								<td v-if="filter.oblastid===0 || filter.oblastid===null" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)" @click="oblastchange(item)">{{item.oblastname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && !filter.byschool" style="text-align: left;vertical-align: middle">
                  <a href="javascript:void(0)" @click="regionchange(item)">{{item.regionname}}</a>
                </td>
                <td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.organizationname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && filter.regionid > 0" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.organizationname}}</a>
                </td>
								<td style="text-align: left;vertical-align: middle">{{item.schoolsubjectname}}</td>
							
								 <td>{{item.totalhours== 0?'-': $options.filters.currency(item.totalhours, {symbol: '', fractionCount: 0})}}</td>	
                 <td>{{item.totalsalary== 0?'-': $options.filters.currency(item.totalsalary, {symbol: '', fractionCount: 2})}}</td>
                 
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td colspan="2">{{$t('Total')}}</td>							
								<td>{{bottomrow.totalhours== 0?'-': $options.filters.currency(bottomrow.totalhours, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.totalsalary== 0?'-': $options.filters.currency(bottomrow.totalsalary, {symbol: '', fractionCount: 2})}}</td>
								
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
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import ReportVacancyService from "@/services/ReportVacancy.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      schoolsubjectlist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading : false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        totalhours: 0,
        totalsalary: 0
      },
      filter: {
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        schoolsubjectid: 0,
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
   
    SchoolSubjectService.GetAll().then(res => {
      this.schoolsubjectlist = res.data;
    });
    
    
    this.createDate();
    this.Refresh();
  },
  
  methods: {
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
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.educationlanguageid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.schoolsubjectid = item.schoolsubjectid;
      this.filter.OblastName = ' / '+ item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.schoolsubjectid = item.schoolsubjectid;
      this.filter.RegionName = ' / '+item.regionname;

    },
    backbyregion(){
      if(!!this.filter.oblastid && !this.filter.regionid){
        this.filter.oblastid = 0
        this.filter.OblastName = ""
        this.filter.schoolsubjectid = 0
      }
      if(!!this.filter.oblastid && !!this.filter.regionid){
        this.filter.regionid = 0
        this.filter.RegionName = ""
      }
    },
   Print() {
      ReportVacancyService.Print(
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolsubjectid,
         )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "ReportVacancy.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
      
    },
    Refresh() {
      this.Loading = true
      ReportVacancyService.GetVacancy(
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.schoolsubjectid
      ).then(res => {
        this.Loading = false
        this.items = res.data;
        
        this.bottomrow= {
            totalhours: 0,
            totalsalary: 0
          }
          this.calculateTotal(this.items)

      });
    },
    calculateTotal(item){
      var  totalhours= 0;
      var totalsalary= 0;      
      item.forEach(function (item) {          
            totalhours = totalhours + item.totalhours;
            totalsalary = totalsalary+ item.totalsalary;
            
      });
      this.bottomrow= {
        totalhours : totalhours,
        totalsalary: totalsalary, 
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
    
  },
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
           this.items = [];
           this.bottomrow= {
            totalhours: 0,
            totalsalary: 0
          }
          this.filter.regionid = 0;
                   
        }
        this.Refresh();
      },
      
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
           this.items = [];
          this.bottomrow= {
            totalhours: 0,
            totalsalary: 0
          }
        }
            this.Refresh();
      }
    },
    
    "filter.schoolsubjectid": {
      handler(newValue, oldValue) {
        if (newValue) {
           this.items = [];
          this.bottomrow= {
           totalhours: 0,
           totalsalary: 0
          }
        }
            this.Refresh();
           
      }
    },
    
    
  
    
  }
};
</script>
