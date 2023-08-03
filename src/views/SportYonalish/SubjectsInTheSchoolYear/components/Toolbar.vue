<script>
import {mapActions, mapMutations} from 'vuex'
export default {
    data() {
        return {
            radio1: 'Hammmasi'
        }
    },
    created() {
        this.getSubjectsList()
    },  
    methods: {
        ...mapActions('subjectsTheYearOfSchool', [
            'getSubjectsList'
        ]),
        ...mapMutations('subjectsTheYearOfSchool', [
        ]),
        Create() {
            this.$router.push({
                name: 'SubjectsInTheSchoolYearEdit', 
                params: { id: 0}
            })
        }
    }
}

</script>

<template>
    <el-col :span="24" style="display: flex; justify-content: flex-end; align-items: center">
        <!-- filters-column -->
        <!-- <el-radio-group  size="mini" v-model="radio1">
          <el-radio-button label="Hammmasi"></el-radio-button>
          <el-radio-button label="Bsdnkjsndfksjd"></el-radio-button>
          <el-radio-button label="Boasdfbnhosdn"></el-radio-button>
        </el-radio-group> -->
        <el-button size="mini" v-if="$can('SubjectsInTheSchoolYearEdit', 'permissions')" icon="el-icon-plus" @click="Create">{{ $t("create") }}</el-button>
      </el-col>
</template>


<style lang="scss"> 

label.el-radio-button.el-radio-button--mini {
    margin-bottom: 0 !important;
}
</style>