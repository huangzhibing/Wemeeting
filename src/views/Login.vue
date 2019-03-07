<template>
    <div>
        <van-cell-group>
            <van-field
                    v-model="phone"
                    required
                    clearable
                    label="手机号"
                    icon="question"
                    placeholder="请输入手机号"
                    @focus="numKeyboardShow = true"
                    @blur="numKeyboardShow = false"
                    @click-icon="$toast('question')"></van-field>
            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    clearable
                    placeholder="请输入密码"
                    required></van-field>
        </van-cell-group>


        <van-button round type="primary" size="normal" @click="onButtonClick"> 登陆</van-button>


        <van-number-keyboard
                :show="numKeyboardShow"
                extra-key="."
                close-button-text="完成"
                @blur="numKeyboardShow = false"
                @input="onInput"
                @delete="onDelete"
        ></van-number-keyboard>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                phone: '',
                password: '',
                numKeyboardShow: false,
                params: {

                }
            }
        },
        methods: {
            onInput(key) {
                this.phone += key
            },
            onDelete() {
                if (this.phone.length <= 0) {
                    return;
                }
                this.phone = this.phone.substring(this.phone.length - 1, this.phone.length)
            },
            validate() {
                if (!this.phone) {
                    this.$dialog.alert({
                        message: '请输入手机号!'
                    })
                    return false;
                }
                if (this.phone.length !== 11) {
                    this.$dialog.alert({
                        message: '手机号格式错误！'
                    })
                    return false;
                }
                if (!this.password) {
                    this.$dialog.alert({
                        message: '请输入密码!'
                    })
                    return false;
                }
                return true;
            },
            onButtonClick() {
                if (!this.validate()) {
                    return false;
                }
                this.params = {
                    phone : this.phone,
                    password : this.password
                };
                this.$api.login(this.params).then(res => {
                    if(res && res.success) {
                        this.$dialog.alert({
                            message:"登陆成功"
                        }).then(() => {
                            //返回首页
                            this.$cookie.set('token',res.body.token,1);
                            this.$router.push('/')
                        })
                    } else {
                        if(res && res.errorCode === '-200') {
                            this.$dialog.alert({
                                message: '登陆失败：用户名或密码错误'
                            })
                        } else {
                            this.$dialog.alert({
                                message: '登陆失败：网络异常'
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
