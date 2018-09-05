var express = require('express');
var router = express.Router();

// 数据库
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var engineeringCase = new mongoose.Schema({
    type: Number,//类型  1：banner  2：缩略图
    url: String,//图片地址
    title: String,//标题
    source: String,//来源
    author: String,//作者
    flowNum: Number,//浏览量
    date: Date,//日期
    isTop: Boolean,//是否首页显示
    text: String//正文
})

var engineeringCaseMyModel = mongoose.model('engineeringCase', engineeringCase);

// 获取平台信息
router.post('/getList', (req, res, next) => {
    if (req.body.type == 2) {
        engineeringCaseMyModel.find({ type: 2 }).count((err, count) => {
            let current = req.body.page.current;
            let size = req.body.page.size;
            engineeringCaseMyModel.find({ type: 2 }, null, {
                limit: size,
                skip: (current * size) - size
            }, (err, doc) => {
                res.send({ code: 200, total: count, data: doc, current: current })
            })
        })
    } else {
        engineeringCaseMyModel.find({
            type: req.body.type
        }, (err, doc) => {
            if (err) throw err;
            res.send({ code: 200, data: doc })
        })
    }
})

router.post('/getIsTop', (req, res, next) => {
    engineeringCaseMyModel.find({ type: 2, isTop: true }, (err, doc) => {
        res.send({ code: 200, data: doc })
    })
})

// 更换banner
router.post('/editBanner', (req, res, next) => {
    engineeringCaseMyModel.update({
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
        flowNum: 0,//浏览量
        date: new Date().getTime(),//日期
        url: req.body.imageUrl,//图片地址
        title: req.body.title,//标题
        source: req.body.source,//来源
        author: req.body.author,//作者
        isTop: req.body.isTop,//是否首页显示
        text: req.body.text//正文
    }
    engineeringCaseMyModel.create(d, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "添加成功" })
    })
})

// 修改
router.post("/editList", (req, res, next) => {
    engineeringCaseMyModel.findByIdAndUpdate(req.body.id, {
        url: req.body.imageUrl,//图片地址
        title: req.body.title,//标题
        source: req.body.source,//来源
        author: req.body.author,//作者
        isTop: req.body.isTop,//是否首页显示
        text: req.body.text//正文
    }, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "修改成功" })
    })
})

// 删除
router.post("/deleteList", (req, res, next) => {
    engineeringCaseMyModel.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "删除成功" })
    })
})

// 获取指定ID信息
router.post("/getDetails", (req, res, next) => {
    if (!req.body.id) {
        res.send({ code: 400, error: "无效ID" })
        return;
    }

    engineeringCaseMyModel.find({ type: 2 }, { _id: 1, title: 1 }, (err, arr) => {
        arr.forEach((item, index) => {
            if (item._id == req.body.id) {
                var prev = {};
                var next = {}
                if (arr.length > 1) {
                    if (index == 0) {
                        prev = null;
                        next = arr[index + 1];
                    } else {
                        if (index == arr.length - 1) {
                            prev = arr[index - 1];
                            next = null;
                        } else {
                            prev = arr[index - 1];
                            next = arr[index + 1];
                        }
                    }
                } else {
                    prev = null;
                    next = null;
                }
                engineeringCaseMyModel.findById(req.body.id, (err, doc) => {
                    engineeringCaseMyModel.findByIdAndUpdate(req.body.id, {
                        flowNum: doc.flowNum + 1
                    }, (err, doc) => {
                    })
                    res.send({ code: 200, data: doc, prev: prev, next: next })
                })
                return;
            }
        })
    })

})

// 根据浏览量排序
router.post("/getYx", (req, res, next) => {
    engineeringCaseMyModel.find({ type: 2 }, {
        url: 1,
        _id: 1,
        title: 1,
        flowNum: 1
    }, {
            limit: 5,
            sort: { flowNum: -1 }
        }, (err, doc) => {
            res.send({ code: 200, data: doc })
        })
})
module.exports = router;