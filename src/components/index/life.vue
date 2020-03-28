<template>
    <div class="m-life">
        <el-row>
            <ul class="nav">
                <li>
                    <router-link to="/" class="takeout">美团外卖</router-link>
                </li>
                <li>
                    <router-link to="/" class>猫眼电影</router-link>
                </li>
                <li>
                    <router-link to="/" class>美团酒店</router-link>
                </li>
                <li>
                    <router-link to="/" class="apartment">民宿／公寓</router-link>
                </li>
                <li>
                    <router-link to="/" class="business">商家入驻</router-link>
                </li>
                <li>
                    <router-link to="/" class>美团公益</router-link>
                </li>
            </ul>
        </el-row>
        <el-row>
            <el-col :span="14">
                <slider />
            </el-col>
            <el-col :span="4">
                <div class="m-life-pic"></div>
            </el-col>
            <el-col :span="6">
                <div class="m-life-login">
                    <h4>
                        <img v-if="$store.state.userName" src="//s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png" alt="">
                        <img v-else src="//s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg" alt />
                    </h4>
                    <p class="m-life-login-name">
                        {{$store.state.userName? $store.state.userName : 'Hi！你好'}}
                    </p>
                    <template v-if="$store.state.userName">
                        <div class="item">
                            <a href="#">
                                <div class="fn-item">
                                    <i class="iconfont el-icon-s-order"></i>
                                    <p class="fn-name">我的订单</p>
                                </div>
                            </a>
                            <a href="#">
                                <div class="fn-item">
                                    <i class="iconfont el-icon-star-on"></i>
                                    <p class="fn-name">我的收藏</p>
                                </div>
                            </a>
                            <a href="#">
                                <div class="fn-item">
                                    <i class="iconfont el-icon-s-ticket"></i>
                                    <p class="fn-name">抵用券</p>
                                </div>
                            </a>
                            <a href="#">
                                <div class="fn-item">
                                    <i class="iconfont el-icon-s-finance"></i>
                                    <p class="fn-name">余额</p>
                                </div>
                            </a>
                            <a href="#">
                                <div class="fn-item">
                                    <i class="iconfont el-icon-more"></i>
                                    <p class="fn-name">更多</p>
                                </div>
                            </a>
                        </div>
                    </template>
                    <template v-else>
                        <p>
                            <router-link :to="{name: 'register'}">
                                <el-button round>注册</el-button>
                            </router-link>
                        </p>
                        <p>
                            <router-link :to="{name: 'login'}"><el-button round>登录</el-button></router-link>
                        </p>
                    </template>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
                <div class="m-life-hotel"></div>
            </el-col>
            <el-col :span="7">
                <div class="m-life-music"></div>
            </el-col>
            <el-col :span="4">
                <div class="m-life-coop"></div>
            </el-col>
            <el-col :span="6">
                <div class="m-life-downapp">
                    <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP">
                    <p>美团APP手机版</p>
                    <p class="last-p">
                        <span>1元起</span>
                        <em>吃喝玩乐</em>
                    </p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
/* eslint-disable */
import Slider from "./slider";
export default {
    components: {
        Slider
    }
};
</script>

<style lang="scss">
    @import "@/assets/css/index/life.scss";
</style>