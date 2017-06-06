import { extendObservable } from 'mobx'

export default class Car {

    constructor(post) {
        this.post = post;
        extendObservable(this, {
            area: {
                name: '投保地区',
                value: '',
                placeholder: '请选择地区',
                options: [
                    {
                        name: '北京',
                        value: '1'
                    },{
                        name: '重庆',
                        value: '2'
                    },{
                        name: '天津',
                        value: '3'
                    },{
                        name: '成都',
                        value: '4'
                    },{
                        name: '昆明',
                        value: '5'
                    },
                ]
            },
            plateCN: {
                value: '',
                options: [
                    {
                        name: '京',
                        value: '1'
                    },{
                        name: '渝',
                        value: '2'
                    },{
                        name: '津',
                        value: '3'
                    },{
                        name: '川',
                        value: '4'
                    },{
                        name: '云',
                        value: '5'
                    },
                ]
            },
            owner: {
                name: '车主姓名',
                value: '',
                placeholder: '请输入车主姓名'
            },
            type: {
                name: '车辆型号',
                value: '',
                placeholder: '请输入车辆型号'
            },
            frameNo: {
                name: '车架号',
                value: '',
                placeholder: '请输入车架号'
            },
            engineNo: {
                name: '发动机号',
                value: '',
                placeholder: '请输入发动机号'
            },
        })
    }

}
