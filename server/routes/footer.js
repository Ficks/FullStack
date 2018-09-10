var express = require('express');
var router = express.Router();

// 数据库
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var footer = new mongoose.Schema({
    type: Number,//类型  1：二维码  2：列表
    url: String,//图片地址
    str: String
})

var footerModel = mongoose.model('footer', footer);

// 获取列表
router.post('/getList', (req, res, next) => {
    //    不需要分页
    footerModel.find({ type: req.body.type }, (err, doc) => {
        res.send({ code: 200, data: doc })
    })
})

// 更换banner
router.post('/editBanner', (req, res, next) => {
    footerModel.update({
        type: 1
    }, {
            type: 1,
            url: req.body.imageUrl
        }, {
            upsert: true
        }, (err, doc) => {
            res.send({ code: 200, msg: "更换成功" })
        })
})

// 添加列表
router.post("/addList", (req, res, next) => {
    var d = {
        type: 2,//类型  1：banner  2：缩略图
        str: req.body.title
    }
    footerModel.create(d, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "添加成功" })
    })
})

// 修改列表
router.post("/editList", (req, res, next) => {
    footerModel.findByIdAndUpdate(req.body.id, {
        str: req.body.title
    }, (err, doc) => {
        res.send({ code: 200, msg: "修改成功" })
    })
})

router.post("/deleteList", (req, res, next) => {
    footerModel.findByIdAndRemove(req.body.id, (err, doc) => {
        res.send({ code: 200, msg: "删除成功" })
    })
})


module.exports = router;