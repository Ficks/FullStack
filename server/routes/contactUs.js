var express = require('express');
var router = express.Router();

// 数据库
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var contactUs = new mongoose.Schema({
    type: Number,//类型  1：banner  2：列表
    url: String,//图片地址
    str: String
})

var contactUsModel = mongoose.model('contactUs', contactUs);

// 获取列表
router.post('/getList', (req, res, next) => {
    //    不需要分页
    contactUsModel.find({ type: req.body.type }, (err, doc) => {
        res.send({ code: 200, data: doc })
    })
})

// 更换banner
router.post('/editBanner', (req, res, next) => {
    contactUsModel.update({
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
    contactUsModel.create(d, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "添加成功" })
    })
})

// 修改列表
router.post("/editList", (req, res, next) => {
    contactUsModel.findByIdAndUpdate(req.body.id, {
        title: req.body.title
    }, (err, doc) => {
        res.send({ code: 200, msg: "修改成功" })
    })
})

router.post("/deleteList", (req, res, next) => {
    contactUsModel.findByIdAndRemove(req.body.id, (err, doc) => {
        res.send({ code: 200, msg: "删除成功" })
    })
})


module.exports = router;