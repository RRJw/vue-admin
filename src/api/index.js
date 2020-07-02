import axios from 'axios'
import {
    parseParams
} from "@/utils";
import {
    Message
} from 'element-ui'

import { getStore } from '@/utils/storage'

// 创建一个 axios 实例
const service = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_BASE_API || '/api',
    timeout: 50000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 如果有query参数并且是post请求,则在Url地址栏上加入参数
        if (config.query && config.method === 'post') {
            config.url = `${config.url}?${parseParams(config.query)}`
        }
        if (config.body && config.method === 'post') {
            config.headers['Content-Type'] = "application/json";
            config.data = JSON.stringify(config.body);
        }
        // 在请求发送之前做一些处理
        // const token = getStore('token');
        // const tokenHead = getStore('tokenHead');
        return config
    },
    error => {
        // 发送失败
        // console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            response.data.code = 200
        }
        if (response.data.code !== 200 && response.data.message) {
            Message({
                message: response.data.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
        return response.data
    },
    error => {
        if (error && error.response) {
            console.log(error.response)
        }
        return Promise.reject(error)
    }
)

export default service