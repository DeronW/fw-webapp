import { extendObservable } from 'mobx'

export default class User {

    constructor(Post) {
        this.Post = Post
        this.data = {
            basic: {} // 用户基本信息
        }
    }

    getSMSCode = phone => {
        return this.Post('WebCusLineRegActionAjax_getWxPhoneVerifyAjax.action', {
            tel: phone
        }).then(data => {
            data.verfiyNum
        })
    }

    login = (uname, pwd) => {
        return this.Post('WebCusLineRegActionAjax_loginForWxAjax.action', {
            tel: phone,
            verifyNum: verfiyNum,
            type: 3
        }).then(data => {
            let { cusNo, cusName } = data

            this.data.basic = {
                cusNo,
                cusName
            }
        })
    }

    logout = () => {
        return this.Post('WebCusLineRegActionAjax_logoutAjax.action', {
            cusNo: this.data.cusNo
        })
    }
}
