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



        <!-- 加建科普 -->
        <el-card class="box-card engineering"
          v-loading="listLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <div slot="header" class="clearfix headers">
            <span>加建科普</span>
                <el-button @click="onEngineeringDialog('添加加建科普')" style="float: right; padding: 3px 0" type="text"><i class="el-icon-circle-plus"></i>添加</el-button>
            </div>
            <el-card  v-for="(o,index) in engineeringData" class="text box-card item">
              <div slot="header" class="clearfix">
                <span>{{o.title}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-edit-outline"  @click="onEngineeringDialog('修改加建科普',o)" >修改</el-button>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-error" @click="deleteList(o,index)">删除</el-button>
              </div>
              <div class="decontent">
                {{o.synopsis}}
              </div>
            </el-card>
            <div class="pagebox">
             <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page="pageData.current"
              :page-sizes="[12, 20, 50, 100]"
              :page-size="pageData.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageData.total">
            </el-pagination>
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
              <el-form-item label="Banner图" prop="imageUrl">
                  <el-upload
                      class="avatar-uploader"
                      name="filename"
                      :action="$server+'upload/polularScience/banner'"
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


      <!-- 加建科普 -->
      <el-dialog
          :title="engineering.title"
          :visible.sync="engineering.show"
          width="70%">
          <el-form :model="engineering.ruleForm" :rules="engineeringRules" ref="engineeringRuleForm" label-width="100px" class="demo-ruleForm"
          v-loading="engineering.loading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-form-item label="标题" prop="title">
                  <el-input v-model="engineering.ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="来源" prop="source">
                  <el-input v-model="engineering.ruleForm.source"></el-input>
              </el-form-item>
              <el-form-item label="作者" prop="author">
                  <el-input v-model="engineering.ruleForm.author"></el-input>
              </el-form-item>
              <el-form-item label="文章简介" prop="synopsis">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入文章简介"
                    v-model="engineering.ruleForm.synopsis">
                  </el-input>
              </el-form-item>
              <el-form-item label="文章内容">
                  <div id="summernote"></div>
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
      pageData: {
        current: 1,
        size: 12,
        total: 100
      },
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
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        source: [
          { required: true, message: "请输入文章来源", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入文章作者", trigger: "blur" }
        ],
        synopsis: [
          { required: true, message: "请输入文章简介", trigger: "blur" }
        ]
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
      this.pageData.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
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
            url: "/polularScience/editBanner",
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
        //   初始化编辑器
        $("#summernote").summernote({
          lang: "zh-CN", // default: 'en-US'
          height: 400,
          //调用图片上传
          callbacks: {
            onImageUpload: files => {
              this.sendFile(files[0]);
            }
          }
        });
        //   设置编辑器内容
        this.$refs.engineeringRuleForm.resetFields();
        if (!row) return;
        this.engineering.id = row._id;
        $("#summernote").summernote("code", row.text);
        this.engineering.ruleForm.imageUrl = row.url;
        this.engineering.ruleForm.title = row.title;
        this.engineering.ruleForm.isTop = row.isTop;
        this.engineering.ruleForm.source = row.source;
        this.engineering.ruleForm.author = row.author;
        this.engineering.ruleForm.synopsis = row.synopsis;
        this.engineering.ruleForm.text = row.text;
      });
    },
    sendFile(file) {
      var formData = new FormData();
      formData.append("filename", file);
      $.ajax({
        url: this.$server + "upload/article", //路径是你控制器中上传图片的方法，下面controller里面我会写到
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "POST",
        success: data => {
          $("#summernote").summernote(
            "editor.insertImage",
            this.$server + data.data.file.path
          );
        }
      });
    },
    engineeringSubmitForm(formName) {
      // 获取编辑器内容
      var markupStr = $("#summernote").summernote("code");

      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = "/polularScience/addList";
          var d = this.engineering.ruleForm;
          d.text = markupStr;
          if (this.engineering.title.indexOf("修改") != -1) {
            url = "/polularScience/editList";
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
          return false;
        }
      });
    },
    getBanner() {
      this.bannerLoading = true;
      this.$http({
        url: "/polularScience/getList",
        data: { type: 1 }
      }).then(
        res => {
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
        url: "/polularScience/getList",
        data: { type: 2, page: this.pageData }
      }).then(
        res => {
          this.pageData.total = res.total;
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
            url: "/polularScience/deleteList",
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
