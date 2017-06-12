import { extendObservable, computed } from 'mobx'

export default class CarInfo {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            moldName: '', // 品牌型号
            engineNo: '', // 发动机号
            carVin: '', // 车架号
            registerDate: '', // 注册日期
            forceExpireDate: '', // 交强险到期时间
            businessExpireDate: '', // 商业险到期时间
        }, state)
    }

    submit = () => {
        if (!this.valid) return;

        // return this.request('blablabla').then(data => {
        //     if (data.success) {
        //
        //     } else {
        //
        //     }
        // })
    }

    setFormData = (field, value) => {
        this[field] = value
    }

    @computed get valid() {
        return this.moldName && this.engineNo && this.carVin && this.registerDate
    }

}
