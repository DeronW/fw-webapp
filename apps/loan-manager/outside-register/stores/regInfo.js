import { extendObservable } from 'mobx'

export default class RegInfo {

    extendObservable(this, {
        phone: null,
        smsCode: null,
        password: null
    });

    constructor(request) {
        this.request = request;
    }

    handleInput = (type, value) => { this[type] = value }

    clearInput = (type) => { this[type] = null }

    isPhoneNum = () => /^1[3|4|5|7|8]\d{9}$/.test(phoneNum)

    handleSubmit = () => {

    }

}
