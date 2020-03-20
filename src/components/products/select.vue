<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>
        {{name}}
        <i class="el-icon-caret-bottom" />
      </dt>
      <dd>
        <h3>{{name}}</h3>
        <span v-for="(item, index) in list" :key="index+'_catogoryTab'">{{item.name}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: ['name', 'list'],
  data () {
    return {}
  }
}
</script>
