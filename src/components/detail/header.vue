<template>
    <div class="header-card">
        <el-row>
            <el-col class="header-left" :span="16">
                <el-row>
                    <h3 class="name">{{productInfo.title}}</h3>
                    <p>
                        <span class="star">
                            <template v-if="productInfo.score">
                                <i v-for="num in productInfo.score" :key="num+'_on'" class="el-icon-star-on on"></i>
                            </template>
                            <template v-if="5- productInfo.score">
                                <i v-for="num in 5- productInfo.score" :key="num+'_off'" class="el-icon-star-off"></i>
                            </template>
                        </span>
                        <span>
                            {{productInfo.score}}分 人均￥{{productInfo.avgPrice}}
                        </span>
                    </p>
                </el-row>
                <el-row>
                    <p class="address">地址：{{productInfo.address}}</p>
                    <p class="address">电话：{{productInfo.phone}}</p>
                    <p class="address">营业时间：{{productInfo.businessTime}}</p>
                </el-row>
                <el-row>
                    <ul class="service clear-fix">
                        <li v-for="(item, index) in productInfo.service" :key="index+'_service'">
                            <div class="img"></div>
                            <p>{{item}}</p>
                        </li>
                    </ul>
                </el-row>
            </el-col>
            <el-col class="header-right" :span="8">
                <div class="img-box">
                    <img class="big-img" :src="productInfo.imgUrl" alt="">
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
/* eslint-disable */
import api from "@/api/index.js";
export default {
    data() {
        return {
            productInfo:{}
        }
    },
    created() {
        api.detail().then(res => {
            console.log(res.data.data)
            this.productInfo = res.data.data;
        })
    }
}
</script>