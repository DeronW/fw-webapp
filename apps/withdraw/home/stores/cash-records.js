import { extendObservable } from 'mobx'
export default class CashRecords {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            page: 0,
            totalPage: null,
            month: [],
            listFalse: false
        }, state)
    }

    getData() {
        return this.request({
            url: "/fake-api/api/sspay/withdraw/v1/getWithDrawRecord.shtml",
            data: { pageSize: 20, page: this.page + 1 },
            method: 'post',
            enable_loading: true,
        }).then(data => {
            extendObservable(this, data);
        })
    }

}