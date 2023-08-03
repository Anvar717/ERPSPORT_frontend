<template>
    <b-container fluid>
        <b-row>
            <b-col>
                    <CInput
                        :placeholder="$t('search')"
                        v-model="filter.Search"
                        v-on:keyup.enter="Refresh"
                        >
                        <template #append>
                            <CButton
                            @click="Refresh"
                            size="sm"
                            type="button"
                            color="primary"
                            >
                            <b-icon icon="search"></b-icon>
                            {{ $t("search") }}
                            </CButton>
                        </template>
                    </CInput>
            </b-col>
            <b-col>
                <b-button @click="Refresh"  variant="primary">
                    <b-icon icon="arrow-clockwise"></b-icon>
                </b-button>
            </b-col>
            <b-col class="text-right">
                <b-button variant="primary" @click="AddModal">{{$t('Add')}} <b-icon icon="plus"></b-icon></b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <vs-table
                :data="TMZList"
                @sort="handleSort"
                @selected="SelectedItem"
                v-model="selected"
                style="border:1px solid #eee"
                :max-items="filter.PageLimit">
                <template slot="thead">
                    <vs-th sort-key="code">
                        {{$t('code')}}
                    </vs-th>
                    <vs-th sort-key="shortname">
                        {{$t('shortname')}}
                    </vs-th>
                    <vs-th sort-key="fullname">
                        {{$t('fullname')}}
                    </vs-th>
                    <vs-th sort-key="unitofmeasurename">
                        {{$t('unitofmeasurename')}}
                    </vs-th>
                    <!-- <vs-th sort-key="gender">
                        {{$t('gender')}}
                    </vs-th> -->
                    <vs-th sort-key="ihgroupname">
                        {{$t('ihgroupname')}}
                    </vs-th>
                    <vs-th sort-key="calorie">
                        {{$t('calorie')}}
                    </vs-th>
                    <vs-th sort-key="caloriegramm">
                        {{$t('caloriegramm')}}
                    </vs-th>
                    <vs-th sort-key="protein">
                        {{$t('protein')}}
                    </vs-th>
                    <vs-th sort-key="fat">
                        {{$t('fat')}}
                    </vs-th>

                    <vs-th sort-key="carbohydrate">
                        {{$t('carbohydrate')}}
                    </vs-th>
                    <!-- <vs-th sort-key="workschedule">
                        {{$t('workschedule')}}
                    </vs-th> -->
                </template>
                <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading" @dblclick.native="$emit('DblClick',tr)">
                            <vs-td :data="data[indextr].code">
                                {{data[indextr].code}}
                            </vs-td>

                            <vs-td :data="data[indextr].shortname">
                                {{data[indextr].shortname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].fullname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].unitofmeasurename}}
                            </vs-td>
                            <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].gender}}
                            </vs-td> -->
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].ihgroupname}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].calorie}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].caloriegramm}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].protein}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].fat}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].carbohydrate}}
                            </vs-td>
                            <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].workschedule}}
                            </vs-td> -->
                        </vs-tr>
                </template>
                </vs-table>
                <div class="my-3 justify-content-between d-flex align-items-center">
                    <span></span>
                    <b-pagination
                        v-model="filter.PageNumber"
                        :total-rows="totalItems"
                        :per-page="filter.PageLimit"
                    ></b-pagination>
                </div>
            </b-col>
            <b-modal ref="my-modal" size="xl" v-model="createModal" hide-footer hide-header no-close-on-backdrop>
                <header class="modal-header">
                    <h5 class="modal-title">{{$t('Tmz')}}</h5>
                    <button
                    type="button"
                    aria-label="Close"
                    class="close"
                    @click="showModal('createModal',false)"
                    >×</button>
                </header>
                <div class="modal-body">
                    <edit-tmz-component :show-back-button="false" @success="TmzCreated($event)"></edit-tmz-component>
                </div>
            </b-modal>
        </b-row>
    </b-container>
</template>

<script>
import InventoryHoldingService from '@/services/InventoryHolding.service'
import editTmzComponent from "@/views/PersonalInfo/InventoryHolding/edit";
export default {
    components : {editTmzComponent},
    data:()=>({
        filter:{
            Search : '',
            SortColumn : '',
            Ordertype : 'asc',
            PageNumber : 1,
            PageLimit  : 20,
        },
        TMZList : [],
        Loading : false,
        selected  :[],
        totalItems : 0,
        createModal: false,
    }),
    created(){
        this.Refresh()
    },
    methods :{ 
        Refresh(){
            this.Loading = true
            InventoryHoldingService.GetList(this.filter.Search,this.filter.SortColumn,this.filter.Ordertype,this.filter.PageNumber,this.filter.PageLimit).then(res => {
                this.TMZList = res.data.rows
                this.totalItems = res.data.total
                this.Loading = false
            })
        },
        TmzCreated(data) {
            if (data.success) {
                this.showModal("createModal", false);
            }
            InventoryHoldingService.GetAll().then((res) => {
                this.InventoryHoldingList = res.data;
                this.Refresh()
            });
        },
        handleSort(key, active) {

        },
        AddModal(){
            this.showModal("createModal",true)
        },
        SelectedItem(){
            this.$emit("SelectedItem",this.selected)
        },
        showModal(modal, value) {
            this.$data[modal] = value;
        },
    },
    watch:{
        'filter.PageNumber':{
            handler(oldValue,newValue){
                this.Refresh()
            }
        },
    }
}
</script>

<style>

</style>