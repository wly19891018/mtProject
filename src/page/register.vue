<template>
    <div class="page-register">
        <div class="header">
            <header>
                <div class="site-logo"></div>
                <div class="login">
                    已有美团账号？
                    <router-link :to="{name: 'login'}">登陆</router-link>
                </div>
            </header>
        </div>
        <div class="form content">
            <el-form
                :model="registerForm"
                status-icon
                :rules="rules"
                ref="registerForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="registerForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input @input="passwordInput" type="password" v-model="registerForm.password" autocomplete="off"></el-input>
                    <div class="pw-strength">
                        <div :class="['bar', strength]"></div>
                        <div class="letter">
                            <span>弱</span>
                            <span>中</span>
                            <span>强</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                    <el-input type="password" v-model="registerForm.rePassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import api from '@/api/index.js';
export default {
    data() {
        var validateUser = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else if(value.length <=16 && value.length >=4 && value.match(/^[0-9a-zA-Z_]{1,}$/)) {
                callback();
            } else {
                callback(new Error("用户名必须为4-16位的字母数字下划线组成"));
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if(value.length <=16 && value.length >=6 && value.match(/^[0-9a-zA-Z_]{1,}$/)) {
                if (this.registerForm.rePassword !== "") {
                    this.$refs.registerForm.validateField("rePassword");
                }
                callback();
            } else {
                callback(new Error("密码必须为6-16位的字母数字下划线组成"));
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.registerForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else if(value.length <=16 && value.length >=6 && value.match(/^[0-9a-zA-Z_]{1,}$/)) {
                callback();
            }else {
                callback(new Error("密码必须为6-16位的字母数字下划线组成"));
            }
        };
        return {
            registerForm: {
                userName: "",
                password: "",
                rePassword: ""
            },
            strength: "",
            rules: {
                userName: [
                    { validator: validateUser, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                rePassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.register({
                        params: this[formName]
                    }).then(res => {
                        if (res.data.status == "success") {
                            this.$router.push({name: 'login'});
                        } else {
                            alert(res.data.msg);
                        }
                    }).catch(error => {

                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        passwordInput() {
            let regStr = /(\w)+/g;
            let regNum = /(\d)+/g;
            let reg = /_/g;
            const classArray = ['week', 'normal', 'strong'];
            var passwordStrength = this.registerForm.password.match(regStr) && this.registerForm.password.match(regNum) && this.registerForm.password.match(reg);
            if (this.registerForm.password.length > 10 && passwordStrength) {
                this.strength = 'strong'
            } else if ( this.registerForm.password.length < 10 && !passwordStrength){
                this.strength = 'week';
            } else if ( !this.registerForm.password) {
                this.strength = '';
            } else {
                this.strength = 'normal';
            }
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>