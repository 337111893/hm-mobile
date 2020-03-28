/***
 * 登录方法
 * ***/
import request from '@/utils/request'
export function login (data) {
  return request({
    //   配置选项
    url: '/authorizations', // 请求地址
    method: 'post',
    data // 接收传入的data
    // axios 中body参数放置在data中
  })
  // 返回一个promise对象
}
/****
 * 关注用户
 * ***/
export function followUser (data) {
  return request({
    url: '/user/followings', // 关注用户
    method: 'post',
    data
    // body 参数  body data  query params
  })
}

/****
 * 取消关注用户
 * ***/
export function unFollowUser (autid) {
  return request({
    url: `/user/followings/${autid}`,
    method: 'delete'
  })
}
/***
 * 获取用户自己的个人信息
 * ***/

export function getUserInfo () {
  return request({
    url: '/user'
  })
}
/****
 * 获取用户的个人资料
 *
 * ***/
export function getUserProfile () {
  return request({
    url: '/user/profile'
  })
}
