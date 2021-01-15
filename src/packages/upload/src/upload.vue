<template>
  <div class="hxe-upload">
    <!-- 上传列表 -->
    <ul class="el-upload-list el-upload-list--picture-card">
      <span v-for="(item, idx) in fileList" :key="idx">
        <li class="el-upload-list__item" v-if="!item.uploading">
          <div class="upload-box-pic">
            <!-- <div class="upload-box-tag" v-if="showCover">
              <el-tag effect="dark" v-if="item.flagCover" type="success">首</el-tag>
              <el-tag effect="dark" v-if="!item.oldMediaId">新</el-tag>
            </div> -->
            <img class="el-upload-list__item-thumbnail" :src="item.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview">
                <i class="el-icon-zoom-in" @click="handlePictureCardPreview(item)"></i>
                <p class="upload-operate-txt">预览</p>
              </span>
              <slot name="operate" />
              <!-- <span v-if="showCover && isEdit" @click="_setCover(item)">
                <i class="el-icon-collection-tag"></i>
                <p class="upload-desc">设为封面</p>
              </span> -->
              <span v-if="disabled" class="el-upload-list__item-delete">
                <i class="el-icon-delete" @click="handleRemove(item, idx)"></i>
                <p class="upload-operate-txt">删除</p>
              </span>
            </span>
          </div>
          <div class="upload-box-title" v-if="showTitle">
            <template v-if="disabled">
              <el-tooltip content="双击编辑标题" v-if="editIndex !== idx">
                <div @dblclick="dbClickFunc(item, idx)">{{ item.title }}</div>
              </el-tooltip>
              <el-input v-focus v-else v-model="item.title" @blur="_mediaUpdate(item)"></el-input>
            </template>
            <p v-else>{{ item.title }}</p>
          </div>
        </li>
        <li v-else class="el-upload-list__item process-box">
          <div class="process-box-con" :class="{ 'progress-auto': loadingType === 'circle' }">
            <el-progress
              :type="loadingType"
              :percentage="Number(item.progress) === 100 ? 99 : Number(item.progress)"
              :width="loadingType === 'circle' ? 64 : 128"
              :show-text="true"
            ></el-progress>
          </div>
        </li>
      </span>
    </ul>
    <el-upload
      v-if="!hideUpload"
      action=""
      :limit="limit"
      :multiple="true"
      :show-file-list="false"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <div class="upload-center">
        <p><i class="el-icon-plus"></i></p>
        <p>上传图片</p>
      </div>
      <div class="el-upload__tip" slot="tip" v-show="disabled">
        <p>{{ tips }}</p>
      </div>
    </el-upload>
    <!-- 预览模态 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "hxe-upload",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    suffix: {
      type: Array,
      default() {
        return [".jpg", ".jpeg", ".png", ".gif"];
      }
    },
    size: {
      type: Number,
      default: 10
    },
    limit: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "256px"
    },
    height: {
      type: String,
      default: "169px"
    },
    tips: {
      type: String,
      default: "支持JPG、GIF、PNG、BMP格式，图片小于10M,超出将会压缩图片资源"
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    titleEdit: {
      type: Boolean,
      default: false
    },
    uploadApi: {
      type: Function
    },
    loadingType: {
      type: String,
      default: "circle"
    }
  },
  data() {
    return {
      dialogImageUrl: "", // 预览图片链接
      dialogVisible: false // 是否展示预览模块
    };
  },
  computed: {
    fileList: {
      get() {
        return this.list;
      },
      set(list) {
        this.$emit("update:list", list);
      }
    },
    // 隐藏上传按钮
    hideUpload() {
      if (this.limit) {
        return this.list.length >= this.limit;
      } else {
        return false;
      }
    }
  },
  watch: {
    fileList: {
      handler(list) {},
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      // const targetArr = ["image/jpeg", "image/bmp", "image/png", "image/gif"];
      const targetArr = this.suffix.map(suf => {
        return suf.replace(".", "image/");
      });
      const suffixStr = this.suffix.join("、").replace(".", "");
      if (!targetArr.includes(file.type)) {
        this.$message.error(`上传图片只能是${suffixStr}格式之一!`);
        return false;
      }
    },
    progressFunc(event, uid) {
      let item = this.fileList.find(val => val.uid === uid);
      item && (item.progress = Math.floor((event.loaded / event.total) * 100));
    },
    async upload(item) {
      let idx = -1;
      let title = item.file.name;
      for (let suf of this.suffix) {
        if (item.file.name.includes(suf)) {
          idx = item.file.name.indexOf(suf);
        }
      }
      idx > -1 && (title = title.substring(0, idx));
      const itemObj = {
        url: "",
        title,
        serviceId: 0,
        uid: item.file.uid,
        uploading: true,
        progress: 0
      };
      this.fileList.push(itemObj); // 同步添加图片，展示loading
      const formData = new FormData();
      formData.append("file", item.file);
      try {
        const result = await this.uploadApi(formData, this.progressFunc, itemObj.uid);
        if (result.code === 0) {
          itemObj.url = result.data.url;
          itemObj.uploading = false; // 隐藏loading

          this.$message.success("图片上传成功");
        } else {
          this.delete(itemObj);
          this.$message.error(result.msg);
        }
      } catch (error) {
        this.delete(itemObj);
        this.$message.error("图片上传失败");
      }
    },
    delete(item) {
      let idx = this.fileList.findIndex(e => {
        return e.uid === item.uid;
      });
      this.fileList.splice(idx, 1);
    },
    handleRemove(item, index) {
      this.fileList.splice(index, 1);
    }
  }
};
</script>
<style lang="less">
@import "../../../assets/less/hxe-design/hxe-design.less";
.hxe-upload {
  .el-upload {
    line-height: initial;
    .flex-center(center);
    &:hover {
      .upload-center {
        i[class^="el-icon-"],
        p {
          color: @blue;
        }
      }
    }
  }
  .upload-center {
    i[class^="el-icon-"] {
      font-size: 24px;
    }
    p {
      color: @icon-color-common;
    }
  }
  .upload-box-pic {
    width: 100%;
    height: 100%;
  }
  .el-upload-list + div {
    display: inline-block;
  }
  .el-upload--picture-card {
    margin-bottom: 23px;
  }
  .el-upload--picture-card,
  .el-upload-list--picture-card .el-upload-list__item {
    width: 256px;
    height: 169px;
  }
  .upload-hidden {
    .el-upload--picture-card {
      display: none;
    }
  }
  .upload-operate-txt {
    font-size: 12px;
    color: var(--white);
    line-height: 12px;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions span + span {
    margin-left: 25px;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions span {
    vertical-align: middle;
  }
  .progress-auto .el-progress {
    width: auto;
  }
  .el-upload__tip {
    margin-top: 0px;
    color: #a1aab3;
    position: absolute;
    left: 0;
    bottom: -17px;
  }
  .el-progress--line {
    .el-progress__text {
      width: 100%;
      text-align: center;
      top: -17px;
    }
  }
}
</style>
