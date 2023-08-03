<template>
  <div>
    <c-row>
        <!-- <c-col>
            <label for=""> {{ $t('schoolyear') }} </label>
            <v-select
                :options="SchoolYearList"
                :reduce="item => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="filter.schoolyearid"
                class="mb-2 w-100"
            >
            </v-select>
        </c-col> -->
        <c-col>
            <label >{{$t('orgschoolgrade')}}</label>
            <v-select
                :options="OrgSchoolGradeList"
                :reduce="item => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="filter.orgschoolgradeid"
            ></v-select>
        </c-col>
        <c-col>
            <label >{{$t('schoolsubject')}}</label>
            <v-select
                :options="SchoolSubjectList"
                :reduce="item => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="filter.schoolsubjectid"
            ></v-select>
        </c-col>
        
        <c-col>
        <label  for="#">{{$t('search')}}</label>
            <b-input-group class="mt-0" >
                <b-input style="z-index : 999999"  v-model="filter.Search" :placeholder="$t('Search')"></b-input>
                <b-input-group-append>
                    <b-button variant="primary" size="sm" @click="Refresh">
                        <b-icon icon="search"></b-icon>
                        {{$t('search')}}
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </c-col>
        <c-col>

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
                    <vs-th sort-key="personname">
                        {{$t('personname')}}
                    </vs-th>
                    <vs-th sort-key="employeeenrolmentid" >
                        {{$t('employeeenrolmentid')}}
                    </vs-th>
                    <vs-th sort-key="schoolyear">
                        {{$t('schoolyear')}}
                    </vs-th>
                    <vs-th sort-key="orgschoolgrade">
                        {{$t('orgschoolgrade')}}
                    </vs-th>
                    <vs-th sort-key="schoolsubject">
                        {{$t('schoolsubject')}}
                    </vs-th>
                    
                    <vs-th sort-key="studentcount">
                        {{$t('studentcount')}}
                    </vs-th>
                    <vs-th sort-key="homeschoolinghour">
                        {{$t('homeschoolinghour')}}
                    </vs-th>
                    
                    <vs-th sort-key="homeschstdudentcount">
                        {{$t('homeschstdudentcount')}}
                    </vs-th>
                    <vs-th sort-key="hours">
                        {{$t('hours')}}
                    </vs-th>

                    <!-- <vs-th sort-key="startdate">
                        {{$t('startdate')}}
                    </vs-th> -->
                </template>
                <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading" @dblclick.native="$emit('DblClick',tr)">
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].personname}}
                            </vs-td>
                            <vs-td :data="data[indextr].employeeenrolmentid">
                                {{data[indextr].employeeenrolmentid}}
                            </vs-td>
                            <vs-td :data="data[indextr].schoolyear">
                                {{data[indextr].schoolyear}}
                            </vs-td>
                            <vs-td :data="data[indextr].orgschoolgrade">
                                {{data[indextr].orgschoolgrade}}
                            </vs-td>

                            <vs-td :data="data[indextr].schoolsubject">
                                {{data[indextr].schoolsubject}}
                            </vs-td>

                            
                            <vs-td :data="data[indextr].studentcount">
                                {{data[indextr].studentcount}}
                            </vs-td>
                            <vs-td :data="data[indextr].homeschoolinghour">
                                {{data[indextr].homeschoolinghour}}
                            </vs-td>
                            
                            <vs-td :data="data[indextr].homeschstdudentcount">
                                {{data[indextr].homeschstdudentcount}}
                            </vs-td>
                            <vs-td :data="data[indextr].hours">
                                {{data[indextr].hours}}
                            </vs-td>

                            <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].startdate}}
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
            </div>
        </c-col>
    </c-row>
  </div>
</template>

<script>
import TeacherHourService from '@/services/TeacherHour.service'
// import SchoolYearService from "@/services/SchoolYear.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
export default {
    props : {
        schoolyear : {
            type : Number,
            default : 0
        }
    },
    data(){
        return{
            value1 : '',
            filter : {
                Search : '',
                schoolyearid  : 0,
                schoolsubjectid : 0,
                orgschoolgradeid : 0,
                SortColumn : "",
                OrderType : "asc",
                PageNumber : 1,
                PageLimit : 20,
                positionid : 0
            },
            selected:[],
            totalItems: 0,
            EmployeeList: [],
            Loading : false,
            SchoolYearList : [],
            SchoolSubjectList : [],
            OrgSchoolGradeList : []
        }
    },
    created(){
        // SchoolYearService.GetAll().then((res) => {
        //     this.SchoolYearList = res.data;
        // });
        SchoolSubjectService.GetAll().then(res => {
            this.SchoolSubjectList = res.data;
        });
        OrgSchoolGradeService.GetAll().then(res =>{
            this.OrgSchoolGradeList = res.data
        })
        this.Refresh()
    },
    mounted(){

    },
    methods:{
        Refresh(){
            this.Loading = true
            TeacherHourService.GetTeacherHourTableList(
                this.schoolyear,
                this.filter.schoolsubjectid,
                this.filter.orgschoolgradeid,
                this.filter.Search,
                this.filter.SortColumn,
                this.filter.OrderType,
                this.filter.PageNumber,
                this.filter.PageLimit
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
