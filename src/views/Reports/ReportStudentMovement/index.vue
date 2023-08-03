<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-center">{{$t('ReportStudentMovement')}}</h4>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col>
              <div>
                <label>{{$t('StartDate')}}</label>
                <date-picker
                    v-model="filter.StartDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
              </div>
            </b-col>
            <b-col>
              <div>
                <label>{{$t('EndDate')}}</label>
                <date-picker
                    v-model="filter.EndDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
              </div>
            </b-col>
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
                 <label> {{ $t('Oblast') }} </label>
                <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                    $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast"
              ></v-select>
              </div>
            </b-col>
            <b-col>
              <div>
                <label> {{ $t('Region') }} </label>
                <v-select
                :options="RegionList"
                v-model="filter.regionid"
                :disabled="
                  !$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    !$can('OblastSport', 'permissions') &&
                    $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 100%"
              ></v-select>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex" style="gap:15px">
                <!-- <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="margin-top:27px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }}
                </CButton> -->
                <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
                <CButton
                    color="danger"
                    @click="backbyregion"
                    size="sm"
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
								<th colspan="2" style="text-align: center;vertical-align: middle">{{$t('publicschools')}}</th>
								<th colspan="2" style="text-align: center" >{{$t('privateschools')}}</th>
								<th colspan="2" style="text-align: center" >{{$t('publicpartnershipschools')}}</th>
								<th colspan="2" style="text-align: center" >{{$t('presidentialschools')}}</th>
								<th colspan="2" style="text-align: center" >{{$t('foreignschools')}}</th>
								<th colspan="2" style="text-align: center" >{{$t('medicalandsocialservicesschools')}}</th>
                
                						
							</tr>
              <tr>
								
								<th  style="text-align: center;vertical-align: middle">{{$t('in')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('out')}}</th>								
                <th  style="text-align: center;vertical-align: middle">{{$t('in')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('out')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('in')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('out')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('in')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('out')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('in')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('out')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('in')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('out')}}</th>
								
                						
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
                <td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.organizationname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && filter.regionid > 0" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.organizationname}}</a>
                </td>
								<td >{{item.inpublicschools}}</td>		
								<td >{{item.outpublicschools}}</td>
                <td >{{item.inprivateschools}}</td>
                <td >{{item.outprivateschools}}</td>
								<td >{{item.inpublicpartnershipschools}}</td>
								<td >{{item.outpublicpartnershipschools}}</td>
								<td >{{item.inpresidentialschools}}</td>
								<td >{{item.outpresidentialschools}}</td>
								<td >{{item.inforeignschools}}</td>
								<td >{{item.outforeignschools}}</td>
								<td >{{item.inmedicalandsocialservicesschools}}</td>
								<td >{{item.outmedicalandsocialservicesschools}}</td>
							
                 
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td >{{$t('Total')}}</td>							
								<td>{{bottomrow.inpublicschools== 0?'-': $options.filters.currency(bottomrow.inpublicschools, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.outpublicschools== 0?'-': $options.filters.currency(bottomrow.outpublicschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.inprivateschools== 0?'-': $options.filters.currency(bottomrow.inprivateschools, {symbol: '', fractionCount: 2})}}</td>
                <td>{{bottomrow.outprivateschools== 0?'-': $options.filters.currency(bottomrow.outprivateschools, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.inpublicpartnershipschools== 0?'-': $options.filters.currency(bottomrow.inpublicpartnershipschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.outpublicpartnershipschools== 0?'-': $options.filters.currency(bottomrow.outpublicpartnershipschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.inpresidentialschools== 0?'-': $options.filters.currency(bottomrow.inpresidentialschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.outpresidentialschools== 0?'-': $options.filters.currency(bottomrow.outpresidentialschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.inforeignschools== 0?'-': $options.filters.currency(bottomrow.inforeignschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.outforeignschools== 0?'-': $options.filters.currency(bottomrow.outforeignschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.inmedicalandsocialservicesschools== 0?'-': $options.filters.currency(bottomrow.inmedicalandsocialservicesschools, {symbol: '', fractionCount: 2})}}</td>
								<td>{{bottomrow.outmedicalandsocialservicesschools== 0?'-': $options.filters.currency(bottomrow.outmedicalandsocialservicesschools, {symbol: '', fractionCount: 2})}}</td>
								
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
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
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
        inpublicschools: 0,
        outpublicschools: 0,
        inprivateschools: 0 ,
        outprivateschools: 0,
        inpublicpartnershipschools: 0,
        outpublicpartnershipschools: 0,
        inpresidentialschools: 0,
        outpresidentialschools: 0,
        inforeignschools: 0,
        outforeignschools: 0,
        inmedicalandsocialservicesschools: 0,
        outmedicalandsocialservicesschools: 0,
      },
      filter: {
        StartDate: '',
        EndDate: '',
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        OblastName:'',
        RegionName:''
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
      this.filter.StartDate =  "01.01." + yyyy;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.OblastName = "";
      this.filter.regionid = 0;
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
      ReportLearningProcessService.PrintStudentMovement(
        this.filter.StartDate,      
        this.filter.EndDate,
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid
      )
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
      ReportLearningProcessService.GetStudentMovement(
        this.filter.StartDate,      
        this.filter.EndDate,      
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid,
        
      ).then(res => {
        this.Loading = false
        if (res.data.oblastid != 0) {
            this.filter.oblastid = res.data.oblastid;
             RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.RegionList = res.data;
              }
            );
          }
          if (res.data.regionid != 0) {
            this.filter.oblastid = res.data.oblastid;
            this.filter.regionid = res.data.regionid;
            // this.filter.regionname = res.data.regionname;
            RegionService.GetAll(this.lang, this.filter.oblastid).then(
              (res) => {
                this.RegionList = res.data;
              }
            );
          }
        this.items = res.data.data;
        
        this.bottomrow= {
            doctabcount: 0,
            doctabsum: 0
          }
          this.calculateTotal(this.items)

      });
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    calculateTotal(item){
      var  inpublicschools= 0;
      var outpublicschools= 0;      
      var inprivateschools= 0;    
      var  outprivateschools= 0;
      var inpublicpartnershipschools= 0;      
      var outpublicpartnershipschools= 0;      
      var inpresidentialschools= 0;      
      var outpresidentialschools= 0;      
      var inforeignschools= 0;      
      var outforeignschools= 0;      
      var inmedicalandsocialservicesschools= 0;      
      var outmedicalandsocialservicesschools= 0;      
      item.forEach(function (item) {          
            inpublicschools = inpublicschools + item.inpublicschools;
            outpublicschools = outpublicschools + item.outpublicschools;
            inprivateschools = inprivateschools + item.inprivateschools;
            outprivateschools = outprivateschools + item.outprivateschools;
            inpublicpartnershipschools = inpublicpartnershipschools+ item.inpublicpartnershipschools;
            outpublicpartnershipschools = outpublicpartnershipschools+ item.outpublicpartnershipschools;
            inpresidentialschools = inpresidentialschools+ item.inpresidentialschools;
            outpresidentialschools = outpresidentialschools+ item.outpresidentialschools;
            inforeignschools = inforeignschools+ item.inforeignschools;
            outforeignschools = outforeignschools+ item.outforeignschools;
            inmedicalandsocialservicesschools = inmedicalandsocialservicesschools+ item.inmedicalandsocialservicesschools;
            outmedicalandsocialservicesschools = outmedicalandsocialservicesschools+ item.outmedicalandsocialservicesschools;
            
      });
      this.bottomrow= {
        inpublicschools : inpublicschools,
        outpublicschools: outpublicschools, 
        inprivateschools : inprivateschools,
        outprivateschools : outprivateschools,
        inpublicpartnershipschools: inpublicpartnershipschools, 
        outpublicpartnershipschools: outpublicpartnershipschools, 
        inpresidentialschools: inpresidentialschools, 
        outpresidentialschools: outpresidentialschools, 
        inforeignschools: inforeignschools, 
        outforeignschools: outforeignschools, 
        inmedicalandsocialservicesschools: inmedicalandsocialservicesschools, 
        outmedicalandsocialservicesschools: outmedicalandsocialservicesschools, 
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
