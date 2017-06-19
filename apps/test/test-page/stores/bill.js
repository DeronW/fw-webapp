import { extendObservable, computed } from 'mobx'

export default class Bill{
    constructor(request, resultList, state = {}) {
        this.request = request;
        this.resultList = resultList;
        this.API_PATH = 'http://localhost/fake-api';
        extendObservable(this, {
            current_type: 'apply',
            apply_list: [],
            returning_list: [],
            failed_list: [],
            paid_list: [],
        }, state)
    }

    switch_type(type) {
        this.current_type = type
        this.getDataList();
    }

    getDataList() {
        this.request(`${this.API_PATH}/api/order/v1/orderList.json`).then( data => {
            this[`${this.current_type}_list`] = data.resultList
        })
        return this[`${this.current_type}_list`]
    }

}



