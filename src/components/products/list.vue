<template>
  <div class="m-products-list">
    <ul>
      <li
        :class="{'s-nav-active': item.name == activeTitle}"
        v-for="(item, index) in liList"
        :key="index+'_productTitle'"
        @click="titleChange(item.name)"
      >{{item.name}}</li>
    </ul>
    <el-row v-for="(item, index) in productList" :key="index+'_productItem'">
      <m-item :product="item" />
    </el-row>
  </div>
</template>

<script>
import MItem from './item.vue'
import api from '@/api/index.js'
export default {
  data () {
    return {
      liList: [
        { key: 's-default', name: '智能排序' },
        { key: 's-price', name: '价格排序' },
        { key: 's-score', name: '人气最高' },
        { key: 's-comment', name: '评价最高' }
      ],
      activeTitle: '智能排序',
      productList: []
    }
  },
  methods: {
    titleChange (item) {
      this.activeTitle = item
    }
  },
  components: {
    MItem
  },
  created () {
    api
      .getProductsList()
      .then(res => {
        this.productList = res.data.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
