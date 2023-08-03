<template>
  <b-container fluid>
      <b-card>
          <b-row>
              <b-col>
                  <h4 class="text-center mb-3"> {{ $t('HRTimeSheetTables') }} </h4>
              </b-col>
          </b-row>
          <b-row>
          <b-col>
              <b-row class="mb-0">
            <b-col >
              <div class="form-group form-row mb-0 py-1 " :style="{ backgroundColor : paramsid > 0 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("Person")
                  }}
                </label>
                <div class="col-sm-8 d-flex">
                  <c-input style="width:100%" class="mb-0" disabled v-model="tabrow.personname" v-if="paramsid == 0">
                    <template #append>
                      <CButton @click="OpenPersonModal" size="sm" type="button" color="primary">
                        <b-icon icon="three-dots"></b-icon>
                      </CButton>
                    </template>
                  </c-input>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> {{ tabrow.personname }} </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : paramsid > 0 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("Department")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                  disabled
                    :options="DepartmentList"
                    v-model="tabrow.departmentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-if="paramsid == 0"
                  ></v-select>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> {{ tabrow.departmentname }} </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("Position")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                  disabled
                    :options="PositionList"
                    v-model="tabrow.positionid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-if="paramsid == 0"
                  ></v-select>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> {{ tabrow.positionname }} </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("employeeenrolment")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="EmployeeEnrolmentList"
                    v-model="tabrow.employeeenrolmentid"
                    :reduce="(item) => item.personid"
                    :placeholder="$t('ChooseBelow')"
                    label="employeeenrolmentid"
                    disabled
                    v-if="paramsid == 0"
                  ></v-select>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> {{ tabrow.employeeenrolmentid }} </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : paramsid > 0 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("organizationaccount")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                  disabled
                    :options="OrganizationAccountList"
                    v-model="tabrow.organizationaccountid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="code"
                    v-if="paramsid == 0"
                  ></v-select>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> {{ tabrow.organizationaccountid ? OrganizationAccountList.filter(item => item.id == tabrow.organizationaccountid)[0].code : null }} </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : paramsid > 0 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("workschedule")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="WorkScheduleList"
                    v-model="tabrow.workscheduleid"
                    :reduce="(item) => item.id"
                    disabled
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-if="paramsid == 0"
                  ></v-select>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.workscheduleid  ? WorkScheduleList.filter(item => item.id === tabrow.workscheduleid)[0].name : null }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("startdate")
                  }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow.startdate"
                    disabled
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                    v-if="paramsid == 0"
                  ></date-picker>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.startdate }} 
                  </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("enddate")
                  }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow.enddate"
                    size="sm"
                    disabled
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    v-if="paramsid == 0"
                    style="width:100%"
                  ></date-picker>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.enddate }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : paramsid > 0 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("factdays")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input  v-model="tabrow.factdays" class="mb-0" v-if="paramsid == 0" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.factdays }} 
                  </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : paramsid > 0 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("facthours")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input v-model="tabrow.facthours" class="mb-0" v-if="paramsid == 0" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.facthours }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("dayoffhours")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input  v-model="tabrow.dayoffhours" class="mb-0" v-if="paramsid == 0" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.dayoffhours }} 
                  </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("nighthours")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input  v-model="tabrow.nighthours" class="mb-0" v-if="paramsid == 0" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.nighthours }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
           <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : paramsid > 0 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("detailinfo")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input v-model="tabrow.detailinfo" class="mb-0" v-if="paramsid == 0"></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="paramsid > 0"> 
                      {{ tabrow.detailinfo }} 
                  </a>
                </div>
              </div>
              
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="mt-3"> 
            <b-col>
              <b-table
                :fields="DaysTables"
                :items="tabrow.DaysTable"
                class="text-center"
               
                style="vertical-align:middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
                sticky-header="60vh"
                no-border-collapse
                small
              >
                <template #cell(ondate)="{item}"> 
                  <p class="m-0 p-0" style="white-space : nowrap">
                    {{ item.ondate.split('.')[0] }}  <b> ( {{ getWeekday(item) }} ) </b>
                  </p> 
                </template>
                <template #cell(timesheetindicatorname)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.timesheetindicatorname }} </p>
                  <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                    :options="TimeSheetIndicator"
                    v-model="item.timesheetindicatorid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </template>
                <template #cell(plandays)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.plandays }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2"  v-model="item.plandays" size="sm"></c-input>
                </template>
                 <template #cell(planhours)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.planhours }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2"  v-model="item.planhours" size="sm"></c-input>
                </template>
                 <template #cell(factdays)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.factdays }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2"  v-model="item.factdays" size="sm"></c-input>
                </template>
                 <template #cell(facthours)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.facthours }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2" @input="changehrtime(item)" v-model="item.facthours" size="sm"></c-input>
                </template>
                 <template #cell(dayoffhours)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.dayoffhours }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2" @input="changehrtime(item)" v-model="item.dayoffhours" size="sm"></c-input>
                </template>
                 <template #cell(nighthours)="{item}">
                  <c-input class="mb-0" v-if="item.Status === 2 || item.Status === 1"  @input="changehrtime(item)" v-model="item.nighthours" size="sm"></c-input>
                </template>
                <template #cell(actions)="{item}">
                  <div class="text-center">
                    <b-link
                      @click="EditItem(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil" ></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-row>
              <b-col>
                  <b-button variant="danger" @click="$route.query.newdocid ? $router.push({name : 'EditHRTimeSheet',params : { id : $route.query.newdocid }}) :$router.back()"> <b-icon icon="arrow-left-short"></b-icon> {{ $t('back') }} </b-button>
              </b-col>
              <b-col class="text-right">
                  <b-button :disabled='SaveLoading' variant="success" @click="SaveData"> <b-spinner small v-if="SaveLoading"></b-spinner> <b-icon v-if="!SaveLoading" icon="check2"></b-icon> {{ $t('Save') }} </b-button>
              </b-col>
          </b-row>
            <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
                <employee-list-component :ondate="$route.params.data ? $route.params.data.docdate : null" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
                <c-row class="mt-2">
                    <c-col class="text-center">
                        <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                            {{$t('back')}}
                        </b-button>
                        <b-button variant="primary" @click="AddPerson(personvalue)">
                            {{$t('Add')}}
                        </b-button>
                    </c-col>
                </c-row>
            </b-modal>
          </b-col>
      </b-row>
      </b-card>
  </b-container>
</template>

<script>
import HRTimeSheetService from "@/services/HRTimeSheet.service";
import OrganizationService from '@/services/organization.service'
import WorkScheduleService from '@/services/WorkSchedule.service'
import TimeSheetIndicatorService from '@/services/TimesheetIndicator.service'
import EmployeeListComponent from '@/components/EmployeeList'
import DepartmentService from '@/services/Department.service'
import PositionService from '@/services/Position.service'
export default {
    components:{EmployeeListComponent},
    data(){
        return{
            tabrow : {
                id : 0,
                ownerid : 0,
                departmentid : 0,
                departmentname : '',
                personid : 0,
                personname : '',
                positionid : 0,
                positionname : '',
                employeeenrolmentid : 0,
                organizationaccountid : 0,
                workscheduleid : 0,
                employmentrate : 0,
                employmenttypeid : 0,
                employmenttypename : '',
                plandays : 0,
                planhours : 0,
                factdays : 0,
                facthours : 0,
                dayoffhours : 0,
                nighthours : 0,
                detailinfo : '',
                startdate : "",
                enddate : "",
                tableid : 0,
                documentid : 0,
                documentinfo : "",
                Status : 1,
                DaysTable : []
            },
            paramsid : -1,
            DaysTables : [
                {key : 'ondate',label : this.$t('ondate')},
                {key : 'timesheetindicatorname',label :this.$t('timesheetindicator')},
                // {key : 'factdays',label : this.$t('factdays')},
                {key : 'facthours',label : this.$t('facthours')},
                {key : 'dayoffhours',label : this.$t('dayoffhours')},
                {key : 'nighthours',label : this.$t('nighthours')},
                // {key : 'actions',label : this.$t('actions')}
            ],
            OrganizationAccountList : [],
            WorkScheduleList : [],
            TimeSheetIndicator : [],
            SaveLoading : false,
            personvalue : {},
            DepartmentList : [],
            PositionList : [],
            EmployeeEnrolmentList : []
        }
    },
    created(){
        var self = this
        self.paramsid = self.$route.params.id
        self.$vs.loading()  
        if(self.paramsid == 0){
            HRTimeSheetService.GetHRTimeSheetTable(self.$route.params.data).then(res => {
              self.$vs.loading.close()

              self.tabrow.organizationaccountid = self.$route.params.data.organizationaccountid
              self.tabrow.departmentid = self.$route.params.data.departmentid
              self.tabrow.departmentid = self.$route.params.data.departmentid
              self.tabrow.ownerid = self.$route.params.data.id
              //self.tabrow.DaysTable = res.data[0].DaysTable
              
              self.calculate()
            }).catch(error =>{
                self.$vs.loading.close()
            })
        }
        else{
            HRTimeSheetService.GetHRTimeSheetTable(self.$route.params.id).then(res => {
                self.tabrow = res.data
                self.$vs.loading.close()
                self.tabrow.DaysTable.forEach(function(item){
                    item.Status = 2
                })
            }).catch(error => {
                this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
            })
        }
        OrganizationService.GetOrganizationAccountList('').then(res => {
            this.OrganizationAccountList = res.data
        })
        WorkScheduleService.GetAll().then(res => {
            this.WorkScheduleList = res.data
        })
        TimeSheetIndicatorService.GetAll().then(res => {
            this.TimeSheetIndicator = res.data
        })
        DepartmentService.GetAll().then(res => {
            this.DepartmentList = res.data
        })
        PositionService.GetAll1().then(res => {
            this.PositionList = res.data
        })
    },
    methods : {
        CloseEmployeeModal(){
            this.$bvModal.hide('PersonModal')
        },
        AddPerson(data){
            this.CloseEmployeeModal()
            this.tabrow.personid = data.personid
            this.tabrow.personname = data.personname
            this.tabrow.positionname = data.positionname
            this.tabrow.positionid = data.positionid
            this.tabrow.employeeenrolmentid = data.employeeenrolmentid
            this.tabrow.departmentid = data.departmentid
            this.tabrow.departmentname = data.departmentname
            this.tabrow.workscheduleid = data.workscheduleid
            this.tabrow.workschedule = data.workschedule
            this.FillHRTimeSheetDay();
        },
        FillHRTimeSheetDay(){
           var self = this;
            HRTimeSheetService.FillHRTimeSheetDay(self.tabrow).then(res => {
              self.$vs.loading.close()

              
              self.tabrow = res.data
              
              self.calculate()
            }).catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
        },
        OpenPersonModal(){
            this.$bvModal.show('PersonModal')
        },
        changehrtime(item){
            this.calculate()
        },
        calculate(){
            var self = this
            self.tabrow.facthours = 0
            self.tabrow.dayoffhours = 0
            self.tabrow.nighthours = 0
            self.tabrow.factdays = 0
            
            self.tabrow.DaysTable.forEach(function(item){
                if(item.Status !== 3){
                self.tabrow.facthours =  self.tabrow.facthours*1 + item.facthours*1
                self.tabrow.dayoffhours = self.tabrow.dayoffhours*1 + item.dayoffhours*1
                self.tabrow.nighthours = self.tabrow.nighthours*1 + item.nighthours*1
                if(item.facthours != 0){
                    self.tabrow.factdays = self.tabrow.factdays*1 + 1
                }
                }
            })
        },
        SelectedItem(value){
            this.personvalue = value
        },
        makeToast(message, title, type) {
            var self = this;
            self.toastCount++;
            self.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 2000,
                variant: type,
                solid: true,
            });
        },
        rowClass(item, type) {
            if (item.Status === 3) {
                return "d-none";
            }
        },
        getWeekday(item){
            var d = new Date(item.ondate.split('.')[2],item.ondate.split('.')[1] - 1,item.ondate.split('.')[0]).getDay()
            if(d === 0){
                return 'Вс'
            }
            if(d === 1){
                return 'Пн'
            }
            if(d === 2){
                return 'Вт'
            }
            if(d === 3){
                return 'Ср'
            }
            if(d === 4){
                return 'Чт'
            }
            if(d === 5){
                return 'Пт'
            }
            if(d === 6){
                return 'Сб'
            }
        },
        SaveData(){
            this.SaveLoading = true
            HRTimeSheetService.UpdateHRTimeSheetTable(this.tabrow).then(res => {
                this.SaveLoading = false
                var vm = this
                setTimeout(() => {
                    // vm.$router.push({name : 'EditHRTimeSheet',params : {id : vm.$route.params.id}})
                    vm.$route.query.newdocid ? vm.$router.push({ name : 'EditHRTimeSheet',params : { id : vm.$route.query.newdocid } }) : vm.$router.back()
                },500)
            }).catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
        }
    }
}
</script>

<style>

</style>