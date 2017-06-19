import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(request, state = {}) {
        this.request = request

        extendObservable(this, {
            // 0:平安、1:太平洋、2:人保
            '0': {
                originPrice: '',
                discount: '',
                actualPrice: '',
            },
            '1': {
                originPrice: '',
                discount: '',
                actualPrice: '',
            },
            '2': {
                originPrice: '',
                discount: '',
                actualPrice: '',
            },
        })
    }

    getSelectedAbstract = (firmNo) => {
        return {
            originPrice: this[firmNo].originPrice,
            discount: this[firmNo].discount,
            actualPrice: this[firmNo].actualPrice,
        }
    }

    getSelectedDetail = (firmNo) => this[firmNo]

    getSelectedTotal = (firmNo) => this[firmNo].actualPrice


}
