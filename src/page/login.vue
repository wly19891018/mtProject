<template>
    <div class="page-login">
        <div class="login-header">
            <a class="logo" href="http://www.meituan.com" alt="美团网" title="美团网"></a>
        </div>
        <div class="login-panel">
            <div class="banner">
                <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
            </div>
            <div class="form">
                <h4 class="tips" v-if="error">
                    <i>{{error}}</i>
                </h4>
                <p>
                    <span>账号登陆</span>
                </p>
                <el-input :class="{error: error && !userName}" type="text" prefix-icon="profile" v-model="userName" placeholder="手机号/用户名/邮箱"></el-input>
                <el-input :class="{error: error && !password}" type="password" prefix-icon="password" v-model="password" placeholder="密码"></el-input>
                <p class="foot">
                    <a href="#">忘记密码？</a>
                </p>
                <el-button @click="submit" class="btn-login">登陆</el-button>
                <p class="reg">
                    还没有账号？
                    <router-link :to="{name: 'register'}">免费注册</router-link>
                </p>
                <div class="oauth-wrapper">
                    <div class="title-wrapper">
                        <h3 class="title">用合作网站账号登录</h3>
                    </div>
                    <div class="oauth">
                        <div class="oauth__link"></div>
                        <div class="oauth__link--weibo"></div>
                    </div>
                </div>

            </div>
        </div>
        <footer>
            <ul>
                <li><a href="#">关于美团</a></li>
                <li><a href="#">加入我们</a></li>
                <li><a href="#">商家入驻</a></li>
                <li><a href="#">帮助中心</a></li>
                <li><a href="#">美团手机版</a></li>
            </ul>
            <p>
                ©2019 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号
            </p>
        </footer>
    </div>
</template>

<script>
/* eslint-disable */
import api from "@/api/index.js";
export default {
    data() {
        return {
            userName: '',
            password: '',
            error: ''
        }
    },
    methods: {
        submit(){
            if (this.userName == '') {
                this.error = "请输入用户名"
            } else if (this.password == '') {
                this.error = "请输入密码"
            }
            api.login({
                params: {
                    userName: this.userName,
                    password: this.password
                }
            }).then(res => {
                if (res.data.status == "success") {
                    this.$store.commit('setUserName', res.data.data)
                    this.$router.push({name: 'index'});
                }else {
                    this.error = res.data.msg;
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/login/index.scss";
</style>