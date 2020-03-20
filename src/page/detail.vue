<template>
  <div class="page-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="m-crumbs">
      <el-breadcrumb-item>{{$store.state.position}}美团</el-breadcrumb-item>
      <el-breadcrumb-item>{{$store.state.position + type}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.params.parents}}</el-breadcrumb-item>
    </el-breadcrumb>
    <d-header />
  </div>
</template>

<script>
import api from '@/api/index.js'
import DHeader from '@/components/detail/header.vue'
export default {
  data () {
    return {
      typeMap: {
        food: '美食',
        movie: '电影',
        travel: '旅行',
        spa: '美容'
      },
      type: ''
    }
  },
  created () {
    api.detail().then(res => {
      this.type = this.typeMap[res.data.data.type]
    })
  },
  components: {
    DHeader
  }
}
</script>

<style lang='scss'>
@import '@/assets/css/products/index.scss';
</style>
