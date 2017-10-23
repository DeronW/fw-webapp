import { getJSONP } from 'fw-javascripts'

let is_ready = false,
    ERROR = null,
    USER = {},
    resolve_list = [];

getJSONP('https://www.gongchangp2p.com/api/userState/v1/userState.json', {}).then(data => {
    is_ready = true
    let avatar = data.sex == 1 ?
        'https://static.9888.cn/images/keji-web/male.png' :
        'https://static.9888.cn/images/keji-web/female.png';

    USER = {
        isLogin: data.isLogin,
        realname: data.realName,
        level: data.userLevel,
        nickname: data.userName,
        sex: data.sex,
        avatar: data.avatar || avatar,
        gcm: data.userCode

    }
    resolve_list.forEach(cb => cb(USER.isLogin, USER))
}, e => {
    ERROR = e
    throw new Error(JSON.stringify(e))
})

export default function (cb) {
    is_ready ? cb(USER.isLogin, USER) : resolve_list.push(cb)
}