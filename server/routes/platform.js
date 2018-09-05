var express = require('express');
var router = express.Router();

// 数据库
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var platform = new mongoose.Schema({
    type: Number,
    url: String,
    title: String
})

var platformMyModel = mongoose.model('platform', platform);

// 获取平台信息
router.post('/getList', (req, res, next) => {
    platformMyModel.find({
        type: req.body.type
    }, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, data: doc })
    })
})

// 更换banner
router.post('/editBanner', (req, res, next) => {
    platformMyModel.update({
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

// 添加列表  2：资质展示 3：企业展示
router.post("/addList", (req, res, next) => {
    platformMyModel.create({
        type: req.body.type,
        url: req.body.imageUrl,
        title: req.body.title
    }, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "添加成功" })
    })
})

// 修改
router.post("/editList", (req, res, next) => {
    platformMyModel.findByIdAndUpdate(req.body.id, {
        url: req.body.imageUrl,
        title: req.body.title
    }, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "修改成功" })
    })
})

// 删除
router.post("/deleteList", (req, res, next) => {
    platformMyModel.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "删除成功" })
    })
})

module.exports = router;