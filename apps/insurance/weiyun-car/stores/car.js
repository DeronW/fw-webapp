import { extendObservable, computed } from 'mobx'

export default class Car {

    constructor(Get) {
        this.Get = Get;
        extendObservable(this, {
            moldName: '', // 品牌型号
            engineNo: '', // 发动机号
            carVin: '', // 车架号
            registerDate: '', // 注册日期
            forceExpireDate: '', // 交强险到期时间
            businessExpireDate: '', // 商业险到期时间
        })
    }

    setFormData = (field, value) => {
        this[field] = value || ''
    }

    needCompleteByUser = (data) => {
        this.setFormData('moldName', data.modleName);
        this.setFormData('engineNo', data.engineNo);
        this.setFormData('carVin', data.carVin);
        this.setFormData('registerDate', data.registerDate);
        this.setFormData('forceExpireDate', data.forceExpireDate);
        this.setFormData('businessExpireDate', data.businessExpireDate);
        return !this.valid
    }

    @computed get valid() {
        return this.moldName && this.engineNo && this.carVin && this.registerDate
    }

    submit = async (history) => {
        if (!this.valid) return;

        let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
            .then(data => data.temporaryPolicyId)

        return this.Get('/carInsurance/perfectCarInfo.shtml', {
            carVin: this.carVin,
            engineNo: this.engineNo,
            moldName: this.moldName,
            recordDate: this.registerDate,
            temporaryPolicyId: temporaryPolicyId
        }).then(data => {
            history.push(`/policy-detail`)
        })
    }

}
