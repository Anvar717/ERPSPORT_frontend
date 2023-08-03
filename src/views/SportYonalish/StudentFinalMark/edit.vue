<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import StudentFinalMarkService from '@/services/StudentFinalMark.service'


export default {
    data() {
        return {
            loading: false,
            current_id: '',
            saving_form: false,
            getting_info: false,
            current_action: '', // 'approve'|'delete'|'edit',
            table_data: [],
            current_year: new Date().getFullYear(),
            original_data: null,
            // current_for_item_key: Math.random() * 1200,
            breakPoints: {
                xl: { span: 3, offset: 0 },
                lg: { span: 3, offset: 0 },
                md: { span: 8, offset: 0 },
                sm: { span: 12, offset: 0 },
                xs: { span: 24, offset: 0 },
            }
            // row_spans: [],
        }
    },
    computed: {
        total_mark() {
            return this.original_data.studentFinalMarkTableForFront.reduce((mark, mrk) => {
                let mark_sum = 0;
                for (let i = 6; i <= 11; i++) {
                    mark_sum += mrk['schoolgradeidmark' + i]
                }
                return mark + mark_sum
            }, 0)
        },
        group_row_spans() {
            let counter = 1 // how many skip
            const rows = [] // contains skip for each row
            this.table_data.forEach((element, index, arr) => {
                if (counter > 1) {
                    counter--
                    rows.push(0)
                }
                else {
                    let delta = arr.findLastIndex(td => td.schoolsubjectgroupid === element.schoolsubjectgroupid) - arr.findIndex(td => td.schoolsubjectgroupid === element.schoolsubjectgroupid)
                    // console.log()
                    delta = delta === 0 ? 1 : delta + 1
                    if (delta > 1) {
                        counter = delta
                        rows.push(delta)
                    } else
                        rows.push(1)
                }
            })
            return rows
        }
    },
    methods: {
        ...mapActions('StudentFinalMark', ['getSubjectsList']),
        calculateMarks(index) {
            this.original_data.totalmark = this.original_data.studentFinalMarkTableForFront.reduce((mark, mrk) => {
                let mark_sum = 0;
                for (let i = 6; i <= 11; i++) {
                    mark_sum += mrk['schoolgradeidmark' + i]
                }
                return mark + mark_sum
            }, 0)

            this.original_data.averagemark = this.original_data.totalmark / this.original_data.schoolsubjectcount
            console.log("this.$route.params.id", this.$route.params.id)
            if (this.$route.params.id !== 0) {
                this.original_data.studentFinalMarkTableForFront[index].Status = 2
            }
        },
        goBack() {
            this.$router.push({
                name: 'StudentFinalMark'
            })
        },
        objectSpanMethod({ row: { rowspan, colspan }, columnIndex, rowIndex }) {
            if (columnIndex === 1) {
                return {
                    rowspan: this.group_row_spans[rowIndex],
                    colspan: this.group_row_spans[rowIndex] > 0 ? 1 : 0
                }
            }
        },
        saveForm(formName) {
            this.current_for_item_key = Math.random() * 12786
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        this.saving_form = true
                        await StudentFinalMarkService.Update(this.original_data)
                        this.saving_form = false
                        this.$notify({
                            title: this.$t('actionss.success'),
                            message: this.$t('actionss.success'),
                            type: 'success'
                        })
                        this.$router.push({
                            name: 'StudentFinalMark'
                        })
                    } catch (error) {
                        console.error(error)
                        this.$notify({
                            title: this.$t('Error'),
                            message: error.response.data.error,
                            type: 'error'
                        })
                        this.saving_form = false
                    }
                } else {
                    return false;
                }
            });
        },
        cellClass() {
            return 'border-cell'
        }

    },
    async mounted() {
        this.getting_info = true
        const { data } = await StudentFinalMarkService.Get(this.$route.params.id)
        this.getting_info = false
        this.original_data = data
        console.log(this.original_data.personid)
        this.original_data.personid = this.$route.query.personid
        this.table_data = data.studentFinalMarkTableForFront
    }
}
</script>
<template>
    <el-col :span="24">
        <el-card :body-style="{ padding: '1em', border: '1px solid transparent' }" shadow="never">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form style="width: 100%" ref="finalMarkRef" :model="original_data">
                        <el-form-item>
                           <el-row :gutter="10">
                            <el-col v-bind="breakPoints">
                                <span>{{ $t('docnumber') }}: <strong>{{ original_data.docnumber }}</strong></span>
                            </el-col>
                            <el-col v-bind="breakPoints">
                                <span>{{ $t('docdate') }}: <strong>
                                        {{ original_data.docdate }}
                                    </strong></span>
                            </el-col>
                            <el-col >
                              <span>{{ $t('StudentFIO') }}:  <strong>{{ this.$route.query.personname }}</strong></span>
                            </el-col>
                           </el-row>
                        </el-form-item>
                        <el-form-item>
                          <el-row :gutter="10">
                            <el-col v-bind="breakPoints">
                                <span>{{ $t('totalmark') }}: <strong>{{ total_mark }}</strong></span>
                            </el-col>
                            <el-col v-bind="breakPoints">
                                <span>{{ $t('schoolsubjectcount') }}: <strong>{{ original_data.schoolsubjectcount }}</strong></span>
                            </el-col>
                            <el-col v-bind="breakPoints">
                                    <span>{{ $t('averagemark') }}: </span><strong>{{ (total_mark / original_data.schoolsubjectcount).toFixed(2) }}</strong>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-table :cell-class-name="cellClass" :show-summary="true" v-loading="getting_info"
                            row-class-name="no-hover" :highlight-current-row="false" size="mini"
                            :span-method="objectSpanMethod" :data="original_data.studentFinalMarkTableForFront"
                            :max-height="700" border style="width: 100%">
                            <el-table-column type="index" :width="85" align="center">
                            </el-table-column>
                            <el-table-column label="" :width="120" align="center" prop="schoolsubjectgroupname">
                            </el-table-column>
                            <el-table-column v-for="(n, i) in [6, 7, 8, 9, 10, 11]" :key="i" :min-width="150"
                                align="center">
                                <template slot="header">
                                    <span>{{ `${6 + i}-${$t('SchoolGrade')}` }}</span> <br> <span>{{ `(${current_year - 6 +
                                        i}/${current_year - 5 + i} o'quv yili)`
                                    }}</span>
                                </template>
                                <el-table-column align="center" :min-width="110" :label="$t('subject_')"
                                    prop="schoolsubjectname" />
                                <el-table-column align="center" :label="$t('Hours')" :prop="'schoolgradeidhours' + n" />
                                <el-table-column align="center" :label="$t('mark')" :prop="'schoolgradeidmark' + n" :width="130">
                                    <template slot-scope="scope">
                                        <div style="height: 18px; width: 18px"></div>
                                        <el-form-item
                                            :rules="scope.row['schoolgradeidhours' + n] > 0 ? [{ required: true, message: $t('mark_is_required'), trigger: 'change', min: 3, max: 5, type: 'number' }] : []"
                                            :key="'schoolgradeidhours' + n"
                                            :prop="`studentFinalMarkTableForFront.${scope.$index}.schoolgradeidmark${n}`">
                                            <el-input-number :min="scope.row['schoolgradeidhours' + n] > 0 ? 0 : 0" :max="5" :disabled="scope.row['schoolgradeidhours' + n] === 0"
                                                style="width: 80px" v-model="scope.row['schoolgradeidmark' + n]"
                                                controls-position="right" size="mini"
                                                :maxlength="1"
                                                @change="calculateMarks(scope.$index)"></el-input-number>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-col>
                <el-col :span="24" style="display: flex; justify-content: space-between; padding: 1em 0">
                    <el-button @click="goBack" icon="el-icon-back" size="small" type="danger">{{ $t('back') }}</el-button>
                    <el-button icon="el-icon-check" size="small" type="success" :disabled="saving_form"
                        :loading="saving_form" @click="saveForm('finalMarkRef')">{{ $t('save') }}</el-button>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>

<style lang="scss">
.no-hover:hover>td {
    background-color: initial !important;
}

.border-cell {
    // border: 1px solid red !important;
    // border-collapse: collapse !important;
}
</style>