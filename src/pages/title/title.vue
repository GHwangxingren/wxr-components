<template>
  <div>
    <el-card>
      <div slot="header">
        <span>标题组件</span>
      </div>
      <div class="box-item">
        <hxe-title title="hello world!" show-border>
          <template v-slot:operate>
            <el-button type="info" size="medium">取消</el-button>
            <el-button type="primary" size="medium">保存</el-button>
          </template>
        </hxe-title>
      </div>
      <div class="box-item">
        <hxe-title title="hello world!" show-border>
          <template v-slot:describe>
            <span>这是一段标题的描述</span>
          </template>
        </hxe-title>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.box-item {
  margin: 20px 0;
}
</style>
