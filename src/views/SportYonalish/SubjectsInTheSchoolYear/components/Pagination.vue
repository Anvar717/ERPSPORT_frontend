<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState('subjectsTheYearOfSchool', ['total_count', 'query_params']),
        ...mapActions('subjectsTheYearOfSchool', ['getSubjectsList'])
    },
    methods: {
        ...mapMutations('subjectsTheYearOfSchool', ['SET_QUERY_PARAM']),
        handleSizeChange(val) {
            this.SET_QUERY_PARAM({ name: 'PageLimit', value: val })
            this.getSubjectsList()
        },
        handleCurrentChange(val) {
            this.SET_QUERY_PARAM({ name: 'PageNumber', value: val })
            this.getSubjectsList()
        }
    }
}

</script>

<template>
    <el-col :span="24" style="padding: 1em 0">
        <el-pagination
            :small="true"
            size="mini"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="query_params.PageLimit"
            :current-page.sync="query_params.PageNumber"
            layout="total, sizes, prev, pager, next"
            :total="total_count"
            >
        </el-pagination>
    </el-col>
</template>