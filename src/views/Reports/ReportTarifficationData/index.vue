<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h4 class="text-center">{{$t('ReportTarifficationData')}}</h4>
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
                <label> {{ $t('qualificationcategory') }} </label>
                <v-select
                    :options="qualificationcategorylist"
                    v-model="filter.qualificationcategoryid"
                    :reduce="item => item.id"
                    :placeholder="$t('qualificationcategory')"
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
              <div>
                <label> {{ $t('schoolgradegroup') }} </label>
                <v-select
                    :options="schoolgradegrouplist"
                    v-model="filter.schoolgradegroupid"
                    :reduce="item => item.id"
                    :placeholder="$t('schoolgradegroup')"
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
                <CButton
                  @click="Print"
                  color="primary"
                  size="sm"
                  style="margin-top:27px"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
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
								<th v-if="filter.oblastid===0 || filter.oblastid===null"  style="text-align: center;vertical-align: middle">{{$t('oblastname')}}</th>
								<th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && !filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('regionname')}}</th>
                <th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th v-if="filter.oblastid>0 && filter.regionid>0"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th  style="text-align: center;vertical-align: middle">{{$t('qualificationcategoryname')}}</th>
								<th  style="text-align: center" >{{$t('schoolsubjectname')}}</th>
                <th  style="text-align: center;vertical-align: middle">{{$t('schoolgradegroup')}}</th>
								<th  style="text-align: center">{{$t('Count')}}</th>
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
								<td style="text-align: left;vertical-align: middle">{{item.qualificationcategoryname}}</td>
								<td style="text-align: left;vertical-align: middle">{{item.schoolsubjectname}}</td>
								<td style="text-align: left;vertical-align: middle">{{item.schoolgradegroupname}}</td>
							
								 <td>{{item.doctabcount== 0?'-': $options.filters.currency(item.doctabcount, {symbol: '', fractionCount: 0})}}</td>	
                 <td>{{item.doctabsum== 0?'-': $options.filters.currency(item.doctabsum, {symbol: '', fractionCount: 2})}}</td>
                 
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td colspan="4">{{$t('Total')}}</td>							
								<td>{{bottomrow.doctabcount== 0?'-': $options.filters.currency(bottomrow.doctabcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.doctabsum== 0?'-': $options.filters.currency(bottomrow.doctabsum, {symbol: '', fractionCount: 2})}}</td>
								
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
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolGradeGroupService from "@/services/SchoolGradeGroup.service";
import ReportTarifficationDataService from "@/services/ReportTarifficationData.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      qualificationcategorylist: [],
      schoolsubjectlist: [],
      employmenttypelist: [],
      schoolgradegrouplist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading : false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        doctabcount: 0,
        doctabsum: 0
      },
      filter: {
        schoolyearid: 3,
        qualificationcategoryid: 0,
        oblastid: 0,
        regionid: 0,
        schoolsubjectid: 0,
        schoolgradegroupid: 0,
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
    QualificationCategoryService.GetAll().then(res => {
      this.qualificationcategorylist = res.data;
    });
    SchoolSubjectService.GetAll().then(res => {
      this.schoolsubjectlist = res.data;
    });
    SchoolGradeGroupService.GetAll().then(res => {
      this.schoolgradegrouplist = res.data;
    });
    
    this.createDate();
    this.Refresh();
  },
  
  methods: {
    backbyregion(){
      if(!!this.filter.oblastid && !this.filter.regionid){
        this.filter.oblastid = 0
        this.filter.OblastName = ""
        this.filter.qualificationcategoryid = 0
        this.filter.schoolsubjectid = 0
        this.filter.schoolgradegroupid = 0
      }
      if(!!this.filter.oblastid && !!this.filter.regionid){
        this.filter.regionid = 0
        this.filter.RegionName = ""
      }
    },
    getregionlist(oblastid, setregionlist) {

      RegionService.GetAll(this.filter.oblastid).then(res => {
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
      this.filter.qualificationcategoryid = item.qualificationcategoryid;
      this.filter.schoolsubjectid = item.schoolsubjectid;
      this.filter.schoolgradegroupid = item.schoolgradegroupid;
      this.filter.OblastName = ' / '+ item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.qualificationcategoryid = item.qualificationcategoryid;
      this.filter.schoolsubjectid = item.schoolsubjectid;
      this.filter.schoolgradegroupid = item.schoolgradegroupid;
      this.filter.RegionName = ' / '+item.regionname;

    },
   Print() {
      ReportTarifficationDataService.Print(
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.qualificationcategoryid,
        this.filter.schoolsubjectid,
        this.filter.schoolgradegroupid )
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
      ReportTarifficationDataService.GetTarifficationData(
        this.filter.schoolyearid,      
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.qualificationcategoryid,
        this.filter.schoolsubjectid,
        this.filter.schoolgradegroupid
      ).then(res => {
        this.Loading = false
        this.items = res.data;
        
        this.bottomrow= {
            doctabcount: 0,
            doctabsum: 0
          }
          this.calculateTotal(this.items)

      });
    },
    calculateTotal(item){
      var  doctabcount= 0;
      var doctabsum= 0;      
      item.forEach(function (item) {          
            doctabcount = doctabcount + item.doctabcount;
            doctabsum = doctabsum+ item.doctabsum;
            
      });
      this.bottomrow= {
        doctabcount : doctabcount,
        doctabsum: doctabsum, 
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
    "filter.qualificationcategoryid": {
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
    "filter.schoolsubjectid": {
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
    
    "filter.schoolgradegroupid": {
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
