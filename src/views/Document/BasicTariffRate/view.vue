<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{$t('BasicTariffRate')}}
          <div class="card-header-actions">
            <CLink href="#" class="card-header-action btn-close" v-on:click="$router.push({name : 'BasicTariffRate'})">
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
            <b-row>
                <b-col>
                    <div class="form-group form-row mb-0 py-1 " :style="{ backgroundColor : '#eee'}">
                        <label class="col-form-label col-sm-5">
                        {{
                        $t("docnumber")
                        }} :
                        </label>
                        <div class="col-sm-7 d-flex">
                        <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ BasicTariffRate.docnumber }} </a>
                        </div>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group form-row mb-0 py-1 " :style="{ backgroundColor : '#eee'}">
                        <label class="col-form-label col-sm-5">
                        {{
                        $t("docdate")
                        }} :
                        </label>
                        <div class="col-sm-7 d-flex">
                        <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ BasicTariffRate.docdate }} </a>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="form-group form-row mb-0 py-1 " :style="{ backgroundColor : '#fff'}">
                        <label class="col-form-label col-sm-5">
                        {{
                        $t("StaffTypeBasicTariff")
                        }} :
                        </label>
                        <div class="col-sm-7 d-flex">
                        <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ BasicTariffRate.stafftypebasictariffid ? stafftypebasictarifflist.filter(item => item.id == BasicTariffRate.stafftypebasictariffid)[0].name : '' }} </a>
                        </div>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group form-row mb-0 py-1 " :style="{ backgroundColor : '#fff'}">
                        <label class="col-form-label col-sm-5">
                        {{
                        $t("normativedoc")
                        }} :
                        </label>
                        <div class="col-sm-7 d-flex">
                        <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ BasicTariffRate.normativedoc }} </a>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="form-group form-row mb-0 py-1 " :style="{ backgroundColor : '#eee'}">
                        <label class="col-form-label col-sm-5">
                        {{
                        $t("DetailInfo")
                        }} :
                        </label>
                        <div class="col-sm-7 d-flex">
                        <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ BasicTariffRate.detailinfo}} </a>
                        </div>
                    </div>
                </b-col>
                <b-col>

                </b-col>
            </b-row>
        </CCardBody>
        <CRow>
          <CCol v-if="BasicTariffRate.stafftypebasictariffid===1">
            <b-table :fields="BasicTariffRateTables1" :items="BasicTariffRate.Tables"
              class="bg-color-table text-center mx-3" small style="vertical-align:middle" bordered responsive="sm">
              <template v-slot:cell(ratesum)="{item}">
                <p class="m-0 p-0">{{ $options.filters.currency(item.ratesum, {symbol: "", fractionCount: 2, }) }}</p>
              </template>
            </b-table>
          </CCol>
           <CCol v-if="BasicTariffRate.stafftypebasictariffid===2">
            <b-table :fields="BasicTariffRateTables2" :items="BasicTariffRate.Tables"
              class="bg-color-table text-center mx-3" style="vertical-align:middle" bordered responsive="sm"
              small>

              <template v-slot:cell(ratesum)="{item}">
                <p class="m-0 p-0">{{ $options.filters.currency(item.ratesum, {symbol: "", fractionCount: 2, }) }}</p>
              </template>
            </b-table>
          </CCol>
           <CCol v-if="BasicTariffRate.stafftypebasictariffid===3">
            <b-table :fields="BasicTariffRateTables3" :items="BasicTariffRate.Tables"
              class="bg-color-table text-center mx-3" style="vertical-align:middle" bordered responsive="sm" small>
                <template v-slot:cell(ratesum)="{item}">
                    <p class="m-0 p-0">{{ $options.filters.currency(item.ratesum, {symbol: "", fractionCount: 2, }) }}</p>
                </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton class="ml-4" size="sm" color="danger" @click="$router.push({name : 'BasicTariffRate'})">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import StaffTypeBasicTariffService from "@/services/StaffTypeBasicTariff.service";
  import BasicTariffRateService from "@/services/BasicTariffRate.service";

  export default {
    data() {
      return {
        BasicTariffRate: {},
        selectedrowid: 0,

        stafftypebasictarifflist: [],

        BasicTariffRateTables1: [{
            key: "positionname",
            label: this.$t("Position"),
            thClass : 'text-center'
          },
          {
            key: "qualificationcategoryname",
            label: this.$t("QualificationCategory"),
            thClass : 'text-center'
          },
          {
            key: "ratesum",
            label: this.$t("ratesum"),
            thClass : 'text-center'
          }
        ],
        BasicTariffRateTables2: [{
            key: "positionname",
            label: this.$t("Position"),
            thClass : 'text-center'
          },
          
          {
            key: "schoolgroupcontingentname",
            label: this.$t("SchoolGroupContingent"),
            thClass : 'text-center'
          },
          
          {
            key: "ratesum",
            label: this.$t("ratesum"),
            thClass : 'text-center'
          }
        ],
        BasicTariffRateTables3: [{
            key: "positionname",
            label: this.$t("Position"),
            thClass : 'text-center'
          },
          {
            key: "regiontypename",
            label: this.$t("regiontype"),
            thClass : 'text-center'
          },
          {
            key: "regiongroupname",
            label: this.$t("regiongroup"),
            thClass : 'text-center'
          },
          {
            key: "ratesum",
            label: this.$t("ratesum"),
            thClass : 'text-center'
          }
        ],
        tabrow: {
          id: 0,
          ownerid: 0,
          positionid: 0,
          positionname: "",
          qualificationcategoryid: 0,
          qualificationcategoryname: "",
          schoolgroupcontingentid: 0,
          schoolgroupcontingentname: "",
          regiontypeid: 0,
          regiontypename: "",
          regiongroupid: 0,
          regiongroupname: "",
          ratesum: 0,
          Status: 1
        },
        canchange:true,
      };
    },
    created() {
      var self = this;
      
      self.selectedrowid = self.$route.params.id;
      
      StaffTypeBasicTariffService.GetAll().then(res => {
        self.stafftypebasictarifflist = res.data;
      });
      BasicTariffRateService.Get(self.selectedrowid).then(res => {
        self.BasicTariffRate = res.data;
        self.calculate();
      });

       
    },
    methods: {
      calculate() {
        var self = this;
        var index = 0;
        self.BasicTariffRate.Tables.forEach(function(item) {
          if (item.Status !== 3) {
            index++;         
          }
        });
        if(index>0)
          self.canchange = false;
        else
          self.canchange = true;
      },

      makeToast(message, title, type) {
        var self = this;
        self.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 2000,
          variant: type,
          solid: true
        });
      },
    }
  };
</script>

<style>
</style>