import { extendObservable } from 'mobx'

export default class Car {

    constructor() {
        extendObservable(this, {
            type: '', // '1' for car
            id: '',
            detail: null,
            customer: null,
            quotation: null,
            payUrl: '',
            state: '',
        })
    }
}
