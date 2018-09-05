<template>
    <div class="container">
        <el-card class="box-card banner"
          v-loading="bannerLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <div slot="header" class="clearfix headers">
            <span>Banner图</span>
            <el-button @click="onDialog" style="float: right; padding: 3px 0" type="text"><i class="el-icon-upload"></i>更换</el-button>
            </div>
            <p class="tips">Banner图参考尺寸为（1920*540）px</p>

            <div class="text item">
            <ul>
                <li>
                    <div class="box">
                        <img :src="$server+bannerUrl" alt="">
                    </div>
                </li>
            </ul>
            </div>
        </el-card>



        <!-- 关于我们 -->
        <el-card class="box-card engineering"
          v-loading="listLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <div slot="header" class="clearfix headers">
            <span>关于我们</span>
                <el-button @click="onEngineeringDialog('添加列表')" style="float: right; padding: 3px 0" type="text"><i class="el-icon-circle-plus"></i>添加</el-button>
            </div>
            <el-card  v-for="(o,index) in engineeringData" class="text box-card item">
              <!-- <div slot="header" class="clearfix">
                <span></span>
              </div> -->
               <span>{{o.str}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-edit-outline"  @click="onEngineeringDialog('修改列表',o)" >修改</el-button>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-error" @click="deleteList(o,index)">删除</el-button>
              <div class="decontent">
                {{o.synopsis}}
              </div>
            </el-card>
        </el-card>

        <!-- 轮播图 -->
      <el-dialog
          :title="appDialog.title"
          :lock-scroll="false"
          :visible.sync="appDialog.show"
          width="40%">
          <el-form :model="appDialog.ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
          v-loading="appDialog.loading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-form-item label="Banner图" prop="imageUrl">
                  <el-upload
                      class="avatar-uploader"
                      name="filename"
                      :action="$server+'upload/contactUs/banner'"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="appDialog.ruleForm.imageUrl" :src="$server+appDialog.ruleForm.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="appDialog.show = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </span>
      </el-dialog>


      <!-- 关于我们 -->
      <el-dialog
          :title="engineering.title"
          :visible.sync="engineering.show"
          width="70%">
          <el-form :model="engineering.ruleForm" :rules="engineeringRules" ref="engineeringRuleForm" label-width="100px" class="demo-ruleForm"
          v-loading="engineering.loading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-form-item label="内容" prop="title">
                  <el-input v-model="engineering.ruleForm.title"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="engineering.show = false">取 消</el-button>
              <el-button type="primary" @click="engineeringSubmitForm('engineeringRuleForm')">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: false,
      bannerUrl: "",
      bannerLoading: false,
      rules: {
        imageUrl: [
          { required: true, message: "请上传Banner图", trigger: "blur" }
        ]
      },
      engineeringRules: {
        // imageUrl: [
        //   { required: true, message: "请上传缩略图", trigger: "blur" }
        // ],
        title: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      appDialog: {
        show: false,
        loading: false,
        title: "添加",
        ruleForm: {
          imageUrl: ""
        }
      },
      engineering: {
        show: false,
        loading: false,
        title: "添加",
        id: "",
        ruleForm: {
          title: "",
          imageUrl: "",
          isTop: false,
          source: "", //来源
          author: "", //作者
          synopsis: "", //文章简介
          text: "" //正文
        }
      },
      engineeringData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageData.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageData.current = val;
      this.getList();
    },
    onDialog() {
      this.appDialog.ruleForm.imageUrl = this.bannerUrl;
      this.appDialog.show = true;
    },
    submitForm(formName) {
      // 提交轮播图
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.appDialog.loading = true;
          this.$http({
            url: "/contactUs/editBanner",
            tips: true,
            data: { imageUrl: this.appDialog.ruleForm.imageUrl }
          }).then(
            res => {
              this.appDialog.loading = false;
              this.appDialog.show = false;
              this.bannerUrl = this.appDialog.ruleForm.imageUrl;
            },
            err => {
              this.appDialog.loading = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      // this.appDialog.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.appDialog.ruleForm.imageUrl = res.data.file.path;
    },
    handleEngineeringSuccess(res, file) {
      this.engineering.ruleForm.imageUrl = res.data.file.path;
      // this.engineering.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传图片只能是 jpg/png/gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG || isGIF) && isLt2M;
    },
    onEngineeringDialog(title, row) {
      this.engineering.title = title;
      this.engineering.show = true;
      this.engineering.ruleForm.isTop = false;

      this.$nextTick(() => {
        this.$refs.engineeringRuleForm.resetFields();
        if (!row) return;
        this.engineering.id = row._id;
      });
    },
    engineeringSubmitForm(formName) {
      // 获取编辑器内容
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = "/contactUs/addList";
          var d = this.engineering.ruleForm;
          if (this.engineering.title.indexOf("修改") != -1) {
            url = "/contactUs/editList";
            d = JSON.stringify(d);
            d = JSON.parse(d);
            d.id = this.engineering.id;
          }

          this.$http({
            url: url,
            tips: true,
            data: d
          }).then(
            res => {
              this.getList();
              this.engineering.loading = false;
              this.engineering.show = false;
            },
            err => {
              this.engineering.loading = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getBanner() {
      this.bannerLoading = true;
      this.$http({
        url: "/contactUs/getList",
        data: { type: 1 }
      }).then(
        res => {
          console.log(res);
          if (res.data.length != 0) this.bannerUrl = res.data[0].url;
          this.bannerLoading = false;
        },
        err => {
          this.bannerLoading = false;
        }
      );
    },
    getList() {
      this.listLoading = true;
      this.$http({
        url: "/contactUs/getList",
        data: { type: 2, page: this.pageData }
      }).then(
        res => {
          console.log(res);
          this.engineeringData = res.data;
          this.listLoading = false;
        },
        err => {
          this.listLoading = false;
        }
      );
    },
    deleteList(o, index) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: "/contactUs/deleteList",
            data: { id: o._id }
          }).then(
            res => {
              this.engineeringData.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {}
          );
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getBanner();
    this.getList();
  }
};
</script>

<style scoped lang="less">
.banner {
  li {
    width: 100%;
  }
}
</style>
