<template>
  <div>
    <b-row class="mt-3 mb-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button
          variant="primary"
          class="mr-2"
          @click="AddSportCompetetionJuryStaffing"
        >
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
    <b-row>
      <b-col class="text-right">
        <b-button variant="success" v-if="!isFilled || isNewAdded" class="mr-2" @click="Save"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
        <b-button variant="success" v-else-if="!isApproved && isFilled" class="mr-2" @click="Accept"> {{ $t('Accept') }} </b-button>
        <b-button variant="primary" v-if="isFilled" @click="$emit('next')"> {{ $t('next') }} </b-button>
      </b-col>
    </b-row>

    <b-modal ref="my-modal" :title="$t('JuryStaffing')"  v-model="createModal" hide-footer  no-close-on-backdrop>
      <b-row>
        <b-col sm="12" class="my-1">
          <div>
            <label>{{ $t("position") }}</label>
            <div>
              <v-select
                :options="positionlist"
                class="w-100"
                v-model="tabrow.positionid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              ></v-select>
            </div>
          </div>
        </b-col>
        <b-col sm="12" class="my-1">
          <div>
            <label>{{ $t("qualificationcategory") }}</label>
            <div>
              <v-select
                class="w-100"
                :options="qualificationcategorylist"
                v-model="tabrow.qualificationcategoryid"
                :reduce="(item) => item.qualificationcategoryid"
                :placeholder="$t('ChooseBelow')"
                label="qualificationcategoryname"
              ></v-select>
            </div>
          </div>
        </b-col>
        <b-col sm="12" class="my-1">
          <div>
            <label>
              {{ $t("Quantity") }}
            </label>
            <div>
              <summa-input
                type="number"
                class="w-100"
                v-model="tabrow.quantity"
              ></summa-input>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col class="text-right">
          <b-button @click="createModal = false" variant="danger" class="mr-2"> {{ $t('back') }} </b-button>
          <b-button @click="Add" variant="success"> {{ $t('save') }} </b-button>
          
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import PositionService from "@/services/Position.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SportCompetitionService from "@/services/SportCompetition.service";
export default{
  props: {
    SportCompetition:{
      type: Object,
      default: {},
    },
    uid: {
      type: String,
      default : 'd0e626d2-cbb0-4805-b468-0c6afec46c26'
    }
  },
  data() {
    return {
      step1list: [],
      firstList:[],
      loading: false,
      qualificationcategorylist: [],
      positionlist: [],
      editedIndex: -1,
      createModal: false,
      SaveLoading: false,
      tabrow: {},
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'positionname', label: this.$t('positionname') },
        { key: 'qualificationcategoryname', label: this.$t('qualificationcategoryname') },
        { key: 'quantity', label: this.$t('quantity') },
        { key: !this.isView ? 'actions' : '', label: this.$t('actions') },
      ],
    };
  },
  props: {
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
  async created() {
    SportCompetitionService.GetJuryStaffingPosition(this.uid, false).then(
        (res) => {
          this.positionlist = res.data;
        }
      ).catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportCompetitionService.GetJuryStaffingCategory()
      .then((res) => {
        this.qualificationcategorylist = res.data;
    })
    .catch((error) => {
      this.makeToast(error.response.data.error, this.$t("Error"), "danger");
    });
    await this.GetJuryStaffingList()
    
  },
  computed:{
    isApproved(){
      let isapproved=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isapproved= this.SportCompetition.Steps[3].isapproved
      }
      return isapproved
    },
    isFilled(){
      let isfilled=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isfilled= this.SportCompetition.Steps[3].isfilled
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
  watch:{
    'tabrow.quantity'(newVal, oldVal){
      if (newVal<0) {
        // this.tabrow.quantity = 0
      }
    }
  },
  methods: {
    Select(data) {
      console.log(data)  
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    rowClass(item, type) {
      if (item && item.Status == 3) {
        return "d-none";
      }
    },
    GetJuryStaffingList() {
      SportCompetitionService.GetJuryStaffingList(this.uid).then(res => {
          this.step1list = res.data.rows
          this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })
    },
    ChangeQualification(id) {
      item.qualificationcategoryname = this.qualificationcategorylist.find(el => el.qualificationcategoryid == id).qualificationcategoryname
    },
    ChangePosition(item) {
      item.positionname = this.positionlist.filter(el => el.id == item.positionid)[0].name
    },
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateJuryStaffing(this.step1list).then(res => {
        this.SaveLoading = false
        this.firstList= JSON.parse(JSON.stringify(this.step1list))
        this.$emit('GetAction', true)
        this.makeToast(this.$t('SavedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },  
    Accept() {
      SportCompetitionService.ApproveJuryStaffing(this.uid).then(res => {
        this.$emit("next");
        this.$emit('GetAction', true)
        this.makeToast(this.$t('AcceptedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },
    Add() {
      if (!this.tabrow.positionid) {
        this.makeToast(this.$t('positionNotSelected'), this.$t('Error'), 'danger')
        return false
      }  
      if (!this.tabrow.qualificationcategoryid) {
        this.makeToast(this.$t('qualificationcategoryNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      this.tabrow.positionname = this.positionlist.filter(item => item.id == this.tabrow.positionid)[0].name
      this.tabrow.qualificationcategoryname = this.qualificationcategorylist.find(item => item.qualificationcategoryid == this.tabrow.qualificationcategoryid).qualificationcategoryname
      var self = this
      if (self.editedIndex > -1) {
        Object.assign(
          self.step1list[self.editedIndex],
          self.tabrow
        );
      } else {
        self.step1list.push(self.tabrow);
      }
      self.createModal = false
      self.tabrow = {}
    },
    Edit(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex = this.step1list.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.createModal = true;
    },
    Delete(item) {
      let editedIndex = this.step1list.indexOf(item);
      if (item.id) {
        SportCompetitionService.DeleteJuryStaffing({sportCompetitionUId:this.uid, id:item.id})
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
    GetJuryStaffing() {
      this.loading = true;
      SportCompetitionService.GetJuryStaffing(0, "").then((res) => {
        this.tabrow = res.data
        this.tabrow.Status = 1
        this.tabrow.sportCompetitionUId = this.uid
        this.createModal = true
        this.loading = false;
      });
    },
    AddSportCompetetionJuryStaffing() {
      this.GetJuryStaffing();
    },
  },
};
</script>

<style>
</style>