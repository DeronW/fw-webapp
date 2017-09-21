import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class Account {

    constructor(Post) {
        this.Post = Post

        this.data = {}

        extendObservable(this.data, {
            phone: '', // 用户登录手机号
        })

        extendObservable(this, {
            // comment: userCode: 10000  -已注册已设置密码, 201003-已注册未设置密码, 20014-未注册
            userCode: '',
            captcha_img_url: '',
            captcha_token: '',
            codeToken: '',
            mobile:''
        })

    }

    @computed get mask_phone() {
        let phone = this.data.phone || Storage.getUserDict().phone
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }

    get_mobile_num = () => {
        this.Post('/api/userBase/v1/userCenter.json').then((data)=>{
           this.mobile = data.mobile
        })
    }

    get_captcha = () => {
        this.Post('/api/userBase/v1/verifyNum.json').then(data => {
            this.captcha_img_url = data.url
            this.captcha_token = data.verifyToken
        })
    }

    get_user_status = () => {
        return Storage.getUserDict().status
    }

    send_sms_code = (captcha) => {

        let uot = 3
        if (this.userCode == 10000) uot = 2

        return this.Post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: this.data.phone,
            userOperationType: uot,
            verifyToken: this.captcha_token,
            verifyCode: captcha
        }, 'silence').then((data) => {
            this.codeToken = data.codeToken
        })
    }

    check_user_exist = phone => {

        this.data.phone = phone
        this._cacheData()

        return this.Post('/api/userBase/v1/userExistIndex.json', {
            mobile: this.data.phone
        }, 'silence').then(data => {
            this.userCode = data.userCode
            return new Promise(resolve => resolve())
        })
    }

    login = password => {
        let err;
        if (!password) err = '请输入密码'
        if (password.length < 8) err = '密码是8位以上字母和数字组合'

        if (err) return Components.showToast(err)

        this.Post('/api/userBase/v1/login.json', {
            mobile: this.data.phone,
            password: password
        }).then(data => {
            let dict = data.userLogin

            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid,
                phone: this.data.phone,
                invite_code: dict.invitationCode
            })

            location.href = '/static/loan/products/index.html#/'
        })
    }

    reset_password = (password, sms_code) => {
        this.Post('/api/userBase/v1/resetPass.json', {
            codeToken: this.codeToken,
            mobile: this.data.phone,
            password: password,
            verifyCode: sms_code
        }, 'silence').then(data => {
            let dict = data.userPasswordOption;
            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid,
                phone: this.data.phone,
                invite_code: dict.invitationCode
            })
            location.href = '/static/loan/products/index.html#/'
        }, e => {
            if (this.codeToken == '') {
                Components.showToast("验证码错误，请重新输入")
            } else {
                Components.showToast(e.message)
            }
        })
    }

    register = (pwd, sms_code, invite_code) => {
        this.Post('/api/userBase/v1/register.json', {
            mobile: this.data.phone,
            codeToken: this.codeToken,
            password: pwd,
            verifyCode: sms_code,
            invitationCode: invite_code
        }, 'silence').then(data => {
            let dict = data.userLogin
            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid
            })
            location.href = `/static/loan/products/index.html#/`;
        }, e => {
            if (this.codeToken == '') {
                Components.showToast("验证码错误，请重新输入")
            } else {
                Components.showToast(e.message)
            }
        })
    }
}