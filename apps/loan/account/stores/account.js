import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'

export default class Account {

    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            // 用户注册状态
            // 1: 可以注册, 需要设置登录密码
            // 2: 已经注册, 修改登录密码
            registerCodeType: null,
            phone: '' // 用户登录手机号
        })
    }

    submit = (phone, history) => {
        if (String(phone).length != 11) {
            return Components.showToast('手机号位数不正确')
        }

        if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
            return Components.showToast('手机号码格式不正确')
        }

        this.phone = phone;

        this.Post(`/api/userBase/v1/sendVerifyCode.json`, {
            mobile: phone,
            userOperationType: 3
        }).then(data => {

            // if (data.codeType == 1) {
            //     history.push('/set-password')
            //     // location.href = `/static/loan/user-set-password/index.html?codeToken=${data.codeToken}&phone=${phone}`;
            // } else if (data.codeType == 2) {
            //     history.push('/')
            //     location.href = `/static/loan/user-reset-password/index.html?codeToken=${data.codeToken}&phone=${phone}`;
            // }

            this.registerCodeType = data.codeToken
            history.push('/set-password')
        }, res => {
            if (res.code === 201003) {
                history.push('/login')
                // location.href = `/static/loan/user-login/index.html?phone=${phone}`;
            } else {
                Components.Toast(res.message)
            }
        })

    }

}