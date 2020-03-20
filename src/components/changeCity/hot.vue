<template>
    <div class="m-hcity">
        <dl>
            <dt>{{title}}：</dt>
            <dd v-for="(item, index) in list" :key="index+'_hot&rencent'">
                {{item}}
            </dd>
        </dl>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: ["title", "list"]
}
</script>

<style lang="scss">
    // @/assets/css/changecity/hot.scss
    @import "@/assets/css/changecity/hot.scss";
</style>