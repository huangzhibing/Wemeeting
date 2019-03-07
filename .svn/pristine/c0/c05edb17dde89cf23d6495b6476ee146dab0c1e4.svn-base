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
                    v-model="name"
                    required
                    clearable
                    label="姓名"
                    icon="question"
                    placeholder="请输入姓名"
                    @click-icon="$toast('question')"></van-field>
            <van-field
                    v-model="college"
                    required
                    label="学院"
                    icon="question"
                    placeholder="请选择所在学院"
                    @focus="loadCollege"
                    @blur="selectorPopUpShow = false"
            ></van-field>

            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required></van-field>
            <van-field
                    v-model="rePassword"
                    type="password"
                    label="确认密码"
                    placeholder="请再次输入密码"
                    required></van-field>
        </van-cell-group>

        <van-button round type="primary" size="normal" @click="onButtonClick"> 确定</van-button>

        <van-number-keyboard
                :show="numKeyboardShow"
                extra-key="."
                close-button-text="完成"
                @blur="show = false"
                @input="onInput"
                @delete="onDelete"
        ></van-number-keyboard>
        <van-popup v-model="selectorPopUpShow" position="bottom" :overlay="true">
            <van-picker
                    :loading="collegeLoading"
                    value-key="xymc"
                    @cancel="onCancel"  @change="onSelectorChange"
                    @confirm="onConfirm" :show-toolbar="true" :columns="collegeColumns"
            ></van-picker>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                numKeyboardShow: false,
                selectorPopUpShow: false,
                collegeLoading: true,
                collegeColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                phone: '',
                name: '',
                password: '',
                rePassword: '',
                college: '',
                collegeCode: '',
                params: {}
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
            onCancel() {
                this.selectorPopUpShow = false;
            },
            onConfirm(value) {
                this.college = value.xymc;
                this.collegeCode = value.xydm;
                this.selectorPopUpShow = false;
            },
            onSelectorChange(obj,value) {
                this.college = value.xymc;
                this.collegeCode = value.xydm;
            },
            validate() {
                /*
                phone: '',
                name: '',
                password: '',
                rePassword: '',
                college: '',
                collegeCode: '',
                */
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
                if (!this.name) {
                    this.$dialog.alert({
                        message: '请输入姓名!'
                    })
                    return false;
                }
                if (!this.collegeCode) {
                    this.$dialog.alert({
                        message: '请选择所在学院!'
                    })
                    return false;
                }
                if (!this.password || !this.rePassword) {
                    this.$dialog.alert({
                        message: '请输入密码!'
                    })
                    return false;
                }
                if(this.password.length <6) {
                    this.$dialog.alert({
                        message: '请使用六位以上的密码!'
                    })
                    return false;
                }
                if (this.password !== this.rePassword) {
                    this.$dialog.alert({
                        message: '输入密码不一致！'
                    })
                    return false;
                }
                return true;
            },
            onButtonClick() {
                // validate
                if (!this.validate()) {
                    return false;
                }
                this.params = {
                    xm: this.name,
                    yddh: this.phone,
                    yhmm : this.password,
                    xydm: this.collegeCode
                }
                this.$dialog.confirm({
                    title: '信息确认',
                    message: '您将以' + this.college + '的' + this.name + '注册'
                }).then(() => {
                    // on confirm
                    this.$api.registry(this.params).then(res => {
                        if(res && res.success) {
                            this.$dialog.alert({
                                message:"注册成功，点击确定返回首页登陆"
                            }).then(() => {
                                //返回首页
                            })
                        } else {
                            this.$dialog.alert({
                                message:'注册失败，请稍后再试！'
                            })
                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            loadCollege() {
                this.selectorPopUpShow = true;
                this.$api.getCollegeList()
                    .then(res => {
                        if (res && res.success) {
                            this.collegeColumns = res.body.list;
                            this.collegeLoading = false;
                        } else {
                            this.collegeLoading = false;
                            this.$dialog.alert({
                                title: '出错啦',
                                message: '获取学院失败，请稍后再试'
                            }).then(() => {
                                this.selectorPopUpShow = false;
                            })

                        }

                    })
            },
        }
    }
</script>

<style scoped>

</style>
