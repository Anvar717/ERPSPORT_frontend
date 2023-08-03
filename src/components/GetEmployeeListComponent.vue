<template>
  <b-container fluid>
      <b-row>
          <b-col sm="8">
            <div class="d-flex">
                <b-input v-model="filter.inn" :placeholder="$t('inn')" style="width : 50%" class="mr-2"></b-input>
                <b-input v-model="filter.pinfl" :placeholder="$t('pinfl')" style="width : 50%" class="mr-2"></b-input>
                <b-input-group>
                    <b-form-input v-model="filter.Search" :placeholder="$t('search')"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="primary" @click="Refresh"> <b-icon icon="search"></b-icon> {{ $t("Search") }} </b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>
          </b-col>
          <b-col class="text-right" sm="4">
              <b-button variant="primary" @click="AddModal"> <b-icon icon="plus"></b-icon> {{ $t('Add') }}  </b-button>
          </b-col>
      </b-row>
      <b-row class="mt-2">  
          <b-col>
               <vs-table
                    :data="EmployeeList"
                    @sort="handleSort"
                    @selected="SelectedItem"
                    v-model="selected"
                    style="border:1px solid #eee"
                    :max-items="filter.PageLimit"
                >
                <template slot="thead">
                    <!-- <vs-th sort-key="identitydocument">
                        {{$t('identitydocument')}}
                    </vs-th> -->
                    <vs-th sort-key="inn">
                        {{$t('inn')}}
                    </vs-th>
                    <vs-th sort-key="fullname">
                        {{$t('fio')}}
                    </vs-th>
                    <vs-th sort-key="documentseries">
                        {{$t('documentseries')}}
                    </vs-th>
                    <vs-th sort-key="documentnumber">
                        {{$t('documentnumber')}}
                    </vs-th>
                    <vs-th sort-key="dateofbirth">
                        {{$t('dateofbirth')}}
                    </vs-th>
                    <vs-th sort-key="nationality">
                        {{$t('nationality')}}
                    </vs-th>
                    <vs-th sort-key="contactinfo">
                        {{$t('contactinfo')}}
                    </vs-th>
                    <vs-th sort-key="pinfl">
                        {{$t('pinfl')}}
                    </vs-th>
                </template>
                 <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading" @dblclick.native="$emit('DblClick',tr)">
                            <!-- <vs-td :data="data[indextr].identitydocument">
                                {{data[indextr].identitydocument}}
                            </vs-td> -->

                            <vs-td :data="data[indextr].inn">
                                {{data[indextr].inn}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].fullname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].documentseries}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].documentnumber}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].dateofbirth}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].nationality}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].contactinfo}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].pinfl}}
                            </vs-td>
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
      </b-row>
       <b-modal ref="my-modal" size="xl" v-model="createModal" hide-footer hide-header no-close-on-backdrop modal-class="custom-size-modal">
          <header class="modal-header">
            <h5 class="modal-title">{{$t('Employee')}}</h5>
            <button
              type="button"
              aria-label="Close"
              class="close"
              @click="showModal('createModal',false)"
            >×</button>
          </header>
          <div class="modal-body">
            <edit-person-component
              :show-back-button="false"
              :person-type-id="2"
              @success="studentCreated($event)"
            ></edit-person-component>
          </div>
        </b-modal>
  </b-container>
</template>

<script>
import PersonService from '@/services/person.service'
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
export default {
    components : {editPersonComponent},
    props : {
        isAllEmployee : {
            default : false,
            type : Boolean
        },
        organization : {
            default : 0,
            type : Number
        }
    },
    data(){
        return{
            EmployeeList : [],
            filter : {
                PageLimit : 20,
                organizationid:0,
                Search : '',
                SortColumn : '',
                OrderType : 'asc',
                PageNumber : 1,
                pinfl : '',
                inn : ''
            },
            selected : [],
            totalItems : 0,
            Loading : false,
            createModal : false,
        }
    },
    created(){
        this.Refresh()
    },
    methods : {
        AddModal(){
            this.showModal("createModal",true)
        },
        handleSort(key, active) {

        },
        SelectedItem(){
            this.$emit("SelectedItem",this.selected)
        },
        Refresh(){
            this.Loading = true
            PersonService.GetEmployeeList(
                this.filter.inn,
                this.filter.pinfl,
                this.filter.Search,
                this.organization,
                this.filter.SortColumn,
                this.filter.OrderType,
                this.filter.PageNumber,
                this.filter.PageLimit,
                this.isAllEmployee
            ).then(res => {
                this.EmployeeList = res.data.rows
                this.totalItems = res.data.total
                this.Loading = false
            })
        },
        studentCreated(data) {
            (data);
            this.showModal("createModal", false);
            this.Refresh()
            // if(data.success){
            //     this.Refresh()
            // }
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
        'filter.HREmpAppointOrderTypeID':{
            handler(oldValue,newValue){
                this.Refresh()
            }
        },
        'filter.DepartmentID':{
            handler(oldValue,newValue){
                this.Refresh()
            }
        }
    }
}
</script>

<style>

</style>