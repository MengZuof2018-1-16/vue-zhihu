import Vue from 'vue'
import axios from 'axios'
import {
    Toast
} from 'vant'
Vue.use(Toast)

var instance = axios.create({
    timeout: 1000 * 12
})

instance.defaults.headers.get['Content-Type'] = "application/x-www-form-urlencoded"
instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        }
    },
    error => {
        if (error.response.status === 304) {
            Toast('暂无更新')
        }
        return Promise.reject(error.response);
    }
)

export default instance