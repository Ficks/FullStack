<template>
    <div class="container">

      <el-card class="box-card banner"
          v-loading="aLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <div slot="header" class="clearfix headers">
            <span>Banner图</span>
            <el-button @click="onBannerDialog" style="float: right; padding: 3px 0" type="text"><i class="el-icon-upload"></i>更换</el-button>
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


        <el-card class="box-card qualifications"
          v-loading="bLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <div slot="header" class="clearfix headers">
            <span>资质展示</span>
            <el-button @click="onDialog('添加资质展示')" style="float: right; padding: 3px 0" type="text"><i class="el-icon-circle-plus"></i>添加</el-button>
            </div>
            <p class="tips">图片参考尺寸为（240*240）px</p>

            <div v-for="(o,index) in qualifications" class="text item">
            <ul>
                <li>
                <div class="box">
                    <img :src="$server+o.url" alt="">
                    <div class="btns">
                        <el-tooltip class="item" effect="dark" content="修改" placement="top">
                            <i @click="onDialog('修改资质展示',o)" class="el-icon-edit-outline"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <i class="el-icon-circle-close-outline" @click="deleteImgOne(o,index,qualifications)"></i>
                        </el-tooltip>
                    </div>
                    <h3>{{o.title}}</h3>
                </div>
                </li>
            </ul>
            </div>
        </el-card>

        <el-card class="box-card enterprise"
          v-loading="cLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <div slot="header" class="clearfix headers">
            <span>企业展示</span>
            <el-button @click="onDialog('添加企业展示')" style="float: right; padding: 3px 0" type="text"><i class="el-icon-circle-plus"></i>添加</el-button>
            </div>
            <p class="tips">图片参考尺寸为（587*322）px</p>

            <div v-for="(o,index) in enterprise" class="text item">
            <ul>
                <li>
                <div class="box">
                    <img :src="$server+o.url" alt="">
                    <div class="btns">
                        <el-tooltip class="item" effect="dark" content="修改" placement="top">
                            <i @click="onDialog('修改企业展示',o)" class="el-icon-edit-outline"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <i class="el-icon-circle-close-outline" @click="deleteImgOne(o,index,enterprise)"></i>
                        </el-tooltip>
                    </div>
                    <h3>{{o.title}}</h3>
                </div>
                </li>
            </ul>
            </div>
        </el-card>


         <!-- 轮播图 -->
      <el-dialog
          :title="bannerDialog.title"
          :lock-scroll="false"
          :visible.sync="bannerDialog.show"
          width="40%">
          <el-form :model="bannerDialog.ruleForm" :rules="bannerRules" ref="bannerRuleForm" label-width="100px" class="demo-ruleForm"
          v-loading="bannerDialog.loading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-form-item label="Banner图" prop="imageUrl">
                  <el-upload
                    name="filename"
                    class="avatar-uploader"
                    :action="$server+'upload/platform/banner'"
                    :show-file-list="false"
                    :on-success="handleBannerSuccess"
                    :before-upload="beforeAvatarUpload">
                      <img v-if="bannerDialog.ruleForm.imageUrl" :src="$server+bannerDialog.ruleForm.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="bannerDialog.show = false">取 消</el-button>
              <el-button type="primary" @click="bannerSubmitForm('bannerRuleForm')">确 定</el-button>
          </span>
      </el-dialog>


        <el-dialog
            :title="appDialog.title"
            :visible.sync="appDialog.show"
            width="40%">
            <el-form :model="appDialog.ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
            v-loading="appDialog.loading"
            element-loading-text="请稍后"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-form-item label="图片" prop="imageUrl">
                    <el-upload
                        class="avatar-uploader"
                        name="filename"
                        :action="$server+'upload/platform/list'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="appDialog.ruleForm.imageUrl" :src="$server+appDialog.ruleForm.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="appDialog.ruleForm.title"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="appDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      aLoading: false,
      bLoading: false,
      cLoading: false,
      bannerUrl: "",
      bannerRules: {
        imageUrl: [
          { required: true, message: "请上传Banner图", trigger: "blur" }
        ]
      },
      rules: {
        imageUrl: [{ required: true, message: "请上传图片", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
      bannerDialog: {
        show: false,
        loading: false,
        title: "添加",
        ruleForm: {
          imageUrl: ""
        }
      },
      appDialog: {
        show: false,
        loading: false,
        title: "添加",
        ruleForm: {
          title: "",
          imageUrl: ""
        }
      },
      qualifications: [],
      enterprise: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var type = "";
          if (this.appDialog.title.indexOf("资质展示") != -1) {
            type = 2;
          } else {
            type = 3;
          }
          var url = "/platform/addList";
          if (this.appDialog.title.indexOf("修改") != -1) {
            url = "/platform/editList";
          }
          this.appDialog.loading = true;
          var d = {
            id: this.appDialog.id,
            type: type,
            title: this.appDialog.ruleForm.title,
            imageUrl: this.appDialog.ruleForm.imageUrl
          };
          this.$http({
            url: url,
            tips: true,
            data: d
          }).then(
            res => {
              this.getList(type);
              this.appDialog.loading = false;
              this.appDialog.show = false;
            },
            err => {
              this.appDialog.loading = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    bannerSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.bannerDialog.loading = true;
          this.$http({
            url: "/platform/editBanner",
            tips: true,
            data: { imageUrl: this.bannerDialog.ruleForm.imageUrl }
          }).then(
            res => {
              this.getList(1);
              this.bannerDialog.loading = false;
              this.bannerDialog.show = false;
              this.bannerUrl = this.bannerDialog.ruleForm.imageUrl;
            },
            err => {
              this.bannerDialog.loading = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    deleteImgOne(o, index, arr) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.appDialog.id = o._id;
          this.$http({
            url: "/platform/deleteList",
            tips: true,
            data: { id: o._id }
          }).then(
            res => {
              this.getList(o.type);
            },
            err => {
              this.bannerDialog.loading = false;
            }
          );
        })
        .catch(() => {});
    },
    handleAvatarSuccess(res, file) {
      // this.appDialog.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.appDialog.ruleForm.imageUrl = res.data.file.path;
    },
    handleBannerSuccess(res, file) {
      // this.bannerDialog.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.bannerDialog.ruleForm.imageUrl = res.data.file.path;
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
    onDialog(title, row) {
      this.appDialog.title = title;
      this.appDialog.show = true;
      if (title.indexOf("修改") != -1) this.appDialog.id = row._id;
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields();
        if (!row) return;
        this.appDialog.ruleForm.title = row.title;
        this.appDialog.ruleForm.imageUrl = row.url;
      });
    },
    onBannerDialog() {
      this.bannerDialog.show = true;
    },
    getList(type) {
      var str = type == 1 ? "aLoading" : type == "2" ? "bLoading" : "cLoading";
      this[str] = true;
      this.$http({
        url: "/platform/getList",
        data: { type: type }
      }).then(
        res => {
          if (type == 1) {
            if (res.data.length != 0) this.bannerUrl = res.data[0].url;
          } else if (type == 2) {
            this.qualifications = res.data;
          } else if (type == 3) {
            this.enterprise = res.data;
          }
          this[str] = false;
        },
        err => {}
      );
    }
  },
  mounted() {
    this.getList(1);
    this.getList(2);
    this.getList(3);
  }
};
</script>

<style lang="less" scoped>
.qualifications {
  li {
    width: 100/6%;
  }
}

.enterprise {
  li {
    width: 100/2%;
  }
}
.banner {
  li {
    width: 100%;
  }
}
</style>
