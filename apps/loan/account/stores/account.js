import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class Account {

    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            // 用户注册状态
            // 1: 可以注册, 需要设置登录密码
            // 2: 已经注册, 修改登录密码, 通过其它服务同步过来的账户没有密码,
            //     所以登录前先设置密码
            registerCodeType: null,
            registerCodeToken: '',
            phone: '' // 用户登录手机号
        })
    }

    @computed get mask_phone() {
        return this.phone.replace(/(\d{3})\d{6}(\d{2})/, '$1******$2')
    }

    get_user_status = () => {
        return Storage.getUserDict().status
    }

    send_sms_code = userOperationType => {
        return this.Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: this.phone,
            // userOperationType 2：修改登录密码 3：注册
            userOperationType: userOperationType
        }).then(data => {
            this.registerCodeToken = data.codeToken
        }, e => Components.showToast(e.message))
    }

    check_phone = phone => {
        this.phone = phone;

        return this.Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: this.phone,
            userOperationType: 3
        }, 'slience').then(data => {
            // codeToken 用来标识发短信和注册/登录/修改密码用的
            // 每次重新发送短信, codeToken都会变化
            this.registerCodeToken = data.codeToken
            //codeType 1:注册 2:重置密码
            this.registerCodeType = data.codeType
        })
    }

    forget_password = () => {
        this.registerCodeType = 2
        return this.send_sms_code(2)
    }

    login = password => {
        let err;
        if (!password) err = '请输入密码'
        if (password.length < 8) err = '密码是8位以上字母和数字组合'

        if (err) return Components.showToast(err)

        this.Post('/api/userBase/v1/login.json', {
            mobile: this.phone,
            password: password
        }).then(data => {
            let dict = data.userLogin

            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid,
                phone: this.phone,
                invite_code: dict.invitationCode
            })
            location.href = '/static/loan/home/index.html';
        }, e => Components.showToast(e.message))
    }

    reset_password = (password, sms_code) => {
        this.Post('/api/userBase/v1/resetPass.json', {
            codeToken: this.registerCodeToken,
            mobile: this.phone,
            password: password,
            verifyCode: sms_code
        }).then(data => {
            let dict = data.userPasswordOption;
            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid,
                phone: this.phone
            })
            location.href = "/"
        }, e => Components.showToast(e.message))
    }

    register = (pwd, sms_code, invite_code) => {
        this.Post('/api/userBase/v1/register.json', {
            mobile: this.phone,
            codeToken: this.registerCodeToken,
            password: pwd,
            verifyCode: sms_code,
            invitationCode: invite_code,
        }).then(data => {
            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid
            })
            location.href = `/static/loan/home/index.html`;
        }, e => Components.showToast(e.message))
    }
}