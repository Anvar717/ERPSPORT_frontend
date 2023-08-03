<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{$t('ReportOnlinequeueInfo')}}</h3>
        <CCardHeader>
          <b-row>
            <b-col>
              <div>
                <label>{{$t('ondate')}}</label>
                <date-picker
                    v-model="filter.ondate"
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
                <label>{{$t('typequota')}}</label>
                <v-select
                 :options="isaddquotalist"
                 v-model="filter.quotatype"
                 :reduce="item => item.id"
                 :placeholder="$t('ChooseBelow')"
                 label="name"  
               ></v-select>
              </div>
            </b-col>
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="margin-top:28px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }} 
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
         <CRow class="form-group">
           <CCol >   
						<table class="table table-bordered ">
							<thead>
							<tr>
								<th v-if="filter.oblastid===0 || filter.oblastid===null" rowspan="2"  style="text-align: center;vertical-align: middle">{{$t('oblastname')}}</th>
								<th v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null) " rowspan="2"  style="text-align: center;vertical-align: middle">{{$t('regionname')}}</th>
								<th v-if="filter.oblastid>0 && filter.regionid>0" rowspan="2"  style="text-align: center;vertical-align: middle">{{$t('organizationname')}}</th>
								<th rowspan="2" width="15%" style="text-align: center;vertical-align: middle">{{$t('typequota')}}</th>
								<th colspan="5" style="text-align: center" >{{$t('NumberOfAdmissions')}}</th>
										
							</tr>
							<tr>
								<th width="10%" style="text-align: center;vertical-align: middle">{{$t('totalcount')}}</th>
								<th width="10%" style="text-align: center;vertical-align: middle">{{$t('createdcount')}}</th>
								<th width="10%" style="text-align: center;vertical-align: middle">{{$t('receivedcount')}}</th>
								<th width="10%" style="text-align: center;vertical-align: middle">{{$t('notreceivedcount')}}</th>
								<th width="10%" style="text-align: center;vertical-align: middle">{{$t('canceledcount')}}</th>
								
							</tr>
							</thead>
						
							<tbody>
							<tr v-for="(item,i) in items" style="text-align: center;vertical-align: middle" :key="i">
								
								<td v-if="filter.oblastid===0 || filter.oblastid===null" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)" @click="oblastchange(item)">{{item.oblastname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && (filter.regionid === 0  || filter.regionid === null)" style="text-align: left;vertical-align: middle">
                  <a href="javascript:void(0)" @click="regionchange(item)">{{item.regionname}}</a>
                </td>
								<td v-if="filter.oblastid>0 && filter.regionid > 0" style="text-align: left;vertical-align: middle" >
                  <a href="javascript:void(0)">{{item.organizationname}}</a>
                </td>
								<td style="text-align: left;vertical-align: middle" v-if="item.isaddquota">{{$t('addquota')}}</td>
								<td style="text-align: left;vertical-align: middle" v-if="!item.isaddquota">{{$t('mainquota')}}</td>
								<td>{{item.totalcount== 0?'-':$options.filters.currency(item.totalcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{item.createdcount== 0?'-':$options.filters.currency(item.createdcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{item.receivedcount== 0?'-':$options.filters.currency(item.receivedcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{item.notreceivedcount== 0?'-':$options.filters.currency(item.notreceivedcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{item.canceledcount== 0?'-':$options.filters.currency(item.canceledcount, {symbol: '', fractionCount: 0})}}</td>
								
							</tr>
              <tr style="text-align: center;vertical-align: middle;font-weight: bold">					
								<td colspan="2">{{$t('Total')}}</td>							
								<td>{{bottomrow.totalcount== 0?'-': $options.filters.currency(bottomrow.totalcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.createdcount== 0?'-': $options.filters.currency(bottomrow.createdcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.receivedcount== 0?'-': $options.filters.currency(bottomrow.receivedcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.notreceivedcount== 0?'-': $options.filters.currency(bottomrow.notreceivedcount, {symbol: '', fractionCount: 0})}}</td>
								<td>{{bottomrow.canceledcount== 0?'-': $options.filters.currency(bottomrow.canceledcount, {symbol: '', fractionCount: 0})}}</td>
								
							</tr>
							</tbody>
              
						</table>
            </CCol>
          </CRow>
        </CCardHeader>
          
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OnlineQueueInfoService from "@/services/OnlineQueueInfo.service";
export default {
  data() {
    return {
      oblastlist: [],
      regionlist: [],
      items: [],
       isaddquotalist: [
        {"id":0,"name":this.$t('allquata')},
        {"id":1,"name":this.$t('addquota')},
        {"id":2,"name":this.$t('mainquota')}
      ],
      Loading : false,
      totalRows: "",
      isBusy: true,
      tomrow: {
        oblastid: 0,
        oblastname: '',
        regionid: 0,
        regionname: '',
        organizationid: 0,
        organizationname: '',
        isaddquota: false,
        totalcount: 0,
        createdcount: 0,
        receivedcount: 0,
        notreceivedcount: 0,
        canceledcount: 0,
      },
      bottomrow: {
        totalcount: 0,
        createdcount: 0,
        receivedcount: 0,
        notreceivedcount: 0,
        canceledcount: 0,
      },
      filter: {
        ondate: "",
        oblastid: 0,
        regionid: 0,
        OblastName:'',
        RegionName:'',
        quotatype : 0
      },
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    
    
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
        this.filter.quotatype = 0
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
      this.filter.quotatype = item.isaddquota?1:2;
      this.filter.OblastName = ' / '+ item.oblastname;
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.quotatype = item.isaddquota?1:2;
      this.filter.RegionName = ' / '+item.regionname;

    },
   Print() {
      AdmQuotaAndEstatementService.Print(this.filter.schoolyearid,
        this.filter.ondate,
        this.filter.educationlanguageid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.byschool)
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SchoolAdmissionQuotaList.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
      
    },
    Refresh() {
      this.Loading = true
      OnlineQueueInfoService.GetOnlinequeueInfo(
        this.filter.ondate,
        this.filter.quotatype,
        this.filter.oblastid,
        this.filter.regionid,
      ).then(res => {
        this.Loading = false
        this.items = res.data.data;
        
        this.bottomrow= {
          totalcount: 0,
          createdcount: 0,
          receivedcount: 0,
          notreceivedcount: 0,
          canceledcount: 0,
        },
          this.calculateTotal(this.items)

      });
    },
    calculateTotal(item){
      var  totalcount= 0;
      var createdcount= 0;
      var receivedcount= 0;
      var notreceivedcount= 0;
      var canceledcount= 0;
      
      item.forEach(function (item) {          
            totalcount = totalcount + item.totalcount;
            createdcount = createdcount+ item.createdcount;
            receivedcount = receivedcount+ item.receivedcount;
            notreceivedcount = notreceivedcount+ item.notreceivedcount;
            canceledcount = canceledcount+ item.canceledcount;
            
      });
       this.bottomrow= {
          totalcount: totalcount,
          createdcount: createdcount,
          receivedcount:receivedcount,
          notreceivedcount: notreceivedcount,
          canceledcount: canceledcount,
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
            mainquota: 0,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,   
            fillcoef: 0,   
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
            mainquota: 0,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,   
            fillcoef: 0,   
          }
        }
            this.Refresh();
      }
    },
    "filter.quotatype": {
      handler(newValue, oldValue) {
        if (newValue) {
           this.items = [];
          this.bottomrow= {
            mainquota: 0,
            isreconstructed : false,
            additionalquota: 0,
            totalquota: 0,
            acceptedestatementmainquota: 0,
            acceptedestatementadditionalquota: 0,
            acceptedestatementtotalquota: 0,
            balanceestatementmainquota: 0,
            balanceestatementadditionalquota: 0,
            balanceestatementtotalquota: 0,
            totalestatement: 0,
            createdestatement: 0,
            canceledestatement: 0,
            acceptedestatement: 0,   
            fillcoef: 0,   
          }
        }
            this.Refresh();
            
      }
    },
   
    
  }
};
</script>
