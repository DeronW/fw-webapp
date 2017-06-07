import { extendObservable } from 'mobx'

export default class Car {

    holder = {
        name: {
            name: '投保人姓名',
            value: '',
            placeholder: '请输入'
        },
        phone: {
            name: '投保人手机',
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
    };

    recognizee = Object.assign({}, { sameAsHolder: true }, this.holder);

}
