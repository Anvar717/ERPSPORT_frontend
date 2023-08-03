<template>
  <div>
    <b-row class="mt-3 mb-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button variant="primary" class="mr-2" @click="AddSportCompetetionIndicator">
          {{ $t("Add") }}
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
                @click="Edit(item)"
                v-if="item.statusid != 2"
                class="mr-2"
                v-c-tooltip="{ content: $t('Edit') }"
              >
                <b-icon icon="pencil" ></b-icon>
              </b-link>
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
          <template #empty>
            <h5 class="text-center">{{ $t("NoItems") }}</h5>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="my-modal" :title="$t('sportcompetitionsportdiscipline')"  v-model="createModal" hide-footer no-close-on-backdrop>
      <b-card>
        <b-row>
          <b-col
            sm="12"
            md="12"
          >
            <label for=""> {{ $t("Sport turi") }} </label>
            <v-select
              :options="sporttypeclassifierlist"
              v-model="sporttypeclassifierid"
              :reduce="(item) => item.id"
              :disabled="!!sporttypeclassifierid"
              :placeholder="$t('ChooseBelow')"
              @input="sporttypeclassifierChange"
              label="name"
            ></v-select>
          </b-col>
          <b-col class="mt-2">
            <label for=""> {{ $t("sporttypeclassifierdiscipline") }} </label>
            <v-select
              :options="sporttypeclassifierdisciplinelist"
              class="w-100"
              multiple
              v-model="sporttypeclassifierdisciplineids"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="sporttypeclassifierdisciplinename"
              @input="changeSportorganization"
            ></v-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right mt-2">
            <b-button @click="createModal = false" variant="danger" class="mr-2"> {{ $t('back') }} </b-button>
            <b-button @click="Add" variant="success"> {{ $t('save') }} </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
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
import SportCompetitionService from "@/services/SportCompetition.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
export default {
  data() {
    return {
      lang: "",
      step1list: [],
      firstList: [],
      sporttypeclassifierdisciplineids:[],
      loading: false,
      SaveLoading : false,
      tabrow: {},
      createModal: false,
      editedIndex : -1,
      sporttypeclassifierdisciplinelist: [],
      sporttypeclassifierlist: [],
      sporttypeclassifierid:0,
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'sporttypeclassifierdisciplinename', label: this.$t('sporttypeclassifierdiscipline') },
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
      default : ''
    },
    isView: {
      type: Boolean,
      default : false
    }
  },
  computed:{
    isApproved(){
      let isapproved=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isapproved= this.SportCompetition.Steps[2].isapproved
      }
      return isapproved
    },
    isFilled(){
      let isfilled=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isfilled= this.SportCompetition.Steps[2].isfilled
      }
      return isfilled
    },
     isNewAdded(){
      let oldTable = JSON.stringify(this.firstList)
      let newTable = JSON.stringify(this.step1list)
      if (this.SportCompetition.Steps[1].isfilled && oldTable != newTable) {
        return true
      }
      return false
    }
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    SportTypeClassifierService.GetAll(true)
    .then((res) => {
      this.sporttypeclassifierlist = res.data;
    })
    .catch((error) => {
      this.makeToast(error.response.data.error, this.$t("Error"), "danger");
    });
    this.GetIndicatorList()
   
  },
  methods: {
    GetIndicatorList() {
      SportCompetitionService.GetSportDisciplineList({sportCompetitionUId:this.uid}).then(res => {
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
        this.step1list = res.data.rows
        this.$nextTick(() => {
          if (this.SportCompetition && this.SportCompetition.mainPart) {
            this.sporttypeclassifierid =  this.SportCompetition.mainPart.sporttypeclassifierid
            this.sporttypeclassifierChange()
          }
        })
      })
    },  
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateSportDiscipline(this.step1list).then(res => {
        this.SaveLoading = false
        this.$emit('GetAction', true)
        this.firstList= JSON.parse(JSON.stringify(this.step1list))
        this.makeToast(this.$t('SavedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },  
    Accept() {
      SportCompetitionService.ApproveSportDiscipline({sportCompetitionUId: this.uid}).then(res => {
        this.$emit('GetAction', true)
        this.$emit('next')
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
      if (!this.sporttypeclassifierdisciplineids.length) {
        this.makeToast(this.$t('selectsporttypeclassifierdiscipline'), this.$t('Error'), 'danger')
        return false
      }  
      var self = this
      if (self.editedIndex > -1) {
        Object.assign(
          self.step1list[self.editedIndex],
          self.tabrow
        );
      } else {
        this.sporttypeclassifierdisciplineids.forEach(el => {
          let tabrow = JSON.parse(JSON.stringify(self.tabrow))
          let itemElement = this.sporttypeclassifierdisciplinelist.find(item => item.id == el)

          tabrow.sporttypeclassifierdisciplineid = el
          if (itemElement) {
            tabrow.sporttypeclassifierdisciplinename =  itemElement.sporttypeclassifierdisciplinename
          }
          self.step1list.push(tabrow);
        })
      }
      self.createModal = false
      self.tabrow = {}
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
        SportCompetitionService.DeleteSportDiscipline({sportCompetitionUId:this.uid, id:item.id})
        .then(res =>{
          this.step1list.splice(editedIndex,1)
        })
         .catch((error) => {
            this.FileLoading = false;
            this.makeToast(
              error.response.data.error,
              this.$t("error"),
              "danger"
            );
          });
      } else {
        this.step1list.splice(editedIndex,1)
      }
    },
    AddSportCompetetionIndicator() {
      this.GetDiscipline()
    },
    changeSportItem(item) {
      item.qualificationcategoryname = this.qualificationcategorylist.filter(
        (el) => el.id == item.qualificationcategoryid
      )[0].name;
    },
    GetDiscipline() {
      this.loading = true
      SportCompetitionService.GetSportDiscipline({sportCompetitionUId: this.uid, id:0}).then((res) => {
        this.tabrow = res.data
        this.tabrow.sportCompetitionUId = this.uid
        this.tabrow.statusid = 1
        this.createModal = true
        this.loading = false;
      });
      if (this.SportCompetition && this.SportCompetition.mainPart) {
        this.sporttypeclassifierid =  this.SportCompetition.mainPart.sporttypeclassifierid
        this.sporttypeclassifierChange()
      }
    },
    changeSportorganization(id){
      let itemElement = this.sporttypeclassifierdisciplinelist.find(el => el.id == id)
      if (itemElement) {
        this.tabrow.sporttypeclassifierdisciplinename = itemElement.sporttypeclassifierdisciplinename
      }
    },
    sporttypeclassifierChange(){
      SportTypeClassifierService.GetAllSportTypeClassifierDiscipLine(
        this.sporttypeclassifierid
      ).then((res) => {
        if (res.data && res.data.length) {
          this.sporttypeclassifierdisciplinelist = res.data.filter(el => {
            let hasInTable = this.step1list.some(e => e.sporttypeclassifierdisciplineid == el.id)
            if (!hasInTable) {
              return el
            }
          });          
        }
        
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