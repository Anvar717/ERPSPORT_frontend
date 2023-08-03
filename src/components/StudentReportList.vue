<template>
  <b-container fluid>
        <b-row>
            <b-col>
                <label for="">{{$t('OrgSchoolGrade')}}</label>
                <v-select
                    :options="orgschoolgradelist"
                    v-model="filter.OrgSchoolGradeID"
                    :reduce="(item) => item.id"
                    :placeholder="$t('OrgSchoolGrade')"
                    label="name"
                    :disabled="orgschoolgrade !== 0"
                  >
                </v-select>
            </b-col>
            <b-col>
                <label for="">{{$t('SchoolYear')}}</label>
                <v-select
                    :options="schoolyearlist"
                    v-model="filter.SchoolYearID"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                    :disabled="schoolyear !== 0"
                  >
                </v-select>
            </b-col>
            <b-col>
                <label for="">{{$t('search')}}</label>
                <div class="d-flex mt-n1">
                    
                    <CInput
                        :placeholder="$t('FullName')"
                        autocomplete="text"
                        v-model="filter.FullName"
                        v-on:keyup.enter="Refresh"
                        style="width:100%"
                        class="mr-2"
                    >
                        <template #append>
                        <CButton
                            @click="Refresh"
                            size="sm"
                            variant="outline"
                            type="button"
                            color="primary"
                        >
                            <b-icon icon="search"></b-icon>
                            {{ $t("search") }}
                        </CButton>
                        </template>
                    </CInput>
                    <CButton
                        @click="Refresh"
                        size="sm"
                        color="primary"
                        variant="outline"
                        style="height:35px"
                    >
                        <b-icon icon="arrow-repeat"> </b-icon>
                    </CButton>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <vs-table
                    :data="StudentList"
                    @sort="handleSort"
                    @selected="SelectedItem"
                    v-model="selected"
                    style="border:1px solid #eee"
                    :max-items="filter.PageLimit"
                >
                    <template slot="thead">
                        <vs-th sort-key="schoolyear">
                            {{$t('schoolyear')}}
                        </vs-th>
                        <vs-th sort-key="orgschoolgrade">
                            {{$t('orgschoolgrade')}}
                        </vs-th>
                        <vs-th sort-key="startdate">
                            {{$t('startdate')}}
                        </vs-th>
                        <vs-th sort-key="studentexpulsiontype">
                            {{$t('studentexpulsiontype')}}
                        </vs-th>
                        <vs-th sort-key="enddate">
                            {{$t('enddate')}}
                        </vs-th>
                        <vs-th sort-key="personname">
                            {{$t('StudentFIO')}}
                        </vs-th>
                        <vs-th sort-key="dateofbirth">
                            {{$t('dateofbirth')}}
                        </vs-th>
                        <vs-th sort-key="gender">
                            {{$t('gender')}}
                        </vs-th>
                        <vs-th sort-key="nationality">
                            {{$t('nationality')}}
                        </vs-th>
                    </template>
                    <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="isBusy" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!isBusy" @dblclick.native="$emit('DblClick',tr)">
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].schoolyear}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].orgschoolgrade}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].startdate}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].studentexpulsiontype}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].enddate}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].personname}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].dateofbirth}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].gender}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].nationality}}
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
  </b-container>
</template>

<script>
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SchoolYearService from "@/services/SchoolYear.service";
import StudentManageService from "@/services/StudentManage.service";
export default {
    props : {
        ondate : {
            type : String,
            default : ''
        },
        orgschoolgrade : {
            type : Number,
            default : 0
        },
        schoolyear : {
            type : Number,
            default : 0
        }
    },
    data : () => ({
        filter : {
            OrgSchoolGradeID : 0,
            SchoolYearID : 0,
            FullName : '',
            PageLimit : 20,
            DateOfBirth : '',
            Sort : '',
            order : 'asc',
            PageNumber : 1
        },
        orgschoolgradelist : [],
        schoolyearlist : [],
        StudentList : [],
        selected : [],
        totalItems : 0,
        isBusy : false
    }),
    created(){
        OrgSchoolGradeService.GetAll().then((res) => {
            this.orgschoolgradelist = res.data;
        });
        SchoolYearService.GetAll().then((res) => {
            this.schoolyearlist = res.data;
        });
        if(this.orgschoolgrade !== 0 && this.schoolyear !== 0){
            this.filter.OrgSchoolGradeID = this.orgschoolgrade
            this.filter.SchoolYearID = this.schoolyear
        }
        this.Refresh()
    },
    methods:{
        Refresh() {
            this.isBusy = true;
            StudentManageService.GetList(
                this.filter.FullName,
                this.filter.DateOfBirth,
                0,
                this.ondate,
                this.filter.SchoolYearID,
                this.filter.OrgSchoolGradeID,
                this.filter.Sort,
                this.filter.order,
                this.filter.PageNumber,
                this.filter.PageLimit
            ).then((res) => {
                this.isBusy = false;
                this.StudentList = res.data.rows;
                this.totalItems = res.data.total;
            });
        },
        handleSort(key, active) {

        },
        SelectedItem(){
            this.$emit("SelectedItem",this.selected)
            // console.log(this.selected)
        },
    },
    watch:{
        'filter.PageNumber':{
            handler(newValue,oldValue){
                this.Refresh()
            }
        }
    }
}
</script>

<style>

</style>