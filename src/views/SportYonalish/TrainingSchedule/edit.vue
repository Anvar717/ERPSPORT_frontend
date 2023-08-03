<template>
    <b-overlay :show="show">
        <b-card>
            <b-row>
                <b-col>
                    <h4 class="text-center">{{ $t("TrainingSchedule") }}</h4>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col sm="12" md="6" lg="4" class="mt-2">
                    <label for=""> {{ $t("docnumber") }} </label>
                    <b-form-input v-model="TrainingSchedule.docnumber" :disabled="TrainingSchedule.trainingScheduleSportGroup &&
                        TrainingSchedule.trainingScheduleSportGroup.length > 0
                        "></b-form-input>
                </b-col>
                <b-col sm="12" md="6" lg="4" class="mt-2">
                    <label for=""> {{ $t("docdate") }} </label>
                    <custom-date-picker v-model="TrainingSchedule.docdate" :disabled="TrainingSchedule.trainingScheduleSportGroup &&
                        TrainingSchedule.trainingScheduleSportGroup.length > 0
                        " size="sm" lang="ru" :placeholder="$t('date')" @keyup="BindValue1" value-type="format"
                        format="DD.MM.YYYY" style="width: 100%"></custom-date-picker>
                </b-col>
                <b-col sm="12" md="6" lg="4" class="mt-2">
                    <label for="">{{ $t("SchoolYear") }}</label>
                    <v-select :options="schoolyearlist" :disabled="TrainingSchedule.trainingScheduleSportGroup &&
                        TrainingSchedule.trainingScheduleSportGroup.length > 0
                        " v-model="TrainingSchedule.schoolyearid" :reduce="(item) => item.id"
                        :placeholder="$t('SchoolYear')" label="name">
                    </v-select>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col class="text-right">
                    <b-button variant="danger" v-if="TrainingSchedule.trainingScheduleSportGroup.length > 0" @click="Clear"
                        class="mr-2">
                        <b-spinner v-if="clearLoading" small></b-spinner> {{ $t("clear") }}
                    </b-button>
                    <b-button variant="primary" @click="FillData">
                        <b-spinner v-if="FillLoading" small></b-spinner> {{
                            TrainingSchedule.trainingScheduleSportGroup.length > 0 ? $t('Refresh') : $t("Fill") }}
                    </b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-input @keyup.prevent.enter="Refresh" :placeholder="$t('Coach')"
                        v-model="filter.Search"></b-form-input>
                </b-col>
                <b-col>
                    <v-select :options="SportTypeClassifierList" :reduce="(item) => item.id" :placeholder="$t('Sport turi')"
                        v-model="filter.sporttypeclassifierid" label="name"></v-select>
                </b-col>
                <b-col>
                    <v-select :options="sportlevellist" @input="Refresh" v-model="filter.sportlevelid"
                        :reduce="(item) => item.id" :placeholder="$t('SportLevel')" label="name">
                    </v-select>
                </b-col>

                <b-col> </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <b-table-simple bordered responsive>
                        <b-thead>
                            <b-tr>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">№</b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("Coach") }}
                                </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("sporttypeclassifiername") }}
                                </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("sportgroupname") }}
                                </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("allowedacademichours") }}
                                </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("studentcount") }}
                                </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("orgbuildinginfo") }}
                                </b-th>
                                <b-th colspan="6" class="text-center" style="vertical-align: middle">
                                    {{ $t("weekday") }}
                                </b-th>

                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("loadedacademichours") }}
                                </b-th>
                                <b-th rowspan="2" class="text-center" style="vertical-align: middle">
                                    {{ $t("differenacademichours") }}
                                </b-th>
                            </b-tr>
                            <b-tr>
                                <b-th class="text-center" style="vertical-align: middle">
                                    {{ $t("Mon") }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle">
                                    {{ $t("Tue") }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle">
                                    {{ $t("Wed") }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle">
                                    {{ $t("Thu") }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle">
                                    {{ $t("Fri") }}
                                </b-th>
                                <b-th class="text-center" style="vertical-align: middle">
                                    {{ $t("Sat") }}
                                </b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-if="!loading" v-for="(
                  item, index
                ) in TrainingSchedule.trainingScheduleSportGroup" :key="index" class="text-center"
                                style="vertical-align: middle">
                                <b-td style="vertical-align: middle"> {{ index + 1 }} </b-td>
                                <b-td style="vertical-align: middle">
                                    {{ item.personname }}
                                </b-td>
                                <b-td style="vertical-align: middle">
                                    {{ item.sporttypeclassifiername }}
                                </b-td>
                                <b-td style="vertical-align: middle">
                                    {{ item.sportgroupname }}
                                </b-td>
                                <b-td style="vertical-align: middle">
                                    {{ item.allowedacademichours }}
                                </b-td>
                                <b-td style="vertical-align: middle">
                                    {{ item.studentcount }}
                                </b-td>
                                <b-td style="vertical-align: middle;cursor:pointer" @dblclick="OpenOrgBuildingInfo(item)">
                                    {{
                                        item.isinorgterritory
                                        ? item.orgbuildingname
                                        : item.outsideterritoryname
                                    }}
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 1)"
                                    style="vertical-align: middle;cursor: pointer">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(
                                        (el) => el.weekdayid == 1
                                    )" :key="i">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 1)" style="cursor: pointer"
                                            variant="success" class="my-1" v-if="e.Status != 3">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>

                                            <b-icon class="ml-1" v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 2)"
                                    style="vertical-align: middle;cursor: pointer">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(
                                        (el) => el.weekdayid == 2
                                    )" v-if="e.Status != 3" :key="i">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 2)" variant="success"
                                            style="cursor: pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>

                                            <b-icon class="ml-1" v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 3)"
                                    style="vertical-align: middle;cursor: pointer">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(
                                        (el) => el.weekdayid == 3
                                    )" v-if="e.Status != 3" :key="i">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 3)" variant="success"
                                            style="cursor: pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>
                                            <b-icon class="ml-1" v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>

                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 4)"
                                    style="vertical-align: middle;cursor: pointer">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(
                                        (el) => el.weekdayid == 4
                                    )" v-if="e.Status != 3" :key="i">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 4)" variant="success"
                                            style="cursor: pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>

                                            <b-icon class="ml-1" v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 5)"
                                    style="vertical-align: middle;cursor: pointer">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(
                                        (el) => el.weekdayid == 5
                                    )" v-if="e.Status != 3" :key="i">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 5)" variant="success"
                                            style="cursor: pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>

                                            <b-icon class="ml-1" v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>
                                <b-td @dblclick.stop="OpenModal(item, 'new', 6)"
                                    style="vertical-align: middle;cursor: pointer">
                                    <div v-for="(e, i) in item.sportGroupWeekDay.filter(
                                        (el) => el.weekdayid == 6
                                    )" v-if="e.Status != 3" :key="i">
                                        <b-badge @dblclick.stop="OpenModal(item, e, 6)" variant="success"
                                            style="cursor: pointer">
                                            <span>{{ e.starttime }} - {{ e.endtime }}</span>

                                            <b-icon class="ml-1" v-c-tooltip="{ content: $t('Delete') }"
                                                @click.stop="DeleteGroupWeekday(e)" variant="danger" scale="1.6"
                                                icon="x"></b-icon>
                                        </b-badge>
                                    </div>
                                </b-td>

                                <b-td style="vertical-align: middle">
                                    {{ item.loadedacademichours }}
                                </b-td>
                                <b-td style="vertical-align: middle"
                                    :class="item.differenacademichours < 0 ? 'bg-danger' : ''">
                                    {{ item.differenacademichours }}
                                </b-td>
                            </b-tr>
                            <b-tr v-if="loading">
                                <b-td colspan="14" class="text-center">
                                    <b-spinner style="width: 2.5rem; height: 2.5rem" small></b-spinner>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-col>
            </b-row>
            <div class="pb-4">
                <div class="pagination-number" style="float: left; font-size: 12px">
                    {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
                    {{ lastNumber }} {{ $t("of") }}
                    {{ totalRows }}
                </div>
                <div class="page-limit">
                    <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                        <b-form-select v-model="filter.PageLimit" id="PageLimitSelect" size="sm"
                            :options="filter.pageOptions" @input="Refresh"></b-form-select>
                    </div>
                    <div class="per-page" style="float: left; font-size: 12px">
                        {{ $t("RecordsPerPage") }}
                    </div>
                </div>
                <div style="float: right">
                    <b-pagination v-model="filter.PageNumber" :total-rows="totalRows" :per-page="filter.PageLimit"
                        @input="Refresh" align="right" size="sm" class="my-0 mobile-pagination"></b-pagination>
                </div>
            </div>
            <b-modal no-close-on-backdrop size="lg" v-model="orgbuildinginfomodal" :title="$t('orgbuildinginfo')"
                hide-footer>
                <b-row>
                    <b-col sm="4" class="d-flex align-items-center">
                        <!-- <b-form-radio v-model="tabrowOrgInfo.isinorgterritory"  name="some-radios" value="A">  </b-form-radio> -->
                        <b-button @click="ChangeOrgtype(true)" :variant="tabrowOrgInfo.isinorgterritory == true ? 'success' : 'outline-success'
                            " size="sm" pill class="mr-2">
                            <b-icon icon="check"></b-icon>
                        </b-button>
                        <span>{{ $t("insideOrganization") }}</span>
                    </b-col>
                    <b-col sm="8">
                        <v-select :options="OrganizationBuildingList" :disabled="tabrowOrgInfo.isinorgterritory !== true"
                            v-model="tabrowOrgInfo.orgbuildingid" :reduce="(item) => item.id" :placeholder="$t('oblast')"
                            label="orgbuildinginfoname" class="mr-2" style="width: 100%"
                            @input="ChangeOrgBuildingInfo"></v-select>
                    </b-col>
                </b-row>
                <b-row class="mt-2 d-flex align-items-center">
                    <b-col sm="4">
                        <b-button @click="ChangeOrgtype(false)" :variant="tabrowOrgInfo.isinorgterritory == false ? 'success' : 'outline-success'
                            " size="sm" pill class="mr-2">
                            <b-icon icon="check"></b-icon>
                        </b-button>
                        <span>{{ $t("outsideOrganization") }}</span>
                    </b-col>
                    <b-col sm="8">
                        <b-form-input id="input-sm" :disabled="tabrowOrgInfo.isinorgterritory !== false"
                            v-model="tabrowOrgInfo.outsideterritoryname"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col class="text-right">
                        <b-button variant="danger" @click="closeOrgbuildingModal" class="mr-3">
                            {{ $t("back") }}
                        </b-button>
                        <b-button variant="success" @click="SaveOrgbuildingInfo">
                            {{ $t("save") }}
                        </b-button>
                    </b-col>
                </b-row>
            </b-modal>
            <b-modal no-close-on-backdrop v-model="weekdaymodal" :title="$t('TrainingScheduleInfo')" hide-footer>
                <b-row>
                    <b-col>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-6 col-form-label">
                                {{ $t("AcademicHours") }}
                            </label>
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
                            <label for="staticEmail" class="col-sm-6 col-form-label">
                                {{ $t("Starttime") }}
                            </label>
                            <div class="col-sm-6">
                                <date-picker @input="calculateEndTime" value-type="format" v-model="tabrow.starttime"
                                    format="HH:mm" :show-second="false" type="time"
                                    :placeholder="$t('Starttime')"></date-picker>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-6 col-form-label">
                                {{ $t("Endtime") }}
                            </label>
                            <div class="col-sm-6">
                                <date-picker value-type="format" :editable="false" disabled v-model="tabrow.endtime"
                                    format="HH:mm" :show-second="false" type="time"
                                    :placeholder="$t('Endtime')"></date-picker>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col class="text-right">
                        <b-button variant="danger" @click="closeModal" class="mr-3">
                            {{ $t("back") }}
                        </b-button>
                        <b-button variant="success" @click="SaveWeekDay">
                            {{ $t("save") }}
                        </b-button>
                    </b-col>
                </b-row>
            </b-modal>
        </b-card>
        <b-row>
            <b-col class="text-left">
                <b-button variant="danger" @click="$router.back()">
                    {{ $t("back") }}
                </b-button>
            </b-col>
            <b-col class="text-right">
                <b-button v-if="TrainingSchedule.CanSave" variant="success" @click="Save">
                    <b-spinner v-if="SaveLoading" small></b-spinner> {{ $t("save") }}
                </b-button>
            </b-col>
        </b-row>
    </b-overlay>
</template>
<script>
import TrainingScheduleService from "../../../services/trainingschedule.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import SchoolYearService from "@/services/SchoolYear.service";
import { BFormRadio } from "bootstrap-vue";
import OrganizationBuildingInfoService from "@/services/OrganizationBuildingInfo.service";
import SportLevelService from '@/services/SportLevel.service'
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
export default {
    components: { CustomDatePicker, BFormRadio },
    data() {
        return {
            show: false,
            TrainingSchedule: {},
            schoolyearlist: [],
            FillLoading: false,
            WeekDayItem: {},
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

                Status: 1,
            },
            tabrowOrgInfo: {},
            OrganizationBuildingList: [],
            weekdayid: 0,
            SaveLoading: false,
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
            totalRows: 0,
            loading: false,
            sportlevellist: [],
            SportTypeClassifierList: [],
            orgbuildinginfomodal: false,
            clearLoading: false
        };
    },
    async created() {
        this.show = true;
        await TrainingScheduleService.Get(this.$route.params.id, this.$route.query.IsClone)
            .then((res) => {
                this.TrainingSchedule = res.data;
                this.getSportType(res.data.id)
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
            this.Refresh();
        });
        SportLevelService.GetAll('', 0, '').then((res) => {
            this.sportlevellist = res.data;
        });
        OrganizationBuildingInfoService.GetAll(
            this.TrainingSchedule.organizationid
        ).then((res) => {
            this.OrganizationBuildingList = res.data;
        });
    },
    computed: {
        firstNumber() {
            return this.totalRows > 0
                ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
                : 0;
        },
        lastNumber() {
            if (this.totalRows < this.filter.PageLimit) {
                return this.totalRows;
            } else {
                if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
                    return this.totalRows;
                } else {
                    return this.filter.PageNumber * this.filter.PageLimit;
                }
            }
        },
    },
    methods: {
        OpenOrgBuildingInfo(item) {
            this.orgbuildinginfomodal = true
            TrainingScheduleService.GetTrainingScheduleSportGroup(item.id).then(res => {
                this.tabrowOrgInfo = res.data
            })
            // this.tabrowOrgInfo.isinorgterritory = item.isinorgterritory
            // this.tabrowOrgInfo.orgbuildingid = item.orgbuildingid
            // this.tabrowOrgInfo.orgbuildingname = item.orgbuildingname
            // this.tabrowOrgInfo.outsideterritoryname = item.outsideterritoryname
        },
        closeOrgbuildingModal() {
            this.orgbuildinginfomodal = false
        },
        SaveOrgbuildingInfo() {
            var self = this
            if (self.tabrowOrgInfo.isinorgterritory && !self.tabrowOrgInfo.orgbuildingid) {
                this.$makeToast(
                    this.$t("territoryNotCorrect"),
                    this.$t("error"),
                    "danger"
                );
                return false;
            }
            if (
                self.tabrowOrgInfo.isinorgterritory === false &&
                !self.tabrowOrgInfo.outsideterritoryname
            ) {
                this.$makeToast(
                    this.$t("territoryNotCorrect"),
                    this.$t("error"),
                    "danger"
                );
                return false;
            }
            TrainingScheduleService.UpdateTrainingScheduleSportGroup(self.tabrowOrgInfo).then(res => {
                self.orgbuildinginfomodal = false
                self.Refresh()
            })
        },
        calculateEndTime() {
            if (this.tabrow.starttime) {
                TrainingScheduleService.GetEndTime(
                    this.tabrow.starttime,
                    this.tabrow.academichours
                ).then((res) => {
                    this.tabrow.endtime = res.data;
                });
            }
        },
        getSportType(el) {
            SportTypeClassifierService.GetAllByTrainingSchedule(el).then(
                (res) => {
                    this.SportTypeClassifierList = res.data;
                }
            );
        },
        DeleteGroupWeekday(e) {
            this.$confirm(this.$t("WantDelete"), this.$t("Delete"), {
                confirmButtonText: this.$t("yes"),
                cancelButtonText: this.$t("no"),
                type: "warning",
            })
                .then(() => {
                    TrainingScheduleService.DeleteSportGroupWeekDay(e.id).then((res) => {
                        this.Refresh();
                        this.calculateAcademicHours();
                        this.$message({
                            type: "success",
                            message: this.$t("DeleteSuccess"),
                        });
                    });
                })
                .catch(() => { });
        },
        ChangeOrgtype(bool) {
            this.tabrowOrgInfo.isinorgterritory = bool;
            this.tabrowOrgInfo.orgbuildingid = 0;
            this.tabrowOrgInfo.orgbuildingname = "";
            this.tabrowOrgInfo.outsideterritoryname = "";
        },
        BindValue1(value) {
            this.TrainingSchedule.docdate = value;
        },
        SaveWeekDay() {
            var self = this;
            this.tabrow.ownerid = this.WeekDayItem.id;
            if (!self.tabrow.academichours) {
                this.$makeToast(
                    this.$t("academichoursNotCorrect"),
                    this.$t("error"),
                    "danger"
                );
                return false;
            }
            if (!self.tabrow.starttime) {
                this.$makeToast(
                    this.$t("starttimeNotCorrect"),
                    this.$t("error"),
                    "danger"
                );
                return false;
            }
            if (!self.tabrow.endtime) {
                this.$makeToast(
                    this.$t("endtimeNotCorrect1"),
                    this.$t("error"),
                    "danger"
                );
                return false;
            }


            if (self.editedIndex1 > -1) {
                self.tabrow.Status = 2;
                self.TrainingSchedule.trainingScheduleSportGroup[
                    self.editedIndex
                ].Status = 2;
                TrainingScheduleService.UpdateSportGroupWeekDay(this.tabrow).then(
                    (res) => {
                        // Object.assign(
                        //     self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].sportGroupWeekDay[self.editedIndex1],
                        //     self.tabrow
                        // )
                        self.Refresh();
                    }
                );
            } else {
                TrainingScheduleService.UpdateSportGroupWeekDay(this.tabrow).then(
                    (res) => {
                        // self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].Status = 2
                        // self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex].sportGroupWeekDay.push(self.tabrow)
                        self.Refresh();
                    }
                );
            }
            self.calculateAcademicHours();
            // console.log(self.TrainingSchedule.trainingScheduleSportGroup)
            self.closeModal();
        },
        calculateAcademicHours() {
            var self = this;
            self.TrainingSchedule.trainingScheduleSportGroup[
                self.editedIndex
            ].loadedacademichours = 0;
            self.TrainingSchedule.trainingScheduleSportGroup[
                self.editedIndex
            ].sportGroupWeekDay.forEach(function (item) {
                if (item.Status != 3) {
                    self.TrainingSchedule.trainingScheduleSportGroup[
                        self.editedIndex
                    ].loadedacademichours += item.academichours * 1;
                }
            });
            self.TrainingSchedule.trainingScheduleSportGroup[
                self.editedIndex
            ].differenacademichours =
                1 *
                self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex]
                    .allowedacademichours -
                1 *
                self.TrainingSchedule.trainingScheduleSportGroup[self.editedIndex]
                    .loadedacademichours;
        },
        closeModal() {
            this.weekdaymodal = false;
        },
        ChangeOrgBuildingInfo() {
            if (this.tabrow.orgbuildingid) {
                this.tabrow.orgbuildingname = this.OrganizationBuildingList.filter(
                    (item) => item.id == this.tabrow.orgbuildingid
                )[0].orgbuildinginfoname;
            }
        },
        OpenModal(item, subItem, dayid) {
            this.weekdaymodal = true;
            this.editedIndex =
                this.TrainingSchedule.trainingScheduleSportGroup.indexOf(item);
            this.WeekDayItem = Object.assign({}, item);
            if (subItem == "new") {
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
                    Status: 1,
                };
            } else {
                this.tabrow = Object.assign({}, subItem);
                this.editedIndex1 =
                    this.TrainingSchedule.trainingScheduleSportGroup[
                        this.editedIndex
                    ].sportGroupWeekDay.indexOf(subItem);
                // this.editedIndex = this.TrainingSchedule.trainingScheduleSportGroup.indexOf(item)
                // this.WeekDayItem = Object.assign({}, item)
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
        async FillData() {
            var self = this;

            if (!self.TrainingSchedule.schoolyearid) {
                this.$makeToast(
                    this.$t("schoolyearNotSelected"),
                    this.$t("error"),
                    "danger"
                );
                return false;
            }
            self.FillLoading = true;
            await TrainingScheduleService.Fill(self.TrainingSchedule)
                .then((res) => {
                    self.filter.trainingScheduleid = res.data.id;
                    self.getSportType(self.filter.trainingScheduleid)
                    self.FillLoading = false;
                    self.Refresh();
                    this.$makeToast(
                        this.$t("schoolyearSelected"),
                        this.$t("success"),
                        "success"
                    );
                })
                .catch((error) => {
                    self.$makeToast(
                        error.response.data.error,
                        self.$t("error"),
                        "danger"
                    );
                    self.FillLoading = false;
                });
        },
        Save() {
            this.SaveLoading = true;
            TrainingScheduleService.Update(this.TrainingSchedule)
                .then((res) => {
                    this.SaveLoading = false;
                    var vm = this;
                    vm.$router.push({
                        name: "TrainingSchedule",
                    });
                })
                .catch((error) => {
                    this.SaveLoading = false;
                });
        },
        Clear() {
            // this.TrainingSchedule.schoolyearid = ""
            this.clearLoading = true
            TrainingScheduleService.Clear(this.TrainingSchedule.id).then(res => {
                this.TrainingSchedule.trainingScheduleSportGroup = []
                this.clearLoading = false
                this.filter.Search = "",
                    this.filter.sporttypeclassifierid = "",
                    this.filter.sportlevelid = "",
                    this.$makeToast(
                        this.$t("SuccessClearMessage"),
                        this.$t("message"),
                        "success"
                    );
            })


        }
    },
};
</script>
<style></style>