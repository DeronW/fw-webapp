import { extendObservable, computed } from 'mobx'

export default class BasicInfo {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {

        }, state)
    }

}
