var express = require('express');
var router = express.Router();

// 数据库
var mongodb = require("mongodb");
var mongoose = require("mongoose");
// 数据库连接
mongoose.connect("mongodb://127.0.0.1:27017/yt", (err) => {
  if (err) {
    console.log("0000000000000");
  } else {
    console.log("1111111111111");
  }
})


// 定义数据结构index
var schema = new mongoose.Schema({
  title: String,
  url: String,
  href: String,
  type: Number
})
var MyModel = mongoose.model('index', schema);

router.get("/", (req, res, next) => {
  res.send({ code: 200 })
})
// 首页信息访问
router.post("/index/bannerOrpt", (req, res, next) => {
  MyModel.find({ type: req.body.type }, (err, doc) => {
    if (err) throw err;
    if (req.body.type == 1) {
      console.log(doc);
    }
    res.send({ code: 200, data: doc })
  })
})

// 删除首页图片 公用
router.post("/index/deleteList", (req, res, next) => {
  MyModel.findByIdAndRemove(req.body.id, (err, doc) => {
    if (err) throw err;
    res.send({ code: 200 })
  })
})

// 添加轮播图
router.post("/index/addBanner", (req, res, next) => {
  MyModel.create({
    type: 1,
    url: req.body.imageUrl
  }, (err, doc) => {
    res.send({ code: 200, msg: "添加成功" })
  })
})
// 更换轮播图
router.post("/index/editBanner", (req, res, next) => {
  MyModel.findByIdAndUpdate(req.body.id, {
    url: req.body.imageUrl
  }, (err, doc) => {
    if (err) throw err;
    res.send({ code: 200, msg: "修改成功" })
  })
})

// 添加平台信息
router.post('/index/addPlatform', (req, res, next) => {
  MyModel.create({
    type: 2,
    href: req.body.href,
    title: req.body.title,
    url: req.body.imageUrl,
  }, (err, doc) => {
    if (err) throw err;
    res.send({ code: 200, msg: "添加成功" })
  })
})
// 修改平台信息
router.post('/index/editPlatform', (req, res, next) => {
  MyModel.findByIdAndUpdate(req.body.id, {
    href: req.body.href,
    title: req.body.title,
    url: req.body.imageUrl,
  }, (err, doc) => {
    if (err) throw err;
    res.send({ code: 200, msg: "修改成功" })
  })
})

// 更换视频
router.post('/index/editVideo', (req, res, next) => {
  MyModel.updateOne({ type: 3 }, {
    type: 3,
    url: req.body.videoUrl
  }, {
      upsert: true
    }, (err, doc) => {
      if (err) throw err;
      res.send({ code: 200, msg: "更换成功" })
    })
})
module.exports = router;
