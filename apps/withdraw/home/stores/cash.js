import { extendObservable } from 'mobx'
export default class Cash {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            value: null,
            inputValue: null,
        }, state)
    }
}