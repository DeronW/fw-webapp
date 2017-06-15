import { extendObservable, computed } from 'mobx'

export default class Bill{
    constructor(props, state = {}) {
        extendObservable(this, {
            current_type: 'paid', // all, paid, unpaid, completed
            apply_list: [{
                orderGid:"4b92d9e3d0934f4abb14d286c81fbf07",
                loanGid: "c2755f66-d9dd-4346-8870-40ae4772d6cf",
                baseStatus: 1,
                loanAmtStr: "500.00",
                termNumStr:"21天",
                loanTimeStr: "2017-06-15",
                productLogo:"https://app.easyloan888.com/img/fangxinhua_icon.png"
            }, {
                orderGid:"4b92d9e3d0934f4abb14d286c81fbf08",
                loanGid: "c2755f66-d9dd-4346-8870-40ae4772d6cf",
                baseStatus: 1,
                loanAmtStr: "500.00",
                termNumStr:"21天",
                loanTimeStr: "2017-06-15",
                productLogo:"https://app.easyloan888.com/img/fangxinhua_icon.png"
            }],
            returning_list: [],
            failed_list: [],
            paid_list: [],
        }, state)
    }

    switch_type(type) {
        this.current_type = type
    }

    @computed get current_list() {
        return this[`${this.current_type}_list`]
    }

}



