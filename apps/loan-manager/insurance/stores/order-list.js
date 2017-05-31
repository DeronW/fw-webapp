import { extendObservable } from 'mobx'
export default class OrderList {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {}, state)
    }

}