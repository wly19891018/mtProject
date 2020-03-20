<template>
    <div class="categroy">
        <dl class="m-categroy">
            <dt>按拼音首字母选择：</dt>
            <dd v-for="(item, index) in letterList" :key="index+'_letter'">
                <a :href="'#city-'+item">{{item}}</a>
            </dd>
        </dl>
        <dl class="m-categroy-section" v-for="(item, index) in 'ABCDEFGHJKLMNPQRSTWXYZ'.split('')" :key="index+'_cityLetter'" :id="'city-'+item">
            <dt>{{item}}</dt>
            <dd>
                <span v-for="(v, i) in $store.state.allCities[item]" :key="i+'_cityLetterList'">{{v}}</span>
            </dd>
        </dl>
    </div>
</template>

<script>
/* eslint-disable */
import api from '@/api/index.js';
export default {
    data(){
        return {
            letterList:"ABCDEFGHJKLMNPQRSTWXYZ".split(""),
            cityListMap: {}
        }
    },
    created() {
        api.getProvinceList().then(res => {
            res.data.data.forEach((province) => {
                province.cityInfoList.forEach(city => {
                    if (this.cityListMap[city.firstChar]) {
                        this.cityListMap[city.firstChar].push(city.name)
                    } else {
                        this.cityListMap[city.firstChar]=[city.name];
                    }
                })
            });
            this.$store.dispatch("getAllcities", this.cityListMap);
        });
    }
}
</script>


<style lang="scss">
    @import "@/assets/css/changecity/categroy.scss";
</style>