import { extendObservable } from 'mobx'
export default class ResetDealPassword {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            phone: null,
            IDcardNum: null,
        }, state)
    }
}