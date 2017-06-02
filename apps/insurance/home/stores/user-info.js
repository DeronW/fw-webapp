import { extendObservable } from 'mobx'
export default class UserInfo {
    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {}, state)
    }

}