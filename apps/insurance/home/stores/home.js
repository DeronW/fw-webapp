import { extendObservable } from 'mobx'
export default class Home {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {}, state)
    }
}