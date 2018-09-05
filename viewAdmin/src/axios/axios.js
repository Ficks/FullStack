import Vue from 'vue';
import Axios from 'axios';
import config from '@/config/config.js';
import { Message } from 'element-ui';


// 封装Axios
export default params => {
    params.method = params.type || 'post';
    params.data = params.data || {};
    if (params.type == 'get') params.params = params.data;
    return new Promise((resolve, reject) => {
        //创建Axios实例，把基本的配置放进去
        const instance = Axios.create({
            timeout: 10 * 1000,
            //定义请求根目录
            baseURL: config.server
        });
        //请求成功后执行的函数
        instance(params).then(res => {
            if (res.data.code == 200) {
                if (params.tips) {
                    Message({
                        type: 'success',
                        message: res.data.msg
                    })
                }
                resolve(res.data);
            } else {
                if (params.err) {
                    resolve(res.data);
                }
                Message({
                    type: 'error',
                    message: res.data.msg || "请联系管理员"
                })
            }
            //失败后执行的函数
        }).catch(err => {
            if (params.zoom) store.commit("hideLoading");
            if (err == 'Error: timeout of 10000ms exceeded') {
                Message({
                    type: 'error',
                    message: "网络异常，请稍后再试"
                })
            } else {
                Message({
                    type: 'error',
                    message: "服务器请求人数过多，请按F5刷新重试"
                })
            }
            reject(err);
        })
    });
};