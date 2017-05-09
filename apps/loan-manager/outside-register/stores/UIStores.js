import { computed } from 'mobx'
import { extendObservable } from 'mobx-react'

export default class UIStore {

    extendObservable(this, {
        activeType: 'phone',
        codeAvailAfter: 60,
        showPassword: false
    });

    @computed codeAvail = this.codeAvailAfter === 60;

    constructor(request) {
        this.request = request;
    }

    switchActiveType = (type) => { this.activeType = type }

    getCode = (phone) => {
        request()
    }


}
