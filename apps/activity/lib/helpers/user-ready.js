import Ajax from './request.js'

let is_ready = false,
    ERROR = null,
    USER = {},
    resolve_list = [];

Ajax({
    url: '/api/userState/v1/userState.json',
    silence: true
}).then(data => {
    is_ready = true
    USER = {
        isLogin: data.isLogin,
        realname: data.realName,
        level: data.userLevel,
        nickname: data.userName,
        sex: data.sex,
        avatar: data.avatar || (data.sex == 1 ? '/img/man.png' : '/img/woman.png'),
        gcm:data.userCode

    }
    resolve_list.forEach(cb => cb(USER.isLogin, USER))
}, e => {
    ERROR = e
    throw new Error(JSON.stringify(e))
})

export default function (cb) {
    is_ready ? cb(USER.isLogin, USER) : resolve_list.push(cb)
}