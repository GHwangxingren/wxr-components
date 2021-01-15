<template>
  <div class="hxe-title" :class="{ 'hxe-title-border': showBorder }">
    <div class="hxe-title-left">
      <h2 :style="{ fontSize: size + 'px' }">
        <slot name="icon" />
        <span>{{ title }}</span>
      </h2>
      <p class="hxe-title-desc"><slot name="describe" /></p>
    </div>
    <div class="hxe-title-right">
      <slot name="operate" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HxeTitle",
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "20"
    },
    showBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/hxe-design/hxe-design.less";
.hxe-title {
  .flex-center(space-between);
  padding: 10px 0;
  &.hxe-title-border {
    border-bottom: 2px solid @border-color;
  }
  .hxe-title-desc {
    font-size: 14px;
    color: @text-grey;
  }
}
</style>
