import { extendObservable } from 'mobx'

export default class Recognizee {

    constructor(post) {
        this.post = post;
        extendObservable(this, {
            name: {
                name: '被保人姓名',
                value: '',
                placeholder: '请输入'
            },
            phone: {
                name: '被保人手机',
                value: '',
                placeholder: '请输入'
            },
            idNo: {
                name: '身份证号',
                value: '',
                placeholder: '请输入'
            },
            email: {
                name: '邮箱',
                value: '',
                placeholder: '请输入'
            },
        })
    }

}
