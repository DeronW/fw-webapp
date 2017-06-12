import { extendObservable, computed } from 'mobx'

export default class Orders {

    constructor(props, state = {}) {
        extendObservable(this, {
            current_type: 'all', // all, paid, unpaid, completed
            all_list: [{
                id: 123,
                price: 3400,
                licenseNo: '京A12345',
                status: 'unpaid',
            }, {
                id: 1234,
                price: 3400,
                licenseNo: '京A12345',
                status: 'unpaid',
            }],
            paid_list: [],
            unpaid_list: [],
            completed_list: [],
        }, state)
    }

    switch_type(type) {
        this.current_type = type
    }

    @computed get current_list() {
        return this[`${this.current_type}_list`]
    }

}
