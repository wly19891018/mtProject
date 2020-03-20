<template>
    <div :class="['choose-wrap', canbeShowed ? '': 'disabled']" @click="showWrapper" v-document-click="documentClick">
        <div class="choose">
            <span>{{value}}</span>
            <i class="el-icon-caret-bottom"></i>
            <div class="mt-content" :class="{active: contentActive}">
                <h2>{{title}}</h2>
                <div class="wrapper" :class="{city: this.title == '城市'}">
                    <div class="col" v-for="(item, index) in list" :key="index+'_col'">
                        <span :class="{'mt-item': true,'active': value == v}" v-for="(v, i) in item" :key="i+'_inList'" @click="changValue(v.provinceName || v.name)">
                            {{v.provinceName || v.name}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props:["list", "title", "value", "contentActive", "canbeShowed"],
    data() {
        return {
            newList: []
        }
    },
    computed: {

    },
    methods: {
        showWrapper(e) {
            e.stopPropagation();
            this.$emit("change_active", true);
        },
        documentClick() {
            this.$emit("change_active", false);
        },
        getNewList() {
            const length = 12;
            const num = Math.ceil(this.list.length / length);
            for(let i = 0; i < num; i++) {
                const curLength = i < num -1 ? 12 : (this.list.length - i * length);
                this.newList.push(this.list.slice(0 + i*length,curLength + i*length))
            }
        },
        changValue(item) {
            this.$emit("change", item);
        }
    },
    mounted() {
        this.getNewList();
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/changecity/select.scss";
</style>