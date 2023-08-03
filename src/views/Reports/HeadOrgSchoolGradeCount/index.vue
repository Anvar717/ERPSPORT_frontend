<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-center">{{$t('HeadOrgSchoolGradeCount')}}</h4>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col sm="12" md="6" lg="2" class="mt-2">
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
            <b-col sm="12" md="6" lg="3" class="mt-2">
                <label >{{$t('organizationtype')}}</label>
                <v-select
                    :options="OrganizationTypeList"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.organizationtypeid"
                ></v-select>
            </b-col>
            <b-col sm="12" md="6" lg="3" class="mt-2">
                <label >{{$t('schooltype')}}</label>
                <v-select
                    :options="SchoolTypeList"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="filter.schooltypeid"
                ></v-select>
            </b-col>
            <b-col sm="12" md="6" lg="3" class="mt-2">
              <div>
                <label> {{ $t('SchoolLegalForm') }} </label>
                <v-select
                  :options="schoollegalformlist"
                  v-model="filter.schoollegalformid"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
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
          <b-row>
            <b-col sm="12" md="6" lg="3">
              <div>
                <label> {{ $t("educationlanguage") }} </label>
                <v-select
                  :options="educationlanguagelist"
                  v-model="filter.educationlanguageid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
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
        <div class="table-container" style="overflow:auto; height:65vh">
						<table class="table table-bordered stikcy-header">
							<thead>
							<tr>
								<th  v-if="filter.oblastid===0 || filter.oblastid===null" style="text-align: center;vertical-align: middle">{{$t('oblastname')}}</th>
								<th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null)"  style="text-align: center;vertical-align: middle">{{$t('regionname')}}</th>
                <th  v-if="filter.oblastid>0 && filter.regionid>0"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
                <th v-if="filter.oblastid>0 && filter.regionid>0"  style="text-align: center;vertical-align: middle">{{$t('organizationinn')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('schoolgrade')}}</th>
								<th style="text-align: center" >{{$t('roomcount')}}</th>
								<th  style="text-align: center" >{{$t('orgschoolgradecount')}}</th>
								<th  style="text-align: center" >{{$t('headorgschoolgradecount')}}</th>
								<!-- <th  style="text-align: center" >{{$t('boyscount')}}</th> -->
							</tr>
							
							</thead>
						
							<tbody v-if="!Loading">
							<tr v-for="(item,i) in items" style="text-align: center;vertical-align: middle" :key="i" >
              
								
								<td v-if="filter.oblastid===0 || filter.oblastid===null" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)" @click="oblastchange(item)">{{item.oblastname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null)" style="text-align: left;vertical-align: middle">
                  <a href="javascript:void(0)" @click="regionchange(item)">{{item.regionname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && filter.regionid > 0" style="text-align: center;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.organizationname}}</a>
                </td>
                <td v-if="filter.oblastid>0 && filter.regionid > 0" >{{item.organizationinn}}</td>	
                <td >{{item.schoolgradename}}</td>		
								<td >{{$options.filters.currency(item.roomcount, {symbol: '', fractionCount: 0})}} </td>
                <td > {{$options.filters.currency(item.orgschoolgradecount, {symbol: '', fractionCount: 0})}}</td>
                <td> {{$options.filters.currency(item.headorgschoolgradecount, {symbol: '', fractionCount: 0})}}</td>
								<!-- <td >{{item.boyscount}}</td> -->
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td >{{$t('Total')}}</td>
                <td >{{$t('')}}</td>
                <td v-if="filter.oblastid>0 && filter.regionid>0" >{{$t('')}}</td>						
								<td>{{bottomrow.roomcount== 0?'-': $options.filters.currency(bottomrow.roomcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.orgschoolgradecount== 0?'-': $options.filters.currency(bottomrow.orgschoolgradecount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.headorgschoolgradecount== 0?'-': $options.filters.currency(bottomrow.headorgschoolgradecount, {symbol: '', fractionCount: 0})}}</td>
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
import ReportLearningProcessService from '@/services/ReportLearningProcess.service';
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import OrganizationTypeService from '@/services/OrganizationType.service'
import EducationLanguageService from "@/services/EducationLanguage.service";
import SchoolTypeService from '@/services/SchoolType.service'
export default {
  data() {
    return {
      schoolyearlist: [],
      oblastlist: [],
      schoollegalformlist :[],
      SchoolTypeList: [],
      OrganizationTypeList :[],
      educationlanguagelist :[],
      regionlist: [],
      items: [],
      Loading : false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
          roomcount : 0,
          orgschoolgradecount : 0,
          headorgschoolgradecount : 0,
      },
      filter: {
        schoolyearid: 3,
        schoollegalformid :0,
        organizationtypeid :0,
        schooltypeid : 0,
        educationlanguageid :0,
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
    EducationLanguageService.GetAll().then((res) => {
      this.educationlanguagelist = res.data;
    });
    OrganizationTypeService.GetAll().then(res => {
      this.OrganizationTypeList = res.data
    })
    SchoolTypeService.GetAll().then(res => {
      this.SchoolTypeList = res.data
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
      this.Refresh()
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = ' / '+item.regionname;
      this.Refresh()
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
      this.Loading = true
      ReportLearningProcessService.GetHeadOrgSchoolGradeCount(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationtypeid,
        this.filter.schooltypeid, 
        this.filter.schoollegalformid, 
        this.filter.educationlanguageid
      ).then(res => {
        this.Loading = false
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0)
          this.filter.OblastName = " / " + res.data.oblastname;
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0)
          this.filter.RegionName = " / " + res.data.regionname;
          this.calculateTotal(this.items)

      });
    },
    calculateTotal(item){
      var  roomcount= 0;
      var orgschoolgradecount= 0;      
      var headorgschoolgradecount= 0;
      item.forEach(function (item) {          
            roomcount = roomcount + item.roomcount;
            orgschoolgradecount = orgschoolgradecount + item.orgschoolgradecount;
            headorgschoolgradecount = headorgschoolgradecount + item.headorgschoolgradecount;
      });
      this.bottomrow= {
        roomcount : roomcount,
        orgschoolgradecount: orgschoolgradecount, 
        headorgschoolgradecount : headorgschoolgradecount,
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
<style scoped>
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  display: inline;
}
body {
  margin: 0;
  padding: 4rem;
}

table {
  text-align: left;
  position: relative;
  border-collapse: collapse; 
}
th, td {
  padding: 0.25rem;
}
th {
  background: white;
  position: sticky;
  top: 0; /* Don't forget this, required for the stickiness */
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
</style>
