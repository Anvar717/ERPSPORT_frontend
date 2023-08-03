<template>
    <b-overlay :show="show">
        <b-card>
            <b-row>
                <b-col>
                    <h4 class="text-center">{{ $t("TrainingSchedule") }}</h4>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col sm="12" lg="4" md="4">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docnumber") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ TrainingSchedule.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ TrainingSchedule.docdate }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="12" lg="4" md="4"></b-col>
                <b-col sm="12" lg="4" md="4">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("schoolyear") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ TrainingSchedule.schoolyearname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ TrainingSchedule.statusname }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <b-table-simple bordered responsive>
                        <b-thead>
                            <b-tr>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;">№</b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;"> {{ $t('personname')
                                }} </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;"> {{
                                    $t('sporttypeclassifiername') }} </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;"> {{
                                    $t('sportgroupname') }} </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;"> {{
                                    $t('allowedacademichours') }} </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;"> {{ $t('studentcount')
                                }} </b-th>
                                <b-th colspan="6" class="text-center" style="vertical-align: middle;">
                                    {{ $t('weekday') }}
                                </b-th>

                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;"> {{
                                    $t('loadedacademichours') }} </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle;"> {{
                                    $t('differenacademichours') }} </b-th>
                            </b-tr>
                            <b-tr>
                                <b-th class="text-center" style="vertical-align: middle;">
                                    {{ $t('Mon') }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle;">
                                    {{ $t('Tue') }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle;">
                                    {{ $t('Wed') }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle;">
                                    {{ $t('Thu') }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle;">
                                    {{ $t('Fri') }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle;">
                                    {{ $t('Sat') }}
                                </b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-for="(item, index) in TrainingSchedule.trainingScheduleSportGroup" :key="index" class="text-center"  style="vertical-align: middle;">
                                <b-td  style="vertical-align: middle;"> {{ index + 1 }} </b-td>
                                <b-td  style="vertical-align: middle;"> {{ item.personname }} </b-td>
                                <b-td  style="vertical-align: middle;"> {{ item.sporttypeclassifiername }} </b-td>
                                <b-td  style="vertical-align: middle;"> {{ item.sportgroupname }} </b-td>
                                <b-td  style="vertical-align: middle;"> {{ item.allowedacademichours }} </b-td>
                                <b-td  style="vertical-align: middle;"> {{ item.studentcount }} </b-td>

                                <b-td @dblclick.stop="OpenModal(item, 'new', 1)"  style="vertical-align: middle;">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(el => el.weekdayid == 1)">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 1)" style="cursor:pointer"
                                            v-if="e.Status != 3">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>
                                            <br />
                                            <span> {{ e.isinorgterritory ? e.orgbuildingname : e.outsideterritoryname }}
                                            </span>
                                            <b-icon v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 2)"  style="vertical-align: middle;">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(el => el.weekdayid == 2)"
                                        v-if="e.Status != 3">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 2)" style="cursor:pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>
                                            <br />
                                            <span> {{ e.isinorgterritory ? e.orgbuildingname : e.outsideterritoryname }}
                                            </span>
                                            <b-icon v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 3)"  style="vertical-align: middle;">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(el => el.weekdayid == 3)"
                                        v-if="e.Status != 3">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 3)" style="cursor:pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>
                                            <b-icon class="ml-2" v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                            <br>
                                            <span> {{ e.isinorgterritory ? e.orgbuildingname : e.outsideterritoryname }}
                                            </span>

                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 4)"  style="vertical-align: middle;">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(el => el.weekdayid == 4)"
                                        v-if="e.Status != 3">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 4)" style="cursor:pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>
                                            <br />
                                            <span> {{ e.isinorgterritory ? e.orgbuildingname : e.outsideterritoryname }}
                                            </span>
                                            <b-icon v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 5)"  style="vertical-align: middle;">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(el => el.weekdayid == 5)"
                                        v-if="e.Status != 3">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 5)" style="cursor:pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>
                                            <br />
                                            <span> {{ e.isinorgterritory ? e.orgbuildingname : e.outsideterritoryname }}
                                            </span>
                                            <b-icon v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 6)"  style="vertical-align: middle;">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(el => el.weekdayid == 6)"
                                        v-if="e.Status != 3">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 6)" style="cursor:pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>
                                            <br />
                                            <span> {{ e.isinorgterritory ? e.orgbuildingname : e.outsideterritoryname }}
                                            </span>
                                            <b-icon v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>

                                <b-td  style="vertical-align: middle;"> {{ item.loadedacademichours }} </b-td>
                                <b-td  style="vertical-align: middle;" :class="item.differenacademichours < 0 ? 'bg-danger' : ''"> {{
                                    item.differenacademichours }} </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-left">
                    <b-button variant="danger" @click="$router.back()">
                        {{ $t('back') }}
                    </b-button>
                </b-col>
                <b-col class="text-right">
                    <!-- <b-button variant="success" @click="Save">
                        <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t('save') }}
                    </b-button> -->
                </b-col>
            </b-row>
            <b-modal no-close-on-backdrop size="lg" v-model="weekdaymodal" :title="$t('TrainingScheduleInfo')" hide-footer>
                <b-row>
                    <b-col>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-6 col-form-label"> {{ $t('AcademicHours') }} </label>
                            <div class="col-sm-6">
                                <b-form-input @keyup="calculateEndTime" id="input-sm" type="number"
                                    v-model="tabrow.academichours"></b-form-input>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-4 col-form-label"> {{ $t('Starttime') }} </label>
                            <div class="col-sm-8">
                                <date-picker @input="calculateEndTime" value-type="format" v-model="tabrow.starttime"
                                    format="HH:mm" :show-second="false" type="time"
                                    :placeholder="$t('Starttime')"></date-picker>
                            </div>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-4 col-form-label"> {{ $t('Endtime') }} </label>
                            <div class="col-sm-8">
                                <date-picker value-type="format" :editable="false" disabled v-model="tabrow.endtime"
                                    format="HH:mm" :show-second="false" type="time"
                                    :placeholder="$t('Endtime')"></date-picker>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4" class="d-flex align-items-center">
                        <!-- <b-form-radio v-model="tabrow.isinorgterritory"  name="some-radios" value="A">  </b-form-radio> -->
                        <b-button @click="ChangeOrgtype(true)"
                            :variant="tabrow.isinorgterritory == true ? 'success' : 'outline-success'" size="sm" pill
                            class="mr-2">
                            <b-icon icon="check"></b-icon>
                        </b-button> <span>{{ $t('insideOrganization') }}</span>
                    </b-col>
                    <b-col sm="8">
                        <v-select :options="OrganizationBuildingList" :disabled="tabrow.isinorgterritory !== true"
                            v-model="tabrow.orgbuildingid" :reduce="(item) => item.id" :placeholder="$t('oblast')"
                            label="orgbuildinginfoname" class="mr-2" style="width: 100%"
                            @input="ChangeOrgBuildingInfo"></v-select>
                    </b-col>
                </b-row>
                <b-row class="mt-2 d-flex align-items-center">
                    <b-col sm="4">
                        <b-button @click="ChangeOrgtype(false)"
                            :variant="tabrow.isinorgterritory == false ? 'success' : 'outline-success'" size="sm" pill
                            class="mr-2"> <b-icon icon="check"></b-icon> </b-button> <span>{{ $t('outsideOrganization')
                            }}</span>
                    </b-col>
                    <b-col sm="8">
                        <b-form-input id="input-sm" :disabled="tabrow.isinorgterritory !== false"
                            v-model="tabrow.outsideterritoryname"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col class="text-right">
                        <b-button variant="danger" @click="closeModal" class="mr-3"> {{ $t('back') }} </b-button>
                        <b-button variant="success" @click="SaveWeekDay"> {{ $t('save') }} </b-button>
                    </b-col>
                </b-row>
            </b-modal>
        </b-card>
    </b-overlay>
</template>
<script>
import TrainingScheduleService from '../../../services/trainingschedule.service';
import CustomDatePicker from "@/components/customDatePicker.vue";
import SchoolYearService from "@/services/SchoolYear.service";
import { BFormRadio } from 'bootstrap-vue';
import OrganizationBuildingInfoService from '@/services/OrganizationBuildingInfo.service'
export default {
    components: { CustomDatePicker, BFormRadio },
    data() {
        return {
            show: false,
            TrainingSchedule: {},
            schoolyearlist: [],
            FillLoading: false,
            WeekDayItem: {},
            filter: {
                sportgroupid: 0,
                sportlevelid: 0,
                sporttypeclassifierid: 0,
                trainingScheduleid: 0,
                Search: "",
                SortColumn: "",
                PageNumber: 1,
                PageLimit: 20,
                OrderType: "asc",
                pageOptions: [5, 10, 15, 20, 25, 50, 100],
            },
            weekdaymodal: false,
            editedIndex: -1,
            editedIndex1: -1,
            tabrow: {
                id: 0,
                ownerid: 0,
                weekdayid: 0,
                academichours: 0,
                starttime: "",
                endtime: "",
                isinorgterritory: true,
                orgbuildingid: null,
                orgbuildingname: null,
                outsideterritoryname: "",
                Status: 1
            },
            OrganizationBuildingList: [],
            weekdayid: 0,
            SaveLoading: false
        }
    },
    async created() {
        this.show = true;
        await TrainingScheduleService.Get(this.$route.params.id)
            .then((res) => {
                this.TrainingSchedule = res.data;
                if (res.data.id) {
                    this.filter.trainingScheduleid = res.data.id;
                    this.Refresh();
                }
                this.show = false;
            })
            .catch((error) => {
                this.$makeToast(error.response.data.error, this.$t("error"), "danger");
            });
        SchoolYearService.GetAll().then((res) => {
            this.schoolyearlist = res.data;
            this.Refresh()
        });
        OrganizationBuildingInfoService.GetAll(this.TrainingSchedule.organizationid).then(res => {
            this.OrganizationBuildingList = res.data
        })
    },
    methods: {
        calculateEndTime() {
            if (this.tabrow.starttime) {
                TrainingScheduleService.GetEndTime(this.tabrow.starttime, this.tabrow.academichours).then(res => {
                    this.tabrow.endtime = res.data
                })
            }
        },
        DeleteGroupWeekday(e) {
            this.$confirm(this.$t('WantDelete'), this.$t('Delete'), {
                confirmButtonText: this.$t('yes'),
                cancelButtonText: this.$t('no'),
                type: 'warning'
            }).then(() => {
                e.Status = 3
                this.calculateAcademicHours()
                // TrainingScheduleService.DeleteSportGroupWeekDay(e.id).then(res => {
                //     this.$message({
                //         type: 'success',
                //         message: this.$t('DeleteSuccess')
                //     });
                // })
            }).catch(() => { });
        },
        ChangeOrgtype(bool) {
            this.tabrow.isinorgterritory = bool
            this.tabrow.orgbuildingid = 0
            this.tabrow.orgbuildingname = ""
            this.tabrow.outsideterritoryname = ""
        },
        BindValue1(value) {
            this.TrainingSchedule.docdate = value;
        },
        SaveWeekDay() {
            var self = this
            this.tabrow.ownerid = this.WeekDayItem.id
            if (!self.tabrow.academichours) {
                this.$makeToast(this.$t('academichoursNotCorrect'), this.$t("error"), "danger");
                return false
            }
            if (!self.tabrow.starttime) {
                this.$makeToast(this.$t('starttimeNotCorrect'), this.$t("error"), "danger");
                return false
            }
            if (!self.tabrow.endtime) {
                this.$makeToast(this.$t('endtimeNotCorrect1'), this.$t("error"), "danger");
                return false
            }
            if (self.tabrow.isinorgterritory && !self.tabrow.orgbuildingid) {
                this.$makeToast(this.$t('territoryNotCorrect'), this.$t("error"), "danger");
                return false
            }
            if (self.tabrow.isinorgterritory === false && !self.tabrow.outsideterritoryname) {
                this.$makeToast(this.$t('territoryNotCorrect'), this.$t("error"), "danger");
                return false
            }
            
            if (self.editedIndex1 > -1) {
                self.tabrow.Status = 2
                self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].Status = 2
                // TrainingScheduleService.UpdateSportGroupWeekDay(this.tabrow).then(res => {
                Object.assign(
                    self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].sportGroupWeekDay[self.editedIndex1],
                    self.tabrow
                )
                // })
            }
            else {
                // TrainingScheduleService.UpdateSportGroupWeekDay(this.tabrow).then(res => {
                self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].sportGroupWeekDay.push(self.tabrow)
                // })
            }
            self.calculateAcademicHours()
            console.log(self.TrainingSchedule.trainingScheduleSportGroup)
            self.closeModal()
        },
        calculateAcademicHours() {
            var self = this
            self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].loadedacademichours = 0
            self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].sportGroupWeekDay.forEach(function (item) {
                if (item.Status != 3) {
                    self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].loadedacademichours += item.academichours * 1
                }
            })
            self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].differenacademichours =
                1 * self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].allowedacademichours - 1 * self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].loadedacademichours
        },
        closeModal() {
            this.weekdaymodal = false
        },
        ChangeOrgBuildingInfo() {
            if (this.tabrow.orgbuildingid) {
                this.tabrow.orgbuildingname = this.OrganizationBuildingList.filter(item => item.id == this.tabrow.orgbuildingid)[0].orgbuildinginfoname
            }
            
        },
        Refresh() {
            var self = this;
            self.loading = true;
            TrainingScheduleService.GetTrainingScheduleSportGroupList(
                self.filter.trainingScheduleid,
                self.filter.sporttypeclassifierid,
                self.filter.sportgroupid,
                self.filter.sportlevelid,
                self.filter.Search,
                self.filter.SortColumn,
                self.filter.OrderType,
                self.filter.PageNumber,
                self.filter.PageLimit
            )
                .then((res) => {
                    self.loading = false;
                    self.TrainingSchedule.trainingScheduleSportGroup = res.data.rows;
                    self.totalRows = res.data.total;
                })
                .catch((error) => {
                    self.$makeToast(
                        error.response.data.error,
                        self.$t("error"),
                        "danger"
                    );
                    self.loading = false;
                });
        },
        OpenModal(item, subItem, dayid) {
            this.weekdaymodal = true
            this.editedIndex = this.TrainingSchedule.trainingScheduleSportGroup.indexOf(item)
            this.WeekDayItem = Object.assign({}, item)
            if (subItem == 'new') {
                this.tabrow = {
                    id: 0,
                    ownerid: 0,
                    weekdayid: dayid,
                    academichours: 0,
                    starttime: "",
                    endtime: "",
                    isinorgterritory: true,
                    orgbuildingid: null,
                    orgbuildingname: null,
                    outsideterritoryname: "",
                    Status: 1
                }
            }
            else {
                this.tabrow = Object.assign({}, subItem)
                this.editedIndex1 = this.TrainingSchedule.trainingScheduleSportGroup[this.editedIndex].sportGroupWeekDay.indexOf(subItem)
                // this.editedIndex = this.TrainingSchedule.trainingScheduleSportGroup.indexOf(item)
                // this.WeekDayItem = Object.assign({}, item)
            }



        },
        FillData() {
            var self = this
            self.FillLoading = true
            TrainingScheduleService.Fill(self.TrainingSchedule).then(res => {
                self.FillLoading = false
                self.TrainingSchedule = res.data.data
                self.TrainingSchedule.forEach(function (item) {
                    item.sportGroupWeekDay = []
                })
            })
                .catch((error) => {
                    self.$makeToast(error.response.data.error, self.$t("error"), "danger");
                    self.FillLoading = false
                });
        },
        Save() {
            this.SaveLoading = true
            TrainingScheduleService.Update(this.TrainingSchedule).then(res => {
                this.SaveLoading = false
                var vm = this
                vm.$router.push({
                    name: 'TrainingSchedule'
                })
            }).catch(error => {
                this.SaveLoading = false
            })
        }
    }
}
</script>
<style></style>