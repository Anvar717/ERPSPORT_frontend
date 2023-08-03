<template>
  <div>
    <c-row>
        <c-col lg="4" sm="12">
        <label  for="#">{{$t('search')}}</label>
            <b-input-group class="mt-0">
                <b-input style="z-index : 999999"  v-model="filter.Search" :placeholder="$t('Search')"></b-input>
                <b-input-group-append>
                    <b-button variant="primary" size="sm" @click="Refresh">
                        <b-icon icon="search"></b-icon>
                        {{$t('search')}}
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </c-col>
    </c-row>
    <c-row class="mt-3">
        <c-col>
            <div>
                <vs-table
                :data="EmployeeList"
                @search="handleSearch"
                @sort="handleSort"
                @selected="SelectedItem"
                maxHeight='550px'
                v-model="selected"
                style="border:1px solid #eee"
                :max-items="filter.PageLimit">
                <template slot="thead">
                    <vs-th sort-key="contactinfo" >
                        {{$t('contactinfo')}}
                    </vs-th>
                    <vs-th sort-key="dateofbirth">
                        {{$t('dateofbirth')}}
                    </vs-th>
                    <vs-th sort-key="department">
                        {{$t('department')}}
                    </vs-th>
                    <vs-th sort-key="employmenttype">
                        {{$t('employmenttype')}}
                    </vs-th>
                    <vs-th sort-key="hrempappointordertype">
                        {{$t('hrempappointordertype')}}
                    </vs-th>
                    <vs-th sort-key="inn">
                        {{$t('inn')}}
                    </vs-th>
                    <vs-th sort-key="personname">
                        {{$t('personname')}}
                    </vs-th>
                    <vs-th sort-key="pinfl">
                        {{$t('pinfl')}}
                    </vs-th>
                    <vs-th sort-key="positionname">
                        {{$t('positionname')}}
                    </vs-th>

                    <vs-th sort-key="startdate">
                        {{$t('startdate')}}
                    </vs-th>
                </template>
                <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading" @dblclick.native="$emit('DblClick',tr)">
                            <vs-td :data="data[indextr].contactinfo">
                                {{data[indextr].contactinfo}}
                            </vs-td>

                            <vs-td :data="data[indextr].dateofbirth">
                                {{data[indextr].dateofbirth}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].department}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].employmenttype}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].hrempappointordertype}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].inn}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].personname}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].pinfl}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].positionname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].startdate}}
                            </vs-td>
                        </vs-tr>
                </template>
                </vs-table>
                <div class="my-3 personList-pagination justify-content-between d-flex align-items-center">
                    <span></span>
                    <b-pagination
                        v-model="filter.PageNumber"
                        :total-rows="totalItems"
                        :per-page="filter.PageLimit"
                    ></b-pagination>
                </div>
            </div>
        </c-col>
    </c-row>
  </div>
</template>

<script>
import EmployeeManageService from '@/services/EmployeeManage.service'
import DepartmentService from '@/services/Department.service'
import HelperService from '@/services/helper.service'
import PositionService from '@/services/Position.service'
export default {
    props : {
        ondate : {
            type : String,
            default  : ''
        },
        department : {
            type : Number,
            default : 0
        },
        hrappointordertypeid : {
            type : Number,
            default : 0
        },
        isteacher : {
            type : Boolean,
            default : true
        }
    },
    data(){
        return{
            value1 : '',
            filter : {
                Search : '',
                DepartmentID  : 0,
                HREmpAppointOrderTypeID : 0,
                SortColumn : "",
                OrderType : "asc",
                PageNumber : 1,
                PageLimit : 20,
                positionid : 0,
                organizationid:0
            },
            selected:[],
            totalItems: 0,
            EmployeeList: [],
            DepartmentList  :[],
            Loading : false,
            HrEmpAppointOrderTypeList : []
        }
    },
    created(){
        this.Refresh()
        DepartmentService.GetAll().then(res => {
            this.DepartmentList = res.data
        })
        HelperService.HrEmpAppointOrderType().then(res => {
            this.HrEmpAppointOrderTypeList = res.data
        })
        this.changeDp()
    },
    mounted(){

    },
    methods:{
        changeDp(){
                PositionService.GetAll().then(res => {
                    this.PositionList = res.data
                })
        },
        ChangeDepartment(){
            this.Loading = true
            EmployeeManageService.GetEmployeeListForComponent(
                this.ondate,
                this.filter.DepartmentID,
                this.hrappointordertypeid,
                this.filter.Search,
                this.filter.SortColumn,
                this.filter.OrderType,
                this.filter.PageNumber,
                this.filter.PageLimit,
                this.filter.organizationid,
                this.isteacher
            ).then(res => {
                console.log(res.data.rows)
                this.EmployeeList = res.data.rows
                this.totalItems = res.data.total
                this.Loading = false
            })
        },
        Refresh(){
            this.Loading = true
            EmployeeManageService.GetEmployeeListForComponent(
                this.ondate,
                this.department,
                this.hrappointordertypeid,
                this.filter.Search,
                this.filter.SortColumn,
                this.filter.OrderType,
                this.filter.PageNumber,
                this.filter.PageLimit,
                this.filter.organizationid,
                this.isteacher
            ).then(res => {
                console.log(res.data.rows)
                this.EmployeeList = res.data.rows
                this.totalItems = res.data.total
                this.Loading = false
            })
        },
        handleSearch(searching) {
            
        },
        handleChangePage(page) {
            this.filter.PageNumber = page
            this.Refresh()
            console.log(this.EmployeeList)
        },
        handleSort(key, active) {

        },
        SelectedItem(){
            this.$emit("SelectedItem",this.selected)
        }
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
.vs-pagination--ul{
    margin-bottom: 0;
}
.selectExample {
  margin: 10px;
}
.con-select-example {
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-select .vs-select {
  width: 100%
}
@media (max-width: 550px) {
  .con-select {
    flex-direction: column;
  }
  .con-select .vs-select {
    width: 100%
  }
}
.vs-table .vs-table--thead th{
    background-color: #eee;
    position: sticky;
    top: 0;
}
</style>
