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
            },
            detail: null,
            customer: null,
            quotation: null,
            payUrl: '',
            state: '',
        })
    }

    setData = (field, k) => e => {
        this[field][k] = e.target.value;
    }

}
