<template>
  <div id="app">
    <el-row  v-if="$route.path!='/login'">
      <el-col :span="24" class="header">
        <h1>云天管理平台</h1>
        <div class="right">
          <li>管理员</li>
          <li @click="outLogin">退出登录</li>
        </div>
      </el-col>
    </el-row>
    <div class="main">
      <div class="menus" v-if="$route.path!='/login'">
          <el-menu :router="true" :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#409eff">
          <template v-for="route in $router.options.routes" v-if="!route.hidden">
            <el-menu-item v-if="!route.children || route.children.length == 1" :index="route.path" :key="route.path">
              <i :class="route.icon" class="iconfont"></i>{{ route.name }}
            </el-menu-item>
            <el-submenu v-else :index="route.path" :key="route.path">
              <template slot="title">
                <i :class="route.icon" class="iconfont"></i>{{ route.name }}</template>
              <el-menu-item v-for="child in route.children" :index="route.path + '/' + child.path" :key="route.path + '/' + child.path">{{ child.name }}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        </div>

        <div class="view">
          <router-view></router-view>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    outLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  list-style: none;
}
body,
html,
.view,
.main,
#app {
  width: 100%;
  height: 100%;
}
.container {
  height: auto;
  overflow: hidden;
  width: 100% !important;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  height: 80px;
  background: rgb(84, 92, 100);
  border-bottom: 1px solid #fff;

  line-height: 80px;
  color: #fff;
  padding-left: 50px;
  padding-right: 50px;

  h1 {
    font-size: 30px;
    float: left;
  }
  .right {
    float: right;
    li {
      margin-left: 20px;
      cursor: pointer;
      float: left;

      &:hover {
        color: rgb(64, 158, 255);
      }
    }
  }
}

.menus {
  padding-top: 80px;
  box-sizing: border-box;
  .iconfont {
    color: #fff;
    padding-right: 10px;
    font-size: 20px;
  }
  .el-menu {
    border-right: 0;
  }
  background: rgb(84, 92, 100);
  position: fixed;
  left: 0;
  width: 200px;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
.el-menu-item.is-active {
  background: rgb(67, 74, 80);
}

.view {
  padding-left: 220px;
  padding-top: 100px;
  padding-right: 20px;
  box-sizing: border-box;
}
.tips {
  color: #ccc;
  padding: 20px;
}

.box-card {
  margin-bottom: 20px;
  padding-bottom: 20px;

  .headers {
    .el-icon-upload,
    .el-icon-circle-plus-outline,
    .el-icon-circle-plus {
      padding-right: 5px;
      font-size: 18px;
    }
  }

  li {
    width: 25%;
    margin-bottom: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    float: left;
    text-align: center;

    h3 {
      font-size: 16px;
      font-weight: 500;
      height: 40px;
      line-height: 40px;
    }

    img {
      width: 100%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      padding: 5px;
    }

    .box {
      position: relative;
      overflow: hidden;

      &:hover .btns {
        top: 0;
      }

      .btns {
        transition: all 0.5s;
        width: 100%;
        position: absolute;
        top: -40px;
        height: 40px;
        line-height: 40px;
        background: rgba(0, 0, 0, 0.5);
        text-align: right;

        i {
          color: #fff;
          display: block;
          line-height: 40px;
          float: right;
          text-align: center;
          width: 40px;
          cursor: pointer;
          font-size: 18px;

          &:hover {
            color: rgb(64, 158, 255);
          }
        }
      }
    }
  }
}

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  display: block;
}

.el-upload img {
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 5px;
}

.el-upload__input {
  display: none !important;
}

.pagebox {
  text-align: center;
  clear: both;

  li {
    width: auto;
    padding: 0;
  }
}

.note-popover,
.tooltip {
  z-index: 9999;
}
</style>
