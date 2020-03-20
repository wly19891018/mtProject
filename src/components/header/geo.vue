<template>
    <div class="m-geo">
        <div class="position">
            <i class="el-icon-location" />
            {{$store.state.position}}
            <router-link class="changeCity" :to="{name: 'changeCity'}">切换城市</router-link>
            [
                <a href="#" v-for="(item, index) in nearCity" :key="index+'_city'"> {{item.name}} </a>
            ]
        </div>
        <div class="m-user" v-if="!$store.state.userName">
            <router-link class="login" :to="{name: 'login'}">立即登录</router-link>
            <router-link class="register" :to="{name: 'register'}">注册</router-link>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import api from '@/api/index.js';
export default {
    data() {
        return {
            nearCity: [],
        }
    },
    created() {
        api.getCurPosition().then(res => {
            this.nearCity = res.data.data.nearCity;
        }).catch(error => {
            console.log(error)
        })
    }
}
</script>


