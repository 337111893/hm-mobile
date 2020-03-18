<template>
  <div class='container'>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
    <van-cell-group>
        <van-field label="手机号"  placeholder="请输入手机号" />
        <van-field label="验证码"  placeholder="请输入验证码">
           <!-- 插槽内容 -->
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class='login-box'>
      <van-button block round type="info" size="small">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.login-box {
  padding: 20px
}
</style>
