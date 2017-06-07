import { extendObservable } from 'mobx'

export default class Customer {

    model = {
        // '1' for car
        '1': {
            holder: {
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
            },
            recognizee: {
                sameAsHolder: true,
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
            }
        }
    }

}
