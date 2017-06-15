import { extendObservable, computed } from 'mobx'

export default class Bill{
    constructor(props, state = {}) {
        extendObservable(this, {
            current_type: 'all', // all, paid, unpaid, completed
            all_list: [],
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

