<template>
    <div>
        <van-steps :active="active">
            <van-step>选择会议室</van-step>
            <van-step>预约细节</van-step>
            <van-step>预约完成</van-step>
        </van-steps>
        <div v-show="active === 0">
            <van-radio-group v-model="roomCode">
                <van-panel :title="room.hysmc" desc="会议室" status="可用" v-for="room in roomList">
                    <div>{{formatRoomDesc(room)}}</div>
                    <div slot="footer">
                        <van-button size="small" type="danger" @click="chooseRoom(room)">预定</van-button>
                    </div>
                </van-panel>
            </van-radio-group>
        </div>
        <div v-show="active === 1">
            <van-cell-group>
                <van-field
                        v-model="appointDate"
                        required
                        label="日期"
                        placeholder="请选择预定日期"
                        @focus="datePickerShow = true"
                        @blur="datePickerShow = false"
                ></van-field>

                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item title="预定开始时间" name="1" :value="startTime">
                        <van-button :type="time === startTime ? 'primary' : 'default'"
                                    v-for="(available,time) in startTimeMap" @click="chooseStartTime(time)"
                                    :disabled="!available">{{time}}
                        </van-button>
                    </van-collapse-item>
                    <van-collapse-item title="预定结束时间" name="2" :value="endTime">
                        <van-button :type="time === endTime ? 'primary' : 'default'"
                                    v-for="(available,time) in endTimeMap" @click="chooseEndTime(time)"
                                    :disabled="!available">{{time}}
                        </van-button>
                    </van-collapse-item>
                    <van-collapse-item title="申请事由" name="3">
                        <van-cell-group>
                            <van-button :type="reasonCode === 1 ? 'primary' : 'default'" @click="reasonCode = 1">项目对接
                            </van-button>
                            <van-button :type="reasonCode === 2 ? 'primary' : 'default'" @click="reasonCode = 2">
                                项目对接筹备
                            </van-button>
                            <van-button :type="reasonCode === 3 ? 'primary' : 'default'" @click="reasonCode = 3">项目验收
                            </van-button>
                            <van-button :type="reasonCode === 4 ? 'primary' : 'default'" @click="reasonCode = 4">其他
                            </van-button>
                            <van-field
                                    v-model="reason"
                                    label="申请事由"
                                    type="textarea"
                                    placeholder="请输入申请事由"
                                    rows="2"
                                    autosize></van-field>
                        </van-cell-group>
                    </van-collapse-item>
                </van-collapse>
            </van-cell-group>


            <van-button round type="default" block size="normal" @click="active = 0" v-if="active === 1"> 返回</van-button>
            <van-button round type="primary" block size="normal" @click="onButtonClick"> 预定</van-button>


            <van-number-keyboard
                    :show="numKeyboardShow"
                    extra-key="."
                    close-button-text="完成"
                    @blur="numKeyboardShow = false"
                    @input="onInput"
                    @delete="onDelete"
            ></van-number-keyboard>
        </div>
        <van-popup v-model="datePickerShow" position="bottom" :overlay="false">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    @change="currentDateChange"
                    :formatter="formatter">
            </van-datetime-picker>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "Appointment",
        data() {
            return {
                active: 0,
                roomCode: '',
                roomList: [],
                appointDate: '',
                currentDate: new Date(),
                minDate: new Date(),
                datePickerShow: false,
                activeName: '1',
                startTime: '-',
                endTime: '-',
                startTimeMap: {},
                endTimeMap: {},
                reasonCode: 1,
                reason: '',
                phone: '',
                password: '',
                numKeyboardShow: false,
                params: {}
            }
        },
        created() {
            this.getRoomList();
            let da = this.currentDate;
            let year = da.getFullYear() + '年';
            let month = da.getMonth() + 1 + '月';
            let date = da.getDate() + '日';
            this.appointDate = [year, month, date].join('')
        },
        methods: {
            getRoomList() {
                this.$api.getRoomList().then(res => {
                    if (res && res.body && res.body.list) {
                        this.roomList = res.body.list;
                        this.roomCode = this.roomList[0].hysbh
                    } else {
                        this.$dialog.alert({
                            message: '获取数据失败，请稍后再试！'
                        }).then(() => {
                            this.$router.push('/')
                        })
                    }
                })
            },
            formatRoomDesc(room) {
                return '可容纳' + room.rnrs + '人,有以下设备:' + (room.yds === '1' ? '电视、' : '') + (room.yled === '1' ? 'LED、' : '') + (room.ywl === '1' ? '网络、' : '')
                    + (room.yty === '1' ? '投影仪' : '')
            },
            chooseRoom(room) {
                this.roomCode = room.hysbh;
                this.getStartTime();
                this.active = 1;
            },
            chooseStartTime(time) {
                this.startTime = time;
                this.getEndTime();
            },
            chooseEndTime(time) {
                this.endTime = time;
                this.activeName = '3'
            },
            getStartTime() {
                this.$api.getStartTime({room:this.roomCode,dateStr: this.appointDate}).then(res => {
                    if (res && res.body && res.body.map) {
                        this.startTimeMap = res.body.map;
                    }
                })
            },
            getEndTime() {
                this.$api.getEndTime({room:this.roomCode,dateStr: this.appointDate, startTime: this.startTime}).then(res => {
                    if (res && res.body && res.body.map) {
                        this.endTimeMap = res.body.map;
                        this.activeName = '2'
                    }
                })
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day') {
                    return `${value}日`
                }
                return value;
            },
            currentDateChange(picker) {
                this.appointDate = picker.getValues().join('')
                this.getStartTime();
            },
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
                if (!this.startTime || this.startTime === '-') {
                    this.$dialog.alert({
                        message: '选择预定开始时间!'
                    })
                    return false;
                }
                if (!this.endTime || this.endTime === '-') {
                    this.$dialog.alert({
                        message: '选择预定结束时间!'
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
                    roomCode : this.roomCode,
                    appointDate : this.appointDate,
                    startTime : this.startTime,
                    endTime : this.endTime,
                    reasonCode : this.reasonCode,
                    reason : this.reason
                };
                this.$api.appoint(this.params).then(res => {
                    if (res && res.success) {
                        this.$dialog.alert({
                            message: "预约成功成功"
                        }).then(() => {
                            //返回首页
                            this.$router.push('/')
                        })
                    } else {
                        if (res && res.errorCode === '-200') {
                            this.$dialog.alert({
                                message: '预约失败'
                            })
                        } else {
                            this.$dialog.alert({
                                message: '预约失败'
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
