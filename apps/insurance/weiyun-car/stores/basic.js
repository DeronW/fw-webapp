import { extendObservable, computed } from 'mobx'
import * as $FW from 'fw-components'

export default class Basic {

    constructor(Get) {
        this.Get = Get;

        extendObservable(this, {
            carNoArea: null,//	车牌号首位汉字
            carOwnersName: '', //	String	车主姓名
            cityCode: null, //	是	Int	城市Id(北京：1，重庆：2 ，天津3，成都4，昆明：5)
            idCard: '', //	是	String	车主身份证号（15或者18位）
            intentionCompanyCode: null, //	是	Int	意向投保公司(0:平安、1:太平洋、2:人保)
            licenseNo: '', //	是	String	车牌号（字母全部大写）首位除外
        })
    }

    submit = () => {
        if (!this.valid) return;

        return this.Get('/carInsurance/applyCarInsurance.shtml', {
            carNoArea: this.carNoArea,
            carOwnersName: this.carOwnersName,
            cityCode: this.cityCode,
            idCard: this.idCard,
            intentionCompanyCode: this.intentionCompanyCode,
            licenseNo: this.licenseNo
        })
    }

    setFormData = (field, value) => {
        this[field] = value
    }

    @computed get formatLicenseNo() {
        return this.licenseNo ? this.licenseNo.toUpperCase() : ''
    }

    @computed get valid() {
        return this.carNoArea && this.carOwnersName && this.cityCode && this.idCard && this.intentionCompanyCode && this.licenseNo
    }
}
