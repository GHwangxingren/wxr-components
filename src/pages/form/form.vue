<template>
  <div>
    <el-card>
      <div slot="header">
        <span>form表单</span>
      </div>
      <el-form :model="form" class="w368" ref="form" :disabled="!isEdit" label-width="120px">
        <el-form-item label="楼层" porp="floors" :rules="validRule('array', '请选择行政楼层')">
          <el-checkbox-group class="hxe-checkbox-group" v-model="form.check1">
            <el-checkbox-button v-for="(item, idx) in floors" :label="item" :key="idx">{{
              item | floorText
            }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="楼层" prop="radio1" :rules="validRule('requiredOnly')">
          <hxe-radio-box v-model="form.radio1">
            <template #content>
              <div class="form-bgbox">
                <div class="form-bgbox-item">
                  <p class="form-bgbox-label">房型名称<span>*</span></p>
                  <el-form-item prop="name" :rules="validRule('requiredOnly', '请输入房型名称')">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </div>
                <div class="form-bgbox-item">
                  <p class="form-bgbox-label">房型名称<span>*</span></p>
                  <el-form-item prop="name" :rules="validRule('requiredOnly', '请输入房型名称')">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </hxe-radio-box>
        </el-form-item>
        <el-form-item label="开业后装修次数" prop="num1" :rules="validRule('requiredOnly', '开业后装修次数')">
          <el-input v-model="form.num1"></el-input>
          <div class="form-bgbox">
            <div class="form-bgbox-item">
              <el-button class="form-bgbox-del">删除</el-button>
              <p class="form-bgbox-label">第1次装修时间<span>*</span></p>
              <el-form-item prop="date1" :rules="validRule('requiredOnly', '请选择装修日期')">
                <el-date-picker v-model="form.date1" type="month"></el-date-picker>
              </el-form-item>
            </div>
            <div class="form-bgbox-item">
              <el-button class="form-bgbox-del">删除</el-button>
              <p class="form-bgbox-label">第2次装修时间<span>*</span></p>
              <el-form-item prop="date1" :rules="validRule('requiredOnly', '请选择装修日期')">
                <el-date-picker v-model="form.date1" type="month"></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="add-box">
            <el-button type="text"><i class="el-icon-plus"></i>添加装修时间</el-button>
          </div>
        </el-form-item>
        <el-form-item label="选择框" prop="selVal1" :rules="validRule('requiredOnly', '请选择装修日期')">
          <el-select v-model="form.selVal1">
            <el-option v-for="item in options1" :key="item.code" :label="item.title" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文本框" prop="textArea" :rules="validRule('requiredOnly', '请输入文本')">
          <el-input type="textarea" :rows="2" v-model="form.textArea"></el-input>
        </el-form-item>
        <el-form-item label="数字输入1" prop="number1" :rules="validRule('validPosInt', '请输入')">
          <el-input-number v-model="form.number1"></el-input-number>
        </el-form-item>
        <el-form-item label="数字输入2" prop="number2" :rules="validRule('validPosInt', '请输入')">
          <el-input-number v-model="form.number2" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="图片展示" prop="firstMedia" :rules="validRule('array', '请上传图片')">
          <hxe-upload :list.sync="form.firstMedia" :upload-api="upload"></hxe-upload>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { validRule } from "@/utils/validRules.js";
import { upload } from "@/api";
export default {
  filters: {
    floorText(val) {
      return val > 0 ? val + "F" : "B" + Math.abs(val);
    }
  },
  data() {
    return {
      validRule,
      floors: ["-2", "-1", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      options1: [
        {
          code: "1",
          title: "选项1"
        },
        {
          code: "2",
          title: "选项2"
        },
        {
          code: "3",
          title: "选项3"
        },
        {
          code: "4",
          title: "选项4"
        }
      ],
      form: {
        check1: [],
        radio1: "",
        name: "",
        num1: 2,
        date1: "",
        selVal1: "",
        textArea: "",
        number1: 0,
        number2: 0,
        firstMedia: [
          {
            flagCover: 0,
            groupId: 146040426191659040,
            introduction: "",
            mediaType: 1,
            oldMediaId: 0,
            serviceId: "149005795617415171",
            tagId: 0,
            temporaryDeleted: 0,
            title: "91da-hcwpcmp5866187",
            url:
              "http://123.56.144.51:9222/file?project=sales_bid2&file_path=86104601&file_name=e86c17f91c8740bda8f7633bf05a242a.jpg&sign=38e2e32b8428d5397d33bbca7e054bcf"
          }
        ]
      },
      isEdit: true,
      upload
    };
  }
};
</script>
<style lang="less" scoped>
.box-item {
  margin: 20px 0;
}
</style>
