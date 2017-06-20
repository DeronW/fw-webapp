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
            // 所以登录前先设置密码
            registerCodeType: null,
            registerCodeToken: '',
            phone: '' // 用户登录手机号
        })
    }

    @computed get mask_phone() {
        return this.phone.replace(/(\d{3})\d{6}(\d{2})/, '$1******$2')
    }

    send_sms_code() {

    }

    check_phone = (phone, history) => {
        let err;
        if (String(phone).length != 11) err = '手机号位数不正确'
        if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) err = '手机号码格式不正确'

        if (err) return Components.showToast(err);

        this.phone = phone;

        this.Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: phone,
            userOperationType: 3
        }).then(data => {
            //codeType 1跳转到注册2跳转到重置密码页
            this.registerCodeToken = data.codeToken
            this.registerCodeType = data.codeType
        }, res => {
            if (res.code === 201003) {
                history.push('/login')
            } else {
                Components.Toast(res.message)
            }
        })
    }

    login = (password, history) => {
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
                invit_code: dict.invitationCode,
                id: dict.uid,
                phone: this.phone
            })
            location.href = '/static/loan/home/index.html';
        }, e => Components.showToast(e.message))
    }

    register = (pwd, sms_code, invite_code, history) => {
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