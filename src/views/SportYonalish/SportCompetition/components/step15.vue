<template>
  <div>
    <b-row class="mt-3 mb-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button variant="primary" class="mr-2" @click="AddSportCompetetionIndicator">
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
              <b-link
                @click="Delete(item)"
                v-if="item.statusid != 2"
                class="mr-2"
                v-c-tooltip="{ content: $t('Delete') }"
              >
                <b-icon icon="trash" ></b-icon>
              </b-link>
            </div>
          </template>
          <template #cell(fullname)="{ item }">
            <div class="text-center">
              {{item.fullname?item.fullname:[item.familyname,item.firstname, item.lastname].join(' ')}}
            </div>
          </template>
          <template #empty>
            <h5 class="text-center">{{ $t("NoItems") }}</h5>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="my-modal" :title="$t('SportCompetetionAddWinner')"  v-model="createModal" hide-footer size="xl"  no-close-on-backdrop>
      <WinnerCreate v-if="createModal" :uid="uid" @save="Add" @changePosition="changePosition" @changeQualification="changeQualification"  :tabrow="tabrow" :SportCompetition="SportCompetition" typeForm="WinnerCreate" />
    </b-modal>
    <b-row>
      <b-col class="text-right">
        <b-button variant="success" v-if="!isFilled ||isNewAdded" class="mr-2" @click="Save"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
        <b-button variant="success" v-else-if="!isApproved && isFilled" class="mr-2" @click="Accept"> {{ $t('Accept') }} </b-button>
        <!-- <b-button variant="primary" v-if="isFilled" @click="$emit('next')"> {{ $t('next') }} </b-button> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CustomNumberInput from "@/components/CustomNumberInput.vue";
import SportCompetitionService from "@/services/SportCompetition.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import PositionService from '@/services/Position.service'
import WinnerCreate from "./_juryCreate.vue";

export default {
  components:{
    CustomNumberInput, WinnerCreate
  },
  data() {
    return {
      step1: {},
      positionlist: [],
      qualificationcategorylist: [],
      lang: "",
      step1list: [],
      loading: false,
      SaveLoading : false,
      tabrow: {},
      createModal: false,
      editedIndex : -1,
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'fullname', label: this.$t('personname1') },
        { key: 'dateofbirth', label: this.$t('dateofbirth') },
        { key: 'gendername', label: this.$t('gender') },
        { key: 'sporttypeclassifierdisciplinename', label: this.$t('sporttypeclassifierdiscipline') },
        { key: 'sportrankname', label: this.$t('sportrank') },
        { key: !this.isView ? 'actions' : '', label: this.$t('actions') },
      ],
    };
  },
  props: {
    sportcompetitionindicator: {
      type: Array,
      default: [],
      firstList:[],
    },
    SportCompetition:{
      type: Object,
      default: {},
    },
    uid: {
      type: String,
      default : ''
    },
    isView: {
        type: Boolean,
        default: false
    }
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    PositionService.GetAll(0, 0, false, 0)
      .then((res) => {
        this.positionlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    QualificationCategoryService.GetAll(this.lang)
      .then((res) => {
        this.qualificationcategorylist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    this.GetWinnerList()
  },
  computed:{
    thisStep(){
      return this.SportCompetition.Steps.find(el => el.ordernumber == 15)
    },
    isApproved(){
      return this.thisStep?this.thisStep.isapproved:false
    },
    isFilled(){
      return this.thisStep?this.thisStep.isfilled:false
    },
     isNewAdded(){
      let oldTable = JSON.stringify(this.firstList)
      let newTable = JSON.stringify(this.step1list)
      if (this.isFilled && oldTable != newTable) {
        return true
      }
      return false
    }
  },
  methods: {
    GetWinnerList() {
      SportCompetitionService.GetWinnerList(this.uid).then(res => {
        this.step1list = res.data.rows
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })  
    },
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateWinner(this.step1list).then(res => {
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
      SportCompetitionService.ApproveWinner(this.uid).then(res => {
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
    Add(data) {
      let saveData = data
      Object.keys(saveData).forEach(key => {
        if (key=='base64photo' || key=='CheckWinner' || key=='DocumentTables'|| key=='PersonPhoto'|| key=='LivePlaceTables') {
          delete saveData[key]
        } 
      })
      saveData.issueorganization =''
      saveData.sportCompetitionUId = this.uid
      saveData.id = 0
      saveData.statusid = 1
      saveData.positionid = this.tabrow.positionid   
      saveData.positionname = this.tabrow.positionname
      saveData.qualificationcategoryid = this.tabrow.qualificationcategoryid   
      saveData.qualificationcategoryname = this.tabrow.qualificationcategoryname
      var self = this
      if (self.editedIndex > -1) {
        Object.assign(
          self.step1list[self.editedIndex],
          saveData
        );
      } else {
        self.step1list.push(saveData);
      }
      self.createModal = false
      self.tabrow = {}
    },
    changePosition(item){
      this.tabrow.positionname = item.name
      this.tabrow.positionid = item.id
    },
    changeQualification(item){
      this.tabrow.qualificationcategoryname = item.name
      this.tabrow.qualificationcategoryid = item.id
    },
    Edit(item) {
      if (item.statusid == 0) {
        item.statusid = 2;
      }
      this.editedIndex = this.step1list.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.createModal = true;
    },
    Delete(item) {
      let editedIndex = this.step1list.indexOf(item);
      if (item.id) {
        SportCompetitionService.DeleteWinner({sportCompetitionUId:this.uid, id:  item.id}).then(res =>{
          this.step1list.splice(editedIndex,1)
        })
      } else {
        this.step1list.splice(editedIndex,1)
      }
  
    },
    AddSportCompetetionIndicator() {
      this.GetIndicator()
    },
    changeSourceItem(item){
      this.tabrow.positionname=item.name
    },
    changeQualificatgionItem(item){
      this.tabrow.qualificationcategoryname=item.name
    },
    GetIndicator() {
      this.loading = true
      SportCompetitionService.GetWinner(0, this.uid).then((res) => {
        this.tabrow = res.data
        this.tabrow.statusid = 1
        this.tabrow.sportCompetitionUId = this.uid
        this.createModal = true
        this.loading = false;
      });
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