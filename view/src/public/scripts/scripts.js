var $main = {
    server: "http://127.0.0.1:3030",
    isPage: true,
    childIndex: 2,
    city: null,
    isYz: false,
    // 首页
    indexBanner: function () {
        $.ajax({
            url: $main.server + "/index/bannerOrpt",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="swiper-slide"><img src="' + $main.server + "/" + data.data[i].url + '" alt="图片加载失败" /></div>'
                }
                $(".bannerbox").append(str)


                var swiper = new Swiper('.swiper-container', {
                    autoplay: true,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });


            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    indexPtjs: function () {
        $.ajax({
            url: $main.server + "/index/bannerOrpt",
            data: {
                type: 2
            },
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="list"><a href="' + data.data[i].href + '"><img src="' + $main.server + "/" + data.data[i].url + '" alt=""><h3>' + data.data[i].title + '</h3></a></div>'
                }
                $(".ptjsdata").append(str)

            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    indexAnlizs: function () {
        $.ajax({
            url: $main.server + "/engineeringCase/getIsTop",
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="list"><a href="./engDetails.html?id=' + data.data[i]._id + '"><img src="' + $main.server + "/" + data.data[i].url + '" alt=""><h3>' + data.data[i].title + '</h3></a></div>'
                }
                $(".CaseStudy .box").append(str)

            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    indexNews: function () {
        $.ajax({
            url: $main.server + "/news/getList",
            type: "post",
            data: {
                type: 2
            },
            success: function (data) {
                console.log(data);

                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="swiper-slide"><a href="./newDetails.html?id=' + data.data[i]._id + '" class="box"><img src="' + $main.server + "/" + data.data[i].url + '" alt=""><h3>' + data.data[i].title + '</h3></a></div>'
                }

                $(".newsbox").append(str)

                var swiperNews = new Swiper('.swiper-container-news', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    autoplay: true,
                    loop: true
                });

            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    indexVideo: function () {
        $.ajax({
            url: $main.server + "/index/bannerOrpt",
            data: {
                type: 3
            },
            type: "post",
            success: function (data) {
                var str = '<video controls><source src="' + $main.server + "/" + data.data[0].url + '" type="video/mp4"> 您的浏览器不支持 video 标签。</video><a href="' + $main.server + "/" + data.data[0].url + '" target="_blank">看不到视频？可以新窗口打开试试</a>'
                $(".videos .box").append(str)
            },
            error: function (err) {
                console.log(err);
            }
        })
    },

    // 平台介绍
    platform: function () {
        $.ajax({
            url: $main.server + "/platform/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })

        $.ajax({
            url: $main.server + "/platform/getList",
            data: {
                type: 2
            },
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="list"><a href="javascript:void(0)"><img src="' + $main.server + "/" + data.data[i].url + '" alt=""><h3>' + data.data[i].title + '</h3></a></div>'
                }
                $("#qualifications").html(str)
                $('#qualifications').viewer();
            },
            error: function (err) {
                console.log(err);
            }
        })

        $.ajax({
            url: $main.server + "/platform/getList",
            data: {
                type: 3
            },
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="list"><a href="javascript:void(0)"><img src="' + $main.server + "/" + data.data[i].url + '" alt=""><h3>' + data.data[i].title + '</h3></a></div>'
                }
                $("#CaseStudy").html(str)
                $('#CaseStudy').viewer();
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    // 工程案例
    engineeringCase: function () {
        $.ajax({
            url: $main.server + "/engineeringCase/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    engineeringCaseList(index) {
        index = index || 1;
        var pageSize = 10;
        $.ajax({
            url: $main.server + "/engineeringCase/getList",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                type: 2,
                page: {
                    current: index,
                    size: pageSize
                }
            }),
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="list"><a href="./engDetails.html?id=' + data.data[i]._id + '"><img src="' + $main.server + "/" + data.data[i].url + '" alt=""><h3>' + data.data[i].title + '</h3></a></div>'
                }
                $(".EngineeringCase .box").html(str)

                var size = data.total / pageSize;
                size = size < 1 ? 1 : Math.ceil(size);
                if (size > 1 && $main.isPage) {
                    $main.isPage = false;
                    $('.pagebox').pagination({
                        pageCount: size,
                        jump: true,
                        coping: true,
                        homePage: '首页',
                        endPage: '末页',
                        prevContent: '上页',
                        nextContent: '下页',
                        callback: function (api) {
                            $main.engineeringCaseList(api.getCurrent());
                        }
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    // 加建科普
    polularScience: function () {
        $.ajax({
            url: $main.server + "/polularScience/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    polularScienceList: function (index) {
        index = index || 1;
        var pageSize = 10;
        $.ajax({
            url: $main.server + "/polularScience/getList",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                type: 2,
                page: {
                    current: index,
                    size: pageSize
                }
            }),
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    var mDate = new Date(data.data[i].date);
                    var Y = b0(mDate.getFullYear());
                    var M = b0(mDate.getMonth() + 1);
                    var D = b0(mDate.getDate());
                    str += '<a class="listm" href="./polularDetails.html?id=' + data.data[i]._id + '">' +
                        '<div class="date">' +
                        '<div class="ri">' + D + '</div>' +
                        '<div class="n">' + Y + '/' + M + '</div>' +
                        '</div>' +
                        '<div class="rights">' +
                        '<h2>' + data.data[i].title + '</h2>' +
                        '<p>' + data.data[i].synopsis + '</p>' +
                        '</div>' +
                        '</a>'
                }
                $(".policybox").html(str)

                var size = data.total / pageSize;
                size = size < 1 ? 1 : Math.ceil(size);
                if (size > 1 && $main.isPage) {
                    $main.isPage = false;
                    $('.pagebox').pagination({
                        pageCount: size,
                        jump: true,
                        coping: true,
                        homePage: '首页',
                        endPage: '末页',
                        prevContent: '上页',
                        nextContent: '下页',
                        callback: function (api) {
                            $main.polularScienceList(api.getCurrent());
                        }
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        })

        function b0(n) {
            return n >= 10 ? n : "0" + n;
        }
    },
    // 加装咨询
    consultation: function () {
        $.ajax({
            url: $main.server + "/consultation/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })

        $(".slibar ul li").on("click", function () {
            $main.childIndex = $(this).index() + 2;
            $main.isPage = true;
            $main.consultationList(1);
            $(this).addClass("active").siblings().removeClass("active");
        })
    },
    consultationList: function (index) {
        index = index || 1;
        var pageSize = 10;
        $.ajax({
            url: $main.server + "/consultation/getList",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                type: $main.childIndex,
                page: {
                    current: index,
                    size: pageSize
                }
            }),
            type: "post",
            success: function (data) {
                var str = ""
                for (var i = 0; i < data.data.length; i++) {
                    str += '<div class="lists"><h2><span>难题：</span> ' + data.data[i].title + '</h2><p><span>回答：</span>' + data.data[i].reply + '</p></div>'
                }
                $(".childs").html(str)

                var size = data.total / pageSize;
                size = size < 1 ? 1 : Math.ceil(size);
                if (size > 1 && $main.isPage) {
                    $main.isPage = false;
                    $('.pagebox').pagination({
                        pageCount: size,
                        jump: true,
                        coping: true,
                        homePage: '首页',
                        endPage: '末页',
                        prevContent: '上页',
                        nextContent: '下页',
                        callback: function (api) {
                            $main.consultationList(api.getCurrent());
                        }
                    });
                }
                if (size == 1) {
                    $('.pagebox').hide();
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    // 加建中心
    constructionCenter: function () {

        $.ajax({
            url: $main.server + "/constructionCenter/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })


        $.getJSON('/public/scripts/city.json', function (data) {
            $main.city = data;
            $("#shen").html('<option value=""></option>');
            for (var i = 0; i < data.length; i++) {
                var s = data[i];
                $("#shen").append('<option value="' + s.label + '">' + s.label + '</option>')
            }
        })

        $("#shen").on("change", function () {
            var v = $(this).val()
            $("#shi").html('<option value=""></option>');
            $("#qu").html('<option value=""></option>');
            for (let i = 0; i < $main.city.length; i++) {
                var s = $main.city[i];
                if (s.label == v) {
                    for (var j = 0; j < s.cities.length; j++) {
                        var ss = s.cities[j];
                        $("#shi").append('<option value="' + ss.label + '">' + ss.label + '</option>')
                    }
                    break;
                }
            }
        })

        $("#shi").on("change", function () {
            var v = $("#shen").val()
            var vv = $(this).val()
            $("#qu").html('<option value=""></option>');
            for (let i = 0; i < $main.city.length; i++) {
                var s = $main.city[i];
                if (s.label == v) {
                    for (var j = 0; j < s.cities.length; j++) {
                        var ss = s.cities[j];
                        if (ss.label == vv) {
                            for (let p = 0; p < ss.cities.length; p++) {
                                var q = ss.cities[p];
                                $("#qu").append('<option value="' + q.label + '">' + q.label + '</option>')
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        })


        // location: String,//地区
        // address: String,//详细地址
        // name: String,//姓名
        // tel: Number,//电话
        // sex: String,//性别
        // remarks: String//备注

        // $('input:radio:checked').val()
        $(".recet").on("click", function () {
            $("#shen,#shi,#qu,input,#remarks").val("")
        })
        $(".submit").on("click", function () {
            if ($("#name").val() == "" || $("#tel").val() == "") {
                $(".ifxbox .box").html("请输入姓名电话")
                $(".ifx,.ifxbox").fadeIn(200);
                return;
            } else if ($("#tel").val().length !== 11) {
                $(".ifxbox .box").html("请输入正确的手机号码")
                $(".ifx,.ifxbox").fadeIn(200);
                return;
            }
            if (!$main.isYz) {
                $(".ifxbox .box").html("请先完成拼图后再进行提交")
                $(".ifx,.ifxbox").fadeIn(200);
                return;
            }

            var d = {
                location: $("#shen").val() + $("#shi").val() + $("#qu").val(),
                address: $("#address").val(),
                name: $("#name").val(),
                tel: $("#tel").val(),
                sex: $('input:radio:checked').val(),
                remarks: $("#remarks").val(),
            }

            $.ajax({
                url: $main.server + "/constructionCenter/addList",
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(d),
                type: "post",
                success: function (data) {
                    $(".refreshIcon").click();
                    $main.isYz = false;
                    $(".ifxbox .box").html("提交成功,稍后我们工作人员将会联系您，请您保持电话通畅")
                    $(".ifx,.ifxbox").fadeIn(200);
                },
                error: function (err) {
                    console.log(err);
                }
            })
        })

        $(".ifx,.ifxbox .btn").on("click", function () {
            $(".ifx,.ifxbox").fadeOut(200);
        })
    },
    contactUs: function () {
        $.ajax({
            url: $main.server + "/contactUs/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })
        $.ajax({
            url: $main.server + "/contactUs/getList",
            type: "post",
            data: { type: 2 },
            success: function (data) {
                var str = "";
                for (var i = 0; i < data.data.length; i++) {
                    str += "<p>" + data.data[i].str + "</p>"
                }

                $("#boxmain").html(str);
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    getDate: function (d) {
        var date = new Date(d); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear();
        var M = b0(date.getMonth() + 1);
        var D = b0(date.getDate());
        var h = b0(date.getHours());
        var m = b0(date.getMinutes());
        var s = b0(date.getSeconds());
        function b0(n) {
            return n >= 10 ? n : "0" + n;
        }
        var g = "-";
        var p = ":";
        return Y + g + M + g + D + " " + h + p + m + p + s;
    },
    GetRequest: function (name) {
        var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    },
    getDetailsOne: function () {

        $.ajax({
            url: $main.server + "/engineeringCase/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })
        $.ajax({
            url: $main.server + "/engineeringCase/getDetails",
            type: "post",
            data: { id: $main.GetRequest('id') },
            success: function (data) {
                if (data.code == 400) {
                    alert(data.error)
                    return;
                }
                console.log(data);
                var d = data.data;
                $(".title").text(d.title)
                $(".flowNum").text(d.flowNum + 1)
                $(".date").text($main.getDate(d.date))
                $(".content").html(d.text);

                if (data.prev) {
                    $(".prev").html('<a href="./engDetails.html?id=' + data.prev._id + '"><span>上一篇：</span>' + data.prev.title + '</a>')
                }
                if (data.next) {
                    $(".next").html('<a href="./engDetails.html?id=' + data.next._id + '"><span>下一篇：</span>' + data.next.title + '</a>')
                }
            },
            error: function (err) {
                console.log(err);
            }
        })

        $main.getYxAl();
    },
    getDetailsTwo: function () {
        $.ajax({
            url: $main.server + "/news/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })
        $.ajax({
            url: $main.server + "/news/getDetails",
            type: "post",
            data: { id: $main.GetRequest('id') },
            success: function (data) {
                if (data.code == 400) {
                    alert(data.error)
                    return;
                }
                console.log(data);
                var d = data.data;
                $(".title").text(d.title)
                $(".source").text(d.source)
                $(".author").text(d.author)
                $(".flowNum").text(d.flowNum + 1)
                $(".date").text($main.getDate(d.date))
                $(".content").html(d.text);

                if (data.prev) {
                    $(".prev").html('<a href="./newDetails.html?id=' + data.prev._id + '"><span>上一篇：</span>' + data.prev.title + '</a>')
                }
                if (data.next) {
                    $(".next").html('<a href="./newDetails.html?id=' + data.next._id + '"><span>下一篇：</span>' + data.next.title + '</a>')
                }
            },
            error: function (err) {
                console.log(err);
            }
        })

        $.ajax({
            url: $main.server + "/news/getYx",
            type: "post",
            success: function (data) {
                var d = data.data;
                var str = "";
                for (var i = 0; i < d.length; i++) {
                    str += '<li><a href="./newDetails.html?id=' + d[i]._id + '"><h3>' + d[i].title + '</h3></a></li>'
                }
                $("#xgnews").html(str);
            },
            error: function (err) {
                console.log(err);
            }
        })
        $main.getYxAl();
    },
    getDetailsThree: function () {
        $.ajax({
            url: $main.server + "/polularScience/getList",
            data: {
                type: 1
            },
            type: "post",
            success: function (data) {
                var str = '<img src="' + $main.server + "/" + data.data[0].url + '" alt="图片没有加载出来" />'
                $(".banner").html(str)
            },
            error: function (err) {
                console.log(err);
            }
        })
        $.ajax({
            url: $main.server + "/polularScience/getDetails",
            type: "post",
            data: { id: $main.GetRequest('id') },
            success: function (data) {
                if (data.code == 400) {
                    alert(data.error)
                    return;
                }
                console.log(data);
                var d = data.data;
                $(".title").text(d.title)
                $(".source").text(d.source)
                $(".author").text(d.author)
                $(".flowNum").text(d.flowNum + 1)
                $(".date").text($main.getDate(d.date))
                $(".content").html(d.text);

                if (data.prev) {
                    $(".prev").html('<a href="./polularDetails.html?id=' + data.prev._id + '"><span>上一篇：</span>' + data.prev.title + '</a>')
                }
                if (data.next) {
                    $(".next").html('<a href="./polularDetails.html?id=' + data.next._id + '"><span>下一篇：</span>' + data.next.title + '</a>')
                }
            },
            error: function (err) {
                console.log(err);
            }
        })

        $.ajax({
            url: $main.server + "/polularScience/getYx",
            type: "post",
            success: function (data) {
                var d = data.data;
                var str = "";
                for (var i = 0; i < d.length; i++) {
                    str += '<li><a href="./polularDetails.html?id=' + d[i]._id + '"><h3>' + d[i].title + '</h3></a></li>'
                }
                $("#xgnews").html(str);
            },
            error: function (err) {
                console.log(err);
            }
        })
        $main.getYxAl();
    },
    getYxAl: function () {
        $.ajax({
            url: $main.server + "/engineeringCase/getYx",
            type: "post",
            success: function (data) {
                var d = data.data;
                var str = "";
                for (var i = 0; i < d.length; i++) {
                    str += '<li><a href="./engDetails.html?id=' + d[i]._id + '"><img src="' + $main.server + "/" + d[i].url + '" alt=""><h3>' + d[i].title + '</h3></a></li>'
                }
                $("#yxgcal").html(str);
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
}