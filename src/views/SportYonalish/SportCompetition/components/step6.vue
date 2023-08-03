<template>
  <div>
    <b-row class="mt-3 mb-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button variant="primary" class="mr-2" @click="AddSportCompetetionParticipatingOrg">
         <b-icon icon="plus" ></b-icon> {{ $t("Add") }}
        </b-button>
      </b-col>
    </b-row>
      
    <b-row>
      <b-col>
        <b-table
          :fields="fields"
          :items="step1list"
          small
          responsive="sm"
          bordered
          head-row-variant="info"
          :tbody-tr-class="rowClass"
          show-empty
        >
          <template #cell(index)="{ item, index }">
           {{index + 1}}
          </template>
          <template #cell(actions)="{ item }">
            <div class="text-center">
              <!-- <b-link
                v-if="item.statusid != 2"
                @click="Edit(item)"
                class="mr-2"
                v-c-tooltip="{ content: $t('Edit') }"
              >
                <b-icon icon="pencil" ></b-icon>
              </b-link> -->
              <b-link
                v-if="item.statusid != 2"
                @click="Delete(item)"
                class="mr-2"
                v-c-tooltip="{ content: $t('Delete') }"
              >
                <b-icon icon="trash" ></b-icon>
              </b-link>
            </div>
          </template>
          <template #empty>
            <h5 class="text-center">{{ $t("NoItems") }}</h5>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="my-modal" :title="$t('sportcompetitionParticipatingOrg')"  v-model="createModal" hide-footer size="xl"  no-close-on-backdrop>
      <div v-loading="loading">
        <b-tabs class="mt-1" pills card v-model="activeTab">
          <b-tab :title="$t('byRegion')"  key="0"/>
          <b-tab :title="$t('byOrganizationType')" key="1" />
        </b-tabs>
        <b-card>
          <!-- Orgs List -->
          <div v-if="activeTab==0">
            <organization-list-component
              :organizationtypeid="tabrow.organizationTypeId"
              @SelectedItem="SelectedOrganizationItem"
              @DblClick="AddOrganizationData"
            >
            </organization-list-component>
            <c-row class="mt-2">
              <c-col class="text-center">
                <b-button variant="primary" @click="AddOrganizationData(organizationvalue)">
                  {{ $t("Add") }}
                </b-button>
              </c-col>
            </c-row>
          </div>
          <!-- Filter by type -->
          <b-row v-else-if="activeTab==1">         
            <b-col sm="12" md="4">
              <label> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="tabrow.organizationTypeId"
                :reduce="(item) => item.id"
                @input="changeOrganizationType"
                :placeholder="$t('organizationtype')"
                label="name"
                style="width: 100%"
                class="mr-2"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="4">
              <label> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="tabrow.schoolTypeId"
                :reduce="(item) => item.id"
                @input="changeSchoolType"
                :placeholder="$t('schooltype')"
                  style="width: 100%"
                class="mr-2"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="3" md="3">
              <label class="mt-4"> {{ $t("byThisFilterFoundOrgs", {count: countFoundOrgs?countFoundOrgs:0}) }} </label>
            </b-col>
            <b-row>
              <b-col class="text-right mt-4">
                <b-button @click="Add" :disabled="!countFoundOrgs" variant="success"> {{ $t('Fill') }} </b-button>
              </b-col>
            </b-row>
          </b-row>
        </b-card>
      </div>
    </b-modal>
    <!--  -->
    <b-row>
      <b-col class="text-right">
        <b-button variant="success" v-if="!isFilled || isNewAdded" class="mr-2" @click="Save"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
        <b-button variant="success" v-else-if="!isApproved && isFilled" class="mr-2" @click="Accept"> {{ $t('Accept') }} </b-button>
        <b-button variant="primary" v-if="isFilled" @click="$emit('next')"> {{ $t('next') }} </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CountryService from "@/services/Country.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import SportCompetitionService from "@/services/SportCompetition.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationListComponent from "@/components/OrganizationListComponent.vue";

export default {
  components:{OrganizationListComponent},
  data() {
    return {
      organizationvalue:null,
      OrganizationModal: false,
      loading:false,
      activeTab: 0,
      step1: {},
      countrylist: [],
      schooltypelist:[],
      organizationtypelist: [],
      lang: "",
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      step1list: [],
      SaveLoading : false,
      tabrow: {},
      createModal: false,
      editedIndex : -1,
      firstList: [],
      countFoundOrgs: null,
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'oblastname', label: this.$t('oblastname') },
        { key: 'regionname', label: this.$t('regionname') },
        { key: 'organizationname', label: this.$t('organization') },
        { key: 'organizationtypename', label: this.$t('organizationtype') },
        { key: 'schooltypename', label: this.$t('schooltype') },
        // { key: 'statusname', label: this.$t('statusname') },
        { key: !this.isView ? 'actions' : '', label: this.$t('actions') },
      ],
    };
  },
  props: {
    sportcompetitionindicator: {
      type: Array,
      default: [],
    },
    SportCompetition:{
      type: Object,
      default: {},
    },
    uid: {
      type: String,
      default : 'd0e626d2-cbb0-4805-b468-0c6afec46c26'
    },
    isView: {
      type: Boolean,
      default : false
    }
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      this.schooltypelist = res.data;
    });
    OblastService.GetAll(this.lang,)
    .then((res) => {
      this.oblastlist = res.data;
    })
    .catch((error) => {
      this.makeToast(
        error.response.data.error,
        this.$t("Error"),
        "danger"
      );
    });
    this.getOrganizations()
    this.GetParticipatingOrgList()
  },
  computed:{
    isApproved(){
      let isapproved=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isapproved= this.SportCompetition.Steps[5].isapproved
      }
      return isapproved
    },
    isFilled(){
      let isfilled=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isfilled= this.SportCompetition.Steps[5].isfilled
      }
      return isfilled
    },
    isNewAdded(){
      let oldTable = JSON.stringify(this.firstList)
      let newTable = JSON.stringify(this.step1list)
      if (this.SportCompetition.Steps[5].isfilled && oldTable != newTable) {
        return true
      }
      return false
    }
  },
  methods: {
    getOrganizations(){
      if (this.tabrow.regionid && this.tabrow.oblastid) {
        OrganizationService.GetAll(
          this.tabrow.oblastid,
          this.tabrow.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    getOrganizationCount(){
      if (this.tabrow.organizationTypeId && this.tabrow.schoolTypeId) {
        OrganizationService.GetOrganizationCount({ schoolTypeId: this.tabrow.schoolTypeId, organizationTypeId: this.tabrow.organizationTypeId }).then((res) => {
          this.countFoundOrgs = res.data;
        });
      }
    },
    AddOrganizationData(data) {
      let newObj = {
        id: 0,
        ownerid: 0,
        oblastid: data.oblastid,
        oblastname: data.oblast,
        regionid: data.regionid,
        regionname: data.region,
        organizationid: data.id,
        organizationname: data.fullname,
        organizationtypeid: data.organizationtypeid,
        organizationtypename: data.organizationtypename,
        schooltypeid: data.schooltypeid,
        schooltypename: data.schooltypename,
        sportCompetitionUId: this.uid,
        statusid: 0
      }
      this.step1list.push(newObj);
      this.createModal = false
    },
    SelectedOrganizationItem(value){
       this.organizationvalue = value;
    },
    GetParticipatingOrgList() {
      SportCompetitionService.GetParticipatingOrgList(this.uid).then(res => {
        this.step1list = res.data.rows
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })  
    },
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateParticipatingOrg(this.step1list).then(res => {
        this.$emit('GetAction', true)
        this.firstList= JSON.parse(JSON.stringify(this.step1list))
        this.SaveLoading = false
        this.makeToast(this.$t('SavedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },  
    Accept() {
      SportCompetitionService.ApproveParticipatingOrg(this.uid).then(res => {
        this.$emit('next')
        this.$emit('GetAction', true)
        this.makeToast(this.$t('AcceptedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
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
    Add() {
      if (!this.tabrow.organizationTypeId ) {
        this.makeToast(this.$t('organizationTypeNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      if (!this.tabrow.schoolTypeId ) {
        this.makeToast(this.$t('schoolTypeNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      let formData = {
        schoolTypeId: this.tabrow.schoolTypeId,
        organizationTypeId: this.tabrow.organizationTypeId,
        sportCompetitionUId: this.uid,
      }
      this.loading =true
      SportCompetitionService.FillParticipatingOrgTable(formData).then(res =>{
        this.GetParticipatingOrgList()
        this.$emit('GetAction', true)
      }).finally(() => {
        this.loading = false
        this.createModal = false
        this.tabrow = {}
      })
      
    },
    Edit(item) {
      if (item.statusid == 0) {
        item.statusid = 2;
      }
      this.editedIndex = this.step1list.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$nextTick(()=>{
        if (this.tabrow.countryid) {
          OblastService.GetAll(this.lang, this.tabrow.countryid)
            .then((res) => {
              this.oblastlist = res.data;
            })
            .catch((error) => {
              this.makeToast(
                error.response.data.error,
                this.$t("Error"),
                "danger"
              );
            });
        }
        if (this.tabrow.regionid) {     
          OrganizationService.GetAll(
            this.tabrow.oblastid,
            this.tabrow.regionid,
            "",
            "",
            ""
          ).then((res) => {
            this.organizationlist = res.data;
          });
        }
        if (!!this.tabrow.oblastid) {
          RegionService.GetAll(this.lang, this.tabrow.oblastid).then((res) => {
            this.regionlist = res.data;
          });
        }
        this.createModal = true;
      })
    },
    Delete(item) {
      let editedIndex = this.step1list.indexOf(item);
      if (item.id) {
        SportCompetitionService.DeleteParticipatingOrg({sportCompetitionUId:this.uid, id:  item.id}).then(res =>{
          this.step1list.splice(editedIndex,1)
        })
      } else {
        this.step1list.splice(editedIndex,1)
      }
    },
    AddSportCompetetionParticipatingOrg() {
      this.GetParticipatingOrg()
    },
    GetParticipatingOrg() {
      this.loading = true
      SportCompetitionService.GetParticipatingOrg(0, this.uid).then((res) => {
        this.tabrow = res.data
        this.tabrow.statusid = 1
        this.tabrow.sportCompetitionUId = this.uid
        this.createModal = true
        this.loading = false;
      });
    },
    changeOblast(item) {
      this.regionlist = [];
      this.organizationlist = [];
      this.tabrow.regionid = 0;
      this.tabrow.sportorganizationid = 0;
      if (!!this.tabrow.oblastid) {
        this.tabrow.oblastname = this.oblastlist.filter(el => el.id == this.tabrow.oblastid)[0].name
        RegionService.GetAll(this.lang, this.tabrow.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    changeOrganization(orgId){
      this.tabrow.organizationname = this.organizationlist.filter(el => el.id == orgId)[0].shortname
    },
    changeOrganizationType(orgId){
      this.tabrow.organizationtypename = this.organizationtypelist.filter(el => el.id == orgId)[0].name
      if (this.tabrow.schoolTypeId) {
        this.getOrganizationCount()
      }
    },
    changeSchoolType(Id){
      this.tabrow.schooltypename = this.schooltypelist.filter(el => el.id == Id)[0].name
      if (this.tabrow.organizationTypeId) {
        this.getOrganizationCount()
      }
    },
    changeRegion(item) {
      this.tabrow.sportorganizationid = 0;
      this.organizationlist = [];
      if (this.tabrow.regionid) {    
        this.tabrow.regionname = this.regionlist.filter(el => el.id == this.tabrow.regionid)[0].name 
        OrganizationService.GetAll(
          this.tabrow.oblastid,
          this.tabrow.regionid,
          "",
          "",
          ""
        ).then((res) => {
          this.organizationlist = res.data;
        });
        this.getOrganizations()
      }
    },
    changeSportorganization(item){
      this.tabrow.sportorganizationname = item.name
    },
    rowClass(item, type) {
      // if (item.statusid === 3) {
      //   return "d-none";
      // }
    },
  },
};
</script>

<style>
</style>