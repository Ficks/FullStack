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

        <el-card class="box-card"
          v-loading="bLoading"
          element-loading-text="请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
          <div slot="header" class="clearfix headers">
            <span>加建咨询列表</span>
          </div>
          <div class="box center_box">
            <el-card class="box-card" v-for="(o,index) in listArr">
                <div slot="header" class="clearfix headers">
                  <span>姓名：{{o.name}} <em>电话：{{o.tel}}</em><em>日期：{{o.date | dateGsh}}</em></span>
                  <el-tag v-if="o.read" style="float: right;">已读</el-tag>
                  <el-button v-else @click="onRead(o._id)" style="float: right;" size="small" type="primary" ><i class="el-icon-success"></i>标记已读</el-button>
                </div>
                <div class="box_main">
                  <ul>
                    <li>省市区：{{o.location}}</li>
                    <li>性别：{{o.sex}}</li>
                    <li>详细位置：{{o.address}}</li>
                    <li>备注：{{o.remarks}}</li>
                  </ul>
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
                    :action="$server+'upload/constructionCenter/banner'"
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
    </div>
</template>

<script>
export default {
  filters: {
    dateGsh(val) {
      var date = new Date(val); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear();
      var M = b0(date.getMonth() + 1);
      var D = b0(date.getDate());
      var h = b0(date.getHours());
      var m = b0(date.getMinutes());
      var s = b0(date.getSeconds());
      function b0(n) {
        return n >= 10 ? n : "0" + n;
      }
      var g = "-";
      var p = ":";
      return Y + g + M + g + D + " " + h + p + m + p + s;
    }
  },
  data() {
    return {
      pageData: {
        current: 1,
        size: 12,
        total: 100
      },
      aLoading: false,
      bLoading: false,
      bannerUrl: "",
      bannerRules: {
        imageUrl: [
          { required: true, message: "请上传Banner图", trigger: "blur" }
        ]
      },
      bannerDialog: {
        show: false,
        loading: false,
        title: "添加",
        ruleForm: {
          imageUrl: ""
        }
      },
      listArr: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageData.size = val;
      this.getList(2);
    },
    handleCurrentChange(val) {
      this.pageData.current = val;
      this.getList(2);
    },
    bannerSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.bannerDialog.loading = true;
          this.$http({
            url: "/constructionCenter/editBanner",
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
    onBannerDialog() {
      this.bannerDialog.show = true;
    },
    getList(type) {
      var str = type == 1 ? "aLoading" : "bLoading";
      this[str] = true;
      this.$http({
        url: "/constructionCenter/getList",
        data: { type: type, page: this.pageData }
      }).then(
        res => {
          if (type == 1) {
            if (res.data.length != 0) this.bannerUrl = res.data[0].url;
          } else if (type == 2) {
            this.listArr = res.data;
            this.pageData.total = res.total;
          }
          this[str] = false;
        },
        err => {}
      );
    },
    onRead(id) {
      this.$http({
        url: "/constructionCenter/editRead",
        tips: true,
        data: {
          id: id
        }
      }).then(
        res => {
          this.getList(2);
        },
        err => {
          this.bannerDialog.loading = false;
        }
      );
    }
  },
  mounted() {
    this.getList(1);
    this.getList(2);
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

.center_box {
  .headers {
    em {
      font-style: normal;
      padding-left: 50px;
    }
    i {
      padding-right: 5px;
    }
  }
  li {
    width: 50%;
    text-align: left;
  }
}
</style>
