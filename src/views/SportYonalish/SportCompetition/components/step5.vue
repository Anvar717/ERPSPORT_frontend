<template>
  <div>
    <b-row class="mt-3 mb-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button
          variant="primary"
          class="mr-2"
          @click="AddSportCompetetionEmployeeStaffing"
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
        <b-button variant="success" v-if="!isFilled ||isNewAdded" class="mr-2" @click="Save"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
        <b-button variant="success" v-else-if="!isApproved && isFilled" class="mr-2" @click="Accept"> {{ $t('Accept') }} </b-button>
        <b-button variant="primary" v-if="isFilled" @click="$emit('next')"> {{ $t('next') }} </b-button>
      </b-col>
    </b-row>
    <b-modal ref="my-modal" :title="$t('SportCompetetionEmployeeStaffing')"  v-model="createModal" hide-footer  no-close-on-backdrop>
      <b-row>
        <b-col lg="12">
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

        <b-col lg="12" class="my-2">
          <div>
            <label>
              {{ $t("Quantity") }}
            </label>
            <div>
              <summa-input
                class="w-100"
                v-model="tabrow.quantity"
              ></summa-input>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
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
import SportCompetitionService from "@/services/SportCompetition.service";
export default {
  data() {
    return {
      step1list: [],
      positionlist: [],
      firstList:[],
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'positionname', label: this.$t('positionname') },
        { key: 'quantity', label: this.$t('quantity') },
        { key: !this.isView ? 'actions' : '', label: this.$t('actions') },
      ],
      tabrow: {},
      createModal: false,
      SaveLoading: false,
      editedIndex : -1
    };
  },
  props: {
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
  created() {
    SportCompetitionService.GetEmployeeStaffingPosition(this.uid, false)
      .then((res) => {
        this.positionlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    this.GetEmployeeStaffingList()
    // this.GetEmployeeStaffing();
  },
  computed:{
    formattedQuantity: {
      get() {
        return this.tabrow.quantity === 0 ? '' : this.tabrow.quantity;
      },
      set(value) {
        this.tabrow.quantity = value === '' ? 0 : Number(value);
      }
    },
    isApproved(){
      let isapproved=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isapproved= this.SportCompetition.Steps[4].isapproved
      }
      return isapproved
    },
    isFilled(){
      let isfilled=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isfilled= this.SportCompetition.Steps[4].isfilled
      }
      return isfilled
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
    rowClass(item, type) {
      if (item && item.Status == 3) {
        return "d-none";
      }
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    Add() {
      if (!this.tabrow.positionid) {
        this.makeToast(this.$t('positionNotSelected'), this.$t('Error'), 'danger')
        return false
      }  
      if (!this.tabrow.quantity) {
        this.makeToast(this.$t('quantityNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      this.tabrow.positionname = this.positionlist.filter(item => item.id == this.tabrow.positionid)[0].name
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
        SportCompetitionService.DeleteEmployeeStaffing({sportCompetitionUId:this.uid, id:  item.id}).then(res =>{
          this.step1list.splice(editedIndex,1)
        })
      } else {
          this.step1list.splice(editedIndex,1)
      }
    },
    GetEmployeeStaffingList() {
      SportCompetitionService.GetEmployeeStaffingList(this.uid).then(res => {
        this.step1list = res.data.rows
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })  
    },  
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateEmployeeStaffing(this.step1list).then(res => {
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
      SportCompetitionService.ApproveEmployeeStaffing(this.uid).then(res => {
        this.$emit("next");
        this.$emit('GetAction', true)
        this.makeToast(this.$t('AcceptedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },
    GetEmployeeStaffing() {
      this.loading = true;
      SportCompetitionService.GetEmployeeStaffing(0, this.uid).then((res) => {
        // this.step1list.push(res.data);
        this.tabrow = res.data
        this.tabrow.Status = 1
        this.tabrow.sportCompetitionUId = this.uid
        this.createModal = true
        this.loading = false;
      });
    },
    AddSportCompetetionEmployeeStaffing() {
      
      this.GetEmployeeStaffing();
    }
  },
};
</script>

<style>
</style>