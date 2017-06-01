import { extendObservable } from 'mobx'
export default class QuoteDetail {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {}, state)
    }

}