<template>
    <div class="province">
        <el-col :span="10">
            <span class="name">按省份选择：</span>
            <my-select
                :list="provinceList"
                title="省份"
                :value="province"
                :contentActive="provinceActive"
                @change_active="changeProvinceActive"
                :canbeShowed="true"
                @change="changeProvince"
            />
            <my-select
                :list="cityList"
                title="城市"
                :value="city"
                :contentActive="cityActive"
                @change_active="changeCityActive"
                :canbeShowed="cityShow"
                @change="changeCity"
            />
        </el-col>
        <el-col :span="14">
            <span>直接搜索：</span>
            <el-select
                v-model="value"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-col>
    </div>
</template>

<script>
/* eslint-disable */
import api from "@/api/index.js";
import MySelect from "./select";
export default {
    data() {
        return {
            provinceList: [],
            allProvince: [],
            province: "省份",
            city: "城市",
            cityList: [],
            provinceActive: false,
            cityActive: false,
            cityShow: false,
            options: [],
            value: [],
            list: [],
            loading: false
        };
    },
    created() {
        api.getProvinceList().then(res => {
            this.allProvince = res.data.data;
            this.provinceList = this.getNewList(this.allProvince);
            let allCitis = [];
            this.allProvince.forEach((province) => {
                allCitis = allCitis.concat(province.cityInfoList);
            });
            this.list = allCitis.map(item => {
                return { value: `${item.name}`, label: `${item.name}` };
            });
        })
    },
    components: {
        MySelect
    },
    methods: {
        changeProvinceActive(flag) {
            this.provinceActive = flag;
            if (flag) {
                this.cityActive = false;
            }
        },
        changeCityActive(flag) {
            this.cityActive = flag & (this.province != "省份");
            if (flag) {
                this.provinceActive = false;
            }
        },
        remoteMethod(query) {
            //query为输入内容 向后端请求数据
            if (query !== "") {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;

                    this.options = this.list.filter(item => {
                        return (
                            item.label
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        );
                    });
                }, 200);
            } else {
                this.options = [];
            }
        },
        changeProvince(value) {
            this.province = value;
            this.cityShow = true;
            this.cityList = this.getNewList(this.allProvince.filter((item) => item.provinceName == value)[0].cityInfoList);
        },
        changeCity(value) {
            this.city = value;
            this.$store.dispatch("setPosition", value);
        },
        getNewList(oldList) {
            const length = 12;
            let newList = []
            const num = Math.ceil(oldList.length / length);
            for(let i = 0; i < num; i++) {
                const curLength = i < num -1 ? 12 : (oldList.length - i * length);
                newList.push(oldList.slice(0 + i*length,curLength + i*length))
            }
            return newList;
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>
