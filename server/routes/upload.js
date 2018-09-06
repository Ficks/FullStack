var express = require('express');
var router = express.Router();


// 上传图片
var fs = require("fs");//操作文件
var multer = require('multer');//接收图片

//生成的专门处理上传的一个工具，可以传入storage、limits等配置
function uploadFileName(fname) {
    fname = fname || '';
    //配置diskStorage来控制文件存储的位置以及文件名字等
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //确定图片存储的位置
            cb(null, './public/uploads/' + fname)
        },
        filename: function (req, file, cb) {
            //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
            cb(null, Date.now() + file.originalname)
        }
    });
    return multer({ storage: storage })
}

// 上传图片封装
function uploadFile(fileName) {
    var bannerFile = uploadFileName(fileName);
    // 单域单文件上传：input[file]的 multiple != "multiple"
    router.post('/' + fileName, bannerFile.single('filename'), function (req, res, next) {
        res.send({ code: 200, data: { msg: "上传成功", file: req.file, body: req.body } })
    })
}


//------首页
uploadFile('index/banner');
// 平台图片
uploadFile('platform/index');
// 上传视频
uploadFile('video');
//------首页END

//------平台介绍
// banner图
uploadFile('platform/banner');
// 列表所有图片
uploadFile('platform/list');

//------工程案例
uploadFile('engineeringCase/banner');
uploadFile('engineeringCase/list');

// 加建中心
uploadFile('polularScience/banner');

// 新闻图片
uploadFile('news/banner');
uploadFile('news/list');

// 加装咨询
uploadFile('consultation/banner');

// 加装中心
uploadFile('constructionCenter/banner');

// 关于我们
uploadFile('contactUs/banner');

// 所有文章图片存储
uploadFile('article');




module.exports = router;
