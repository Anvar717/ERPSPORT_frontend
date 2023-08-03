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
          foot-clone
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
          <template #cell(amount)="{ item }">
            <div class="text-right w-space-nowrap">
              {{  $options.filters.currency(item.amount, {
                  symbol: "",
                  fractionCount: 2,
                }) }}
            </div>
          </template>
          <template #foot(index)>
            {{$t('Total')}}
          </template>
          <template #foot()>
            <span></span>
          </template>
          <template #foot(amount)="{ item }">
            <div class="text-right w-space-nowrap">
              {{
                $options.filters.currency(CalcAmount, {
                  symbol: "",
                  fractionCount: 2,
                })
              }}
            </div>
          </template>
          <template #empty>
            <h5 class="text-center">{{ $t("NoItems") }}</h5>
          </template>
        </b-table>

      </b-col>
    </b-row>

    <b-modal ref="my-modal" :title="$t('SportCompetetionEmployeeStaffing')"  v-model="createModal" hide-footer size="xl"  no-close-on-backdrop>
      <b-card>
        <b-row>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("SourceOfFinance") }} </label>
            <v-select
              :options="SourceOffinanceList"
              v-model="tabrow.sourceoffinanceid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              @option:selecting="changeSourceItem"
              label="name"
            />
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label>{{ $t("amount") }}</label>
            <!-- <b-form-input :placeholder="$t('amount')" v-model="tabrow.amount"></b-form-input> -->
            <summa-input
              :placeholder="$t('amount')"
              v-model="tabrow.amount"
              :maxLength="11"
            >
            </summa-input>
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
        <b-button variant="success" v-if="!isFilled ||isNewAdded" class="mr-2" @click="Save"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
        <b-button variant="success" v-else-if="!isApproved && isFilled" class="mr-2" @click="Accept"> {{ $t('Accept') }} </b-button>
        <b-button variant="primary" v-if="isFilled" @click="$emit('next')"> {{ $t('next') }} </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CustomNumberInput from "@/components/CustomNumberInput.vue";
import SportCompetitionService from "@/services/SportCompetition.service";
import SourceOffinanceService from "@/services/SourceOfFinance.service";

export default {
  components:{
    CustomNumberInput
  },
  data() {
    return {
      step1: {},
      countrylist: [],
      SourceOffinanceList: [],
      lang: "",
      step1list: [],
      firstList:[],
      loading: false,
      SaveLoading : false,
      tabrow: {},
      createModal: false,
      editedIndex : -1,
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'sourceoffinancename', label: this.$t('sourceoffinancename') },
        { key: 'amount', label: this.$t('amount'), align:'right' },
        // { key: 'statusname', label: this.$t('statusname') },
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
      default : ''
    },
    isView: {
      type: Boolean,
      default : false
    }
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    SourceOffinanceService.GetAll().then((res) => {
      this.SourceOffinanceList = res.data;
    });
    this.GetBudgetSourceList()
  },
  computed:{
    thisStep(){
      return this.SportCompetition.Steps.find(el => el.ordernumber == 8)
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
    },
    CalcAmount() {
      const sum = this.step1list.reduce((partialSum, el) => partialSum + Number(el.amount), 0);
      return sum
    },
  },
  methods: {
    GetBudgetSourceList() {
      SportCompetitionService.GetBudgetSourceList(this.uid).then(res => {
        this.step1list = res.data.rows
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })  
    },
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateBudgetSource(this.step1list).then(res => {
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
      SportCompetitionService.ApproveBudgetSource(this.uid).then(res => {
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
      if (!this.tabrow.sourceoffinanceid) {
        this.makeToast(this.$t('sourceoffinanceidNotSelected'), this.$t('Error'), 'danger')
        return false
      }  
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
        SportCompetitionService.DeleteBudgetSource({sportCompetitionUId:this.uid, id:  item.id}).then(res =>{
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
      this.tabrow.sourceoffinancename=item.name
    },
    GetIndicator() {
      this.loading = true
      SportCompetitionService.GetBudgetSource(0, this.uid).then((res) => {
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