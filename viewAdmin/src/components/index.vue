<template>
  <div class="container">
      <el-card class="box-card banner"
          v-loading="bannerLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
        <div slot="header" class="clearfix headers">
          <span>轮播图</span>
          <el-button @click="onDialog('添加轮播图')" style="float: right; padding: 3px 0" type="text"><i class="el-icon-circle-plus"></i>添加</el-button>
        </div>
          <p class="tips">轮播图参考尺寸为（1920*540）px</p>

        <div v-for="(o,index) in banner" class="text item">
          <ul>
            <li>
              <div class="box">
                  <img :src="$server+o.url" alt="">
                  <div class="btns">
                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                      <i @click="onDialog('修改轮播图',o)" class="el-icon-edit-outline"></i>
                    </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="删除" placement="top">
                          <i class="el-icon-circle-close-outline" @click="deleteBannerOrPt(o,index,banner)"></i>
                      </el-tooltip>
                  </div>
              </div>
            </li>
          </ul>
        </div>
      </el-card>

      <el-card class="box-card banner"
          v-loading="platformLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
        <div slot="header" class="clearfix headers">
          <span>平台介绍</span>
            <el-button @click="onPlatformDialog('添加平台介绍')" style="float: right; padding: 3px 0" type="text"><i class="el-icon-circle-plus"></i>添加</el-button>
        </div>
          <p class="tips">缩略图参考尺寸为（380*260）px</p>

        <div v-for="(o,index) in platform" class="text item">
          <ul>
            <li>
                <div class="box">
                    <img :src="$server+o.url" alt="">
                    <div class="btns">
                        <el-tooltip class="item" effect="dark" content="修改" placement="top">
                            <i @click="onPlatformDialog('修改平台介绍',o)" class="el-icon-edit-outline"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <i class="el-icon-circle-close-outline" @click="deleteBannerOrPt(o,index,platform)"></i>
                        </el-tooltip>
                    </div>
                    <h3>{{o.title}}</h3>
                </div>
                </li>
          </ul>
        </div>
      </el-card>

      <el-card class="box-card"
          v-loading="videoLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
        <div slot="header" class="clearfix headers">
          <span>视频展示</span>
            <el-button @click="onVideoDialog" style="float: right; padding: 3px 0" type="text"><i class="el-icon-upload"></i>更换视频</el-button>
        </div>
        <div class="videos">
          <video controls="" v-if="videoDialog.ruleForm.video">
              <source :src="$server+videoDialog.ruleForm.video" type="video/mp4"> 您的浏览器不支持 video 标签。
          </video>
        </div>
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
              <el-form-item label="轮播图" prop="imageUrl">
                  <el-upload
                      name="filename"
                      class="avatar-uploader"
                      :show-file-list="false"
                      :action="$server+'upload/index/banner'"
                      :on-success="handleBannerSuccess"
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


      <!-- 平台介绍 -->
      <el-dialog
          :title="platformDialog.title"
          :lock-scroll="false"
          :visible.sync="platformDialog.show"
          width="40%">
          <el-form :model="platformDialog.ruleForm" :rules="platformRules" ref="platformruleForm" label-width="100px" class="demo-ruleForm"
          v-loading="platformDialog.loading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-form-item label="缩略图" prop="imageUrl">
                  <el-upload
                      name="filename"
                      class="avatar-uploader"
                      :action="$server+'upload/platform/index'"
                      :show-file-list="false"
                      :on-success="handlePlatformSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="platformDialog.ruleForm.imageUrl" :src="$server+platformDialog.ruleForm.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
              <el-form-item label="标题" prop="title">
                    <el-input v-model="platformDialog.ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="外部链接" prop="href">
                    <el-input v-model="platformDialog.ruleForm.href"></el-input>
                </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="platformDialog.show = false">取 消</el-button>
              <el-button type="primary" @click="platformSubmitForm('platformruleForm')">确 定</el-button>
          </span>
      </el-dialog>

      <!-- 视频展示 -->
      <el-dialog
          :title="videoDialog.title"
          :lock-scroll="false"
          :visible.sync="videoDialog.show"
          width="40%">
          <el-form :model="videoDialog.ruleForm" :rules="videoRules" ref="videoruleForm" label-width="100px" class="demo-ruleForm"
          v-loading="videoDialog.loading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-form-item label="视频" prop="video">
                  <el-upload
                    class="upload-demo"
                    name="filename"
                    drag
                    :before-upload="beforeUploadVideo"
                    :on-success="handleVideoSuccess"
                    :action="$server+'upload/video'"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传MP4视频，且不超过100M</div>
                  </el-upload>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="videoDialog.show = false">取 消</el-button>
              <el-button type="primary" @click="videoSubmitForm('videoruleForm')">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerLoading: false,
      platformLoading: false,
      videoLoading: false,
      rules: {
        imageUrl: [{ required: true, message: "请上传轮播图", trigger: "blur" }]
      },
      platformRules: {
        imageUrl: [
          { required: true, message: "请上传缩略图", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        href: [{ required: true, message: "请输入外部链接", trigger: "blur" }]
      },
      videoRules: {
        video: [{ required: true, message: "请上传视频", trigger: "blur" }]
      },
      appDialog: {
        show: false,
        loading: false,
        title: "添加",
        id: "",
        ruleForm: {
          imageUrl: ""
        }
      },
      platformDialog: {
        show: false,
        loading: false,
        title: "添加",
        id: "",
        ruleForm: {
          title: "",
          imageUrl: "",
          href: ""
        }
      },
      videoDialog: {
        show: false,
        loading: false,
        title: "更换视频",
        ruleForm: {
          video: ""
        }
      },
      banner: [],
      platform: []
    };
  },
  methods: {
    deleteBannerOrPt(o, index, arr) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: "/index/deleteList",
            data: { id: o._id }
          }).then(
            res => {
              arr.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {}
          );
        })
        .catch(() => {});
    },
    submitForm(formName) {
      // 提交轮播图
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.appDialog.loading = true;
          var url = "/index/addBanner";
          var d = { imageUrl: this.appDialog.ruleForm.imageUrl };
          if (this.appDialog.title.indexOf("修改") != -1) {
            url = "/index/editBanner";
            d = {
              imageUrl: this.appDialog.ruleForm.imageUrl,
              id: this.appDialog.id
            };
          }
          this.$http({
            url: url,
            tips: true,
            data: d
          }).then(
            res => {
              this.getBannerOrPt(1);
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
    platformSubmitForm(formName) {
      // 提交平台介绍
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.platformDialog.loading = true;
          var url = "/index/addPlatform";
          var d = this.platformDialog.ruleForm;
          if (this.platformDialog.title.indexOf("修改") != -1) {
            url = "/index/editPlatform";
            d = JSON.stringify(this.platformDialog.ruleForm);
            d = JSON.parse(d);
            d.id = this.platformDialog.id;
          }
          this.$http({
            url: url,
            tips: true,
            data: d
          }).then(
            res => {
              this.getBannerOrPt(2);
              this.platformDialog.loading = false;
              this.platformDialog.show = false;
            },
            err => {
              this.platformDialog.loading = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    videoSubmitForm(formName) {
      // 更换视频
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.videoDialog.loading = true;
          this.$http({
            url: "/index/editVideo",
            tips: true,
            data: { videoUrl: this.videoDialog.ruleForm.video }
          }).then(
            res => {
              this.getBannerOrPt(3);
              this.videoDialog.loading = false;
              this.videoDialog.show = false;
            },
            err => {
              this.videoDialog.loading = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    handleBannerSuccess(res, file) {
      console.log(9999)
      this.appDialog.ruleForm.imageUrl = res.data.file.path;
    },
    handlePlatformSuccess(res, file) {
      this.platformDialog.ruleForm.imageUrl = res.data.file.path;
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
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields(); //此方法需要模态框加载完成后才可以执行
        if (!row) return;
        this.appDialog.id = row._id;
        this.appDialog.ruleForm.imageUrl = row.url;
      });
    },
    onPlatformDialog(title, row) {
      this.platformDialog.title = title;
      this.platformDialog.show = true;

      this.$nextTick(() => {
        this.$refs.platformruleForm.resetFields();
        if (!row) return;
        this.platformDialog.id = row._id;
        this.platformDialog.ruleForm.imageUrl = row.url;
        this.platformDialog.ruleForm.title = row.title;
        this.platformDialog.ruleForm.href = row.href;
      });
    },
    onVideoDialog() {
      this.videoDialog.show = true;
    },
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 100;
      if (
        [
          "video/mp4"
          // "video/ogg",
          // "video/flv",
          // "video/avi",
          // "video/wmv",
          // "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式,只支持MP4");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传视频大小不能超过100MB哦!");
        return false;
      }
    },
    uploadVideoProcess(event, file, fileList) {
      // this.videoFlag = true;
      // this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleVideoSuccess(res, file) {
      // 上传成功视频
      // this.videoDialog.ruleForm.video = URL.createObjectURL(file.raw);
      this.videoDialog.ruleForm.video = res.data.file.path;
    },
    // 获取首页banner
    getBannerOrPt(type) {
      var str =
        type == 1
          ? "bannerLoading"
          : type == 2 ? "platformLoading" : "videoLoading";
      this[str] = true;

      this.$http({
        url: "/index/bannerOrpt",
        data: {
          type: type
        }
      }).then(
        res => {
          if (type == 1) {
            this.banner = res.data;
          } else if (type == 2) {
            this.platform = res.data;
          } else if (type == 3) {
            this.videoDialog.ruleForm.video = "";
            setTimeout(() => {
              if (res.data.length != 0)
                this.videoDialog.ruleForm.video = res.data[0].url;
            }, 10);
          }
          this[str] = false;
        },
        err => {
          this[str] = false;
        }
      );
    }
  },
  mounted() {
    this.getBannerOrPt(1);
    this.getBannerOrPt(2);
    this.getBannerOrPt(3);
  }
};
</script>

<style lang="less" scoped>
.banner {
  li {
    width: 100/3%;
  }
}
.videos {
  text-align: center;

  video {
    box-sizing: border-box;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 5px;
  }
}
</style>
