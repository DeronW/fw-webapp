import { extendObservable } from 'mobx'

export default class Investor {
    constructor(Get) {
        this.Get = Get
        this.data = {}
        extendObservable(this.data, {

        })
    }
}