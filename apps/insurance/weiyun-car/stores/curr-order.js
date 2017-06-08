import { extendObservable } from 'mobx'

export default class CurrentOrder {

    constructor() {
        extendObservable(this, {
            type: '', // '1' for car
            id: '',
            car: {
                cityCode: null,
                carNoArea: '',
                licenseNo: '',
                carOwnersName: '',
                idCard: '',
                intentionCompanyCode: null,
                moldName: '', // 品牌型号
                engineNo: '', // 发动机号
                carVin: '', // 车架号
                registerDate: '', // 注册日期
            },
            detail: null,
            customer: null,
            quotation: null,
            payUrl: '',
            state: '',
        })
    }

    setData = (field, k) => e => {
        if (this[field][k] === null || typeof this[field][k] === 'number') {
            return this[field][k] = parseInt(e.target.value);
        }
        this[field][k] = e.target.value;
    }

    // for test
    logData = (field) => {
        console.log(this[field]);
    }

}
