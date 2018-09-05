var express = require('express');
var router = express.Router();

// 数据库
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var consultation = new mongoose.Schema({
    type: Number,//类型  1：banner  2：六大常见难题 3：加个咨询 4：手续咨询 5：技术咨询 6：方案咨询
    url: String,//图片地址
    title: String,//询问
    reply: String,//回复
    date: Date,//日期
})

var consultationModel = mongoose.model('consultation', consultation);

// 获取新闻列表
router.post('/getList', (req, res, next) => {
    if (req.body.type != 1) {
        consultationModel.find({ type: req.body.type }).count((err, count) => {
            let current = req.body.page.current;
            let size = req.body.page.size;
            consultationModel.find({ type: req.body.type }, null, {
                limit: size,
                skip: (current * size) - size
            }, (err, doc) => {
                res.send({ code: 200, total: count, data: doc, current: current })
            })
        })
    } else {
        consultationModel.find({
            type: req.body.type
        }, (err, doc) => {
            if (err) throw err;
            res.send({ code: 200, data: doc })
        })
    }

})

// 更换banner
router.post('/editBanner', (req, res, next) => {
    consultationModel.update({
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
        type: req.body.type,//类型  1：banner  2：缩略图
        date: new Date().getTime(),//日期
        title: req.body.title,//标题
        reply: req.body.reply,//回复
    }
    consultationModel.create(d, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "添加成功" })
    })
})

// 修改
router.post("/editList", (req, res, next) => {
    consultationModel.findByIdAndUpdate(req.body.id, {
        title: req.body.title,//标题
        reply: req.body.reply,//回复
    }, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "修改成功" })
    })
})

// 删除
router.post("/deleteList", (req, res, next) => {
    consultationModel.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) throw err;
        res.send({ code: 200, msg: "删除成功" })
    })
})

module.exports = router;