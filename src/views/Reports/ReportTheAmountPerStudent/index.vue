<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{$t('ReportTheAmountPerStudent')}}</h3>
        <CCardHeader>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label for="" class="col-sm-4 d-flex align-items-center" style="vertical-align:middle" > {{ $t('SchoolYear') }} </label>
                  <v-select
                    class="col-sm-8"
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
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class="mr-2"
                >
                  <b-icon icon="arrow-repeat"> </b-icon> {{ $t('Refresh') }}
                </CButton>
                <CButton
                @click="Print"
                color="primary"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="printer"></b-icon>
                &nbsp; {{ $t("Export") }}</CButton>
              </div>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right mr-2"
                @click="backbyregion"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </b-col>
          </b-row>
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
								<th v-if="filter.oblastid===0 || filter.oblastid===null"  width="15%" style="text-align: center;vertical-align: middle">{{$t('oblastname')}}</th>
								<th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && !filter.byschool" width="15%" style="text-align: center;vertical-align: middle">{{$t('regionname')}}</th>
                <th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) && filter.byschool"  width="15%" style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th v-if="filter.oblastid>0 && filter.regionid>0" width="15%" style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th  style="text-align: center" >{{$t('Sum')}}</th>
								<th  style="text-align: center">{{$t('sudentscount')}}</th>
								<th  style="text-align: center">{{$t('proporsiyasum')}}</th>					
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
								<td>{{$options.filters.currency(item.totalsalary, {symbol: "", fractionCount: 2,})}}</td>
								<td>{{$options.filters.currency(item.sudentscount, {symbol: "", fractionCount: 0,})}}</td>
								<td>{{$options.filters.currency(item.proporsiyasum, {symbol: "", fractionCount: 2,})}}</td>
								
								        
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td>{{$t('Total')}}</td>							
								<td>{{bottomrow.totaltotalsalary== 0?'-': $options.filters.currency(bottomrow.totaltotalsalary, {symbol: "", fractionCount: 2,})}}</td>
								<td>{{bottomrow.totalsudentscount== 0?'-': $options.filters.currency(bottomrow.totalsudentscount, {symbol: "", fractionCount: 0,})}}</td>
								<td>{{bottomrow.totalproporsiyasum== 0?'-': $options.filters.currency(bottomrow.totalproporsiyasum, {symbol: "", fractionCount: 2,})}}</td>							

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
import ReportTheAmountPerStudentService from "@/services/ReportTheAmountPerStudent.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      educationlanguagelist: [],
      oblastlist: [],
      regionlist: [],
      items: [],
      Loading : false,
      totalRows: "",
      isBusy: true,
      bottomrow: {
        totaltotalsalary: 0,
        totalsudentscount: 0,
        totalproporsiyasum: 0

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
    OblastService.GetAll().then(res => {
      this.oblastlist = res.data;
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
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.OblastName = ' / '+ item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.educationlanguageid = item.educationlanguageid;
      this.filter.RegionName = ' / '+item.regionname;

    },
   Print() {
      ReportTheAmountPerStudentService.Print(this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid
        )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "amountperstudent.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
      
    },
    Refresh() {
      this.Loading = true
      ReportTheAmountPerStudentService.GetTheAmountPerStudent(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
      ).then(res => {
        this.Loading = false
        this.items = res.data;
        if(this.filter.bycolor == true){
          this.items.sort(function(a,b){
            return a.fillcoef - b.fillcoef
          })
        }
        this.bottomrow= {
        totaltotalsalary: 0,
        totalsudentscount: 0,
        totalproporsiyasum: 0
          }
          this.calculateTotal(this.items)

      });
    },
    calculateTotal(item){
      var totaltotalsalary= 0;
      var  totalsudentscount= 0;
      var totalproporsiyasum= 0;
      
        
      item.forEach(function (item) {          
            totaltotalsalary = totaltotalsalary + item.totalsalary;
            totalsudentscount = totalsudentscount+ item.sudentscount;
            totalproporsiyasum = totalproporsiyasum + item.proporsiyasum;
      
      });
      this.bottomrow= {
        totaltotalsalary: totaltotalsalary,
        totalsudentscount: totalsudentscount,
        totalproporsiyasum: this.roundToTwo(totaltotalsalary/totalsudentscount, 2) ,
        
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
         totaltotalsalary: 0,
        totalsudentscount: 0,
        totalproporsiyasum: 0
          }
          this.filter.regionid = 0;
          
          var self = this;
          this.getregionlist(newValue, function(data) {
            self.regionlist = data;
          });
        }
        this.Refresh();
      },
      
    },
    "filter.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
           this.items = [];
          this.bottomrow= {
            totalsudentscount: 0,
         totaltotalsalary: 0,
        totalsudentscount: 0,
        totalproporsiyasum: 0
          }
        }
            this.Refresh();
      }
    },
    
  }
};
</script>
