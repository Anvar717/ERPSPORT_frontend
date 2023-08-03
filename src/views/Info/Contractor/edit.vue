<template>
  <b-container fluid>
      <b-row>
          <b-col>
             <b-card border-variant="primary" :header="$t('Contractor')">
                 <template v-slot:header>
                    <b-row>
                        <b-col>
                            <h6 class="mb-0">{{$t('Contractor')}}</h6>
                        </b-col>
                        <b-col class="text-right">
                            <b-form-checkbox v-model="Contractor.isbudget" name="check-button" switch>
                                {{$t('isbudget')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                </template>
                 <b-row>
                     <b-col>
                         <label for="">{{$t('inn')}}</label>
                         <CInput
                            :placeholder="$t('inn')"
                            v-model="Contractor.inn"
                            v-on:keyup.enter="FindbyInn"
                            >
                            <template #append>
                                <CButton
                                @click="FindbyInn"
                                size="sm"
                                type="button"
                                color="primary"
                                >
                                <b-icon v-if="!innLoading" icon="search"></b-icon>
                                <b-spinner small v-if="innLoading"></b-spinner>
                                </CButton>
                            </template>
                        </CInput>
                     </b-col>
                     <b-col>
                        <label for="">{{$t('fullname')}}</label>
                        <b-form-input v-model="Contractor.fullname" :placeholder="$t('fullname')"></b-form-input>
                     </b-col>
                     <b-col>
                        <label for="">{{$t('shortname')}}</label>
                        <b-form-input v-model="Contractor.shortname" :placeholder="$t('shortname')"></b-form-input>
                     </b-col>
                 </b-row>
                 <b-row>
                     <b-col>
                        <label for="">{{$t('vatcode')}}</label>
                        <b-form-input v-model="Contractor.vatcode" :placeholder="$t('vatcode')"></b-form-input>
                     </b-col>
                     <b-col>
                        <label for="">{{$t('adress')}}</label>
                        <b-form-input v-model="Contractor.adress" :placeholder="$t('adress')"></b-form-input>
                     </b-col>
                     <b-col>
                        <label for="">{{$t('contactinfo')}}</label>
                        <b-form-input v-model="Contractor.contactinfo" :placeholder="$t('contactinfo')"></b-form-input>
                     </b-col>
                 </b-row>
                 <b-row class="mt-2">
                     <b-col>
                         <label for="">{{$t('oblast')}}</label>
                         <b-form-select v-model="Contractor.oblastid" text-field="name" value-field="id" :options="OblastList" :placeholder="$t('ChooseBelow')" @input="ChangeOblast">
                             <template v-slot:first>
                                <b-form-select-option value="0" disabled>--{{$t('ChooseBelow')}} --</b-form-select-option> 
                            </template>
                         </b-form-select>
                     </b-col>
                     <b-col>
                         <label for="">{{$t('region')}}</label>
                         <b-form-select v-model="Contractor.regionid" text-field="name" value-field="id" :options="RegionList" :placeholder="$t('ChooseBelow')">
                             <template v-slot:first>
                                <b-form-select-option value="0" disabled>--{{$t('ChooseBelow')}} --</b-form-select-option> 
                            </template>
                         </b-form-select>
                     </b-col>
                     <b-col>
                        <label for="">{{$t('mobilenumber')}}</label>
                        <b-form-input v-model="Contractor.mobilenumber" :placeholder="$t('mobilenumber')"></b-form-input>
                     </b-col>
                 </b-row>
                 <b-row class="mt-3">
                     <b-col>
                        <label for="">{{$t('oked')}}</label>
                        <b-form-input v-model="Contractor.oked" :placeholder="$t('oked')"></b-form-input>
                     </b-col>
                     <b-col>
                        <label for="">{{$t('director')}}</label>
                        <b-form-input v-model="Contractor.director" :placeholder="$t('director')"></b-form-input>
                     </b-col>
                     <b-col>
                        <label for="">{{$t('accounter')}}</label>
                        <b-form-input v-model="Contractor.accounter" :placeholder="$t('accounter')"></b-form-input>
                     </b-col>
                 </b-row>
                 <b-row class="mt-5">
                     <b-col>
                        <!-- <div class="float-right mb-n2">
                             <b-button @click="AddModal"  class="mb-n2"  variant="primary"> <b-icon icon="plus"></b-icon> {{$t('Add')}}</b-button>
                        </div> -->
                        <b-tabs pills card class="mt-n3" v-model="tabIndex">
                            <b-tab :title="$t('Accounts')" active>
                                <b-table 
                                    :fields="Accounts"
                                    :items="Contractor.Accounts"
                                    class="bg-color-table text-center"
                                    style="vertical-align:middle"
                                    bordered
                                    responsive="sm"
                                    small
                                    :tbody-tr-class="rowClass"
                                >
                                    <template v-slot:thead-top>
                                        <b-tr>
                                            <b-th style="width :10%">
                                                <b-form-input v-model="AccountTable.code" size="sm" :placeholder="$t('code')"></b-form-input>
                                            </b-th>
                                            <b-th style="width :15%">
                                                <b-form-input v-model="AccountTable.accountname" size="sm" :placeholder="$t('accountname')"></b-form-input>
                                            </b-th>
                                            <b-th style="width :20%">
                                                <v-select v-model="AccountTable.bankid" :placeholder="$t('ChooseBelow')" :options="BankList" :reduce="item => item.id" label="name">

                                                </v-select>
                                            </b-th>
                                            <b-th style="width :10%">
                                                 <v-select v-model="AccountTable.stateid" :placeholder="$t('ChooseBelow')" :options="StateList" :reduce="item => item.id" label="name">

                                                </v-select>
                                            </b-th>
                                            <b-th style="width: 5%" class="text-center">
                                                <b-button @click="AccountAddItem" size="sm" variant="primary"> <b-icon icon="plus"></b-icon> </b-button>
                                            </b-th>
                                        </b-tr>
                                    </template>
                                    <template #cell(code)="{item}">
                                       <p class="m-0" v-if="item.Status == 0"> {{item.code}} </p>
                                       <b-form-input v-if="item.Status == 2 || item.Status == 1" v-model="item.code" size="sm" :placeholder="$t('code')"></b-form-input>
                                    </template>
                                    <template #cell(accountname)="{item}">
                                       <p class="m-0" v-if="item.Status == 0"> {{item.accountname}} </p>
                                       <b-form-input v-if="item.Status == 2 || item.Status == 1" v-model="item.accountname" size="sm" :placeholder="$t('accountname')"></b-form-input>
                                    </template>
                                    <template #cell(bankname)="{item}">
                                        <p class="m-0" v-if="item.Status == 0"> {{item.bankname}} </p>
                                        <v-select v-if="item.Status == 2 || item.Status == 1" v-model="item.bankid" :placeholder="$t('ChooseBelow')" :options="BankList" :reduce="item => item.id" label="name">

                                        </v-select>
                                    </template>
                                    <template #cell(statename)="{item}">
                                        <p class="m-0" v-if="item.Status == 0"> {{item.statename}} </p>
                                        <v-select v-if="item.Status == 2 || item.Status == 1" v-model="item.stateid" :placeholder="$t('ChooseBelow')" :options="StateList" :reduce="item => item.id" label="name">

                                                </v-select>
                                    </template>
                                    <template #cell(actions)="{item}">
                                        <div class="text-center">
                                        <b-link
                                            @click="EditItem(item)"
                                            class="mr-2"
                                            v-c-tooltip="{content: $t('Edit') }"
                                        >
                                            <b-icon icon="pencil" ></b-icon>
                                        </b-link>
                                        <b-link
                                            class="mr-2"
                                            v-c-tooltip="{content: $t('Delete') }"
                                            @click="DeleteItem(item)"
                                        >
                                            <b-icon icon="trash" ></b-icon>
                                        </b-link>
                                        </div>
                                    </template>
                                </b-table>
                            </b-tab>
                            <b-tab :title="$t('Branches')">
                                <b-table 
                                    :fields="Branches"
                                    :items="Contractor.Branches"
                                    class="bg-color-table text-center"
                                    style="vertical-align:middle"
                                    bordered
                                    responsive="sm"
                                    small
                                    :tbody-tr-class="rowClass"
                                >
                                    <template v-slot:thead-top>
                                        <b-tr>
                                            <b-th style="width :10%">
                                                <b-form-input v-model="BranchTable.branchcode" size="sm" :placeholder="$t('branchcode')"></b-form-input>
                                            </b-th>
                                            <b-th style="width :15%">
                                                <b-form-input v-model="BranchTable.branchname" size="sm" :placeholder="$t('branchname')"></b-form-input>
                                            </b-th>
                                            <b-th style="width: 5%" class="text-center">
                                                <b-button @click="BranchesAddItem" size="sm" variant="primary"> <b-icon icon="plus"></b-icon> </b-button>
                                            </b-th>
                                        </b-tr>
                                    </template>
                                    <template #cell(branchcode)="{item}">
                                        <p class="m-0" v-if="item.Status == 0"> {{item.branchcode}} </p>
                                        <b-form-input v-if="item.Status == 2 || item.Status == 1" v-model="item.branchcode" size="sm" :placeholder="$t('branchcode')"></b-form-input>
                                    </template>
                                    <template #cell(branchname)="{item}">
                                        <p class="m-0" v-if="item.Status == 0"> {{item.branchname}} </p>
                                        <b-form-input v-if="item.Status == 2 || item.Status == 1" v-model="item.branchname" size="sm" :placeholder="$t('branchname')"></b-form-input>
                                    </template>
                                    <template #cell(actions)="{item}">
                                        <div class="text-center">
                                        <b-link
                                            @click="EditItem(item)"
                                            class="mr-2"
                                            v-c-tooltip="{content: $t('Edit') }"
                                        >
                                            <b-icon icon="pencil" ></b-icon>
                                        </b-link>
                                        <b-link
                                            class="mr-2"
                                            v-c-tooltip="{content: $t('Delete') }"
                                            @click="DeleteItem(item)"
                                        >
                                            <b-icon icon="trash" ></b-icon>
                                        </b-link>
                                        </div>
                                    </template>
                                </b-table>
                            </b-tab>
                             
                        </b-tabs>
                       
                     </b-col>
                 </b-row>
                 <b-row class="mt-3">
                     <b-col>
                         <b-button v-if="!component" @click="$router.push('/Info/Contractor')" variant="danger" > <b-icon icon="arrow-bar-left"></b-icon>  {{$t('back')}} </b-button>
                     </b-col>
                     <b-col class="text-right">
                         <b-button @click="Save" variant="success" > <b-icon icon="check2"></b-icon> {{$t('Save')}} </b-button>
                     </b-col>
                 </b-row>
             </b-card>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import ContractorService from '@/services/Contractor.service'
import OblastService from '@/services/Oblast.service'
import RegionService from '@/services/Region.service'
import BankService from '@/services/Bank.service'
import HelperService from '@/services/helper.service'
export default {
    props : {
        component : {
            type : Boolean,
            default : false
        }
    },
    data(){
        return{
            Contractor : {},
            OblastList : [],
            RegionList : [],
            Accounts : [
                {key : 'code',label : this.$t('code')},
                {key : 'accountname', label : this.$t('accountname')},
                {key : 'bankname', label : this.$t('bankname')},
                {key : 'statename', label : this.$t('statename')},
                {key : 'actions', label :this.$t('actions')}
            ],
            Branches : [
                {key : 'branchcode', label : this.$t('branchcode')},
                {key : 'branchname', label : this.$t('branchname')},
                {key : 'actions', label :this.$t('actions')}
            ],
            AccountTable : {
                code : '',
                accountname : '',
                bankid : '',
                bankname : '',
                stateid : 0,
                statename : '',
                Status  :1
            },
            tabIndex : 0,
            BankList : [],
            StateList : [],
            BranchTable : {
                branchcode : '',
                branchname : '',
                Status : 1
            },
            innLoading : false,
            lang : localStorage.getItem('locale') || 'ru'
        }    
    },
    created(){
        ContractorService.Get(this.$route.params.id,'').then(res => {
            this.Contractor = res.data
            this.ChangeOblast()
        })
        OblastService.GetAll().then(res => {
            this.OblastList = res.data
        })
        BankService.GetAll().then(res => {
            this.BankList = res.data
        })
        HelperService.GetStateList().then(res => {
            this.StateList = res.data
        })
    },
    methods : {
        AccountAddItem(){
            var self = this
           if (
                self.AccountTable.code === "" ||
                self.AccountTable.code === undefined ||
                self.AccountTable.code === null ||
                self.AccountTable.code === 0
            ) {
                this.makeToast(
                this.$t("codeNotCorrect"),
                this.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.AccountTable.accountname === "" ||
                self.AccountTable.accountname === undefined ||
                self.AccountTable.accountname === null ||
                self.AccountTable.accountname === 0
            ) {
                this.makeToast(
                    this.$t("accountnameNotCorrect"),
                    this.$t("Error"),
                    "danger"
                );
                return false;
            }
            if (
                self.AccountTable.bankid === "" ||
                self.AccountTable.bankid === undefined ||
                self.AccountTable.bankid === null ||
                self.AccountTable.bankid === 0
            ) {
                this.makeToast(
                    this.$t("bankNotCorrect"),
                    this.$t("Error"),
                    "danger"
                );
                return false;
            }
            if (
                self.AccountTable.stateid === "" ||
                self.AccountTable.stateid === undefined ||
                self.AccountTable.stateid === null ||
                self.AccountTable.stateid === 0
            ) {
                this.makeToast(
                    this.$t("stateNotCorrect"),
                    this.$t("Error"),
                    "danger"
                );
                return false;
            }
            self.AccountTable.bankname = self.BankList.filter(el => el.id === self.AccountTable.bankid)[0].name 
            self.AccountTable.statename = self.StateList.filter(el => el.id === self.AccountTable.stateid)[0].name
            self.Contractor.Accounts.push(self.AccountTable)
            self.AccountTable = []
        },
        BranchesAddItem(){
            var self = this
            if (
                    self.BranchTable.branchcode === "" ||
                    self.BranchTable.branchcode === undefined ||
                    self.BranchTable.branchcode === null ||
                    self.BranchTable.branchcode === 0
                ) {
                    this.makeToast(
                    this.$t("branchcodeNotCorrect"),
                    this.$t("Error"),
                    "danger"
                    );
                    return false;
            }
            if (
                    self.BranchTable.branchname === "" ||
                    self.BranchTable.branchname === undefined ||
                    self.BranchTable.branchname === null ||
                    self.BranchTable.branchname === 0
                ) {
                    this.makeToast(
                    this.$t("branchnameNotCorrect"),
                    this.$t("Error"),
                    "danger"
                    );
                    return false;
            }
            self.Contractor.Branches.push(self.BranchTable)
            self.BranchTable = []
        },
        EditItem(item){
            if(item.Status == 0){
                item.Status = 2
            }
        },
        DeleteItem(item){
            item.Status = 3
        },
        FindbyInn(){
            if(!!this.Contractor.inn){
                this.innLoading = true
                ContractorService.Get(0,this.Contractor.inn).then(res => {
                    this.Contractor = res.data
                     this.innLoading = false
                    this.ChangeOblast()
                })
            }
        },
        ChangeOblast(){
            if(!!this.Contractor.oblastid){
                RegionService.GetAll(this.lang,this.Contractor.oblastid).then(res => {
                    this.RegionList = res.data
                })  
            }
        },
        Save(){
            ContractorService.Update(this.Contractor).then(res => {
                this.makeToast(this.$t('SuccessMessage'),this.$t('message'),this.$t('success'))
                var vm = this
                if(vm.component){
                    vm.$emit('Success',res.data)
                }
                else{
                    vm.$router.push('/Info/Contractor')
                }
            }).catch(error => {
                this.makeToast(error.response.data.error,this.$t('message'),'danger')
            })
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
        rowClass(item, type) {
            if (item.Status === 3) {
                return "d-none";
            }
        },
    }
}
</script>

<style>

</style>