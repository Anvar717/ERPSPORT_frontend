<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import StudentFinalMarkService from '@/services/StudentFinalMark.service'

export default {
    data() {
        return {
            loading: false,
            current_id: '',
            current_action: '' // 'CancelApproval'|'Approve'|'Delete'|'edit'
        }
    },
    computed: {
        ...mapState('StudentFinalMark', ['students_list', 'getting_students_list'])
    },
    methods: {
        ...mapActions('StudentFinalMark', ['getStudentsList']),
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
                            await StudentFinalMarkService.Delete(id)
                            break;
                        case 'Approve':
                            await StudentFinalMarkService.Approve(id)
                            break;
                        case 'CancelApproval':
                            await StudentFinalMarkService.CancelApproval(id)
                            break;
                        default:
                            break;
                    }
                    this.getStudentsList()
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
        async editRow({ id, personname, personid }) {
            this.$router.push({
                name: 'StudentFinalMarkEdit',
                params: { id: id ? id : 0 },
                query: {personname, personid}
            })
        },
        showDetails({ id, personname, personid }) {
            this.$router.push({
                name: 'StudentFinalMarkEdit',
                params: { id: id ? id : 0 },
                query: {personname, personid}
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
        <el-table v-loading="getting_students_list" size="mini" :data="students_list" :max-height="700" border
            style="width: 100%" @row-dblclick="showDetails">
            <el-table-column :label="$t('id')" prop="id" :width="85" align="center">
            </el-table-column>
            <el-table-column :label="$t('docnumber')" :min-width="150" prop="docnumber" align="center"></el-table-column>
            <el-table-column :label="$t('oblastname')" :min-width="150" prop="oblastname" align="center"></el-table-column>
            <el-table-column :label="$t('regionname')" :min-width="150" prop="regionname" align="center"></el-table-column>
            <el-table-column :label="$t('organizationname')" :min-width="150" prop="organizationname" align="center"></el-table-column>
            <el-table-column :label="$t('StudentFIO')" :min-width="150" prop="personname" align="center">
            </el-table-column>
            <el-table-column :label="$t('docdate')" :min-width="150" prop="docdate" align="center">
            </el-table-column>
            <el-table-column :label="$t('averagemark')" :min-width="150" prop="averagemark" align="center">
            </el-table-column>
            <!-- <el-table-column :label="$t('fromyear')" :min-width="150" prop="fromyear" align="center">
            </el-table-column>
            <el-table-column :label="$t('toyear')" :min-width="150" prop="toyear" align="center">
            </el-table-column> -->
            <el-table-column :label="$t('schoolsubjectcount')" :min-width="150" prop="schoolsubjectcount" align="center">
            </el-table-column>
            <!-- <el-table-column :label="$t('totalhours')" :min-width="150" prop="totalhours" align="center">
            </el-table-column> -->
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
                        v-if="scope.row.cancancelapproval && $can('StudentFinalMarkCancelApproval', 'permissions')"
                        :disabled="loading && current_id === scope.row.id"
                        :loading="current_action === 'CancelApproval' && loading && current_id === scope.row.id" 
                        type="text"
                        icon="el-icon-close" style="color: red" 
                        @click="actionOnRow(scope.row.id, 'CancelApproval')"
                    ></el-button>
                    <el-button 
                        v-if="scope.row.canapprove && $can('StudentFinalMarkApprove', 'permissions')"
                        :disabled="loading && current_id === scope.row.id"
                        :loading="current_action === 'Approve' && loading && current_id === scope.row.id" 
                        type="text"
                        icon="el-icon-check" 
                        style="color: darkcyan" 
                        @click="actionOnRow(scope.row.id, 'Approve')"
                    ></el-button>
                    <el-button 
                        v-if="scope.row.canedit && $can('StudentFinalMarkEdit', 'permissions')"
                        :disabled="loading && current_id === scope.row.id"
                        :loading="current_action === 'edit' && loading && current_id === scope.row.id" 
                        style="color: blue"
                        type="text" 
                        icon="el-icon-edit" 
                        @click="editRow(scope.row)"
                    ></el-button>
                    <el-button 
                        v-if="scope.row.candelete && $can('StudentFinalMarkDelete', 'permissions')"
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