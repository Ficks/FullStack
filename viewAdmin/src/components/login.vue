<template>
    <div class="login">
        <div class="mlogin">
            <div class="mbox">
                <div id="owl-login" class="login-owl" :class="{password:b}">
                    <div class="hand"></div>
                    <div class="hand hand-r"></div>
                    <div class="arms">
                        <div class="arm"></div>
                        <div class="arm arm-r"></div>
                    </div>
                </div>
                <div class="ibox">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div class="list">
                      <el-form-item  prop="zh">
                        <i class="el-icon-mobile-phone" :style="{width:z?10+'%':15+'%'}"></i>
                        <el-input :style="{width:z?90+'%':85+'%'}" @focus="z=true" @blur="z=false" placeholder="请输入账号" v-model="ruleForm.zh"></el-input>
                      </el-form-item>
                    </div>
                    <div class="list">
                      <el-form-item  prop="password">
                        <i class="el-icon-view" :style="{width:b?10+'%':15+'%'}"></i>
                        <el-input type="password"  :style="{width:b?90+'%':85+'%'}" placeholder="请输入密码" @focus="b=true" @blur="b=false" v-model="ruleForm.password"></el-input>
                      </el-form-item>
                    </div>
                    <el-button class="submit" @click="submitLogin('ruleForm')" type="primary">登&nbsp;&nbsp;&nbsp;录</el-button>
                  </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    var isZh = (rule, value, callback) => {
      if (value != "admin") {
        return callback(new Error("账号或密码不正确"));
      } else {
        callback();
      }
    };
    var isPassword = (rule, value, callback) => {
      if (value != "123456") {
        return callback(new Error("账号或密码不正确"));
      } else {
        callback();
      }
    };
    return {
      b: false,
      z: false,
      ruleForm: {
        zh: "",
        password: ""
      },
      rules: {
        zh: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 5,
            max: 11,
            message: "长度在 5 到 11 个字符",
            trigger: "blur"
          },
          { validator: isZh, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 11,
            message: "长度在 5 到 11 个字符",
            trigger: "blur"
          },
          { validator: isPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          sessionStorage.setItem("isLogin", true);
          this.$router.push({
            path: "/index"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    sessionStorage.setItem("isLogin", false);
  }
};
</script>

<style lang="less">
.login {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("./bg.jpg") no-repeat;

  .el-form-item__content {
    margin-left: 0 !important;
  }
  .mlogin {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -178px;
    margin-left: -200px;
    width: 400px;
    height: 300px;
    border: 1px solid #ddd;
    background-color: #f0f8ff;
    position: relative;
    max-width: 400px;
    padding: 0;
  }

  .mbox {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #owl-login,
  #owl-login {
    width: 211px;
    height: 108px;
    background-image: url(./owl-login.png);
    position: absolute;
    top: -100px;
    left: 50%;
    margin-left: -111px;
  }
  .hand {
    width: 34px;
    height: 34px;
    -webkit-border-radius: 40px;
    border-radius: 40px;
    background-color: #472d20;
    transform: scaleY(0.6);
    transition: 0.3s ease-out;
    position: absolute;
    left: 14px;
    bottom: -8px;
  }
  .hand-r {
    left: 170px;
  }
  .arms {
    top: 58px;
    position: absolute;
    width: 100%;
    height: 41px;
    overflow: hidden;
  }
  .arm {
    width: 40px;
    height: 65px;
    position: absolute;
    left: 20px;
    top: 40px;
    background-image: url(./owl-login-arm.png);
    transition: 0.3s ease-out;
    -webkit-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    -o-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }
  .arm-r {
    transform: rotate(20deg) scaleX(-1);
    left: 158px;
  }
  .password {
    .hand {
      transform: translateX(42px) translateY(-15px) scale(0.7);
    }
    .hand-r {
      transform: translateX(-42px) translateY(-15px) scale(0.7);
    }
    .arm {
      transform: translateY(-40px) translateX(40px);
    }
    .arm-r {
      transform: translateY(-40px) translateX(-40px) scaleX(-1);
    }
  }

  .el-input {
    float: right;
    width: 85%;
  }

  .ibox {
    box-sizing: border-box;
    padding: 20px;
    padding-top: 60px;
  }
  .list {
    height: auto;
    overflow: hidden;
    margin-bottom: 20px;

    i {
      float: left;
      width: 15%;
      text-align: center;
      line-height: 40px;
      display: block;
      background: #6a7989;
      color: #fff;
      transition: all 0.3s;
    }
    .el-input__inner {
      border-radius: 0;
      border-left: 0;
      background: #fff;
      box-sizing: border-box;
    }
    .el-input {
      transition: all 0.3s;
    }
  }
  .submit {
    margin: 0 auto;
    display: block;
    margin-top: 30px;
    width: 150px;
  }
}
</style>
