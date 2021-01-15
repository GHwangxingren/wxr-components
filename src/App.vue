<template>
  <div id="app">
    <el-card class="link-card">
      <router-link v-for="item in pages" :to="item.path" class="link-common" active-class="link-on" :key="item.path">{{
        item.title
      }}</router-link>
    </el-card>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      pages: [
        {
          title: "标题组件",
          path: "/title"
        },
        {
          title: "表单相关",
          path: "/form"
        },
        {
          title: "element组件",
          path: "/element"
        },
        {
          title: "自定义选择组件",
          path: "/checkBox"
        }
      ]
    };
  }
};
</script>
<style lang="less">
#app {
  padding: 35px;
  background-color: var(--bg-color);
  min-height: 100vh;
  box-sizing: border-box;
  .link-card {
    margin-bottom: 20px;
    .link-common {
      color: var(--text-black);
      margin-right: 20px;
    }
    .link-on {
      color: var(--blue);
    }
  }
}
</style>
