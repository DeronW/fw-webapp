import { extendObservable } from 'mobx'
export default class BankAccount {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            value: '',
            tying: false
        }, state)
    }

    getBankList(params) {
        return this.request({
            url: "/fake-api/api/sspay/withdraw/v1/getBankList.shtml",
            method: "GET",
            data: {
                index: "0",
                keyword: params,
                size: "10000"
            },
        }).then(data => {
            extendObservable(this, data)
        })
    }
}