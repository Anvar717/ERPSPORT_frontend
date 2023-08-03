<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SubjectsInTheSchoolYearService from '@/services/SubjectsInTheSchoolYear.service'

export default {
    data() {
        return {
            loading: false,
            current_id: '',
            current_action: '' // 'CancelApproval'|'Approve'|'Delete'|'edit'
        }
    },
    computed: {
        ...mapState('subjectsTheYearOfSchool', ['subjects_of_year_list', 'getting_subjects_list'])
    },
    methods: {
        ...mapActions('subjectsTheYearOfSchool', ['getSubjectsList']),
        async actionOnRow(id, action) {
            this.$confirm(
                this.messageTemplate(id, '', 'Want'+action)
                , this.$t(action), {
                distinguishCancelAndClose: true,
                dangerouslyUseHTMLString: true,
                cancelButtonClass: 'cancelButtonCustomClass',
                confirmButtonClass: 'confirmButtonCustomClass'
            }).then(async () => {
                try {
                    this.current_action = action
                    this.current_id = id
                    this.loading = true
                    switch (action) {
                        case 'Delete':
                            await SubjectsInTheSchoolYearService.Delete(id)
                            break;
                        case 'Approve':
                            await SubjectsInTheSchoolYearService.Approve(id)
                            break;
                        case 'CancelApproval':
                            await SubjectsInTheSchoolYearService.CancelApproval(id)
                            break;
                        default:
                            break;
                    }
                    this.getSubjectsList()
                    this.loading = false
                    this.current_id = ''
                    this.current_action = ''
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        message: error.response.data.error,
                        type: 'error'
                    })
                    this.loading = false
                }
            })
        },
        async editRow(id) {
            this.$router.push({
                name: 'SubjectsInTheSchoolYearEdit',
                params: { id: id }
            })
        },
        showDetails({ id }) {
            this.$router.push({
                name: 'SubjectsInTheSchoolYearEdit',
                params: { id: id }
            })
        },
        messageTemplate(id, name, action) {
            return `   
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>ID:</strong></td>
                                <td style="padding-left: 10px"> ${id} </td>
                            </tr>
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td style="padding-left: 10px"> ${name} </td>
                            </tr>
                        </tbody>
                    </table>
                    <strong>${this.$t(action)}</strong>
                `
        }
    }
}
</script>

<template>
    <el-col :span="24">
        <el-table v-loader="getting_subjects_list" size="mini" :data="subjects_of_year_list" :max-height="700" border
            style="width: 100%" @row-dblclick="showDetails">
            <el-table-column :label="$t('id')" prop="id" :width="85" align="center">
            </el-table-column>
            <el-table-column :label="$t('docnumber')" :min-width="150" prop="docnumber" align="center">
            </el-table-column>
            <el-table-column :label="$t('docdate')" :min-width="150" prop="docdate" align="center">
            </el-table-column>
            <el-table-column :label="$t('schoolyearname')" :min-width="150" prop="schoolyearname" align="center">
            </el-table-column>
            <el-table-column :label="$t('schoolgradename')" :min-width="150" prop="schoolgradename" align="center">
            </el-table-column>
            <el-table-column :label="$t('fromyear')" :min-width="150" prop="fromyear" align="center">
            </el-table-column>
            <el-table-column :label="$t('toyear')" :min-width="150" prop="toyear" align="center">
            </el-table-column>
            <el-table-column :label="$t('subjectscount')" :min-width="150" prop="subjectscount" align="center">
            </el-table-column>
            <el-table-column :label="$t('totalhours')" :min-width="150" prop="totalhours" align="center">
            </el-table-column>
            <el-table-column :label="$t('statusname')" :min-width="150" prop="statusname" align="center">
                <template slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.statusid === 1" type="primary"> {{ scope.row.statusname }}</el-tag>
                    <el-tag size="mini" v-if="scope.row.statusid === 2" type="success"> {{ scope.row.statusname }}</el-tag>
                    <el-tag size="mini" v-if="scope.row.statusid === 3" type="danger"> {{ scope.row.statusname }}</el-tag>
                    <el-tag size="mini" v-if="scope.row.statusid === 4" type="warning"> {{ scope.row.statusname }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('actions')" :min-width="150" prop="actions" align="center">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.cancancelapproval && $can('SubjectsInTheSchoolYearCancelApproval', 'permissions')"
                        :disabled="loading && current_id === scope.row.id"
                        :loading="current_action === 'CancelApproval' && loading && current_id === scope.row.id" 
                        type="text"
                        icon="el-icon-close" style="color: red" 
                        @click="actionOnRow(scope.row.id, 'CancelApproval')"
                    ></el-button>
                    <el-button 
                        v-if="scope.row.canapprove && $can('SubjectsInTheSchoolYearApprove', 'permissions')"
                        :disabled="loading && current_id === scope.row.id"
                        :loading="current_action === 'Approve' && loading && current_id === scope.row.id" 
                        type="text"
                        icon="el-icon-check" 
                        style="color: darkcyan" 
                        @click="actionOnRow(scope.row.id, 'Approve')"
                    ></el-button>
                    <el-button 
                        v-if="scope.row.canedit && $can('SubjectsInTheSchoolYearEdit', 'permissions')"
                        :disabled="loading && current_id === scope.row.id"
                        :loading="current_action === 'edit' && loading && current_id === scope.row.id" 
                        style="color: blue"
                        type="text" 
                        icon="el-icon-edit" 
                        @click="editRow(scope.row.id)"
                    ></el-button>
                    <el-button 
                        v-if="scope.row.candelete && $can('SubjectsInTheSchoolYearDelete', 'permissions')"
                        :disabled="loading && current_id === scope.row.id"
                        :loading="current_action === 'Delete' && loading && current_id === scope.row.id" 
                        style="color: red"
                        type="text" 
                        icon="el-icon-delete" 
                        @click="actionOnRow(scope.row.id, 'Delete')"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-col>
</template>

<style lang="scss">.confirmButtonCustomClass,
.confirmButtonCustomClass:hover {
    background: #2eb85c !important;
    color: white;
    border: none !important;
}

.cancelButtonCustomClass,
.cancelButtonCustomClass:hover {
    background: #e55353 !important;
    color: white;
    border: none !important;
}</style>