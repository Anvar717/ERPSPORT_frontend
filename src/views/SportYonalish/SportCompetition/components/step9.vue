<template>
  <div>
    <b-row class="mt-3 mb-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button
          variant="primary"
          class="mr-2"
          @click="AddSportCompetetionBudget"
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
          <template #cell(price)="{ item }">
            <div class="text-right w-space-nowrap">
              {{
                $options.filters.currency(item.price, {
                  symbol: "",
                  fractionCount: 2,
                })
              }}
            </div>
          </template>
          <template #cell(amount)="{ item }">
            <div class="text-right w-space-nowrap">
              {{
                $options.filters.currency(item.amount, {
                  symbol: "",
                  fractionCount: 2,
                })
              }}
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
                $options.filters.currency(CalcBudget, {
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
        <b>{{this.$t('restamount')}}: {{ CalcAmount | currency}} </b>
      </b-col>
    </b-row>


    <b-row>
      <b-col class="text-right">
        <b-button variant="success" v-if="!isFilled ||isNewAdded" class="mr-2" @click="Save"> <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
        <b-button variant="success" v-else-if="!isApproved && isFilled" class="mr-2" @click="Accept"> {{ $t('Accept') }} </b-button>
        <b-button variant="primary" v-if="isFilled" @click="$emit('next')"> {{ $t('next') }} </b-button>
      </b-col>
    </b-row>
    <b-modal ref="my-modal" :title="$t('SportCompetetionBudget')"  v-model="createModal" hide-footer  no-close-on-backdrop>
      <b-row>
        <b-col lg="12" sm="12">
          <label>{{ $t("ItemOfExpense") }}</label>
          <div>
            <v-select
              :options="SportItemOfExpenseList"
              class="w-100"
              v-model="tabrow.sportitemofexpenseid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
            ></v-select>
          </div>
        </b-col>

        <b-col lg="12" class="my-2">
            <label>
              {{ $t("Quantity") }}
            </label>
            <div>
              <summa-input
                type="number"
                class="w-100"
                v-model="formattedQuantity"
                @input="Calculate"
                :maxLength="3"
              ></summa-input>
            </div>
        </b-col>
        <b-col lg="12" class="my-2">
          <label>
            {{ $t("price") }}
          </label>
          <div>
            <summa-input
              v-model="tabrow.price"
              class="w-100"
              :maxLength="11"
              @input="Calculate"
            ></summa-input>
          </div>
        </b-col>
        <b-col lg="12" class="my-2">
          <div>
            <label>
              {{ $t("amount") }}
            </label>
            <div>
              <custom-number-input
                v-model="tabrow.amount"
                class="w-100"
                @input="Calculate"
                disabled
              ></custom-number-input>
            </div>
          </div>
        </b-col>
        <b class="ml-2 mb-2">{{this.$t('restamount')}}: {{ CalcAmount | currency}} </b>

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
import SportCompetitionService from "@/services/SportCompetition.service";
import SportItemOfExpenseService from '@/services/sportitemofexpense.service'
export default {
  data() {
    return {
      step1list: [],
      firstList:[],
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'sportitemofexpensename', label: this.$t('SportItemOfExpense') },
        { key: 'quantity', label: this.$t('quantity') },
        { key: 'price', label: this.$t('price') },
        { key: 'amount', label: this.$t('amount') },
        { key: !this.isView ? 'actions' : '', label: this.$t('actions') },
      ],
      tabrow: {},
      createModal: false,
      SaveLoading: false,
      editedIndex: -1,
      SportItemOfExpenseList : []
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
    this.getItemOfExpenceService()
    this.GetBudgetList()
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
    thisStep(){
      return this.SportCompetition.Steps.find(el => el.ordernumber == 9)
    },
    CalcSportcompetitionbudgetsource() {
      const sum = this.SportCompetition.sportcompetitionbudgetsource.reduce((partialSum, el) => partialSum + Number(el.amount), 0);
      return sum
    },
    CalcBudget() {
      const sum = this.step1list.reduce((partialSum, el) => partialSum + Number(el.amount), 0);
      return sum
    },
    CalcAmount() {
      const sum = this.SportCompetition.sportcompetitionbudgetsource.reduce((partialSum, el) => partialSum + Number(el.amount), 0);
      
      return sum - this.CalcBudget
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
    getItemOfExpenceService(){
      SportItemOfExpenseService.GetAll()
      .then((res) => {
        // this.SportItemOfExpenseList = res.data;
        this.SportItemOfExpenseList = res.data.filter(el => {
            let hasInTable = this.step1list.some(e => e.sportitemofexpenseid == el.id)
            if (!hasInTable) {
              return el
            }
          });   
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    },
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
        this.Calculate()
      if (!this.tabrow.sportitemofexpenseid) {
        this.makeToast(this.$t('sportitemofexpenseNotSelected'), this.$t('Error'), 'danger')
        return false
      }  
      if (!this.tabrow.quantity) {
        this.makeToast(this.$t('quantityNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      if (!this.tabrow.price) {
        this.makeToast(this.$t('quantityNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      if (this.CalcSportcompetitionbudgetsource < (Number(this.CalcBudget)+Number(this.tabrow.amount))) {
        this.makeToast(this.$t('sumMustLessThanBudgetSource'), this.$t('Error'), 'danger')
        return false
      }
      this.tabrow.sportitemofexpensename = this.SportItemOfExpenseList.filter(item => item.id == this.tabrow.sportitemofexpenseid)[0].name
      var self = this
      if (self.editedIndex > -1) {
        Object.assign(
          self.step1list[self.editedIndex],
          self.tabrow
        );
      } else {
        self.step1list.push(self.tabrow);
      }
      this.getItemOfExpenceService()
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
        SportCompetitionService.DeleteBudget({sportCompetitionUId:this.uid, id:  item.id}).then(res =>{
          this.step1list.splice(editedIndex,1)
        })
      } else {
        this.step1list.splice(editedIndex,1)
      }
    },
    GetBudgetList() {
      SportCompetitionService.GetBudgetList(this.uid).then(res => {
        this.step1list = res.data.rows
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })  
    },  
    Calculate(){
        this.tabrow.amount = Number(this.tabrow.price)*Number(this.tabrow.quantity)
    },
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateBudget(this.step1list).then(res => {
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
      SportCompetitionService.ApproveBudget(this.uid).then(res => {
        this.$emit("next");
        this.$emit('GetAction', true)
        this.makeToast(this.$t('AcceptedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },
    GetBudget() {
      this.loading = true;
      SportCompetitionService.GetBudget(0, this.uid).then((res) => {
        // this.step1list.push(res.data);
        this.tabrow = res.data
        this.tabrow.Status = 1
        this.tabrow.sportCompetitionUId = this.uid
        this.createModal = true
        this.loading = false;
      });
    },
    AddSportCompetetionBudget() {
      this.GetBudget();
    }
  },
};
</script>

<style>
</style>