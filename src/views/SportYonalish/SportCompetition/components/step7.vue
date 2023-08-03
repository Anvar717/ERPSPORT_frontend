<template>
  <div>
    <b-row class="my-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button variant="primary" class="mr-2" @click="addFormItem">
          <b-icon icon="plus"></b-icon>
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
    <b-modal ref="my-modal" :title="$t('sportcompetitionparticipantrequirement')"  v-model="createModal" hide-footer  no-close-on-backdrop>
      <b-row>
        <b-col sm="12" class="my-1">
          <label>{{ $t("sporttitle1") }}</label>
          <v-select
            class="w-100"
            :options="sporttitlelist"
            v-model="tabrow.sporttitleid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col sm="12" class="my-1">
          <label>{{ $t("GenderSportsmen") }}</label>
          <v-select
            :options="GenderList"
            v-model="tabrow.genderid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          />
        </b-col>
        <b-col sm="12"  class="my-1">
          <label>{{ $t("maxprogramsamount") }}</label>
          <CInput
            style="width: 100%"
            :placeholder="$t('maxprogramsamount')"
            v-model="tabrow.maxprogramsamount"
            v-mask="getHashCalc(tabrow.maxprogramsamount)"
          ></CInput>
        </b-col>
        <b-col sm="12" class="my-1">
          <label>{{ $t("minage") }}</label>
          <CInput
            style="width: 100%"
            :placeholder="$t('minage')"
            v-model="formatMinage"
            v-mask="'##'"
          ></CInput>
        </b-col>
        <b-col sm="12" class="my-1">
          <label>{{ $t("maxage") }}</label>
          <CInput
            style="width: 100%"
            :placeholder="$t('maxage')"
            v-model="formatMaxage"
            v-mask="'##'"
          ></CInput>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button @click="createModal = false" variant="danger" class="mr-2"> {{ $t('back') }} </b-button>
          <b-button @click="Add" variant="success"> {{ $t('save') }} </b-button>
        </b-col>
      </b-row>
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
import SportCompetitionService from "@/services/SportCompetition.service";
import HelperService from "@/services/helper.service";
import SportTitleService from "@/services/SportTitle.service";

export default {
  props: {
    sportcompetitionindicator: {
      type: [Object, Array],
      default: () => [],
    },
  },
  data() {
    return {
      form: {},
      GenderList: [],
      formList: [],
      sporttitlelist: [],
      SaveLoading: false,
      lang: "",
      tabrow: {},
      createModal: false,
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'sporttitlename', label: this.$t('sporttitlename') },
        { key: 'gendername', label: this.$t('gender') },
        { key: 'maxprogramsamount', label: this.$t('maxprogramsamount') },
        { key: 'minage', label: this.$t('minage') },
        { key: 'maxage', label: this.$t('maxage') },
        { key: !this.isView ? 'actions' : '', label: this.$t('actions') },
      ],
      editedIndex: -1,
      step1list : [],
      firstList:[],
    };
  },
  props: {
    uid: {
      type: String,
      default : ''
    },
    SportCompetition:{
      type: Object,
      default: {},
    },
    isView: {
      type: Boolean,
      default : false
    }
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";

    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
    });
    SportTitleService.GetAll(this.lang)
      .then((res) => {
        this.sporttitlelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    this.GetParticipantRequirementList();
  },
  computed: {
    formatMinage: {
      get() {
        return this.tabrow.minage === 0 ? '' : this.tabrow.minage;
      },
      set(value) {
        this.tabrow.minage = value === '' ? 0 : Number(value);
      }
    },
    formatMaxage: {
      get() {
        return this.tabrow.maxage === 0 ? '' : this.tabrow.maxage;
      },
      set(value) {
        this.tabrow.maxage = value === '' ? 0 : Number(value);
      }
    },
    isApproved(){
      let isapproved=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isapproved= this.SportCompetition.Steps[6].isapproved
      }
      return isapproved
    },
    isFilled(){
      let isfilled=false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isfilled= this.SportCompetition.Steps[6].isfilled
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
    getHashCalc(value) {
      let count = String(value).length
      return '#'.repeat(count)
    },
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateParticipantRequirement(this.step1list).then(res => {
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
      SportCompetitionService.ApproveParticipantRequirement(this.uid).then(res => {
        this.$emit("next");
        this.$emit('GetAction', true)
        this.makeToast(this.$t('AcceptedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },
    Add() {
      if (!this.tabrow.sporttitleid) {
        this.makeToast(this.$t('sporttitleNotSelected'), this.$t('Error'), 'danger')
        return false
      }  
      if (!this.tabrow.genderid) {
        this.makeToast(this.$t('genderNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      if (+this.tabrow.minage < 4) {
        this.makeToast(this.$t('minAgeMustBeAbove4'), this.$t('Error'), 'danger')
        return false
      }
      if ((this.tabrow.maxage > 165) || (this.tabrow.maxage < 4)) {
        this.makeToast(this.$t('maxAgeMustBeAboveMinAge'), this.$t('Error'), 'danger')
        return false
      }
      this.tabrow.sporttitlename = this.sporttitlelist.filter(item => item.id == this.tabrow.sporttitleid)[0].name
      this.tabrow.gendername = this.GenderList.filter(item => item.id == this.tabrow.genderid)[0].name
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
    GetIndicator() {
      SportCompetitionService.GetParticipantRequirement({
        id: 0,
        sportCompetitionUId: this.uid,
      }).then((res) => {
        this.tabrow = res.data;
        this.tabrow.Status = 1
        this.tabrow.sportCompetitionUId = this.uid
        this.createModal = true
        if (this.SportCompetition) {
          this.tabrow.maxprogramsamount = this.SportCompetition.sportcompetitionsportdiscipline.length
        }
      });
    },
    GetParticipantRequirementList() {
      SportCompetitionService.GetParticipantRequirementList(this.uid).then(res => {
        this.step1list = res.data.rows
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })  
    },  
    addFormItem() {
      this.GetIndicator()
    },
    Edit(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex = this.step1list.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.createModal = true;
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    Delete(item) {
      let editedIndex = this.step1list.indexOf(item);
      if (item.id) {
        SportCompetitionService.DeleteParticipantRequirement({sportCompetitionUId:this.uid, id:  item.id}).then(res =>{
          this.step1list.splice(editedIndex,1)
        })
      } else {
        this.step1list.splice(editedIndex,1)
      }
    },
  },
  watch: {
    'tabrow.maxprogramsamount'(newVal) {
      if (newVal > this.SportCompetition.sportcompetitionsportdiscipline.length) {
        this.tabrow.maxprogramsamount= this.SportCompetition.sportcompetitionsportdiscipline.length
      }
    }
  }
};
</script>

<style>
</style>