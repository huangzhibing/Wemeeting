import axios from '@/utils/httpAxios.js'

export const registry = data => {
    return axios({
        url: '/registry',
        method: 'post',
        data
    })
}
export const login = data => {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}

export const getCollegeList = () => {
    return axios({
        url: '/collegeList',
        method: 'get'
    })
}
export const getRoomList = () => {
    return axios({
        url: '/getAllRoom',
        method: 'get'
    })
}
export const getStartTime = data => {
    return axios({
        url: '/getStartTime',
        method: 'post',
        data
    })
}
export const getEndTime = data => {
    return axios({
        url: '/getEndTime',
        method: 'post',
        data
    })
}
export const appoint = data => {
    return axios({
        url: '/appoint',
        method: 'post',
        data
    })
}

export default {
    registry,
    login,
    getCollegeList,
    getRoomList,
    getStartTime,
    getEndTime,
    appoint
}
