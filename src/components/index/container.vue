<template>
    <div class="m-istyle">
        <dl @mouseover="over" :class="curClass">
            <dt>{{type}}</dt>
            <dd  v-for="(item, index) in nav.list" :key="index+'_' + curClass" :data-type="item.tab" :class="{active: kind==item.tab}">
                {{item.text}}
            </dd>
        </dl>
        <ul class="ibody">
            <li v-for="(item, index) in resultList" :key="index+'_containerStyle'" class="cbody" :class="curClass+'List'">
                <el-card :body-style="{ padding: '0px' }" shadow="never">
                    <div class="img-radius">
                        <router-link  :to="{name: 'detail', params: {parents: item.title}}"><img :src="item.image" class="image"></router-link>
                    </div>
                    <div class="cbody">
                        <router-link  :to="{name: 'detail', params: {parents: item.title}}">
                            <div class="title">{{item.title}}</div>
                            <div class="sub-title">{{item.subTitle}}</div>
                            <span class="price-info">
                                <div class="tags-wrapper clear-fix" v-if="nav.tab">
                                    <div class="tag" v-for="(item, index) in item.tabs" :key="index+'_tab'">{{item}}</div>
                                </div>
                                <span class="current-price">
                                    ￥{{item.price}}
                                </span>
                                <span class="old-price">￥{{parseInt(item.price * 300) / 100}}</span>
                                <span class="sold">{{item.address}}</span>
                            </span>

                        </router-link>
                    </div>
                </el-card>
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
import api from "@/api/index.js";
export default {
    props: ["nav","curClass", "type"],
    data() {
        return {
            kind: "all",
            resultData: {},
            resultList:[],
            offerList: [
                {
                    title: "王小二火锅烧烤",
                    image:"//p1.meituan.net/deal/1264b595dbed48a490437da3015da1d6350429.jpg@213w_120h_1e_1c",
                    subTitle: "[平谷城区]超级优惠套餐，建议2-3人使用",
                    price: "0.99",
                    noDiscount: "美团价¥99",
                    location: "已售206",
                    tabs:[],
                    rentNum: 10,
                    type: "food"
                },

                {
                    title: "伯爵经典婚纱摄影（双井总店）",
                    image:"//p1.meituan.net/dpmerchantpic/0dd347aaffe7b414d63e3d83dbcf1f68740655.jpg@213w_120h_1e_1c",
                    subTitle: "[双井]婚纱照 精致拍摄",
                    price: "1",
                    noDiscount: "门市价¥126666",
                    location: "已售1",
                    tabs:[],
                    rentNum: 10,
                    type: "xiuxian"
                },
                {
                    title: "魔影国际影城（金源店）",
                    image:"//p1.meituan.net/poi/69a8fd4950e96c4728dfe9f585bdf19b60121.jpg@213w_120h_1e_1c",
                    subTitle: "冰雪奇缘2",
                    price: "46.9",
                    noDiscount: "门市价¥180",
                    location: "已售6.4万",
                    tabs: ["改签"],
                    rentNum: 10,
                    type: "xiuxian"
                },
                {
                    title: "八斗餐厅",
                    image:"//p1.meituan.net/deal/90fba08ff0206d568f2384398003548a1232933.png@0_0_1080_810a|388h_640w_2e_90Q|213w_120h_1e_1c",
                    subTitle: "[昌平区]热菜2选1，可免费使用包间",
                    price: "1",
                    noDiscount: "美团价¥88",
                    location: "已售487",
                    tabs:[],
                    rentNum: 10,
                    type: "food"
                },
                {
                    title: "外教中国英语外教（亚运村校区）",
                    image:"//p1.meituan.net/dpmerchantpic/99eba05e19624a5010b609df283932d9121284.jpg@watermark=0|213w_120h_1e_1c",
                    subTitle: "[亚运村]北美外教1对1线下课到店有礼",
                    price: "1",
                    noDiscount: "门市价¥89900",
                    location: "已售0",
                    tabs:[],
                    rentNum: 10,
                    type: "xiuxian"
                },
                {
                    title: "魔影国际影城（金源店）",
                    image:"//p1.meituan.net/poi/69a8fd4950e96c4728dfe9f585bdf19b60121.jpg@213w_120h_1e_1c",
                    subTitle: "利刃出鞘",
                    price: "46.9",
                    noDiscount: "门市价¥180",
                    location: "已售9992",
                    tabs:[],
                    rentNum: 10,
                    type: "xiuxian"
                },
                {
                    title: "DQ",
                    image:"//p0.meituan.net/deal/570d3ccc2657c668f406baa5a49e3a9d105160.jpg@0_144_2000_1212a|388h_640w_2e_90Q|213w_120h_1e_1c",
                    subTitle: "[多城市]50元冰淇淋蛋糕代金券1张",
                    price: "1",
                    noDiscount: "美团价¥50",
                    location: "已售4161",
                    tabs:[],
                    rentNum: 10,
                    type: "food"
                },
                {
                    title: "中艺理想家装饰·专注老房装修",
                    image:"//p0.meituan.net/wedding/310567fa0ea9bb17af982ac290298846509939.jpg@213w_120h_1e_1c",
                    subTitle: "[花乡/新发地]老房装修免费拆除",
                    price: "9.9",
                    noDiscount: "门市价¥5000",
                    location: "已售28",
                    tabs:[],
                    rentNum: 10,
                    type: "xiuxian"
                },
                {
                    title: "星典影城（六里桥店）",
                    image:"//p1.meituan.net/poi/6416e3bd87a2e719b25438cab701cfd687562.png@213w_120h_1e_1c",
                    subTitle: "决战中途岛",
                    price: "19.9",
                    noDiscount: "门市价¥80",
                    location: "已售2.9万",
                    tabs:["退","改签"],
                    rentNum: 10,
                    type: "xiuxian"
                },
                {
                    title: "Bounce Factory 反弹工厂蹦床公园（亦庄店）",
                    image:"//p1.meituan.net/joymerchant/60e6feffcccd3a4b3dabfcb375954b23-1410893234.jpg@213w_120h_1e_1c",
                    subTitle: "[亦庄]团建趣味拓展轰趴基地",
                    price: "1",
                    noDiscount: "门市价¥39996",
                    location: "已售3",
                    tabs:[],
                    rentNum: 10,
                    type: "xiuxian"
                }
            ]
        };
    },
    methods: {
        over(e){
            const dom = e.target;
            const tagName = dom.tagName.toLowerCase();
            if (tagName != "dd") {
                return false;
            }
            this.kind = dom.getAttribute('data-type');
            // iStyle
            if(this.type == "有格调") {
                this.resultList = this.resultData[this.kind];
            } else {
                if (this.kind === "all") {
                    this.resultList = this.offerList;
                } else {
                    this.resultList = this.offerList.filter((value) => value.type === this.kind);
                }
            }
        }
    },
    created() {
        if(this.type == "有格调") {
            api.resultsByKeywords().then(res => {
                // iStyle
                this.resultData = res.data.data;
                this.resultList = this.resultData[this.kind];
            })
        } else if (this.type == "狠优惠") {
            this.resultList = this.offerList;
        }

    }
};
</script>

<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>