<template>
  <div>
    <el-card>
      <hxe-check-box
        v-model="mode"
        :sel-options="list"
        :show-order="false"
        :disabled="false"
        :is-edit="false"
        :has-delete="true"
        :has-add="true"
        :multiple="true"
        :show-tip="true"
        delete-prop="isDelete1"
        @change="getChange"
        @handleDelete="handleDelete"
        @handleBlur="handleBlur"
        @handleAdd="handleAdd"
      ></hxe-check-box>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "checkBoxView",
  data() {
    return {
      list: [
        {
          code: 1,
          title: "游泳",
          isDelete1: true
        },
        {
          code: 2,
          title: "跑步"
        },
        {
          code: 3,
          title: "跳高"
        },
        {
          code: 4,
          title: "篮球"
        },
        {
          code: 5,
          title: "打乒乓球"
        },
        {
          code: 6,
          title: "测试一下长度啊啊啊啊啊啊啊"
        }
      ],
      mode: [2]
    };
  },
  methods: {
    getChange(val) {
      console.log(val, "改变");
    },
    handleDelete(val) {
      console.log(val, "删除");
    },
    handleBlur(val) {
      console.log(val, "失焦");
    },
    handleAdd() {
      this.$prompt("请输入名称", "添加名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空"
      })
        .then(({ value }) => {
          if (this.list.find(v => v.title === value)) {
            this.$message({
              type: "error",
              message: "当前内容已经存在"
            });

            return;
          }

          this.list.push({
            code: 0,
            title: value
          });
          this.$message({
            type: "success",
            message: "添加成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    }
  }
};
</script>
