<script>
import ToolBar from './components/Toolbar.vue'
import PageBody from './components/PageBody.vue'
import Pagination from './components/Pagination.vue'
export default {
  components: {
    'ToolBar': ToolBar,
    'PageBody': PageBody,
    'Pagination': Pagination,
  },
  data() {
    return {
    }
  }
}
</script>

<template>
  <el-card :body-style="{ padding: '1em' }" shadow="never">
    <el-row>
      <el-col :span="24" style="text-align: center;">
        <h3>{{ $t('finalmarkpage') }}</h3>
      </el-col>
      <ToolBar /> 
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
      <PageBody />
      <!-- <Pagination /> -->
    </el-row>
  </el-card>
</template>

<style lang="scss"></style>