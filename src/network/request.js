import axios from 'axios'

export function request(config) {
  //  1. 创建 axios 的实例
  //  axios 返回的就是一个 promise 实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })
  // 2.axios 拦截器
  // 拦截后需要 返回原来的 config 数据   
  //   请求拦截
  instance.interceptors.request.use(config => {
      return config
    },
    err => {
        console.log(err);
        
    })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    console.log(err)
  })

  // 3.发送真正的 网路请求
  return instance(config)
}