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
                forceExpireDate: '', // 交强险到期时间
                businessExpireDate: '', // 商业险到期时间
            },
            detail: {
                CheSun: null,
                BuJiMianCheSun: null,
                Sanzhe: null,
                BuJiMianSanzhe: null,
                SiJi: null,
                BuJiMianSiJi: null,
                ChengKe: null,
                BuJiMianChengKe: null,
                DaoQiang: null,
                BuJiMianDaoQiang: null,
                HuaHen: null,
                BuJiMianHuaHen: null,
                Boli: null,
                ZiRan: null,
                BuJiMianZiRan: null,
                SheShui: null,
                BuJiMianSheShui: null,
                HcSanFangTeYue: null,
            },
            customer: null,
            quotation: null,
            payUrl: '',
            state: '',
        })
    }

    setData = (field, k) => e => {
        if (k.indexOf('BuJiMian') > -1) {
            if (!this[field][k.slice(8)]) return
            return this[field][k] = 1 - this[field][k];
        }
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
