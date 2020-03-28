<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input v-model="searchWord" placeholder="搜索商家或地点" @focus="focusInput" @blur="blurInput" @input="input"></el-input>
                    <el-button type="primary" icon="el-icon-search"></el-button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item, index) in hotPlaceList" :key="item + '_hot'+ index">
                            <router-link  :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item, index) in searchList" :key="index+'_search'">
                            <router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <router-link v-for="(item, index) in suggestList" :key="item + '~goods' + index" :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                </p>
            </el-col>
        </el-row>
    </div>
</template>
<script>
/* eslint-disable */
import api from "@/api/index.js"
export default {
    data() {
        return {
            searchWord: '',
            isFocus: false,
            hotPlaceList: [],
            searchList: [],
            suggestList: []
        }
    },
    created() {
        api.searchHotWords().then(res => {
            this.hotPlaceList = res.data.data.slice(0,5);
            this.suggestList = res.data.data;

        }).catch(function (error) {
            console.log(error);
        })
    },
    computed: {
        isHotPlace() {
            return !this.searchWord && this.isFocus;
        },
        isSearchList() {
            return this.searchWord && this.isFocus;
        }
    },
    watch: {
        "$route.params.name": function () {
            this.searchWord = this.$route.params.name;
        }
    },
    methods: {
        focusInput() {
            this.isFocus = true;
        },
        blurInput() {
            var self = this;
            setTimeout(function() {
                self.isFocus = false;
            }, 500)
        },
        input() {
            api.getSearchList().then(res => {
                let word = this.searchWord;
                this.searchList = res.data.data.list.filter(item =>
                    item.includes(word)
                );
            }).catch(function (error) {
                console.log(error);
            })

        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/public/header/index.scss";
    @import "@/assets/css/public/header/search.scss";
</style>
