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
        return this.request({
            url: '/fake-api/api/sspay/withdraw/v1/getWithdrawInfo.shtml',
            method: 'post',
            data: {}
        }).then(data => {
            extendObservable(this, data);
        })
    }
}