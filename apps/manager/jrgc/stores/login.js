import { extendObservable } from 'mobx'

export default class Login {
    constructor() {
        this.data = {}
        extendObservable(this.data, {

        })
    }
}
