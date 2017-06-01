import { extendObservable } from 'mobx'
export default class CarInfo {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {}, state)
    }

}