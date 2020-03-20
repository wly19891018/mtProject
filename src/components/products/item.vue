<template>
    <div>
        <dl class="s-item">
            <dt>
                <router-link :to="{name: 'detail', params: {parents: $route.params.name}}">
                    <img :src="product.image" :alt="product.title" :title="product.title">
                </router-link>
            </dt>
            <dd>
                <router-link :to="{name: 'detail', params: {parents: $route.params.name}}">
                    <h3>{{product.title}}</h3>
                </router-link>
                <p>
                    <el-rate
                        v-model="product.score"
                        disabled
                        text-color="#ff9900"
                        score-template="{score}">
                    </el-rate>
                    <span v-if="product.score>4.5">很好</span>
                    <span v-else-if="product.score>4">好</span>
                    <span v-else-if="product.score>3.5">不错</span>
                    <span v-else-if="product.score>3">一般</span>
                    <span v-else>很差</span>
                    <span>{{product.score}}分</span>
                    <span class="s-item-comment-total">{{product.commentNum}}人评论</span>
                </p>
                <p>
                    <span class="s-item-tab">
                        <span v-for="(item, index) in product.tab" :key="index+'_tab'">
                             {{item + (index == product.tab.length -1 ? "" : "|")}}
                        </span>
                    </span>
                    <span class="s-item-addr">{{product.address}}</span>
                    <span>
                        <a href="#">
                            <i class="el-icon-location"></i>查看地图
                        </a>
                    </span>
                </p>
                <p>
                    <span>
                        人均￥{{product.avgPrice}}
                    </span>
                </p>
                <ul class="deal-items">
                    <li class="items" v-for="(item, index) in product.dealItems.slice(0,2)" :key="index+'_dealItem'">
                        <p class="deal-title">
                            {{item.title}}
                        </p>
                        <p>
                            <span class="deal-price">￥{{item.price}}</span>
                            <span class="deal-old-price">门市价￥{{item.counterPrice}}</span>
                            <span class="deal-sales">已售{{item.saleNum}}</span>
                        </p>
                    </li>
                </ul>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
  props: [ 'product' ],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
    @import "@/assets/css/products/index.scss";
</style>
