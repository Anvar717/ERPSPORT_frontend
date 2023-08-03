<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-center">{{$t('ReportColorRatingOfSchools')}}</h4>
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
            <b-col>
              <div>
                <label> {{ $t('oblast') }} </label>
                 <v-select
                    :options="OblastList"
                    v-model="filter.oblastid"
                    :disabled="!$can('AdminView', 'permissions') && !$can('MinSportView', 'permissions') && $can('OblastSport', 'permissions') || $can('RegionXTB', 'permissions')"
                    :reduce="item => item.id"
                    :placeholder="$t('oblast')"
                    label="name"
                    class="mr-2"
                    style="width:100%"
                    @input="changeOblast()"
                ></v-select>
              </div>
            </b-col>
            <b-col>
              <div>
                <label> {{ $t('region') }} </label>
                <v-select
                    :options="RegionList"
                    v-model="filter.regionid"
                    :disabled="!$can('AdminView', 'permissions') && !$can('MinSportView', 'permissions') && !$can('OblastSport', 'permissions') && $can('RegionXTB', 'permissions')"
                    :reduce="item => item.id"
                    :placeholder="$t('region')"
                    label="name"
                    class="mr-2"
                    style="width:100%"
                    @input="changeRegion()"
                  ></v-select>
              </div>
            </b-col>  
            <b-col>
              <div class="d-flex">
                <CButton
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
                  @click="Print"
                  color="primary"
                  size="sm"
                  class="mr-2"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
                <CButton
                    color="danger"
                    @click="backbyregion"
                    size="sm"
                    class="mr-2"
                    style="margin-top:27px"
                  >
                    <b-icon icon="arrow-left-short" ></b-icon>
                    {{$t('back')}}
                  </CButton>
              </div>
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
								<th rowspan="2" v-if="filter.oblastid===0 || filter.oblastid===null"  style="text-align: center;vertical-align: middle">{{$t('oblastname')}}</th>
								<th rowspan="2" v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && !filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('regionname')}}</th>
                <th rowspan="2" v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th rowspan="2" v-if="filter.oblastid>0 && filter.regionid>0"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th colspan="3" style="text-align: center;vertical-align: middle">{{$t('Students')}}</th>
								<th colspan="3" style="text-align: center" >{{$t('Schools')}}</th>
                
                						
							</tr>
              <tr>
								
								<th  style="text-align: center;vertical-align: middle">{{$t('totalcount')}}</th>
								<th  style="text-align: center" >{{$t('enrolledcount')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('enrolledpercent')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('redschool')}}</th>
								<th  style="text-align: center" >{{$t('yellowschool')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('greenschool')}}</th>
                						
							</tr>
							
							</thead>
						
							<tbody v-if="!Loading">
							<tr v-for="(item,i) in items" style="text-align: center;vertical-align: middle" :key="i" 
              :class="
                item.enrolledpercent < 10  ? 'isreconstructed-danger' :
                item.enrolledpercent >= 10 && item.enrolledpercent < 30 ? 'isreconstructed-warning' : 
                item.fillcoef >= 30 ? 'isreconstructed-success' : 'isreconstructed-success'"
                >
								
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
								<td >{{item.totalcount}}</td>		
								<td >{{item.enrolledcount}}</td>
                <td >{{item.enrolledpercent}}</td>
                <td >{{item.redschool}}</td>
								<td >{{item.yellowschool}}</td>
								<td >{{item.greenschool}}</td>
							
                 
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td >{{$t('Total')}}</td>							
								<td>{{bottomrow.totalcount== 0?'-': $options.filters.currency(bottomrow.totalcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.enrolledcount== 0?'-': $options.filters.currency(bottomrow.enrolledcount, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.enrolledpercent== 0?'-': $options.filters.currency(bottomrow.enrolledpercent, {symbol: '', fractionCount: 2})}}</td>
                <td>{{bottomrow.redschool== 0?'-': $options.filters.currency(bottomrow.redschool, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.yellowschool== 0?'-': $options.filters.currency(bottomrow.yellowschool, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.greenschool== 0?'-': $options.filters.currency(bottomrow.greenschool, {symbol: '', fractionCount: 2})}}</td>
								
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
import ReportColorRatingOfSchoolsService from "@/services/ReportColorRatingOfSchools.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      OblastList: [],
      RegionList: [],
      items: [],
      Loading : false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        totalcount: 0,
        enrolledcount: 0,
        enrolledpercent: 0 ,
        redschool: 0,
        yellowschool: 0,
        greenschool: 0
      },
      filter: {
        schoolyearid: 3,
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
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    }); 
    this.createDate();
    this.Refresh();
  },
  
  methods: {
    backbyregion(){
      if(!!this.filter.oblastid && !this.filter.regionid){
        this.filter.oblastid = 0
        this.filter.OblastName = ""
      }
      if(!!this.filter.oblastid && !!this.filter.regionid){
        this.filter.regionid = 0
        this.filter.RegionName = ""
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
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.RegionName = "";
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = ' / '+ item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = ' / '+item.regionname;

    },
   Print() {
      ReportColorRatingOfSchoolsService.Print(
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
        });
      
    },
    Refresh() {
      this.Loading = true
      ReportColorRatingOfSchoolsService.GetColorRatingOfSchoolsByOblast(
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid,
        
      ).then(res => {
        this.Loading = false
        this.items = res.data.data;
        if (res.data.oblastid > 0){
          this.filter.OblastName = " / " + res.data.oblastname;
        this.filter.oblastid = res.data.oblastid;
         RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.RegionList = res.data;
              }
            );}
        if (res.data.regionid > 0){
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          this.filter.RegionName = " / " + res.data.regionname;
           RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.RegionList = res.data; 
              }
            );
        }
        
        this.bottomrow= {
            doctabcount: 0,
            doctabsum: 0
          }
          this.calculateTotal(this.items)

      });
    },
    calculateTotal(item){
      var  totalcount= 0;
      var enrolledcount= 0;      
      var greenschool= 0;    
      var  redschool= 0;
      var yellowschool= 0;      
      var greenschool= 0;      
      item.forEach(function (item) {          
            totalcount = totalcount + item.totalcount;
            enrolledcount = enrolledcount + item.enrolledcount;
            redschool = redschool + item.redschool;
            yellowschool = yellowschool+ item.yellowschool;
            greenschool = greenschool+ item.greenschool;
            
      });
      this.bottomrow= {
        totalcount : totalcount,
        enrolledcount: enrolledcount, 
        enrolledpercent: this.roundToTwo(enrolledcount*100/totalcount, 0), 
        redschool : redschool,
        yellowschool: yellowschool, 
        greenschool: greenschool, 
      }
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
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
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
           this.items = [];
           this.bottomrow= {
            doctabcount: 0,
            doctabsum: 0
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
             doctabcount: 0,
            doctabsum: 0
          }
        }
            this.Refresh();
      }
    },
    
  
    
  }
};
</script>
