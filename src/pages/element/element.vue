<template>
  <div>
    <el-card>
      <div slot="header">
        <span>element样式</span>
      </div>
      <div class="box-item">
        <hxe-title title="按钮" show-border></hxe-title>
        <el-row class="mg-20">
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row>
        <el-row class="mg-20">
          <el-button plain>默认按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="success" plain>成功按钮</el-button>
          <el-button type="info" plain>信息按钮</el-button>
          <el-button type="warning" plain>警告按钮</el-button>
          <el-button type="danger" plain>危险按钮</el-button>
        </el-row>
        <el-row class="mg-20">
          <el-button plain class="border-dashed">默认按钮</el-button>
          <el-button type="primary" class="border-dashed" plain>主要按钮</el-button>
          <el-button type="success" class="border-dashed" plain>成功按钮</el-button>
          <el-button type="info" class="border-dashed" plain>信息按钮</el-button>
          <el-button type="warning" class="border-dashed" plain>警告按钮</el-button>
          <el-button type="danger" class="border-dashed" plain>危险按钮</el-button>
        </el-row>
        <el-row class="mg-20">
          <el-button disabled>默认按钮</el-button>
          <el-button type="primary" disabled>主要按钮</el-button>
          <el-button type="success" disabled>成功按钮</el-button>
          <el-button type="info" disabled>信息按钮</el-button>
          <el-button type="warning" disabled>警告按钮</el-button>
          <el-button type="danger" disabled>危险按钮</el-button>
        </el-row>
      </div>
      <div class="box-item">
        <hxe-title title="选择框" show-border></hxe-title>
        <p class="common-tips">复选button</p>
        <el-row>
          <el-checkbox-group class="hxe-checkbox-group" v-model="check1">
            <el-checkbox-button v-for="(item, idx) in list" :label="item" :key="idx">{{ item }}</el-checkbox-button>
          </el-checkbox-group>
        </el-row>
        <el-row>
          <el-checkbox-group class="hxe-checkbox-group" v-model="check1">
            <el-checkbox-button v-for="(item, idx) in list" :label="item" :key="idx" disabled>{{
              item
            }}</el-checkbox-button>
          </el-checkbox-group>
        </el-row>
        <p class="common-tips">radio带边框</p>
        <el-row>
          <el-radio-group v-model="check2">
            <el-radio v-for="(item, idx) in list" :label="item" :key="idx" border>{{ item }}</el-radio>
          </el-radio-group>
        </el-row>
        <el-row>
          <el-radio-group v-model="check2">
            <el-radio v-for="(item, idx) in list" :label="item" :key="idx" border disabled>{{ item }}</el-radio>
          </el-radio-group>
        </el-row>
      </div>
      <div class="box-item">
        <hxe-title title="卡片容器" show-border></hxe-title>
        <p class="common-tips">卡片阴影</p>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="always">总是显示</el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">鼠标悬浮显示</el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="never">从不显示</el-card>
          </el-col>
        </el-row>
      </div>
      <div class="box-item">
        <hxe-title title="折叠面板" show-border></hxe-title>
        <el-row :gutter="50">
          <el-col :span="12">
            <p class="common-tips">折叠面板按钮在右</p>
            <el-collapse v-model="activeNames1" @change="handleChange">
              <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ["选项1", "选项2", "选项3"],
      check1: ["选项1"],
      check2: "选项1",
      activeNames1: ["1"],
      activeNames2: ["1"]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="less" scoped>
.box-item {
  margin-bottom: 20px;
}
.mg-20 {
  margin-top: 20px;
}
</style>
