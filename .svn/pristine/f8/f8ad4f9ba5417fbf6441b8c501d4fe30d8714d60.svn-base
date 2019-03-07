<template>
  <div id="app">
    <van-nav-bar
            title="首页"
            right-text="按钮"
            fixed
            @click-right="popupShow = true"
    >
      <van-icon name="wap-nav" slot="right"></van-icon>
    </van-nav-bar>

    <router-view/>

    <van-popup v-model="popupShow" position="right" :lazy-render="false">
      <div style="width: 70vw;height: 100vh">
        <van-cell title="主页" is-link to="/"></van-cell>
        <van-cell title="个人消息" is-link url="//youzan.github.io/vant/mobile.html"></van-cell>
        <van-cell title="信息修改" is-link url="//youzan.github.io/vant/mobile.html"></van-cell>
        <van-cell title="联系我们" is-link to="index"></van-cell>
        <van-cell title="关于" is-link to="index"></van-cell>
      </div>
    </van-popup>
  </div>
</template>
<script>
    // @ is an alias to /src

    export default {
        data() {
            return {
                popupShow: false,
            }
        },
        created() {

            console.log(this.$cookie.get('token'));
            if(!this.$cookie.get('token')) {
                this.$router.push({path : '/login'})
            }
            this.$router.push({path : '/appoint'})
        }
    }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
html,body,#app {height: 100%;}
</style>
