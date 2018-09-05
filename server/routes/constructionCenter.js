var express = require('express');
var router = express.Router();

// 数据库
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var constructionCenter = new mongoose.Schema({
    type: Number,//类型  1：banner  2：列表
    read: Boolean,//是否已读
    url: String,//图片地址
    location: String,//地区
    address: String,//详细地址
    name: String,//姓名
    date: Date,//日期
    tel: Number,//电话
    sex: String,//性别
    remarks: String//备注
})

var constructionCenterModel = mongoose.model('constructionCenter', constructionCenter);

// 获取咨询列表
router.post('/getList', (req, res, next) => {
    if (req.body.type != 1) {
        constructionCenterModel.find({ type: 2 }).count((err, count) => {
            let current = req.body.page.current;
            let size = req.body.page.size;
            constructionCenterModel.find({ type: 2 }, null, {
                sort: { date: -1 },
                limit: size,
                skip: (current * size) - size
            }, (err, doc) => {
                res.send({ code: 200, total: count, data: doc, current: current })
            })
        })
    } else {
        constructionCenterModel.find({
            type: req.body.type
        }, (err, doc) => {
            if (err) throw err;
            res.send({ code: 200, data: doc })
        })
    }

})

// 更换banner
router.post('/editBanner', (req, res, next) => {
    constructionCenterModel.update({
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
        read: false,
        date: new Date().getTime(),//日期
        location: req.body.location,//地区
        address: req.body.address,//详细地址
        name: req.body.name,//姓名
        tel: req.body.tel,//电话
        sex: req.body.sex,//性别
        remarks: req.body.remarks//备注
    }
    constructionCenterModel.create(d, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "添加成功" })
    })
})

// 是否已读
router.post("/editRead", (req, res, next) => {
    constructionCenterModel.findByIdAndUpdate(req.body.id, {
        read: true
    }, (err, doc) => {
        res.send({ code: 200, msg: "标记成功" })
    })
})

module.exports = router;