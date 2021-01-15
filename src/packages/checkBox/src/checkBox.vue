<template>
  <div class="hxe-checkbox-container">
    <div
      v-for="(item, index) in selOptions"
      :key="item[code] + item[title]"
      class="hxe-checkbox-item"
      :class="{ actived: localSelect.includes(item[code]), disabled }"
      :style="{ width, height, lineHeight: height }"
      @click.stop.prevent="singleClick(item)"
      @dblclick.stop.prevent="dbClick(item, index)"
    >
      <el-tooltip :disabled="!showTip" :effect="effect" :content="`俺是${item[title]}`" :placement="placement">
        <div class="hxe-content-overflow">
          <div class="hxe-checkbox-item-content" :style="{ textAlign: align }">
            <i
              v-if="hasDelete && item[deleteProp] && !disabled"
              class="hxe-delete-btn"
              :style="{
                backgroundImage: `url(${
                  localSelect.includes(item[code])
                    ? require('@/assets/image/check_del_blue.png')
                    : require('@/assets/image/check_del_grey.png')
                })`
              }"
              @click.stop.prevent="handleDelete(item, index)"
            ></i>
            <i v-if="showOrder && localSelect.includes(item[code])" class="hxe-order-num">{{
              localSelect.findIndex(e => e === item[code]) + 1
            }}</i>
            <span
              v-if="isEdit && editIndex === index && !disabled"
              class="hxe-checkbox-item-title hxe-checkbox-item-title-input"
            >
              <el-input v-focus v-model="item[title]" @blur="editBlur(item, index)" />
            </span>
            <span v-else class="hxe-checkbox-item-title">{{ item[title] }}</span>
          </div>
        </div>
      </el-tooltip>
    </div>
    <!-- 添加控件 -->
    <div
      v-if="hasAdd && !disabled"
      class="hxe-checkbox-item hxe-add-btn"
      :style="{ width, height, lineHeight: height }"
      @click.stop.prevent="handleAdd"
    >
      +
    </div>
  </div>
</template>

<script>
let timer = null;

export default {
  name: "HxeCheckBox",
  componentName: "HxeCheckBox",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      }
    }
  },
  props: {
    value: {
      type: [String, Number, Array]
    },
    // array类型，枚举类数组，用于遍历生成选择项
    selOptions: {
      type: Array,
      default: () => []
    },
    // string,绑定关联值id等
    code: {
      type: String,
      default: "code"
    },
    // string,绑定展示文本
    title: {
      type: String,
      default: "title"
    },
    // string,绑定是否可删除字段
    deleteProp: {
      type: String,
      default: "isDelete"
    },
    // string,checkBox宽度
    width: {
      type: String,
      default: "126px"
    },
    // string,checkBox高度
    height: {
      type: String,
      default: "40px"
    },
    // 是否展示文字提示
    showTip: {
      type: Boolean,
      default: false
    },
    // string,文字提示默认提供的主题dark/light
    effect: {
      type: String,
      default: "dark"
    },
    // string,文字提示的出现位置top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: {
      type: String,
      default: "bottom"
    },
    // boolean,用于控制是否多选，默认为true
    multiple: {
      type: Boolean,
      default: true
    },
    // boolean,是否展示选择顺序
    showOrder: {
      type: Boolean,
      default: false
    },
    // number,控制最多选择数量,默认为0,不限制
    limit: {
      type: Number,
      default: 0
    },
    // boolean,是否有添加功能
    hasAdd: {
      type: Boolean,
      default: false
    },
    // boolean,是否有删除功能
    hasDelete: {
      type: Boolean,
      default: false
    },
    // string, 文字方向，默认center居中
    align: {
      type: String,
      default: "center"
    },
    // 	boolean,是否可编辑
    isEdit: {
      type: Boolean,
      default: false
    },
    // 	boolean,是否可进行选择
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editIndex: null
    };
  },
  computed: {
    localSelect: {
      get() {
        if (this.value && Array.isArray(this.value)) {
          return this.value || [];
        } else {
          let _temp = [];
          return this.value ? [this.value] : [];
        }
      },
      set(val) {
        if (this.multiple) {
          this.$emit("input", val);
          return;
        }

        this.$emit("input", this.joinArray(val));
      }
    }
  },
  methods: {
    // 实时更改
    change(item) {
      if (this.disabled) return;

      let _code = item[this.code];
      let _temp = this.localSelect;

      if (this.localSelect.includes(_code)) {
        let _curIdx = this.localSelect.findIndex(v => v === _code);

        _temp.splice(_curIdx, 1);
      } else {
        // 有最大限制并且超过这个限制，不允许继续选
        if (this.limit !== 0 && this.localSelect.length >= this.limit) return;

        // 单选类型每次清空
        if (!this.multiple) {
          this.localSelect.splice(0, _temp.length);
        }

        _temp.push(_code);
      }

      this.multiple ? this.$emit("change", _temp) : this.$emit("change", this.joinArray(_temp));
      this.localSelect = _temp;
    },
    // 输入框编辑失焦事件
    editBlur(item, index) {
      this.editIndex = null;
      this.$emit("handleBlur", {
        item,
        index
      });
    },
    // 添加选项
    handleAdd() {
      this.$emit("handleAdd");
    },
    // 单击事件
    singleClick(item) {
      if (!this.isEdit) {
        this.change(item);
        return;
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        this.change(item);
      }, 200);
    },
    // 双击事件
    dbClick(item, index) {
      if (!this.isEdit) return;

      clearTimeout(timer);
      this.editIndex = index;
    },
    // 删除列表选项
    handleDelete(item, index) {
      this.$emit("handleDelete", {
        item,
        index
      });
    },
    // 分离数组
    joinArray(arr) {
      return arr.length ? arr[0] : "";
    }
  }
};
</script>

<style lang="less">
.hxe-checkbox-item-content .el-input__inner {
  height: 100%;
  border: none;
}
</style>

<style lang="less" scoped>
.hxe-checkbox-container {
  display: flex;
  flex-wrap: wrap;

  .hxe-checkbox-item {
    position: relative;
    height: 40px;
    margin: 6px 8px;
    padding: 0 10px;
    border: 1px solid var(--color-ccd2d9);
    border-radius: 3px;
    background-color: var(--white);
    font-size: var(--font-size-small);
    line-height: 38px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.1s linear;

    &:hover {
      border-color: var(--blue);
      color: var(--blue);
    }

    .hxe-content-overflow {
      position: relative;
      outline: none;
    }

    .hxe-checkbox-item-content {
      overflow: hidden;
      height: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      outline: none;

      .hxe-delete-btn {
        position: absolute;
        top: -8px;
        right: -20px;
        width: 16px;
        height: 16px;
        background-size: 100%;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      .hxe-order-num {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 6px;
        background: var(--blue);
        border-radius: 50%;
        font-weight: var(--font-weight-6);
        color: var(--white);
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
      }

      .hxe-checkbox-item-title {
        overflow: hidden;
        width: 100%;
        height: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;

        &.hxe-checkbox-item-title-input {
          display: inline-block;
          overflow: hidden;
        }
      }
    }

    &.disabled {
      background-color: var(--disabled-color);
    }

    &.actived {
      border: 2px solid var(--blue);
      color: var(--blue);
      font-weight: var(--font-weight-6);

      &::after {
        position: absolute;
        content: "";
        transform: rotate(135deg);
        bottom: -3px;
        right: -11px;
        border-radius: 3px;
        border-bottom: 15px solid var(--blue);
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
      }

      &::before {
        position: absolute;
        content: "";
        height: 6px;
        width: 3px;
        right: 3px;
        z-index: 9;
        bottom: 2px;
        border-color: var(--white);
        border-style: solid;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }

  .hxe-add-btn {
    border: 1px dashed var(--color-ccd2d9);
    color: var(--text-grey);
    font-size: 22px;
    font-weight: var(--font-weight-5);
    text-align: center;
    transition: all 0.2s linear;

    &:hover {
      border-color: var(--blue);
      color: var(--blue);
    }
  }
}
</style>
