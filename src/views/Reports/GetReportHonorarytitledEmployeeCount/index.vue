<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col class="mt-2" md="2" lg="2">
            <CButton color="danger" @click="backbyregion" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"><h4 class="text-center">{{ $t("GetReportHonorarytitledEmployeeCount") }}</h4></b-col>
          <b-col md="2">
               <CButton @click="Print" class="float-right mr-2" color="primary" size="sm">
                  <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
                {{ $t("Print") }}
              </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              "
              sm="12"
              md="2"
              lg="2"
              class="achievement-input"
            >
              <label> {{ $t("Oblast") }} </label>
              <v-select
                :options="OblastList"
                v-model="filter.oblastId"
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="ChangeOblast"
              ></v-select>
            </b-col>
            <b-col
              v-if="
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              "
              sm="12"
              md="2"
              lg="2"
              class="achievement-input"
            >
              <label> {{ $t("Region") }} </label>
              <v-select
                :options="RegionList"
                v-model="filter.regionId"
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
              >
              </v-select>
            </b-col>
             <b-col sm="12" md="2" lg="2" class="achievement-input">
              <label for=""> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                @input="Refresh"
                v-model="filter.organizationTypeId"
              ></v-select>
            </b-col>
          
            <b-col sm="12" md="2" class="achievement-input">
              <label> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="filter.schoolTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('schooltype')"
                @input="Refresh"
                 style="width: 100%"
                class="mr-2"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="2" lg="3" class="achievement-input">
              <label> {{ $t("honorarytitletype") }} </label>
              <v-select
                :options="honoraryTitleTypeList"
                v-model="filter.honoraryTitleTypeId"
                :reduce="(item) => item.id"
                :placeholder="$t('honorarytitletype')"
                @input="Refresh"
                 style="width: 100%"
                class="mr-2"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col style="margin-top:30px">
              <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  class="ml-2"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                </CButton>
            </b-col>
          </b-row>
        </CCardHeader>
        <b-tabs class="mt-1" variant="tabs" v-model="activeTab" @input="onTabChange">
          <b-tab :title="$t('byRegion')"  key="0"/>
          <b-tab :title="$t('Faxriy unvonlar soni bo`yicha')" key="1" />
        </b-tabs>
        <div class="table-container" style="padding: 5px">
          <div class="mobileStyle">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("OrderNumber") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="filter.oblastId === 0 || filter.oblastId === null || filter.oblastId === 999"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("sportPlaceName") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastId > 0 &&
                      (filter.regionId === 0 || filter.regionId === null || filter.regionId === 999) &&
                      !filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("regionname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="
                      filter.oblastId > 0 &&
                      (filter.regionId === 0 || filter.regionId === null) &&
                      filter.byschool
                    "
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                  <th
                    rowspan="2"
                    v-if="filter.oblastId > 0 && filter.regionId > 0"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("organizationname") }}
                  </th>
                    <th
                    v-if="filter.isByHonoraryTitleType"
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Faxriy unvoni") }}
                  </th>
                  <th
                    rowspan="2"
                    style="text-align: center; vertical-align: middle"
                  >
                    {{ $t("Faxriy unvoni olganlar soni") }}
                  </th>
                 <!--  -->
                </tr>
              </thead>
              <tbody v-if="!Loading">
                <tr
                  v-for="(item, i) in items"
                  :class="i == index ? 'success' : ''"
                  style="text-align: center; vertical-align: middle"
                  :key="i"
                >
                  <td>
                    {{ i + 1 }}
                  </td>
                  <td
                    v-if="filter.oblastId === 0 || filter.oblastId === null || filter.oblastId === 999"
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="oblastchange(item, i)"
                      >{{ item.oblastname }}</a
                    >
                  </td>
                  <td
                    v-if="
                      filter.oblastId > 0 &&
                      (filter.regionId === 0 || filter.regionId === null || filter.regionId === 999)
                    "
                    style="text-align: left; vertical-align: middle"
                  >
                    <a
                      href="javascript:void(0)"
                      @click="regionchange(item, i)"
                      >{{ item.regionname }}</a
                    >
                  </td>
                   <td
                    v-if="filter.oblastId > 0 && filter.regionId > 0"
                    style="text-align: left; vertical-align: middle"
                  >
                    <!-- <a href="javascript:void(0)" v-if="!filter.isByHonoraryTitleType" @click="organizationChange(item, i)">{{ item.organizationname }}</a>
                    <span v-else>{{ item.organizationname }}</span> -->
                    
                    <span>{{ item.organizationname }}</span>
                  </td>

                  <!-- <td style="text-align: left;" v-if="filter.isByHonoraryTitleType">
                    <a href="javascript:void(0)" v-if="filter.oblastId > 0 && filter.regionId > 0" @click="organizationChange(item, i)">
                      {{ item.positionname }}
                    </a>
                    <span v-else>{{ item.positionname }}</span>
                  </td> -->

                  <td v-if="filter.isByHonoraryTitleType">
                    {{item.honorarytitletypename}}
                  </td>
                  <td>
                    {{ item.totalcount }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="Loading">
                <tr>
                  <td class="text-center" colspan="30">
                    <b-spinner></b-spinner>
                  </td>
                </tr>
              </tbody>
                <tbody v-if="items.length == 0">
              <tr>
                <td :colspan="20">
                  <h5 class="text-center">{{ $t("NoItems") }}</h5>
                </td>
              </tr>
            </tbody>
              <tfoot v-if="items.length != 0">
                <tr style="text-align: center; vertical-align: middle; font-weight: bold; white-space: nowrap">
                  <!-- <td v-if="!filter.isByHonoraryTitleType" :colspan="(filter.oblastId === 999 || filter.regionId === 999)?3:2">{{ $t("Total") }}</td>
                  <td v-if="filter.isByHonoraryTitleType" :colspan="(filter.oblastId != 999 || filter.regionId != 999)? 3 : 4">{{ $t("Total") }}</td> -->
                  <td v-if="filter.oblastId == 999" :colspan="activeTab == 0 ? 3 : 4"> {{ $t("Total") }} </td>
                  <td v-if="filter.oblastId != 999" :colspan="activeTab == 0 ? 2 : 3"> {{ $t("Total") }} </td>
                  <td>
                    {{ calculateAllCounts('totalcount') }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <br />
        </div>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportReportService from "@/services/SportReport.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import HonoraryTitleTypeService from "@/services/HonoraryTitleType.service";
export default {
  data() {
    return {
      OblastList: [],
      RegionList: [],
      organizationtypelist: [],
      schooltypelist:[],
      honoraryTitleTypeList:[],
      SportTypeTables: [],
      items: [],
      tablename: "",
      Loading: false,
      PrintLoading: false,
      totalRows: "",
      index: null,
      organizationtypelist: [],
      Fields: [
        {
          key: "index",
          tdClass: "text-cebter",
          thClass: "text-center",
          label: this.$t("OrderNumber"),
        },
        {
          key: "sportname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("sporttype"),
        },
        {
          key: "groupcount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sportgroup"),
        },
        {
          key: "sporttitle1count1",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sporttitle1count"),
        },
        {
          key: "sporttitle2count",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Murabbiy"),
        },
        {
          key: "viewsportsmen",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Student"),
        },
      ], 
      activeTab: 0,
      sportTypeClassifierlist: [],
      filter: {
        oblastId: 0,
        regionId: 0,
        organizationTypeId: 0,
        schoolTypeId: 0,
        honoraryTitleTypeId:0,
        isByHonoraryTitleType:false,
        showAllRegion: false,
        showAllOrganization: false,
        OblastName: "",
        RegionName: "",
        SortColumn: "",
        OrderType: "",
      },
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
      if (this.$route.query.oblastId) {
      this.filter.oblastId=parseInt(this.$route.query.oblastid)
      if (this.filter.oblastId ==999) {
        this.filter.showAllRegion = true;
      }
    }

    if (this.$route.query.activeTab) {
      this.activeTab = parseInt(this.$route.query.activeTab)
      this.filter.isByHonoraryTitleType = this.activeTab?true:false;
    }
    if (this.$route.query.regionId) {
      this.filter.regionId=parseInt(this.$route.query.regionId)
      if (this.filter.regionId ==999) {
        this.filter.showAllOrganization = true;          
      }
    }
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.OblastList.unshift({ id: 999, countryid: 999,  name: this.$t("seeAllDistricts")})
    });
     HonoraryTitleTypeService.GetAll().then((res) => {
      this.honoraryTitleTypeList = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    this.Refresh();
  },

  methods: {
    backbyregion() {
      if (!!this.filter.oblastId && !this.filter.regionId) {
        this.filter.oblastId = 0;
        this.filter.OblastName = "";
        this.filter.qualificationcategoryid = 0;
        this.filter.schoolsubjectid = 0;
        this.filter.schoolgradegroupid = 0;
      }
      if (!!this.filter.oblastId && !!this.filter.regionId) {
        this.filter.regionId = 0;
        this.filter.RegionName = "";
      }
      this.Refresh()
    },
    oblastchange(item, i) {
      this.filter.oblastId = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.ChangeOblast()
    },
    regionchange(item, i) {
        if (this.filter.showAllRegion) {
       this.changeQuery("regionid", item.regionId);
       this.filter.oblastID = item.oblastID;
       this.ChangeOblast()
     }
      this.filter.regionId = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
    },
    organizationChange(item) {
        this.$router.push({name:'StaffReportList', query:{...this.filter, organizationid: item.organizationid}})
    },
    calculateAllCounts(key) {
      let total = 0
      this.items.forEach(el => {
        total = total + el[key]
      })
      return total
    },
      Print() {
        (this.PrintLoading = true),
        SportReportService.PrintReportHonorarytitledEmployeeCount(
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.organizationTypeId,
        this.filter.schoolTypeId,
        this.filter.isByHonoraryTitleType,
        this.filter.honoraryTitleTypeId,
        this.filter.showAllRegion,
        this.filter.showAllOrganization,
        )
          .then((res) => {
            (this.PrintLoading = false),
              this.forceFileDownload(res, "PrintReportHonorarytitledEmployeeCount");
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
            this.PrintLoading = false;
          });
    },
       forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    ChangeOblast() {
      let newValue = this.filter.oblastId
      if (newValue) {
        if (newValue == 999) {
          this.filter.showAllRegion = true;          
        } else {
          this.filter.showAllRegion = false;          
          RegionService.GetAll(this.lang, this.filter.oblastId).then((res) => {
            this.RegionList = res.data;
            if (res.data && res.data.length) {
                this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastId,  name: this.$t("seeAllOblastOrganizations")})
            }
          });
        }
      }
      this.changeQuery('oblastId', newValue)
      if (newValue) {
        this.items = [];
        if (this.$route.query && this.$route.query.regionId) {
          if (this.RegionList.length) {
            this.filter.regionId = 0;
            this.changeQuery('regionId', null)
          } else {
            this.filter.regionId=this.$route.query.regionId
          }
        } else {
          this.filter.regionId = 0;
          this.changeQuery('regionId', null)
        }
      } else {
        this.filter.regionId = 0;
        this.changeQuery('regionId', null)
        this.filter.showAllRegion = false
        this.RegionList = []
      }
      this.Refresh();
    },
    Refresh() {
      this.Loading = true;
      SportReportService.GetReportHonorarytitledEmployeeCount(this.filter)
        .then((res) => {
          this.Loading = false;
          this.items = res.data.data;
           if (res.data.oblastid || res.data.oblastId) {
            this.filter.oblastId = res.data.oblastid || res.data.oblastId;
            RegionService.GetAll(this.lang, this.filter.oblastId).then((res) => {
              this.RegionList = res.data;
              if (res.data && res.data.length) {
                  this.RegionList.unshift({ id: 999, oblastid: this.filter.oblastId,  name: this.$t("seeAllOblastOrganizations")})
              }
            });
          }
          if (res.data.regionId > 0) {
            this.filter.regionId = res.data.regionid;
            this.filter.RegionName = " / " + res.data.regionname;
          }
          this.totalRows = res.data.total;
        })
    },
    onTabChange(val) {
      if (val == 1) {
        this.filter.isByHonoraryTitleType = true;
      } else {
        this.filter.isByHonoraryTitleType = false;
      }
      this.changeQuery('activeTab', val)

      this.Refresh()
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
  },
  watch: {
    "filter.regionId": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.items = [];
        if (newValue == 999) {
            this.filter.showAllOrganization = true;  
          }else{
            this.filter.showAllOrganization = false;  
          }
        }else{
          this.filter.showAllOrganization = false;  
        }
        this.changeQuery('regionId', newValue)
        this.Refresh();
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.success {
  background-color: rgb(200, 238, 247);
}
</style>
