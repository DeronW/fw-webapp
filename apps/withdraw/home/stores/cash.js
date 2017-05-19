import { extendObservable } from 'mobx'
export default class Cash {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            value: null,
            inputValue: null,
        }, state)
    }

    takeData() {
        return this.request('/api/sspay/withdraw/v1/getOpenAccountInfo.shtml').then(data => {
            extendObservable(this, data)
        })
    }
}