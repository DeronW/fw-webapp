import { extendObservable, computed } from 'mobx'

export default class CarInfo {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            moldName: '', // 品牌型号
            engineNo: '', // 发动机号
            carVin: '', // 车架号
            registerDate: '', // 注册日期
            // forceExpireDate: '', // 交强险到期时间
            // businessExpireDate: '', // 商业险到期时间
        }, state)
    }

    submit = (history) => {
        if (!this.valid) return;

        history.push(`/policy-detail?t_id=001`)

        // return this.request('/carInsurance/perfectCarInfo.shtml', {
        //     carVin: this.carVin,
        //     engineNo: this.engineNo,
        //     moldName: this.moldName,
        //     recordDate: this.registerDate,
        //     temporaryPolicyId: 0
        // }).then(data => {
        //     history.push(`/policy-detail?t_id=${data.temporaryPolicyId}`)
        // })
    }

    setFormData = (field, value) => {
        this[field] = value
    }

    @computed get valid() {
        return this.moldName && this.engineNo && this.carVin && this.registerDate
    }

}
