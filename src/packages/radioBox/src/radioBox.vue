<template>
  <div class="radio-box">
    <el-radio-group class="form-radio-style" v-model="radioVal">
      <el-radio v-for="item in list" :label="item.label" :key="item.label" border>{{ item.title }}</el-radio>
    </el-radio-group>
    <div class="radio-box-con" v-if="radioVal === list[0].label">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HxeRadioBox",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: [String, Number],
    list: {
      type: Array,
      default() {
        return [
          {
            label: 1,
            title: "是"
          },
          {
            label: 2,
            title: "否"
          }
        ];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    radioVal: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/less/hxe-design/hxe-design.less";
.radio-box-con {
  position: relative;
  box-sizing: border-box;
  &:after {
    content: "";
    position: absolute;
    width: 132px;
    height: 10px;
    background-color: @form-box-bg;
    left: 0;
    top: -10px;
  }
}
</style>
